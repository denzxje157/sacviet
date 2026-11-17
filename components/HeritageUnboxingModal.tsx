import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode';
import { Course } from '../data/courseData';

interface HeritageUnboxingModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  orderId?: string;
  customerName?: string;
  onStartLearning?: () => void;
}

const HeritageUnboxingModal: React.FC<HeritageUnboxingModalProps> = ({
  isOpen,
  onClose,
  course,
  orderId,
  customerName = 'Học Viên Sắc Việt',
  onStartLearning
}) => {
  // 1. Khóa cố định mã đơn hàng bằng useState - tuyệt đối không sinh ngẫu nhiên mỗi lần re-render
  const [displayOrderId] = useState<string>(() => {
    return orderId || `SN-${Math.floor(100000 + Math.random() * 900000)}`;
  });

  const [activeTab, setActiveTab] = useState<'physical' | 'digital' | 'invoice'>('physical');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // 2. Tạo mã QR duy nhất 1 lần khi modal mở - triệt tiêu 100% vòng lặp render
  useEffect(() => {
    if (!isOpen || !course?.id) return;

    let isMounted = true;
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://sacviet.vercel.app';
    const verifyUrl = `${currentOrigin}/#/course/${course.id}?order=${displayOrderId}`;

    // Sinh QR với kích thước chuẩn 240px siêu nhẹ
    QRCode.toDataURL(verifyUrl, {
      width: 240,
      margin: 1,
      color: {
        dark: '#781012',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    })
      .then(url => {
        if (isMounted) {
          setQrCodeUrl(url);
        }
      })
      .catch(err => {
        console.error('Lỗi tạo QR:', err);
      });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, course?.id, displayOrderId]);

  if (!isOpen) return null;

  const handleDownloadInvoice = () => {
    window.print();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4 md:p-6 font-display overflow-y-auto">
      {/* Backdrop: Dùng màu nền đen 75% siêu nhẹ, KHÔNG dùng backdrop-blur để không ngốn GPU */}
      <div 
        className="fixed inset-0 bg-black/75 transition-opacity duration-150"
        onClick={onClose}
      />

      {/* Modal Dialog Card: Nền giấy ngà di sản + Viền Vàng Hoàng Kim */}
      <div 
        className="relative w-full max-w-4xl rounded-[28px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] animate-modal-enter"
        style={{
          backgroundColor: '#FAF5EA',
          border: '2.5px solid #C59100'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER: ĐỎ MẬN TRUYỀN THỐNG + ĐIỂM XUYẾT VÀNG KIM */}
        <div 
          className="text-white p-5 sm:p-6 shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #690D10 0%, #8C161B 50%, #690D10 100%)',
            borderBottom: '2.5px solid #C59100'
          }}
        >
          {/* Họa tiết hoa văn chìm tinh tế */}
          <div className="absolute -right-10 -bottom-10 size-48 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute right-14 -top-10 size-32 rounded-full border border-white/10 pointer-events-none" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div 
                className="size-11 sm:size-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #C59100 100%)',
                  color: '#4A0E10',
                  border: '1.5px solid #F6E0A4'
                }}
              >
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span 
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs"
                    style={{
                      backgroundColor: 'rgba(197, 145, 0, 0.25)',
                      color: '#F6E0A4',
                      border: '1px solid rgba(246, 224, 164, 0.4)'
                    }}
                  >
                    Xác Nhận Đơn Hàng • Demo
                  </span>
                  <span className="text-[#F6E0A4] text-xs font-mono font-bold">Mã đơn: #{displayOrderId}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase mt-1">
                  Kiện Hàng & Quyền Học Của Bạn
                </h2>
                <p className="text-xs text-[#F6E0A4]/90 mt-0.5">
                  Mô hình <strong className="text-white font-bold underline decoration-[#C59100] underline-offset-2">Phygital</strong>: Học trực tuyến kết hợp bộ nguyên liệu DIY gửi tận nhà
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
              title="Đóng (Esc)"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Tab bar: Đỏ & Vàng Hoàng Kim hài hòa */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/20 overflow-x-auto scrollbar-none text-xs font-bold relative z-10">
            <button
              type="button"
              onClick={() => setActiveTab('physical')}
              className="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              style={activeTab === 'physical' ? {
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E0A4 50%, #D4AF37 100%)',
                color: '#4A0E10',
                fontWeight: 900,
                border: '1.5px solid #FFF',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              } : {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="material-symbols-outlined text-sm">package_2</span>
              <span>1. Kiện Hàng Hộp Kit</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('digital')}
              className="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              style={activeTab === 'digital' ? {
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E0A4 50%, #D4AF37 100%)',
                color: '#4A0E10',
                fontWeight: 900,
                border: '1.5px solid #FFF',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              } : {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="material-symbols-outlined text-sm">play_lesson</span>
              <span>2. Quyền Học Online ({course.totalLessons} Bài)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('invoice')}
              className="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              style={activeTab === 'invoice' ? {
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E0A4 50%, #D4AF37 100%)',
                color: '#4A0E10',
                fontWeight: 900,
                border: '1.5px solid #FFF',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              } : {
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="material-symbols-outlined text-sm">receipt_long</span>
              <span>3. Hóa Đơn & Mộc Đỏ</span>
            </button>
          </div>
        </div>

        {/* BODY (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-stone-900">
          
          {/* TAB 1: KIỆN HÀNG VẬT LÝ TẬN NHÀ */}
          {activeTab === 'physical' && (
            <div className="space-y-5">
              {/* Banner trạng thái giao hàng: Vàng ngà + Điểm đỏ mận */}
              <div 
                className="rounded-2xl p-4 flex items-start sm:items-center justify-between gap-4 shadow-xs"
                style={{
                  background: 'linear-gradient(to right, #FFFDF9, #FAF1DC)',
                  border: '1.5px solid rgba(197, 145, 0, 0.45)'
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div 
                    className="size-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: '#781012',
                      color: '#F6E0A4',
                      border: '1.5px solid #C59100'
                    }}
                  >
                    <span className="material-symbols-outlined text-xl">local_shipping</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wide" style={{ color: '#690D10' }}>
                        Bưu tá VNPost Làng Nghề
                      </span>
                      <span 
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: 'rgba(120, 16, 18, 0.08)',
                          color: '#781012',
                          border: '1px solid rgba(120, 16, 18, 0.2)'
                        }}
                      >
                        Đang đóng gói tại bản
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-0.5">
                      Tiếp nhận trực tiếp từ <strong>{course.artisanVillage}</strong> để vận chuyển đến bạn.
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <span className="text-[10px] text-stone-500 uppercase font-black tracking-wider block">Mã vận đơn</span>
                  <span 
                    className="text-xs font-mono font-black px-2.5 py-1 rounded-lg block"
                    style={{
                      backgroundColor: '#FFF',
                      color: '#781012',
                      border: '1px solid #C59100'
                    }}
                  >
                    VNPOST-{course.ethnic.toUpperCase()}-88219
                  </span>
                </div>
              </div>

              {/* Chi tiết hộp kit: Sang trọng, ấm áp */}
              <div 
                className="rounded-3xl p-5 shadow-xs"
                style={{
                  backgroundColor: '#FFF',
                  border: '1.5px solid rgba(197, 145, 0, 0.35)'
                }}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div 
                    className="w-full sm:w-44 h-40 rounded-2xl overflow-hidden relative shrink-0 shadow-inner group"
                    style={{ border: '2px solid rgba(197, 145, 0, 0.35)' }}
                  >
                    <img 
                      src={course.craftKit.kitImage} 
                      alt={course.craftKit.kitName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      loading="lazy"
                    />
                    <div 
                      className="absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs"
                      style={{
                        backgroundColor: '#781012',
                        color: '#F6E0A4',
                        border: '1px solid #C59100'
                      }}
                    >
                      Hộp Kit Thủ Công
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#781012' }}>
                          Bản sắc {course.ethnic}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-stone-900 mt-0.5">
                          {course.craftKit.kitName}
                        </h3>
                      </div>
                      <span 
                        className="text-base font-black px-3.5 py-1 rounded-xl shrink-0 shadow-2xs"
                        style={{
                          backgroundColor: 'rgba(120, 16, 18, 0.08)',
                          color: '#781012',
                          border: '1.5px solid rgba(120, 16, 18, 0.25)'
                        }}
                      >
                        {course.comboPrice.toLocaleString('vi-VN')} đ
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      Được nghệ nhân chuẩn bị và đóng gói thủ công chuẩn quy cách, gồm đầy đủ công cụ để bạn hoàn thành tác phẩm di sản đầu tiên tại nhà mà không cần sắm thêm bất kỳ phụ kiện nào.
                    </p>

                    <div 
                      className="mt-3 flex items-center gap-4 text-xs font-bold pt-3"
                      style={{ borderTop: '1px solid rgba(197, 145, 0, 0.2)' }}
                    >
                      <span className="flex items-center gap-1" style={{ color: '#781012' }}>
                        <span className="material-symbols-outlined text-sm">eco</span>
                        Hộp Kraft sinh học tái chế
                      </span>
                      <span className="flex items-center gap-1" style={{ color: '#781012' }}>
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Bảo chứng bởi {course.artisanName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Danh sách các món trong hộp */}
                <div 
                  className="mt-5 pt-4"
                  style={{ borderTop: '1px solid rgba(197, 145, 0, 0.2)' }}
                >
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base" style={{ color: '#781012' }}>checklist</span>
                    <span>Bên trong hộp gồm {course.craftKit.includes.length} món cụ thể:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {course.craftKit.includes.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="p-3 rounded-2xl flex items-start gap-3 transition-colors shadow-2xs"
                        style={{
                          backgroundColor: '#FFFDF9',
                          border: '1px solid rgba(197, 145, 0, 0.3)'
                        }}
                      >
                        <div 
                          className="size-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: 'rgba(120, 16, 18, 0.08)',
                            color: '#781012',
                            border: '1px solid rgba(120, 16, 18, 0.15)'
                          }}
                        >
                          <span className="material-symbols-outlined text-base">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-1">
                            <span className="text-xs font-black text-stone-900 truncate">{item.name}</span>
                            <span 
                              className="text-[10px] font-black px-2 py-0.5 rounded-md shrink-0"
                              style={{
                                backgroundColor: 'rgba(120, 16, 18, 0.08)',
                                color: '#781012',
                                border: '1px solid rgba(120, 16, 18, 0.2)'
                              }}
                            >
                              {item.quantity}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Thẻ Căn cước Di sản & Tem QR Bảo chứng */}
              <div 
                className="rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-xs"
                style={{
                  background: 'linear-gradient(135deg, #FFFDF8 0%, #F6EDD7 100%)',
                  border: '2px dashed #C59100'
                }}
              >
                <div 
                  className="size-24 sm:size-28 rounded-2xl p-2 flex items-center justify-center shrink-0 shadow-md"
                  style={{
                    backgroundColor: '#FFF',
                    border: '2px solid rgba(120, 16, 18, 0.3)'
                  }}
                >
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="QR Di Sản" className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-stone-400">Đang nạp QR...</div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span 
                    className="inline-block text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full mb-1.5 shadow-2xs"
                    style={{
                      backgroundColor: '#781012',
                      color: '#F6E0A4',
                      border: '1px solid #C59100'
                    }}
                  >
                    Thẻ Căn Cước Di Sản Đi Kèm
                  </span>
                  <h4 className="text-sm sm:text-base font-black" style={{ color: '#690D10' }}>
                    Bảo Chứng Nghệ Nhân {course.artisanName}
                  </h4>
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    Mỗi kiện hàng đều gắn kèm thẻ giấy dó dập nổi mã QR định danh số. Quét mã bằng camera điện thoại sẽ mở ra trang hồ sơ xuất xứ của nghệ nhân tại <strong>{course.artisanVillage}</strong> nhằm bảo vệ bản quyền văn hóa dân tộc.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QUYỀN HỌC SỐ ONLINE */}
          {activeTab === 'digital' && (
            <div className="space-y-5">
              <div 
                className="rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs"
                style={{
                  background: 'linear-gradient(to right, #FFFDF9, #FAF1DC)',
                  border: '1.5px solid rgba(197, 145, 0, 0.45)'
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div 
                    className="size-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{
                      backgroundColor: '#781012',
                      color: '#F6E0A4',
                      border: '1.5px solid #C59100'
                    }}
                  >
                    <span className="material-symbols-outlined text-xl">workspace_premium</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase" style={{ color: '#690D10' }}>
                      Quyền Học Trọn Đời Đã Được Kích Hoạt
                    </h4>
                    <p className="text-xs text-stone-700 mt-0.5">
                      Học viên: <strong>{customerName}</strong> • Mã học viên: <span className="font-mono font-black" style={{ color: '#781012' }}>SV-HV-{displayOrderId.replace('SN-', '')}</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onStartLearning) onStartLearning();
                  }}
                  className="px-4 py-2 hover:brightness-110 text-white rounded-xl text-xs font-black uppercase tracking-wider shrink-0 shadow-md transition-all cursor-pointer hidden sm:flex items-center gap-1.5"
                  style={{
                    backgroundColor: '#781012',
                    border: '1px solid #C59100'
                  }}
                >
                  <span className="material-symbols-outlined text-sm" style={{ color: '#F6E0A4' }}>play_circle</span>
                  <span>Vào học ngay</span>
                </button>
              </div>

              {/* Danh sách các bài học */}
              <div 
                className="rounded-3xl p-5 shadow-xs space-y-3"
                style={{
                  backgroundColor: '#FFF',
                  border: '1.5px solid rgba(197, 145, 0, 0.35)'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base" style={{ color: '#781012' }}>format_list_numbered</span>
                    <span>Toàn bộ {course.totalLessons} bài học của Nghệ nhân {course.artisanName}:</span>
                  </h4>
                  <span className="text-xs font-bold" style={{ color: '#781012' }}>Thời lượng: {course.totalDuration}</span>
                </div>

                <div className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className="p-3 rounded-2xl flex items-center justify-between gap-3 transition-colors"
                      style={{
                        backgroundColor: '#FFFDF9',
                        border: '1px solid rgba(197, 145, 0, 0.25)'
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div 
                          className="size-7 rounded-full font-black text-xs flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: '#781012',
                            color: '#F6E0A4',
                            border: '1px solid #C59100'
                          }}
                        >
                          {lesson.order}
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-black text-stone-900 truncate">{lesson.title}</h5>
                          <p className="text-[11px] text-stone-600 truncate mt-0.5">{lesson.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-[11px] font-bold text-stone-500">{lesson.duration}</span>
                        <span 
                          className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: 'rgba(120, 16, 18, 0.08)',
                            color: '#781012',
                            border: '1px solid rgba(120, 16, 18, 0.2)'
                          }}
                        >
                          Đã Mở Khóa
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cẩm nang Ebook và Hỗ trợ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div 
                  className="p-4 rounded-2xl shadow-2xs flex items-start gap-3"
                  style={{
                    backgroundColor: '#FFF',
                    border: '1px solid rgba(197, 145, 0, 0.3)'
                  }}
                >
                  <div 
                    className="size-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(120, 16, 18, 0.08)',
                      color: '#781012',
                      border: '1px solid rgba(120, 16, 18, 0.15)'
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-stone-900">Cẩm Nang Kỹ Thuật (PDF)</h5>
                    <p className="text-[11px] text-stone-600 mt-0.5">Sổ tay hướng dẫn pha màu, tạo hoa văn cổ và bảo quản tác phẩm.</p>
                    <a
                      href="#download-ebook"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Cẩm nang Ebook PDF đang được tải về máy của bạn!');
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-black hover:underline mt-2"
                      style={{ color: '#781012' }}
                    >
                      <span className="material-symbols-outlined text-xs">download</span> Tải bản PDF
                    </a>
                  </div>
                </div>

                <div 
                  className="p-4 rounded-2xl shadow-2xs flex items-start gap-3"
                  style={{
                    backgroundColor: '#FFF',
                    border: '1px solid rgba(197, 145, 0, 0.3)'
                  }}
                >
                  <div 
                    className="size-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'rgba(120, 16, 18, 0.08)',
                      color: '#781012',
                      border: '1px solid rgba(120, 16, 18, 0.15)'
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">forum</span>
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-stone-900">Cộng Đồng Học Viên</h5>
                    <p className="text-[11px] text-stone-600 mt-0.5">Giao lưu cùng hơn {course.studentsCount} học viên và nhận hỗ trợ giải đáp trực tiếp.</p>
                    <a
                      href="https://zalo.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-black hover:underline mt-2"
                      style={{ color: '#781012' }}
                    >
                      <span className="material-symbols-outlined text-xs">groups</span> Nhóm Zalo hỗ trợ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HÓA ĐƠN & MỘC ĐỎ */}
          {activeTab === 'invoice' && (
            <div className="space-y-4">
              <div 
                className="rounded-3xl p-6 shadow-sm relative overflow-hidden"
                style={{
                  backgroundColor: '#FFF',
                  border: '1.5px solid rgba(197, 145, 0, 0.4)'
                }}
              >
                {/* Con dấu mộc đỏ điện tử Sắc Việt: Đậm nét truyền thống */}
                <div className="absolute right-6 top-6 sm:right-10 sm:top-8 pointer-events-none select-none opacity-90 rotate-[-10deg]">
                  <div 
                    className="size-26 sm:size-30 rounded-full flex flex-col items-center justify-center p-2 shadow-sm"
                    style={{
                      border: '3px dashed #B91C1C',
                      color: '#B91C1C',
                      backgroundColor: 'rgba(254, 242, 242, 0.6)'
                    }}
                  >
                    <span className="material-symbols-outlined text-xl">verified</span>
                    <span className="text-[9.5px] font-black uppercase tracking-wider text-center leading-tight mt-0.5">
                      SẮC VIỆT
                    </span>
                    <span className="text-[8px] font-bold text-center leading-tight">
                      BẢN QUYỀN DI SẢN
                    </span>
                    <span className="text-[7px] font-mono tracking-widest mt-0.5">★ ĐÃ XÁC THỰC ★</span>
                  </div>
                </div>

                {/* Tiêu đề hóa đơn */}
                <div 
                  className="pb-4"
                  style={{ borderBottom: '1px solid rgba(197, 145, 0, 0.25)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg tracking-wider" style={{ color: '#781012' }}>SẮC VIỆT</span>
                    <span className="text-xs text-stone-500 border-l border-stone-300 pl-2">Nền tảng TMĐT Di sản Văn hóa</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black uppercase text-stone-900 mt-2">
                    PHIẾU XÁC NHẬN ĐƠN HÀNG & CHỨNG NHẬN DI SẢN
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3 text-xs text-stone-600">
                    <p><strong className="text-stone-900">Mã đơn hàng:</strong> <span className="font-mono font-black" style={{ color: '#781012' }}>{displayOrderId}</span></p>
                    <p><strong className="text-stone-900">Ngày đặt:</strong> {new Date().toLocaleDateString('vi-VN')} {new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute: '2-digit'})}</p>
                    <p><strong className="text-stone-900">Khách hàng:</strong> {customerName}</p>
                    <p><strong className="text-stone-900">Thanh toán:</strong> Chuyển khoản Napas 24/7 / COD</p>
                  </div>
                </div>

                {/* Bảng chi tiết sản phẩm */}
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr 
                        className="uppercase text-[10px] font-black text-stone-500"
                        style={{ borderBottom: '1px solid rgba(197, 145, 0, 0.25)' }}
                      >
                        <th className="py-2">Mô tả sản phẩm</th>
                        <th className="py-2 text-center">Hình thức</th>
                        <th className="py-2 text-right">Số lượng</th>
                        <th className="py-2 text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      <tr>
                        <td className="py-3">
                          <p className="font-black text-stone-900">{course.title}</p>
                          <p className="text-[10px] text-stone-500">Kèm Hộp Kit DIY {course.craftKit.kitName} ({course.artisanVillage})</p>
                        </td>
                        <td className="py-3 text-center">
                          <span 
                            className="text-[10px] font-black px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'rgba(120, 16, 18, 0.08)',
                              color: '#781012',
                              border: '1px solid rgba(120, 16, 18, 0.2)'
                            }}
                          >
                            Combo Phygital
                          </span>
                        </td>
                        <td className="py-3 text-right font-bold text-stone-800">1 hộp</td>
                        <td className="py-3 text-right font-black" style={{ color: '#781012' }}>
                          {course.comboPrice.toLocaleString('vi-VN')} đ
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-stone-500">Vận chuyển bưu tá xã toàn quốc</td>
                        <td className="py-2.5 text-center text-stone-400">VNPost</td>
                        <td className="py-2.5 text-right text-stone-400">1</td>
                        <td className="py-2.5 text-right font-bold text-emerald-700">Miễn phí (0 đ)</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr 
                        className="text-sm"
                        style={{ borderTop: '2px solid rgba(197, 145, 0, 0.35)' }}
                      >
                        <th colSpan={3} className="py-3 text-right font-black text-stone-800 uppercase text-xs">Tổng thanh toán:</th>
                        <th className="py-3 text-right font-black text-base" style={{ color: '#781012' }}>
                          {course.comboPrice.toLocaleString('vi-VN')} đ
                        </th>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Cam kết pháp lý & ESG */}
                <div 
                  className="mt-3 pt-3 text-[11px] text-stone-700 leading-relaxed p-3 rounded-2xl"
                  style={{
                    backgroundColor: '#FFFDF9',
                    border: '1px solid rgba(197, 145, 0, 0.25)'
                  }}
                >
                  <p>
                    ✓ <strong>Đóng góp trực tiếp cho làng nghề:</strong> 75% giá trị đơn hàng được chuyển về cho nghệ nhân <strong>{course.artisanName}</strong> và đồng bào <strong>{course.ethnic}</strong>.
                  </p>
                  <p className="mt-1">
                    ✓ <strong>Đổi trả an tâm:</strong> Nếu hộp nguyên liệu gặp sự cố vận chuyển, Sắc Việt cam kết bù 1-đổi-1 miễn phí trong 7 ngày.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleDownloadInvoice}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  style={{
                    backgroundColor: '#FFF',
                    color: '#781012',
                    border: '1.5px solid #C59100'
                  }}
                >
                  <span className="material-symbols-outlined text-sm">print</span>
                  <span>In phiếu xác nhận</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS: Đỏ & Vàng Sắc Việt sang trọng */}
        <div 
          className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0"
          style={{
            backgroundColor: '#FFF',
            borderTop: '1.5px solid rgba(197, 145, 0, 0.35)'
          }}
        >
          <div className="flex items-center gap-1.5 text-xs text-stone-700">
            <span className="material-symbols-outlined text-base" style={{ color: '#781012' }}>verified</span>
            <span>Hệ thống Demo Sắc Việt • Sẵn sàng bảo vệ học phần</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              style={{
                backgroundColor: '#F5EEDB',
                color: '#4A0E10',
                border: '1px solid rgba(197, 145, 0, 0.3)'
              }}
            >
              Đóng
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onStartLearning) onStartLearning();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              style={{
                backgroundColor: '#781012',
                color: '#F6E0A4',
                border: '1.5px solid #C59100'
              }}
            >
              <span className="material-symbols-outlined text-sm" style={{ color: '#F6E0A4' }}>play_circle</span>
              <span>Bắt Đầu Học Ngay</span>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes modal-enter {
          from { transform: scale(0.97); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-modal-enter { animation: modal-enter 0.12s ease-out forwards; }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default HeritageUnboxingModal;
