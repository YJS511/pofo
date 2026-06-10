import { PortfolioState } from '../types';
import {
  GRADIENTS,
  TOOL_CATS,
  THEME_CSS,
  PAGE_CSS,
  SLIDE_CSS,
  STANDALONE_HELPERS
} from '../constants';
import { zipSync } from 'fflate';

const TAG_LIGHT = [
  { bg: '#EEE0DA', fg: '#5C4636' },
  { bg: '#FADEC9', fg: '#774B2A' },
  { bg: '#FDECC8', fg: '#7A5A18' },
  { bg: '#DBEDDB', fg: '#2C5A3E' },
  { bg: '#D3E5EF', fg: '#28486C' },
  { bg: '#E8DEEE', fg: '#492F64' },
  { bg: '#F5E0E9', fg: '#69314C' },
  { bg: '#FFE2DD', fg: '#6E3630' }
];

const TAG_DARK = [
  { bg: '#603B2C', fg: '#E6CBBA' },
  { bg: '#854C1D', fg: '#F7D7B8' },
  { bg: '#89632A', fg: '#F4E0B0' },
  { bg: '#2B593F', fg: '#BFE2C9' },
  { bg: '#28456C', fg: '#BBD4ED' },
  { bg: '#492F64', fg: '#D7C4E8' },
  { bg: '#69314C', fg: '#EEC4DA' },
  { bg: '#6E3630', fg: '#F2C5BD' }
];

const SEC_LABEL: Record<string, string> = {
  skills: '🛠️ 기술 스택',
  tools: '🧰 서비스 · 도구',
  experience: '💼 경력',
  projects: '🚀 프로젝트',
  education: '🎓 교육'
};

export function toMarkdown(state: PortfolioState): string {
  const p = state.profile;
  let md = '';

  // Header
  md += `# ${p.emoji || '👋'} ${p.name || '이름'}\n\n`;
  md += `**${p.role || '직무'}** — ${p.tagline || '한 줄 태그라인'}\n\n`;

  // About
  md += `## 💡 소개\n\n${state.about || '_여기에 자기소개를 작성하세요._'}\n\n`;

  // Skills
  const skills = state.skills.split(',').map(s => s.trim()).filter(Boolean);
  md += `## 🛠️ 기술 스택\n\n${skills.length ? skills.join(', ') : '_기술 스택을 입력하세요_'}\n\n`;

  // Tools
  if (state.tools.length > 0) {
    md += `## 🧰 서비스 · 도구\n\n${state.tools.join(', ')}\n\n`;
  }

  // Experience
  if (state.experience.length > 0) {
    md += `## 💼 경력\n\n`;
    state.experience.forEach(exp => {
      md += `### ${exp.role || '직무'} · ${exp.company || '회사'}${exp.level ? ` · ${exp.level}` : ''}\n`;
      const meta = [];
      if (exp.type) meta.push(exp.type);
      if (exp.period) meta.push(exp.period);
      if (meta.length) md += `_${meta.join(' · ')}_\n\n`;
      md += `${exp.desc || '_주요 성과·담당 업무를 작성하세요._'}\n\n`;
    });
  }

  // Projects
  if (state.projects.length > 0) {
    md += `## 🚀 프로젝트\n\n`;
    state.projects.forEach(proj => {
      md += `### ${proj.name || '프로젝트'}${proj.period ? ` (${proj.period})` : ''}\n`;
      if (proj.role) md += `**담당 역할:** ${proj.role}\n\n`;
      md += `${proj.desc || '_프로젝트 설명_'}\n\n`;
      if (proj.result) md += `**성과:** ${proj.result}\n\n`;
      const tech = proj.tech.split(',').map(t => t.trim()).filter(Boolean);
      if (tech.length) md += `${tech.join(', ')}\n\n`;
      const links = [];
      if (proj.repo) links.push(`[GitHub](${proj.repo})`);
      if (proj.demo) links.push(`[데모](${proj.demo})`);
      if (links.length) md += `${links.join(' · ')}\n\n`;
    });
  }

  // Education
  if (state.education.length > 0) {
    md += `## 🎓 교육\n\n`;
    state.education.forEach(edu => {
      md += `- **${edu.school || '학교'}** · ${edu.degree || '전공'}${edu.period ? ` _(${edu.period})_` : ''}\n`;
    });
    md += '\n';
  }

  // Contact
  md += `## 📬 연락처\n\n`;
  if (p.email) md += `- ✉️ ${p.email}\n`;
  if (p.github) md += `- 🔗 ${p.github}\n`;
  if (p.website) md += `- 🌐 ${p.website}\n`;
  if (p.location) md += `- 📍 ${p.location}\n`;

  return md.trim() + '\n';
}

