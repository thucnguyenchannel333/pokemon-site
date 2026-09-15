/* ============================================================
   team.js — chỉ chạy trên pokemon.html.
   Vẽ khối "Top Meta Teams" bên phải, gồm:
     - Tiêu đề đội hình + người đăng + nút Pokepaste (nếu có)
     - Hàng 6 icon Pokémon (bấm để đổi)
     - Ô Analysis bên dưới tự đổi nội dung theo icon đang chọn:
         · icon anchor  → bài phân tích tổng quan về đội hình
         · icon khác    → ITEM / ABILITY / NATURE / EVS / MOVESET + phân tích riêng
   Tên Pokémon trong mọi bài phân tích được thay bằng ICON (withPokemonIcons).
   Nạp SAU data.js.
   ============================================================ */

async function renderTeamSection() {
  const params = new URLSearchParams(window.location.search);
  const name = (params.get('name') || '').toLowerCase();

  const wrap = document.querySelector('#team-wrap');
  if (!wrap) return;

  // getTeamFor() nhận key viết hoa hay thường đều được, và tự gộp mục anchor.
  const team = getTeamFor(name);

  if (!team || !team.members || team.members.length === 0) {
    wrap.innerHTML = `
      <div class="panel team-panel">
        <p class="team-empty">
          Chưa có đội hình mẫu cho Pokémon này. Thêm một mục mới vào
          <code>teamData</code> trong <code>data.js</code> — có thể dán thẳng
          nội dung từ pokepast.es qua trường <code>paste</code>.
        </p>
      </div>`;
    return;
  }

  // Lấy ảnh cho từng thành viên (gọi song song cho nhanh).
  const members = await Promise.all(
    team.members.map(async (m) => {
      const poke = await getPokemon(m.name);
      return {
        ...m,
        // Luôn ưu tiên TÊN BẠN VIẾT để hiển thị — kể cả khi getPokemon() phải
        // mượn dữ liệu của Pokémon khác làm ảnh đại diện (ví dụ Mega-Slowbro
        // mượn ảnh Slowbro), tên hiển thị vẫn đúng như bạn gõ, không bị API
        // ghi đè.
        displayName: m.name,
        sprite: poke ? poke.sprite : '',
        resolvedName: poke ? poke.name : m.name // tên THẬT trên PokeAPI — dùng để tra chuỗi ảnh dự phòng
      };
    })
  );

  const startIndex = Math.max(0, members.findIndex(m => m.isAnchor));

  wrap.innerHTML = `
    <div class="panel team-panel">
      <div class="team-head">
        <div>
          <h3 class="team-title">${escapeHtml(team.title || 'Đội Hình Đề Xuất')}</h3>
          <p class="team-author">Posted by ${escapeHtml(team.author || 'ThucNguyen')}</p>
        </div>
        <span class="lang-badge">VN</span>
      </div>

      <div id="team-icons" class="team-icons">
        ${members.map((m, i) => `
          <button class="team-icon${i === startIndex ? ' active' : ''}" type="button"
                  data-index="${i}" aria-label="${escapeHtml(m.displayName)}">
            <img src="${m.sprite}" alt="${escapeHtml(m.displayName)}" loading="lazy" data-poke-name="${m.resolvedName}" onerror="onArtError(this)">
          </button>`).join('')}
      </div>

      <div id="team-info" class="team-info"></div>

      ${team.pokepasteUrl ? `
        <div class="team-foot">
          <a class="pokepaste-link" href="${escapeHtml(team.pokepasteUrl)}" target="_blank" rel="noopener">
            📄 Xem trên Pokepaste
          </a>
        </div>` : ''}
    </div>
  `;

  const iconsWrap = wrap.querySelector('#team-icons');
  const infoWrap = wrap.querySelector('#team-info');

  async function showMember(index) {
    const m = members[index];

    iconsWrap.querySelectorAll('.team-icon').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    // Không có bộ set chi tiết → chỉ hiện phần tổng quan của đội hình.
    if (!m.moves || m.moves.length === 0) {
      infoWrap.innerHTML = `
        <div class="analysis-block">
          <h4 class="analysis-heading">📈 Analysis</h4>
          <p>${withPokemonIcons(team.overview || '')}</p>
        </div>`;
      await hydratePokemonIcons(infoWrap);
      return;
    }

    infoWrap.innerHTML = `
      <div class="set-block">
        <div class="set-header">
          <img class="set-icon" src="${m.sprite}" alt="" data-poke-name="${m.resolvedName}" onerror="onArtError(this)">
          <h4>${escapeHtml(m.displayName)} Details</h4>
        </div>

        <div class="set-grid">
          <div>
            <span class="mini-label">ITEM</span>
            <div class="set-item">
              <img class="item-icon" alt="">
              <span>${escapeHtml(m.item || '—')}</span>
            </div>
          </div>
          <div><span class="mini-label">ABILITY</span><strong>${escapeHtml(m.ability || '—')}</strong></div>
          <div><span class="mini-label">NATURE</span><strong>${escapeHtml(m.nature || '—')}</strong></div>
          <div><span class="mini-label">EVS</span><strong>${escapeHtml(m.evs || '—')}</strong></div>
        </div>

        <span class="mini-label">MOVESET</span>
        <div class="moveset-grid">
          ${m.moves.map(mv => `<div class="move-box">${escapeHtml(mv)}</div>`).join('')}
        </div>
      </div>

      <div class="analysis-block">
        <h4 class="analysis-heading">📈 Analysis</h4>
        <p>${withPokemonIcons(m.analysis || 'Chưa có bài phân tích cho Pokémon này trong đội hình.')}</p>
      </div>
    `;

    await hydratePokemonIcons(infoWrap);

    // Nạp icon vật phẩm (không chặn phần còn lại hiển thị).
    if (m.item) {
      const itemImg = infoWrap.querySelector('.item-icon');
      const sprite = await getItemSprite(m.item);
      if (sprite && itemImg) itemImg.src = sprite;
      else if (itemImg) itemImg.remove();
    } else {
      const itemImg = infoWrap.querySelector('.item-icon');
      if (itemImg) itemImg.remove();
    }
  }

  iconsWrap.querySelectorAll('.team-icon').forEach((btn) => {
    btn.addEventListener('click', () => showMember(Number(btn.dataset.index)));
  });

  showMember(startIndex);
}

renderTeamSection();
