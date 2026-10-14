import React from 'react';
import { ExternalLink, Menu, X, FileDown } from 'lucide-react';
import { NavItem, SectionId } from '../../models/types';
import { projectConfigModel } from '../../models/projectConfigModel';

/**
 * ============================================================================
 * [VIEW - LAYOUT] THANH ĐIỀU HƯỚNG CỐ ĐỊNH (NavbarView.tsx)
 * ============================================================================
 * Thiết kế chuẩn chống tràn dòng (whitespace-nowrap, shrink-0), hiển thị cân đối
 * trên mọi kích thước màn hình Laptop & PC.
 */

interface NavbarViewProps {
  config: typeof projectConfigModel;
  activeSection: SectionId;
  isMobileMenuOpen: boolean;
  onSelectSection: (id: SectionId) => void;
  onToggleMobileMenu: (open: boolean) => void;
}

export const NavbarView: React.FC<NavbarViewProps> = ({
  config,
  activeSection,
  isMobileMenuOpen,
  onSelectSection,
  onToggleMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/30 bg-[#F9F5EA]/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-3 px-4 md:px-6 py-2.5">
        {/* Cụm Trái: Logo Sắc Việt x ĐH Lạc Hồng (Gọn, không xuống dòng) */}
        <button
          onClick={() => onSelectSection('tong-quan')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <img
            src={config.sacVietLogoUrl}
            alt="Logo Sắc Việt"
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-gold bg-white object-cover shrink-0 shadow-xs transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col whitespace-nowrap">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-primary text-base md:text-lg leading-none tracking-tight">
                {config.projectShortName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                DBC 2026
              </span>
            </div>
            <span className="text-[10px] text-text-soft font-semibold uppercase mt-1 tracking-wide">
              {config.universityName}
            </span>
          </div>
        </button>

        {/* Cụm Giữa: Menu Điều Hướng 7 Mục (Chống xuống dòng tuyệt đối) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-1.5 flex-nowrap">
          {config.navigationItems.map((item: NavItem) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-text-main hover:bg-gold/20 hover:text-primary'
                }`}
              >
                <span className={`mr-1 text-[11px] font-extrabold ${isActive ? 'text-gold-light' : 'text-gold'}`}>
                  {item.shortNumber}.
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Cụm Phải: Nút Tải Đề Án & Mở Web Sản Phẩm MVP */}
        <div className="hidden md:flex items-center gap-2 shrink-0 whitespace-nowrap">
          <a
            href={config.links.proposalDocxDownloadUrl}
            download={config.links.proposalDocxFileName}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gold/45 bg-white hover:bg-gold/15 text-text-main text-xs font-bold transition-all whitespace-nowrap shrink-0"
            title="Tải Bản Mô Tả Dự Án Sắc Việt (.DOCX)"
          >
            <FileDown size={14} className="text-primary shrink-0" />
            <span>Tải Mô Tả Dự Án</span>
          </a>
          <a
            href={config.links.liveMvpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0"
          >
            <span>Web Sản Phẩm MVP</span>
            <ExternalLink size={13} className="shrink-0" />
          </a>
        </div>

        {/* Nút Mở Menu Trên Màn Hình Nhỏ / Điện Thoại */}
        <button
          onClick={() => onToggleMobileMenu(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl border border-gold/35 bg-white text-primary shrink-0"
          aria-label="Mở menu điều hướng"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu Mở Rộng Cho Tablet / Điện Thoại */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gold/25 bg-[#F9F5EA] px-4 py-4 shadow-lg space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {config.navigationItems.map((item: NavItem) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-left text-xs font-bold whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-white border border-gold/25 text-text-main'
                  }`}
                >
                  <span className={isActive ? 'text-gold-light' : 'text-gold'}>
                    {item.shortNumber}.
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <a
              href={config.links.liveMvpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold whitespace-nowrap"
            >
              <span>Trải Nghiệm Sản Phẩm MVP</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={config.links.proposalDocxDownloadUrl}
              download={config.links.proposalDocxFileName}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gold/40 bg-white text-text-main text-xs font-bold whitespace-nowrap"
            >
              <FileDown size={14} className="text-primary" />
              <span>Tải Mô Tả Dự Án (.DOCX)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
