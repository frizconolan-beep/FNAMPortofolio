/* =====================================================
   Interaksi: render data, parallax, reveal, coverflow, jam
   ===================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- render skills ---------- */
$("#skills").innerHTML = SKILLS.map(g => `
  <div class="skill-card reveal">
    <h4>${g.title}</h4>
    <div class="chips">${g.items.map(i => `<span class="chip">${i}</span>`).join("")}</div>
  </div>`).join("");

/* ---------- render projects ---------- */
const hues = [[170, 190], [185, 160], [200, 170], [160, 195]];
$("#projectGrid").innerHTML = PROJECTS.map((p, i) => {
  const [a, b] = hues[i % hues.length];
  const bg = p.image
    ? `<img class="card__img" src="${p.image}" alt="${p.title}" loading="lazy">`
    : `<div class="card__ph" style="background:
         radial-gradient(circle at 25% 20%, hsl(${a} 80% 40% / .55), transparent 55%),
         radial-gradient(circle at 80% 85%, hsl(${b} 85% 35% / .5), transparent 55%), #071a1b;">
         <span style="font:900 7rem var(--font-display);color:rgba(255,255,255,.05)">${String(i + 1).padStart(2, "0")}</span></div>`;
  return `
  <article class="card reveal" data-tilt>
    ${bg}
    <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
    <div class="card__body">
      <div class="card__tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="card__links">
        <a href="${p.demo}" target="_blank" rel="noopener">View Case <svg><use href="#i-arrow"/></svg></a>
        <a class="ghost" href="${p.repo}" target="_blank" rel="noopener" aria-label="Source code"><svg><use href="#i-github"/></svg></a>
      </div>
    </div>
  </article>`;
}).join("");

/* ---------- render certificates ---------- */
const stage = $("#cfStage");
stage.innerHTML = CERTS.map((c, i) => `
  <div class="cert" data-i="${i}">
    <div class="cert__frame">
      ${c.image ? `<img src="${c.image}" alt="${c.title}" draggable="false">`
        : `<div class="cert__ph"><small>CERTIFICATE OF COMPLETION</small><strong>${c.title}</strong><span class="muted">${c.issuer}</span><i></i></div>`}
    </div>
    <div class="cert__cap"><b>${c.title}</b><span>${c.issuer} · ${c.year}</span></div>
  </div>`).join("");
$("#cfDots").innerHTML = CERTS.map((_, i) => `<button data-i="${i}" aria-label="Sertifikat ${i + 1}"></button>`).join("");

const certs = $$(".cert"), dots = $$("#cfDots button");
let active = Math.floor(CERTS.length / 2);
function layout() {
  const vw = innerWidth, step = vw < 700 ? 0.55 : 0.62;
  certs.forEach((el, i) => {
    const d = i - active, abs = Math.abs(d);
    const w = el.offsetWidth;
    el.style.transform = `translateX(${d * w * step}px) translateZ(${-abs * 160}px) rotateY(${d * -38}deg) scale(${d === 0 ? 1.08 : 1})`;
    el.style.opacity = abs > 2 ? 0 : 1 - abs * 0.3;
    el.style.filter = d === 0 ? "none" : `brightness(${1 - abs * 0.22}) blur(${abs * .6}px)`;
    el.style.zIndex = 10 - abs;
    el.style.pointerEvents = abs > 2 ? "none" : "auto";
    el.classList.toggle("active", d === 0);
  });
  dots.forEach((b, i) => b.classList.toggle("on", i === active));
}
const go = i => { active = (i + certs.length) % certs.length; layout(); };
$("#cfPrev").onclick = () => go(active - 1);
$("#cfNext").onclick = () => go(active + 1);
dots.forEach(b => b.onclick = () => go(+b.dataset.i));
certs.forEach(c => c.addEventListener("click", () => go(+c.dataset.i)));
addEventListener("resize", layout);
addEventListener("keydown", e => {
  const r = $("#certificates").getBoundingClientRect();
  if (r.top < innerHeight * .6 && r.bottom > innerHeight * .4) {
    if (e.key === "ArrowLeft") go(active - 1);
    if (e.key === "ArrowRight") go(active + 1);
  }
});
// drag / swipe
let sx = null;
stage.addEventListener("pointerdown", e => { sx = e.clientX; });
addEventListener("pointerup", e => {
  if (sx === null) return;
  const dx = e.clientX - sx; sx = null;
  if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
});
layout();
// autoplay pelan (berhenti saat hover)
let hover = false;
$("#coverflow").addEventListener("mouseenter", () => hover = true);
$("#coverflow").addEventListener("mouseleave", () => hover = false);
if (!reduceMotion) setInterval(() => { if (!hover && document.visibilityState === "visible") go(active + 1); }, 4500);

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .12 });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });

/* ---------- hero dots ---------- */
$("#dots").innerHTML = Array.from({ length: 28 }, () =>
  `<i style="left:${Math.random() * 100}%;top:${30 + Math.random() * 70}%;animation-duration:${5 + Math.random() * 7}s;animation-delay:${-Math.random() * 8}s"></i>`).join("");

/* ---------- scroll effects ---------- */
const nav = $("#nav"), prog = $("#progress"), toTop = $("#toTop"), photo = $("#heroPhoto");
const line1 = $("#line1"), line2 = $("#line2");
const links = $$(".nav__links a"), secs = links.map(a => $(a.getAttribute("href")));
let mx = 0, my = 0;
function onScroll() {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (y / h * 100) + "%";
  nav.classList.toggle("scrolled", y > 40);
  toTop.classList.toggle("show", y > 600);
  if (y < innerHeight * 1.2 && !reduceMotion) {
    line2.style.transform = `translate(${mx * -14}px, ${my * -8}px) translateX(${y * -0.35}px)`;
    line1.style.transform = `translate(${mx * 10}px, ${my * 6}px) translateX(${y * 0.18}px)`;
    photo.style.translate = `0 ${y * 0.12}px`;
  }
  const mid = y + innerHeight * .4;
  secs.forEach((s, i) => links[i].classList.toggle("active", s && s.offsetTop <= mid && s.offsetTop + s.offsetHeight > mid));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* ---------- mouse: parallax hero + glow + tilt ---------- */
const glow = $("#cursorGlow");
addEventListener("pointermove", e => {
  glow.style.opacity = 1; glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
  mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; onScroll();
});
$$("[data-tilt]").forEach(c => {
  c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transition = "border-color .4s, box-shadow .4s";
    c.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
  });
  c.addEventListener("pointerleave", () => { c.style.transition = "transform .6s, border-color .4s, box-shadow .4s"; c.style.transform = ""; });
});

/* ---------- mobile menu ---------- */
const burger = $("#burger"), navLinks = $("#navLinks");
burger.onclick = () => { burger.classList.toggle("open"); navLinks.classList.toggle("open"); };
links.forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); navLinks.classList.remove("open"); }));
toTop.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

/* ---------- jam lokal ---------- */
$("#tz").textContent = TZ_LABEL;
$("#year").textContent = new Date().getFullYear();
const fmt = new Intl.DateTimeFormat("id-ID", { timeZone: TIMEZONE, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
const tick = () => $("#clock").textContent = fmt.format(new Date()).replace(/\./g, ":");
tick(); setInterval(tick, 1000);
