
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-text-main text-white pt-16 sm:pt-24 pb-24 md:pb-12 px-6 lg:px-20 border-t-4 border-gold relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 gap-12 border-b border-gold/20 pb-16 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2 space-y-8">
           <Link to="/" className="flex items-center gap-4 group inline-flex">
              {/* LỒNG CHỨA LOGO - CHUYỂN SANG BACKGROUND ĐỂ BẤT TỬ TRÊN MOBILE */}
              <div 
                className="h-14 w-14 md:h-16 md:w-16 rounded-full shrink-0 border border-gold/30 bg-white"
                style={{
                  backgroundImage: "url('https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%", 
                  backgroundPosition: "52% 55%" 
                }}
              ></div>

              {/* Phần chữ bên cạnh */}
              <div className="flex flex-col">
                <span className="font-black text-white text-2xl md:text-3xl leading-none tracking-tight group-hover:text-gold transition-colors">SẮC VIỆT</span>
                <span className="text-gold text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mt-1">
                  VIỆT NAM
                </span>
              </div>
            </Link>
            <p className="max-w-md text-base leading-relaxed text-white/60 font-medium italic">"Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam." <br/> <span className="text-gold/80 not-italic text-xs mt-2 block">- Hồ Chí Minh</span></p>
            <div className="flex gap-3">
              <Link to="/library" title="Thư viện di sản" className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 text-gold hover:bg-gold hover:text-text-main transition-all shadow-md border border-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-xl">auto_stories</span>
              </Link>
              <Link to="/marketplace" title="Chợ phiên bản địa" className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 text-gold hover:bg-gold hover:text-text-main transition-all shadow-md border border-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-xl">storefront</span>
              </Link>
              <Link to="/artisans" title="Nghệ nhân bản địa" className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 text-gold hover:bg-gold hover:text-text-main transition-all shadow-md border border-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-xl">handshake</span>
              </Link>
              <Link to="/community" title="Cộng đồng bản sắc" className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 text-gold hover:bg-gold hover:text-text-main transition-all shadow-md border border-white/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-xl">forum</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="mb-6 text-[11px] font-black uppercase tracking-widest text-gold border-b border-gold/20 pb-2 inline-block">Khám phá di sản</h4>
            <ul className="space-y-3.5 text-sm text-white/70 font-semibold">
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/artisans"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Nghệ Nhân Tiêu Biểu</Link></li>
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/marketplace"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Chợ Phiên Bản Địa</Link></li>
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/library"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Thư Viện 54 Dân Tộc</Link></li>
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/community"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Không Gian Cộng Đồng</Link></li>
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Trang Chủ Sắc Việt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] font-black uppercase tracking-widest text-gold border-b border-gold/20 pb-2 inline-block">Thông tin & Hỗ trợ</h4>
            <ul className="space-y-3.5 text-sm text-white/70 font-semibold">
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/seller-portal"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Kênh Nghệ Nhân Bán Hàng</Link></li>
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/orders"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Tra Cứu Đơn Hàng</Link></li>
              <li><a className="hover:text-gold transition-colors flex items-center gap-2" href="https://zalo.me/0987654321" target="_blank" rel="noopener noreferrer"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Hỗ Trợ Trực Tuyến (Zalo)</a></li>
              <li><Link className="hover:text-gold transition-colors flex items-center gap-2" to="/"><span className="w-1.5 h-1.5 bg-gold rounded-full"></span> Giới Thiệu Dự Án</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">© 2026 Sắc Việt • Tôn Vinh Truyên Thống.</p>
          <div className="flex items-center gap-4 text-gold opacity-40">
             <span className="material-symbols-outlined text-sm animate-spin-slow">stars</span>
             <span className="h-px w-12 bg-gold"></span>
             <span className="material-symbols-outlined text-sm animate-spin-slow">stars</span>
          </div>
        </div>
      </div>
      <style>{`
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </footer>
  );
};

export default Footer;
