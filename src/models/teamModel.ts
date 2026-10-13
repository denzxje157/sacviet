import { TeamMember, PartnerGroup } from './types';

/**
 * ============================================================================
 * [MODEL 2] DỮ LIỆU ĐỘI THI & NGUỒN LỰC THỰC HIỆN (teamModel.ts)
 * ============================================================================
 * -> Muốn sửa Họ tên, Lớp, SĐT, Email, Vai trò hoặc thay Ảnh thành viên,
 *    bạn chỉ cần chỉnh trực tiếp trong mảng `teamMembersData` dưới đây.
 * -> Ảnh chân dung thật của 05 thành viên đã được đặt trong `public/assets/team/`.
 */

export const teamOverviewModel = {
  sectionBadge: 'HẠNG MỤC 01 & MỤC 6 ĐỀ ÁN • ĐỘI NGŨ & NGUỒN LỰC',
  sectionTitle: 'Đội Thi Trường Đại Học Lạc Hồng',
  sectionSubtitle:
    'Đội ngũ nòng cốt gồm 05 thành viên đa ngành từ Công nghệ thông tin, Quản trị vận hành đến Truyền thông đa phương tiện – những người đã trực tiếp kiến trúc và lập trình hoàn thiện mã nguồn nền tảng MVP Sắc Việt mà không phụ thuộc đơn vị gia công bên ngoài.',
  incubationSupport:
    'Dự án đang trong giai đoạn ươm tạo và nhận được sự bảo trợ, cố vấn chuyên môn sát sao từ các giảng viên tại Trường Đại học Lạc Hồng về định hướng công nghệ lõi cũng như mô hình phát triển kinh doanh bền vững.',
};

