// 유한대학교 전 학과 교육과정 데이터 (2026년도 기준)
// 출처: sky.yuhan.ac.kr 입학처 교육과정표

export interface Course {
  name: string;
  credits: number;
  required?: boolean;
}

export interface SemesterCourses {
  year: number;
  semester: 1 | 2;
  courses: Course[];
}

export interface CurriculumInfo {
  totalCredits: number;
  courses: SemesterCourses[];
  certifications: string[];
  capstoneName: string;
}

// ── 공학부 ──

const COMP_SW: CurriculumInfo = {
  totalCredits: 132,
  capstoneName: '캡스톤디자인',
  certifications: ['정보처리산업기사', '리눅스마스터 2급', 'SQLD', 'ITQ', '정보보안산업기사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '컴퓨터시스템개론', credits: 3 }, { name: '프로그래밍논리', credits: 2 },
      { name: 'C언어기초', credits: 3 }, { name: 'HTML5', credits: 3 },
      { name: '멀티미디어실습', credits: 3 }, { name: '컴퓨터활용', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: 'C언어응용', credits: 3 }, { name: 'JavaScript', credits: 3 },
      { name: '데이터구조', credits: 3 }, { name: '소프트웨어정보능력', credits: 3 },
      { name: '파이썬프로그래밍', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '운영체제', credits: 2 }, { name: 'Java프로그래밍', credits: 3 },
      { name: '객체지향언어', credits: 3 }, { name: '데이터베이스개론', credits: 3 },
      { name: '오픈소스소프트웨어', credits: 3 }, { name: '웹프로그래밍', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: 'DB응용', credits: 3 }, { name: 'JSP', credits: 3 },
      { name: 'Java프로그래밍응용', credits: 3 }, { name: 'Linux기초', credits: 3 },
      { name: 'VC++실습', credits: 3 }, { name: '컴퓨터네트워크', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: 'C#프로그래밍', credits: 3 }, { name: 'JavaFramework', credits: 3 },
      { name: 'Linux활용', credits: 3 }, { name: '데이터베이스프로그래밍', credits: 3 },
      { name: '소프트웨어공학', credits: 3 }, { name: '고급네트워크', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 }, { name: '비즈니스모델설계', credits: 2 },
      { name: 'Linux응용', credits: 3 }, { name: '기업솔루션프로젝트', credits: 3 },
      { name: '응용SW실무', credits: 3 },
    ]},
  ],
};

const GAME_CONTENT: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인과창작',
  certifications: ['게임프로그래밍전문가', '멀티미디어콘텐츠제작전문가', '게임기획전문가'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: 'C언어기초', credits: 3 }, { name: 'HTML5', credits: 3 },
      { name: '게임분석', credits: 3 }, { name: '디지털드로잉', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: 'C언어응용', credits: 3 }, { name: 'JavaScript', credits: 3 },
      { name: '게임기획', credits: 3 }, { name: '3D모델링기초', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '게임엔진프로그래밍', credits: 3 }, { name: 'UI/UX디자인', credits: 3 },
      { name: '게임아트', credits: 3 }, { name: '3D캐릭터모델링', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '게임레벨디자인', credits: 3 }, { name: '게임서버프로그래밍', credits: 3 },
      { name: '3D애니메이션', credits: 3 }, { name: '게임사운드', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '3D게임엔진', credits: 3 }, { name: '모바일게임개발', credits: 3 },
      { name: 'AI자동화', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인과창작', credits: 3 }, { name: '포트폴리오제작', credits: 3 },
    ]},
  ],
};

const AI_MAJOR: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['빅데이터분석기사', '정보처리산업기사', 'SQLD', 'ADsP'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: 'C언어기초', credits: 3 }, { name: 'HTML5', credits: 3 },
      { name: 'IT개론', credits: 3 }, { name: '리눅스개론', credits: 3 },
      { name: '컴퓨터활용', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: 'C언어응용', credits: 3 }, { name: 'JavaScript', credits: 3 },
      { name: '인공지능정보처리', credits: 3 }, { name: '컴퓨터네트워크기초', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '파이썬프로그래밍', credits: 3 }, { name: '데이터구조기초', credits: 3 },
      { name: '데이터분석', credits: 3 }, { name: '딥러닝', credits: 3 },
      { name: '이미지프로세싱기초', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '자바프로그래밍기초', credits: 3 }, { name: '파이썬프로그래밍응용', credits: 3 },
      { name: '자바프로그래밍활용', credits: 3 }, { name: '데이터구축실습', credits: 3 },
      { name: '데이터베이스기초', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '데이터분석응용', credits: 3 }, { name: '딥러닝응용', credits: 3 },
      { name: '자연어처리', credits: 3 }, { name: '소프트웨어디자인', credits: 3 },
      { name: '웹앱프로그래밍', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 }, { name: '자연어처리응용', credits: 3 },
      { name: '컴퓨터비젼', credits: 3 }, { name: 'AI모델링실습', credits: 3 },
      { name: 'AI클라우드', credits: 3 }, { name: '창업프로젝트실무', credits: 3 },
    ]},
  ],
};

