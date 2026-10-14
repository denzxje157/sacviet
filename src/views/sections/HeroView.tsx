import React from 'react';
import { ExternalLink, Sparkles, ArrowDownRight, FileDown, Compass, ShieldCheck } from 'lucide-react';
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
                Website Báo Cáo Đề Án Khởi Nghiệp & Đội Thi
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
                <span>Tóm Tắt Đề Án Khởi Nghiệp (Executive Summary)</span>
              </div>
              <p className="leading-relaxed">
                <strong>• Lý do ra đời & Giải pháp:</strong> Nghệ nhân vùng cao thiếu kênh phân phối trực tiếp trong khi người tiêu dùng khao khát sản phẩm nguyên bản gắn với giá trị bản địa. <strong>Sắc Việt</strong> giải quyết bài toán qua nền tảng TMĐT D2C kết hợp Bảo tàng văn hóa số.
              </p>
              <p className="leading-relaxed">
                <strong>• Công nghệ đột phá:</strong> Tích hợp <strong>Trợ lý văn hóa ảo Gemini AI</strong> giải nghĩa hoa văn/di sản và <strong>Bản đồ số Leaflet</strong> định vị nguồn gốc sản phẩm 54 dân tộc, kèm Dashboard quản lý kho minh bạch cho Hợp tác xã.
              </p>
              <p className="leading-relaxed">
                <strong>• Thị trường mục tiêu:</strong> Nhắm tới thế hệ <strong>Gen Z, Millennials, du khách quốc tế</strong> và quà tặng văn hóa doanh nghiệp (B2B) bằng chiến lược "Đại dương xanh" minh bạch nguồn gốc.
              </p>
            </div>

            {/* Cụm Nút Hành Động (CTA) - Chống rớt dòng trong nút */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={config.links.liveMvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs md:text-sm uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Trải Nghiệm Sản Phẩm MVP</span>
                <ExternalLink size={15} className="shrink-0" />
              </a>

              <button
                onClick={() => onSelectSection('doi-thi')}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-gold/20 hover:bg-gold/35 border border-gold/50 text-text-main font-bold text-xs md:text-sm uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Xem Đội Thi & Báo Cáo</span>
                <ArrowDownRight size={15} className="text-primary shrink-0" />
              </button>

              <a
                href={config.links.proposalDocxDownloadUrl}
                download={config.links.proposalDocxFileName}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-gold/10 border border-gold/35 text-text-main font-bold text-xs md:text-sm transition-all whitespace-nowrap"
              >
                <FileDown size={15} className="text-primary shrink-0" />
                <span>Tải Mô Tả Dự Án (.DOCX)</span>
              </a>
            </div>
          </div>

          {/* Cột Phải: Tổ hợp Hình ảnh Di sản & Sản phẩm Thực tế Sắc Việt */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-3 bg-white border-2 border-gold/40 shadow-xl">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#2B0505]">
                <img
                  src="/assets/showcase/lung-tam-cover.jpg"
                  alt="Không gian văn hóa và nghệ nhân Sắc Việt"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B0505] via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary/95 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                    Sản Phẩm Đã Hoàn Thiện (MVP)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 text-gold-light text-[10px] font-bold whitespace-nowrap">
                    React • Supabase • Gemini AI
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[11px] uppercase tracking-wider text-gold-light font-bold">
                    Hệ sinh thái số toàn diện
                  </p>
                  <h3 className="font-bold text-base md:text-lg leading-snug mt-0.5">
                    Sàn Giao Dịch Thủ Công D2C × Bảo Tàng Số 54 Dân Tộc
                  </h3>
                </div>
              </div>

              {/* 2 Thẻ ảnh phụ bên dưới */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="relative rounded-xl overflow-hidden h-28 bg-stone-900">
                  <img
                    src="/assets/showcase/artisan-loom.jpg"
                    alt="Nghệ nhân dệt thổ cẩm"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-white leading-snug">
                      Kết nối trực tiếp Hợp tác xã làng nghề
                    </span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden h-28 bg-stone-900">
                  <img
                    src="/assets/showcase/cham-pottery.jpg"
                    alt="Tinh hoa Gốm Bàu Trúc"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent flex items-end p-3">
                    <span className="text-xs font-bold text-white leading-snug">
                      Định vị di sản & Trợ lý ảo Gemini AI
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Thẻ Chỉ Số Tóm Tắt Nhanh */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {config.heroQuickStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card shadow-xs hover:border-primary/40 transition-all"
            >
              <div className="font-black text-xl sm:text-2xl text-primary whitespace-nowrap">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-medium text-text-soft mt-1 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
