/* ============================================================
   home.js — chỉ chạy trên index.html (trang chính).
   Gồm 3 phần:
     1. renderLeaderboard()  — bảng xếp hạng tỉ lệ sử dụng (số liệu thật)
     2. renderTypeFilter()   — khối "All Pokémon" mở ra danh sách hệ để lọc
     3. renderFeaturedGrid() — lưới ô vuông Pokémon, lọc theo hệ đang tích
   Nạp SAU data.js.
   ============================================================ */

// Bộ nhớ tạm: giữ dữ liệu Pokémon đã tải để lọc lại mà không gọi API lần nữa.
let featuredCache = [];
let activeTypes = new Set(); // rỗng = không lọc, hiện tất cả

/* ---------- 1) Bảng xếp hạng ---------- */
async function renderLeaderboard() {
  const tbody = document.querySelector('#leaderboard-body');
  const loadingRow = document.querySelector('#leaderboard-loading');
  if (!tbody) return;

  // Ghi rõ nguồn + tháng của số liệu ngay dưới tiêu đề.
  const noteEl = document.querySelector('#usage-note');
  if (noteEl) {
    noteEl.innerHTML = `
      Số liệu tỉ lệ sử dụng của <strong>${USAGE_META.month}</strong>, format
      <strong>${USAGE_META.format}</strong> (mốc ${USAGE_META.cutoff}) —
      nguồn <a href="${USAGE_META.sourceUrl}" target="_blank" rel="noopener">Smogon University</a>.`;
  }

  const results = await Promise.all(leaderboardData.map(entry => getPokemon(entry.name)));
  if (loadingRow) loadingRow.remove();

  const maxUsage = Math.max(...leaderboardData.map(e => e.usage));

  results.forEach((poke, i) => {
    const entry = leaderboardData[i];
    const rankHtml = i < 3
      ? `<span class="rank-badge rank-${['gold', 'silver', 'bronze'][i]}">${i + 1}</span>`
      : `<span class="rank-plain">${i + 1}</span>`;

    const iconHtml = poke
      ? `<img class="poke-icon" src="${poke.sprite}" alt="" loading="lazy">`
      : '<span class="poke-icon"></span>';

    const tr = document.createElement('tr');
    // Dòng thứ 11 trở đi ẩn đi, mở bằng nút "Xem đầy đủ".
    if (i >= 10) tr.classList.add('row-hidden');

    tr.innerHTML = `
      <td>${rankHtml}</td>
      <td>
        <a class="poke-row-link" href="pokemon.html?name=${entry.name}">
          ${iconHtml}
          <span>${escapeHtml(entry.label || capitalize(entry.name))}</span>
        </a>
      </td>
      <td>
        <div class="usage-cell">
          <span>${entry.usage}%</span>
          <div class="usage-bar">
            <div class="usage-bar-fill" style="width:${(entry.usage / maxUsage) * 100}%"></div>
          </div>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Nút mở/thu gọn phần còn lại của bảng.
  const toggle = document.querySelector('#rankings-toggle');
  if (toggle) {
    toggle.textContent = `Xem đầy đủ bảng xếp hạng (${leaderboardData.length})`;
    toggle.addEventListener('click', () => {
      const expanded = toggle.classList.toggle('expanded');
      tbody.querySelectorAll('.row-hidden').forEach(r => r.classList.toggle('row-shown', expanded));
      toggle.textContent = expanded
        ? 'Thu gọn'
        : `Xem đầy đủ bảng xếp hạng (${leaderboardData.length})`;
    });
  }
}

/* ---------- 2) Khối "All Pokémon" + bộ lọc theo hệ ---------- */
function renderTypeFilter() {
  const section = document.querySelector('#all-pokemon-section');
  const toggle = document.querySelector('#all-pokemon-toggle');
  const typeList = document.querySelector('#type-list');
  const clearBtn = document.querySelector('#clear-filters');
  if (!section || !toggle || !typeList) return;

  // Trigger chính: bấm "All Pokémon" để mở/đóng cả khối lọc.
  toggle.addEventListener('click', () => {
    const open = section.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Đếm xem mỗi hệ đang có bao nhiêu Pokémon trong lưới.
  function countForType(type) {
    return featuredCache.filter(p => p && p.types.includes(type)).length;
  }

  typeList.innerHTML = Object.keys(typeColors).map(type => `
    <label class="type-row">
      <input type="checkbox" value="${type}">
      <span class="type-dot" style="background:${typeColors[type]}"></span>
      <span class="type-name">${capitalize(type)}</span>
      <span class="type-count" data-count="${type}">${countForType(type)}</span>
    </label>
  `).join('');

  typeList.querySelectorAll('input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', () => {
      if (box.checked) activeTypes.add(box.value);
      else activeTypes.delete(box.value);
      applyTypeFilter();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeTypes.clear();
      typeList.querySelectorAll('input[type="checkbox"]').forEach(b => { b.checked = false; });
      applyTypeFilter();
    });
  }
}

// Ẩn/hiện các ô vuông theo hệ đang được tích.
function applyTypeFilter() {
  const grid = document.querySelector('#featured-grid');
  if (!grid) return;

  let shown = 0;
  grid.querySelectorAll('.poke-card').forEach(card => {
    const types = (card.dataset.types || '').split(',');
    // Tích nhiều hệ = hiện Pokémon thuộc BẤT KỲ hệ nào trong số đó.
    const match = activeTypes.size === 0 || types.some(t => activeTypes.has(t));
    card.classList.toggle('card-hidden', !match);
    if (match) shown++;
  });

  const countEl = document.querySelector('#all-pokemon-count');
  if (countEl) countEl.textContent = shown;

  const filterCount = document.querySelector('#type-filter-count');
  if (filterCount) {
    filterCount.textContent = activeTypes.size;
    filterCount.classList.toggle('has-filters', activeTypes.size > 0);
  }

  const empty = document.querySelector('#grid-empty');
  if (empty) empty.classList.toggle('show', shown === 0);
}

/* ---------- 3) Lưới ô vuông Pokémon ---------- */
async function renderFeaturedGrid() {
  const grid = document.querySelector('#featured-grid');
  if (!grid) return;

  const results = await Promise.all(featuredNames.map(name => getPokemon(name)));
  featuredCache = results;

  grid.innerHTML = '';
  results.forEach((poke) => {
    if (!poke) return;
    const color = typeColors[poke.types[0]] || '#888';

    const card = document.createElement('a');
    card.href = `pokemon.html?name=${poke.name}`;
    card.className = 'poke-card';
    card.dataset.types = poke.types.join(',');
    card.style.setProperty('--type-color', color);
    card.innerHTML = `
      <div class="poke-card-top">
        <div>
          <h3 style="color:${color}">${poke.displayName.toUpperCase()}</h3>
          <span class="poke-card-dex">#${String(poke.id).padStart(3, '0')}</span>
        </div>
        <span class="poke-card-arrow">↗</span>
      </div>
      <div class="poke-card-media">
        <img src="${poke.officialArt}" alt="${poke.displayName}" loading="lazy">
      </div>
      <div class="poke-card-tags">
        <div class="type-badges">
          ${poke.types.map(t => `
            <span class="type-badge" style="background:${typeColors[t]}26; color:${typeColors[t]}">${t}</span>
          `).join('')}
        </div>
        <span class="rank-tag">ND</span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Bộ lọc phải được dựng SAU khi có dữ liệu, để đếm đúng số lượng mỗi hệ.
  renderTypeFilter();
  applyTypeFilter();
}

renderLeaderboard();
renderFeaturedGrid();
