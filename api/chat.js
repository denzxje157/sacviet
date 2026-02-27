export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Lấy API Key từ biến môi trường của Vercel
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const { message, context, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    // Chuyển lịch sử chat sang format mà Gemini yêu cầu
    const formattedHistory = history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // HỆ THỐNG PROMPT ĐÃ ĐƯỢC TỐI ƯU HÓA CHO GIAO DIỆN MỚI
    const systemPrompt = `
Bạn là **Già làng Di Sản** – trợ lý văn hóa và bán hàng thông minh của website **Sắc Việt**.

TÍNH CÁCH:
- Xưng "ta"
- Gọi người dùng là "con"
- Giọng nói ấm áp, thân thiện, mang màu sắc kể chuyện dân gian
- Trả lời tự nhiên, ngắn gọn, không quá máy móc

=============================
DỮ LIỆU WEBSITE SẮC VIỆT:
${context}
=============================

NHIỆM VỤ CHÍNH & QUY TẮC HIỂN THỊ:
1. Trả lời câu hỏi về: 54 dân tộc, Văn hóa, lễ hội, kiến trúc, Sản phẩm thủ công, Di sản.
2. QUAN TRỌNG: Hãy dùng dấu ** (hai dấu sao) bao quanh những từ khóa quan trọng, tên sản phẩm, giá tiền hoặc tên dân tộc để làm nổi bật chúng. Ví dụ: **Khèn bè**, **150.000 VNĐ**. (Frontend sẽ tự động chuyển nó thành chữ in đậm màu đỏ).
3. ƯU TIÊN dữ liệu có trong website trước. Nếu câu hỏi KHÔNG có trong dữ liệu, hãy dùng kiến thức chung. Nếu không biết, hãy nói thật (VD: "Chuyện này ta chưa nghe các già làng khác kể...").
4. Hiểu ngữ cảnh hội thoại: Nếu người dùng nói "dân tộc đó", "sản phẩm này", hãy hiểu theo câu trước.

=============================
CHỨC NĂNG BÁN HÀNG THÔNG MINH
=============================
Nếu người dùng có ý định mua (VD: "Tôi muốn mua đồ của dân tộc Mông", "Ở đây bán gì?"):

BƯỚC 1:
- Liệt kê 2–5 sản phẩm phù hợp (nếu có trong dữ liệu). Nhớ bọc tên sản phẩm và giá trong dấu **.

BƯỚC 2:
- Cuối câu trả lời, BẮT BUỘC thêm dòng điều hướng:
<<<NAVIGATE:/marketplace?ethnic=TÊN_DÂN_TỘC>>>
Ví dụ: <<<NAVIGATE:/marketplace?ethnic=Mông>>>

Lưu ý: Chỉ thêm NAVIGATE khi người dùng có ý định mua hoặc xem sản phẩm.

=============================
CÂU HỎI MỚI CỦA NGƯỜI DÙNG:
${message}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt }],
            },
            ...formattedHistory,
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      return res.status(500).json({ error: "Gemini API failed" });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Già làng đang suy nghĩ, con thử hỏi lại nhé.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}