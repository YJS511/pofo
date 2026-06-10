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
    'React', 'Next.js', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS',
    'Node.js', 'Express', 'Spring Boot', 'Python', 'Django', 'Java', 'Kotlin', 'Go',
    'Flutter', 'React Native', 'Swift', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Git', 'CI/CD', 'REST API', 'GraphQL',
  ],
  toolCats: [
    { name: '개발', items: ['VS Code', 'IntelliJ', 'WebStorm', 'Xcode', 'Android Studio', 'Vim'] },
    { name: '협업', items: ['Slack', 'Discord', 'Notion', 'Jira', 'Linear', 'Confluence'] },
    { name: '버전관리', items: ['GitHub', 'GitLab', 'Bitbucket', 'Sourcetree'] },
    { name: '배포', items: ['Vercel', 'Netlify', 'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes'] },
    { name: '디자인', items: ['Figma', 'Sketch', 'Adobe XD'] },
  ],
};

const ENGINEERING: DeptData = {
  skills: [
    'AutoCAD', 'SolidWorks', 'CATIA', 'Inventor', 'MATLAB', 'PLC', 'Arduino',
    'LabVIEW', '3D 프린팅', 'CNC 가공', '유한요소해석(FEA)', 'PCB 설계',
    'C', 'C++', 'Python', '회로 설계', '제어 시스템', '센서 기술',
    'IoT', 'Embedded System', 'STM32', 'Raspberry Pi',
  ],
  toolCats: [
    { name: 'CAD/CAM', items: ['AutoCAD', 'SolidWorks', 'CATIA', 'Inventor', 'Fusion 360', 'Rhino'] },
    { name: '시뮬레이션', items: ['MATLAB', 'Simulink', 'ANSYS', 'COMSOL', 'LTspice'] },
    { name: '제어/임베디드', items: ['Arduino IDE', 'STM32CubeIDE', 'LabVIEW', 'Keil'] },
    { name: '문서/협업', items: ['Notion', 'MS Office', 'Google Workspace', 'Slack'] },
  ],
};

const DESIGN: DeptData = {
  skills: [
    'Photoshop', 'Illustrator', 'InDesign', 'Figma', 'Sketch', 'After Effects',
    'Premiere Pro', 'Blender', 'Cinema 4D', 'Rhino', 'KeyShot', 'SketchUp',
    'V-Ray', 'Procreate', 'Clip Studio Paint', 'XD',
    '타이포그래피', '편집 디자인', 'UI/UX', '브랜딩', '모션 그래픽',
  ],
  toolCats: [
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'Procreate'] },
    { name: 'UI/UX', items: ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'InVision'] },
    { name: '3D/모션', items: ['Blender', 'Cinema 4D', 'After Effects', 'Rhino', 'KeyShot'] },
    { name: '영상', items: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'] },
    { name: '포트폴리오', items: ['Behance', 'Dribbble', 'Notion', 'Adobe Portfolio'] },
  ],
};

const FASHION: DeptData = {
  skills: [
    '패턴 CAD', 'CLO 3D', '봉제', '드레이핑', '텍스타일 디자인',
    'Photoshop', 'Illustrator', '패션 일러스트레이션', 'Marvelous Designer',
    '소재 분석', '컬러리스트', '트렌드 분석', 'VMD', '스타일링',
  ],
  toolCats: [
    { name: '패턴/3D', items: ['CLO 3D', 'Marvelous Designer', '패턴 CAD', 'Optitex'] },
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'Procreate', 'Canva'] },
    { name: '포트폴리오', items: ['Behance', 'Instagram', 'Notion', 'Adobe Portfolio'] },
  ],
};

const INTERIOR: DeptData = {
  skills: [
    'AutoCAD', 'SketchUp', 'V-Ray', 'Rhino', '3ds Max', 'Revit',
    'Photoshop', 'Illustrator', '실내 설계', '마감재 선정', '조명 설계',
    '공간 기획', '인테리어 스타일링', '가구 디자인', 'BIM',
  ],
  toolCats: [
    { name: '설계', items: ['AutoCAD', 'SketchUp', 'Revit', 'Rhino', '3ds Max'] },
    { name: '렌더링', items: ['V-Ray', 'Enscape', 'Lumion', 'Twinmotion'] },
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'InDesign', 'Canva'] },
    { name: '포트폴리오', items: ['Behance', 'Notion', 'Adobe Portfolio'] },
  ],
};

