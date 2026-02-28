import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { seoService, SeoArticle } from '../services/seoService.ts';

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<SeoArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await seoService.getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error('Lỗi tải bài viết:', error);
      }
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F3E9] font-display py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black text-text-main italic mb-4 uppercase tracking-tighter">
            Chuyện <span className="text-gold">Bản Làng</span>
          </h1>
          <p className="text-text-soft font-medium max-w-2xl mx-auto md:text-lg">
            Khám phá những góc nhìn sâu sắc, câu chuyện văn hóa và kiến thức di sản của 54 dân tộc anh em.
          </p>
        </header>

        {isLoading ? (
          <div className="text-center py-20 text-gold font-black animate-pulse">Đang tải bài viết...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 text-text-soft">Chưa có bài viết nào được xuất bản.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                to={`/blog/${article.slug}`} 
                key={article.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gold/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
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
                  <h2 className="text-xl font-black text-text-main mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                    {article.tieu_de}
                  </h2>
                  <p className="text-sm text-text-soft mb-4 line-clamp-3 leading-relaxed flex-1">
                    {article.mo_ta_ngan}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gold/10">
                    <span className="text-[10px] font-bold text-bronze uppercase tracking-widest">{article.tac_gia}</span>
                    <span className="text-[10px] font-bold text-primary flex items-center gap-1 group-hover:underline">
                      Đọc tiếp <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;