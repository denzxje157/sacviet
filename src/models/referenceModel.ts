import { ReferenceItem } from './types';

/**
 * ============================================================================
 * [MODEL 6] DANH MỤC NGUỒN THAM KHẢO & DỮ LIỆU ĐỐI SOÁT (referenceModel.ts)
 * ============================================================================
 * Quy tắc bắt buộc: KHÔNG BỊA NGUỒN. Các mục chưa có nguồn thực tế được gán
 * placeholder rõ ràng [CẦN ĐIỀN: ...] để nhóm đối soát cùng giáo viên hướng dẫn.
 */

export const referenceModel = {
  sectionBadge: 'MỤC 08 • DANH MỤC NGUỒN THAM KHẢO & DỮ LIỆU ĐỐI SOÁT',
  sectionTitle: 'Bảng đối soát nguồn gốc số liệu trích dẫn',
  sectionSubtitle:
    'Các số liệu thống kê ngoài chính trong bản đề án được ghi nhận kèm nguồn dưới đây để Ban giám khảo thuận tiện đối chiếu. Các giả định và mục tiêu của nhóm được ghi nhãn riêng.',

  references: [
    {
      id: 'ref-1',
      refIndex: 1,
      statistic: 'Khoảng 5.400 làng nghề và làng có nghề',
      claimContext:
        'Số lượng làng nghề và làng có nghề trên cả nước, trong đó khoảng 1.975 làng nghề, làng nghề truyền thống đã được công nhận; một số làng nghề truyền thống có nguy cơ mai một.',
      source:
        'Bộ Nông nghiệp và Môi trường (thông tin dẫn qua báo Đại Đoàn Kết và VnBusiness)',
      year: '2025',
      links: [
        {
          label: 'Đại Đoàn Kết',
          url: 'https://daidoanket.vn/can-bo-tieu-chi-quoc-gia-ve-du-lich-lang-nghe.html',
        },
        {
          label: 'VnBusiness',
          url: 'https://vnbusiness.vn/5400-lang-nghe-vao-cuoc-bat-tay-du-lich-nang-cao-gia-tri-san-pham.html',
        },
      ],
    },
    {
      id: 'ref-2',
      refIndex: 2,
      statistic:
        'Chi phí người bán trên sàn TMĐT lớn: phí khoảng 15–18%, tổng chi phí có thể trên 25%',
      claimContext:
        'Với người bán không thuộc Shopee Mall ở một số ngành (thời trang, tiêu dùng nhanh, nhà cửa & đời sống), phí cố định và phí xử lý giao dịch khoảng 15–18% trong giai đoạn 05–07/2026; tổng chi phí bán hàng, gồm cả quảng cáo, tiếp thị liên kết và hoàn trả, có thể vượt 25% doanh thu. Mức phí thay đổi theo thời gian và ngành hàng; chưa đối chiếu riêng ngành thủ công mỹ nghệ.',
      source:
        'Thông báo phí của Shopee (dẫn qua báo Viettimes, Điện tử Ứng dụng, GenK)',
      year: '2026',
      links: [
        {
          label: 'Viettimes',
          url: 'https://viettimes.vn/shopee-va-tiktok-shop-ra-thong-bao-quan-trong-ve-cac-loai-phi-post197705.html',
        },
        {
          label: 'Điện tử Ứng dụng',
          url: 'https://dientuungdung.vn/tiktok-shop-but-pha-shopee-mat-dan-thi-phan-15401.html',
        },
        {
          label: 'GenK',
          url: 'https://genk.vn/vi-sao-nha-ban-than-phi-nhung-khong-dam-roi-san-16526101214434348.chn',
        },
      ],
    },
    {
      id: 'ref-3',
      refIndex: 3,
      statistic: 'Dân số và địa bàn các dân tộc thiểu số',
      claimContext:
        'Khoảng 14,1 triệu người thuộc 53 dân tộc thiểu số, chiếm 14,7% dân số cả nước (thời điểm 01/04/2019); cả nước có 5.468 xã vùng dân tộc thiểu số, chiếm 49% số xã.',
      source:
        'Điều tra thu thập thông tin thực trạng kinh tế – xã hội của 53 dân tộc thiểu số năm 2019 (Ủy ban Dân tộc – Tổng cục Thống kê), dẫn qua báo Pháp luật Việt Nam và VOV',
      year: '2019',
      links: [
        {
          label: 'Báo Pháp luật Việt Nam',
          url: 'https://baophapluat.vn/cong-bo-ket-qua-dieu-tra-thong-tin-53-dan-toc-thieu-so-post352806.html',
        },
        {
          label: 'VOV',
          url: 'https://vov.vn/xa-hoi/53-dan-toc-thieu-so-chiem-147-tong-dan-so-ca-nuoc-1067008.vov',
        },
      ],
    },
    {
      id: 'ref-4',
      refIndex: 4,
      statistic:
        'Mức sẵn sàng trả thêm cho sản phẩm địa phương của người tiêu dùng Việt Nam',
      claimContext:
        'Khoảng 41% người tiêu dùng Việt Nam sẵn sàng trả cao hơn cho thực phẩm sản xuất tại địa phương, trong khi 47% coi giá là yếu tố chính (khảo sát lĩnh vực thực phẩm, 517 phản hồi tại Việt Nam). Đây là số liệu tham chiếu gián tiếp; dữ liệu riêng cho hàng thủ công thuộc kế hoạch khảo sát của nhóm.',
      source:
        'PwC Việt Nam, Khảo sát Người tiêu dùng 2025 – Báo cáo tại Việt Nam',
      year: '2025',
      links: [
        {
          label: 'PwC Việt Nam',
          url: 'https://www.pwc.com/vn/vn/publications/vietnam-publications/voice-of-consumer-2025.html',
        },
      ],
    },
  ] as ReferenceItem[],
};
