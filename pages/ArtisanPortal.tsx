import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  artisanPortalService, 
  ArtisanProfile, 
  ArtisanProductItem, 
  ArtisanOrderGroup 
} from '../services/artisanPortalService';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

// Nén ảnh canvas để tối ưu dung lượng và lưu mượt mà trong localStorage
const compressImage = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 🎯 HÌNH ẢNH SẢN PHẨM THỰC TẾ TỪ DỰ ÁN SẮC VIỆT
const REAL_PRODUCT_PHOTOS = [
  { label: 'Gùi đan kín họa tiết đại ngàn Ê Đê', url: '/pictures-sanpham/e-e/gui-an-kin-hoa-tiet.jpg' },
  { label: 'Túi thổ cẩm dệt tay buôn Tơng Jú', url: '/artisans/tui-tho-cam.jpg' },
  { label: 'Bình gốm Bàu Trúc nung củi đất đỏ', url: '/artisans/cham-pottery.jpg' },
  { label: 'Vải thổ cẩm dệt thoi Chăm Mỹ Nghiệp', url: '/pictures-sanpham/cham/san-pham-det-tho-cam-my-nghiep.png' },
  { label: 'Khăn lanh vẽ sáp ong Lùng Tám', url: '/artisans/lung-tam-batik.jpg' }
];

