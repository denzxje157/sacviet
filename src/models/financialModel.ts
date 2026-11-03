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
  sectionTitle: 'Mô hình tài chính tinh gọn & lộ trình tăng trưởng bền vững',
  sectionSubtitle:
    'Nhờ tự chủ công nghệ lõi và kiến trúc đám mây Serverless, Sắc Việt tối ưu hóa chi phí khởi tạo (CAPEX), đạt biên lợi nhuận ròng 20% – 25% và dự kiến hòa vốn ngay trong tháng thứ 10 – 12 của năm đầu tiên.',

  keyMetrics: [
    {
      label: 'Chi phí khởi tạo (CAPEX)',
      value: '50 – 70 Triệu VNĐ',
      subtext: 'Pháp lý, hạ tầng ban đầu & thiết kế nhận diện (nhóm tự chủ mã nguồn R&D)',
      highlight: false,
    },
    {
      label: 'Chi phí vận hành (OPEX)',
      value: '30 – 45 Triệu / Tháng',
      subtext: 'Phân bổ cho phí API AI/Cloud, Marketing chuyển đổi và hỗ trợ vận hành',
      highlight: false,
    },
    {
      label: 'Biên lợi nhuận ròng',
      value: '20% – 25%',
      subtext: 'Nhờ ứng dụng AI hỗ trợ sản xuất nội dung SEO và tư vấn văn hóa',
      highlight: true,
    },
    {
      label: 'Thời điểm hòa vốn (Break-even)',
      value: 'Tháng thứ 10 – 12',
      subtext: 'Đạt điểm hòa vốn trong năm đầu tiên với ~500 đơn B2C/tháng kết hợp hợp đồng B2B',
      highlight: true,
    },
  ] as FinancialMetric[],

  revenueStreams: [
    {
      id: 'commission',
      name: '1. Phí hoa hồng nền tảng (Commission fee)',
      rateOrScale: '10% / giao dịch',
      description:
        'Trích xuất tự động 10% trên mỗi giao dịch D2C thành công (nghệ nhân nhận 90% giá bán trước phí vận chuyển và cổng thanh toán). Thấp hơn đáng kể so với mức phí sàn đại trà (phí khoảng 15% – 18%, tổng chi phí có thể trên 25%) [2].',
      sharePercent: 55,
    },
    {
      id: 'b2b-gifts',
      name: '2. Hợp đồng quà tặng văn hóa doanh nghiệp (B2B)',
      rateOrScale: 'Theo hợp đồng & Bộ sưu tập',
      description:
        'Cung cấp các bộ quà tặng thủ công mang đậm bản sắc dân tộc kèm câu chuyện di sản cho các doanh nghiệp, ngân hàng, chuỗi nhà hàng và resort sinh thái.',
      sharePercent: 30,
    },
    {
      id: 'value-added-ads',
      name: '3. Dịch vụ gia tăng & xúc tiến du lịch địa phương',
      rateOrScale: 'Gói tài trợ & Hiển thị ưu tiên',
      description:
        'Khai thác doanh thu từ gói hiển thị nổi bật trên Bản đồ di sản số và chiến dịch quảng bá dành cho các địa phương, hợp tác xã muốn thúc đẩy du lịch văn hóa.',
      sharePercent: 15,
    },
  ] as RevenueStream[],

  yearlyProjections: [
    {
      year: 'Năm thứ 1',
      phaseName: 'Thâm nhập thị trường & hòa vốn',
      revenueRange: '800 Triệu – 1,2 Tỷ VNĐ',
      revenueNumericMaxBillion: 1.2,
      targetOrders: '~500 đơn B2C/tháng + Hợp đồng B2B điểm',
      keyMilestone: 'Ký kết các HTX điểm (Bàu Trúc, Tây Bắc), vận hành O2O và cán đích hòa vốn ở tháng 10–12.',
    },
    {
      year: 'Năm thứ 2',
      phaseName: 'Mở rộng mạng lưới HTX toàn quốc',
      revenueRange: '2,0 Tỷ – 2,8 Tỷ VNĐ',
      revenueNumericMaxBillion: 2.8,
      targetOrders: '~1.200 đơn B2C/tháng + Mở rộng đối tác Resort/Bảo tàng',
      keyMilestone: 'Phủ rộng mạng lưới QR O2O tại các điểm du lịch trọng điểm và chuẩn hóa kho vận tự động.',
    },
    {
      year: 'Năm thứ 3',
      phaseName: 'Đa ngôn ngữ & xuất khẩu văn hóa',
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
