// api/webhook.js
import { createClient } from '@supabase/supabase-js';

// Kết nối Supabase bằng Service Role Key (quyền Admin)
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

export default async function handler(req, res) {
  // Bỏ qua các request không phải POST
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    // 1. Lấy dữ liệu theo ĐÚNG định dạng của SePay
    const { content, transferAmount, transferType } = req.body; 

    // Chỉ xử lý giao dịch tiền VÀO (in), bỏ qua tiền RA (out)
    if (transferType !== 'in') {
        return res.status(200).json({ message: 'Bỏ qua giao dịch chuyển tiền ra' });
    }

    // 2. Dùng Regex để tìm Mã Đơn Hàng trong nội dung (Bắt chữ SN- kèm 6 số, không phân biệt hoa thường)
    const orderMatch = content.match(/(SN-?\d{6})/i);
    if (!orderMatch) {
      return res.status(200).json({ message: 'Không tìm thấy mã đơn hàng Sắc Việt trong nội dung' });
    }
    
    // Chuẩn hóa mã đơn hàng (ví dụ: khách ghi sn601810 -> đổi thành SN-601810)
    let orderId = orderMatch[0].toUpperCase();
    if (!orderId.includes('-')) orderId = orderId.replace('SN', 'SN-');

    // 3. Tìm đơn hàng trong Supabase
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (fetchError || !order) return res.status(404).json({ message: 'Đơn hàng không tồn tại' });

    // (Tùy chọn) Kiểm tra số tiền chuyển có đủ không
    // Nếu khách chuyển thiếu, bạn có thể gửi cảnh báo hoặc vẫn duyệt (tùy logic shop)
    if (transferAmount < order.total) {
      console.log(`Đơn ${orderId} chuyển thiếu tiền: Yêu cầu ${order.total}, Thực nhận ${transferAmount}`);
      // Ở đây tạm thời vẫn duyệt, bạn có thể đổi logic nếu muốn
    }

    // 4. Cập nhật trạng thái thành ĐÃ THANH TOÁN ('paid')
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('order_id', orderId);

    if (updateError) throw updateError;

    // Trả về 200 OK để SePay biết đã nhận tin thành công
    return res.status(200).json({ success: true, message: 'Đã duyệt đơn tự động!' });

  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: error.message });
  }
}