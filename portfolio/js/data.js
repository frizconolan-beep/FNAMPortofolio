/* =====================================================
   DATA KONTEN — edit di sini, tidak perlu sentuh HTML
   ===================================================== */

// Zona waktu untuk jam di bagian Contact (contoh: "Asia/Makassar", "Asia/Makassar", "Asia/Jayapura")
const TIMEZONE = "Asia/Makassar";
const TZ_LABEL = "WITA";

// ---------- SKILLS ----------
const SKILLS = [
  { title: "Software Engineer", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "Laravel", "PHP", "Node.js", "Flutter", "MySQL"] },
  { title: "Tools & Server",    items: ["Git", "GitHub", "VS Code", "Docker", "Linux", "Postman"] },
  { title: "Soft Skills",       items: ["Problem Solving", "Teamwork", "Fast Learner"] },
];

// ---------- PROJECTS ----------
// image: path gambar (mis. "assets/project1.jpg"). Kosongkan "" untuk pakai gradasi otomatis.
const PROJECTS = [
  { title: "Donate Platform",   desc: "Platform donasi online dengan dashboard admin dan pembayaran terintegrasi.", tags: ["Next.js", "Laravel", "MySQL"], image: "", demo: "#", repo: "#" },
  { title: "E-Commerce System", desc: "Sistem toko online lengkap: katalog, keranjang, checkout, dan manajemen pesanan.", tags: ["React", "Laravel", "Tailwind"], image: "", demo: "#", repo: "#" },
  { title: "Task Management",   desc: "Aplikasi manajemen tugas tim dengan papan kanban dan statistik progres.", tags: ["React", "Node.js"], image: "", demo: "#", repo: "#" },
  { title: "School Website",    desc: "Website profil sekolah dengan berita, galeri, dan informasi PPDB.", tags: ["PHP", "Bootstrap"], image: "", demo: "#", repo: "#" },
];

// ---------- CERTIFICATES ----------
// image: path gambar sertifikat. Kosongkan "" untuk kartu placeholder.
const CERTS = [
  { title: "Belajar Dasar AI",               year: "2024", issuer: "Dicoding Indonesia", image: "" },
  { title: "Android App untuk Pemula",       year: "2024", issuer: "Dicoding Indonesia", image: "" },
  { title: "Belajar Dasar Pemrograman JS",   year: "2024", issuer: "Dicoding Indonesia", image: "" },
  { title: "Full-Stack Development SQL",     year: "2025", issuer: "Online Course",      image: "" },
  { title: "Getting Started with ReactJS",   year: "2025", issuer: "Dicoding Indonesia", image: "" },
  { title: "JavaScript Essentials 1",        year: "2025", issuer: "Cisco Networking",   image: "" },
  { title: "JavaScript Essentials 2",        year: "2025", issuer: "Cisco Networking",   image: "" },
];
