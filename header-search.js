/* ============================================================
   header-search.js
   Xử lý ô tìm kiếm ở góc phải trên cùng — dùng chung cho
   index.html và pokemon.html (nạp SAU data.js).

   Cách hoạt động: mỗi lần người dùng gõ, lọc trong danh sách
   leaderboardNames (50 tên) theo ký tự đã gõ, hiện tối đa 6 kết
   quả trong dropdown. Bấm vào 1 kết quả sẽ chuyển sang
   pokemon.html?name=<tên> — đúng yêu cầu "chuyển sang trang phụ
   của chính cá thể đó".
   ============================================================ */

function initHeaderSearch() {
  const input = document.querySelector('#site-search');
  const dropdown = document.querySelector('#search-dropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      dropdown.classList.remove('open');
      dropdown.innerHTML = '';
      return;
    }

    const matches = leaderboardData
      .filter(entry => entry.name.includes(query))
      .slice(0, 6);

    if (matches.length === 0) {
      dropdown.innerHTML = '<div class="search-empty">Không tìm thấy Pokémon phù hợp</div>';
      dropdown.classList.add('open');
      return;
    }

    dropdown.innerHTML = matches
      .map(m => `
        <a class="search-item" href="pokemon.html?name=${m.name}">
          <img class="search-icon" data-name="${m.name}" alt="">
          <span>${capitalize(m.name)}</span>
        </a>
      `)
      .join('');
    dropdown.classList.add('open');

    // Nạp icon riêng cho từng kết quả đang hiển thị (không nạp trước cho cả 50).
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
    if (!e.target.closest('.search-wrap')) {
      dropdown.classList.remove('open');
    }
  });
}

initHeaderSearch();
