import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArtisanById, artisanData, Artisan, Motif, ArtisanProduct } from '../data/artisanData';
import { useCart } from '../context/CartContext';
import { artisanPortalService } from '../services/artisanPortalService';

const ArtisanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [selectedMotif, setSelectedMotif] = useState<Motif | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');
  const [isThankModalOpen, setIsThankModalOpen] = useState(false);
  const [thankMessage, setThankMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const loadArtisan = async () => {
      if (id) {
        const found = getArtisanById(id);
        if (found) {
          setArtisan(found);
          if (found.motifs && found.motifs.length > 0) {
            setSelectedMotif(found.motifs[0]);
          }
          return;
        }

        // Kiểm tra nghệ nhân đăng ký trực tuyến từ Kênh Nghệ Nhân
        try {
          const allDynamic = await artisanPortalService.getAllArtisans();
          const foundDynamic = allDynamic.find(a => a.id === id || a.name.toLowerCase() === id.toLowerCase());
          if (foundDynamic) {
            const dynamicProds = await artisanPortalService.getProductsByArtisanId(foundDynamic.id);
            const approvedDynamicProds = dynamicProds.filter(p => p.status === 'approved');

            const defaultMotifs: Motif[] = [
              {
                name: `Hoa văn truyền thống ${foundDynamic.ethnic || 'bản địa'}`,
                originalName: 'Bản sắc cổ truyền',
                meaning: 'Biểu tượng của sự gắn kết cội nguồn, mùa màng no ấm và che chở tâm linh cho bản làng.',
                symbol: '🌸',
                desc: `Họa tiết đặc trưng kết tinh giá trị văn hóa ngàn đời của đồng bào ${foundDynamic.ethnic || 'bản địa'}, được gìn giữ và trao truyền tại làng nghề ${foundDynamic.village || ''}.`
              }
            ];

            const mapped: Artisan = {
              id: foundDynamic.id,
              name: foundDynamic.name,
              title: foundDynamic.badgeLevel === 'master' ? 'Nghệ nhân Nhân dân' : (foundDynamic.badgeLevel === 'verified_heritage' ? 'Nghệ nhân Ưu tú' : 'Nghệ nhân Bản địa'),
              ethnic: foundDynamic.ethnic || 'Việt Nam',
              village: foundDynamic.village || 'Làng nghề truyền thống',
              province: foundDynamic.village ? (foundDynamic.village.split(',').pop()?.trim() || 'Việt Nam') : 'Việt Nam',
              region: 'Việt Nam',
              coords: [21.0285, 105.8542],
              yearsOfCraft: 25,
              craftType: foundDynamic.proofType === 'workshop' ? 'Thủ công xưởng truyền thống' : 'Thủ công di sản bản địa',
              avatar: foundDynamic.avatar || foundDynamic.proofUrl || 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png',
              coverImg: foundDynamic.proofUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
              quote: foundDynamic.bio || `Tôn vinh và trao truyền bản sắc văn hóa của đồng bào ${foundDynamic.ethnic}.`,
              bio: foundDynamic.bio || `Nghệ nhân ${foundDynamic.name} đã gắn bó cả cuộc đời với nghề thủ công tại ${foundDynamic.village}, miệt mài lưu giữ và phát triển tinh hoa văn hóa truyền thống của dân tộc ${foundDynamic.ethnic}.`,
              story: [
                `Khởi đầu từ tình yêu tha thiết với những đường nét hoa văn và nguyên liệu tự nhiên tại bản làng ${foundDynamic.village || ''}.`,
                `Trải qua nhiều năm gắn bó và miệt mài gìn giữ bí quyết chế tác thủ công truyền thống của dân tộc ${foundDynamic.ethnic || ''}.`,
                `Tự hào giới thiệu các sản phẩm văn hóa bản địa chân thực tới cộng đồng bảo tồn Sắc Việt.`
              ],
              metrics: [
                { label: 'Thời gian chế tác', value: '15 – 30 ngày', sub: 'Thực hiện thủ công từng công đoạn', icon: 'hourglass_top' },
                { label: 'Nguyên liệu', value: '100% Bản địa', sub: 'Thu hoạch tự nhiên từ buôn làng', icon: 'eco' },
                { label: 'Kỹ nghệ lưu truyền', value: 'Độc bản', sub: 'Không sản xuất công nghiệp hàng loạt', icon: 'handshake' },
                { label: 'Cấp chứng nhận', value: 'Sắc Việt Bảo Chứng', sub: 'Xác minh danh tính làng nghề', icon: 'verified' }
              ],
              motifs: defaultMotifs,
              products: approvedDynamicProds.map(p => ({
                id: p.id,
                name: p.name,
                price: `${Number(p.price).toLocaleString('vi-VN')} đ`,
                priceValue: Number(p.price),
                timeToCraft: p.craftTimeDays ? `${p.craftTimeDays} ngày` : '15 ngày',
                img: p.image || 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/logo.png',
                category: p.category || 'Thủ công',
                soldCount: p.sold || 0,
                desc: p.heritageStory || 'Sản phẩm thủ công truyền thống chứa đựng tâm huyết của nghệ nhân.'
              })),
              gallery: foundDynamic.proofUrl ? [foundDynamic.proofUrl] : []
            };
            setArtisan(mapped);
            if (mapped.motifs && mapped.motifs.length > 0) {
              setSelectedMotif(mapped.motifs[0]);
            }
            return;
          }
        } catch (e) {
          console.warn('Lỗi tải nghệ nhân trực tuyến:', e);
        }

        setArtisan(artisanData[0]);
        setSelectedMotif(artisanData[0].motifs[0]);
      } else {
        setArtisan(artisanData[0]);
        setSelectedMotif(artisanData[0].motifs[0]);
      }
    };
    loadArtisan();
  }, [id]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleBuyProduct = (product: ArtisanProduct) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      priceValue: product.priceValue,
      ethnic: artisan?.ethnic || 'Bản địa',
      img: product.img,
      quantity: 1
    };
    addToCart(cartItem, 'checkout');
    showToast(`Đã thêm "${product.name}" vào đơn đặt hàng!`);
  };

  const handleSendThanks = (e: React.FormEvent) => {
    e.preventDefault();
    setIsThankModalOpen(false);
    showToast(`Lời tri ân của bạn đã được gửi tới Nghệ nhân ${artisan?.name}!`);
    setThankMessage('');
    setSenderName('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết trang nghệ nhân!');
    } else {
      showToast('Đã chia sẻ trang nghệ nhân!');
    }
  };

  if (!artisan) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-6 text-center font-display">
        <div>
          <div className="size-16 border-4 border-[#9C6237]/30 border-t-[#9C6237] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-bold text-[#222823] text-lg">Đang mở không gian nghệ nhân...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-display text-[#222823] relative overflow-x-hidden selection:bg-[#9C6237]/20 selection:text-[#9C6237]">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] bg-[#781012] text-white px-6 py-3.5 rounded-full shadow-2xl border border-gold/40 flex items-center gap-3 animate-fade-in text-sm font-bold">
          <span className="material-symbols-outlined text-gold">verified</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Decorative Traditional Contour Background Watermark */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.035] select-none text-right">
        <svg viewBox="0 0 400 400" className="w-full h-full stroke-[#8B1A1A] fill-none stroke-[1.5]">
          <path d="M50,300 Q150,150 250,280 T400,220" />
          <path d="M0,350 Q120,200 280,320 T450,260" />
          <path d="M80,240 Q180,100 300,220 T420,180" />
          <path d="M120,190 Q220,70 330,170 T440,140" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-20 relative z-10">

        {/* 🌟 TOP BREADCRUMB & ACTIONS */}
        <div className="flex items-center justify-between gap-2 py-2 mb-4 sm:mb-6 border-b border-[#EAE3D5]">
          <div className="flex items-center gap-1.5 text-xs text-[#7C7267] font-medium truncate">
            <Link to="/" className="hover:text-[#9C6237] transition-colors shrink-0">Trang chủ</Link>
            <span className="text-[#C4B8A6]">&gt;</span>
            <Link to="/artisans" className="hover:text-[#9C6237] transition-colors shrink-0">Nghệ nhân</Link>
            <span className="text-[#C4B8A6]">&gt;</span>
            <span className="text-[#2F271D] font-bold truncate max-w-[120px] sm:max-w-none">{artisan.name}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                setIsLiked(!isLiked);
                showToast(isLiked ? 'Đã bỏ yêu thích' : `Đã lưu Nghệ nhân ${artisan.name} vào danh sách yêu thích!`);
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs cursor-pointer ${
                isLiked
                  ? 'bg-[#FFF0ED] border-[#F2BDB3] text-[#A63228]'
                  : 'bg-white hover:bg-[#F5EFE4] border-[#E0D8CA] text-[#4A3E31]'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isLiked ? 'fill-current text-[#A63228]' : 'text-[#7C7267]'}`}>
                favorite
              </span>
              <span className="hidden sm:inline">{isLiked ? 'Đã thích' : 'Yêu thích'}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 sm:px-4 py-1.5 rounded-full bg-white hover:bg-[#F5EFE4] border border-[#E0D8CA] text-[#4A3E31] text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm text-[#7C7267]">share</span>
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
          </div>
        </div>

        {/* 🌟 HERO SECTION: NGHỆ NHÂN PROFILE GỌN GÀNG & CÂN ĐỐI TRÊN MOBILE */}
        <div className="bg-white rounded-2xl md:rounded-[2.5rem] p-4 sm:p-6 md:p-8 shadow-sm border border-[#E8E2D5] mb-6 md:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
            
            {/* CỘT ẢNH NGHỆ NHÂN */}
            <div className="md:col-span-4 flex md:block items-center gap-3.5">
              <div className="relative size-24 sm:size-32 md:w-full md:aspect-square rounded-2xl md:rounded-[2rem] overflow-hidden shadow-md md:shadow-lg border-2 md:border-4 border-white bg-zinc-900 shrink-0 group">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Badge desktop */}
                <div className="hidden md:flex absolute bottom-3 left-3 bg-[#781012]/95 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-gold/40 text-xs font-bold items-center gap-1.5 shadow-md">
                  <span className="material-symbols-outlined text-sm text-gold">location_on</span>
                  <span>{artisan.title}</span>
                </div>
              </div>

              {/* Thông tin hiển thị cạnh avatar trên Mobile */}
              <div className="md:hidden flex-1 min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9C6237] block truncate">
                  {artisan.title}
                </span>
                <h1 className="text-xl font-black text-[#1F2923] leading-tight truncate">
                  {artisan.name}
                </h1>
                <p className="text-xs font-medium italic text-[#2D3E32] mt-0.5 line-clamp-2">
                  “{artisan.craftType}”
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-xs">verified</span>
                    Bản địa xác thực
                  </span>
                </div>
              </div>
            </div>

            {/* CỘT PHẢI: CHI TIẾT + 4 Ô CHỈ SỐ */}
            <div className="md:col-span-8 space-y-3 sm:space-y-4">
              
              {/* Tiêu đề hiển thị trên Desktop */}
              <div className="hidden md:block space-y-1">
                <span className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-[#9C6237] block">
                  {artisan.title}
                </span>
                <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-[#1F2923] leading-tight">
                  {artisan.name}
                </h1>
                <p className="text-base lg:text-lg font-medium italic text-[#2D3E32]">
                  “{artisan.craftType}”
                </p>
              </div>

              {/* BẢNG 4 Ô THÔNG TIN: Dân tộc | Quê quán | Buôn làng | Thời gian làm nghề */}
              <div className="bg-[#FAF7F0] border border-[#EADBCA] rounded-xl sm:rounded-2xl p-2 sm:p-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {/* Ô 1: Dân tộc */}
                <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-white/70 rounded-lg">
                  <div className="size-7 sm:size-8 rounded-full bg-[#E5D7C5] flex items-center justify-center text-[#6B4B29] shrink-0">
                    <span className="material-symbols-outlined text-base">groups</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#7A6E5F] block font-medium leading-tight">Dân tộc</span>
                    <strong className="text-xs sm:text-sm text-[#231E18] font-bold truncate block">{artisan.ethnic}</strong>
                  </div>
                </div>

                {/* Ô 2: Quê quán */}
                <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-white/70 rounded-lg">
                  <div className="size-7 sm:size-8 rounded-full bg-[#E5D7C5] flex items-center justify-center text-[#6B4B29] shrink-0">
                    <span className="material-symbols-outlined text-base">location_on</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#7A6E5F] block font-medium leading-tight">Quê quán</span>
                    <strong className="text-xs sm:text-sm text-[#231E18] font-bold truncate block">{artisan.province}</strong>
                  </div>
                </div>

                {/* Ô 3: Buôn làng */}
                <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-white/70 rounded-lg">
                  <div className="size-7 sm:size-8 rounded-full bg-[#E5D7C5] flex items-center justify-center text-[#6B4B29] shrink-0">
                    <span className="material-symbols-outlined text-base">home</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#7A6E5F] block font-medium leading-tight">Buôn làng</span>
                    <strong className="text-xs sm:text-sm text-[#231E18] font-bold truncate block">{artisan.village}</strong>
                  </div>
                </div>

                {/* Ô 4: Thời gian làm nghề */}
                <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-white/70 rounded-lg">
                  <div className="size-7 sm:size-8 rounded-full bg-[#E5D7C5] flex items-center justify-center text-[#6B4B29] shrink-0">
                    <span className="material-symbols-outlined text-base">history</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#7A6E5F] block font-medium leading-tight">Tuổi nghề</span>
                    <strong className="text-xs sm:text-sm text-[#231E18] font-bold truncate block">Gần {artisan.yearsOfCraft} năm</strong>
                  </div>
                </div>
              </div>

              {/* Trích dẫn nghệ nhân */}
              <div className="p-3 sm:p-3.5 bg-[#FAF7F0]/80 rounded-xl border-l-3 border-[#9C6237] shadow-2xs">
                <blockquote className="text-xs sm:text-sm italic text-[#382F24] leading-relaxed font-serif">
                  “{artisan.quote}”
                </blockquote>
                <p className="text-[11px] font-bold text-[#635342] mt-1">— Nghệ nhân {artisan.name}</p>
              </div>

              {/* Quick Actions (Bản đồ & Tri ân) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={artisan.coords && artisan.coords.length >= 2 ? `https://www.google.com/maps/search/?api=1&query=${artisan.coords[0]},${artisan.coords[1]}` : `https://www.google.com/maps`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F0] hover:bg-gray-100 text-primary rounded-xl text-xs font-bold border border-[#DDD5C7] shadow-2xs transition-colors"
                >
                  <span className="material-symbols-outlined text-sm text-[#9C6237]">map</span>
                  Xem vị trí xưởng
                </a>

                <button
                  onClick={() => setIsThankModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9C6237] hover:bg-[#85512A] text-white rounded-xl text-xs font-bold shadow-xs transition-colors active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                  Gửi lời tri ân
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 🌟 KHỐI CHỈ SỐ ĐÔI BÀN TAY THỦ CÔNG */}
        <div className="bg-white rounded-2xl md:rounded-[2.2rem] p-4 sm:p-6 shadow-sm border border-[#E8E2D5] mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#EAE3D5] gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#9C6237] text-2xl">spa</span>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C6237] block">
                  BẢO TỒN GIÁ TRỊ THẬT • 100% THỦ CÔNG
                </span>
                <h2 className="text-lg sm:text-2xl font-black text-[#1F2923] tracking-tight uppercase">
                  CHỈ SỐ ĐÔI BÀN TAY NGHỆ NHÂN
                </h2>
              </div>
            </div>

            <div className="bg-[#FFF6F4] text-[#A63228] border border-[#FCDAD5] px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 self-start sm:self-auto">
              <span className="material-symbols-outlined text-xs text-[#A63228]">verified_user</span>
              <span>Không sản xuất công nghiệp hàng loạt</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {(artisan.metrics || []).map((m, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F0] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#EADBCA] hover:border-[#9C6237]/50 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#7C7267]">
                    {m.label}
                  </span>
                  <div className="size-6 sm:size-7 rounded-lg bg-[#EAE0D2] text-[#9C6237] flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm sm:text-base">{m.icon}</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-black text-[#9C6237] leading-tight">
                    {m.value}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#524639] mt-0.5 font-medium leading-snug">
                    {m.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 GIA TÀI BẢN SẮC - BỘ SƯU TẬP TÁC PHẨM CỦA NGHỆ NHÂN */}
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-8 gap-2 sm:gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#9C6237] bg-[#EFE9DC] px-3 py-1 rounded-full border border-[#DDD5C7] inline-block mb-1.5">
                TÁC PHẨM ĐỘC BẢN
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-[#1F2923] tracking-tight uppercase">
                Gia Tài Bản Sắc Của {artisan.name}
              </h2>
              <p className="text-xs text-[#635342] mt-0.5 font-medium">
                Mỗi sản phẩm đều ghi rõ thời gian công và được dệt tay trực tiếp tại buôn làng.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="text-[#9C6237] font-black uppercase text-xs hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
            >
              Xem tất cả chợ phiên <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {(artisan.products || []).map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-[#F5EFE4] text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {p.category}
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#EADBCA] flex items-center justify-between text-[11px] font-bold text-[#524639]">
                    <span className="flex items-center gap-1 text-[#9C6237]">
                      <span className="material-symbols-outlined text-xs">hourglass_top</span>
                      {p.timeToCraft}
                    </span>
                    <span>Đã bán: {p.soldCount}</span>
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#1F2923] text-sm group-hover:text-[#9C6237] transition-colors line-clamp-2 mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-3">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[#EAE3D5] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#7C7267] uppercase font-bold block">Giá tác phẩm</span>
                      <span className="text-[#9C6237] font-black text-sm sm:text-base leading-none">
                        {p.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBuyProduct(p)}
                      className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-primary hover:brightness-110 text-white rounded-xl text-xs font-bold uppercase tracking-wider active:scale-95 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">shopping_bag</span>
                      Đặt mua
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 KHỐI GIẢI MÃ MẬT MÃ HOA VĂN THIÊNG (MOTIFS DECODER) */}
        {artisan.motifs && artisan.motifs.length > 0 && (
          <div className="mb-10 sm:mb-14">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#9C6237] bg-[#EFE9DC] px-3.5 py-1 rounded-full border border-[#DDD5C7] inline-block">
                MẬT MÃ BẢN SẮC
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-[#1F2923] tracking-tight uppercase">
                Giải Mã Từng Đường Nét Hoa Văn Thiêng
              </h2>
              <p className="text-xs sm:text-sm text-[#635342] leading-relaxed">
                Mỗi họa tiết là một triết lý nhân sinh, lời chúc phúc cho vụ mùa no ấm và sự che chở tâm linh của tổ tiên người Mông.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Cột Trái: Danh sách tab hoa văn */}
              <div className="lg:col-span-5 space-y-3">
                {(artisan.motifs || []).map((motif, index) => {
                  const isSelected = selectedMotif?.name === motif.name;
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedMotif(motif)}
                      className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 sm:gap-4 ${
                        isSelected
                          ? 'bg-white border-[#9C6237] shadow-lg scale-[1.01]'
                          : 'bg-white/70 border-[#E5DDD0] hover:border-[#9C6237]/50 hover:bg-white'
                      }`}
                    >
                      <div className={`size-10 sm:size-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0 border ${
                        isSelected ? 'bg-[#9C6237] text-white border-[#9C6237]' : 'bg-[#FAF7F0] text-[#9C6237] border-[#EADBCA]'
                      }`}>
                        {motif.symbol}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-xs sm:text-sm text-[#1F2923] truncate">
                            {motif.name}
                          </h3>
                          {motif.originalName && (
                            <span className="text-[10px] bg-[#EFE9DC] text-[#7A4B24] font-black uppercase px-2 py-0.5 rounded-md shrink-0">
                              {motif.originalName}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#9C6237] font-semibold mt-0.5 line-clamp-1">
                          {motif.meaning}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cột Phải: Bảng Chi Tiết Hoa Văn */}
              <div className="lg:col-span-7">
                {selectedMotif && (
                  <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8E2D5] shadow-md relative overflow-hidden animate-fade-in">
                    <div className="absolute top-0 right-0 p-4 sm:p-6 text-6xl sm:text-7xl opacity-10 select-none pointer-events-none">
                      {selectedMotif.symbol}
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <span className="text-2xl sm:text-3xl">{selectedMotif.symbol}</span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#9C6237] bg-[#EFE9DC] px-2.5 py-0.5 rounded-full border border-[#DDD5C7]">
                          Tên bản địa: {selectedMotif.originalName || 'Cổ truyền'}
                        </span>
                        <h3 className="text-lg sm:text-2xl font-black text-[#1F2923] mt-1">
                          {selectedMotif.name}
                        </h3>
                      </div>
                    </div>

                    <div className="h-0.5 w-12 sm:w-14 bg-[#9C6237] mb-4 sm:mb-5"></div>

                    <div className="bg-[#FAF7F0] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#EADBCA] mb-4 sm:mb-5">
                      <p className="text-[10px] font-black uppercase text-[#9C6237] tracking-widest mb-0.5">
                        Ý NGHĨA BIỂU TRƯNG:
                      </p>
                      <p className="text-sm sm:text-base font-bold text-[#1F2923]">
                        "{selectedMotif.meaning}"
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#524639] leading-relaxed text-justify mb-3 sm:mb-4">
                      {selectedMotif.desc}
                    </p>

                    <p className="italic text-[11px] text-[#7C7267] border-t border-[#EAE3D5] pt-2.5">
                      * Họa tiết này được nghệ nhân {artisan.name} dùng ngòi bút đồng chấm sáp ong rừng nóng chảy vẽ trực tiếp trên vải lanh mộc mạc, không dùng thước kẻ hay bản in khuôn mẫu.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* 🌟 KHỐI CHUYỆN ĐỜI NGHỆ NHÂN & KHÔNG GIAN BẢN ĐỊA */}
        <div className="bg-white rounded-2xl md:rounded-[2.2rem] p-4 sm:p-8 md:p-10 shadow-sm border border-[#E8E2D5] mb-10 sm:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9C6237] bg-[#EFE9DC] px-3 py-1 rounded-full border border-[#DDD5C7] inline-block">
                HÀNH TRÌNH GIỮ LỬA
              </span>

              <h2 className="text-xl sm:text-3xl font-black text-[#1F2923] tracking-tight uppercase leading-snug">
                Chuyện Đời & Bàn Tay Nghệ Nhân {artisan.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#4A3E31] leading-relaxed font-medium">
                {artisan.bio}
              </p>

              <div className="space-y-2 pt-1">
                {(artisan.story || []).map((st, i) => (
                  <div key={i} className="flex gap-2.5 bg-[#FAF7F0] p-3 rounded-xl border border-[#EADBCA]">
                    <span className="size-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-xs text-[#524639] leading-relaxed font-medium">
                      {st}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
                <div className="space-y-2.5 sm:space-y-3.5">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#EADBCA] shadow-sm aspect-[4/5] bg-gray-100">
                    <img
                      src={artisan.coverImg}
                      alt={`Không gian chế tác của ${artisan.name}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-[#EADBCA] text-center">
                    <span className="text-xl sm:text-2xl font-black text-[#9C6237] block leading-none">{artisan.yearsOfCraft}+</span>
                    <span className="text-[10px] font-bold uppercase text-[#7C7267] mt-0.5 block">Năm tuổi nghề cống hiến</span>
                  </div>
                </div>

                <div className="space-y-2.5 sm:space-y-3.5 pt-2 sm:pt-4">
                  <div 
                    style={{ backgroundColor: '#781012', backgroundImage: 'linear-gradient(135deg, #8A1517 0%, #660C0E 100%)' }}
                    className="text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm text-left border border-gold/30"
                  >
                    <span className="material-symbols-outlined text-gold text-lg sm:text-xl mb-1">eco</span>
                    <h4 className="font-bold text-[11px] sm:text-xs uppercase tracking-wider mb-0.5">Bản Sắc Bền Vững</h4>
                    <p className="text-[10px] sm:text-[11px] text-white/90 leading-relaxed">
                      Sản phẩm làm từ nguyên liệu địa phương thuần khiết, gìn giữ môi sinh và tri thức ngàn đời.
                    </p>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#EADBCA] shadow-sm aspect-[4/5] bg-gray-100">
                    <img
                      src={artisan.gallery && artisan.gallery[1] ? artisan.gallery[1] : artisan.avatar}
                      alt={`Tác phẩm thủ công ${artisan.craftType}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 🌟 BOTTOM BAR: KHÁM PHÁ CÁC NGHỆ NHÂN BẢN ĐỊA KHÁC */}
        <div className="bg-white rounded-2xl border border-[#E8E2D5] p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-[#7C7267] mb-3 text-center">
            KHÁM PHÁ CÁC NGHỆ NHÂN BẢN ĐỊA KHÁC TRÊN SẮC VIỆT:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {artisanData.map((other) => (
              <Link
                key={other.id}
                to={`/artisan/${other.id}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border ${
                  other.id === artisan.id
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-[#FAF7F0] text-[#382F24] border-[#EADBCA] hover:border-[#9C6237]'
                }`}
              >
                <img src={other.avatar} alt={other.name} className="size-5 rounded-full object-cover border border-white/50" />
                <span>{other.name} ({other.ethnic})</span>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL GỬI LỜI TRI ÂN TỚI NGHỆ NHÂN */}
      {isThankModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-display">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsThankModalOpen(false)}></div>
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 relative z-10 border border-[#DDD5C7] animate-slide-up">
            <button
              onClick={() => setIsThankModalOpen(false)}
              className="absolute top-4 right-4 size-8 rounded-full bg-[#F5EFE4] hover:bg-red-50 text-[#7C7267] hover:text-red-700 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            <div className="text-center mb-5">
              <div className="size-14 rounded-full bg-[#FAF7F0] text-[#9C6237] border border-[#EADBCA] flex items-center justify-center mx-auto mb-2.5">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>
              <h3 className="text-xl font-black text-[#1F2923] uppercase">
                Gửi Lời Tri Ân
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Gửi gắm sự trân quý của bạn tới <strong>Nghệ nhân {artisan.name}</strong>
              </p>
            </div>

            <form onSubmit={handleSendThanks} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-black uppercase text-[#7C7267] mb-1 ml-0.5">
                  Họ và tên của bạn:
                </label>
                <input
                  required
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Anh (Hà Nội)"
                  className="w-full bg-[#FAF7F0] border border-[#E5DDD0] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#9C6237]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-[#7C7267] mb-1 ml-0.5">
                  Lời chúc gửi gắm:
                </label>
                <textarea
                  required
                  rows={3}
                  value={thankMessage}
                  onChange={(e) => setThankMessage(e.target.value)}
                  placeholder="Cảm ơn bác đã gìn giữ nghề dệt lanh tuyệt đẹp của người Mông..."
                  className="w-full bg-[#FAF7F0] border border-[#E5DDD0] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#9C6237] resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsThankModalOpen(false)}
                  className="flex-1 py-2.5 border border-[#E5DDD0] rounded-xl text-xs font-bold uppercase text-[#6B7280] hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-2.5 bg-[#9C6237] hover:bg-[#85512A] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Gửi lời tri ân
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ArtisanDetail;
