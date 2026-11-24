// 1. Efek Spotlight Kursor pada Glass Cards
function initSpotlightCards() {
  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });
}

// 2. Animasi Reveal saat Scroll
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => obs.observe(el));
}

// 3. Render Daftar Informasi di Halaman Utama (index.html)
let kategoriAktif = "Semua";

function filterKategori(kategori, btnEl) {
  kategoriAktif = kategori;
  document.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
  renderDaftarInformasi();
}

function renderDaftarInformasi() {
  const container = document.getElementById("daftar-informasi");
  if (!container) return;

  const keyword = (document.getElementById("search-info")?.value || "").toLowerCase().trim();

  const dataTampil = DATA_INFORMASI.filter((item) => {
    const cocokKategori = kategoriAktif === "Semua" || item.kategori === kategoriAktif;
    const cocokCari =
      item.judul.toLowerCase().includes(keyword) ||
      item.ringkasan.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword);
    return cocokKategori && cocokCari;
  });

  if (dataTampil.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="glass-card p-5 text-center">
          <i class="bi bi-search fs-2 text-slate mb-2 d-block"></i>
          <h5 class="fw-bold">Informasi tidak ditemukan</h5>
          <p class="text-slate small mb-0">Coba kata kunci atau kategori lain.</p>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = dataTampil
    .map(
      (item) => `
      <div class="col-md-6 col-lg-3">
        <div class="glass-card h-100 d-flex flex-column">
          <div class="overflow-hidden">
            <img src="${item.gambar}" class="info-card-img" alt="${item.judul}"
                 onerror="this.src='https://placehold.co/800x500/0F172A/60A5FA?text=NusaCyber+Tech'">
          </div>
          <div class="p-4 d-flex flex-column flex-grow-1">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="pill-badge" style="font-size:0.72rem; padding:4px 10px;">${item.kategori}</span>
              <small class="text-slate" style="font-size:0.75rem;">#${item.id}</small>
            </div>
            <small class="text-slate mb-2"><i class="bi bi-calendar3 me-1"></i>${item.tanggal}</small>
            <h6 class="fw-bold mb-2 lh-base">${item.judul}</h6>
            <p class="text-slate small flex-grow-1 mb-3">${item.ringkasan}</p>
            <a href="detail.html?id=${item.id}" class="btn btn-exec-glass btn-sm rounded-pill py-2 w-100">
              Baca Detail <i class="bi bi-arrow-up-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  initSpotlightCards();
}

// 4. Render Halaman Detail Informasi (detail.html)
function renderDetailInformasi() {
  const detailContainer = document.getElementById("detail-container");
  if (!detailContainer) return;

  // Progress bar membaca
  window.addEventListener("scroll", () => {
    const bar = document.getElementById("reading-progress");
    if (!bar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = `${pct}%`;
  });

  const params = new URLSearchParams(window.location.search);
  const idDipilih = parseInt(params.get("id")) || 1;
  const info = DATA_INFORMASI.find((item) => item.id === idDipilih);

  if (!info) {
    detailContainer.innerHTML = `
      <div class="glass-card p-5 text-center">
        <h4 class="fw-bold mb-2">Informasi Tidak Ditemukan</h4>
        <p class="text-slate mb-4">Silakan pilih informasi melalui Halaman Utama.</p>
        <a href="index.html" class="btn btn-exec-primary rounded-pill px-4">Kembali ke Beranda</a>
      </div>`;
    return;
  }

  const paragrafHtml = info.isi_lengkap
    .split("\n\n")
    .map((p) => `<p class="text-slate fs-6 lh-lg mb-3">${p}</p>`)
    .join("");

  detailContainer.innerHTML = `
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb small mb-0">
        <li class="breadcrumb-item"><a href="index.html" class="text-decoration-none text-info">Beranda</a></li>
        <li class="breadcrumb-item"><a href="index.html#informasi" class="text-decoration-none text-slate">Informasi</a></li>
        <li class="breadcrumb-item active text-white">${info.kategori}</li>
      </ol>
    </nav>

    <article class="glass-card p-4 p-md-5">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <span class="pill-badge"><span class="status-dot"></span> ${info.kategori}</span>
        <button onclick="salinTautan(this)" class="btn btn-exec-glass btn-sm rounded-pill px-3">
          <i class="bi bi-link-45deg me-1"></i>Salin Tautan
        </button>
      </div>
      <h1 class="fw-bold fs-2 mb-3">${info.judul}</h1>
      <div class="d-flex flex-wrap gap-3 text-slate small mb-4 pb-3 border-bottom border-secondary border-opacity-25">
        <span><i class="bi bi-person-badge me-1 text-info"></i>${info.penulis}</span>
        <span><i class="bi bi-calendar-event me-1 text-info"></i>${info.tanggal}</span>
        <span><i class="bi bi-database me-1 text-info"></i>Record ID: #${info.id}</span>
      </div>
      <img src="${info.gambar}" alt="${info.judul}" class="detail-hero-img mb-4"
           onerror="this.src='https://placehold.co/1000x500/0F172A/60A5FA?text=NusaCyber+Detail'">
      ${paragrafHtml}
      <hr class="border-secondary border-opacity-25 my-4">
      <a href="index.html#informasi" class="btn btn-exec-glass rounded-pill px-4">
        <i class="bi bi-arrow-left me-2"></i>Kembali ke Kumpulan Informasi
      </a>
    </article>
  `;

  const lainnyaContainer = document.getElementById("informasi-lainnya");
  if (lainnyaContainer) {
    lainnyaContainer.innerHTML = DATA_INFORMASI.filter((i) => i.id !== info.id)
      .map(
        (item) => `
        <a href="detail.html?id=${item.id}" class="d-block text-decoration-none p-3 border-bottom border-secondary border-opacity-25">
          <span class="badge bg-primary bg-opacity-25 text-info mb-1">${item.kategori}</span>
          <h6 class="fw-semibold text-white mb-1 small">${item.judul}</h6>
          <small class="text-slate" style="font-size:0.75rem;">${item.tanggal}</small>
        </a>`
      )
      .join("");
  }
}

function salinTautan(btn) {
  navigator.clipboard?.writeText(window.location.href);
  btn.innerHTML = `<i class="bi bi-check2 me-1 text-success"></i>Tersalin!`;
  setTimeout(() => {
    btn.innerHTML = `<i class="bi bi-link-45deg me-1"></i>Salin Tautan`;
  }, 1800);
}

// 5. Toggle Lihat Password & Quick Fill Demo
function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (input.type === "password") {
    input.type = "text";
    icon.className = "bi bi-eye-slash";
  } else {
    input.type = "password";
    icon.className = "bi bi-eye";
  }
}

function isiAkunDemo() {
  document.getElementById("login-username").value = "ahmad";
  document.getElementById("login-password").value = "24552011297";
}

// 6. Validasi Login dengan Struktur Percabangan IF (login.html)
function validasiLogin(event) {
  event.preventDefault();

  const inputUser = document.getElementById("login-username").value.trim();
  const inputPass = document.getElementById("login-password").value.trim();
  const pesanBox = document.getElementById("pesan-login");

  const akunDefaultUser = "ahmad";
  const akunDefaultPass = "24552011297";
  const akunTersimpan = JSON.parse(localStorage.getItem("akunTerdaftar"));

  if (inputUser === "" || inputPass === "") {
    pesanBox.innerHTML = `<div class="alert alert-warning bg-warning bg-opacity-10 border-warning border-opacity-25 text-warning small py-2"><i class="bi bi-exclamation-triangle me-2"></i>Username dan Password wajib diisi!</div>`;
    return false;
  } else if (inputUser === akunDefaultUser && inputPass === akunDefaultPass) {
    localStorage.setItem(
      "userLogin",
      JSON.stringify({ nama: "Ahmad Kurnia", username: inputUser, role: "System Administrator" })
    );
    pesanBox.innerHTML = `<div class="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success small py-2"><i class="bi bi-shield-check me-2"></i>Autentikasi berhasil! Mengalihkan ke Menu Utama...</div>`;
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 900);
    return true;
  } else if (
    akunTersimpan &&
    (inputUser === akunTersimpan.username || inputUser === akunTersimpan.email) &&
    inputPass === akunTersimpan.password
  ) {
    localStorage.setItem(
      "userLogin",
      JSON.stringify({ nama: akunTersimpan.nama, username: akunTersimpan.username, role: "Enterprise Member" })
    );
    pesanBox.innerHTML = `<div class="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success small py-2"><i class="bi bi-shield-check me-2"></i>Autentikasi berhasil! Mengalihkan ke Menu Utama...</div>`;
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 900);
    return true;
  } else {
    pesanBox.innerHTML = `<div class="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger small py-2"><i class="bi bi-x-octagon me-2"></i>Kredensial salah! Gunakan <b>ahmad</b> / <b>24552011297</b>.</div>`;
    return false;
  }
}

// 7. Validasi Registrasi (register.html)
function cekKekuatanPassword() {
  const val = document.getElementById("reg-password")?.value || "";
  const bar = document.getElementById("strength-bar");
  const label = document.getElementById("strength-label");
  if (!bar || !label) return;

  if (val.length === 0) {
    bar.style.width = "0%";
    label.textContent = "";
  } else if (val.length < 6) {
    bar.style.width = "33%";
    bar.className = "progress-bar bg-danger";
    label.textContent = "Lemah (min. 6 karakter)";
  } else if (val.length < 10) {
    bar.style.width = "68%";
    bar.className = "progress-bar bg-warning";
    label.textContent = "Sedang";
  } else {
    bar.style.width = "100%";
    bar.className = "progress-bar bg-success";
    label.textContent = "Kuat (Enterprise Ready)";
  }
}

function prosesRegistrasi(event) {
  event.preventDefault();

  const nama = document.getElementById("reg-nama").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const konfirmasi = document.getElementById("reg-konfirmasi").value;
  const pesanBox = document.getElementById("pesan-register");

  if (nama === "" || email === "" || username === "" || password === "") {
    pesanBox.innerHTML = `<div class="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger small py-2">Semua kolom wajib diisi!</div>`;
    return false;
  } else if (password.length < 6) {
    pesanBox.innerHTML = `<div class="alert alert-warning bg-warning bg-opacity-10 border-warning border-opacity-25 text-warning small py-2">Password minimal 6 karakter!</div>`;
    return false;
  } else if (password !== konfirmasi) {
    pesanBox.innerHTML = `<div class="alert alert-danger bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger small py-2">Konfirmasi password tidak cocok!</div>`;
    return false;
  } else {
    localStorage.setItem("akunTerdaftar", JSON.stringify({ nama, email, username, password }));
    pesanBox.innerHTML = `<div class="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success small py-2"><i class="bi bi-check-circle me-2"></i>Akun berhasil dibuat! Mengalihkan ke halaman Login...</div>`;
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1100);
    return true;
  }
}

// 8. Dashboard Menu Utama (dashboard.html)
function renderTabelDashboard(keyword = "") {
  const tabelBody = document.getElementById("tabel-dashboard-info");
  if (!tabelBody) return;

  const q = keyword.toLowerCase().trim();
  const hasil = DATA_INFORMASI.filter(
    (item) =>
      item.judul.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q) ||
      item.penulis.toLowerCase().includes(q)
  );

  tabelBody.innerHTML = hasil
    .map(
      (item) => `
      <tr>
        <td class="fw-bold text-info">#${item.id}</td>
        <td class="fw-semibold">${item.judul}</td>
        <td><span class="pill-badge" style="font-size:0.72rem; padding:4px 10px;">${item.kategori}</span></td>
        <td class="text-slate small">${item.tanggal}</td>
        <td class="text-slate small">${item.penulis}</td>
        <td>
          <a href="detail.html?id=${item.id}" class="btn btn-exec-glass btn-sm rounded-pill px-3">
            <i class="bi bi-eye me-1"></i>Lihat
          </a>
        </td>
      </tr>`
    )
    .join("");
}

function initDashboard() {
  if (!document.getElementById("tabel-dashboard-info")) return;

  const sessionUser = JSON.parse(localStorage.getItem("userLogin"));
  if (!sessionUser) {
    alert("Sesi belum aktif. Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("user-nama").textContent = sessionUser.nama;
  document.getElementById("user-role").textContent = sessionUser.role;
  document.getElementById("total-info").textContent = DATA_INFORMASI.length;
  renderTabelDashboard();
}

function logoutUser() {
  localStorage.removeItem("userLogin");
  window.location.href = "login.html";
}

// 9. Form Modal Konsultasi
function kirimKonsultasi(event) {
  event.preventDefault();
  document.getElementById("pesan-konsultasi").innerHTML = `
    <div class="alert alert-success bg-success bg-opacity-10 border-success border-opacity-25 text-success small py-2">
      <i class="bi bi-check-circle-fill me-2"></i>Permintaan jadwal konsultasi diterima! Tim Engineering NusaCyber akan menghubungi Anda.
    </div>`;
  event.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  renderDaftarInformasi();
  renderDetailInformasi();
  initDashboard();
  initSpotlightCards();
  initScrollReveal();
});