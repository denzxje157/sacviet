import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface Product {
  id: string;
  name: string;
  ethnic: string;
  price: number; 
  price_display: string; 
  description: string;
  image: string;
  category: string;
  created_at?: string;
}

// 💡 HÀM TRỢ GIÚP: Tự động tìm ID của dân tộc dựa vào tên (VD: "Thái" -> lấy ID của dân tộc Thái)
const getDanTocId = async (tenDanToc: string) => {
  if (!tenDanToc || tenDanToc === 'Khác' || tenDanToc === 'TẤT CẢ') return null;
  const { data } = await supabase
    .from('dan_toc')
    .select('id')
    .ilike('ten_dan_toc', `%${tenDanToc}%`)
    .limit(1)
    .single();
  return data?.id || null;
};

export const productService = {
  // 1. LẤY TOÀN BỘ SẢN PHẨM (Từ bảng san_pham)
  getAllProducts: async (): Promise<Product[]> => {
    if (!isSupabaseConfigured) return [];
    
    const { data, error } = await supabase
      .from('san_pham')
      .select('*, dan_toc(ten_dan_toc)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Ép kiểu dữ liệu từ DB (Tiếng Việt) sang chuẩn UI (Tiếng Anh)
    return (data || []).map(p => ({
      id: p.id,
      name: p.ten_san_pham || 'Sản phẩm chưa có tên',
      ethnic: p.dan_toc?.ten_dan_toc || 'Khác',
      price: parseInt(p.gia?.replace(/\D/g, '') || '0'),
      price_display: p.gia || 'Liên hệ',
      description: p.mo_ta || '',
      image: p.anh_san_pham || '',
      category: 'Thủ công',
      created_at: p.created_at
    }));
  },

  // 2. THÊM SẢN PHẨM MỚI
  addProduct: async (product: Omit<Product, 'id' | 'created_at'>) => {
    if (!isSupabaseConfigured) throw new Error("Chưa kết nối Supabase");

    const dtId = await getDanTocId(product.ethnic);

    // FIX LỖI Ở ĐÂY: Đổi dan_toc_id thành id_dan_toc cho khớp với Supabase
    const payload = {
      ten_san_pham: product.name,
      gia: product.price_display || `${product.price.toLocaleString('vi-VN')} đ`,
      mo_ta: product.description,
      anh_san_pham: product.image,
      id_dan_toc: dtId 
    };

    const { data, error } = await supabase.from('san_pham').insert([payload]).select();
    if (error) throw error;
    return data;
  },

  // 3. CẬP NHẬT SẢN PHẨM
  updateProduct: async (id: string, updates: Partial<Product>) => {
    if (!isSupabaseConfigured) throw new Error("Chưa kết nối Supabase");

    let dtId = undefined;
    if (updates.ethnic) {
       dtId = await getDanTocId(updates.ethnic);
    }

    const payload: any = {};
    if (updates.name !== undefined) payload.ten_san_pham = updates.name;
    if (updates.price_display !== undefined) payload.gia = updates.price_display;
    if (updates.description !== undefined) payload.mo_ta = updates.description;
    if (updates.image !== undefined) payload.anh_san_pham = updates.image;
    // FIX LỖI Ở ĐÂY: Đổi dan_toc_id thành id_dan_toc
    if (dtId !== undefined) payload.id_dan_toc = dtId;

    const { data, error } = await supabase.from('san_pham').update(payload).eq('id', id).select();
    if (error) throw error;
    return data;
  },

  // 4. XÓA SẢN PHẨM
  deleteProduct: async (id: string) => {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.from('san_pham').delete().eq('id', id);
    if (error) throw error;
  },

  // 5. NẠP DỮ LIỆU MẪU (Bấm 1 nút Nạp cả ngàn sản phẩm)
  seedProducts: async (products: any[]) => {
    if (!isSupabaseConfigured) throw new Error("Chưa kết nối Supabase");
    
    const payloads = await Promise.all(products.map(async (p) => {
       const dtId = await getDanTocId(p.ethnic);
       return {
         ten_san_pham: p.name,
         gia: p.price_display || `${p.price} đ`,
         mo_ta: p.description,
         anh_san_pham: p.image,
         // FIX LỖI Ở ĐÂY: Đổi dan_toc_id thành id_dan_toc
         id_dan_toc: dtId
       };
    }));

    const { error } = await supabase.from('san_pham').insert(payloads);
    if (error) throw error;
  },

  // Không dùng nữa nhưng giữ lại cho chuẩn Interface
  getProductsByEthnic: async () => { return []; }
};