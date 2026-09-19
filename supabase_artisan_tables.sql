-- =======================================================
-- BẢNG QUẢN LÝ NGHỆ NHÂN DI SẢN (SẮC VIỆT SUPABASE)
-- Chạy đoạn mã này trong Supabase SQL Editor nếu muốn
-- có bảng riêng biệt nghe_nhan cho toàn bộ hệ thống
-- =======================================================

CREATE TABLE IF NOT EXISTS public.nghe_nhan (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  phone TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  representative TEXT,
  is_representative BOOLEAN DEFAULT false,
  village TEXT NOT NULL,
  ethnic TEXT NOT NULL,
  bio TEXT,
  proof_type TEXT DEFAULT 'workshop', -- 'workshop' | 'certificate' | 'id_village'
  proof_url TEXT,
  proof_description TEXT,
  status TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'rejected'
  rejection_reason TEXT,
  badge_level TEXT DEFAULT 'standard', -- 'standard' | 'verified_heritage' | 'master'
  bank_account JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.nghe_nhan ENABLE ROW LEVEL SECURITY;

-- Cho phép mọi người đọc thông tin nghệ nhân (để hiển thị trên sàn)
CREATE POLICY "Cho phép xem công khai danh sách nghệ nhân"
  ON public.nghe_nhan FOR SELECT
  USING ( true );

-- Cho phép đăng ký nghệ nhân mới
CREATE POLICY "Cho phép đăng ký hồ sơ nghệ nhân"
  ON public.nghe_nhan FOR INSERT
  WITH CHECK ( true );

-- Cho phép cập nhật hồ sơ nghệ nhân
CREATE POLICY "Cho phép cập nhật hồ sơ nghệ nhân"
  ON public.nghe_nhan FOR UPDATE
  USING ( true );

-- Cho phép xóa nghệ nhân
CREATE POLICY "Cho phép xóa nghệ nhân"
  ON public.nghe_nhan FOR DELETE
  USING ( true );
