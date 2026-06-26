import { PortfolioState } from '../types';

export { gzipB64, gunzipB64, buildShareURL, qrSrc, parseShareHash } from './export-share';
export { buildStandaloneHTML, exportPPTX, exportPDF, exportToNotionAPI, exportToNetlify, downloadZip } from './export-external';

export function toMarkdown(state: PortfolioState): string {
  const p = state.profile;
  let md = '';

  const tgt = state.target;
  if (tgt?.company?.trim()) {
    md += `> 🎯 **${tgt.company} 지원용**${tgt.position?.trim() ? ` · ${tgt.position}` : ''}\n`;
    if (tgt.motivation?.trim()) md += `>\n> 지원 동기 · ${tgt.motivation}\n`;
    md += `\n`;
  }

  md += `# ${p.emoji || '👋'} ${p.name || '이름'}\n\n`;
  md += `**${p.role || '직무'}** — ${p.tagline || '한 줄 태그라인'}\n\n`;

  md += `## 💡 소개\n\n${state.about || '_여기에 자기소개를 작성하세요._'}\n\n`;

  const skills = state.skills.split(',').map(s => s.trim()).filter(Boolean);
  md += `## 🛠️ 기술 스택\n\n${skills.length ? skills.join(', ') : '_기술 스택을 입력하세요_'}\n\n`;

  if (state.tools.length > 0) {
    md += `## 🧰 서비스 · 도구\n\n${state.tools.join(', ')}\n\n`;
  }

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

  if (state.projects.length > 0) {
    md += `## 🚀 프로젝트\n\n`;
    state.projects.forEach(proj => {
      md += `### ${proj.name || '프로젝트'}${proj.period ? ` (${proj.period})` : ''}\n`;
      if (proj.image) md += `![${proj.name || '프로젝트'}](${proj.image})\n\n`;
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

  if (state.education.length > 0) {
    md += `## 🎓 교육\n\n`;
    state.education.forEach(edu => {
      md += `- **${edu.school || '학교'}** · ${edu.degree || '전공'}${edu.period ? ` _(${edu.period})_` : ''}\n`;
    });
    md += '\n';
  }

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

  html += `<h1 style="font-size: 32px; font-weight: 700; margin-top: 0; margin-bottom: 8px; color: ${textColor}; display: flex; align-items: center; gap: 8px;">`;
  if (p.emoji) html += `<span>${p.emoji}</span> `;
  html += `<span>${p.name || '이름'}</span></h1>`;

  html += `<div style="background-color: ${isDark ? '#262626' : '#F1F1EF'}; border-left: 4px solid ${accent}; padding: 16px; border-radius: 4px; margin-bottom: 24px;">`;
  html += `<div style="font-weight: 600; font-size: 16px; margin-bottom: 4px; color: ${textColor};">${p.role || '직무'}</div>`;
  if (p.tagline) {
    html += `<div style="font-size: 14px; color: ${isDark ? '#A0A0A0' : '#7A786F'}; font-style: italic;">"${p.tagline}"</div>`;
  }
  html += `</div>`;

  html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">💡 소개</h2>`;
  html += `<p style="font-size: 15px; margin-bottom: 24px; white-space: pre-wrap;">${state.about || '_자기소개를 작성하세요._'}</p>`;

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

  if (state.tools.length > 0) {
    html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">🧰 서비스 · 도구</h2>`;
    html += `<div style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 6px;">`;
    state.tools.forEach(t => {
      html += `<span style="background-color: ${isDark ? '#2A4365' : '#EBF8FF'}; color: ${isDark ? '#90CDF4' : '#2B6CB0'}; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: 500; display: inline-block; font-family: monospace;">${t}</span>`;
    });
    html += `</div>`;
  }

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

  if (state.education.length > 0) {
    html += `<h2 style="font-size: 20px; font-weight: 600; border-bottom: 1px solid ${isDark ? '#3F3F46' : '#E4E4E7'}; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; color: ${textColor};">🎓 교육</h2>`;
    html += `<ul style="margin-top: 0; padding-left: 20px; font-size: 15px;">`;
    state.education.forEach(edu => {
      html += `<li style="margin-bottom: 6px;"><strong>${edu.school || '학교'}</strong> · ${edu.degree || '전공'}${edu.period ? ` <span style="font-size: 13px; color: ${isDark ? '#A0A0A0' : '#7A786F'};">(${edu.period})</span>` : ''}</li>`;
    });
    html += `</ul>`;
  }

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
