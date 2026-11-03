import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Phone,
  Mail,
  CheckCircle2,
  Handshake,
  Crown,
  MapPin,
  Calendar,
  Building2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Camera,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { TeamMember, PartnerGroup, FieldworkSlide } from '../../models/types';
import { teamOverviewModel, fieldworkProofModel } from '../../models/teamModel';

/**
 * ============================================================================
 * [VIEW - SECTION 02] GIỚI THIỆU ĐỘI THI & NGUỒN LỰC (TeamView.tsx)
 * ============================================================================
 */

interface TeamViewProps {
  overview: typeof teamOverviewModel;
  fieldwork: typeof fieldworkProofModel;
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
  fieldwork,
  members,
  partners,
  selectedRoleFilter,
  onSelectRoleFilter,
}) => {
  const slides: FieldworkSlide[] =
    fieldwork.slides && fieldwork.slides.length > 0
      ? fieldwork.slides
      : [
          {
            id: 'fieldwork-1',
            title: 'Khảo sát thực tế',
            imageUrl: fieldwork.imageUrl,
            imageAlt: fieldwork.imageAlt,
            caption: fieldwork.caption,
            tag: 'Hình 3 Đề án Sắc Việt',
            badge: 'Minh chứng thực tế',
          },
        ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const currentSlide = slides[currentSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

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
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block ${
                      member.isLeader
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-gold/20 text-text-main border border-gold/30'
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

        {/* Khối Minh Chứng Thực Địa */}
        <div className="mt-12 rounded-3xl bg-white border-2 border-gold/40 p-6 md:p-8 shadow-sm">
          <div className="max-w-3xl space-y-2 mb-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
              {fieldwork.badge}
            </span>
            <h3 className="font-black text-xl md:text-2xl text-primary leading-tight">
              {fieldwork.title}
            </h3>
            <p className="text-xs md:text-sm text-text-soft leading-relaxed">
              {fieldwork.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Cột Trái: Băng Chuyền Hình Ảnh Khảo Sát & Sản Phẩm Bản Địa */}
            <div className="lg:col-span-7 flex flex-col h-full">
              <div className="p-5 rounded-2xl bg-[#F9F5EA] border border-gold/35 shadow-2xs flex flex-col justify-between h-full">
                {/* Tiêu đề thanh trượt ảnh */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold/25">
                  <div className="flex items-center gap-2 min-w-0">
                    <Camera size={16} className="text-primary shrink-0" />
                    <span className="font-bold text-xs md:text-sm text-text-main truncate">
                      {currentSlide.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-primary bg-white px-2.5 py-0.5 rounded-full border border-gold/30 shrink-0">
                    {currentSlideIndex + 1} / {slides.length}
                  </span>
                </div>

                {/* Khung ảnh băng chuyền tỉ lệ cố định 16/10 không bị bung khung */}
                <div className="relative rounded-xl overflow-hidden border border-gold/40 bg-stone-900 aspect-[16/10] w-full shadow-xs group flex items-center justify-center">
                  {/* Nếu ảnh ở chế độ 'contain' (ảnh dọc/vuông): hiển thị trọn vẹn 100% kèm nền mờ lấp đầy hai bên */}
                  {currentSlide.fitMode === 'contain' ? (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 opacity-35 pointer-events-none"
                        style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
                      />
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.imageAlt}
                        loading="lazy"
                        className="relative z-10 w-full h-full object-contain transition-opacity duration-300"
                      />
                    </>
                  ) : (
                    <img
                      src={currentSlide.imageUrl}
                      alt={currentSlide.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  )}

                  {/* Badge góc trên ảnh */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-gold-light text-xs font-bold border border-gold/40 shadow-xs">
                      {currentSlide.badge || 'Minh chứng thực tế'}
                    </span>
                  </div>

                  {/* Nút điều hướng Trái / Phải */}
                  <button
                    onClick={handlePrevSlide}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:scale-105"
                    aria-label="Ảnh kế tiếp"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Chú thích & Thanh chọn chấm tròn băng chuyền */}
                <div className="mt-3 flex flex-col justify-between flex-1">
                  <p className="text-xs text-text-soft italic text-center leading-relaxed line-clamp-2 min-h-[36px] flex items-center justify-center px-1">
                    {currentSlide.caption}
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-2.5 border-t border-gold/25 mt-2">
                    {slides.map((slide, idx) => {
                      const active = idx === currentSlideIndex;
                      return (
                        <button
                          key={slide.id}
                          onClick={() => setCurrentSlideIndex(idx)}
                          className={`transition-all cursor-pointer ${
                            active
                              ? 'w-7 h-2 bg-primary rounded-full'
                              : 'w-2 h-2 bg-gold/50 hover:bg-gold rounded-full'
                          }`}
                          title={slide.title}
                          aria-label={`Chuyển đến ảnh ${idx + 1}: ${slide.title}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Cột Phải: Bảng Metadata Khảo Sát Thực Địa (Căn khung đều hoàn hảo với Cột Trái) */}
            <div className="lg:col-span-5 flex flex-col h-full">
              <div className="p-5 rounded-2xl bg-[#F9F5EA] border border-gold/35 shadow-2xs flex flex-col justify-between h-full">
                {/* Tiêu đề khối đối soát */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gold/25">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCheck size={16} className="text-primary shrink-0" />
                    <span className="font-bold text-xs md:text-sm text-text-main truncate">
                      Hồ sơ đối soát & chứng minh thực địa
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-700 shrink-0" />
                    <span>Đã xác thực</span>
                  </span>
                </div>

                {/* 04 Trường đối soát thông tin kết nối chặt chẽ + Khối ghi nhận thực địa */}
                <div className="space-y-3 flex-1 flex flex-col justify-between my-0.5">
                  {/* Cụm 4 tiêu chí cốt lõi (liền mạch, không bị giãn cách quá xa) */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-gold/30">
                      <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] font-bold text-text-soft uppercase tracking-wider block">
                          Địa điểm thực địa
                        </span>
                        <span className="text-xs font-semibold text-text-main block mt-0.5 leading-snug">
                          {fieldwork.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-gold/30">
                      <Calendar size={16} className="text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] font-bold text-text-soft uppercase tracking-wider block">
                          Thời gian khảo sát
                        </span>
                        <span className="text-xs font-semibold text-text-main block mt-0.5 leading-snug">
                          {fieldwork.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-gold/30">
                      <Building2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] font-bold text-text-soft uppercase tracking-wider block">
                          Đơn vị tiếp đón / Hợp tác xã
                        </span>
                        <span className="text-xs font-semibold text-text-main block mt-0.5 leading-snug">
                          {fieldwork.coopName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-gold/30">
                      <ShieldCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10.5px] font-bold text-text-soft uppercase tracking-wider block">
                          Quyền hình ảnh & sự đồng thuận
                        </span>
                        <span className="text-xs font-semibold text-emerald-800 block mt-0.5 leading-snug">
                          {fieldwork.permissionStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Khối Ghi nhận thực chứng đề án (lấp đầy không gian trống, bổ sung ngữ cảnh học thuật) */}
                  <div className="p-3 rounded-xl bg-white/85 border border-gold/35 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-primary font-bold text-[11px] uppercase tracking-wider">
                      <Sparkles size={13} className="text-gold shrink-0" />
                      <span>Ghi nhận thực tế từ chuyến khảo sát</span>
                    </div>
                    <p className="text-[11px] text-text-soft leading-relaxed">
                      {fieldwork.fieldworkSummary ||
                        'Đội ngũ sinh viên trực tiếp đối thoại, tìm hiểu quy trình ủ men truyền thống và lắng nghe rào cản tiêu thụ thực tế của hộ nghệ nhân. Dữ liệu là căn cứ xây dựng phân khu Chợ phiên D2C và Kênh Nghệ nhân trên nền tảng Sắc Việt.'}
                    </p>
                    <div className="pt-1.5 border-t border-gold/20 flex flex-wrap items-center gap-2 text-[10.5px]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gold/15 text-primary font-bold">
                        ✓ Dữ liệu D2C thực tế
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        ✓ Phỏng vấn & khảo sát trực tiếp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chân thẻ đối soát: Khớp với tag của ảnh đang hiển thị */}
                <div className="pt-2.5 border-t border-gold/25 text-xs text-text-soft flex items-center justify-between mt-2">
                  <span>Nguồn minh chứng:</span>
                  <span className="font-bold text-primary bg-white px-2.5 py-0.5 rounded border border-gold/30">
                    {currentSlide.tag || 'Hình 3 Đề án Sắc Việt'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mạng Lưới Đối Tác Chiến Lược Hỗ Trợ Triển Khai */}
        <div className="mt-12">
          <div className="flex items-center gap-2.5 mb-5">
            <Handshake size={20} className="text-primary shrink-0" />
            <h3 className="font-black text-xl md:text-2xl text-primary">
              Hệ sinh thái đối tác chiến lược triển khai dự án
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
