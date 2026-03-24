import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { X, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../services/supabaseClient.ts'; // Đã thêm dòng này

type AuthMode = 'login' | 'register' | 'forgot'; // Đã thêm 'forgot'

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, toggleAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Reset state when modal opens/closes or mode changes
  useEffect(() => {
    setErrors({});
    setSuccessMessage('');
    if (!isAuthModalOpen) {
      const savedEmail = localStorage.getItem('sacnoi_remember_email');
      const savedPass = localStorage.getItem('sacnoi_remember_pass');
      
      if (!savedEmail) {
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
      setMode('login');
      setShowPassword(false);
    } else {
       const savedEmail = localStorage.getItem('sacnoi_remember_email');
       const savedPass = localStorage.getItem('sacnoi_remember_pass');
       if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
       }
       if (savedPass) {
          setPassword(savedPass);
       }
    }
  }, [isAuthModalOpen, mode]);

  if (!isAuthModalOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (mode !== 'forgot') {
      if (!password) {
        newErrors.password = 'Vui lòng nhập mật khẩu';
      } else if (password.length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
    }

    if (mode === 'register') {
      if (!fullName.trim()) {
        newErrors.fullName = 'Vui lòng nhập họ và tên';
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // HÀM QUÊN MẬT KHẨU
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // Đã khóa cứng link xịn của Vercel
        redirectTo: 'https://sacviet.vercel.app/#/reset-password',
      });
      if (error) throw error;
      setSuccessMessage('Đã gửi link khôi phục! Vui lòng kiểm tra Email.');
      setTimeout(() => {
        setMode('login');
        setSuccessMessage('');
      }, 3000);
    } catch (err: any) {
      setErrors({ form: 'Lỗi: Không thể gửi email khôi phục. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      if (mode === 'login') {
        await login(email, password);
        if (rememberMe) {
           localStorage.setItem('sacnoi_remember_email', email);
           localStorage.setItem('sacnoi_remember_pass', password);
        } else {
           localStorage.removeItem('sacnoi_remember_email');
           localStorage.removeItem('sacnoi_remember_pass');
        }
        setSuccessMessage('Đăng nhập thành công!');
      } else {
        await register(fullName, email, password);
        setSuccessMessage('Đăng ký thành công! Đang đăng nhập...');
      }
      
      setTimeout(() => {
        toggleAuthModal();
      }, 1500);
      
    } catch (err: any) {
      setErrors({ form: err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 font-display">
      <div 
        className="absolute inset-0 bg-text-main/70 backdrop-blur-sm animate-fade-in" 
        onClick={toggleAuthModal}
      ></div>
      
      <div className="relative w-full max-w-md bg-[#F9F5EA] rounded-[2rem] shadow-2xl overflow-hidden animate-scale-up border-2 border-gold/20 flex flex-col max-h-[90vh]">
        
        <div className="relative p-6 pb-4 text-center shrink-0">
          <button 
            onClick={toggleAuthModal}
            className="absolute top-4 right-4 z-50 p-2 text-text-soft hover:text-primary hover:bg-gold/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
          <h2 className="text-4xl md:text-5xl font-sans font-black text-primary uppercase mb-2 drop-shadow-sm tracking-tighter">
            {mode === 'login' ? 'Đăng Nhập' : mode === 'register' ? 'Đăng Ký' : 'Khôi Phục'}
          </h2>
          <p className="text-xs font-bold text-bronze uppercase tracking-widest">
            {mode === 'login' ? 'Chào mừng trở lại Sắc Việt' : mode === 'register' ? 'Tham gia cùng Sắc Việt' : 'Lấy lại mật khẩu'}
          </p>
        </div>

        <div className="p-6 pt-2 overflow-y-auto custom-scrollbar flex-1">
          
          {successMessage ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-lg font-black text-text-main">{successMessage}</p>
            </div>
          ) : mode === 'forgot' ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-600 text-sm animate-shake">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p className="font-medium">{errors.form}</p>
                </div>
              )}
              <p className="text-sm text-text-soft font-medium mb-4 text-center">
                Nhập email của bạn, chúng tôi sẽ gửi đường dẫn để đặt lại mật khẩu.
              </p>
              <div>
                <label className="block text-[10px] font-black uppercase text-bronze mb-1 ml-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-soft/50">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-white border ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gold/20 focus:border-primary focus:ring-primary'} rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 transition-colors`}
                    placeholder="email@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.email}</p>}
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Gửi link khôi phục <ArrowRight size={18} /></>
                )}
              </button>
              <button 
                type="button" 
                onClick={() => { setMode('login'); setErrors({}); }} 
                className="w-full text-text-soft text-xs font-bold uppercase mt-4 hover:text-primary transition-colors text-center"
              >
                Quay lại Đăng nhập
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {errors.form && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-600 text-sm animate-shake">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p className="font-medium">{errors.form}</p>
                </div>
              )}

              <div className={`transition-all duration-300 overflow-hidden ${mode === 'register' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-[10px] font-black uppercase text-bronze mb-1 ml-2">Họ và tên</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-soft/50">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full bg-white border ${errors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-gold/20 focus:border-primary focus:ring-primary'} rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 transition-colors`}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-bronze mb-1 ml-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-soft/50">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-white border ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gold/20 focus:border-primary focus:ring-primary'} rounded-xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 transition-colors`}
                    placeholder="email@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.email}</p>}
              </div>

              <div>
                <div className="flex justify-between items-end mb-1 ml-2 mr-2">
                  <label className="block text-[10px] font-black uppercase text-bronze">Mật khẩu</label>
                  {mode === 'login' && (
                    <button 
                      type="button" 
                      onClick={() => { setMode('forgot'); setErrors({}); }}
                      className="text-[10px] font-bold text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-soft/50">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-white border ${errors.password ? 'border-red-400 focus:ring-red-400' : 'border-gold/20 focus:border-primary focus:ring-primary'} rounded-xl pl-11 pr-10 py-3 text-sm font-medium focus:outline-none focus:ring-1 transition-colors`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-soft/50 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.password}</p>}
              </div>

              <div className={`transition-all duration-300 overflow-hidden ${mode === 'register' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                <label className="block text-[10px] font-black uppercase text-bronze mb-1 ml-2">Xác nhận mật khẩu</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-soft/50">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-white border ${errors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 'border-gold/20 focus:border-primary focus:ring-primary'} rounded-xl pl-11 pr-10 py-3 text-sm font-medium focus:outline-none focus:ring-1 transition-colors`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.confirmPassword}</p>}
              </div>

              {mode === 'login' && (
                <div className="flex items-center gap-2 ml-1">
                   <input 
                      type="checkbox" 
                      id="remember-me" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gold/30 text-primary focus:ring-primary"
                   />
                   <label htmlFor="remember-me" className="text-xs font-bold text-text-soft cursor-pointer select-none">Lưu tài khoản & mật khẩu</label>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {!successMessage && mode !== 'forgot' && (
          <div className="p-6 pt-4 bg-white border-t border-gold/10 text-center shrink-0">
            <p className="text-sm text-text-soft font-medium">
              {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-2 font-black text-primary hover:underline uppercase tracking-wider text-xs"
              >
                {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scale-up { 
          from { transform: scale(0.95); opacity: 0; } 
          to { transform: scale(1); opacity: 1; } 
        }
        .animate-scale-up { animation: scale-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes fade-in { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AuthModal;