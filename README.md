<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Đăng nhập - VTshop</title>
  <link rel="stylesheet" href="login.css">
  <script src="login.js"></script>
</head>
<body>
  <header>
    <h1>Đăng nhập</h1>
  </header>
  <main>
    <!-- Form Đăng nhập -->
    <form class="login-form" id="login-form" onsubmit="login(); return false;">
      <input type="text" id="username" placeholder="Tên đăng nhập" required>
      <input type="password" id="password" placeholder="Mật khẩu" required>
      <button type="submit">Đăng nhập</button>
      <div class="link">
        <a href="#" onclick="showRegisterForm();return false;">Chưa có tài khoản? Đăng ký</a>
      </div>
    </form>
    <!-- Form Đăng ký -->
    <form class="login-form" id="register-form" style="display:none;" onsubmit="register(); return false;">
      <input type="text" id="reg-username" placeholder="Tên đăng nhập" required>
      <input type="password" id="reg-password" placeholder="Mật khẩu" required>
      <input type="password" id="reg-passwordCF" placeholder="Nhập lại mật khẩu" required>
      <button type="submit">Đăng ký</button>
      <div class="link">
        <a href="#" onclick="showLoginForm();return false;">Đã có tài khoản? Đăng nhập</a>
      </div>
    </form>
  </main>
  <script>
    function showRegisterForm() {
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('register-form').style.display = 'flex';
    }
    function showLoginForm() {
      document.getElementById('login-form').style.display = 'flex';
      document.getElementById('register-form').style.display = 'none';
    }
  </script>
</body>
</html>
