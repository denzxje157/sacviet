import React from 'react';
import { Info } from 'lucide-react';
import { useReportController } from './controllers/useReportController';
import { NavbarView } from './views/layout/NavbarView';
import { FooterView } from './views/layout/FooterView';
import { HeroView } from './views/sections/HeroView';
import { TeamView } from './views/sections/TeamView';
import { ProblemSolutionView } from './views/sections/ProblemSolutionView';
import { TechMvpView } from './views/sections/TechMvpView';
import { OperationsView } from './views/sections/OperationsView';
import { FinancialsView } from './views/sections/FinancialsView';
import { MarketingView } from './views/sections/MarketingView';
import { ReferenceView } from './views/sections/ReferenceView';
import { PolicyDetailView } from './views/policies/PolicyDetailView';

/**
 * ============================================================================
 * [APP ROOT] KẾT NỐI KIẾN TRÚC MVC (App.tsx)
 * ============================================================================
 * - [M] Models:      `src/models/*` (Chứa toàn bộ dữ liệu chữ, số, link, thành viên)
 * - [C] Controller:  `src/controllers/useReportController.ts` (Xử lý trạng thái & tương tác)
 * - [V] Views:       `src/views/*` (Hiển thị từng phân khu giao diện riêng biệt)
 */

const App: React.FC = () => {
  const { models, state, actions } = useReportController();

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      {/* Banner Thông Báo Dữ Liệu Minh Họa Mẫu */}
      <aside
        aria-label="Thông báo phiên bản thử nghiệm"
        className="bg-[#2B0505] text-gold-light border-b border-gold/40 px-4 py-2 text-center text-xs flex items-center justify-center gap-2"
      >
        <Info size={14} className="text-gold shrink-0" />
        <span className="font-medium">{models.config.mockDataDisclaimer}</span>
      </aside>

      {/* Thanh Điều Hướng Cố Định */}
      <NavbarView
        config={models.config}
        activeSection={state.activeSection}
        isMobileMenuOpen={state.isMobileMenuOpen}
        onSelectSection={(id) => {
          if (state.selectedPolicyId) {
            actions.closePolicy();
            setTimeout(() => actions.scrollToSection(id), 100);
          } else {
            actions.scrollToSection(id);
          }
        }}
        onToggleMobileMenu={actions.setIsMobileMenuOpen}
      />

      {/* Nội Dung Chính: Hiển thị Trang Chính Sách hoặc 8 Phân Khu Báo Cáo */}
      <main className="flex-grow">
        {state.selectedPolicyId ? (
          <PolicyDetailView
            policyId={state.selectedPolicyId}
            onBackToReport={actions.closePolicy}
            onSelectPolicy={actions.openPolicy}
          />
        ) : (
          <>
            {/* 01. Tổng Quan & Kết Nối Sản Phẩm Thực Tế */}
            <HeroView
              config={models.config}
              onSelectSection={actions.scrollToSection}
            />

            {/* 02. Đội Thi ĐH Lạc Hồng & Nguồn Lực Thực Hiện (Kèm Minh chứng thực địa) */}
            <TeamView
              overview={models.teamOverview}
              fieldwork={models.fieldwork}
              members={models.teamMembers}
              partners={models.partners}
              selectedRoleFilter={state.selectedRoleFilter}
              onSelectRoleFilter={actions.setSelectedRoleFilter}
            />

            {/* 03. Tính Cần Thiết & Giá Trị Kép (Mục 1 Đề Án) */}
            <ProblemSolutionView data={models.problemSolution} />

            {/* 04. Công Nghệ Lõi & Trải Nghiệm Sản Phẩm MVP (Mục 2 & 3 Đề Án) */}
            <TechMvpView
              data={models.techAndMvp}
              activeTabId={state.activeMvpTabId}
              activeModule={state.activeMvpModule}
              onSelectTab={actions.setActiveMvpTabId}
              getLiveUrl={actions.getLiveMvpModuleUrl}
            />

            {/* 05. Kế Hoạch Sản Xuất Kinh Doanh & Chuỗi Cung Ứng O2O (Mục 4 Đề Án) */}
            <OperationsView data={models.operations} />

            {/* 06. Bảng Số Liệu Tài Chính, Hòa Vốn & Huy Động Vốn (Mục 5 & 6 Đề Án) */}
            <FinancialsView
              data={models.financial}
              simulatedMonthlyOrders={state.simulatedMonthlyOrders}
              simulatedAvgOrderValueK={state.simulatedAvgOrderValueK}
              simulationResult={state.financialSimulation}
              onChangeOrders={actions.setSimulatedMonthlyOrders}
              onChangeOrderValue={actions.setSimulatedAvgOrderValueK}
            />

            {/* 07. Chiến Lược & Nội Dung Truyền Thông (Mục 7 Đề Án) */}
            <MarketingView data={models.marketing} />

            {/* 08. Nguồn Tham Khảo & Bảng Đối Soát Số Liệu */}
            <ReferenceView data={models.reference} />
          </>
        )}
      </main>

      {/* Chân Trang Hồ Sơ Dự Thi */}
      <FooterView
        config={models.config}
        onSelectSection={(id) => {
          if (state.selectedPolicyId) {
            actions.closePolicy();
            setTimeout(() => actions.scrollToSection(id), 100);
          } else {
            actions.scrollToSection(id);
          }
        }}
        onOpenPolicy={actions.openPolicy}
      />
    </div>
  );
};

export default App;
