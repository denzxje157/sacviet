import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService, User } from '../services/authService.ts';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient.ts';

interface AuthContextType {
  user: User | null;
  isAuthModalOpen: boolean;
  toggleAuthModal: () => void;
  login: (email: string, password: string) => Promise<void>;
  loginAsArtisan: (artisan: any) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Lấy nhanh dữ liệu cũ để hiển thị giao diện tức thì
        let currentUser = await authService.getCurrentUser();

        // Tự động nhận diện nghệ nhân nếu đang có phiên gian hàng lưu tại client
        if (!currentUser) {
          const activeArtisanId = localStorage.getItem('sacviet_active_artisan_id');
          if (activeArtisanId) {
            const artisansStr = localStorage.getItem('sacviet_artisans_list');
            if (artisansStr) {
              try {
                const list = JSON.parse(artisansStr);
                const found = list.find((a: any) => a.id === activeArtisanId);
                if (found) {
                  currentUser = {
                    id: `user-${found.id}`,
                    fullName: found.name,
                    email: found.email || `${found.phone || found.id}@sacviet.vn`,
                    phone: found.phone,
                    role: 'artisan',
                    artisanId: found.id,
                    village: found.village,
                    ethnic: found.ethnic,
                    bio: found.bio
                  };
                  localStorage.setItem('mock_token', JSON.stringify(currentUser));
                }
              } catch (e) {}
            }
          }
        }

        setUser(currentUser);

        // 2. Chạy ngầm lên Server Supabase để lấy quyền Admin mới nhất & Check tài khoản ảo (Chỉ áp dụng với tài khoản Supabase thật)
        if (isSupabaseConfigured && currentUser) {
          const isLocalOrArtisan = currentUser.id.startsWith('user-') || currentUser.id.startsWith('artisan-') || currentUser.id === 'admin-local';
          if (!isLocalOrArtisan) {
            supabase.auth.getUser().then(async ({ data, error }) => {
              if (error || !data?.user) {
                console.warn("Tài khoản Supabase đã bị vô hiệu hóa hoặc xóa khỏi hệ thống! Đang tiến hành đăng xuất...");
                await authService.logout();
                setUser(null);
                window.location.href = '/';
                return;
              }

              if (data?.user) {
                setUser(prev => {
                  if (!prev) return null;
                  const freshRole = data.user.user_metadata?.role || 'user';
                  if (prev.role !== freshRole) {
                    return { ...prev, role: freshRole };
                  }
                  return prev;
                });
              }
            });
          }
        }
      } catch (error) {
        console.error("Lỗi kiểm tra phiên đăng nhập:", error);
      }
    };
    checkAuth();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        // BẮT SỰ KIỆN KHÁCH BẤM LINK QUÊN MẬT KHẨU TỪ EMAIL
        if (event === 'PASSWORD_RECOVERY') {
          window.location.href = '/#/reset-password';
        } 
        else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          if (session?.user) {
            setUser({
              id: session.user.id,
              fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              role: session.user.user_metadata?.role || 'user',
              phone: session.user.user_metadata?.phone,
              avatar: session.user.user_metadata?.avatar,
              artisanId: session.user.user_metadata?.artisanId,
              village: session.user.user_metadata?.village,
              ethnic: session.user.user_metadata?.ethnic,
              bio: session.user.user_metadata?.bio
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
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);

    if (isSupabaseConfigured && loggedInUser && !loggedInUser.id.startsWith('user-') && !loggedInUser.id.startsWith('artisan-') && loggedInUser.id !== 'admin-local') {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user) {
          setUser(prev => prev ? { ...prev, role: data.user.user_metadata?.role || 'user' } : null);
        }
      });
    }
  };

  const loginAsArtisan = async (artisan: any) => {
    if (!artisan) return;
    const artisanUser: User = {
      id: `user-${artisan.id}`,
      fullName: artisan.name,
      email: artisan.email || `${artisan.phone || artisan.id}@sacviet.vn`,
      phone: artisan.phone,
      role: 'artisan',
      artisanId: artisan.id,
      village: artisan.village,
      ethnic: artisan.ethnic,
      bio: artisan.bio
    };
    localStorage.setItem('mock_token', JSON.stringify(artisanUser));
    localStorage.setItem('sacviet_active_artisan_id', artisan.id);
    setUser(artisanUser);
  };

  const register = async (fullName: string, email: string, password: string) => {
    const newUser = await authService.register(fullName, email, password);
    setUser(newUser);
  };

  const logout = async () => {
    localStorage.removeItem('sacviet_active_artisan_id');
    localStorage.removeItem('mock_token');
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const updated = await authService.updateUserProfile(user.id, updates);
    setUser(prev => prev ? { ...prev, ...updated } : updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthModalOpen, toggleAuthModal, login, loginAsArtisan, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};