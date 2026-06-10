# POFO

### 유한대학교 노션 스타일 포트폴리오 빌더

전공을 선택하면 **맞춤형 샘플 데이터와 기술스택**이 자동으로 채워지고,
입력 도우미를 따라가면 **노션 감성의 포트폴리오**가 완성됩니다.

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-Free_to_Use-brightgreen?style=flat-square)

---

## 주요 기능

- **37개 전공 프리셋** — 유한대학교 전 학과 대응, 전공별 기술스택 및 도구 자동 추천
- **입력 도우미** — 질문에 답하듯 단계별로 포트폴리오 완성
- **실시간 미리보기** — 입력 즉시 결과 확인 (데스크탑 / 모바일 전환)
- **6가지 레이아웃** — 와이드, 심플, 사이드바, 탭, 좁은 노션, 와이드 미니멀
- **6가지 스타일** — 클래식, 아웃라인, 볼드, 터미널, 다크, 세리프
- **발표 슬라이드** — 포트폴리오를 슬라이드 모드로 프레젠테이션
- **다양한 내보내기** — HTML, ZIP, Markdown, JSON, PDF, PowerPoint
- **로컬 저장** — 서버 전송 없이 브라우저 localStorage에 자동 저장

---

## 빠른 시작

```bash
cd pofo/app
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build    # dist/ 폴더에 정적 파일 생성
npm run preview  # 빌드 결과 로컬 확인
```

---

## 사용 흐름

| 단계 | 내용 |
|:---|:---|
| 1 | **전공 선택** — 학부별 탭에서 전공을 고르면 샘플 데이터 자동 세팅 |
| 2 | **입력 도우미** — 이름, 직무, 소개, 기술, 도구, 링크, 경력, 프로젝트, 학력, 커스텀 섹션 |
| 3 | **디자인 커스터마이징** — 레이아웃, 스타일, 커버, 포인트 컬러, 섹션 순서 |
| 4 | **내보내기** — 원하는 형식으로 저장하거나 클립보드에 복사 |

---

## 내보내기 형식

| 형식 | 용도 |
|:---|:---|
| HTML (.html) | 테마가 완벽 보존된 단독 웹페이지 |
| 배포용 ZIP (.zip) | Netlify Drop 등에 드래그하여 즉시 웹사이트 배포 |
| Markdown (.md) | GitHub README, 노션, 블로그에 붙여넣기 |
| JSON (.json) | 구조화된 백업 / 다른 기기로 이전 |
| PDF | 인쇄형 포트폴리오 문서 |
| PowerPoint (.pptx) | 편집 가능한 발표용 슬라이드 |

---

## 배포

`netlify.toml`이 설정되어 있어 GitHub 연동 후 Netlify에서 자동 배포됩니다.

```toml
[build]
  base = "app"
  command = "npm install && npm run build"
  publish = "dist"
```

수동 배포: **내보내기 > 배포용 ZIP** 다운로드 후 [Netlify Drop](https://app.netlify.com/drop)에 드래그

---

## 프로젝트 구조

```
pofo/
├── app/
│   ├── src/app/
│   │   ├── components/       # React 컴포넌트
│   │   ├── hooks/            # usePortfolioState 등 커스텀 훅
│   │   ├── utils/            # export, slides 유틸리티
│   │   ├── constants.ts      # 템플릿, 스타일 프리셋, 가이드 스텝
│   │   ├── portfolioPresets.ts  # 37개 전공별 프리셋 데이터
│   │   ├── departmentData.ts # 전공별 기술스택 및 도구 카테고리
│   │   └── types.ts          # TypeScript 타입 정의
│   ├── package.json
│   └── vite.config.ts
├── netlify.toml
└── README.md
```

---

## 기술 스택

- **React 19** + **TypeScript**
- **Vite** — 빌드 및 개발 서버
- **Tailwind CSS v4** — 유틸리티 기반 스타일링
- **localStorage** — 입력 내용 자동 저장 (`pofo.state`, `pofo.presetId`)
- 웹폰트: Pretendard, JetBrains Mono, Nanum Myeongjo (CDN)

---

## 제작자

**용지순**
유한대학교 컴퓨터소프트웨어전공
`202307025` · `202607917`
