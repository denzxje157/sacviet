import React from 'react';
import { BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { referenceModel } from '../../models/referenceModel';

/**
 * ============================================================================
 * [VIEW - SECTION 08] NGUỒN THAM KHẢO & DỮ LIỆU ĐỐI SOÁT (ReferenceView.tsx)
 * ============================================================================
 * Bảng đối soát các số liệu trích dẫn trong đề án theo chuẩn học thuật.
 */

interface ReferenceViewProps {
  data: typeof referenceModel;
}

export const ReferenceView: React.FC<ReferenceViewProps> = ({ data }) => {
  return (
    <section id="nguon-tham-khao" className="py-14 md:py-20 bg-white/70 border-b border-gold/25">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Tiêu đề Section */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <BookOpen size={14} className="shrink-0" />
            <span>{data.sectionBadge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight">
            {data.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-text-soft leading-relaxed">
            {data.sectionSubtitle}
          </p>
        </div>

        {/* Bảng Nguồn Tham Khảo */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left border-collapse">
              <thead>
                <tr className="bg-[#2B0505] text-white text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-3.5 font-bold w-14 text-center">STT</th>
                  <th className="py-3.5 px-4 font-bold w-1/4 min-w-[200px]">Số liệu trích dẫn</th>
                  <th className="py-3.5 px-4 font-bold w-1/3 min-w-[240px]">Nguồn tham chiếu</th>
                  <th className="py-3.5 px-3 font-bold w-18 text-center">Năm</th>
                  <th className="py-3.5 px-4 font-bold min-w-[180px]">Liên kết / Minh chứng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/20">
                {data.references.map((item) => (
                  <tr key={item.id} id={item.id} className="hover:bg-gold/5 transition-colors scroll-mt-28">
                    <td className="py-3.5 px-3.5 text-center font-bold text-primary align-top text-[13px]">
                      [{item.refIndex}]
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <div className="text-[15px] font-semibold text-text-main leading-snug">
                        {item.statistic}
                      </div>
                      <div className="text-[13px] font-normal text-text-soft mt-1 leading-relaxed">
                        {item.claimContext}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <div className="text-[13px] font-normal text-text-soft leading-relaxed">
                        {item.source}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center align-top">
                      <span className="text-[13px] font-medium text-text-main">
                        {item.year}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      {item.links && item.links.length > 0 ? (
                        <div className="flex flex-col gap-1.5">
                          {item.links.map((lnk, idx) => (
                            <a
                              key={idx}
                              href={lnk.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark hover:underline font-semibold text-[13px] py-0.5"
                            >
                              <span className="break-words">{lnk.label}</span>
                              <ExternalLink size={12} className="shrink-0 text-gold" />
                            </a>
                          ))}
                        </div>
                      ) : item.link && item.link.startsWith('http') ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark hover:underline font-semibold text-[13px] py-0.5"
                        >
                          <span>Xem tài liệu</span>
                          <ExternalLink size={12} className="shrink-0 text-gold" />
                        </a>
                      ) : (
                        <span className="text-[13px] text-text-soft">
                          {item.link || ''}
                        </span>
                      )}
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
