/* ============================================================
   auth.js — dùng cho cả login.html và signup.html.

   QUAN TRỌNG: đây CHỈ LÀ giao diện minh hoạ. Vì trang web này
   chạy hoàn toàn trên trình duyệt (không có máy chủ/database),
   nên form KHÔNG thể thật sự tạo hay kiểm tra tài khoản. Muốn
   đăng nhập/đăng ký thật, bạn cần thêm một phần backend (ví dụ
   PHP + MySQL, hoặc Node.js, hoặc Firebase Authentication).
   ============================================================ */

const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.querySelector('#auth-message');
    msg.classList.remove('error');
    msg.textContent = 'Đây là giao diện minh hoạ — chưa kết nối máy chủ thật nên chưa thể đăng nhập. Để lưu tài khoản thật, bạn cần xây dựng thêm phần backend (ví dụ PHP + cơ sở dữ liệu).';
    msg.classList.add('show');
  });
}

const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.querySelector('#signup-password').value;
    const confirmPassword = document.querySelector('#signup-confirm').value;
    const msg = document.querySelector('#auth-message');

    if (password !== confirmPassword) {
      msg.classList.add('error');
      msg.textContent = 'Mật khẩu nhập lại không khớp. Vui lòng kiểm tra lại.';
      msg.classList.add('show');
      return;
    }

    msg.classList.remove('error');
    msg.textContent = 'Đây là giao diện minh hoạ — chưa kết nối máy chủ thật nên chưa thể tạo tài khoản. Để lưu tài khoản thật, bạn cần xây dựng thêm phần backend (ví dụ PHP + cơ sở dữ liệu).';
    msg.classList.add('show');
  });
}
