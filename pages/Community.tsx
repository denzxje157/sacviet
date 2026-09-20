/// <reference types="vite/client" />
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { communityService, CommunityPost } from '../services/communityService.ts'; 
import { useAuth } from '../context/AuthContext.tsx'; 

const RAW_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const API_KEY = RAW_API_KEY.trim();

// --- UTILITIES ---
const getLunarDate = (solarDate: Date) => {
  const anchorDate = new Date(2026, 1, 17); const diffDays = Math.ceil((solarDate.getTime() - anchorDate.getTime()) / 86400000); let lDay, lMonth, yearLabel;
  if (diffDays >= 0) { let t = diffDays; lMonth = 1; lDay = 1; while (t > 0) { const d = (lMonth % 2 !== 0) ? 30 : 29; if (t < d) { lDay += t; t = 0; } else { t -= d; lMonth = lMonth > 11 ? 1 : lMonth + 1; } } yearLabel = 'Bính Ngọ'; } 
  else { let t = Math.abs(diffDays); lMonth = 12; lDay = 29; while (t > 0) { const d = (lMonth % 2 !== 0) ? 30 : 29; if (t < d) { lDay -= t; if (lDay <= 0) { lMonth--; lDay += ((lMonth % 2 !== 0) ? 30 : 29); } t = 0; } else { t -= d; lMonth = lMonth < 2 ? 12 : lMonth - 1; } } yearLabel = 'Ất Tỵ'; }
  return { day: Math.max(1, Math.floor(lDay)), month: lMonth, yearLabel };
};

const getRelativeTime = (dateString?: string) => {
  if (!dateString) return 'Vừa xong';
  const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });
  const timeDiff = new Date(dateString).getTime() - new Date().getTime();
  const daysDiff = Math.round(timeDiff / 86400000);
  if (Math.abs(daysDiff) > 0) return rtf.format(daysDiff, 'day');
  const hoursDiff = Math.round(timeDiff / 3600000);
  if (Math.abs(hoursDiff) > 0) return rtf.format(hoursDiff, 'hour');
  return rtf.format(Math.round(timeDiff / 60000), 'minute');
};

// --- INTERFACES ---
interface CommentDef { id: string; user: string; avatar: string; text: string; time: string; }
interface Post { id: string; author: string; avatar: string; time: string; timestamp: number; location: string; content: string; image?: string; likes: number; commentsCount: number; tags: string[]; localComments: CommentDef[]; }
interface QuizQuestion { id: number; question: string; options: string[]; correctAnswerStr: string; explanation: string; }
interface FestivalDisplay { id: string; name: string; solarDate: string; lunarDateStr: string; location: string; daysLeft: number; }

const MOCK_CURRENT_USER = { name: "Khách thăm", avatar: "K" };

const INITIAL_POSTS: Post[] = [
  { id: 'm1', author: 'Hoàng Anh', avatar: 'H', time: '1 giờ trước', timestamp: Date.now() - 3600000, location: 'Mèo Vạc, Hà Giang', content: 'Lần đầu tiên được tham gia chợ tình Khau Vai của đồng bào H\'Mông. Sắc màu thổ cẩm rực rỡ khắp núi rừng, tiếng khèn gọi bạn tình vang vọng nghe xao xuyến thực sự! Khuyên thật lòng mọi người nên đến đây một lần trong đời nhé.', image: '/artisans/lung-tam-cover.jpg', likes: 124, commentsCount: 1, tags: ['HaGiang', 'HMong'], localComments: [{ id: 'c1', user: 'Lê Vy', avatar: 'L', text: 'Đẹp quá, cho mình xin kinh nghiệm di chuyển với!', time: '30 phút trước' }] },
  { id: 'm2', author: 'Nguyễn Khoa', avatar: 'N', time: '3 giờ trước', timestamp: Date.now() - 10800000, location: 'Buôn Ma Thuột, Đắk Lắk', content: 'Đêm nay say men rượu cần cùng các già làng người Ê Đê. Ngồi quanh bếp lửa nhà dài, nghe kể sử thi Đam San và thưởng thức tiếng cồng chiêng Tây Nguyên. Cảm giác thiêng liêng vô cùng 🌿🔥', image: '/pictures-sanpham/e-e/gui-an-kin-hoa-tiet.jpg', likes: 312, commentsCount: 2, tags: ['TayNguyen', 'EDe'], localComments: [{ id: 'c2', user: 'Minh Tuấn', avatar: 'M', text: 'Rượu cần Ê Đê ngon số dách!', time: '1 giờ trước' }, { id: 'c3', user: 'Hoàng Anh', avatar: 'H', text: 'Nhớ thử món gà nướng sa lửa nha bạn ơi.', time: '45 phút trước' }] },
  { id: 'm3', author: 'Thanh Trúc', avatar: 'T', time: '5 giờ trước', timestamp: Date.now() - 18000000, location: 'Tháp Poklong Garai, Ninh Thuận', content: 'Lễ hội Katê của đồng bào Chăm rộn ràng trong tiếng trống Paranưng và tiếng kèn Saranai. Chiêm ngưỡng các thiếu nữ Chăm đội thúng nước múa quạt dưới chân tháp cổ thật sự là một kiệt tác nghệ thuật sống động.', image: '/artisans/cham-textile.png', likes: 205, commentsCount: 0, tags: ['Cham', 'NinhThuan'], localComments: [] }
];

