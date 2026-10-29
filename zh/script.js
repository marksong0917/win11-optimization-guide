// Copy buttons on code blocks
document.querySelectorAll('.code').forEach((block) => {
  const btn = block.querySelector('.copy');
  const code = block.querySelector('code');
  if (!btn || !code) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.innerText.trim());
      btn.textContent = '已复制';
    } catch {
      btn.textContent = '请选中后按 Ctrl+C';
    }
    setTimeout(() => { btn.textContent = '复制'; }, 1600);
  });
});

// Checklist: persist in localStorage, show progress
const boxes = Array.from(document.querySelectorAll('.checklist input[type="checkbox"]'));
const progress = document.getElementById('progress');
const KEY = 'win11-minmax-checklist';

function loadState() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function render() {
  const state = loadState();
  let done = 0;
  boxes.forEach((box) => {
    box.checked = Boolean(state[box.dataset.k]);
    box.closest('li').classList.toggle('done', box.checked);
    if (box.checked) done += 1;
  });
  if (progress) progress.textContent = done + ' / ' + boxes.length + ' 已完成';
}
boxes.forEach((box) => {
  box.addEventListener('change', () => {
    const state = loadState();
    state[box.dataset.k] = box.checked;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ }
    render();
  });
});
render();

// Sidebar: highlight the section in view
const links = Array.from(document.querySelectorAll('.side-nav a'));
const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.remove('active'));
        const link = byId.get(e.target.id);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
}

// Scroll progress bar + back-to-top button
const scrollBar = document.querySelector('.scroll-progress');
const toTopBtn = document.getElementById('toTop');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY || 0;
  if (scrollBar) scrollBar.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
  if (toTopBtn) toTopBtn.classList.toggle('show', y > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if (toTopBtn) {
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}
