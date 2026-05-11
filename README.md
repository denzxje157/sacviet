# Sắc Việt - Kết nối bản sắc, di sản văn hóa trực tuyến

Sắc Việt là một ứng dụng web React + Vite xây dựng cho trải nghiệm khám phá, mua sắm và quản trị nội dung liên quan đến văn hóa Việt Nam. Dự án kết hợp các khu vực: trang giới thiệu, thư viện di sản, marketplace sản phẩm thủ công, cộng đồng, blog SEO và bảng điều khiển quản trị. Ứng dụng được thiết kế để chạy tốt cả khi kết nối Supabase lẫn khi không cấu hình backend, nhờ cơ chế fallback localStorage ở một số luồng chính.

## Tổng quan dự án

Mục tiêu của dự án là tạo một nền tảng số giúp người dùng:

1. Khám phá thông tin về dân tộc, lễ hội, kiến trúc, nghi lễ và di sản văn hóa.
2. Xem và mua các sản phẩm thủ công gắn với bản sắc vùng miền.
3. Tham gia cộng đồng qua bài đăng, tương tác nội dung và chat hỗ trợ AI.
4. Theo dõi đơn hàng, xác thực tài khoản và phục hồi mật khẩu.
5. Cho phép quản trị viên quản lý sản phẩm, đơn hàng, người dùng, nội dung và bài viết SEO.

## Tính năng chính

### Khu vực người dùng

- Trang chủ giới thiệu tổng quan dự án và nội dung nổi bật.
- Marketplace để duyệt sản phẩm, thêm vào giỏ hàng và đặt hàng.
- Thư viện di sản để đọc nội dung văn hóa theo danh mục.
- Blog và trang chi tiết bài viết theo slug.
- Cộng đồng để đăng bài, xem bài viết mới và tương tác nội dung.
- Trang đơn hàng cá nhân để theo dõi trạng thái mua hàng.
- Hộp thoại đăng nhập và đăng ký được dùng xuyên suốt ứng dụng.
- Drawer giỏ hàng hoạt động toàn cục.
- Chat AI hỗ trợ người dùng thông qua Gemini.

### Khu vực quản trị

- Dashboard quản trị.
- Quản lý sản phẩm.
- Quản lý đơn hàng.
- Quản lý người dùng và phân quyền.
- Quản lý nội dung thư viện.
- Quản lý bài viết SEO.

### Tích hợp và tự động hóa

- Supabase cho xác thực, lưu dữ liệu và đồng bộ nội dung.
- Gemini API cho chatbot và các luồng sinh nội dung tự động.
- Nodemailer cho email xác nhận đơn hàng và thông báo thanh toán.
- Vercel API routes để xử lý chat, webhook, gửi email, cron job và cập nhật quyền.
- Leaflet / React Leaflet cho dữ liệu bản đồ và tọa độ dân tộc.

## Công nghệ sử dụng

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS 4
- Framer Motion
- Supabase
- Gemini API
- Leaflet
- Nodemailer
- Lucide React

## Cấu trúc dự án

```text
App.tsx                    Điều phối route toàn cục cho public và admin
components/                Navbar, Footer, CartDrawer, AuthModal, AIChatWidget
context/                   AuthContext và CartContext
data/                      Dữ liệu mẫu
pages/                     Các trang public, blog, orders và admin
services/                  Lớp truy cập dữ liệu cho auth, sản phẩm, đơn hàng, nội dung, SEO, cộng đồng, người dùng
api/                       Serverless functions cho chat, email, webhook, cron và đổi quyền
supabase_schema.sql        Schema cơ sở dữ liệu Supabase
```

## Các luồng chính trong ứng dụng

### Người dùng

- Đăng ký và đăng nhập bằng Supabase Auth hoặc localStorage khi chưa cấu hình backend.
- Xem sản phẩm, thêm vào giỏ hàng, tạo đơn và theo dõi trạng thái đơn hàng.
- Đọc thư viện nội dung theo danh mục và dân tộc.
- Đăng bài cộng đồng và xem bài viết.
- Trò chuyện với AI để nhận hỗ trợ về nội dung văn hóa.

