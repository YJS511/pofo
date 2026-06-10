import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { GRADIENTS, ACCENT_SWATCHES, makeGradient } from '../constants';
import { Github, ExternalLink, Monitor, Smartphone, RotateCcw, FilePlus2 } from 'lucide-react';

// 노션 태그 색상 팔레트
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

const FONT_STACKS: Record<string, string> = {
  sans: '"Pretendard Variable","Pretendard",ui-sans-serif,-apple-system,"Segoe UI",system-ui,"Apple SD Gothic Neo","Malgun Gothic",sans-serif',
  serif: '"Nanum Myeongjo","Lyon Text","Iowan Old Style",Georgia,ui-serif,serif',
  mono: '"JetBrains Mono","SFMono-Regular",ui-monospace,Menlo,Consolas,monospace'
};

// hex → 상대 휘도(0~1)
function luminance(hex: string): number {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// 다크 배경에서 너무 어두운 색은 흰색과 섞어 밝게
function brightenForDark(hex: string): string {
  const m = hex.replace('#', '');
  if (m.length !== 6) return hex;
  if (luminance(hex) >= 0.42) return hex;
  const ch = [0, 2, 4].map((i) => {
    const v = parseInt(m.slice(i, i + 2), 16);
    return Math.round(v + (255 - v) * 0.55);
  });
  return '#' + ch.map((v) => v.toString(16).padStart(2, '0')).join('');
}

function getTagColor(text: string, dark: boolean) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash * 31) + text.charCodeAt(i)) >>> 0;
  }
  const palette = dark ? TAG_DARK : TAG_LIGHT;
  return palette[hash % palette.length];
}