export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 100);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    const blob = new Blob([text], { type: 'text/plain' });
    await navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })]);
    return true;
  } catch {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        return true;
      } catch {
        return false;
      } finally {
        textarea.remove();
      }
    }
  }
}

export async function copyAsNotionHTML(state: PortfolioState): Promise<boolean> {
  const p = state.profile;
  const accent = state.theme.accent || '#4A4A4A';
  const isDark = state.theme.mode === 'dark';
  const textColor = isDark ? '#F2F2F2' : '#37352F';
  const bg = isDark ? '#191919' : '#FFFFFF';
  
  let html = `<div style="font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji'; color: ${textColor}; background-color: ${bg}; padding: 20px; max-width: 800px; margin: 0 auto; line-height: 1.6;">`;
  
  // Header
  html += `<h1 style="font-size: 32px; font-weight: 700; margin-top: 0; margin-bottom: 8px; color: ${textColor}; display: flex; align-items: center; gap: 8px;">`;
  if (p.emoji) html += `<span>${p.emoji}</span> `;
  html += `<span>${p.name || '이름'}</span></h1>`;
  
  // Role & Tagline Callout
  html += `<div style="background-color: ${isDark ? '#262626' : '#F1F1EF'}; border-left: 4px solid ${accent}; padding: 16px; border-radius: 4px; margin-bottom: 24px;">`;
  html += `<div style="font-weight: 600; font-size: 16px; margin-bottom: 4px; color: ${textColor};">${p.role || '직무'}</div>`;
  if (p.tagline) {
    html += `<div style="font-size: 14px; color: ${isDark ? '#A0A0A0' : '#7A786F'}; font-style: italic;">“${p.tagline}”</div>`;
  }
  html += `</div>`;
  
  // About
  html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">💡 소개</h2>`;
  html += `<p style="font-size: 15px; margin-bottom: 24px; white-space: pre-wrap;">${state.about || '_자기소개를 작성하세요._'}</p>`;
  
  // Skills Tags
  const skills = state.skills.split(',').map(s => s.trim()).filter(Boolean);
  html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">🛠️ 기술 스택</h2>`;
  if (skills.length) {
    html += `<div style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 6px;">`;
    skills.forEach(s => {
      html += `<span style="background-color: ${isDark ? '#2D3748' : '#EDF2F7'}; color: ${isDark ? '#E2E8F0' : '#4A5568'}; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: 500; display: inline-block; font-family: monospace;">${s}</span>`;
    });
    html += `</div>`;
  } else {
    html += `<p style="font-size: 15px; color: ${isDark ? '#71717A' : '#A1A1AA'}; font-style: italic; margin-bottom: 24px;">_기술 스택을 입력하세요_</p>`;
  }
  
  // Tools Tags
  if (state.tools.length > 0) {
    html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">🧰 서비스 · 도구</h2>`;
    html += `<div style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 6px;">`;
    state.tools.forEach(t => {
      html += `<span style="background-color: ${isDark ? '#2A4365' : '#EBF8FF'}; color: ${isDark ? '#90CDF4' : '#2B6CB0'}; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: 500; display: inline-block; font-family: monospace;">${t}</span>`;
    });
    html += `</div>`;
  }
  
  // Experience
  if (state.experience.length > 0) {
    html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">💼 경력</h2>`;
    state.experience.forEach(exp => {
      html += `<div style="margin-bottom: 20px;">`;
      html += `<h3 style="font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 4px; color: ${textColor};">${exp.role || '직무'} · ${exp.company || '회사'}${exp.level ? ` · ${exp.level}` : ''}</h3>`;
      const meta = [];
      if (exp.type) meta.push(exp.type);
      if (exp.period) meta.push(exp.period);
      if (meta.length) {
        html += `<div style="font-size: 13px; color: ${isDark ? '#A0A0A0' : '#7A786F'}; margin-bottom: 8px; font-style: italic;">${meta.join(' · ')}</div>`;
      }
      html += `<p style="font-size: 14px; margin-top: 0; white-space: pre-wrap;">${exp.desc || '_담당 업무를 작성하세요._'}</p>`;
      html += `</div>`;
    });
  }
  
  // Projects
  if (state.projects.length > 0) {
    html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">🚀 프로젝트</h2>`;
    state.projects.forEach(proj => {
      html += `<div style="margin-bottom: 24px; border: 1px solid ${isDark ? '#2D3748' : '#E2E8F0'}; padding: 16px; border-radius: 6px; background-color: ${isDark ? '#22252A' : '#F8FAFC'};">`;
      html += `<h3 style="font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 6px; color: ${textColor};">${proj.name || '프로젝트'}${proj.period ? ` <span style="font-size: 13px; font-weight: 400; color: ${isDark ? '#A0A0A0' : '#7A786F'};">(${proj.period})</span>` : ''}</h3>`;
      if (proj.role) {
        html += `<div style="font-size: 14px; margin-bottom: 8px;"><strong>담당 역할:</strong> ${proj.role}</div>`;
      }
      html += `<p style="font-size: 14px; margin-top: 0; margin-bottom: 12px; white-space: pre-wrap;">${proj.desc || '_프로젝트 설명_'}</p>`;
      if (proj.result) {
        html += `<div style="font-size: 14px; margin-bottom: 12px; background-color: ${isDark ? '#1A202C' : '#EDF2F7'}; padding: 8px 12px; border-radius: 4px;"><strong>성과:</strong> ${proj.result}</div>`;
      }
      const tech = proj.tech.split(',').map(t => t.trim()).filter(Boolean);
      if (tech.length) {
        html += `<div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 4px;">`;
        tech.forEach(t => {
          html += `<span style="background-color: ${isDark ? '#2D3748' : '#EDF2F7'}; color: ${isDark ? '#E2E8F0' : '#4A5568'}; padding: 2px 6px; border-radius: 4px; font-size: 11px;">${t}</span>`;
        });
        html += `</div>`;
      }
      const links = [];
      if (proj.repo) links.push(`<a href="${proj.repo}" target="_blank" style="color: ${accent}; text-decoration: underline; font-size: 13px; font-weight: 500;">GitHub</a>`);
      if (proj.demo) links.push(`<a href="${proj.demo}" target="_blank" style="color: ${accent}; text-decoration: underline; font-size: 13px; font-weight: 500;">데모</a>`);
      if (links.length) {
        html += `<div style="display: flex; gap: 8px;">${links.join(' · ')}</div>`;
      }
      html += `</div>`;
    });
  }
  
  // Custom Sections
  if (state.custom && state.custom.length > 0) {
    state.custom.forEach(sec => {
      if (!sec.title) return;
      html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">${sec.emoji ? sec.emoji + ' ' : ''}${sec.title}</h2>`;
      sec.items.forEach(item => {
        html += `<div style="margin-bottom: 16px;">`;
        html += `<h3 style="font-size: 15px; font-weight: 600; margin-top: 0; margin-bottom: 4px; color: ${textColor};">${item.title || '항목'}</h3>`;
        const meta = [];
        if (item.sub) meta.push(item.sub);
        if (item.period) meta.push(item.period);
        if (meta.length) {
          html += `<div style="font-size: 13px; color: ${isDark ? '#A0A0A0' : '#7A786F'}; margin-bottom: 6px;">${meta.join(' · ')}</div>`;
        }
        if (item.desc) {
          html += `<p style="font-size: 14px; margin-top: 0; white-space: pre-wrap;">${item.desc}</p>`;
        }
        html += `</div>`;
      });
    });
  }
  
  // Education
  if (state.education.length > 0) {
    html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">🎓 교육</h2>`;
    html += `<ul style="margin-top: 0; padding-left: 20px; font-size: 15px;">`;
    state.education.forEach(edu => {
      html += `<li style="margin-bottom: 6px;"><strong>${edu.school || '학교'}</strong> · ${edu.degree || '전공'}${edu.period ? ` <span style="font-size: 13px; color: ${isDark ? '#A0A0A0' : '#7A786F'};">(${edu.period})</span>` : ''}</li>`;
    });
    html += `</ul>`;
  }
  
  // Contact
  html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">📬 연락처</h2>`;
  html += `<ul style="margin-top: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">`;
  if (p.email) html += `<li>✉️ ${p.email}</li>`;
  if (p.github) html += `<li>🔗 <a href="https://github.com/${p.github.replace(/^@/, '')}" target="_blank" style="color: ${accent};">${p.github}</a></li>`;
  if (p.website) html += `<li>🌐 <a href="${p.website}" target="_blank" style="color: ${accent};">${p.website}</a></li>`;
  if (p.location) html += `<li>📍 ${p.location}</li>`;
  html += `</ul>`;
  
  html += `</div>`;
  
  try {
    const textBlob = new Blob([toMarkdown(state)], { type: 'text/plain' });
    const htmlBlob = new Blob([html], { type: 'text/html' });
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': textBlob,
        'text/html': htmlBlob
      })
    ]);
    return true;
  } catch (e) {
    console.error('Notion HTML copy failed, falling back to basic text copy:', e);
    try {
      await navigator.clipboard.writeText(toMarkdown(state));
      return true;
    } catch {
      return false;
    }
  }
}

