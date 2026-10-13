import React from 'react';
import { Megaphone, MapPinned, CheckCircle2, BarChart3, Wrench } from 'lucide-react';
import { marketingModel } from '../../models/marketingModel';

/**
 * ============================================================================
 * [VIEW - SECTION 07] CHIẾN LƯỢC & NỘI DUNG TRUYỀN THÔNG (MarketingView.tsx)
 * ============================================================================
 */

interface MarketingViewProps {
  data: typeof marketingModel;
}

export const MarketingView: React.FC<MarketingViewProps> = ({ data }) => {
  return (
    <section id="truyen-thong" className="py-14 md:py-20 bg-white/70">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Tiêu đề Section */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Megaphone size={14} className="shrink-0" />
            <span>{data.sectionBadge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight">
            {data.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-text-soft leading-relaxed">
            {data.sectionSubtitle}
          </p>
        </div>

        {/* Chiến dịch Tiếp thị Công nghệ Đột phá: Check-in Bản đồ ảo */}
        <div className="mt-8 rounded-3xl p-6 md:p-8 bg-gradient-to-r from-[#2B0505] via-[#4A0808] to-[#2B0505] text-white border-2 border-gold shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/25 border border-gold text-gold-light text-[11px] font-bold uppercase tracking-wider">
                <MapPinned size={14} className="shrink-0" />
                <span>{data.flagshipCampaign.badge}</span>
              </div>
              <h3 className="font-black text-xl md:text-2xl text-gold-light leading-snug">
                {data.flagshipCampaign.title}
              </h3>
              <p className="text-xs md:text-sm text-white/85 leading-relaxed">
                {data.flagshipCampaign.description}
              </p>
              <div className="space-y-2 pt-1">
                {data.flagshipCampaign.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-white/90">
                    <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-gold/40 bg-black/30">
                <img
                  src="/assets/showcase/lung-tam-batik.jpg"
                  alt="Chiến dịch Chạm vào di sản Sắc Việt"
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 bg-black/60 text-xs text-gold-light font-medium">
                  Thông điệp xuyên suốt: <strong>#SacViet #ChamVaoDiSan #BanDo54DanToc</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phễu Chuyển Đổi Truyền Thông 3 Giai Đoạn (Marketing Funnel) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.funnelStages.map((stage) => (
            <div
              key={stage.stageNumber}
              className="rounded-2xl p-6 bg-white border-2 border-gold/35 shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                    {stage.stageNumber}
                  </span>
                  <span className="text-[11px] font-bold text-gold uppercase tracking-wider whitespace-nowrap">
                    {stage.phaseName}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-text-main leading-snug">
                  {stage.vietnameseName}
                </h3>
                <p className="text-xs text-text-soft leading-relaxed">
                  {stage.objective}
                </p>
                <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-xs italic font-medium text-primary leading-relaxed">
                  {stage.coreMessage}
                </div>
                <ul className="space-y-2 pt-1">
                  {stage.activities.map((act, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-text-main leading-relaxed">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gold/25">
                <div className="text-[11px] font-bold uppercase tracking-wider text-text-soft mb-2">
                  Kênh tiếp cận trọng tâm:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stage.channels.map((ch, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-background-light border border-gold/35 text-[11px] font-bold text-primary whitespace-nowrap"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bộ Công Cụ Truyền Thông & Bảng Đo Lường Hiệu Suất Thời Gian Thực (KPIs) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bộ công cụ truyền thông */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-card space-y-4">
            <div className="flex items-center gap-2">
              <Wrench size={18} className="text-primary shrink-0" />
              <h3 className="font-black text-lg md:text-xl text-primary">
                Bộ Công Cụ Truyền Thông Chuẩn Hóa
              </h3>
            </div>
            <div className="space-y-3">
              {data.mediaTools.map((tool, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-gold/25 space-y-1">
                  <div className="font-bold text-sm text-text-main">
                    {tool.title}
                  </div>
                  <p className="text-xs text-text-soft leading-relaxed">
                    {tool.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chỉ số đo lường hiệu quả truyền thông (Real-time Tracking KPIs) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-gold/40 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-primary shrink-0" />
              <h3 className="font-black text-lg md:text-xl text-primary">
                Đo Lường Hiệu Quả Truyền Thông Thời Gian Thực (KPIs)
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.kpis.map((kpi, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-background-light border border-gold/30 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary text-white text-xs font-bold whitespace-nowrap">
                      {kpi.metricCode}
                    </span>
                    <span className="font-black text-base text-primary whitespace-nowrap">
                      {kpi.targetValue}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-text-main">
                    {kpi.metricName}
                  </div>
                  <p className="text-xs text-text-soft leading-relaxed">
                    {kpi.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
