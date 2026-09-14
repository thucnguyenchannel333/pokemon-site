/* ============================================================
   data.js
   Dữ liệu & hàm dùng chung cho toàn bộ trang web.
   File này được nạp TRƯỚC các file .js khác (xem thứ tự <script> trong HTML).

   Có 2 LOẠI dữ liệu khác nhau trong file này — rất quan trọng để hiểu
   khi bạn muốn thay bằng dữ liệu thật:

   1) Dữ liệu GỐC của Pokémon (tên, hệ, chỉ số, hình ảnh)
      → được LẤY TRỰC TIẾP TỪ POKEAPI (https://pokeapi.co) bằng hàm
        getPokemon() bên dưới. Đây LÀ dữ liệu thật, luôn cập nhật.

   2) Dữ liệu THI ĐẤU (tỉ lệ sử dụng %, tỉ lệ thắng %) và phần PHÂN TÍCH
      → PokeAPI KHÔNG có loại dữ liệu này (đây là số liệu do người chơi
        thống kê, không phải dữ liệu gốc của trò chơi). Trong file này,
        mình để SỐ MINH HOẠ (không phải số thật) — xem phần hướng dẫn
        trong tin nhắn để biết cách thay bằng số liệu thật từ Smogon.
   ============================================================ */

// ---------- 1) Danh sách 50 Pokémon cho Bảng Xếp Hạng ----------
// Thêm/bớt tên ở đây để đổi danh sách. Tên phải viết thường, đúng theo
// PokeAPI (ví dụ dạng nhiều từ dùng dấu gạch ngang: "landorus-therian").
const leaderboardNames = [
  'zapdos', 'dragonite', 'tyranitar', 'gengar', 'clefable',
  'garchomp', 'metagross', 'ferrothorn', 'slowbro', 'toxapex',
  'landorus', 'corviknight', 'dragapult', 'hydreigon', 'weavile',
  'nidoking', 'salamence', 'greninja', 'lucario', 'excadrill',
  'volcarona', 'rillaboom', 'cinderace', 'urshifu', 'heatran',
  'gliscor', 'hippowdon', 'scizor', 'mimikyu', 'zoroark',
  'azumarill', 'breloom', 'conkeldurr', 'skarmory', 'alakazam',
  'gyarados', 'blissey', 'chansey', 'nidoqueen', 'magnezone',
  'starmie', 'snorlax', 'thundurus', 'tornadus', 'registeel',
  'celesteela', 'kartana', 'rotom', 'articuno', 'moltres'
];

// ---------- 2) Số liệu thi đấu MINH HOẠ (KHÔNG PHẢI số thật) ----------
// Hàm này tự sinh ra usage% giảm dần + winRate% dao động quanh 50%,
// chỉ để bảng có nội dung hiển thị ngay. Hãy thay bằng số liệu thật
// (xem hướng dẫn) khi dùng cho mục đích thật.
function buildDemoStats(names) {
  return names.map((name, i) => {
    const usage = Math.max(4, 42 - i * 0.7 - (i % 5)).toFixed(1);
    const winRate = (50 + ((name.length * 7 + i * 3) % 17) - 8).toFixed(1);
    return { name, usage: Number(usage), winRate: Number(winRate) };
  });
}
const leaderboardData = buildDemoStats(leaderboardNames);

// ---------- 3) 8 Pokémon được chọn để hiển thị đầy đủ ----------
// (khối ô vuông ở trang chính + có trang chi tiết riêng)
const featuredNames = [
  'zapdos', 'nidoking', 'clefable', 'tyranitar', 
  'ferrothorn', 'dragonite', 'slowbro', 'gengar', 
  'garchomp', 'dragapult', 'excadrill', 'snorlax',
  'corviknight', 'rillaboom', 'metagross', 'volcarona',
  'toxapex', 'landorus', 'hydreigon', 'weavile',
  'salamence', 'greninja', 'lucario', 'cinderace',
  'urshifu', 'heatran', 'gliscor', 'hippowdon', 
  'scizor', 'mimikyu', 'zoroark', 'azumarill', 
  'breloom', 'conkeldurr', 'skarmory', 'alakazam', 
  'gyarados', 'blissey', 'chansey', 'nidoqueen', 
  'magnezone', 'starmie', 'thundurus', 'tornadus',
  'registeel', 'celesteela', 'kartana', 'rotom', 
  'articuno', 'moltres',

];

