/// <reference types="vite/client" />
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { supabase } from '../services/supabaseClient.ts'; 
import { marketplaceData } from '../data/mockData.ts';
import { getArtisanByEthnic } from '../data/artisanData.ts';
import { artisanPortalService } from '../services/artisanPortalService.ts';

interface Product {
  id: string;
  name: string;
  ethnic: string;
  stock: number;
  price: string;
  priceValue: number;
  desc: string;
  artisan: string;
  artisanId?: string;
  artisanAvatar?: string;
  artisanVillage?: string;
  exp: string;
  img: string;
  sold: number;
  category: string;
  likes: number; // Thêm số lượt thích thay cho rating
  status?: string;
}

export { marketplaceData };
export const rawData = marketplaceData;

const ProductCard = React.memo(({ product, onOpenDetail }: { product: Product, onOpenDetail: (p: Product) => void }) => {
  const isOutOfStock = product?.stock <= 0; 

  return (
    <div 
      className="group rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gold/10 bg-white flex flex-col h-full cursor-pointer relative" 
      onClick={() => onOpenDetail(product)}
    >
      <div className="relative aspect-square w-full overflow-hidden shrink-0 bg-[#F9F7F2]">
        <img 
          src={product?.img || 'https://placehold.co/600x600?text=No+Image'} 
          alt={product?.name || 'Sản phẩm'} 
          loading="lazy" 
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-center justify-center">
            <span className="bg-text-main text-white px-3 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest border border-white/50 shadow-lg rotate-[-10deg]">Đã hết hàng</span>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-primary/90 text-white text-[9px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm border border-gold/30 shadow-md">
          {product?.ethnic || 'Khác'}
        </div>
      </div>

      <div className="p-3 text-left flex-grow flex flex-col">
        <h3 className="text-sm font-black text-text-main tracking-tight mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
          {product?.name || 'Sản phẩm đang cập nhật'}
        </h3>
        
        {/* GIAO DIỆN MỚI: TRÁI TIM & HUY HIỆU THỦ CÔNG */}
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-bold text-text-soft flex items-center gap-1">
             <span className="material-symbols-outlined text-xs text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
             {product.likes}
           </span>
           <span className="text-gray-300 text-[10px]">|</span>
           <span className="text-[10px] font-bold text-green-700 flex items-center gap-0.5">
             <span className="material-symbols-outlined text-[12px]">eco</span> Thủ công
           </span>
        </div>
        
        <div className="mt-auto pt-2 border-t border-gold/5 flex flex-col gap-2">
          <span className="text-primary font-black text-base line-clamp-1">{product?.price || 'Liên hệ'}</span>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={(e) => { e.stopPropagation(); onOpenDetail(product); }} className="border border-gold/30 rounded-lg py-2 text-[9px] font-black uppercase text-text-soft hover:bg-gold/10 transition-colors z-10">Tìm hiểu</button>
            <button disabled={isOutOfStock} onClick={(e) => { e.stopPropagation(); onOpenDetail(product); }} className={`rounded-lg py-2 text-[9px] font-black uppercase text-white transition-all z-10 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:brightness-110 shadow-lg shadow-primary/20 active:scale-95'}`}>{isOutOfStock ? 'Tạm hết' : 'Đặt mua'}</button>
          </div>
        </div>
      </div>
    </div>
  );
});

const ProductModal = ({ product, onClose, showToastMsg }: { product: Product, onClose: () => void, showToastMsg: (msg: string) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const cartContext = useCart();
  const addToCart = cartContext?.addToCart;
  const toggleCart = cartContext?.toggleCart;
  const navigate = useNavigate();
  const isOutOfStock = product.stock <= 0;
  
  const linkedArtisan = useMemo(() => {
    // 1. Nếu sản phẩm gắn với nghệ nhân cụ thể đã đăng ký
    if (product.artisan && product.artisan !== 'Nghệ nhân bản địa') {
      return {
        id: product.artisanId || 'artisan',
        name: product.artisan,
        avatar: product.artisanAvatar || 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png',
        village: product.artisanVillage || `Làng nghề truyền thống đồng bào ${product.ethnic}`,
        ethnic: product.ethnic
      };
    }
    // 2. Tìm theo dân tộc trong dữ liệu nghệ nhân mẫu
    const byEthnic = getArtisanByEthnic(product.ethnic);
    if (byEthnic) return byEthnic;
    // 3. Fallback theo dân tộc của sản phẩm thay vì gán cứng Vàng Thị Mai
    return {
      id: 'native-artisan',
      name: `Nghệ nhân đồng bào ${product.ethnic || 'Việt Nam'}`,
      avatar: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png',
      village: `Làng nghề truyền thống đồng bào ${product.ethnic || 'bản địa'}`,
      ethnic: product.ethnic || 'Khác'
    };
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleAddToCart = () => {
    if (addToCart && product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, i === 0 ? 'cart' : null);
      }
      showToastMsg(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng`);
    }
    onClose();
  };

  const handleBuyNow = () => {
    if (addToCart && product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product, i === 0 ? 'checkout' : null);
      }
    }
    onClose();
  };

  if (!product) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 font-display">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="bg-white w-full max-w-5xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-3xl md:rounded-[2rem] shadow-2xl relative z-10 animate-slide-up flex flex-col md:flex-row overflow-hidden border-2 sm:border-4 border-gold/30">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 z-50 size-9 sm:size-10 flex items-center justify-center bg-white/80 hover:bg-white text-text-soft hover:text-red-800 rounded-full shadow-lg backdrop-blur-sm transition-all active:scale-95 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl group-hover:rotate-90 transition-transform">close</span>
        </button>
        
        {/* Ảnh: Chiều cao gọn hơn trên mobile để nhường diện tích cuộn cho nội dung */}
        <div className="w-full md:w-[50%] lg:w-[55%] h-48 sm:h-64 md:h-auto relative bg-[#F2EFE6] border-b md:border-b-0 md:border-r border-gold/10 shrink-0">
          <img src={product.img || 'https://placehold.co/600x600?text=No+Image'} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 text-white">
            <span className="bg-primary/95 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-white/30 shadow-sm inline-block">
              Dân tộc {product.ethnic || 'Khác'}
            </span>
          </div>
        </div>

        {/* Nội dung chi tiết */}
        <div className="w-full md:w-[50%] lg:w-[45%] flex-1 min-h-0 flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
             
             <div>
               <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-text-main leading-tight mb-2 mt-1">{product.name || 'Sản phẩm đang cập nhật'}</h2>
               
               {/* HUY HIỆU NIỀM TIN (Trust Badges) */}
               <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">eco</span> 100% Thủ công</span>
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">verified</span> Tinh hoa bản địa</span>
               </div>
             </div>

             {/* UI GIÁ & SỐ LƯỢNG CÒN */}
             <div className="flex flex-wrap items-center gap-3 sm:gap-4 py-2.5 sm:py-3 border-y border-gold/10">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-primary leading-none tracking-tight">{product.price || 'Liên hệ'}</span>
                
                <div className="flex items-center gap-2 ml-auto md:ml-0">
                  <div className="flex flex-col items-center justify-center bg-[#FDF8E9] text-[#8B5A2B] px-2.5 sm:px-3 py-1 rounded-lg min-w-[3.5rem]">
                     <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">Đã bán:</span>
                     <span className="text-xs sm:text-sm font-black">{product.sold || 0}</span>
                  </div>
                  
                  <div className={`flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 rounded-lg min-w-[3.5rem] ${isOutOfStock ? 'bg-red-100 text-red-700' : 'bg-[#E8F7ED] text-[#1E7B44]'}`}>
                     <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">Còn:</span>
                     <span className="text-xs sm:text-sm font-black">{isOutOfStock ? '0' : product.stock}</span>
                  </div>
                </div>
             </div>

             {/* THẺ NGHỆ NHÂN CHẾ TÁC - ĐỘC QUYỀN SẮC VIỆT */}
             {linkedArtisan && (
               <div 
                 onClick={() => { 
                   onClose(); 
                   if (product.artisanId && !product.artisanId.startsWith('artisan-unknown')) {
                     navigate(`/artisan/${product.artisanId}`);
                   } else if (linkedArtisan.id && linkedArtisan.id !== 'native-artisan') {
                     navigate(`/artisan/${linkedArtisan.id}`);
                   } else {
                     navigate(`/artisans?search=${encodeURIComponent(product.artisan || product.ethnic)}`);
                   }
                 }}
                 className="bg-gradient-to-r from-primary/10 via-amber-50 to-gold/15 hover:from-primary/15 hover:to-gold/25 border-2 border-gold/40 p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all group shadow-sm hover:shadow-md"
               >
                 <div className="flex items-center gap-2.5 min-w-0">
                   <img src={linkedArtisan.avatar} alt={linkedArtisan.name} className="size-10 sm:size-11 rounded-full object-cover border-2 border-gold shrink-0 shadow-sm" />
                   <div className="min-w-0 text-left">
                     <div className="flex items-center gap-1">
                       <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Nghệ nhân chế tác</span>
                       <span className="material-symbols-outlined text-xs text-gold">verified</span>
                     </div>
                     <p className="text-xs sm:text-sm font-black text-text-main group-hover:text-primary transition-colors truncate mt-0.5">{linkedArtisan.name}</p>
                     <p className="text-[9px] sm:text-[10px] text-text-soft truncate">{linkedArtisan.village}</p>
                   </div>
                 </div>
                 <div className="shrink-0 flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase text-primary tracking-wider pl-1">
                   <span className="hidden sm:inline">Xem hồ sơ</span>
                   <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                 </div>
               </div>
             )}

             <div className="bg-background-light p-3.5 sm:p-4 rounded-xl border border-gold/10 text-left">
               <h4 className="font-bold text-primary uppercase text-xs mb-1 flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">auto_stories</span>Câu chuyện sản phẩm</h4>
               <p className="text-text-main text-xs sm:text-sm leading-relaxed text-justify font-medium">"{product.desc || 'Chưa có mô tả chi tiết.'}"</p>
             </div>
          </div>
          
          <div className="p-3 sm:p-4 bg-white border-t border-gold/10 shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
             <div className="flex items-center justify-between mb-2.5 sm:mb-3 bg-background-light p-2 rounded-xl border border-gold/10">
                <span className="text-xs font-bold text-text-soft ml-2">Số lượng:</span>
                <div className="flex items-center gap-3">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="size-8 bg-white rounded-lg border border-gold/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-lg font-bold cursor-pointer">-</button>
                   <span className="w-6 text-center font-black text-xs sm:text-sm">{quantity}</span>
                   <button disabled={quantity >= product.stock || isOutOfStock} onClick={() => setQuantity(quantity + 1)} className="size-8 bg-white rounded-lg border border-gold/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">+</button>
                </div>
             </div>
             <div className="flex gap-2">
                <button disabled={isOutOfStock} onClick={handleAddToCart} className="flex-1 py-3 rounded-xl border-2 border-primary text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"><span className="material-symbols-outlined text-base">add_shopping_cart</span>Thêm giỏ</button>
                <button disabled={isOutOfStock} onClick={handleBuyNow} className="flex-[1.4] py-3 rounded-xl bg-primary text-white font-black uppercase text-[10px] tracking-widest hover:brightness-110 shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">{isOutOfStock ? 'HẾT HÀNG' : 'Mua ngay'}<span className="material-symbols-outlined text-base">arrow_forward</span></button>
             </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Marketplace: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialEthnic = useMemo(() => (searchParams.get('ethnic') || 'TẤT CẢ').toUpperCase(), [searchParams]);
  const [selectedEthnic, setSelectedEthnic] = useState<string>(initialEthnic);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [toast, setToast] = useState<{show: boolean, msg: string}>({show: false, msg: ''});
  const scrollRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 15;

  const showToastMsg = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // 0. Lấy danh sách nghệ nhân để ánh xạ thông tin (avatar, làng nghề, dân tộc)
        const allArtisansList = await artisanPortalService.getAllArtisans();
        const artisanMap = new Map(allArtisansList.map(a => [a.id, a]));

        // 1. Tải sản phẩm từ Kênh Nghệ Nhân (CHỈ LẤY SẢN PHẨM ĐÃ ĐƯỢC ADMIN DUYỆT - status === 'approved')
        const artisanProds = await artisanPortalService.getApprovedProductsForMarketplace();
        const mappedArtisanProds: Product[] = (artisanProds || []).map(ap => {
          const matchedArtisan = artisanMap.get(ap.artisanId);
          return {
            id: ap.id,
            name: ap.name,
            ethnic: ap.ethnic || (matchedArtisan ? matchedArtisan.ethnic : 'Khác'),
            stock: ap.stock ?? 10,
            price: `${ap.price.toLocaleString('vi-VN')} đ`,
            priceValue: ap.price,
            desc: ap.heritageStory || 'Sản phẩm thủ công truyền thống do nghệ nhân bản địa chế tác.',
            artisan: ap.artisanName || (matchedArtisan ? matchedArtisan.name : 'Nghệ nhân bản địa'),
            artisanId: ap.artisanId,
            artisanVillage: matchedArtisan?.village || `Làng nghề truyền thống đồng bào ${ap.ethnic}`,
            artisanAvatar: matchedArtisan?.avatar || matchedArtisan?.proofUrl || 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png',
            exp: ap.craftTimeDays ? `Chế tác ${ap.craftTimeDays} ngày` : 'Nghệ nhân di sản',
            img: ap.image || 'https://placehold.co/600x600?text=Sac+Viet',
            sold: ap.sold || 0,
            likes: Math.floor(Math.random() * 200) + 60,
            category: ap.category || 'Thủ công',
            status: ap.status
          };
        });

        // 2. Tải sản phẩm từ cơ sở dữ liệu Supabase
        let mappedSupabase: Product[] = [];
        try {
          const { data, error } = await supabase.from('san_pham').select('*, dan_toc(ten_dan_toc)');
          if (!error && data) {
            // LỌC BỎ HOÀN TOÀN CÁC SẢN PHẨM CHỜ DUYỆT (pending) HOẶC BỊ TỪ CHỐI (rejected)
            const approvedOrCatalogData = data.filter(p => {
              if (p.mo_ta) {
                if (p.mo_ta.includes('Trạng thái: pending')) return false;
                if (p.mo_ta.includes('Trạng thái: rejected')) return false;
              }
              return true;
            });

            mappedSupabase = approvedOrCatalogData.map(p => {
              const match = p.mo_ta ? p.mo_ta.match(/\[Nghệ nhân:\s*([^|]+)\s*\|\s*ID:\s*([^|]+)\s*\|\s*Trạng thái:\s*([^|]+)(?:\s*\|\s*Chế tác:\s*(\d+)\s*ngày)?(?:\s*\|\s*Danh mục:\s*([^\]]+))?\]/) : null;
              const cleanStory = p.mo_ta ? p.mo_ta.replace(/\[Nghệ nhân:[^\]]+\]/, '').trim() : '';
              const artisanName = match ? match[1].trim() : "Nghệ nhân bản địa";
              const artisanId = match ? match[2].trim() : undefined;
              const matchedArtisan = artisanId ? artisanMap.get(artisanId) : undefined;

              return {
                id: p.id,
                name: p.ten_san_pham,
                ethnic: p.dan_toc?.ten_dan_toc || 'Khác',
                stock: p.so_luong || 0,
                price: p.gia,
                priceValue: parseInt(String(p.gia || '0').replace(/\D/g, '') || '0'),
                desc: cleanStory || p.mo_ta || 'Sản phẩm thủ công truyền thống do nghệ nhân bản địa chế tác.',
                artisan: artisanName,
                artisanId: artisanId,
                artisanVillage: matchedArtisan?.village || `Làng nghề truyền thống đồng bào ${p.dan_toc?.ten_dan_toc || 'Việt Nam'}`,
                artisanAvatar: matchedArtisan?.avatar || matchedArtisan?.proofUrl || 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png',
                exp: match && match[4] ? `Chế tác ${match[4]} ngày` : "Lâu năm",
                img: p.anh_san_pham?.replace('/public/images/', '/public/images-sacviet/'),
                sold: Math.floor(Math.random() * 50) + 10,
                likes: Math.floor(Math.random() * 300) + 50,
                category: match && match[5] ? match[5].trim() : 'Thủ công',
                status: match ? match[3].trim() : 'approved'
              };
            });
          }
        } catch (dbErr) {
          console.warn("Lỗi tải Supabase (tiếp tục với sản phẩm nghệ nhân):", dbErr);
        }

        // Kết hợp: Sản phẩm của Nghệ nhân trực tuyến xuất hiện ngay ở đầu Chợ Phiên
        const combined = [
          ...mappedArtisanProds,
          ...mappedSupabase.filter(sp => !mappedArtisanProds.some(ap => ap.name.toLowerCase() === sp.name.toLowerCase()))
        ];
        setProducts(combined);
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => { setSelectedEthnic(initialEthnic); setCurrentPage(1); }, [initialEthnic]);

  const ethnicList = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.ethnic)));
    return ['TẤT CẢ', ...list.sort((a, b) => a.localeCompare(b, 'vi'))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedEthnic.toUpperCase() !== 'TẤT CẢ') result = result.filter(p => p.ethnic.toUpperCase() === selectedEthnic.toUpperCase());
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(term) || p.ethnic.toLowerCase().includes(term));
    }
    if (sortOrder === 'asc') result = result.sort((a, b) => a.priceValue - b.priceValue);
    else if (sortOrder === 'desc') result = result.sort((a, b) => b.priceValue - a.priceValue);
    else if (sortOrder === 'bestseller') result = result.sort((a, b) => b.sold - a.sold);

    return result;
  }, [selectedEthnic, searchTerm, sortOrder, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); };

  return (
    <div className="min-h-screen font-display bg-background-light relative overflow-x-hidden">
      
      {/* TOAST THÔNG BÁO BẤT TỬ (CĂN GIỮA TUYỆT ĐỐI BẰNG FLEXBOX) */}
      {createPortal(
        <div className={`fixed inset-x-0 top-12 md:top-24 z-[9999999] flex justify-center pointer-events-none transition-all duration-500 ${toast.show ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'}`}>
          <div className="bg-[#8B1A1A] text-white px-5 py-3 md:px-8 md:py-4 rounded-full shadow-[0_10px_40px_rgba(139,26,26,0.4)] flex items-center gap-2 md:gap-3 max-w-[90vw] border border-white/10">
            <span className="material-symbols-outlined font-black text-lg md:text-xl shrink-0">check_circle</span>
            <span className="text-[11px] md:text-sm font-bold leading-tight line-clamp-1">{toast.msg}</span>
          </div>
        </div>,
        document.body
      )}

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} showToastMsg={showToastMsg} />}
      
      <div className="w-[96%] max-w-[1920px] mx-auto px-4 py-8 md:py-12 relative z-10">
        
        <section className="relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden mb-8 md:mb-12 h-48 md:h-80 flex items-center shadow-2xl border-4 border-white">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://topsapa.vn/uploads/2023/04/07/nguoi-dan-o-cho-phien-bac-ha-rat-chat-phac-va-gian-di-mac-nh_cufz0_042151300.png')"}}>
            <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
          </div>
          <div className="relative z-10 px-6 md:px-16 max-w-3xl text-left">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white mb-2 md:mb-4 italic uppercase tracking-tighter drop-shadow-2xl">CHỢ <span className="text-gold">PHIÊN</span></h2>
            <div className="flex items-start gap-4">
               <div className="w-1 md:w-1.5 h-8 md:h-12 bg-gold/80 rounded-full mt-1 shrink-0"></div>
               <p className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold italic tracking-tight opacity-90 drop-shadow-md leading-tight">"Kết nối di sản với thương mại công bằng."</p>
            </div>
          </div>
        </section>


        <div className="sticky top-16 md:top-24 z-40 mb-6 md:mb-10 space-y-3 md:space-y-4">
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 max-w-5xl mx-auto">
            <div className="relative group flex-1 flex items-center">
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none z-10 text-[#8B1A1A]">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-lg sm:text-xl leading-none">search</span>
              </div>
              <input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full bg-white/95 backdrop-blur border-2 border-gold/20 rounded-full py-2.5 sm:py-3.5 pl-11 sm:pl-14 pr-4 sm:pr-6 text-text-main shadow-md sm:shadow-xl text-sm sm:text-base font-medium focus:outline-none focus:border-gold transition-all" />
            </div>
            
            <div className="relative w-full sm:w-56 shrink-0">
              <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }} className="w-full bg-white/95 backdrop-blur border-2 border-gold/20 rounded-full py-2.5 sm:py-3.5 pl-4 sm:pl-6 pr-8 sm:pr-10 text-text-main shadow-md sm:shadow-xl text-xs sm:text-sm font-bold focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer">
                <option value="default">Mới cập nhật</option>
                <option value="bestseller">Bán chạy nhất</option>
                <option value="asc">Giá: Thấp đến Cao</option>
                <option value="desc">Giá: Cao đến Thấp</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gold">
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur p-1.5 sm:p-2 rounded-2xl md:rounded-[2.5rem] border border-gold/20 shadow-md sm:shadow-lg flex items-center max-w-[98vw] md:max-w-[90vw] mx-auto group">
             <button onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })} className="p-1.5 sm:p-2 hover:bg-gold/10 rounded-full text-gold shrink-0 cursor-pointer"><span className="material-symbols-outlined text-base sm:text-xl">chevron_left</span></button>
             <div ref={scrollRef} className="flex-1 flex overflow-x-auto gap-1.5 sm:gap-2 px-1 sm:px-2 py-1 scroll-smooth no-scrollbar">
                {ethnicList.map(ethnic => (
                  <button key={ethnic} onClick={() => { setSelectedEthnic(ethnic); setCurrentPage(1); }} className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border shrink-0 cursor-pointer ${selectedEthnic === ethnic ? 'bg-primary border-primary text-white shadow-md' : 'bg-transparent border-transparent text-text-soft hover:bg-gold/10'}`}>{ethnic}</button>
                ))}
             </div>
             <button onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })} className="p-1.5 sm:p-2 hover:bg-gold/10 rounded-full text-gold shrink-0 cursor-pointer"><span className="material-symbols-outlined text-base sm:text-xl">chevron_right</span></button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 md:gap-8 min-h-[500px] content-start pb-24 md:pb-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gold font-black text-xl sm:text-2xl animate-pulse">Đang kết nối chợ phiên...</div>
          ) : currentProducts.map((p) => <ProductCard key={p.id} product={p} onOpenDetail={setSelectedProduct} />)}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 md:mt-16 flex items-center justify-center gap-2 pb-24 md:pb-0">
            <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="size-8 md:size-10 rounded-full flex items-center justify-center border border-gold/20 bg-white text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-colors cursor-pointer"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
            <div className="flex gap-1 md:gap-2 mx-2 md:mx-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => handlePageChange(page)} className={`size-8 md:size-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black transition-all cursor-pointer ${currentPage === page ? 'bg-primary text-white shadow-lg scale-110' : 'bg-white border border-gold/10 text-text-soft hover:border-gold/50'}`}>{page}</button>
              ))}
            </div>
            <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="size-8 md:size-10 rounded-full flex items-center justify-center border border-gold/20 bg-white text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-colors cursor-pointer"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        )}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; } @keyframes slide-up { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }`}</style>
    </div>
  );
};
export default Marketplace;