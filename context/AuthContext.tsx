import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService, User } from '../services/authService.ts';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient.ts';

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  toggleAuthModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Lấy thông tin user hiện tại
        let currentUser = await authService.getCurrentUser();
        
        // NÂNG CẤP: Ép lấy dữ liệu tươi nhất từ Server để cập nhật quyền Admin tức thời (tránh kẹt token cũ)
        if (isSupabaseConfigured && currentUser) {
           const { data: { user: freshUser }, error } = await supabase.auth.getUser();
           
           if (freshUser && !error) {
               currentUser = {
                   id: freshUser.id,
                   fullName: freshUser.user_metadata?.full_name || freshUser.email?.split('@')[0] || 'User',
                   email: freshUser.email || '',
                   role: freshUser.user_metadata?.role || 'user' // Bắt lấy quyền mới nhất
               };
           }
        }
        
        setUser(currentUser);
      } catch (error) {
        console.error("Lỗi xác thực phiên:", error);
      }
    };
    
    checkAuth();

    if (isSupabaseConfigured) {
      // Thêm lắng nghe sự kiện USER_UPDATED
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
           // Luôn lấy data tươi từ máy chủ khi có thay đổi trạng thái
           const { data: { user: freshUser } } = await supabase.auth.getUser();
           
           if (freshUser) {
               setUser({
                   id: freshUser.id,
                   fullName: freshUser.user_metadata?.full_name || freshUser.email?.split('@')[0] || 'User',
                   email: freshUser.email || '',
                   role: freshUser.user_metadata?.role || 'user'
               });
           }
        } else if (event === 'SIGNED_OUT') {
           setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const toggleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

  const login = async (email: string, password: string) => {
    await authService.login(email, password);
    
    // NÂNG CẤP: Cập nhật state User ngay lập tức với dữ liệu mới nhất từ server
    if (isSupabaseConfigured) {
       const { data: { user: freshUser } } = await supabase.auth.getUser();
       if (freshUser) {
           setUser({
               id: freshUser.id,
               fullName: freshUser.user_metadata?.full_name || freshUser.email?.split('@')[0] || 'User',
               email: freshUser.email || '',
               role: freshUser.user_metadata?.role || 'user'
           });
           return;
       }
    }
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);
  };

  const register = async (fullName: string, email: string, password: string) => {
    const newUser = await authService.register(fullName, email, password);
    setUser(newUser);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthModalOpen, toggleAuthModal, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};