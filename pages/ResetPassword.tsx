import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../services/supabaseClient.ts';
import { Lock, CheckCircle2, AlertCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('error_description')) {
      const params = new URLSearchParams(hash.replace('#', '?'));
      const desc = params.get('error_description') || 'Liên kết đặt lại mật khẩu đã hết hạn hoặc không hợp lệ.';
      setError(decodeURIComponent(desc));
    }
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: password });
      if (updateError) throw updateError;
      
      setMessage('Đổi mật khẩu thành công! Đang chuyển về trang chủ...');
      
      let timer = 3;
      setCountdown(timer);
      const interval = setInterval(() => {
        timer -= 1;
        setCountdown(timer);
        if (timer <= 0) {
          clearInterval(interval);
          navigate('/');
        }
      }, 1000);

    } catch (err: any) {
      setError(err?.message || 'Phiên làm việc đã hết hạn. Vui lòng gửi lại yêu cầu quên mật khẩu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center p-4 font-display">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gold/20 p-8 md:p-10 animate-fade-in relative">
        
        {/* Logo & Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div 
            className="w-16 h-16 rounded-full border-2 border-gold shadow-md bg-white mb-3 shrink-0"
            style={{
              backgroundImage: "url('https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png?v=1')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "105%", 
              backgroundPosition: "50% 50%" 
            }}
          />
          <h2 className="text-2xl font-black text-text-main tracking-tight">Đặt lại mật khẩu</h2>
          <p className="text-xs text-text-soft mt-1">Nhập mật khẩu mới cho tài khoản Sắc Việt của bạn</p>
        </div>

        {/* Thành công */}
        {message ? (
          <div className="text-center py-4 flex flex-col items-center animate-fade-in">
            <div className="size-16 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600 border border-green-200">
              <CheckCircle2 size={36} />
            </div>
            <p className="text-base font-black text-green-700 mb-1">Thành công!</p>
            <p className="text-xs text-text-soft mb-6">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-primary hover:brightness-110 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
            >
              Về trang chủ ngay ({countdown}s)
            </button>
          </div>
        ) : (
          /* Form đơn giản, basic */
          <form onSubmit={handleUpdatePassword} className="space-y-4 text-left">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-xs">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-text-main mb-1.5">Mật khẩu mới</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-soft/40">
                  <Lock size={16} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F9F7F2] border border-gold/20 rounded-xl pl-10 pr-10 py-3 text-sm text-text-main focus:outline-none focus:bg-white focus:border-primary transition-colors"
                  placeholder="Tối thiểu 6 ký tự"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-soft/40 hover:text-text-main"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-text-main mb-1.5">Xác nhận mật khẩu mới</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-soft/40">
                  <Lock size={16} />
                </div>
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#F9F7F2] border border-gold/20 rounded-xl pl-10 pr-10 py-3 text-sm text-text-main focus:outline-none focus:bg-white focus:border-primary transition-colors"
                  placeholder="Nhập lại mật khẩu mới"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-soft/40 hover:text-text-main"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !password || !confirmPassword}
              className="w-full bg-primary hover:brightness-110 text-white py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all shadow-md shadow-primary/20 active:scale-95 disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận đổi mật khẩu'}
            </button>

            <div className="text-center pt-3 border-t border-gold/10">
              <Link 
                to="/" 
                className="inline-flex items-center gap-1.5 text-xs text-text-soft hover:text-primary font-bold transition-colors"
              >
                <ArrowLeft size={14} />
                Quay lại trang chủ
              </Link>
            </div>
          </form>
        )}
      </div>

      <p className="text-[10px] text-text-soft/50 font-bold uppercase tracking-widest mt-6">
        © 2026 SẮC VIỆT • KẾT NỐI BẢN SẮC
      </p>
    </div>
  );
};

export default ResetPassword;