import {
  ComparisonPoint,
  CoreValueCard,
  TechPillar,
  MvpModulePreview,
  SupplyChainStep,
  RiskSolutionItem,
} from './types';

/**
 * ============================================================================
 * [MODEL 3] NỘI DUNG ĐỀ ÁN: TÍNH CẦN THIẾT, CÔNG NGHỆ, MVP & VẬN HÀNH (proposalModel.ts)
 * ============================================================================
 * -> Chứa toàn bộ nội dung thuyết trình của Mục 1, 2, 3, 4 trong Bản Mô Tả Đề Án.
 */

export const problemSolutionModel = {
  sectionBadge: 'MỤC 1 ĐỀ ÁN • TÍNH CẦN THIẾT CỦA SẢN PHẨM DỊCH VỤ',
  sectionTitle: 'Giải Quyết Đứt Gãy Giữa Nghệ Nhân Vùng Cao & Thị Trường Hiện Đại',
  sectionSubtitle:
    'Sắc Việt không dừng lại ở mức độ ý tưởng mà đã được lập trình hoàn thiện thành một sản phẩm phần mềm khả thi (MVP), mang lại giá trị kép cho cả cộng đồng nghệ nhân thiểu số và thế hệ người tiêu dùng văn minh.',

  dualValueCards: [
    {
      id: 'artisan-value',
      badge: 'GIÁ TRỊ KINH TẾ & SINH KẾ',
      title: 'Trao Quyền Trực Tiếp Cho Nghệ Nhân (Mô hình D2C)',
      subtitle: 'Cắt bỏ tầng nấc thương lái trung gian, giữ trọn thặng dư cho buôn làng',
      points: [
        'Mở kênh phân phối trực tiếp (Direct-to-Consumer) từ các Hợp tác xã vùng cao đến tận tay người tiêu dùng trong và ngoài nước.',
        'Cung cấp Bảng điều khiển (Seller Portal) tối giản giúp đại diện Hợp tác xã quản lý kho hàng và đơn hàng minh bạch.',
        'Giúp nghệ nhân nhận về tỷ suất lợi nhuận cao hơn hẳn phương thức bán buôn truyền thống trong khi giá tới tay khách vẫn hợp lý.',
      ],
    },
    {
      id: 'customer-heritage-value',
      badge: 'GIÁ TRỊ VĂN HÓA & TRI THỨC',
      title: 'Biến Mỗi Giao Dịch Thành Hành Trình Bảo Tồn Di Sản',
      subtitle: 'Đáp ứng cơn khát sản phẩm nguyên bản của Gen Z, Millennials & Du khách quốc tế',
      points: [
        'Không bán hàng công nghiệp đại trà – Sắc Việt bán "giá trị nguyên bản" có định vị nguồn gốc rõ ràng theo từng dân tộc.',
        'Số hóa kho tàng kiến trúc, ẩm thực, trang phục, lễ hội của 54 dân tộc Việt Nam thành Bảo tàng văn hóa số sống động.',
        'Ngăn chặn nguy cơ mai một làng nghề truyền thống và đứt gãy di sản trong kỷ nguyên số.',
      ],
    },
  ] as CoreValueCard[],

  targetCustomers: [
    {
      segment: 'Thế hệ Gen Z & Millennials (18–35 tuổi)',
      behavior: 'Ưu tiên tiêu dùng xanh, bền vững, yêu thích câu chuyện văn hóa bản địa và trải nghiệm công nghệ tương tác AI.',
    },
    {
      segment: 'Du khách Nội địa & Quốc tế',
      behavior: 'Khao khát tìm kiếm vật phẩm lưu niệm thủ công xác thực (Authentic), rõ nguồn gốc xuất xứ từ các làng nghề Việt Nam.',
    },
    {
      segment: 'Khách hàng Doanh nghiệp (B2B)',
      behavior: 'Các tập đoàn, chuỗi nhà hàng, resort sinh thái có nhu cầu đặt quà tặng văn hóa cao cấp mang đậm dấu ấn dân tộc.',
    },
  ],

  comparisonTable: [
    {
      criteria: 'Nguồn gốc & Chuỗi cung ứng',
      traditional: 'Qua nhiều tầng thương lái thu mua ép giá; hàng thủ công dễ bị trộn lẫn hàng công nghiệp đại trà.',
      sacViet: 'Ký kết trực tiếp Hợp tác xã làng nghề (D2C); định vị tọa độ xuất xứ rõ ràng trên Bản đồ số Leaflet.',
    },
    {
      criteria: 'Trải nghiệm mua sắm',
      traditional: 'Chỉ hiển thị ảnh và giá bán vật lý khô khan như các sàn TMĐT tổng hợp (Shopee, Lazada).',
      sacViet: 'Lai ghép Sàn TMĐT & Bảo tàng văn hóa số: vừa mua sắm vừa khám phá câu chuyện di sản 54 dân tộc.',
    },
    {
      criteria: 'Hỗ trợ & Tư vấn tri thức',
      traditional: 'Người mua phải tự tìm kiếm thông tin rời rạc; người bán thiếu công cụ kể chuyện văn hóa.',
      sacViet: 'Trợ lý ảo Gemini AI ("Già Làng Di Sản") giải nghĩa tức thì từng hoa văn thổ cẩm, kiến trúc, nghi lễ.',
    },
    {
      criteria: 'Chi phí vận hành & Phí sàn',
      traditional: 'Chi phí mặt bằng hoặc phí chiết khấu sàn TMĐT đại trà ngày càng cao (15% – 25%).',
      sacViet: 'Kiến trúc Serverless + Tự động hóa SEO bằng AI tiết kiệm >80% chi phí nhân sự; phí nền tảng chỉ 10% – 12%.',
    },
  ] as ComparisonPoint[],
};