const CULTURAL_QUIZ_BANK: QuizQuestion[] = [
  {
    id: 1,
    question: "Lễ hội 'Cấp Sắc' là nghi lễ trưởng thành thiêng liêng của nam giới dân tộc nào?",
    options: ["H'Mông", "Dao", "Tày", "Thái"],
    correctAnswerStr: "Dao",
    explanation: "Lễ Cấp Sắc là nghi lễ quan trọng nhất ghi nhận sự trưởng thành và đạo đức của người đàn ông Dao."
  },
  {
    id: 2,
    question: "Điệu múa dân gian nổi tiếng nào của đồng bào người Thái đã được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại?",
    options: ["Múa Xòe", "Múa Sạp", "Múa Khèn", "Múa Quạt"],
    correctAnswerStr: "Múa Xòe",
    explanation: "Nghệ thuật Xòe Thái được UNESCO công nhận là Di sản văn hóa phi vật thể của nhân loại năm 2021."
  },
  {
    id: 3,
    question: "Cây đàn Tính kết hợp với làn điệu dân ca nào là linh hồn văn hóa thiêng liêng của người Tày và Nùng?",
    options: ["Hát Then", "Hát Quan họ", "Hát Xoan", "Hát Lượn"],
    correctAnswerStr: "Hát Then",
    explanation: "Thực hành Then của người Tày, Nùng, Thái là Di sản văn hóa phi vật thể của nhân loại."
  },
  {
    id: 4,
    question: "Nhạc cụ truyền thống độc đáo nào gắn liền với tiếng gọi bạn tình của các chàng trai người H'Mông trên rẻo cao?",
    options: ["Đàn môi", "Kèn lá", "Khèn Mông", "Sáo Mèo"],
    correctAnswerStr: "Khèn Mông",
    explanation: "Khèn là nhạc cụ linh hồn biểu đạt tâm tư, tài hoa và sự dũng mãnh của người đàn ông H'Mông."
  },
  {
    id: 5,
    question: "Lễ hội Katê là lễ hội truyền thống lớn nhất và thiêng liêng nhất trong năm của đồng bào dân tộc nào?",
    options: ["Chăm", "Khmer", "Ba Na", "Hoa"],
    correctAnswerStr: "Chăm",
    explanation: "Lễ hội Katê của người Chăm diễn ra vào tháng 7 lịch Chăm để tưởng nhớ tổ tiên và các vị thần linh."
  },
  {
    id: 6,
    question: "Bộ sử thi đồ sộ 'Đẻ đất Đẻ nước' phản ánh nguồn gốc loài người và vũ trụ của dân tộc nào?",
    options: ["Mường", "Kinh", "Tày", "Thái"],
    correctAnswerStr: "Mường",
    explanation: "'Đẻ đất Đẻ nước' là kiệt tác sử thi Mo Mường vĩ đại trong kho tàng văn học dân gian Việt Nam."
  },
  {
    id: 7,
    question: "Lễ hội đua ghe Ngo truyền thống náo nhiệt của đồng bào Khmer Nam Bộ diễn ra trong dịp lễ nào?",
    options: ["Lễ Oóc Om Bóc", "Lễ Chol Chnam Thmay", "Lễ Sen Dolta", "Lễ Dâng Y"],
    correctAnswerStr: "Lễ Oóc Om Bóc",
    explanation: "Đua ghe Ngo là môn thể thao dân gian sôi động bậc nhất trong Lễ Cúng Trăng Oóc Om Bóc của người Khmer."
  },
  {
    id: 8,
    question: "Ngôi nhà chung cao vút, là biểu tượng quyền lực và tâm linh của buôn làng Ba Na và Gia Rai có tên là gì?",
    options: ["Nhà Rông", "Nhà Dài", "Nhà Trình Tường", "Nhà Mồ"],
    correctAnswerStr: "Nhà Rông",
    explanation: "Nhà Rông là trái tim sinh hoạt cộng đồng, hội họp truyền thống của đồng bào Bắc Tây Nguyên."
  },
  {
    id: 9,
    question: "Phiên chợ tình Khau Vai huyền thoại họp mỗi năm duy nhất một lần vào ngày 27/3 Âm lịch thuộc tỉnh nào?",
    options: ["Hà Giang", "Lào Cai", "Sơn La", "Cao Bằng"],
    correctAnswerStr: "Hà Giang",
    explanation: "Chợ tình Khau Vai (huyện Mèo Vạc, Hà Giang) là nơi hội ngộ của những đôi lứa có tình duyên trắc trở."
  },
  {
    id: 10,
    question: "Làng gốm Bàu Trúc - một trong những làng gốm cổ xưa nhất Đông Nam Á là nghề gia truyền của dân tộc nào?",
    options: ["Chăm", "Kinh", "Khmer", "Mnông"],
    correctAnswerStr: "Chăm",
    explanation: "Gốm Bàu Trúc (Ninh Thuận) được người phụ nữ Chăm làm hoàn toàn bằng tay, 'tay quay mông xoay', không dùng bàn xoay."
  },
  {
    id: 11,
    question: "Ngôi nhà dài truyền thống của đồng bào Ê Đê phản ánh nét văn hóa đặc trưng nào?",
    options: ["Chế độ mẫu hệ", "Chế độ phụ hệ", "Chế độ du mục", "Chế độ thị tộc"],
    correctAnswerStr: "Chế độ mẫu hệ",
    explanation: "Người Ê Đê theo chế độ mẫu hệ, mỗi khi người con gái trong gia đình lấy chồng, ngôi nhà dài lại được cơi nới dài thêm."
  },
  {
    id: 12,
    question: "Lễ hội Hoa Ban gắn liền với truyền thuyết tình yêu son sắt giữa nàng Ban và chàng Khum của dân tộc nào?",
    options: ["Thái", "H'Mông", "Dao", "Mường"],
    correctAnswerStr: "Thái",
    explanation: "Lễ hội Hoa Ban là ngày hội mùa xuân cầu phúc, cầu mùa màng bội thu của đồng bào Thái Tây Bắc."
  },
  {
    id: 13,
    question: "Kiểu nhà 'Trình tường' làm từ đất nện dày chống chọi mùa đông băng giá là nét kiến trúc đặc trưng của dân tộc nào?",
    options: ["Hà Nhì", "Ba Na", "Chăm", "Khmer"],
    correctAnswerStr: "Hà Nhì",
    explanation: "Nhà trình tường đất nện dày 40-50cm của người Hà Nhì ở Y Tý (Bát Xát, Lào Cai) ấm vào mùa đông, mát vào mùa hè."
  },
  {
    id: 14,
    question: "Không gian văn hóa Cồng chiêng Tây Nguyên được UNESCO công nhận là Kiệt tác di sản thế giới vào năm nào?",
    options: ["2005", "2010", "2015", "2000"],
    correctAnswerStr: "2005",
    explanation: "Ngày 15/11/2005, Không gian văn hóa Cồng chiêng Tây Nguyên chính thức được UNESCO công nhận di sản thế giới."
  },
  {
    id: 15,
    question: "Chiếc khăn Piêu thêu hoa văn chỉ màu rực rỡ là trang phục đội đầu truyền thống không thể thiếu của phụ nữ dân tộc nào?",
    options: ["Thái Đen", "H'Mông Hoa", "Dao Tiền", "Lô Lô"],
    correctAnswerStr: "Thái Đen",
    explanation: "Khăn Piêu là thước đo sự khéo léo, cần cù và tấm lòng son sắt của người thiếu nữ dân tộc Thái Đen."
  },
  {
    id: 16,
    question: "Kỹ thuật vẽ sáp ong (batik) trên vải lanh rồi nhuộm chàm cổ truyền là nghề thủ công trứ danh của dân tộc nào?",
    options: ["H'Mông", "Kinh", "Mường", "Khmer"],
    correctAnswerStr: "H'Mông",
    explanation: "Phụ nữ H'Mông Hoa dùng bút vẽ bằng đồng nhúng sáp ong nóng chảy tạo nên các đồ án hoa văn hình học độc bản."
  },
  {
    id: 17,
    question: "Dân tộc nào có dân số đông nhất trong số 53 dân tộc thiểu số tại Việt Nam?",
    options: ["Tày", "Thái", "Mường", "H'Mông"],
    correctAnswerStr: "Tày",
    explanation: "Dân tộc Tày có quy mô dân số lớn nhất trong các dân tộc thiểu số với gần 1,9 triệu người cư trú chủ yếu ở vùng Đông Bắc."
  },
  {
    id: 18,
    question: "Nghệ thuật Múa rối nước - di sản sân khấu dân gian độc nhất vô nhị trên mặt nước bắt nguồn từ nền văn minh của dân tộc nào?",
    options: ["Kinh", "Tày", "Thái", "Mường"],
    correctAnswerStr: "Kinh",
    explanation: "Múa rối nước ra đời từ nền văn minh lúa nước sông Hồng của người Việt (Kinh) từ thời nhà Lý."
  },
  {
    id: 19,
    question: "Loại nhạc cụ tre nứa nào của đồng bào Tây Nguyên phát ra âm thanh trong trẻo nhờ sức chảy của dòng suối?",
    options: ["Đàn nước (Chinh Kram)", "Đàn Klông-pút", "Đàn T'rưng", "Kèn bầu"],
    correctAnswerStr: "Đàn nước (Chinh Kram)",
    explanation: "Đàn nước được đặt bên khe suối, dòng nước chảy đẩy gõ vào các ống nứa tạo nên bản giao hưởng núi rừng."
  },
  {
    id: 20,
    question: "Lễ hội Lồng Tồng (Lễ hội Xuống đồng) đầu xuân là lễ hội mùa màng tiêu biểu của đồng bào nào?",
    options: ["Tày - Nùng", "Chăm - Raglai", "Ê Đê - Ba Na", "Khmer - Hoa"],
    correctAnswerStr: "Tày - Nùng",
    explanation: "Lồng Tồng trong tiếng Tày có nghĩa là Xuống đồng, là ngày hội tạ ơn thần linh và cầu một năm mưa thuận gió hòa."
  }
];

