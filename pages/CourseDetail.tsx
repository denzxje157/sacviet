import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById, Course, LessonItem } from '../data/courseData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import HeritageUnboxingModal from '../components/HeritageUnboxingModal';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<LessonItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'kit' | 'certificate'>('overview');
  const [purchaseType, setPurchaseType] = useState<'combo' | 'online_only'>('combo');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isUnboxingModalOpen, setIsUnboxingModalOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getCourseById(id);
      if (found) {
        setCourse(found);
        setActiveLesson(found.lessons[0] || null);
        setIsPlayingVideo(false);
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-[#F9F5EA] flex items-center justify-center p-4 font-display">
        <div className="bg-white p-8 rounded-3xl border border-gold/30 shadow-xl text-center max-w-md space-y-4">
          <span className="material-symbols-outlined text-5xl text-gold">school</span>
          <h2 className="text-xl font-black text-text-main">Không tìm thấy khóa học</h2>
          <p className="text-xs text-text-soft">Khóa học bạn yêu cầu có thể đã được cập nhật hoặc không tồn tại.</p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-full text-xs font-black uppercase tracking-wider hover:brightness-110 shadow-xs"
          >
            &larr; Quay lại danh sách khóa học
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const isCombo = purchaseType === 'combo';
    addToCart({
      id: isCombo ? `kit-${course.id}` : `online-${course.id}`,
      name: isCombo 
        ? `${course.craftKit.kitName} (Khóa học ${course.title})`
        : `Khóa học Online: ${course.title}`,
      price: isCombo 
        ? `${course.comboPrice.toLocaleString('vi-VN')} VNĐ` 
        : `${course.price.toLocaleString('vi-VN')} VNĐ`,
      priceValue: isCombo ? course.comboPrice : course.price,
      ethnic: course.ethnic,
      img: isCombo ? course.craftKit.kitImage : course.coverImage,
      quantity: 1
    }, 'cart');
    showToast(isCombo ? `✓ Đã thêm "${course.craftKit.kitName}" vào giỏ hàng!` : `✓ Đã thêm khóa học vào giỏ hàng!`);
  };

  const handleRegisterDirect = () => {
    setIsRegistered(true);
    setIsUnboxingModalOpen(true);
    showToast(`🎉 Chúc mừng bạn đã đăng ký khóa học "${course.title}"! Đang mở kiện hàng thực tế...`);
  };

  const handleStartLearning = () => {
    setIsRegistered(true);
    setIsAutoplay(true);
    setIsPlayingVideo(true);
    if (course && course.lessons.length > 0) {
      setActiveLesson(course.lessons[0]);
    }
    const playerEl = document.getElementById('heritage-video-player');
    if (playerEl) {
      playerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-text-soft">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-primary">Truyền Nghề</Link>
          <span>/</span>
          <span className="text-primary truncate max-w-xs">{course.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CỘT TRÁI (8 CỘT): TRÌNH PHÁT VIDEO & NỘI DUNG CHI TIẾT */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Trình phát Video Player chuẩn di sản (Tối ưu tải siêu tốc, 0 lag) */}
            <div id="heritage-video-player" className="bg-black rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl relative aspect-video group">
              {activeLesson ? (
                isPlayingVideo ? (
                  <iframe
                    key={activeLesson.id}
                    src={`https://www.youtube.com/embed/${activeLesson.videoId}?rel=0&autoplay=1`}
                    title={activeLesson.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div
                    onClick={() => {
                      setIsPlayingVideo(true);
                      setIsAutoplay(true);
                    }}
                    className="w-full h-full relative cursor-pointer overflow-hidden flex items-center justify-center"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${activeLesson.videoId}/hqdefault.jpg`}
                      alt={activeLesson.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/35" />
                    
                    {/* Nút Play Đỏ & Vàng Sắc Việt sang trọng */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="size-16 sm:size-20 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-2xl border-2 border-gold group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                        <span className="material-symbols-outlined text-3xl sm:text-4xl ml-1 text-gold-light">play_arrow</span>
                      </div>
                      <div className="text-center px-4 max-w-md">
                        <span className="bg-primary/80 backdrop-blur text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-gold/40">
                          Bài {activeLesson.order} • {activeLesson.duration}
                        </span>
                        <h4 className="text-white text-xs sm:text-sm font-black mt-1 line-clamp-1 drop-shadow-md">
                          {activeLesson.title}
                        </h4>
                        <p className="text-stone-300 text-[11px] font-medium mt-0.5 flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-xs text-gold">smart_display</span>
                          <span>Bấm để phát video bài giảng</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xs">
                  Đang tải bài học di sản...
                </div>
              )}
            </div>

            {/* Thông tin bài học đang phát */}
            {activeLesson && (
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gold/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                      Đang phát
                    </span>
                    <span className="text-xs text-text-soft font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">timer</span>
                      {activeLesson.duration}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-text-main mt-1">
                    {activeLesson.title}
                  </h3>
                  <p className="text-xs text-text-soft mt-0.5 font-medium">{activeLesson.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">hd</span>
                    Tư liệu thực tế
                  </span>
                </div>
              </div>
            )}

            {/* 2. Tiêu đề khóa học & Tagline */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-gold/25 shadow-md space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="bg-gold text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  Dân tộc {course.ethnic}
                </span>
                <span className="bg-[#FAF8F5] text-text-soft border border-gold/30 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                  Cấp độ: {course.level}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-text-main leading-snug">
                {course.title}
              </h1>

              <p className="text-xs sm:text-sm text-text-soft font-medium leading-relaxed">
                {course.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-2 border-t border-gold/15">
                <div className="flex items-center gap-1 text-amber-800 font-black">
                  <span className="material-symbols-outlined text-sm text-gold fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{course.rating.toFixed(2)}</span>
                  <span className="text-text-soft font-normal">({course.reviewsCount} học viên đánh giá)</span>
                </div>
                <div className="flex items-center gap-1 text-text-soft">
                  <span className="material-symbols-outlined text-xs">group</span>
                  <span>{course.studentsCount} học viên đã tham gia</span>
                </div>
                <div className="flex items-center gap-1 text-text-soft">
                  <span className="material-symbols-outlined text-xs">timer</span>
                  <span>{course.totalDuration}</span>
                </div>
              </div>
            </div>

            {/* 3. TABS CHI TIẾT NỘI DUNG */}
            <div className="bg-white rounded-3xl border border-gold/25 shadow-md overflow-hidden text-left">
              {/* Tab Navigation */}
              <div className="flex items-center border-b border-gold/20 bg-[#FAF8F5] overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`px-5 py-3.5 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'overview'
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-text-soft hover:text-text-main'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">auto_stories</span>
                  <span>Tổng quan & Kỹ năng</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('curriculum')}
                  className={`px-5 py-3.5 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'curriculum'
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-text-soft hover:text-text-main'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">format_list_numbered</span>
                  <span>Giáo trình ({course.totalLessons} bài)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('kit')}
                  className={`px-5 py-3.5 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'kit'
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-text-soft hover:text-text-main'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">inventory_2</span>
                  <span>Hộp Kit Tận Nhà</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('certificate')}
                  className={`px-5 py-3.5 text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'certificate'
                      ? 'border-primary text-primary bg-white'
                      : 'border-transparent text-text-soft hover:text-text-main'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>Chứng nhận Di sản</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6 sm:p-7">
                {/* TAB 1: TỔNG QUAN */}
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">history_edu</span>
                        Câu chuyện di sản & Hồn cốt làng nghề
                      </h4>
                      <div className="space-y-2 text-xs sm:text-sm text-text-main leading-relaxed font-medium">
                        {course.overview.map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gold/15">
                      <h4 className="text-sm font-black uppercase tracking-wider text-text-main mb-3 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-gold">check_circle</span>
                        Kỹ năng & Kiến thức bạn sẽ làm chủ:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {course.skillsLearned.map((skill, idx) => (
                          <div key={idx} className="bg-background-light p-3 rounded-xl border border-gold/15 flex items-start gap-2.5">
                            <span className="material-symbols-outlined text-sm text-gold mt-0.5 shrink-0">done</span>
                            <span className="text-xs font-medium text-text-main">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: GIÁO TRÌNH BÀI HỌC */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-3 animate-fade-in">
                    <p className="text-xs text-text-soft mb-2 font-medium">
                      Nhấp vào bất kỳ bài học nào để phát video trực tiếp trên khung xem bên trên:
                    </p>
                    {course.lessons.map(lesson => {
                      const isActive = activeLesson?.id === lesson.id;
                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            setActiveLesson(lesson);
                            setIsAutoplay(true);
                            setIsPlayingVideo(true);
                            const p = document.getElementById('heritage-video-player');
                            if (p) p.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isActive
                              ? 'bg-primary/5 border-primary shadow-xs'
                              : 'bg-background-light/60 border-gold/20 hover:bg-gold/10 hover:border-gold/40'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`size-8 sm:size-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isActive ? 'bg-primary text-white shadow-xs' : 'bg-white border border-gold/30 text-text-soft'
                            }`}>
                              {isActive ? (
                                <span className="material-symbols-outlined text-base animate-pulse">play_arrow</span>
                              ) : (
                                lesson.order
                              )}
                            </div>
                            <div className="min-w-0 text-left">
                              <h5 className={`text-xs sm:text-sm font-black truncate ${isActive ? 'text-primary' : 'text-text-main'}`}>
                                {lesson.title}
                              </h5>
                              <p className="text-[11px] text-text-soft line-clamp-1 mt-0.5">{lesson.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.isPreviewFree && (
                              <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                Học thử
                              </span>
                            )}
                            <span className="text-xs font-bold text-text-soft">{lesson.duration}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TAB 3: HỘP KIT TẬN NHÀ */}
                {activeTab === 'kit' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-gold/30 flex flex-col sm:flex-row items-center gap-4">
                      <img
                        src={course.craftKit.kitImage}
                        alt={course.craftKit.kitName}
                        className="size-24 sm:size-28 rounded-2xl object-cover border-2 border-gold shrink-0 shadow-sm"
                      />
                      <div className="text-left space-y-1">
                        <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                          Vật phẩm thực tế kèm khóa học
                        </span>
                        <h4 className="text-base font-black text-text-main">{course.craftKit.kitName}</h4>
                        <p className="text-xs text-text-soft">{course.craftKit.shippingNote}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-text-main mb-3">
                        Danh sách các dụng cụ & nguyên liệu trong hộp:
                      </h4>
                      <div className="space-y-2.5">
                        {course.craftKit.includes.map((item, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-xl border border-gold/20 flex items-center justify-between gap-3 shadow-xs">
                            <div className="flex items-center gap-3">
                              <div className="size-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-base">{item.icon}</span>
                              </div>
                              <div>
                                <p className="text-xs font-black text-text-main">{item.name}</p>
                                <p className="text-[11px] text-text-soft">{item.desc}</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-primary shrink-0 bg-primary/10 px-2.5 py-1 rounded-lg">
                              {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: CHỨNG NHẬN DI SẢN */}
                {activeTab === 'certificate' && (
                  <div className="space-y-4 text-center animate-fade-in max-w-lg mx-auto py-4">
                    <div className="p-6 bg-gradient-to-br from-white via-amber-50/50 to-orange-50/30 rounded-3xl border-4 border-gold/40 shadow-xl space-y-3 relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-gold/20 font-black text-6xl pointer-events-none">
                        SẮC VIỆT
                      </div>
                      <div className="size-14 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center border-2 border-gold">
                        <span className="material-symbols-outlined text-3xl text-gold">verified</span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-text-soft block">
                        CỘNG ĐỒNG BẢO TỒN DI SẢN SẮC VIỆT
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-primary uppercase">
                        {course.certificateTitle}
                      </h3>
                      <p className="text-xs text-text-soft leading-relaxed">
                        Cấp cho học viên đã hoàn thành xuất sắc {course.totalLessons} bài học thực hành truyền nghề và nộp ảnh tác phẩm thủ công đầu tay.
                      </p>
                      <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-[11px] font-bold text-text-main">
                        <div>
                          <p className="text-[9px] text-text-soft uppercase">Nghệ nhân chứng nhận</p>
                          <p className="text-primary font-black">{course.artisanName}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-text-soft uppercase">Định danh số</p>
                          <p className="font-mono text-gold font-black">SV-PASS-{course.id.toUpperCase()}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-text-soft italic">
                      Chứng chỉ số hóa kèm mã QR tra cứu có giá trị xác nhận trong hồ sơ hoạt động văn hóa & cộng đồng.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI (4 CỘT): STICKY PURCHASE BOX & ARTISAN CARD */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. HỘP ĐẶT MUA KHÓA HỌC & COMBO */}
            <div className="bg-white rounded-3xl border-2 border-gold/40 shadow-xl p-5 sm:p-6 space-y-5 text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">
                  Đăng ký truyền nghề
                </span>
                <h3 className="text-base sm:text-lg font-black text-text-main">
                  Chọn hình thức học của bạn
                </h3>
              </div>

              {/* Tùy chọn mua: Combo kèm Kit vs Chỉ học online */}
              <div className="space-y-3">
                {/* Lựa chọn 1: Combo kèm Kit */}
                <div
                  onClick={() => setPurchaseType('combo')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                    purchaseType === 'combo'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/60'
                  }`}
                >
                  <div className="absolute -top-2.5 right-3 bg-emerald-800 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                    Khuyên dùng • Tiết kiệm 30%
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="purchaseType"
                      checked={purchaseType === 'combo'}
                      onChange={() => setPurchaseType('combo')}
                      className="mt-1 accent-emerald-800"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-black text-emerald-950 uppercase">Combo Kèm Hộp Kit Tận Nhà</span>
                        <span className="text-base font-black text-emerald-800">{course.comboPrice.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <p className="text-[11px] text-text-soft mt-1 leading-relaxed">
                        Bao gồm trọn bộ video bài giảng trọn đời + Hộp nguyên liệu <strong>{course.craftKit.kitName}</strong> gửi về tận nhà.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lựa chọn 2: Chỉ học online */}
                <div
                  onClick={() => setPurchaseType('online_only')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    purchaseType === 'online_only'
                      ? 'border-primary bg-primary/5 shadow-xs'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="purchaseType"
                      checked={purchaseType === 'online_only'}
                      onChange={() => setPurchaseType('online_only')}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs font-black text-text-main uppercase">Chỉ Học Video Online</span>
                        <span className="text-base font-black text-primary">{course.price.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <p className="text-[11px] text-text-soft mt-1 leading-relaxed">
                        Truy cập toàn bộ {course.totalLessons} bài học video HD/4K trọn đời, tự chuẩn bị nguyên liệu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nút Đăng ký và Nút Giỏ hàng */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleRegisterDirect}
                  className="w-full py-3.5 bg-primary text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">school</span>
                  <span>{isRegistered ? 'Đã Tham Gia Khóa Học' : 'Đăng Ký Học Ngay'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUnboxingModalOpen(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-50 via-[#FAF4E6] to-amber-100/70 hover:brightness-95 border border-[#D4AF37] text-[#781012] font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-base text-amber-700">package_2</span>
                  <span>Mô phỏng đập hộp & Kiện hàng mẫu (Demo)</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-white border-2 border-emerald-800 text-emerald-900 hover:bg-emerald-50 font-black text-xs uppercase tracking-wider rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">shopping_cart</span>
                  <span>Thêm Vào Giỏ Hàng</span>
                </button>
              </div>

              {/* Cam kết E-commerce */}
              <div className="pt-3 border-t border-gold/15 space-y-2 text-[11px] text-text-soft">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-700">local_shipping</span>
                  <span>Miễn phí vận chuyển hộp Kit toàn quốc</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-gold">all_inclusive</span>
                  <span>Quyền truy cập bài giảng trọn đời, xem lại bất cứ lúc nào</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">support_agent</span>
                  <span>Hỗ trợ hỏi đáp 1-1 với trợ lý Hỏi Già Làng AI</span>
                </div>
              </div>
            </div>

            {/* 2. THẺ NGHỆ NHÂN GIẢNG DẠY (KẾT NỐI SANG TRANG NGHỆ NHÂN) */}
            <div className="bg-white rounded-3xl border border-gold/25 shadow-md p-5 text-left space-y-3">
              <span className="text-[10px] font-black uppercase text-primary tracking-widest block">
                Nghệ nhân truyền nghề
              </span>
              <div className="flex items-center gap-3">
                <img
                  src={course.artisanAvatar}
                  alt={course.artisanName}
                  className="size-14 rounded-full object-cover border-2 border-gold shrink-0 shadow-sm"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-text-main truncate">{course.artisanName}</span>
                    <span className="material-symbols-outlined text-xs text-gold">verified</span>
                  </div>
                  <p className="text-[10px] font-bold text-primary truncate">{course.artisanTitle}</p>
                  <p className="text-[10px] text-text-soft truncate">{course.artisanVillage}</p>
                </div>
              </div>
              {course.artisanId && (
                <Link
                  to={`/artisan/${course.artisanId}`}
                  className="w-full py-2 bg-background-light hover:bg-gold/15 text-primary border border-gold/20 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                >
                  <span>Xem hồ sơ & chuyện đời</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              )}
            </div>

            {/* 3. THẺ TÁC PHẨM TRÊN CHỢ PHIÊN (KẾT NỐI SANG CHỢ PHIÊN) */}
            {course.linkedProductId && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl border-2 border-gold/30 shadow-md p-5 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-text-main tracking-widest">
                    Tác phẩm thành phẩm
                  </span>
                  <span className="material-symbols-outlined text-base text-gold">storefront</span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-text-main line-clamp-1">
                    {course.linkedProductName}
                  </h4>
                  <p className="text-sm font-black text-primary mt-0.5">
                    {course.linkedProductPrice}
                  </p>
                </div>
                <p className="text-[10px] text-text-soft leading-relaxed">
                  Nếu bạn muốn sở hữu ngay tác phẩm thủ công hoàn chỉnh do chính nghệ nhân chế tác trong hàng tuần.
                </p>
                <Link
                  to={`/marketplace?product=${course.linkedProductId}`}
                  className="w-full py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-110 transition-all text-center shadow-xs"
                >
                  <span>Khám phá trên Chợ Phiên</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {course && isUnboxingModalOpen && (
        <HeritageUnboxingModal
          isOpen={isUnboxingModalOpen}
          onClose={() => setIsUnboxingModalOpen(false)}
          course={course}
          customerName={user?.user_metadata?.full_name || 'Học Viên Sắc Việt'}
          onStartLearning={handleStartLearning}
        />
      )}
    </div>
  );
};

export default CourseDetail;
