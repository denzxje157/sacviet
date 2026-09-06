export interface CraftMetric {
  label: string;
  value: string;
  sub: string;
  icon: string;
}

export interface Motif {
  name: string;
  originalName?: string;
  meaning: string;
  desc: string;
  icon: string;
  symbol: string;
}

export interface ArtisanProduct {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  timeToCraft: string;
  img: string;
  category: string;
  soldCount: number;
  desc: string;
}

export interface Artisan {
  id: string;
  name: string;
  title: string;
  ethnic: string;
  village: string;
  province: string;
  region: string;
  coords: [number, number];
  yearsOfCraft: number;
  craftType: string;
  avatar: string;
  coverImg: string;
  quote: string;
  bio: string;
  story: string[];
  metrics: CraftMetric[];
  motifs: Motif[];
  products: ArtisanProduct[];
  gallery: string[];
  contactZalo?: string;
  ocopLevel?: number;
  unescoRecognized?: boolean;
}

export const artisanData: Artisan[] = [
  {
    id: 'vang-thi-mai',
    name: 'Vàng Thị Mai',
    title: 'Nghệ nhân Ưu tú',
    ethnic: "H'Mông",
    village: 'Thôn Lùng Tám, xã Lùng Tám',
    province: 'H. Quản Bạ, Hà Giang',
    region: 'Đông Bắc Bộ',
    coords: [23.0833, 105.0167],
    yearsOfCraft: 38,
    craftType: 'Dệt vải lanh, vẽ sáp ong & nhuộm chàm cổ truyền',
    avatar: '/artisans/vang-thi-mai-portrait.png',
    coverImg: '/artisans/lung-tam-cover.jpg',
    quote: 'Mỗi tấm vải lanh là kết tinh của bàn tay, thời gian và tâm hồn người Mông. Tôi muốn giữ nghề không chỉ cho hôm nay, mà còn cho thế hệ mai sau.',
    bio: 'Bà Vàng Thị Mai là người phụ nữ H\'Mông tiên phong thành lập HTX Hợp Tiến Lùng Tám, đưa nghề dệt lanh thoát khỏi bờ vực mai một và vươn tầm ra hơn 20 quốc gia. Bà được Chủ tịch nước phong tặng danh hiệu Nghệ nhân Ưu tú nhờ những cống hiến kiệt xuất trong gìn giữ di sản văn hóa phi vật thể quốc gia.',
    story: [
      'Từ năm 10 tuổi, bà Mai đã ngồi bên khung cửi học mẹ tước sợi lanh trên nương đá, luộc tro bếp và vẽ từng giọt sáp ong nóng chảy bằng bút đồng.',
      'Để hoàn thành một tấm vải lanh thêu sáp ong, người thợ phải trải qua 41 công đoạn thủ công tỉ mỉ kéo dài suốt 30 - 45 ngày, nhuộm chàm tự nhiên 25 - 30 lần phơi nắng núi đá.',
      'Bà đã đào tạo nghề và tạo kế sinh nhai ổn định cho hơn 130 phụ nữ H\'Mông, phụ nữ đơn thân và khuyết tật tại cao nguyên đá Quản Bạ.'
    ],
    ocopLevel: 5,
    metrics: [
      {
        label: 'Thời gian chế tác',
        value: '30 - 45 ngày',
        sub: 'Trải qua 41 công đoạn thủ công',
        icon: 'hourglass_top'
      },
      {
        label: 'Nguyên liệu bản địa',
        value: '100% Cây lanh đá',
        sub: 'Vẽ sáp ong rừng, chàm hữu cơ',
        icon: 'eco'
      },
      {
        label: 'Kỹ thuật lưu truyền',
        value: 'Vẽ sáp ong bút đồng',
        sub: 'Nhuộm chàm tự nhiên phơi nắng núi',
        icon: 'brush'
      },
      {
        label: 'Tác động buôn làng',
        value: '130+ Phụ nữ Mông',
        sub: 'Xóa đói giảm nghèo & tạo sinh kế bền vững',
        icon: 'volunteer_activism'
      }
    ],
    motifs: [
      {
        name: 'Mặt Trời & Vòng Xoáy Vũ Trụ',
        originalName: 'Nkauj Ntsuab',
        meaning: 'Cội nguồn sự sống & Chu kỳ vĩnh cửu',
        desc: 'Vòng xoắn ốc đồng tâm vẽ bằng sáp ong nóng chảy tượng trưng cho vầng thái dương sưởi ấm vùng cao và sự luân hồi tuần hoàn của vạn vật.',
        icon: 'wb_sunny',
        symbol: '☀️'
      },
      {
        name: 'Mắt Chim Rừng & Cánh Bướm',
        originalName: 'Noog',
        meaning: 'Khát vọng tự do & Hòa ái thiên nhiên',
        desc: 'Họa tiết chim muông sải cánh nhắc nhở con người luôn giữ tâm hồn thanh cao, gắn kết trọn vẹn với núi rừng đại ngàn Tây Bắc.',
        icon: 'flutter_dash',
        symbol: '🕊️'
      },
      {
        name: 'Thửa Ruộng Bậc Thang Núi Đá',
        originalName: 'Teb',
        meaning: 'Ý chí kiên cường & Nền tảng ấm no',
        desc: 'Các khối tam giác lồng ghép biểu trưng cho những bờ ruộng bậc thang ôm sườn núi đá vôi tai mèo hùng vĩ.',
        icon: 'terrain',
        symbol: '⛰️'
      }
    ],
    products: [
      {
        id: 'hmong-sp-1',
        name: 'Khăn Lanh Vẽ Sáp Ong Lùng Tám Cổ Truyền',
        price: '650.000 VNĐ',
        priceValue: 650000,
        timeToCraft: '15 ngày vẽ sáp & nhuộm chàm',
        img: '/artisans/lung-tam-batik.jpg',
        category: 'Khăn lanh thổ cẩm',
        soldCount: 94,
        desc: 'Khăn lanh tự nhiên mềm thoáng, đông ấm hè mát, hoa văn vẽ sáp ong sắc sảo không phai màu theo năm tháng.'
      },
      {
        id: 'hmong-sp-2',
        name: "Váy Thổ Cẩm Lanh Thêu Tay H'Mông Hoa Cúc",
        price: '2.400.000 VNĐ',
        priceValue: 2400000,
        timeToCraft: '40 ngày kỳ công chế tác',
        img: '/artisans/lung-tam-product.jpg',
        category: 'Trang phục truyền thống',
        soldCount: 26,
        desc: 'Chân váy lanh xòe bồng bềnh với hàng ngàn đường kim mũi chỉ thêu ghép vải tinh xảo của các bà mẹ H\'Mông.'
      },
      {
        id: 'hmong-sp-3',
        name: 'Túi Đeo Chéo Vải Lanh Nhuộm Chàm Sáp Ong',
        price: '390.000 VNĐ',
        priceValue: 390000,
        timeToCraft: '8 ngày hoàn thiện',
        img: '/artisans/tui-tho-cam.jpg',
        category: 'Túi thủ công',
        soldCount: 65,
        desc: 'Túi xách lanh mộc mạc cá tính, điểm xuyết hoa văn mắt chim, dây đeo bện sợi chắc khỏe.'
      }
    ],
    gallery: [
      '/artisans/lung-tam-cover.jpg',
      '/artisans/lung-tam-batik.jpg',
      '/artisans/lung-tam-product.jpg'
    ],
    contactZalo: '0987654321'
  },
  {
    id: 'thuong-thi-dai',
    name: 'Thượng Thị Đài',
    title: 'Nghệ nhân Ưu tú',
    ethnic: 'Chăm',
    village: 'Làng dệt thổ cẩm Mỹ Nghiệp, TT. Phước Dân, H. Ninh Phước',
    province: 'Ninh Thuận',
    region: 'Duyên hải Nam Trung Bộ',
    coords: [11.5303, 108.9482],
    yearsOfCraft: 42,
    craftType: 'Dệt thổ cẩm cổ truyền Champa',
    avatar: '/artisans/artisan-loom.jpg',
    coverImg: '/artisans/weaving-fabric.jpg',
    quote: 'Tiếng thoi đưa kẽo kẹt là nhịp tim của buôn làng Chăm. Tôi dệt không chỉ để mưu sinh, mà để con cháu ngàn đời sau không quên hồn cốt Champa.',
    bio: 'Sinh ra và lớn lên trong cái nôi dệt Mỹ Nghiệp hơn 800 năm tuổi, Nghệ nhân Thượng Thị Đài đã dành trọn hơn 4 thập kỷ giữ lửa cho từng sợi bông, luống thoi. Bà là một trong những nghệ nhân hiếm hoi còn lưu giữ trọn vẹn kỹ thuật dệt hoa văn nổi hai mặt tinh xảo bậc nhất của người Chăm.',
    story: [
      'Từ năm 12 tuổi, bà Đài đã ngồi bên khung cửi học cách ngâm vỏ cây chùm ngây, hái quả rừng nhuộm màu tự nhiên và nhớ từng đường thoi luồn sợi.',
      'Khác với vải dệt máy công nghiệp vô cảm, mỗi tấm thổ cẩm của bà Đài là sự kết tinh của mồ hôi, lòng thành kính với thần linh Mẹ Xứ Sở (Po Ino Nagar) và sự chính xác đến từng mi-li-mét.',
      'Hiện nay, xưởng dệt của bà là điểm tựa kinh tế vững chắc cho gần 30 phụ nữ Chăm trong làng, giúp họ không phải bỏ quê đi làm thuê xứ người mà vẫn nuôi con ăn học thành tài nhờ nghề cổ truyền.'
    ],
    ocopLevel: 4,
    metrics: [
      {
        label: 'Thời gian hoàn thiện',
        value: '18 - 25 ngày',
        sub: 'Thủ công từng đường thoi gõ nhịp',
        icon: 'hourglass_top'
      },
      {
        label: 'Nguyên liệu bản địa',
        value: '100% Thuần khiết',
        sub: 'Sợi bông tự nhiên, nhuộm chàm rừng',
        icon: 'eco'
      },
      {
        label: 'Kỹ thuật lưu truyền',
        value: 'Dệt thoi cổ truyền',
        sub: 'Hoa văn nổi hai mặt không dùng máy',
        icon: 'front_hand'
      },
      {
        label: 'Tác động buôn làng',
        value: '28 Phụ nữ Chăm',
        sub: 'Có việc làm và thu nhập ổn định',
        icon: 'groups'
      }
    ],
    motifs: [
      {
        name: 'Hoa văn Mắt Công',
        originalName: 'Kukak',
        meaning: 'Quý phái, thanh cao & che chở tình duyên',
        desc: 'Họa tiết lông đuôi chim công xoè rộng tượng trưng cho sự thịnh vượng, tình yêu lứa đôi chung thủy son sắt và xua đuổi tà khí che chở gia đình.',
        icon: 'visibility',
        symbol: '🦚'
      },
      {
        name: 'Rồng Mây Champa',
        originalName: 'Mưk',
        meaning: 'Thần linh bảo hộ & Ơn mưa thuận gió hòa',
        desc: 'Rồng cổ Champa uốn lượn mềm mại như dòng sông Mẹ, đại diện cho lời nguyện cầu nguồn nước dồi dào, tưới mát cho mùa màng tốt tươi.',
        icon: 'waves',
        symbol: '🐉'
      },
      {
        name: 'Họa tiết Hạt Kê',
        originalName: 'Pum',
        meaning: 'Sinh sôi nảy nở & Ấm no bền vững',
        desc: 'Những chấm nhỏ đối xứng hình thoi mô phỏng hạt lương thực rẫy nương, mang ý nghĩa con đàn cháu đống, cuộc sống sung túc quanh năm.',
        icon: 'grain',
        symbol: '🌾'
      }
    ],
    products: [
      {
        id: 'cham-sp-1',
        name: 'Tấm Dệt Thổ Cẩm Mỹ Nghiệp Hoa Văn Mắt Công',
        price: '1.850.000 VNĐ',
        priceValue: 1850000,
        timeToCraft: '22 ngày dệt tay liên tục',
        img: '/artisans/cham-textile.png',
        category: 'Thổ cẩm nghi lễ',
        soldCount: 48,
        desc: 'Kiệt tác vải dệt sợi bông hoa văn nổi hai mặt, dùng trong các nghi lễ trang trọng hoặc làm thảm tranh treo tường nghệ thuật.'
      },
      {
        id: 'cham-sp-2',
        name: 'Khăn Choàng Thổ Cẩm Chăm Dệt Tay Cổ Truyền',
        price: '420.000 VNĐ',
        priceValue: 420000,
        timeToCraft: '7 ngày dệt tay',
        img: '/artisans/weaving-fabric.jpg',
        category: 'Phụ kiện thời trang',
        soldCount: 115,
        desc: 'Khăn choàng mềm mịn, thấm hút mồ hôi tự nhiên, mang gam màu đỏ vàng trầm ấm của nắng gió duyên hải Nam Trung Bộ.'
      },
      {
        id: 'cham-sp-3',
        name: 'Túi Thổ Cẩm Mỹ Nghiệp Thêu Quả Trám',
        price: '350.000 VNĐ',
        priceValue: 350000,
        timeToCraft: '5 ngày may dệt',
        img: '/artisans/tui-tho-cam.jpg',
        category: 'Túi thủ công',
        soldCount: 82,
        desc: 'Túi đeo tiện dụng với đường chỉ dệt dày dặn, bền đẹp vĩnh cửu theo thời gian, càng dùng càng bóng màu.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop'
    ],
    contactZalo: '0987654321'
  },
  {
    id: 'dang-thi-phan',
    name: 'Đàng Thị Phan',
    title: 'Nghệ nhân Gốm Cổ',
    ethnic: 'Chăm',
    village: 'Làng gốm cổ Bàu Trúc, TT. Phước Dân, H. Ninh Phước',
    province: 'Ninh Thuận',
    region: 'Duyên hải Nam Trung Bộ',
    coords: [11.5375, 108.9556],
    yearsOfCraft: 45,
    craftType: 'Gốm cổ nặn tay Bàu Trúc (UNESCO)',
    avatar: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-54dantoc/cham.jpg',
    coverImg: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&auto=format&fit=crop',
    quote: 'Ở Bàu Trúc chúng tôi không dùng bàn xoay máy. Phụ nữ Chăm đi giật lùi quanh khối đất, gửi cả hơi ấm bàn tay và linh hồn vào từng thớ gốm.',
    bio: 'Bà Đàng Thị Phan là nghệ nhân kỳ cựu của Làng gốm Bàu Trúc — làng gốm cổ xưa bậc nhất Đông Nam Á được UNESCO ghi danh vào Danh sách Di sản văn hóa phi vật thể cần bảo vệ khẩn cấp. Suốt 45 năm qua, bà chỉ dùng đôi chân đi lùi và đôi tay trần nhào nặn đất sét sông Quao.',
    story: [
      'Gốm Bàu Trúc độc nhất vô nhị bởi nguyên tắc: "Tay làm tay xoay, người đi giật lùi". Nghệ nhân vừa đi lùi quanh chiếc bàn tròn cố định, vừa vuốt tạo dáng cho chiếc bình đất.',
      'Sản phẩm không tráng men nhân tạo, không dùng lò nung kín mà được chất củi, rơm rạ nung lộ thiên giữa trời đất. Khi gốm đỏ rực lửa, nghệ nhân rưới nước chiết từ quả thị rừng để tạo nên những mảng màu đen khói huyền bí.',
      'Mỗi sản phẩm ra lò là một tác phẩm độc bản — không bao giờ có hai chiếc bình gốm Bàu Trúc giống hệt nhau trên đời.'
    ],
    unescoRecognized: true,
    ocopLevel: 4,
    metrics: [
      {
        label: 'Thời gian chế tác',
        value: '8 - 14 ngày',
        sub: 'Tạo hình, phơi mát & nung củi lộ thiên',
        icon: 'hourglass_top'
      },
      {
        label: 'Nguyên liệu bản địa',
        value: 'Đất sét Sông Quao',
        sub: 'Trộn cát mịn núi thiêng, vỏ sò',
        icon: 'landscape'
      },
      {
        label: 'Kỹ thuật độc bản',
        value: 'Nặn tay 100%',
        sub: 'Không bàn xoay, nung lửa mở rơm rạ',
        icon: 'local_fire_department'
      },
      {
        label: 'Vinh danh thế giới',
        value: 'UNESCO 2022',
        sub: 'Di sản phi vật thể cần bảo vệ khẩn cấp',
        icon: 'verified'
      }
    ],
    motifs: [
      {
        name: 'Hoa văn Sóng Nước Thần',
        originalName: 'Ia',
        meaning: 'Tri ân nguồn nước & Sự hanh thông',
        desc: 'Khắc bằng cọng tre non hoặc vỏ ốc biển quanh cổ bình, thể hiện lòng biết ơn mẹ sông Quao nuôi dưỡng buôn làng.',
        icon: 'water',
        symbol: '🌊'
      },
      {
        name: 'Vết Răng Cưa Đền Tháp',
        originalName: 'Bimong',
        meaning: 'Sự kiên cố & Linh khí đền tháp Champa',
        desc: 'Mô phỏng kiến trúc các tháp Chăm Kalan sừng sững nghìn năm trước bão táp thời gian.',
        icon: 'fort',
        symbol: '🏛️'
      },
      {
        name: 'Vết Loang Khói Độc Bản',
        originalName: 'Asau',
        meaning: 'Ngẫu hứng đất - nước - lửa đại ngàn',
        desc: 'Những mảng màu loang đen, đỏ gạch, vàng cháy sinh ra từ ngọn lửa củi và nước quả thị rừng, không thể làm giả hay dập khuôn.',
        icon: 'gradient',
        symbol: '🔥'
      }
    ],
    products: [
      {
        id: 'cham-sp-4',
        name: 'Bình Gốm Phong Thủy Bàu Trúc Nung Ám Khói',
        price: '850.000 VNĐ',
        priceValue: 850000,
        timeToCraft: '10 ngày nhào nặn & nung lộ thiên',
        img: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-sanpham/cham/gom-ban-xoay-bau-truc.jpg',
        category: 'Gốm trang trí phong thủy',
        soldCount: 71,
        desc: 'Bình gốm cổ mang dáng dấp chiếc lu nước Chăm, vân ám khói đen đỏ tự nhiên, hút tài lộc và cân bằng sinh khí cho gian nhà.'
      },
      {
        id: 'cham-sp-5',
        name: 'Tượng Phù Điêu Vũ Nữ Apsara Đất Nung Bàu Trúc',
        price: '1.200.000 VNĐ',
        priceValue: 1200000,
        timeToCraft: '14 ngày chạm khắc tay',
        img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop',
        category: 'Tượng nghệ thuật',
        soldCount: 39,
        desc: 'Tượng điêu khắc vũ nữ Apsara mềm mại uyển chuyển, toát lên vẻ đẹp huyền bí của nền văn minh Champa cổ đại.'
      },
      {
        id: 'cham-sp-6',
        name: 'Lọ Hoa Men Mộc Đất Nung Bàu Trúc',
        price: '480.000 VNĐ',
        priceValue: 480000,
        timeToCraft: '7 ngày hoàn thiện',
        img: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop',
        category: 'Gốm gia dụng',
        soldCount: 88,
        desc: 'Lọ hoa mộc mạc lưu giữ nét thô ráp của đất nung tự nhiên, giúp hoa tươi lâu và tạo điểm nhấn ấm áp cho không gian sống.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop'
    ],
    contactZalo: '0987654321'
  },
  {
    id: 'y-sinh',
    name: 'Y Sinh (A Sinh)',
    title: 'Già Làng Nghệ Nhân',
    ethnic: 'Ba Na',
    village: 'Làng du lịch cộng đồng Kon K\'tu, Xã Đăk Rơ Wa, TP. Kon Tum',
    province: 'Kon Tum',
    region: 'Tây Nguyên',
    coords: [14.3325, 108.0321],
    yearsOfCraft: 50,
    craftType: 'Đan lát mây tre & Tạc tượng gỗ Tây Nguyên',
    avatar: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-54dantoc/bana.jpg',
    coverImg: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=1400&auto=format&fit=crop',
    quote: 'Chiếc gùi Ba Na không chỉ cõng bắp ngô trên nương rẫy. Nó cõng cả tuổi thơ những đứa trẻ ngủ say trên lưng mẹ và niềm tự hào của người đàn ông đại ngàn.',
    bio: 'Bên dòng sông Đăk Bla huyền thoại chảy ngược, Già làng Y Sinh là cây đại thụ giữ lửa của buôn làng Kon K\'tu. Đôi bàn tay chai sần của ông đã vót hàng triệu nan tre, tạo tác nên những chiếc gùi hoa văn K\'tơh tinh xảo vang danh khắp núi rừng Tây Nguyên.',
    story: [
      'Muốn đan được chiếc gùi bền đẹp, Già Y Sinh phải lặn lội vào sâu trong rừng già tìm những cây mây nếp đủ 3 năm tuổi, chặt vào ngày không có trăng để mọt không dám ăn.',
      'Nan được chuốt mỏng đều như lá lúa, đan cài từng lớp đan nong mốt, nong đôi khít khao đến mức có thể múc được nước suối mà không rỉ giọt nào.',
      'Ông đã mở lớp truyền nghề miễn phí tại nhà rông làng Kon K\'tu, giúp thế hệ trẻ Ba Na không bỏ quên con dao, cây mây của ông bà truyền lại.'
    ],
    ocopLevel: 4,
    metrics: [
      {
        label: 'Thời gian đan lát',
        value: '14 - 22 ngày',
        sub: 'Vót nan, chuốt bóng & đan hoa văn nổi',
        icon: 'hourglass_top'
      },
      {
        label: 'Nguyên liệu đại ngàn',
        value: 'Mây nếp rừng già',
        sub: 'Dây quai vỏ cây Kơ-nia dẻo dai',
        icon: 'forest'
      },
      {
        label: 'Độ bền thử thách',
        value: '20 - 30 năm',
        sub: 'Gác bếp ám khói chống mối mọt vĩnh cửu',
        icon: 'verified_user'
      },
      {
        label: 'Tác động buôn làng',
        value: 'Bảo tồn Nhà Rông',
        sub: 'Dạy nghề miễn phí cho 40 thanh niên buôn',
        icon: 'handshake'
      }
    ],
    motifs: [
      {
        name: 'Hoa văn Mắt Chim Rừng',
        originalName: "K'tơh",
        meaning: 'Loài chim báo mùa rẫy bội thu',
        desc: 'Đan lồng ghép hình thoi đa giác mô phỏng ánh mắt chim Chơ-rao tinh anh dẫn đường trong rừng thẳm.',
        icon: 'remove_red_eye',
        symbol: '🦅'
      },
      {
        name: 'Nan Vót Xương Cá Lưng Gùi',
        originalName: 'Kơ-loong',
        meaning: 'Vững chãi, dẻo dai & Tình đoàn kết',
        desc: 'Kết cấu đan nan đôi xương cá trợ lực giúp gùi ôm sát lưng, chia đều trọng lượng khi leo dốc núi đứng.',
        icon: 'view_in_ar',
        symbol: 'ᚙ'
      },
      {
        name: 'Họa tiết Hình Thoi Buôn Làng',
        originalName: 'Ple',
        meaning: 'Cộng đồng chung một mái nhà rông',
        desc: 'Các hình thoi nối tiếp liên hoàn thể hiện sự gắn kết ruột thịt của những người con sinh ra từ đại ngàn.',
        icon: 'hexagon',
        symbol: '🔶'
      }
    ],
    products: [
      {
        id: 'bana-sp-1',
        name: 'Gùi Hoa Văn Tinh Xảo Có Nắp Ba Na (Cao cấp)',
        price: '1.600.000 VNĐ',
        priceValue: 1600000,
        timeToCraft: '18 ngày vót nan & đan kín',
        img: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-sanpham/ba-na/gui-hoa-van-tinh-xao-co-nap.jpg',
        category: 'Gùi truyền thống cao cấp',
        soldCount: 38,
        desc: 'Kiệt tác đan lát đỉnh cao của già Y Sinh, nan mây nhuộm màu tự nhiên, có nắp đậy khít chống nước, dùng trang trí hoặc đựng bảo vật gia đình.'
      },
      {
        id: 'bana-sp-2',
        name: 'Gùi Múa Thiếu Nữ Ba Na Biểu Diễn Lễ Hội',
        price: '380.000 VNĐ',
        priceValue: 380000,
        timeToCraft: '6 ngày chế tác',
        img: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-sanpham/ba-na/gui-mua-bieu-dien.webp',
        category: 'Gùi múa nghệ thuật',
        soldCount: 65,
        desc: 'Chiếc gùi nhẹ nhàng thanh thoát, quai đan êm ái, mang lại vẻ duyên dáng uyển chuyển trong từng nhịp xoang lễ hội.'
      },
      {
        id: 'bana-sp-3',
        name: 'Mô Hình Nhà Rông Kon Tum Thủ Công Bằng Tre Nứa',
        price: '450.000 VNĐ',
        priceValue: 450000,
        timeToCraft: '8 ngày ghép thủ công',
        img: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=600&auto=format&fit=crop',
        category: 'Mô hình văn hóa',
        soldCount: 52,
        desc: "Tái hiện nguyên bản tỉ lệ nhà Rông Kon K'tu với mái cao vút như lưỡi búa chém mây, biểu tượng kiêu hãnh của Tây Nguyên."
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop'
    ],
    contactZalo: '0987654321'
  },
  {
    id: 'mai-thi-hop',
    name: 'Mai Thị Hợp',
    title: 'Nghệ nhân Tinh Hoa Dệt Dèng',
    ethnic: 'Tà Ôi',
    village: 'Bản A Hưa, Xã A Đớt, H. A Lưới',
    province: 'Thừa Thiên Huế',
    region: 'Bắc Trung Bộ',
    coords: [16.2333, 107.2500],
    yearsOfCraft: 32,
    craftType: 'Dệt Dèng cườm ngũ sắc Tà Ôi (Di sản Quốc gia)',
    avatar: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-54dantoc/ta-oi.jpg',
    coverImg: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1400&auto=format&fit=crop',
    quote: 'Để làm nên một tấm Dèng, người phụ nữ Tà Ôi phải luồn từng hạt cườm chì vào từng sợi chỉ. Sai một hạt là phải tháo cả ngày dệt lại từ đầu.',
    bio: 'Nghệ nhân Mai Thị Hợp là linh hồn của nghề dệt Dèng tại thung lũng A Lưới. Kỹ thuật đính cườm trực tiếp vào sợi chỉ dệt khi thoi đang chạy là bí truyền độc nhất vô nhị của người Tà Ôi, đã được Bộ Văn hóa Thể thao và Du lịch vinh danh là Di sản văn hóa phi vật thể Quốc gia.',
    story: [
      'Khác với thổ cẩm thông thường là dệt xong mới đính hạt, Dèng Tà Ôi đòi hỏi người nghệ nhân phải tính toán đếm từng sợi dọc, luồn cườm chì trước khi gõ thoi.',
      'Mỗi hoa văn cườm là một bức tranh sống động về thiên nhiên Trường Sơn hùng vĩ: từ dấu chân hươu nai, ngọn núi rừng Pơ-lang đến ánh sao đêm dẫn lối người đi săn.',
      'Sản phẩm Dèng của bà Hợp đã từng được các nhà thiết kế hàng đầu chọn trình diễn tại Tuần lễ Thời trang Quốc tế và Festival Huế.'
    ],
    ocopLevel: 4,
    metrics: [
      {
        label: 'Thời gian dệt đính cườm',
        value: '22 - 35 ngày',
        sub: 'Gài hàng ngàn hạt cườm chì thủ công',
        icon: 'hourglass_top'
      },
      {
        label: 'Hạt cườm ngũ sắc',
        value: 'Chì & Thuỷ tinh cổ',
        sub: 'Bền đẹp trăm năm không vỡ nứt',
        icon: 'diamond'
      },
      {
        label: 'Kỹ thuật bí truyền',
        value: 'Gài cườm trên khung cửi',
        sub: 'Di sản văn hóa phi vật thể quốc gia',
        icon: 'stars'
      },
      {
        label: 'Bảo tồn di sản',
        value: 'HTX A Đớt',
        sub: 'Gìn giữ kỹ thuật dệt cườm độc nhất',
        icon: 'workspace_premium'
      }
    ],
    motifs: [
      {
        name: 'Cườm Dấu Chân Chim Rừng',
        originalName: 'A-tó',
        meaning: 'Hòa bình & Tình bạn với muông thú',
        desc: 'Các hạt cườm trắng xếp zíc zắc mô tả bước chân chim muông trong nắng sớm vùng biên viễn.',
        icon: 'pets',
        symbol: '🐾'
      },
      {
        name: 'Hoa Rừng Pơ-lang Nở Rộ',
        originalName: 'Pơ-lang',
        meaning: 'Sức sống mãnh liệt & Tình yêu thủy chung',
        desc: 'Biểu tượng hoa Pơ-lang đỏ rực giữa đại ngàn Trường Sơn tượng trưng cho sự son sắt, son trẻ của thiếu nữ Tà Ôi.',
        icon: 'local_florist',
        symbol: '🌺'
      },
      {
        name: 'Ánh Sao Đêm Dẫn Lối',
        originalName: 'Pleng',
        meaning: 'Bình an, may mắn & Soi sáng hy vọng',
        desc: 'Hạt cườm ngũ sắc tạo hình ngôi sao chỉ lối cho người đi rừng và cầu chúc gia đình luôn tai qua nạn khỏi.',
        icon: 'auto_awesome',
        symbol: '✨'
      }
    ],
    products: [
      {
        id: 'taoi-sp-1',
        name: 'Tấm Dèng Nghi Lễ Đính Cườm Ngũ Sắc Tà Ôi',
        price: '2.800.000 VNĐ',
        priceValue: 2800000,
        timeToCraft: '30 ngày gài cườm thủ công',
        img: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-sanpham/ta-oi/vai-zeng.jpg',
        category: 'Dèng nghi lễ cao cấp',
        soldCount: 21,
        desc: 'Tuyệt phẩm Dèng đính cườm thủ công tinh xảo, thể hiện quyền quý và vị thế cao quý của chủ nhân trong các dịp lễ hội truyền thống.'
      },
      {
        id: 'taoi-sp-2',
        name: 'Khăn Quàng Cổ Dèng Tà Ôi Phối Cườm Tinh Tế',
        price: '790.000 VNĐ',
        priceValue: 790000,
        timeToCraft: '12 ngày dệt tay',
        img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop',
        category: 'Khăn choàng di sản',
        soldCount: 45,
        desc: 'Khăn Dèng mềm mại với dải cườm gài mép tinh tế, điểm nhấn quý phái cho trang phục dạ hội và công sở hiện đại.'
      },
      {
        id: 'taoi-sp-3',
        name: 'Cà Vạt Thổ Cẩm Zèng A Lưới Điểm Cườm Độc Bản',
        price: '290.000 VNĐ',
        priceValue: 290000,
        timeToCraft: '5 ngày hoàn thiện',
        img: 'https://dantra.vn/uploads/san-pham/tho-cam-dan-toc/tui-tho-cam/tui-tho-cam-2.jpeg',
        category: 'Phụ kiện cao cấp',
        soldCount: 78,
        desc: 'Món quà ngoại giao văn hóa ý nghĩa, kết hợp hài hòa giữa nét trang trọng của âu phục và linh hồn di sản Trường Sơn.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop'
    ],
    contactZalo: '0987654321'
  },
  {
    id: 'h-yam-bkrong',
    name: "H'Yam Bkrông",
    title: 'Nghệ nhân Thổ Cẩm Mẫu Hệ',
    ethnic: 'Ê Đê',
    village: 'Buôn Tơng Jút, Xã Ea Kao, TP. Buôn Ma Thuột',
    province: 'Đắk Lắk',
    region: 'Tây Nguyên',
    coords: [12.6358, 108.0652],
    yearsOfCraft: 40,
    craftType: 'Dệt thổ cẩm mẫu hệ Ê Đê & Làm gùi',
    avatar: 'https://cazllsidgvysyxbvrftq.supabase.co/storage/v1/object/public/images-sacviet/pictures-54dantoc/e-de.webp',
    coverImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&auto=format&fit=crop',
    quote: 'Người phụ nữ Ê Đê trong chế độ mẫu hệ thể hiện sự dịu dàng mà kiên cường qua từng đường chỉ đỏ đen. Tấm chăn k’pă dệt nên là hơi ấm che chở cả gia đình.',
    bio: "Bà H'Yam Bkrông là Giám đốc HTX Dệt thổ cẩm Tơng Bông — người phụ nữ Ê Đê kiên cường đã chèo lái hợp tác xã dệt qua bao thăng trầm, đưa tấm thổ cẩm truyền thống của buôn Tơng Jút thành những sản phẩm thời trang cao cấp phục vụ du khách trong và ngoài nước.",
    story: [
      'Trong ngôi nhà dài mẫu hệ Ê Đê, khung dệt dài luôn được đặt cạnh cửa sổ đón nắng mai. Từng tấm vải k’pă được dệt dày dặn bằng sợi chỉ kép nhuộm màu vỏ cây rừng tự nhiên.',
      'Hoa văn Ê Đê mang tính trừu tượng hình học cao, ẩn chứa triết lý nhân sinh sâu sắc về quyền uy của người Mẹ và sự gắn bó khăng khít của các thành viên trong dòng họ.',
      "Bà H'Yam đã đào tạo nghề cho hàng trăm thiếu nữ Ê Đê, giúp họ giữ được nghề truyền thống và tự chủ kinh tế ngay tại buôn làng của mình."
    ],
    ocopLevel: 4,
    metrics: [
      {
        label: 'Thời gian hoàn thiện',
        value: '15 - 28 ngày',
        sub: 'Khung dệt dài cổ truyền Ê Đê',
        icon: 'hourglass_top'
      },
      {
        label: 'Nguyên liệu tự nhiên',
        value: 'Sợi bông kép bản địa',
        sub: 'Nhuộm vỏ cây rừng đại ngàn',
        icon: 'spa'
      },
      {
        label: 'Bản sắc mẫu hệ',
        value: 'Triết lý Mẹ Đất',
        sub: 'Hoa văn trừu tượng hình học độc đáo',
        icon: 'diversity_1'
      },
      {
        label: 'HTX Tơng Bông',
        value: '42 Chị em Ê Đê',
        sub: 'Mô hình kinh tế tập thể tiêu biểu',
        icon: 'storefront'
      }
    ],
    motifs: [
      {
        name: 'Họa tiết Thần Kỳ Đà',
        originalName: 'Kua',
        meaning: 'May mắn, điềm lành & Tránh tai ương',
        desc: 'Hình tượng con kỳ đà dũng mãnh bảo vệ ngôi nhà dài, mang lại phước lành và sự thịnh vượng cho buôn làng.',
        icon: 'shield',
        symbol: '🦎'
      },
      {
        name: 'Rùa Thần Ngàn Năm',
        originalName: 'Kơ-hơ-lơ',
        meaning: 'Trường thọ, bền vững & Gắn kết dòng tộc',
        desc: 'Biểu trưng của sự nhẫn nại, kiên định và tuổi thọ viên mãn của các bậc cao niên trong buôn.',
        icon: 'history_edu',
        symbol: '🐢'
      },
      {
        name: 'Rắn Thần Canh Nguồn Nước',
        originalName: 'Alê',
        meaning: 'Màu mỡ, phù sa & Sinh sôi nảy nở',
        desc: 'Họa tiết zíc zắc tượng trưng cho vị thần canh giữ giọt nước nguồn và suối mát của buôn làng Ê Đê.',
        icon: 'water_drop',
        symbol: '🐍'
      }
    ],
    products: [
      {
        id: 'ede-sp-1',
        name: 'Áo Thổ Cẩm Nữ Ê Đê Thêu Hoa Văn Kỳ Đà',
        price: '1.350.000 VNĐ',
        priceValue: 1350000,
        timeToCraft: '16 ngày dệt tay tỉ mỉ',
        img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop',
        category: 'Trang phục nữ Ê Đê',
        soldCount: 53,
        desc: 'Áo chui đầu dáng ngắn truyền thống Ê Đê, hoa văn dải đỏ đen sắc nét, tôn vinh vẻ đẹp khỏe khoắn, tự tin của người phụ nữ Tây Nguyên.'
      },
      {
        id: 'ede-sp-2',
        name: 'Khăn Thổ Cẩm Ê Đê Tơng Bông Sợi Bông Tự Nhiên',
        price: '380.000 VNĐ',
        priceValue: 380000,
        timeToCraft: '7 ngày hoàn thiện',
        img: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop',
        category: 'Khăn thổ cẩm',
        soldCount: 88,
        desc: 'Khăn dệt chất liệu sợi bông thiên nhiên thoáng mát, viền tua rua thắt nút thủ công, phong cách mộc mạc thanh lịch.'
      },
      {
        id: 'ede-sp-3',
        name: 'Túi Thổ Cẩm Du Lịch Phối Da Bò Tơng Bông',
        price: '590.000 VNĐ',
        priceValue: 590000,
        timeToCraft: '9 ngày chế tác',
        img: 'https://dantra.vn/uploads/san-pham/tho-cam-dan-toc/tui-tho-cam/tui-tho-cam-2.jpeg',
        category: 'Túi du lịch cao cấp',
        soldCount: 64,
        desc: 'Sự kết hợp hoàn hảo giữa thổ cẩm Ê Đê dệt tay và da bò sáp thật, quai đeo bền bỉ, phong cách dã ngoại đậm chất du mục.'
      }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop'
    ],
    contactZalo: '0987654321'
  }
];

export const getArtisanById = (id: string): Artisan | undefined => {
  return artisanData.find(a => a.id === id);
};

export const getArtisanByEthnic = (ethnicName: string): Artisan | undefined => {
  const norm = ethnicName.toLowerCase().trim();
  return artisanData.find(a => a.ethnic.toLowerCase().includes(norm) || norm.includes(a.ethnic.toLowerCase()));
};
