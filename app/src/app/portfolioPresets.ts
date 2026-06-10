import type { PortfolioState } from './types';

export interface PortfolioPreset {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  department: string;
  state: Partial<PortfolioState>;
}

// ──────────────────────────────────────────────
// 유한대학교 전 학부·학과 포트폴리오 프리셋
// ──────────────────────────────────────────────

export const PORTFOLIO_PRESETS: PortfolioPreset[] = [

  // ═══════════════════════════════════════
  // 자유전공학과
  // ═══════════════════════════════════════
  {
    id: 'free_major',
    name: '자유전공학과',
    emoji: '🌐',
    desc: '다양한 분야를 융합한 자기주도 포트폴리오',
    department: '자유전공학과',
    state: {
      profile: { name: '이하늘', role: '융합 전공자', tagline: '경계를 넘나들며 나만의 길을 설계하는 자유전공 인재입니다.', location: '서울, 대한민국', email: 'haneul@pofo.dev', github: '', website: '', emoji: '🌐', iconImg: '', iconShape: 'circle', links: [] },
      about: '다양한 학문 분야를 자기주도적으로 탐색하고 융합하여 고유한 역량을 설계하고 있습니다. 기획력과 데이터 분석 능력을 바탕으로 다학제적 프로젝트를 주도해왔습니다.',
      skills: '기획, 데이터 분석, 프레젠테이션, 커뮤니케이션, 리서치, Python, Excel',
      tools: ['Notion', 'Slack', 'Figma', 'Google Sheets'],
      experience: [{ role: '프로젝트 기획 인턴', company: '○○ 스타트업', period: '2024.06 ~ 2024.12', desc: '• 신규 서비스 기획안 작성 및 유저 리서치 진행\n• 경쟁사 분석 보고서 작성 및 발표', level: '', type: '인턴' }],
      projects: [{ name: '다학제 융합 캡스톤 프로젝트', period: '2024.03 ~ 2024.11', role: '팀장 / 기획 및 발표 (팀 5명)', tech: 'Python, Notion, Canva', desc: '사회 문제 해결을 위한 융합 솔루션 기획 및 프로토타입 제작', result: '캡스톤 경진대회 장려상 수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '자유전공학과', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },

  // ═══════════════════════════════════════
  // 공학부
  // ═══════════════════════════════════════
  {
    id: 'comp_sw',
    name: '컴퓨터소프트웨어전공',
    emoji: '💻',
    desc: '웹·앱·시스템 소프트웨어 개발',
    department: '공학부',
    state: {
      profile: { name: '홍길동', role: 'Software Developer', tagline: '사용자 경험을 최우선으로 생각하는 소프트웨어 개발자입니다.', location: '서울, 대한민국', email: 'gildong@pofo.dev', github: 'github.com/gildong-dev', website: '', emoji: '💻', iconImg: '', iconShape: 'circle', links: [{ label: 'GitHub', url: 'github.com/gildong-dev' }] },
      about: '웹 풀스택 개발과 클라우드 인프라에 관심이 있는 컴퓨터소프트웨어 전공자입니다. React, Spring Boot 기반 프로젝트를 주도해왔으며, 협업 도구를 적극 활용한 애자일 개발 경험이 있습니다.',
      skills: 'Java, Python, JavaScript, React, Spring Boot, MySQL, Git, REST API',
      tools: ['VS Code', 'IntelliJ', 'GitHub', 'Slack', 'Notion', 'Docker'],
      experience: [{ role: '웹 개발 인턴', company: '○○ 테크', period: '2024.06 ~ 2024.12', desc: '• 사내 어드민 대시보드 프론트엔드 개발\n• RESTful API 설계 및 구현', level: '', type: '인턴' }],
      projects: [{ name: '캠퍼스 중고거래 플랫폼', period: '2024.03 ~ 2024.11', role: '풀스택 개발 (팀 4명, 기여도 40%)', tech: 'React, Spring Boot, MySQL, AWS', desc: '교내 학생 대상 중고 물품 거래 웹 플랫폼 설계 및 개발', result: '교내 SW 경진대회 대상 수상, 일일 활성 사용자 200명', repo: 'github.com/gildong-dev/campus-market', demo: '' }],
      education: [{ school: '유한대학교', degree: '컴퓨터소프트웨어전공 (공학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'mech_sys',
    name: '기계시스템전공',
    emoji: '⚙️',
    desc: '기계 설계·제조 및 시스템 엔지니어링',
    department: '공학부',
    state: {
      profile: { name: '김도현', role: '기계 엔지니어', tagline: '정밀한 설계와 시뮬레이션으로 가치를 만드는 기계공학 전공자입니다.', location: '서울, 대한민국', email: 'dohyun@pofo.dev', github: '', website: '', emoji: '⚙️', iconImg: '', iconShape: 'circle', links: [] },
      about: 'CAD/CAM 기반 정밀 설계와 3D 프린팅, 유한요소해석(FEA)에 역량을 갖춘 기계시스템 전공자입니다. 자동화 설비 및 로봇 시스템에 관심이 있으며, 현장 실습을 통해 실무 감각을 키워왔습니다.',
      skills: 'AutoCAD, SolidWorks, CATIA, ANSYS, 3D Printing, CNC, PLC, 유압/공압',
      tools: ['SolidWorks', 'AutoCAD', 'ANSYS', 'MATLAB'],
      experience: [{ role: '생산기술 실습생', company: '○○ 제조', period: '2024.06 ~ 2024.08', desc: '• CNC 가공 공정 최적화 보조\n• 3D 모델링 및 도면 작성', level: '', type: '인턴' }],
      projects: [{ name: '자동화 컨베이어 시스템 설계', period: '2024.03 ~ 2024.11', role: '기구 설계 담당 (팀 4명)', tech: 'SolidWorks, Arduino, PLC', desc: '소형 물류 자동 분류 컨베이어 시스템 설계 및 프로토타입 제작', result: '캡스톤 디자인 우수상 수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '기계시스템전공 (공학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'fire_safety',
    name: '소방설비안전전공',
    emoji: '🧯',
    desc: '소방 설비 설계·점검 및 안전 관리',
    department: '공학부',
    state: {
      profile: { name: '박진우', role: '소방안전 기술자', tagline: '안전한 환경을 설계하는 소방설비안전 전공자입니다.', location: '서울, 대한민국', email: 'jinwoo@pofo.dev', github: '', website: '', emoji: '🧯', iconImg: '', iconShape: 'circle', links: [] },
      about: '소방 설비 설계, 점검 및 방재 계획 수립에 전문성을 갖춘 안전 분야 전공자입니다. 소방설비기사 자격을 취득하였으며, 현장 실습을 통해 실무 역량을 강화하고 있습니다.',
      skills: '소방설비 설계, 화재 시뮬레이션, 방재 계획, 위험성 평가, 소방법규, AutoCAD, 전기회로',
      tools: ['AutoCAD', 'Revit'],
      experience: [{ role: '소방점검 보조', company: '○○ 안전 엔지니어링', period: '2024.07 ~ 2024.09', desc: '• 건축물 소방 설비 정기 점검 보조\n• 소방 도면 검토 및 보고서 작성', level: '', type: '인턴' }],
      projects: [{ name: '고층 건물 스프링클러 시스템 설계', period: '2024.04 ~ 2024.10', role: '설계 담당 (팀 3명)', tech: 'AutoCAD, Excel, 소방법규', desc: '20층 규모 상업 건물 소방 스프링클러 설비 설계 및 시뮬레이션', result: '소방 설비 공모전 입선', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '소방설비안전전공 (공학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'elec_eng',
    name: '전기공학전공',
    emoji: '⚡',
    desc: '전력 시스템·전기 설비 설계 및 제어',
    department: '공학부',
    state: {
      profile: { name: '최민서', role: '전기 엔지니어', tagline: '전력 시스템과 제어 기술로 미래 에너지를 설계합니다.', location: '서울, 대한민국', email: 'minseo@pofo.dev', github: '', website: '', emoji: '⚡', iconImg: '', iconShape: 'circle', links: [] },
      about: '전력 시스템 설계, 신재생에너지 및 전기 제어 분야에 관심을 가진 전기공학 전공자입니다. 전기기사 자격을 준비하며 실무 회로 설계 및 시뮬레이션 역량을 갖추고 있습니다.',
      skills: '회로 설계, 전력 시스템, PLC, 시퀀스 제어, AutoCAD Electrical, PSCAD, 신재생에너지',
      tools: ['AutoCAD', 'MATLAB', 'LabVIEW'],
      experience: [{ role: '전기설비 실습생', company: '○○ 전력', period: '2024.06 ~ 2024.08', desc: '• 수배전반 설계 도면 작성 보조\n• 전기 설비 점검 및 데이터 기록', level: '', type: '인턴' }],
      projects: [{ name: '태양광 발전 모니터링 시스템', period: '2024.03 ~ 2024.11', role: '회로 설계 및 데이터 수집 (팀 4명)', tech: 'Arduino, MATLAB, 센서', desc: '소규모 태양광 패널 발전량 실시간 모니터링 및 분석 시스템 구축', result: '에너지 공모전 장려상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '전기공학전공 (공학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'electronic_eng',
    name: '전자공학전공',
    emoji: '🔌',
    desc: '임베디드 시스템·반도체·통신 기술',
    department: '공학부',
    state: {
      profile: { name: '정예준', role: '전자 엔지니어', tagline: '임베디드와 IoT 기술로 스마트한 세상을 구현합니다.', location: '서울, 대한민국', email: 'yejun@pofo.dev', github: '', website: '', emoji: '🔌', iconImg: '', iconShape: 'circle', links: [] },
      about: '임베디드 시스템, IoT, PCB 설계에 역량을 갖춘 전자공학 전공자입니다. ARM 마이크로컨트롤러 프로그래밍과 아날로그/디지털 회로 설계에 경험이 있습니다.',
      skills: 'C/C++, 임베디드, ARM, PCB 설계, IoT, 통신 프로토콜, FPGA, VHDL',
      tools: ['VS Code', 'Altium Designer', 'Oscilloscope'],
      experience: [{ role: '하드웨어 개발 실습생', company: '○○ 전자', period: '2024.07 ~ 2024.09', desc: '• IoT 센서 모듈 테스트 및 PCB 레이아웃 검증\n• 펌웨어 디버깅 보조', level: '', type: '인턴' }],
      projects: [{ name: 'IoT 스마트 홈 제어 시스템', period: '2024.03 ~ 2024.11', role: '회로 설계 및 펌웨어 개발 (팀 3명)', tech: 'STM32, MQTT, PCB, C', desc: '온습도·조도 센서 기반 스마트 홈 환경 자동 제어 시스템', result: '졸업작품 전시회 최우수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '전자공학전공 (공학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'game_content',
    name: '게임콘텐츠전공',
    emoji: '🎮',
    desc: '게임 기획·개발·아트 콘텐츠 제작',
    department: '공학부',
    state: {
      profile: { name: '윤서현', role: 'Game Developer', tagline: '몰입감 있는 게임 세계를 설계하고 구현하는 개발자입니다.', location: '서울, 대한민국', email: 'seohyun@pofo.dev', github: '', website: '', emoji: '🎮', iconImg: '', iconShape: 'circle', links: [] },
      about: 'Unity 엔진 기반 게임 개발과 기획에 역량을 가진 전공자입니다. 게임 메카닉 설계부터 레벨 디자인, UI/UX까지 게임 제작 전반의 파이프라인을 경험했습니다.',
      skills: 'Unity, C#, 게임 기획, 레벨 디자인, 3D 모델링, Blender, Shader, UI/UX',
      tools: ['Unity', 'Blender', 'Photoshop', 'VS Code'],
      experience: [{ role: '게임 QA 인턴', company: '○○ 게임즈', period: '2024.07 ~ 2024.09', desc: '• 모바일 게임 QA 테스트 수행 및 버그 리포트 작성\n• 게임 밸런스 데이터 분석 보조', level: '', type: '인턴' }],
      projects: [{ name: '2D 로그라이크 던전 게임', period: '2024.03 ~ 2024.11', role: '게임 기획 및 개발 (팀 3명)', tech: 'Unity, C#, Photoshop', desc: '랜덤 맵 생성 알고리즘 기반 2D 로그라이크 게임 기획 및 개발', result: '인디 게임 전시회 출품, 다운로드 500건', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '게임콘텐츠전공 (공학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'ai_major',
    name: '인공지능전공',
    emoji: '🤖',
    desc: 'AI·머신러닝·딥러닝 모델 개발',
    department: '공학부',
    state: {
      profile: { name: '강지호', role: 'AI Engineer', tagline: '데이터와 알고리즘으로 지능형 솔루션을 만드는 AI 전공자입니다.', location: '서울, 대한민국', email: 'jiho@pofo.dev', github: 'github.com/jiho-ai', website: '', emoji: '🤖', iconImg: '', iconShape: 'circle', links: [{ label: 'GitHub', url: 'github.com/jiho-ai' }] },
      about: '컴퓨터 비전, 자연어 처리 분야에 관심을 가진 인공지능 전공자입니다. TensorFlow/PyTorch 기반 모델 학습 및 배포 파이프라인 구축 경험이 있으며, 데이터 전처리부터 서비스 통합까지 전 과정을 수행합니다.',
      skills: 'Python, TensorFlow, PyTorch, OpenCV, NLP, 데이터 분석, SQL, Docker',
      tools: ['VS Code', 'Jupyter', 'GitHub', 'Google Colab'],
      experience: [{ role: 'AI 리서치 인턴', company: '○○ AI 연구소', period: '2024.06 ~ 2024.12', desc: '• 이미지 분류 모델 학습 및 성능 튜닝\n• 데이터 전처리 파이프라인 구축', level: '', type: '인턴' }],
      projects: [{ name: '실시간 마스크 착용 감지 시스템', period: '2024.03 ~ 2024.11', role: '모델 개발 및 배포 (팀 3명)', tech: 'Python, YOLOv8, OpenCV, Flask', desc: '웹캠 기반 실시간 마스크 착용 여부 판별 AI 시스템', result: 'mAP 95.2% 달성, 교내 AI 경진대회 우수상', repo: 'github.com/jiho-ai/mask-detect', demo: '' }],
      education: [{ school: '유한대학교', degree: '인공지능전공 (공학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },

  // ═══════════════════════════════════════
  // 디자인문화학부
  // ═══════════════════════════════════════
  {
    id: 'industrial_design',
    name: '산업디자인전공',
    emoji: '🏭',
    desc: '제품 디자인·CMF·사용자 중심 설계',
    department: '디자인문화학부',
    state: {
      profile: { name: '한소율', role: 'Product Designer', tagline: '사용자 중심 사고로 일상의 제품을 혁신하는 산업디자이너입니다.', location: '서울, 대한민국', email: 'soyul@pofo.dev', github: '', website: '', emoji: '🏭', iconImg: '', iconShape: 'circle', links: [{ label: 'Behance', url: 'behance.net/soyul' }] },
      about: '사용자 리서치와 인체공학 기반의 제품 디자인에 전문성을 가진 전공자입니다. 3D 모델링부터 목업 제작, CMF 선정까지 제품 개발 전 과정을 경험했습니다.',
      skills: 'Rhino 3D, KeyShot, Sketch, CMF, 3D Printing, 사용자 리서치, 인체공학',
      tools: ['Rhino', 'KeyShot', 'Illustrator', 'Photoshop'],
      experience: [{ role: '디자인 인턴', company: '○○ 디자인랩', period: '2024.06 ~ 2024.08', desc: '• 생활가전 제품 디자인 보조\n• 3D 렌더링 및 프레젠테이션 자료 제작', level: '', type: '인턴' }],
      projects: [{ name: '시니어 친화 스마트 리모컨 디자인', period: '2024.03 ~ 2024.11', role: '콘셉트 디자인 및 목업 제작 (팀 3명)', tech: 'Rhino, KeyShot, 3D Printing', desc: '고령 사용자를 위한 대형 버튼·음성 안내 기능 리모컨 제품 디자인', result: '산업디자인 공모전 은상 수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '산업디자인전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'visual_design',
    name: '시각디자인전공',
    emoji: '🎨',
    desc: '그래픽·브랜딩·타이포그래피 디자인',
    department: '디자인문화학부',
    state: {
      profile: { name: '김이슬', role: 'Graphic Designer', tagline: '시각 언어로 브랜드의 가치를 전달하는 디자이너입니다.', location: '서울, 대한민국', email: 'iseul@pofo.dev', github: '', website: '', emoji: '🎨', iconImg: '', iconShape: 'circle', links: [{ label: 'Behance', url: 'behance.net/iseul' }] },
      about: '브랜딩, 편집 디자인, 타이포그래피에 강점을 가진 시각디자인 전공자입니다. 인쇄물부터 디지털 미디어까지 다양한 매체의 그래픽 작업 경험을 보유하고 있습니다.',
      skills: '브랜딩, 편집 디자인, 타이포그래피, 인포그래픽, UI 디자인, 일러스트레이션',
      tools: ['Illustrator', 'Photoshop', 'InDesign', 'Figma'],
      experience: [{ role: '그래픽 디자인 인턴', company: '○○ 크리에이티브', period: '2024.06 ~ 2024.08', desc: '• 클라이언트 브랜드 아이덴티티 시안 제작\n• SNS 콘텐츠 그래픽 디자인', level: '', type: '인턴' }],
      projects: [{ name: '로컬 카페 브랜드 아이덴티티 디자인', period: '2024.03 ~ 2024.10', role: 'BI 기획 및 디자인 전체 (개인)', tech: 'Illustrator, Photoshop, InDesign', desc: '로고, 패키지, 메뉴판, 간판 등 카페 전체 브랜딩 디자인 프로젝트', result: '졸업작품 전시 우수작 선정', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '시각디자인전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'fashion_design',
    name: '패션디자인전공',
    emoji: '👗',
    desc: '패션 기획·패턴 설계·컬렉션 제작',
    department: '디자인문화학부',
    state: {
      profile: { name: '오수아', role: 'Fashion Designer', tagline: '트렌드와 개성을 조화시키는 패션 디자이너입니다.', location: '서울, 대한민국', email: 'sua@pofo.dev', github: '', website: '', emoji: '👗', iconImg: '', iconShape: 'circle', links: [] },
      about: '패션 트렌드 분석, 패턴 설계, 봉제 기술에 역량을 갖춘 패션디자인 전공자입니다. 자체 미니 컬렉션 기획부터 런웨이 참가까지의 전 과정을 경험했습니다.',
      skills: '패턴 설계, 드레이핑, 봉제, 트렌드 분석, 텍스타일, CLO 3D, 일러스트레이션',
      tools: ['CLO 3D', 'Illustrator', 'Photoshop'],
      experience: [{ role: '디자인실 인턴', company: '○○ 어패럴', period: '2024.06 ~ 2024.08', desc: '• S/S 시즌 샘플 제작 보조\n• 소재 리서치 및 트렌드 보드 제작', level: '', type: '인턴' }],
      projects: [{ name: '업사이클링 캡슐 컬렉션', period: '2024.03 ~ 2024.11', role: '디자인 기획 및 제작 (개인)', tech: 'CLO 3D, 패턴 CAD, 봉제', desc: '데님 리사이클 소재를 활용한 6벌 캡슐 컬렉션 기획 및 제작', result: '교내 패션쇼 베스트 드레서상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '패션디자인전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'interior_arch',
    name: '실내건축전공',
    emoji: '🏠',
    desc: '공간 기획·인테리어·건축 설계',
    department: '디자인문화학부',
    state: {
      profile: { name: '장우진', role: 'Interior Designer', tagline: '사람과 공간의 조화를 설계하는 실내건축 전공자입니다.', location: '서울, 대한민국', email: 'woojin@pofo.dev', github: '', website: '', emoji: '🏠', iconImg: '', iconShape: 'circle', links: [] },
      about: '공간 기획, 실내 설계, 3D 시각화에 전문성을 갖춘 실내건축 전공자입니다. AutoCAD, SketchUp, V-Ray 등 설계 도구 활용 능력과 시공 현장 실습 경험을 보유하고 있습니다.',
      skills: 'AutoCAD, SketchUp, 3ds Max, V-Ray, Revit, 공간 기획, 마감재 선정, 시공 도면',
      tools: ['AutoCAD', 'SketchUp', 'Photoshop', 'Illustrator'],
      experience: [{ role: '인테리어 설계 보조', company: '○○ 건축사사무소', period: '2024.06 ~ 2024.08', desc: '• 주거 공간 실측 및 도면 작성\n• 3D 투시도 렌더링 작업 보조', level: '', type: '인턴' }],
      projects: [{ name: '소형 카페 인테리어 리노베이션', period: '2024.03 ~ 2024.11', role: '공간 기획 및 설계 (팀 2명)', tech: 'AutoCAD, SketchUp, V-Ray', desc: '20평 규모 카페 리노베이션 기획부터 3D 시각화, 마감재 선정까지', result: '실내건축 공모전 입선', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '실내건축전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'ad_media',
    name: '광고미디어전공',
    emoji: '📢',
    desc: '광고 기획·카피라이팅·미디어 전략',
    department: '디자인문화학부',
    state: {
      profile: { name: '임채원', role: 'Ad Planner / Copywriter', tagline: '소비자의 마음을 움직이는 광고 크리에이터입니다.', location: '서울, 대한민국', email: 'chaewon@pofo.dev', github: '', website: '', emoji: '📢', iconImg: '', iconShape: 'circle', links: [] },
      about: '광고 기획, 카피라이팅, 미디어 전략 수립에 역량을 가진 광고미디어 전공자입니다. 브랜드 캠페인 기획부터 디지털 퍼포먼스 마케팅까지 폭넓은 실무 경험이 있습니다.',
      skills: '광고 기획, 카피라이팅, 미디어 플래닝, SNS 마케팅, 영상 기획, 프레젠테이션',
      tools: ['Photoshop', 'Premiere Pro', 'Notion', 'Google Analytics'],
      experience: [{ role: '마케팅 인턴', company: '○○ 광고 에이전시', period: '2024.06 ~ 2024.08', desc: '• SNS 광고 콘텐츠 기획 및 카피 작성\n• 캠페인 성과 리포트 작성', level: '', type: '인턴' }],
      projects: [{ name: '지역 소상공인 브랜드 캠페인', period: '2024.03 ~ 2024.10', role: '기획 및 카피 (팀 4명)', tech: 'Photoshop, Premiere Pro, Instagram', desc: '지역 소상공인 3곳 대상 SNS 브랜드 캠페인 기획·실행·성과 분석', result: '대한민국 광고대상 학생 부문 입선', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '광고미디어전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'broadcast_video',
    name: '방송영상전공',
    emoji: '🎬',
    desc: '영상 촬영·편집·방송 콘텐츠 제작',
    department: '디자인문화학부',
    state: {
      profile: { name: '신태호', role: 'Video Producer', tagline: '이야기를 영상으로 완성하는 방송영상 전공자입니다.', location: '서울, 대한민국', email: 'taeho@pofo.dev', github: '', website: '', emoji: '🎬', iconImg: '', iconShape: 'circle', links: [] },
      about: '다큐멘터리, 단편영화, 유튜브 콘텐츠 등 다양한 영상 제작 경험을 가진 방송영상 전공자입니다. 촬영, 조명, 편집, 색보정까지 영상 제작 전 과정의 역량을 보유하고 있습니다.',
      skills: '촬영, 편집, 색보정, 조명, 사운드, 스토리보드, 유튜브 콘텐츠 기획',
      tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Photoshop'],
      experience: [{ role: '영상 제작 인턴', company: '○○ 프로덕션', period: '2024.06 ~ 2024.08', desc: '• 기업 홍보 영상 촬영 보조 및 편집\n• 유튜브 콘텐츠 자막 작업 및 썸네일 제작', level: '', type: '인턴' }],
      projects: [{ name: '단편 다큐멘터리 「우리 동네」', period: '2024.03 ~ 2024.11', role: '연출 및 편집 (팀 5명)', tech: 'Premiere Pro, After Effects, 4K 카메라', desc: '지역 전통시장 상인들의 일상을 기록한 15분 단편 다큐멘터리', result: '대학생 영상 공모전 최우수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '방송영상전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'animation_webtoon',
    name: '애니메이션웹툰전공',
    emoji: '✏️',
    desc: '웹툰·애니메이션·디지털 일러스트',
    department: '디자인문화학부',
    state: {
      profile: { name: '고은서', role: 'Webtoon Artist / Animator', tagline: '그림과 이야기로 세계를 창조하는 웹툰·애니메이션 작가입니다.', location: '서울, 대한민국', email: 'eunseo@pofo.dev', github: '', website: '', emoji: '✏️', iconImg: '', iconShape: 'circle', links: [] },
      about: '웹툰 연재, 2D 애니메이션 제작, 디지털 일러스트에 역량을 가진 전공자입니다. 스토리 구성부터 작화, 채색, 후반 작업까지 1인 제작 파이프라인을 갖추고 있습니다.',
      skills: '웹툰 제작, 2D 애니메이션, 디지털 일러스트, 스토리보드, 캐릭터 디자인, 채색',
      tools: ['Clip Studio Paint', 'Photoshop', 'After Effects', 'Procreate'],
      experience: [{ role: '웹툰 어시스턴트', company: '○○ 작가 스튜디오', period: '2024.06 ~ 2024.08', desc: '• 네이버 웹툰 연재작 배경 작화 보조\n• 채색 및 후반 효과 작업', level: '', type: '아르바이트' }],
      projects: [{ name: '단편 웹툰 「캠퍼스 다이어리」', period: '2024.03 ~ 2024.11', role: '스토리·작화·채색 전체 (개인)', tech: 'Clip Studio Paint, Photoshop', desc: '대학 생활을 소재로 한 10화 완결 단편 웹툰 연재', result: '교내 웹툰 공모전 대상, 조회수 5만 달성', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '애니메이션웹툰전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'broadcast_writing',
    name: '방송문예창작전공',
    emoji: '📝',
    desc: '방송 작가·시나리오·문예 창작',
    department: '디자인문화학부',
    state: {
      profile: { name: '백서연', role: '방송 작가 / 시나리오 작가', tagline: '언어의 힘으로 이야기를 구축하는 방송문예 전공자입니다.', location: '서울, 대한민국', email: 'seoyeon@pofo.dev', github: '', website: '', emoji: '📝', iconImg: '', iconShape: 'circle', links: [] },
      about: '방송 대본, 시나리오, 웹소설 등 다양한 장르의 글쓰기에 역량을 가진 방송문예창작 전공자입니다. 구성 작가 실습과 문학 공모전 수상 경험을 통해 실무 감각을 키워왔습니다.',
      skills: '시나리오 작법, 방송 대본, 카피라이팅, 웹소설, 편집, 스토리텔링, 교정·교열',
      tools: ['MS Word', 'Notion', 'Final Draft'],
      experience: [{ role: '구성 작가 실습', company: '○○ 방송국', period: '2024.06 ~ 2024.08', desc: '• 예능 프로그램 리서치 및 구성안 작성\n• 자막 대본 및 내레이션 스크립트 작성', level: '', type: '인턴' }],
      projects: [{ name: '단편 시나리오 「첫 페이지」', period: '2024.03 ~ 2024.10', role: '각본 및 연출 (개인)', tech: 'Final Draft, 촬영/편집 협업', desc: '대학 새내기의 성장을 다룬 20분 분량 단편영화 시나리오 집필 및 촬영 협업', result: '대학생 문학상 시나리오 부문 가작', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '방송문예창작전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'broadcast_perform',
    name: '방송연예전공',
    emoji: '🎤',
    desc: '연기·MC·엔터테인먼트 퍼포먼스',
    department: '디자인문화학부',
    state: {
      profile: { name: '류지안', role: '퍼포머 / MC', tagline: '무대 위에서 빛나는 엔터테이너를 꿈꾸는 방송연예 전공자입니다.', location: '서울, 대한민국', email: 'jian@pofo.dev', github: '', website: '', emoji: '🎤', iconImg: '', iconShape: 'circle', links: [] },
      about: '연기, MC, 보컬 등 다양한 퍼포먼스 역량을 갖춘 방송연예 전공자입니다. 교내 뮤지컬, 축제 MC, 유튜브 콘텐츠 출연 등 실전 경험을 통해 무대 장악력을 키워왔습니다.',
      skills: '연기, MC·진행, 보컬, 댄스, 프레젠테이션, 유튜브 출연, 자기 브랜딩',
      tools: ['Premiere Pro', 'Canva'],
      experience: [{ role: '엔터 연습생', company: '○○ 엔터테인먼트', period: '2024.01 ~ 2024.06', desc: '• 보컬·댄스 트레이닝 및 정기 평가\n• 사내 쇼케이스 무대 참여', level: '', type: '계약직' }],
      projects: [{ name: '교내 뮤지컬 「청춘 극장」', period: '2024.05 ~ 2024.11', role: '주연 및 보컬 디렉팅', tech: '무대 연출, 음향, 조명', desc: '교내 정기 뮤지컬 공연 주연 배우 및 보컬 파트 디렉팅 참여', result: '2회 공연 전석 매진 (총 관객 800명)', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '방송연예전공 (디자인문화학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },

  // ═══════════════════════════════════════
  // 건강보건학부
  // ═══════════════════════════════════════
  {
    id: 'food_nutrition',
    name: '식품영양학과',
    emoji: '🍎',
    desc: '영양사·식품 위생·급식 관리',
    department: '건강보건학부',
    state: {
      profile: { name: '문하영', role: '영양사', tagline: '균형 잡힌 식단과 안전한 식품으로 건강을 설계합니다.', location: '서울, 대한민국', email: 'hayoung@pofo.dev', github: '', website: '', emoji: '🍎', iconImg: '', iconShape: 'circle', links: [] },
      about: '임상 영양, 단체급식 관리, 식품 위생에 전문성을 가진 식품영양학과 전공자입니다. 영양사 면허를 준비하며 병원 및 학교 급식 현장 실습을 통해 실무 역량을 강화하고 있습니다.',
      skills: '영양 상담, 식단 설계, 급식 관리, 식품 위생, HACCP, 식품 분석, 조리 실습',
      tools: ['MS Excel', 'CAN-Pro', 'Notion'],
      experience: [{ role: '급식 관리 실습', company: '○○ 병원 영양팀', period: '2024.06 ~ 2024.08', desc: '• 환자 식단 작성 보조 및 영양 상담\n• 식재료 검수 및 위생 점검 참여', level: '', type: '인턴' }],
      projects: [{ name: '대학생 맞춤 건강 식단 앱 기획', period: '2024.03 ~ 2024.10', role: '영양 데이터 설계 및 기획 (팀 3명)', tech: 'CAN-Pro, Excel, Figma', desc: '대학생 생활패턴 분석 기반 맞춤 식단 추천 서비스 기획', result: '캡스톤 발표회 우수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '식품영양학과 (건강보건학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'health_admin',
    name: '보건의료행정학과',
    emoji: '🏥',
    desc: '의료 행정·건강보험·병원 경영',
    department: '건강보건학부',
    state: {
      profile: { name: '양시윤', role: '보건의료행정사', tagline: '효율적인 의료 행정 시스템으로 환자와 의료진을 연결합니다.', location: '서울, 대한민국', email: 'siyoon@pofo.dev', github: '', website: '', emoji: '🏥', iconImg: '', iconShape: 'circle', links: [] },
      about: '병원 원무 행정, 건강보험 청구, 의무기록 관리에 역량을 가진 보건의료행정학과 전공자입니다. 병원 현장실습을 통해 보험 청구 및 EMR 시스템 운용 경험을 쌓았습니다.',
      skills: '의무기록 관리, 건강보험 청구, 원무 행정, 의료 통계, EMR, DRG, 병원 경영',
      tools: ['MS Excel', 'EMR 시스템', 'SPSS'],
      experience: [{ role: '원무과 실습', company: '○○ 종합병원', period: '2024.06 ~ 2024.08', desc: '• 외래 접수 및 수납 업무 보조\n• 건강보험 청구 데이터 정리 및 검증', level: '', type: '인턴' }],
      projects: [{ name: '중소병원 원무 프로세스 개선 분석', period: '2024.03 ~ 2024.10', role: '데이터 수집 및 분석 (팀 3명)', tech: 'Excel, SPSS, 설문 조사', desc: '중소병원 원무 프로세스 병목 분석 및 디지털 전환 개선안 도출', result: '보건의료 학술대회 포스터 발표', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '보건의료행정학과 (건강보건학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'occupational_therapy',
    name: '작업치료과',
    emoji: '🤲',
    desc: '재활 치료·일상생활 훈련·인지 평가',
    department: '건강보건학부',
    state: {
      profile: { name: '조유나', role: '작업치료사', tagline: '일상의 독립을 돕는 따뜻한 작업치료사를 꿈꿉니다.', location: '서울, 대한민국', email: 'yuna@pofo.dev', github: '', website: '', emoji: '🤲', iconImg: '', iconShape: 'circle', links: [] },
      about: '신체·인지 재활, 일상생활 활동(ADL) 훈련, 보조기기 적용에 전문성을 갖춘 작업치료과 전공자입니다. 재활병원 임상실습을 통해 환자 중심의 치료 계획 수립 경험을 보유하고 있습니다.',
      skills: '신경계 작업치료, 인지 재활, ADL 훈련, 보조기기 적용, 감각 통합, 평가 도구',
      tools: ['SPSS', 'MS Office'],
      experience: [{ role: '임상실습 학생', company: '○○ 재활병원', period: '2024.06 ~ 2024.10', desc: '• 뇌졸중 환자 상지 기능 재활 치료 보조\n• 인지 평가(MMSE, LOTCA) 실시 보조', level: '', type: '인턴' }],
      projects: [{ name: '치매 예방 인지 훈련 프로그램', period: '2024.03 ~ 2024.11', role: '프로그램 설계 및 진행 (팀 4명)', tech: '인지 평가 도구, Excel, 교구 제작', desc: '지역 경로당 어르신 대상 주 2회 인지 훈련 프로그램 기획·운영', result: '참여 어르신 인지 점수 평균 12% 향상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '작업치료과 (건강보건학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'animal_health',
    name: '반려동물보건학과',
    emoji: '🐾',
    desc: '동물 간호·임상 보조·수의 보건',
    department: '건강보건학부',
    state: {
      profile: { name: '서지민', role: '동물보건사', tagline: '반려동물의 건강한 삶을 위해 헌신하는 동물보건 전문가입니다.', location: '서울, 대한민국', email: 'jimin@pofo.dev', github: '', website: '', emoji: '🐾', iconImg: '', iconShape: 'circle', links: [] },
      about: '동물 임상 간호, 수술 보조, 검체 분석에 전문성을 갖춘 반려동물보건학과 전공자입니다. 동물병원 현장실습을 통해 보호자 상담과 입원 동물 관리 경험을 쌓았습니다.',
      skills: '동물 간호, 수술 보조, 방사선 촬영, 검체 분석, 약물 관리, 보호자 상담',
      tools: ['현미경', 'X-ray', 'MS Excel'],
      experience: [{ role: '동물병원 실습', company: '○○ 동물의료센터', period: '2024.06 ~ 2024.08', desc: '• 입원 동물 활력징후 모니터링\n• 혈액 검사 및 방사선 촬영 보조', level: '', type: '인턴' }],
      projects: [{ name: '반려견 비만 예방 프로그램', period: '2024.03 ~ 2024.10', role: '프로그램 기획 (팀 3명)', tech: 'Excel, 설문 조사, Canva', desc: '반려견 보호자 대상 비만 위험 평가 및 맞춤 식단·운동 가이드 제작', result: '참여 반려견 20마리 중 70% 체중 감량 성공', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '반려동물보건학과 (건강보건학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'paramedic',
    name: '응급구조과',
    emoji: '🚑',
    desc: '응급 처치·구급 활동·재난 대응',
    department: '건강보건학부',
    state: {
      profile: { name: '권태민', role: '응급구조사', tagline: '골든타임을 사수하는 응급구조 전문가를 꿈꿉니다.', location: '서울, 대한민국', email: 'taemin@pofo.dev', github: '', website: '', emoji: '🚑', iconImg: '', iconShape: 'circle', links: [] },
      about: '전문 응급 처치, 심폐소생술, 외상 처치, 재난 대응에 역량을 갖춘 응급구조과 전공자입니다. 소방서 및 응급실 현장실습을 통해 실전 구급 활동 경험을 보유하고 있습니다.',
      skills: 'BLS/ACLS, 외상 처치, 기도 관리, 환자 평가, 구급차 운용, 재난 대응, 트리아지',
      tools: ['응급 장비', 'AED', 'MS Office'],
      experience: [{ role: '구급대 현장실습', company: '○○ 소방서', period: '2024.06 ~ 2024.10', desc: '• 119 구급대 동승 실습 (출동 50회 이상)\n• 현장 환자 평가 및 이송 보조', level: '', type: '인턴' }],
      projects: [{ name: '캠퍼스 응급 대응 매뉴얼 제작', period: '2024.03 ~ 2024.10', role: '기획 및 교육 진행 (팀 4명)', tech: '응급 시뮬레이션, Canva, 촬영/편집', desc: '교내 응급 상황별 대응 매뉴얼 제작 및 학생 대상 CPR 교육 실시', result: '교육 참여 학생 300명, 교내 안전 우수 동아리 선정', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '응급구조과 (건강보건학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'dental_hygiene',
    name: '치위생과',
    emoji: '🦷',
    desc: '구강 관리·치석 제거·예방 치위생',
    department: '건강보건학부',
    state: {
      profile: { name: '이나현', role: '치과위생사', tagline: '밝은 미소를 지키는 구강 건강 전문가입니다.', location: '서울, 대한민국', email: 'nahyun@pofo.dev', github: '', website: '', emoji: '🦷', iconImg: '', iconShape: 'circle', links: [] },
      about: '스케일링, 치면세마, 불소 도포, 구강보건교육에 전문성을 갖춘 치위생과 전공자입니다. 치과 임상실습을 통해 환자 응대와 진료 보조의 실무 역량을 쌓았습니다.',
      skills: '스케일링, 치면세마, 불소 도포, 인상 채득, 방사선 촬영, 구강보건교육, 감염 관리',
      tools: ['치과 유닛 체어', 'X-ray', 'MS Office'],
      experience: [{ role: '임상실습 학생', company: '○○ 치과의원', period: '2024.06 ~ 2024.10', desc: '• 스케일링 및 치면세마 시술 보조\n• 파노라마 방사선 촬영 및 환자 상담', level: '', type: '인턴' }],
      projects: [{ name: '초등학생 구강보건교육 봉사', period: '2024.03 ~ 2024.11', role: '교육 기획 및 강사 (팀 5명)', tech: '교육 교구 제작, Canva, 설문 조사', desc: '인근 초등학교 3~6학년 대상 올바른 칫솔질 교육 및 구강 검진', result: '봉사 대상 학생 200명, 구강 인식 개선도 85%', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '치위생과 (건강보건학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },

  // ═══════════════════════════════════════
  // 건강생활학부
  // ═══════════════════════════════════════
  {
    id: 'bio_pharma',
    name: '유한바이오제약전공',
    emoji: '💊',
    desc: '의약품 제조·품질 관리·GMP',
    department: '건강생활학부',
    state: {
      profile: { name: '황준영', role: '제약 QC 연구원', tagline: '안전한 의약품을 위한 품질 관리 전문가를 꿈꿉니다.', location: '서울, 대한민국', email: 'junyoung@pofo.dev', github: '', website: '', emoji: '💊', iconImg: '', iconShape: 'circle', links: [] },
      about: '의약품 제조, 품질 관리(QC), GMP 기반 공정 관리에 역량을 갖춘 유한바이오제약 전공자입니다. 제약 회사 실습을 통해 HPLC 분석 및 밸리데이션 경험을 보유하고 있습니다.',
      skills: 'HPLC, GC, 제제 실습, GMP, 밸리데이션, 품질 관리, 약전 분석',
      tools: ['HPLC 장비', 'MS Excel', 'LIMS'],
      experience: [{ role: 'QC 실습생', company: '○○ 제약', period: '2024.06 ~ 2024.08', desc: '• 완제 의약품 품질 시험 보조 (함량·용출)\n• 시험 성적서 작성 및 데이터 정리', level: '', type: '인턴' }],
      projects: [{ name: '정제 코팅 공정 최적화 연구', period: '2024.03 ~ 2024.11', role: '실험 설계 및 분석 (팀 3명)', tech: 'HPLC, 코팅기, 통계 분석', desc: '정제 코팅 두께 및 조건 변경에 따른 용출 프로파일 비교 연구', result: '한국제약학회 포스터 발표', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '유한바이오제약전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'bio_chem',
    name: '유한생명화공전공',
    emoji: '🧪',
    desc: '화학 분석·바이오 공정·화장품 원료',
    department: '건강생활학부',
    state: {
      profile: { name: '남수빈', role: '화학분석 연구원', tagline: '정밀한 분석 기술로 산업의 품질을 책임집니다.', location: '서울, 대한민국', email: 'subin@pofo.dev', github: '', website: '', emoji: '🧪', iconImg: '', iconShape: 'circle', links: [] },
      about: '화학 분석, 바이오 공정, 화장품 원료 분석에 역량을 가진 유한생명화공 전공자입니다. IR, UV-Vis, GC-MS 등 기기분석 실무 경험을 보유하고 있습니다.',
      skills: 'IR, UV-Vis, GC-MS, 화학 분석, 바이오 공정, 유기합성, 품질 관리',
      tools: ['분석 장비', 'MS Excel', 'ChemDraw'],
      experience: [{ role: '분석 실습생', company: '○○ 화학', period: '2024.06 ~ 2024.08', desc: '• 원료 입고 검사 및 성적서 확인\n• GC-MS 분석 데이터 정리', level: '', type: '인턴' }],
      projects: [{ name: '천연 추출물 항산화 활성 평가', period: '2024.03 ~ 2024.10', role: '실험 수행 및 데이터 분석 (팀 2명)', tech: 'UV-Vis, DPPH assay, Excel', desc: '국내 자생 식물 추출물의 항산화 활성 비교 연구', result: '한국화학공학회 학생 포스터 발표', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '유한생명화공전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'skin_makeup',
    name: '피부메이크업전공',
    emoji: '💄',
    desc: '피부 관리·메이크업 아트·뷰티 테라피',
    department: '건강생활학부',
    state: {
      profile: { name: '차예린', role: '메이크업 아티스트', tagline: '아름다움을 디자인하는 뷰티 전문가입니다.', location: '서울, 대한민국', email: 'yerin@pofo.dev', github: '', website: '', emoji: '💄', iconImg: '', iconShape: 'circle', links: [] },
      about: '피부 관리, 메이크업 아트, 특수 분장에 역량을 가진 피부메이크업 전공자입니다. 웨딩, 화보, 무대 메이크업 경험을 통해 다양한 현장 대응 능력을 키워왔습니다.',
      skills: '스킨케어, 메이크업 아트, 특수 분장, 네일 아트, 왁싱, 피부 분석, 뷰티 컨설팅',
      tools: ['피부 분석기', 'Canva', 'Instagram'],
      experience: [{ role: '메이크업 어시스턴트', company: '○○ 뷰티 스튜디오', period: '2024.06 ~ 2024.08', desc: '• 웨딩 촬영 메이크업 보조\n• 고객 피부 타입 분석 및 상담', level: '', type: '아르바이트' }],
      projects: [{ name: '뷰티 룩북 포트폴리오', period: '2024.03 ~ 2024.11', role: '메이크업 디자인 및 촬영 기획 (개인)', tech: '메이크업 도구, Lightroom, Canva', desc: '시즌별 트렌드 메이크업 룩 10가지를 직접 시연하고 촬영한 포트폴리오', result: '교내 뷰티 아트 전시회 금상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '피부메이크업전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'beauty_cosmetics',
    name: '뷰티화장품전공',
    emoji: '🧴',
    desc: '화장품 개발·성분 분석·뷰티 마케팅',
    department: '건강생활학부',
    state: {
      profile: { name: '송민지', role: '화장품 연구원', tagline: '과학적 근거로 안전하고 효과적인 화장품을 개발합니다.', location: '서울, 대한민국', email: 'minji@pofo.dev', github: '', website: '', emoji: '🧴', iconImg: '', iconShape: 'circle', links: [] },
      about: '화장품 제형 개발, 성분 분석, 품질 관리에 역량을 가진 뷰티화장품 전공자입니다. 스킨케어·색조 제형 실습과 화장품 안전성 평가 경험을 보유하고 있습니다.',
      skills: '제형 개발, 성분 분석, 품질 관리, CGMP, 피부 과학, 화장품 법규, 안전성 평가',
      tools: ['pH meter', '점도계', 'MS Excel'],
      experience: [{ role: '연구개발 실습생', company: '○○ 코스메틱', period: '2024.06 ~ 2024.08', desc: '• 스킨케어 제형 시제품 제조 보조\n• 안정성 시험 데이터 기록', level: '', type: '인턴' }],
      projects: [{ name: '비건 선크림 제형 개발', period: '2024.03 ~ 2024.11', role: '제형 설계 및 안정성 평가 (팀 3명)', tech: '제형 실험실, UV 분석, Excel', desc: '동물성 원료 배제 비건 선크림 제형 설계 및 SPF 측정', result: '화장품 학술대회 포스터 발표', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '뷰티화장품전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'social_welfare',
    name: '사회복지전공',
    emoji: '🤝',
    desc: '복지 상담·사례 관리·지역 사회 서비스',
    department: '건강생활학부',
    state: {
      profile: { name: '배윤서', role: '사회복지사', tagline: '따뜻한 시선으로 이웃의 삶을 지원하는 사회복지 전공자입니다.', location: '서울, 대한민국', email: 'yoonseo@pofo.dev', github: '', website: '', emoji: '🤝', iconImg: '', iconShape: 'circle', links: [] },
      about: '사례 관리, 상담, 지역 사회 복지 프로그램 기획에 역량을 가진 사회복지 전공자입니다. 사회복지사 2급 자격을 취득하였으며 복지관 실습을 통해 실무 경험을 쌓았습니다.',
      skills: '사례 관리, 상담, 프로그램 기획, 자원 연계, 사회 조사, 보고서 작성',
      tools: ['MS Office', 'SPSS', 'Notion'],
      experience: [{ role: '사회복지 실습생', company: '○○ 종합사회복지관', period: '2024.06 ~ 2024.10', desc: '• 독거노인 가정방문 및 사례 관리 보조\n• 여름 아동 프로그램 기획 및 운영', level: '', type: '인턴' }],
      projects: [{ name: '청년 고립 예방 프로그램', period: '2024.03 ~ 2024.11', role: '기획 및 진행 (팀 4명)', tech: '설문 조사, SPSS, Canva', desc: '1인 가구 청년 대상 사회적 관계망 구축 프로그램 기획·운영', result: '참여자 만족도 4.8/5.0, 복지부 사례 공유', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '사회복지전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'sports_rehab',
    name: '스포츠재활전공',
    emoji: '🏃',
    desc: '운동 재활·스포츠 트레이닝·체력 측정',
    department: '건강생활학부',
    state: {
      profile: { name: '우성훈', role: '스포츠 재활 트레이너', tagline: '과학적 운동 프로그램으로 부상을 예방하고 재활을 돕습니다.', location: '서울, 대한민국', email: 'sunghoon@pofo.dev', github: '', website: '', emoji: '🏃', iconImg: '', iconShape: 'circle', links: [] },
      about: '스포츠 재활, 체력 측정, 운동 처방에 역량을 갖춘 스포츠재활 전공자입니다. 운동선수 트레이닝 보조 및 재활 센터 실습을 통해 실무 경험을 쌓았습니다.',
      skills: '운동 재활, 기능적 움직임 평가(FMS), 테이핑, 체력 측정, 운동 처방, 해부학',
      tools: ['InBody', '체력 측정 장비', 'MS Excel'],
      experience: [{ role: '트레이너 실습', company: '○○ 스포츠재활센터', period: '2024.06 ~ 2024.08', desc: '• 무릎·어깨 재활 운동 프로그램 보조\n• 선수 체력 측정 및 데이터 기록', level: '', type: '인턴' }],
      projects: [{ name: '대학생 거북목 교정 프로그램', period: '2024.03 ~ 2024.11', role: '프로그램 설계 및 운영 (팀 3명)', tech: '체력 측정 장비, Excel, Canva', desc: '교내 학생 30명 대상 8주간 거북목 교정 운동 프로그램 운영', result: '참여자 목 전방 변위 평균 23% 개선', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '스포츠재활전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'pet_industry',
    name: '반려동물산업전공',
    emoji: '🐕',
    desc: '반려동물 돌봄·훈련·산업 경영',
    department: '건강생활학부',
    state: {
      profile: { name: '정하린', role: '반려동물 산업 전문가', tagline: '반려동물과 사람의 행복한 공존을 설계합니다.', location: '서울, 대한민국', email: 'harin@pofo.dev', github: '', website: '', emoji: '🐕', iconImg: '', iconShape: 'circle', links: [] },
      about: '반려동물 행동 교정, 그루밍, 펫 비즈니스 기획에 역량을 가진 반려동물산업 전공자입니다. 반려동물 행동 상담사 자격을 준비하며 펫 서비스 현장 경험을 쌓고 있습니다.',
      skills: '반려동물 행동 분석, 그루밍, 훈련, 영양 관리, 펫 비즈니스, 고객 상담',
      tools: ['MS Excel', 'Canva', 'Instagram'],
      experience: [{ role: '펫 시터 / 그루머 보조', company: '○○ 펫 살롱', period: '2024.06 ~ 2024.08', desc: '• 소형견 목욕 및 그루밍 보조\n• 고객 상담 및 반려견 행동 관찰 기록', level: '', type: '아르바이트' }],
      projects: [{ name: '펫 커뮤니티 앱 기획서', period: '2024.03 ~ 2024.10', role: '기획 및 리서치 (팀 3명)', tech: 'Figma, Notion, 설문 조사', desc: '반려동물 보호자 대상 산책 매칭·정보 공유 앱 서비스 기획', result: '캡스톤 디자인 발표회 우수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '반려동물산업전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'hotel_culinary',
    name: '호텔조리전공',
    emoji: '👨‍🍳',
    desc: '한식·양식·제과 조리 및 메뉴 개발',
    department: '건강생활학부',
    state: {
      profile: { name: '김태영', role: '조리사 / 셰프', tagline: '맛과 비주얼을 모두 잡는 요리 전문가를 꿈꿉니다.', location: '서울, 대한민국', email: 'taeyoung@pofo.dev', github: '', website: '', emoji: '👨‍🍳', iconImg: '', iconShape: 'circle', links: [] },
      about: '한식, 양식, 일식 조리와 메뉴 개발에 역량을 갖춘 호텔조리 전공자입니다. 호텔 주방 실습을 통해 대량 조리 및 위생 관리 실무 경험을 보유하고 있습니다.',
      skills: '한식, 양식, 일식, 제과제빵, 메뉴 개발, 푸드 스타일링, 위생 관리, HACCP',
      tools: ['조리 도구', 'Canva', 'Instagram'],
      experience: [{ role: '주방 실습생', company: '○○ 호텔 레스토랑', period: '2024.06 ~ 2024.08', desc: '• 양식 가르드망저(전채) 파트 보조\n• 대량 조리 및 식재료 관리', level: '', type: '인턴' }],
      projects: [{ name: '로컬 식재료 코스 메뉴 개발', period: '2024.03 ~ 2024.11', role: '메뉴 기획 및 조리 (팀 3명)', tech: '조리 실습실, 푸드 스타일링, 촬영', desc: '경기 지역 로컬 식재료만 활용한 4코스 창작 메뉴 개발 및 시식회', result: '교내 조리 경연대회 금상, 시식 만족도 4.9/5.0', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '호텔조리전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'cafe_bakery',
    name: '카페베이커리전공',
    emoji: '🧁',
    desc: '제과제빵·바리스타·카페 운영',
    department: '건강생활학부',
    state: {
      profile: { name: '이서윤', role: '파티시에 / 바리스타', tagline: '달콤한 디저트와 커피로 일상의 행복을 전합니다.', location: '서울, 대한민국', email: 'seoyun@pofo.dev', github: '', website: '', emoji: '🧁', iconImg: '', iconShape: 'circle', links: [] },
      about: '제과제빵, 바리스타, 카페 경영에 역량을 갖춘 카페베이커리 전공자입니다. 바리스타 자격증을 취득하였으며, 디저트 메뉴 개발과 카페 창업 기획 경험이 있습니다.',
      skills: '제과제빵, 에스프레소 추출, 라떼 아트, 디저트 개발, 카페 경영, 위생 관리',
      tools: ['에스프레소 머신', 'Canva', 'Instagram'],
      experience: [{ role: '바리스타', company: '○○ 스페셜티 카페', period: '2024.03 ~ 2024.08', desc: '• 에스프레소 음료 제조 및 고객 응대\n• 시즌 한정 디저트 메뉴 개발 참여', level: '', type: '아르바이트' }],
      projects: [{ name: '교내 팝업 디저트 카페 운영', period: '2024.09 ~ 2024.11', role: '메뉴 개발 및 운영 (팀 4명)', tech: '제과 장비, SNS 마케팅, Excel', desc: '교내 축제 기간 3일간 팝업 디저트 카페 기획·운영', result: '매출 120만 원 달성, 방문객 400명', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '카페베이커리전공 (건강생활학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },

  // ═══════════════════════════════════════
  // 비즈니스학부
  // ═══════════════════════════════════════
  {
    id: 'hotel_tourism',
    name: '호텔관광전공',
    emoji: '🏨',
    desc: '호텔 경영·관광 기획·서비스 매니지먼트',
    department: '비즈니스학부',
    state: {
      profile: { name: '고민재', role: '호텔리어 / 관광 기획자', tagline: '최상의 호스피탈리티로 감동을 전달하는 관광 전문가입니다.', location: '서울, 대한민국', email: 'minjae@pofo.dev', github: '', website: '', emoji: '🏨', iconImg: '', iconShape: 'circle', links: [] },
      about: '호텔 프론트 운영, 관광 상품 기획, 서비스 품질 관리에 역량을 가진 호텔관광 전공자입니다. 특급 호텔 실습을 통해 고객 서비스와 객실 운영 실무를 경험했습니다.',
      skills: '호텔 운영, 관광 기획, 서비스 매너, 객실 관리, 예약 시스템, 영어/일어 회화',
      tools: ['Opera PMS', 'MS Excel', 'Notion'],
      experience: [{ role: '프론트 데스크 실습', company: '○○ 호텔', period: '2024.06 ~ 2024.08', desc: '• 체크인/체크아웃 업무 및 고객 응대\n• VIP 투숙객 컨시어지 서비스 보조', level: '', type: '인턴' }],
      projects: [{ name: '서울 외국인 관광객 투어 코스 기획', period: '2024.03 ~ 2024.10', role: '코스 기획 및 리서치 (팀 3명)', tech: 'Google Maps, Canva, 설문 조사', desc: '외국인 관광객 대상 서울 숨은 명소 반나절 투어 상품 기획', result: '관광학 캡스톤 최우수상, 관광공사 제안서 제출', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '호텔관광전공 (비즈니스학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'japan_business',
    name: '일본비즈니스전공',
    emoji: '🇯🇵',
    desc: '일본어·무역·일본 비즈니스 문화',
    department: '비즈니스학부',
    state: {
      profile: { name: '안소희', role: '일본 비즈니스 전문가', tagline: '일본어와 비즈니스 감각으로 한·일 간 가교 역할을 합니다.', location: '서울, 대한민국', email: 'sohee@pofo.dev', github: '', website: '', emoji: '🇯🇵', iconImg: '', iconShape: 'circle', links: [] },
      about: '일본어 능력(JLPT N1), 일본 비즈니스 매너, 무역 실무에 역량을 가진 일본비즈니스 전공자입니다. 일본 기업 인턴십을 통해 현지 비즈니스 문화를 직접 경험했습니다.',
      skills: 'JLPT N1, 비즈니스 일본어, 무역 실무, 통·번역, 일본 비즈니스 매너, 마케팅',
      tools: ['MS Office', 'Google Translate', 'Notion'],
      experience: [{ role: '해외영업 인턴', company: '○○ 무역', period: '2024.06 ~ 2024.08', desc: '• 일본 바이어 서신 번역 및 미팅 통역\n• 수출입 서류 작성 보조', level: '', type: '인턴' }],
      projects: [{ name: '한국 뷰티 제품 일본 진출 전략 리포트', period: '2024.03 ~ 2024.10', role: '시장 조사 및 보고서 작성 (팀 3명)', tech: '시장 조사, Excel, PowerPoint', desc: '한국 중소 뷰티 브랜드의 일본 시장 진출 전략 수립 및 발표', result: '비즈니스 플랜 경진대회 우수상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '일본비즈니스전공 (비즈니스학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'biz_info',
    name: '경영정보전공',
    emoji: '📊',
    desc: 'ERP·데이터 분석·디지털 경영',
    department: '비즈니스학부',
    state: {
      profile: { name: '이준혁', role: '경영정보 분석가', tagline: '데이터 기반 의사결정으로 비즈니스 가치를 창출합니다.', location: '서울, 대한민국', email: 'junhyuk@pofo.dev', github: '', website: '', emoji: '📊', iconImg: '', iconShape: 'circle', links: [] },
      about: 'ERP, 데이터 분석, 디지털 마케팅에 역량을 가진 경영정보 전공자입니다. SQL과 Excel 피벗 분석을 통한 경영 의사결정 지원 경험을 보유하고 있습니다.',
      skills: 'ERP, SQL, 데이터 분석, 경영 전략, 디지털 마케팅, 비즈니스 모델링, Excel',
      tools: ['MS Excel', 'SQL', 'Notion', 'Google Analytics'],
      experience: [{ role: '경영지원 인턴', company: '○○ 커머스', period: '2024.06 ~ 2024.08', desc: '• 매출 데이터 분석 및 주간 리포트 작성\n• ERP 시스템 데이터 입력 및 관리', level: '', type: '인턴' }],
      projects: [{ name: '소상공인 디지털 전환 컨설팅', period: '2024.03 ~ 2024.10', role: '데이터 분석 및 제안서 작성 (팀 4명)', tech: 'Excel, SQL, PowerPoint', desc: '지역 소상공인 3곳 대상 POS 데이터 분석 및 디지털 마케팅 전략 제안', result: '매출 평균 15% 증가 효과 확인', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '경영정보전공 (비즈니스학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },
  {
    id: 'tax_accounting',
    name: '세무회계전공',
    emoji: '🧮',
    desc: '세무·회계·재무 관리',
    department: '비즈니스학부',
    state: {
      profile: { name: '박소영', role: '세무회계사', tagline: '정확한 세무·회계 처리로 기업의 재무 건전성을 지킵니다.', location: '서울, 대한민국', email: 'soyoung@pofo.dev', github: '', website: '', emoji: '🧮', iconImg: '', iconShape: 'circle', links: [] },
      about: '세무 신고, 회계 장부 관리, 재무제표 분석에 역량을 가진 세무회계 전공자입니다. 전산세무 1급 자격을 취득하였으며, 세무법인 실습을 통해 법인세·부가세 신고 실무를 경험했습니다.',
      skills: '전산세무, 부가가치세, 법인세, 재무회계, 원가회계, 더존 Smart A, Excel',
      tools: ['더존 Smart A', 'MS Excel', 'MS Office'],
      experience: [{ role: '세무 실습생', company: '○○ 세무법인', period: '2024.06 ~ 2024.08', desc: '• 부가가치세 신고 자료 정리\n• 법인세 조정 보조 및 증빙 서류 관리', level: '', type: '인턴' }],
      projects: [{ name: '중소기업 세금 절감 전략 분석', period: '2024.03 ~ 2024.10', role: '사례 분석 및 보고서 작성 (팀 2명)', tech: '세법, Excel, PowerPoint', desc: '중소기업 대상 세액 공제·감면 제도 활용 전략 분석 및 가이드 제작', result: '세무회계 학술 발표회 우수 논문상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '세무회계전공 (비즈니스학부)', period: '2022.03 ~ 현재' }],
      custom: []
    }
  },

  // ═══════════════════════════════════════
  // 항공서비스학과
  // ═══════════════════════════════════════
  {
    id: 'airline_service',
    name: '항공서비스학과',
    emoji: '✈️',
    desc: '항공 서비스·객실 승무·공항 운영',
    department: '항공서비스학과',
    state: {
      profile: { name: '윤다은', role: '항공 서비스 전문가', tagline: '하늘 위에서 최고의 서비스를 전하는 항공 서비스 전공자입니다.', location: '서울, 대한민국', email: 'daeun@pofo.dev', github: '', website: '', emoji: '✈️', iconImg: '', iconShape: 'circle', links: [] },
      about: '객실 서비스, 항공 예약 시스템, 비상 대응 절차에 역량을 가진 항공서비스 전공자입니다. 항공사 면접 및 서비스 매너 교육을 이수하였으며, 우수한 영어·일어 커뮤니케이션 능력을 보유하고 있습니다.',
      skills: '기내 서비스, 비상 탈출 절차, 항공 예약(ABACUS), 서비스 매너, 영어 회화, 이미지 메이킹',
      tools: ['ABACUS/Topas', 'MS Office'],
      experience: [{ role: '공항 지상직 실습', company: '○○ 항공', period: '2024.06 ~ 2024.08', desc: '• 탑승 수속 및 게이트 안내 업무 보조\n• 외국인 승객 응대 및 안내 통역', level: '', type: '인턴' }],
      projects: [{ name: '기내 서비스 품질 개선 제안서', period: '2024.03 ~ 2024.10', role: '리서치 및 제안서 작성 (팀 3명)', tech: '설문 조사, Excel, PowerPoint', desc: '항공사 기내 서비스 만족도 조사 및 MZ세대 맞춤 서비스 개선 방안 제안', result: '항공서비스 학술대회 우수 발표상', repo: '', demo: '' }],
      education: [{ school: '유한대학교', degree: '항공서비스학과', period: '2022.03 ~ 현재' }],
      custom: []
    }
  }
];
