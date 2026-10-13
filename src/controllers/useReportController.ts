import { useState, useEffect, useMemo, useCallback } from 'react';
import { SectionId, TeamMember } from '../models/types';
import { projectConfigModel } from '../models/projectConfigModel';
import { teamMembersData, teamOverviewModel, strategicPartnersData } from '../models/teamModel';
import { problemSolutionModel, techAndMvpModel, operationsModel } from '../models/proposalModel';
import { financialModel } from '../models/financialModel';
import { marketingModel } from '../models/marketingModel';

/**
 * ============================================================================
 * [CONTROLLER] BỘ ĐIỀU KHIỂN TRUNG TÂM (useReportController.ts)
 * ============================================================================
 * -> Đóng vai trò cầu nối giữa [MODEL] (Dữ liệu) và [VIEW] (Giao diện).
 * -> Xử lý toàn bộ logic: cuộn trang (Scroll-spy), lọc thành viên Đội thi,
 *    chuyển tab xem trước Sản phẩm MVP, và mô phỏng bài toán Tài chính.
 */

export const useReportController = () => {
  // 1. State điều hướng & Menu di động
  const [activeSection, setActiveSection] = useState<SectionId>('tong-quan');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // 2. State lọc vai trò thành viên Đội thi
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('ALL');

  // 3. State chuyển đổi Tab xem trước các phân khu Sản phẩm MVP Sắc Việt
  const [activeMvpTabId, setActiveMvpTabId] = useState<string>(
    techAndMvpModel.mvpModules[0]?.id || 'map-home'
  );

  // 4. State công cụ Mô phỏng Tài chính & Tác động xã hội tương tác (dành cho BGK)
  const [simulatedMonthlyOrders, setSimulatedMonthlyOrders] = useState<number>(500);
  const [simulatedAvgOrderValueK, setSimulatedAvgOrderValueK] = useState<number>(450); // 450.000 VNĐ/đơn

  // Theo dõi vị trí cuộn trang để tự động sáng mục tương ứng trên thanh Navbar
  useEffect(() => {
    const sectionIds = projectConfigModel.navigationItems.map((item) => item.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hàm cuộn mượt tới một mục cụ thể trên trang
  const scrollToSection = useCallback((sectionId: SectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  // Lọc danh sách thành viên theo vai trò (ALL, CEO, CTO, COO, CMO, CCO)
  const filteredTeamMembers: TeamMember[] = useMemo(() => {
    if (selectedRoleFilter === 'ALL') {
      return teamMembersData;
    }
    return teamMembersData.filter((member) => member.roleCode === selectedRoleFilter);
  }, [selectedRoleFilter]);

  // Lấy thông tin phân khu MVP đang được chọn xem trước
  const activeMvpModule = useMemo(() => {
    return (
      techAndMvpModel.mvpModules.find((mod) => mod.id === activeMvpTabId) ||
      techAndMvpModel.mvpModules[0]
    );
  }, [activeMvpTabId]);

  // Tạo link mở trực tiếp tới đúng phân khu trên Web Sản phẩm MVP
  const getLiveMvpModuleUrl = useCallback((routePath: string = '') => {
    const baseUrl = projectConfigModel.links.liveMvpUrl.replace(/\/$/, '');
    return `${baseUrl}${routePath}`;
  }, []);

  // Tính toán mô phỏng doanh thu & dòng tiền về tay nghệ nhân theo năm
  const financialSimulation = useMemo(() => {
    // Tổng giá trị giao dịch hàng hóa (GMV) 1 năm (đơn vị: Triệu VNĐ)
    const annualGmvMillion = (simulatedMonthlyOrders * simulatedAvgOrderValueK * 12) / 1000;
    // Thu nhập chuyển trực tiếp về Hợp tác xã & Nghệ nhân (~89% GMV nhờ mô hình D2C phí thấp 11%)
    const artisanIncomeMillion = Math.round(annualGmvMillion * 0.89);
    // Doanh thu phí hoa hồng sàn (11% GMV) + Doanh thu hợp đồng B2B & Dịch vụ (~35% tổng thu)
    const platformCommissionMillion = annualGmvMillion * 0.11;
    const totalPlatformRevenueMillion = Math.round(platformCommissionMillion / 0.65);
    // Lợi nhuận ròng ước tính (Biên lợi nhuận ròng trung bình 22.5%)
    const netProfitMillion = Math.round(totalPlatformRevenueMillion * 0.225);

    return {
      annualGmvMillion: Math.round(annualGmvMillion),
      artisanIncomeMillion,
      totalPlatformRevenueMillion,
      netProfitMillion,
    };
  }, [simulatedMonthlyOrders, simulatedAvgOrderValueK]);

  return {
    // Models được cấp phát qua Controller
    models: {
      config: projectConfigModel,
      teamOverview: teamOverviewModel,
      teamMembers: filteredTeamMembers,
      allTeamMembers: teamMembersData,
      partners: strategicPartnersData,
      problemSolution: problemSolutionModel,
      techAndMvp: techAndMvpModel,
      operations: operationsModel,
      financial: financialModel,
      marketing: marketingModel,
    },
    // State & Actions điều khiển giao diện
    state: {
      activeSection,
      isMobileMenuOpen,
      selectedRoleFilter,
      activeMvpTabId,
      activeMvpModule,
      simulatedMonthlyOrders,
      simulatedAvgOrderValueK,
      financialSimulation,
    },
    actions: {
      scrollToSection,
      setIsMobileMenuOpen,
      setSelectedRoleFilter,
      setActiveMvpTabId,
      getLiveMvpModuleUrl,
      setSimulatedMonthlyOrders,
      setSimulatedAvgOrderValueK,
    },
  };
};
