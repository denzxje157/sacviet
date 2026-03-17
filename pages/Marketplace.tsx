/// <reference types="vite/client" />
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.tsx';
import { supabase } from '../services/supabaseClient.ts'; 
import { marketplaceData } from '../data/mockData.ts';

interface Product {
  id: string;
  name: string;
  ethnic: string;
  stock: number;
  price: string;
  priceValue: number;
  desc: string;
  artisan: string;
  exp: string;
  img: string;
  sold: number;
  category: string;
  likes: number; // Thêm số lượt thích thay cho rating
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
  const isOutOfStock = product.stock <= 0;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleAddToCart = () => {
    if (addToCart && product) {
        for (let i = 0; i < quantity; i++) addToCart(product);
        showToastMsg(`Đã thêm ${quantity} "${product.name}" vào giỏ hàng`);
    }
    onClose();
  };

  const handleBuyNow = () => {
    if (addToCart && product) {
        for (let i = 0; i < quantity; i++) addToCart(product);
    }
    onClose();
    if (toggleCart) toggleCart(); 
  };

  if (!product) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-display">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="bg-white w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[90vh] rounded-[2rem] shadow-2xl relative z-10 animate-slide-up flex flex-col md:flex-row overflow-hidden border-4 border-gold/30">
        <button onClick={onClose} className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-white/30 hover:bg-white text-text-soft hover:text-red-800 rounded-full shadow-lg backdrop-blur-sm transition-all active:scale-95 group"><span className="material-symbols-outlined text-xl group-hover:rotate-90 transition-transform">close</span></button>
        <div className="w-full md:w-[60%] h-1/2 md:h-auto relative bg-[#F2EFE6] border-b md:border-b-0 md:border-r border-gold/10">
          <img src={product.img || 'https://placehold.co/600x600?text=No+Image'} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 text-white"><span className="bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30 shadow-sm inline-block mb-2">Dân tộc {product.ethnic || 'Khác'}</span></div>
        </div>
        <div className="w-full md:w-[40%] h-1/2 md:h-auto flex flex-col bg-white">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
             
             <h2 className="text-2xl md:text-3xl font-black text-text-main leading-tight mb-4 mt-2">{product.name || 'Sản phẩm đang cập nhật'}</h2>
             
             {/* HUY HIỆU NIỀM TIN (Trust Badges) */}
             <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">eco</span> 100% Thủ công</span>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">verified</span> Tinh hoa bản địa</span>
             </div>

             {/* UI MỚI KHỚP VỚI ẢNH UI BẠN YÊU CẦU */}
             <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gold/10">
                <span className="text-3xl md:text-4xl font-black text-primary leading-none tracking-tight">{product.price || 'Liên hệ'}</span>
                
                <div className="flex items-center gap-2 ml-auto md:ml-0">
                  {/* Khung Đã bán */}
                  <div className="flex flex-col items-center justify-center bg-[#FDF8E9] text-[#8B5A2B] px-3 py-1.5 rounded-lg min-w-[4rem]">
                     <span className="text-[10px] font-bold uppercase tracking-wide">Đã bán:</span>
                     <span className="text-sm font-black">{product.sold || 0}</span>
                  </div>
                  
