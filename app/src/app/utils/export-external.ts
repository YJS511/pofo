import { PortfolioState } from '../types';
import {
  GRADIENTS,
  TOOL_CATS,
  THEME_CSS,
  PAGE_CSS,
  SLIDE_CSS,
  STANDALONE_HELPERS,
  TAG_LIGHT,
  TAG_DARK
} from '../constants';
import { zipSync } from 'fflate';

const SEC_LABEL: Record<string, string> = {
  skills: '기술 스택',
  tools: '서비스 · 도구',
  experience: '경력',
  projects: '프로젝트',
  education: '교육',
  certifications: '자격증',
  github: 'GitHub'
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildStandaloneHTML(state: PortfolioState): string {
  const consts = `
var GRADIENTS = ${JSON.stringify(GRADIENTS)};
var TAG_LIGHT = ${JSON.stringify(TAG_LIGHT)};
var TAG_DARK = ${JSON.stringify(TAG_DARK)};
var TOOL_CATS = ${JSON.stringify(TOOL_CATS)};
var SEC_LABEL = ${JSON.stringify(SEC_LABEL)};
`;

  const helpers = consts + '\n' + STANDALONE_HELPERS;
  // 보안: 인라인 <script>에 박을 때 </script> 및 U+2028/2029로 인한 태그 탈출 방지
  const data = JSON.stringify(state)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  const title = `${state.profile.name || '포트폴리오'} — 포트폴리오`;

  const coverBgForBuild = (st: PortfolioState) => {
    if (st.theme && st.theme.solidColor) return st.theme.solidColor;
    if (st.theme && st.theme.gradientCustom) {
      const h = st.theme.gradientCustom.replace('#', '');
      if (h.length === 6) {
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        const mix = (c: number, t: number, amt: number) => Math.round(c + (t - c) * amt);
        const toHex = (rr: number, gg: number, bb: number) => '#' + [rr, gg, bb].map((v) => v.toString(16).padStart(2, '0')).join('');
        const light = toHex(mix(r, 255, 0.35), mix(g, 255, 0.35), mix(b, 255, 0.35));
        const dark = toHex(mix(r, 0, 0.3), mix(g, 0, 0.3), mix(b, 0, 0.3));
        return `linear-gradient(135deg, ${light} 0%, ${st.theme.gradientCustom} 52%, ${dark} 100%)`;
      }
      return st.theme.gradientCustom;
    }
    const g = GRADIENTS[st.theme.cover] || GRADIENTS.graphite;
    return st.theme.coverImg ? `center/cover no-repeat url('${st.theme.coverImg.replace(/['"()\\]/g, encodeURIComponent)}')` : g;
  };

  return `<!DOCTYPE html>
<html lang="ko" data-mode="${state.theme.mode}" data-font="${state.theme.font || 'sans'}">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Nanum+Myeongjo:wght@400;700;800&display=swap">
<style>
*{box-sizing:border-box;margin:0;padding:0;scrollbar-width:none;-ms-overflow-style:none}
*::-webkit-scrollbar{width:0;height:0;display:none}
.hidden{display:none !important}
body{font-family:var(--font-active);color:var(--text);background:var(--canvas-bg);-webkit-font-smoothing:antialiased}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
${THEME_CSS}
${PAGE_CSS}
${SLIDE_CSS}
.viewer-bar{position:fixed;top:0;left:0;right:0;height:48px;display:flex;align-items:center;gap:10px;padding:0 16px;
  background:var(--bg);border-bottom:1px solid var(--divider);z-index:50}
.viewer-bar .vb-brand{font-weight:700;font-size:15px;display:flex;align-items:center;gap:8px}
.viewer-bar .vb-brand .lg{width:26px;height:26px;border-radius:7px;display:grid;place-items:center;background:${coverBgForBuild(state)};font-size:15px;overflow:hidden}
.viewer-bar .sp{flex:1}
.vbtn{height:32px;padding:0 13px;border-radius:7px;font-size:13.5px;font-weight:600;color:var(--text-light)}
.vbtn:hover{background:var(--hover);color:var(--text)}
.vbtn.solid{background:#4A4A4A;color:#fff}.vbtn.solid:hover{background:#2E2E2E}
.page-scroll{padding-top:48px;min-height:100vh;min-height:100dvh}
#slides-overlay{position:fixed;inset:0;z-index:200;background:#0c0c0c}
@media(max-width:600px){
  .viewer-bar{gap:6px;padding:0 10px}
  .viewer-bar .vb-brand{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .vbtn{padding:0 8px;font-size:12px}
}
</style>
</head>
<body>
<div class="viewer-bar">
  <span class="vb-brand"><span class="lg">${state.profile.iconImg ? `<img src="${escapeHtml(state.profile.iconImg)}" style="width:100%;height:100%;object-fit:cover" alt="">` : escapeHtml(state.profile.emoji || '')}</span>${escapeHtml(state.profile.name || 'Portfolio')}</span>
  <span class="sp"></span>
  <button class="vbtn" id="v-font" title="폰트 변경">Aa</button>
  <button class="vbtn" id="v-mode">☀︎ / ☾</button>
  <button class="vbtn solid" id="v-present">🖥️ 발표 모드</button>
</div>
<div class="page-scroll"><div id="root"></div></div>
<div id="slides-overlay" class="hidden"></div>
<script>
${helpers}
var STATE=${data};
function gid(x){return document.getElementById(x);}
document.getElementById('root').innerHTML=renderPageHTML(STATE,{});
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('.np-tabbar .np-tab'); if(!t) return;
  var bar=t.parentElement, panes=bar.nextElementSibling;
  var idx=Array.prototype.indexOf.call(bar.children,t);
  bar.querySelectorAll('.np-tab').forEach(function(b,n){b.classList.toggle('on',n===idx);});
  if(panes) panes.querySelectorAll('.np-tab-pane').forEach(function(p,n){p.classList.toggle('on',n===idx);});
});
gid('v-mode').onclick=function(){
  STATE.theme.mode = STATE.theme.mode==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-mode',STATE.theme.mode);
  gid('root').innerHTML=renderPageHTML(STATE,{});
};
var FONTS=['sans','serif','mono'], FLBL={sans:'Aa Sans',serif:'Aa Serif',mono:'Aa Mono'};
gid('v-font').textContent=FLBL[STATE.theme.font]||'Aa Sans';
gid('v-font').onclick=function(){
  var i=FONTS.indexOf(STATE.theme.font); STATE.theme.font=FONTS[(i+1)%FONTS.length];
  document.documentElement.setAttribute('data-font',STATE.theme.font);
  gid('v-font').textContent=FLBL[STATE.theme.font];
};
var slideIdx=0,kh=null,rs=null;
function scale(){var c=gid('s-canvas');if(!c)return;var s=Math.min(innerWidth/1280,innerHeight/720)*0.92;c.style.transform='scale('+s+')';}
function show(i){var ov=gid('slides-overlay');var sl=ov.querySelectorAll('.slide');if(!sl.length)return;slideIdx=(i+sl.length)%sl.length;sl.forEach(function(s,n){s.classList.toggle('on',n===slideIdx);});ov.querySelectorAll('.slide-dot').forEach(function(d,n){d.classList.toggle('on',n===slideIdx);});}
function present(){
  var ov=gid('slides-overlay');ov.classList.remove('hidden');
  var slidesHTML=buildSlidesHTML(STATE);
  var nSlides=(slidesHTML.match(/class="slide"/g)||[]).length, dots='';
  for(var di=0;di<nSlides;di++) dots+='<div class="slide-dot" data-i="'+di+'"></div>';
  ov.innerHTML='<div class="slide-stage"><div class="slide-canvas" id="s-canvas" style="--accent:'+accentHex(STATE)+'">'+slidesHTML+'</div></div>'+
   '<button class="slide-exit" id="s-exit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>'+
   '<button class="slide-arrow prev" id="s-prev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 18l-6-6 6-6"/></svg></button>'+
   '<button class="slide-arrow next" id="s-next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18l6-6-6-6"/></svg></button>'+
   '<div class="slide-dots">'+dots+'</div>';
  slideIdx=0;show(0);scale();
  gid('s-exit').onclick=close;gid('s-prev').onclick=function(){show(slideIdx-1);};gid('s-next').onclick=function(){show(slideIdx+1);};
  ov.querySelectorAll('.slide-dot').forEach(function(d){d.onclick=function(){show(+d.dataset.i);};});
  kh=function(e){if(e.key==='ArrowRight'||e.key===' ')show(slideIdx+1);else if(e.key==='ArrowLeft')show(slideIdx-1);else if(e.key==='Escape')close();};
  addEventListener('keydown',kh);rs=scale;addEventListener('resize',rs);
}
function close(){var ov=gid('slides-overlay');ov.classList.add('hidden');ov.innerHTML='';if(kh)removeEventListener('keydown',kh);if(rs)removeEventListener('resize',rs);}
gid('v-present').onclick=present;
</script>
</body>
</html>`;
}

const PPTX_CDN = 'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js';

function ensureScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('script load failed'));
    document.head.appendChild(s);
  });
}