const MECH_SYS: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인과창업',
  certifications: ['일반기계기사', '기계설계산업기사', '자동차정비산업기사', '공조냉동기계산업기사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '기계공작법', credits: 3 }, { name: '기계공학입문', credits: 2 },
      { name: '기계제도', credits: 3 }, { name: '정밀측정', credits: 3 },
      { name: '3D-CAD(1)', credits: 3 }, { name: '공업수학', credits: 3 },
      { name: '공업역학', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '기계재료', credits: 3 }, { name: '2D-CAD', credits: 3 },
      { name: '센서와모터', credits: 3 }, { name: '창의설계', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '열역학(1)', credits: 3 }, { name: '유체역학(1)', credits: 3 },
      { name: '재료역학', credits: 3 }, { name: 'CAM', credits: 3 },
      { name: '3D-CAD(2)', credits: 3 }, { name: 'PLC제어', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '열역학(2)', credits: 3 }, { name: '유체역학(2)', credits: 3 },
      { name: '공조냉동시스템', credits: 3 }, { name: '기계요소설계', credits: 3 },
      { name: 'CNC공작기계실습', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '생산자동화', credits: 3 }, { name: '동력시스템공학', credits: 3 },
      { name: '열전달및연소', credits: 3 }, { name: '기계설계실무', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인과창업', credits: 2 }, { name: '실무FEA', credits: 3 },
      { name: '유체기계', credits: 3 }, { name: '자동차공학', credits: 3 },
      { name: '전산유동해석', credits: 3 }, { name: '최적설계', credits: 3 },
    ]},
  ],
};

const FIRE_SAFETY: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인과창업',
  certifications: ['소방설비산업기사(기계)', '소방설비산업기사(전기)', '위험물산업기사', '소방안전관리자'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '과학과단위', credits: 3 }, { name: '도면작성과이해', credits: 3 },
      { name: '생활과설비', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '소방설비행정실무', credits: 3 }, { name: '소방학개론', credits: 3 },
      { name: '건축계획과방재', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '건축소방학', credits: 3 }, { name: '소방과유체', credits: 3 },
      { name: '소방설비배관', credits: 3 }, { name: '2D-CAD', credits: 3 },
      { name: '소방설비시스템이해', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '소방약제', credits: 3 }, { name: '소방정보통신설비', credits: 3 },
      { name: '2D-CAD실무', credits: 3 }, { name: '공기조화설비', credits: 3 },
      { name: '위생설비(1)', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '위험물질론', credits: 3 }, { name: '소방경보시스템', credits: 3 },
      { name: '위생설비(2)', credits: 3 }, { name: '제연설비', credits: 3 },
      { name: '화재학', credits: 3 }, { name: 'BIM(1)', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인과창업', credits: 2 }, { name: '소방설비관계법규', credits: 3 },
      { name: '소방설비설계실무(1)', credits: 3 }, { name: '소방점검실무', credits: 3 },
      { name: 'BIM(2)', credits: 3 },
    ]},
  ],
};

const ELEC_ENG: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['전기산업기사', '전기공사산업기사', '소방설비산업기사(전기)', '신재생에너지발전설비기사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '전기수학', credits: 3 }, { name: '전기회로(1)', credits: 3 },
      { name: '전기기초실습', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '전기회로(2)', credits: 3 }, { name: '전기자기학(1)', credits: 3 },
      { name: '전기설비', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '전기자기학(2)', credits: 3 }, { name: '전력공학(1)', credits: 3 },
      { name: '전기기기(1)', credits: 3 }, { name: '제어공학', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '전력공학(2)', credits: 3 }, { name: '전기기기(2)', credits: 3 },
      { name: '전기설계', credits: 3 }, { name: 'PLC제어', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '전력전자', credits: 3 }, { name: '신재생에너지', credits: 3 },
      { name: '전기CAD', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 }, { name: '전기법규', credits: 3 },
    ]},
  ],
};

