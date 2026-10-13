import { RevenueStream, YearlyProjection, FinancialMetric } from './types';

/**
 * ============================================================================
 * [MODEL 4] DỮ LIỆU TÀI CHÍNH, DOANH THU & GỌI VỐN (financialModel.ts)
 * ============================================================================
 * -> Chứa toàn bộ số liệu của Mục 5 (Kết quả tiềm năng) & Mục 6 (Huy động vốn).
 * -> Bạn có thể chỉnh sửa tỷ lệ hoa hồng, chi phí CAPEX/OPEX, doanh thu dự kiến tại đây.
 */

export const financialModel = {
  sectionBadge: 'MỤC 5 & 6 ĐỀ ÁN • KẾT QUẢ TIỀM NĂNG & KẾ HOẠCH VỐN',
  sectionTitle: 'Mô Hình Tài Chính Tinh Gọn & Lộ Trình Tăng Trưởng Bền Vững',
  sectionSubtitle:
    'Nhờ lợi thế tự chủ lập trình công nghệ lõi và kiến trúc đám mây Serverless, Sắc Việt nén tối đa chi phí khởi tạo (CAPEX), đạt biên lợi nhuận ròng 20% – 25% và dự kiến hòa vốn ngay trong tháng thứ 10 – 12 của năm đầu tiên.',

  keyMetrics: [
    {
      label: 'Chi Phí Khởi Tạo (CAPEX)',
      value: '50 – 70 Triệu VNĐ',
      subtext: 'Pháp lý, máy chủ ban đầu & thiết kế nhận diện (Nhóm đã tự chủ 100% chi phí code R&D)',
      highlight: false,
    },
    {
      label: 'Chi Phí Vận Hành (OPEX)',
      value: '30 – 45 Triệu / Tháng',
      subtext: 'Phân bổ tối ưu cho phí API AI/Cloud, Marketing chuyển đổi và nhân sự vận hành lõi',
      highlight: false,
    },
    {
      label: 'Biên Lợi Nhuận Ròng',
      value: '20% – 25%',
      subtext: 'Nhờ tự động hóa >80% khâu sản xuất nội dung SEO và chăm sóc khách hàng bằng AI',
      highlight: true,
    },
    {
      label: 'Thời Điểm Hòa Vốn (Break-even)',
      value: 'Tháng Thứ 10 – 12',
      subtext: 'Đạt điểm hòa vốn ngay trong năm đầu tiên với ~500 đơn B2C/tháng kết hợp hợp đồng B2B',
      highlight: true,
    },
  ] as FinancialMetric[],

  revenueStreams: [
    {
      id: 'commission',
      name: '1. Phí Hoa Hồng Nền Tảng (Commission Fee)',
      rateOrScale: '10% – 12% / giao dịch',
      description:
        'Trích xuất tự động trên mỗi đơn hàng D2C thành công. Mức phí thấp hơn nhiều so với sàn TMĐT đại trà giúp nghệ nhân giữ lại tối đa lợi nhuận mà giá bán lẻ vẫn cạnh tranh.',
      sharePercent: 55,
    },
    {
      id: 'b2b-gifts',
      name: '2. Hợp Đồng Quà Tặng Văn Hóa Doanh Nghiệp (B2B)',
      rateOrScale: 'Theo hợp đồng & Bộ sưu tập',
      description:
        'Cung cấp các bộ quà tặng thủ công mang đậm bản sắc dân tộc kèm câu chuyện di sản cho các doanh nghiệp, ngân hàng, chuỗi nhà hàng và resort sinh thái.',
      sharePercent: 30,
    },
    {
      id: 'value-added-ads',
      name: '3. Dịch Vụ Gia Tăng & Xúc Tiến Du Lịch Địa Phương',
      rateOrScale: 'Gói tài trợ & Hiển thị ưu tiên',
      description:
        'Khai thác doanh thu từ gói hiển thị nổi bật trên Bản đồ di sản số và chiến dịch quảng bá dành cho các địa phương, hợp tác xã muốn thúc đẩy du lịch văn hóa.',
      sharePercent: 15,
    },
  ] as RevenueStream[],

  yearlyProjections: [
    {
      year: 'Năm Thứ 1',
      phaseName: 'Thâm Nhập Thị Trường & Hòa Vốn',
      revenueRange: '800 Triệu – 1,2 Tỷ VNĐ',
      revenueNumericMaxBillion: 1.2,
      targetOrders: '~500 đơn B2C/tháng + Hợp đồng B2B điểm',
      keyMilestone: 'Ký kết các HTX điểm (Bàu Trúc, Tây Bắc), vận hành O2O và cán đích hòa vốn ở tháng 10–12.',
    },
    {
      year: 'Năm Thứ 2',
      phaseName: 'Mở Rộng Mạng Lưới HTX Toàn Quốc',
      revenueRange: '2,0 Tỷ – 2,8 Tỷ VNĐ',
      revenueNumericMaxBillion: 2.8,
      targetOrders: '~1.200 đơn B2C/tháng + Mở rộng đối tác Resort/Bảo tàng',
      keyMilestone: 'Phủ rộng mạng lưới QR O2O tại các điểm du lịch trọng điểm và chuẩn hóa kho vận tự động.',
    },
    {
      year: 'Năm Thứ 3',
      phaseName: 'Đa Ngôn Ngữ & Xuất Khẩu Văn Hóa',
      revenueRange: '3,5 Tỷ – 5,0 Tỷ VNĐ',
      revenueNumericMaxBillion: 5.0,
      targetOrders: '~2.500+ đơn/tháng + Thương mại xuyên biên giới',
      keyMilestone: 'Kích hoạt đa ngôn ngữ đón tệp du khách quốc tế và xuất khẩu sản phẩm di sản Việt Nam ra thế giới.',
    },
  ] as YearlyProjection[],

  fundingPlan: {
    selfFundedAmount: '50 Triệu VNĐ',
    selfFundedDetail: 'Vốn tự có của nhóm đã huy động thành công để hoàn tất 100% nghiên cứu R&D và lập trình sản phẩm MVP.',
    targetRaiseAmount: '250 – 300 Triệu VNĐ',
    targetRaiseDetail:
      'Huy động trong giai đoạn thương mại hóa thông qua các Quỹ hỗ trợ khởi nghiệp sinh viên, Vườn ươm Impact Startup và Gọi vốn cộng đồng (Crowdfunding).',
    allocation: [
      { item: 'Phát triển mạng lưới HTX & Kiểm định nguồn cung', percent: 35 },
      { item: 'Chiến dịch Marketing "Chạm vào di sản" & O2O QR', percent: 35 },
      { item: 'Nâng cấp hạ tầng AI, Bản đồ số & Đa ngôn ngữ', percent: 20 },
      { item: 'Pháp lý, Sở hữu trí tuệ & Dự phòng vận hành', percent: 10 },
    ],
  },
};
