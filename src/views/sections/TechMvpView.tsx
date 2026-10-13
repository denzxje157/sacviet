import React from 'react';
import { Cpu, ExternalLink, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { MvpModulePreview } from '../../models/types';
import { techAndMvpModel } from '../../models/proposalModel';

/**
 * ============================================================================
 * [VIEW - SECTION 04] CÔNG NGHỆ LÕI & TRẢI NGHIỆM SẢN PHẨM MVP (TechMvpView.tsx)
 * ============================================================================
 */

interface TechMvpViewProps {
  data: typeof techAndMvpModel;
  activeTabId: string;
  activeModule: MvpModulePreview;
  onSelectTab: (id: string) => void;
  getLiveUrl: (routePath: string) => string;
}

export const TechMvpView: React.FC<TechMvpViewProps> = ({
  data,
  activeTabId,
  activeModule,
  onSelectTab,
  getLiveUrl,
}) => {
  return (
    <section id="cong-nghe-mvp" className="py-14 md:py-20 border-b border-gold/25">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Tiêu đề Section */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Cpu size={14} className="shrink-0" />
            <span>{data.sectionBadge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight">
            {data.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-text-soft leading-relaxed">
            {data.sectionSubtitle}
          </p>
        </div>

        {/* 4 Trụ Cột Công Nghệ Lõi (Gemini AI, Leaflet Map, D2C, Serverless) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.techPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl p-6 glass-card shadow-xs hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-primary text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                  {pillar.badge}
                </span>
                <h3 className="font-bold text-lg text-text-main leading-snug">
                  {pillar.title}
                </h3>
                <div className="text-[11px] font-bold text-gold uppercase tracking-wider">
                  {pillar.techStack}
                </div>
                <p className="text-xs text-text-soft leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gold/25 text-xs font-bold text-primary flex items-start gap-1.5 leading-snug">
                <Sparkles size={14} className="shrink-0 mt-0.5 text-gold" />
                <span>{pillar.impactHighlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Khung Interactive Showcase: Khám phá 4 Phân khu Sản phẩm MVP Sắc Việt */}
        <div className="mt-12 rounded-3xl bg-[#2B0505] text-white p-6 md:p-9 border-2 border-gold/50 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div>
              <div className="inline-flex items-center gap-2 text-gold-light text-xs font-bold uppercase tracking-wider">
                <Layers size={15} className="shrink-0" />
                <span>Minh Chứng Sản Phẩm Đã Lập Trình Hoàn Thiện (Live MVP Showcase)</span>
              </div>
              <h3 className="font-black text-xl md:text-2xl text-white mt-1">
                Khám Phá 04 Phân Khu Của Nền Tảng Sắc Việt
              </h3>
            </div>
            <a
              href={getLiveUrl('')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold hover:bg-amber-500 text-[#2B0505] font-bold text-xs uppercase tracking-wider transition-all shrink-0 whitespace-nowrap"
            >
              <span>Mở Toàn Bộ Web App Sắc Việt</span>
              <ExternalLink size={15} className="shrink-0" />
            </a>
          </div>

          {/* Thanh chuyển Tab 4 Phân khu - Đồng đều chiều cao */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {data.mvpModules.map((mod) => {
              const isSelected = mod.id === activeTabId;
              return (
                <button
                  key={mod.id}
                  onClick={() => onSelectTab(mod.id)}
                  className={`px-4 py-3 rounded-xl text-left text-xs font-bold transition-all cursor-pointer border truncate ${
                    isSelected
                      ? 'bg-primary text-white border-gold shadow-md'
                      : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {mod.tabName}
                </button>
              );
            })}
          </div>

          {/* Nội dung chi tiết của Tab đang chọn */}
          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                {activeModule.badge}
              </span>
              <h4 className="font-black text-xl md:text-2xl text-gold-light leading-snug">
                {activeModule.headline}
              </h4>
              <p className="text-sm text-white/85 leading-relaxed">
                {activeModule.description}
              </p>
              <div className="space-y-2.5 pt-1">
                {activeModule.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-white/90">
                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href={getLiveUrl(activeModule.routePath)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-gold-light text-[#2B0505] font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
                >
                  <span>{activeModule.liveActionText}</span>
                  <ExternalLink size={14} className="shrink-0" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border-2 border-gold/40 bg-black/40 shadow-lg">
                <div className="px-4 py-2.5 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs text-white/70">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="font-mono text-gold-light">
                    sacviet.app{activeModule.routePath}
                  </span>
                </div>
                <div className="aspect-[16/10] relative">
                  <img
                    src={activeModule.imageUrl}
                    alt={activeModule.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <div className="text-xs text-white/95">
                      <span className="font-bold text-gold-light">Trạng thái:</span> Đã tích hợp cơ sở dữ liệu Supabase & sẵn sàng giao dịch thực tế.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