const ELECTRONIC_ENG: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['전자산업기사', '정보통신산업기사', '반도체설계산업기사', '임베디드기사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '전자회로기초', credits: 3 }, { name: '디지털논리회로', credits: 3 },
      { name: 'C프로그래밍', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '전자회로', credits: 3 }, { name: '마이크로프로세서', credits: 3 },
      { name: '회로설계실습', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '통신공학', credits: 3 }, { name: 'PCB설계', credits: 3 },
      { name: '임베디드시스템', credits: 3 }, { name: '센서공학', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '반도체공학', credits: 3 }, { name: 'IoT프로그래밍', credits: 3 },
      { name: '전자CAD', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '영상처리', credits: 3 }, { name: '무선통신', credits: 3 },
      { name: 'FPGA설계', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

// ── 디자인문화학부 ──

const INDUSTRIAL_DESIGN: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인',
  certifications: ['제품디자인산업기사', '컴퓨터그래픽스운용기능사', '3D프린터운용기능사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '생성AI와디자인', credits: 1 }, { name: '기초디자인(1)', credits: 3 },
      { name: '디자인스케치', credits: 3 }, { name: '캐릭터모델링', credits: 3 },
      { name: '컴퓨터그래픽디자인(1)', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '생성형AI와디자인생각', credits: 2 }, { name: '컬러트랜드', credits: 2 },
      { name: '기초3D모델링', credits: 3 }, { name: '기초디자인(2)', credits: 3 },
      { name: '디자인프로세스', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '모빌리티스케치표현', credits: 3 }, { name: '컴퓨터그래픽디자인(2)', credits: 3 },
      { name: '3D모델링(1)', credits: 3 }, { name: '리빙제품디자인(1)', credits: 3 },
      { name: '모빌리티디자인', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '스케치업', credits: 3 }, { name: '웹디자인기초', credits: 3 },
      { name: '패키지디자인(1)', credits: 3 }, { name: '3D프린팅실습', credits: 1 },
      { name: 'AI프레젠테이션전략', credits: 2 }, { name: '3D모델링(2)', credits: 3 },
      { name: '리빙제품디자인(2)', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '웹디자인실무와창업', credits: 3 }, { name: '전시공간디자인', credits: 3 },
      { name: '패키지디자인(2)', credits: 3 }, { name: 'AI인터렉티브웹디자인', credits: 3 },
      { name: '디자인프로젝트(1)', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 3 }, { name: '전시공간디자인스튜디오(1)', credits: 3 },
      { name: '패키지디자인스튜디오(1)', credits: 3 }, { name: 'AI융합캡스톤디자인', credits: 2 },
      { name: '디자인프로젝트(2)', credits: 3 }, { name: '생성형AI와스토리텔링', credits: 3 },
    ]},
  ],
};

const VISUAL_DESIGN: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인',
  certifications: ['시각디자인산업기사', '컴퓨터그래픽스운용기능사', '웹디자인기능사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '기초디자인', credits: 3 }, { name: '디자인드로잉', credits: 3 },
      { name: '디지털디자인기초', credits: 3 }, { name: '타이포그래피기초', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '디지털일러스트레이션', credits: 3 }, { name: '편집디자인기초', credits: 3 },
      { name: '색채와디자인', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '광고디자인', credits: 3 }, { name: '브랜딩디자인', credits: 3 },
      { name: 'UI/UX디자인', credits: 3 }, { name: '모션그래픽기초', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '패키지디자인', credits: 3 }, { name: '영상디자인', credits: 3 },
      { name: '웹디자인', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '포트폴리오디자인', credits: 3 }, { name: 'UX리서치', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 3 },
    ]},
  ],
};

const FASHION_DESIGN: CurriculumInfo = {
  totalCredits: 132,
  capstoneName: '창업캡스톤디자인',
  certifications: ['패션디자인산업기사', '양장기능사', '패턴기능사', '컬러리스트산업기사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '20세기패션분석', credits: 3 }, { name: '의복구성(1)', credits: 3 },
      { name: '패션그래픽디자인', credits: 3 }, { name: '패션디자인기획', credits: 3 },
      { name: '패션컬러', credits: 2 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '플랫패턴디자인', credits: 3 }, { name: '의복구성(2)', credits: 3 },
      { name: '패션일러스트레이션(1)', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '패션디자인실습', credits: 3 }, { name: '패션마케팅', credits: 3 },
      { name: '패션일러스트레이션(2)', credits: 3 }, { name: '드레이핑', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '디자인프로젝트', credits: 3 }, { name: '디지털텍스타일디자인', credits: 3 },
      { name: '패션도식화CAD', credits: 3 }, { name: '패션상품기획', credits: 3 },
      { name: '패션소재연구', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '창업캡스톤디자인', credits: 3 }, { name: '테일러링', credits: 3 },
      { name: '패션빅데이터분석', credits: 3 }, { name: 'AI패션디자인실무', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '융합캡스톤디자인', credits: 3 }, { name: '디자인제품개발', credits: 3 },
      { name: '온라인쇼핑몰전략', credits: 3 }, { name: 'AI패션영상제작', credits: 3 },
      { name: '포트폴리오제작', credits: 3 },
    ]},
  ],
};