const FALLBACK_QUIZ = CULTURAL_QUIZ_BANK;

// Dữ liệu Lễ hội tĩnh (Đã thay thế cho AI)
const STATIC_FESTIVALS: Omit<FestivalDisplay, 'daysLeft'>[] = [
  // Dữ liệu Lễ hội tĩnh (Đã bổ sung các lễ hội đặc trưng của các dân tộc)
  { id: 'f1', name: 'Giỗ Tổ Hùng Vương', solarDate: '2026-04-27', lunarDateStr: 'Mùng 10 tháng 3 Âm lịch', location: 'Phú Thọ' },
  { id: 'f2', name: 'Lễ hội Đền Gióng', solarDate: '2026-05-25', lunarDateStr: 'Mùng 9 tháng 4 Âm lịch', location: 'Hà Nội' },
  { id: 'f3', name: 'Lễ hội vía Bà Chúa Xứ', solarDate: '2026-06-07', lunarDateStr: '23 tháng 4 Âm lịch', location: 'An Giang' },
  { id: 'f4', name: 'Tết Độc Lập người Mông', solarDate: '2026-09-02', lunarDateStr: 'Mùng 2 tháng 9 Dương lịch', location: 'Mộc Châu, Sơn La' },
  { id: 'f5', name: 'Tết Trung Thu', solarDate: '2026-09-25', lunarDateStr: 'Rằm tháng 8 Âm lịch', location: 'Toàn quốc' },
  { id: 'f6', name: 'Lễ hội Katê (người Chăm)', solarDate: '2026-10-10', lunarDateStr: 'Tháng 7 lịch Chăm', location: 'Ninh Thuận' },
  { id: 'f7', name: 'Lễ hội Oóc Om Bóc (Khmer)', solarDate: '2026-11-23', lunarDateStr: 'Rằm tháng 10 Âm lịch', location: 'Sóc Trăng' },
  { id: 'f8', name: 'Lễ hội Hoa Ban (người Thái)', solarDate: '2027-03-15', lunarDateStr: 'Tháng 2 Âm lịch', location: 'Điện Biên' },
];

