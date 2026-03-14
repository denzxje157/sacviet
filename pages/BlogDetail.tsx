import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { seoService, SeoArticle } from '../services/seoService.ts';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<SeoArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SeoArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticleAndRelated = async () => {
      if (!slug) return;
      window.scrollTo(0, 0); // Tự động cuộn lên đầu khi đổi bài
      setIsLoading(true);
      try {
        const data = await seoService.getArticleBySlug(slug);
        if (data) {
          setArticle(data);
          document.title = `${data.tieu_de} | Sắc Việt`;
          
          // Tải thêm bài viết liên quan
          const allData = await seoService.getAllArticles();
          if (allData) {
            // Lọc bỏ bài hiện tại và lấy random 3 bài
            const filtered = allData.filter(a => a.id !== data.id);
            setRelatedArticles(filtered.slice(0, 3));
          }
        } else {
          navigate('/blog'); 
        }
      } catch (error) {
        console.error('Lỗi tải chi tiết bài viết:', error);
      }
      setIsLoading(false);
    };
    fetchArticleAndRelated();
  }, [slug, navigate]);

  const getReadTime = (content: string) => {
    if (!content) return 1;
    const words = content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    return Math.ceil(words / 200) || 1;
  };

  if (isLoading) return <div className="min-h-screen flex justify-center items-center font-black text-gold animate-pulse text-xl">Đang tải bài viết...</div>;
  if (!article) return null;

  return (
    <article className="min-h-screen bg-[#F7F3E9] font-display pb-20">
      <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
        <img src={article.anh_bia} alt={article.tieu_de} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-5xl mx-auto animate-fade-in">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-gold mb-6 text-sm font-bold transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Về trang tin tức
          </Link>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
            {article.tieu_de}
          </h1>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-white/90 text-xs md:text-sm font-bold tracking-widest uppercase">
            <span className="bg-primary/80 px-3 py-1 rounded-full border border-white/20">Tác giả: {article.tac_gia}</span>
            <span>{new Date(article.created_at || '').toLocaleDateString('vi-VN')}</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {getReadTime(article.noi_dung)} phút đọc</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white -mt-10 md:-mt-20 relative z-10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-gold/20">
        <div className="text-lg md:text-xl font-bold text-primary italic mb-8 pb-8 border-b border-gold/20 leading-relaxed text-justify">
          {article.mo_ta_ngan}
        </div>
        
        <div 
          className="prose prose-lg max-w-none text-text-main font-medium leading-loose text-justify prose-h2:text-2xl prose-h2:font-black prose-h2:text-primary prose-h2:mt-10 prose-h2:mb-4 prose-p:mb-6 prose-strong:text-primary prose-img:rounded-2xl prose-img:border prose-img:border-gold/20 prose-img:shadow-lg prose-a:text-blue-600 hover:prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: article.noi_dung }}
        />

        {/* VÙNG CHIA SẺ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-gold/20 pt-8 mt-12 gap-4">
          <span className="font-bold text-sm text-text-main uppercase tracking-widest">Chia sẻ bài viết này:</span>
          <div className="flex items-center gap-3">
            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-md active:scale-95 flex-1 sm:flex-none">
              <span className="material-symbols-outlined text-sm">public</span> Facebook
            </button>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Đã sao chép liên kết bài viết!'); }} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-gold/20 text-text-main text-xs font-black uppercase tracking-widest rounded-xl hover:bg-gold/10 transition-all shadow-sm active:scale-95 flex-1 sm:flex-none">
              <span className="material-symbols-outlined text-sm">link</span> Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* BÀI VIẾT LIÊN QUAN */}
      {relatedArticles.length > 0 && (
        <div className="max-w-5xl mx-auto mt-20 px-6">
          <h3 className="text-2xl font-black text-text-main italic mb-8 uppercase border-l-4 border-primary pl-4">Có thể bạn sẽ thích</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link to={`/blog/${rel.slug}`} key={rel.id} className="group bg-white rounded-2xl overflow-hidden border border-gold/20 shadow-md hover:shadow-xl transition-all flex flex-col">
                <div className="h-40 overflow-hidden relative">
                  <img src={rel.anh_bia || 'https://placehold.co/600x400'} alt={rel.tieu_de} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-sm font-black text-text-main mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{rel.tieu_de}</h4>
                  <p className="text-xs text-text-soft line-clamp-2 mb-4 flex-1">{rel.mo_ta_ngan}</p>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-auto">Đọc ngay →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <style>{`@keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }`}</style>
    </article>
  );
};

export default BlogDetail;