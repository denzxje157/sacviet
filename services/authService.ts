import { supabase, isSupabaseConfigured } from './supabaseClient.ts';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role?: 'admin' | 'user' | 'artisan';
  avatar?: string;
  artisanId?: string;
  village?: string;
  ethnic?: string;
  bio?: string;
}

export const authService = {
  // 1. ĐĂNG NHẬP
  login: async (email: string, password: string): Promise<User> => {
    if (!isSupabaseConfigured) {
      // Fallback to localStorage
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Tài khoản Admin mặc định cho Local Mode
          if (email === 'admin@sacviet.vn' && password === 'admin123') {
             const adminUser: User = {
               id: 'admin-local',
               fullName: 'Quản Trị Viên',
               email: 'admin@sacviet.vn',
               role: 'admin'
             };
             localStorage.setItem('mock_token', JSON.stringify(adminUser));
             resolve(adminUser);
             return;
          }

          const usersStr = localStorage.getItem('mock_db_users');
          const users = usersStr ? JSON.parse(usersStr) : [];
          const user = users.find((u: any) => u.email === email && u.password === password);
          
          if (user) {
            const userInfo = { 
              id: user.id, 
              fullName: user.fullName, 
              email: user.email,
              role: user.role || 'user' // Mặc định là user
            };
            localStorage.setItem('mock_token', JSON.stringify(userInfo));
            resolve(userInfo);
          } else {
            reject(new Error('Email hoặc mật khẩu không chính xác (Local Mode)'));
          }
        }, 500);
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    if (!data.user) throw new Error('Không tìm thấy thông tin người dùng');

    return {
      id: data.user.id,
      fullName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
      email: data.user.email || '',
      role: data.user.user_metadata?.role || 'user'
    };
  },

  // 2. ĐĂNG KÝ
  register: async (fullName: string, email: string, password: string): Promise<User> => {
    if (!isSupabaseConfigured) {
      // Fallback to localStorage
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const usersStr = localStorage.getItem('mock_db_users');
          const users = usersStr ? JSON.parse(usersStr) : [];
          
          if (users.find((u: any) => u.email === email)) {
            reject(new Error('Email này đã được sử dụng (Local Mode)'));
            return;
          }
          
          const newUser = {
            id: Date.now().toString(),
            fullName,
            email,
            password,
            role: 'user' // Mặc định đăng ký là user
          };
          
          users.push(newUser);
          localStorage.setItem('mock_db_users', JSON.stringify(users));
          
          const userInfo = { id: newUser.id, fullName: newUser.fullName, email: newUser.email, role: 'user' as const };
          localStorage.setItem('mock_token', JSON.stringify(userInfo));
          
          resolve(userInfo);
        }, 500);
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'user' // Mặc định là user
        },
      },
    });

    if (error) throw error;
    
    if (!data.user) throw new Error('Đăng ký thất bại');

    return {
      id: data.user.id,
      fullName: data.user.user_metadata?.full_name || fullName,
      email: data.user.email || '',
      role: 'user'
    };
  },

  // 3. LẤY THÔNG TIN USER HIỆN TẠI
  getCurrentUser: async (): Promise<User | null> => {
    // 1. Kiểm tra session từ Supabase nếu có cấu hình
    if (isSupabaseConfigured) {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (!error && session?.user) {
          return {
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
          };
        }
      } catch (error) {
        console.warn('Failed to fetch session from Supabase:', error);
      }
    }

    // 2. Fallback: Kiểm tra mock_token trong localStorage (cho tài khoản nghệ nhân / local user)
    const token = localStorage.getItem('mock_token');
    if (token) {
      try {
        return JSON.parse(token);
      } catch (e) {}
    }

    // 3. Fallback: Nếu đang có phiên nghệ nhân 'sacviet_active_artisan_id'
    const activeArtisanId = localStorage.getItem('sacviet_active_artisan_id');
    if (activeArtisanId) {
      try {
        const artisansStr = localStorage.getItem('sacviet_artisans_list');
        if (artisansStr) {
          const list = JSON.parse(artisansStr);
          const found = list.find((a: any) => a.id === activeArtisanId);
          if (found) {
            const artisanUser: User = {
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
            localStorage.setItem('mock_token', JSON.stringify(artisanUser));
            return artisanUser;
          }
        }
      } catch (e) {}
    }

    return null;
  },

  // 4. CẬP NHẬT HỒ SƠ NGƯỜI DÙNG / NGHỆ NHÂN
  updateUserProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    if (!isSupabaseConfigured || userId.startsWith('user-') || userId.startsWith('artisan-') || userId === 'admin-local') {
      const usersStr = localStorage.getItem('mock_db_users');
      let users = usersStr ? JSON.parse(usersStr) : [];
      let foundUser = users.find((u: any) => u.id === userId);
      if (foundUser) {
        Object.assign(foundUser, updates);
        localStorage.setItem('mock_db_users', JSON.stringify(users));
      }

      const tokenStr = localStorage.getItem('mock_token');
      let currentToken = tokenStr ? JSON.parse(tokenStr) : null;
      if (currentToken) {
        currentToken = { ...currentToken, ...updates };
        localStorage.setItem('mock_token', JSON.stringify(currentToken));
        return currentToken;
      }
      return foundUser || { id: userId, fullName: '', email: '', ...updates };
    }

    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });
    if (error) throw error;
    return {
      id: data.user.id,
      fullName: data.user.user_metadata?.full_name || updates.fullName || 'User',
      email: data.user.email || '',
      role: data.user.user_metadata?.role || updates.role || 'user',
      phone: data.user.user_metadata?.phone || updates.phone,
      avatar: data.user.user_metadata?.avatar || updates.avatar,
      artisanId: data.user.user_metadata?.artisanId || updates.artisanId,
      village: data.user.user_metadata?.village || updates.village,
      ethnic: data.user.user_metadata?.ethnic || updates.ethnic,
      bio: data.user.user_metadata?.bio || updates.bio
    };
  },

  // 5. ĐĂNG XUẤT
  logout: async (): Promise<void> => {
    localStorage.removeItem('mock_token');
    localStorage.removeItem('sacviet_active_artisan_id');
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {}
    }
  }
};
