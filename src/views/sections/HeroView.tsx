import React, { useState } from 'react';
import {
  ExternalLink,
  Sparkles,
  ArrowDownRight,
  FileDown,
  Compass,
  ShieldCheck,
  PlayCircle,
  QrCode,
  KeyRound,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SectionId } from '../../models/types';
import { projectConfigModel } from '../../models/projectConfigModel';

/**
 * ============================================================================
 * [VIEW - SECTION 01] BANNER MỞ ĐẦU & TÓM TẮT ĐỀ ÁN (HeroView.tsx)
 * ============================================================================
 */

interface HeroViewProps {
  config: typeof projectConfigModel;
  onSelectSection: (id: SectionId) => void;
}

export const HeroView: React.FC<HeroViewProps> = ({ config, onSelectSection }) => {
  const [showDemoAccount, setShowDemoAccount] = useState<boolean>(false);
  return (
    <section
      id="tong-quan"
      className="relative pt-6 pb-14 md:pt-10 md:pb-20 overflow-hidden border-b border-gold/25"
    >
      {/* Họa tiết nền trang trí */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Thanh Huy Hiệu Cuộc Thi & Đơn Vị */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 p-3.5 md:px-5 rounded-2xl glass-card shadow-xs">
          <div className="flex items-center gap-3">
            <img
              src={config.dbcLogoUrl}
              alt="DBC 2026 Logo"
              className="h-7 md:h-9 w-auto object-contain shrink-0"
            />
            <div className="h-7 w-[1px] bg-gold/30 shrink-0" />
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-primary">
                {config.contestName}
              </div>
              <div className="text-xs font-medium text-text-soft">
                Website báo cáo đề án khởi nghiệp & đội thi
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 self-start sm:self-auto shrink-0 whitespace-nowrap">
            <ShieldCheck size={15} className="text-primary shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wide text-primary">
              Đơn vị: {config.universityName}
            </span>
          </div>
        </div>

        {/* Nội dung chính Hero 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Cột Trái: Thông điệp & Tóm tắt Đề án */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-text-main text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              <Sparkles size={14} className="text-primary shrink-0" />
              <span>{config.coreSlogan}</span>
            </div>

            {/* Tiêu đề chia dòng rõ ràng, không bị ngắt chữ lẻ */}
            <div className="space-y-1.5">
              <div className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-gold">
                ĐỀ ÁN KHỞI NGHIỆP ĐỔI MỚI SÁNG TẠO
              </div>
              <h1 className="font-black text-3xl sm:text-4xl xl:text-[42px] text-primary leading-[1.2] tracking-tight">
                SẮC VIỆT — Nền tảng kết nối chợ phiên đến với muôn phương
              </h1>
            </div>

            <p className="text-sm md:text-base text-text-main/90 leading-relaxed font-normal">
              {config.heroSummary}
            </p>

            {/* Khung Tóm tắt 3 Đoạn theo chuẩn Đề Thi DBC 2026 */}
            <div className="p-5 rounded-2xl bg-white/90 border border-gold/35 shadow-xs space-y-2.5 text-xs md:text-sm text-text-main">
              <div className="font-extrabold uppercase tracking-wider text-primary flex items-center gap-2">
                <Compass size={16} className="shrink-0" />
                <span>Tóm tắt đề án khởi nghiệp (Executive summary)</span>
              </div>
              <p className="leading-relaxed">
                <strong>• Lý do ra đời & Giải pháp:</strong> Hơn 14 triệu đồng bào dân tộc thiểu số tại gần 5.500 xã vùng cao sở hữu kho tàng nghề thủ công tinh xảo nhưng thiếu kênh phân phối bền vững và thường bị ép giá qua trung gian. <strong>Sắc Việt</strong> ra đời kết nối trực tiếp từ nghệ nhân tới người tiêu dùng kết hợp bảo tồn văn hóa số, giúp nâng thu nhập thực nhận của nghệ nhân thêm 30% đến 50%.
              </p>
              <p className="leading-relaxed">
                <strong>• Sản phẩm & Công nghệ:</strong> Nền tảng web đa chức năng tích hợp Kho tri thức văn hóa số 54 dân tộc và Sàn giao dịch thủ công trực tuyến. Ứng dụng <strong>Bản đồ số tương tác Leaflet</strong> định vị nguồn gốc làng nghề và <strong>Trợ lý ảo trí tuệ nhân tạo Gemini</strong> tư vấn văn hóa trực tuyến, giải nghĩa hoa văn phong tục theo ngữ cảnh.
              </p>
              <p className="leading-relaxed">
                <strong>• Thị trường mục tiêu:</strong> Hướng đến thế hệ trẻ đô thị từ 18 đến 35 tuổi, người yêu văn hóa, du khách cùng phân khúc quà tặng doanh nghiệp. Chiến lược thương mại tri thức gắn liền văn hóa số và mức phí ưu đãi 10% giúp Sắc Việt thâm nhập hiệu quả thị trường ngách giàu tiềm năng.
              </p>
            </div>

            {/* Cụm Nút Hành Động (CTA) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {config.links.hasPdfFile ? (
                <a
                  href={config.links.proposalPdfDownloadUrl}
                  download={config.links.proposalPdfFileName}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-md whitespace-nowrap"
                  title="Tải toàn văn bản Đề án chính thức định dạng PDF theo chuẩn BTC"
                >
                  <FileDown size={15} className="text-gold-light shrink-0" />
                  <span>Tải bản PDF đề án</span>
                </a>
              ) : (
                <button
                  onClick={() =>
                    alert(
                      'Bản PDF đề án chính thức đang được chuẩn bị. Bạn vui lòng tải tạm bản Mô tả dự án (.DOCX) bằng nút bên cạnh!'
                    )
                  }
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-600/40 text-amber-950 font-bold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
                  title="Đang chờ file PDF chính thức từ nhóm"
                >
                  <FileDown size={15} className="text-amber-800 shrink-0" />
                  <span>Tải bản PDF [CẦN FILE PDF]</span>
                </button>
              )}

              <a
                href={config.links.proposalDocxDownloadUrl}
                download={config.links.proposalDocxFileName}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-gold/15 border border-gold/40 text-text-main font-bold text-xs md:text-sm transition-all whitespace-nowrap"
              >
                <FileDown size={15} className="text-primary shrink-0" />
                <span>Tải bản .DOCX</span>
              </a>

              <button
                onClick={() => onSelectSection('doi-thi')}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-gold/20 hover:bg-gold/35 border border-gold/50 text-text-main font-bold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Xem đội thi & báo cáo</span>
                <ArrowDownRight size={15} className="text-primary shrink-0" />
              </button>
            </div>
          </div>

          {/* Cột Phải: Tổ hợp Hình ảnh Di sản & Sản phẩm Thực tế Sắc Việt */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-3.5 bg-white border-2 border-gold/40 shadow-xl space-y-2.5">
              {/* Thanh trạng thái sản phẩm */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-xs">
                  Sản phẩm đã hoàn thiện (MVP)
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900 text-gold-light text-[10px] font-bold whitespace-nowrap border border-gold/30">
                  React • Supabase • Gemini AI
                </span>
              </div>

              {/* Khung ảnh chính MVP Web */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#FAF7F2] border border-gold/30 flex items-center justify-center p-1 group">
                <img
                  src="/assets/showcase/mvp-home.png"
                  alt="Giao diện Trang chủ nền tảng Sắc Việt MVP"
                  className="w-full h-full object-contain object-top group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Tiêu đề Phân khu Hệ sinh thái */}
              <div className="px-1">
                <p className="text-[10px] md:text-[11px] uppercase tracking-wider text-gold font-extrabold">
                  Hệ sinh thái số toàn diện
                </p>
                <h3 className="font-bold text-sm md:text-base text-primary leading-snug">
                  Sàn giao dịch thủ công D2C × Bảo tàng số 54 dân tộc
                </h3>
              </div>

              {/* 2 Thẻ ảnh phụ bên dưới */}
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                <div className="relative rounded-xl overflow-hidden h-28 bg-stone-900 group">
                  <img
                    src="/assets/showcase/mvp-marketplace.webp"
                    alt="Giao diện Chợ phiên thủ công trực tuyến D2C"
                    className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-white leading-snug">
                      Chợ phiên trực tuyến D2C
                    </span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden h-28 bg-stone-900 group">
                  <img
                    src="/assets/showcase/mvp-ai-assistant.webp"
                    alt="Giao diện Trợ lý văn hóa ảo Gemini AI"
                    className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-white leading-snug">
                      Định vị di sản & Trợ lý ảo Gemini AI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Khối Dành Cho Ban Giám Khảo (Judge Panel) */}
        <div className="mt-10 rounded-3xl bg-white border-2 border-gold/45 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gold/25">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
                Công cụ thẩm định trực tiếp
              </span>
              <h3 className="font-black text-xl md:text-2xl text-primary mt-1">
                Khu vực trải nghiệm dành cho Ban giám khảo
              </h3>
              <p className="text-xs md:text-sm text-text-soft mt-0.5">
                Truy cập trực tiếp vào hệ thống sản phẩm MVP thực tế của dự án Sắc Việt
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={config.links.artisanPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-dark transition-all whitespace-nowrap"
              >
                <span>Dùng thử Kênh Nghệ nhân</span>
                <ExternalLink size={14} />
              </a>
              <button
                onClick={() =>
                  alert(
                    'Video demo dự án đang trong quá trình ghi hình và biên tập. Trạng thái: [CẦN ĐIỀN: Link video demo].'
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background-light border border-gold/40 text-text-main text-xs font-bold hover:bg-gold/15 transition-all cursor-pointer whitespace-nowrap"
              >
                <PlayCircle size={15} className="text-primary" />
                <span>Video demo (Đang cập nhật)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-5 items-stretch">
            {/* Mã QR quét nhanh vào web MVP */}
            <div className="md:col-span-5 flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-[#FDFBF7] border-2 border-gold/35 shadow-2xs h-full">
              <div className="w-20 h-20 bg-white p-1 rounded-xl border border-gold/40 shrink-0 flex items-center justify-center shadow-xs overflow-hidden">
                <img
                  src="/assets/qr-code-mvp.webp"
                  alt="Mã QR Sắc Việt MVP"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs space-y-1.5 min-w-0">
                <div className="font-bold text-text-main flex items-center gap-1.5">
                  <QrCode size={16} className="text-primary shrink-0" />
                  <span>Quét mã QR mở trên điện thoại</span>
                </div>
                <p className="text-text-soft text-[11px] leading-relaxed">
                  Mở camera điện thoại quét mã hoặc truy cập <strong className="text-primary break-all">{config.links.liveMvpUrl}</strong>
                </p>
              </div>
            </div>

            {/* Khối thu gọn xem tài khoản demo */}
            <div className="md:col-span-7 p-4 md:p-5 rounded-2xl bg-[#FDFBF7] border-2 border-gold/35 shadow-2xs flex flex-col justify-between h-full transition-all">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-text-main min-w-0">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <KeyRound size={15} />
                  </div>
                  <span className="truncate">Tài khoản dùng thử Kênh Nghệ nhân (Seller Portal)</span>
                </div>
                <button
                  onClick={() => setShowDemoAccount(!showDemoAccount)}
                  className="px-3 py-1.5 rounded-lg bg-gold/20 hover:bg-gold/35 border border-gold/40 text-xs text-primary font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <span>{showDemoAccount ? 'Thu gọn' : 'Xem thông tin'}</span>
                  {showDemoAccount ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {showDemoAccount ? (
                <div className="mt-3 pt-3 border-t border-gold/25 space-y-2 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                    <div className="p-2.5 rounded-xl bg-white border border-gold/30">
                      <span className="text-[10px] text-text-soft block uppercase font-sans font-bold">Tài khoản:</span>
                      <span className="text-text-main font-bold">{config.links.artisanDemoAccount.username}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-gold/30">
                      <span className="text-[10px] text-text-soft block uppercase font-sans font-bold">Mật khẩu:</span>
                      <span className="text-text-main font-bold">{config.links.artisanDemoAccount.password}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-primary/80 italic">
                    *{config.links.artisanDemoAccount.note}
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-[11px] text-text-soft leading-relaxed">
                  Bấm nút <strong className="text-primary font-semibold">"Xem thông tin"</strong> phía trên để nhận tài khoản và mật khẩu đăng nhập thử nghiệm Kênh quản lý của Hợp tác xã.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
