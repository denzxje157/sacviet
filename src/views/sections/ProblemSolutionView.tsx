import React from 'react';
import { HeartHandshake, CheckCircle, XCircle, Target, Users2 } from 'lucide-react';
import { problemSolutionModel } from '../../models/proposalModel';

/**
 * ============================================================================
 * [VIEW - SECTION 03] TÍNH CẦN THIẾT & GIÁ TRỊ KÉP (ProblemSolutionView.tsx)
 * ============================================================================
 */

interface ProblemSolutionViewProps {
  data: typeof problemSolutionModel;
}

export const ProblemSolutionView: React.FC<ProblemSolutionViewProps> = ({ data }) => {
  return (
    <section id="tinh-can-thiet" className="py-14 md:py-20 bg-white/60 border-b border-gold/25">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Tiêu đề Section */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <HeartHandshake size={14} className="shrink-0" />
            <span>{data.sectionBadge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight">
            {data.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-text-soft leading-relaxed">
            {data.sectionSubtitle}
          </p>
        </div>

        {/* 2 Trụ cột Giá trị kép (Kinh tế D2C & Văn hóa Di sản) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.dualValueCards.map((card, idx) => (
            <div
              key={card.id}
              className={`rounded-2xl p-6 md:p-7 border-2 shadow-sm space-y-3.5 ${
                idx === 0
                  ? 'bg-gradient-to-br from-[#FFFDF9] to-[#F6E0A4]/25 border-gold/50'
                  : 'bg-gradient-to-br from-[#FFFDF9] to-primary/5 border-primary/30'
              }`}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
                {card.badge}
              </span>
              <h3 className="font-black text-xl md:text-2xl text-text-main leading-snug">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm font-bold text-primary">
                {card.subtitle}
              </p>
              <ul className="space-y-2.5 pt-1">
                {card.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-text-main leading-relaxed">
                    <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Đối tượng khách hàng mục tiêu */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <Users2 size={20} className="text-primary shrink-0" />
            <h3 className="font-black text-xl md:text-2xl text-primary">
              Chân Dung Khách Hàng Mục Tiêu Trọng Tâm
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.targetCustomers.map((cust, idx) => (
              <div key={idx} className="p-5 rounded-2xl glass-card shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Target size={16} className="text-gold shrink-0" />
                  <span>{cust.segment}</span>
                </div>
                <p className="text-xs text-text-soft leading-relaxed">
                  {cust.behavior}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bảng Đối Chiếu Lý Do Khách Hàng Chọn Sắc Việt Thay Vì Sàn Đại Trà */}
        <div className="mt-10">
          <h3 className="font-black text-xl md:text-2xl text-primary mb-4">
            Vì Sao Khách Hàng Chọn Sắc Việt Thay Vì Sàn TMĐT Đại Trà?
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gold/40 shadow-sm bg-white">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <thead>
                <tr className="bg-[#2B0505] text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-5 font-bold w-1/4 whitespace-nowrap">
                    Tiêu Chí Đối Chiếu
                  </th>
                  <th className="py-4 px-5 font-bold w-[37.5%] text-red-200 whitespace-nowrap">
                    Thương Lái Truyền Thống / Sàn Đại Trà
                  </th>
                  <th className="py-4 px-5 font-bold w-[37.5%] text-gold-light whitespace-nowrap">
                    Hệ Sinh Thái Số Sắc Việt (D2C + AI)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/20 text-xs md:text-sm">
                {data.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gold/5 transition-colors">
                    <td className="py-4 px-5 font-bold text-primary">
                      {row.criteria}
                    </td>
                    <td className="py-4 px-5 text-text-soft leading-relaxed">
                      <div className="flex items-start gap-2">
                        <XCircle size={16} className="text-red-600/75 shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-medium text-text-main bg-gold/5 leading-relaxed">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                        <span>{row.sacViet}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
