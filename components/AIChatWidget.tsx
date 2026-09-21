import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethnicData, marketplaceData } from '../data/mockData.ts';
import { contentService, LibraryItem } from '../services/contentService'; // Đảm bảo đường dẫn này đúng

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  actionLink?: string;
  actionLabel?: string;
}

const FormattedMessageText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={index} className="font-black text-primary">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

const AIChatWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: 'Chào người bạn phương xa! Ta là Già làng Di Sản. Con muốn tìm hiểu về sản phẩm dân tộc nào, hay muốn nghe chuyện gì, ta sẽ kể và dẫn con đến nơi con cần.' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [libraryData, setLibraryData] = useState<LibraryItem[]>([]);

  useEffect(() => {
    const fetchLibData = async () => {
      try {
         const data = await contentService.getLibraryItems();
         setLibraryData(data);
      } catch (e) {
         console.error("Lỗi lấy dữ liệu thư viện", e);
      }
    };
    fetchLibData();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const systemContext = useMemo(() => {
    let context = "DƯỚI ĐÂY LÀ DỮ LIỆU CÓ TRÊN WEBSITE SẮC VIỆT:\n\n";

    context += "=== 1. SẢN PHẨM CHỢ PHIÊN ===\n";
    marketplaceData.forEach(group => {
       group.items.forEach(item => {
          context += `- Dân tộc: ${group.e} | Sản phẩm: ${item.n} | Giá: ${item.p}\n`;
       });
    });


    context += "\n=== 3. DÂN TỘC ===\n";
    ethnicData.forEach(ethnic => {
       context += `- ${ethnic.name} | Nơi sống: ${ethnic.location}\n`;
    });

    context += "\n=== 4. THƯ VIỆN ===\n";
    libraryData.forEach(lib => {
       context += `- ${lib.title}: ${lib.desc}\n`;
    });

    return context;
  }, [libraryData]);

  const generateLocalFallbackResponse = (
    query: string,
    libData: LibraryItem[]
  ): { text: string; actionLink?: string; actionLabel?: string } => {
    const q = query.toLowerCase().trim();

    // 1. Dân tộc cụ thể
    const matchedEthnic = ethnicData.find(e => 
      q.includes(e.name.toLowerCase()) || 
      (e.otherNames && e.otherNames.toLowerCase().includes(q))
    );

    if (matchedEthnic) {
      const matchedProducts = marketplaceData.find(m => 
        m.e.toLowerCase() === matchedEthnic.name.toLowerCase()
      );

      let text = `Chào con! Về đồng bào **${matchedEthnic.name}**, dân tộc cư trú chủ yếu tại **${matchedEthnic.location}** với bề dày truyền thống văn hóa rực rỡ từ trang phục thổ cẩm đến các điệu múa lễ hội độc đáo.`;
      
      if (matchedProducts && matchedProducts.items.length > 0) {
        const topItems = matchedProducts.items.slice(0, 3).map(it => `• **${it.n}** (${it.p})`).join('\n');
        text += `\n\nHiện chợ phiên Sắc Việt đang lưu giữ những báu vật của đồng bào:\n${topItems}\n\nCon có thể ghé thăm gian hàng để chiêm ngưỡng và tìm hiểu thêm nhé!`;
        return {
          text,
          actionLink: `/marketplace?ethnic=${encodeURIComponent(matchedEthnic.name)}`,
          actionLabel: `Đến gian hàng ${matchedEthnic.name}`
        };
      }

      return {
        text: text + `\n\nCon có muốn tìm hiểu thêm tư liệu và ảnh chụp di sản của đồng bào ${matchedEthnic.name} không?`,
        actionLink: `/library`,
        actionLabel: `Mở Thư Viện Di Sản`
      };
    }

    // 2. Sản phẩm / Chợ phiên / Mua sắm / Giá tiền
    if (q.includes('mua') || q.includes('giá') || q.includes('sản phẩm') || q.includes('chợ') || q.includes('thổ cẩm') || q.includes('vải') || q.includes('khèn') || q.includes('trà') || q.includes('bạc') || q.includes('gốm')) {
      const foundItems: { group: string; name: string; price: string }[] = [];
      marketplaceData.forEach(group => {
        group.items.forEach(item => {
          if (q.includes(item.n.toLowerCase()) || item.n.toLowerCase().split(' ').some(w => w.length > 2 && q.includes(w))) {
            foundItems.push({ group: group.e, name: item.n, price: item.p });
          }
        });
      });

      if (foundItems.length > 0) {
        const listStr = foundItems.slice(0, 3).map(i => `• **${i.name}** (Dân tộc ${i.group}) — Giá: ${i.price}`).join('\n');
        return {
          text: `Già làng tìm thấy ngay cho con những sản phẩm thủ công tinh hoa này:\n\n${listStr}\n\nTất cả đều được các nghệ nhân bản địa dệt may và chế tác thủ công tỉ mỉ.`,
          actionLink: `/marketplace`,
          actionLabel: `Đến Chợ Phiên Sắc Việt`
        };
      }

      return {
        text: `Chợ Phiên Sắc Việt hiện quy tụ hơn 70 sản phẩm thủ công truyền thống: trang phục dệt thổ cẩm H'Mông, bạc Chăm, trà Shan tuyết Hà Giang... do chính tay các nghệ nhân chế tác. Mời con ghé thăm chợ!`,
        actionLink: `/marketplace`,
        actionLabel: `Khám phá Chợ Phiên`
      };
    }

    // 3. Nghệ nhân & Bản làng
    if (q.includes('nghệ nhân') || q.includes('thợ') || q.includes('bản làng') || q.includes('nghề')) {
      return {
        text: `Mỗi sản phẩm trên Sắc Việt đều gắn liền với cuộc đời của một Nghệ nhân ưu tú gìn giữ hồn cốt dân tộc. Con có thể vào xem tiểu sử, xưởng nghề và gửi lời tri ân tới các nghệ nhân:`,
        actionLink: `/artisans`,
        actionLabel: `Xem danh sách Nghệ nhân`
      };
    }

    // 4. Tra cứu đơn hàng
    if (q.includes('đơn hàng') || q.includes('tra cứu') || q.includes('vận chuyển') || q.includes('giao hàng') || q.includes('kiểm tra đơn')) {
      return {
        text: `Con muốn kiểm tra đơn hàng đã đặt phải không? Con có thể tra cứu trạng thái giao nhận, hóa đơn và mã đơn trực tiếp tại đây:`,
        actionLink: `/orders`,
        actionLabel: `Xem Đơn Hàng Của Tôi`
      };
    }

    // 5. Thư viện / Lễ hội / Phong tục
    if (q.includes('lễ hội') || q.includes('thư viện') || q.includes('phong tục') || q.includes('lịch sử') || q.includes('truyền thống')) {
      return {
        text: `Kho tàng văn hóa của 54 dân tộc anh em vô cùng phong phú và thiêng liêng. Mời con vào Thư Viện Di Sản để xem ảnh tư liệu, video và các bài viết nghiên cứu sâu sắc:`,
        actionLink: `/library`,
        actionLabel: `Mở Thư Viện Di Sản`
      };
    }

    // 6. Mặc định
    return {
      text: `Chào con! Già làng Di Sản luôn sẵn sàng giải đáp về trang phục, lễ hội, câu chuyện 54 dân tộc, hoặc hướng dẫn con tìm những món đồ thủ công độc bản. Con muốn tìm hiểu về dân tộc hay sản phẩm nào?`,
      actionLink: `/marketplace`,
      actionLabel: `Khám phá Chợ Phiên`
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: inputText };
    const aiMsgId = (Date.now() + 1).toString();
    const updatedMessages = [...messages, userMsg];

    setMessages([...updatedMessages, { id: aiMsgId, role: "model", text: "" }]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          context: systemContext,
          history: updatedMessages.map(m => ({
            role: m.role === "model" ? "assistant" : "user",
            content: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const data = await response.json();
      let fullText = data.reply || "";
      if (!fullText) throw new Error("Phản hồi rỗng");

      let actionLink: string | undefined;
      let actionLabel: string | undefined;

      const navigateMatch = fullText.match(/<<<NAVIGATE:(.*?)>>>/);
      if (navigateMatch) {
        fullText = fullText.replace(navigateMatch[0], "").trim();
        actionLink = navigateMatch[1];

        if (actionLink.includes("marketplace")) {
          const ethnicParam = actionLink.split("ethnic=")[1];
          const ethnicName = ethnicParam ? decodeURIComponent(ethnicParam) : "Chợ Phiên";
          actionLabel = `Đến gian hàng ${ethnicName}`;
        } else {
          actionLabel = "Xem chi tiết";
        }
      }

      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId ? { ...msg, text: fullText, actionLink, actionLabel } : msg
      ));

    } catch (error) {
      console.warn("Kích hoạt tri thức Già Làng dự phòng:", error);
      const fallback = generateLocalFallbackResponse(userMsg.text, libraryData);
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId 
          ? { ...msg, text: fallback.text, actionLink: fallback.actionLink, actionLabel: fallback.actionLabel } 
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNavigate = (link: string) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-3 bottom-18 sm:bottom-24 sm:inset-x-auto sm:right-6 sm:w-[400px] h-[520px] max-h-[78vh] bg-[#F9F5EA] rounded-[2rem] shadow-2xl border-3 sm:border-4 border-gold z-[200] flex flex-col overflow-hidden animate-slide-up origin-bottom-right">
      {/* Header */}
      <div className="bg-primary p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
        <div className="flex items-center gap-3 relative z-10 text-white">
           <div className="size-12 rounded-full bg-white border-2 border-gold flex items-center justify-center overflow-hidden shadow-md">
              <img src="https://cdn-icons-png.flaticon.com/512/3938/3938634.png" alt="Già Làng" className="w-9 h-9 object-cover" />
           </div>
           <div>
              <h3 className="font-black text-base uppercase tracking-widest">Già Làng Di Sản</h3>
              <p className="text-[10px] text-gold-light font-medium flex items-center gap-1">
                 <span className="size-2 bg-green-400 rounded-full animate-pulse"></span> Sẵn sàng giúp đỡ
              </p>
           </div>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white hover:rotate-90 transition-all relative z-10 bg-white/10 rounded-full p-1">
           <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]">
         {messages.map((msg) => {
            if (!msg.text && msg.role === 'model') return null;

            return (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                 <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-text-main border border-gold/20 rounded-bl-none'
                 }`}>
                    {msg.role === 'user' ? msg.text : <FormattedMessageText text={msg.text} />}
                 </div>
                 
                 {msg.actionLink && msg.actionLabel && (
                   <button 
                     onClick={() => handleNavigate(msg.actionLink!)}
                     className="mt-2 ml-2 bg-gold text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg hover:bg-bronze transition-all flex items-center gap-2 animate-fade-in"
                   >
                     {msg.actionLabel}
                     <span className="material-symbols-outlined text-sm">arrow_forward</span>
                   </button>
                 )}
              </div>
            );
         })}
         {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white border border-gold/20 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center shadow-sm">
                  <span className="text-xs text-bronze font-bold mr-2">Đang viết...</span>
                  <div className="flex gap-1">
                    <span className="size-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                    <span className="size-1.5 bg-primary/60 rounded-full animate-bounce delay-100"></span>
                    <span className="size-1.5 bg-primary/60 rounded-full animate-bounce delay-200"></span>
                  </div>
               </div>
            </div>
         )}
         <div ref={messagesEndRef} />
      </div>

      {/* Input Area - FIX LỖI NÚT LỆCH */}
      <div className="p-4 bg-white border-t border-gold/20 shrink-0 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
         <div className="flex items-end gap-2 bg-background-light border-2 border-gold/20 rounded-2xl p-2 focus-within:border-primary transition-all shadow-inner">
            <textarea
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               onKeyDown={handleKeyPress}
               placeholder="Hỏi về sản phẩm, văn hóa..."
               data-gramm="false" 
               data-enable-grammarly="false"
               className="flex-1 bg-transparent border-none focus:ring-0 p-2 text-sm text-text-main placeholder:text-text-soft/50 resize-none max-h-24 font-medium focus:outline-none"
               rows={1}
               style={{ minHeight: '40px' }}
            />
            <button 
               type="button"
               onClick={handleSendMessage}
               disabled={!inputText.trim() || isLoading}
               className="shrink-0 size-10 rounded-xl bg-primary text-white hover:bg-gold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-md mb-0.5"
            >
               <span className="material-symbols-outlined text-lg">send</span>
            </button>
         </div>
         <p className="text-[9px] text-center text-text-soft/60 mt-2 font-bold uppercase tracking-wide">
            Sắc Việt - Nền tảng kết nối Chợ Phiên đến với Muôn Phương
         </p>
      </div>
    </div>
  );
};

export default AIChatWidget;