/* ============================================================
   team.js — chỉ chạy trên pokemon.html.
   Vẽ hàng icon "Đội Hình Đề Xuất" + ô thông tin có thể đổi nội dung
   khi bấm vào từng icon. Nạp SAU data.js (cần teamData, getPokemon,
   getItemSprite).

   Cách hoạt động:
   - Đọc tên Pokémon từ URL (?name=...), giống detail.js.
   - Tra trong teamData xem Pokémon này có đội hình mẫu không.
   - Vẽ icon cho từng thành viên (lấy sprite qua getPokemon()).
   - Icon #1 (chính Pokémon đang xem) mặc định đang "active", ô thông
     tin hiện bài phân tích tổng quan về đội hình.
   - Bấm vào icon khác → đổi "active" + đổi nội dung ô thông tin thành
     "ô chi tiết" của thành viên đó (item/ability/nature/evs/moveset
     + bài phân tích riêng) — đúng yêu cầu "trigger khi bấm vào icon".
   ============================================================ */

async function renderTeamSection() {
  const params = new URLSearchParams(window.location.search);
  const name = (params.get('name') || '').toLowerCase();

  const iconsWrap = document.querySelector('#team-icons');
  const infoWrap = document.querySelector('#team-info');
  if (!iconsWrap || !infoWrap) return;

  const team = teamData[name];

  // Chưa có dữ liệu đội hình mẫu cho Pokémon này -> hiện thông báo rõ ràng,
  // KHÔNG để trống trơn trông như lỗi.
  if (!team) {
    iconsWrap.innerHTML = '';
    infoWrap.innerHTML = `
      <p class="team-empty">
        Đội hình đề xuất cho Pokémon này chưa có trong dữ liệu mẫu.
        Hãy thêm một mục mới vào <code>teamData</code> trong <code>data.js</code>
        (xem cấu trúc mẫu của <code>nidoking</code>) để bổ sung.
      </p>`;
    return;
  }

  // Lấy sprite cho từng thành viên trong đội hình (song song).
  const members = await Promise.all(
    team.members.map(async (m) => {
      const poke = await getPokemon(m.name);
      return {
        ...m,
        sprite: poke ? poke.sprite : '',
        displayName: poke ? poke.displayName : m.name
      };
    })
  );

  iconsWrap.innerHTML = members
    .map(
      (m, i) => `
      <button class="team-icon${i === 0 ? ' active' : ''}" type="button" data-index="${i}" aria-label="${m.displayName}">
        <img src="${m.sprite}" alt="${m.displayName}" loading="lazy">
      </button>`
    )
    .join('');

  async function showMember(index) {
    const m = members[index];

    // Cập nhật icon nào đang được chọn.
    iconsWrap.querySelectorAll('.team-icon').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });

    // Icon đầu tiên = chính Pokémon đang xem -> hiện bài phân tích tổng quan.
    if (m.isAnchor) {
      infoWrap.innerHTML = `<p class="team-overview">${team.overview}</p>`;
      return;
    }

    // Các icon còn lại -> hiện "ô chi tiết": tên + item + ability + nature
    // + EVs + 4 ô moveset + bài phân tích riêng.
    infoWrap.innerHTML = `
      <div class="set-header">
        <img class="set-icon" src="${m.sprite}" alt="">
        <h3>${m.displayName} — Chi Tiết Bộ Set</h3>
      </div>
      <div class="set-grid">
        <div>
          <span class="mini-label">ITEM</span>
          <div class="set-item"><img class="item-icon" alt=""><span>${m.item}</span></div>
        </div>
        <div><span class="mini-label">ABILITY</span><strong>${m.ability}</strong></div>
        <div><span class="mini-label">NATURE</span><strong>${m.nature}</strong></div>
        <div><span class="mini-label">EVS</span><strong>${m.evs}</strong></div>
      </div>
      <div class="moveset-grid">
        ${m.moves.map((mv) => `<div class="move-box">${mv}</div>`).join('')}
      </div>
      <p class="set-analysis">${m.analysis}</p>
    `;

    // Nạp icon vật phẩm riêng (không chặn phần còn lại hiển thị).
    const itemImg = infoWrap.querySelector('.item-icon');
    const sprite = await getItemSprite(m.item);
    if (sprite && itemImg) itemImg.src = sprite;
  }

  iconsWrap.querySelectorAll('.team-icon').forEach((btn) => {
    btn.addEventListener('click', () => showMember(Number(btn.dataset.index)));
  });

  showMember(0);
}

renderTeamSection();
