/* ============================================================
   home.js — chỉ chạy trên index.html (trang chính).
   Vẽ Bảng Xếp Hạng (50 dòng) và Lưới Thẻ Nổi Bật (8 ô vuông).
   Nạp SAU data.js vì cần dùng leaderboardData, featuredNames, getPokemon...
   ============================================================ */

async function renderLeaderboard() {
  const tbody = document.querySelector('#leaderboard-body');
  const loadingRow = document.querySelector('#leaderboard-loading');

  // Gọi PokeAPI cho cả 50 tên cùng lúc. getPokemon() đã tự bắt lỗi và
  // trả về null nếu 1 tên nào đó lỗi, nên Promise.all sẽ không bị "vỡ".
  const results = await Promise.all(leaderboardData.map(entry => getPokemon(entry.name)));

  if (loadingRow) loadingRow.remove();

  results.forEach((poke, i) => {
    if (!poke) return; // bỏ qua nếu tra cứu Pokémon này thất bại
    const entry = leaderboardData[i];
    const winClass = entry.winRate >= 50 ? 'win-good' : 'win-bad';
    const rankHtml = i < 3
      ? `<span class="rank-badge rank-${['gold', 'silver', 'bronze'][i]}">${i + 1}</span>`
      : `<span class="rank-plain">${i + 1}</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${rankHtml}</td>
      <td>
        <a class="poke-row-link" href="pokemon.html?name=${poke.name}">
          <img class="poke-icon" src="${poke.sprite}" alt="${poke.displayName}" loading="lazy">
          <span>${poke.displayName}</span>
        </a>
      </td>
      <td>
        <div class="usage-cell">
          <span>${entry.usage}%</span>
          <div class="usage-bar"><div class="usage-bar-fill" style="width:${entry.usage}%"></div></div>
        </div>
      </td>
      <td><span class="win-rate ${winClass}">${entry.winRate}%</span></td>
    `;
    tbody.appendChild(tr);
  });
}

async function renderFeaturedGrid() {
  const grid = document.querySelector('#featured-grid');
  const results = await Promise.all(featuredNames.map(name => getPokemon(name)));

  grid.innerHTML = '';
  results.forEach((poke) => {
    if (!poke) return;
    const rank = leaderboardData.findIndex(e => e.name === poke.name) + 1;
    // Màu viền/glow khi hover vẫn lấy theo hệ CHÍNH (types[0]) — chỉ 1 màu cho đẹp.
    const color = typeColors[poke.types[0]] || '#888';
    // NHƯNG hiển thị badge thì lặp qua TẤT CẢ hệ (types), vì rất nhiều Pokémon có 2 hệ.
    const typeBadges = poke.types
      .map(t => `<span class="type-badge" style="background:${typeColors[t]}26; color:${typeColors[t]}">${t}</span>`)
      .join('');

    const card = document.createElement('a');
    card.href = `pokemon.html?name=${poke.name}`;
    card.className = 'poke-card';
    card.style.setProperty('--type-color', color);
    card.innerHTML = `
      <div class="poke-card-media">
        <img src="${poke.officialArt}" alt="${poke.displayName}" loading="lazy">
      </div>
      <div class="poke-card-body">
        <h3>${poke.displayName}</h3>
        <div class="poke-card-tags">
          <div class="type-badges">${typeBadges}</div>
          <span class="rank-tag">Hạng #${rank > 0 ? rank : '—'}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderLeaderboard();
renderFeaturedGrid();
