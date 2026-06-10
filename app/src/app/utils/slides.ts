import { PortfolioState } from '../types';

function esc(s: any): string {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c] || c));
}

function tagColor(name: string, isDark: boolean) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    { bg: '#FFEBEE', fg: '#C62828', bgDark: '#3E2723', fgDark: '#FFCCBC' },
    { bg: '#E3F2FD', fg: '#1565C0', bgDark: '#1A237E', fgDark: '#9FA8DA' },
    { bg: '#E8F5E9', fg: '#2E7D32', bgDark: '#1B5E20', fgDark: '#A5D6A7' },
    { bg: '#FFF3E0', fg: '#EF6C00', bgDark: '#E65100', fgDark: '#FFCC80' },
    { bg: '#F3E5F5', fg: '#6A1B9A', bgDark: '#4A148C', fgDark: '#E1BEE7' },
    { bg: '#E0F7FA', fg: '#00838F', bgDark: '#006064', fgDark: '#80DEEA' }
  ];
  const c = colors[Math.abs(hash) % colors.length];
  return {
    bg: isDark ? c.bgDark : c.bg,
    fg: isDark ? c.fgDark : c.fg
  };
}

function coverBg(st: PortfolioState): string {
  if (st.theme.solidColor) return st.theme.solidColor;
  if (st.theme.gradientCustom) return st.theme.gradientCustom;
  const gradientMap: Record<string, string> = {
    graphite: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
    ocean: 'linear-gradient(135deg, #1b3a4b 0%, #2e6f40 100%)',
    sunset: 'linear-gradient(135deg, #b25329 0%, #e58e26 100%)',
    forest: 'linear-gradient(135deg, #1e3f20 0%, #111e12 100%)',
    lavender: 'linear-gradient(135deg, #4b3b63 0%, #231932 100%)',
    berry: 'linear-gradient(135deg, #6c2343 0%, #2d0f1a 100%)',
    candy: 'linear-gradient(135deg, #e06d84 0%, #d87093 100%)'
  };
  return gradientMap[st.theme.gradientId] || gradientMap['graphite'];
}

function accentHex(st: PortfolioState): string {
  return st.theme.accent || '#4A4A4A';
}

