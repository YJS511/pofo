import { PortfolioState } from '../types';

export { gzipB64, gunzipB64, buildShareURL, qrSrc, parseShareHash } from './export-share';
export { buildStandaloneHTML, exportPPTX, exportPDF, exportToNotionAPI, exportToNetlify, downloadZip } from './export-external';

// 마크다운 링크 인젝션 방지: 스킴 강제 + 괄호·공백 인코딩
function mdUrl(u: any): string {
  const s = String(u || '').trim();
  if (!s) return '';
  const safe = /^(https?:\/\/|mailto:)/i.test(s) ? s : 'https://' + s;
  return safe.replace(/[()\s<>]/g, (c) => encodeURIComponent(c));
}

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
      if (proj.repo) links.push(`[GitHub](${mdUrl(proj.repo)})`);
      if (proj.demo) links.push(`[데모](${mdUrl(proj.demo)})`);
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

export function exportJSON(state: PortfolioState): string {
  return JSON.stringify(state, null, 2);
}