const INTERIOR_ARCH: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '창업캡스톤디자인',
  certifications: ['실내건축산업기사', '전산응용건축제도기능사', '실내건축기사', 'AutoCAD국제자격'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: 'DX그래픽표현기법', credits: 3 }, { name: '공간입체조형', credits: 3 },
      { name: '스케치업(1)', credits: 3 }, { name: '실내건축계획론', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '실내건축색채', credits: 3 }, { name: '실내디자인컨셉과코디네이션', credits: 3 },
      { name: 'CAD(1)', credits: 3 }, { name: '디자인스케치', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '스케치업(2)', credits: 3 }, { name: '실내건축사', credits: 3 },
      { name: '실내조명과빛환경', credits: 3 }, { name: '재료마감실무실습', credits: 3 },
      { name: 'CAD(2)', credits: 3 }, { name: '주거공간스튜디오', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: 'CG렌더링', credits: 3 }, { name: '3D컴퓨터모델링(1)', credits: 3 },
      { name: '기본설계도면', credits: 3 }, { name: '상업공간스튜디오', credits: 3 },
      { name: '실내시공실무', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '3D컴퓨터모델링(2)', credits: 3 }, { name: '실시설계도면', credits: 3 },
      { name: '전시공간스튜디오', credits: 3 }, { name: '창업캡스톤디자인', credits: 3 },
      { name: '호텔공간스튜디오', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '실내공간과AI', credits: 3 }, { name: '실내구조와법규', credits: 3 },
      { name: '복합공간설계(1)', credits: 3 }, { name: '실내조명과설비계획', credits: 3 },
      { name: '포트폴리오제작', credits: 3 },
    ]},
  ],
};

const AD_MEDIA: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인과창작',
  certifications: ['광고도장기능사', 'GTQ(그래픽기술자격)', '소셜미디어전문가', 'Google Ads인증'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '광고의이해', credits: 3 }, { name: '디지털광고의이해', credits: 3 },
      { name: '마케팅의이해', credits: 3 }, { name: '아트워크실습', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '광고기획론', credits: 3 }, { name: '광고와소비자행동', credits: 3 },
      { name: '소셜미디어와애드테크', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '아트워크실습심화', credits: 3 }, { name: '영상콘텐츠편집', credits: 3 },
      { name: '디지털광고캠페인기획', credits: 3 }, { name: '브랜드커뮤니케이션', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '영상콘텐츠편집심화', credits: 3 }, { name: '콘텐츠아이디어', credits: 3 },
      { name: '디지털광고퍼포먼스분석', credits: 3 }, { name: '미디어의이해', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '소비자조사방법론', credits: 3 }, { name: '영상콘텐츠촬영', credits: 3 },
      { name: '콘텐츠제작실습', credits: 3 }, { name: '디지털크리에이터실습', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인과창작', credits: 3 }, { name: '크리에이티브전략', credits: 3 },
      { name: 'UXUI디자인실습', credits: 3 }, { name: '포트폴리오제작', credits: 3 },
      { name: 'PR전략론', credits: 3 },
    ]},
  ],
};

const BROADCAST_VIDEO: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인과창작',
  certifications: ['영상편집전문가', '멀티미디어콘텐츠제작전문가', 'GTQ'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '1인크리에이터입문', credits: 3 }, { name: '영상조명기초', credits: 3 },
      { name: '영상촬영기초', credits: 3 }, { name: '영상편집기초', credits: 3 },
      { name: '콘텐츠기획개발', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '1인크리에이터심화', credits: 3 }, { name: '방송스튜디오기술', credits: 3 },
      { name: '방송영상개론과제작', credits: 3 }, { name: '영상그래픽', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '영상촬영심화', credits: 3 }, { name: '영상콘텐츠편집', credits: 3 },
      { name: '방송연출', credits: 3 }, { name: '스튜디오방송제작', credits: 3 },
      { name: '영상그래픽심화', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '영상특수촬영', credits: 3 }, { name: '시네마토그래피', credits: 3 },
      { name: '사운드기초', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '영상조명심화', credits: 3 }, { name: '콘텐츠제작실습', credits: 3 },
      { name: 'AI영상콘텐츠제작', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인과창작', credits: 3 }, { name: '영상콘텐츠제작실무', credits: 3 },
      { name: '영상컬러그레이딩', credits: 3 }, { name: 'AIDX영상콘텐츠제작', credits: 3 },
      { name: '포트폴리오제작', credits: 3 },
    ]},
  ],
};

const ANIMATION_WEBTOON: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인과창작',
  certifications: ['멀티미디어콘텐츠제작전문가', 'GTQ', '컴퓨터그래픽스운용기능사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '웹툰의이해', credits: 3 }, { name: '3D모델링', credits: 3 },
      { name: '디지털창작', credits: 3 }, { name: '시나리오', credits: 3 },
      { name: '캐릭터디자인', credits: 3 }, { name: '디지털드로잉(1)', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '생성AI와모델링', credits: 3 }, { name: '영상콘텐츠편집', credits: 3 },
      { name: '웹툰연출', credits: 3 }, { name: '스토리보드', credits: 3 },
      { name: '디지털드로잉(2)', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: 'AI레이아웃디자인', credits: 3 }, { name: 'AI와3D디자인', credits: 3 },
      { name: '표현기법', credits: 3 }, { name: '3D애니메이션(1)', credits: 3 },
      { name: '디지털색채표현', credits: 3 }, { name: '배경아트', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '애니메이션웹툰캡스톤디자인', credits: 3 }, { name: '콘텐츠제작실습', credits: 3 },
      { name: '3D애니메이션(2)', credits: 3 }, { name: 'AI크리에이션', credits: 3 },
      { name: '웹툰AI배경', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '웹툰창작(1)', credits: 3 }, { name: '캡스톤디자인과창작', credits: 3 },
      { name: '애니메이션연출기술', credits: 3 }, { name: '웹툰창작(2)', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '일러스트레이션', credits: 3 }, { name: '창작워크숍', credits: 3 },
      { name: '포트폴리오제작', credits: 3 },
    ]},
  ],
};

