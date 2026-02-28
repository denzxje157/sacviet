import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { targetUserId, newRole } = req.body;

  // Lấy các biến môi trường từ Vercel
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Thiếu cấu hình Supabase Service Key trên Vercel' });
  }

  // Khởi tạo Supabase bằng chìa khóa vạn năng (Bỏ qua bảo mật RLS)
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    // 1. Cập nhật quyền trong hệ thống Auth của Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      targetUserId,
      { user_metadata: { role: newRole } } // newRole có thể là 'admin' hoặc 'user' (để gỡ quyền)
    );

    if (authError) throw authError;

    // 2. Cập nhật quyền trong bảng "profiles" (nếu có) để giao diện dễ đọc
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ role: newRole })
      .eq('id', targetUserId);

    if (profileError) throw profileError;

    return res.status(200).json({ message: 'Đã cập nhật quyền thành công!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}