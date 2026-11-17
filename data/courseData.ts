export interface LessonItem {
  id: string;
  order: number;
  title: string;
  duration: string;
  description: string;
  videoId: string;
  isPreviewFree?: boolean;
}

export interface CraftKitItem {
  name: string;
  quantity: string;
  desc: string;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'Gốm cổ' | 'Dệt thổ cẩm' | 'Đan lát mây tre' | 'Tranh dân gian' | 'Nhạc cụ dân tộc' | 'Thêu thủ công';
  ethnic: string;
  artisanId?: string;
  artisanName: string;
  artisanTitle: string;
  artisanAvatar: string;
  artisanVillage: string;
  price: number;
  comboPrice: number; // Học online + Hộp DIY Kit
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  totalDuration: string;
  totalLessons: number;
  level: 'Nhập môn' | 'Cơ bản' | 'Nâng cao';
  coverImage: string;
  trailerVideoId: string;
  overview: string[];
  skillsLearned: string[];
  craftKit: {
    kitName: string;
    kitImage: string;
    includes: CraftKitItem[];
    shippingNote: string;
  };
  lessons: LessonItem[];
  linkedProductId?: string;
  linkedProductName?: string;
  linkedProductPrice?: string;
  certificateTitle: string;
}

export const courseData: Course[] = [
  {
    id: 'gom-bau-truc',
    title: 'Nghệ Thuật Nặn Gốm Cổ Không Bàn Xoay Bàu Trúc',
    subtitle: 'Học cách "tay làm tay xoay, người đi giật lùi" và kỹ thuật nung củi lộ thiên từ di sản UNESCO.',
    category: 'Gốm cổ',
    ethnic: 'Chăm',
    artisanId: 'dang-thi-phan',
    artisanName: 'Đàng Thị Phan',
    artisanTitle: 'Báu vật nhân văn sống • Nghệ nhân Gốm Cổ',
    artisanAvatar: '/artisans/dang-thi-phan.jpg',
    artisanVillage: 'Làng gốm Bàu Trúc, Ninh Phước, Ninh Thuận',
    price: 199000,
    comboPrice: 420000,
    rating: 4.95,
    reviewsCount: 128,
    studentsCount: 540,
    totalDuration: '115 phút • 5 bài học',
    totalLessons: 5,
    level: 'Nhập môn',
    coverImage: '/artisans/artisan-pottery.jpg',
    trailerVideoId: 'T-ZQIoibB-k',
    overview: [
      'Gốm Bàu Trúc là một trong những làng gốm cổ xưa nhất Đông Nam Á, được UNESCO ghi danh vào Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp năm 2022.',
      'Khác với mọi dòng gốm trên thế giới dùng bàn xoay, phụ nữ Chăm đi giật lùi nhịp nhàng quanh bàn đất cố định, dùng đôi tay trần và miếng vải ướt vuốt nên hình hài chiếc bình.',
      'Khóa học hướng dẫn bạn từ bước cảm nhận đất sét Sông Quao, tạo dáng bình gốm mini tại nhà và kỹ thuật hun khói rơm tạo vân màu huyền bí.'
    ],
    skillsLearned: [
      'Hiểu triết lý "Mẹ Đất" và nguồn gốc văn hóa gốm cổ Champa',
      'Kỹ thuật nhào nặn đất sét dẻo mịn đúng chuẩn độ ẩm',
      'Động tác xoay thân tạo dáng bình tròn đều không cần bàn xoay',
      'Dùng cọng tre non và vỏ sò biển khắc hoa văn sóng nước thần',
      'Tự nung và hoàn thiện tác phẩm trang trí gốm mộc độc bản'
    ],
    craftKit: {
      kitName: 'Hộp Đất Sét & Dụng Cụ Gốm Bàu Trúc DIY',
      kitImage: '/artisans/cham-pottery.jpg',
      includes: [
        { name: 'Đất sét mịn Sông Quao', quantity: '1.5 kg', desc: 'Đất sét tự nhiên đã lọc tạp chất và ủ dẻo', icon: 'landscape' },
        { name: 'Miếng vải dệt Chăm vuốt láng', quantity: '2 miếng', desc: 'Vải cotton thấm nước giúp làm bóng bề mặt gốm', icon: 'crop_square' },
        { name: 'Thanh tre vót nhọn tạo hoa văn', quantity: '3 thanh', desc: 'Mô phỏng bút khắc hoa văn cổ của nghệ nhân', icon: 'edit' },
        { name: 'Vỏ sò biển tạo vân sóng', quantity: '2 chiếc', desc: 'Vỏ sò tự nhiên lấy từ bờ biển Ninh Thuận', icon: 'water' },
        { name: 'Hũ màu tạo khói tự nhiên', quantity: '50 ml', desc: 'Chiết xuất từ quả thị rừng để tạo mảng màu đen khói', icon: 'palette' }
      ],
      shippingNote: 'Đóng gói hộp kraft chống ẩm, giao hỏa tốc toàn quốc trong 2 - 3 ngày.'
    },
    lessons: [
      { id: 'gbt-1', order: 1, title: 'Bài 1: Linh hồn đất sét Sông Quao & Di sản UNESCO', duration: '18 phút', description: 'Tìm hiểu lịch sử 800 năm làng Bàu Trúc và lý do phụ nữ Chăm đi giật lùi.', videoId: 'T-ZQIoibB-k', isPreviewFree: true },
      { id: 'gbt-2', order: 2, title: 'Bài 2: Kỹ thuật nhồi đất & tạo phôi thô ban đầu', duration: '24 phút', description: 'Cân bằng độ ẩm của đất sét sông Quao, loại bỏ bọt khí và dựng trụ tròn đất sét.', videoId: 'XNhIcqrlgBE' },
      { id: 'gbt-3', order: 3, title: 'Bài 3: Đôi tay nặn gốm & Bước chân xoay tròn', duration: '28 phút', description: 'Mô phỏng tư thế đi lùi của nghệ nhân để vuốt phình thân bình và vuốt thắt cổ.', videoId: 'XZ6QFeeMLAY' },
      { id: 'gbt-4', order: 4, title: 'Bài 4: Khắc hoa văn sóng nước thần Ia & răng cưa Bimong', duration: '22 phút', description: 'Dùng cọng tre non và vỏ sò khắc họa tiết truyền thống của người Chăm.', videoId: 'DHbePoB7oxU' },
      { id: 'gbt-5', order: 5, title: 'Bài 5: Phơi mát trong bóng râm & Bí quyết nung củi tạo màu', duration: '23 phút', description: 'Cách phơi gốm không bị nứt và kỹ thuật hun khói rơm tạo lớp vân lửa trần.', videoId: 'YeqLuq2zKGg' }
    ],
    linkedProductId: 'cham-sp-2',
    linkedProductName: 'Bình Gốm Bàu Trúc Nung Củi Đất Đỏ',
    linkedProductPrice: '420.000 VNĐ',
    certificateTitle: 'Chứng Nhận Nhập Môn Gốm Cổ Bàu Trúc'
  },
  {
    id: 've-sap-ong-lung-tam',
    title: 'Kỹ Thuật Vẽ Sáp Ong Bút Đồng & Nhuộm Chàm Lùng Tám',
    subtitle: 'Trải nghiệm 41 công đoạn thủ công vẽ hoa văn hình học cổ truyền của người Mông hoa Hà Giang.',
    category: 'Dệt thổ cẩm',
    ethnic: "H'Mông",
    artisanId: 'vang-thi-mai',
    artisanName: 'Vàng Thị Mai',
    artisanTitle: 'Nghệ nhân Ưu tú • Người giữ hồn lanh Lùng Tám',
    artisanAvatar: '/artisans/vang-thi-mai.jpg',
    artisanVillage: 'Thôn Lùng Tám, Quản Bạ, Hà Giang',
    price: 249000,
    comboPrice: 480000,
    rating: 4.98,
    reviewsCount: 164,
    studentsCount: 680,
    totalDuration: '135 phút • 5 bài học',
    totalLessons: 5,
    level: 'Cơ bản',
    coverImage: '/artisans/lung-tam-cover.jpg',
    trailerVideoId: '4FBn1PALVrg',
    overview: [
      'Nghệ thuật vẽ sáp ong trên vải lanh của người Mông Lùng Tám là đỉnh cao của sự khéo léo và tính toán hình học trực quan.',
      'Người thợ không dùng thước kẻ hay mẫu vẽ sẵn. Bằng cây bút cán tre gắn lá đồng nhỏ, họ chấm sáp ong rừng nóng chảy vẽ từng nét hoa văn mắt chim, chân nhện cân đối đến từng milimet.',
      'Khóa học tặng kèm bút đồng và sáp ong thật gửi từ cao nguyên đá Quản Bạ để bạn tự tay vẽ chiếc khăn lanh phong cách Rustic.'
    ],
    skillsLearned: [
      'Nhận biết sợi lanh đá tự nhiên và cách là phẳng mặt vải bằng đá lăn',
      'Kiểm soát nhiệt độ sáp ong rừng trên ngọn nến',
      'Cầm bút đồng lá đôi kéo đường sáp thẳng tắp và đường xoắn ốc đối xứng',
      'Hiểu ý nghĩa hoa văn vũ trụ, hoa bí ngô và mắt chim trong tâm thức H\'Mông',
      'Quy trình luộc sáp trong nước sôi để hiện hoa văn trắng tinh khôi'
    ],
    craftKit: {
      kitName: 'Bộ Hộp Vẽ Sáp Ong Lanh Mông Lùng Tám',
      kitImage: '/artisans/lung-tam-batik.jpg',
      includes: [
        { name: 'Vải lanh dệt tay thô mộc', quantity: '1 tấm (40x40cm)', desc: 'Vải lanh tự nhiên dệt từ nương đá Lùng Tám', icon: 'texture' },
        { name: 'Bút vẽ sáp ong ngòi đồng', quantity: '2 cây (nét thanh & nét đậm)', desc: 'Bút thủ công chế tác bởi thợ rèn người Mông', icon: 'brush' },
        { name: 'Cục sáp ong rừng nguyên chất', quantity: '150g', desc: 'Sáp ong mật rừng tự nhiên có mùi thơm dịu', icon: 'local_florist' },
        { name: 'Nến đun sáp & chân đế gốm', quantity: '1 bộ', desc: 'Dụng cụ giữ ấm chén sáp ong khi vẽ', icon: 'candle' },
        { name: 'Bột chàm tự nhiên cô đặc', quantity: '1 gói (100g)', desc: 'Dùng nhuộm màu xanh chàm sâu thẳm sau khi vẽ', icon: 'water_drop' }
      ],
      shippingNote: 'Đóng gói trong túi lanh canvas thân thiện môi trường, kèm thư tay của nghệ nhân.'
    },
    lessons: [
      { id: 'vso-1', order: 1, title: 'Bài 1: Cây lanh đá & Biểu tượng văn hóa người Mông hoa', duration: '20 phút', description: 'Ý nghĩa của sợi lanh trong vòng đời người Mông từ tấm bé đến khi về với tổ tiên.', videoId: '4FBn1PALVrg', isPreviewFree: true },
      { id: 'vso-2', order: 2, title: 'Bài 2: Làm quen với bút đồng & Nghệ thuật điều tiết ngọn lửa', duration: '22 phút', description: 'Cách đun chảy sáp ong và giữ nhiệt độ vừa phải để sáp thấm sâu vào thớ vải.', videoId: 'ijAqyqtRLa0' },
      { id: 'vso-3', order: 3, title: 'Bài 3: Những nét vẽ cơ bản — Đường thẳng, chữ thập & hoa văn mắt chim', duration: '25 phút', description: 'Luyện cổ tay và giữ bút cân bằng để sáp chảy đều đặn không đứt đoạn.', videoId: '1sFnojAk3wM' },
      { id: 'vso-4', order: 4, title: 'Bài 4: Nhuộm chàm truyền thống — Hành trình xanh ngút ngàn', duration: '26 phút', description: 'Kỹ thuật ngâm chàm trong chum gỗ, phơi nắng gió núi đá và bảo vệ lớp sáp.', videoId: 'BV1ZkM5jXvo' },
      { id: 'vso-5', order: 5, title: 'Bài 5: Luộc tan sáp ong & Chiêm ngưỡng tác phẩm đầu tay', duration: '22 phút', description: 'Thả vải vào nồi nước sôi để lớp sáp tan biến, làm lộ hoa văn trắng tinh xảo.', videoId: '8LtVurD7D7A' }
    ],
    linkedProductId: 'hmong-sp-1',
    linkedProductName: 'Khăn Lanh Dệt Tay Thêu Họa Tiết Sáp Ong',
    linkedProductPrice: '650.000 VNĐ',
    certificateTitle: 'Chứng Nhận Kỹ Thuật Vẽ Sáp Ong Lùng Tám'
  },
  {
    id: 'det-tho-cam-my-nghiep',
    title: 'Dệt Thổ Cẩm Thoi Cổ Truyền Hoa Văn Mắt Công Champa',
    subtitle: 'Nắm vững nhịp thoi đưa kẽo kẹt và kỹ thuật tạo hoa văn nổi hai mặt từ ngôi làng hơn 800 năm tuổi.',
    category: 'Dệt thổ cẩm',
    ethnic: 'Chăm',
    artisanId: 'dang-thi-truong',
    artisanName: 'Đàng Thị Trương',
    artisanTitle: 'Nghệ nhân Ưu tú • Bàn tay vàng thổ cẩm Mỹ Nghiệp',
    artisanAvatar: '/artisans/dang-thi-truong.jpg',
    artisanVillage: 'Làng dệt Mỹ Nghiệp, TT. Phước Dân, Ninh Thuận',
    price: 220000,
    comboPrice: 450000,
    rating: 4.92,
    reviewsCount: 95,
    studentsCount: 410,
    totalDuration: '105 phút • 5 bài học',
    totalLessons: 5,
    level: 'Cơ bản',
    coverImage: '/artisans/cham-textile.png',
    trailerVideoId: '4hkhjzvMIug',
    overview: [
      'Làng Mỹ Nghiệp gìn giữ bí quyết dệt thoi gõ nhịp độc nhất vô nhị: cùng một tấm vải nhưng hai mặt đều nổi rõ hoa văn sắc sảo.',
      'Khóa học đưa bạn hòa mình vào không gian rộn rã của tiếng thoi gõ, học cách mắc sợi dọc, giăng sợi ngang và dệt dải băng trang trí hoa văn Mắt công Kukak thanh cao.',
      'Combo kèm khung dệt gỗ mini để bạn tự dệt chiếc vòng tay hoặc quai túi thổ cẩm tại nhà.'
    ],
    skillsLearned: [
      'Cấu tạo và cơ chế hoạt động của khung dệt thoi cổ truyền',
      'Cách mắc sợi dọc căng đều và không bị rối',
      'Động tác đạp kiềng chân nhịp nhàng kết hợp gõ thanh thoi',
      'Kỹ thuật gài sợi màu nổi tạo hình hoa văn Mắt Công Kukak',
      'Thắt tua rua mép vải và hoàn thiện phụ kiện thời trang'
    ],
    craftKit: {
      kitName: 'Bộ Khung Dệt Thoi Mini Mỹ Nghiệp DIY',
      kitImage: '/pictures-sanpham/cham/san-pham-det-tho-cam-my-nghiep.png',
      includes: [
        { name: 'Khung dệt gỗ để bàn mini', quantity: '1 chiếc (30x20cm)', desc: 'Gỗ thông mịn đã xẻ rãnh đều chuẩn xác', icon: 'view_in_ar' },
        { name: 'Con thoi gỗ luồn chỉ', quantity: '2 chiếc', desc: 'Thoi trơn bóng giúp lướt chỉ nhanh và êm', icon: 'shuffle' },
        { name: 'Cuộn sợi bông nhuộm củ tự nhiên', quantity: '4 cuộn (Đỏ, Vàng, Chàm, Trắng)', desc: 'Sợi cotton dẻo dai nhuộm thảo mộc an toàn', icon: 'palette' },
        { name: 'Lược gõ sợi dệt gỗ', quantity: '1 chiếc', desc: 'Dùng nén chặt các luống chỉ ngang', icon: 'format_align_center' },
        { name: 'Bộ kim móc len thắt tua rua', quantity: '2 cây', desc: 'Dùng thắt viền hoàn thiện sản phẩm', icon: 'handyman' }
      ],
      shippingNote: 'Bộ kit kèm tờ hướng dẫn minh họa khổ lớn và mã QR quét video bài tập.'
    },
    lessons: [
      { id: 'dtc-1', order: 1, title: 'Bài 1: Hồn cốt 800 năm làng dệt thoi Mỹ Nghiệp', duration: '16 phút', description: 'Gặp gỡ nghệ nhân Đàng Thị Trương và câu chuyện gìn giữ nhịp thoi của dân tộc Chăm.', videoId: '4hkhjzvMIug', isPreviewFree: true },
      { id: 'dtc-2', order: 2, title: 'Bài 2: Chuẩn bị khung dệt & Kỹ thuật giăng sợi dọc', duration: '22 phút', description: 'Cách luồn sợi song song, căn chỉnh lực căng để tấm vải không bị xô lệch.', videoId: 'xqL6rncReh8' },
      { id: 'dtc-3', order: 3, title: 'Bài 3: Nhịp thoi cơ bản — Đạp kiềng, phóng thoi, gõ lược', duration: '25 phút', description: 'Tập nhịp phối hợp tay mắt đều đặn để dệt lớp nền thổ cẩm phẳng mịn.', videoId: 'frPo76uJ3PY' },
      { id: 'dtc-4', order: 4, title: 'Bài 4: Gài sợi màu tạo hoa văn Mắt Công & Hạt Kê', duration: '24 phút', description: 'Đếm sợi chỉ nổi và luồn con thoi phụ tạo hoa văn biểu trưng hoàng gia Champa.', videoId: 'N6y6toOfGBY' },
      { id: 'dtc-5', order: 5, title: 'Bài 5: Tháo khung, khóa chỉ & Thắt tua rua nghệ thuật', duration: '18 phút', description: 'Kỹ thuật khóa mép vải không bung sợi và thắt nút bím tua rua sang trọng.', videoId: 'uymJbosZv8M' }
    ],
    linkedProductId: 'cham-sp-1',
    linkedProductName: 'Tấm Dệt Thổ Cẩm Mỹ Nghiệp Hoa Văn Mắt Công',
    linkedProductPrice: '1.850.000 VNĐ',
    certificateTitle: 'Chứng Nhận Dệt Thoi Thổ Cẩm Chăm Mỹ Nghiệp'
  },
  {
    id: 'dan-gui-bana-konktu',
    title: 'Bí Quyết Vót Nan & Đan Gùi Đại Ngàn Tây Nguyên',
    subtitle: 'Cùng Già làng A Luk vào rừng già tìm mây nếp, chuốt nan mỏng như lá lúa và đan gùi hoa văn K\'tơh.',
    category: 'Đan lát mây tre',
    ethnic: 'Ba Na',
    artisanId: 'y-sinh',
    artisanName: 'Già làng A Luk (Y Sinh)',
    artisanTitle: 'Nghệ nhân Ưu tú • Cây đại thụ đan lát làng Kon K\'tu',
    artisanAvatar: '/artisans/y-sinh.jpg',
    artisanVillage: 'Làng Kon K\'tu, Xã Đăk Rơ Wa, TP. Kon Tum',
    price: 180000,
    comboPrice: 390000,
    rating: 4.96,
    reviewsCount: 88,
    studentsCount: 370,
    totalDuration: '100 phút • 5 bài học',
    totalLessons: 5,
    level: 'Nhập môn',
    coverImage: '/artisans/y-sinh.jpg',
    trailerVideoId: 'zwVx-PbBU_k',
    overview: [
      'Bên dòng sông Đăk Bla huyền thoại chảy ngược, chiếc gùi Ba Na không chỉ là vật dụng đi nương rẫy mà còn cõng cả niềm tự hào của người đàn ông đại ngàn.',
      'Già làng A Luk truyền thụ bí quyết chọn mây nếp không mọt, kỹ thuật dùng dao vót nan mỏng dính và các kiểu đan nong mốt, nong đôi khít khao.',
      'Khóa học tặng kèm set nan mây rừng đã chuốt sẵn để bạn tự tay đan chiếc giỏ đựng đồ hoặc chậu hoa treo mộc mạc.'
    ],
    skillsLearned: [
      'Cách chọn mây tre rừng già theo tuần trăng để chống mọt vĩnh viễn',
      'Kỹ thuật cầm dao chuốt nan đều tay, bóng mượt không xước sợi',
      'Đan đáy gùi hình vuông chịu lực theo kết cấu truyền thống',
      'Đan lồng hoa văn mắt chim Chơ-rao và xương cá Kơ-loong',
      'Uốn vành miệng gùi bằng mây cật dẻo dai'
    ],
    craftKit: {
      kitName: 'Bộ Nan Mây Rừng & Đan Giỏ Ba Na DIY',
      kitImage: '/pictures-sanpham/ba-na/gui-sinh-hoat-i-ray.jpg',
      includes: [
        { name: 'Bó nan mây nếp rừng chuốt sẵn', quantity: '60 thanh (dài 50cm)', desc: 'Nan mây tự nhiên vùng Kon Rẫy dẻo dai', icon: 'forest' },
        { name: 'Dây mây mềm quấn vành miệng', quantity: '5 mét', desc: 'Mây cật chẻ mỏng dùng nẹp vành chắc chắn', icon: 'all_inclusive' },
        { name: 'Dao vót chuyên dụng mini', quantity: '1 chiếc', desc: 'Lưỡi thép sắc bén chuyên dùng chuốt nan thủ công', icon: 'hardware' },
        { name: 'Dùi nhọn trợ lực xỏ nan', quantity: '1 cây', desc: 'Dụng cụ nong lỗ luồn hoa văn', icon: 'pin' },
        { name: 'Khuôn gỗ định hình đáy giỏ', quantity: '1 đế', desc: 'Giúp người mới đan giữ đáy vuông vức cân đối', icon: 'square' }
      ],
      shippingNote: 'Nan mây được xử lý gác bếp tự nhiên chống mọt, an toàn tuyệt đối cho người dùng.'
    },
    lessons: [
      { id: 'dgb-1', order: 1, title: 'Bài 1: Cây mây rừng già & Triết lý đại ngàn của người Ba Na', duration: '18 phút', description: 'Hành trình cùng già làng A Luk vào rừng sâu và kinh nghiệm xem ngày chặt tre.', videoId: 'zwVx-PbBU_k', isPreviewFree: true },
      { id: 'dgb-2', order: 2, title: 'Bài 2: Kỹ thuật vót nan & Ngâm nước giữ độ dẻo dai', duration: '20 phút', description: 'Thao tác kéo lưỡi dao gọt bớt cật, chuốt nan phẳng lì như dải lụa.', videoId: 'XuoGYc46uPM' },
      { id: 'dgb-3', order: 3, title: 'Bài 3: Đan đáy giỏ hình vuông vững chãi', duration: '24 phút', description: 'Đan lóng mốt ken chặt 4 góc tạo bệ đỡ chịu lực cho toàn bộ thân giỏ.', videoId: 'ocKAoIOrB_Y' },
      { id: 'dgb-4', order: 4, title: 'Bài 4: Lên thân gùi & Luồn hoa văn Mắt Chim Rừng K\'tơh', duration: '22 phút', description: 'Đan nong đôi và lồng nan nhuộm khói đen tạo họa tiết đặc trưng Tây Nguyên.', videoId: 'MhVFRUKY8KM' },
      { id: 'dgb-5', order: 5, title: 'Bài 5: Nẹp vành miệng & Kỹ thuật thắt quai chịu tải', duration: '16 phút', description: 'Uốn vành tròn, dùng dây mây khâu chéo chữ X gia cố độ bền chắc.', videoId: 'ROpRyCZ9zv0' }
    ],
    linkedProductId: 'bana-sp-1',
    linkedProductName: 'Gùi Hoa Văn Tinh Xảo Có Nắp Ba Na (Cao cấp)',
    linkedProductPrice: '1.600.000 VNĐ',
    certificateTitle: 'Chứng Nhận Nghệ Thuật Đan Lát Mây Tre Ba Na'
  },
  {
    id: 'det-deng-ta-oi',
    title: 'Bí Truyền Dệt Dèng Luồn Hạt Cườm Ngũ Sắc A Lưới',
    subtitle: 'Khám phá di sản phi vật thể quốc gia: Kỹ thuật đếm sợi gài cườm trực tiếp khi thoi dệt đang chạy.',
    category: 'Dệt thổ cẩm',
    ethnic: 'Tà Ôi',
    artisanId: 'mai-thi-hop',
    artisanName: 'Mai Thị Hợp',
    artisanTitle: 'Nghệ nhân Dân gian • Giữ lửa dệt Dèng A Lưới',
    artisanAvatar: '/artisans/mai-thi-hop.jpg',
    artisanVillage: 'Bản A Hưa, Xã A Đớt, H. A Lưới, Thừa Thiên Huế',
    price: 260000,
    comboPrice: 490000,
    rating: 4.97,
    reviewsCount: 112,
    studentsCount: 460,
    totalDuration: '120 phút • 5 bài học',
    totalLessons: 5,
    level: 'Nâng cao',
    coverImage: '/artisans/mai-thi-hop.jpg',
    trailerVideoId: 'OSN9Z3mZoOg',
    overview: [
      'Dèng Tà Ôi là viên ngọc quý của dãy Trường Sơn hùng vĩ. Kỹ thuật đính cườm độc đáo không phải dệt xong rồi đính, mà nghệ nhân phải luồn cườm chì vào từng sợi chỉ dọc trước khi gõ thoi.',
      'Sai một hạt cườm là hỏng cả bố cục bức tranh. Khóa học được nghệ nhân Mai Thị Hợp trực tiếp hướng dẫn phương pháp tính toán và luồn cườm tạo hoa văn hoa Pơ-lang và ánh sao đêm Pleng.',
      'Combo kèm hạt cườm ngũ sắc và khung dệt gỗ để học viên tự tay tạo nên tấm lót ly hoặc khăn trang trí Dèng quý phái.'
    ],
    skillsLearned: [
      'Lịch sử và vị thế di sản quốc gia của nghề dệt Dèng miền tây xứ Huế',
      'Cách sử dụng khung dệt kiềng chân thô sơ của phụ nữ vùng cao',
      'Kỹ thuật xỏ cườm theo ma trận đồ thị hoa văn truyền thống',
      'Thao tác gạt cườm sát đường thoi và gõ chặt sợi giữ nếp hạt',
      'Tạo đường viền hoa văn cườm A-tó nổi bật trên nền vải đen huyền'
    ],
    craftKit: {
      kitName: 'Hộp Dệt Cườm Dèng Tà Ôi Trải Nghiệm',
      kitImage: '/pictures-sanpham/ta-oi/san-pham-det-tu-zeng-luu-niem-gia-dung.jpg',
      includes: [
        { name: 'Hạt cườm ngũ sắc thủy tinh cổ', quantity: '500 hạt (Trắng, Đỏ, Vàng, Xanh)', desc: 'Hạt cườm bóng loáng không phai màu theo thời gian', icon: 'diamond' },
        { name: 'Sợi chỉ dệt Dèng chuyên dụng', quantity: '3 cuộn (Đen, Đỏ, Vàng)', desc: 'Chỉ sợi cotton bền chắc không đứt khi gõ thoi', icon: 'palette' },
        { name: 'Khung dệt kiềng chân mini gỗ', quantity: '1 bộ', desc: 'Thiết kế cơ động mô phỏng khung dệt cổ truyền A Lưới', icon: 'grid_view' },
        { name: 'Kim luồn cườm đầu cong', quantity: '3 cây', desc: 'Giúp gắp và xỏ cườm vào sợi chỉ siêu nhanh', icon: 'healing' },
        { name: 'Bản đồ ma trận hoa văn mẫu', quantity: '2 tờ in màu', desc: 'Sơ đồ đếm bước cườm hoa Pơ-lang và dấu chân chim', icon: 'map' }
      ],
      shippingNote: 'Sản phẩm thủ công hỗ trợ trực tiếp hợp tác xã dệt thổ cẩm phụ nữ A Đớt.'
    },
    lessons: [
      { id: 'ddt-1', order: 1, title: 'Bài 1: Huyền thoại dệt Dèng & Di sản quốc gia Trường Sơn', duration: '18 phút', description: 'Nghệ nhân Mai Thị Hợp kể câu chuyện những tấm Dèng đi từ buôn làng ra sàn diễn quốc tế.', videoId: 'OSN9Z3mZoOg', isPreviewFree: true },
      { id: 'ddt-2', order: 2, title: 'Bài 2: Đọc hiểu bản đồ ma trận hoa văn cườm cổ', duration: '22 phút', description: 'Cách đếm sợi dọc, định vị từng hàng cườm chì để tạo hình tượng trưng.', videoId: 'riSnxAMhLgo' },
      { id: 'ddt-3', order: 3, title: 'Bài 3: Kỹ thuật luồn cườm & Căng khung dệt kiềng chân', duration: '26 phút', description: 'Tư thế ngồi dệt kiềng chân và phương pháp xỏ hàng trăm hạt cườm nhanh chóng.', videoId: 'LyvK9uTFUlg' },
      { id: 'ddt-4', order: 4, title: 'Bài 4: Gõ thoi khóa cườm — Nghệ thuật chuẩn xác từng milimet', duration: '28 phút', description: 'Động tác gạt cườm đúng vị trí và dùng dao gỗ gõ nén chặt thớ vải.', videoId: '9llO35slTKk' },
      { id: 'ddt-5', order: 5, title: 'Bài 5: Hoàn thiện hoa văn Pơ-lang & Thắt gút bảo lưu', duration: '26 phút', description: 'Khóa chặt các đầu hạt cườm, thắt nút chân cườm trang trí và xử lý mép vải.', videoId: 'iEOIY9nk7oo' }
    ],
    linkedProductId: 'taoi-sp-1',
    linkedProductName: 'Tấm Dèng Nghi Lễ Đính Cườm Ngũ Sắc Tà Ôi',
    linkedProductPrice: '2.800.000 VNĐ',
    certificateTitle: 'Chứng Nhận Tinh Hoa Dệt Dèng Cườm Tà Ôi'
  },
  {
    id: 'det-tho-cam-ede',
    title: 'Dệt Thổ Cẩm Mẫu Hệ & Họa Tiết Thần Kỳ Đà Buôn Tơng Jút',
    subtitle: 'Cảm nhận hơi ấm Mẹ Đất trong từng thớ chỉ k’pă và triết lý mẫu hệ đại ngàn Đắk Lắk.',
    category: 'Dệt thổ cẩm',
    ethnic: 'Ê Đê',
    artisanId: 'h-yam-bkrong',
    artisanName: "H'Yam Bkrông",
    artisanTitle: 'Nghệ nhân Thổ Cẩm Mẫu Hệ • Giám đốc HTX Tơng Bông',
    artisanAvatar: '/artisans/h-yam-bkrong.jpg',
    artisanVillage: 'Buôn Tơng Jút, Xã Ea Kao, TP. Buôn Ma Thuột',
    price: 210000,
    comboPrice: 430000,
    rating: 4.94,
    reviewsCount: 104,
    studentsCount: 490,
    totalDuration: '110 phút • 5 bài học',
    totalLessons: 5,
    level: 'Cơ bản',
    coverImage: '/pictures-sanpham/e-e/gui-an-kin-hoa-tiet.jpg',
    trailerVideoId: '74eZjbZMub8',
    overview: [
      'Trong ngôi nhà dài của người Ê Đê, khung dệt dài luôn đặt bên ô cửa sổ đón nắng ban mai. Phụ nữ Ê Đê dệt tấm chăn k’pă dày dặn bằng sợi chỉ kép nhuộm màu vỏ cây rừng tự nhiên.',
      'Hoa văn Ê Đê mang tính trừu tượng hình học cao, ẩn chứa triết lý nhân sinh sâu sắc về quyền uy của người Mẹ và sự gắn bó keo sơn của dòng tộc.',
      'Bà H\'Yam Bkrông hướng dẫn chi tiết cách phối hợp các gam màu đỏ, đen, vàng và kỹ thuật dệt hoa văn hình tượng Thần Kỳ Đà mang lại may mắn.'
    ],
    skillsLearned: [
      'Hiểu sâu sắc về vai trò người phụ nữ trong chế độ mẫu hệ Ê Đê',
      'Cách nhận biết và phối màu truyền thống: Đen (Đất), Đỏ (Lửa), Vàng (Nắng)',
      'Thao tác dệt sợi kép giúp tấm vải dày dặn và chống chịu sương lạnh',
      'Dệt hoa văn trừu tượng Kỳ Đà Kua và Rùa thần Kơ-hơ-lơ',
      'Kỹ thuật may ráp các dải vải thành tấm chăn k’pă hoàn chỉnh'
    ],
    craftKit: {
      kitName: 'Bộ Thổ Cẩm Ê Đê Tơng Bông Trải Nghiệm',
      kitImage: '/pictures-sanpham/cham/san-pham-det-tho-cam-my-nghiep.png',
      includes: [
        { name: 'Sợi bông kép nhuộm thảo mộc', quantity: '4 cuộn (Đen mun, Đỏ son, Vàng đồng, Trắng)', desc: 'Sợi kép dày dặn đặc trưng thổ cẩm Tây Nguyên', icon: 'palette' },
        { name: 'Thoi dệt gỗ buôn làng', quantity: '2 thanh', desc: 'Thoi trơn dài chuốt tay tinh xảo', icon: 'straighten' },
        { name: 'Thước gạt hoa văn hình học', quantity: '1 thanh', desc: 'Dùng gạt sợi tạo các đường zíc zắc đối xứng', icon: 'menu' },
        { name: 'Kẹp căng mép vải', quantity: '2 chiếc', desc: 'Giúp giữ biên vải luôn thẳng hàng', icon: 'push_pin' }
      ],
      shippingNote: 'Sản phẩm làm từ sợi bông tự nhiên trồng tại vùng đất đỏ bazan Buôn Ma Thuột.'
    },
    lessons: [
      { id: 'dte-1', order: 1, title: 'Bài 1: Ô cửa sổ nhà dài & Tiếng thoi mẫu hệ', duration: '18 phút', description: 'Gặp gỡ nghệ nhân H\'Yam Bkrông và hành trình vực dậy HTX dệt Tơng Bông.', videoId: '74eZjbZMub8', isPreviewFree: true },
      { id: 'dte-2', order: 2, title: 'Bài 2: Ba màu chủ đạo của đại ngàn — Đen, Đỏ và Vàng', duration: '20 phút', description: 'Ý nghĩa triết học Mẹ Đất và cách sắp xếp các dải màu trên khung dệt.', videoId: 'x5hrqllK6Z8' },
      { id: 'dte-3', order: 3, title: 'Bài 3: Kỹ thuật luồn sợi kép — Tấm chăn k’pă ấm áp', duration: '24 phút', description: 'Thao tác dệt sợi đôi tạo độ dày và cách căn chỉnh độ chặt của sợi dệt.', videoId: 'P1VQ7NHbPK0' },
      { id: 'dte-4', order: 4, title: 'Bài 4: Hoa văn Thần Kỳ Đà — Biểu tượng bảo hộ buôn làng', duration: '26 phút', description: 'Cách tạo các đường gấp khúc zíc zắc tượng trưng cho vị thần che chở gia đình.', videoId: 'w-Hw59gp4-8' },
      { id: 'dte-5', order: 5, title: 'Bài 5: Hoàn thiện khăn thổ cẩm & Bảo quản sợi tự nhiên', duration: '22 phút', description: 'Cách giặt ủi và gìn giữ màu sắc thổ cẩm luôn tươi mới qua nhiều năm tháng.', videoId: 'ZV9s9EmbjXw' }
    ],
    linkedProductId: 'ede-sp-1',
    linkedProductName: 'Gùi Đan Kín Họa Tiết Đại Ngàn Ê Đê',
    linkedProductPrice: '1.450.000 VNĐ',
    certificateTitle: 'Chứng Nhận Thổ Cẩm Mẫu Hệ Ê Đê Tơng Bông'
  },
  {
    id: 'theu-tho-cam-dao-do',
    title: 'Thêu Hoa Văn Quả Trám & Bài Thuốc Thảo Mộc Bản Tả Phìn',
    subtitle: 'Nghệ thuật thêu lật mặt trái nổi mặt phải độc đáo và bí quyết tắm lá thuốc người Dao Đỏ Sa Pa.',
    category: 'Thêu thủ công',
    ethnic: 'Dao Đỏ',
    artisanId: 'ly-thi-chien',
    artisanName: 'Lý Thị Chiên',
    artisanTitle: 'Nghệ nhân Thêu Thổ Cẩm • Bản Tả Phìn Sa Pa',
    artisanAvatar: '/artisans/mai-thi-hop.jpg',
    artisanVillage: 'Bản Tả Phìn, Thị xã Sa Pa, Lào Cai',
    price: 230000,
    comboPrice: 460000,
    rating: 4.93,
    reviewsCount: 79,
    studentsCount: 395,
    totalDuration: '105 phút • 5 bài học',
    totalLessons: 5,
    level: 'Cơ bản',
    coverImage: '/artisans/tui-tho-cam.jpg',
    trailerVideoId: 'y_29TfV30S4',
    overview: [
      'Phụ nữ Dao Đỏ tại bản Tả Phìn nổi tiếng với kỹ thuật thêu tay kỳ diệu: người thêu cặm cụi luồn kim ở mặt trái của mảnh vải nhưng hoa văn quả trám và hoa thông lại nổi đều tăm tắp ở mặt phải.',
      'Bên cạnh đó, họ là những bậc thầy thảo dược với bài thuốc tắm lá rừng nức tiếng giúp phục hồi sinh lực.',
      'Khóa học đưa bạn đến với sương mù Sa Pa, học cách thêu chiếc túi thơm thảo mộc với các mũi thêu truyền thống độc bản.'
    ],
    skillsLearned: [
      'Kỹ thuật thêu mặt trái độc đáo của phụ nữ Dao Đỏ',
      'Nhận biết và phối màu chỉ thêu theo ngũ hành: Đỏ, Trắng, Vàng, Xanh, Đen',
      'Tạo hình hoa văn Quả Trám, Cây Thông và Chân Chó bảo hộ',
      'Phối trộn 5 vị thảo mộc rừng Sa Pa làm túi thơm thư giãn',
      'May ráp hoàn chỉnh túi thơm thổ cẩm thủ công'
    ],
    craftKit: {
      kitName: 'Bộ Thêu Túi Thơm Thảo Mộc Dao Đỏ Sa Pa',
      kitImage: '/artisans/tui-tho-cam.jpg',
      includes: [
        { name: 'Vải lanh nhuộm chàm Tả Phìn', quantity: '2 miếng (25x25cm)', desc: 'Vải lanh tự nhiên ngâm chàm thơm mùi lá rừng', icon: 'texture' },
        { name: 'Tép chỉ tơ thêu ngũ sắc', quantity: '5 tép (Đỏ cờ, Trắng bông, Vàng mơ, Xanh lá, Đen)', desc: 'Chỉ tơ bóng dẻo không phai màu', icon: 'palette' },
        { name: 'Kim thêu đầu tù chuyên dụng', quantity: '3 chiếc', desc: 'Không đâm thủng sợi vải mà lách nhẹ qua thớ chỉ', icon: 'healing' },
        { name: 'Gói thảo mộc tắm Dao Đỏ sấy khô', quantity: '100g (Cơm cháy, Chùa dù, Huyết đằng...)', desc: 'Thảo mộc tự nhiên hái từ dãy Hoàng Liên Sơn', icon: 'eco' },
        { name: 'Dây rút bện tua rua hạt bạc', quantity: '2 sợi', desc: 'Điểm nhấn sang trọng phong cách núi rừng', icon: 'diamond' }
      ],
      shippingNote: 'Mùi hương thảo dược thơm ngát tự nhiên được hút chân không bảo quản kỹ lưỡng.'
    },
    lessons: [
      { id: 'tdd-1', order: 1, title: 'Bài 1: Sương mù Tả Phìn & Khăn đỏ thiếu nữ Dao', duration: '18 phút', description: 'Gặp gỡ nghệ nhân Lý Thị Chiên và nét văn hóa trang phục rực rỡ nhất Tây Bắc.', videoId: 'y_29TfV30S4', isPreviewFree: true },
      { id: 'tdd-2', order: 2, title: 'Bài 2: Quy tắc thêu mặt trái — Lật ngược không gian', duration: '22 phút', description: 'Bí quyết đếm canh sợi từ mặt sau mà không làm lệch mặt trước của tấm vải.', videoId: '-2V23k6fY-I' },
      { id: 'tdd-3', order: 3, title: 'Bài 3: Thêu hoa văn Quả Trám & Cây Thông đại ngàn', duration: '25 phút', description: 'Các mũi thêu chéo liên hoàn tạo nên họa tiết hình học biểu trưng cho may mắn.', videoId: 'LLKEvSbZLoM' },
      { id: 'tdd-4', order: 4, title: 'Bài 4: Khám phá bí quyết 30 vị thảo mộc lá tắm người Dao', duration: '20 phút', description: 'Cách nhận biết các loại lá rừng Hoàng Liên Sơn và công dụng phục hồi sức khỏe.', videoId: 'wrInos9R6zI' },
      { id: 'tdd-5', order: 5, title: 'Bài 5: May ráp túi thơm & Thắt tua rua hạt chuông bạc', duration: '20 phút', description: 'Nhồi thảo mộc sấy khô, luồn dây rút và hoàn thiện món quà tinh thần Tây Bắc.', videoId: 'NiZDTt0BSN4' }
    ],
    linkedProductId: 'dao-sp-1',
    linkedProductName: 'Khăn Trùm Đầu Thêu Quả Trám Dao Đỏ',
    linkedProductPrice: '520.000 VNĐ',
    certificateTitle: 'Chứng Nhận Thêu Thổ Cẩm & Thảo Mộc Dao Đỏ'
  },
  {
    id: 'tranh-dong-ho',
    title: 'In Tranh Khắc Gỗ Trên Giấy Điệp Dân Gian Đông Hồ',
    subtitle: 'Nắm vững nghệ thuật "Hồn dân tộc sáng bừng trên giấy điệp", pha màu tự nhiên và ấn mộc bản bằng xơ mướp.',
    category: 'Tranh dân gian',
    ethnic: 'Kinh',
    artisanId: 'nguyen-dang-che',
    artisanName: 'NNƯT Nguyễn Đăng Chế',
    artisanTitle: 'Nghệ nhân Ưu tú • Người giữ hồn tranh Đông Hồ',
    artisanAvatar: '/artisans/vang-thi-mai.jpg',
    artisanVillage: 'Làng tranh Đông Hồ, Thuận Thành, Bắc Ninh',
    price: 199000,
    comboPrice: 399000,
    rating: 4.96,
    reviewsCount: 142,
    studentsCount: 710,
    totalDuration: '115 phút • 5 bài học',
    totalLessons: 5,
    level: 'Nhập môn',
    coverImage: '/pictures-sanpham/ba-na/gui-mua-bieu-dien.webp',
    trailerVideoId: 'YRt8Svr_4vE',
    overview: [
      'Tranh dân gian Đông Hồ là di sản văn hóa phi vật thể quốc gia đang được đệ trình UNESCO ghi danh vào Danh sách cần bảo vệ khẩn cấp.',
      'Sức hút diệu kỳ của tranh Đông Hồ nằm ở chất liệu hoàn toàn từ thiên nhiên: Giấy Dó quét bột vỏ sò điệp óng ánh, màu đen từ than lá tre, màu vàng từ hoa hòe, màu đỏ từ sỏi son.',
      'Khóa học đưa bạn về bên dòng sông Đuống, học cách cầm xơ mướp quét màu và tự tay ấn từng mộc bản gỗ lên giấy điệp tạo bức tranh Vinh hoa - Phú quý.'
    ],
    skillsLearned: [
      'Tìm hiểu lịch sử và ý nghĩa nhân văn của các bức tranh Tết Đông Hồ',
      'Cách nhận biết giấy Dó truyền thống quét điệp óng ánh ánh xà cừ',
      'Pha chế các màu sắc từ thảo mộc và khoáng thạch tự nhiên',
      'Kỹ thuật quét màu bằng chổi lá thông và ấn mộc bản bằng tay xơ mướp',
      'Trải nghiệm in tranh nhiều lớp màu theo thứ tự chuẩn xác'
    ],
    craftKit: {
      kitName: 'Bộ In Tranh Dân Gian Đông Hồ Tự Trải Nghiệm',
      kitImage: '/pictures-sanpham/ba-na/gui-mua-bieu-dien.webp',
      includes: [
        { name: 'Mộc bản khắc gỗ tranh Vinh Hoa', quantity: '2 bản khắc gỗ thị', desc: 'Gỗ thị khắc tay tinh xảo nét vẽ gà trống hoa hồng', icon: 'wallpaper' },
        { name: 'Giấy Dó quét điệp óng ánh', quantity: '10 tờ (khổ 25x35cm)', desc: 'Giấy Dó thủ công quét bột vỏ sò điệp biển tự nhiên', icon: 'article' },
        { name: 'Hũ màu thiên nhiên Đông Hồ', quantity: '4 màu (Đen than, Đỏ son, Vàng hoa hòe, Xanh rỉ đồng)', desc: 'Màu sắc tự nhiên không hóa chất độc hại', icon: 'palette' },
        { name: 'Chổi quét màu bằng lá thông', quantity: '2 chiếc', desc: 'Chổi lá thông truyền thống quét đều lớp màu mịn', icon: 'brush' },
        { name: 'Miếng xơ mướp ép tranh', quantity: '1 chiếc', desc: 'Dùng xoa mặt sau giấy để màu thấm đều vào thớ điệp', icon: 'spa' }
      ],
      shippingNote: 'Đóng gói trong ống giấy cứng sang trọng, kèm lời chúc phúc cát tường từ nghệ nhân.'
    },
    lessons: [
      { id: 'tdh-1', order: 1, title: 'Bài 1: Tranh Đông Hồ — Hồn dân tộc sáng bừng trên giấy điệp', duration: '20 phút', description: 'Gặp gỡ NNƯT Nguyễn Đăng Chế và kho tàng mộc bản cổ vô giá lưu truyền qua 5 thế hệ.', videoId: 'YRt8Svr_4vE', isPreviewFree: true },
      { id: 'tdh-2', order: 2, title: 'Bài 2: Vỏ sò điệp biển & Giấy Dó nghìn năm bền bỉ', duration: '22 phút', description: 'Quy trình giã vỏ điệp, nấu hồ nếp và quét bột điệp tạo ánh sáng lấp lánh trên giấy.', videoId: 'PjUcW8Vo7B0' },
      { id: 'tdh-3', order: 3, title: 'Bài 3: Bảng màu của thiên nhiên — Than tre, hoa hòe và sỏi son', duration: '24 phút', description: 'Nghệ thuật chiết xuất màu sắc dân gian không phai nhòa qua thời gian.', videoId: 'K3DLieH89ZM' },
      { id: 'tdh-4', order: 4, title: 'Bài 4: Quy trình in mộc bản nhiều lớp — Lớp màu trước, nét đen sau', duration: '26 phút', description: 'Thao tác quét màu, đặt giấy khớp góc và dùng xơ mướp miết đều tay.', videoId: '0ouOBMt59pU' },
      { id: 'tdh-5', order: 5, title: 'Bài 5: Hoàn thiện bức tranh Vinh Hoa — Treo tranh đón phúc lộc', duration: '23 phút', description: 'Phơi khô tranh tự nhiên và cách đóng khung nẹp tre mộc mạc treo ngày Tết.', videoId: 'djSwBkpShIc' }
    ],
    linkedProductId: 'dongho-sp-1',
    linkedProductName: 'Bộ Tranh Đông Hồ Mộc Bản Vinh Hoa - Phú Quý',
    linkedProductPrice: '380.000 VNĐ',
    certificateTitle: 'Chứng Nhận Trải Nghiệm Tranh Khắc Gỗ Đông Hồ'
  },
  {
    id: 'che-tac-khen-hmong',
    title: 'Nghệ Thuật Đẽo Gọt & Thổi Hồn Vào Cây Khèn Bầu H\'Mông',
    subtitle: 'Học cách chọn gỗ pơ-mu, đập dát lá đồng làm lưỡi gà và căn chỉnh thang âm vang vọng vách đá.',
    category: 'Nhạc cụ dân tộc',
    ethnic: "H'Mông",
    artisanId: 'mua-sinh-thao',
    artisanName: 'Mua Sính Thào',
    artisanTitle: 'Nghệ nhân Chế tác Khèn • Núi đá Tủa Chùa',
    artisanAvatar: '/artisans/vang-thi-mai.jpg',
    artisanVillage: 'Huyện Tủa Chùa, Điện Biên',
    price: 240000,
    comboPrice: 480000,
    rating: 4.97,
    reviewsCount: 86,
    studentsCount: 320,
    totalDuration: '125 phút • 5 bài học',
    totalLessons: 5,
    level: 'Nâng cao',
    coverImage: '/artisans/lung-tam-product.jpg',
    trailerVideoId: 'gVzCBFo5UFI',
    overview: [
      'Tiếng khèn là linh hồn của người H\'Mông — khèn gọi bạn tình trong phiên chợ xuân, khèn tấu lên khúc nhạc tiễn đưa người quá cố về với cội nguồn tổ tiên.',
      'Chế tác một cây khèn đòi hỏi sự am hiểu âm nhạc và đôi bàn tay cơ khí tài hoa: Khoét bầu khèn gỗ pơ-mu kín khao, đập dát mỏng lá đồng làm lưỡi gà (lam đồng) sao cho chỉ cần hơi thở nhẹ cũng phát ra tiếng rung xao xuyến.',
      'Khóa học hướng dẫn tỉ mỉ quy trình chế tác khèn mini và phương pháp thổi những nốt nhạc cơ bản đầu tiên.'
    ],
    skillsLearned: [
      'Ý nghĩa thiêng liêng của cây khèn trong đời sống văn hóa H\'Mông',
      'Cách chọn nứa rừng già gióng dài và gỗ pơ-mu thơm dẻo',
      'Bí quyết đập dát lá đồng mỏng như cánh ve sầu làm lưỡi gà',
      'Gắn 6 ống nứa vào bầu khèn và cuốn dây vỏ đào rừng kín hơi',
      'Phương pháp lấy hơi và tấu khúc nhạc gọi bạn mùa xuân'
    ],
    craftKit: {
      kitName: 'Bộ Chế Tác & Lắp Ráp Khèn H\'Mông Mini DIY',
      kitImage: '/artisans/lung-tam-product.jpg',
      includes: [
        { name: 'Bầu khèn gỗ pơ-mu đẽo thô', quantity: '1 chiếc (đã khoét ruột)', desc: 'Gỗ pơ-mu thơm tự nhiên không mối mọt', icon: 'piano' },
        { name: 'Ống nứa rừng chọn lọc', quantity: '6 ống (đã dùi lỗ bấm)', desc: 'Nứa bánh tẻ phơi khô ráo chuẩn thang âm', icon: 'line_weight' },
        { name: 'Lá đồng dát mỏng làm lam âm', quantity: '6 lá đồng đỏ', desc: 'Đồng nguyên chất tạo âm vang rung rinh', icon: 'music_note' },
        { name: 'Dây vỏ cây đào rừng quấn bầu', quantity: '3 mét', desc: 'Vỏ cây đào dẻo dai giúp khèn kín hơi tuyệt đối', icon: 'all_inclusive' },
        { name: 'Dụng cụ chỉnh âm & keo sáp rừng', quantity: '1 bộ', desc: 'Sáp ong dẻo dùng gắn cố định lưỡi lam', icon: 'handyman' }
      ],
      shippingNote: 'Bộ kit độc đáo gửi trực tiếp từ các nghệ nhân chế tác khèn vùng cao Tây Bắc.'
    },
    lessons: [
      { id: 'khen-1', order: 1, title: 'Bài 1: Cây khèn H\'Mông — Cầu nối giữa con người và thần linh', duration: '20 phút', description: 'Gặp gỡ nghệ nhân Mua Sính Thào và câu chuyện giữ nghề chế tác khèn nơi cổng trời.', videoId: 'gVzCBFo5UFI', isPreviewFree: true },
      { id: 'khen-2', order: 2, title: 'Bài 2: Khoét rỗng bầu pơ-mu & Kỹ thuật bổ đôi ghép khít', duration: '25 phút', description: 'Bí quyết dùng dao cong nạo ruột gỗ và dán lại bằng keo nhựa rừng không hở một khe nhỏ.', videoId: 'ny3KLPxxHJk' },
      { id: 'khen-3', order: 3, title: 'Bài 3: Trái tim của cây khèn — Đập dát mỏng lá lam đồng', duration: '28 phút', description: 'Kỹ thuật dùng búa nhỏ rèn lưỡi đồng mỏng như cánh ve, thử độ nhạy bằng luồng khí thở.', videoId: 'YPHJ2zDHBTI' },
      { id: 'khen-4', order: 4, title: 'Bài 4: Lắp ráp 6 ống nứa & Cân chỉnh thang âm ngũ cung', duration: '28 phút', description: 'Phương pháp thử âm từng ống nứa và cố định bằng dây vỏ đào rừng siết chặt.', videoId: 'DwySu0GNz0k' },
      { id: 'khen-5', order: 5, title: 'Bài 5: Hơi thở đại ngàn — Tập thổi những giai điệu khèn đầu tiên', duration: '24 phút', description: 'Học cách hít vào thở ra đều đặn qua bầu khèn và bấm 6 nốt nhạc cơ bản.', videoId: 'ZW-reUZGuXg' }
    ],
    linkedProductId: 'khen-sp-1',
    linkedProductName: 'Cây Khèn H\'Mông Gỗ Pơ-mu Mini Nghệ Thuật',
    linkedProductPrice: '850.000 VNĐ',
    certificateTitle: 'Chứng Nhận Chế Tác & Diễn Tấu Khèn H\'Mông'
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courseData.find(c => c.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  if (category === 'Tất cả' || !category) return courseData;
  return courseData.filter(c => c.category === category);
};

export const getCoursesByEthnic = (ethnic: string): Course[] => {
  if (ethnic === 'Tất cả' || !ethnic) return courseData;
  return courseData.filter(c => c.ethnic.toLowerCase().includes(ethnic.toLowerCase()));
};

export const courseList = courseData;
