/**
 * ============================================================================
 * [MODEL 7] CẤU TRÚC 04 CHÍNH SÁCH SÀN THƯƠNG MẠI ĐIỆN TỬ (policyModel.ts)
 * ============================================================================
 * Tuân thủ nguyên tắc: Khung nội dung trung lập, các thông số pháp lý, số ngày,
 * mã số thuế, địa chỉ, đơn vị đối tác để [CẦN ĐIỀN]. Sử dụng thuật ngữ "dự kiến".
 */

export interface PolicyDocument {
  id: string;
  slug: string;
  title: string;
  badge: string;
  lastUpdated: string;
  sections: {
    heading: string;
    content: string[];
  }[];
}

export const policiesData: Record<string, PolicyDocument> = {
  'doi-tra-hoan-tien': {
    id: 'doi-tra-hoan-tien',
    slug: 'chinh-sach-doi-tra',
    title: 'Chính sách đổi trả và hoàn tiền',
    badge: 'CHÍNH SÁCH BẢO VỆ NGƯỜI TIÊU DÙNG & NGHỆ NHÂN',
    lastUpdated: '[CẦN ĐIỀN: Ngày cập nhật dd/mm/yyyy]',
    sections: [
      {
        heading: '1. Phạm vi áp dụng đối với sản phẩm thủ công truyền thống',
        content: [
          'Chính sách này áp dụng cho các sản phẩm thủ công mỹ nghệ, thổ cẩm, gốm sứ và vật phẩm văn hóa được đặt mua thông qua nền tảng Sắc Việt.',
          'Đặc thù sản phẩm thủ công có thể có sai số tự nhiên về màu sắc sợi nhuộm thực vật, đường nét khắc tay hoặc mẻ gốm nung củi; khách hàng được thông tin rõ ràng trước khi giao dịch.',
        ],
      },
      {
        heading: '2. Điều kiện và thời hạn tiếp nhận đổi trả (Dự kiến)',
        content: [
          'Sản phẩm bị lỗi kỹ thuật chế tác nghiêm trọng không đúng mô tả hoặc bị hư hại, vỡ, ẩm mốc trong quá trình vận chuyển bưu chính.',
          'Thời hạn thông báo yêu cầu đổi trả dự kiến: [CẦN ĐIỀN: Số ngày tiếp nhận sau khi nhận hàng, ví dụ: 03 hoặc 07 ngày].',
          'Sản phẩm gửi hoàn trả cần giữ nguyên hiện trạng, bao bì thân thiện môi trường và thiệp định danh nghệ nhân kèm theo.',
        ],
      },
      {
        heading: '3. Quy trình kiểm định & thời gian xử lý hoàn tiền (Dự kiến)',
        content: [
          'Sau khi Hợp tác xã làng nghề hoặc đại diện Sắc Việt tiếp nhận sản phẩm hoàn về, bộ phận kiểm soát chất lượng sẽ thẩm định trong thời gian dự kiến [CẦN ĐIỀN: Số ngày kiểm định].',
          'Phương thức hoàn tiền: Hoàn qua tài khoản ngân hàng hoặc cổng thanh toán điện tử [CẦN ĐIỀN: Tên cổng thanh toán đối tác].',
          'Thời gian hoàn tất tiền vào tài khoản người mua dự kiến: [CẦN ĐIỀN: Thời gian hoàn tiền, ví dụ: 03–05 ngày làm việc].',
        ],
      },
      {
        heading: '4. Chi phí vận chuyển hoàn trả',
        content: [
          'Trường hợp lỗi xuất phát từ nhà sản xuất (Hợp tác xã) hoặc đơn vị bưu chính: [CẦN ĐIỀN: Quy định trách nhiệm chi trả phí ship hoàn].',
          'Trường hợp đổi trả do nhu cầu cá nhân của khách hàng: [CẦN ĐIỀN: Quy định điều kiện hỗ trợ].',
        ],
      },
    ],
  },

  'bao-mat-thong-tin': {
    id: 'bao-mat-thong-tin',
    slug: 'chinh-sach-bao-mat',
    title: 'Chính sách bảo mật thông tin cá nhân',
    badge: 'TIÊU CHUẨN AN TOÀN & BẢO MẬT DỮ LIỆU SỐ',
    lastUpdated: '[CẦN ĐIỀN: Ngày cập nhật dd/mm/yyyy]',
    sections: [
      {
        heading: '1. Mục đích thu thập dữ liệu cá nhân',
        content: [
          'Nền tảng Sắc Việt thu thập thông tin người dùng (Họ tên, số điện thoại, địa chỉ nhận hàng, email) nhằm phục vụ xử lý đơn hàng, xuất hóa đơn và cung cấp dịch vụ tư vấn văn hóa số.',
          'Dữ liệu tương tác cùng Trợ lý Gemini AI được xử lý với mục đích phản hồi câu hỏi văn hóa, không sử dụng cho mục đích thương mại trái phép.',
        ],
      },
      {
        heading: '2. Biện pháp bảo vệ & lưu trữ an toàn (Dự kiến)',
        content: [
          'Dữ liệu tài khoản và giao dịch được mã hóa và bảo mật trên hạ tầng đám mây cơ sở dữ liệu [CẦN ĐIỀN: Tiêu chuẩn mã hóa / Đối tác Supabase Cloud].',
          'Phân quyền truy cập nội bộ nghiêm ngặt, chỉ nhân sự phụ trách điều phối bưu chính mới được tiếp cận thông tin địa chỉ giao nhận.',
        ],
      },
      {
        heading: '3. Chia sẻ thông tin với bên thứ ba',
        content: [
          'Sắc Việt chỉ chia sẻ thông tin giao nhận cần thiết cho đối tác vận chuyển bưu chính tuyến xã [CẦN ĐIỀN: Tên đơn vị bưu chính, ví dụ: VNPost / Viettel Post] để thực hiện phát hàng.',
          'Cam kết không mua bán hay cung cấp dữ liệu người tiêu dùng và thông tin nghệ nhân cho bất kỳ bên thứ ba nào khi chưa có sự đồng ý.',
        ],
      },
      {
        heading: '4. Quyền của chủ thể dữ liệu & liên hệ kiểm tra',
        content: [
          'Người dùng và thành viên Hợp tác xã có quyền kiểm tra, cập nhật, điều chỉnh hoặc yêu cầu xóa bỏ thông tin cá nhân của mình trên hệ thống.',
          'Đầu mối tiếp nhận yêu cầu bảo mật: Email [CẦN ĐIỀN: Email tiếp nhận bảo mật] – Hotline hỗ trợ: [CẦN ĐIỀN: Số điện thoại hỗ trợ].',
        ],
      },
    ],
  },

  'dieu-khoan-su-dung': {
    id: 'dieu-khoan-su-dung',
    slug: 'dieu-khoan-su-dung',
    title: 'Điều khoản sử dụng',
    badge: 'QUY CHẾ HOẠT ĐỘNG NỀN TẢNG THƯƠNG MẠI SỐ D2C',
    lastUpdated: '[CẦN ĐIỀN: Ngày cập nhật dd/mm/yyyy]',
    sections: [
      {
        heading: '1. Chấp thuận các điều khoản',
        content: [
          'Khi truy cập và sử dụng dịch vụ trên nền tảng Sắc Việt (bao gồm Web sàn TMĐT, Bản đồ số và Trợ lý AI), người dùng đồng ý tuân thủ các điều khoản hoạt động này.',
          'Các quy định có thể được điều chỉnh phù hợp với khuôn khổ pháp luật thương mại điện tử hiện hành và sẽ được thông báo cập nhật công khai.',
        ],
      },
      {
        heading: '2. Quyền và trách nhiệm của khách hàng',
        content: [
          'Cung cấp thông tin giao nhận chính xác và trung thực khi thực hiện đặt hàng.',
          'Tôn trọng bản quyền hình ảnh, câu chuyện di sản và dữ liệu số hóa văn hóa 54 dân tộc đăng tải trên nền tảng.',
          'Không sử dụng các công cụ can thiệp phá hoại hệ thống hoặc lan truyền thông tin sai lệch về bản sắc cộng đồng dân tộc thiểu số.',
        ],
      },
      {
        heading: '3. Quyền và trách nhiệm của Nghệ nhân & Hợp tác xã (Kênh người bán)',
        content: [
          'Chịu trách nhiệm về tính nguyên bản, chất lượng thủ công và nguồn gốc xuất xứ của từng sản phẩm niêm yết trên gian hàng.',
          'Đồng bộ số lượng tồn kho thực tế và chuẩn bị hàng hóa đúng quy chuẩn đóng gói bảo vệ môi trường.',
          'Được bảo đảm quyền giữ lại [CẦN ĐIỀN: Tỷ lệ thặng dư, ví dụ: 88% – 90%] trước phí vận chuyển và cổng thanh toán theo cam kết mô hình D2C.',
        ],
      },
      {
        heading: '4. Cơ chế giải quyết khiếu nại & tranh chấp',
        content: [
          'Sắc Việt đóng vai trò làm cầu nối kiểm định và hỗ trợ hòa giải giữa người mua và Hợp tác xã làng nghề khi phát sinh khiếu nại.',
          'Thời gian tiếp nhận và xử lý khiếu nại dự kiến trong vòng [CẦN ĐIỀN: Thời gian giải quyết, ví dụ: 48 giờ làm việc].',
        ],
      },
    ],
  },

  'don-vi-van-hanh': {
    id: 'don-vi-van-hanh',
    slug: 'thong-tin-don-vi-van-hanh',
    title: 'Thông tin đơn vị vận hành',
    badge: 'HỒ SƠ PHÁP LÝ & ĐƠN VỊ CHỦ QUẢN DỰ ÁN',
    lastUpdated: '[CẦN ĐIỀN: Ngày cập nhật dd/mm/yyyy]',
    sections: [
      {
        heading: '1. Đơn vị chủ quản đề án',
        content: [
          'Tên dự án khởi nghiệp: Dự án Sắc Việt – Nền tảng kết nối chợ phiên đến với muôn phương.',
          'Đơn vị phát triển: Đội thi sinh viên Trường Đại học Lạc Hồng (Cuộc thi Sinh viên Kinh doanh số 2026 – VECOM).',
          'Tổ chức bảo trợ học thuật & ươm tạo: [CẦN ĐIỀN: Tên đơn vị ươm tạo / Khoa CNTT – ĐH Lạc Hồng].',
        ],
      },
      {
        heading: '2. Thông tin pháp nhân dự kiến (Đang trong lộ trình thành lập doanh nghiệp)',
        content: [
          'Tên pháp nhân dự kiến: [CẦN ĐIỀN: Tên Công ty / Hợp tác xã khởi nghiệp dự kiến].',
          'Địa chỉ trụ sở điều hành: [CẦN ĐIỀN: Địa chỉ trụ sở chính / Văn phòng dự án].',
          'Mã số doanh nghiệp / Mã số thuế: [CẦN ĐIỀN: Trạng thái đăng ký kinh doanh].',
          'Đại diện pháp luật dự kiến: [CẦN ĐIỀN: Họ tên người đại diện pháp luật].',
        ],
      },
      {
        heading: '3. Giấy phép & thông báo sàn thương mại điện tử',
        content: [
          'Tình trạng thủ tục thông báo / đăng ký website TMĐT với Bộ Công Thương: [CẦN ĐIỀN: Dự kiến thực hiện trong giai đoạn thương mại hóa chính thức].',
          'Hồ sơ đăng ký sở hữu trí tuệ nhãn hiệu "Sắc Việt": [CẦN ĐIỀN: Trạng thái nộp đơn tại Cục Sở hữu trí tuệ].',
        ],
      },
      {
        heading: '4. Kênh tiếp nhận thông tin chính thức',
        content: [
          'Email liên hệ chính: hakien2525@gmail.com (hoặc [CẦN ĐIỀN: Email doanh nghiệp])',
          'Điện thoại điều phối: 0971565426 (Hà Văn Kiên – Trưởng nhóm Dự án)',
          'Website báo cáo chính thức: https://baocao.sacviet.id.vn',
          'Website sản phẩm thử nghiệm (MVP): https://sacviet.id.vn',
        ],
      },
    ],
  },
};