export const techAndMvpModel = {
  sectionBadge: 'MỤC 2 & 3 ĐỀ ÁN • TÍNH KHẢ THI, ĐỘC ĐÁO & SẢN PHẨM THỰC TẾ',
  sectionTitle: 'Công Nghệ Lõi "Đại Dương Xanh" & Sản Phẩm MVP Hoàn Chỉnh',
  sectionSubtitle:
    'Thay vì cạnh tranh bằng giá rẻ, Sắc Việt tạo dựng rào cản gia nhập ngành (Barrier to Entry) vững chắc bằng việc kết hợp Deep Tech (Trí tuệ nhân tạo & Bản đồ số) với kho dữ liệu văn hóa bản địa.',

  techPillars: [
    {
      id: 'gemini-ai',
      badge: 'TRÍ TUỆ NHÂN TẠO',
      title: 'Trợ Lý Văn Hóa Ảo Gemini AI',
      techStack: 'Google Gemini API + Context Prompting',
      description:
        'Đóng vai trò "Già Làng Di Sản" trực tuyến 24/7. Tự động giải nghĩa họa tiết thổ cẩm, kiến trúc nhà rông, nhà mồ hay nghi lễ truyền thống dựa trên ngữ cảnh từng sản phẩm mà khách đang xem.',
      impactHighlight: 'Tự động hóa tư vấn & sản xuất bài viết SEO, tiết kiệm >80% chi phí nhân sự vận hành.',
    },
    {
      id: 'leaflet-map',
      badge: 'ĐỊNH VỊ DI SẢN',
      title: 'Bản Đồ Văn Hóa Số Tương Tác',
      techStack: 'Leaflet.js + React-Leaflet Geo-Data',
      description:
        'Bản đồ số hóa 54 dân tộc trải dài khắp Việt Nam. Người dùng nhấp vào từng tọa độ địa lý để khám phá lịch sử tộc người, di sản đặc trưng và đặt mua sản phẩm trực tiếp từ vùng đất đó.',
      impactHighlight: 'Minh bạch hóa 100% nguồn gốc xuất xứ làng nghề, kích hoạt chiến dịch "Check-in bản đồ ảo".',
    },
    {
      id: 'd2c-ecosystem',
      badge: 'THƯƠNG MẠI D2C',
      title: 'Hệ Sinh Thái Chợ Phiên & Cổng Nghệ Nhân',
      techStack: 'React 18 + TypeScript + Real-time Cart',
      description:
        'Tích hợp trọn vẹn luồng thương mại điện tử: Giỏ hàng toàn cục, đặt hàng trực tuyến, thông báo Email tự động (Nodemailer), trang Hồ sơ Nghệ nhân và Bảng điều khiển dành riêng cho Hợp tác xã.',
      impactHighlight: 'Giao diện UX tối giản, hỗ trợ đồng bào và Hợp tác xã làm chủ công nghệ dễ dàng.',
    },
    {
      id: 'serverless-cloud',
      badge: 'KIẾN TRÚC ĐÁM MÂY',
      title: 'Hạ Tầng Không Máy Chủ (Serverless)',
      techStack: 'Supabase Cloud + Vercel Edge Functions',
      description:
        'Xây dựng trên kiến trúc đám mây hiện đại giúp loại bỏ hoàn toàn chi phí đầu tư máy chủ vật lý ban đầu, tự động mở rộng (Auto-scale) theo lưu lượng truy cập thực tế.',
      impactHighlight: 'Đưa chi phí IT cố định tiệm cận mức 0, tạo lợi thế chi phí vượt trội so với đối thủ.',
    },
  ] as TechPillar[],

  mvpModules: [
    {
      id: 'map-home',
      tabName: '1. Bản Đồ Di Sản 54 Dân Tộc',
      routePath: '/#/',
      badge: 'PHÂN KHU KHÁM PHÁ',
      headline: 'Bản Đồ Số Tương Tác & Không Gian Kể Chuyện Di Sản',
      description:
        'Ngay tại Trang chủ, người dùng có thể tương tác với Bản đồ số Việt Nam để tra cứu phân bố dân cư, nét đẹp văn hóa và câu chuyện cội nguồn của toàn bộ 54 dân tộc anh em.',
      imageUrl: '/assets/showcase/lung-tam-cover.jpg',
      keyFeatures: [
        'Định vị tọa độ 54 dân tộc trên bản đồ cổ điển trực quan',
        'Hiển thị nhanh dân số, địa bàn cư trú và di sản tiêu biểu',
        'Cửa sổ kể chuyện văn hóa chuyên sâu (Story Modal) giàu cảm xúc',
      ],
      liveActionText: 'Mở Trang Chủ & Bản Đồ Số',
    },
    {
      id: 'marketplace',
      tabName: '2. Chợ Phiên Bản Bản (Marketplace)',
      routePath: '/#/marketplace',
      badge: 'PHÂN KHU THƯƠNG MẠI D2C',
      headline: 'Sàn Giao Dịch Thủ Công Mỹ Nghệ Nguyên Bản',
      description:
        'Nơi hội tụ hàng trăm sản phẩm thủ công từ gốm Bàu Trúc, thổ cẩm Tây Bắc, gùi mây Tây Nguyên đến nhạc cụ dân tộc. Mỗi sản phẩm đều gắn liền với tên tuổi nghệ nhân và câu chuyện chế tác.',
      imageUrl: '/assets/showcase/tui-tho-cam.jpg',
      keyFeatures: [
        'Bộ lọc thông minh theo từng dân tộc, vùng miền và danh mục',
        'Giỏ hàng trực tuyến, thanh toán và theo dõi trạng thái đơn hàng',
        'Tích hợp nút hỏi Trợ lý Gemini AI ngay trong quá trình mua sắm',
      ],
      liveActionText: 'Trải Nghiệm Chợ Phiên Thực Tế',
    },
    {
      id: 'artisans-portal',
      tabName: '3. Hồ Sơ & Cổng Nghệ Nhân',
      routePath: '/#/artisans',
      badge: 'PHÂN KHU HỢP TÁC XÃ',
      headline: 'Tôn Vinh Đôi Bàn Tay Vàng & Quản Trị Kho Minh Bạch',
      description:
        'Mỗi nghệ nhân và Hợp tác xã sở hữu một trang hồ sơ vinh danh riêng kèm Cổng người bán (Seller Portal) giúp đăng tải sản phẩm, cập nhật tồn kho và xử lý đơn đặt hàng trực tiếp.',
      imageUrl: '/assets/showcase/artisan-loom.jpg',
      keyFeatures: [
        'Trang vinh danh câu chuyện cuộc đời và kỹ nghệ của từng nghệ nhân',
        'Bảng điều khiển (Seller Portal) tối giản hóa cho đại diện Hợp tác xã',
        'Cơ chế kiểm duyệt chất lượng (Artisan Moderation) đảm bảo uy tín',
      ],
      liveActionText: 'Khám Phá Khu Vực Nghệ Nhân',
    },
    {
      id: 'library-community',
      tabName: '4. Thư Viện Số, Blog SEO & Cộng Đồng',
      routePath: '/#/library',
      badge: 'PHÂN KHU TRI THỨC & LAN TỎA',
      headline: 'Bảo Tàng Số Sống Động & Mạng Xã Hội Yêu Văn Hóa Việt',
      description:
        'Kho lưu trữ số hóa kiến trúc, lễ hội, ẩm thực kết hợp chuyên trang Blog chuẩn SEO (tự động hóa bởi AI) và diễn đàn Cộng đồng nơi người trẻ chia sẻ trải nghiệm du lịch văn hóa.',
      imageUrl: '/assets/showcase/cham-pottery.jpg',
      keyFeatures: [
        'Thư viện tra cứu di sản phân loại theo Kiến trúc, Lễ hội, Ẩm thực, Trang phục',
        'Hệ thống Blog SEO tự động thu hút lưu lượng truy cập tự nhiên (Organic Traffic)',
        'Không gian Cộng đồng đăng bài, bình luận và lan tỏa niềm tự hào dân tộc',
      ],
      liveActionText: 'Xem Thư Viện Di Sản Số',
    },
  ] as MvpModulePreview[],
};

