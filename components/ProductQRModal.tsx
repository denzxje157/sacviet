import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import QRCode from 'qrcode';

export interface QRProductData {
  id: string;
  name: string;
  ethnic?: string;
  price?: string;
  artisan?: string;
  artisanVillage?: string;
  img?: string;
}

interface ProductQRModalProps {
  product: QRProductData | null;
  onClose: () => void;
  onCopySuccess?: (msg: string) => void;
}

const ProductQRModal: React.FC<ProductQRModalProps> = ({ product, onClose, onCopySuccess }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Tính toán URL chuẩn: Khi ở local thì trỏ về Vercel để quét bằng điện thoại, khi ở Vercel thì dùng domain hiện tại
  const getProductUrl = () => {
    if (!product) return '';
    const isLocal = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.') ||
      window.location.hostname.startsWith('10.')
    );
    const origin = isLocal ? 'https://sacviet.vercel.app' : window.location.origin;
    const path = isLocal ? '' : window.location.pathname.replace(/\/$/, '');
    return `${origin}${path}/#/marketplace?product=${encodeURIComponent(product.id)}`;
  };

  const productUrl = getProductUrl();

  useEffect(() => {
    if (!product || !productUrl) return;

    // Tạo mã QR chất lượng cao với màu đỏ mận truyền thống
    QRCode.toDataURL(productUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: '#781012', // Đỏ mận truyền thống
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'H'
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Lỗi tạo mã QR:', err));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, productUrl, onClose]);

  if (!product) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
      setCopied(true);
      if (onCopySuccess) onCopySuccess('Đã sao chép liên kết truy xuất sản phẩm');
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = `tem-qr-sacviet-${product.id}.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 font-display">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-lg bg-[#FAF8F5] rounded-3xl shadow-2xl border-4 border-gold/40 overflow-hidden animate-slide-up flex flex-col max-h-[92vh]"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 size-9 rounded-full bg-white/80 hover:bg-white text-text-soft hover:text-red-700 flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
          title="Đóng"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Header: Phong cách Tem Bảo Chứng Di Sản */}
        <div 
          className="p-5 sm:p-6 text-white text-center relative overflow-hidden shrink-0 border-b-2 border-gold/40"
          style={{ backgroundColor: '#781012', backgroundImage: 'linear-gradient(135deg, #8B1A1A 0%, #54080A 100%)' }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-[10px] font-black uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-xs">verified</span>
            <span>Tem Định Danh & Nguồn Gốc Di Sản</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gold tracking-tight leading-snug">
            SẮC VIỆT PASSPORT
          </h3>
          <p className="text-xs text-white/80 font-medium mt-1">
            Mã định danh số hóa kết nối trực tiếp với Nghệ nhân bản địa
          </p>
        </div>

        {/* Nội dung chính cuộn nếu màn hình nhỏ */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          
          {/* Khung Mã QR Nổi Bật */}
          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl border-2 border-gold/30 shadow-inner">
            <div className="relative p-2 bg-white rounded-xl border border-gold/20 shadow-sm">
              {qrDataUrl ? (
                <img 
                  src={qrDataUrl} 
                  alt={`Mã QR ${product.name}`} 
                  className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-lg"
                />
              ) : (
                <div className="w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center text-gold animate-pulse text-xs font-bold">
                  Đang khởi tạo mã QR...
                </div>
              )}
              {/* Logo trung tâm tem */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="size-11 sm:size-12 bg-white rounded-full p-1 shadow-md border border-gold flex items-center justify-center">
                  <img 
                    src="https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png" 
                    alt="Sắc Việt" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-text-soft text-center">
              <span className="material-symbols-outlined text-sm text-primary animate-bounce">photo_camera</span>
              <span>Dùng Camera điện thoại hoặc Zalo quét để mở trang sản phẩm</span>
            </div>
          </div>

          {/* Thông tin sản phẩm được liên kết */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-gold/20 space-y-2 text-left">
            <div className="flex items-start gap-3">
              {product.img && (
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="size-14 sm:size-16 rounded-xl object-cover border border-gold/20 shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                    Dân tộc {product.ethnic || 'Bản địa'}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    ID: {product.id}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-text-main line-clamp-1 mt-0.5">
                  {product.name}
                </h4>
                {product.price && (
                  <p className="text-primary font-black text-sm">
                    {product.price}
                  </p>
                )}
              </div>
            </div>

            {/* Chi tiết nguồn gốc nghệ nhân */}
            <div className="pt-2 border-t border-gold/10 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-text-soft font-bold block text-[10px] uppercase">Nghệ nhân:</span>
                <span className="font-black text-text-main truncate block">{product.artisan || 'Nghệ nhân bản địa'}</span>
              </div>
              <div>
                <span className="text-text-soft font-bold block text-[10px] uppercase">Làng nghề / Buôn bản:</span>
                <span className="font-bold text-text-main truncate block">{product.artisanVillage || `Làng nghề đồng bào ${product.ethnic}`}</span>
              </div>
            </div>
          </div>

          {/* Đường dẫn URL chi tiết */}
          <div className="bg-[#F2EFE6] p-2.5 rounded-xl border border-gold/20 flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono text-text-soft truncate max-w-[280px]">
              {productUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${
                copied 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-text-main hover:bg-gold/20 border border-gold/30'
              }`}
            >
              <span className="material-symbols-outlined text-xs">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-gold/20 flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            onClick={handleDownloadQR}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gold text-[#54080A] font-black text-xs uppercase tracking-wider hover:brightness-105 shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Tải tem QR (In ấn / Slide)</span>
          </button>
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-4 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">open_in_new</span>
            <span>Thử mở link sản phẩm</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductQRModal;
