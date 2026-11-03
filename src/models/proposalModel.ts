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
  sectionTitle: 'Giải quyết đứt gãy giữa nghệ nhân vùng cao & thị trường hiện đại',
  sectionSubtitle:
    'Việt Nam có khoảng 5.400 làng nghề và làng có nghề [1] nhưng đang đối mặt nguy cơ mai một do thiếu kênh tiêu thụ số. Sắc Việt đã lập trình hoàn thiện giải pháp MVP, mang lại giá trị kép cho cộng đồng nghệ nhân và người tiêu dùng.',

  dualValueCards: [
    {
      id: 'artisan-value',
      badge: 'GIÁ TRỊ KINH TẾ & SINH KẾ',
      title: 'Trao quyền trực tiếp cho nghệ nhân (Mô hình D2C)',
      subtitle: 'Cắt bỏ tầng nấc thương lái trung gian, giữ trọn thặng dư cho buôn làng',
      points: [
        'Mở kênh phân phối trực tiếp (Direct-to-Consumer) từ các Hợp tác xã vùng cao đến người tiêu dùng trong và ngoài nước.',
        'Cung cấp Kênh Nghệ nhân (Seller Portal) tối giản giúp đại diện Hợp tác xã quản lý kho hàng và đơn hàng minh bạch.',
        'Giúp nghệ nhân nhận về tỷ suất lợi nhuận cao hơn hẳn phương thức bán buôn truyền thống trong khi giá tới tay khách vẫn hợp lý.',
      ],
    },
    {
      id: 'customer-heritage-value',
      badge: 'GIÁ TRỊ VĂN HÓA & TRI THỨC',
      title: 'Biến mỗi giao dịch thành hành trình bảo tồn di sản',
      subtitle: 'Đáp ứng nhu cầu sản phẩm nguyên bản của Gen Z, Millennials & du khách quốc tế',
      points: [
        'Không bán hàng công nghiệp đại trà – Sắc Việt định vị rõ nguồn gốc văn hóa nguyên bản theo từng dân tộc.',
        'Số hóa kho tàng kiến trúc, ẩm thực, trang phục, lễ hội của 54 dân tộc Việt Nam thành bảo tàng văn hóa số sống động.',
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
      segment: 'Du khách nội địa & quốc tế',
      behavior: 'Khao khát tìm kiếm vật phẩm lưu niệm thủ công xác thực (Authentic), rõ nguồn gốc xuất xứ từ các làng nghề Việt Nam.',
    },
    {
      segment: 'Khách hàng doanh nghiệp (B2B)',
      behavior: 'Các tập đoàn, chuỗi nhà hàng, resort sinh thái có nhu cầu đặt quà tặng văn hóa mang đậm dấu ấn dân tộc.',
    },
  ],

  comparisonTable: [
    {
      criteria: 'Nguồn gốc & chuỗi cung ứng',
      traditional: 'Qua nhiều tầng thương lái thu mua ép giá; hàng thủ công dễ bị trộn lẫn hàng công nghiệp đại trà.',
      sacViet: 'Ký kết trực tiếp Hợp tác xã làng nghề (D2C); định vị tọa độ xuất xứ rõ ràng trên Bản đồ số Leaflet.',
    },
    {
      criteria: 'Trải nghiệm mua sắm',
      traditional: 'Chỉ hiển thị ảnh và giá bán vật lý khô khan như các sàn TMĐT tổng hợp (Shopee, Lazada).',
      sacViet: 'Lai ghép sàn TMĐT & bảo tàng văn hóa số: vừa mua sắm vừa khám phá câu chuyện di sản 54 dân tộc.',
    },
    {
      criteria: 'Hỗ trợ & tư vấn tri thức',
      traditional: 'Người mua phải tự tìm kiếm thông tin rời rạc; người bán thiếu công cụ kể chuyện văn hóa.',
      sacViet: 'Trợ lý ảo Gemini AI ("Già Làng Di Sản") giải nghĩa tức thì từng hoa văn thổ cẩm, kiến trúc, nghi lễ.',
    },
    {
      criteria: 'Chi phí vận hành & phí sàn',
      traditional: 'Chi phí mặt bằng hoặc phí bán hàng sàn TMĐT đại trà ngày càng cao (phí khoảng 15% – 18%, tổng chi phí có thể trên 25%) [2].',
      sacViet: 'Kiến trúc Serverless + tự động hóa SEO bằng AI; phí nền tảng chỉ 10% (nghệ nhân nhận 90% giá bán).',
    },
  ] as ComparisonPoint[],
};

