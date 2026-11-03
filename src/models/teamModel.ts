import { TeamMember, PartnerGroup, FieldworkProof } from './types';

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
  sectionTitle: 'Đội thi Trường Đại học Lạc Hồng',
  sectionSubtitle:
    'Đội ngũ nòng cốt gồm 05 sinh viên từ các ngành Công nghệ thông tin và Thương mại điện tử – trực tiếp kiến trúc và lập trình hoàn thiện mã nguồn nền tảng MVP Sắc Việt.',
  incubationSupport:
    'Dự án đang trong giai đoạn ươm tạo và nhận được sự bảo trợ, cố vấn chuyên môn từ các giảng viên tại Trường Đại học Lạc Hồng về định hướng công nghệ cũng như mô hình phát triển kinh doanh.',
};

export const fieldworkProofModel: FieldworkProof = {
  badge: 'MINH CHỨNG THỰC ĐỊA & KẾT NỐI BẢN ĐỊA',
  title: 'Khảo sát thực tế & đối thoại cùng nghệ nhân làng nghề',
  subtitle:
    'Đội ngũ Sắc Việt trực tiếp đến các làng nghề truyền thống để lắng nghe tâm tư, quy trình sản xuất thủ công và rào cản tiêu thụ sản phẩm của bà con.',
  imageUrl: '/assets/fieldwork/fieldwork-1-artisan-talk.webp',
  imageAlt: 'Đội ngũ gặp gỡ và lắng nghe nghệ nhân chia sẻ về văn hóa bản địa',
  caption: 'Đội ngũ gặp gỡ và lắng nghe nghệ nhân chia sẻ về văn hóa bản địa (Hình 3 trong Bản mô tả dự án)',
  location: 'Làng Bana, Xã Ea Rốk, Huyện Ea Súp, Tỉnh Đắk Lắk',
  date: '31/08 – 02/09',
  coopName: 'Hợp tác xã Ea Rốk / Hộ nghệ nhân Lữ Văn Phong',
  permissionStatus: 'Được hộ nghệ nhân đồng ý phỏng vấn và khảo sát',
  fieldworkSummary:
    'Đội ngũ sinh viên trực tiếp đối thoại, tìm hiểu quy trình ủ men truyền thống và lắng nghe rào cản tiêu thụ thực tế của hộ nghệ nhân. Dữ liệu là căn cứ xây dựng phân khu Chợ phiên D2C và Kênh Nghệ nhân trên nền tảng Sắc Việt.',
  isVerified: true,
  slides: [
    {
      id: 'artisan-talk',
      title: 'Đối thoại cùng nghệ nhân làm rượu cần',
      imageUrl: '/assets/fieldwork/fieldwork-1-artisan-talk.webp',
      imageAlt: 'Đội ngũ gặp gỡ và lắng nghe nghệ nhân chia sẻ về văn hóa bản địa',
      caption: 'Đội ngũ gặp gỡ và lắng nghe nghệ nhân chia sẻ về văn hóa bản địa (Hình 3 trong Bản mô tả dự án)',
      tag: 'Hình 3 Đề án Sắc Việt',
      badge: 'Gặp gỡ nghệ nhân',
    },
    {
      id: 'touching-jars',
      title: 'Tìm hiểu quy trình và bình ủ rượu truyền thống',
      imageUrl: '/assets/fieldwork/fieldwork-2-touching-jars.webp',
      imageAlt: 'Sinh viên tận tay tìm hiểu bình rượu cần truyền thống',
      caption: 'Sinh viên trực tiếp quan sát và tìm hiểu kỹ thuật làm chum, bình ủ rượu cần truyền thống của đồng bào',
      tag: 'Quy trình sản xuất',
      badge: 'Khảo sát kỹ thuật',
    },
    {
      id: 'binh-ruou-can',
      title: 'Chi tiết bình rượu cần truyền thống',
      imageUrl: '/assets/fieldwork/fieldwork-4-binh-ruou-can.webp',
      imageAlt: 'Chi tiết sản phẩm bình rượu cần truyền thống',
      caption: 'Sản phẩm bình rượu cần thủ công truyền thống đặc trưng văn hóa bản địa vùng cao',
      tag: 'Bình rượu cần',
      badge: 'Sản phẩm rượu cần',
    },
    {
      id: 'san-pham',
      title: 'Sản phẩm thủ công và thổ cẩm làng nghề',
      imageUrl: '/assets/fieldwork/fieldwork-5-san-pham.webp',
      imageAlt: 'Sản phẩm thủ công làng nghề truyền thống',
      caption: 'Các sản phẩm thủ công mỹ nghệ, thổ cẩm và sản vật địa phương phục vụ số hóa trên sàn Sắc Việt',
      tag: 'Sản phẩm làng nghề',
      badge: 'Sản vật địa phương',
    },
    {
      id: 'cultural-experience',
      title: 'Nhóm sinh viên trải nghiệm văn hóa bản địa',
      imageUrl: '/assets/fieldwork/fieldwork-3-cultural-experience.webp',
      imageAlt: 'Nhóm sinh viên khảo sát và trải nghiệm văn hóa',
      caption: 'Các thành viên trong nhóm trực tiếp khảo sát thực địa và trải nghiệm các giá trị văn hóa độc bản',
      tag: 'Trải nghiệm văn hóa',
      badge: 'Kết nối cộng đồng',
    },
    {
      id: 'e-de-experience',
      title: 'Trải nghiệm văn hóa dân tộc Ê Đê',
      imageUrl: '/assets/fieldwork/fieldwork-6-e-de-experience.webp',
      imageAlt: 'Sinh viên trải nghiệm văn hóa dân tộc Ê Đê',
      caption: 'Sinh viên tiếp cận và tìm hiểu sâu hơn về nếp sống, phong tục và văn hóa truyền thống Ê Đê',
      tag: 'Văn hóa Ê Đê',
      badge: 'Bản sắc dân tộc',
      fitMode: 'contain',
    },
  ],
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
    phone: '0792628262',
    email: 'nguyenhoangannh1507@gmail.com',
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
    category: 'Cố vấn & bảo trợ',
    title: 'Trường Đại học Lạc Hồng',
    items: ['Giảng viên cố vấn Công nghệ & AI', 'Giảng viên cố vấn Quản trị Kinh doanh', 'Vườn ươm Khởi nghiệp Sinh viên'],
    description: 'Định hướng chiến lược học thuật, thẩm định mô hình tài chính và kết nối hệ sinh thái khởi nghiệp.',
  },
  {
    category: 'Đối tác nguồn cung',
    title: 'Mạng lưới hợp tác xã làng nghề',
    items: ['HTX Gốm Chăm Bàu Trúc', 'HTX Dệt Lanh & Thổ Cẩm Tây Bắc', 'Tổ hợp tác Đan lát & Chế tác Tây Nguyên'],
    description: 'Cung cấp sản phẩm thủ công nguyên bản tận gốc (D2C) và đồng kiểm định chất lượng đầu ra.',
  },
  {
    category: 'Đối tác hạ tầng & logistics',
    title: 'Công nghệ & vận chuyển tuyến xã',
    items: ['VNPost & Viettel Post (Phủ sóng vùng cao)', 'Google Gemini AI & Supabase Cloud', 'Hạ tầng triển khai Vercel Serverless'],
    description: 'Đảm bảo vận chuyển từ bản làng xa xôi đến đô thị và duy trì hệ thống công nghệ chi phí tối ưu.',
  },
];
