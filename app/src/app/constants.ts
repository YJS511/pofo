export const GRADIENTS: Record<string, string> = {
  sunset: 'linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',
  ocean: 'linear-gradient(135deg, #48C6EF 0%, #6F86D6 100%)',
  forest: 'linear-gradient(135deg, #0BA360 0%, #3CBA92 100%)',
  peach: 'linear-gradient(120deg, #FAD0C4 0%, #FFD1FF 100%)',
  midnight: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)',
  amber: 'linear-gradient(120deg, #F6D365 0%, #FDA085 100%)',
  graphite: 'linear-gradient(135deg, #3A3A3A 0%, #0B0B0B 100%)'
};

import { Theme } from './types';
export { PORTFOLIO_PRESETS } from './portfolioPresets';
export type { PortfolioPreset } from './portfolioPresets';

export interface TemplatePreset {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  theme: Partial<Theme>;
}

export interface StylePreset {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  theme: Partial<Theme>;
}

// 2. 템플릿 (레이아웃 & 커버 배너 구성 프리셋)
export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'website_hub',
    name: '와이드 포트폴리오',
    emoji: '🌐',
    desc: '넓은 본문에 커버 배너가 있는 기본 노션 스타일',
    theme: { layout: 'notion', wide: true, cover: 'sunset', noCover: false }
  },
  {
    id: 'compact_cv',
    name: '심플 이력서',
    emoji: '📄',
    desc: '커버 없이 본문부터 바로 시작하는 깔끔한 1단 서식',
    theme: { layout: 'minimal', wide: false, cover: 'graphite', noCover: true }
  },
  {
    id: 'aside_dashboard',
    name: '사이드바 대시보드',
    emoji: '🗂️',
    desc: '왼쪽 프로필 패널 + 오른쪽 상세 이력 2단 구성',
    theme: { layout: 'sidebar', wide: true, cover: 'ocean', noCover: false }
  },
  {
    id: 'tabbed_cv',
    name: '탭 네비게이션',
    emoji: '📁',
    desc: '기술·경력·학력을 탭으로 분리한 한 화면 구성',
    theme: { layout: 'tab', wide: true, cover: 'forest', noCover: false }
  },
  {
    id: 'narrow_notion',
    name: '좁은 노션 페이지',
    emoji: '📝',
    desc: '커버 배너와 좁은 본문 폭의 집중형 레이아웃',
    theme: { layout: 'notion', wide: false, cover: 'midnight', noCover: false }
  },
  {
    id: 'minimal_wide',
    name: '와이드 미니멀',
    emoji: '🖼️',
    desc: '커버 없이 넓은 본문으로 콘텐츠에 집중하는 구성',
    theme: { layout: 'minimal', wide: true, cover: 'graphite', noCover: true }
  }
];

// 3. 스타일 (디자인 테마 스타일 & 폰트 & 강조색 프리셋)
export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'notion_classic',
    name: '클래식 노션',
    emoji: '📄',
    desc: '노션 기본 스타일 — 정갈한 산세리프와 그레이 톤 태그',
    theme: { style: 'classic', font: 'sans', accent: '#4a4a4a', mode: 'light' }
  },
  {
    id: 'modern_line',
    name: '모던 아웃라인',
    emoji: '➖',
    desc: '외곽선 태그와 대문자 섹션 헤더',
    theme: { style: 'line', font: 'sans', accent: '#d9730d', mode: 'light' }
  },
  {
    id: 'bold_highlight',
    name: '볼드 하이라이트',
    emoji: '💥',
    desc: '강조색 언더바 헤더와 채워진 태그',
    theme: { style: 'bold', font: 'sans', accent: '#0b6e99', mode: 'light' }
  },
  {
    id: 'terminal_mono',
    name: '개발자 터미널',
    emoji: '🖥️',
    desc: '모노스페이스 폰트 기반 코딩 터미널 감성',
    theme: { style: 'mono', font: 'mono', accent: '#0f7b6c', mode: 'light' }
  },
  {
    id: 'dark_classic',
    name: '다크 클래식',
    emoji: '🌙',
    desc: '어두운 배경에 깔끔한 산세리프 — 눈이 편한 다크 모드',
    theme: { style: 'classic', font: 'sans', accent: '#6c8ebf', mode: 'dark' }
  },
  {
    id: 'serif_elegant',
    name: '세리프 엘레강스',
    emoji: '✒️',
    desc: '세리프 폰트로 격조 있는 인쇄물 느낌',
    theme: { style: 'classic', font: 'serif', accent: '#7c5c3e', mode: 'light' }
  }
];

// 단일 색상에서 부드러운 그라데이션 생성 (밝게→원색→어둡게)
export function makeGradient(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const mix = (c: number, t: number, amt: number) => Math.round(c + (t - c) * amt);
  const toHex = (rr: number, gg: number, bb: number) =>
    '#' + [rr, gg, bb].map((v) => v.toString(16).padStart(2, '0')).join('');
  const light = toHex(mix(r, 255, 0.35), mix(g, 255, 0.35), mix(b, 255, 0.35));
  const dark = toHex(mix(r, 0, 0.3), mix(g, 0, 0.3), mix(b, 0, 0.3));
  return `linear-gradient(135deg, ${light} 0%, ${hex} 52%, ${dark} 100%)`;
}

export const ACCENT_SWATCHES = [
  '#4a4a4a', '#e03e3e', '#d9730d', '#cb912f',
  '#0f7b6c', '#0b6e99', '#6940a5', '#ad1a72'
];