// --- COMPONENTS ---
const CalendarModal = ({ onClose, initialDate, festivals }: { onClose: () => void, initialDate: Date, festivals: FestivalDisplay[] }) => {
  const [currentDate, setCurrentDate] = useState(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); 
  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const gotoToday = () => setCurrentDate(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));

  const getFestivalOnDate = (day: number) => {
    const checkDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return festivals.find(f => f.solarDate === checkDateStr);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="h-12 md:h-24 bg-background-light/30 border border-gold/10"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
      const festival = getFestivalOnDate(day);
      const isToday = day === initialDate.getDate() && currentDate.getMonth() === initialDate.getMonth() && currentDate.getFullYear() === initialDate.getFullYear();
      const dateForLunar = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const lunar = getLunarDate(dateForLunar);
      const isSunday = dateForLunar.getDay() === 0;

      days.push(
        <div key={day} className={`h-16 md:h-24 border border-gold/10 relative p-1 md:p-2 transition-colors hover:bg-gold/5 flex flex-col group overflow-hidden ${isToday ? 'bg-gold/10 ring-1 md:ring-2 ring-gold inset-0 shadow-inner' : 'bg-white'}`}>
           
           {/* Hàng trên cùng: Số ngày và Ngày âm */}
           <div className="flex justify-between items-start shrink-0">
              <span className={`text-xs md:text-lg font-black leading-none ${isSunday ? 'text-primary' : 'text-text-main'} ${isToday ? 'text-primary scale-110' : ''}`}>{day}</span>
              <div className="flex flex-col items-end hidden md:flex"><span className={`text-[8px] md:text-[10px] font-medium ${lunar.day === 1 || lunar.day === 15 ? 'text-primary font-bold' : 'text-text-soft/60'}`}>{lunar.day}/{lunar.month}</span></div>
           </div>

           {/* Phần giữa: Chữ Hôm nay */}
           <div className="flex-1 flex items-center justify-center">
             {isToday && (
               <span className="text-[6px] md:text-[9px] bg-primary text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest shadow-md whitespace-nowrap">
                 Hôm nay
               </span>
             )}
           </div>

           {/* Hàng dưới cùng: Tên lễ hội */}
           {festival && (
             <div className="mt-auto">
               <div className="bg-primary text-white text-[5px] md:text-[8px] font-bold px-1 py-0.5 rounded leading-tight truncate border border-gold/30 shadow-sm" title={festival.name}>
                 {festival.name}
               </div>
             </div>
           )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-4">
      <div className="absolute inset-0 bg-black/70 animate-fade-in" onClick={onClose}></div>
      <div className="w-full max-w-4xl bg-[#F7F3E9] rounded-2xl md:rounded-[2rem] shadow-2xl relative z-10 overflow-hidden border-2 md:border-4 border-gold/20 animate-slide-up flex flex-col max-h-[90vh] md:max-h-[85vh]">
         <div className="p-3 md:p-6 bg-primary text-white flex items-center justify-between shrink-0">
            <h2 className="text-base md:text-2xl font-black uppercase tracking-widest flex items-center gap-2 md:gap-3"><span className="material-symbols-outlined text-xl md:text-2xl">calendar_month</span>Lịch Lễ Hội {currentDate.getFullYear()}</h2>
            <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-1 md:p-2 rounded-full transition-colors flex items-center text-white"><span className="material-symbols-outlined text-lg">close</span></button>
         </div>
         <div className="flex items-center justify-between px-2 md:px-8 py-2 md:py-4 bg-white border-b border-gold/10">
            <button onClick={prevMonth} className="p-1 md:p-2 hover:bg-background-light rounded-full text-primary"><span className="material-symbols-outlined">chevron_left</span></button>
            <div className="cursor-pointer hover:bg-background-light px-3 py-1 rounded-xl transition-colors text-center" onClick={gotoToday}><span className="text-sm md:text-xl font-black text-text-main uppercase">{monthNames[currentDate.getMonth()]} / {currentDate.getFullYear()}</span></div>
            <button onClick={nextMonth} className="p-1 md:p-2 hover:bg-background-light rounded-full text-primary"><span className="material-symbols-outlined">chevron_right</span></button>
         </div>
         <div className="grid grid-cols-7 bg-gold/10 border-b border-gold/10">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((d, i) => (<div key={d} className={`py-2 md:py-3 text-center text-[8px] md:text-xs font-black uppercase ${i===0 ? 'text-primary' : 'text-text-soft'}`}>{d}</div>))}
         </div>
         <div className="flex-1 overflow-y-auto custom-scrollbar bg-white"><div className="grid grid-cols-7">{renderDays()}</div></div>
      </div>
    </div>
  );
};