export const operationsModel = {
  sectionBadge: 'MỤC 4 ĐỀ ÁN • KẾ HOẠCH SẢN XUẤT, KINH DOANH & CHUỖI CUNG ỨNG',
  sectionTitle: 'Lộ Trình Vận Hành Song Song & Chiến Lược Phân Phối O2O',
  sectionSubtitle:
    'Kết hợp chặt chẽ giữa chuẩn hóa chuỗi cung ứng tại các Hợp tác xã làng nghề và sức mạnh phân phối đa kênh Online-to-Offline (O2O), sẵn sàng vươn tới xuất khẩu văn hóa xuyên biên giới.',

  supplyChainSteps: [
    {
      stepNumber: 'BƯỚC 01',
      title: 'Ký Kết MOU Hợp Tác Xã Điểm',
      subtitle: 'Giai đoạn Go-to-Market',
      description:
        'Ký biên bản ghi nhớ (MOU) trực tiếp với các Hợp tác xã và tổ hợp tác tiêu biểu (Làng gốm Bàu Trúc, Làng dệt thổ cẩm Tây Bắc, Tây Nguyên) để số hóa danh mục sản phẩm đưa lên sàn.',
      highlightTag: 'Tận gốc – Không qua thương lái',
    },
    {
      stepNumber: 'BƯỚC 02',
      title: 'Kiểm Định Chất Lượng & Số Hóa Kho',
      subtitle: 'Chuẩn hóa đầu ra tại địa phương',
      description:
        'Thiết lập cơ chế kiểm định 2 lớp thông qua Trưởng các Hợp tác xã. Cung cấp Dashboard quản lý kho hàng tự động giúp đồng bộ số lượng sản phẩm thủ công theo thời gian thực.',
      highlightTag: 'Cam kết 100% thủ công nguyên bản',
    },
    {
      stepNumber: 'BƯỚC 03',
      title: 'Kênh Phân Phối O2O (Online-to-Offline)',
      subtitle: 'Kết nối trải nghiệm số & điểm chạm thực tế',
      description:
        'Kênh Online (Website Sắc Việt) làm lõi giao dịch D2C; Kênh Offline đặt hệ thống mã QR Code tương tác tại các Bảo tàng, Homestay sinh thái, khu du lịch để du khách quét mã xem câu chuyện & đặt hàng.',
      highlightTag: 'Trải nghiệm tại chỗ – Giao hàng tận nhà',
    },
    {
      stepNumber: 'BƯỚC 04',
      title: 'Logistics Tuyến Xã & Xuất Khẩu Văn Hóa',
      subtitle: 'Tích hợp API Bưu chính sâu rộng',
      description:
        'Tích hợp API cùng VNPost và Viettel Post có mạng lưới bưu cục phủ kín tới tận cấp xã vùng cao, kết hợp quy chuẩn đóng gói chống sốc thân thiện môi trường, tiến tới thương mại xuyên biên giới.',
      highlightTag: 'Phủ sóng toàn quốc & Quốc tế',
    },
  ] as SupplyChainStep[],

  riskManagement: [
    {
      riskTitle: 'Rủi ro 1: Hạn chế về kỹ năng số của nghệ nhân vùng cao',
      challenge: 'Nhiều nghệ nhân lớn tuổi chưa quen thao tác trên các phần mềm quản lý phức tạp.',
      mitigation:
        'Thiết kế luồng UX tối giản nhất; triển khai mô hình "Đại diện Hợp tác xã" (người trẻ tại bản làng) làm đầu mối vận hành Dashboard cùng đội ngũ sinh viên hỗ trợ trực tiếp giai đoạn đầu.',
    },
    {
      riskTitle: 'Rủi ro 2: Tính không đồng đều của sản phẩm thủ công & Hàng dễ vỡ',
      challenge: 'Sản phẩm làm bằng tay có sai số tự nhiên và dễ hư hại khi vận chuyển đường đèo núi xa.',
      mitigation:
        'Áp dụng quy trình kiểm định chất lượng qua Trưởng HTX trước khi xuất kho; ban hành bộ tiêu chuẩn đóng gói chống sốc sinh thái (tre, giấy tái chế) và bảo hiểm hàng hóa cùng đối tác bưu chính.',
    },
    {
      riskTitle: 'Rủi ro 3: Cạnh tranh từ các sàn TMĐT tổng hợp lớn',
      challenge: 'Các sàn lớn có ngân sách khuyến mãi khổng lồ cho hàng tiêu dùng phổ thông.',
      mitigation:
        'Đi theo chiến lược "Đại dương xanh": cạnh tranh bằng hàm lượng tri thức văn hóa, trợ lý Gemini AI, bản đồ định vị di sản và cam kết tác động xã hội minh bạch mà sàn đại trà không thể sao chép.',
    },
  ] as RiskSolutionItem[],
};