export const EMOJI_CATS = [
  { name: '표정', list: ['😀','😁','😊','😍','🤗','🤔','😎','🥳','🤩','😇','🙃','😌'] },
  { name: '손', list: ['👋','👍','👏','🙌','🤝','✌️','🤞','👌','🤙','🖖','✊','💪'] },
  { name: '사물', list: ['💼','💻','🎨','🎯','🚀','💡','🔥','⚡','🌟','✨','🎉','🎊'] },
  { name: '동물', list: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮'] }
];

export const TOOL_CATS = [
  { name: '디자인', items: ['Figma','Sketch','Adobe XD','Illustrator','Photoshop','InVision','Framer'] },
  { name: '개발', items: ['VS Code','IntelliJ','WebStorm','Xcode','Android Studio','Sublime Text','Vim'] },
  { name: '협업', items: ['Slack','Discord','Notion','Jira','Confluence','Linear','Asana','Trello'] },
  { name: '버전관리', items: ['GitHub','GitLab','Bitbucket','Sourcetree'] },
  { name: '배포', items: ['Vercel','Netlify','AWS','GCP','Azure','Heroku','Docker','Kubernetes'] }
];

export const STEPS = [
  { id: 'profile', emoji: '👤', nav: '기본 정보', title: '기본 정보' },
  { id: 'contact', emoji: '📧', nav: '연락처 · 링크', title: '연락처 및 링크' },
  { id: 'about', emoji: '💡', nav: '소개', title: '자기소개' },
  { id: 'skills', emoji: '🛠️', nav: '기술 스택', title: '기술 스택' },
  { id: 'tools', emoji: '🧰', nav: '서비스 · 도구', title: '서비스 및 도구' },
  { id: 'experience', emoji: '💼', nav: '경력', title: '경력' },
  { id: 'projects', emoji: '🚀', nav: '프로젝트', title: '프로젝트' },
  { id: 'education', emoji: '🎓', nav: '교육', title: '학력' },
  { id: 'custom', emoji: '✨', nav: '커스텀 섹션', title: '커스텀 섹션' }
];

export const EMP_TYPES = ['정규직','계약직','인턴','프리랜서','파견','아르바이트','창업'];
export const JOB_LEVELS = ['사원','주임','대리','과장','차장','부장','선임','책임','수석','팀장','리드','Junior','Mid-level','Senior','Staff','Principal'];

export const LINK_FIELDS = [
  { key: 'label', placeholder: '링크 이름 (예: LinkedIn)', fullWidth: false },
  { key: 'url', placeholder: 'https://...', fullWidth: false }
];

export interface GuideStep {
  type: 'intro' | 'icon' | 'text' | 'textarea' | 'skills' | 'tools' | 'links' | 'custom' | 'section' | 'done';
  kicker?: string;
  q?: string;
  hint?: string;
  ph?: string;
  path?: string;
  key?: string;
  fields?: any[];
  label?: string;
}

export const GUIDE_STEPS: GuideStep[] = [
  { type: 'intro' },
  { type: 'icon', kicker: '아이콘', q: '페이지 아이콘을 골라주세요', hint: '이모지를 고르거나 로고·사진을 업로드할 수 있어요.' },
  { type: 'text', path: 'profile.name', kicker: '이름', q: '이름이 무엇인가요?', ph: '홍길동' },
  { type: 'text', path: 'profile.role', kicker: '직무', q: '어떤 일을 하시나요?', hint: '직무나 타이틀을 적어주세요.', ph: '프론트엔드 개발자' },
  { type: 'text', path: 'profile.tagline', kicker: '태그라인', q: '한 줄로 자신을 소개한다면?', hint: '제목 아래 작게 표시됩니다.', ph: '사용자 경험에 진심인 개발자' },
  { type: 'text', path: 'profile.location', kicker: '위치', q: '어디에서 일하시나요?', ph: '서울, 대한민국' },
  { type: 'text', path: 'profile.email', kicker: '이메일', q: '이메일 주소를 알려주세요', ph: 'me@example.com' },
  { type: 'text', path: 'profile.github', kicker: 'GitHub', q: 'GitHub 주소가 있나요?', ph: 'github.com/username' },
  { type: 'text', path: 'profile.website', kicker: '웹사이트', q: '웹사이트나 블로그는?', ph: 'mysite.dev' },
  { type: 'textarea', path: 'about', kicker: '소개', q: '자기소개를 적어주세요', hint: '노션 콜아웃 블록으로 표시돼요. 줄바꿈도 반영됩니다.', ph: '안녕하세요! 저는 ...' },
  { type: 'skills', path: 'skills', kicker: '기술 스택', q: '어떤 기술을 다루나요?', hint: '쉼표(,)로 구분하면 색상 태그로 자동 변환돼요.', ph: 'React, TypeScript, Node.js' },
  { type: 'tools', kicker: '서비스 · 도구', q: '사용하는 서비스 · 도구를 골라주세요', hint: '카테고리별로 클릭하여 선택하세요. 전공에 맞는 도구가 표시됩니다.' },
  { type: 'links', kicker: '링크', q: '추가 링크가 있나요?', hint: 'LinkedIn, Behance, 블로그 등 자유롭게 추가하세요.' },
  { type: 'section', key: 'experience', kicker: '경력', q: '경력을 추가해볼까요?', hint: '회사·직무·기간·성과를 자유롭게 추가하세요.', label: '경력' },
  { type: 'section', key: 'projects', kicker: '프로젝트', q: '대표 프로젝트가 있나요?', hint: '사용 기술과 링크도 함께 정리해보세요.', label: '프로젝트' },
  { type: 'section', key: 'education', kicker: '학력', q: '학력을 추가해주세요', hint: '학교와 전공, 기간을 적어주세요.', label: '학력' },
  { type: 'custom', kicker: '커스텀 섹션', q: '추가 섹션이 필요한가요?', hint: '자격증, 수상 경력, 대외활동 등을 자유롭게 추가하세요.' },
  { type: 'done' }
];

export const EXP_FIELDS = [
  { key: 'company', placeholder: '회사명', fullWidth: false },
  { key: 'role', placeholder: '직무 (예: 프론트엔드 개발자)', fullWidth: false },
  { key: 'level', placeholder: '직급 (예: 책임 / Senior)', fullWidth: false, options: JOB_LEVELS },
  { key: 'type', placeholder: '고용형태', fullWidth: false, type: 'select' as const, options: EMP_TYPES },
  { key: 'period', type: 'month' as const, label: '기간', fullWidth: true },
  { key: 'desc', placeholder: '주요 성과 / 담당 업무', type: 'textarea' as const, fullWidth: true }
];

export const PROJ_FIELDS = [
  { key: 'name', placeholder: '프로젝트명 / 졸업작품명', fullWidth: true },
  { key: 'period', type: 'month' as const, label: '기간 (선택)', fullWidth: true },
  { key: 'role', placeholder: '담당 역할 (예: 팀장 / 프론트엔드, 팀 4명)', fullWidth: true },
  { key: 'tech', placeholder: '사용 기술 (쉼표 구분: React, Node)', fullWidth: true },
  { key: 'desc', placeholder: '프로젝트 설명 / 담당 업무', type: 'textarea' as const, fullWidth: true },
  { key: 'result', placeholder: '주요 성과 (예: 교내 우수상, 사용자 1천 명, 성능 40% 개선)', type: 'textarea' as const, fullWidth: true },
  { key: 'repo', placeholder: 'GitHub 저장소 URL (선택)', fullWidth: false },
  { key: 'demo', placeholder: '데모 / 사이트 URL (선택)', fullWidth: false }
];

export const EDU_FIELDS = [
  { key: 'school', placeholder: '학교 / 교육원 / 학원', fullWidth: false },
  { key: 'degree', placeholder: '전공 / 학위', fullWidth: false },
  { key: 'period', type: 'month' as const, label: '기간', fullWidth: true }
];

export const THEME_CSS = `
:root{
  --font-sans:"Pretendard Variable","Pretendard",ui-sans-serif,-apple-system,"Segoe UI",system-ui,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;
  --font-serif:"Nanum Myeongjo","Lyon Text","Iowan Old Style",Georgia,ui-serif,serif;
  --font-mono:"JetBrains Mono","SFMono-Regular",ui-monospace,Menlo,Consolas,monospace;
  --font-active:var(--font-sans);
  --bg:#ffffff; --text:rgb(55,53,47); --text-light:rgba(55,53,47,.65); --text-faint:rgba(55,53,47,.42);
  --divider:rgba(55,53,47,.09); --hover:rgba(55,53,47,.055); --active-bg:rgba(74,74,74,.12);
  --callout-bg:rgb(247,246,243); --sidebar-bg:rgb(251,251,250); --canvas-bg:#ffffff;
  --card-bg:#ffffff; --input-bg:rgba(55,53,47,.055); --menu-bg:#ffffff;
  --shadow:0 0 0 1px rgba(15,15,15,.05),0 8px 28px rgba(15,15,15,.14);
  --accent:#4A4A4A;
}
[data-mode="dark"]{
  --bg:rgb(25,25,25); --text:rgba(255,255,255,.9); --text-light:rgba(255,255,255,.62); --text-faint:rgba(255,255,255,.4);
  --divider:rgba(255,255,255,.11); --hover:rgba(255,255,255,.055); --active-bg:rgba(74,74,74,.22);
  --callout-bg:rgb(37,37,37); --sidebar-bg:rgb(32,32,32); --canvas-bg:rgb(25,25,25);
  --card-bg:rgb(32,32,32); --input-bg:rgba(255,255,255,.06); --menu-bg:rgb(37,37,37);
  --shadow:0 0 0 1px rgba(0,0,0,.4),0 10px 32px rgba(0,0,0,.5);
}
[data-font="sans"]{--font-active:var(--font-sans)}
[data-font="serif"]{--font-active:var(--font-serif)}
[data-font="mono"]{--font-active:var(--font-mono)}
`;

export const PAGE_CSS = `
.notion-page{max-width:740px;margin:0 auto;padding:0 0 120px;font-family:var(--font-active)}
.np-cover{height:200px;width:100%;position:relative}
.np-body{padding:0 52px;position:relative}
.np-icon{font-size:74px;line-height:1;margin-top:-44px;margin-bottom:6px;position:relative;
  width:90px;height:90px;display:grid;place-items:center}
.np-icon-img{width:90px;height:90px;border-radius:18px;object-fit:cover;box-shadow:0 4px 14px rgba(15,15,15,.18)}
.np-icon-img.circ{border-radius:50%}
.lay-notion.no-icon .np-body{padding-top:30px}
.lay-notion.no-icon .np-title,.lay-sidebar.no-icon .np-aside .np-title{margin-top:0}
.lay-notion.no-cover .np-body{padding-top:48px}
.lay-notion.no-cover .np-icon{margin-top:0}
.lay-minimal.no-cover .np-body{padding-top:46px}
.lay-sidebar.no-cover .np-sb-grid{padding-top:46px}
.lay-sidebar.no-cover .np-icon{margin-top:0}
.no-cover.no-icon .np-body{padding-top:40px}
.np-title{font-size:40px;font-weight:800;letter-spacing:-.025em;line-height:1.1;margin:6px 0 4px;word-break:break-word}
.np-title.faint{color:var(--text-faint);font-weight:600}
.np-tagline{font-size:16px;color:var(--text-light);line-height:1.5;margin-bottom:18px;font-style:italic}
.np-props{display:flex;flex-direction:column;gap:3px;margin-bottom:22px}
.np-prop{display:flex;align-items:center;gap:8px;font-size:14px;min-height:28px;border-radius:5px;padding:3px 6px;margin-left:-6px}
.np-prop .pk{display:flex;align-items:center;gap:7px;min-width:80px;width:100px;flex-shrink:0;color:var(--text-faint);font-size:13.5px}
.np-prop .pk .pemoji{font-size:14px;width:17px;text-align:center}
.np-prop .pv{color:var(--text);word-break:break-word}
.np-prop a.pv{color:#4A4A4A;text-decoration:none;border-bottom:1px solid rgba(74,74,74,.35)}
.np-callout{display:flex;gap:13px;background:var(--callout-bg);border-radius:9px;padding:16px 17px;margin:6px 0 30px;line-height:1.6;font-size:15px}
.np-callout .ce{font-size:19px;line-height:1.4}
.np-callout .ct{color:var(--text);white-space:pre-wrap}
.np-section{margin-bottom:30px}
.np-h{display:flex;align-items:center;gap:9px;font-size:21px;font-weight:700;letter-spacing:-.01em;margin-bottom:14px;padding-bottom:0}
.np-h .he{font-size:20px}
.np-tags{display:flex;flex-wrap:wrap;gap:7px}
.np-tag{font-size:13px;font-weight:500;padding:4px 10px;border-radius:6px;line-height:1.3}
.np-item{padding:14px 0;border-top:1px solid var(--divider)}
.np-item:first-child{border-top:none;padding-top:2px}
.np-item-top{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:6px 14px}
.np-item-top>div{min-width:0}
.np-item-title{font-size:16px;font-weight:700}
.np-item-sub{font-size:14px;color:var(--text-light);font-weight:500}
.np-emp-badge{display:inline-block;font-size:11px;font-weight:600;padding:2px 7px;border-radius:5px;margin-left:7px;background:var(--input-bg);color:var(--text-light);vertical-align:middle}
.np-item-period{font-size:13px;color:var(--text-faint);white-space:nowrap;flex-shrink:0;font-variant-numeric:tabular-nums}
.np-item-desc{font-size:14.5px;color:var(--text-light);line-height:1.6;margin-top:6px;white-space:pre-wrap}
.np-item-role{font-size:13px;color:var(--text-faint);margin-top:4px;font-weight:500}
.np-item-result{display:flex;gap:8px;align-items:flex-start;margin-top:8px;font-size:14px;color:var(--text-light);line-height:1.55;white-space:pre-wrap}
.np-res-badge{flex-shrink:0;font-size:11px;font-weight:700;padding:2px 7px;border-radius:5px;background:var(--accent);color:#fff;opacity:.9;margin-top:1px}
.np-star{flex-shrink:0;font-size:12.5px;font-weight:600;color:var(--text-faint);margin-left:auto;white-space:nowrap}
.np-item-link{font-size:13.5px;color:#4A4A4A;text-decoration:none;display:inline-flex;align-items:center;gap:5px;margin-top:8px}
.np-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:11px}
.np-link-btn{display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:600;color:var(--text);
  background:var(--input-bg);padding:6px 12px;border-radius:7px;text-decoration:none;transition:background .12s,color .12s}
.np-link-btn:hover{background:var(--active-bg);color:#4A4A4A}
.np-lnk-ic{width:15px;height:15px}
.np-proj-tags{margin-top:9px}
.np-gh-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.np-gh-card{display:block;border:1px solid var(--divider);border-radius:10px;padding:14px 15px;transition:border .12s,box-shadow .12s;text-decoration:none;color:inherit}
.np-gh-card:hover{border-color:var(--accent);box-shadow:0 4px 14px rgba(15,15,15,.06)}
.np-gh-top{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:5px}
.np-gh-name{font-size:14.5px;font-weight:700;color:var(--accent);word-break:break-all}
.np-gh-star{flex-shrink:0;font-size:12px;font-weight:600;color:var(--text-faint)}
.np-gh-desc{font-size:13px;color:var(--text-light);line-height:1.5;margin-bottom:8px}
.np-gh-lang{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--text-faint)}
.np-gh-dot{width:9px;height:9px;border-radius:50%;background:var(--accent);display:inline-block}
@media(max-width:720px){.np-gh-grid{grid-template-columns:1fr}}
.np-empty-ph{color:var(--text-faint);font-size:14px;font-style:italic;padding:6px 0}
.pv-edit{cursor:pointer;border-radius:6px;transition:background .12s,box-shadow .12s;position:relative}
.pv-edit:hover{background:var(--active-bg);box-shadow:0 0 0 6px var(--active-bg)}
.np-prop .pv-link{color:var(--accent);word-break:break-word}

/* ===== LAYOUT: SIDEBAR ===== */
.lay-sidebar.notion-page{max-width:940px}
.lay-sidebar .np-cover{height:132px}
.lay-sidebar .np-sb-grid{display:grid;grid-template-columns:264px 1fr;gap:0;align-items:start;padding-top:30px}
.lay-sidebar .np-aside{min-width:0;padding-right:30px;margin-right:30px;border-right:1px solid var(--divider)}
.lay-sidebar .np-aside .np-icon{margin-top:0;margin-bottom:12px}
.lay-sidebar .np-aside .np-title{font-size:27px;margin:0 0 4px;line-height:1.15}
.lay-sidebar .np-aside .np-tagline{font-size:14px;margin-bottom:18px}
.lay-sidebar .np-aside .np-props{margin-bottom:0}
.lay-sidebar .np-aside .np-prop{padding:3px 0;margin-left:0}
.lay-sidebar .np-aside .np-prop .pk{width:62px;min-width:62px;font-size:12.5px}
.lay-sidebar .np-aside .np-section{margin:22px 0 0;padding-top:18px;border-top:1px solid var(--divider)}
.lay-sidebar .np-aside .np-h{font-size:15px;margin-bottom:11px}
.lay-sidebar .np-sb-main{min-width:0}
.lay-sidebar .np-sb-main>:first-child{margin-top:0}
.lay-sidebar .np-sb-main .np-callout{margin:0 0 26px}
.lay-sidebar .np-sb-main .np-section{margin-bottom:26px}
@media(max-width:720px){
  .lay-sidebar .np-sb-grid{grid-template-columns:1fr;gap:0;padding-top:20px}
  .lay-sidebar .np-aside{padding-right:0;margin-right:0;border-right:none;border-bottom:1px solid var(--divider);padding-bottom:18px;margin-bottom:22px}
  .np-body{padding-left:20px!important;padding-right:20px!important}
  .np-title,.lay-minimal .np-min-head .np-title{font-size:30px}
}

/* ===== LAYOUT: MINIMAL ===== */
.lay-minimal.notion-page{max-width:680px}
.np-min-accent{height:5px;width:100%}
.lay-minimal .np-body{padding:46px 44px 0}
.lay-minimal .np-min-head{text-align:center;margin-bottom:30px}
.lay-minimal .np-min-head .np-icon{margin:0 auto 12px;width:84px;height:84px}
.lay-minimal .np-min-head .np-title{font-size:36px}
.lay-minimal .np-min-head .np-tagline{margin:6px 0 16px}
.lay-minimal .np-min-head .np-props{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:7px 16px;margin-bottom:0}
.lay-minimal .np-min-head .np-prop{margin-left:0;padding:0;min-height:0}
.lay-minimal .np-min-head .np-prop .pk{display:none}
.lay-minimal .np-min-head .np-prop .pv{font-size:13.5px}
.lay-minimal .np-callout {margin-top:6px}
.lay-minimal .np-h{font-size:18px;justify-content:center;text-align:center}
.lay-minimal .np-section{text-align:center}
.lay-minimal .np-tags{justify-content:center}
.lay-minimal .np-item-top{text-align:left}
.lay-minimal .np-item{text-align:left;max-width:520px;margin:0 auto}
.lay-minimal .np-links,.lay-minimal .np-tags.np-proj-tags{justify-content:flex-start}

/* ===== FULL WIDTH ===== */
.lay-notion.wide.notion-page{max-width:1100px}
.lay-sidebar.wide.notion-page{max-width:1240px}
.lay-minimal.wide.notion-page{max-width:880px}
.lay-tab.wide.notion-page{max-width:1100px}
.wide .np-body{padding-left:72px;padding-right:72px}
.lay-minimal.wide .np-body{padding-left:52px;padding-right:52px}

/* ===== LAYOUT: TAB ===== */
.lay-tab .np-tabbar{display:flex;flex-wrap:wrap;gap:4px;margin:10px 0 26px;border-bottom:1px solid var(--divider)}
.lay-tab .np-tab{padding:10px 15px;font-size:14.5px;font-weight:600;color:var(--text-faint);border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .12s,border-color .12s;white-space:nowrap}
.lay-tab .np-tab:hover{color:var(--text)}
.lay-tab .np-tab.on{color:var(--accent);border-bottom-color:var(--accent)}
.lay-tab .np-tab-pane{display:none}
.lay-tab .np-tab-pane.on{display:block;animation:np-tabfade .26s ease}
.lay-tab .np-tab-pane .np-section{margin-bottom:0}
@keyframes np-tabfade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
@media print{.lay-tab .np-tabbar{display:none}.lay-tab .np-tab-pane{display:block!important;margin-bottom:30px}}

/* ===== SKINS ===== */
.np-prop a.pv{color:var(--accent);border-bottom-color:color-mix(in srgb,var(--accent) 35%,transparent)}
.np-item-link,.np-link-btn:hover{color:var(--accent)}

/* LINE */
.sty-line .np-h{font-size:12.5px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;
  color:var(--text-faint);padding-bottom:9px;margin-bottom:16px;border-bottom:1px solid var(--divider)}
.sty-line .np-h .he{display:none}
.sty-line .np-tag{background:transparent!important;border:1px solid var(--divider);color:var(--text-light)!important;font-weight:500}
.sty-line .np-callout{background:transparent;border-radius:0;border-left:3px solid var(--accent);padding:4px 0 4px 18px}
.sty-line .np-callout .ce{display:none}
.sty-line .np-item{border-top:none;padding:9px 0}
.sty-line .np-section{margin-bottom:34px}
.sty-line .np-link-btn{background:transparent;border:1px solid var(--divider)}

/* BOLD */
.sty-bold .np-title{font-size:46px;letter-spacing:-.03em}
.sty-bold .np-h{font-size:25px;font-weight:800;color:var(--accent);gap:11px;margin-bottom:16px}
.sty-bold .np-h::after{content:"";flex:1;height:3px;border-radius:3px;background:var(--accent);opacity:.22;margin-left:8px;min-width:24px}
.sty-bold .np-item-title{font-size:17px}
.sty-bold .np-callout{border-left:4px solid var(--accent)}
.sty-bold.lay-minimal .np-h::after{display:none}

/* MONO */
.sty-mono .np-h{font-family:var(--font-mono);font-size:18px;font-weight:700}
.sty-mono .np-h .he{display:none}
.sty-mono .np-h::before{content:"# ";color:var(--accent)}
.sty-mono .np-title{font-family:var(--font-mono);letter-spacing:-.02em}
.sty-mono .np-tag{font-family:var(--font-mono);background:transparent!important;border:1px solid var(--divider);
  border-radius:4px;color:var(--text-light)!important;font-size:12px}
.sty-mono .np-item-period,.sty-mono .np-prop .pk{font-family:var(--font-mono)}
.sty-mono .np-callout{font-family:var(--font-mono);background:var(--callout-bg);border:1px solid var(--divider);border-radius:6px;font-size:13.5px}
.sty-mono .np-callout .ce{display:none}
.sty-mono .np-callout .ct::before{content:"// ";color:var(--accent)}
.sty-mono .np-link-btn{font-family:var(--font-mono);border-radius:4px}
`;

export const SLIDE_CSS = `
#slides-overlay{position:fixed;inset:0;z-index:200;background:#0c0c0c}
.slide-stage{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden}
.slide-canvas{width:1280px;height:720px;position:relative;
  --bg:#ffffff;--text:#111111;--text-light:#3a3a3c;--text-faint:#8e8e93;--divider:#e5e5ea;--callout-bg:#f2f2f7;
  background:var(--bg);color:var(--text);
  transform-origin:center center;box-shadow:0 30px 90px rgba(0,0,0,.6);overflow:hidden;font-family:var(--font-active)}
.slide{position:absolute;inset:0;padding:74px 88px;display:none;flex-direction:column;opacity:0;
  transition:opacity .4s ease}
.slide.on{display:flex;opacity:1}
.slide-cover{position:absolute;inset:0;opacity:1}
.slide-cover.band{inset:auto 0 0 0;height:10px}
.sl-kicker{font-size:15px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--text-faint);margin-bottom:18px}
.sl-emoji{font-size:90px;line-height:1;margin-bottom:18px}
.sl-emoji-img{width:120px;height:120px;border-radius:24px;object-fit:cover;box-shadow:0 8px 28px rgba(0,0,0,.3)}
.sl-name{font-size:74px;font-weight:800;letter-spacing:-.03em;line-height:1.05}
.sl-role{font-size:30px;color:var(--text-light);margin-top:14px;font-weight:600}
.sl-tag{font-size:21px;color:var(--text-light);margin-top:auto;font-style:italic;max-width:80%;line-height:1.5}
.sl-h{font-size:42px;font-weight:800;letter-spacing:-.02em;margin-bottom:30px;display:flex;align-items:center;gap:16px;color:var(--accent)}
.sl-tags{display:flex;flex-wrap:wrap;gap:11px}
.sl-tag-chip{font-size:18px;font-weight:600;padding:8px 16px;border-radius:9px}
.sl-callout{background:var(--callout-bg);border-radius:14px;padding:26px 30px;font-size:22px;line-height:1.6;display:flex;gap:18px;margin-bottom:30px}
.sl-callout .e{font-size:30px}
.sl-list{display:flex;flex-direction:column;gap:18px;overflow:hidden}
.sl-li-top{display:grid;grid-template-columns:1fr auto;align-items:baseline;gap:20px}
.sl-li-top>div:first-child{min-width:0}
.sl-li-title{font-size:25px;font-weight:700}
.sl-li-sub{font-size:20px;color:var(--text-light);font-weight:600}
.sl-li-period{font-size:17px;color:var(--text-faint);white-space:nowrap}
.sl-li-desc{font-size:18px;color:var(--text-light);line-height:1.5;margin-top:6px}
.sl-contact{display:flex;flex-wrap:wrap;gap:14px 34px;margin-top:24px;font-size:20px}
.sl-contact div{display:flex;align-items:center;gap:9px;color:var(--text-light)}
.sl-pageno{position:absolute;bottom:34px;right:48px;font-size:16px;color:var(--text-faint);font-variant-numeric:tabular-nums}
.slide-exit{position:fixed;top:22px;right:26px;z-index:210;width:42px;height:42px;border-radius:50%;
  background:rgba(255,255,255,.12);color:#fff;display:grid;place-items:center;backdrop-filter:blur(8px)}
.slide-exit:hover{background:rgba(255,255,255,.22)}
.slide-exit svg{width:20px;height:20px}
.slide-arrow{position:fixed;top:50%;transform:translateY(-50%);z-index:210;width:50px;height:50px;border-radius:50%;
  background:rgba(255,255,255,.1);color:#fff;display:grid;place-items:center;backdrop-filter:blur(8px);transition:.15s}
.slide-arrow:hover{background:rgba(255,255,255,.25)}
.slide-arrow svg{width:24px;height:24px}
.slide-arrow.prev{left:26px}.slide-arrow.next{right:26px}
.slide-dots{position:fixed;bottom:30px;left:50%;transform:translateX(-50%);z-index:210;display:flex;gap:11px;
  background:rgba(255,255,255,.1);padding:11px 16px;border-radius:30px;backdrop-filter:blur(8px)}
.slide-dot{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.4);transition:.2s;cursor:pointer}
.slide-dot.on{background:#fff;width:26px;border-radius:5px}
`;

export const STANDALONE_HELPERS = `
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function normUrl(u){ u=String(u||'').trim(); if(!u)return '#'; if(/^https?:\\/\\//i.test(u)||u.startsWith('mailto:'))return u; return 'https://'+u; }
function svgIcon(name){
  var p={
    github:'<path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 015 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.26 10.26 0 0022 12.25C22 6.58 17.52 2 12 2z"/>',
    external:'<path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/>'
  };
  var fill=name==='github'?'fill="currentColor" stroke="none"':'fill="none" stroke="currentColor" stroke-width="2"';
  return '<svg class="np-lnk-ic" viewBox="0 0 24 24" ' + fill + '>' + (p[name]||'') + '</svg>';
}
function gradientCss(id){ const g=GRADIENTS[id]; return g?g:GRADIENTS['graphite']; }
function coverBg(st){
  if(st.theme&&st.theme.solidColor) return st.theme.solidColor;
  if(st.theme&&st.theme.gradientCustom) {
    var h = st.theme.gradientCustom.replace('#', '');
    if (h.length === 6) {
      var r = parseInt(h.slice(0, 2), 16);
      var g = parseInt(h.slice(2, 4), 16);
      var b = parseInt(h.slice(4, 6), 16);
      var mix = (c, t, amt) => Math.round(c + (t - c) * amt);
      var toHex = (rr, gg, bb) => '#' + [rr, gg, bb].map((v) => v.toString(16).padStart(2, '0')).join('');
      var light = toHex(mix(r, 255, 0.35), mix(g, 255, 0.35), mix(b, 255, 0.35));
      var dark = toHex(mix(r, 0, 0.3), mix(g, 0, 0.3), mix(b, 0, 0.3));
      return 'linear-gradient(135deg, ' + light + ' 0%, ' + st.theme.gradientCustom + ' 52%, ' + dark + ' 100%)';
    }
    return st.theme.gradientCustom;
  }
  return (st.theme&&st.theme.coverImg)?'center/cover no-repeat url(\\''+st.theme.coverImg+'\\')':gradientCss(st.theme&&st.theme.cover||'graphite');
}
function accentHex(st){
  if(st.theme&&st.theme.accent) return st.theme.accent;
  if(st.theme&&st.theme.solidColor) return st.theme.solidColor;
  if(st.theme&&st.theme.gradientCustom) return st.theme.gradientCustom;
  var m=String(gradientCss(st.theme&&st.theme.cover||'sunset')).match(/#([0-9a-f]{6})/i);
  return m?'#'+m[1]:'#4A4A4A';
}
function tagColor(str, dark){
  var h=0; for(var i=0;i<str.length;i++){h=(h*31+str.charCodeAt(i))>>>0;}
  var p = dark?TAG_DARK:TAG_LIGHT; return p[h%p.length];
}
function sectionWrap(emoji,title,inner,step,edit){
  var cls=edit?'np-section pv-edit':'np-section';
  var attr=edit?' data-goto="'+step+'"':'';
  return '<div class="'+cls+'"'+attr+'><div class="np-h"><span class="he">'+emoji+'</span>'+title+'</div>'+inner+'</div>';
}
function sectionKeys(st){ return ['skills','tools','experience','projects','education'].concat((st.custom||[]).map(c=>'cs:'+c.id)); }
function orderedSections(st){
  var order=st.sectionOrder||[];
  var all=sectionKeys(st);
  var matched=order.filter(k=>all.includes(k));
  all.forEach(k=>{ if(!matched.includes(k)) matched.push(k); });
  return matched;
}
function secLabel(st,key){
  if(key.startsWith('cs:')){ var c=(st.custom||[]).find(x=>'cs:'+x.id===key); return c?(c.emoji||'📌')+' '+(c.title||'커스텀 섹션'):key; }
  return SEC_LABEL[key]||key;
}
function renderPageHTML(st, opts){
  opts=opts||{};
  var edit=opts.edit;
  var dark=st.theme.mode==='dark';
  var p=st.profile;
  var ed=path=> edit?' data-edit="'+path+'"':'';

  var props=[];
  if(p.role) props.push('<div class="np-prop"><span class="pk">직무</span><span class="pv">'+esc(p.role)+'</span></div>');
  if(p.location) props.push('<div class="np-prop"><span class="pk">위치</span><span class="pv">'+esc(p.location)+'</span></div>');
  if(p.email) props.push('<div class="np-prop"><span class="pk">이메일</span><a class="pv" href="mailto:'+esc(p.email)+'">'+esc(p.email)+'</a></div>');
  if(p.website) props.push('<div class="np-prop"><span class="pk">웹사이트</span><a class="pv" href="'+normUrl(p.website)+'" target="_blank" rel="noopener">'+esc(p.website)+'</a></div>');
  (p.links||[]).forEach((l,li)=>{ if(l.label||l.url) props.push('<div class="np-prop"><span class="pk">'+esc(l.label||'링크')+'</span><a class="pv" href="'+normUrl(l.url)+'" target="_blank" rel="noopener">'+esc(l.url||l.label)+'</a></div>'); });

  var propsBlock = props.length ? '<div class="np-props">'+props.join('')+'</div>' : '';

  var callout='';
  if(st.about.trim()) callout='<div class="np-callout"><span class="ce">💡</span><span class="ct">'+esc(st.about)+'</span></div>';

  var tags=st.skills.split(',').map(t=>t.trim()).filter(Boolean);
  var skillsInner;
  if(tags.length) skillsInner='<div class="np-tags">'+tags.map(t=>{const c=tagColor(t,dark);return '<span class="np-tag" style="background:'+c.bg+';color:'+c.fg+'">'+esc(t)+'</span>';}).join('')+'</div>';
  else skillsInner='<div class="np-empty-ph">기술 스택을 추가해보세요</div>';
  var skillsSec = tags.length?sectionWrap('🛠️','기술 스택',skillsInner,3,false):'';

  var selTools=st.tools||[];
  var toolsSec='';
  if(selTools.length){
    var grouped=TOOL_CATS.map(c=>({name:c.name,items:c.items.filter(t=>selTools.includes(t))})).filter(g=>g.items.length>0);
    var toolsInner='';
    if(grouped.length){
      toolsInner=grouped.map(g=>'<div class="np-tools-cat"><span class="np-tools-cat-label">'+esc(g.name)+'</span><div class="np-tags">'+g.items.map(t=>{const c=tagColor(t,dark);return '<span class="np-tag" style="background:'+c.bg+';color:'+c.fg+'">'+esc(t)+'</span>';}).join('')+'</div></div>').join('');
    }
    if(toolsInner) toolsSec=sectionWrap('🧰','서비스 · 도구',toolsInner,4,false);
  }

  var expInner = st.experience.length
    ? st.experience.map((x,i)=>{
        var sub = '· '+esc(x.company||'회사')+(x.level?' · '+esc(x.level):'');
        var badge=x.type?'<span class="np-emp-badge">'+esc(x.type)+'</span>':'';
        var per=x.period?'<span class="np-item-period">'+esc(x.period)+'</span>':'';
        var dsc=x.desc?'<div class="np-item-desc">'+esc(x.desc)+'</div>':'';
        return '<div class="np-item"><div class="np-item-top"><div><span class="np-item-title">'+esc(x.role||'직무')+'</span> <span class="np-item-sub">'+sub+'</span>'+badge+'</div>'+per+'</div>'+dsc+'</div>';
      }).join('')
    : '<div class="np-empty-ph">경력을 추가해보세요</div>';
  var expSec=st.experience.length?sectionWrap('💼','경력',expInner,5,false):';

  var projInner = st.projects.length
    ? st.projects.map((x,i)=>{
        var ptags=(x.tech||'').split(',').map(t=>t.trim()).filter(Boolean);
        var tg=ptags.length?'<div class="np-tags np-proj-tags">'+ptags.map(t=>{const c=tagColor(t,dark);return '<span class="np-tag" style="background:'+c.bg+';color:'+c.fg+'">'+esc(t)+'</span>';}).join('')+'</div>':'';
        var demo=x.demo||x.link;
        var gh=svgIcon('github'), ex=svgIcon('external');
        var links=[];
        if(x.repo) links.push('<a class="np-link-btn" href="'+normUrl(x.repo)+'" target="_blank" rel="noopener">'+gh+' GitHub</a>');
        if(demo) links.push('<a class="np-link-btn" href="'+normUrl(demo)+'" target="_blank" rel="noopener">'+ex+' 데모</a>');
        var lk=links.length?'<div class="np-links">'+links.join('')+'</div>':'';
        var per=x.period?'<span class="np-item-period">'+esc(x.period)+'</span>':'';
        var roleEl=x.role?'<div class="np-item-role">'+esc(x.role)+'</div>':'';
        var dsc=x.desc?'<div class="np-item-desc">'+esc(x.desc)+'</div>':'';
        var resEl=x.result?'<div class="np-item-result"><span class="np-res-badge">성과</span><span>'+esc(x.result)+'</span></div>':'';
        var star=x.stars?'<span class="np-star">★ '+x.stars+'</span>':'';
        return '<div class="np-item"><div class="np-item-top"><span class="np-item-title">'+esc(x.name||'프로젝트')+'</span>'+star+per+'</div>'+roleEl+dsc+resEl+tg+lk+'</div>';
      }).join('')
    : '<div class="np-empty-ph">프로젝트를 추가해보세요</div>';
  var projSec=st.projects.length?sectionWrap('🚀','프로젝트',projInner,6,false):'';

  var eduInner = st.education.length
    ? st.education.map((x,i)=>'<div class="np-item"><div class="np-item-top"><div><span class="np-item-title">'+esc(x.school||'학교')+'</span> <span class="np-item-sub">· <span>'+esc(x.degree||'전공')+'</span></span></div>'+(x.period?'<span class="np-item-period">'+esc(x.period)+'</span>':'')+'</div></div>').join('')
    : '<div class="np-empty-ph">학력을 추가해보세요</div>';
  var eduSec=st.education.length?sectionWrap('🎓','교육',eduInner,7,false):'';

  var titleCls = p.name?'np-title':'np-title faint';
  var titleTxt = p.name||'제목 없음';
  var shapeCls = p.iconShape==='circle'?' circ':'';
  var iconInner = p.iconImg ? '<img class="np-icon-img'+shapeCls+'" src="'+p.iconImg+'" alt="">' : (p.emoji||'');
  var iconEl='';
  if(iconInner) iconEl = '<div class="np-icon">'+iconInner+'</div>';
  var noIconCls = iconInner?'':' no-icon';
  var titleEl = '<h1 class="'+titleCls+'">'+esc(titleTxt)+'</h1>';
  var tagEl = p.tagline?'<div class="np-tagline">'+esc(p.tagline)+'</div>':'';

  var customMap={};
  (st.custom||[]).forEach((cs,ci)=>{
    if(!cs.title) return;
    var rows=(cs.items||[]).filter(r=>r.title);
    var inner=rows.length?rows.map((it,ii)=>'<div class="np-item"><div class="np-item-top"><div><span class="np-item-title">'+esc(it.title||'')+'</span>'+(it.sub?' <span class="np-item-sub">· <span>'+esc(it.sub)+'</span></span>':'')+'</div>'+(it.period?'<span class="np-item-period">'+esc(it.period)+'</span>':'')+'</div>'+(it.desc?'<div class="np-item-desc">'+esc(it.desc)+'</div>':'')+'</div>').join(''):'';
    if(!inner) return;
    customMap['cs:'+cs.id]='<div class="np-section"><div class="np-h"><span class="he">'+esc(cs.emoji||'📌')+'</span><span>'+esc(cs.title||'커스텀 섹션')+'</span></div>'+inner+'</div>';
  });
  var secMap={skills:skillsSec,tools:toolsSec,experience:expSec,projects:projSec,education:eduSec,...customMap};
  var bodySections=(skipKeys)=>orderedSections(st).filter(k=>!(skipKeys&&skipKeys.includes(k))).map(k=>secMap[k]||'').join('');

  var layout=(st.theme&&st.theme.layout)||'notion';
  var wideCls=(st.theme&&st.theme.wide)?' wide':'';
  var styCls=' sty-'+((st.theme&&st.theme.style)||'classic');
  var accVar='--accent:'+accentHex(st);
  var noCover=!!(st.theme&&st.theme.noCover);
  var noCoverCls=noCover?' no-cover':'';
  var coverEl=noCover?'':'<div class="np-cover" style="background:'+coverBg(st)+'"></div>';
  var accentEl=noCover?'':'<div class="np-min-accent" style="background:'+coverBg(st)+'"></div>';

  if(layout==='sidebar'){
    return '<div class="notion-page lay-sidebar'+wideCls+''+styCls+''+noIconCls+''+noCoverCls+'" style="'+accVar+'">'+
      coverEl+
      '<div class="np-body np-sb-grid">'+
        '<aside class="np-aside">'+iconEl+''+titleEl+''+tagEl+''+propsBlock+''+skillsSec+'</aside>'+
        '<main class="np-sb-main">'+callout+''+bodySections(['skills'])+'</main>'+
      '</div>'+
    '</div>';
  }
  if(layout==='minimal'){
    return '<div class="notion-page lay-minimal'+wideCls+''+styCls+''+noIconCls+''+noCoverCls+'" style="'+accVar+'">'+
      accentEl+
      '<div class="np-body">'+
        '<div class="np-min-head">'+iconEl+''+titleEl+''+tagEl+''+propsBlock+'</div>'+
        callout+''+
        bodySections()+
      '</div>'+
    '</div>';
  }
  if(layout==='tab'){
    var tabKeys=orderedSections(st).filter(k=>secMap[k]);
    var tabs=tabKeys.map((k,i)=>'<button class="np-tab'+(i===0?' on':'')+'" data-tabi="'+i+'" type="button">'+esc(secLabel(st,k))+'</button>').join('');
    var panes=tabKeys.map((k,i)=>'<div class="np-tab-pane'+(i===0?' on':'')+'">'+secMap[k]+'</div>').join('');
    return '<div class="notion-page lay-tab'+wideCls+''+styCls+''+noIconCls+''+noCoverCls+'" style="'+accVar+'">'+
      coverEl+
      '<div class="np-body">'+
        iconEl+''+titleEl+''+tagEl+''+propsBlock+''+callout+''+
        '<div class="np-tabbar">'+tabs+'</div>'+
        '<div class="np-tab-panes">'+panes+'</div>'+
      '</div>'+
    '</div>';
  }
  return '<div class="notion-page lay-notion'+wideCls+''+styCls+''+noIconCls+''+noCoverCls+'" style="'+accVar+'">'+
    coverEl+
    '<div class="np-body">'+
      iconEl+''+
      titleEl+''+
      tagEl+''+
      propsBlock+''+
      callout+''+
      bodySections()+
    '</div>'+
  '</div>';
}
function buildSlidesHTML(st){
  var dark=false; var p=st.profile;
  var cover=coverBg(st);
  var slEmoji = p.iconImg?'<img class="sl-emoji-img" src="'+p.iconImg+'" alt="">':p.emoji;
  var tags=st.skills.split(',').map(t=>t.trim()).filter(Boolean);
  var chip=(t,big)=>{const c=tagColor(t,dark);return '<span class="'+(big?'sl-tag-chip':'np-tag')+'" style="background:'+c.bg+';color:'+c.fg+'">'+esc(t)+'</span>';};

  var band='<div class="slide-cover band" style="background:'+cover+'"></div>';
  var listInner=(emoji,title,items)=>'<div class="sl-kicker">'+title+'</div><div class="sl-h"><span>'+emoji+'</span>'+title+'</div><div class="sl-list">'+items+'</div>';
  var slides=[];

  slides.push('<div style="position:relative;display:flex;flex-direction:column;height:100%"><div class="sl-emoji">'+slEmoji+'</div><div class="sl-name">'+esc(p.name||'Your Name')+'</div><div class="sl-role">'+esc(p.role||'Your Role')+'</div>'+(p.tagline?'<div class="sl-tag">“'+esc(p.tagline)+'”</div>':'<div style="margin-top:auto"></div>')+'</div>');

  slides.push('<div class="sl-kicker">소개</div>'+(st.about?'<div class="sl-callout"><span class="e">💡</span><span>'+esc(st.about)+'</span></div>':'')+'<div class="sl-h"><span>🛠️</span>기술 스택</div><div class="sl-tags">'+(tags.length?tags.map(t=>chip(t,true)).join(''):'<span style="color:var(--text-faint)">—</span>')+'</div>');

  var selT=st.tools||[];
  if(selT.length) slides.push('<div class="sl-kicker">서비스 · 도구</div><div class="sl-h"><span>🧰</span>서비스 · 도구</div><div class="sl-tags">'+selT.map(t=>chip(t,true)).join('')+'</div>');

  var exItems = st.experience.length? st.experience.slice(0,4).map(x=>'<div><div class="sl-li-top"><div><span class="sl-li-title">'+esc(x.role||'')+'</span> <span class="sl-li-sub">· '+esc(x.company||'')+(x.level?' · '+esc(x.level):'')+'</span></div><span class="sl-li-period">'+esc(x.period||'')+'</span></div>'+(x.desc?'<div class="sl-li-desc">'+esc(x.desc)+'</div>':'')+'</div>').join('') : '<div style="color:var(--text-faint)">경력 정보 없음</div>';
  slides.push(listInner('💼','경력',exItems));

  if(st.projects.length){
    st.projects.forEach((x,pi)=>{
      var t=(x.tech||'').split(',').map(s=>s.trim()).filter(Boolean);
      var star=x.stars?'<span class="sl-li-period" style="font-size:19px;align-self:center;white-space:nowrap">★ '+x.stars+'</span>':'';
      var meta=[]; if(x.role&&x.role.trim())meta.push(esc(x.role)); if(x.period)meta.push(esc(x.period));
      var demo=x.demo||x.link, urls=[];
      if(x.repo)urls.push('🔗 '+esc(String(x.repo).replace(/^https?:\\/\\//,'')));
      if(demo)urls.push('🌐 '+esc(String(demo).replace(/^https?:\\/\\//,'')));
      slides.push('<div class="sl-kicker">프로젝트 '+ (pi+1) +' / '+st.projects.length+'</div><div class="sl-h" style="justify-content:space-between;align-items:flex-start;gap:20px"><span><span style="margin-right:14px">🚀</span>'+esc(x.name||'프로젝트')+'</span>'+star+'</div>'+(meta.length?'<div class="sl-li-sub" style="margin:-18px 0 22px;font-size:21px">'+meta.join('  ·  ')+'</div>':'')+(x.desc?'<div class="sl-li-desc" style="font-size:22px;line-height:1.65;margin-bottom:18px">'+esc(x.desc)+'</div>':'')+(x.result?'<div class="sl-li-desc" style="font-size:20px;margin-bottom:18px">🏆 '+esc(x.result)+'</div>':'')+(t.length?'<div class="sl-tags">'+t.map(s=>chip(s,true)).join('')+'</div>':'')+(urls.length?'<div class="sl-li-desc" style="color:var(--text-faint);margin-top:20px;font-size:17px">'+urls.join('     ')+'</div>':''));
    });
  } else {
    slides.push(listInner('🚀','프로젝트','<div style="color:var(--text-faint)">프로젝트 정보 없음</div>'));
  }

  (st.custom||[]).forEach(cs=>{
    var items=(cs.items||[]).filter(it=>it.title);
    if(!cs.title || !items.length) return;
    var ci=items.slice(0,4).map(it=>'<div><div class="sl-li-top"><div><span class="sl-li-title">'+esc(it.title)+'</span>'+(it.sub?' <span class="sl-li-sub">· '+esc(it.sub)+'</span>':'')+'</div>'+(it.period?'<span class="sl-li-period">'+esc(it.period)+'</span>':'')+'</div>'+(it.desc?'<div class="sl-li-desc">'+esc(it.desc)+'</div>':'')+'</div>').join('');
    slides.push(listInner(cs.emoji||'📌',cs.title,ci));
  });

  var eduItems = st.education.length? st.education.map(x=>'<div><div class="sl-li-top"><div><span class="sl-li-title">'+esc(x.school||'')+'</span> <span class="sl-li-sub">· '+esc(x.degree||'')+'</span></div><span class="sl-li-period">'+esc(x.period||'')+'</span></div></div>').join('') : '<div style="color:var(--text-faint)">학력 정보 없음</div>';
  var contacts=[];
  if(p.email)contacts.push('<div>✉️ '+esc(p.email)+'</div>');
  if(p.github)contacts.push('<div>🐙 '+esc(p.github)+'</div>');
  if(p.website)contacts.push('<div>🌐 '+esc(p.website)+'</div>');
  if(p.location)contacts.push('<div>📍 '+esc(p.location)+'</div>');
  slides.push('<div class="sl-kicker">교육 · 연락처</div><div class="sl-h"><span>🎓</span>교육</div><div class="sl-list">'+eduItems+'</div>'+(contacts.length?'<div class="sl-h" style="font-size:30px;margin-top:34px"><span>📬</span>연락처</div><div class="sl-contact">'+contacts.join('')+'</div>':''));

  var total=slides.length, pad=n=>String(n).padStart(2,'0');
  return slides.map((inner,i)=>'<div class="slide" data-i="'+i+'">'+band+inner+'<div class="sl-pageno">'+pad(i+1)+' / '+pad(total)+'</div></div>').join('');
}
`;