// ---------- 4) Bài phân tích mẫu cho 8 Pokémon nổi bật ----------
// Đây là nội dung do MÌNH viết tay để demo — hãy thay bằng bài viết
// thật của bạn (object key phải trùng tên PokeAPI ở trên).
const analysisText = {
  zapdos: 'Với bộ hệ Điện/Bay cùng chỉ số Sức Tấn Công Đặc Biệt cao, Zapdos vừa gây sát thương lớn vừa kháng tốt trước đòn Đấu và Cỏ. Khả năng miễn nhiễm Tê Liệt tự nhiên (do hệ Điện) giúp nó trụ vững trong nhiều đội hình phòng thủ.',
  nidoking: 'Nidoking sở hữu bộ hệ Độc/Đất khá hiếm gặp, giúp xuyên thủng nhiều đội hình phòng thủ tiêu chuẩn. Bộ chỉ số tấn công cân bằng giữa vật lý và đặc biệt cho phép nó chơi linh hoạt theo nhiều bộ chiêu khác nhau.',
  clefable: 'Đặc trưng Ma Thuật (Magic Guard) giúp Clefable miễn nhiễm sát thương gián tiếp như độc, gai độc hay thời tiết khắc nghiệt — biến nó thành một lựa chọn phòng thủ cực kỳ bền bỉ, nhất là khi đi cùng vật phẩm hồi phục theo lượt.',
  tyranitar: 'Chỉ số Tấn Công và Phòng Thủ cao cùng khả năng dựng Bão Cát khiến Tyranitar vừa gây sát thương mạnh vừa gián tiếp tăng Phòng Thủ Đặc Biệt cho bản thân — một trong những Pokémon dựng thời tiết đáng gờm nhất.',
  ferrothorn: 'Bộ hệ Cỏ/Thép giúp Ferrothorn kháng rất nhiều đòn tấn công phổ biến. Dù tốc độ cực thấp, chỉ số phòng thủ vượt trội cùng đặc trưng Gai Nhọn (Iron Barbs) khiến đối thủ phải trả giá mỗi khi tấn công vật lý vào nó.',
  dragonite: 'Dragonite hiếm khi bị khắc chế triệt để nhờ bộ chỉ số toàn diện và khả năng học đa dạng chiêu thức. Đặc trưng Nhiều Vảy (Multiscale) giúp nó chịu đòn đầu tiên tốt hơn hẳn khi vào sân trong tình huống an toàn.',
  slowbro: 'Slowbro là một trong những lựa chọn phòng thủ đặc biệt bền bỉ nhờ chỉ số Phòng Thủ cao cùng đặc trưng Tái Sinh (Regenerator), hồi phục HP mỗi khi rút lui — rất phù hợp để luân chuyển liên tục trong trận đấu dài hơi.',
  gengar: 'Tốc độ cao cùng Sức Tấn Công Đặc Biệt vượt trội giúp Gengar trở thành một trong những đòn kết liễu nhanh và nguy hiểm nhất, đặc biệt khi phối hợp cùng chiến thuật hy sinh (sacrifice) để dọn đường cho đồng đội.',
  garchomp: 'Garchomp là một trong những Pokémon tấn công vật lý mạnh mẽ nhất, với tốc độ và sức mạnh vượt trội. Bộ hệ Rồng/Đất giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  dragapult: 'Dragapult sở hữu tốc độ cực cao và khả năng tấn công đa dạng, cho phép nó áp đảo nhiều đối thủ trước khi họ kịp phản ứng. Bộ hệ Rồng/Bóng Ma giúp nó kháng nhiều đòn phổ biến và gây sát thương hiệu quả.',
  excadrill: 'Excadrill là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Đất/Thép giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  snorlax: 'Snorlax là một trong những lựa chọn phòng thủ vật lý bền bỉ nhất nhờ chỉ số HP và Phòng Thủ cao. Đặc trưng Ăn Ngủ (Thick Fat) giúp nó kháng nhiều đòn phổ biến, đồng thời hồi phục HP nhanh chóng.',
  corviknight: 'Corviknight là một trong những Pokémon phòng thủ vật lý mạnh mẽ nhất, với chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công bay. Đặc trưng Lá chắn (Iron Barbs) giúp nó gây sát thương cho đối thủ khi bị tấn công.',
  rillaboom: 'Rillaboom là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Cỏ giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  metagross: 'Metagross là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Thép/Psi giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  volcarona: 'Volcarona là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ tốt. Bộ hệ Côn Trùng/Lửa giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  toxapex: 'Toxapex là một trong những Pokémon phòng thủ đặc biệt bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công độc. Đặc trưng Gai độc (Regenerator) giúp nó hồi phục HP mỗi khi rút lui, rất phù hợp để luân chuyển liên tục trong trận đấu dài hơi.',
  landorus: 'Landorus là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Đất/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  hydreigon: 'Hydreigon là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ tốt. Bộ hệ Rồng/Bóng Ma giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  weavile: 'Weavile là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ cực cao. Bộ hệ Băng/Bóng Ma giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  salamence: 'Salamence là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Rồng/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  greninja: 'Greninja là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ cực cao. Bộ hệ Nước/Bóng Ma giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  lucario: 'Lucario là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Thép/Đấu giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  cinderace: 'Cinderace là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Lửa giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  urshifu: 'Urshifu là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Đấu/Đen giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  heatran: 'Heatran là một trong những Pokémon phòng thủ đặc biệt bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công lửa. Bộ hệ Lửa/Thép giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  gliscor: 'Gliscor là một trong những Pokémon phòng thủ vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Đất/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  hippowdon: 'Hippowdon là một trong những Pokémon phòng thủ vật lý bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công đất. Bộ hệ Đất giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  scizor: 'Scizor là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Côn Trùng/Thép giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  mimikyu: 'Mimikyu là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Bóng Ma/Cỏ giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  zoroark: 'Zoroark là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ tốt. Bộ hệ Bóng Ma giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  azumarill: 'Azumarill là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Nước/Cỏ giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  breloom: 'Breloom là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Cỏ/Đấu giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  conkeldurr: 'Conkeldurr là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Đấu giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  skarmory: 'Skarmory là một trong những Pokémon phòng thủ vật lý bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công bay. Bộ hệ Thép/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  alakazam: 'Alakazam là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ cực cao. Bộ hệ Psi giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  gyarados: 'Gyarados là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Nước/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  blissey: 'Blissey là một trong những Pokémon phòng thủ đặc biệt bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công đặc biệt. Bộ hệ Bình thường giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  chansey: 'Chansey là một trong những Pokémon phòng thủ đặc biệt bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công đặc biệt. Bộ hệ Bình thường giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  nidoqueen: 'Nidoqueen là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Độc/Đất giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  magnezone: 'Magnezone là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ tốt. Bộ hệ Điện/Thép giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  starmie: 'Starmie là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ cực cao. Bộ hệ Nước/Psi giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  thundurus: 'Thundurus là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ tốt. Bộ hệ Điện/Bóng Ma giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  tornadus: 'Tornadus là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ tốt. Bộ hệ Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  registeel: 'Registeel là một trong những Pokémon phòng thủ vật lý bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công thép. Bộ hệ Thép giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  celesteela: 'Celesteela là một trong những Pokémon phòng thủ vật lý bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công bay. Bộ hệ Thép/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  kartana: 'Kartana là một trong những Pokémon tấn công vật lý mạnh mẽ nhất với tốc độ cực cao. Bộ hệ Cỏ/Thép giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  rotom: 'Rotom là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ tốt. Bộ hệ Điện/Bóng Ma giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  articuno: 'Articuno là một trong những Pokémon phòng thủ đặc biệt bền bỉ nhất nhờ chỉ số Phòng Thủ cao và khả năng chống lại các đòn tấn công băng. Bộ hệ Băng/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',
  moltres: 'Moltres là một trong những Pokémon tấn công đặc biệt mạnh mẽ nhất với tốc độ tốt. Bộ hệ Lửa/Bay giúp nó kháng nhiều đòn phổ biến, đồng thời gây sát thương lớn cho các đối thủ yếu hệ.',

};

