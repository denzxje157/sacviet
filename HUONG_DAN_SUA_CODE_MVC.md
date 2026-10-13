# Sổ Tay Hướng Dẫn Tìm & Sửa Code Theo Kiến Trúc MVC (`sacviet-baocao`)

Dự án **Website Báo cáo Đề án & Đội thi Sắc Việt** được thiết kế chuẩn theo mô hình **MVC (Model – View – Controller)** để giúp bạn tìm và chỉnh sửa bất kỳ nội dung hay giao diện nào chỉ trong vài giây mà không sợ làm hỏng cấu trúc trang.

---

## 1. Sơ Đồ Thư Mục MVC

```text
d:\Dự án Kinh Doanh Số\sacviet-baocao\
├── public/
│   ├── assets/
│   │   ├── dbc-logo.png                  # Logo cuộc thi Digital Business Contest 2026
│   │   ├── team/                         # Thư mục bỏ ảnh chân dung 5 thành viên
│   │   └── showcase/                     # Ảnh minh họa sản phẩm & làng nghề
│   └── docs/
│       └── Ban_Mo_Ta_Du_An_Sac_Viet.docx # File Word đề án tải trực tiếp trên web
│
└── src/
    ├── models/                           # [M - MODEL] NƠI CHỨA TOÀN BỘ NỘI DUNG CHỮ, SỐ LIỆU & LINK
    │   ├── projectConfigModel.ts         # Cấu hình tên dự án, Link Web MVP thật, Liên hệ Trưởng nhóm
    │   ├── teamModel.ts                  # Thông tin 5 Thành viên Đội thi ĐH Lạc Hồng & Đối tác
    │   ├── proposalModel.ts              # Nội dung Mục 1, 2, 3, 4 của Đề án
    │   ├── financialModel.ts             # Số liệu Tài chính, Doanh thu 3 năm, Điểm hòa vốn & Gọi vốn
    │   └── marketingModel.ts             # Chiến dịch Truyền thông "Chạm vào di sản" & Chỉ số KPIs
    │
    ├── controllers/                      # [C - CONTROLLER] NƠI XỬ LÝ TƯƠNG TÁC & TÍNH TOÁN
    │   └── useReportController.ts        # Điều khiển cuộn menu, lọc thành viên, đổi tab MVP, tính doanh thu
    │
    └── views/                            # [V - VIEW] NƠI CHỨA GIAO DIỆN TỪNG PHẦN RIÊNG BIỆT
        ├── layout/
        │   ├── NavbarView.tsx            # Giao diện Thanh menu trên cùng
        │   └── FooterView.tsx            # Giao diện Chân trang
        └── sections/
            ├── HeroView.tsx              # Giao diện Phần 1: Mở đầu & Tóm tắt Đề án
            ├── TeamView.tsx              # Giao diện Phần 2: Đội thi 5 thành viên
            ├── ProblemSolutionView.tsx   # Giao diện Phần 3: Tính cần thiết & Bảng so sánh
            ├── TechMvpView.tsx           # Giao diện Phần 4: Công nghệ lõi & Khung xem trước MVP
            ├── OperationsView.tsx        # Giao diện Phần 5: Vận hành O2O & Quản trị rủi ro
            ├── FinancialsView.tsx        # Giao diện Phần 6: Tài chính & Thanh trượt mô phỏng
            └── MarketingView.tsx         # Giao diện Phần 7: Chiến lược & Nội dung truyền thông
```

---

## 2. Bảng Chỉ Dẫn Nhanh: "Muốn sửa cái gì -> Mở file nào?"

| Việc bạn muốn làm | File cần mở để sửa |
| :--- | :--- |
| **Đổi link dẫn sang Web Sản phẩm MVP thực tế** | `src/models/projectConfigModel.ts` (dòng `liveMvpUrl`) |
| **Sửa tên, lớp, SĐT, email hoặc thay ảnh 5 thành viên** | `src/models/teamModel.ts` (mảng `teamMembersData`) |
| **Thay ảnh chân dung thật của 5 thành viên** | Copy ảnh vào `public/assets/team/` rồi sửa `avatarUrl` trong `src/models/teamModel.ts` |
| **Sửa nội dung Tính cần thiết, Công nghệ AI/Bản đồ, Vận hành O2O** | `src/models/proposalModel.ts` |
| **Sửa số liệu Tài chính (CAPEX, OPEX, Hòa vốn, Doanh thu)** | `src/models/financialModel.ts` |
| **Sửa kế hoạch Truyền thông, Phễu Marketing, KPIs** | `src/models/marketingModel.ts` |
| **Đổi màu sắc chủ đạo (Đỏ Son, Vàng Đồng, Giấy Dó)** | `index.html` (phần `tailwind.config`) |
| **Chỉnh bố cục/giao diện của một mục cụ thể** | Mở đúng file `*View.tsx` tương ứng trong `src/views/sections/` |