export function buildSlidesHTML(st: PortfolioState): string {
  const dark = false;
  const p = st.profile;
  const cover = coverBg(st);
  const slEmoji = p.iconImg ? `<img class="sl-emoji-img" src="${p.iconImg}" alt="">` : (p.emoji || '👋');
  const tags = st.skills.split(',').map(t => t.trim()).filter(Boolean);
  const chip = (t: string, big?: boolean) => {
    const c = tagColor(t, dark);
    return `<span class="${big ? 'sl-tag-chip' : 'np-tag'}" style="background:${c.bg};color:${c.fg}">${esc(t)}</span>`;
  };

  const band = `<div class="slide-cover band" style="background:${cover}"></div>`;
  const listInner = (emoji: string, title: string, items: string) => `<div class="sl-kicker">${title}</div>
    <div class="sl-h"><span>${emoji}</span>${title}</div>
    <div class="sl-list">${items}</div>`;
  
  const slides: string[] = [];

  // 1. Title Slide
  slides.push(`<div style="position:relative;display:flex;flex-direction:column;height:100%">
      <div class="sl-emoji">${slEmoji}</div>
      <div class="sl-name">${esc(p.name || 'Your Name')}</div>
      <div class="sl-role">${esc(p.role || 'Your Role')}</div>
      ${p.tagline ? `<div class="sl-tag">“${esc(p.tagline)}”</div>` : '<div style="margin-top:auto"></div>'}
    </div>`);

  // 2. About
  if (st.about) {
    slides.push(`<div class="sl-kicker">소개</div>
      <div class="sl-h"><span>💡</span>소개</div>
      <div class="sl-callout"><span>${esc(st.about)}</span></div>`);
  }

  // 3. Skills
  slides.push(`<div class="sl-kicker">기술 스택</div>
    <div class="sl-h"><span>🛠️</span>기술 스택</div>
    <div class="sl-tags">${tags.length ? tags.map(t => chip(t, true)).join('') : '<span style="color:var(--text-faint)">—</span>'}</div>`);

  // 3. Tools
  const selT = st.tools || [];
  if (selT.length) {
    slides.push(`<div class="sl-kicker">서비스 · 도구</div>
      <div class="sl-h"><span>🧰</span>서비스 · 도구</div>
      <div class="sl-tags">${selT.map(t => chip(t, true)).join('')}</div>`);
  }

  // 4. Experience
  const exItems = st.experience.length
    ? st.experience.slice(0, 4).map(x => `<div><div class="sl-li-top"><div><span class="sl-li-title">${esc(x.role || '')}</span> <span class="sl-li-sub">· ${esc(x.company || '')}${x.level ? ` · ${esc(x.level)}` : ''}</span></div><span class="sl-li-period">${esc(x.period || '')}</span></div>${x.desc ? `<div class="sl-li-desc">${esc(x.desc)}</div>` : ''}</div>`).join('')
    : '<div style="color:var(--text-faint)">경력 정보 없음</div>';
  slides.push(listInner('💼', '경력', exItems));

  // 5. Projects
  if (st.projects.length) {
    st.projects.forEach((x, pi) => {
      const techList = (x.tech || '').split(',').map(s => s.trim()).filter(Boolean);
      const star = x.stars ? `<span class="sl-li-period" style="font-size:19px;align-self:center;white-space:nowrap">★ ${x.stars}</span>` : '';
      const meta = [];
      if (x.role && x.role.trim()) meta.push(esc(x.role));
      if (x.period) meta.push(esc(x.period));
      const demo = x.demo || x.link;
      const urls = [];
      if (x.repo) urls.push('🔗 ' + esc(String(x.repo).replace(/^https?:\/\//, '')));
      if (demo) urls.push('🌐 ' + esc(String(demo).replace(/^https?:\/\//, '')));
      slides.push(`<div class="sl-kicker">프로젝트 ${pi + 1} / ${st.projects.length}</div>
        <div class="sl-h" style="justify-content:space-between;align-items:flex-start;gap:20px"><span><span style="margin-right:14px">🚀</span>${esc(x.name || '프로젝트')}</span>${star}</div>
        ${meta.length ? `<div class="sl-li-sub" style="margin:-18px 0 22px;font-size:21px">${meta.join('  ·  ')}</div>` : ''}
        ${x.desc ? `<div class="sl-li-desc" style="font-size:22px;line-height:1.65;margin-bottom:18px">${esc(x.desc)}</div>` : ''}
        ${x.result ? `<div class="sl-li-desc" style="font-size:20px;margin-bottom:18px">🏆 ${esc(x.result)}</div>` : ''}
        ${techList.length ? `<div class="sl-tags">${techList.map(s => chip(s, true)).join('')}</div>` : ''}
        ${urls.length ? `<div class="sl-li-desc" style="color:var(--text-faint);margin-top:20px;font-size:17px">${urls.join('     ')}</div>` : ''}`);
    });
  } else {
    slides.push(listInner('🚀', '프로젝트', '<div style="color:var(--text-faint)">프로젝트 정보 없음</div>'));
  }

  // 6. Custom Sections
  (st.custom || []).forEach(cs => {
    const items = (cs.items || []).filter(it => it.title);
    if (!cs.title || !items.length) return;
    const ci = items.slice(0, 4).map(it => `<div><div class="sl-li-top"><div><span class="sl-li-title">${esc(it.title)}</span>${it.sub ? ` <span class="sl-li-sub">· ${esc(it.sub)}</span>` : ''}</div>${it.period ? `<span class="sl-li-period">${esc(it.period)}</span>` : ''}</div>${it.desc ? `<div class="sl-li-desc">${esc(it.desc)}</div>` : ''}</div>`).join('');
    slides.push(listInner(cs.emoji || '📌', cs.title, ci));
  });

  // 8. Education + Contact
  const eduItems = st.education.length
    ? st.education.map(x => `<div><div class="sl-li-top"><div><span class="sl-li-title">${esc(x.school || '')}</span> <span class="sl-li-sub">· ${esc(x.degree || '')}</span></div><span class="sl-li-period">${esc(x.period || '')}</span></div></div>`).join('')
    : '<div style="color:var(--text-faint)">학력 정보 없음</div>';
  const contacts: string[] = [];
  if (p.email) contacts.push(`<div>✉️ ${esc(p.email)}</div>`);
  if (p.github) contacts.push(`<div>🐙 ${esc(p.github)}</div>`);
  if (p.website) contacts.push(`<div>🌐 ${esc(p.website)}</div>`);
  if (p.location) contacts.push(`<div>📍 ${esc(p.location)}</div>`);
  slides.push(`<div class="sl-kicker">교육 · 연락처</div>
    <div class="sl-h"><span>🎓</span>교육</div>
    <div class="sl-list">${eduItems}</div>
    ${contacts.length ? `<div class="sl-h" style="font-size:30px;margin-top:34px"><span>📬</span>연락처</div><div class="sl-contact">${contacts.join('')}</div>` : ''}`);

  const total = slides.length;
  const pad = (n: number) => String(n).padStart(2, '0');
  return slides.map((inner, i) => `<div class="slide" data-i="${i}">${band}${inner}<div class="sl-pageno">${pad(i + 1)} / ${pad(total)}</div></div>`).join('');
}

let slideIdx = 0;
let slideKeyHandler: ((e: KeyboardEvent) => void) | null = null;
let slideResize: (() => void) | null = null;

export function openSlides(state: PortfolioState) {
  const ov = document.getElementById('slides-overlay');
  if (!ov) return;
  ov.classList.remove('hidden');
  const slidesHTML = buildSlidesHTML(state);
  const nSlides = (slidesHTML.match(/class="slide"/g) || []).length;
  
  ov.innerHTML = `
    <div class="slide-stage">
      <div class="slide-canvas" id="slide-canvas" style="--accent:${accentHex(state)}">
        ${slidesHTML}
      </div>
    </div>
    <button class="slide-exit" id="sl-exit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <button class="slide-arrow prev" id="sl-prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg></button>
    <button class="slide-arrow next" id="sl-next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18l6-6-6-6"/></svg></button>
    <div class="slide-dots" id="sl-dots">${Array.from({ length: nSlides }, (_, i) => `<div class="slide-dot" data-i="${i}"></div>`).join('')}</div>
  `;
  
  slideIdx = 0;
  showSlide(0);
  scaleSlides();

  const exitBtn = document.getElementById('sl-exit');
  const prevBtn = document.getElementById('sl-prev');
  const nextBtn = document.getElementById('sl-next');

  if (exitBtn) exitBtn.onclick = closeSlides;
  if (prevBtn) prevBtn.onclick = () => showSlide(slideIdx - 1);
  if (nextBtn) nextBtn.onclick = () => showSlide(slideIdx + 1);

  ov.querySelectorAll('.slide-dot').forEach((d: any) => {
    d.onclick = () => showSlide(+d.dataset.i);
  });

  slideKeyHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      showSlide(slideIdx + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      showSlide(slideIdx - 1);
    } else if (e.key === 'Escape') {
      closeSlides();
    }
  };
  window.addEventListener('keydown', slideKeyHandler);

  slideResize = scaleSlides;
  window.addEventListener('resize', slideResize);
}

function scaleSlides() {
  const c = document.getElementById('slide-canvas');
  if (!c) return;
  const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720) * 0.92;
  c.style.transform = `scale(${s})`;
}

function showSlide(i: number) {
  const ov = document.getElementById('slides-overlay');
  if (!ov) return;
  const slides = ov.querySelectorAll('.slide');
  if (!slides.length) return;
  slideIdx = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle('on', n === slideIdx));
  ov.querySelectorAll('.slide-dot').forEach((d, n) => d.classList.toggle('on', n === slideIdx));
}

export function closeSlides() {
  const ov = document.getElementById('slides-overlay');
  if (!ov) return;
  ov.classList.add('hidden');
  ov.innerHTML = '';
  if (slideKeyHandler) {
    window.removeEventListener('keydown', slideKeyHandler);
    slideKeyHandler = null;
  }
  if (slideResize) {
    window.removeEventListener('resize', slideResize);
    slideResize = null;
  }
}