export function exportJSON(state: PortfolioState): string {
  return JSON.stringify(state, null, 2);
}

/* =========================================================
   공유 링크 — 압축(gzip+base64url) / 복원  (원본 index.html 포팅)
   ========================================================= */
const _hasCS =
  typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';

// 이미지(data URL)는 너무 커서 공유 링크에서 제외
function shareableState(state: PortfolioState): PortfolioState {
  const s: PortfolioState = JSON.parse(JSON.stringify(state));
  if (s.profile) s.profile.iconImg = '';
  if (s.theme) s.theme.coverImg = '';
  return s;
}

export async function gzipB64(str: string): Promise<string> {
  const plain =
    'j' +
    btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  if (plain.length <= 1800 || !_hasCS) return plain;
  const buf = await new Response(
    new Blob([str]).stream().pipeThrough(new CompressionStream('gzip'))
  ).arrayBuffer();
  let bin = '';
  const u8 = new Uint8Array(buf);
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  const gz =
    'g' + btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return gz.length < plain.length ? gz : plain;
}

export async function gunzipB64(tok: string): Promise<string> {
  const tag = tok[0];
  const b64 = tok.slice(1).replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64);
  if (tag === 'j') return decodeURIComponent(escape(bin));
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  const buf = await new Response(
    new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'))
  ).arrayBuffer();
  return new TextDecoder().decode(buf);
}

