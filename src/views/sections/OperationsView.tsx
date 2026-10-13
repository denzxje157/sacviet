import React from 'react';
import { Truck, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { operationsModel } from '../../models/proposalModel';

/**
 * ============================================================================
 * [VIEW - SECTION 05] KẾ HOẠCH SẢN XUẤT KINH DOANH & CHUỖI CUNG ỨNG O2O (OperationsView.tsx)
 * ============================================================================
 */

interface OperationsViewProps {
  data: typeof operationsModel;
}

export const OperationsView: React.FC<OperationsViewProps> = ({ data }) => {
  return (
    <section id="van-hanh-o2o" className="py-14 md:py-20 bg-white/60 border-b border-gold/25">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Tiêu đề Section */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Truck size={14} className="shrink-0" />
            <span>{data.sectionBadge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight">
            {data.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-text-soft leading-relaxed">
            {data.sectionSubtitle}
          </p>
        </div>

        {/* Sơ đồ Chuỗi Cung Ứng & Vận Hành 4 Bước (Visual Flowchart) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.supplyChainSteps.map((step, idx) => (
            <div
              key={step.stepNumber}
              className="relative rounded-2xl p-6 bg-white border-2 border-gold/35 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                    {step.stepNumber}
                  </span>
                  {idx < data.supplyChainSteps.length - 1 && (
                    <ArrowRight size={18} className="hidden lg:block text-gold shrink-0" />
                  )}
                </div>
                <h3 className="font-bold text-lg text-text-main leading-snug">
                  {step.title}
                </h3>
                <div className="text-xs font-bold text-primary">
                  {step.subtitle}
                </div>
                <p className="text-xs text-text-soft leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gold/25">
                <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                  ✓ {step.highlightTag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quản Trị Rủi Ro & Giải Pháp Khắc Phục */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-5">
            <ShieldAlert size={20} className="text-primary shrink-0" />
            <h3 className="font-black text-xl md:text-2xl text-primary">
              Phân Tích Rủi Ro Thực Tế & Giải Pháp Hóa Giải
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {data.riskManagement.map((risk, idx) => (
              <div key={idx} className="rounded-2xl p-6 glass-card shadow-xs space-y-3.5">
                <h4 className="font-bold text-base md:text-lg text-primary leading-snug">
                  {risk.riskTitle}
                </h4>
                <div className="p-3.5 rounded-xl bg-red-50/85 border border-red-200/70 text-xs text-text-main leading-relaxed">
                  <strong className="text-primary block mb-1 uppercase tracking-wider text-[11px]">
                    Thách thức:
                  </strong>
                  {risk.challenge}
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-50/85 border border-emerald-200/70 text-xs text-text-main leading-relaxed">
                  <strong className="text-emerald-800 flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[11px]">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Giải pháp của Sắc Việt:</span>
                  </strong>
                  {risk.mitigation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
