import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

interface MobileBottomNavProps {
  onOpenChat?: () => void;
  isChatOpen?: boolean;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isHome = location.pathname === '/';
  const isMarket = location.pathname.startsWith('/marketplace');
  const isArtisans = location.pathname.startsWith('/artisan');
  const isLibrary = location.pathname.startsWith('/library');
  const isCommunity = location.pathname.startsWith('/community');
  const isPortal = location.pathname.startsWith('/seller-portal');

  const isArtisanUser = user?.role === 'artisan';

  return (
    <nav 
      aria-label="Thanh điều hướng di động"
      className="md:hidden fixed bottom-0 left-0 right-0 z-[95] bg-[#F9F5EA]/95 backdrop-blur-md border-t border-gold/30 shadow-[0_-5px_20px_rgba(66,8,8,0.08)] px-1 pt-1.5 pb-[max(env(safe-area-inset-bottom),6px)]"
    >
      <div className="flex items-center justify-around w-full max-w-lg mx-auto">
        {/* 1. Trang chủ */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl transition-all shrink-0 ${
            isHome ? 'text-primary scale-105' : 'text-text-soft/80 hover:text-primary'
          }`}
        >
          <span 
            className="material-symbols-outlined text-[20px] sm:text-[22px]"
            style={{ fontVariationSettings: isHome ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isHome ? 'font-black' : 'font-bold'}`}>
            Trang chủ
          </span>
        </Link>

        {/* 2. Chợ Phiên */}
        <Link
          to="/marketplace"
          className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl transition-all shrink-0 ${
            isMarket ? 'text-primary scale-105' : 'text-text-soft/80 hover:text-primary'
          }`}
        >
          <span 
            className="material-symbols-outlined text-[20px] sm:text-[22px]"
            style={{ fontVariationSettings: isMarket ? "'FILL' 1" : "'FILL' 0" }}
          >
            storefront
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isMarket ? 'font-black' : 'font-bold'}`}>
            Chợ Phiên
          </span>
        </Link>

        {/* 3. Nghệ Nhân */}
        <Link
          to="/artisans"
          className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl transition-all shrink-0 ${
            isArtisans ? 'text-primary scale-105' : 'text-text-soft/80 hover:text-primary'
          }`}
        >
          <span 
            className="material-symbols-outlined text-[20px] sm:text-[22px]"
            style={{ fontVariationSettings: isArtisans ? "'FILL' 1" : "'FILL' 0" }}
          >
            groups
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isArtisans ? 'font-black' : 'font-bold'}`}>
            Nghệ Nhân
          </span>
        </Link>

        {/* 4. Thư viện */}
        <Link
          to="/library"
          className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl transition-all shrink-0 ${
            isLibrary ? 'text-primary scale-105' : 'text-text-soft/80 hover:text-primary'
          }`}
        >
          <span 
            className="material-symbols-outlined text-[20px] sm:text-[22px]"
            style={{ fontVariationSettings: isLibrary ? "'FILL' 1" : "'FILL' 0" }}
          >
            auto_stories
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isLibrary ? 'font-black' : 'font-bold'}`}>
            Thư viện
          </span>
        </Link>

        {/* 5. Cộng đồng */}
        <Link
          to="/community"
          className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl transition-all shrink-0 ${
            isCommunity ? 'text-primary scale-105' : 'text-text-soft/80 hover:text-primary'
          }`}
        >
          <span 
            className="material-symbols-outlined text-[20px] sm:text-[22px]"
            style={{ fontVariationSettings: isCommunity ? "'FILL' 1" : "'FILL' 0" }}
          >
            forum
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isCommunity ? 'font-black' : 'font-bold'}`}>
            Cộng đồng
          </span>
        </Link>

        {/* 6. Kênh Nghệ Nhân (Chỉ hiển thị nếu là nghệ nhân đã đăng nhập) */}
        {isArtisanUser && (
          <Link
            to="/seller-portal"
            className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl transition-all shrink-0 ${
              isPortal ? 'text-primary scale-105' : 'text-text-soft/80 hover:text-primary'
            }`}
          >
            <span 
              className="material-symbols-outlined text-[20px] sm:text-[22px]"
              style={{ fontVariationSettings: isPortal ? "'FILL' 1" : "'FILL' 0" }}
            >
              store
            </span>
            <span className={`text-[9px] sm:text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${isPortal ? 'font-black' : 'font-bold'}`}>
              Kênh Nghệ Nhân
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