export async function buildShareURL(state: PortfolioState, base?: string): Promise<string> {
  const token = await gzipB64(JSON.stringify(shareableState(state)));
  const b = (base || location.origin + location.pathname).replace(/#.*$/, '');
  return b + '#p=' + token;
}

export function qrSrc(url: string): string {
  return (
    'https://api.qrserver.com/v1/create-qr-code/?size=560x560&margin=12&ecc=L&data=' +
    encodeURIComponent(url)
  );
}

// 앱 로드 시 #p= 공유 링크 해독 → 상태 반환(없으면 null)
export async function parseShareHash(): Promise<PortfolioState | null> {
  const h = location.hash || '';
  const m = h.match(/[#&]p=([^&]+)/);
  if (!m) return null;
  try {
    const json = await gunzipB64(m[1]);
    return JSON.parse(json) as PortfolioState;
  } catch {
    return null;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildStandaloneHTML(state: PortfolioState): string {
  // 1. serialize constants and helper scripts
  const consts = `
var GRADIENTS = ${JSON.stringify(GRADIENTS)};
var TAG_LIGHT = ${JSON.stringify(TAG_LIGHT)};
var TAG_DARK = ${JSON.stringify(TAG_DARK)};
var TOOL_CATS = ${JSON.stringify(TOOL_CATS)};
var SEC_LABEL = ${JSON.stringify(SEC_LABEL)};
`;

  const helpers = consts + '\n' + STANDALONE_HELPERS;
  const data = JSON.stringify(state);
  const title = `${state.profile.name || 'Portfolio'} — Portfolio`;

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
    return st.theme.coverImg ? `center/cover no-repeat url('${st.theme.coverImg}')` : g;
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
  <span class="vb-brand"><span class="lg">${state.profile.iconImg ? `<img src="${state.profile.iconImg}" style="width:100%;height:100%;object-fit:cover" alt="">` : state.profile.emoji || ''}</span>${escapeHtml(state.profile.name || 'Portfolio')}</span>
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
/* 탭 레이아웃 — 섹션 전환 (이벤트 위임, 재렌더에도 유지) */
document.addEventListener('click',function(e){
  var t=e.target.closest&&e.target.closest('.np-tabbar .np-tab'); if(!t) return;
  var bar=t.parentElement, panes=bar.nextElementSibling;
  var idx=Array.prototype.indexOf.call(bar.children,t);
  bar.querySelectorAll('.np-tab').forEach(function(b,n){b.classList.toggle('on',n===idx);});
  if(panes) panes.querySelectorAll('.np-tab-pane').forEach(function(p,n){p.classList.toggle('on',n===idx);});
});
/* dark toggle */
gid('v-mode').onclick=function(){
  STATE.theme.mode = STATE.theme.mode==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-mode',STATE.theme.mode);
  gid('root').innerHTML=renderPageHTML(STATE,{});
};
/* font switch — Notion-style 3 typefaces (Default / Serif / Mono) */
var FONTS=['sans','serif','mono'], FLBL={sans:'Aa Sans',serif:'Aa Serif',mono:'Aa Mono'};
gid('v-font').textContent=FLBL[STATE.theme.font]||'Aa Sans';
gid('v-font').onclick=function(){
  var i=FONTS.indexOf(STATE.theme.font); STATE.theme.font=FONTS[(i+1)%FONTS.length];
  document.documentElement.setAttribute('data-font',STATE.theme.font);
  gid('v-font').textContent=FLBL[STATE.theme.font];
};
/* slides */
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

/* =========================================================
   PowerPoint (.pptx) — pptxgenjs CDN 로드 후 슬라이드 덱 생성
   ========================================================= */
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

  // 1) 타이틀
  const s1 = baseSlide();
  s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 0.25, fill: { color: accent } });
  s1.addText(`${p.emoji || ''} ${p.name || 'Your Name'}`.trim(), {
    x: 0.8, y: 2.4, w: 11.7, h: 1.2, fontSize: 44, bold: true, color: fg
  });
  s1.addText(p.role || '', { x: 0.8, y: 3.6, w: 11.7, h: 0.7, fontSize: 22, color: accent });
  if (p.tagline) s1.addText(`“${p.tagline}”`, { x: 0.8, y: 4.3, w: 11.7, h: 0.7, fontSize: 16, italic: true, color: faint });

  // 2) 소개 + 기술 스택
  const skills = state.skills.split(',').map((x) => x.trim()).filter(Boolean);
  const s2 = baseSlide();
  s2.addText('소개', { x: 0.8, y: 0.5, w: 11.7, h: 0.6, fontSize: 26, bold: true, color: fg });
  if (state.about) s2.addText(state.about, { x: 0.8, y: 1.3, w: 11.7, h: 2, fontSize: 15, color: fg });
  s2.addText('기술 스택', { x: 0.8, y: 3.4, w: 11.7, h: 0.6, fontSize: 22, bold: true, color: fg });
  s2.addText(skills.length ? skills.join('   •   ') : '—', { x: 0.8, y: 4.1, w: 11.7, h: 2, fontSize: 15, color: faint });

  // 3) 경력 / 프로젝트 / 교육 (있는 것만)
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

  // 4) 연락처
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

  const fname = (p.name || 'portfolio').replace(/\s+/g, '-').toLowerCase();
  await pptx.writeFile({ fileName: `${fname}.pptx` });
}

export function exportPDF(state: PortfolioState) {
  // Change title temporarily for PDF
  const originalTitle = document.title;
  document.title = `${state.profile.name || 'Portfolio'} — Portfolio`;

  // Add printing class
  document.body.classList.add('printing');

  // Trigger print
  window.print();

  // Restore
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
  
  // Role & Tagline Callout
  children.push({
    object: 'block',
    type: 'callout',
    callout: {
      rich_text: [
        {
          type: 'text',
          text: {
            content: `${p.role || '직무'}${p.tagline ? ` — ${p.tagline}` : ''}`
          }
        }
      ],
      icon: {
        type: 'emoji',
        emoji: emoji
      },
      color: 'gray_background'
    }
  });

  // About Section
  children.push({
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: '💡 소개' } }]
    }
  });
  children.push({
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [{ type: 'text', text: { content: state.about || '자기소개 내용이 없습니다.' } }]
    }
  });

  // Skills Section
  const skills = state.skills.split(',').map(s => s.trim()).filter(Boolean);
  if (skills.length > 0) {
    children.push({
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '🛠️ 기술 스택' } }]
      }
    });
    children.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: skills.map((s, idx) => ({
          type: 'text',
          text: { content: s + (idx < skills.length - 1 ? ', ' : '') },
          annotations: { code: true }
        }))
      }
    });
  }

  // Tools
  if (state.tools.length > 0) {
    children.push({
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '🧰 서비스 · 도구' } }]
      }
    });
    children.push({
      object: 'block',
      type: 'paragraph',
      paragraph: {
        rich_text: state.tools.map((t, idx) => ({
          type: 'text',
          text: { content: t + (idx < state.tools.length - 1 ? ', ' : '') },
          annotations: { code: true }
        }))
      }
    });
  }

  // Experience
  if (state.experience.length > 0) {
    children.push({
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '💼 경력' } }]
      }
    });
    state.experience.forEach(exp => {
      children.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ type: 'text', text: { content: `${exp.role || '직무'} · ${exp.company || '회사'}${exp.level ? ` (${exp.level})` : ''}` } }]
        }
      });
      const meta = [];
      if (exp.type) meta.push(exp.type);
      if (exp.period) meta.push(exp.period);
      if (meta.length > 0) {
        children.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: meta.join(' · ') }, annotations: { italic: true } }]
          }
        });
      }
      if (exp.desc) {
        children.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: exp.desc } }]
          }
        });
      }
    });
  }

  // Projects
  if (state.projects.length > 0) {
    children.push({
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '🚀 프로젝트' } }]
      }
    });
    state.projects.forEach(proj => {
      children.push({
        object: 'block',
        type: 'heading_3',
        heading_3: {
          rich_text: [{ type: 'text', text: { content: `${proj.name || '프로젝트'}${proj.period ? ` (${proj.period})` : ''}` } }]
        }
      });
      if (proj.role) {
        children.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              { type: 'text', text: { content: '담당 역할: ' }, annotations: { bold: true } },
              { type: 'text', text: { content: proj.role } }
            ]
          }
        });
      }
      if (proj.desc) {
        children.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: proj.desc } }]
          }
        });
      }
      if (proj.result) {
        children.push({
          object: 'block',
          type: 'callout',
          callout: {
            rich_text: [
              { type: 'text', text: { content: '성과: ' }, annotations: { bold: true } },
              { type: 'text', text: { content: proj.result } }
            ],
            icon: { type: 'emoji', emoji: '✨' },
            color: 'blue_background'
          }
        });
      }
      
      const links = [];
      if (proj.repo) links.push({ text: 'GitHub', url: proj.repo });
      if (proj.demo) links.push({ text: '데모', url: proj.demo });
      if (links.length > 0) {
        children.push({
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: links.map((lnk, idx) => ({
              type: 'text',
              text: { content: lnk.text + (idx < links.length - 1 ? ' · ' : ''), link: { url: lnk.url } }
            }))
          }
        });
      }
    });
  }

  // Custom Sections
  if (state.custom && state.custom.length > 0) {
    state.custom.forEach(sec => {
      if (!sec.title) return;
      children.push({
        object: 'block',
        type: 'heading_2',
        heading_2: {
          rich_text: [{ type: 'text', text: { content: `${sec.emoji ? sec.emoji + ' ' : ''}${sec.title}` } }]
        }
      });
      sec.items.forEach(item => {
        children.push({
          object: 'block',
          type: 'heading_3',
          heading_3: {
            rich_text: [{ type: 'text', text: { content: item.title || '항목' } }]
          }
        });
        const meta = [];
        if (item.sub) meta.push(item.sub);
        if (item.period) meta.push(item.period);
        if (meta.length > 0) {
          children.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: meta.join(' · ') }, annotations: { italic: true } }]
            }
          });
        }
        if (item.desc) {
          children.push({
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: item.desc } }]
            }
          });
        }
      });
    });
  }

  // Education
  if (state.education.length > 0) {
    children.push({
      object: 'block',
      type: 'heading_2',
      heading_2: {
        rich_text: [{ type: 'text', text: { content: '🎓 교육' } }]
      }
    });
    state.education.forEach(edu => {
      children.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [
            { type: 'text', text: { content: edu.school || '학교' }, annotations: { bold: true } },
            { type: 'text', text: { content: ` · ${edu.degree || '전공'}` } },
            { type: 'text', text: { content: edu.period ? ` (${edu.period})` : '' }, annotations: { italic: true } }
          ]
        }
      });
    });
  }

  // Contact
  children.push({
    object: 'block',
    type: 'heading_2',
    heading_2: {
      rich_text: [{ type: 'text', text: { content: '📬 연락처' } }]
    }
  });
  if (p.email) {
    children.push({
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: `✉️ 이메일: ${p.email}` } }]
      }
    });
  }
  if (p.github) {
    children.push({
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', text: { content: '🔗 GitHub: ' } },
          { type: 'text', text: { content: p.github, link: { url: `https://github.com/${p.github.replace(/^@/, '')}` } } }
        ]
      }
    });
  }
  if (p.website) {
    children.push({
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [
          { type: 'text', text: { content: '🌐 웹사이트: ' } },
          { type: 'text', text: { content: p.website, link: { url: p.website } } }
        ]
      }
    });
  }
  if (p.location) {
    children.push({
      object: 'block',
      type: 'bulleted_list_item',
      bulleted_list_item: {
        rich_text: [{ type: 'text', text: { content: `📍 위치: ${p.location}` } }]
      }
    });
  }

  const payload = {
    parent: { page_id: parentPageId.replace(/-/g, '') },
    icon: { type: 'emoji', emoji: emoji },
    properties: {
      title: {
        title: [
          {
            type: 'text',
            text: { content: `${name} 포트폴리오` }
          }
        ]
      }
    },
    children: children
  };

  const targetUrl = 'https://api.notion.com/v1/pages';
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

  const res = await fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || 'Notion API call failed');
  }

  const resData = await res.json();
  return resData.url;
}

