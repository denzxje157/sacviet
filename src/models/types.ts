/**
 * ============================================================================
 * [MODEL - TYPES] ĐỊNH NGHĨA CẤU TRÚC DỮ LIỆU CỦA TOÀN BỘ WEBSITE BÁO CÁO
 * ============================================================================
 * File này quy định kiểu dữ liệu cho các Model. Khi sửa nội dung chữ/số,
 * bạn chỉ cần mở các file *Model.ts cùng thư mục `src/models/`.
 */

export type SectionId =
  | 'tong-quan'
  | 'doi-thi'
  | 'tinh-can-thiet'
  | 'cong-nghe-mvp'
  | 'van-hanh-o2o'
  | 'tai-chinh'
  | 'truyen-thong';

export interface NavItem {
  id: SectionId;
  label: string;
  shortNumber: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  roleCode: 'CEO' | 'CTO' | 'COO' | 'CMO' | 'CCO';
  roleTitle: string;
  isLeader?: boolean;
  className: string;
  university: string;
  phone: string;
  email: string;
  avatarUrl: string;
  responsibilities: string[];
  skills: string[];
}

export interface PartnerGroup {
  category: string;
  title: string;
  items: string[];
  description: string;
}

export interface ComparisonPoint {
  criteria: string;
  traditional: string;
  sacViet: string;
}

export interface CoreValueCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  points: string[];
}

export interface TechPillar {
  id: string;
  badge: string;
  title: string;
  techStack: string;
  description: string;
  impactHighlight: string;
}

export interface MvpModulePreview {
  id: string;
  tabName: string;
  routePath: string;
  badge: string;
  headline: string;
  description: string;
  imageUrl: string;
  keyFeatures: string[];
  liveActionText: string;
}

export interface SupplyChainStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  highlightTag: string;
}

export interface RiskSolutionItem {
  riskTitle: string;
  challenge: string;
  mitigation: string;
}

export interface RevenueStream {
  id: string;
  name: string;
  rateOrScale: string;
  description: string;
  sharePercent: number;
}

export interface YearlyProjection {
  year: string;
  phaseName: string;
  revenueRange: string;
  revenueNumericMaxBillion: number;
  targetOrders: string;
  keyMilestone: string;
}

export interface FinancialMetric {
  label: string;
  value: string;
  subtext: string;
  highlight?: boolean;
}

export interface MarketingStage {
  stageNumber: string;
  phaseName: string;
  vietnameseName: string;
  objective: string;
  coreMessage: string;
  activities: string[];
  channels: string[];
}

export interface MarketingKpi {
  metricCode: string;
  metricName: string;
  targetValue: string;
  description: string;
}