const BROADCAST_WRITING: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인',
  certifications: ['방송작가자격', '독서지도사', '문예창작지도사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '문예창작기초', credits: 3 }, { name: '시나리오입문', credits: 3 },
      { name: '미디어글쓰기', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '방송대본쓰기', credits: 3 }, { name: '스토리텔링', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '시나리오실습', credits: 3 }, { name: '콘텐츠기획', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '드라마작법', credits: 3 }, { name: '웹소설창작', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '예능구성작법', credits: 3 }, { name: '다큐멘터리구성', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 3 }, { name: '포트폴리오제작', credits: 3 },
    ]},
  ],
};

const BROADCAST_PERFORM: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인',
  certifications: ['실용음악지도사', '연극치료사', '레크리에이션지도자'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '연기기초', credits: 3 }, { name: '보컬트레이닝', credits: 3 },
      { name: '무대표현', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '연기실습', credits: 3 }, { name: '댄스기초', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '카메라연기', credits: 3 }, { name: '뮤지컬실습', credits: 3 },
      { name: 'MC실습', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '영상연기', credits: 3 }, { name: '오디션실무', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '종합공연실습', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 3 }, { name: '포트폴리오제작', credits: 3 },
    ]},
  ],
};

// ── 건강보건학부 ──

const FOOD_NUTRITION: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인',
  certifications: ['영양사', '위생사', '식품산업기사', '조리기능사(한식/양식)'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '공중보건학', credits: 3 }, { name: '기초영양학(1)', credits: 3 },
      { name: '식품학', credits: 3 }, { name: '서양조리실습', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '기초영양학(2)', credits: 3 }, { name: 'HACCP실무', credits: 3 },
      { name: '식품분석실험', credits: 3 }, { name: '제과제빵실습', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '조리원리', credits: 3 }, { name: '한국조리실습(1)', credits: 3 },
      { name: '식사요법(1)', credits: 3 }, { name: '식품미생물학', credits: 3 },
      { name: '식품위생학', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '고급영양학', credits: 3 }, { name: '생리학', credits: 3 },
      { name: '식품재료학', credits: 3 }, { name: '지역사회영양학', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '기능성식품학및실습', credits: 3 }, { name: '식사요법(2)및실습', credits: 3 },
      { name: '영양판정', credits: 3 }, { name: '생화학', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 }, { name: '단체급식및실습', credits: 3 },
      { name: '영양교육', credits: 3 }, { name: '식품위생법규', credits: 3 },
      { name: '급식경영학', credits: 3 }, { name: '식품가공학및실습', credits: 3 },
    ]},
  ],
};

const HEALTH_ADMIN: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['보건의료정보관리사', '병원행정사', '의료보험사', '건강보험심사평가사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '의학용어', credits: 3 }, { name: '보건의료행정학', credits: 3 },
      { name: '공중보건학', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '의무기록관리학', credits: 3 }, { name: '보건통계학', credits: 3 },
      { name: '병원경영학', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '건강보험론', credits: 3 }, { name: '의료정보관리학', credits: 3 },
      { name: '질병분류실습', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '보건의료법규', credits: 3 }, { name: '의료보험청구실무', credits: 3 },
      { name: '의료질관리학', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '암등록실무', credits: 3 }, { name: 'EMR실무', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const OCCUPATIONAL_THERAPY: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인',
  certifications: ['작업치료사', '감각통합치료사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '해부학', credits: 3 }, { name: '작업치료학개론', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '생리학', credits: 3 }, { name: '운동학', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '신경과학', credits: 3 }, { name: '정신건강작업치료', credits: 3 },
      { name: '아동발달학', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '신체기능작업치료', credits: 3 }, { name: '감각통합치료', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '임상실습', credits: 6 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const ANIMAL_HEALTH: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['동물보건사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '동물해부학', credits: 3 }, { name: '동물보건학개론', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '동물생리학', credits: 3 }, { name: '동물질병학', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '임상병리실습', credits: 3 }, { name: '동물간호학', credits: 3 },
      { name: '동물약리학', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '동물영상의학', credits: 3 }, { name: '마취모니터링', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '수술보조실습', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const PARAMEDIC: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인',
  certifications: ['응급구조사(1급)', 'BLS/ACLS Provider'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '해부학', credits: 3 }, { name: '응급의학총론', credits: 3 },
      { name: '공중보건학', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '생리학', credits: 3 }, { name: '응급처치학', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '전문심장소생술', credits: 3 }, { name: '외상학', credits: 3 },
      { name: '약리학', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '환자평가학', credits: 3 }, { name: '응급환자관리', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '병원임상실습', credits: 6 }, { name: '구급차동승실습', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 }, { name: '응급의료법규', credits: 3 },
    ]},
  ],
};

// ── 건강생활학부 ──

const BIO_PHARMA: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인과비즈니스모델',
  certifications: ['바이오화학제품제조산업기사', '화학분석기사', '품질관리산업기사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '기초화학', credits: 3 }, { name: '기초기기분석', credits: 3 },
      { name: '기초세포배양', credits: 3 }, { name: '기초유전자분석', credits: 3 },
      { name: '기초생물학및실습', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '기초조향실습', credits: 3 }, { name: '기초미생물학', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '생화학', credits: 3 }, { name: '미생물학실습', credits: 3 },
      { name: '바이오통계실습', credits: 3 }, { name: '향장학실습', credits: 3 },
      { name: '기기분석실습(1)', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '동물세포배양기초실습', credits: 3 }, { name: '약전실습', credits: 3 },
      { name: '의약품GMP', credits: 3 }, { name: 'Fermenter조작실습', credits: 3 },
      { name: '기기분석실습(2)', credits: 3 }, { name: '단백질분리정제실습', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '밸리데이션실무', credits: 3 }, { name: '품질관리실무', credits: 3 },
      { name: '기초약리학', credits: 3 }, { name: '의약품제조', credits: 3 },
      { name: '바이오시밀러배양실습', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인과비즈니스모델', credits: 2 }, { name: 'GLP실무', credits: 3 },
      { name: '기능성식품학실무', credits: 3 }, { name: '바이오의약품분석실습', credits: 3 },
      { name: '유전자분석실습', credits: 3 },
    ]},
  ],
};

