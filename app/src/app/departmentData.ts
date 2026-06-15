// 학부별 기술스택 추천 & 서비스·도구 카테고리

export interface DeptToolCat {
  name: string;
  items: string[];
}

interface DeptData {
  skills: string[];
  toolCats: DeptToolCat[];
}

const SW_DEV: DeptData = {
  skills: [
    'C', 'Java', 'Python', 'JavaScript', 'HTML/CSS', 'JSP', 'C#',
    'SQL', 'Oracle', 'MySQL', 'Linux', 'Git',
    'React', 'Spring Boot', 'Node.js', 'TypeScript',
    'Java Framework', 'REST API', 'Docker', 'AWS',
    '데이터구조', '운영체제', '소프트웨어공학', '컴퓨터네트워크',
  ],
  toolCats: [
    { name: '개발', items: ['VS Code', 'IntelliJ', 'Eclipse', 'Visual Studio', 'Vim'] },
    { name: '협업', items: ['Slack', 'Discord', 'Notion', 'Jira', 'GitHub'] },
    { name: 'DB', items: ['MySQL Workbench', 'DBeaver', 'Oracle SQL Developer', 'pgAdmin'] },
    { name: '배포', items: ['Vercel', 'Netlify', 'AWS', 'Docker', 'Linux 서버'] },
    { name: '디자인', items: ['Figma', 'Adobe XD'] },
  ],
};

const ENGINEERING: DeptData = {
  skills: [
    'AutoCAD', '2D-CAD', '3D-CAD', 'SolidWorks', 'CAM', 'CNC 가공',
    'PLC제어', '센서와모터', '유한요소해석(FEA)', '3D 프린팅',
    '열역학', '유체역학', '재료역학', '기계설계',
    '공조냉동시스템', '생산자동화', '전산유동해석',
    'C', 'Python', 'MATLAB',
  ],
  toolCats: [
    { name: 'CAD/CAM', items: ['AutoCAD', 'SolidWorks', 'CATIA', 'Inventor', 'Fusion 360'] },
    { name: '시뮬레이션', items: ['MATLAB', 'ANSYS', 'COMSOL', 'Simulink'] },
    { name: '제어/가공', items: ['PLC', 'CNC', 'Arduino', 'LabVIEW'] },
    { name: '문서/협업', items: ['Notion', 'MS Office', 'Google Workspace'] },
  ],
};

const DESIGN: DeptData = {
  skills: [
    'Photoshop', 'Illustrator', 'InDesign', 'Figma',
    '3D모델링', 'Rhino', 'KeyShot', 'SketchUp', 'Blender',
    '생성형AI디자인', 'AI인터렉티브웹디자인', '3D프린팅',
    '패키지디자인', '제품디자인', '전시공간디자인',
    '타이포그래피', '편집디자인', 'UI/UX', '브랜딩', '웹디자인',
    '컴퓨터그래픽', '모션그래픽', '컬러트렌드',
  ],
  toolCats: [
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'Procreate'] },
    { name: 'UI/UX', items: ['Figma', 'Sketch', 'Adobe XD', 'Framer'] },
    { name: '3D/렌더링', items: ['Blender', 'Rhino', 'KeyShot', 'Cinema 4D', 'SketchUp'] },
    { name: 'AI도구', items: ['Midjourney', 'DALL-E', 'Adobe Firefly', 'Stable Diffusion'] },
    { name: '포트폴리오', items: ['Behance', 'Dribbble', 'Notion', 'Adobe Portfolio'] },
  ],
};

const FASHION: DeptData = {
  skills: [
    '패턴CAD', '플랫패턴디자인', '의복구성', '드레이핑', '테일러링',
    '패션일러스트레이션', '패션그래픽디자인', '디지털텍스타일디자인',
    '패션빅데이터분석', 'AI패션디자인', '패션도식화CAD',
    '패션마케팅', '패션상품기획', '온라인쇼핑몰전략',
    'Photoshop', 'Illustrator', 'CLO 3D',
  ],
  toolCats: [
    { name: '패턴/3D', items: ['CLO 3D', 'Marvelous Designer', '패턴 CAD', 'Optitex'] },
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'Procreate', 'Canva'] },
    { name: 'AI도구', items: ['AI패션디자인도구', 'AI영상제작', '빅데이터분석'] },
    { name: '포트폴리오', items: ['Behance', 'Instagram', 'Notion', 'Adobe Portfolio'] },
  ],
};

