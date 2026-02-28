import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface SeoArticle {
  id: string;
  tieu_de: string;
  slug: string;
  mo_ta_ngan: string;
  noi_dung: string;
  anh_bia: string;
  tac_gia: string;
  created_at?: string;
}

export const seoService = {
  // Lấy danh sách bài viết
  getAllArticles: async (): Promise<SeoArticle[]> => {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase.from('bai_viet_seo').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // Lấy chi tiết 1 bài theo slug (Dùng cho trang đọc bài)
  getArticleBySlug: async (slug: string): Promise<SeoArticle | null> => {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase.from('bai_viet_seo').select('*').eq('slug', slug).single();
    if (error) throw error;
    return data;
  },

  // Thêm bài viết mới
  addArticle: async (article: Omit<SeoArticle, 'id' | 'created_at'>) => {
    if (!isSupabaseConfigured) throw new Error("Chưa kết nối Supabase");
    const { data, error } = await supabase.from('bai_viet_seo').insert([article]).select();
    if (error) throw error;
    return data;
  },

  // Cập nhật bài viết
  updateArticle: async (id: string, updates: Partial<SeoArticle>) => {
    if (!isSupabaseConfigured) throw new Error("Chưa kết nối Supabase");
    const { data, error } = await supabase.from('bai_viet_seo').update(updates).eq('id', id).select();
    if (error) throw error;
    return data;
  },

  // Xóa bài viết
  deleteArticle: async (id: string) => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.from('bai_viet_seo').delete().eq('id', id);
    if (error) throw error;
  }
};