const BIO_CHEM: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['화학분석기능사', '바이오화학제품제조산업기사', '환경기능사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '일반화학', credits: 3 }, { name: '생물학개론', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '유기화학', credits: 3 }, { name: '분석화학', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '기기분석', credits: 3 }, { name: '바이오공정', credits: 3 },
      { name: '미생물학', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: 'HPLC실습', credits: 3 }, { name: '세포배양', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '화장품원료학', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const SKIN_MAKEUP: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인과창업',
  certifications: ['미용사(피부)', '미용사(메이크업)', '병원코디네이터'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '공중보건및위생관리학', credits: 3 }, { name: '피부생명과학', credits: 3 },
      { name: '기초메이크업', credits: 3 }, { name: '기초스킨케어', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '림프드레나지', credits: 3 }, { name: '화장품기초이론및실습', credits: 3 },
      { name: 'AI뷰티커뮤니케이션', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '두피케어이론및실습', credits: 3 }, { name: '인체해부와응용피부관리', credits: 3 },
      { name: '퍼스널컬러이미지메이킹', credits: 3 }, { name: '화장품마케팅', credits: 3 },
      { name: '메디컬스킨케어', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '캡스톤디자인과창업', credits: 2 }, { name: '특수분장과네일', credits: 3 },
      { name: '메디컬임상실무', credits: 3 }, { name: '뷰티IT활용실무', credits: 3 },
      { name: '스테이지미디어메이크업', credits: 3 },
    ]},
  ],
};

const BEAUTY_COSMETICS: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['미용사(피부)', '맞춤형화장품조제관리사', '컬러리스트산업기사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '뷰티학개론', credits: 3 }, { name: '화장품학', credits: 3 },
      { name: '기초피부관리', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '화장품원료학', credits: 3 }, { name: '네일아트', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '맞춤형화장품조제', credits: 3 }, { name: '뷰티마케팅', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '화장품품질관리', credits: 3 }, { name: '뷰티SNS마케팅', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '화장품제조실습', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const SOCIAL_WELFARE: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인과창업',
  certifications: ['사회복지사 2급', '청소년지도사 2급', '건강가정사', '청소년상담사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '가족복지론', credits: 3 }, { name: '사회복지학개론', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '아동복지론', credits: 3 }, { name: '장애인복지론', credits: 3 },
      { name: '청소년문화', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '건강가정론', credits: 3 }, { name: '노인복지론', credits: 3 },
      { name: '인간행동과사회환경', credits: 3 }, { name: '청소년문제와보호', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '사회복지실천론', credits: 3 }, { name: '인간행동의사회심리학적이해', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '사회복지행정론', credits: 3 }, { name: '의료사회복지론', credits: 3 },
      { name: '지역사회복지론', credits: 3 }, { name: '청소년지도방법론', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인과창업', credits: 2 }, { name: '사회복지실천기술론', credits: 3 },
      { name: '정신건강론', credits: 3 }, { name: '사회복지조사론', credits: 3 },
      { name: '사회복지법제론', credits: 3 }, { name: '사회복지정책론', credits: 3 },
      { name: '사회복지현장실습', credits: 3 },
    ]},
  ],
};

