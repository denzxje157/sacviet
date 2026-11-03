import React from 'react';
import { ExternalLink, Phone, Mail, MapPin, Award, FileDown } from 'lucide-react';
import { SectionId } from '../../models/types';
import { projectConfigModel } from '../../models/projectConfigModel';

/**
 * ============================================================================
 * [VIEW - LAYOUT] CHÂN TRANG HỒ SƠ DỰ THI (FooterView.tsx)
 * ============================================================================
 */

interface FooterViewProps {
  config: typeof projectConfigModel;
  onSelectSection: (id: SectionId) => void;
  onOpenPolicy: (policyId: string) => void;
}

export const FooterView: React.FC<FooterViewProps> = ({
  config,
  onSelectSection,
  onOpenPolicy,
}) => {
  return (
    <footer className="bg-[#2B0505] text-[#F9F5EA] border-t-4 border-gold pt-14 pb-10">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15">
          {/* Cột 1: Nhận diện dự án & Cuộc thi */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src={config.sacVietLogoUrl}
                alt="Logo Sắc Việt"
                className="w-14 h-14 rounded-full border-2 border-gold bg-white object-cover shrink-0"
              />
              <div>
                <h3 className="font-black text-2xl text-gold-light tracking-tight">
                  {config.projectShortName}
                </h3>
                <p className="text-xs uppercase tracking-wider text-white/75 font-bold">
                  {config.contestName}
                </p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {config.projectFullTitle}. Nền tảng thương mại điện tử D2C kết hợp bảo tàng văn hóa số ứng dụng Trí tuệ nhân tạo (Gemini AI) và Bản đồ di sản (Leaflet).
            </p>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white text-text-main shadow-md">
              <img
                src={config.dbcLogoUrl}
                alt="DBC 2026"
                className="h-7 w-auto object-contain shrink-0"
              />
              <div className="border-l border-gold/40 pl-3 whitespace-nowrap">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  Đơn vị dự thi
                </div>
                <div className="text-xs font-black text-text-main">
                  {config.universityName}
                </div>
              </div>
            </div>
          </div>

          {/* Cột 2: Điều hướng nhanh 8 phần báo cáo */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-gold-light flex items-center gap-2">
              <Award size={15} className="shrink-0" />
              <span>Danh mục báo cáo đề án</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {config.navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectSection(item.id)}
                    className="text-white/80 hover:text-gold-light transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <span className="text-gold font-bold">{item.shortNumber}.</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Liên hệ Trưởng nhóm & Truy cập Sản phẩm */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-gold-light">
              Thông tin liên hệ đội thi
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-gold/25 space-y-2.5 text-xs">
              <div className="font-bold text-sm text-gold-light">
                {config.leaderContact.fullName} — Trưởng nhóm (CEO)
              </div>
              <div className="flex items-center gap-2 text-white/85">
                <MapPin size={14} className="text-gold shrink-0" />
                <span>{config.leaderContact.classInfo}</span>
              </div>
              <div className="flex items-center gap-2 text-white/85">
                <Phone size={14} className="text-gold shrink-0" />
                <a href={`tel:${config.leaderContact.phone}`} className="hover:underline">
                  {config.leaderContact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/85">
                <Mail size={14} className="text-gold shrink-0" />
                <a href={`mailto:${config.leaderContact.email}`} className="hover:underline">
                  {config.leaderContact.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-2 pt-1">
              <a
                href={config.links.liveMvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold hover:bg-amber-500 text-[#2B0505] font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
              >
                <span>Mở Web Sản Phẩm MVP</span>
                <ExternalLink size={14} className="shrink-0" />
              </a>
              <button
                onClick={() =>
                  alert(
                    'Bản PDF đề án chính thức đang được chuẩn bị. Bạn vui lòng tải tạm bản Mô tả dự án (.DOCX) bên cạnh!'
                  )
                }
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-amber-400 bg-amber-500/20 text-amber-200 text-xs font-bold hover:bg-amber-500/30 transition-all whitespace-nowrap cursor-pointer"
                title="Đang chờ file PDF chính thức từ nhóm"
              >
                <FileDown size={14} className="shrink-0" />
                <span>PDF [CẦN FILE PDF]</span>
              </button>
              <a
                href={config.links.proposalDocxDownloadUrl}
                download={config.links.proposalDocxFileName}
                className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl border border-gold/40 hover:bg-white/10 text-white font-bold text-xs transition-all whitespace-nowrap"
                title="Tải Bản Mô Tả Dự Án (.DOCX)"
              >
                <FileDown size={14} className="shrink-0" />
                <span>.DOCX</span>
              </a>
            </div>
          </div>
        </div>

        {/* Khối Liên kết 4 Chính sách sàn TMĐT */}
        <div className="py-5 border-b border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="font-bold uppercase tracking-wider text-gold-light">
              Quy chế & chính sách sàn TMĐT (Dự thảo):
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
              <button
                onClick={() => onOpenPolicy('doi-tra-hoan-tien')}
                className="text-white/80 hover:text-gold-light transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Chính sách đổi trả & hoàn tiền
              </button>
              <span className="text-gold/40">•</span>
              <button
                onClick={() => onOpenPolicy('bao-mat-thong-tin')}
                className="text-white/80 hover:text-gold-light transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Chính sách bảo mật thông tin
              </button>
              <span className="text-gold/40">•</span>
              <button
                onClick={() => onOpenPolicy('dieu-khoan-su-dung')}
                className="text-white/80 hover:text-gold-light transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Điều khoản sử dụng
              </button>
              <span className="text-gold/40">•</span>
              <button
                onClick={() => onOpenPolicy('don-vi-van-hanh')}
                className="text-white/80 hover:text-gold-light transition-colors cursor-pointer underline-offset-4 hover:underline"
              >
                Thông tin đơn vị vận hành
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>
            © 2026 Dự án Khởi nghiệp <strong>Sắc Việt</strong> – Đội thi Sinh viên {config.universityName}.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={config.links.reportWebUrl}
              className="text-gold-light/90 hover:underline font-medium"
            >
              {config.links.reportWebUrl}
            </a>
            <span className="text-gold/40">•</span>
            <span className="text-gold-light/85">
              Cuộc thi Sinh viên Kinh doanh số 2026 (VECOM)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
