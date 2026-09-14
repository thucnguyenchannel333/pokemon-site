/* ============================================================
   header-search.js
   Ô tìm kiếm ở góc phải trên cùng — dùng chung cho index.html và
   pokemon.html (nạp SAU data.js).

   Gõ ký tự đầu hoặc tên Pokémon → hiện danh sách gợi ý ngay bên dưới.
   Bấm vào một kết quả → chuyển sang pokemon.html?name=<tên>.

   Nguồn tìm kiếm = gộp cả 3 danh sách trong data.js (bảng xếp hạng,
   lưới ô vuông, và các Pokémon xuất hiện trong đội hình), nên tìm được
   nhiều hơn hẳn so với chỉ tìm trong bảng xếp hạng.
   ============================================================ */

function buildSearchIndex() {
  const map = new Map(); // key = tên PokeAPI, value = tên hiển thị

  leaderboardData.forEach(e => map.set(e.name, e.label || capitalize(e.name)));
  (typeof featuredNames !== 'undefined' ? featuredNames : [])
    .forEach(n => { if (!map.has(n)) map.set(n, capitalize(n)); });

  Object.keys(teamData).forEach(k => {
    const t = normalizeTeam(teamData[k]);
    (t.members || []).forEach(m => {
      const slug = String(m.name || '').toLowerCase().replace(/\s+/g, '-');
      if (slug && !map.has(slug)) map.set(slug, m.name);
    });
  });

  return Array.from(map, ([name, label]) => ({ name, label }));
}

function initHeaderSearch() {
  const input = document.querySelector('#site-search');
  const dropdown = document.querySelector('#search-dropdown');
  if (!input || !dropdown) return;

  const index = buildSearchIndex();

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      dropdown.classList.remove('open');
      dropdown.innerHTML = '';
      return;
    }

    // Ưu tiên kết quả BẮT ĐẦU bằng ký tự đã gõ, rồi mới tới khớp giữa chuỗi.
    const starts = index.filter(e => e.name.startsWith(query));
    const contains = index.filter(e => !e.name.startsWith(query) && e.name.includes(query));
    const matches = starts.concat(contains).slice(0, 7);

    if (matches.length === 0) {
      dropdown.innerHTML = '<div class="search-empty">Không tìm thấy Pokémon phù hợp</div>';
      dropdown.classList.add('open');
      return;
    }

    dropdown.innerHTML = matches.map(m => `
      <a class="search-item" href="pokemon.html?name=${m.name}">
        <img class="search-icon" data-name="${m.name}" alt="">
        <span>${escapeHtml(m.label)}</span>
      </a>
    `).join('');
    dropdown.classList.add('open');

    // Chỉ nạp icon cho những kết quả đang hiển thị.
    matches.forEach(async (m) => {
      const poke = await getPokemon(m.name);
      const img = dropdown.querySelector(`img[data-name="${m.name}"]`);
      if (poke && img) img.src = poke.sprite;
    });
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('open');
      input.blur();
    }
  });

  // Đóng dropdown khi bấm ra ngoài khu vực tìm kiếm.
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) dropdown.classList.remove('open');
  });
}

initHeaderSearch();