const ArtisanPortal: React.FC = () => {
  const [currentArtisan, setCurrentArtisan] = useState<ArtisanProfile | null>(null);
  const [allArtisans, setAllArtisans] = useState<ArtisanProfile[]>([]);
  const [activeTab, setActiveTab] = useState<'selling' | 'pending' | 'orders'>('selling');
  
  const [products, setProducts] = useState<ArtisanProductItem[]>([]);
  const [orders, setOrders] = useState<ArtisanOrderGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  // Form đăng ký
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [regIsRep, setRegIsRep] = useState(true);
  const [regRepName, setRegRepName] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regVillage, setRegVillage] = useState('');
  const [regEthnic, setRegEthnic] = useState('Ê Đê');
  const [regProofType, setRegProofType] = useState<'workshop' | 'certificate' | 'id_village'>('workshop');
  const [regProofUrl, setRegProofUrl] = useState('');
  const [regProofDesc, setRegProofDesc] = useState('');

  // Modal đăng sản phẩm
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(380000);
  const [newProdStock, setNewProdStock] = useState<number>(10);
  const [newProdImage, setNewProdImage] = useState(REAL_PRODUCT_PHOTOS[0].url);
  const [newProdStory, setNewProdStory] = useState('');
  const [newProdDays, setNewProdDays] = useState<number>(7);
  const [newProdCategory, setNewProdCategory] = useState('Thổ cẩm');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [searchPhone, setSearchPhone] = useState('');

  // Quản lý tab: Đăng nhập SĐT hoặc Đăng ký mở gian hàng mới
  const [authTab, setAuthTab] = useState<'register' | 'login'>('login');

  // Refs & states cho việc upload file ảnh thật
  const proofFileInputRef = useRef<HTMLInputElement>(null);
  const prodFileInputRef = useRef<HTMLInputElement>(null);
  const [proofFileName, setProofFileName] = useState<string>('');
  const [prodFileName, setProdFileName] = useState<string>('');
  const [isUploadingProof, setIsUploadingProof] = useState(false);
  const [isUploadingProd, setIsUploadingProd] = useState(false);

  const handleProofFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      showToast('Kích thước ảnh tối đa 20MB. Vui lòng chọn ảnh nhỏ hơn!');
      return;
    }
    setIsUploadingProof(true);
    try {
      // 1. Thử tải lên Supabase Cloud Storage
      if (isSupabaseConfigured) {
        try {
          const fileExt = file.name.split('.').pop() || 'jpg';
          const cloudPath = `artisans/proof_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${fileExt}`;
          const { error: upErr } = await supabase.storage.from('images-sacviet').upload(cloudPath, file, { upsert: true });
          if (!upErr) {
            const { data: pubData } = supabase.storage.from('images-sacviet').getPublicUrl(cloudPath);
            if (pubData?.publicUrl) {
              setRegProofUrl(pubData.publicUrl);
              setProofFileName(file.name);
              setRegProofDesc(`Ảnh minh chứng: ${file.name} (Lưu trữ Cloud Supabase)`);
              showToast('✓ Đã lưu ảnh minh chứng lên Supabase Cloud!');
              setIsUploadingProof(false);
              return;
            }
          }
        } catch (cloudErr) {
          console.warn('Lỗi tải ảnh Supabase, dùng bản nén canvas:', cloudErr);
        }
      }

      // 2. Dự phòng nén Canvas
      const compressed = await compressImage(file, 1200, 1200, 0.8);
      setRegProofUrl(compressed);
      setProofFileName(file.name);
      setRegProofDesc(`Ảnh minh chứng thực tế: ${file.name} (Tải lên từ thiết bị)`);
      showToast('✓ Đã tải lên ảnh minh chứng thành công!');
    } catch (err) {
      console.error(err);
      showToast('Lỗi khi đọc file ảnh. Vui lòng thử lại!');
    } finally {
      setIsUploadingProof(false);
    }
  };

  const handleProdFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      showToast('Kích thước ảnh tối đa 20MB. Vui lòng chọn ảnh nhỏ hơn!');
      return;
    }
    setIsUploadingProd(true);
    try {
      // 1. Thử tải lên Supabase Cloud Storage
      if (isSupabaseConfigured) {
        try {
          const fileExt = file.name.split('.').pop() || 'jpg';
          const cloudPath = `artisans/prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}.${fileExt}`;
          const { error: upErr } = await supabase.storage.from('images-sacviet').upload(cloudPath, file, { upsert: true });
          if (!upErr) {
            const { data: pubData } = supabase.storage.from('images-sacviet').getPublicUrl(cloudPath);
            if (pubData?.publicUrl) {
              setNewProdImage(pubData.publicUrl);
              setProdFileName(file.name);
              showToast('✓ Đã lưu ảnh sản phẩm lên Supabase Cloud!');
              setIsUploadingProd(false);
              return;
            }
          }
        } catch (cloudErr) {
          console.warn('Lỗi tải ảnh Supabase, dùng bản nén canvas:', cloudErr);
        }
      }

      // 2. Dự phòng nén Canvas
      const compressed = await compressImage(file, 1200, 1200, 0.8);
      setNewProdImage(compressed);
      setProdFileName(file.name);
      showToast('✓ Đã tải lên ảnh sản phẩm thành công!');
    } catch (err) {
      console.error(err);
      showToast('Lỗi khi đọc file ảnh. Vui lòng thử lại!');
    } finally {
      setIsUploadingProd(false);
    }
  };


  useEffect(() => {
    if (searchParams.get('register') === 'true' || searchParams.get('tab') === 'register') {
      setIsRegisterMode(true);
      setAuthTab('register');
    } else if (searchParams.get('tab') === 'login') {
      setIsRegisterMode(true);
      setAuthTab('login');
    }
  }, [searchParams]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const artisans = await artisanPortalService.getAllArtisans();
      setAllArtisans(artisans);

      // Check URL query parameters first
      const paramId = searchParams.get('artisanId');
      const shouldRegister = searchParams.get('register') === 'true' || searchParams.get('tab') === 'register';

      if (paramId) {
        const foundParam = artisans.find(a => a.id === paramId);
        if (foundParam) {
          localStorage.setItem('sacviet_active_artisan_id', foundParam.id);
          setCurrentArtisan(foundParam);
          setIsRegisterMode(false);
          await refreshArtisanData(foundParam.id);
          setIsLoading(false);
          return;
        }
      }

      if (shouldRegister) {
        setIsRegisterMode(true);
        setAuthTab('register');
        setCurrentArtisan(null);
        setIsLoading(false);
        return;
      }

      // Check saved session in localStorage
      const activeArtisanId = localStorage.getItem('sacviet_active_artisan_id');
      if (activeArtisanId) {
        const found = artisans.find(a => a.id === activeArtisanId);
        if (found) {
          setCurrentArtisan(found);
          setIsRegisterMode(false);
          await refreshArtisanData(found.id);
          setIsLoading(false);
          return;
        }
      }

      // Khách truy cập hoặc nghệ nhân chưa lưu phiên: hiển thị tab đăng nhập
      setIsRegisterMode(true);
      setAuthTab('login');
      setCurrentArtisan(null);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const refreshArtisanData = async (artisanId: string) => {
    const prods = await artisanPortalService.getProductsByArtisanId(artisanId);
    setProducts(prods);
    const ords = await artisanPortalService.getOrdersForArtisan(artisanId);
    setOrders(ords);
  };

  const handleSelectArtisan = async (artisan: ArtisanProfile) => {
    localStorage.setItem('sacviet_active_artisan_id', artisan.id);
    setCurrentArtisan(artisan);
    setIsRegisterMode(false);
    await refreshArtisanData(artisan.id);
  };

  const handleLookupByPhone = async () => {
    if (!searchPhone.trim()) {
      showToast('Vui lòng nhập số điện thoại để tra cứu!');
      return;
    }
    const found = await artisanPortalService.getArtisanByPhone(searchPhone);
    if (found) {
      localStorage.setItem('sacviet_active_artisan_id', found.id);
      setCurrentArtisan(found);
      setIsRegisterMode(false);
      await refreshArtisanData(found.id);
      showToast(`🎉 Chào mừng ${found.name}!`);
    } else {
      showToast('Không tìm thấy hồ sơ với SĐT này. Vui lòng kiểm tra lại hoặc đăng ký mới!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sacviet_active_artisan_id');
    setCurrentArtisan(null);
    setIsRegisterMode(true);
    setAuthTab('login');
    setSearchParams({});
    showToast('Đã đăng xuất khỏi phiên làm việc.');
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) {
      showToast('Vui lòng nhập tên nghệ nhân và số điện thoại!');
      return;
    }
    if (!regProofUrl) {
      showToast('Vui lòng tải lên ảnh chụp minh chứng làm nghề thực tế!');
      return;
    }

    try {
      const newArtisan = await artisanPortalService.registerArtisan({
        name: regName,
        representative: regIsRep ? (regRepName || 'Con cháu đại diện') : '',
        isRepresentative: regIsRep,
        phone: regPhone,
        village: regVillage || 'Làng nghề truyền thống',
        ethnic: regEthnic,
        bio: `Nghệ nhân ${regName} thuộc làng nghề ${regVillage}.`,
        proofType: regProofType,
        proofUrl: regProofUrl,
        proofDescription: regProofDesc
      });

      const list = await artisanPortalService.getAllArtisans();
      setAllArtisans(list);
      localStorage.setItem('sacviet_active_artisan_id', newArtisan.id);
      setCurrentArtisan(newArtisan);
      setIsRegisterMode(false);
      await refreshArtisanData(newArtisan.id);
      showToast('🎉 Gửi hồ sơ thành công! Đang chờ Ban Quản Trị thẩm định.');
    } catch (error) {
      console.error(error);
      showToast('Lỗi khi gửi hồ sơ đăng ký');
    }
  };

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentArtisan) return;
    if (!newProdName.trim()) {
      showToast('Vui lòng nhập tên sản phẩm');
      return;
    }

    try {
      await artisanPortalService.addArtisanProduct({
        artisanId: currentArtisan.id,
        artisanName: currentArtisan.name,
        name: newProdName,
        ethnic: currentArtisan.ethnic,
        price: Number(newProdPrice),
        stock: Number(newProdStock),
        image: newProdImage,
        heritageStory: newProdStory || 'Sản phẩm thủ công truyền thống chứa đựng tâm huyết của nghệ nhân.',
        craftTimeDays: Number(newProdDays),
        category: newProdCategory
      });

      setIsAddModalOpen(false);
      await refreshArtisanData(currentArtisan.id);
      setActiveTab('pending');
      showToast('✨ Sản phẩm đã được gửi! Đang chờ Admin duyệt để hiển thị.');
      setNewProdName('');
      setNewProdStory('');
    } catch (e) {
      console.error(e);
      showToast('Lỗi thêm sản phẩm');
    }
  };

  const handleStockChange = async (productId: string, currentStock: number, delta: number) => {
    const nextStock = Math.max(0, currentStock + delta);
    await artisanPortalService.updateStock(productId, nextStock);
    if (currentArtisan) {
      await refreshArtisanData(currentArtisan.id);
    }
    showToast(`Đã cập nhật tồn kho: ${nextStock} chiếc`);
  };

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!window.confirm(`Bạn có chắc muốn gỡ sản phẩm "${productName}" khỏi gian hàng?`)) return;
    try {
      await artisanPortalService.deleteProduct(productId);
      if (currentArtisan) {
        await refreshArtisanData(currentArtisan.id);
      }
      showToast(`Đã gỡ sản phẩm "${productName}" khỏi gian hàng`);
    } catch (e) {
      console.error(e);
      showToast('Lỗi khi gỡ sản phẩm');
    }
  };

  const handleMarkOrderReady = (orderCode: string) => {
    showToast(`✅ Đã báo cho bưu tá Bưu điện đến lấy đơn ${orderCode}!`);
  };

  const approvedProducts = products.filter(p => p.status === 'approved');
  const pendingProducts = products.filter(p => p.status === 'pending');
  const totalStockCount = approvedProducts.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-[#FAF7F0] font-display text-text-main pb-20">
      {/* Toast thông báo */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-white text-primary px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border-2 border-gold font-bold text-sm animate-fade-in">
          <span className="material-symbols-outlined text-gold">verified</span>
          {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* TABS CHUYỂN ĐỔI CHÍNH */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border-2 border-gold/30 shadow-md">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {(!currentArtisan || isRegisterMode) ? (
              <button
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-primary text-white shadow-md cursor-default"
              >
                <span className="material-symbols-outlined text-lg">how_to_reg</span>
                Đăng Ký Hồ Sơ Nghệ Nhân
              </button>
            ) : currentArtisan?.status === 'pending' ? (
              <button
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-amber-600 text-white shadow-md cursor-default"
              >
                <span className="material-symbols-outlined text-lg animate-spin">hourglass_top</span>
                Hồ Sơ Đang Chờ Duyệt ({currentArtisan.name})
              </button>
            ) : (
              <button
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-emerald-700 text-white shadow-md cursor-default"
              >
                <span className="material-symbols-outlined text-lg">storefront</span>
                Kênh Quản Lý Gian Hàng ({currentArtisan?.name})
              </button>
            )}

            {currentArtisan && !isRegisterMode && (
              <button
                onClick={handleLogout}
                className="px-3.5 py-3 rounded-xl font-bold text-xs text-stone-600 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 transition-colors flex items-center gap-1.5"
                title="Đăng xuất khỏi tài khoản hiện tại"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                <span className="hidden sm:inline">Đổi tài khoản</span>
              </button>
            )}
          </div>

          <div className="text-xs text-stone-600 font-medium flex items-center gap-1.5">
            {(!currentArtisan || isRegisterMode) ? (
              <span>✨ Đăng ký chỉ 1 phút dành cho Nghệ nhân hoặc Con cháu làm hộ</span>
            ) : currentArtisan?.status === 'pending' ? (
              <span className="text-amber-800 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Hồ sơ đang được Ban Quản Trị thẩm định trong 24h
              </span>
            ) : (
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                Gian hàng đã được bảo chứng Tích Vàng Di Sản
              </span>
            )}
          </div>
        </div>

        {/* HERO BANNER KÊNH BÁN HÀNG */}
        <div 
          className="mt-4 rounded-3xl p-6 md:p-8 border-2 border-gold/40 shadow-xl relative overflow-hidden text-white"
          style={{ 
            backgroundColor: '#781012', 
            backgroundImage: currentArtisan?.status === 'pending' && !isRegisterMode
              ? 'linear-gradient(135deg, #7C2D12 0%, #451A03 100%)'
              : 'linear-gradient(135deg, #8B1A1A 0%, #660C0E 100%)'
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 border border-gold/40 text-gold text-[11px] font-bold uppercase tracking-wider mb-2.5">
                <span className="material-symbols-outlined text-sm text-gold">storefront</span>
                Sắc Việt • Kênh Nghệ Nhân Di Sản
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                {(!currentArtisan || isRegisterMode)
                  ? 'Mở Gian Hàng Cho Nghệ Nhân' 
                  : currentArtisan?.status === 'pending'
                    ? `Hồ Sơ Mở Gian Hàng: ${currentArtisan?.name}`
                    : `Gian Hàng: ${currentArtisan?.name}`
                }
              </h1>

              <p className="text-stone-200 text-xs md:text-sm mt-1.5 max-w-2xl font-serif">
                {(!currentArtisan || isRegisterMode)
                  ? 'Đăng ký nhanh chóng trong 1 phút bằng SĐT và ảnh làm nghề thực tế để nhận Tích Vàng Di Sản.'
                  : currentArtisan?.status === 'pending'
                    ? `${currentArtisan?.village || ''} • Dân tộc ${currentArtisan?.ethnic || ''} (Đang chờ thẩm định, chưa mở bán)`
                    : `${currentArtisan?.village || ''} • Dân tộc ${currentArtisan?.ethnic || ''} ${currentArtisan?.representative ? `(Đại diện hỗ trợ: ${currentArtisan.representative})` : ''}`
                }
              </p>
            </div>

            {!isRegisterMode && currentArtisan ? (
              <div className="flex flex-wrap items-center gap-2">
                {currentArtisan.status === 'approved' ? (
                  <>
                    {/* CHỨNG NHẬN GỌN GÀNG */}
                    <div className="inline-flex items-center gap-1.5 bg-black/35 border border-gold/40 px-2.5 py-1.5 rounded-lg backdrop-blur-sm shrink-0">
                      <span className="material-symbols-outlined text-gold text-base">verified</span>
                      <span className="text-[11px] font-bold text-amber-200 tracking-wide">Di Sản Sắc Việt</span>
                    </div>

                    {/* NÚT ĐĂNG SẢN PHẨM NHỎ GỌN */}
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 hover:brightness-105 text-[#781012] border border-white font-black rounded-lg shadow-sm flex items-center justify-center gap-1.5 uppercase tracking-wide text-xs transition-all active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
                    >
                      <span className="material-symbols-outlined text-base font-black">add_circle</span>
                      <span>Đăng Sản Phẩm</span>
                    </button>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-300/60 px-2.5 py-1.5 rounded-lg backdrop-blur-sm text-amber-200 shrink-0">
                    <span className="material-symbols-outlined text-sm animate-spin">hourglass_empty</span>
                    <span className="text-[11px] font-bold text-white">Chờ Thẩm Định</span>
                  </div>
                )}

                {/* NÚT ĐĂNG XUẤT NHỎ GỌN */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 font-bold rounded-lg text-xs transition-all active:scale-95 flex items-center gap-1 shrink-0"
                  title="Thoát phiên làm việc"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span>Đăng Xuất</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="py-8">
          {isRegisterMode ? (
            <div className="space-y-6">
              {/* THANH CHUYỂN ĐỔI TAB: ĐĂNG KÝ HOẶC ĐĂNG NHẬP */}
              <div className="flex items-center justify-center">
                <div className="bg-white p-1 rounded-xl border border-gold/30 shadow-sm flex items-center gap-1 w-full max-w-xs">
                  <button
                    type="button"
                    onClick={() => setAuthTab('login')}
                    className={`flex-1 py-2 px-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                      authTab === 'login'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-text-soft hover:text-text-main hover:bg-gold/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">login</span>
                    <span>Đăng Nhập SĐT</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthTab('register')}
                    className={`flex-1 py-2 px-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                      authTab === 'register'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-text-soft hover:text-text-main hover:bg-gold/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">how_to_reg</span>
                    <span>Đăng Ký Mới</span>
                  </button>
                </div>
              </div>

              {authTab === 'login' ? (
                /* ====================================================
                    MÀN HÌNH ĐĂNG NHẬP GIAN HÀNG BẰNG SĐT (TỐI ƯU GỌN GÀNG)
                   ==================================================== */
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gold/30 p-5 sm:p-6 animate-fade-in">
                  <div className="text-center mb-5">
                    <span className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-2.5 border border-primary/20 shadow-inner">
                      <span className="material-symbols-outlined text-2xl">storefront</span>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-text-main uppercase tracking-tight">
                      Đăng Nhập Kênh Nghệ Nhân
                    </h2>
                    <p className="text-text-soft text-xs mt-1 font-medium">
                      Nhập số điện thoại đã đăng ký để vào quản lý gian hàng
                    </p>
                  </div>

                  {/* Ô NHẬP SỐ ĐIỆN THOẠI */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-text-main uppercase tracking-wider mb-1.5">
                        Số điện thoại gian hàng
                      </label>
                      <div className="flex items-center h-10 bg-[#FAF7F0] border border-stone-300 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15 rounded-xl px-3 transition-all shadow-inner">
                        <span className="material-symbols-outlined text-primary text-lg shrink-0 select-none flex items-center justify-center leading-none">
                          call
                        </span>
                        <input
                          type="tel"
                          value={searchPhone}
                          onChange={(e) => setSearchPhone(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLookupByPhone(); } }}
                          placeholder="Nhập SĐT (VD: 0988 888 888)..."
                          className="w-full h-full bg-transparent border-none outline-none text-xs sm:text-sm font-bold text-text-main placeholder:font-normal placeholder:text-stone-400 ml-2.5 py-0"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLookupByPhone}
                      className="h-10 w-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base">login</span>
                      <span>Vào Kênh Quản Lý</span>
                    </button>
                  </div>

                  {/* Chuyển qua đăng ký */}
                  <div className="text-center mt-5 pt-4 border-t border-gold/15">
                    <p className="text-xs text-text-soft">
                      Chưa có tài khoản gian hàng?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthTab('register')}
                        className="font-black text-primary hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Đăng ký mới ngay</span>
                        <span>&rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                /* ====================================================
                    MÀN HÌNH ĐĂNG KÝ GIAN HÀNG (GỌN GÀNG, TỐI ƯU MOBILE)
                   ==================================================== */
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gold/30 p-5 sm:p-7 animate-fade-in">
                  <div className="text-center mb-5">
                    <span className="size-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-2 border border-primary/20 shadow-inner">
                      <span className="material-symbols-outlined text-2xl">handshake</span>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-text-main uppercase tracking-tight">
                      Đăng Ký Kênh Bán Hàng
                    </h2>
                    <p className="text-text-soft text-xs mt-0.5">
                      Dành cho Nghệ nhân hoặc Con cháu/Hợp tác xã đại diện làm hộ
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    {/* 1. Ai thao tác */}
                    <div className="bg-[#FAF7F0] p-3.5 sm:p-4 rounded-xl border border-gold/25">
                      <label className="block text-[11px] font-black text-text-main uppercase tracking-wider mb-2">
                        1. Ai là người đang tạo gian hàng này?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => setRegIsRep(false)}
                          className={`p-2.5 rounded-xl border-2 text-left font-bold text-xs transition-all flex items-center gap-2.5 active:scale-[0.99] ${
                            !regIsRep 
                              ? 'border-primary bg-primary/5 text-primary shadow-xs' 
                              : 'border-gold/20 bg-white text-text-soft hover:bg-gold/5'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">{!regIsRep ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                          <div>
                            <div className="font-black text-text-main text-xs">Tôi là Nghệ nhân</div>
                            <div className="text-[10px] text-text-soft font-normal">Tự mình quản lý gian hàng</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRegIsRep(true)}
                          className={`p-2.5 rounded-xl border-2 text-left font-bold text-xs transition-all flex items-center gap-2.5 active:scale-[0.99] ${
                            regIsRep 
                              ? 'border-primary bg-primary/5 text-primary shadow-xs' 
                              : 'border-gold/20 bg-white text-text-soft hover:bg-gold/5'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">{regIsRep ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                          <div>
                            <div className="font-black text-text-main text-xs">Tôi là Con cháu / Người đại diện</div>
                            <div className="text-[10px] text-text-soft font-normal">Hỗ trợ ông bà/bố mẹ bán hàng</div>
                          </div>
                        </button>
                      </div>

                      {regIsRep && (
                        <div className="mt-2.5 pt-2.5 border-t border-gold/15">
                          <label className="block text-[10px] font-bold text-text-soft uppercase tracking-wider mb-1">
                            Tên người đại diện (Con cháu / Cán bộ HTX):
                          </label>
                          <input
                            type="text"
                            value={regRepName}
                            onChange={e => setRegRepName(e.target.value)}
                            placeholder="VD: Nguyễn Văn Nam (Con trai hỗ trợ kỹ thuật)"
                            className="h-9 w-full px-3 bg-white border border-gold/30 rounded-lg text-xs font-bold text-text-main focus:border-primary outline-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* 2. Thông tin nghệ nhân */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-text-main uppercase tracking-wider mb-1">
                          2. Tên Nghệ Nhân <span className="text-primary">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={regName}
                          onChange={e => setRegName(e.target.value)}
                          placeholder="VD: Cụ Y Ban, Bác Đàng Thị Phan..."
                          className="h-9 sm:h-10 w-full px-3 bg-white border border-gold/25 rounded-lg text-xs font-bold text-text-main focus:border-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black text-text-main uppercase tracking-wider mb-1">
                          3. Số điện thoại nhận đơn <span className="text-primary">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          value={regPhone}
                          onChange={e => setRegPhone(e.target.value)}
                          placeholder="0912 xxx xxx (Để nhận tin báo bưu tá)"
                          className="h-9 sm:h-10 w-full px-3 bg-white border border-gold/25 rounded-lg text-xs font-bold text-text-main focus:border-primary outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-text-main uppercase tracking-wider mb-1">
                          4. Dân tộc
                        </label>
                        <input
                          type="text"
                          value={regEthnic}
                          onChange={e => setRegEthnic(e.target.value)}
                          placeholder="VD: Ê Đê, Chăm, H'Mông, Ba Na..."
                          className="h-9 sm:h-10 w-full px-3 bg-white border border-gold/25 rounded-lg text-xs font-bold text-text-main focus:border-primary outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-black text-text-main uppercase tracking-wider mb-1">
                          5. Làng nghề / Địa phương
                        </label>
                        <input
                          type="text"
                          value={regVillage}
                          onChange={e => setRegVillage(e.target.value)}
                          placeholder="VD: Làng dệt thổ cẩm Buôn Tơng Jú"
                          className="h-9 sm:h-10 w-full px-3 bg-white border border-gold/25 rounded-lg text-xs font-bold text-text-main focus:border-primary outline-none"
                        />
                      </div>
                    </div>

                    {/* 6. Minh chứng di sản (GỌN GÀNG, TINH TẾ) */}
                    <div className="bg-[#FAF7F0] p-3.5 sm:p-4 rounded-xl border border-gold/30 shadow-xs space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                            <span className="material-symbols-outlined text-sm">verified_user</span>
                          </span>
                          <label className="text-xs font-black text-text-main uppercase tracking-wider">
                            6. Minh Chứng Làm Nghề Thực Tế (Cấp Tích Vàng Di Sản)
                          </label>
                        </div>
                        <p className="text-[11px] text-text-soft leading-relaxed pl-7.5">
                          Tải ảnh chụp khung cửi, xưởng làm nghề hoặc bằng khen nghệ nhân để Ban Quản Trị thẩm định cấp Tích Vàng.
                        </p>
                      </div>

                      {/* Chọn loại minh chứng */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'workshop', label: 'Khung Cửi / Xưởng Làm Nghề', icon: 'precision_manufacturing' },
                          { id: 'certificate', label: 'Bằng Khen / Chứng Nhận OCOP', icon: 'workspace_premium' },
                          { id: 'id_village', label: 'CCCD / Xác Nhận Buôn Làng', icon: 'badge' }
                        ].map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setRegProofType(t.id as any)}
                            className={`p-2 rounded-lg border-2 text-left transition-all flex items-center gap-2 active:scale-[0.99] ${
                              regProofType === t.id
                                ? 'border-primary bg-white text-primary shadow-xs font-bold'
                                : 'border-gold/20 bg-white/70 text-text-soft hover:bg-white text-xs font-medium'
                            }`}
                          >
                            <span className="material-symbols-outlined text-base shrink-0">{t.icon}</span>
                            <span className="text-[11px] leading-snug">{t.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* KHU VỰC TẢI ẢNH THẬT TỪ THIẾT BỊ / CHỤP ẢNH TRỰC TIẾP */}
                      <input
                        type="file"
                        ref={proofFileInputRef}
                        accept="image/*"
                        onChange={handleProofFileUpload}
                        className="hidden"
                      />

                      <div
                        onClick={() => proofFileInputRef.current?.click()}
                        className="border border-dashed border-primary/50 hover:border-primary bg-white hover:bg-primary/5 rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all group shadow-xs flex flex-col items-center justify-center active:scale-[0.99]"
                      >
                        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform border border-primary/20">
                          <span className="material-symbols-outlined text-xl">
                            {isUploadingProof ? 'hourglass_top' : 'add_a_photo'}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-primary uppercase tracking-wide">
                          {isUploadingProof ? 'Đang Xử Lý Ảnh...' : 'Bấm Vào Đây Để Tải Ảnh Lên Hoặc Chụp Ảnh Trực Tiếp'}
                        </div>
                        <p className="text-[11px] text-text-soft mt-0.5 max-w-sm mx-auto">
                          Hỗ trợ ảnh JPG, PNG, WEBP từ điện thoại và máy tính
                        </p>
                        <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-gold/15 text-[#8B1A1A] text-[10px] font-bold border border-gold/30">
                          <span className="material-symbols-outlined text-xs text-gold-dark">verified</span>
                          <span>Ban Quản Trị Sắc Việt thẩm định & cấp Tích Vàng trong 24h</span>
                        </div>
                      </div>

                      {/* PREVIEW ẢNH MINH CHỨNG ĐÃ CHỌN HOẶC TẢI LÊN */}
                      {regProofUrl && (
                        <div className="p-2.5 bg-white rounded-xl border border-emerald-500/40 shadow-xs flex items-center gap-3 animate-fade-in">
                          <div className="relative group shrink-0">
                            <img
                              src={regProofUrl}
                              alt="Minh chứng"
                              className="size-14 sm:size-16 rounded-lg object-cover border border-gold/30"
                            />
                            <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow text-[10px]">
                              ✓
                            </span>
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 uppercase tracking-wide mb-0.5">
                              <span className="material-symbols-outlined text-xs">task_alt</span>
                              Ảnh Minh Chứng Đã Sẵn Sàng
                            </div>
                            <p className="text-xs font-bold text-text-main truncate">{regProofDesc}</p>
                            <p className="text-[10px] text-text-soft truncate">
                              {proofFileName ? `Tệp: ${proofFileName}` : 'Ảnh minh chứng thực tế'}
                            </p>
                            <button
                              type="button"
                              onClick={() => proofFileInputRef.current?.click()}
                              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5 mt-1"
                            >
                              <span className="material-symbols-outlined text-xs">photo_camera</span>
                              Đổi ảnh khác
                            </button>
                          </div>
                        </div>
                      )}


                    </div>

                    {/* Nút gửi form nhỏ gọn */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2 border-t border-gold/15">
                      <button
                        type="button"
                        onClick={() => setAuthTab('login')}
                        className="h-9 sm:h-9.5 px-3.5 border border-stone-200 hover:border-gold/40 rounded-lg text-xs font-bold text-text-soft hover:bg-gold/10 uppercase tracking-wider transition-all"
                      >
                        Đã có tài khoản? Đăng nhập
                      </button>
                      <button
                        type="submit"
                        className="h-9 sm:h-9.5 px-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-sm">send</span>
                        <span>Gửi Hồ Sơ Xét Duyệt</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ) : currentArtisan?.status === 'pending' ? (
            /* ====================================================
                MÀN HÌNH CHỜ XÉT DUYỆT (PENDING APPROVAL SCREEN)
                - CHỈ HIỆN THỊ TRẠNG THÁI HỒ SƠ
                - TUYỆT ĐỐI KHÔNG HIỂN THỊ KHO HÀNG, ĐƠN HÀNG KHI CHƯA DUYỆT
               ==================================================== */
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border-2 border-amber-300 p-6 md:p-10 animate-fade-in space-y-6">
              {/* Icon và Tiêu đề */}
              <div className="text-center pb-6 border-b border-gold/20">
                <div className="size-20 bg-amber-500/10 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-amber-400/40 shadow-inner">
                  <span className="material-symbols-outlined text-4xl animate-pulse">hourglass_top</span>
                </div>
                
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black uppercase tracking-wider mb-2.5 shadow-sm">
                  <span className="material-symbols-outlined text-sm text-amber-700">pending_actions</span>
                  Trạng Thái: Đang Chờ Thẩm Định Hồ Sơ
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-text-main uppercase tracking-tight">
                  Hồ Sơ Mở Gian Hàng Đang Chờ Phê Duyệt
                </h2>
                <p className="text-text-soft text-xs md:text-sm mt-2 max-w-xl mx-auto font-medium leading-relaxed">
                  Để bảo vệ uy tín cho nghệ nhân và bảo tồn đúng bản sắc văn hóa di sản, Ban Quản Trị Sắc Việt đang tiến hành thẩm định ảnh minh chứng làm nghề và sẽ cấp Tích Vàng trong vòng 24 giờ.
                </p>
              </div>

              {/* QUY TRÌNH 3 BƯỚC MINH BẠCH */}
              <div className="py-2">
                <div className="text-xs font-black uppercase tracking-wider text-text-main mb-4 text-center">
                  Quy Trình Kích Hoạt Kênh Bán Hàng Di Sản
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Bước 1 */}
                  <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-start gap-3 shadow-sm">
                    <div className="size-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                      ✓
                    </div>
                    <div>
                      <div className="text-xs font-black text-emerald-950 uppercase">1. Nộp Hồ Sơ</div>
                      <div className="text-[11px] text-emerald-800 mt-0.5 font-medium">Đã tiếp nhận thông tin và ảnh minh chứng làm nghề.</div>
                    </div>
                  </div>

                  {/* Bước 2 */}
                  <div className="bg-amber-50 border-2 border-amber-400 p-4 rounded-2xl flex items-start gap-3 shadow-md relative">
                    <div className="size-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 animate-bounce">
                      2
                    </div>
                    <div>
                      <div className="text-xs font-black text-amber-950 uppercase flex items-center gap-1.5">
                        <span>2. Thẩm Định Di Sản</span>
                        <span className="size-2 rounded-full bg-amber-500 animate-ping"></span>
                      </div>
                      <div className="text-[11px] text-amber-900 mt-0.5 font-medium">Admin đang kiểm tra minh chứng xưởng/chứng nhận.</div>
                    </div>
                  </div>

                  {/* Bước 3 */}
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-start gap-3 opacity-60">
                    <div className="size-8 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center font-black text-xs shrink-0">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-black text-stone-700 uppercase">3. Kích Hoạt Kênh</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">Đăng bán sản phẩm, kết nối bưu tá và quản lý kho hàng.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHI TIẾT HỒ SƠ VỪA NỘP */}
              <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-gold/25 space-y-4">
                <div className="text-xs font-black uppercase text-primary tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">badge</span>
                  Thông Tin Hồ Sơ Đã Gửi
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-text-soft block text-[11px]">Nghệ nhân:</span>
                    <strong className="text-text-main text-sm font-black">{currentArtisan.name}</strong>
                  </div>

                  <div>
                    <span className="text-text-soft block text-[11px]">Người đại diện (Con cháu/HTX):</span>
                    <strong className="text-text-main font-bold">
                      {currentArtisan.representative || 'Chính nghệ nhân tự đăng ký'}
                    </strong>
                  </div>

                  <div>
                    <span className="text-text-soft block text-[11px]">Số điện thoại xác minh:</span>
                    <strong className="text-text-main font-bold">{currentArtisan.phone}</strong>
                  </div>

                  <div>
                    <span className="text-text-soft block text-[11px]">Làng nghề & Dân tộc:</span>
                    <strong className="text-text-main font-bold">
                      {currentArtisan.village} • Dân tộc {currentArtisan.ethnic}
                    </strong>
                  </div>
                </div>

                {/* Minh chứng đã gửi */}
                <div className="pt-3 border-t border-gold/15">
                  <span className="text-text-soft block text-[11px] mb-2 font-medium">Ảnh minh chứng đã gửi:</span>
                  <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gold/20">
                    <img
                      src={currentArtisan.proofUrl}
                      alt="Minh chứng"
                      className="size-16 rounded-lg object-cover border border-gold/30 shrink-0"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-text-main">
                        {currentArtisan.proofType === 'workshop' ? 'Ảnh xưởng thủ công / Khung cửi làm nghề' : currentArtisan.proofType === 'certificate' ? 'Giấy chứng nhận / Bằng khen nghệ nhân' : 'Chứng thực chính quyền địa phương'}
                      </div>
                      <div className="text-[11px] text-text-soft italic mt-0.5">
                        "{currentArtisan.proofDescription}"
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HÀNH ĐỘNG HỖ TRỢ */}
              <div className="pt-3 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setIsRegisterMode(true)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Chỉnh sửa lại hồ sơ
                  </button>

                  <Link
                    to="/"
                    className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 font-bold text-xs rounded-lg transition-colors"
                  >
                    Về Trang Chủ
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold text-xs rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Đăng Xuất
                  </button>
                </div>

                <Link
                  to="/admin/artisan-approvals"
                  className="px-3.5 py-1.5 bg-stone-900 hover:bg-black text-gold border border-gold/40 font-black text-xs uppercase tracking-wider rounded-lg shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                  title="Vào trang quản trị thẩm định hồ sơ để kích hoạt kênh bán hàng"
                >
                  <span className="material-symbols-outlined text-sm text-gold">admin_panel_settings</span>
                  <span>Kênh Quản Trị Thẩm Định &rarr;</span>
                </Link>
              </div>
            </div>
          ) : (
            /* ====================================================
                BẢNG ĐIỀU KHIỂN GIAN HÀNG ĐÃ DUYỆT (APPROVED SELLER DASHBOARD)
                - CHỈ XUẤT HIỆN KHI ĐÃ ĐƯỢC DUYỆT
               ==================================================== */
            <div className="space-y-6 animate-fade-in">

              {/* 3 THẺ THỐNG KÊ (THIẾT KẾ SÁNG, TRANG NHÃ) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {/* Thẻ 1: Tồn kho */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-gold/30 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="text-[11px] font-black text-text-soft uppercase tracking-wider">📦 Hàng Tồn Kho Sẵn Có</div>
                    <div className="text-3xl md:text-4xl font-black text-primary mt-1.5">
                      {totalStockCount} <span className="text-sm font-normal text-text-soft">sản phẩm</span>
                    </div>
                    <div className="text-[11px] text-text-soft mt-1">Đang sẵn sàng đóng gói giao ngay</div>
                  </div>
                  <div className="size-13 rounded-2xl bg-primary/10 text-primary flex items-center justify-center p-3">
                    <span className="material-symbols-outlined text-3xl">inventory_2</span>
                  </div>
                </div>

                {/* Thẻ 2: Đơn hàng */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-gold/30 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="text-[11px] font-black text-text-soft uppercase tracking-wider">🛒 Đơn Hàng Cần Giao</div>
                    <div className="text-3xl md:text-4xl font-black text-gold-dark mt-1.5">
                      {totalOrdersCount} <span className="text-sm font-normal text-text-soft">đơn</span>
                    </div>
                    <div className="text-[11px] text-text-soft mt-1">Bưu tá Bưu điện sẵn sàng đến nhận</div>
                  </div>
                  <div className="size-13 rounded-2xl bg-gold/10 text-gold-dark flex items-center justify-center p-3">
                    <span className="material-symbols-outlined text-3xl">local_shipping</span>
                  </div>
                </div>

                {/* Thẻ 3: Doanh thu */}
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-gold/30 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="text-[11px] font-black text-text-soft uppercase tracking-wider">💰 Doanh Thu Tạm Tính</div>
                    <div className="text-2xl md:text-3xl font-black text-green-700 mt-1.5">
                      {totalRevenue.toLocaleString('vi-VN')} <span className="text-sm font-normal">đ</span>
                    </div>
                    <div className="text-[11px] text-text-soft mt-1">Sẽ chuyển vào tài khoản ngân hàng</div>
                  </div>
                  <div className="size-13 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center p-3">
                    <span className="material-symbols-outlined text-3xl">payments</span>
                  </div>
                </div>
              </div>

              {/* THANH TAB ĐIỀU HƯỚNG */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold/25 pb-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('selling')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeTab === 'selling'
                        ? 'bg-primary text-white shadow-sm border border-gold/30'
                        : 'bg-white text-stone-700 hover:bg-gold/10 border border-gold/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Sản Phẩm Đang Bán ({approvedProducts.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeTab === 'pending'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-gold/10 border border-gold/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                    Chờ Admin Duyệt ({pendingProducts.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      activeTab === 'orders'
                        ? 'bg-stone-800 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-gold/10 border border-gold/20'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">receipt_long</span>
                    Đơn Hàng Của Tôi ({orders.length})
                  </button>
                </div>

                {currentArtisan?.status === 'approved' && (
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:brightness-110 shadow-sm flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    Thêm Sản Phẩm
                  </button>
                )}
              </div>

              {/* TAB 1: SẢN PHẨM ĐANG BÁN */}
              {activeTab === 'selling' && (
                <div>
                  {approvedProducts.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-gold/25 text-center shadow-sm">
                      <span className="material-symbols-outlined text-5xl text-gold/40 mb-3 block">inventory</span>
                      <h3 className="font-bold text-text-main text-base">Chưa có sản phẩm nào đang bán</h3>
                      <p className="text-text-soft text-xs mt-1">Bấm "Thêm Sản Phẩm" để đăng bán món đồ thủ công đầu tiên.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {approvedProducts.map(product => (
                        <div 
                          key={product.id}
                          className="bg-white rounded-2xl border border-gold/25 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-all"
                        >
                          <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                            <div className="absolute top-2.5 right-2.5 bg-emerald-700 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">verified</span>
                              Đang bán
                            </div>
                            <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-gold text-[10px] font-bold px-2 py-0.5 rounded-md">
                              Đã bán: {product.sold || 0}
                            </div>
                          </div>

                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-bold text-text-main text-sm line-clamp-1">{product.name}</h4>
                              <p className="text-primary font-black text-base mt-0.5">{product.price.toLocaleString('vi-VN')} đ</p>
                              <p className="text-text-soft text-xs font-serif line-clamp-2 mt-2 italic bg-[#FAF7F0] p-2 rounded-lg border border-gold/15">
                                "{product.heritageStory}"
                              </p>
                            </div>

                            {/* BỘ ĐIỀU CHỈNH TỒN KHO NHẸ NHÀNG, DỄ DÙNG */}
                            <div className="mt-4 pt-3 border-t border-gold/15">
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-bold text-text-soft uppercase tracking-wider text-[10px]">Tồn kho sẵn có:</span>
                                <span className={`font-black text-xs ${product.stock <= 2 ? 'text-red-600' : 'text-stone-800'}`}>
                                  {product.stock > 0 ? `${product.stock} chiếc` : 'Hết hàng'}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleStockChange(product.id, product.stock, -1)}
                                  className="size-8 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-bold text-sm flex items-center justify-center active:scale-95 transition-transform"
                                  title="Giảm 1 chiếc"
                                >
                                  -
                                </button>
                                <div className="flex-1 text-center font-bold text-xs bg-[#FAF7F0] py-1.5 rounded-lg border border-gold/25">
                                  {product.stock} chiếc
                                </div>
                                <button
                                  onClick={() => handleStockChange(product.id, product.stock, 1)}
                                  className="size-8 bg-primary hover:brightness-110 text-white rounded-lg font-bold text-sm flex items-center justify-center active:scale-95 transition-transform shadow-sm"
                                  title="Vừa làm thêm 1 chiếc"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-[10px] text-text-soft text-center mt-1">
                                (Bấm <span className="font-bold text-primary">+</span> khi vừa làm xong thêm hàng)
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-dashed border-stone-200 flex items-center justify-between gap-2">
                                <a
                                  href="#/marketplace"
                                  className="text-[11px] font-bold text-primary hover:text-primary/80 flex items-center gap-1 group"
                                  title="Xem sản phẩm này hiển thị trên Chợ Phiên Sắc Việt"
                                >
                                  <span>Xem trên Chợ Phiên</span>
                                  <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProduct(product.id, product.name)}
                                  className="text-[10px] font-medium text-stone-400 hover:text-red-600 transition-colors"
                                >
                                  Gỡ sản phẩm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SẢN PHẨM CHỜ ADMIN DUYỆT */}
              {activeTab === 'pending' && (
                <div>
                  {pendingProducts.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-gold/25 text-center shadow-sm">
                      <span className="material-symbols-outlined text-4xl text-amber-500/40 mb-2 block">hourglass_empty</span>
                      <h3 className="font-bold text-text-main text-base">Không có sản phẩm nào đang chờ duyệt</h3>
                      <p className="text-text-soft text-xs mt-1">Mọi sản phẩm của bạn đã được phê duyệt và hiển thị trên sàn.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendingProducts.map(product => (
                        <div key={product.id} className="bg-white p-4 rounded-2xl border border-amber-300 shadow-sm flex gap-4 items-center">
                          <img src={product.image} alt={product.name} className="size-20 object-cover rounded-xl border border-gold/20 shrink-0" />
                          <div className="flex-1">
                            <span className="inline-block bg-amber-100 text-amber-800 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full mb-1">
                              ⏳ Chờ Admin Thẩm Định
                            </span>
                            <h4 className="font-bold text-text-main text-sm">{product.name}</h4>
                            <div className="text-primary font-black text-sm mt-0.5">{product.price.toLocaleString('vi-VN')} đ</div>
                            <div className="text-text-soft text-xs mt-0.5">Số lượng đăng: <span className="font-bold text-text-main">{product.stock} chiếc</span></div>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                              <span className="text-[10px] text-amber-700 font-medium italic">Admin duyệt trong 24h</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                className="text-[10px] font-medium text-stone-400 hover:text-red-600"
                              >
                                Hủy yêu cầu
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ĐƠN HÀNG CỦA TÔI */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.orderId} className="bg-white rounded-2xl border border-gold/25 p-5 shadow-sm space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold/15 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-primary text-xs">{order.orderCode}</span>
                          <span className="text-xs text-text-soft">• {new Date(order.createdAt).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-800 font-bold text-[10px] uppercase rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">local_shipping</span>
                          Bưu tá Bưu điện sẽ đến nhận
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-[#FAF7F0] p-3 rounded-xl border border-gold/10 text-xs space-y-1">
                          <div className="text-[10px] uppercase font-bold text-text-soft">Khách nhận:</div>
                          <div className="font-bold text-text-main">{order.customerName}</div>
                          <div className="text-text-soft font-mono">{order.customerPhone}</div>
                          <div className="text-text-soft">{order.customerAddress}</div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between gap-3 p-2 bg-[#FAF7F0] rounded-xl">
                              <div className="flex items-center gap-3">
                                <img src={it.image} alt={it.productName} className="size-10 rounded-lg object-cover border border-gold/20" />
                                <div>
                                  <div className="font-bold text-xs text-text-main">{it.productName}</div>
                                  <div className="text-text-soft text-[11px]">Số lượng: <span className="font-bold text-primary">x{it.quantity}</span></div>
                                </div>
                              </div>
                              <div className="font-bold text-primary text-xs">
                                {(it.price * it.quantity).toLocaleString('vi-VN')} đ
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-bold text-text-soft">Tổng thu về từ đơn này:</span>
                            <span className="text-base font-black text-primary">{order.totalAmount.toLocaleString('vi-VN')} đ</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-2">
                        <button
                          onClick={() => handleMarkOrderReady(order.orderCode)}
                          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-bold text-xs rounded-xl shadow-sm uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-transform"
                        >
                          <span className="material-symbols-outlined text-sm">check</span>
                          Đã Gói Xong Hàng - Báo Bưu Tá
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL THÊM SẢN PHẨM MỚI (DÙNG ẢNH THẬT TỪ DATABASE) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border-2 border-gold/30 animate-scale-up">
            <div className="p-5 border-b border-gold/20 flex items-center justify-between bg-[#FAF7F0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">add_box</span>
                <h3 className="font-black text-text-main text-base uppercase tracking-tight">Đăng Sản Phẩm Thủ Công Mới</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="size-8 rounded-full bg-white text-text-soft hover:text-red-600 flex items-center justify-center shadow-sm border border-gold/20"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <label className="block text-xs font-black text-text-main uppercase tracking-wider mb-1">
                  1. Tên Sản Phẩm <span className="text-primary">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  placeholder="VD: Khăn dệt thổ cẩm hoa văn K'tơh, Bình gốm Bàu Trúc..."
                  className="w-full p-2.5 bg-[#FAF7F0] border border-gold/25 rounded-xl text-xs font-bold text-text-main focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-text-main uppercase tracking-wider mb-1">
                    2. Giá Bán (VNĐ) <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="1000"
                    step="1000"
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF7F0] border border-gold/25 rounded-xl text-xs font-black text-primary focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-text-main uppercase tracking-wider mb-1">
                    3. Số Lượng Làm Ra Có Sẵn (Tồn kho) <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={newProdStock}
                    onChange={e => setNewProdStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#FAF7F0] border border-gold/25 rounded-xl text-xs font-black text-text-main focus:border-primary outline-none"
                  />
                </div>
              </div>

              {/* 4. Ảnh sản phẩm thủ công */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-text-main uppercase tracking-wider">
                    4. Ảnh Sản Phẩm Thật <span className="text-primary">*</span>
                  </label>
                  <span className="text-[11px] text-text-soft font-medium">Bắt buộc ảnh sản phẩm thực tế</span>
                </div>

                <input
                  type="file"
                  ref={prodFileInputRef}
                  accept="image/*"
                  onChange={handleProdFileUpload}
                  className="hidden"
                />

                {/* Nút bấm tải ảnh từ máy */}
                <div
                  onClick={() => prodFileInputRef.current?.click()}
                  className="border-2 border-dashed border-primary/40 hover:border-primary bg-[#FAF7F0] hover:bg-primary/5 rounded-2xl p-4 text-center cursor-pointer transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined text-2xl text-primary">
                    {isUploadingProd ? 'hourglass_top' : 'add_photo_alternate'}
                  </span>
                  <div className="text-left">
                    <div className="text-xs font-black text-primary uppercase tracking-wide">
                      {isUploadingProd ? 'Đang Xử Lý Ảnh...' : 'Tải Ảnh Sản Phẩm Từ Điện Thoại / Máy Tính'}
                    </div>
                    <div className="text-[10px] text-text-soft">Chụp trực tiếp hoặc chọn từ thư viện ảnh trên máy</div>
                  </div>
                </div>

                {/* Xem trước ảnh sản phẩm */}
                {newProdImage && (
                  <div className="p-3 bg-white rounded-xl border-2 border-primary/30 flex items-center gap-3">
                    <img src={newProdImage} alt="Xem trước" className="size-16 object-cover rounded-lg border border-gold/30 shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="text-xs font-black text-emerald-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Ảnh sản phẩm đã được chọn
                      </div>
                      <div className="text-[11px] text-text-soft mt-0.5">
                        {prodFileName ? `Tệp: ${prodFileName}` : 'Ảnh mẫu từ kho dữ liệu Sắc Việt'}
                      </div>
                      <button
                        type="button"
                        onClick={() => prodFileInputRef.current?.click()}
                        className="text-[11px] font-bold text-primary hover:underline mt-1"
                      >
                        Đổi ảnh khác từ máy
                      </button>
                    </div>
                  </div>
                )}

                {/* Hoặc chọn mẫu có sẵn */}
                <div>
                  <div className="text-[11px] font-bold text-text-soft uppercase tracking-wider mb-2">
                    Hoặc chọn nhanh từ kho ảnh sản phẩm Sắc Việt:
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {REAL_PRODUCT_PHOTOS.map((sp, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setNewProdImage(sp.url);
                          setProdFileName('');
                        }}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all p-1 bg-[#FAF7F0] ${
                          newProdImage === sp.url ? 'border-primary ring-2 ring-primary/20 bg-white' : 'border-gold/20 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={sp.url} alt={sp.label} className="w-full h-14 object-cover rounded-lg" />
                        <div className="text-[9px] font-bold text-text-main mt-1 truncate text-center">{sp.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Câu chuyện hoa văn di sản */}
              <div>
                <label className="block text-xs font-black text-text-main uppercase tracking-wider mb-1">
                  5. Ý Nghĩa Hoa Văn / Câu Chuyện Di Sản
                </label>
                <textarea
                  rows={2}
                  value={newProdStory}
                  onChange={e => setNewProdStory(e.target.value)}
                  placeholder="Kể ngắn gọn về ý nghĩa hoa văn, kỹ thuật dệt hoặc nặn gốm thủ công..."
                  className="w-full p-2.5 bg-[#FAF7F0] border border-gold/25 rounded-xl text-xs font-serif text-text-main focus:border-primary outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gold/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gold/20 rounded-xl text-xs font-bold text-text-soft hover:bg-gold/10 uppercase"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white font-black text-xs rounded-xl shadow-md hover:brightness-110 uppercase tracking-wider flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  Gửi Duyệt Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanPortal;