const MEDIA_BROADCAST: DeptData = {
  skills: [
    'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro',
    'Photoshop', 'Audition', '촬영', '조명', '음향', '편집',
    '스토리보드', '시나리오 작성', '콘텐츠 기획', 'YouTube', 'SNS 운영',
  ],
  toolCats: [
    { name: '영상', items: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro', 'After Effects'] },
    { name: '음향', items: ['Audition', 'Logic Pro', 'GarageBand'] },
    { name: '그래픽', items: ['Photoshop', 'Illustrator', 'Canva'] },
    { name: '기획/협업', items: ['Notion', 'Google Workspace', 'Trello', 'Slack'] },
    { name: '배포', items: ['YouTube Studio', 'Vimeo', 'Instagram', 'TikTok'] },
  ],
};

const AD_MEDIA: DeptData = {
  skills: [
    '광고 기획', '카피라이팅', 'SNS 마케팅', '미디어 전략', '브랜딩',
    'Photoshop', 'Illustrator', 'Premiere Pro', 'Canva',
    'Google Analytics', '퍼포먼스 마케팅', 'SEO', '콘텐츠 마케팅',
    'Meta Ads', 'Google Ads', '데이터 분석',
  ],
  toolCats: [
    { name: '디자인', items: ['Photoshop', 'Illustrator', 'Canva', 'Figma'] },
    { name: '영상', items: ['Premiere Pro', 'After Effects', 'CapCut'] },
    { name: '마케팅', items: ['Google Analytics', 'Meta Business', 'Google Ads', 'Mailchimp'] },
    { name: 'SNS', items: ['Instagram', 'YouTube Studio', 'TikTok', 'Notion'] },
  ],
};

const ANIMATION_WEBTOON: DeptData = {
  skills: [
    'Clip Studio Paint', 'Photoshop', 'Procreate', 'After Effects',
    'Blender', 'Maya', 'Toon Boom', '스토리보드', '캐릭터 디자인',
    '배경 일러스트', '컬러링', '연출', '웹툰 연재', '만화 콘티',
  ],
  toolCats: [
    { name: '드로잉', items: ['Clip Studio Paint', 'Photoshop', 'Procreate', 'SAI'] },
    { name: '애니메이션', items: ['After Effects', 'Toon Boom', 'Blender', 'Maya'] },
    { name: '3D', items: ['Blender', 'ZBrush', 'Cinema 4D'] },
    { name: '플랫폼', items: ['네이버 웹툰', '카카오페이지', 'Behance', 'Pixiv'] },
  ],
};

const WRITING_PERFORM: DeptData = {
  skills: [
    '시나리오 작성', '방송 대본', '소설 창작', '에세이', '카피라이팅',
    'Final Draft', '촬영 협업', '편집 감수', '스토리텔링', '연출',
    '연기', 'MC', '보컬', '무대 퍼포먼스', '오디션 준비',
  ],
  toolCats: [
    { name: '집필', items: ['Final Draft', 'MS Word', 'Scrivener', 'Google Docs'] },
    { name: '영상', items: ['Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'] },
    { name: '기획', items: ['Notion', 'Trello', 'Google Workspace'] },
  ],
};

const HEALTH_MEDICAL: DeptData = {
  skills: [
    '환자 평가', '건강 교육', '임상 실습', '의무기록', '감염 관리',
    '보건 통계', '의료 법규', '재활 치료', '응급 처치', '구강 관리',
    'EMR', 'PACS', '심전도', '활력징후 측정', 'BLS/ACLS',
  ],
  toolCats: [
    { name: '의료 시스템', items: ['EMR', 'PACS', 'OCS', 'Hospital ERP'] },
    { name: '문서/분석', items: ['MS Office', 'Excel', 'SPSS', 'Google Workspace'] },
    { name: '협업', items: ['Notion', 'Slack', 'Google Calendar'] },
  ],
};

const FOOD_NUTRITION: DeptData = {
  skills: [
    '영양 평가', '식단 설계', '급식 관리', '식품 위생', 'HACCP',
    '식품 분석', '조리 실습', '영양 상담', '식품 가공', '품질 관리',
    'CAN-Pro', 'Excel', '보건 통계', '식이요법',
  ],
  toolCats: [
    { name: '영양 분석', items: ['CAN-Pro', 'Diet Analysis Plus', 'NutriBase'] },
    { name: '문서/분석', items: ['MS Office', 'Excel', 'SPSS', 'HWP'] },
    { name: '관리', items: ['급식 관리 시스템', 'Google Workspace', 'Notion'] },
  ],
};

const BIO_PHARMA: DeptData = {
  skills: [
    '의약품 제조', 'GMP', '품질 관리(QC)', '품질 보증(QA)', 'HPLC',
    '제제학', '약전 분석', '무균 조작', '밸리데이션', 'SOP 작성',
    'Excel', '통계 분석', '실험실 안전',
  ],
  toolCats: [
    { name: '분석 장비', items: ['HPLC', 'GC', 'UV-Vis', 'IR', '용출 시험기'] },
    { name: '문서', items: ['MS Office', 'Excel', 'HWP', 'SAP'] },
    { name: '관리', items: ['LIMS', 'MES', 'ERP', 'Google Workspace'] },
  ],
};

const BIO_CHEM: DeptData = {
  skills: [
    '화학 분석', '기기 분석', '바이오 공정', '화장품 원료', 'GLP',
    'HPLC', 'GC', '분광 분석', '미생물 실험', '세포 배양',
    'Python', 'Excel', '통계 분석', '논문 작성',
  ],
  toolCats: [
    { name: '분석', items: ['HPLC', 'GC-MS', 'UV-Vis', 'NMR', 'IR'] },
    { name: '바이오', items: ['클린벤치', 'PCR', '원심분리기', '배양기'] },
    { name: '데이터', items: ['Excel', 'Origin', 'Python', 'SPSS'] },
  ],
};

const BEAUTY: DeptData = {
  skills: [
    '피부 분석', '메이크업 아트', '네일 아트', '특수 분장', '뷰티 컨설팅',
    '화장품 성분 분석', '피부 관리', '왁싱', '두피 관리', '아로마테라피',
    'Photoshop', 'Canva', 'SNS 마케팅', '뷰티 트렌드',
  ],
  toolCats: [
    { name: '피부 분석', items: ['더모스코프', '피부 측정기', 'UV 카메라'] },
    { name: '디자인', items: ['Photoshop', 'Canva', 'Procreate'] },
    { name: 'SNS', items: ['Instagram', 'YouTube Studio', 'TikTok', 'Notion'] },
  ],
};

const SOCIAL_WELFARE: DeptData = {
  skills: [
    '사례 관리', '상담 기법', '복지 정책', '프로그램 기획', '지역 사회 조사',
    '자원 봉사 관리', '사회 복지 법규', '가족 상담', '아동 복지', '노인 복지',
    'Excel', 'SPSS', '보고서 작성', '프레젠테이션',
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
    '운동 재활', '스포츠 테이핑', '체력 측정', '운동 처방', '근골격 평가',
    '물리 치료', '재활 트레이닝', '기능적 움직임 평가(FMS)', 'CPR/BLS',
    'InBody', '심폐 기능 평가', '스포츠 마사지',
  ],
  toolCats: [
    { name: '측정', items: ['InBody', '악력계', '배근력계', 'FMS Kit'] },
    { name: '재활', items: ['초음파 치료기', '전기 자극기', 'TRX', '밸런스 보드'] },
    { name: '문서', items: ['MS Office', 'Excel', 'Google Workspace', 'Notion'] },
  ],
};

const PET: DeptData = {
  skills: [
    '반려동물 행동 분석', '동물 간호', '그루밍', '훈련', '영양 관리',
    '동물 보건', '수의 보조', '임상 병리', '마취 모니터링', '방사선 촬영',
    '동물 복지 법규', '펫 산업 경영', 'SNS 마케팅',
  ],
  toolCats: [
    { name: '의료', items: ['동물용 EMR', 'X-ray', '초음파', '혈액 분석기'] },
    { name: '관리', items: ['Excel', 'Google Workspace', 'Notion'] },
    { name: 'SNS', items: ['Instagram', 'YouTube Studio', 'Canva'] },
  ],
};

const CULINARY: DeptData = {
  skills: [
    '한식 조리', '양식 조리', '일식 조리', '제과제빵', '바리스타',
    '메뉴 개발', '원가 관리', 'HACCP', '식품 위생', '플레이팅',
    '푸드 스타일링', '매장 운영', '카페 창업',
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
    '경영 전략', '재무 분석', '마케팅', '회계', '세무',
    'ERP', 'SAP', 'Excel', 'Power BI', '데이터 분석',
    '프레젠테이션', '비즈니스 일본어', '무역 실무', '호텔 경영',
  ],
  toolCats: [
    { name: 'ERP/회계', items: ['SAP', 'ERP', '더존', '세무사랑', 'QuickBooks'] },
    { name: '분석', items: ['Excel', 'Power BI', 'Tableau', 'Google Analytics'] },
    { name: '문서', items: ['MS Office', 'HWP', 'Google Workspace'] },
    { name: '협업', items: ['Notion', 'Slack', 'Zoom', 'Trello'] },
  ],
};

const HOTEL_TOURISM: DeptData = {
  skills: [
    '호텔 경영', '관광 기획', '서비스 매니지먼트', '객실 관리', 'F&B 관리',
    '여행 상품 개발', '컨벤션 기획', '고객 관리(CRM)', '관광 마케팅',
    'Excel', '외국어(영어/일본어/중국어)', '프레젠테이션',
  ],
  toolCats: [
    { name: 'PMS', items: ['Opera PMS', 'Fidelio', '호텔 ERP'] },
    { name: '예약', items: ['GDS', 'OTA', '항공 예약 시스템'] },
    { name: '문서', items: ['MS Office', 'Google Workspace', 'Canva'] },
    { name: '협업', items: ['Notion', 'Slack', 'Zoom'] },
  ],
};

const AIRLINE: DeptData = {
  skills: [
    '항공 서비스', '객실 승무', '공항 운영', '항공 예약(GDS)', '서비스 매너',
    '기내 안전', '응급 처치', '이미지 메이킹', '외국어(영어/일본어/중국어)',
    'CRM', '고객 응대', '비행 안전 규정',
  ],
  toolCats: [
    { name: '예약', items: ['Amadeus', 'TOPAS', 'Sabre', 'Galileo'] },
    { name: '문서', items: ['MS Office', 'Google Workspace', 'HWP'] },
    { name: '이미지', items: ['Canva', 'Photoshop'] },
  ],
};

const FIRE_SAFETY: DeptData = {
  skills: [
    '소방 설비 설계', '소방 점검', '방재 계획', '소방 법규', 'AutoCAD',
    '화재 시뮬레이션', '스프링클러 시스템', '경보 설비', '피난 설계',
    '소방 안전 관리', '위험물 관리', '소방 시공',
  ],
  toolCats: [
    { name: '설계', items: ['AutoCAD', 'Revit', 'PYROSIM', 'Pathfinder'] },
    { name: '문서', items: ['MS Office', 'Excel', 'HWP'] },
    { name: '관리', items: ['소방시설 관리 시스템', 'Google Workspace'] },
  ],
};

const GAME: DeptData = {
  skills: [
    'Unity', 'Unreal Engine', 'C#', 'C++', 'Blueprint',
    '게임 기획', '레벨 디자인', '게임 UI', 'Photoshop', 'Blender',
    'Spine', 'Aseprite', '게임 수학', '물리 엔진', 'Git',
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
    'Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas', 'NumPy',
    'OpenCV', 'NLP', 'Computer Vision', 'LLM', 'LangChain', 'HuggingFace',
    'SQL', 'Docker', 'Linux', 'Git', 'Jupyter', 'MLOps',
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
    '기획', '데이터 분석', '프레젠테이션', '커뮤니케이션', '리서치',
    'Python', 'Excel', 'Photoshop', 'Figma', '마케팅',
    '보고서 작성', '문제 해결', '프로젝트 관리',
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