const SPORTS_REHAB: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['생활스포츠지도사 2급', '스포츠마사지자격', '재활트레이너'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '스포츠과학개론', credits: 3 }, { name: '기능해부학', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '운동생리학', credits: 3 }, { name: '스포츠테이핑', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '운동처방론', credits: 3 }, { name: '스포츠마사지', credits: 3 },
      { name: '체력측정평가', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '재활트레이닝', credits: 3 }, { name: 'FMS', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '운동재활실습', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const PET_INDUSTRY: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인',
  certifications: ['반려동물관리사', '반려동물행동교정사', '펫푸드관리사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '반려동물학개론', credits: 3 }, { name: '동물행동학', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '반려동물영양학', credits: 3 }, { name: '그루밍실습', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '반려동물훈련', credits: 3 }, { name: '펫산업경영', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '동물복지법규', credits: 3 }, { name: '펫마케팅', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '펫비즈니스창업', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const HOTEL_CULINARY: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인과창업',
  certifications: ['조리기능사(한식/양식/일식/중식)', '제과기능사', '제빵기능사', '바리스타자격'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '식품위생관리', credits: 3 }, { name: '베이커리실습', credits: 3 },
      { name: '웨스턴퀴진', credits: 3 }, { name: '조리원리', credits: 3 },
      { name: '한식조리실습', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '메뉴기획과디자인', credits: 3 }, { name: '지중해요리실습', credits: 3 },
      { name: '컨템포러리한식', credits: 3 }, { name: '호텔디저트제조실습', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '카페레스토랑창업실무', credits: 3 }, { name: '레스토랑음료와주류실습', credits: 3 },
      { name: '소스응용과상품개발', credits: 3 }, { name: '식품구매및외식원가관리', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '캡스톤디자인과창업', credits: 2 }, { name: '웰니스조리실습', credits: 3 },
      { name: '중식조리실습', credits: 3 }, { name: '푸드마케팅', credits: 3 },
      { name: '푸드스타일링실습', credits: 3 },
    ]},
  ],
};

const CAFE_BAKERY: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인과창업',
  certifications: ['제과기능사', '제빵기능사', '바리스타자격', '카페경영관리사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '제빵이론및실습', credits: 3 }, { name: '제과이론및실습', credits: 3 },
      { name: '바리스타입문', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '커피로스팅', credits: 3 }, { name: '디저트실습', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '카페메뉴개발', credits: 3 }, { name: '카페창업실무', credits: 3 },
      { name: '푸드스타일링', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '캡스톤디자인과창업', credits: 2 }, { name: '카페경영', credits: 3 },
    ]},
  ],
};

// ── 비즈니스학부 ──

const HOTEL_TOURISM: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인과창업',
  certifications: ['관광통역안내사', '호텔관리사', '호텔서비스사', '바텐더자격', '소믈리에자격'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '관광법규', credits: 2 }, { name: '여행사경영론', credits: 2 },
      { name: '호텔경영론', credits: 2 }, { name: '관광학개론', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '바텐더실습', credits: 3 }, { name: '소믈리에실습', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '바리스타실습', credits: 3 }, { name: '바텐더응용실습', credits: 3 },
      { name: '식음료실습', credits: 3 }, { name: '여행상담실습기초', credits: 3 },
      { name: '접객서비스실습', credits: 3 }, { name: '관광영어회화(1)', credits: 2 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '면세점운영관리', credits: 3 }, { name: '프론트서비스실습', credits: 3 },
      { name: '호텔/관광마케팅', credits: 2 }, { name: '크루즈경영론', credits: 3 },
      { name: '캡스톤디자인과창업', credits: 3 }, { name: '항공예약실습', credits: 3 },
    ]},
  ],
};

