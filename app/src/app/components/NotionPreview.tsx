import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { usePortfolio } from '../hooks/usePortfolioState';
import { GRADIENTS, makeGradient, TAG_LIGHT, TAG_DARK, FONT_STACKS } from '../constants';
import { Github, ExternalLink, Wrench, Box, Briefcase, Rocket, GraduationCap, ScrollText, Lightbulb, Pin } from 'lucide-react';
import { PreviewControlBar } from './PreviewControlBar';


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
  const { state, viewMode } = usePortfolio();
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

  const coverBg = useMemo(() => {
    if (state.theme.coverImg) return `url(${state.theme.coverImg})`;
    if (state.theme.solidColor) return state.theme.solidColor;
    if (state.theme.gradientCustom) return makeGradient(state.theme.gradientCustom);
    return GRADIENTS[state.theme.cover] || GRADIENTS.graphite;
  }, [state.theme.coverImg, state.theme.solidColor, state.theme.gradientCustom, state.theme.cover]);

  const accentColor = useMemo(() => {
    let hex = state.theme.accent || state.theme.solidColor || state.theme.gradientCustom || '';
    if (!hex) {
      const g = GRADIENTS[state.theme.cover] || GRADIENTS.graphite;
      const m = g.match(/#([0-9a-fA-F]{6})/);
      hex = m ? '#' + m[1] : '#4A4A4A';
    }
    return dark ? brightenForDark(hex) : hex;
  }, [state.theme.accent, state.theme.solidColor, state.theme.gradientCustom, state.theme.cover, dark]);

  const normUrl = useCallback((url: string) => {
    const u = (url || '').trim();
    if (!u) return '#';
    if (/^https?:\/\//i.test(u) || u.startsWith('mailto:')) return u;
    return 'https://' + u;
  }, []);

  const renderTag = useCallback((text: string) => {
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
  }, [dark]);

  const sectionHeader = useCallback((icon: React.ReactNode, title: string) => (
    <h2 className="np-h">
      <span className="he">{icon}</span>
      <span className="ht">{title}</span>
    </h2>
  ), []);

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
  const accent = accentColor;

  const [activeTab, setActiveTab] = useState<string>('');
  const layout = state.theme.layout || 'notion';

  // 1. Available sections and their render functions
  const skillsSec = skills.length > 0 ? (
    <div className="np-section" data-section-id="skills">
      {sectionHeader(<Wrench className="w-5 h-5" />, '기술 스택')}
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
      {sectionHeader(<Box className="w-5 h-5" />, '서비스 · 도구')}
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
      {sectionHeader(<Briefcase className="w-5 h-5" />, '경력')}
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
      {sectionHeader(<Rocket className="w-5 h-5" />, '프로젝트')}
      <div>
        {state.projects.map((proj, i) => {
          const techs = proj.tech?.split(',').map((t) => t.trim()).filter(Boolean) || [];
          const demo = proj.demo || proj.link;
          const links = [];
          if (proj.repo) links.push({ type: 'github', href: proj.repo, text: 'GitHub' });
          if (demo) links.push({ type: 'external', href: demo, text: '데모' });

          return (
            <div key={i} className="np-item">
              {proj.image && (
                <div className="rounded-lg overflow-hidden mb-2 border border-gray-200 dark:border-gray-800">
                  <img src={proj.image} alt={proj.name} className="w-full h-40 object-cover" />
                </div>
              )}
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
      {sectionHeader(<GraduationCap className="w-5 h-5" />, '교육')}
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

  const STATUS_STYLE: Record<string, { cls: string; label: string }> = {
    acquired: { cls: 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200', label: '취득' },
    preparing: { cls: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200', label: '준비 중' },
    planned: { cls: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400', label: '예정' },
  };

  const certSec = state.certifications.length > 0 ? (
    <div className="np-section" data-section-id="certifications">
      {sectionHeader(<ScrollText className="w-5 h-5" />, '자격증')}
      <div className="flex flex-wrap gap-2">
        {state.certifications.map((cert, i) => {
          const s = STATUS_STYLE[cert.status] || STATUS_STYLE.planned;
          return (
            <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${s.cls}`}>
              {cert.name}
              <span className="text-[10px] opacity-70 font-semibold">{s.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  ) : null;

  const ghRepos = state.github?.repos || [];
  const ghUser = state.github?.user;
  const ghSec = ghRepos.length > 0 ? (
    <div className="np-section" data-section-id="github">
      {sectionHeader(<Github className="w-5 h-5" />, 'GitHub')}
      <div className="grid grid-cols-2 gap-2">
        {ghRepos.slice(0, 6).map((r: any, i: number) => (
          <a
            key={i}
            href={r.html_url}
            target="_blank"
            rel="noreferrer"
            className="block p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">{r.name}</span>
              {r.stargazers_count > 0 && (
                <span className="text-[10px] text-gray-500 dark:text-gray-400 flex-shrink-0">★ {r.stargazers_count}</span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{r.description || '설명 없음'}</p>
            {r.language && (
              <span className="mt-1.5 inline-block text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {r.language}
              </span>
            )}
          </a>
        ))}
      </div>
      {ghUser && (
        <div className="mt-2 text-center">
          <a href={`https://github.com/${ghUser}`} target="_blank" rel="noreferrer" className="text-[11px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline">
            github.com/{ghUser} 에서 더 보기
          </a>
        </div>
      )}
    </div>
  ) : null;

  const renderCustomSec = (section: typeof state.custom[0]) => {
    const items = section.items?.filter((item) => item.title) || [];
    if (items.length === 0) return null;

    return (
      <div key={section.id} className="np-section" data-section-id={section.id}>
        {sectionHeader(section.emoji ? <span>{section.emoji}</span> : <Pin className="w-5 h-5" />, section.title || '커스텀 섹션')}
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
    certifications: certSec,
    github: ghSec,
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
      style={{ background: coverBg, backgroundSize: 'cover', backgroundPosition: 'center' }}
    />
  );

  const accentEl = noCover ? null : (
    <div
      className="np-min-accent"
      style={{ background: coverBg }}
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
      <span className="ce"><Lightbulb className="w-5 h-5" /></span>
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
                  className={`np-tab-pane ${active ? 'on block' : 'hidden'}`}
                  data-tab-id={k}
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
      <PreviewControlBar />

      <div
        ref={containerRef}
        className={`flex-1 overflow-y-auto transition-colors duration-300 ${viewMode === 'mobile' ? 'p-8 bg-gray-100 dark:bg-gray-900/60 flex justify-center items-center overflow-hidden' : 'bg-white dark:bg-[#191919]'}`}
      >
        {viewMode === 'mobile' ? (
          <div 
            className="transition-transform duration-200 ease-out origin-center"
            style={{ transform: `scale(${scale})` }}
          >
            <div className="relative mx-auto my-4 bg-black p-[12px] rounded-[50px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-[4px] border-[#2c2c2e] select-none" style={{ width: 393, height: 812 }}>
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
