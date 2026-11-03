import { MarketingStage, MarketingKpi } from './types';

/**
 * ============================================================================
 * [MODEL 5] CHIẾN LƯỢC & NỘI DUNG TRUYỀN THÔNG (marketingModel.ts)
 * ============================================================================
 * -> Chứa toàn bộ nội dung Mục 7 Đề án (Các kênh truyền thông) theo yêu cầu của BTC.
 */

export const marketingModel = {
  sectionBadge: 'HẠNG MỤC 02 & MỤC 7 ĐỀ ÁN • KẾ HOẠCH & NỘI DUNG TRUYỀN THÔNG',
  sectionTitle: 'Chiến dịch truyền thông công nghệ: "Chạm vào di sản"',
  sectionSubtitle:
    'Chiến lược truyền thông của Sắc Việt được cấu trúc theo phễu chuyển đổi (Marketing Funnel) lấy công nghệ làm động lực, kết hợp sức lan tỏa của video ngắn với trải nghiệm tương tác AI và bản đồ số.',

  flagshipCampaign: {
    badge: 'CHIẾN DỊCH TIẾP THỊ BẰNG CÔNG NGHỆ ĐỘC ĐÁO',
    title: 'Sự kiện tương tác: "Check-in bản đồ ảo – Sưu tầm ấn sắc di sản"',
    description:
      'Thay vì phát mã giảm giá đơn thuần, người dùng tham gia khám phá trên Bản đồ Leaflet của Sắc Việt, trả lời câu đố văn hóa ngắn cùng Trợ lý Gemini AI tại từng vùng đất (Tây Bắc, Tây Nguyên, Duyên hải Chăm...) để sưu tầm bộ "Huy hiệu di sản số" và quy đổi thành chiết khấu mua sắm thực tế.',
    highlights: [
      'Biến quá trình tìm hiểu kiến thức 54 dân tộc thành trò chơi hóa (Gamification) cuốn hút Gen Z',
      'Khuyến khích người dùng chia sẻ thành tích sưu tầm lên TikTok/Facebook kèm hashtag #SacViet #ChamVaoDiSan',
      'Tối ưu hóa chi phí thu hút khách hàng mới (CAC) nhờ cơ chế lan truyền tự nhiên (Viral Loop)',
    ],
  },

  funnelStages: [
    {
      stageNumber: 'GIAI ĐOẠN 01',
      phaseName: 'AWARENESS',
      vietnameseName: 'Nhận diện & khơi gợi tự hào văn hóa',
      objective: 'Lan tỏa thông điệp chủ đạo "Chạm vào di sản", chạm tới cảm xúc của người trẻ về vẻ đẹp lao động thủ công.',
      coreMessage: '"Mỗi đường thổ cẩm, mỗi nét gốm nung là một di sản sống đang chờ bạn chạm tới."',
      activities: [
        'Sản xuất chuỗi Short Video chất lượng điện ảnh ghi lại đôi bàn tay nghệ nhân dệt lanh, nặn gốm Bàu Trúc, đan gùi.',
        'Kể chuyện (Storytelling) về sự đối lập giữa nguy cơ mai một làng nghề và sức sống mới nhờ kết nối số.',
        'Đồng bộ bộ nhận diện thương hiệu Sắc Việt (Đỏ Son – Vàng Đồng – Giấy Dó) trên toàn bộ điểm chạm.',
      ],
      channels: ['TikTok (Kênh chủ lực Gen Z)', 'Instagram Reels', 'YouTube Shorts'],
    },
    {
      stageNumber: 'GIAI ĐOẠN 02',
      phaseName: 'ENGAGEMENT',
      vietnameseName: 'Tương tác công nghệ & trải nghiệm số',
      objective: 'Kéo lưu lượng người dùng vào Website Sắc Việt trải nghiệm Bản đồ di sản và trò chuyện cùng AI.',
      coreMessage: '"Trò chuyện cùng Già Làng AI – Check-in bản đồ 54 dân tộc để nhận đặc quyền chợ phiên."',
      activities: [
        'Kích hoạt chiến dịch "Check-in Bản đồ ảo" trên nền tảng Leaflet để sưu tầm huy hiệu văn hóa đổi ưu đãi.',
        'Thử thách tương tác cùng Chatbot Gemini AI giải mã ý nghĩa hoa văn truyền thống nhận Voucher mua sắm.',
        'Đặt bảng mã QR O2O tại các Homestay sinh thái, quán cà phê văn hóa và không gian triển lãm sinh viên.',
      ],
      channels: ['Website Sắc Việt (Interactive Map & AI)', 'Facebook Fanpage & Group Cộng đồng', 'Điểm chạm QR O2O'],
    },
    {
      stageNumber: 'GIAI ĐOẠN 03',
      phaseName: 'CONVERSION & ADVOCACY',
      vietnameseName: 'Chuyển đổi mua sắm & đại sứ cộng đồng (UGC)',
      objective: 'Thúc đẩy đơn hàng D2C/B2B bền vững và biến khách hàng thành người lan tỏa giá trị xã hội.',
      coreMessage: '"Mua một sản phẩm nguyên bản – Góp một phần sinh kế minh bạch gửi về bản làng."',
      activities: [
        'Công bố minh bạch Báo cáo Tác động Xã hội (tỷ lệ thu nhập chuyển trực tiếp về Hợp tác xã và nghệ nhân).',
        'Khuyến khích khách hàng đăng tải nội dung tự sản xuất (UGC) đập hộp sản phẩm kèm thiệp cảm ơn từ nghệ nhân.',
        'Vận hành hệ thống Thư viện & Blog chuẩn SEO tự động bằng AI để thu hút nguồn Organic Traffic miễn phí dài hạn.',
      ],
      channels: ['Hệ thống Blog SEO Sắc Việt', 'Cộng đồng Sắc Việt (In-app Community)', 'Email Marketing tự động'],
    },
  ] as MarketingStage[],

  mediaTools: [
    {
      title: 'Bộ nhận diện thương hiệu di sản',
      detail: 'Chuẩn hóa bảng màu Đỏ Son – Vàng Hoàng Kim – Nền Giấy Dó cùng ngôn ngữ thiết kế giao thoa truyền thống và hiện đại.',
    },
    {
      title: 'Kho tư liệu hình ảnh bản địa thực tế',
      detail: 'Hệ thống hình ảnh chất lượng cao phân loại theo 54 dân tộc, làng nghề và chân dung nghệ nhân thực tế.',
    },
    {
      title: 'Hệ thống blog SEO tự động hóa bằng AI',
      detail: 'Ứng dụng Gemini AI hỗ trợ biên tập hàng trăm bài viết chuyên sâu về văn hóa, kéo lưu lượng tìm kiếm Google tự nhiên.',
    },
  ],

  kpis: [
    {
      metricCode: 'CTR',
      metricName: 'Click-Through Rate (Tỷ lệ nhấp)',
      targetValue: '3.5% – 5.0%',
      description: 'Đo lường sức hút của chuỗi Short Video "Chạm vào di sản" và chiến dịch QR O2O dẫn về Website.',
    },
    {
      metricCode: 'CAC',
      metricName: 'Customer Acquisition Cost (Chi phí/Khách hàng mới)',
      targetValue: 'Tối ưu ở mức thấp',
      description: 'Nhờ tận dụng lưu lượng tự nhiên (Organic Traffic) từ kho Blog SEO AI và hiệu ứng lan truyền Check-in bản đồ.',
    },
    {
      metricCode: 'ROAS',
      metricName: 'Return On Ad Spend (Lợi nhuận/Chi phí quảng cáo)',
      targetValue: '3.5x – 4.5x',
      description: 'Tập trung ngân sách vào tệp khách hàng ngách có tỷ lệ chuyển đổi cao và các chiến dịch quảng bá sản phẩm chủ lực.',
    },
    {
      metricCode: 'UGC & Retention',
      metricName: 'Tỷ lệ khách hàng quay lại & Chia sẻ nội dung',
      targetValue: '>25% quay lại',
      description: 'Chính sách chăm sóc chu đáo và chất lượng sản phẩm nguyên bản giúp giữ chân khách hàng yêu văn hóa.',
    },
  ] as MarketingKpi[],
};