export async function exportPPTX(state: PortfolioState): Promise<void> {
  await ensureScript(PPTX_CDN);
  const PptxGenJS = (window as any).PptxGenJS;
  if (!PptxGenJS) throw new Error('PptxGenJS unavailable');

  const p = state.profile;
  const accent = (state.theme.accent || '#4A4A4A').replace('#', '');
  const dark = state.theme.mode === 'dark';
  const bg = dark ? '191919' : 'FFFFFF';
  const fg = dark ? 'F2F2F2' : '37352F';
  const faint = dark ? 'A0A0A0' : '7A786F';

  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'WIDE', width: 13.333, height: 7.5 });
  pptx.layout = 'WIDE';

  const baseSlide = () => {
    const s = pptx.addSlide();
    s.background = { color: bg };
    return s;
  };

  const s1 = baseSlide();
  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.25, fill: { color: accent } });
  s1.addText(`${p.emoji || ''} ${p.name || '이름'}`.trim(), {
    x: 0.8, y: 2.4, w: 11.7, h: 1.2, fontSize: 44, bold: true, color: fg
  });
  s1.addText(p.role || '', { x: 0.8, y: 3.6, w: 11.7, h: 0.7, fontSize: 22, color: accent });
  if (p.tagline) s1.addText(`"${p.tagline}"`, { x: 0.8, y: 4.3, w: 11.7, h: 0.7, fontSize: 16, italic: true, color: faint });

  const skills = state.skills.split(',').map((x) => x.trim()).filter(Boolean);
  const s2 = baseSlide();
  s2.addText('소개', { x: 0.8, y: 0.5, w: 11.7, h: 0.6, fontSize: 26, bold: true, color: fg });
  if (state.about) s2.addText(state.about, { x: 0.8, y: 1.3, w: 11.7, h: 2, fontSize: 15, color: fg });
  s2.addText('기술 스택', { x: 0.8, y: 3.4, w: 11.7, h: 0.6, fontSize: 22, bold: true, color: fg });
  s2.addText(skills.length ? skills.join('   •   ') : '—', { x: 0.8, y: 4.1, w: 11.7, h: 2, fontSize: 15, color: faint });

  const listSlide = (title: string, lines: string[]) => {
    if (!lines.length) return;
    const s = baseSlide();
    s.addText(title, { x: 0.8, y: 0.5, w: 11.7, h: 0.6, fontSize: 26, bold: true, color: fg });
    s.addText(
      lines.map((t) => ({ text: t, options: { bullet: true, fontSize: 14, color: fg, breakLine: true } })),
      { x: 0.8, y: 1.3, w: 11.7, h: 5.5, valign: 'top' }
    );
  };
  listSlide('경력', state.experience.map((e) => `${e.role || ''} · ${e.company || ''}${e.period ? `  (${e.period})` : ''}${e.desc ? `\n${e.desc}` : ''}`));
  listSlide('프로젝트', state.projects.map((pr) => `${pr.name || ''}${pr.period ? `  (${pr.period})` : ''}${pr.desc ? `\n${pr.desc}` : ''}`));
  listSlide('교육', state.education.map((e) => `${e.school || ''} · ${e.degree || ''}${e.period ? `  (${e.period})` : ''}`));

  const contacts: string[] = [];
  if (p.email) contacts.push(`✉  ${p.email}`);
  if (p.github) contacts.push(`🔗  ${p.github}`);
  if (p.website) contacts.push(`🌐  ${p.website}`);
  if (p.location) contacts.push(`📍  ${p.location}`);
  if (contacts.length) {
    const s = baseSlide();
    s.addText('연락처', { x: 0.8, y: 0.5, w: 11.7, h: 0.6, fontSize: 26, bold: true, color: fg });
    s.addText(contacts.join('\n'), { x: 0.8, y: 1.4, w: 11.7, h: 4, fontSize: 16, color: fg, lineSpacingMultiple: 1.6 });
  }

  const fname = (p.name || '포트폴리오').replace(/\s+/g, '-').toLowerCase();
  await pptx.writeFile({ fileName: `${fname}.pptx` });
}

