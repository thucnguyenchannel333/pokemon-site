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
  'garchomp', 'dragapult', 'excadrill', 'snorlax'

  
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