export const techAndMvpModel = {
  sectionBadge: 'MỤC 2 & 3 ĐỀ ÁN • TÍNH KHẢ THI, ĐỘC ĐÁO & SẢN PHẨM THỰC TẾ',
  sectionTitle: 'Công nghệ lõi "Đại dương xanh" & sản phẩm MVP hoàn chỉnh',
  sectionSubtitle:
    'Thay vì cạnh tranh bằng giá rẻ, Sắc Việt tạo dựng rào cản gia nhập ngành (Barrier to Entry) vững chắc bằng việc kết hợp Deep Tech (Trí tuệ nhân tạo & Bản đồ số) với kho dữ liệu văn hóa bản địa.',

  techPillars: [
    {
      id: 'gemini-ai',
      badge: 'TRÍ TUỆ NHÂN TẠO',
      title: 'Trợ lý văn hóa ảo Gemini AI',
      techStack: 'Google Gemini API + Context Prompting',
      description:
        'Đóng vai trò "Già Làng Di Sản" trực tuyến 24/7. Tự động giải nghĩa họa tiết thổ cẩm, kiến trúc nhà rông, nhà mồ hay nghi lễ truyền thống dựa trên ngữ cảnh từng sản phẩm mà khách đang xem.',
      impactHighlight: 'Tự động hóa tư vấn & sản xuất bài viết SEO, tối ưu chi phí vận hành.',
    },
    {
      id: 'leaflet-map',
      badge: 'ĐỊNH VỊ DI SẢN',
      title: 'Bản đồ văn hóa số tương tác',
      techStack: 'Leaflet.js + React-Leaflet Geo-Data',
      description:
        'Bản đồ số hóa 54 dân tộc trải dài khắp Việt Nam. Người dùng nhấp vào từng tọa độ địa lý để khám phá lịch sử tộc người, di sản đặc trưng và đặt mua sản phẩm trực tiếp từ vùng đất đó.',
      impactHighlight: 'Minh bạch hóa nguồn gốc xuất xứ làng nghề, kích hoạt chiến dịch "Check-in bản đồ ảo".',
    },
    {
      id: 'd2c-ecosystem',
      badge: 'THƯƠNG MẠI D2C',
      title: 'Hệ sinh thái chợ phiên & Kênh Nghệ nhân',
      techStack: 'React 18 + TypeScript + Real-time Cart',
      description:
        'Tích hợp luồng thương mại điện tử: Giỏ hàng toàn cục, đặt hàng trực tuyến, thông báo email tự động, trang hồ sơ nghệ nhân và bảng điều khiển dành riêng cho Hợp tác xã.',
      impactHighlight: 'Giao diện UX tối giản, hỗ trợ đồng bào và Hợp tác xã làm chủ công nghệ dễ dàng.',
    },
    {
      id: 'serverless-cloud',
      badge: 'KIẾN TRÚC ĐÁM MÂY',
      title: 'Hạ tầng không máy chủ (Serverless)',
      techStack: 'Supabase Cloud + Vercel Edge Functions',
      description:
        'Xây dựng trên kiến trúc đám mây hiện đại giúp loại bỏ chi phí máy chủ vật lý ban đầu, tự động mở rộng (Auto-scale) theo lưu lượng truy cập thực tế.',
      impactHighlight: 'Đưa chi phí IT cố định tiệm cận mức tối thiểu, tạo lợi thế chi phí so với đối thủ.',
    },
  ] as TechPillar[],

  mvpModules: [
    {
      id: 'map-home',
      tabName: '1. Bản đồ 54 dân tộc',
      routePath: '/#/',
      badge: 'PHÂN KHU KHÁM PHÁ BẢN ĐỒ',
      headline: 'Bản đồ số di sản tương tác 54 dân tộc',
      description:
        'Ngay tại Trang chủ, người dùng tương tác với bản đồ số Việt Nam để tra cứu phân bố dân cư, nét đẹp văn hóa và câu chuyện cội nguồn của toàn bộ 54 dân tộc anh em.',
      imageUrl: '/assets/showcase/mvp-map.webp',
      imageAlt: 'Giao diện Bản đồ số di sản tương tác 54 dân tộc',
      keyFeatures: [
        'Định vị tọa độ 54 dân tộc trên bản đồ số trực quan',
        'Hiển thị nhanh dân số, địa bàn cư trú và di sản tiêu biểu',
        'Cửa sổ kể chuyện văn hóa chuyên sâu (Story Modal) giàu cảm xúc',
      ],
      liveActionText: 'Mở trang chủ & bản đồ số',
    },
    {
      id: 'marketplace',
      tabName: '2. Chợ phiên bản địa',
      routePath: '/#/marketplace',
      badge: 'PHÂN KHU THƯƠNG MẠI D2C',
      headline: 'Sản phẩm chợ phiên nguyên bản kèm định danh nghệ nhân',
      description:
        'Nơi hội tụ hàng trăm sản phẩm thủ công từ gốm Bàu Trúc, thổ cẩm Tây Bắc, gùi mây Tây Nguyên đến nhạc cụ dân tộc. Mỗi sản phẩm đều gắn liền với tên tuổi nghệ nhân và câu chuyện chế tác.',
      imageUrl: '/assets/showcase/mvp-marketplace.webp',
      imageAlt: 'Giao diện Chợ phiên thủ công nguyên bản kèm định danh nghệ nhân',
      keyFeatures: [
        'Bộ lọc thông minh theo từng dân tộc, vùng miền và danh mục',
        'Giỏ hàng trực tuyến, thanh toán và theo dõi trạng thái đơn hàng',
        'Tích hợp nút hỏi Trợ lý Gemini AI ngay trong quá trình mua sắm',
      ],
      liveActionText: 'Trải nghiệm chợ phiên thực tế',
    },
    {
      id: 'artisans-portal',
      tabName: '3. Kênh Nghệ nhân',
      routePath: '/#/artisans',
      badge: 'PHÂN KHU HỢP TÁC XÃ',
      headline: 'Kênh Nghệ nhân & quản trị kho minh bạch',
      description:
        'Mỗi nghệ nhân và Hợp tác xã sở hữu một trang hồ sơ vinh danh riêng kèm Cổng người bán (Seller Portal) giúp đăng tải sản phẩm, cập nhật tồn kho và xử lý đơn đặt hàng trực tiếp.',
      imageUrl: '/assets/showcase/mvp-artisan-portal.webp',
      isPlaceholderImage: false,
      imageAlt: 'Giao diện Kênh Nghệ nhân và Hợp tác xã Sắc Việt',
      keyFeatures: [
        'Trang vinh danh câu chuyện cuộc đời và kỹ nghệ của từng nghệ nhân',
        'Bảng điều khiển (Seller Portal) tối giản hóa cho đại diện Hợp tác xã',
        'Cơ chế kiểm duyệt chất lượng (Artisan Moderation) bảo đảm uy tín',
      ],
      liveActionText: 'Khám phá Kênh Nghệ nhân',
    },
    {
      id: 'library-community',
      tabName: '4. Thư viện số & blog',
      routePath: '/#/library',
      badge: 'PHÂN KHU TRI THỨC DI SẢN',
      headline: 'Thư viện di sản và không gian số hóa tri thức 54 dân tộc',
      description:
        'Kho lưu trữ số hóa kiến trúc, lễ hội, ẩm thực kết hợp chuyên trang Blog chuẩn SEO (tự động hóa bởi AI) và diễn đàn Cộng đồng nơi người trẻ chia sẻ trải nghiệm du lịch văn hóa.',
      imageUrl: '/assets/showcase/mvp-library.png',
      imageAlt: 'Giao diện Thư viện di sản và không gian số hóa tri thức 54 dân tộc',
      keyFeatures: [
        'Thư viện tra cứu di sản phân loại theo Kiến trúc, Lễ hội, Ẩm thực, Trang phục',
        'Hệ thống Blog SEO tự động thu hút lưu lượng truy cập tự nhiên (Organic Traffic)',
        'Không gian cộng đồng chia sẻ và lan tỏa niềm tự hào dân tộc',
      ],
      liveActionText: 'Xem thư viện di sản số',
    },
    {
      id: 'ai-assistant',
      tabName: '5. Trợ lý AI Già Làng',
      routePath: '/#/ai-assistant',
      badge: 'PHÂN KHU TRÍ TUỆ NHÂN TẠO',
      headline: 'Khung tương tác Trợ lý ảo Già Làng AI di sản',
      description:
        'Tích hợp Trợ lý Trí tuệ nhân tạo Gemini AI đóng vai trò như một "Già Làng Di Sản Trực Tuyến", giải thích tức thời ý nghĩa từng hoa văn, kiến trúc hay phong tục cho khách hàng.',
      imageUrl: '/assets/showcase/mvp-ai-assistant.webp',
      imageAlt: 'Giao diện Khung tương tác Trợ lý ảo Già Làng AI Di Sản',
      keyFeatures: [
        'Tự động nhận diện ngữ cảnh từng sản phẩm khách đang duyệt',
        'Giải thích tức thời ý nghĩa hoa văn thổ cẩm và phong tục',
        'Hỗ trợ tự động hóa khâu sản xuất nội dung bài viết SEO',
      ],
      liveActionText: 'Trò chuyện cùng Già Làng AI',
    },
  ] as MvpModulePreview[],
};