const FestivalWidget = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  // Tính toán lại số ngày dựa trên mốc thời gian thực
  const events = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đưa về 0h00 phút để so sánh ngày chuẩn xác
    
    return STATIC_FESTIVALS.map(f => {
      const fDate = new Date(f.solarDate);
      fDate.setHours(0, 0, 0, 0);
      
      // Tính số ngày còn lại (dùng Math.round để tránh lỗi số thập phân của Javascript)
      const daysLeft = Math.round((fDate.getTime() - today.getTime()) / 86400000);
      return { ...f, daysLeft };
    })
    .filter(f => f.daysLeft >= 0) // LỌC: Chỉ giữ lại các lễ hội >= 0 ngày (Hôm nay hoặc tương lai)
    .sort((a, b) => a.daysLeft - b.daysLeft); // SẮP XẾP: Ngày càng gần thì càng nổi lên trên
  }, []);

  return (
    <>
      <div className="bg-white rounded-2xl md:rounded-[2rem] border border-gold/20 shadow-lg p-4 md:p-5 w-full animate-fade-in">
        <div className="flex items-center justify-between mb-4 border-b border-gold/10 pb-3">
           <h3 className="font-black text-text-main text-sm uppercase tracking-widest flex items-center gap-2">
             <span className="material-symbols-outlined text-primary">event_upcoming</span>Mùa Lễ Hội
           </h3>
           <div className="flex items-center gap-2">
               <button onClick={() => setShowCalendar(true)} className="text-[10px] md:text-xs text-primary font-bold hover:bg-background-light px-2 py-1 rounded-lg border border-gold/20 shadow-sm transition-all active:scale-95 flex items-center gap-1">
                 Xem lịch <span className="material-symbols-outlined text-[12px] md:text-[14px]">calendar_month</span>
               </button>
           </div>
        </div>
        
        <div className="space-y-4">
           {events.length === 0 ? (
             <div className="text-center py-4 text-xs font-bold text-text-soft italic">Hiện chưa có lễ hội nào sắp diễn ra.</div>
           ) : (
             events.slice(0, 3).map(f => (
              <div key={f.id} className="flex gap-4 items-center group cursor-pointer hover:bg-gold/5 p-2 rounded-xl transition-colors">
                 <div className="bg-primary/10 text-primary rounded-xl p-2 w-14 text-center border border-primary/20 shrink-0">
                    <span className="block text-xl font-black leading-none my-0.5">{f.daysLeft}</span>
                    <span className="block text-[8px] font-bold uppercase tracking-wider">Ngày</span>
                 </div>
                 <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate text-text-main">{f.name}</h4>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-gold/20 text-text-main px-2 py-0.5 rounded font-bold">{f.lunarDateStr}</span>
                    </div>
                 </div>
              </div>
            ))
           )}
        </div>
      </div>
      
      {showCalendar && <CalendarModal onClose={() => setShowCalendar(false)} initialDate={new Date()} festivals={events} />}
    </>
  );
};

