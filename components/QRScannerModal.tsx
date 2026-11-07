import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (productId: string, rawText: string) => void;
  onErrorToast?: (msg: string) => void;
}

// Hàm phát tiếng beep ngắn khi quét trúng bằng Web Audio API
const playBeep = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // Nốt La cao (A5)
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch (err) {
    console.warn('AudioContext not allowed or failed:', err);
  }
};

// Hàm trích xuất productId từ chuỗi quét
export const extractProductIdFromQR = (rawText: string): string => {
  const text = rawText.trim();
  
  // 1. Kiểm tra tham số ?product=... hoặc ?productId=... trong URL
  try {
    if (text.includes('product=') || text.includes('productId=')) {
      const match = text.match(/[?&#](?:product|productId)=([^&#]+)/i);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    }
    // 2. Nếu là dạng URL đường dẫn /product/:id
    const pathMatch = text.match(/\/product\/([^/?#]+)/i);
    if (pathMatch && pathMatch[1]) {
      return decodeURIComponent(pathMatch[1]);
    }
  } catch (e) {
    console.error('Lỗi phân tích URL QR:', e);
  }

  // 3. Fallback: Trả về chính chuỗi đã quét
  return text;
};

const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  onErrorToast,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'file'>('camera');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const readerElementId = 'qr-reader-container';

  useEffect(() => {
    if (!isOpen) return;

    let html5QrCode: Html5Qrcode | null = null;

    if (activeTab === 'camera') {
      const startCamera = async () => {
        try {
          setCameraError(null);
          // Đảm bảo DOM element đã sẵn sàng
          await new Promise((resolve) => setTimeout(resolve, 150));
          
          const el = document.getElementById(readerElementId);
          if (!el) return;

          html5QrCode = new Html5Qrcode(readerElementId);
          scannerRef.current = html5QrCode;

          const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          };

          await html5QrCode.start(
            { facingMode: 'environment' }, // Ưu tiên camera sau điện thoại
            config,
            (decodedText) => {
              // Quét thành công!
              playBeep();
              const productId = extractProductIdFromQR(decodedText);
              
              // Dừng camera an toàn
              if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().catch(() => {}).finally(() => {
                  onScanSuccess(productId, decodedText);
                  onClose();
                });
              } else {
                onScanSuccess(productId, decodedText);
                onClose();
              }
            },
            () => {
              // Quá trình quét liên tục (không cần báo lỗi từng frame)
            }
          );
          setIsScanning(true);
        } catch (err: unknown) {
          console.warn('Không thể khởi động camera:', err);
          const errString = String(err);
          if (errString.includes('NotAllowedError') || errString.includes('Permission')) {
            setCameraError('Bạn chưa cấp quyền truy cập Camera. Vui lòng cho phép quyền hoặc chuyển sang chế độ "Tải ảnh mã QR".');
          } else {
            setCameraError('Không tìm thấy camera hoặc camera đang được ứng dụng khác sử dụng. Bạn có thể chuyển sang tab "Tải ảnh mã QR".');
          }
          setIsScanning(false);
        }
      };

      startCamera();
    }

    return () => {
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          scannerRef.current.stop().catch(() => {});
        }
        scannerRef.current.clear();
        scannerRef.current = null;
      }
      setIsScanning(false);
    };
  }, [isOpen, activeTab, onScanSuccess, onClose]);

  // Xử lý quét qua tải file ảnh
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCameraError(null);
      const html5QrCode = new Html5Qrcode('qr-file-dummy');
      const decodedText = await html5QrCode.scanFile(file, true);
      playBeep();
      const productId = extractProductIdFromQR(decodedText);
      html5QrCode.clear();
      onScanSuccess(productId, decodedText);
      onClose();
    } catch (err) {
      console.warn('Lỗi đọc ảnh QR:', err);
      const msg = 'Không tìm thấy mã QR hợp lệ trong ảnh này. Vui lòng chọn ảnh chụp rõ nét hơn.';
      setCameraError(msg);
      if (onErrorToast) onErrorToast(msg);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 font-display">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-gold/40 overflow-hidden animate-slide-up flex flex-col">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 size-9 rounded-full bg-white/80 hover:bg-white text-text-soft hover:text-red-700 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header */}
        <div 
          className="p-5 text-white text-center relative border-b-2 border-gold/30"
          style={{ backgroundColor: '#781012', backgroundImage: 'linear-gradient(135deg, #8B1A1A 0%, #54080A 100%)' }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-black uppercase tracking-widest mb-1.5">
            <span className="material-symbols-outlined text-xs">qr_code_scanner</span>
            <span>MÁY QUÉT DI SẢN SẮC VIỆT</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Quét Mã QR Sản Phẩm
          </h3>
          <p className="text-xs text-white/80 font-medium mt-0.5">
            Hướng camera vào tem sản phẩm hoặc tải ảnh chụp mã QR lên
          </p>

          {/* Tab chuyển đổi Camera / Tải ảnh */}
          <div className="flex bg-black/30 p-1 rounded-xl mt-3.5 max-w-xs mx-auto border border-white/10">
            <button
              onClick={() => { setCameraError(null); setActiveTab('camera'); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'camera' 
                  ? 'bg-gold text-[#54080A] shadow-md' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">photo_camera</span>
              <span>Camera</span>
            </button>
            <button
              onClick={() => { setCameraError(null); setActiveTab('file'); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'file' 
                  ? 'bg-gold text-[#54080A] shadow-md' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-sm">upload_file</span>
              <span>Tải ảnh QR</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 bg-[#FAF8F5] flex flex-col items-center">
          
          {activeTab === 'camera' ? (
            <div className="w-full flex flex-col items-center">
              {/* Vùng Camera Scanner */}
              <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[300px] rounded-2xl overflow-hidden bg-black shadow-inner border-2 border-gold/40 flex items-center justify-center">
                <div id={readerElementId} className="w-full h-full object-cover"></div>
                
                {/* Khung ngắm laser nếu đang scanning */}
                {isScanning && !cameraError && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-52 h-52 sm:w-60 sm:h-60 border-2 border-gold/70 rounded-2xl relative">
                      {/* 4 góc vàng */}
                      <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-gold"></div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-gold"></div>
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-gold"></div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-gold"></div>
                      {/* Tia quét laser chuyển động */}
                      <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_8px_#D4AF37] animate-pulse top-1/2 -translate-y-1/2"></div>
                    </div>
                  </div>
                )}

                {/* Khi đang tải camera */}
                {!isScanning && !cameraError && (
                  <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-white p-4 text-center">
                    <span className="material-symbols-outlined text-3xl text-gold animate-spin mb-2">progress_activity</span>
                    <p className="text-xs font-bold">Đang kết nối camera thiết bị...</p>
                    <p className="text-[10px] text-gray-400 mt-1">Vui lòng bấm Cho phép (Allow) nếu trình duyệt hỏi quyền</p>
                  </div>
                )}
              </div>

              {cameraError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-left w-full text-xs text-red-800 space-y-2">
                  <div className="flex items-start gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-sm shrink-0 text-red-600">error</span>
                    <span>{cameraError}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('file')}
                    className="w-full py-1.5 bg-red-700 text-white font-black uppercase text-[10px] rounded-lg tracking-wider hover:bg-red-800 transition-colors"
                  >
                    Chuyển sang Tải ảnh mã QR
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Tab Tải ảnh mã QR */
            <div className="w-full flex flex-col items-center py-4">
              <div id="qr-file-dummy" className="hidden"></div>
              
              <label 
                htmlFor="qr-file-input"
                className="w-full aspect-[4/3] max-w-[280px] rounded-2xl border-2 border-dashed border-gold/50 bg-white hover:bg-gold/5 transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer group shadow-sm"
              >
                <div className="size-16 rounded-full bg-gold/10 group-hover:scale-110 transition-transform flex items-center justify-center text-primary mb-3">
                  <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                </div>
                <span className="text-sm font-black text-text-main group-hover:text-primary transition-colors">
                  Chọn ảnh chứa mã QR
                </span>
                <span className="text-[11px] text-text-soft mt-1">
                  Hỗ trợ định dạng PNG, JPG, WEBP chụp tem sản phẩm
                </span>
                <span className="mt-3 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
                  Duyệt file trên máy
                </span>
                <input
                  id="qr-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {cameraError && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
                  {cameraError}
                </div>
              )}
            </div>
          )}

          {/* Hướng dẫn ngắn */}
          <div className="mt-4 p-3 bg-white rounded-xl border border-gold/20 text-left w-full text-[11px] text-text-soft space-y-1">
            <p className="font-bold text-text-main flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gold">tips_and_updates</span>
              Mẹo thử nghiệm nhanh:
            </p>
            <p>1. Mở bất kỳ sản phẩm nào trên Chợ Phiên, bấm <strong>"Tem QR Di Sản"</strong> để xem mã QR.</p>
            <p>2. Dùng camera điện thoại quét thẳng vào màn hình, hoặc bấm <strong>"Tải tem QR"</strong> rồi sang đây tải ảnh lên để kiểm tra!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-gold/20 text-center">
          <button
            onClick={onClose}
            className="py-2 px-6 rounded-xl border border-gold/30 text-text-soft hover:text-text-main text-xs font-bold uppercase transition-colors"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QRScannerModal;
