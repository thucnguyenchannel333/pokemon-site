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
  Nidoking: {
    overview: 'Xin chào mọi người! Như mình đã đề cập trong bài RMT trước, mình đã tham gia giải French Community League từ tháng 9, và đây là một trong những team tour thú vị nhất mà mình từng góp mặt. Mình thi đấu USM OU mỗi tuần trong giải này và đã xây dựng rất nhiều đội hình. Đây cũng chính là phần mình yêu thích nhất trong competitive Pokémon. Hôm nay mình sẽ chia sẻ phiên bản chỉnh sửa của một trong những team mình thích nhất, được build để đối đầu với Dflo ở tuần thứ 7. Khi đó team mình đã chắc suất vào playoffs, nên mình không muốn xây dựng một đội hình “tiêu chuẩn” nữa, mà chỉ đơn giản là muốn sử dụng Nidoking, một trong những Pokémon mình thích dùng nhất trong thi đấu. Mình đã thua trận đó vì một sai lầm khá ngớ ngẩn (có chút “foreshadowing” ở đây, lát nữa sẽ rõ), nhưng mình rất thích team này nên đã chỉnh sửa và cải thiện lại một chút.',
    members: [
      { name: 'Nidoking', isAnchor: true },
      {
        name: 'Nidoking',
        item: 'Life Orb', ability: 'Sheer Force', nature: 'Timid',
        evs: '252 SpA / 4 SpD / 252 Spe',
        moves: ['Earth Power', 'Sludge Wave', 'Ice Beam', 'Substitute'],
        analysis: 'Nidoking như đã nói ở phần mở đầu là một trong những Pokémon mình thích sử dụng nhất, đồng thời cũng là một mối đe dọa bị đánh giá thấp trong USM OU. Bộ chiêu thức đa dạng kết hợp với Ability Sheer Force khiến nó cực kỳ khó bị switch vào, trừ khi đối phương có Chansey hoặc Gastrodon. Việc sử dụng Substitute giúp giảm thiểu yếu tố đoán bài, cho phép Nidoking dựng Sub khi ép được switch, từ đó gần như đảm bảo một mạng hạ gục. Nidoking là dạng Pokémon “high-risk, high-reward”, đặc biệt nếu bạn không dùng Substitute thường xuyên để giữ HP nhằm pivot tốt hơn trước các Pokémon như Tapu Koko hay Zapdos. Cách an toàn hơn là đưa Nidoking vào sân thông qua U-turn, và Scizor là một đối tác rất phù hợp, thường ép được Heatran vào sân, tạo cơ hội cực kỳ thuận lợi cho Nidoking sử dụng Earth Power hoặc Substitute.'
      },
      {
        name: 'Breloom',
        item: 'Toxic Orb', ability: 'Poison Heal', nature: 'Careful',
        evs: '236 HP / 176 SpD / 96 Spe',
        moves: ['Substitute', 'Spore', 'Leech Seed', 'Focus Punch'],
        analysis: 'Một partner rất tốt khác cho Nidoking là Breloom cũng là một Pokémon khá underrated trong meta này. Vì những switch-in phổ biến của Nidoking là Chansey và Gastrodon, Breloom trở thành đối tác hoàn hảo khi có thể dễ dàng vào sân trước cả hai sau khi Toxic Orb được kích hoạt. Ngoài ra, Breloom gặp khó khi setup trước các Pokémon như Tapu Bulu, Tapu Fini, Tapu Koko và Gliscor những mục tiêu mà Nidoking xử lý rất tốt, khiến cặp đôi này càng bổ trợ nhau hiệu quả hơn. Với set SubSeed kết hợp Poison Heal cực kỳ khó chịu, Breloom rất khó bị bào mòn nhờ khả năng hồi phục liên tục. Focus Punch là STAB chính, gây sát thương lớn ngay cả khi không đầu tư Attack, và là lựa chọn an toàn khi đang có Substitute hoặc sau khi dùng Spore. Breloom cũng là switch-in chính trước Ash-Greninja nhờ kháng cả hai STAB, tuy nhiên vẫn cần giữ máu cẩn thận vì Greninja gây sát thương rất lớn.'
      },
      {
        name: 'Tornadus-Therian',
        item: 'Icium Z', ability: 'Regenerator', nature: 'Timid',
        evs: '124 Def / 176 SpA / 208 Spe',
        moves: ['Hurricane','Icy Wind','Defog','U-turn'],
        analysis: 'Thành viên tiếp theo là một biến thể khá đặc biệt của Tornadus-Therian. Đội hình này khá yếu trước Garchomp và phần nào là Gliscor, nên mình muốn có một cách để “lure” và loại bỏ Garchomp trước khi nó kịp đặt Stealth Rock hoặc tung Z-Move. Icy Wind Tornadus-T là lựa chọn hoàn hảo, với khả năng dứt điểm Garchomp chỉ trong một hit. Ban đầu, mình dùng một EV spread thiên về bulk hơn, nhưng do không đầu tư vào Special Attack, Tornadus chỉ có 93.8% cơ hội OHKO Garchomp và mình đã phải trả giá cho điều đó khi low roll damage. Với EV spread hiện tại: (Đảm bảo sống sót trước Fake Out + Return/Frustration của Mega Lopunny, Luôn OHKO Garchomp bất kể EV spread, OHKO được cả Gliscor thiên về Special Defense) Speed đạt 363 giúp vượt các Tornadus-T khác và outspeed cả Scarf Magnezone.'
      },
      {
        name: 'Greninja',
        item: 'Choice Specs', ability: 'Battle Bond', nature: 'Timid',
        evs: '4 Def / 252 SpA / 252 Spe',
        moves: ['Hydro Pump', 'Dark Pulse', 'Water Shuriken', 'Spikes'],
        analysis: 'Greninja-Ash đóng vai trò hỗ trợ Spikes cho Nidoking, đồng thời phối hợp rất tốt với Breloom và Nidoking khi ép các Pokémon như Tapu Fini, Tapu Bulu, Chansey, Gastrodon, Toxapex và Ferrothorn vào sân. Ngoài ra, nó cung cấp priority quan trọng giúp kiểm soát các threat nhanh hơn. Greninja-Ash cũng gây áp lực lớn lên Mega Latias, có thể vào sân trước các biến thể không có Thunder Wave hoặc Thunderbolt và ép nó rút lui bằng Dark Pulse. 8 EVs Defense giúp nó sống sót trước Earthquake của Scarf Landorus-T từ full HP.'
      },
      {
        name: 'Mega-Scizor',
        item: 'Scizorite', ability: 'Technician', nature: 'Impish',
        evs: '248 HP / 16 Def / 244 SpD',
        moves: ['Swords Dance', 'Bullet Punch', 'Roost', 'U-turn'],
        analysis: 'Mega-Scizor là một trong những Mega mình thích dùng nhất trong các team offense và bulky offense. Nó là switch-in tuyệt vời trước các Pokémon Psychic, đặc biệt là Tapu Lele không có Hidden Power Fire. Ngoài ra, đây cũng là check chính của Kartana trong team, vì Tornadus-T không đủ bulk để xử lý các set SD hoặc Choice Band. 16 EVs Defense giúp Scizor chịu được 2 Sacred Sword từ Kartana Choice Band. Scizor cũng là một late-game sweeper cực kỳ nguy hiểm, với Bullet Punch được boost bởi Swords Dance. Dù có thể dùng Pursuit để trap Alakazam hoặc Tapu Lele, nhưng U-turn giúp tận dụng các tình huống gặp Heatran để đưa Nidoking vào sân an toàn.'
      },
      {
        name: 'Heatran',
        item: 'Leftovers', ability: 'Flash Fire', nature: 'Calm',
        evs: '252 HP / 176 SpD / 80 Spe',
        moves: ['Lava Plume', 'Stone Edge', 'Protect', 'Stealth Rock'],
        analysis: 'Cuối cùng, mình cần một Fire resist ổn định hơn cũng như một cách để đối phó với Volcarona. Heatran thiên về Special Defense là lựa chọn hoàn hảo. Stone Edge là một option khá ít người dùng nhưng rất hiệu quả, cho phép hạ gục Volcarona trong một hit thay vì phải Toxic stall. Heatran có thể chịu được +1 Hidden Power Ground từ Volcarona offensive. Đây cũng là Stealth Rock setter chính của team, giúp các đồng đội như Nidoking và Greninja gây áp lực mạnh hơn. Heatran cũng phần nào check được Specs Tapu Lele nếu nó không dùng Focus Blast, nhưng Psyshock vẫn gây sát thương rất lớn.'
      }
    ]
  },

  Zapdos: {
    overview: 'Đóng vai trò là mắt xích luân chuyển phòng thủ chính chống lại các kẻ quét sân vật lý. Khả năng Static trừng phạt những kẻ dùng U-turn hoặc các đòn tấn công vật lý như Fake Out từ mega-medicham và mega-lopunny bằng cách đe dọa gây tê liệt, trực tiếp dập tắt đà hưng phấn của đối thủ. Sự góp mặt của Defog cung cấp khả năng kiểm soát bẫy cần thiết, dù cần sử dụng cẩn thận để tránh dọn sạch chính những chiếc bẫy mà mega-diancie đã phản lại thành công sang phía sân đối phương.',
    members: [  
    { name: 'Zapdos', isAnchor: true },
      {
        name: 'Zapdos',
        item: 'Heavy-Duty Boots', ability: 'Static', nature: 'Bold',
        evs: '252 HP / 148 Def / 108 Spe',
        moves: ['Volt Switch','Heat Wave','Defog','Roost'],
        analysis: 'zapdos : Đóng vai trò là mắt xích luân chuyển phòng thủ chính chống lại các kẻ quét sân vật lý (physical setup sweepers). Khả năng Static trừng phạt những kẻ dùng U-turn hoặc các đòn tấn công vật lý như Fake Out từ mega-medicham và mega-lopunny bằng cách đe dọa gây tê liệt, trực tiếp dập tắt đà hưng phấn của đối thủ. Sự góp mặt của Defog cung cấp khả năng kiểm soát bẫy cần thiết, dù cần sử dụng cẩn thận để tránh dọn sạch chính những chiếc bẫy mà mega-diancie đã phản lại thành công sang phía sân đối phương.'
      },
     {
        name: 'Ferrothorn',
        item: 'Leftovers', ability: 'Iron Barbs', nature: 'Careful',
        evs: '252 HP / 4 Def / 252 SpD',
        moves: ['Power Whip','Leech Seed','Stealth Rock','Knock Off'],
        analysis: 'Ferrothorn: Ngoài việc cung cấp hỗ trợ Stealth Rock, bộ kỹ năng của ferrothorn này tạo nên một lõi phòng thủ cổ điển với slowbro khi cả hai bù đắp hoàn hảo các điểm yếu về hệ cho nhau (ferrothorn kháng các đòn đánh hệ Cỏ, Điện, Bóng tối/Ma; còn slowbro kháng hệ Lửa và Giác đấu).'
      },
      {
        name: 'Slowbro',
        item: 'Colbur Berry', ability: 'Regenerator', nature: 'Relaxed',
        evs: '252 HP / 180 Def / 76 SpD',
        moves: ['Scald', 'Body Press', 'Trick Room', 'Teleport'],
        analysis: 'Slowbro: Vật phẩm Colbur Berry đóng vai trò cực kỳ quan trọng ở đây. Nó đảm bảo bạn có thể chịu được một cú Knock Off từ weavile hoặc Landorus-Therian để chắc chắn đặt được Trick Room, hoặc chịu đòn từ bisharp và phản công hạ gục nó bằng Body Press. Tuy nhiên, điểm nhấn thực sự nằm ở sự kết hợp giữa Regenerator và Teleport. Vì Teleport có độ ưu tiên thấp, bạn sẽ nhận đòn trước, sau đó luân chuyển (pivot) ra ngoài một cách chậm rãi, hồi 33% máu nhờ Regenerator và đưa ursaluna vào sân mà hoàn toàn không bị trầy xước.'
      },
      {
        name: 'Ursaluna',
        item: 'Flame Orb', ability: 'Guts', nature: 'Brave',
        evs: '248 HP / 252 Atk / 8 SpD',
        moves: ['Swords Dance', 'Earthquake', 'Close Combat', 'Facade'],
        analysis: 'Ursaluna: Bộ kỹ năng này hoạt động dưới áp lực thời gian nghiêm ngặt và yêu cầu vị trí chính xác để vận hành tối ưu. Việc vào sân thông qua Teleport chậm của slowbro đảm bảo Flame Orb sẽ kích hoạt vào cuối lượt, giúp nhận ngay mức tăng sức mạnh từ Guts cho lượt kế tiếp. Dù Swords Dance là một lựa chọn mạo hiểm do số lượt giới hạn của Trick Room, nó cho phép ursaluna nghiền nát hoàn toàn các đội hình Stall và Bulky Balance. Đối với các đội thiên về tấn công, Facade đóng vai trò là đòn đánh STAB chủ lực có thể sử dụng liên tục.'
      },
      {
        name: 'Dragonite',
        item: 'Dragonium Z', ability: 'Multiscale', nature: 'Adamant',
        evs: '252 Atk / 4 SpD / 252 Spe',
        moves: ['Dragon Dance','Outrage','Extreme Speed','Fire Punch'],
        analysis: 'Dragonite: Được đặt ở vị trí điều kiện thắng phụ khi nằm ngoài Trick Room, bộ kỹ năng của dragonite này dựa vào Dragon Dance để quét sạch đội hình đối phương vào cuối trận. Dragonium-Z biến Outrage thành Devastating Drake, một đòn tấn công sức mạnh 190 có khả năng xuyên phá tức thì các bức tường Unaware như Quagsire, Alomomola, Zapdos hoặc các tanker cứng cáp. Extreme Speed cung cấp độ ưu tiên quan trọng, cho phép dragonite đóng vai trò là chốt chặn khẩn cấp để revenge-kill các mối đe dọa nhanh hơn hoặc các kẻ quét sân của đối thủ, ngay cả khi chưa kịp tăng chỉ số từ Dragon Dance.'
      },
      {
        name: 'mega-diancie',
        item: 'Diancite', ability: 'Magic Bounce', nature: 'Hasty',
        evs: '28 Atk / 228 SpA / 252 Spe',
        moves: ['Moonblast', 'Diamond Storm', 'Earth Power', 'Protect'],
        analysis: 'mega-diancie: Đóng vai trò là kẻ quấy rối đầu trận, mega-diancie tận dụng Magic Bounce để ngăn chặn đối thủ đặt bẫy hoặc dùng các chiêu trạng thái cả về mặt tâm lý lẫn kỹ thuật. Chỉ số EV tấn công cụ thể được tính toán kỹ lưỡng để đảm bảo 2HKO slowking bằng Diamond Storm, ngăn đối phương luân chuyển liên tục với Regenerator. Ngoài ra, việc Diamond Storm có 50% tỉ lệ tăng mạnh Phòng thủ có thể nhanh chóng biến mega-diancie thành một bức tường vật lý bất khả xâm phạm.'
      }
    ]
  },
    
    Clefable: {
    overview: 'Bạn có nhớ khi Mega Slowbro từng đứng hạng A- trong bảng xếp hạng hiệu quả của National Dex không? Thật khó tin khi giờ đây nó hoàn toàn mất hút khỏi bảng xếp hạng. Rõ ràng điều này liên quan nhiều đến sự thay đổi của meta và việc Dracovish bị cấm, nhưng Mega Slowbro là một lựa chọn quá độc đáo cho các đội Fat mà tôi thực sự muốn thử nghiệm. Nó khá kén đội hình so với dạng chưa tiến hóa nhưng chắc chắn có giá trị riêng. Tôi đã thích nghi được một đội hình cũ từ thời SM OU sang định dạng NatDex và sử dụng Mega Slowbro mà không cảm thấy mình đang hy sinh hiệu quả thi đấu. Tôi nghĩ đây có lẽ là đội hình tốt nhất tôi từng xây dựng trong NatDex và chắc chắn là ổn định nhất khi được chơi đúng cách.',
    members: [  
    { name: 'Clefable', isAnchor: true },
      {
        name: 'Clefable',
        item: 'Utility Umbrella', ability: 'Unaware', nature: 'Calm',
        evs: '248 HP / 88 Def / 164 SpD / 8 Spe',
        moves: ['Power Whip','Leech Seed','Stealth Rock','Knock Off'],
        analysis: 'Ferrothorn: Ngoài việc cung cấp hỗ trợ Stealth Rock, bộ kỹ năng của ferrothorn này tạo nên một lõi phòng thủ cổ điển với slowbro khi cả hai bù đắp hoàn hảo các điểm yếu về hệ cho nhau (ferrothorn kháng các đòn đánh hệ Cỏ, Điện, Bóng tối/Ma; còn slowbro kháng hệ Lửa và Giác đấu).'
      },
     {
        name: 'Ferrothorn',
        item: 'Leftovers', ability: 'Iron Barbs', nature: 'Careful',
        evs: '252 HP / 4 Def / 252 SpD',
        moves: ['Power Whip','Leech Seed','Stealth Rock','Knock Off'],
        analysis: 'Ferrothorn: Ngoài việc cung cấp hỗ trợ Stealth Rock, bộ kỹ năng của ferrothorn này tạo nên một lõi phòng thủ cổ điển với slowbro khi cả hai bù đắp hoàn hảo các điểm yếu về hệ cho nhau (ferrothorn kháng các đòn đánh hệ Cỏ, Điện, Bóng tối/Ma; còn slowbro kháng hệ Lửa và Giác đấu).'
      },
      {
        name: 'Slowbro',
        item: 'Colbur Berry', ability: 'Regenerator', nature: 'Relaxed',
        evs: '252 HP / 180 Def / 76 SpD',
        moves: ['Scald', 'Body Press', 'Trick Room', 'Teleport'],
        analysis: 'Slowbro: Vật phẩm Colbur Berry đóng vai trò cực kỳ quan trọng ở đây. Nó đảm bảo bạn có thể chịu được một cú Knock Off từ weavile hoặc Landorus-Therian để chắc chắn đặt được Trick Room, hoặc chịu đòn từ bisharp và phản công hạ gục nó bằng Body Press. Tuy nhiên, điểm nhấn thực sự nằm ở sự kết hợp giữa Regenerator và Teleport. Vì Teleport có độ ưu tiên thấp, bạn sẽ nhận đòn trước, sau đó luân chuyển (pivot) ra ngoài một cách chậm rãi, hồi 33% máu nhờ Regenerator và đưa ursaluna vào sân mà hoàn toàn không bị trầy xước.'
      },
      {
        name: 'Ursaluna',
        item: 'Flame Orb', ability: 'Guts', nature: 'Brave',
        evs: '248 HP / 252 Atk / 8 SpD',
        moves: ['Swords Dance', 'Earthquake', 'Close Combat', 'Facade'],
        analysis: 'Ursaluna: Bộ kỹ năng này hoạt động dưới áp lực thời gian nghiêm ngặt và yêu cầu vị trí chính xác để vận hành tối ưu. Việc vào sân thông qua Teleport chậm của slowbro đảm bảo Flame Orb sẽ kích hoạt vào cuối lượt, giúp nhận ngay mức tăng sức mạnh từ Guts cho lượt kế tiếp. Dù Swords Dance là một lựa chọn mạo hiểm do số lượt giới hạn của Trick Room, nó cho phép ursaluna nghiền nát hoàn toàn các đội hình Stall và Bulky Balance. Đối với các đội thiên về tấn công, Facade đóng vai trò là đòn đánh STAB chủ lực có thể sử dụng liên tục.'
      },
      {
        name: 'Dragonite',
        item: 'Dragonium Z', ability: 'Multiscale', nature: 'Adamant',
        evs: '252 Atk / 4 SpD / 252 Spe',
        moves: ['Dragon Dance','Outrage','Extreme Speed','Fire Punch'],
        analysis: 'Dragonite: Được đặt ở vị trí điều kiện thắng phụ khi nằm ngoài Trick Room, bộ kỹ năng của dragonite này dựa vào Dragon Dance để quét sạch đội hình đối phương vào cuối trận. Dragonium-Z biến Outrage thành Devastating Drake, một đòn tấn công sức mạnh 190 có khả năng xuyên phá tức thì các bức tường Unaware như Quagsire, Alomomola, Zapdos hoặc các tanker cứng cáp. Extreme Speed cung cấp độ ưu tiên quan trọng, cho phép dragonite đóng vai trò là chốt chặn khẩn cấp để revenge-kill các mối đe dọa nhanh hơn hoặc các kẻ quét sân của đối thủ, ngay cả khi chưa kịp tăng chỉ số từ Dragon Dance.'
      },
      {
        name: 'mega-diancie',
        item: 'Diancite', ability: 'Magic Bounce', nature: 'Hasty',
        evs: '28 Atk / 228 SpA / 252 Spe',
        moves: ['Moonblast', 'Diamond Storm', 'Earth Power', 'Protect'],
        analysis: 'mega-diancie: Đóng vai trò là kẻ quấy rối đầu trận, mega-diancie tận dụng Magic Bounce để ngăn chặn đối thủ đặt bẫy hoặc dùng các chiêu trạng thái cả về mặt tâm lý lẫn kỹ thuật. Chỉ số EV tấn công cụ thể được tính toán kỹ lưỡng để đảm bảo 2HKO slowking bằng Diamond Storm, ngăn đối phương luân chuyển liên tục với Regenerator. Ngoài ra, việc Diamond Storm có 50% tỉ lệ tăng mạnh Phòng thủ có thể nhanh chóng biến mega-diancie thành một bức tường vật lý bất khả xâm phạm.'
      }
    ]
  }
};