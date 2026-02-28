import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { seoService, SeoArticle } from '../../services/seoService';

// Hàm tự động tạo URL thân thiện với SEO (Ví dụ: "Hôm nay" -> "hom-nay")
const generateSlug = (text: string) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};

const SeoManagement: React.FC = () => {
  const [articles, setArticles] = useState<SeoArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<SeoArticle | null>(null);
  
  const [formData, setFormData] = useState<Partial<SeoArticle>>({
    tieu_de: '', slug: '', mo_ta_ngan: '', noi_dung: '', anh_bia: '', tac_gia: 'Admin Sắc Nối'
  });

  useEffect(() => { fetchArticles(); }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try { const data = await seoService.getAllArticles(); setArticles(data); } 
    catch (error) { console.error('Lỗi tải bài viết:', error); }
    setIsLoading(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Tự động nhảy chữ cho chuẩn SEO URL
    setFormData({ ...formData, tieu_de: title, slug: generateSlug(title) });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa bài viết chuẩn SEO này?')) return;
    try {
      await seoService.deleteArticle(id);
      fetchArticles();
      alert('Đã xóa thành công!');
    } catch (error) { alert('Xóa thất bại!'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await seoService.updateArticle(editingArticle.id, formData);
        alert('Cập nhật thành công!');
      } else {
        await seoService.addArticle(formData as SeoArticle);
        alert('Đăng bài thành công!');
      }
      setIsModalOpen(false);
      fetchArticles();
    } catch (error: any) { alert(`Lưu thất bại: ${error.message}`); }
  };

  const openModal = (article?: SeoArticle) => {
    if (article) {
      setEditingArticle(article); setFormData(article);
    } else {
      setEditingArticle(null);
      setFormData({ tieu_de: '', slug: '', mo_ta_ngan: '', noi_dung: '', anh_bia: '', tac_gia: 'Admin Sắc Nối' });
    }
    setIsModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-text-main uppercase">Quản lý Bài Viết (SEO)</h1>
          <p className="text-text-soft font-medium mt-1">Nơi xuất bản các bài viết thu hút traffic từ Google</p>
        </div>
        <button onClick={() => openModal()} className="px-6 py-2 bg-primary text-white font-black uppercase text-xs rounded-xl hover:brightness-110 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">edit_document</span> Viết bài mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-background-light text-text-soft text-xs uppercase font-black">
            <tr>
              <th className="p-4">Ảnh Bìa</th>
              <th className="p-4">Tiêu đề bài viết</th>
              <th className="p-4">Đường dẫn (Slug)</th>
              <th className="p-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {isLoading ? <tr><td colSpan={4} className="p-8 text-center font-bold">Đang tải...</td></tr> : 
              articles.length === 0 ? <tr><td colSpan={4} className="p-8 text-center">Chưa có bài viết nào.</td></tr> :
              articles.map(art => (
                <tr key={art.id} className="hover:bg-background-light transition-colors">
                  <td className="p-4"><img src={art.anh_bia || 'https://placehold.co/100'} className="h-12 w-20 object-cover rounded-lg border border-gold/20" /></td>
                  <td className="p-4 font-bold text-text-main">{art.tieu_de}</td>
                  <td className="p-4 text-xs text-primary bg-primary/5 rounded px-2">{art.slug}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => openModal(art)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mx-1"><span className="material-symbols-outlined">edit</span></button>
                    <button onClick={() => handleDelete(art.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg mx-1"><span className="material-symbols-outlined">delete</span></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative z-10 flex flex-col h-[90vh]">
            <div className="p-5 border-b border-gold/10 bg-background-light flex justify-between items-center shrink-0">
              <h2 className="text-xl font-black uppercase">{editingArticle ? 'Sửa bài viết' : 'Viết bài mới'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-red-500"><span className="material-symbols-outlined">close</span></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-5 overflow-y-auto space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-text-soft uppercase mb-1">Tiêu đề (H1)</label>
                    <input required type="text" value={formData.tieu_de} onChange={handleTitleChange} className="w-full border border-gold/20 rounded-xl p-3 font-bold" placeholder="Nhập tiêu đề hấp dẫn..." />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-text-soft uppercase mb-1">Đường dẫn chuẩn SEO (URL)</label>
                    <input required type="text" value={formData.slug} readOnly className="w-full border border-gold/20 rounded-xl p-3 bg-background-light text-primary font-bold" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-text-soft uppercase mb-1">Ảnh bìa (URL)</label>
                    <input required type="text" value={formData.anh_bia} onChange={e => setFormData({...formData, anh_bia: e.target.value})} className="w-full border border-gold/20 rounded-xl p-3" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-text-soft uppercase mb-1">Mô tả ngắn (Meta Description)</label>
                    <input required type="text" value={formData.mo_ta_ngan} onChange={e => setFormData({...formData, mo_ta_ngan: e.target.value})} className="w-full border border-gold/20 rounded-xl p-3" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-primary uppercase mb-1 flex items-center gap-2">
                     Nội dung bài viết (Hỗ trợ HTML)
                     <span className="text-[10px] text-text-soft normal-case font-normal">(Bạn có thể gõ chữ bình thường, hoặc dùng các thẻ &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt; để chia bố cục)</span>
                  </label>
                  <textarea required value={formData.noi_dung} onChange={e => setFormData({...formData, noi_dung: e.target.value})} className="w-full border border-gold/20 rounded-xl p-4 h-64 font-medium leading-relaxed resize-none"></textarea>
                </div>
              </div>
              <div className="p-5 border-t border-gold/10 bg-white flex justify-end gap-3 shrink-0">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 border border-gold/20 rounded-xl font-bold uppercase text-xs">Hủy</button>
                  <button type="submit" className="px-6 py-3 bg-primary text-white rounded-xl font-black uppercase text-xs">Xuất bản bài viết</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default SeoManagement;