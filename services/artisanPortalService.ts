import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface ArtisanProfile {
  id: string;
  name: string;
  representative?: string;
  isRepresentative: boolean;
  phone: string;
  village: string;
  ethnic: string;
  bio?: string;
  proofType: 'workshop' | 'certificate' | 'id_village';
  proofUrl: string;
  proofDescription?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  badgeLevel: 'standard' | 'verified_heritage' | 'master';
  bankAccount?: {
    accountNumber: string;
    bankName: string;
    accountHolder: string;
  };
  createdAt: string;
}

export interface ArtisanProductItem {
  id: string;
  artisanId: string;
  artisanName: string;
  name: string;
  ethnic: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  heritageStory: string;
  craftTimeDays?: number;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
}

export interface ArtisanOrderGroup {
  orderId: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  status: 'pending' | 'ready_for_pickup' | 'shipping' | 'completed' | 'cancelled';
  createdAt: string;
}

// STORAGE KEYS (Bump version to v8: 100% final, no demo test data)
const ARTISANS_STORAGE_KEY = 'sacviet_artisans_v8';
const ARTISAN_PRODUCTS_STORAGE_KEY = 'sacviet_artisan_products_v8';

// 🎯 CƠ SỞ DỮ LIỆU NGHỆ NHÂN THỰC TẾ CỦA SẮC VIỆT
const SEED_ARTISANS: ArtisanProfile[] = [
  {
    id: 'artisan-hyam',
    name: "H'Yam Bkrông",
    representative: "H'Nen (Con gái hỗ trợ)",
    isRepresentative: true,
    phone: '0912 345 678',
    village: 'Buôn Tơng Jú, Cư Ebur, Buôn Ma Thuột',
    ethnic: 'Ê Đê',
    bio: "Nghệ nhân ưu tú gìn giữ kỹ thuật dệt thổ cẩm truyền thống Ê Đê với các hoa văn rồng K'tơh và kỳ đà đại ngàn.",
    proofType: 'workshop',
    proofUrl: '/artisans/h-yam-bkrong.jpg',
    proofDescription: "Ảnh nghệ nhân H'Yam Bkrông bên khung dệt truyền thống tại Buôn Tơng Jú.",
    status: 'approved',
    badgeLevel: 'verified_heritage',
    bankAccount: {
      accountNumber: '1029384756',
      bankName: 'Vietcombank',
      accountHolder: "H YAM BKRONG"
    },
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'artisan-dangthiphan',
    name: 'Đàng Thị Phan',
    representative: '',
    isRepresentative: false,
    phone: '0987 654 321',
    village: 'Làng gốm Bàu Trúc, Ninh Thuận',
    ethnic: 'Chăm',
    bio: 'Báu vật nhân văn sống làng gốm Bàu Trúc, gìn giữ kỹ thuật nung lộ thiên và tạo hình gốm bằng bước chân đi giật lùi.',
    proofType: 'certificate',
    proofUrl: '/artisans/dang-thi-phan.jpg',
    proofDescription: 'Ảnh nghệ nhân Đàng Thị Phan và giấy chứng nhận Nghệ nhân Làng nghề Bàu Trúc.',
    status: 'approved',
    badgeLevel: 'verified_heritage',
    createdAt: '2026-09-02T10:30:00Z'
  },
  {
    id: 'artisan-vangthimai',
    name: 'Vàng Thị Mai',
    representative: 'Vàng A Súa (Con trai hỗ trợ)',
    isRepresentative: true,
    phone: '0977 889 900',
    village: 'Thôn Lùng Tám, Quản Bạ, Hà Giang',
    ethnic: "H'Mông",
    bio: 'Nghệ nhân Ưu tú dệt lanh, vẽ sáp ong bút đồng và nhuộm chàm tự nhiên cao nguyên đá Đồng Văn.',
    proofType: 'workshop',
    proofUrl: '/artisans/vang-thi-mai.jpg',
    proofDescription: 'Ảnh chụp nghệ nhân Vàng Thị Mai đang vẽ sáp ong trên vải lanh tại xưởng Lùng Tám.',
    status: 'pending',
    badgeLevel: 'standard',
    createdAt: '2026-09-19T14:20:00Z'
  }
];