                  {/* Khung Còn */}
                  <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-lg min-w-[4rem] ${isOutOfStock ? 'bg-red-100 text-red-700' : 'bg-[#E8F7ED] text-[#1E7B44]'}`}>
                     <span className="text-[10px] font-bold uppercase tracking-wide">Còn:</span>
                     <span className="text-sm font-black">{isOutOfStock ? '0' : product.stock}</span>
                  </div>
                </div>
             </div>

             <div className="space-y-4">
               <div className="bg-background-light p-4 rounded-xl border border-gold/10">
                 <h4 className="font-bold text-primary uppercase text-xs mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-base">auto_stories</span>Câu chuyện sản phẩm</h4>
                 <p className="text-text-main text-sm leading-relaxed text-justify font-medium">"{product.desc || 'Chưa có mô tả chi tiết.'}"</p>
               </div>
             </div>
          </div>
          <div className="p-4 bg-white border-t border-gold/10 shrink-0 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
             <div className="flex items-center justify-between mb-3 bg-background-light p-2 rounded-xl border border-gold/10">
                <span className="text-xs font-bold text-text-soft ml-2">Số lượng:</span>
                <div className="flex items-center gap-3">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="size-8 bg-white rounded-lg border border-gold/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-lg font-bold">-</button>
                   <span className="w-6 text-center font-black">{quantity}</span>
                   <button disabled={quantity >= product.stock || isOutOfStock} onClick={() => setQuantity(quantity + 1)} className="size-8 bg-white rounded-lg border border-gold/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed">+</button>
                </div>
             </div>
             <div className="flex gap-2">
                <button disabled={isOutOfStock} onClick={handleAddToCart} className="flex-1 py-3 rounded-xl border-2 border-primary text-primary font-black uppercase text-[10px] tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"><span className="material-symbols-outlined text-lg">add_shopping_cart</span>Thêm giỏ</button>
                <button disabled={isOutOfStock} onClick={handleBuyNow} className="flex-[1.5] py-3 rounded-xl bg-primary text-white font-black uppercase text-[10px] tracking-widest hover:brightness-110 shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">{isOutOfStock ? 'HẾT HÀNG' : 'Mua ngay'}<span className="material-symbols-outlined text-lg">arrow_forward</span></button>
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
        const { data, error } = await supabase.from('san_pham').select('*, dan_toc(ten_dan_toc)');
        if (error) throw error;
        if (data) {
          const mapped = data.map(p => ({
            id: p.id,
            name: p.ten_san_pham,
            ethnic: p.dan_toc?.ten_dan_toc || 'Khác',
            stock: p.so_luong || 0,
            price: p.gia,
            priceValue: parseInt(p.gia?.replace(/\D/g, '') || '0'),
            desc: p.mo_ta,
            artisan: "Nghệ nhân bản địa",
            exp: "Lâu năm",
            img: p.anh_san_pham?.replace('/public/images/', '/public/images-sacviet/'),
            sold: Math.floor(Math.random() * 50) + 10,
            likes: Math.floor(Math.random() * 300) + 50, // Lượt thích tự động
            category: 'Thủ công'
          }));
          setProducts(mapped);
        }
      } catch (err) { console.error("Lỗi tải sản phẩm:", err); }
      setIsLoading(false);
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
    if (selectedEthnic !== 'TẤT CẢ') result = result.filter(p => p.ethnic.toUpperCase() === selectedEthnic);
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
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
          </div>
          <div className="relative z-10 px-6 md:px-16 max-w-3xl text-left">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black text-white mb-2 md:mb-4 italic uppercase tracking-tighter drop-shadow-2xl">CHỢ <span className="text-gold">PHIÊN</span></h2>
            <div className="flex items-start gap-4">
               <div className="w-1 md:w-1.5 h-8 md:h-12 bg-gold/80 rounded-full mt-1 shrink-0"></div>
               <p className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold italic tracking-tight opacity-90 drop-shadow-md leading-tight">"Kết nối di sản với thương mại công bằng."</p>
            </div>
          </div>
        </section>

        <div className="sticky top-20 md:top-24 z-40 mb-6 md:mb-10 space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row gap-4 max-w-5xl mx-auto">
            <div className="relative group flex-1">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
              <span className="material-symbols-outlined text-[#8B1A1A] group-hover:scale-110 transition-transform text-xl">search</span>
            </div>
              <input type="text" placeholder="Tìm kiếm sản phẩm..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full bg-white/95 backdrop-blur border-2 border-gold/20 rounded-full py-3.5 pl-14 pr-6 text-text-main shadow-xl text-base md:text-lg font-medium focus:outline-none focus:border-gold transition-all" />
            </div>
            
            <div className="relative w-full md:w-56 shrink-0">
              <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }} className="w-full bg-white/95 backdrop-blur border-2 border-gold/20 rounded-full py-3.5 pl-6 pr-10 text-text-main shadow-xl text-sm font-bold focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer">
                <option value="default">Mới cập nhật</option>
                <option value="bestseller">Bán chạy nhất</option>
                <option value="asc">Giá: Thấp đến Cao</option>
                <option value="desc">Giá: Cao đến Thấp</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none"><span className="material-symbols-outlined text-gold">sort</span></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur p-2 rounded-2xl md:rounded-[2.5rem] border border-gold/20 shadow-lg flex items-center max-w-[95vw] md:max-w-[90vw] mx-auto group">
             <button onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })} className="p-2 hover:bg-gold/10 rounded-full text-gold shrink-0"><span className="material-symbols-outlined">chevron_left</span></button>
             <div ref={scrollRef} className="flex-1 flex overflow-x-auto gap-2 px-2 py-2 scroll-smooth no-scrollbar">
                {ethnicList.map(ethnic => (
                  <button key={ethnic} onClick={() => { setSelectedEthnic(ethnic); setCurrentPage(1); }} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border shrink-0 ${selectedEthnic === ethnic ? 'bg-primary border-primary text-white shadow-md' : 'bg-transparent border-transparent text-text-soft hover:bg-gold/10'}`}>{ethnic}</button>
                ))}
             </div>
             <button onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })} className="p-2 hover:bg-gold/10 rounded-full text-gold shrink-0"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8 min-h-[600px] content-start">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gold font-black text-2xl animate-pulse">Đang kết nối chợ phiên...</div>
          ) : currentProducts.map((p) => <ProductCard key={p.id} product={p} onOpenDetail={setSelectedProduct} />)}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 md:mt-16 flex items-center justify-center gap-2 pb-20 lg:pb-0">
            <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="size-8 md:size-10 rounded-full flex items-center justify-center border border-gold/20 bg-white text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-lg">chevron_left</span></button>
            <div className="flex gap-1 md:gap-2 mx-2 md:mx-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => handlePageChange(page)} className={`size-8 md:size-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black transition-all ${currentPage === page ? 'bg-primary text-white shadow-lg scale-110' : 'bg-white border border-gold/10 text-text-soft hover:border-gold/50'}`}>{page}</button>
              ))}
            </div>
            <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="size-8 md:size-10 rounded-full flex items-center justify-center border border-gold/20 bg-white text-primary disabled:opacity-30 hover:bg-primary hover:text-white transition-colors"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
          </div>
        )}
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; } @keyframes slide-up { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }`}</style>
    </div>
  );
};
export default Marketplace;