export function exportPDF(state: PortfolioState) {
  const originalTitle = document.title;
  document.title = `${state.profile.name || '포트폴리오'} — 포트폴리오`;
  document.body.classList.add('printing');
  window.print();
  setTimeout(() => {
    document.title = originalTitle;
    document.body.classList.remove('printing');
  }, 800);
}

export async function exportToNotionAPI(
  state: PortfolioState,
  token: string,
  parentPageId: string
): Promise<string> {
  const p = state.profile;
  const emoji = p.emoji || '👋';
  const name = p.name || '이름';

  const children: any[] = [];

  children.push({
    object: 'block', type: 'callout',
    callout: {
      rich_text: [{ type: 'text', text: { content: `${p.role || '직무'}${p.tagline ? ` — ${p.tagline}` : ''}` } }],
      icon: { type: 'emoji', emoji }, color: 'gray_background'
    }
  });

  children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '💡 소개' } }] } });
  children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: state.about || '자기소개 내용이 없습니다.' } }] } });

  const skills = state.skills.split(',').map(s => s.trim()).filter(Boolean);
  if (skills.length > 0) {
    children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🛠️ 기술 스택' } }] } });
    children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: skills.map((s, idx) => ({ type: 'text', text: { content: s + (idx < skills.length - 1 ? ', ' : '') }, annotations: { code: true } })) } });
  }

  if (state.tools.length > 0) {
    children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🧰 서비스 · 도구' } }] } });
    children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: state.tools.map((t, idx) => ({ type: 'text', text: { content: t + (idx < state.tools.length - 1 ? ', ' : '') }, annotations: { code: true } })) } });
  }

  if (state.experience.length > 0) {
    children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '💼 경력' } }] } });
    state.experience.forEach(exp => {
      children.push({ object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: `${exp.role || '직무'} · ${exp.company || '회사'}${exp.level ? ` (${exp.level})` : ''}` } }] } });
      const meta = [];
      if (exp.type) meta.push(exp.type);
      if (exp.period) meta.push(exp.period);
      if (meta.length > 0) children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: meta.join(' · ') }, annotations: { italic: true } }] } });
      if (exp.desc) children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: exp.desc } }] } });
    });
  }

  if (state.projects.length > 0) {
    children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🚀 프로젝트' } }] } });
    state.projects.forEach(proj => {
      children.push({ object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: `${proj.name || '프로젝트'}${proj.period ? ` (${proj.period})` : ''}` } }] } });
      if (proj.role) children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: '담당 역할: ' }, annotations: { bold: true } }, { type: 'text', text: { content: proj.role } }] } });
      if (proj.desc) children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: proj.desc } }] } });
      if (proj.result) children.push({ object: 'block', type: 'callout', callout: { rich_text: [{ type: 'text', text: { content: '성과: ' }, annotations: { bold: true } }, { type: 'text', text: { content: proj.result } }], icon: { type: 'emoji', emoji: '✨' }, color: 'blue_background' } });
      const links = [];
      if (proj.repo) links.push({ text: 'GitHub', url: proj.repo });
      if (proj.demo) links.push({ text: '데모', url: proj.demo });
      if (links.length > 0) children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: links.map((lnk, idx) => ({ type: 'text', text: { content: lnk.text + (idx < links.length - 1 ? ' · ' : ''), link: { url: lnk.url } } })) } });
    });
  }

  if (state.custom && state.custom.length > 0) {
    state.custom.forEach(sec => {
      if (!sec.title) return;
      children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: `${sec.emoji ? sec.emoji + ' ' : ''}${sec.title}` } }] } });
      sec.items.forEach(item => {
        children.push({ object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: item.title || '항목' } }] } });
        const meta = [];
        if (item.sub) meta.push(item.sub);
        if (item.period) meta.push(item.period);
        if (meta.length > 0) children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: meta.join(' · ') }, annotations: { italic: true } }] } });
        if (item.desc) children.push({ object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: item.desc } }] } });
      });
    });
  }

  if (state.education.length > 0) {
    children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '🎓 교육' } }] } });
    state.education.forEach(edu => {
      children.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: edu.school || '학교' }, annotations: { bold: true } }, { type: 'text', text: { content: ` · ${edu.degree || '전공'}` } }, { type: 'text', text: { content: edu.period ? ` (${edu.period})` : '' }, annotations: { italic: true } }] } });
    });
  }

  children.push({ object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: '📬 연락처' } }] } });
  if (p.email) children.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: `✉️ 이메일: ${p.email}` } }] } });
  if (p.github) children.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: '🔗 GitHub: ' } }, { type: 'text', text: { content: p.github, link: { url: `https://github.com/${p.github.replace(/^@/, '')}` } } }] } });
  if (p.website) children.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: '🌐 웹사이트: ' } }, { type: 'text', text: { content: p.website, link: { url: p.website } } }] } });
  if (p.location) children.push({ object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: `📍 위치: ${p.location}` } }] } });

  const payload = {
    parent: { page_id: parentPageId.replace(/-/g, '') },
    icon: { type: 'emoji', emoji },
    properties: { title: { title: [{ type: 'text', text: { content: `${name} 포트폴리오` } }] } },
    children
  };

  const targetUrl = 'https://api.notion.com/v1/pages';
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

  const res = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || 'Notion API call failed');
  }

  const resData = await res.json();
  return resData.url;
}

export async function exportToNetlify(state: PortfolioState, token: string): Promise<string> {
  const htmlContent = buildStandaloneHTML(state);
  const randomName = `pofo-${Math.random().toString(36).substring(2, 8)}`;
  const createRes = await fetch('https://api.netlify.com/api/v1/sites', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: randomName })
  });
  if (!createRes.ok) throw new Error((await createRes.text()) || 'Netlify site creation failed');

  const siteData = await createRes.json();
  const siteId = siteData.id;
  const siteUrl = siteData.ssl_url || siteData.url;

  const zipData = zipSync({ 'index.html': new TextEncoder().encode(htmlContent) });
  const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/zip' },
    body: zipData
  });
  if (!deployRes.ok) throw new Error((await deployRes.text()) || 'Netlify deploy upload failed');

  return siteUrl;
}

export function downloadZip(filename: string, htmlContent: string) {
  const zipData = zipSync({ 'index.html': new TextEncoder().encode(htmlContent) });
  const blob = new Blob([zipData], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 100);
}
