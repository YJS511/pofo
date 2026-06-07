# 📓 POFO

### 노션 스타일 포트폴리오 빌더

입력만 하면 **노션 감성의 포트폴리오**가 실시간으로 완성됩니다.
설치 없이, 회원가입 없이, **단 하나의 HTML 파일**로 동작해요.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No Build](https://img.shields.io/badge/build-none-success?style=flat-square)
![Single File](https://img.shields.io/badge/single--file-183KB-blue?style=flat-square)
![License](https://img.shields.io/badge/license-Free_to_Use-brightgreen?style=flat-square)

---

## ✨ 한눈에 보기

> **누구나 자유롭게 사용하세요.** 브라우저에서 열고, 칸을 채우면, 바로 내보낼 수 있는 포트폴리오가 됩니다.

- 🧩 **설치·서버 불필요** — `index.html` 파일 하나면 끝
- ⚡ **실시간 미리보기** — 입력하는 즉시 결과가 보여요
- 🎨 **노션 스타일 디자인** — 깔끔한 레이아웃과 파스텔 태그
- 📤 **다양한 내보내기** — 웹 · PDF · PPT · 노션 마크다운 · JSON
- 📱 **모바일 지원** — 휴대폰에서도 편집·열람 가능
- 🔒 **내 데이터는 내 브라우저에** — 서버 전송 없이 로컬 저장

---

## 🚀 빠른 시작

### 1. 그냥 열기
```
index.html 파일을 더블클릭 → 브라우저에서 바로 실행
```

### 2. 로컬 서버로 열기 (권장)
```bash
cd pofo
python3 -m http.server 3000
# 브라우저에서 http://localhost:3000 접속
```

### 3. 같은 WiFi의 휴대폰에서 열기
```
PC에서 서버 실행 후, 휴대폰 브라우저에서
http://<PC의 IP>:3000  접속
```

---

## 🧭 사용법

| 단계 | 내용 |
|:---|:---|
| 1️⃣ | **기본 정보** — 이름, 직무, 아이콘(이모지·사진) |
| 2️⃣ | **연락처 & 링크** — 이메일, GitHub, 웹사이트 |
| 3️⃣ | **소개** — 한 줄 자기소개 (노션 콜아웃으로 표시) |
| 4️⃣ | **기술 스택** — 쉼표로 입력하면 색상 태그로 변환 |
| 5️⃣ | **서비스 & 툴** — 사용 도구를 클릭해서 선택 |
| 6️⃣ | **경력 · 프로젝트 · 학력** — 자유롭게 추가/정렬 |
| ➕ | **커스텀 섹션** — 자격증·수상·대외활동 등 직접 추가 |
| 🎉 | **완성 & 내보내기** — 원하는 형식으로 저장 |

> 💡 **입력 도우미(✨)** 를 켜면 질문에 답하듯 단계별로 채울 수 있어요.

---

## 🎨 디자인 커스터마이징

상단 **스타일** 탭에서 자유롭게 꾸밀 수 있습니다.

- **레이아웃** 3종 — 노션 기본 · 사이드바 · 미니멀
- **디자인 스타일** 4종 — 클래식 · 라인 · 볼드 · 모노
- **디자인 프리셋** 10종 — 한 번에 분위기 적용
- **커버** — 그라데이션 · 단색 · 이미지 · 없음
- **포인트 컬러** — 자동(커버 기준) 또는 직접 지정
- **섹션 순서** — 항목 전체 순서를 ↑↓ 로 자유 배치

---

## 📤 내보내기 형식

| 형식 | 용도 |
|:---|:---|
| 🌐 **단독 HTML** | 배포·임베드 가능한 완성 웹사이트 |
| 📄 **PDF** | 인쇄형 포트폴리오 문서 |
| 📽️ **PowerPoint (.pptx)** | 편집 가능한 발표용 슬라이드 |
| 📝 **노션 마크다운 (.md)** | 노션에 바로 붙여넣기 |
| 🗂️ **JSON** | 구조화된 백업 / 다른 기기로 이전 |

> 🔄 **기기 간 이전**: `JSON 내보내기` → 다른 기기에서 `JSON 불러오기`

---

## 🌍 배포하기 (다른 사람과 공유)

단일 HTML이라 정적 호스팅 한 번이면 누구나 접속할 수 있어요.

- **Netlify Drop** — `app.netlify.com/drop` 에 `index.html` 드래그 → 즉시 공개 URL
- **GitHub Pages** — 저장소 업로드 후 Settings → Pages 활성화
- **Vercel / Cloudflare Pages** — 폴더 연결만 하면 자동 배포

> 데이터는 방문자 각자의 브라우저에 저장되므로, 여러 사람이 동시에 써도 서로 간섭하지 않습니다.

---

## 🛠️ 기술 스택

- **Vanilla JavaScript** — 프레임워크 없이 순수 JS
- **단일 파일 구조** — 인라인 CSS + JS, 외부 의존성 최소화
- **localStorage** — 입력 내용 자동 저장
- **반응형 디자인** — 데스크탑 2단 / 모바일 탭 전환
- 웹폰트: Pretendard · JetBrains Mono · Nanum Myeongjo (CDN)

```
pofo/
└── index.html   ← 앱 전체가 이 파일 하나에
```

---

## 👤 제작자

**용지순**
유한대학교 컴퓨터공학과
`202307025` · `202607917`

---

### 🆓 모든 사람이 자유롭게 사용하세요

made with 📓 by **용지순**