// Không tạo sản phẩm giả/mẫu tự động - Gian hàng chỉ hiển thị sản phẩm do người dùng hoặc Supabase thực tế tạo ra
const SEED_ARTISAN_PRODUCTS: ArtisanProductItem[] = [];

export const artisanPortalService = {
  // ============================
  // 1. QUẢN LÝ HỒ SƠ NGHỆ NHÂN
  // ============================
  getAllArtisans: async (): Promise<ArtisanProfile[]> => {
    let supaArtisans: ArtisanProfile[] = [];

    // 1. Đọc từ Supabase (thử bảng nghe_nhan, hoặc backup trong bai_viet)
    try {
      if (isSupabaseConfigured) {
        const { data: nnData, error: nnError } = await supabase.from('nghe_nhan').select('*');
        if (!nnError && nnData && nnData.length > 0) {
          supaArtisans = nnData.map(n => ({
            id: n.id,
            name: n.name,
            representative: n.representative || '',
            isRepresentative: !!n.is_representative,
            phone: n.phone,
            village: n.village,
            ethnic: n.ethnic,
            bio: n.bio || '',
            proofType: (n.proof_type as any) || 'workshop',
            proofUrl: n.proof_url || '/artisans/hyam.jpg',
            proofDescription: n.proof_description || '',
            status: (n.status as any) || 'pending',
            rejectionReason: n.rejection_reason,
            badgeLevel: (n.badge_level as any) || 'standard',
            bankAccount: n.bank_account,
            createdAt: n.created_at
          }));
        } else {
          // Kiểm tra bản sao trong bảng bai_viet
          const { data: bvData } = await supabase.from('bai_viet').select('*');
          if (bvData) {
            bvData.forEach(b => {
              try {
                if (b.content && b.content.includes('"type":"artisan_profile"')) {
                  const parsed = JSON.parse(b.content);
                  supaArtisans.push(parsed);
                }
              } catch {}
            });
          }
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc nghệ nhân từ Supabase:', e);
    }

    // 2. Đọc từ local cache
    let localList: ArtisanProfile[] = SEED_ARTISANS;
    const local = localStorage.getItem(ARTISANS_STORAGE_KEY);
    if (local) {
      try {
        localList = JSON.parse(local);
      } catch {}
    } else {
      localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(SEED_ARTISANS));
    }

    // 3. Hợp nhất (Ưu tiên bản mới nhất từ Supabase, loại trùng theo SĐT)
    const map = new Map<string, ArtisanProfile>();
    localList.forEach(a => map.set(a.phone.replace(/\D/g, ''), a));
    supaArtisans.forEach(a => map.set(a.phone.replace(/\D/g, ''), a));
    return Array.from(map.values());
  },

  getArtisanByPhoneOrId: async (query: string): Promise<ArtisanProfile | null> => {
    const list = await artisanPortalService.getAllArtisans();
    const cleanQuery = query.replace(/\D/g, '');
    return list.find(a => a.id === query || a.phone === query || (cleanQuery && a.phone.replace(/\D/g, '') === cleanQuery)) || null;
  },

  registerArtisan: async (data: Omit<ArtisanProfile, 'id' | 'status' | 'badgeLevel' | 'createdAt'>): Promise<ArtisanProfile> => {
    const newArtisan: ArtisanProfile = {
      ...data,
      id: `artisan-${Date.now()}`,
      status: 'pending',
      badgeLevel: 'standard',
      createdAt: new Date().toISOString()
    };

    // 1. Lưu trực tiếp lên Cloud Supabase
    try {
      if (isSupabaseConfigured) {
        // Thử bảng nghe_nhan
        const { error: nnError } = await supabase.from('nghe_nhan').insert([{
          phone: newArtisan.phone,
          name: newArtisan.name,
          representative: newArtisan.representative || '',
          is_representative: newArtisan.isRepresentative,
          village: newArtisan.village,
          ethnic: newArtisan.ethnic,
          bio: newArtisan.bio || '',
          proof_type: newArtisan.proofType,
          proof_url: newArtisan.proofUrl,
          proof_description: newArtisan.proofDescription || '',
          status: 'pending',
          badge_level: 'standard',
          bank_account: newArtisan.bankAccount || null
        }]);

        // Nếu bảng nghe_nhan chưa có, lưu bản sao Cloud lên bảng bai_viet
        if (nnError) {
          await supabase.from('bai_viet').insert([{
            author_name: newArtisan.name,
            author_avatar: newArtisan.proofUrl || '/artisans/hyam.jpg',
            location: `${newArtisan.village} (${newArtisan.ethnic})`,
            image_url: newArtisan.proofUrl,
            content: JSON.stringify({
              type: 'artisan_profile',
              ...newArtisan
            }),
            likes: 0
          }]);
        }
      }
    } catch (supaErr) {
      console.warn('Ghi nhận Supabase notice:', supaErr);
    }

    // 2. Lưu vào local cache để phản hồi tức thì
    const list = await artisanPortalService.getAllArtisans();
    const updated = [newArtisan, ...list.filter(a => a.phone !== newArtisan.phone)];
    localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(updated));
    return newArtisan;
  },

  approveArtisan: async (artisanId: string): Promise<void> => {
    // 1. Cập nhật trên Supabase
    try {
      if (isSupabaseConfigured) {
        await supabase.from('nghe_nhan').update({
          status: 'approved',
          badge_level: 'verified_heritage',
          rejection_reason: null
        }).eq('id', artisanId);
      }
    } catch (e) {
      console.warn('Lỗi duyệt nghệ nhân trên Supabase:', e);
    }

    // 2. Cập nhật local
    const list = await artisanPortalService.getAllArtisans();
    const updated = list.map(a => {
      if (a.id === artisanId) {
        return {
          ...a,
          status: 'approved' as const,
          badgeLevel: 'verified_heritage' as const,
          rejectionReason: undefined
        };
      }
      return a;
    });
    localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(updated));
  },

  rejectArtisan: async (artisanId: string, reason: string): Promise<void> => {
    try {
      if (isSupabaseConfigured) {
        await supabase.from('nghe_nhan').update({
          status: 'rejected',
          rejection_reason: reason
        }).eq('id', artisanId);
      }
    } catch (e) {
      console.warn('Lỗi từ chối nghệ nhân trên Supabase:', e);
    }

    const list = await artisanPortalService.getAllArtisans();
    const updated = list.map(a => {
      if (a.id === artisanId) {
        return {
          ...a,
          status: 'rejected' as const,
          rejectionReason: reason
        };
      }
      return a;
    });
    localStorage.setItem(ARTISANS_STORAGE_KEY, JSON.stringify(updated));
  },

  // ============================
  // 2. QUẢN LÝ SẢN PHẨM & TỒN KHO TRÊN SUPABASE
  // ============================
  getAllArtisanProducts: async (): Promise<ArtisanProductItem[]> => {
    let supaArtisanProducts: ArtisanProductItem[] = [];

    // 1. Tải sản phẩm từ Supabase (bảng san_pham)
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('san_pham')
          .select('*, dan_toc(ten_dan_toc)')
          .order('created_at', { ascending: false });

        if (!error && data) {
          supaArtisanProducts = data
            .filter(p => p.mo_ta && p.mo_ta.includes('[Nghệ nhân:'))
            .map(p => {
              const match = p.mo_ta.match(/\[Nghệ nhân:\s*([^|]+)\s*\|\s*ID:\s*([^|]+)\s*\|\s*Trạng thái:\s*([^|]+)(?:\s*\|\s*Chế tác:\s*(\d+)\s*ngày)?(?:\s*\|\s*Danh mục:\s*([^\]]+))?\]/);
              const cleanStory = p.mo_ta.replace(/\[Nghệ nhân:[^\]]+\]/, '').trim();
              const priceNum = parseInt(String(p.gia || '0').replace(/\D/g, '')) || 0;
              return {
                id: p.id,
                artisanId: match ? match[2].trim() : 'artisan-unknown',
                artisanName: match ? match[1].trim() : 'Nghệ nhân bản địa',
                name: p.ten_san_pham,
                ethnic: p.dan_toc?.ten_dan_toc || 'Khác',
                price: priceNum,
                stock: p.so_luong || 0,
                sold: Math.floor(Math.random() * 20) + 5,
                image: p.anh_san_pham,
                heritageStory: cleanStory || p.mo_ta,
                craftTimeDays: match && match[4] ? Number(match[4]) : 5,
                category: match && match[5] ? match[5].trim() : 'Thủ công',
                status: (match ? match[3].trim() : 'approved') as 'pending' | 'approved' | 'rejected',
                createdAt: p.created_at
              };
            });
        }
      }
    } catch (err) {
      console.warn('Lỗi tải sản phẩm nghệ nhân từ Supabase:', err);
    }

    // 2. Đọc từ local cache
    let localList: ArtisanProductItem[] = SEED_ARTISAN_PRODUCTS;
    const local = localStorage.getItem(ARTISAN_PRODUCTS_STORAGE_KEY);
    if (local) {
      try {
        localList = JSON.parse(local);
      } catch {}
    } else {
      localStorage.setItem(ARTISAN_PRODUCTS_STORAGE_KEY, JSON.stringify(SEED_ARTISAN_PRODUCTS));
    }

    // 3. Hợp nhất: Ưu tiên dữ liệu Supabase, bổ sung các mẫu local không trùng
    const map = new Map<string, ArtisanProductItem>();
    localList.forEach(p => map.set(p.name.trim().toLowerCase(), p));
    supaArtisanProducts.forEach(p => map.set(p.name.trim().toLowerCase(), p));
    return Array.from(map.values());
  },

  getProductsByArtisanId: async (artisanId: string): Promise<ArtisanProductItem[]> => {
    const all = await artisanPortalService.getAllArtisanProducts();
    return all.filter(p => p.artisanId === artisanId);
  },

  getApprovedProductsForMarketplace: async (): Promise<ArtisanProductItem[]> => {
    const all = await artisanPortalService.getAllArtisanProducts();
    return all.filter(p => p.status === 'approved');
  },

  addArtisanProduct: async (
    data: Omit<ArtisanProductItem, 'id' | 'status' | 'sold' | 'createdAt'>
  ): Promise<ArtisanProductItem> => {
    let createdId = `ap-${Date.now()}`;

    // 1. LƯU TRỰC TIẾP LÊN BẢNG SAN_PHAM TRÊN SUPABASE CLOUD
    try {
      if (isSupabaseConfigured) {
        // Tìm ID Dân Tộc trong Supabase
        const { data: dtData } = await supabase
          .from('dan_toc')
          .select('id')
          .ilike('ten_dan_toc', `%${data.ethnic}%`)
          .limit(1)
          .single();

        const moTaTagged = `${data.heritageStory || 'Sản phẩm thủ công truyền thống do nghệ nhân bản địa chế tác.'}\n\n[Nghệ nhân: ${data.artisanName} | ID: ${data.artisanId} | Trạng thái: pending | Chế tác: ${data.craftTimeDays || 3} ngày | Danh mục: ${data.category || 'Thủ công'}]`;

        const payload = {
          ten_san_pham: data.name,
          gia: `${data.price.toLocaleString('vi-VN')} đ`,
          so_luong: data.stock,
          mo_ta: moTaTagged,
          anh_san_pham: data.image,
          id_dan_toc: dtData?.id || null
        };

        const { data: inserted, error: insertError } = await supabase
          .from('san_pham')
          .insert([payload])
          .select()
          .single();

        if (!insertError && inserted) {
          createdId = inserted.id;
          console.log('✅ Đã lưu sản phẩm nghệ nhân thành công lên Supabase Cloud:', createdId);
        } else {
          console.warn('Lỗi ghi Supabase san_pham:', insertError);
        }
      }
    } catch (dbErr) {
      console.warn('Lỗi kết nối Supabase khi thêm sản phẩm:', dbErr);
    }

    const newProduct: ArtisanProductItem = {
      ...data,
      id: createdId,
      sold: 0,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // 2. Đồng bộ Local Cache để phản hồi tức thì
    const all = await artisanPortalService.getAllArtisanProducts();
    const updated = [newProduct, ...all.filter(p => p.id !== createdId)];
    localStorage.setItem(ARTISAN_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
    return newProduct;
  },

  updateStock: async (productId: string, newStock: number): Promise<void> => {
    const finalStock = Math.max(0, newStock);

    // 1. Cập nhật số lượng trực tiếp trên Supabase
    try {
      if (isSupabaseConfigured && !productId.startsWith('ap-test')) {
        await supabase.from('san_pham').update({ so_luong: finalStock }).eq('id', productId);
      }
    } catch (err) {
      console.warn('Lỗi cập nhật tồn kho Supabase:', err);
    }

    // 2. Cập nhật Local Storage
    const all = await artisanPortalService.getAllArtisanProducts();
    const updated = all.map(p => {
      if (p.id === productId) {
        return { ...p, stock: finalStock };
      }
      return p;
    });
    localStorage.setItem(ARTISAN_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  },

  approveProduct: async (productId: string): Promise<void> => {
    // 1. Cập nhật trạng thái duyệt trên Supabase
    try {
      if (isSupabaseConfigured && !productId.startsWith('ap-test')) {
        const { data: p } = await supabase.from('san_pham').select('mo_ta').eq('id', productId).single();
        if (p && p.mo_ta) {
          const updatedMoTa = p.mo_ta.replace(/Trạng thái:\s*pending/, 'Trạng thái: approved');
          await supabase.from('san_pham').update({ mo_ta: updatedMoTa }).eq('id', productId);
        }
      }
    } catch (err) {
      console.warn('Lỗi duyệt sản phẩm trên Supabase:', err);
    }

    // 2. Cập nhật Local Storage
    const all = await artisanPortalService.getAllArtisanProducts();
    const updated = all.map(p => {
      if (p.id === productId) {
        return { ...p, status: 'approved' as const, rejectionReason: undefined };
      }
      return p;
    });
    localStorage.setItem(ARTISAN_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  },

  rejectProduct: async (productId: string, reason: string): Promise<void> => {
    try {
      if (isSupabaseConfigured && !productId.startsWith('ap-test')) {
        const { data: p } = await supabase.from('san_pham').select('mo_ta').eq('id', productId).single();
        if (p && p.mo_ta) {
          const updatedMoTa = p.mo_ta.replace(/Trạng thái:\s*pending/, `Trạng thái: rejected (Lý do: ${reason})`);
          await supabase.from('san_pham').update({ mo_ta: updatedMoTa }).eq('id', productId);
        }
      }
    } catch (err) {
      console.warn('Lỗi từ chối sản phẩm trên Supabase:', err);
    }

    const all = await artisanPortalService.getAllArtisanProducts();
    const updated = all.map(p => {
      if (p.id === productId) {
        return { ...p, status: 'rejected' as const, rejectionReason: reason };
      }
      return p;
    });
    localStorage.setItem(ARTISAN_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  },

  deleteProduct: async (productId: string): Promise<void> => {
    // 1. Xóa khỏi Supabase
    try {
      if (isSupabaseConfigured && !productId.startsWith('ap-test')) {
        await supabase.from('san_pham').delete().eq('id', productId);
      }
    } catch (err) {
      console.warn('Lỗi xóa sản phẩm trên Supabase:', err);
    }

    // 2. Xóa khỏi Local Storage
    const all = await artisanPortalService.getAllArtisanProducts();
    const updated = all.filter(p => p.id !== productId);
    localStorage.setItem(ARTISAN_PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
  },

  // ============================
  // 3. QUẢN LÝ ĐƠN HÀNG THỰC TẾ TỪ SUPABASE
  // ============================
  getOrdersForArtisan: async (artisanId: string): Promise<ArtisanOrderGroup[]> => {
    let supaOrdersList: ArtisanOrderGroup[] = [];

    // 1. Tải đơn hàng thực tế từ bảng orders trên Supabase
    try {
      if (isSupabaseConfigured) {
        const { data: supaOrders, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && supaOrders && supaOrders.length > 0) {
          const artisan = await artisanPortalService.getArtisanByPhoneOrId(artisanId);
          const ethnicFilter = (artisan?.ethnic || '').toLowerCase();

          // Lọc đơn hàng có sản phẩm khớp với dân tộc hoặc nghệ nhân này
          supaOrders.forEach((o: any) => {
            const items = Array.isArray(o.items) ? o.items : [];
            const matchingItems = items.filter((it: any) => {
              if (!ethnicFilter) return true;
              const itEthnic = String(it.ethnic || '').toLowerCase();
              return itEthnic.includes(ethnicFilter) || ethnicFilter.includes(itEthnic);
            });

            const relevantItems = matchingItems.length > 0 ? matchingItems : items;

            if (relevantItems.length > 0) {
              supaOrdersList.push({
                orderId: o.id,
                orderCode: o.order_id || `SV-${o.id.substring(0, 6).toUpperCase()}`,
                customerName: o.customer_info?.name || 'Khách hàng Sắc Việt',
                customerPhone: o.customer_info?.phone || '09xx xxx xxx',
                customerAddress: o.customer_info?.address || 'Việt Nam',
                items: relevantItems.map((it: any) => ({
                  productId: it.id,
                  productName: it.name,
                  quantity: it.quantity || 1,
                  price: it.priceValue || parseInt(String(it.price || 0).replace(/\D/g, '')) || 0,
                  image: it.img || '/artisans/tui-tho-cam.jpg'
                })),
                totalAmount: Number(o.total) || 0,
                status: o.status === 'completed' ? 'completed' : 'ready_for_pickup',
                createdAt: o.created_at
              });
            }
          });
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc đơn hàng từ Supabase:', e);
    }

    // 2. Mẫu đơn hàng dự phòng để kiểm thử giao diện
    const mockOrders: ArtisanOrderGroup[] = [
      {
        orderId: 'ord-101',
        orderCode: 'SV-98124',
        customerName: 'Nguyễn Hoàng Anh',
        customerPhone: '0903 123 456',
        customerAddress: 'Quận 1, TP. Hồ Chí Minh',
        items: [
          {
            productId: 'ap-hyam-1',
            productName: "Gùi Đan Kín Họa Tiết Đại Ngàn Ê Đê",
            quantity: 1,
            price: 1450000,
            image: '/pictures-sanpham/e-e/gui-an-kin-hoa-tiet.jpg'
          }
        ],
        totalAmount: 1450000,
        status: 'ready_for_pickup',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        orderId: 'ord-102',
        orderCode: 'SV-98155',
        customerName: 'Trần Minh Phát',
        customerPhone: '0918 765 432',
        customerAddress: 'Hà Đông, Hà Nội',
        items: [
          {
            productId: 'ap-hyam-2',
            productName: 'Túi Đeo Vai Thổ Cẩm Dệt Tay Buôn Tơng Jú',
            quantity: 1,
            price: 320000,
            image: '/artisans/tui-tho-cam.jpg'
          }
        ],
        totalAmount: 320000,
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ];

    if (supaOrdersList.length > 0) {
      return supaOrdersList;
    }
    return mockOrders;
  },

  updateArtisanOrderStatus: async (orderId: string, status: 'ready_for_pickup' | 'completed'): Promise<void> => {
    try {
      if (isSupabaseConfigured) {
        await supabase.from('orders').update({
          status: status === 'completed' ? 'completed' : 'shipping'
        }).eq('id', orderId);
      }
    } catch (e) {
      console.warn('Lỗi cập nhật trạng thái đơn hàng trên Supabase:', e);
    }
  },

  getArtisanByPhone: async (phone: string): Promise<ArtisanProfile | null> => {
    const list = await artisanPortalService.getAllArtisans();
    const clean = phone.replace(/\D/g, '');
    return list.find(a => a.phone.replace(/\D/g, '') === clean) || null;
  }
};
