import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import AIChatWidget from './AIChatWidget.tsx';
import MobileBottomNav from './MobileBottomNav.tsx';
import { User, LogOut, UserCircle2, ShoppingBag, MessageSquare, ShieldCheck, Lock } from 'lucide-react'; // Đã thêm Lock

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { toggleCart, totalItems } = useCart();
  const { user, toggleAuthModal, logout } = useAuth();

  const navLinks = React.useMemo(() => {
    const links = [
      { name: 'Trang chủ', path: '/' },
      { name: 'Chợ Phiên', path: '/marketplace' },
      { name: 'Nghệ Nhân', path: '/artisans' },
      { name: 'Thư viện', path: '/library' },
      { name: 'Cộng đồng', path: '/community' },
    ];
    if (user?.role === 'artisan') {
      links.push({ name: 'Kênh Nghệ Nhân', path: '/seller-portal' });
    }
    return links;
  }, [user?.role]);

  return (
    <>
      <header className="sticky top-0 z-[100] w-full border-b border-gold/20 bg-background-light/90 backdrop-blur-md shadow-sm font-display">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-3 md:px-6 lg:px-8 py-3 md:py-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 -ml-1 md:-ml-2 mr-6 lg:mr-8 group">
              <div 
                className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-gold shrink-0 shadow-md bg-white transition-transform group-hover:scale-105"
                style={{
                  backgroundImage: "url('https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png?v=1')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "105%", 
                  backgroundPosition: "50% 50%" 
                }}
              />
              <div className="flex flex-col">
                <span className="font-black text-primary text-lg md:text-2xl leading-none">SẮC VIỆT</span>
                <span className="text-[9px] md:text-xs text-text-soft font-bold tracking-[0.2em] uppercase mt-1">
                  Kết nối bản sắc
                </span>
              </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-7 ml-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path === '/artisans' && location.pathname.startsWith('/artisan'));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] xl:text-xs font-black uppercase tracking-widest transition-all hover:text-primary relative py-2 group whitespace-nowrap ${
                    isActive ? 'text-primary' : 'text-text-soft'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* NẾU LÀ ADMIN: XẾP TRÊN DƯỚI VỚI HỎI GIÀ LÀNG ĐỂ TIẾT KIỆM KHÔNG GIAN, KHÔNG ĐÈ LÊN CỘNG ĐỒNG */}
            {user?.role === 'admin' ? (
              <div className="hidden md:flex flex-col gap-1 justify-center shrink-0">
                <Link 
                  to="/admin/dashboard"
                  className="flex items-center justify-center gap-1 px-2.5 py-1 bg-black text-gold rounded-full border border-gold/30 hover:bg-zinc-900 transition-all shadow-sm active:scale-95 text-[9px] font-black uppercase tracking-wider whitespace-nowrap"
                  title="Bàn làm việc Quản trị viên"
                >
                  <ShieldCheck size={12} className="shrink-0 text-gold" />
                  <span>Quản trị</span>
                </Link>
                
                <button 
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95 items-center justify-center gap-1 shadow-xs border whitespace-nowrap ${
                    isChatOpen 
                    ? 'bg-gold text-white border-gold shadow-gold/40' 
                    : 'bg-white text-primary border-primary/20 hover:bg-primary/5'
                  }`}
                  title="Trò chuyện cùng Già Làng Di Sản"
                >
                  <MessageSquare size={12} className="shrink-0" />
                  <span>Hỏi Già Làng</span>
                </button>
              </div>
            ) : (
              /* Người dùng bình thường / Nghệ nhân: Nút Hỏi Già Làng dạng thanh ngang như cũ */
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`hidden md:flex rounded-full px-3.5 py-2 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 items-center gap-1.5 shadow-sm border whitespace-nowrap ${
                  isChatOpen 
                  ? 'bg-gold text-white border-gold shadow-gold/40' 
                  : 'bg-white text-primary border-primary/20 hover:bg-primary/5'
                }`}
              >
                <MessageSquare size={16} />
                <span>Hỏi Già Làng</span>
              </button>
            )}

            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="relative size-8 md:size-10 flex items-center justify-center rounded-full bg-white border border-gold/20 text-text-main hover:bg-gold hover:text-white transition-colors shadow-sm shrink-0"
            >
              <ShoppingBag size={18} className="md:w-5 md:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border-2 border-background-light shadow-sm animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Auth Button */}
            <div className="relative shrink-0">
              {user ? (
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 md:gap-2 bg-white border border-gold/30 rounded-full pl-1 pr-2.5 py-1 md:pr-3 hover:bg-gold/5 transition-colors shadow-xs max-w-[135px] md:max-w-[175px]"
                >
                  <div className="size-6 md:size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-gold/30 shrink-0 overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={14} className="md:w-4 md:h-4" strokeWidth={2.5} />
                    )}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-text-main truncate max-w-[65px] md:max-w-[95px]">
                    {user.fullName.split(' ').pop() || user.fullName}
                  </span>
                  {user.role === 'artisan' && (
                    <span className="text-[9px] font-black text-amber-700 bg-amber-100 border border-amber-300/80 px-1 py-0.2 rounded hidden sm:inline shrink-0">
                      Thợ
                    </span>
                  )}
                </button>
              ) : (
                <button 
                  onClick={toggleAuthModal}
                  className="flex items-center gap-1.5 md:gap-2 bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
                >
                  <UserCircle2 size={16} className="md:w-[18px]" />
                  <span className="text-[9px] md:text-xs font-black uppercase tracking-wider">Đăng nhập</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {isUserMenuOpen && user && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setIsUserMenuOpen(false)}></div>
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gold/20 overflow-hidden z-[100] animate-fade-in-up origin-top-right">
                    <div className="p-4 border-b border-gold/10 bg-background-light">
                      <p className="text-sm font-black text-text-main truncate">{user.fullName}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <p className="text-[10px] text-text-soft truncate">{user.email}</p>
                        {user.role === 'admin' && <span className="text-[8px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-black uppercase shrink-0">Admin</span>}
                        {user.role === 'artisan' && <span className="text-[8px] bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded-full font-black uppercase shrink-0">Nghệ Nhân</span>}
                      </div>
                    </div>
                    <div className="p-2 space-y-1">
                      {user.role === 'admin' && (
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                          <ShieldCheck size={16} /> Trang quản trị
                        </Link>
                      )}
                      
                      <Link to="/seller-portal" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-[#8B1A1A] bg-amber-50/70 hover:bg-amber-100/60 rounded-xl transition-colors border border-gold/20" onClick={() => setIsUserMenuOpen(false)}>
                        <span className="material-symbols-outlined text-base text-[#9C6237]">storefront</span> 
                        <span>{user.role === 'artisan' ? 'Gian hàng của tôi' : 'Kênh Nghệ Nhân'}</span>
                      </Link>

                      <Link to="/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-main hover:bg-gold/10 rounded-xl transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                        <span className="material-symbols-outlined text-base">receipt_long</span> Đơn hàng đã mua
                      </Link>
                      
                      {/* NÚT ĐỔI MẬT KHẨU MỚI THÊM VÀO ĐÂY */}
                      <Link to="/reset-password" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-main hover:bg-gold/10 rounded-xl transition-colors" onClick={() => setIsUserMenuOpen(false)}>
                        <Lock size={16} /> Đổi mật khẩu
                      </Link>

                      <div className="h-px bg-gold/10 my-1"></div>
                      <button 
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut size={16} /> Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-text-main hover:text-primary transition-colors p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined text-3xl">
                {isMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background-light border-t border-gold/20 p-6 flex flex-col gap-4 animate-fade-in absolute w-full shadow-2xl h-[calc(100vh-70px)] top-full z-[90] overflow-y-auto">
            {/* Banner đăng nhập nhanh nếu chưa đăng nhập */}
            {!user && (
              <div className="bg-white border border-gold/30 p-4 rounded-2xl shadow-xs flex items-center justify-between gap-3">
                <div>
                  <p className="font-black text-xs text-text-main uppercase">Tài Khoản Sắc Việt</p>
                  <p className="text-[11px] text-text-soft mt-0.5">Đăng nhập để xem đơn hàng & mở gian hàng</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); toggleAuthModal(); }}
                  className="bg-primary text-white text-xs font-black uppercase tracking-wider px-3.5 py-2 rounded-xl shrink-0 shadow-sm active:scale-95 cursor-pointer"
                >
                  Đăng nhập
                </button>
              </div>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="bg-black text-gold p-4 rounded-2xl flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3 font-black uppercase tracking-widest text-xs">
                  <ShieldCheck size={20} /> TRANG QUẢN TRỊ
                </div>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            )}

            {user && (
              <>
                {user.role === 'artisan' && (
                  <Link
                    to="/seller-portal"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-amber-50 text-[#8B1A1A] border border-gold/30 p-3.5 rounded-2xl flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 font-bold uppercase tracking-wider text-xs">
                      <span className="material-symbols-outlined text-lg text-amber-700">storefront</span>
                      <span>Kênh Nghệ Nhân</span>
                    </div>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                )}

                <Link
                  to="/orders"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-white text-stone-800 border border-stone-200 p-3.5 rounded-2xl flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-2.5 font-bold uppercase tracking-wider text-xs">
                    <span className="material-symbols-outlined text-lg text-stone-600">receipt_long</span>
                    <span>Đơn hàng đã mua</span>
                  </div>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </>
            )}

            {/* Hỏi Già Làng AI cho Mobile Drawer */}
            <button
              type="button"
              onClick={() => { setIsMenuOpen(false); setIsChatOpen(true); }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 border border-gold/40 p-3.5 rounded-2xl flex items-center justify-between shadow-xs text-left group active:scale-98 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <p className="font-black text-xs uppercase tracking-wider text-primary">Hỏi Già Làng AI</p>
                  <p className="text-[10px] text-text-soft">Trợ lý di sản & tư vấn văn hóa 24/7</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gold text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-black uppercase tracking-widest flex items-center justify-between border-b border-gold/10 pb-4 ${
                  location.pathname === link.path ? 'text-primary' : 'text-text-main'
                }`}
              >
                {link.name}
                <span className="material-symbols-outlined text-gold/50 text-sm">arrow_forward</span>
              </Link>
            ))}

            {user && (
              <button
                type="button"
                onClick={() => { logout(); setIsMenuOpen(false); }}
                className="text-xs font-black uppercase tracking-wider flex items-center gap-2 text-rose-700 py-3 mt-2 border-t border-gold/15 cursor-pointer"
              >
                <LogOut size={16} />
                <span>Đăng xuất ({user.fullName})</span>
              </button>
            )}
          </div>
        )}
      </header>

      {/* THANH ĐIỀU HƯỚNG DƯỚI CÙNG CHO MOBILE (BOTTOM NAV BAR) */}
      <MobileBottomNav onOpenChat={() => setIsChatOpen(true)} isChatOpen={isChatOpen} />

      <AIChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </>
  );
};

export default Navbar;