export function NotionPreview() {
  const { state, viewMode, setViewMode, resetState, resetContentOnly, setShowOnboarding, setSelectedPresetId } = usePortfolio();
  const dark = state.theme.mode === 'dark';

  const [scale, setScale] = useState(1);
  const [isNarrow, setIsNarrow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current;
      const pw = parent.clientWidth;
      const ph = parent.clientHeight;

      setIsNarrow(pw < 720);

      if (viewMode !== 'mobile') {
        setScale(1);
        return;
      }

      // iPhone mockup base dimensions including bezel/padding breathing room
      const s = Math.min(pw / 420, ph / 850);
      setScale(s < 1 ? s : 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [viewMode]);

  const getCoverBg = () => {
    if (state.theme.coverImg) return `url(${state.theme.coverImg})`;
    if (state.theme.solidColor) return state.theme.solidColor;
    if (state.theme.gradientCustom) return makeGradient(state.theme.gradientCustom);
    return GRADIENTS[state.theme.cover] || GRADIENTS.graphite;
  };

  const getAccentColor = () => {
    let hex = state.theme.accent || state.theme.solidColor || state.theme.gradientCustom || '';
    if (!hex) {
      const g = GRADIENTS[state.theme.cover] || GRADIENTS.graphite;
      const m = g.match(/#([0-9a-fA-F]{6})/);
      hex = m ? '#' + m[1] : '#4A4A4A';
    }
    return dark ? brightenForDark(hex) : hex;
  };

  const normUrl = (url: string) => {
    const u = (url || '').trim();
    if (!u) return '#';
    if (/^https?:\/\//i.test(u) || u.startsWith('mailto:')) return u;
    return 'https://' + u;
  };

  const renderTag = (text: string) => {
    const color = getTagColor(text, dark);
    return (
      <span
        key={text}
        className="pofo-tag inline-block px-[10px] py-1 rounded-[6px] text-[13px] font-medium leading-[1.3]"
        style={{ background: color.bg, color: color.fg }}
      >
        {text}
      </span>
    );
  };

  // 스타일 변형(line/bold/mono)이 후킹할 수 있도록 클래스 부여
  const sectionHeader = (emoji: string, title: string) => (
    <h2 className="np-h">
      <span className="he">{emoji}</span>
      <span className="ht">{title}</span>
    </h2>
  );

  // Properties
  const props: Array<{ key: string; value: string; href?: string }> = [];
  if (state.profile.role) props.push({ key: '직무', value: state.profile.role });
  if (state.profile.location) props.push({ key: '위치', value: state.profile.location });
  if (state.profile.email) props.push({ key: '이메일', value: state.profile.email, href: `mailto:${state.profile.email}` });
  if (state.profile.website) props.push({ key: '웹사이트', value: state.profile.website, href: normUrl(state.profile.website) });
  state.profile.links.forEach((link) => {
    if (link.label || link.url) {
      props.push({ key: link.label || '링크', value: link.url || link.label, href: normUrl(link.url) });
    }
  });

  // Skills
  const skills = state.skills.split(',').map((s) => s.trim()).filter(Boolean);

  // Icon (will be rendered separately to handle positioning)
  const hasIcon = !!(state.profile.iconImg || state.profile.emoji);

  const wide = state.theme.wide;
  const noCover = state.theme.noCover;
  const font = state.theme.font || 'sans';
  const style = state.theme.style || 'classic';
  const accent = getAccentColor();

  const [activeTab, setActiveTab] = useState<string>('');
  const layout = state.theme.layout || 'notion';

  // 1. Available sections and their render functions
  const skillsSec = skills.length > 0 ? (
    <div className="np-section" data-section-id="skills">
      {sectionHeader('🛠️', '기술 스택')}
      <div className="np-tags">
        {skills.map((skill, idx) => {
          const c = getTagColor(skill, dark);
          return (
            <span
              key={idx}
              className="np-tag"
              style={{ background: c.bg, color: c.fg }}
            >
              {skill}
            </span>
          );
        })}
      </div>
    </div>
  ) : null;

  const toolsSec = state.tools.length > 0 ? (
    <div className="np-section" data-section-id="tools">
      {sectionHeader('🧰', '서비스 · 도구')}
      <div className="np-tags">
        {state.tools.map((tool, idx) => {
          const c = getTagColor(tool, dark);
          return (
            <span
              key={idx}
              className="np-tag"
              style={{ background: c.bg, color: c.fg }}
            >
              {tool}
            </span>
          );
        })}
      </div>
    </div>
  ) : null;

  const expSec = state.experience.length > 0 ? (
    <div className="np-section" data-section-id="experience">
      {sectionHeader('💼', '경력')}
      <div>
        {state.experience.map((exp, i) => (
          <div key={i} className="np-item">
            <div className="np-item-top">
              <div>
                <span className="np-item-title">{exp.role || '직무'}</span>
                {' '}
                <span className="np-item-sub">
                  · {exp.company || '회사'}
                  {exp.level && ` · ${exp.level}`}
                </span>
                {exp.type && <span className="np-emp-badge">{exp.type}</span>}
              </div>
              {exp.period && <span className="np-item-period">{exp.period}</span>}
            </div>
            {exp.desc && <div className="np-item-desc">{exp.desc}</div>}
          </div>
        ))}
      </div>
    </div>
  ) : null;

  const projSec = state.projects.length > 0 ? (
    <div className="np-section" data-section-id="projects">
      {sectionHeader('🚀', '프로젝트')}
      <div>
        {state.projects.map((proj, i) => {
          const techs = proj.tech?.split(',').map((t) => t.trim()).filter(Boolean) || [];
          const demo = proj.demo || proj.link;
          const links = [];
          if (proj.repo) links.push({ type: 'github', href: proj.repo, text: 'GitHub' });
          if (demo) links.push({ type: 'external', href: demo, text: '데모' });

          return (
            <div key={i} className="np-item">
              <div className="np-item-top">
                <span className="np-item-title">{proj.name || '프로젝트'}</span>
                {proj.stars && proj.stars > 0 && <span className="np-star">★ {proj.stars}</span>}
                {proj.period && <span className="np-item-period">{proj.period}</span>}
              </div>
              {proj.role && <div className="np-item-role">{proj.role}</div>}
              {proj.desc && <div className="np-item-desc">{proj.desc}</div>}
              {proj.result && (
                <div className="np-item-result">
                  <span className="np-res-badge">성과</span>
                  <span>{proj.result}</span>
                </div>
              )}
              {techs.length > 0 && (
                <div className="np-tags np-proj-tags">
                  {techs.map((tech, idx) => {
                    const c = getTagColor(tech, dark);
                    return (
                      <span
                        key={idx}
                        className="np-tag"
                        style={{ background: c.bg, color: c.fg }}
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              )}
              {links.length > 0 && (
                <div className="np-links">
                  {links.map((link, idx) => (
                    <a
                      key={idx}
                      className="np-link-btn"
                      href={normUrl(link.href)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.type === 'github' ? (
                        <Github className="w-3.5 h-3.5 inline-block mr-1 align-text-bottom" />
                      ) : (
                        <ExternalLink className="w-3.5 h-3.5 inline-block mr-1 align-text-bottom" />
                      )}
                      {link.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  const eduSec = state.education.length > 0 ? (
    <div className="np-section" data-section-id="education">
      {sectionHeader('🎓', '교육')}
      <div>
        {state.education.map((edu, i) => (
          <div key={i} className="np-item">
            <div className="np-item-top">
              <div>
                <span className="np-item-title">{edu.school || '학교'}</span>
                {' '}
                <span className="np-item-sub">
                  · {edu.degree || '전공'}
                </span>
              </div>
              {edu.period && <span className="np-item-period">{edu.period}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;

  const renderCustomSec = (section: typeof state.custom[0]) => {
    const items = section.items?.filter((item) => item.title) || [];
    if (items.length === 0) return null;

    return (
      <div key={section.id} className="np-section" data-section-id={section.id}>
        {sectionHeader(section.emoji || '📌', section.title || '커스텀 섹션')}
        <div>
          {items.map((item, i) => (
            <div key={i} className="np-item">
              <div className="np-item-top">
                <div>
                  <span className="np-item-title">{item.title}</span>
                  {item.sub && (
                    <>
                      {' '}
                      <span className="np-item-sub">· {item.sub}</span>
                    </>
                  )}
                </div>
                {item.period && <span className="np-item-period">{item.period}</span>}
              </div>
              {item.desc && <div className="np-item-desc">{item.desc}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const secMap: Record<string, React.ReactNode> = {
    skills: skillsSec,
    tools: toolsSec,
    experience: expSec,
    projects: projSec,
    education: eduSec,
  };
  state.custom?.forEach((cs) => {
    secMap['cs:' + cs.id] = renderCustomSec(cs);
  });

  // Build ordered list of sections
  const secKeys: string[] = [];
  state.sectionOrder.forEach((k) => {
    if (secMap[k]) secKeys.push(k);
  });
  state.custom?.forEach((cs) => {
    const key = 'cs:' + cs.id;
    if (renderCustomSec(cs)) {
      secKeys.push(key);
    }
  });

  const getRenderedSection = (key: string) => {
    if (key.startsWith('cs:')) {
      const id = key.substring(3);
      const cs = state.custom?.find(c => c.id === id);
      return cs ? renderCustomSec(cs) : null;
    }
    return secMap[key];
  };

  useEffect(() => {
    if (secKeys.length > 0) {
      if (!activeTab || !secKeys.includes(activeTab)) {
        setActiveTab(secKeys[0]);
      }
    }
  }, [secKeys, activeTab]);

  // Page Classes
  const wideCls = wide ? ' wide' : '';
  const styCls = ` sty-${style}`;
  const noIconCls = hasIcon ? '' : ' no-icon';
  const noCoverCls = noCover ? ' no-cover' : '';
  const pageClass = `notion-page lay-${layout}${wideCls}${styCls}${noIconCls}${noCoverCls}`;

  // Cover Elements
  const coverEl = noCover ? null : (
    <div
      className="np-cover"
      style={{ background: getCoverBg(), backgroundSize: 'cover', backgroundPosition: 'center' }}
    />
  );

  const accentEl = noCover ? null : (
    <div
      className="np-min-accent"
      style={{ background: getCoverBg() }}
    />
  );

  // Profile Parts
  const iconInner = state.profile.iconImg ? (
    <img
      src={state.profile.iconImg}
      alt=""
      className={`np-icon-img ${state.profile.iconShape === 'circle' ? 'circ' : ''}`}
    />
  ) : (
    state.profile.emoji || ''
  );

  const iconEl = iconInner ? <div className="np-icon">{iconInner}</div> : null;

  const titleEl = (
    <h1 className={`np-title ${state.profile.name ? '' : 'faint'}`}>
      {state.profile.name || '제목 없음'}
    </h1>
  );

  const tagEl = state.profile.tagline ? (
    <div className="np-tagline">{state.profile.tagline}</div>
  ) : null;

  const propsBlock = props.length > 0 ? (
    <div className="np-props">
      {props.map((prop, i) => (
        <div key={i} className="np-prop">
          <div className="pk">{prop.key}</div>
          <div className="pv">
            {prop.href ? (
              <a
                href={prop.href}
                target={prop.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={prop.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="pv-link"
              >
                {prop.value}
              </a>
            ) : (
              <span>{prop.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : null;

  const calloutEl = state.about && (
    <div className="np-callout">
      <span className="ce">💡</span>
      <span className="ct">{state.about}</span>
    </div>
  );

  // Layout selection
  const renderLayoutContent = () => {
    if (layout === 'sidebar') {
      return (
        <div className="np-body np-sb-grid">
          <aside className="np-aside">
            {iconEl}
            {titleEl}
            {tagEl}
            {propsBlock}
            {skillsSec}
          </aside>
          <main className="np-sb-main">
            {calloutEl}
            {secKeys.filter(k => k !== 'skills').map((k) => (
              <div key={k}>{getRenderedSection(k)}</div>
            ))}
          </main>
        </div>
      );
    }
    if (layout === 'minimal') {
      return (
        <div className="np-body">
          <div className="np-min-head">
            {iconEl}
            {titleEl}
            {tagEl}
            {propsBlock}
          </div>
          {calloutEl}
          {secKeys.map((k) => (
            <div key={k}>{getRenderedSection(k)}</div>
          ))}
        </div>
      );
    }
    if (layout === 'tab') {
      return (
        <div className="np-body">
          {iconEl}
          {titleEl}
          {tagEl}
          {propsBlock}
          {calloutEl}
          <div className="np-tabbar">
            {secKeys.map((k) => {
              const label = k.startsWith('cs:')
                ? state.custom?.find(c => c.id === k.substring(3))?.title || '커스텀 섹션'
                : k === 'skills' ? '기술 스택'
                : k === 'tools' ? '서비스 · 도구'
                : k === 'experience' ? '경력'
                : k === 'projects' ? '프로젝트'
                : k === 'education' ? '교육'
                : '';
              const active = activeTab === k;
              return (
                <button
                  key={k}
                  className={`np-tab ${active ? 'on' : ''}`}
                  onClick={() => setActiveTab(k)}
                  data-btn-tab-id={k}
                  {...{ onclick: `showTab('${k}')` } as any}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="np-tab-panes">
            {secKeys.map((k) => {
              const active = activeTab === k;
              return (
                <div
                  key={k}
                  className={`np-tab-pane ${active ? 'on' : ''}`}
                  data-tab-id={k}
                  style={{ display: active ? 'block' : 'none' }}
                >
                  {getRenderedSection(k)}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    // Default: Notion layout
    return (
      <div className="np-body">
        {iconEl}
        {titleEl}
        {tagEl}
        {propsBlock}
        {calloutEl}
        {secKeys.map((k) => (
          <div key={k}>{getRenderedSection(k)}</div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`flex-1 flex flex-col min-h-0 relative ${dark ? 'dark' : ''} ${isNarrow ? 'narrow-layout' : ''}`}
      style={{ fontFamily: FONT_STACKS[font], ['--pofo-accent' as any]: accent }}
    >
      {/* 하단 컨트롤 바 */}
      <div className="absolute bottom-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        {/* 초기화 / 새로 만들기 */}
        <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg pointer-events-auto">
          <button
            onClick={() => {
              if (confirm('현재 내용을 모두 지우고 빈 상태로 초기화할까요?\n디자인(테마·커버·폰트 등)은 유지됩니다.')) {
                resetContentOnly();
              }
            }}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all"
            title="내용 초기화 (디자인 유지)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (confirm('새로운 포트폴리오를 만들까요?\n현재 작성 중인 내용은 모두 사라집니다.')) {
                resetState();
                setSelectedPresetId('');
                try { localStorage.removeItem('pofo.presetId'); } catch {}
                setShowOnboarding(true);
              }
            }}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-all"
            title="전공 선택부터 새로 시작"
          >
            <FilePlus2 className="w-4 h-4" />
          </button>
        </div>

        {/* 뷰 모드 토글 */}
        <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg pointer-events-auto">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
              viewMode === 'mobile'
                ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900 shadow-sm hover:bg-gray-750 dark:hover:bg-gray-100'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
            }`}
            title="모바일 뷰"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
              viewMode === 'desktop'
                ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900 shadow-sm hover:bg-gray-750 dark:hover:bg-gray-100'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
            }`}
            title="데스크톱 뷰"
          >
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        /* POFO Notion Preview Styles - 원본 index.html 기반 매핑 */
        .notion-page {
          --text: #37352f;
          --text-light: rgba(55, 53, 47, 0.65);
          --text-faint: rgba(55, 53, 47, 0.42);
          --divider: rgba(55, 53, 47, 0.09);
          --callout-bg: #fbf3db;
          --input-bg: rgba(55, 53, 47, 0.055);
          --active-bg: rgba(74, 74, 74, 0.12);
          --accent: var(--pofo-accent);

          width: 100%;
          margin: 0 auto;
          padding: 0 0 120px;
          background: #ffffff;
          color: var(--text);
          font-family: inherit;
        }

        .notion-page.dark {
          --text: rgba(255, 255, 255, 0.9);
          --text-light: rgba(255, 255, 255, 0.62);
          --text-faint: rgba(255, 255, 255, 0.4);
          --divider: rgba(255, 255, 255, 0.11);
          --callout-bg: #3f3d38;
          --input-bg: rgba(255, 255, 255, 0.06);
          --active-bg: rgba(74, 74, 74, 0.22);
          background: #191919;
        }

        .np-cover { height: 200px; width: 100%; position: relative; }
        .np-body { padding: 0 52px; position: relative; }
        .np-icon { font-size: 74px; line-height: 1; margin-top: -44px; margin-bottom: 6px; position: relative; width: 90px; height: 90px; display: grid; place-items: center; }
        .np-icon-img { width: 90px; height: 90px; border-radius: 18px; object-fit: cover; box-shadow: 0 4px 14px rgba(15,15,15,.18); }
        .np-icon-img.circ { border-radius: 50%; }

        .lay-notion.no-icon .np-body { padding-top: 30px; }
        .lay-notion.no-icon .np-title, .lay-sidebar.no-icon .np-aside .np-title { margin-top: 0; }
        .lay-notion.no-cover .np-body { padding-top: 48px; }
        .lay-notion.no-cover .np-icon { margin-top: 0; }
        .lay-minimal.no-cover .np-body { padding-top: 46px; }
        .lay-sidebar.no-cover .np-sb-grid { padding-top: 46px; }
        .lay-sidebar.no-cover .np-icon { margin-top: 0; }
        .no-cover.no-icon .np-body { padding-top: 40px; }

        .np-title { font-size: 40px; font-weight: 800; letter-spacing: -.025em; line-height: 1.1; margin: 6px 0 4px; word-break: break-word; color: var(--text); }
        .np-title.faint { color: var(--text-faint); font-weight: 600; }
        .np-tagline { font-size: 16px; color: var(--text-light); line-height: 1.5; margin-bottom: 18px; font-style: italic; }
        .np-props { display: flex; flex-direction: column; gap: 3px; margin-bottom: 22px; }
        .np-prop { display: flex; align-items: center; gap: 8px; font-size: 14px; min-height: 28px; border-radius: 5px; padding: 3px 6px; margin-left: -6px; }
        .np-prop .pk { display: flex; align-items: center; gap: 7px; min-width: 80px; width: 100px; flex-shrink: 0; color: var(--text-faint); font-size: 13.5px; }
        .np-prop .pv { color: var(--text); word-break: break-word; }
        .np-prop a.pv { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(74,74,74,.35); }

        .np-callout { display: flex; gap: 13px; background: var(--callout-bg); border-radius: 9px; padding: 16px 17px; margin: 6px 0 30px; line-height: 1.6; font-size: 15px; }
        .np-callout .ce { font-size: 19px; line-height: 1.4; }
        .np-callout .ct { color: var(--text); white-space: pre-wrap; text-align: left; }

        .np-section { margin-bottom: 30px; text-align: left; }
        .np-h { display: flex; align-items: center; gap: 9px; font-size: 21px; font-weight: 700; letter-spacing: -.01em; margin-bottom: 14px; padding-bottom: 0; color: var(--text); }
        .np-h .he { font-size: 20px; }
        .np-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .np-tag { font-size: 13px; font-weight: 500; padding: 4px 10px; border-radius: 6px; line-height: 1.3; }

        .np-item { padding: 14px 0; border-top: 1px solid var(--divider); text-align: left; }
        .np-item:first-child { border-top: none; padding-top: 2px; }
        .np-item-top { display: grid; grid-template-columns: 1fr auto; align-items: baseline; gap: 6px 14px; }
        .np-item-top>div { min-width: 0; }
        .np-item-title { font-size: 16px; font-weight: 700; color: var(--text); }
        .np-item-sub { font-size: 14px; color: var(--text-light); font-weight: 500; }
        .np-emp-badge { display: inline-block; font-size: 11px; font-weight: 600; padding: 2px 7px; border-radius: 5px; margin-left: 7px; background: var(--input-bg); color: var(--text-light); vertical-align: middle; }
        .np-item-period { font-size: 13px; color: var(--text-faint); white-space: nowrap; flex-shrink: 0; font-variant-numeric: tabular-nums; }
        .np-item-desc { font-size: 14.5px; color: var(--text-light); line-height: 1.6; margin-top: 6px; white-space: pre-wrap; }
        .np-item-role { font-size: 13px; color: var(--text-faint); margin-top: 4px; font-weight: 500; }
        .np-item-result { display: flex; gap: 8px; align-items: flex-start; margin-top: 8px; font-size: 14px; color: var(--text-light); line-height: 1.55; white-space: pre-wrap; }
        .np-res-badge { flex-shrink: 0; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 5px; background: var(--accent); color: #fff; opacity: .9; margin-top: 1px; }
        .np-star { flex-shrink: 0; font-size: 12.5px; font-weight: 600; color: var(--text-faint); margin-left: auto; white-space: nowrap; }
        .np-links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 11px; }
        .np-link-btn { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--text); background: var(--input-bg); padding: 6px 12px; border-radius: 7px; text-decoration: none; transition: background .12s, color .12s; }
        .np-link-btn:hover { background: var(--active-bg); color: var(--accent); }
        .np-proj-tags { margin-top: 9px; }

        /* ===== LAYOUT: SIDEBAR ===== */
        .lay-sidebar .np-cover { height: 132px; }
        .lay-sidebar .np-sb-grid { display: grid; grid-template-columns: 264px 1fr; gap: 0; align-items: start; padding-top: 30px; }
        .lay-sidebar .np-aside { min-width: 0; padding-right: 30px; margin-right: 30px; border-right: 1px solid var(--divider); }
        .lay-sidebar .np-aside .np-icon { margin-top: 0; margin-bottom: 12px; }
        .lay-sidebar .np-aside .np-title { font-size: 27px; margin: 0 0 4px; line-height: 1.15; }
        .lay-sidebar .np-aside .np-tagline { font-size: 14px; margin-bottom: 18px; }
        .lay-sidebar .np-aside .np-props { margin-bottom: 0; }
        .lay-sidebar .np-aside .np-prop { padding: 3px 0; margin-left: 0; }
        .lay-sidebar .np-aside .np-prop .pk { width: 62px; min-width: 62px; font-size: 12.5px; }
        .lay-sidebar .np-aside .np-section { margin: 22px 0 0; padding-top: 18px; border-top: 1px solid var(--divider); }
        .lay-sidebar .np-aside .np-h { font-size: 15px; margin-bottom: 11px; }
        .lay-sidebar .np-sb-main { min-width: 0; }
        .lay-sidebar .np-sb-main>:first-child { margin-top: 0; }
        .lay-sidebar .np-sb-main .np-callout { margin: 0 0 26px; }
        .lay-sidebar .np-sb-main .np-section { margin-bottom: 26px; }

        @media (max-width: 720px) {
          .lay-sidebar .np-sb-grid { grid-template-columns: 1fr; gap: 0; padding-top: 20px; }
          .lay-sidebar .np-aside { padding-right: 0; margin-right: 0; border-right: none; border-bottom: 1px solid var(--divider); padding-bottom: 18px; margin-bottom: 22px; }
          .np-body { padding-left: 20px !important; padding-right: 20px !important; }
          .np-title, .lay-minimal .np-min-head .np-title { font-size: 30px; }
        }

        /* 컨테이너 너비가 좁을 때 (narrow-layout) 사이드바 구조 붕괴 처리 */
        .narrow-layout .lay-sidebar .np-sb-grid {
          grid-template-columns: 1fr !important;
          gap: 0 !important;
          padding-top: 20px !important;
        }
        .narrow-layout .lay-sidebar .np-aside {
          padding-right: 0 !important;
          margin-right: 0 !important;
          border-right: none !important;
          border-bottom: 1px solid var(--divider) !important;
          padding-bottom: 18px !important;
          margin-bottom: 22px !important;
        }
        .narrow-layout .np-body {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        .narrow-layout .np-title, 
        .narrow-layout .lay-minimal .np-min-head .np-title {
          font-size: 30px !important;
        }

        /* ===== LAYOUT: MINIMAL ===== */
        .lay-minimal.notion-page { max-width: 680px; }
        .np-min-accent { height: 5px; width: 100%; }
        .lay-minimal .np-body { padding: 46px 44px 0; }
        .lay-minimal .np-min-head { text-align: center; margin-bottom: 30px; }
        .lay-minimal .np-min-head .np-icon { margin: 0 auto 12px; width: 84px; height: 84px; }
        .lay-minimal .np-min-head .np-title { font-size: 36px; }
        .lay-minimal .np-min-head .np-tagline { margin: 6px 0 16px; }
        .lay-minimal .np-min-head .np-props { display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 7px 16px; margin-bottom: 0; }
        .lay-minimal .np-min-head .np-prop { margin-left: 0; padding: 0; min-height: 0; }
        .lay-minimal .np-min-head .np-prop .pk { display: none; }
        .lay-minimal .np-min-head .np-prop .pv { font-size: 13.5px; }
        .lay-minimal .np-callout { margin-top: 6px; }
        .lay-minimal .np-h { font-size: 18px; justify-content: center; text-align: center; }
        .lay-minimal .np-section { text-align: center; }
        .lay-minimal .np-tags { justify-content: center; }
        .lay-minimal .np-item-top { text-align: left; }
        .lay-minimal .np-item { text-align: left; max-width: 520px; margin: 0 auto; }
        .lay-minimal .np-links, .lay-minimal .np-tags.np-proj-tags { justify-content: flex-start; }

        /* ===== LAYOUT: TAB ===== */
        .lay-tab .np-tabbar { display: flex; flex-wrap: wrap; gap: 4px; margin: 10px 0 26px; border-bottom: 1px solid var(--divider); }
        .lay-tab .np-tab { padding: 10px 15px; font-size: 14.5px; font-weight: 600; color: var(--text-faint); border-bottom: 2px solid transparent; margin-bottom: -1px; transition: color .12s, border-color .12s; white-space: nowrap; cursor: pointer; background: none; border: none; }
        .lay-tab .np-tab:hover { color: var(--text); }
        .lay-tab .np-tab.on { color: var(--accent); border-bottom-color: var(--accent); }
        .lay-tab .np-tab-pane { display: none; }
        .lay-tab .np-tab-pane.on { display: block; animation: np-tabfade .26s ease; }
        .lay-tab .np-tab-pane .np-section { margin-bottom: 0; }

        @keyframes np-tabfade {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: none; }
        }

        /* ===== WIDE WIDTH ===== */
        .lay-notion.wide.notion-page { max-width: 1100px; }
        .lay-sidebar.wide.notion-page { max-width: 1240px; }
        .lay-minimal.wide.notion-page { max-width: 880px; }
        .lay-tab.wide.notion-page { max-width: 1100px; }
        .wide .np-body { padding-left: 72px; padding-right: 72px; }
        .lay-minimal.wide .np-body { padding-left: 52px; padding-right: 52px; }

        /* ===== SKINS ===== */
        .np-prop a.pv { color: var(--accent); border-bottom-color: var(--accent); }
        .np-item-link, .np-link-btn:hover { color: var(--accent); }

        /* LINE */
        .sty-line .np-h { font-size: 12.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: var(--text-faint); padding-bottom: 9px; margin-bottom: 16px; border-bottom: 1px solid var(--divider); }
        .sty-line .np-h .he { display: none; }
        .sty-line .np-tag { background: transparent !important; border: 1px solid var(--divider); color: var(--text-light) !important; font-weight: 500; }
        .sty-line .np-callout { background: transparent; border-radius: 0; border-left: 3px solid var(--accent); padding: 4px 0 4px 18px; }
        .sty-line .np-callout .ce { display: none; }
        .sty-line .np-item { border-top: none; padding: 9px 0; }
        .sty-line .np-section { margin-bottom: 34px; }
        .sty-line .np-link-btn { background: transparent; border: 1px solid var(--divider); }

        /* BOLD */
        .sty-bold .np-title { font-size: 46px; letter-spacing: -.03em; }
        .sty-bold .np-h { font-size: 25px; font-weight: 800; color: var(--accent); gap: 11px; margin-bottom: 16px; }
        .sty-bold .np-h::after { content: ""; flex: 1; height: 3px; border-radius: 3px; background: var(--accent); opacity: .22; margin-left: 8px; min-width: 24px; }
        .sty-bold .np-item-title { font-size: 17px; }
        .sty-bold .np-callout { border-left: 4px solid var(--accent); }
        .sty-bold.lay-minimal .np-h::after { display: none; }

        /* MONO */
        .sty-mono .np-h { font-family: var(--font-mono); font-size: 18px; font-weight: 700; }
        .sty-mono .np-h .he { display: none; }
        .sty-mono .np-h::before { content: "# "; color: var(--accent); }
        .sty-mono .np-title { font-family: var(--font-mono); letter-spacing: -.02em; }
        .sty-mono .np-tag { font-family: var(--font-mono); background: transparent !important; border: 1px solid var(--divider); border-radius: 4px; color: var(--text-light) !important; font-size: 12px; }
        .sty-mono .np-item-period, .sty-mono .np-prop .pk { font-family: var(--font-mono); }
        .sty-mono .np-callout { font-family: var(--font-mono); background: var(--callout-bg); border: 1px solid var(--divider); border-radius: 6px; font-size: 13.5px; }
        .sty-mono .np-callout .ce { display: none; }
        .sty-mono .np-callout .ct::before { content: "// "; color: var(--accent); }
        .sty-mono .np-link-btn { font-family: var(--font-mono); border-radius: 4px; }

        /* ===== MOBILE PREVIEW SIMULATOR OVERRIDE ===== */
        .mobile-view {
          --text: #37352f !important;
          --text-light: rgba(55, 53, 47, 0.65) !important;
          --text-faint: rgba(55, 53, 47, 0.42) !important;
          --divider: rgba(55, 53, 47, 0.09) !important;
          --callout-bg: #fbf3db !important;
          --input-bg: rgba(55, 53, 47, 0.055) !important;
          --active-bg: rgba(74, 74, 74, 0.12) !important;
          background: #ffffff !important;
          color: var(--text) !important;
        }
        .mobile-view .np-body { padding-left: 20px !important; padding-right: 20px !important; }
        .mobile-view .np-title, .mobile-view .lay-minimal .np-min-head .np-title { font-size: 26px !important; color: var(--text) !important; }
        .mobile-view .np-tagline { color: var(--text-light) !important; }
        .mobile-view .np-prop .pk { color: var(--text-faint) !important; }
        .mobile-view .np-prop .pv { color: var(--text) !important; }
        .mobile-view .np-callout .ct { color: var(--text) !important; }
        .mobile-view .np-h { font-size: 18px !important; color: var(--text) !important; }
        .mobile-view .np-item-title { color: var(--text) !important; }
        .mobile-view .np-item-sub { color: var(--text-light) !important; }
        .mobile-view .np-item-desc { color: var(--text-light) !important; }
        .mobile-view .np-item-role { color: var(--text-faint) !important; }
        .mobile-view .np-item-period { color: var(--text-faint) !important; }
        .mobile-view .np-link-btn { color: var(--text) !important; background: var(--input-bg) !important; }
        .mobile-view .np-link-btn:hover { background: var(--active-bg) !important; }
      `}</style>
      <div 
        ref={containerRef}
        className={`flex-1 overflow-y-auto transition-colors duration-300 ${viewMode === 'mobile' ? 'p-8 bg-gray-100 dark:bg-gray-900/60 flex justify-center items-center overflow-hidden' : 'bg-white dark:bg-[#191919]'}`}
      >
        {viewMode === 'mobile' ? (
          <div 
            className="transition-transform duration-200 ease-out origin-center"
            style={{ transform: `scale(${scale})` }}
          >
            <div className="relative mx-auto my-4 bg-black p-[12px] rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[4px] border-[#2c2c2e] select-none" style={{ width: '393px', height: '812px' }}>
              {/* Dynamic Island */}
              <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-[20px] z-50 flex items-center justify-between px-3.5">
                <div className="w-[11px] h-[11px] rounded-full bg-[#111] border-[1px] border-[#222]" />
                <div className="w-[8px] h-[8px] rounded-full bg-[#111]" />
              </div>

              {/* Ear Speaker */}
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[60px] h-[4px] bg-[#1a1a1a] rounded-[2px] z-50" />

              {/* Screen */}
              <div className="w-full h-full rounded-[38px] overflow-hidden bg-white relative flex flex-col border border-black/10">
                <div className="flex-1 overflow-y-auto hide-scrollbar pt-[36px] pb-[20px]">
                  <div
                    data-pofo-page
                    className={`${pageClass} mobile-view`}
                    style={{ ['--accent' as any]: accent }}
                  >
                    {layout === 'minimal' ? null : coverEl}
                    {renderLayoutContent()}
                  </div>
                </div>

                {/* Home Bar */}
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[120px] h-[4.5px] bg-[#8e8e93] rounded-[3px] z-50 pointer-events-none opacity-80" />
              </div>
            </div>
          </div>
        ) : (
          <div
            data-pofo-page
            className={pageClass}
            style={{ ['--accent' as any]: accent }}
          >
            {layout === 'minimal' ? null : coverEl}
            {renderLayoutContent()}
          </div>
        )}
      </div>
    </div>
  );
}