export const teamMembersData: TeamMember[] = [
  {
    id: 'ha-van-kien',
    fullName: 'Hà Văn Kiên',
    roleCode: 'CEO',
    roleTitle: 'Trưởng Nhóm • Giám Đốc Điều Hành (CEO)',
    isLeader: true,
    className: 'Lớp 25CT111',
    university: 'Trường Đại học Lạc Hồng',
    phone: '0971565426',
    email: 'hakien2525@gmail.com',
    avatarUrl: '/assets/team/ha-van-kien.jpg',
    responsibilities: [
      'Điều phối chiến lược tổng thể & định hướng mô hình kinh doanh D2C',
      'Xây dựng kế hoạch tài chính, quản trị dòng tiền & phụ trách gọi vốn',
      'Đại diện đối ngoại ký kết biên bản ghi nhớ (MOU) với các Hợp tác xã',
    ],
    skills: ['Chiến lược kinh doanh', 'Quản trị dự án', 'Gọi vốn & Đối ngoại'],
  },
  {
    id: 'nguyen-hoang-anh',
    fullName: 'Nguyễn Hoàng Anh',
    roleCode: 'CTO',
    roleTitle: 'Giám Đốc Công Nghệ (CTO)',
    isLeader: false,
    className: 'Lớp 25CT111',
    university: 'Trường Đại học Lạc Hồng',
    phone: '0971565426',
    email: 'hakien2525@gmail.com',
    avatarUrl: '/assets/team/nguyen-hoang-anh.jpg',
    responsibilities: [
      'Kiến trúc hệ thống đám mây không máy chủ (Serverless) với React, Vite & Supabase',
      'Tích hợp Trợ lý văn hóa ảo Gemini AI & Bản đồ di sản tương tác Leaflet',
      'Đảm bảo bảo mật dữ liệu giao dịch, phân quyền người dùng & tối ưu hiệu năng',
    ],
    skills: ['Full-stack React/TS', 'Tích hợp Gemini AI', 'Kiến trúc Supabase'],
  },
  {
    id: 'hoang-minh-phat',
    fullName: 'Hoàng Minh Phát',
    roleCode: 'COO',
    roleTitle: 'Giám Đốc Vận Hành (COO)',
    isLeader: false,
    className: 'Lớp 25CT111',
    university: 'Trường Đại học Lạc Hồng',
    phone: '0865360718',
    email: 'hoangminhphat369@gmail.com',
    avatarUrl: '/assets/team/hoang-minh-phat.jpg',
    responsibilities: [
      'Thiết lập mạng lưới cung ứng với các Hợp tác xã làng nghề (Bàu Trúc, Tây Bắc)',
      'Chuẩn hóa quy trình kiểm định chất lượng hàng thủ công & quy chuẩn đóng gói xanh',
      'Điều phối tích hợp API vận chuyển tuyến xã cùng VNPost và Viettel Post',
    ],
    skills: ['Quản trị chuỗi cung ứng', 'Vận hành Logistics', 'Kiểm soát chất lượng'],
  },
  {
    id: 'phan-van-tran',
    fullName: 'Phan Văn Trận',
    roleCode: 'CMO',
    roleTitle: 'Giám Đốc Marketing (CMO)',
    isLeader: false,
    className: 'Lớp 23MC111',
    university: 'Trường Đại học Lạc Hồng',
    phone: '0835653065',
    email: 'Phanvantran19@gmail.com',
    avatarUrl: '/assets/team/phan-van-tran.jpg',
    responsibilities: [
      'Thiết kế nhận diện thương hiệu Sắc Việt & triển khai thông điệp "Chạm vào di sản"',
      'Chủ trì chiến dịch tương tác công nghệ "Check-in bản đồ ảo" thu hút Gen Z',
      'Tối ưu hiệu suất chuyển đổi đa kênh (TikTok, Reels, Fanpage) theo chỉ số CTR, CAC, ROAS',
    ],
    skills: ['Truyền thông đa phương tiện', 'Digital Marketing', 'Sáng tạo chiến dịch'],
  },
  {
    id: 'ngo-vo-nam',
    fullName: 'Ngô Võ Nam',
    roleCode: 'CCO',
    roleTitle: 'Giám Đốc Nội Dung Di Sản (CCO)',
    isLeader: false,
    className: 'Lớp 26CT111',
    university: 'Trường Đại học Lạc Hồng',
    phone: '0941543547',
    email: 'Namngo0806208@gmail.com',
    avatarUrl: '/assets/team/ngo-vo-nam.jpg',
    responsibilities: [
      'Nghiên cứu, biên tập và kiểm chứng độ chính xác của Thư viện di sản 54 dân tộc',
      'Xây dựng kho dữ liệu ngữ cảnh văn hóa để huấn luyện phản hồi cho Trợ lý Gemini AI',
      'Phát triển hệ thống bài viết câu chuyện làng nghề chuẩn SEO thu hút Organic Traffic',
    ],
    skills: ['Nghiên cứu văn hóa', 'Quản trị nội dung số', 'Tối ưu hóa SEO AI'],
  },
];

export const strategicPartnersData: PartnerGroup[] = [
  {
    category: 'Cố Vấn & Bảo Trợ',
    title: 'Trường Đại Học Lạc Hồng',
    items: ['Giảng viên cố vấn Công nghệ & AI', 'Giảng viên cố vấn Quản trị Kinh doanh', 'Vườn ươm Khởi nghiệp Sinh viên'],
    description: 'Định hướng chiến lược học thuật, thẩm định mô hình tài chính và kết nối hệ sinh thái khởi nghiệp.',
  },
  {
    category: 'Đối Tác Nguồn Cung',
    title: 'Mạng Lưới Hợp Tác Xã Làng Nghề',
    items: ['HTX Gốm Chăm Bàu Trúc', 'HTX Dệt Lanh & Thổ Cẩm Tây Bắc', 'Tổ hợp tác Đan lát & Chế tác Tây Nguyên'],
    description: 'Cung cấp sản phẩm thủ công nguyên bản tận gốc (D2C) và đồng kiểm định chất lượng đầu ra.',
  },
  {
    category: 'Đối Tác Hạ Tầng & Logistics',
    title: 'Công Nghệ & Vận Chuyển Tuyến Xã',
    items: ['VNPost & Viettel Post (Phủ sóng vùng cao)', 'Google Gemini AI & Supabase Cloud', 'Hạ tầng triển khai Vercel Serverless'],
    description: 'Đảm bảo vận chuyển từ bản làng xa xôi đến đô thị và duy trì hệ thống công nghệ chi phí tối ưu.',
  },
];
