/* ============================================================
   detail.js — chỉ chạy trên pokemon.html (trang phụ chi tiết).
   Đọc tên Pokémon từ URL (?name=...), gọi PokeAPI, rồi vẽ:
     - Ô bên trái: tên + icon + 6 chỉ số (HP/ATK/DEF/SPA/SPD/SPE)
     - Ô bên phải: phân tích + mô tả
   Nạp SAU data.js.
   ============================================================ */

async function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const name = (params.get('name') || '').toLowerCase();

  const statPanel = document.querySelector('#stat-panel');
  const analysisPanel = document.querySelector('#analysis-panel');

  if (!name) {
    statPanel.innerHTML = '<p>Chưa chọn Pokémon nào. Hãy quay lại trang chính và chọn một Pokémon để xem chi tiết.</p>';
    analysisPanel.innerHTML = '';
    return;
  }

  const poke = await getPokemon(name);

  if (!poke) {
    statPanel.innerHTML = `<p>Không tìm thấy Pokémon "<strong>${name}</strong>". Kiểm tra lại tên trong đường dẫn (ví dụ: pokemon.html?name=zapdos).</p>`;
    analysisPanel.innerHTML = '';
    return;
  }

  document.title = poke.displayName + ' | MetaDex';

  const primaryColor = typeColors[poke.types[0]] || '#F2B90C';
  const statsList = [
    ['HP', poke.stats.hp],
    ['ATK', poke.stats.atk],
    ['DEF', poke.stats.def],
    ['SPA', poke.stats.spa],
    ['SPD', poke.stats.spd],
    ['SPE', poke.stats.spe]
  ];

  statPanel.innerHTML = `
    <h1 class="detail-name" style="color:${primaryColor}">${poke.displayName}</h1>
    <span class="detail-dex">#${String(poke.id).padStart(3, '0')}</span>
    <img class="detail-art" src="${poke.officialArt}" alt="${poke.displayName}">
    <div class="detail-types">
      ${poke.types.map(t => `<span class="type-badge" style="background:${typeColors[t]}26; color:${typeColors[t]}">${t.toUpperCase()}</span>`).join('')}
    </div>
    <div class="stat-bars">
      ${statsList.map(([label, val]) => `
        <div class="stat-row">
          <span class="stat-label">${label}</span>
          <div class="stat-bar"><div class="stat-bar-fill" style="width:${Math.min(100, (val / 200) * 100)}%; background:${primaryColor}"></div></div>
          <span class="stat-value">${val}</span>
        </div>
      `).join('')}
    </div>
  `;

  // usage/winRate + bài phân tích là dữ liệu RIÊNG (không có trên PokeAPI),
  // nên chỉ hiện được nếu Pokémon này nằm trong leaderboardData / analysisText.
  const entry = leaderboardData.find(e => e.name === poke.name);
  const analysis = analysisText[poke.name];

  analysisPanel.innerHTML = `
    <h2>Phân Tích &amp; Mô Tả</h2>
    ${entry ? `
      <div class="analysis-stats-row">
        <div><span class="mini-label">Tỉ lệ sử dụng</span><strong>${entry.usage}%</strong></div>
        <div><span class="mini-label">Tỉ lệ thắng</span><strong class="${entry.winRate >= 50 ? 'win-good' : 'win-bad'}">${entry.winRate}%</strong></div>
      </div>
    ` : ''}
    <p>${analysis || 'Chưa có bài phân tích cho Pokémon này trong dữ liệu mẫu. Hãy tự viết nội dung của bạn trong biến <code>analysisText</code> ở file data.js.'}</p>
  `;
}

renderDetail();
