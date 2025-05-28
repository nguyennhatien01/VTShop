async function getAccounts() {
  // Lấy tài khoản từ localStorage (nếu có)
  let localAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // Lấy tài khoản từ account.json
  let jsonAccounts = [];
  try {
    const res = await fetch('account.json');
    jsonAccounts = await res.json();
  } catch (e) {
    jsonAccounts = [];
  }

  // Gộp, ưu tiên localStorage nếu trùng username
  const all = [...jsonAccounts];
  localAccounts.forEach(acc => {
    const idx = all.findIndex(a => a.username === acc.username);
    if (idx >= 0) {
      all[idx] = acc;
    } else {
      all.push(acc);
    }
  });
  return all;
}

// Ví dụ dùng trong login:
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const accounts = await getAccounts();
  const user = accounts.find(acc => acc.username === username && acc.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Đăng nhập thành công!");
    if (user.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "web.html";
    }
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
    document.getElementById("password").value = "";
  }
}

function register() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value.trim();
  const passwordCF = document.getElementById("reg-passwordCF").value.trim();

  if (!username || !password || !passwordCF) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (password !== passwordCF) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  let accounts = JSON.parse(localStorage.getItem("accounts")) || [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" }
  ];

  if (accounts.find(acc => acc.username === username)) {
    alert("Tên đăng nhập đã tồn tại!");
    return;
  }

  accounts.push({ username, password, role: "user" });
  localStorage.setItem("accounts", JSON.stringify(accounts));
  alert("Đăng ký thành công! Bạn có thể đăng nhập.");

  // Reset form và chuyển về form đăng nhập
  document.getElementById("reg-username").value = "";
  document.getElementById("reg-password").value = "";
  document.getElementById("reg-passwordCF").value = "";
  document.querySelector('.login-form').style.display = 'flex';
  document.getElementById('register-form').style.display = 'none';
}

// Đăng xuất (có thể dùng ở các trang khác)
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}