import React from 'react';
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
      {/* Thanh Điều Hướng Cố Định */}
      <NavbarView
        config={models.config}
        activeSection={state.activeSection}
        isMobileMenuOpen={state.isMobileMenuOpen}
        onSelectSection={actions.scrollToSection}
        onToggleMobileMenu={actions.setIsMobileMenuOpen}
      />

      {/* Nội Dung Chính Gồm 7 Phân Khu Báo Cáo Đề Án */}
      <main className="flex-grow">
        {/* 01. Tổng Quan & Kết Nối Sản Phẩm Thực Tế */}
        <HeroView
          config={models.config}
          onSelectSection={actions.scrollToSection}
        />

        {/* 02. Đội Thi ĐH Lạc Hồng & Nguồn Lực Thực Hiện (Yêu cầu BTC) */}
        <TeamView
          overview={models.teamOverview}
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

        {/* 07. Chiến Lược & Nội Dung Truyền Thông (Mục 7 Đề Án - Yêu cầu BTC) */}
        <MarketingView data={models.marketing} />
      </main>

      {/* Chân Trang Hồ Sơ Dự Thi */}
      <FooterView
        config={models.config}
        onSelectSection={actions.scrollToSection}
      />
    </div>
  );
};

export default App;
