import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { seoService, SeoArticle } from '../services/seoService.ts';

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<SeoArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await seoService.getAllArticles();
        setArticles(data || []);
      } catch (error) {
        console.error('Lỗi tải bài viết:', error);
      }
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) return articles;
    const term = searchTerm.toLowerCase();
    return articles.filter(a => a.tieu_de.toLowerCase().includes(term) || a.mo_ta_ngan.toLowerCase().includes(term));
  }, [articles, searchTerm]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  // Tính số phút đọc tự động dựa trên độ dài nội dung
  const getReadTime = (content: string) => {
    if (!content) return 1;
    const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    const mins = Math.ceil(words / 200); 
    return mins > 0 ? mins : 1;
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-display py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black text-text-main italic mb-4 uppercase tracking-tighter">
            Chuyện <span className="text-gold">Bản Làng</span>
          </h1>
          <p className="text-text-soft font-medium max-w-2xl mx-auto md:text-lg mb-8">
            Khám phá những góc nhìn sâu sắc, câu chuyện văn hóa và kiến thức di sản của 54 dân tộc anh em.
          </p>
          
          {/* THANH TÌM KIẾM BÀI VIẾT */}
          <div className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gold group-hover:text-primary transition-colors">search</span>
            </div>
            <input 
              type="text" 
              placeholder="Tìm kiếm bài viết..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-gold/20 rounded-full py-3 pl-12 pr-6 text-text-main focus:outline-none focus:border-primary transition-colors shadow-sm" 
            />
          </div>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white/50 rounded-3xl h-96 animate-pulse border border-gold/10"></div>
            ))}
          </div>
        ) : visibleArticles.length === 0 ? (
          <div className="text-center py-20 text-text-soft">Không tìm thấy bài viết nào phù hợp.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {visibleArticles.map((article) => (
                <Link 
                  to={`/blog/${article.slug}`} 
                  key={article.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gold/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full animate-fade-in"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={article.anh_bia || 'https://placehold.co/600x400'} 
                      alt={article.tieu_de} 
                      className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                      Di sản
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="material-symbols-outlined text-[14px] text-bronze">schedule</span>
                       <span className="text-[10px] font-bold text-bronze uppercase tracking-widest">{getReadTime(article.noi_dung)} phút đọc</span>
                    </div>
                    <h2 className="text-xl font-black text-text-main mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                      {article.tieu_de}
                    </h2>
                    <p className="text-sm text-text-soft mb-4 line-clamp-3 leading-relaxed flex-1">
                      {article.mo_ta_ngan}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                      <span className="text-[10px] font-bold text-text-main uppercase tracking-widest border border-gold/30 px-2 py-1 rounded-md">{article.tac_gia}</span>
                      <span className="text-[10px] font-bold text-primary flex items-center gap-1 group-hover:underline">
                        Đọc tiếp <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* NÚT TẢI THÊM */}
            {visibleCount < filteredArticles.length && (
              <div className="text-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="px-8 py-3 rounded-full border-2 border-primary text-primary font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
                >
                  Tải thêm bài viết
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`@keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }`}</style>
    </div>
  );
};

export default Blog;