const JAPAN_BUSINESS: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인',
  certifications: ['JLPT N1/N2', 'JPT', '무역관리사', '관세사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '기초일본어(1)', credits: 3 }, { name: '일본문화의이해', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '기초일본어(2)', credits: 3 }, { name: '비즈니스일본어입문', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '중급일본어', credits: 3 }, { name: '일본경제의이해', credits: 3 },
      { name: '무역실무', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '비즈니스일본어실무', credits: 3 }, { name: '일본어통역실습', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '고급일본어', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const BIZ_INFO: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인',
  certifications: ['ERP정보관리사', '전산회계', '컴퓨터활용능력', '유통관리사'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '경영학원론', credits: 3 }, { name: '경제학원론', credits: 3 },
      { name: '컴퓨터활용', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '회계원리', credits: 3 }, { name: '마케팅원론', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '경영정보시스템', credits: 3 }, { name: 'ERP실무', credits: 3 },
      { name: '재무관리', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '데이터분석', credits: 3 }, { name: '인적자원관리', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '전자상거래', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const TAX_ACCOUNTING: CurriculumInfo = {
  totalCredits: 128,
  capstoneName: '캡스톤디자인',
  certifications: ['전산세무 1급/2급', '전산회계 1급', 'TAT', 'FAT', '세무회계자격'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '회계원리(1)', credits: 3 }, { name: '세법개론', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '회계원리(2)', credits: 3 }, { name: '부가가치세', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '재무회계', credits: 3 }, { name: '소득세', credits: 3 },
      { name: '전산회계실무', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '원가회계', credits: 3 }, { name: '법인세', credits: 3 },
      { name: '전산세무실무', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '세무회계실무', credits: 3 }, { name: '재무분석', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

const AIRLINE_SERVICE: CurriculumInfo = {
  totalCredits: 126,
  capstoneName: '캡스톤디자인과비지니스모델',
  certifications: ['TOEIC 800+', 'JLPT N2', '서비스경영자격', '항공예약발권자격(Amadeus/TOPAS)'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: 'TOEIC초급', credits: 3 }, { name: '고객만족커뮤니케이션', credits: 3 },
      { name: '기내방송실습', credits: 3 }, { name: '기내서비스실무(1)', credits: 3 },
      { name: '이미지메이킹실습', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: 'TOEIC중급', credits: 3 }, { name: '글로벌매너커뮤니케이션', credits: 3 },
      { name: '면접기초', credits: 3 }, { name: '항공실무일본어초급', credits: 3 },
      { name: '기내식음료서비스실무', credits: 3 }, { name: '기내안전실무', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '항공예약실무', credits: 3 }, { name: 'TOEIC고급', credits: 3 },
      { name: '면접심화', credits: 3 }, { name: '항공실무일본어중급', credits: 3 },
      { name: '항공실무중국어초급', credits: 3 }, { name: '기내서비스실무(2)', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '캡스톤디자인과비지니스모델', credits: 2 }, { name: '스마트항공운송실무', credits: 3 },
      { name: '항공서비스마케팅', credits: 3 }, { name: '항공인터뷰영어', credits: 3 },
      { name: '항공실무일본어고급', credits: 3 },
    ]},
  ],
};

const FREE_MAJOR: CurriculumInfo = {
  totalCredits: 130,
  capstoneName: '캡스톤디자인',
  certifications: ['컴퓨터활용능력', 'MOS', 'ITQ'],
  courses: [
    { year: 1, semester: 1, courses: [
      { name: '자유전공탐색', credits: 3 }, { name: '진로설계', credits: 3 },
    ]},
    { year: 1, semester: 2, courses: [
      { name: '전공체험', credits: 3 }, { name: '프레젠테이션실습', credits: 3 },
    ]},
    { year: 2, semester: 1, courses: [
      { name: '융합프로젝트(1)', credits: 3 },
    ]},
    { year: 2, semester: 2, courses: [
      { name: '융합프로젝트(2)', credits: 3 },
    ]},
    { year: 3, semester: 1, courses: [
      { name: '캡스톤디자인준비', credits: 3 },
    ]},
    { year: 3, semester: 2, courses: [
      { name: '캡스톤디자인', credits: 2 },
    ]},
  ],
};

// ── preset id → CurriculumInfo 매핑 ──

export const CURRICULUM_DATA: Record<string, CurriculumInfo> = {
  free_major: FREE_MAJOR,
  mech_sys: MECH_SYS,
  fire_safety: FIRE_SAFETY,
  elec_eng: ELEC_ENG,
  electronic_eng: ELECTRONIC_ENG,
  comp_sw: COMP_SW,
  game_content: GAME_CONTENT,
  ai_major: AI_MAJOR,
  industrial_design: INDUSTRIAL_DESIGN,
  visual_design: VISUAL_DESIGN,
  fashion_design: FASHION_DESIGN,
  interior_arch: INTERIOR_ARCH,
  ad_media: AD_MEDIA,
  broadcast_video: BROADCAST_VIDEO,
  animation_webtoon: ANIMATION_WEBTOON,
  broadcast_writing: BROADCAST_WRITING,
  broadcast_perform: BROADCAST_PERFORM,
  food_nutrition: FOOD_NUTRITION,
  health_admin: HEALTH_ADMIN,
  occupational_therapy: OCCUPATIONAL_THERAPY,
  animal_health: ANIMAL_HEALTH,
  paramedic: PARAMEDIC,
  bio_pharma: BIO_PHARMA,
  bio_chem: BIO_CHEM,
  skin_makeup: SKIN_MAKEUP,
  beauty_cosmetics: BEAUTY_COSMETICS,
  social_welfare: SOCIAL_WELFARE,
  sports_rehab: SPORTS_REHAB,
  pet_industry: PET_INDUSTRY,
  hotel_culinary: HOTEL_CULINARY,
  cafe_bakery: CAFE_BAKERY,
  hotel_tourism: HOTEL_TOURISM,
  japan_business: JAPAN_BUSINESS,
  biz_info: BIZ_INFO,
  tax_accounting: TAX_ACCOUNTING,
  airline_service: AIRLINE_SERVICE,
};

export function getCurriculum(presetId: string): CurriculumInfo | undefined {
  return CURRICULUM_DATA[presetId];
}

export function getCourseNames(presetId: string): string[] {
  const info = CURRICULUM_DATA[presetId];
  if (!info) return [];
  return info.courses.flatMap(s => s.courses.map(c => c.name));
}

export function getCertifications(presetId: string): string[] {
  return CURRICULUM_DATA[presetId]?.certifications ?? [];
}
