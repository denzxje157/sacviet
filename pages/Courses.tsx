import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseData, Course } from '../data/courseData';
import { useCart } from '../context/CartContext';

const Courses: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [selectedEthnic, setSelectedEthnic] = useState<string>('Tất cả');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewCourse(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    return ['Tất cả', 'Gốm cổ', 'Dệt thổ cẩm', 'Đan lát mây tre', 'Tranh dân gian', 'Nhạc cụ dân tộc', 'Thêu thủ công'];
  }, []);

  const ethnics = useMemo(() => {
    const list = Array.from(new Set(courseData.map(c => c.ethnic)));
    return ['Tất cả', ...list];
  }, []);

  const filteredCourses = useMemo(() => {
    return courseData.filter(c => {
      const matchCat = selectedCategory === 'Tất cả' || c.category === selectedCategory;
      const matchEth = selectedEthnic === 'Tất cả' || c.ethnic.toLowerCase().includes(selectedEthnic.toLowerCase());
      const matchSearch = !searchTerm.trim() || 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.ethnic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchEth && matchSearch;
    });
  }, [selectedCategory, selectedEthnic, searchTerm]);

  const handleAddKitToCart = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `kit-${course.id}`,
      name: `${course.craftKit.kitName} (Khóa học ${course.title})`,
      price: `${course.comboPrice.toLocaleString('vi-VN')} VNĐ`,
      priceValue: course.comboPrice,
      ethnic: course.ethnic,
      img: course.craftKit.kitImage || course.coverImage,
      quantity: 1
    }, 'cart');
    showToast(`✓ Đã thêm "${course.craftKit.kitName}" vào giỏ hàng!`);
  };

  return (
    <div className="min-h-screen bg-[#F9F5EA] font-display text-text-main pb-24">
      {/* Toast thông báo */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[1000] bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-gold/40 text-xs sm:text-sm font-bold animate-fade-in">
          <span className="material-symbols-outlined text-gold text-lg">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 🌟 HERO BANNER DI SẢN */}
      <section className="relative pt-10 pb-12 sm:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 px-4 py-1.5 rounded-full text-primary text-xs font-black uppercase tracking-widest shadow-xs">
            <span className="material-symbols-outlined text-sm text-gold">school</span>
            SẮC VIỆT MASTERCLASS • TRUYỀN NGHỀ BẢN SẮC
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-main leading-tight">
            Học Từ <span className="text-primary italic">Báu Vật</span> Nhân Văn <span className="text-gold italic">Sống</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-text-soft max-w-3xl mx-auto font-medium leading-relaxed">
            Không chỉ ngắm nhìn hay mua sắm, giờ đây bạn có thể trực tiếp học hỏi bí quyết nghề thủ công hàng trăm năm, nhận <strong>Hộp nguyên liệu DIY Kit gửi về tận nhà</strong> và tự tay hoàn thiện tác phẩm của chính mình.
          </p>

          {/* 4 Chỉ số tin cậy E-Commerce */}
          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-white/80 backdrop-blur p-3.5 rounded-2xl border border-gold/20 shadow-xs flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">workspace_premium</span>
              </div>
              <div>
                <p className="text-xs font-black text-text-main">9 Nghệ Nhân</p>
                <p className="text-[10px] text-text-soft">Ưu tú & Báu vật sống</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur p-3.5 rounded-2xl border border-gold/20 shadow-xs flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">smart_display</span>
              </div>
              <div>
                <p className="text-xs font-black text-text-main">100% Tư Liệu Thật</p>
                <p className="text-[10px] text-text-soft">Góc máy cận cảnh HD/4K</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur p-3.5 rounded-2xl border border-gold/20 shadow-xs flex items-center gap-3">
              <div className="size-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">inventory_2</span>
              </div>
              <div>
                <p className="text-xs font-black text-text-main">Hộp Kit Tận Nhà</p>
                <p className="text-[10px] text-text-soft">Nguyên liệu tự nhiên bản địa</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur p-3.5 rounded-2xl border border-gold/20 shadow-xs flex items-center gap-3">
              <div className="size-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">verified</span>
              </div>
              <div>
                <p className="text-xs font-black text-text-main">Chứng Nhận Số</p>
                <p className="text-[10px] text-text-soft">Cấp sau khi hoàn thành</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔍 FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-8 sticky top-16 md:top-20 z-40">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-xl border border-gold/30 space-y-3.5">
          {/* Hàng 1: Search box & Ethnic select */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:flex-1 flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-gold text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tên khóa học, nghệ nhân, nghề thủ công hoặc dân tộc..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gold/25 text-xs sm:text-sm font-medium focus:outline-none focus:border-gold transition-all bg-background-light/50"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 text-text-soft hover:text-red-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <span className="text-[11px] font-bold text-text-soft uppercase tracking-wider shrink-0 hidden sm:inline">Dân tộc:</span>
              <select
                value={selectedEthnic}
                onChange={(e) => setSelectedEthnic(e.target.value)}
                className="w-full sm:w-44 py-2.5 px-3 rounded-full border border-gold/25 text-xs font-bold bg-background-light/50 focus:outline-none focus:border-gold cursor-pointer"
              >
                {ethnics.map(eth => (
                  <option key={eth} value={eth}>
                    {eth === 'Tất cả' ? 'Tất cả dân tộc' : `Dân tộc ${eth}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hàng 2: Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-background-light text-text-soft hover:text-text-main hover:bg-gold/15'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 📚 DANH SÁCH 10 KHÓA HỌC */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm font-bold text-text-soft">
            Hiển thị <span className="font-black text-primary">{filteredCourses.length}</span> khóa học truyền nghề di sản
          </p>
          {(selectedCategory !== 'Tất cả' || selectedEthnic !== 'Tất cả' || searchTerm) && (
            <button
              type="button"
              onClick={() => { setSelectedCategory('Tất cả'); setSelectedEthnic('Tất cả'); setSearchTerm(''); }}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Đặt lại bộ lọc</span>
            </button>
          )}
        </div>

        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gold/30 max-w-lg mx-auto space-y-3">
            <span className="material-symbols-outlined text-5xl text-gold/60">menu_book</span>
            <h3 className="text-lg font-black text-text-main">Không tìm thấy khóa học phù hợp</h3>
            <p className="text-xs text-text-soft">Vui lòng thử tìm kiếm với từ khóa khác hoặc bấm đặt lại bộ lọc.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
                className="bg-white rounded-3xl overflow-hidden border border-gold/25 shadow-md hover:shadow-xl hover:border-gold/60 transition-all flex flex-col group cursor-pointer"
              >
                {/* 1. Ảnh bìa & Trailer trigger */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Badges trên ảnh */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-primary text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs">
                      {course.category}
                    </span>
                    <span className="bg-gold text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs">
                      Dân tộc {course.ethnic}
                    </span>
                  </div>

                  {/* Nút Xem Trailer Video */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewCourse(course);
                    }}
                    className="absolute inset-0 m-auto size-12 sm:size-14 rounded-full bg-white/90 text-primary hover:bg-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-2xl cursor-pointer group/btn"
                    title="Xem thử video giới thiệu"
                  >
                    <span className="material-symbols-outlined text-2xl sm:text-3xl text-primary font-black ml-1 group-hover/btn:text-gold transition-colors">
                      play_arrow
                    </span>
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <span className="material-symbols-outlined text-xs text-gold">timer</span>
                      <span>{course.totalDuration}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <span className="material-symbols-outlined text-xs text-gold">equalizer</span>
                      <span>{course.level}</span>
                    </span>
                  </div>
                </div>

                {/* 2. Thân thẻ */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Nghệ nhân */}
                  <div className="flex items-center gap-2.5 border-b border-gold/15 pb-3">
                    <img
                      src={course.artisanAvatar}
                      alt={course.artisanName}
                      className="size-10 rounded-full object-cover border-2 border-gold shrink-0 shadow-xs"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black uppercase text-primary truncate">
                          {course.artisanTitle}
                        </span>
                        <span className="material-symbols-outlined text-xs text-gold">verified</span>
                      </div>
                      <p className="text-xs font-black text-text-main truncate hover:text-primary transition-colors">
                        {course.artisanName}
                      </p>
                      <p className="text-[10px] text-text-soft truncate">{course.artisanVillage}</p>
                    </div>
                  </div>

                  {/* Tiêu đề & mô tả */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-black text-base sm:text-lg text-text-main group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-text-soft line-clamp-2 leading-relaxed font-medium">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Social proof & Đánh giá */}
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <div className="flex items-center gap-1 text-amber-800 font-black">
                      <span className="material-symbols-outlined text-sm text-gold fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{course.rating.toFixed(2)}</span>
                      <span className="text-text-soft font-normal">({course.reviewsCount})</span>
                    </div>
                    <div className="text-text-soft font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">group</span>
                      <span>{course.studentsCount} học viên</span>
                    </div>
                  </div>

                  {/* Hộp Kit Thực Hành Banner Nhỏ */}
                  <div className="bg-[#FAF8F5] border border-gold/30 rounded-xl p-2.5 flex items-center justify-between gap-2 text-left">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-lg text-emerald-800 shrink-0">inventory_2</span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase text-emerald-900 truncate">Hộp DIY Kit Gửi Tận Nhà</p>
                        <p className="text-[9px] text-text-soft truncate">{course.craftKit.kitName}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 shrink-0 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Kèm theo
                    </span>
                  </div>

                  {/* UI Giá & Các Nút Hành Động */}
                  <div className="pt-2 border-t border-gold/15 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-text-soft uppercase tracking-wider block">Học Online:</span>
                        <span className="text-lg font-black text-primary">
                          {course.price.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">Combo kèm Kit:</span>
                        <span className="text-sm font-black text-emerald-800">
                          {course.comboPrice.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Link
                        to={`/course/${course.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-wider text-center hover:brightness-110 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1"
                      >
                        <span>Học Thử</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => handleAddKitToCart(course, e)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black uppercase tracking-wider text-center active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                        title="Đặt mua hộp nguyên liệu gửi tận nhà"
                      >
                        <span className="material-symbols-outlined text-sm">shopping_bag</span>
                        <span>Mua Kit</span>
                      </button>
                    </div>

                    {/* Link xem thành phẩm trên Chợ Phiên */}
                    {course.linkedProductId && (
                      <Link
                        to={`/marketplace?product=${course.linkedProductId}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-1 text-[10px] font-bold text-text-soft hover:text-primary transition-colors flex items-center justify-center gap-1 text-center"
                      >
                        <span>Xem tác phẩm hoàn chỉnh trên Chợ Phiên</span>
                        <span className="material-symbols-outlined text-xs">storefront</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🎬 MODAL XEM TRAILER VIDEO BÀI GIẢNG */}
      {previewCourse && (
        <div 
          onClick={() => setPreviewCourse(null)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in cursor-pointer"
        >
          <div 
            className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-3xl overflow-hidden border-4 border-gold/40 shadow-2xl flex flex-col max-h-[92vh] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between border-b-2 border-gold/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gold">smart_display</span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gold block">Xem thử bài giảng di sản</span>
                  <h4 className="text-sm sm:text-base font-black truncate max-w-md">{previewCourse.title}</h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCourse(null)}
                className="size-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-primary flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black w-full">
              <iframe
                src={`https://www.youtube.com/embed/${previewCourse.trailerVideoId}?autoplay=1&rel=0`}
                title={previewCourse.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Thông tin nhanh & Nút CTA */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white">
              <div className="text-left">
                <p className="text-xs font-black text-text-main">Giảng dạy bởi: <span className="text-primary">{previewCourse.artisanName}</span> ({previewCourse.ethnic})</p>
                <p className="text-[11px] text-text-soft">{previewCourse.craftKit.kitName}</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    const c = previewCourse;
                    setPreviewCourse(null);
                    navigate(`/course/${c.id}`);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xs"
                >
                  Vào Học Ngay &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