// =========================================================
// Netlify 원클릭 배포 유틸리티
// =========================================================

export async function exportToNetlify(state: PortfolioState, token: string): Promise<string> {
  const htmlContent = buildStandaloneHTML(state);
  
  // 1. Create a new Netlify site
  const randomName = `pofo-${Math.random().toString(36).substring(2, 8)}`;
  const createRes = await fetch('https://api.netlify.com/api/v1/sites', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: randomName
    })
  });
  
  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(errText || 'Netlify site creation failed');
  }
  
  const siteData = await createRes.json();
  const siteId = siteData.id;
  const siteUrl = siteData.ssl_url || siteData.url;
  
  // 2. Compress index.html into a zip binary using fflate
  const zipData = zipSync({
    'index.html': new TextEncoder().encode(htmlContent)
  });
  
  // 3. Upload deploy zip file
  const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/zip'
    },
    body: zipData
  });
  
  if (!deployRes.ok) {
    const errText = await deployRes.text();
    throw new Error(errText || 'Netlify deploy upload failed');
  }
  
  return siteUrl;
}

export function downloadZip(filename: string, htmlContent: string) {
  const zipData = zipSync({
    'index.html': new TextEncoder().encode(htmlContent)
  });
  const blob = new Blob([zipData], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 100);
}