// ---------- 5) Bảng màu theo hệ Pokémon (quy ước màu phổ biến) ----------
const typeColors = {
  normal: '#f8f8f7', fire: '#ff5e00', water: '#1882a5', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#c07e28', poison: '#A040A0',
  ground: '#725400', flying: '#d6ccf5', psychic: '#F85888', bug: '#A8B820',
  rock: '#5d4d06', ghost: '#3f71a7', dragon: '#0177e5', dark: '#010f1c',
  steel: '#bbbbca', fairy: '#EE99AC'
};

// ---------- 6) Hàm dùng chung: viết hoa chữ cái đầu ----------
function capitalize(str) {
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ---------- 7) Hàm dùng chung: lấy dữ liệu 1 Pokémon từ PokeAPI ----------
// Đây chính là phần "lấy dữ liệu từ nguồn khác" — không cần tài khoản,
// không cần API key, chỉ cần gọi fetch() tới địa chỉ công khai của PokeAPI.
const POKEAPI_BASE = 'https://pokeapi.co/api/v2/pokemon/';
const _pokeCache = {}; // tránh gọi API lại nhiều lần cho cùng 1 cái tên

function getStatValue(statsArr, key) {
  const found = statsArr.find(s => s.stat.name === key);
  return found ? found.base_stat : 0;
}