export const operationsModel = {
  sectionBadge: 'MỤC 4 ĐỀ ÁN • KẾ HOẠCH SẢN XUẤT, KINH DOANH & CHUỖI CUNG ỨNG',
  sectionTitle: 'Lộ trình vận hành song song & chiến lược phân phối O2O',
  sectionSubtitle:
    'Kết hợp chặt chẽ giữa chuẩn hóa chuỗi cung ứng tại các Hợp tác xã làng nghề và sức mạnh phân phối đa kênh Online-to-Offline (O2O), hướng tới mở rộng thị trường bền vững.',

  supplyChainSteps: [
    {
      stepNumber: 'BƯỚC 01',
      title: 'Ký kết MOU Hợp tác xã điểm',
      subtitle: 'Giai đoạn Go-to-Market',
      description:
        'Ký biên bản ghi nhớ (MOU) trực tiếp với các Hợp tác xã và tổ hợp tác tiêu biểu (Làng gốm Bàu Trúc, Làng dệt thổ cẩm Tây Bắc, Tây Nguyên) để số hóa danh mục sản phẩm đưa lên sàn.',
      highlightTag: 'Khảo sát tận gốc – kết nối trực tiếp',
    },
    {
      stepNumber: 'BƯỚC 02',
      title: 'Kiểm định chất lượng & số hóa kho',
      subtitle: 'Chuẩn hóa đầu ra tại địa phương',
      description:
        'Thiết lập cơ chế kiểm định 2 lớp thông qua Trưởng các Hợp tác xã. Cung cấp Dashboard quản lý kho hàng giúp đồng bộ số lượng sản phẩm thủ công.',
      highlightTag: 'Kiểm định chất lượng qua đại diện HTX',
    },
    {
      stepNumber: 'BƯỚC 03',
      title: 'Kênh phân phối O2O (Online-to-Offline)',
      subtitle: 'Kết nối trải nghiệm số & điểm chạm thực tế',
      description:
        'Kênh Online (Website Sắc Việt) làm lõi giao dịch D2C; Kênh Offline đặt hệ thống mã QR Code tương tác tại các Bảo tàng, Homestay sinh thái, khu du lịch để du khách quét mã xem câu chuyện & đặt hàng.',
      highlightTag: 'Trải nghiệm tại chỗ – giao hàng tận nhà',
    },
    {
      stepNumber: 'BƯỚC 04',
      title: 'Logistics tuyến xã & mở rộng thị trường',
      subtitle: 'Tích hợp API bưu chính diện rộng',
      description:
        'Tích hợp API cùng các đơn vị bưu chính (VNPost, Viettel Post) có mạng lưới bưu cục phủ rộng tới tận cấp xã, kết hợp quy chuẩn đóng gói chống sốc thân thiện môi trường.',
      highlightTag: 'Mạng lưới bưu chính tuyến xã',
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
      riskTitle: 'Rủi ro 2: Tính không đồng đều của sản phẩm thủ công & hàng dễ vỡ',
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
