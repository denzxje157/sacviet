import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Calendar, AlertCircle } from 'lucide-react';
import { policiesData } from '../../models/policyModel';

interface PolicyDetailViewProps {
  policyId: string;
  onBackToReport: () => void;
  onSelectPolicy: (id: string) => void;
}

export const PolicyDetailView: React.FC<PolicyDetailViewProps> = ({
  policyId,
  onBackToReport,
  onSelectPolicy,
}) => {
  const policy = policiesData[policyId] || policiesData['doi-tra-hoan-tien'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [policyId]);

  return (
    <div className="min-h-screen bg-[#F9F5EA] text-text-main py-8 md:py-14">
      <div className="mx-auto max-w-[960px] px-4 md:px-6">
        {/* Nút Quay Lại Trang Báo Cáo */}
        <div className="mb-6">
          <button
            onClick={onBackToReport}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gold/40 text-primary hover:bg-gold/15 text-xs md:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Quay lại trang báo cáo đề án</span>
          </button>
        </div>

        {/* Khung Nội Dung Chính Của Chính Sách */}
        <article className="rounded-3xl bg-white border-2 border-gold/40 p-6 md:p-10 shadow-lg space-y-6">
          {/* Header Chính sách */}
          <div className="pb-6 border-b border-gold/25 space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
              {policy.badge}
            </span>
            <h1 className="font-black text-2xl sm:text-3xl text-primary leading-tight">
              {policy.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-soft font-medium pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-gold" />
                <span>Ngày cập nhật: <strong>{policy.lastUpdated}</strong></span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-amber-800">
                <Shield size={14} className="text-gold" />
                <span>Dự thảo vận hành nền tảng TMĐT Sắc Việt</span>
              </span>
            </div>
          </div>

          {/* Banner Lưu ý trung lập & Khung pháp lý */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-text-main flex items-start gap-3 leading-relaxed">
            <AlertCircle size={18} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Lưu ý về tính pháp lý:</strong> Bản văn bản này là khung quy chế dự thảo phục vụ thẩm định đề án khởi nghiệp sinh viên. Mọi thông tin pháp nhân, mã số thuế và thời hạn cụ thể được giữ ở dạng <code className="text-primary font-bold">[CẦN ĐIỀN]</code> và sẽ hoàn thiện khi dự án thành lập doanh nghiệp chính thức.
            </div>
          </div>

          {/* Các mục nội dung chi tiết */}
          <div className="space-y-6 pt-2">
            {policy.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h2 className="font-bold text-base md:text-lg text-primary">
                  {sec.heading}
                </h2>
                <div className="space-y-2 text-xs md:text-sm text-text-main/90 leading-relaxed pl-2 border-l-2 border-gold/30">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Điều hướng nhanh sang các chính sách khác */}
          <div className="pt-8 border-t border-gold/25 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-text-soft">
              Xem các chính sách liên quan:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.values(policiesData).map((p) => {
                const isActive = p.id === policy.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onSelectPolicy(p.id)}
                    className={`p-3 rounded-xl text-left text-xs font-bold transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white border-gold shadow-xs'
                        : 'bg-background-light text-text-main border-gold/25 hover:bg-gold/15'
                    }`}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
