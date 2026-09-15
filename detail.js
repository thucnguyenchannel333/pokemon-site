/* ============================================================
   detail.js — chỉ chạy trên pokemon.html (trang phụ chi tiết).
   Vẽ Ô BÊN TRÁI: tên + số Pokédex + ảnh lớn + badge hệ + 6 chỉ số
   (HP/ATK/DEF/SPA/SPD/SPE), theo đúng bố cục trong ảnh "Zapdos".
   Nạp SAU data.js.
   ============================================================ */

async function renderDetail() {
  const params = new URLSearchParams(window.location.search);
  const name = (params.get('name') || '').toLowerCase();

  const statPanel = document.querySelector('#stat-panel');
  if (!statPanel) return;

  if (!name) {
    statPanel.innerHTML = '<p class="loading-text">Chưa chọn Pokémon nào. Hãy quay lại trang chính và chọn một Pokémon.</p>';
    return;
  }

  const poke = await getPokemon(name);

  if (!poke) {
    statPanel.innerHTML = `<p class="loading-text">Không tìm thấy Pokémon "<strong>${escapeHtml(name)}</strong>". Kiểm tra lại tên trong đường dẫn (ví dụ: pokemon.html?name=zapdos).</p>`;
    return;
  }

  document.title = poke.displayName + ' | ThucNguyen';

  const primaryColor = typeColors[poke.types[0]] || '#F2B90C';

  // Đổ màu nền mờ + viền của ô theo hệ chính — mỗi Pokémon một sắc riêng.
  statPanel.style.setProperty('--poke-color', primaryColor);

  const statsList = [
    ['HP',  poke.stats.hp],
    ['ATK', poke.stats.atk],
    ['DEF', poke.stats.def],
    ['SPA', poke.stats.spa],
    ['SPD', poke.stats.spd],
    ['SPE', poke.stats.spe]
  ];

  statPanel.innerHTML = `
    <div class="detail-head">
      <h1 class="detail-name" style="color:${primaryColor}">${poke.displayName.toUpperCase()}</h1>
      <span class="detail-dex">#${String(poke.id).padStart(3, '0')}</span>
    </div>

    <div class="detail-art-wrap">
      <img class="detail-art" src="${poke.officialArt}" alt="${poke.displayName}" data-poke-name="${poke.name}" onerror="onArtError(this)">
    </div>

    <div class="detail-types">
      ${poke.types.map(t => `
        <span class="type-badge type-badge--solid" style="background:${typeColors[t]}">${t.toUpperCase()}</span>
      `).join('')}
    </div>

    <div class="stat-bars">
      ${statsList.map(([label, val]) => `
        <div class="stat-row">
          <span class="stat-label">${label}</span>
          <div class="stat-bar">
            <div class="stat-bar-fill" style="width:${Math.min(100, (val / 200) * 100)}%; background:${primaryColor}"></div>
          </div>
          <span class="stat-value">${val}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Nếu Pokémon này có trong bảng xếp hạng, hiện thêm dòng tỉ lệ sử dụng thật.
  const entry = leaderboardData.find(e => e.name === poke.name || e.name === name);
  const usageEl = document.querySelector('#detail-usage');
  if (entry && usageEl) {
    usageEl.innerHTML = `
      <span class="mini-label">TỈ LỆ SỬ DỤNG — ${USAGE_META.format}, ${USAGE_META.month}</span>
      <div class="usage-cell">
        <strong>${entry.usage}%</strong>
        <div class="usage-bar"><div class="usage-bar-fill" style="width:${Math.min(100, entry.usage * 4)}%"></div></div>
      </div>
    `;
    usageEl.classList.add('show');
  }
}

renderDetail();
