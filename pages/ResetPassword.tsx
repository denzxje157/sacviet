import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient.ts';
import { Lock, CheckCircle2, AlertCircle } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Khi Supabase chuyển hướng về đây, nó sẽ tự mang theo token xác thực ngầm
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
      // Gọi lệnh cập nhật mật khẩu mới lên Supabase
      const { error } = await supabase.auth.updateUser({ password: password });
      
      if (error) throw error;
      
      setMessage('Đổi mật khẩu thành công! Đang chuyển về trang chủ...');
      setTimeout(() => {
        navigate('/'); // Đổi xong tự động đá về trang chủ
      }, 3000);
    } catch (err: any) {
      setError('Phiên làm việc đã hết hạn hoặc có lỗi xảy ra. Vui lòng gửi lại yêu cầu quên mật khẩu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F5EA] flex flex-col items-center justify-center p-4 font-display">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border-2 border-gold/20 p-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
             <Lock className="text-primary" size={32} />
          </div>
          <h2 className="text-3xl font-black text-text-main uppercase tracking-tighter">Đặt lại mật khẩu</h2>
          <p className="text-sm text-text-soft font-medium mt-2">Vui lòng nhập mật khẩu mới cho tài khoản của bạn.</p>
        </div>

        {message ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <CheckCircle2 className="text-green-500 mb-3" size={48} />
            <p className="text-lg font-black text-green-700">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-600 text-sm">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase text-bronze mb-1 ml-2">Mật khẩu mới</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-soft/50">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background-light border border-gold/20 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-bronze mb-1 ml-2">Xác nhận mật khẩu mới</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-soft/50">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-background-light border border-gold/20 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 shadow-xl shadow-primary/20 transition-all active:scale-95 mt-6 disabled:opacity-70"
            >
              {isLoading ? 'Đang cập nhật...' : 'Xác nhận đổi mật khẩu'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;