async function getPokemon(name) {
  const key = name.toLowerCase();
  if (_pokeCache[key]) return _pokeCache[key];

  try {
    const res = await fetch(POKEAPI_BASE + key);
    if (!res.ok) throw new Error('Không tìm thấy Pokémon: ' + key);
    const raw = await res.json();

    const poke = {
      name: raw.name,
      displayName: capitalize(raw.name),
      id: raw.id,
      sprite: raw.sprites.front_default,
      officialArt:
        (raw.sprites.other &&
          raw.sprites.other['official-artwork'] &&
          raw.sprites.other['official-artwork'].front_default) ||
        raw.sprites.front_default,
      types: raw.types
        .sort((a, b) => a.slot - b.slot)
        .map(t => t.type.name),
      stats: {
        hp: getStatValue(raw.stats, 'hp'),
        atk: getStatValue(raw.stats, 'attack'),
        def: getStatValue(raw.stats, 'defense'),
        spa: getStatValue(raw.stats, 'special-attack'),
        spd: getStatValue(raw.stats, 'special-defense'),
        spe: getStatValue(raw.stats, 'speed')
      }
    };
    _pokeCache[key] = poke;
    return poke;
  } catch (err) {
    console.error('[getPokemon] Lỗi khi tải dữ liệu cho "' + name + '":', err);
    return null; // trả về null thay vì làm hỏng cả trang khi 1 mục lỗi
  }
}

// ---------- 8) Hàm dùng chung: lấy icon của 1 vật phẩm (item) từ PokeAPI ----------
// Dùng cho icon nhỏ bên cạnh tên item trong ô "Đội Hình Đề Xuất" (team.js).
const _itemCache = {};

async function getItemSprite(itemName) {
  const slug = itemName.toLowerCase().replace(/\s+/g, '-');
  if (_itemCache[slug]) return _itemCache[slug];

  try {
    const res = await fetch('https://pokeapi.co/api/v2/item/' + slug);
    if (!res.ok) throw new Error('Không tìm thấy item: ' + slug);
    const raw = await res.json();
    const sprite = raw.sprites && raw.sprites.default ? raw.sprites.default : null;
    _itemCache[slug] = sprite;
    return sprite;
  } catch (err) {
    console.error('[getItemSprite] Lỗi khi tải icon cho "' + itemName + '":', err);
    return null;
  }
}

/* ============================================================
   9) ĐỘI HÌNH ĐỀ XUẤT (Suggested Team)

   NGUỒN DỮ LIỆU: PokeAPI KHÔNG có khái niệm "đội hình" hay "bộ set thi
   đấu" (item/nature/EVs/moveset khuyên dùng) — đây là kiến thức do
   cộng đồng competitive đúc kết, không phải dữ liệu gốc trò chơi.

   Nguồn đáng tin cậy nhất cho loại thông tin này là STRATEGY POKEDEX
   của Smogon: https://www.smogon.com/dex/ — chọn thế hệ (ví dụ "sv")
   → format (ví dụ "national-dex" hoặc "ou") → trang riêng của từng
   Pokémon sẽ có mục "Sets" (item/ability/nature/EVs/moveset) kèm bài
   phân tích do người chơi kỳ cựu viết và kiểm duyệt.

   Object bên dưới CHỈ có dữ liệu đầy đủ cho "nidoking" như một ví dụ
   mẫu hoàn chỉnh (mô phỏng đúng bố cục trong ảnh bạn gửi). Các set
   (item/ability/nature/EVs/moveset) dùng ở đây là những set kinh điển,
   được biết đến rộng rãi trong cộng đồng — nhưng vì meta thay đổi theo
   thời gian, hãy luôn ĐỐI CHIẾU LẠI với trang Smogon hiện tại trước khi
   dùng cho mục đích thật. Phần phân tích (analysis) là nội dung MÌNH
   tự viết, không sao chép từ bất kỳ nguồn nào.

   Muốn thêm đội hình cho 1 Pokémon nổi bật khác (bạn đã có 50 Pokémon
   trong featuredNames rồi)? Chỉ cần thêm 1 key mới vào object này,
   đúng định dạng bên dưới.
   ============================================================ */
