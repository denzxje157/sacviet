import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../services/supabaseClient.ts'; // Đã sửa đường dẫn import

type Category = 'architecture' | 'ritual' | 'festival';

interface LibraryItem {
  id: string;
  category: Category;
  ethnic: string;
  title: string;
  desc: string;
  content: string;
  image: string;
}

const Library: React.FC = () => {
  const [items, setItems] = useState<LibraryItem[]>([]); 
  const [activeCategory, setActiveCategory] = useState<Category>('architecture');
  const [selectedEthnicFilter, setSelectedEthnicFilter] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        // Gọi dữ liệu từ bảng thu_vien và lấy tên dân tộc từ bảng dan_toc liên kết
        const { data, error } = await supabase
          .from('thu_vien')
          .select('*, dan_toc(ten_dan_toc)');

        if (error) throw error;

        if (data) {
          const mapped = data.map(item => ({
            id: item.id,
            // Chuyển category từ tiếng Việt trong DB sang ID tiếng Anh cho UI
            category: (item.danh_muc === 'kien-truc' ? 'architecture' : 
                       item.danh_muc === 'nghi-le' ? 'ritual' : 'festival') as Category,
            ethnic: item.dan_toc?.ten_dan_toc || 'Khác',
            title: item.tieu_de,
            desc: item.mo_ta_ngan,
            content: item.noi_dung,
           image: item.anh_thu_vien?.replace('/public/images/', '/public/images-sacviet/'),
          }));
          setItems(mapped);
        }
      } catch (err) { 
        console.error("Lỗi lấy dữ liệu:", err); 
      }
      setIsLoading(false);
    };
    fetchLibrary();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedItem]);

  const availableEthnics = useMemo(() => {
    const ethnics = new Set(items.map(item => item.ethnic));
    return ['ALL', ...Array.from(ethnics).sort((a, b) => a.localeCompare(b, 'vi'))];
  }, [items]);

  const filteredData = useMemo(() => {
    return items.filter(item => {
      const matchCategory = item.category === activeCategory;
      const matchEthnic = selectedEthnicFilter === 'ALL' || item.ethnic === selectedEthnicFilter;
      const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchEthnic && matchSearch;
    });
  }, [items, activeCategory, selectedEthnicFilter, searchTerm]);

  const currentData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div className="relative min-h-screen font-display bg-[#F7F3E9] overflow-x-hidden">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6 py-8 lg:py-12 relative z-10">
        <header className="mb-8 lg:mb-12 text-center">
          <h2 className="text-4xl lg:text-7xl font-black text-text-main italic mb-6">Tiếng Vọng <span className="text-gold">Tiền Nhân</span></h2>
          <div className="max-w-md mx-auto relative group">
           <div className="max-w-md mx-auto relative group z-20">
            <input 
              type="text" 
              placeholder="Tìm kiếm di sản..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full bg-white/80 backdrop-blur-sm border-2 border-gold/20 rounded-full py-3 px-12 text-text-main focus:outline-none focus:border-primary transition-colors shadow-lg text-sm" 
            />
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gold group-hover:text-primary transition-colors pointer-events-none">
              search
            </span>
          </div>
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gold">search</span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="hidden lg:block w-72 shrink-0 space-y-8 sticky top-24">
            <div className="bg-white p-2 rounded-[2rem] border border-gold/20 shadow-xl">
               {[
                 { id: 'architecture', label: 'Kiến trúc' },
                 { id: 'ritual', label: 'Nghi lễ' },
                 { id: 'festival', label: 'Lễ hội' }
               ].map((cat) => (
                 <button key={cat.id} onClick={() => {setActiveCategory(cat.id as Category); setSelectedEthnicFilter('ALL');}} className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] mb-2 last:mb-0 transition-all ${activeCategory === cat.id ? 'bg-primary text-white shadow-lg' : 'text-text-soft hover:bg-gold/10'}`}>
                    <span className="font-black uppercase tracking-widest text-xs">{cat.label}</span>
                 </button>
               ))}
            </div>
            <div className="bg-white rounded-[2rem] border border-gold/20 shadow-xl overflow-hidden flex flex-col max-h-[50vh]">
               <div className="p-4 border-b border-gold/10 bg-gold/5 font-black text-xs uppercase text-center">Chọn Dân Tộc</div>
               <div ref={scrollRef} className="overflow-y-auto p-2 custom-scrollbar">
                 {availableEthnics.map((ethnic) => (
                   <button key={ethnic} onClick={() => setSelectedEthnicFilter(ethnic)} className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all mb-1 ${selectedEthnicFilter === ethnic ? 'bg-text-main text-gold' : 'text-text-soft hover:bg-gold/10'}`}>
                     {ethnic === 'ALL' ? 'Tất cả dân tộc' : ethnic}
                   </button>
                 ))}
               </div>
            </div>
          </aside>

          <main className="flex-1 w-full">
            {isLoading ? (
               <div className="text-center py-32 text-gold font-black text-2xl animate-pulse">Đang kết nối bản sắc...</div>
            ) : currentData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentData.map((item) => (
                  <div key={item.id} onClick={() => setSelectedItem(item)} className="group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border border-gold/15 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer h-[350px] md:h-[400px] flex flex-col">
                    <div className="h-48 overflow-hidden relative shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                      <div className="absolute top-2 left-2 bg-primary/90 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest z-10">{item.ethnic}</div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="text-sm md:text-lg font-black text-text-main mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-[10px] md:text-xs text-text-soft line-clamp-3 opacity-80">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (<div className="text-center py-32 bg-white/50 rounded-[3rem] border-2 border-dashed border-gold/20 font-bold">Chưa có dữ liệu phù hợp.</div>)}
          </main>
        </div>

        {selectedItem && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedItem(null)}></div>
            <div className="bg-white w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[90vh] rounded-[2rem] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden border-4 border-gold/20 animate-slide-up">
               <button onClick={() => setSelectedItem(null)} className="absolute top-2 right-2 z-50 p-2 hover:text-red-600 transition-colors"><span className="material-symbols-outlined">close</span></button>
               <div className="w-full md:w-[65%] h-1/2 md:h-auto relative bg-[#F2EFE6] border-r border-gold/10">
                 <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                 <div className="absolute bottom-4 left-4 text-white p-2">
                    <div className="inline-block px-3 py-1 bg-gold text-text-main text-[10px] font-black uppercase rounded-full mb-2">Dân tộc {selectedItem.ethnic}</div>
                    <h2 className="text-2xl md:text-4xl font-black italic">{selectedItem.title}</h2>
                 </div>
               </div>
               <div className="w-full md:w-[35%] h-1/2 md:h-auto p-6 md:p-8 bg-white overflow-y-auto custom-scrollbar">
                  <p className="font-bold text-base italic text-text-soft mb-4 border-l-4 border-gold pl-4 py-1">"{selectedItem.desc}"</p>
                  <div className="prose text-sm text-text-main leading-relaxed">
                    {selectedItem.content.split('\n').map((p, i) => <p key={i} className="mb-3">{p}</p>)}
                  </div>
               </div>
            </div>
          </div>, document.body
        )}
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #A11D1D; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Library;