const INTERIOR: DeptData = {
  skills: [
    'AutoCAD', 'SketchUp', 'CG렌더링', '3D컴퓨터모델링', 'V-Ray',
    'Photoshop', 'Illustrator', 'AI공간디자인',
    '실내건축계획', '주거공간설계', '상업공간설계', '전시공간설계',
    '실시설계도면', '기본설계도면', '재료마감실무',
    '실내조명설계', '실내시공실무', '실내건축적산', '실내구조와법규',
  ],
  toolCats: [
    { name: '설계', items: ['AutoCAD', 'SketchUp', 'Revit', 'Rhino', '3ds Max'] },
    { name: '렌더링', items: ['V-Ray', 'Enscape', 'Lumion', 'Twinmotion'] },
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'InDesign'] },
    { name: '포트폴리오', items: ['Behance', 'Notion', 'Adobe Portfolio'] },
  ],
};

const MEDIA_BROADCAST: DeptData = {
  skills: [
    'Premiere Pro', 'After Effects', 'DaVinci Resolve',
    '영상촬영', '영상조명', '영상편집', '영상그래픽',
    '시네마토그래피', '영상컬러그레이딩', '사운드편집',
    '1인크리에이터', '콘텐츠기획개발', '방송연출',
    'AI영상콘텐츠제작', '스튜디오방송제작',
    'Photoshop', 'YouTube', 'SNS 운영',
  ],
  toolCats: [
    { name: '영상', items: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'After Effects'] },
    { name: '음향', items: ['Audition', 'Logic Pro', 'GarageBand'] },
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'Canva'] },
    { name: '기획/협업', items: ['Notion', 'Google Workspace', 'Trello'] },
    { name: '배포', items: ['YouTube Studio', 'Vimeo', 'Instagram', 'TikTok'] },
  ],
};

const AD_MEDIA: DeptData = {
  skills: [
    '광고기획', '디지털광고캠페인', '브랜드커뮤니케이션', '크리에이티브전략',
    '소셜미디어마케팅', '애드테크', '퍼포먼스분석', '소비자조사',
    '영상콘텐츠편집', '영상콘텐츠촬영', '아트워크', 'UX/UI디자인',
    'PR전략', 'BTL전략', '콘텐츠제작', '디지털크리에이터',
    'Photoshop', 'Illustrator', 'Premiere Pro',
  ],
  toolCats: [
    { name: '디자인', items: ['Photoshop', 'Illustrator', 'Canva', 'Figma'] },
    { name: '영상', items: ['Premiere Pro', 'After Effects', 'CapCut'] },
    { name: '마케팅', items: ['Google Analytics', 'Meta Business', 'Google Ads'] },
    { name: 'SNS', items: ['Instagram', 'YouTube Studio', 'TikTok', 'Notion'] },
  ],
};

const ANIMATION_WEBTOON: DeptData = {
  skills: [
    'Clip Studio Paint', 'Photoshop', 'Procreate', 'After Effects',
    'Blender', '3D모델링', '3D애니메이션', '디지털드로잉',
    '캐릭터디자인', '배경아트', '웹툰연출', '스토리보드', '시나리오',
    '생성AI모델링', 'AI크리에이션', 'AI레이아웃디자인',
    '디지털색채표현', '일러스트레이션', '영상콘텐츠편집',
  ],
  toolCats: [
    { name: '드로잉', items: ['Clip Studio Paint', 'Photoshop', 'Procreate', 'SAI'] },
    { name: '애니메이션', items: ['After Effects', 'Toon Boom', 'Blender', 'Maya'] },
    { name: '3D/AI', items: ['Blender', 'ZBrush', 'Midjourney', 'Stable Diffusion'] },
    { name: '플랫폼', items: ['네이버 웹툰', '카카오페이지', 'Behance', 'Pixiv'] },
  ],
};