### Quản trị viên

- Truy cập các trang `/admin/dashboard`, `/admin/products`, `/admin/orders`, `/admin/users`, `/admin/content`, `/admin/seo`.
- Quản lý dữ liệu thông qua các service Supabase tương ứng.
- Cập nhật quyền người dùng thông qua edge/serverless function hoặc chế độ local.

## Môi trường cấu hình

Tạo file `.env.local` hoặc thiết lập biến môi trường trên Vercel với các giá trị sau:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
SUPABASE_URL=your_supabase_url
```

Ghi chú:

- `VITE_*` được dùng ở phía frontend.
- `EMAIL_USER` và `EMAIL_PASS` phục vụ gửi email từ các API route.
- `SUPABASE_SERVICE_ROLE_KEY` hoặc `SUPABASE_SERVICE_KEY` chỉ nên dùng ở serverless function.

## Cài đặt và chạy local

**Yêu cầu:** Node.js 18+.

1. Cài dependencies:

```bash
npm install
```

2. Tạo file `.env.local` và khai báo các biến môi trường ở trên.

3. Khởi chạy môi trường phát triển:

```bash
npm run dev
```

4. Build sản phẩm:

```bash
npm run build
```

5. Xem bản build local:

```bash
npm run preview
```

## Cơ sở dữ liệu Supabase

File `supabase_schema.sql` mô tả schema chính của dự án, bao gồm:

- `profiles` cho thông tin người dùng và role.
- `products` / `san_pham` cho sản phẩm.
- `orders` cho đơn hàng.
- `thu_vien` cho thư viện nội dung.
- `mxh_posts` cho bài viết cộng đồng.
- `bai_viet_seo` cho blog / nội dung SEO.
- `dan_toc` cho dữ liệu dân tộc và bản đồ.
- Các bảng phụ cho dữ liệu AI, lễ hội và luồng tự động hóa.

Schema cũng bật Row Level Security và có trigger tạo hồ sơ người dùng mới khi đăng ký.

## API routes

### `api/chat.js`

Nhận tin nhắn POST và gọi Gemini để trả lời hội thoại có ngữ cảnh.

### `api/send-email.js`

Gửi email xác nhận đơn hàng cho khách hàng khi có `EMAIL_USER` và `EMAIL_PASS`.

### `api/webhook.js`

Xử lý webhook thanh toán, cập nhật trạng thái đơn hàng và gửi email thông báo.

### `api/update-role.js`

Đổi role người dùng bằng Supabase service role key.

### `api/cron.js`

Cron job tự động tạo dữ liệu quiz và lễ hội từ Gemini rồi lưu vào Supabase.

## Chế độ local fallback

Khi Supabase chưa cấu hình, một số luồng vẫn chạy ở chế độ mô phỏng:

- Đăng nhập / đăng ký sử dụng localStorage.
- Đơn hàng có thể được lưu cục bộ để demo.
- Một số màn hình quản trị vẫn hiển thị dữ liệu giả lập hoặc danh sách rỗng an toàn.

## Ghi chú triển khai

- Ứng dụng dùng `HashRouter`, phù hợp với triển khai trên hosting tĩnh và Vercel.
- Các API routes được thiết kế để triển khai cùng dự án trên Vercel.
- Khi đưa lên production, nên kiểm tra kỹ biến môi trường cho frontend và serverless functions.

## Lộ trình sử dụng nhanh

1. Cấu hình Supabase và tạo schema bằng `supabase_schema.sql`.
2. Thiết lập Gemini API key và email service.
3. Chạy ứng dụng ở local để kiểm tra luồng auth, sản phẩm, cộng đồng và admin.
4. Deploy lên Vercel cùng các biến môi trường tương ứng.

## Thông điệp dự án

Sắc Việt không chỉ là một website thương mại điện tử, mà còn là một nền tảng kể chuyện và lưu giữ giá trị văn hóa Việt bằng trải nghiệm số hiện đại. Dự án kết hợp nội dung, thương mại, cộng đồng và tự động hóa để tạo ra một hệ sinh thái nhỏ cho di sản văn hóa trực tuyến.
