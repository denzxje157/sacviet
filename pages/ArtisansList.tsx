import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { artisanData, Artisan } from '../data/artisanData';

const ArtisansList: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('TẤT CẢ');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const regions = useMemo(() => {
    const list = Array.from(new Set(artisanData.map(a => a.region)));
    return ['TẤT CẢ', ...list];
  }, []);

  const filteredArtisans = useMemo(() => {
    let list = artisanData;
    if (selectedRegion !== 'TẤT CẢ') {
      list = list.filter(a => a.region === selectedRegion);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.ethnic.toLowerCase().includes(q) ||
        a.village.toLowerCase().includes(q) ||
        a.craftType.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedRegion, searchTerm]);

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-display text-text-main pb-24">
      
      {/* 🌟 HERO BANNER */}
      <section className="relative bg-gradient-to-b from-[#8B1A1A] to-[#631212] text-white pt-12 pb-20 md:pb-28 overflow-hidden border-b-4 border-gold">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.2),transparent_70%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/40 text-gold-light text-xs font-black uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">front_hand</span>
            BẢN SẮC TRONG TỪNG NÉT THỦ CÔNG
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Những Bàn Tay Vàng <span className="text-gold italic">Di Sản</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            Nơi mỗi tác phẩm gắn liền với tên tuổi, buôn làng cội nguồn, ý nghĩa hoa văn thiêng liêng và hàng chục ngày lao động mồ hôi của nghệ nhân bản địa.
          </p>

          {/* UVP BANNER - THỨ SHOPEE KHÔNG CÓ */}
          <div className="pt-4 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-gold/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">person_pin</span>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-gold">Danh Tính Minh Bạch</h4>
                  <p className="text-[11px] text-white/80">Tên thật, buôn làng thật, bảo chứng OCOP.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">auto_stories</span>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-gold">Ý Nghĩa Hoa Văn</h4>
                  <p className="text-[11px] text-white/80">Giải mã mật mã văn hóa từng nét dệt/nặn.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gold/20 text-gold flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-gold">Thương Mại Công Bằng</h4>
                  <p className="text-[11px] text-white/80">Thu nhập trực tiếp nuôi sống gia đình nghệ nhân.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl border border-gold/20 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search box */}
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gold">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm theo tên nghệ nhân, dân tộc, buôn làng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background-light border border-gold/20 rounded-2xl text-xs md:text-sm font-medium focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border ${
                  selectedRegion === reg
                    ? 'bg-primary text-white border-primary shadow-md scale-105'
                    : 'bg-background-light text-text-soft border-gold/10 hover:border-gold/40'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ARTISANS GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white rounded-3xl border-2 border-gold/20 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group relative"
            >
              {/* Header Image with Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-3 left-3 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-gold/30 shadow-md">
                  Dân tộc {artisan.ethnic}
                </div>

                {artisan.ocopLevel && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                    ★ OCOP {artisan.ocopLevel}★
                  </div>
                )}

                <div className="absolute bottom-3 left-4 right-4 text-white text-left">
                  <span className="text-gold text-[10px] font-black uppercase tracking-wider block">
                    {artisan.title}
                  </span>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {artisan.name}
                  </h3>
                  <p className="text-xs text-white/80 truncate mt-0.5">
                    {artisan.village}
                  </p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Craft type & Quote */}
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wide mb-2">
                    <span className="material-symbols-outlined text-base">handyman</span>
                    <span>{artisan.craftType}</span>
                  </div>
                  <blockquote className="text-xs text-text-soft italic line-clamp-2 border-l-2 border-gold pl-2">
                    "{artisan.quote}"
                  </blockquote>
                </div>

                {/* Key Metrics preview */}
                <div className="grid grid-cols-2 gap-2 bg-background-light p-3 rounded-2xl border border-gold/15 text-[11px]">
                  <div>
                    <span className="text-text-soft text-[10px] block font-bold">THỜI GIAN LÀM:</span>
                    <span className="text-primary font-black">{artisan.metrics[0].value}</span>
                  </div>
                  <div>
                    <span className="text-text-soft text-[10px] block font-bold">KINH NGHIỆM:</span>
                    <span className="text-primary font-black">{artisan.yearsOfCraft} năm giữ nghề</span>
                  </div>
                </div>

                {/* Motifs preview */}
                <div>
                  <span className="text-[10px] font-black uppercase text-text-soft block mb-1.5">
                    HOA VĂN ĐẶC TRƯNG:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {artisan.motifs.slice(0, 3).map((m, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-gold/30 text-[10px] font-bold text-text-main px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-2xs"
                      >
                        <span>{m.symbol}</span>
                        <span>{m.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <Link
                    to={`/artisan/${artisan.id}`}
                    className="w-full py-3.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                  >
                    <span>Vào trang nghệ nhân</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ArtisansList;
