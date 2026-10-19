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
    roleCode: 'LEAD',
    roleTitle: 'Trưởng Nhóm • Điều Phối Dự Án',
    isLeader: true,
    className: 'Năm 2 • Lớp 25CT111',
    university: 'Khoa Công nghệ Thông tin – ĐH Lạc Hồng',
    phone: '0971565426',
    email: 'hakien2525@gmail.com',
    avatarUrl: '/assets/team/ha-van-kien.jpg',
    responsibilities: [
      'Điều phối kế hoạch tổng thể & định hướng mô hình sàn thương mại số D2C',
      'Xây dựng kế hoạch tài chính, quản trị rủi ro & tài liệu đề án nộp BTC',
      'Đại diện liên hệ và làm việc kết nối với các Hợp tác xã làng nghề thủ công',
    ],
    skills: ['Quản trị dự án sinh viên', 'Kế hoạch kinh doanh số', 'Kết nối đối tác'],
  },
  {
    id: 'nguyen-hoang-anh',
    fullName: 'Nguyễn Hoàng Anh',
    roleCode: 'DEV',
    roleTitle: 'Thành Viên • Phát Triển Hệ Thống & AI',
    isLeader: false,
    className: 'Năm 2 • Lớp 25CT111',
    university: 'Khoa Công nghệ Thông tin – ĐH Lạc Hồng',
    phone: '0971565426',
    email: 'hakien2525@gmail.com',
    avatarUrl: '/assets/team/nguyen-hoang-anh.jpg',
    responsibilities: [
      'Xây dựng và phát triển mã nguồn website với React, TypeScript & Supabase Cloud',
      'Tích hợp Trợ lý văn hóa ảo Gemini AI & Bản đồ di sản tương tác Leaflet',
      'Đảm bảo bảo mật tài khoản, tối ưu tốc độ tải trang và triển khai hạ tầng đám mây',
    ],
    skills: ['Lập trình React/TypeScript', 'Tích hợp Gemini AI API', 'Cơ sở dữ liệu Supabase'],
  },
  {
    id: 'hoang-minh-phat',
    fullName: 'Hoàng Minh Phát',
    roleCode: 'OPS',
    roleTitle: 'Thành Viên • Hỗ Trợ Vận Hành & Khảo Sát',
    isLeader: false,
    className: 'Năm 2 • Lớp 25CT111',
    university: 'Khoa Công nghệ Thông tin – ĐH Lạc Hồng',
    phone: '0865360718',
    email: 'hoangminhphat369@gmail.com',
    avatarUrl: '/assets/team/hoang-minh-phat.jpg',
    responsibilities: [
      'Khảo sát nhu cầu thực tế và quy trình sản xuất thủ công của các nghệ nhân',
      'Chuẩn hóa thông tin sản phẩm, hỗ trợ kiểm tra quy cách đóng gói xanh',
      'Nghiên cứu tích hợp các đơn vị bưu chính (VNPost, Viettel Post) giao hàng vùng sâu',
    ],
    skills: ['Khảo sát thực địa', 'Hỗ trợ vận hành số', 'Quy trình giao vận'],
  },
  {
    id: 'phan-van-tran',
    fullName: 'Phan Văn Trận',
    roleCode: 'MKT',
    roleTitle: 'Thành Viên • Truyền Thông & Marketing Số',
    isLeader: false,
    className: 'Năm 4 • Lớp 23EC111',
    university: 'Ngành Thương mại Điện tử – ĐH Lạc Hồng',
    phone: '0835653065',
    email: 'Phanvantran19@gmail.com',
    avatarUrl: '/assets/team/phan-van-tran.jpg',
    responsibilities: [
      'Thiết kế nhận diện thương hiệu dự án Sắc Việt & thông điệp truyền thông văn hóa',
      'Xây dựng kế hoạch Marketing số đa kênh (TikTok, Reels, Fanpage) tiếp cận giới trẻ',
      'Nghiên cứu thị hiếu tiêu dùng trực tuyến và chiến lược bán hàng thương mại điện tử',
    ],
    skills: ['Thương mại điện tử', 'Digital Marketing', 'Sáng tạo nội dung đa nền tảng'],
  },
  {
    id: 'ngo-vo-nam',
    fullName: 'Ngô Võ Nam',
    roleCode: 'CONTENT',
    roleTitle: 'Thành Viên • Biên Tập Dữ Liệu Di Sản',
    isLeader: false,
    className: 'Năm 1 • Lớp 26CT111',
    university: 'Khoa Công nghệ Thông tin – ĐH Lạc Hồng',
    phone: '0941543547',
    email: 'Namngo0806208@gmail.com',
    avatarUrl: '/assets/team/ngo-vo-nam.jpg',
    responsibilities: [
      'Thu thập, biên tập và hệ thống hóa dữ liệu Thư viện văn hóa 54 dân tộc Việt Nam',
      'Chuẩn bị dữ liệu mẫu huấn luyện kịch bản hỏi đáp cho Trợ lý văn hóa ảo Gemini AI',
      'Hỗ trợ kiểm thử tính năng tra cứu văn hóa và viết bài giới thiệu làng nghề',
    ],
    skills: ['Biên tập nội dung số', 'Kiểm thử phần mềm', 'Nghiên cứu văn hóa dân tộc'],
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
