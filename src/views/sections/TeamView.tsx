import React from 'react';
import { Users, GraduationCap, Phone, Mail, CheckCircle2, Handshake, Crown } from 'lucide-react';
import { TeamMember, PartnerGroup } from '../../models/types';
import { teamOverviewModel } from '../../models/teamModel';

/**
 * ============================================================================
 * [VIEW - SECTION 02] GIỚI THIỆU ĐỘI THI & NGUỒN LỰC (TeamView.tsx)
 * ============================================================================
 */

interface TeamViewProps {
  overview: typeof teamOverviewModel;
  members: TeamMember[];
  partners: PartnerGroup[];
  selectedRoleFilter: string;
  onSelectRoleFilter: (role: string) => void;
}

const ROLE_FILTERS = [
  { code: 'ALL', label: 'Tất Cả (05 Thành Viên)' },
  { code: 'LEAD', label: 'Trưởng Nhóm' },
  { code: 'DEV', label: 'Công Nghệ & AI' },
  { code: 'OPS', label: 'Vận Hành & Khảo Sát' },
  { code: 'MKT', label: 'Marketing Số' },
  { code: 'CONTENT', label: 'Dữ Liệu Di Sản' },
];

export const TeamView: React.FC<TeamViewProps> = ({
  overview,
  members,
  partners,
  selectedRoleFilter,
  onSelectRoleFilter,
}) => {
  return (
    <section id="doi-thi" className="py-14 md:py-20 border-b border-gold/25">
      <div className="mx-auto max-w-[1320px] px-4 md:px-8">
        {/* Tiêu đề Section */}
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Users size={14} className="shrink-0" />
            <span>{overview.sectionBadge}</span>
          </div>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight">
            {overview.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-text-soft leading-relaxed">
            {overview.sectionSubtitle}
          </p>
        </div>

        {/* Khung Cố vấn & Ươm tạo tại Trường ĐH Lạc Hồng */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-primary/10 via-gold/15 to-primary/5 border border-gold/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-primary text-white shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base text-primary uppercase tracking-wide">
                Bảo Trợ Học Thuật & Cố Vấn Chuyên Môn — Trường Đại Học Lạc Hồng
              </h3>
              <p className="text-xs md:text-sm text-text-main mt-1 leading-relaxed">
                {overview.incubationSupport}
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-white border border-gold/50 text-xs font-bold text-primary whitespace-nowrap shrink-0 shadow-sm">
            Tự chủ 100% R&D Mã nguồn
          </span>
        </div>

        {/* Bộ lọc nhanh theo Chức danh */}
        <div className="mt-7 flex flex-wrap items-center gap-2">
          {ROLE_FILTERS.map((role) => {
            const active = selectedRoleFilter === role.code;
            return (
              <button
                key={role.code}
                onClick={() => onSelectRoleFilter(role.code)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white border border-gold/30 text-text-main hover:bg-gold/15'
                }`}
              >
                {role.label}
              </button>
            );
          })}
        </div>

        {/* Lưới Thẻ 05 Thành Viên Đội Thi */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className={`rounded-2xl p-6 overflow-hidden transition-all flex flex-col justify-between ${
                member.isLeader
                  ? 'bg-white border-2 border-primary shadow-lg relative'
                  : 'glass-card shadow-sm hover:border-primary/40'
              }`}
            >
              <div>
                {/* Huy hiệu Vai trò & Lớp */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap ${
                      member.isLeader
                        ? 'bg-primary text-white'
                        : 'bg-gold/25 text-text-main'
                    }`}
                  >
                    {member.className}
                  </span>
                  {member.isLeader && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary whitespace-nowrap">
                      <Crown size={14} className="text-gold shrink-0" />
                      <span>Trưởng Nhóm</span>
                    </span>
                  )}
                </div>

                {/* Thông tin Cá nhân & Ảnh chân dung thật (88x108px rõ nét khuôn mặt & áo trường ĐH Lạc Hồng) */}
                <div className="flex items-center gap-4 w-full">
                  <div
                    className="rounded-2xl border-2 border-gold overflow-hidden bg-blue-700 shrink-0 shadow-sm"
                    style={{ width: '88px', height: '108px' }}
                  >
                    <img
                      src={member.avatarUrl}
                      alt={member.fullName}
                      className="w-full h-full object-cover object-top block"
                      style={{ width: '88px', height: '108px' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-lg md:text-xl text-text-main leading-tight">
                      {member.fullName}
                    </h3>
                    <p className="text-xs font-bold text-primary mt-1 leading-snug">
                      {member.roleTitle}
                    </p>
                    <p className="text-xs font-medium text-text-soft mt-1">
                      {member.university}
                    </p>
                  </div>
                </div>

                {/* Nhiệm vụ chuyên môn trong dự án */}
                <div className="mt-4 pt-4 border-t border-gold/25 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-text-soft">
                    Trách nhiệm phụ trách:
                  </div>
                  {member.responsibilities.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-text-main leading-relaxed">
                      <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kỹ năng & Liên hệ */}
              <div className="mt-5 pt-4 border-t border-gold/20 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-background-light border border-gold/30 text-[11px] font-bold text-text-main whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-medium text-text-soft pt-1">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <Phone size={13} className="text-primary shrink-0" />
                    <span>{member.phone}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 min-w-0">
                    <Mail size={13} className="text-primary shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mạng Lưới Đối Tác Chiến Lược Hỗ Trợ Triển Khai */}
        <div className="mt-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Handshake size={20} className="text-primary shrink-0" />
            <h3 className="font-black text-xl md:text-2xl text-primary">
              Hệ Sinh Thái Đối Tác Chiến Lược Triển Khai Dự Án
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-gold/35 shadow-sm space-y-3">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-gold/20 whitespace-nowrap">
                  {partner.category}
                </span>
                <h4 className="font-bold text-lg text-text-main">
                  {partner.title}
                </h4>
                <p className="text-xs text-text-soft leading-relaxed">
                  {partner.description}
                </p>
                <ul className="space-y-1.5 pt-2 border-t border-gold/20">
                  {partner.items.map((item, i) => (
                    <li key={i} className="text-xs font-bold text-primary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