const WRITING_PERFORM: DeptData = {
  skills: [
    '방송극작법', '시나리오기초', '드라마작법', '웹콘텐츠글쓰기',
    'AI콘텐츠창작', '스토리텔링', '예능구성대본', '다큐멘터리대본',
    '연기실기', '카메라연기', '뮤지컬연기', '무대연출',
    '보컬트레이닝', '오디션워크숍', 'MC실습', '1인미디어제작',
  ],
  toolCats: [
    { name: '집필', items: ['Final Draft', 'MS Word', 'Google Docs', 'HWP'] },
    { name: '영상', items: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'] },
    { name: '기획', items: ['Notion', 'Trello', 'Google Workspace'] },
  ],
};

const HEALTH_MEDICAL: DeptData = {
  skills: [
    '보건의료정보관리', '의무기록분류', '건강보험청구', '질병분류(KCD)',
    '의료통계학', '병원경영', '보건의료법규', '원무관리',
    '인체생리학', '해부학', '임상의학용어', '전자의무기록(EMR)',
    '응급처치학', '재활의학', '작업치료학', '작업수행분석',
    '감각통합치료', '인지재활', '일상생활활동훈련',
    '심리학개론', '활력징후측정', 'BLS',
  ],
  toolCats: [
    { name: '의료 시스템', items: ['EMR', 'PACS', 'OCS', 'Hospital ERP'] },
    { name: '문서/분석', items: ['MS Office', 'Excel', 'SPSS', 'HWP'] },
    { name: '협업', items: ['Notion', 'Google Workspace', 'Google Calendar'] },
  ],
};

const FOOD_NUTRITION: DeptData = {
  skills: [
    '영양판정', '식사요법', '임상영양학', '생애주기영양학', '영양상담',
    '단체급식관리', '급식경영학', 'HACCP실무', '식품위생학',
    '조리원리', '한국조리실습', '서양조리실습', '제과제빵실습',
    '식품학', '식품화학', '식품미생물학', '식품가공저장학',
    '생화학', '인체생리학', '공중보건학', 'CAN-Pro',
  ],
  toolCats: [
    { name: '영양 분석', items: ['CAN-Pro', 'Diet Analysis Plus', 'NutriBase'] },
    { name: '문서/분석', items: ['MS Office', 'Excel', 'SPSS', 'HWP'] },
    { name: '관리', items: ['급식 관리 시스템', 'Google Workspace', 'Notion'] },
  ],
};

const BIO_PHARMA: DeptData = {
  skills: [
    '의약품제조공학', 'GMP실무', '품질관리(QC)', '품질보증(QA)',
    '제제학', '생물의약품학', '약전분석', '기기분석(HPLC/GC)',
    '무균조작기술', '밸리데이션', 'SOP작성',
    '약리학', '생화학', '미생물학', '면역학',
    '바이오의약품공정', '세포배양기술', '원료의약품합성',
    '의약품인허가', '임상시험관리',
  ],
  toolCats: [
    { name: '분석 장비', items: ['HPLC', 'GC', 'UV-Vis', 'IR', '용출 시험기'] },
    { name: '문서', items: ['MS Office', 'Excel', 'HWP', 'SAP'] },
    { name: '관리', items: ['LIMS', 'MES', 'ERP', 'Google Workspace'] },
  ],
};

const BIO_CHEM: DeptData = {
  skills: [
    '일반화학', '유기화학', '분석화학', '기기분석(HPLC/GC-MS)',
    '생화학', '미생물학', '분자생물학', '세포배양기술',
    '화장품제조실습', '화장품원료학', '기능성화장품학',
    'GLP실무', 'GMP실무', '바이오공정',
    '환경분석', '수질분석', '식품분석',
    'PCR', 'Python', '통계분석',
  ],
  toolCats: [
    { name: '분석', items: ['HPLC', 'GC-MS', 'UV-Vis', 'NMR', 'IR'] },
    { name: '바이오', items: ['클린벤치', 'PCR', '원심분리기', '배양기'] },
    { name: '데이터', items: ['Excel', 'Origin', 'Python', 'SPSS'] },
  ],
};

const BEAUTY: DeptData = {
  skills: [
    '피부미용실습', '피부분석', '얼굴관리', '바디관리', '왁싱',
    '메이크업기초', '뷰티메이크업', '웨딩메이크업', '특수분장',
    '네일아트', '네일케어', '젤네일', '아트네일',
    '피부과학', '화장품학', '화장품성분분석',
    '두피모발관리', '아로마테라피', '뷰티컨설팅',
    'SNS뷰티콘텐츠', '뷰티창업실무',
  ],
  toolCats: [
    { name: '피부 분석', items: ['더모스코프', '피부 측정기', 'UV 카메라'] },
    { name: '디자인', items: ['Photoshop', 'Canva', 'Procreate'] },
    { name: 'SNS', items: ['Instagram', 'YouTube Studio', 'TikTok', 'Notion'] },
  ],
};

const SOCIAL_WELFARE: DeptData = {
  skills: [
    '사회복지개론', '사회복지실천론', '사회복지실천기술론',
    '사례관리론', '지역사회복지론', '사회복지정책론', '사회복지법제론',
    '사회복지조사론', '사회복지행정론', '프로그램개발과평가',
    '인간행동과사회환경', '상담이론과실제', '가족복지론',
    '아동복지론', '노인복지론', '장애인복지론',
    '정신건강사회복지론', '사회복지현장실습',
  ],
  toolCats: [
    { name: '사례 관리', items: ['행복e음', '사회보장정보원', 'CRM'] },
    { name: '문서', items: ['MS Office', 'HWP', 'Google Workspace'] },
    { name: '분석', items: ['SPSS', 'Excel', 'Google Forms'] },
    { name: '협업', items: ['Notion', 'Slack', 'Zoom'] },
  ],
};

const SPORTS_REHAB: DeptData = {
  skills: [
    '기능해부학', '운동생리학', '운동역학', '스포츠의학',
    '운동재활트레이닝', '근골격재활', '스포츠테이핑', '스포츠마사지',
    '체력측정평가', '운동처방론', '운동부하검사',
    '기능적움직임평가(FMS)', '교정운동', '수중재활운동',
    '트레이닝방법론', '스포츠심리학', '건강체력관리',
    'CPR/BLS', '응급처치', 'InBody분석',
  ],
  toolCats: [
    { name: '측정', items: ['InBody', '악력계', '배근력계', 'FMS Kit'] },
    { name: '재활', items: ['초음파 치료기', '전기 자극기', 'TRX', '밸런스 보드'] },
    { name: '문서', items: ['MS Office', 'Excel', 'Google Workspace', 'Notion'] },
  ],
};

const PET: DeptData = {
  skills: [
    '동물해부생리학', '동물질병학', '동물임상병리', '동물영상진단(X-ray/초음파)',
    '동물간호학', '동물마취모니터링', '동물수술보조',
    '반려동물행동학', '반려동물훈련학', '반려견미용(그루밍)',
    '동물영양학', '사료학', '동물복지및법규',
    '펫산업경영', '펫비즈니스창업', 'SNS마케팅',
    '동물매개치료', '야생동물관리',
  ],
  toolCats: [
    { name: '의료', items: ['동물용 EMR', 'X-ray', '초음파', '혈액 분석기'] },
    { name: '관리', items: ['Excel', 'Google Workspace', 'Notion'] },
    { name: 'SNS', items: ['Instagram', 'YouTube Studio', 'Canva'] },
  ],
};

const CULINARY: DeptData = {
  skills: [
    '호텔한식조리', '호텔양식조리', '호텔일식조리', '호텔중식조리',
    '고급한식실습', '고급양식실습', '퓨전조리', '메뉴개발',
    '제과실습', '제빵실습', '디저트실습', '카페음료실습',
    '바리스타실무', '커피로스팅', '라떼아트',
    '식품위생학', 'HACCP', '원가관리', '외식경영론',
    '푸드스타일링', '카페창업실무', '매장운영관리',
  ],
  toolCats: [
    { name: '조리', items: ['오븐', '에스프레소 머신', '진공 포장기', '급속 냉동기'] },
    { name: '관리', items: ['POS 시스템', 'Excel', 'Google Workspace'] },
    { name: '마케팅', items: ['Instagram', 'YouTube Studio', 'Canva', '배달의민족'] },
    { name: '디자인', items: ['Canva', 'Photoshop', 'Notion'] },
  ],
};

const BUSINESS: DeptData = {
  skills: [
    '경영학원론', '회계원리', '재무회계', '원가회계', '세무회계',
    '전산회계', '전산세무', 'ERP회계', 'ERP인사', 'ERP물류',
    '비즈니스일본어', '일본어회화', '무역실무', '유통관리',
    '경영정보시스템', '마케팅원론', '디지털마케팅',
    '재무관리', '인적자원관리', '창업실무',
    'Excel데이터분석', '비즈니스프레젠테이션',
  ],
  toolCats: [
    { name: 'ERP/회계', items: ['SAP', '더존 iCUBE', '세무사랑', 'KcLep'] },
    { name: '분석', items: ['Excel', 'Power BI', 'Tableau', 'Google Analytics'] },
    { name: '문서', items: ['MS Office', 'HWP', 'Google Workspace'] },
    { name: '협업', items: ['Notion', 'Slack', 'Zoom', 'Trello'] },
  ],
};

const HOTEL_TOURISM: DeptData = {
  skills: [
    '호텔경영론', '관광학개론', '관광마케팅', '관광법규',
    '호텔객실관리', '호텔F&B관리', '서비스매니지먼트',
    '여행사경영', '여행상품개발', '국외여행인솔',
    '컨벤션기획', '이벤트플래닝', 'MICE산업론',
    '관광영어', '관광일본어', '관광중국어',
    'CRM(고객관리)', '항공예약(GDS)', 'OTA운영',
  ],
  toolCats: [
    { name: 'PMS', items: ['Opera PMS', 'Fidelio', '호텔 ERP'] },
    { name: '예약', items: ['Amadeus', 'TOPAS', 'OTA', '항공 예약 시스템'] },
    { name: '문서', items: ['MS Office', 'Google Workspace', 'Canva'] },
    { name: '협업', items: ['Notion', 'Slack', 'Zoom'] },
  ],
};

const AIRLINE: DeptData = {
  skills: [
    '항공서비스론', '객실승무실무', '객실서비스영어',
    '공항운영론', '공항지상서비스', '항공예약(GDS/CRS)',
    '기내안전관리', '항공보안', '항공응급처치',
    '이미지메이킹', '서비스매너', '서비스커뮤니케이션',
    '항공영어', '항공일본어', '항공중국어',
    '관광학개론', '호텔서비스실무', 'CRM고객관리',
  ],
  toolCats: [
    { name: '예약', items: ['Amadeus', 'TOPAS', 'Sabre', 'Galileo'] },
    { name: '문서', items: ['MS Office', 'Google Workspace', 'HWP'] },
    { name: '이미지', items: ['Canva', 'Photoshop'] },
  ],
};

const FIRE_SAFETY: DeptData = {
  skills: [
    '소방설비설계', '소방점검실무', '소방관계법규', '2D-CAD', 'BIM',
    '소방경보시스템', '제연설비', '소방설비배관', '소방약제',
    '화재학', '위험물질론', '건축소방학', '건축계획과방재',
    '공기조화설비', '위생설비', '소방정보통신설비',
    '소방안전관리', '위험물시설론', '응급처치론',
  ],
  toolCats: [
    { name: '설계', items: ['AutoCAD', 'Revit', 'BIM', 'PYROSIM', 'Pathfinder'] },
    { name: '문서', items: ['MS Office', 'Excel', 'HWP'] },
    { name: '관리', items: ['소방시설 관리 시스템', 'Google Workspace'] },
  ],
};

const GAME: DeptData = {
  skills: [
    'C', 'C#', 'Unity', 'Unreal Engine', 'JavaScript', 'HTML5',
    '게임엔진프로그래밍', '게임기획', '레벨디자인', 'UI/UX디자인',
    '3D모델링', '3D캐릭터모델링', '3D애니메이션', '게임아트',
    '게임서버프로그래밍', '모바일게임개발', 'AI자동화',
    'Photoshop', 'Blender', 'Git',
  ],
  toolCats: [
    { name: '엔진', items: ['Unity', 'Unreal Engine', 'Godot', 'RPG Maker'] },
    { name: '아트', items: ['Photoshop', 'Aseprite', 'Blender', 'Spine', 'Procreate'] },
    { name: '개발', items: ['VS Code', 'Visual Studio', 'Rider', 'Git'] },
    { name: '기획', items: ['Notion', 'Miro', 'Google Sheets', 'Jira'] },
  ],
};

const AI: DeptData = {
  skills: [
    'Python', 'C', 'JavaScript', 'HTML5', 'Java', 'Linux',
    '딥러닝', '자연어처리(NLP)', '컴퓨터비전', 'AI모델링',
    '데이터분석', '데이터구축', '이미지프로세싱',
    'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'OpenCV',
    'SQL', 'AI클라우드', 'Git', 'Jupyter',
  ],
  toolCats: [
    { name: 'ML/DL', items: ['Jupyter Notebook', 'Google Colab', 'Kaggle', 'Weights & Biases'] },
    { name: '개발', items: ['VS Code', 'PyCharm', 'Git', 'Docker'] },
    { name: '클라우드', items: ['AWS SageMaker', 'GCP Vertex AI', 'Azure ML'] },
    { name: '협업', items: ['Notion', 'Slack', 'GitHub'] },
  ],
};

const FREE_MAJOR: DeptData = {
  skills: [
    '진로탐색', '자기주도학습', '융합적사고', '창의적문제해결',
    '기획력', '데이터분석', '프레젠테이션', '커뮤니케이션',
    '리서치', 'Python', 'Excel', '마케팅기초',
    '보고서작성', '프로젝트관리', '디자인씽킹',
  ],
  toolCats: [
    { name: '기획/분석', items: ['Notion', 'Google Workspace', 'Excel', 'Python'] },
    { name: '디자인', items: ['Figma', 'Canva', 'Photoshop'] },
    { name: '협업', items: ['Slack', 'Zoom', 'Trello', 'Google Calendar'] },
  ],
};

// preset id → DeptData 매핑
export const DEPT_DATA: Record<string, DeptData> = {
  free_major: FREE_MAJOR,
  mech_sys: ENGINEERING,
  fire_safety: FIRE_SAFETY,
  elec_eng: ENGINEERING,
  electronic_eng: ENGINEERING,
  comp_sw: SW_DEV,
  game_content: GAME,
  ai_major: AI,
  industrial_design: DESIGN,
  visual_design: DESIGN,
  fashion_design: FASHION,
  interior_arch: INTERIOR,
  ad_media: AD_MEDIA,
  broadcast_video: MEDIA_BROADCAST,
  animation_webtoon: ANIMATION_WEBTOON,
  broadcast_writing: WRITING_PERFORM,
  broadcast_perform: WRITING_PERFORM,
  food_nutrition: FOOD_NUTRITION,
  health_admin: HEALTH_MEDICAL,
  occupational_therapy: HEALTH_MEDICAL,
  animal_health: PET,
  paramedic: HEALTH_MEDICAL,
  dental_hygiene: HEALTH_MEDICAL,
  bio_pharma: BIO_PHARMA,
  bio_chem: BIO_CHEM,
  skin_makeup: BEAUTY,
  beauty_cosmetics: BEAUTY,
  social_welfare: SOCIAL_WELFARE,
  sports_rehab: SPORTS_REHAB,
  pet_industry: PET,
  hotel_culinary: CULINARY,
  cafe_bakery: CULINARY,
  hotel_tourism: HOTEL_TOURISM,
  japan_business: BUSINESS,
  biz_info: BUSINESS,
  tax_accounting: BUSINESS,
  airline_service: AIRLINE,
};

export function getDeptData(presetId: string): DeptData {
  return DEPT_DATA[presetId] || FREE_MAJOR;
}