const QuizWidget = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  // Hàm chọn ngẫu nhiên các câu hỏi văn hóa không lặp lại
  const pickRandomQuestions = (pool: QuizQuestion[], count: number = 5): QuizQuestion[] => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((q, idx) => ({ ...q, id: idx + 1 }));
  };
  
  const initQuiz = useCallback(async () => {
    setGenerating(true); setQIndex(0); setScore(0); setSelected(null);
    try {
      const cached = localStorage.getItem('sacviet_quiz');
      const cachedTime = localStorage.getItem('sacviet_quiz_time');
      if (cached && cachedTime && (Date.now() - Number(cachedTime) < 3600000)) {
         const parsed = JSON.parse(cached);
         // Nếu mảng lưu có ít nhất 3 câu thì hiển thị, nếu chỉ có 1 câu (lỗi cũ) thì bỏ qua để lấy bộ mới
         if (Array.isArray(parsed) && parsed.length >= 3) {
           setQuestions(parsed); 
           setGenerating(false); 
           return;
         }
      }
      
      if (localStorage.getItem('gemini_429_blocked') || !API_KEY) {
         const selected5 = pickRandomQuestions(CULTURAL_QUIZ_BANK, 5);
         setQuestions(selected5);
         localStorage.setItem('sacviet_quiz', JSON.stringify(selected5));
         localStorage.setItem('sacviet_quiz_time', Date.now().toString());
         setGenerating(false);
         return;
      }

      const prompt = `Tạo 5 câu hỏi trắc nghiệm hay về văn hóa 54 dân tộc Việt Nam. Trả về đúng mảng JSON gồm 5 phần tử: [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "correctAnswerStr": "A", "explanation": "..."}]`;
      
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, { 
        method: 'POST', headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.9, responseMimeType: "application/json" } }) 
      });

      if (res.status === 429) {
        localStorage.setItem('gemini_429_blocked', 'true');
        throw new Error("Quota Exceeded");
      }
      
      if (!res.ok) throw new Error("Lỗi API");
      
      const data = await res.json();
      const qData = JSON.parse(data.candidates[0].content.parts[0].text);
      if (Array.isArray(qData) && qData.length >= 3) {
        setQuestions(qData);
        localStorage.setItem('sacviet_quiz', JSON.stringify(qData)); 
        localStorage.setItem('sacviet_quiz_time', Date.now().toString());
      } else {
        throw new Error("Dữ liệu không đủ câu hỏi");
      }
    } catch (e) { 
      const selected5 = pickRandomQuestions(CULTURAL_QUIZ_BANK, 5);
      setQuestions(selected5); 
      localStorage.setItem('sacviet_quiz', JSON.stringify(selected5)); 
      localStorage.setItem('sacviet_quiz_time', Date.now().toString());
    } finally { 
      setGenerating(false); 
    }
  }, []);

  useEffect(() => { initQuiz(); }, [initQuiz]);

  const currentQ = questions[qIndex];
  return (
    <div className="bg-white rounded-2xl md:rounded-[2rem] border-2 border-gold/30 shadow-xl overflow-hidden flex flex-col min-h-[250px] w-full">
      <div className="bg-primary p-4 text-center"><h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2"><span className="material-symbols-outlined text-gold">school</span>Trạng Nguyên Di Sản</h3></div>
      <div className="p-5 flex-1 flex flex-col">
        {generating ? (
           <div className="flex-1 flex flex-col items-center justify-center animate-pulse"><div className="size-12 border-4 border-t-primary rounded-full animate-spin"></div><p className="mt-4 text-sm font-bold text-text-main">Già làng đang soạn đề...</p></div>
        ) : qIndex >= questions.length && questions.length > 0 ? (
          <div className="text-center py-4 flex-1 flex flex-col justify-center animate-fade-in">
             <div className="size-20 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-3"><span className="material-symbols-outlined text-4xl text-primary">workspace_premium</span></div>
             <p className="text-sm font-bold uppercase tracking-widest mb-1 text-text-soft">Điểm của bạn</p>
             <h2 className="text-3xl font-black text-primary mb-6">{score} / {questions.length * 20}</h2>
             <button onClick={() => { localStorage.removeItem('sacviet_quiz'); localStorage.removeItem('sacviet_quiz_time'); localStorage.removeItem('gemini_429_blocked'); initQuiz(); }} className="w-full py-3 border-2 border-gold/30 rounded-full font-bold text-xs uppercase hover:bg-gold hover:text-white transition-all text-text-main active:scale-95">Thi lại (Bộ đề mới)</button>
          </div>
        ) : currentQ ? (
          <div className="flex-1 animate-slide-up">
            <div className="flex justify-between items-center mb-4"><span className="text-[10px] font-black text-bronze uppercase tracking-widest">Câu {qIndex + 1}/{questions.length}</span><span className="text-primary font-black text-sm">{score} điểm</span></div>
            <p className="font-bold text-sm mb-4 leading-relaxed text-text-main">{currentQ.question}</p>
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <button key={i} disabled={!!selected} onClick={() => { setSelected(opt); if (opt === currentQ.correctAnswerStr) setScore(s => s + 20); }} className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition-all ${selected ? (opt === currentQ.correctAnswerStr ? 'bg-green-50 border-green-500 text-green-800' : opt === selected ? 'bg-red-50 border-red-300 text-red-800' : 'opacity-40') : 'hover:bg-gold/10'}`}>{opt}</button>
              ))}
            </div>
            {selected && (
               <div className="mt-4 animate-fade-in">
                 <p className="text-xs text-text-soft italic mb-3 border-l-2 border-gold pl-3 bg-background-light p-2 rounded-r-lg">{currentQ.explanation}</p>
                 <button onClick={() => { setQIndex(i => i + 1); setSelected(null); }} className="w-full bg-primary text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg active:scale-95">Tiếp tục</button>
               </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// --- GIAO DIỆN ĐĂNG BÀI MỚI (HỖ TRỢ UPLOAD VÀ LINK) ---
const PostComposer = ({ onPost, currentUser }: { onPost: (content: string, image?: string) => void, currentUser: any }) => {
  const [content, setContent] = useState(''); 
  const [img, setImg] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  
  const submit = async () => { 
    if(!content && !img) return; 
    setIsPosting(true);
    await onPost(content, img); 
    setContent(''); setImg(''); setIsPosting(false);
  };

  // Hàm xử lý upload ảnh từ máy tính / điện thoại
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Giới hạn dung lượng 3MB để tránh lag
    if (file.size > 3 * 1024 * 1024) {
      alert("Vui lòng chọn ảnh có dung lượng dưới 3MB để đảm bảo tốc độ tải trang!");
      return;
    }

    // Đọc file thành chuỗi Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white border-2 border-gold/10 rounded-2xl md:rounded-[2rem] p-5 shadow-xl w-full">
      <div className="flex gap-3">
         <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 font-black">{currentUser.avatar}</div>
         <div className="flex-1">
           <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full bg-background-light rounded-xl p-3 text-sm font-medium outline-none resize-none min-h-[80px]" placeholder={`Chuyến đi của bạn thế nào, ${currentUser.name}?`} disabled={isPosting}></textarea>
           
           {/* Khu vực hiển thị ảnh xem trước */}
           {img && (
             <div className="relative mt-2 h-32 bg-black/5 rounded-xl overflow-hidden border border-gold/20">
               <img src={img} className="h-full w-full object-cover"/>
               <button onClick={()=>setImg('')} className="absolute top-2 right-2 text-white bg-black/50 hover:bg-red-600 transition-colors p-1 rounded-full shadow-md">
                 <span className="material-symbols-outlined text-xs">close</span>
               </button>
             </div>
           )}

           <div className="flex justify-between mt-3 items-center">
              <div className="flex items-center gap-1 md:gap-3">
                {/* 1. NÚT UPLOAD TỪ THIẾT BỊ */}
                <input type="file" id="post-image-upload" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <label htmlFor="post-image-upload" className="cursor-pointer flex items-center gap-1.5 p-1.5 md:px-3 md:py-2 text-gold hover:bg-gold/10 rounded-lg transition-colors text-[11px] md:text-xs font-bold border border-transparent hover:border-gold/20" title="Tải ảnh từ máy">
                  <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                  <span className="hidden sm:inline">Tải ảnh lên</span>
                </label>

                {/* 2. NÚT NHẬP LINK ẢNH */}
                <button onClick={() => { const url = prompt("Nhập URL ảnh (Nếu có):"); if(url) setImg(url); }} className="flex items-center gap-1.5 p-1.5 md:px-3 md:py-2 text-gold hover:bg-gold/10 rounded-lg transition-colors text-[11px] md:text-xs font-bold border border-transparent hover:border-gold/20" title="Nhập link ảnh">
                  <span className="material-symbols-outlined text-[18px]">link</span>
                  <span className="hidden sm:inline">Dán Link</span>
                </button>
              </div>

              <button onClick={submit} disabled={(!content && !img) || isPosting} className="bg-primary px-6 py-2.5 rounded-xl text-white font-black text-[10px] uppercase tracking-widest disabled:opacity-50 active:scale-95 transition-transform shadow-md">{isPosting ? 'Đang tải...' : 'Đăng bài'}</button>
           </div>
         </div>
      </div>
    </div>
  );
};

const PostCard = React.memo(({ post, currentUser, isAdmin, onDelete }: { post: Post, currentUser: any, isAdmin: boolean, onDelete: (id: string) => void }) => {
  const [liked, setLiked] = useState(false); 
  const [likes, setLikes] = useState(post.likes || 0);
  const [showComments, setShowComments] = useState(false); 
  const [commentsList, setCommentsList] = useState<CommentDef[]>(post.localComments || []);
  const [newComment, setNewComment] = useState('');
  
  const [showShareOptions, setShowShareOptions] = useState(false);

  const sendComment = () => {
     if(!newComment.trim()) return;
     const newC: CommentDef = { id: Date.now().toString(), user: currentUser.name, avatar: currentUser.avatar, text: newComment, time: 'Vừa xong' };
     setCommentsList([...commentsList, newC]);
     setNewComment('');
  };

  const copyToClipboard = () => {
    const urlToShare = window.location.href;
    const textArea = document.createElement("textarea");
    textArea.value = urlToShare;
    textArea.style.position = "fixed"; textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert("Đã sao chép liên kết thành công!");
    } catch (err) { }
    textArea.remove();
    setShowShareOptions(false); 
  };

  return (
    <article className="break-inside-avoid mb-6 bg-white border border-gold/15 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-md w-full animate-slide-up group hover:shadow-xl transition-all relative">
       <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-gold-light border border-gold/20 flex items-center justify-center font-black text-text-main shadow-sm">{post.avatar}</div>
            <div>
              <p className="text-sm font-black leading-tight text-text-main">{post.author}</p>
              <p className="text-[10px] text-bronze uppercase font-bold mt-0.5 flex items-center gap-1">
                {post.time} {post.location && <><span className="material-symbols-outlined text-[10px]">location_on</span>{post.location}</>}
              </p>
            </div>
          </div>
          {isAdmin && !post.id.startsWith('m') && <button onClick={() => onDelete(post.id)} className="text-red-400 hover:text-red-600 transition-colors p-1"><span className="material-symbols-outlined">delete</span></button>}
       </div>
       
       <div className="px-4 pb-4">
         <p className="text-sm font-medium whitespace-pre-wrap leading-relaxed text-text-main">{post.content}</p>
         {post.tags && post.tags.length > 0 && (
           <div className="flex flex-wrap gap-2 mt-3">
             {post.tags.map(tag => (<span key={tag} className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">#{tag}</span>))}
           </div>
         )}
       </div>
       
       {post.image && <div className="w-full bg-black/5 relative"><img src={post.image} className="w-full max-h-[400px] object-cover transition-transform duration-[2s] group-hover:scale-[1.02]" loading="lazy" /></div>}
       
       <div className="p-3 flex items-center gap-6 border-t border-gold/5 bg-background-light/30">
         <button onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }} className={`flex items-center gap-1.5 font-black text-xs transition-colors ${liked ? 'text-primary' : 'text-text-soft hover:text-primary'}`}>
            <span className={`material-symbols-outlined text-lg ${liked ? 'fill-1 animate-ping-once' : ''}`}>{liked ? 'favorite' : 'favorite_border'}</span> {likes}
         </button>
         
         <button onClick={() => setShowComments(!showComments)} className={`flex items-center gap-1.5 font-black text-xs transition-colors ${showComments ? 'text-primary' : 'text-text-soft hover:text-primary'}`}>
            <span className={`material-symbols-outlined text-lg ${showComments ? 'fill-1' : ''}`}>chat_bubble</span> {commentsList.length}
         </button>
         
         <button onClick={() => setShowShareOptions(!showShareOptions)} className={`flex items-center gap-1.5 font-black text-xs ml-auto transition-colors active:scale-95 ${showShareOptions ? 'text-primary' : 'text-text-soft hover:text-primary'}`}>
            <span className="material-symbols-outlined text-lg">share</span>
         </button>
       </div>

       {showShareOptions && (
         <div className="p-4 bg-[#FDFBF7] border-t border-gold/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
            <span className="text-xs md:text-sm font-black text-[#4A2511] uppercase tracking-widest">
              Chia sẻ bài viết này:
            </span>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 md:flex-none bg-[#1877F2] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#166FE5] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">public</span> Facebook
              </a>
              <button 
                onClick={copyToClipboard} 
                className="flex-1 md:flex-none bg-white border-2 border-[#4A2511]/20 text-[#4A2511] px-5 py-2.5 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-gold/10 transition-colors shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-base">link</span> Copy Link
              </button>
            </div>
         </div>
       )}

       {showComments && (
         <div className="p-4 bg-background-light border-t border-gold/10 animate-fade-in">
            <div className="space-y-4 mb-4 max-h-[250px] overflow-y-auto custom-scrollbar">
               {commentsList.length === 0 ? <p className="text-xs text-center text-text-soft italic">Chưa có bình luận nào. Hãy là người đầu tiên!</p> : null}
               {commentsList.map(c => (
                  <div key={c.id} className="flex gap-3">
                     <div className="size-8 rounded-full bg-white border border-gold/20 flex items-center justify-center text-xs font-black shrink-0 shadow-sm text-text-main">{c.avatar}</div>
                     <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-none border border-gold/10 shadow-sm">
                        <div className="flex items-baseline justify-between mb-1"><span className="text-xs font-black text-text-main">{c.user}</span><span className="text-[9px] text-text-soft font-medium">{c.time}</span></div>
                        <p className="text-xs text-text-soft font-medium">{c.text}</p>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="flex gap-2 items-center mt-3 relative">
               <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black shrink-0 shadow-md">{currentUser.avatar}</div>
               <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendComment()} placeholder="Viết bình luận của bạn..." className="flex-1 bg-white border border-gold/20 rounded-full px-4 py-2 text-xs font-medium outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-text-main" />
               <button onClick={sendComment} disabled={!newComment.trim()} className="absolute right-2 p-1 text-primary disabled:text-text-soft/40 transition-colors"><span className="material-symbols-outlined text-xl">send</span></button>
            </div>
         </div>
       )}
    </article>
  );
});

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(3); 
  const [isLoading, setIsLoading] = useState(true);
  
  let auth: any = null; try { auth = useAuth(); } catch (e) {}
  const isAdmin = auth?.user?.role === 'admin';
  const currentUserData = { name: auth?.user?.fullName || MOCK_CURRENT_USER.name, avatar: auth?.user?.fullName?.charAt(0).toUpperCase() || MOCK_CURRENT_USER.avatar };

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await communityService.getPosts();
      let dbPosts: Post[] = [];
      if (data && data.length > 0) {
         dbPosts = data.map((p: any) => ({
           id: p.id, author: p.author_name || 'Khách', avatar: p.author_avatar || 'K', time: getRelativeTime(p.created_at), timestamp: p.created_at ? new Date(p.created_at).getTime() : Date.now(), location: p.location || '', content: p.content || '', image: p.image_url, likes: p.likes || 0, commentsCount: 0, tags: [], localComments: []
         }));
      }
      setPosts([...dbPosts, ...INITIAL_POSTS]); 
    } catch (e) { 
      console.warn("Lỗi load bài DB, dùng bài mẫu.", e); 
      setPosts(INITIAL_POSTS);
    } finally { setIsLoading(false); }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handlePost = async (content: string, img: string = '') => {
      try {
        await communityService.createPost({ author_name: currentUserData.name, author_avatar: currentUserData.avatar, content: content, image_url: img, location: 'Cộng đồng Sắc Việt', likes: 0 });
        loadPosts(); 
      } catch (error) { alert('Đăng bài thất bại! Hãy kiểm tra Supabase.'); }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm("Xóa bài viết này?")) return;
    try { await communityService.deletePost(postId); setPosts(prev => prev.filter(p => p.id !== postId)); } catch (error) { alert("Lỗi xóa bài!"); }
  };

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div className="min-h-screen font-display bg-[#F7F3E9] py-8 md:py-12 px-4 md:px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-8 text-center">
          <div className="inline-block px-4 py-2 border border-gold/30 rounded-full mb-4 bg-white/50 backdrop-blur-sm"><span className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Mạng Xã Hội Di Sản</span></div>
          <h2 className="text-4xl lg:text-6xl font-black italic mb-3 text-text-main">Mái Đình <span className="text-gold">Chung</span></h2>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-10">
          <div className="flex-1 w-full flex flex-col gap-6">
             <PostComposer onPost={handlePost} currentUser={currentUserData} />
             {isLoading ? <div className="text-center py-10 font-bold text-gold animate-pulse">Đang tải bài viết...</div> : (
               <div className="space-y-6">
                 {visiblePosts.map(p => <PostCard key={p.id} post={p} currentUser={currentUserData} onDelete={handleDeletePost} isAdmin={isAdmin} />)}
               </div>
             )}
             
             {!isLoading && visibleCount < posts.length && (
               <div className="text-center pb-10">
                 <button onClick={() => setVisibleCount(prev => prev + 3)} className="px-8 py-3 rounded-full border-2 border-primary text-primary font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm">
                   Tải thêm bài viết
                 </button>
               </div>
             )}
             {!isLoading && visibleCount >= posts.length && posts.length > 0 && (
               <div className="text-center pb-10 text-xs font-bold text-text-soft italic">Bạn đã xem hết bảng tin hôm nay!</div>
             )}
          </div>

          <aside className="w-full lg:w-80 shrink-0 space-y-6 lg:sticky lg:top-24">
             <QuizWidget />
             <FestivalWidget />
          </aside>
        </div>
      </div>
      
      {/* CSS CHO CÁC HIỆU ỨNG MƯỢT MÀ */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } } 
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; } 
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } 
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; } 
        .custom-scrollbar::-webkit-scrollbar { width: 4px; } 
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } 
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; } 
        .fill-1 { font-variation-settings: 'FILL' 1; } 
        @keyframes ping-once { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } } 
        .animate-ping-once { animation: ping-once 0.3s ease-out; }
      `}</style>
    </div>
  );
};
export default Community;