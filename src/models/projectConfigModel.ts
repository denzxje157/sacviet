import { NavItem } from './types';

/**
 * ============================================================================
 * [MODEL 1] CẤU HÌNH CHUNG CỦA DỰ ÁN & LIÊN KẾT (projectConfigModel.ts)
 * ============================================================================
 * -> Muốn đổi Link Web Sản phẩm thật (MVP), SĐT, Email hoặc Tiêu đề,
 *    bạn chỉ cần sửa trực tiếp các dòng bên dưới.
 */

export const projectConfigModel = {
  // Thông tin cuộc thi & đơn vị
  contestName: 'CUỘC THI SINH VIÊN KINH DOANH SỐ 2026',
  contestEnglishName: 'DIGITAL BUSINESS CONTEST 2026 (VECOM)',
  dbcLogoUrl: '/assets/dbc-logo.png',
  sacVietLogoUrl: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png?v=3',
  universityName: 'TRƯỜNG ĐẠI HỌC LẠC HỒNG',
  submissionTime: 'Tháng 10 / 2026',

  // Tên dự án & Thông điệp
  projectShortName: 'SẮC VIỆT',
  projectSubtitle: 'Nền tảng kết nối chợ phiên đến với muôn phương',
  projectFullTitle: 'Sắc Việt – Nền tảng kết nối chợ phiên đến với muôn phương',
  coreSlogan: 'Chạm Vào Di Sản – Kiến Tạo Sinh Kế Bền Vững',
  heroSummary:
    'Nền tảng Thương mại điện tử D2C kết hợp Bảo tàng văn hóa số tiên phong tại Việt Nam. Ứng dụng Trí tuệ nhân tạo (Gemini AI) làm trợ lý văn hóa ảo và Bản đồ số (Leaflet) định vị nguồn gốc sản phẩm của 54 dân tộc, giúp nghệ nhân vùng cao nâng cao thu nhập trực tiếp không qua trung gian.',

  // ĐƯỜNG LINK QUAN TRỌNG (Đổi link web sản phẩm thực tế của nhóm tại đây)
  links: {
    // Thay bằng link Vercel thực tế của web sản phẩm Sắc Việt (hoặc subdomain app.sacviet.id.vn)
    liveMvpUrl: 'https://sacviet.vercel.app',
    githubMvpRepo: 'https://github.com/denzxje157/sacviet',
    proposalDocxDownloadUrl: '/docs/Mo_Ta_Du_An_Sac_Viet.docx',
    proposalDocxFileName: 'Mô Tả Dự Án Sắc Việt.docx',
    vecomFanpageUrl: 'https://www.facebook.com/VecomNet?locale=vi_VN',
  },

  // Thông tin liên hệ đại diện Đội thi
  leaderContact: {
    fullName: 'Hà Văn Kiên',
    role: 'Trưởng nhóm Dự án Sắc Việt (CEO)',
    classInfo: 'Lớp 25CT111 – Trường Đại học Lạc Hồng',
    phone: '0971565426',
    email: 'hakien2525@gmail.com',
  },

  // Các con số nổi bật ngay trên Banner mở đầu (Hero)
  heroQuickStats: [
    {
      value: '54 Dân Tộc',
      label: 'Số hóa di sản & Bản đồ định vị làng nghề',
    },
    {
      value: '100% MVP',
      label: 'Đã lập trình hoàn thiện Sàn TMĐT & Gemini AI',
    },
    {
      value: 'Mô Hình D2C',
      label: 'Kết nối trực tiếp Hợp tác xã – Cắt giảm thương lái',
    },
    {
      value: 'Tháng 10–12',
      label: 'Điểm hòa vốn dự kiến ngay trong năm đầu tiên',
    },
  ],

  // Danh mục thanh điều hướng (Navbar) - Ngắn gọn, không bị tràn dòng
  navigationItems: [
    { id: 'tong-quan', shortNumber: '01', label: 'Tổng quan' },
    { id: 'doi-thi', shortNumber: '02', label: 'Đội thi' },
    { id: 'tinh-can-thiet', shortNumber: '03', label: 'Cần thiết' },
    { id: 'cong-nghe-mvp', shortNumber: '04', label: 'Công nghệ & MVP' },
    { id: 'van-hanh-o2o', shortNumber: '05', label: 'Vận hành' },
    { id: 'tai-chinh', shortNumber: '06', label: 'Tài chính' },
    { id: 'truyen-thong', shortNumber: '07', label: 'Truyền thông' },
  ] as NavItem[],
};
