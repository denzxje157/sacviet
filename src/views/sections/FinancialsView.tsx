import React from 'react';
import { TrendingUp, Coins, Calculator, Landmark } from 'lucide-react';
import { financialModel } from '../../models/financialModel';

/**
 * ============================================================================
 * [VIEW - SECTION 06] BẢNG SỐ LIỆU TÀI CHÍNH & GỌI VỐN (FinancialsView.tsx)
 * ============================================================================
 */

interface FinancialsViewProps {
  data: typeof financialModel;
  simulatedMonthlyOrders: number;
  simulatedAvgOrderValueK: number;
  simulationResult: {
    annualGmvMillion: number;
    artisanIncomeMillion: number;
    totalPlatformRevenueMillion: number;
    netProfitMillion: number;
  };
  onChangeOrders: (orders: number) => void;
  onChangeOrderValue: (valueK: number) => void;
}

export const FinancialsView: React.FC<FinancialsViewProps> = ({
  data,
  simulatedMonthlyOrders,
  simulatedAvgOrderValueK,
  simulationResult,
  onChangeOrders,
  onChangeOrderValue,
}) => {
  return (
    <section id="tai-chinh" className="py-14 md:py-20 border-b border-gold/25">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Tiêu đề Section */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <TrendingUp size={14} className="shrink-0" />
            <span>{data.sectionBadge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight">
            {data.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-text-soft leading-relaxed">
            {data.sectionSubtitle}
          </p>
        </div>

        {/* 4 Chỉ Số Tài Chính Cốt Lõi (CAPEX, OPEX, Biên Lợi Nhuận, Hòa Vốn) - Chống xuống dòng số liệu */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.keyMetrics.map((metric, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 md:p-6 border-2 transition-all ${
                metric.highlight
                  ? 'bg-[#2B0505] text-white border-gold shadow-lg'
                  : 'bg-white text-text-main border-gold/35 shadow-xs'
              }`}
            >
              <div
                className={`text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                  metric.highlight ? 'text-gold-light' : 'text-text-soft'
                }`}
              >
                {metric.label}
              </div>
              <div
                className={`font-black text-xl xl:text-2xl mt-2 whitespace-nowrap ${
                  metric.highlight ? 'text-gold' : 'text-primary'
                }`}
              >
                {metric.value}
              </div>
              <p
                className={`text-xs mt-2 leading-relaxed ${
                  metric.highlight ? 'text-white/80' : 'text-text-soft'
                }`}
              >
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Nguồn Thu Chính & Lộ Trình Tăng Trưởng Doanh Thu 3 Năm */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cột Trái: 3 Nguồn Doanh Thu */}
          <div className="lg:col-span-6 p-6 md:p-7 rounded-2xl bg-white border border-gold/40 shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <Coins size={20} className="text-primary shrink-0" />
              <h3 className="font-black text-xl md:text-2xl text-primary">
                Cơ Cấu 03 Nguồn Thu Bền Vững
              </h3>
            </div>
            <div className="space-y-5">
              {data.revenueStreams.map((stream) => (
                <div key={stream.id} className="space-y-2 pb-4 border-b border-gold/20 last:border-b-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-sm md:text-base text-text-main">
                      {stream.name}
                    </h4>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold whitespace-nowrap">
                      {stream.rateOrScale}
                    </span>
                  </div>
                  <p className="text-xs text-text-soft leading-relaxed">
                    {stream.description}
                  </p>
                  <div className="w-full h-2.5 rounded-full bg-gold/15 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-gold rounded-full"
                      style={{ width: `${stream.sharePercent}%` }}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-right text-text-soft">
                    Tỷ trọng đóng góp mục tiêu: {stream.sharePercent}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột Phải: Biểu Đồ Dự Phóng Doanh Thu 3 Năm */}
          <div className="lg:col-span-6 p-6 md:p-7 rounded-2xl bg-white border border-gold/40 shadow-xs space-y-5 flex flex-col justify-between">
            <div>
              <h3 className="font-black text-xl md:text-2xl text-primary">
                Dự Phóng Doanh Thu 03 Năm Đầu Tiên
              </h3>
              <p className="text-xs text-text-soft mt-1">
                Tăng trưởng từ thị trường nội địa sang xuất khẩu văn hóa đa ngôn ngữ
              </p>

              <div className="mt-5 space-y-4">
                {data.yearlyProjections.map((proj, idx) => {
                  const widthPercent = Math.round((proj.revenueNumericMaxBillion / 5.0) * 100);
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-background-light border border-gold/30 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">
                            {proj.year}
                          </span>
                          <span className="mx-2 text-gold">•</span>
                          <span className="text-xs font-bold text-text-main">
                            {proj.phaseName}
                          </span>
                        </div>
                        <span className="font-black text-base md:text-lg text-primary whitespace-nowrap">
                          {proj.revenueRange}
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-white border border-gold/30 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${widthPercent}%` }}
                        />
                      </div>
                      <div className="text-xs font-bold text-text-main">
                        Quy mô: {proj.targetOrders}
                      </div>
                      <p className="text-xs text-text-soft leading-relaxed">
                        {proj.keyMilestone}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Kế Hoạch Huy Động Vốn & Công Cụ Mô Phỏng Tương Tác Dành Cho BGK */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Giải pháp Huy động vốn (Mục 6 Đề án) */}
          <div className="lg:col-span-5 p-6 md:p-7 rounded-2xl glass-card shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Landmark size={20} className="text-primary shrink-0" />
              <h3 className="font-black text-lg md:text-xl text-primary">
                Giải Pháp Huy Động & Phân Bổ Vốn
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white border border-gold/30">
                <div className="text-[11px] font-bold uppercase tracking-wider text-text-soft">
                  Vốn Tự Có Đã Giải Ngân
                </div>
                <div className="font-black text-lg text-primary mt-1 whitespace-nowrap">
                  {data.fundingPlan.selfFundedAmount}
                </div>
                <p className="text-xs text-text-soft mt-1 leading-relaxed">
                  {data.fundingPlan.selfFundedDetail}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-primary text-white">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gold-light">
                  Vốn Huy Động Thương Mại
                </div>
                <div className="font-black text-lg text-gold-light mt-1 whitespace-nowrap">
                  {data.fundingPlan.targetRaiseAmount}
                </div>
                <p className="text-xs text-white/85 mt-1 leading-relaxed">
                  Quỹ SV Khởi nghiệp, Impact Startup & Crowdfunding
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-text-main">
                Cơ cấu sử dụng vốn gọi thêm:
              </div>
              {data.fundingPlan.allocation.map((alloc, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between gap-2 text-xs font-medium">
                    <span>{alloc.item}</span>
                    <span className="font-bold text-primary whitespace-nowrap">{alloc.percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gold/20 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${alloc.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Công Cụ Mô Phỏng Dòng Tiền & Tác Động Xã Hội (Interactive Calculator) */}
          <div className="lg:col-span-7 p-6 md:p-7 rounded-2xl bg-[#2B0505] text-white border-2 border-gold/50 shadow-lg space-y-6">
            <div className="flex items-start gap-2.5">
              <Calculator size={22} className="text-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black text-lg md:text-xl text-gold-light">
                  Mô Phỏng Doanh Thu & Tác Động Xã Hội (Interactive)
                </h3>
                <p className="text-xs text-white/75 mt-0.5">
                  Kéo thanh trượt để kiểm chứng bài toán tài chính và thu nhập chuyển trực tiếp về Nghệ nhân
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/15 space-y-2">
                <div className="flex justify-between items-center gap-2 text-xs font-bold">
                  <span className="text-white/80">Số đơn B2C / tháng:</span>
                  <span className="text-gold-light font-black text-sm whitespace-nowrap">
                    {simulatedMonthlyOrders.toLocaleString('vi-VN')} đơn/tháng
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={2500}
                  step={50}
                  value={simulatedMonthlyOrders}
                  onChange={(e) => onChangeOrders(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-white/55">
                  <span>200 đơn</span>
                  <span>500 đơn (Năm 1)</span>
                  <span>2.500 đơn</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/15 space-y-2">
                <div className="flex justify-between items-center gap-2 text-xs font-bold">
                  <span className="text-white/80">Giá trị đơn TB (AOV):</span>
                  <span className="text-gold-light font-black text-sm whitespace-nowrap">
                    {simulatedAvgOrderValueK.toLocaleString('vi-VN')}.000 VNĐ
                  </span>
                </div>
                <input
                  type="range"
                  min={250}
                  max={900}
                  step={50}
                  value={simulatedAvgOrderValueK}
                  onChange={(e) => onChangeOrderValue(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-white/55">
                  <span>250k VNĐ</span>
                  <span>450k VNĐ</span>
                  <span>900k VNĐ</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/10 border border-gold/30">
                <div className="text-[11px] font-bold uppercase text-white/75 whitespace-nowrap">
                  Tổng GMV / Năm
                </div>
                <div className="font-black text-lg text-white mt-1 whitespace-nowrap">
                  {simulationResult.annualGmvMillion.toLocaleString('vi-VN')} Tr
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-400/40">
                <div className="text-[11px] font-bold uppercase text-emerald-300 whitespace-nowrap">
                  Về Nghệ Nhân (~89%)
                </div>
                <div className="font-black text-lg text-emerald-300 mt-1 whitespace-nowrap">
                  {simulationResult.artisanIncomeMillion.toLocaleString('vi-VN')} Tr
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-gold/20 border border-gold">
                <div className="text-[11px] font-bold uppercase text-gold-light whitespace-nowrap">
                  Doanh Thu Sàn/Năm
                </div>
                <div className="font-black text-lg text-gold-light mt-1 whitespace-nowrap">
                  {simulationResult.totalPlatformRevenueMillion.toLocaleString('vi-VN')} Tr
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-gold/30">
                <div className="text-[11px] font-bold uppercase text-white/75 whitespace-nowrap">
                  Lãi Ròng (~22.5%)
                </div>
                <div className="font-black text-lg text-white mt-1 whitespace-nowrap">
                  {simulationResult.netProfitMillion.toLocaleString('vi-VN')} Tr
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
