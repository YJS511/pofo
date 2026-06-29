import { PortfolioState } from '../types';

function esc(s: any): string {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string
  ));
}

// 유한대학교 이력서 양식(표 형식) 재현 — A4 인쇄 최적화
export function buildResumeHTML(state: PortfolioState, opts: { autoPrint?: boolean } = {}): string {
  const autoPrint = opts.autoPrint !== false;
  const p = state.profile;
  const t = state.target || { company: '', position: '', motivation: '' };
  const STT: Record<string, string> = { acquired: '취득', preparing: '준비 중', planned: '취득 예정' };

  // 학력 행 (최소 2행 확보)
  const eduItems = state.education || [];
  let eduRows = eduItems.map((e) =>
    `<tr><td>${esc(e.period)}</td><td>${esc(e.school)}</td><td>${esc(e.degree)}</td><td></td><td></td><td></td></tr>`
  ).join('');
  for (let i = eduItems.length; i < 2; i++) eduRows += `<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td></tr>`;

  // 자격·면허 행 (최소 3행)
  const certItems = state.certifications || [];
  let certRows = certItems.map((c) => {
    const name = c.status && c.status !== 'acquired' ? `${esc(c.name)} (${STT[c.status]})` : esc(c.name);
    return `<tr><td>${name}</td><td></td><td>${esc(c.date)}</td></tr>`;
  }).join('');
  for (let i = certItems.length; i < 3; i++) certRows += `<tr><td>&nbsp;</td><td></td><td></td></tr>`;

  // 교육 / 활동 / 수상 (custom 섹션의 항목들)
  const actItems: { period: string; text: string }[] = [];
  (state.custom || []).forEach((cs) => {
    (cs.items || []).forEach((it) => {
      if (!it.title) return;
      const parts = [it.title, it.sub, it.desc].filter(Boolean).join(' · ');
      actItems.push({ period: it.period || '', text: parts });
    });
  });
  let actRows = actItems.map((a) =>
    `<tr><td>${esc(a.period)}</td><td class="left">${esc(a.text)}</td></tr>`
  ).join('');
  for (let i = actItems.length; i < 3; i++) actRows += `<tr><td>&nbsp;</td><td></td></tr>`;

  // 보유기술
  const skills = (state.skills || '').split(',').map((s) => s.trim()).filter(Boolean);
  const skillText = [...skills, ...(state.tools || [])].map(esc).join(', ');

  // 자기소개서: 지원동기에 target.motivation + about 배치, 나머지는 빈칸
  const motivText = [t.motivation, state.about].filter((s) => s && s.trim()).map(esc).join('\n\n');
  const coverSections = [
    ['성장 배경', ''],
    ['성격 및 재능 (장·단점)', ''],
    ['학교 생활', ''],
    ['경력 사항', (state.experience || []).map((x) => `• ${esc(x.role)}${x.company ? ` (${esc(x.company)})` : ''}${x.period ? ` ${esc(x.period)}` : ''}${x.desc ? `\n  ${esc(x.desc)}` : ''}`).join('\n')],
    ['지원 동기', motivText],
    ['입사 후 포부', ''],
  ];
  const coverHTML = coverSections.map(([title, body]) =>
    `<div class="cv-sec"><div class="cv-h">${esc(title)}</div><div class="cv-b">${body || '&nbsp;'}</div></div>`
  ).join('');

  const today = new Date();
  const yy = today.getFullYear(), mm = today.getMonth() + 1, dd = today.getDate();

  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8">
<title>${esc(p.name || '이력서')} — 이력서</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Pretendard Variable',-apple-system,sans-serif;color:#000;background:#eee;font-size:10pt;line-height:1.45}
.page{width:210mm;min-height:297mm;margin:12px auto;padding:16mm 15mm;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.12)}
.doc-title{text-align:center;font-size:24pt;font-weight:800;letter-spacing:10px;margin-bottom:14px}
.apply{display:flex;justify-content:flex-end;gap:18px;font-size:9.5pt;margin-bottom:8px}
.apply b{font-weight:700}
table{width:100%;border-collapse:collapse;margin-bottom:12px;table-layout:fixed}
th,td{border:1px solid #555;padding:5px 7px;font-size:9.3pt;vertical-align:middle;text-align:center;word-break:break-word}
td.left{text-align:left}
.lbl{background:#f1f1f1;font-weight:700;white-space:nowrap}
.sec-h{background:#e7e7e7;font-weight:800;text-align:left;font-size:9.8pt;letter-spacing:1px}
.tags{text-align:left}
.sign{display:flex;flex-direction:column;align-items:flex-end;gap:8px;margin-top:18px;font-size:10pt}
.sign .date{letter-spacing:3px}
.sign .nm{letter-spacing:6px}
.cv-sec{border:1px solid #555;margin-bottom:10px}
.cv-h{background:#e7e7e7;font-weight:800;padding:6px 8px;border-bottom:1px solid #555;font-size:9.8pt}
.cv-b{padding:9px 10px;min-height:60px;white-space:pre-wrap;font-size:9.5pt;color:#222}
@media print{ body{background:#fff} .page{margin:0;box-shadow:none;width:auto;min-height:auto;padding:13mm} .pb{page-break-before:always} }
@page{size:A4;margin:0}
</style></head>
<body>

<div class="page">
  <div class="doc-title">이 력 서</div>
  <div class="apply"><span><b>응시회사</b> ${esc(t.company) || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span><span><b>응시직종</b> ${esc(t.position) || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}</span></div>

  <table>
    <colgroup><col style="width:15%"><col style="width:35%"><col style="width:15%"><col style="width:35%"></colgroup>
    <tr><td class="sec-h" colspan="4">인 적 사 항</td></tr>
    <tr><td class="lbl">성명</td><td>${esc(p.name)}</td><td class="lbl">생년월일</td><td></td></tr>
    <tr><td class="lbl">휴대폰</td><td></td><td class="lbl">전화번호</td><td></td></tr>
    <tr><td class="lbl">이메일</td><td class="left" colspan="3">${esc(p.email)}</td></tr>
    <tr><td class="lbl">현주소</td><td class="left" colspan="3">${esc(p.location)}</td></tr>
  </table>

  <table>
    <colgroup><col style="width:22%"><col style="width:24%"><col style="width:22%"><col style="width:10%"><col style="width:12%"><col style="width:10%"></colgroup>
    <tr><td class="sec-h" colspan="6">학 력 사 항</td></tr>
    <tr><td class="lbl">재학기간</td><td class="lbl">학교명</td><td class="lbl">전공</td><td class="lbl">성적</td><td class="lbl">졸업구분</td><td class="lbl">소재지</td></tr>
    ${eduRows}
  </table>

  <table>
    <colgroup><col style="width:50%"><col style="width:30%"><col style="width:20%"></colgroup>
    <tr><td class="sec-h" colspan="3">자 격 · 면 허</td></tr>
    <tr><td class="lbl">자격·면허명</td><td class="lbl">시행기관</td><td class="lbl">취득년월</td></tr>
    ${certRows}
  </table>

  <table>
    <colgroup><col style="width:22%"><col style="width:78%"></colgroup>
    <tr><td class="sec-h" colspan="2">교육 / 활동 / 수상</td></tr>
    <tr><td class="lbl">기간</td><td class="lbl">교육 · 활동 및 수상 내역</td></tr>
    ${actRows}
  </table>

  <table>
    <colgroup><col style="width:25%"><col style="width:25%"><col style="width:25%"><col style="width:25%"></colgroup>
    <tr><td class="sec-h" colspan="4">외 국 어 / 병 역</td></tr>
    <tr><td class="lbl">외국어</td><td></td><td class="lbl">병역</td><td></td></tr>
  </table>

  <table>
    <colgroup><col style="width:15%"><col style="width:85%"></colgroup>
    <tr><td class="sec-h" colspan="2">보 유 기 술</td></tr>
    <tr><td class="lbl">보유기술</td><td class="left tags">${skillText}</td></tr>
  </table>

  <div class="sign">
    <div>위의 모든 기재 사항은 사실과 다름이 없습니다.</div>
    <div class="date">${yy} 년 &nbsp; ${mm} 월 &nbsp; ${dd} 일</div>
    <div class="nm">성명 : ${esc(p.name)} &nbsp; (서명)</div>
  </div>
</div>

<div class="page pb">
  <div class="doc-title">자 기 소 개 서</div>
  ${coverHTML}
</div>
${autoPrint ? `<script>window.onload=function(){setTimeout(function(){window.print();},500);};</script>` : ''}
</body></html>`;
}

// 새 창에서 이력서를 열고 인쇄(PDF 저장) 유도
export function exportResumePDF(state: PortfolioState) {
  const html = buildResumeHTML(state);
  const w = window.open('', '_blank');
  if (!w) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(state.profile.name || 'resume').replace(/\s+/g, '-')}-이력서.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }
  w.document.write(html);
  w.document.close();
}