const teamData = {
  nidoking: {
    overview: 'Đội hình này xây dựng xung quanh Nidoking ở vai trò đặc công xuyên phá (special wallbreaker), tận dụng bộ hệ Độc/Đất khá hiếm để tạo áp lực lên nhiều đội hình phòng thủ tiêu chuẩn. Các đồng đội được chọn nhằm bù đắp tốc độ, hỗ trợ dọn hazard, và gánh vác những mối đe doạ mà Nidoking khó xử lý một mình.',
    members: [
      { name: 'nidoking', isAnchor: true },
      {
        name: 'breloom',
        item: 'Toxic Orb', ability: 'Poison Heal', nature: 'Careful',
        evs: '236 HP / 176 SpD / 96 Spe',
        moves: ['Substitute', 'Spore', 'Leech Seed', 'Focus Punch'],
        analysis: 'Breloom mang đến một hướng tấn công vật lý hoàn toàn khác so với Nidoking, giúp đội hình khó bị một Pokémon phòng thủ đơn lẻ cản phá cả hai. Spore cho phép vô hiệu hoá tạm thời mối đe doạ nguy hiểm trước khi Nidoking vào sân, còn combo Substitute + Leech Seed + Poison Heal giúp Breloom trụ sân rất lâu mà không sợ trạng thái gây hại.'
      },
      {
        name: 'garchomp',
        item: 'Choice Scarf', ability: 'Rough Skin', nature: 'Jolly',
        evs: '252 Atk / 4 SpD / 252 Spe',
        moves: ['Earthquake', 'Dragon Claw', 'Stone Edge', 'Iron Head'],
        analysis: 'Nidoking không có tốc độ vượt trội, nên Garchomp mang Choice Scarf đóng vai trò "người dọn dẹp tốc độ" (revenge killer), xử lý những Pokémon nhanh đã gây thiệt hại cho đội sau khi Nidoking làm suy yếu đối phương. Bộ 4 chiêu bao phủ diện rộng giúp Garchomp hiếm khi bị bí chiêu trước một mục tiêu bất kỳ.'
      },
      {
        name: 'corviknight',
        item: 'Leftovers', ability: 'Pressure', nature: 'Impish',
        evs: '252 HP / 252 Def / 4 SpD',
        moves: ['Defog', 'Brave Bird', 'Roost', 'Body Press'],
        analysis: 'Vì Nidoking không tự dọn được hazard cho bản thân, Corviknight đảm nhận vai trò dọn dẹp (Defog) và làm lá chắn vật lý bền bỉ nhờ Roost hồi phục liên tục mỗi lượt. Đây cũng là điểm tựa để đội hình gánh đỡ các đòn tấn công vật lý mạnh mà Nidoking buộc phải né tránh.'
      },
      {
        name: 'toxapex',
        item: 'Black Sludge', ability: 'Regenerator', nature: 'Calm',
        evs: '252 HP / 252 SpD / 4 Def',
        moves: ['Toxic Spikes', 'Scald', 'Recover', 'Haze'],
        analysis: 'Toxapex bổ sung khả năng chống chịu đặc biệt mà Nidoking không có nhiều, đồng thời tự rải Toxic Spikes để hỗ trợ lối chơi hao mòn dần của cả đội. Đặc trưng Regenerator giúp Toxapex liên tục vào sân đỡ đòn mà không lo hao HP quá nhiều về lâu dài.'
      },
      {
        name: 'rillaboom',
        item: 'Choice Band', ability: 'Grassy Surge', nature: 'Adamant',
        evs: '252 Atk / 4 SpD / 252 Spe',
        moves: ['Grassy Glide', 'Wood Hammer', 'U-turn', 'Superpower'],
        analysis: 'Grassy Terrain mà Rillaboom dựng lên âm thầm hồi một phần HP mỗi lượt cho các Pokémon đứng đất trong đội, bao gồm cả Nidoking — lợi thế nhỏ nhưng cộng dồn hiệu quả trong trận kéo dài. Grassy Glide được ưu tiên ra đòn trước cũng cho Rillaboom khả năng dọn dẹp gần giống Garchomp, nhưng ở một dải mục tiêu khác.'
      }
    ]
  }
  // Thêm đội hình cho các Pokémon nổi bật khác ở đây, theo đúng cấu trúc trên.
};
