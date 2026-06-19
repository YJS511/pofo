import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ManualOverlayProps {
  onClose: () => void;
}

const PAGES = [
  {
    title: '전공 선택',
    image: '/manual/00-department.png',
    desc: 'POFO에 처음 접속하면 전공 선택 화면이 나타납니다. 본인의 학부와 전공을 선택하면, 해당 전공에 맞는 샘플 데이터와 추천 기술 스택이 자동으로 채워집니다.',
    details: [
      '공학부, 디자인문화학부, 건강보건학부 등 유한대학교의 주요 학부가 표시됩니다.',
      '학부를 선택하면 해당 학부의 전공 목록이 나타납니다.',
      '전공을 클릭하면 해당 전공에 맞는 샘플 포트폴리오가 자동 생성됩니다.',
      '"빈 템플릿으로 시작"을 누르면 빈 상태에서 직접 작성할 수도 있습니다.',
      '이미 포트폴리오를 작성한 후 다시 이 화면으로 돌아오려면, 상단의 "새로 만들기" 버튼을 누르세요.',
    ],
  },
  {
    title: '포트폴리오 편집',
    image: '/manual/01-editor.png',
    desc: '화면은 왼쪽 편집 패널과 오른쪽 실시간 미리보기로 구성됩니다. 왼쪽에서 정보를 입력하면 오른쪽에 즉시 반영되어, 결과물을 확인하며 작성할 수 있습니다.',
    details: [
      '편집 패널 상단에 "포트폴리오 / 템플릿 / 스타일" 3개 탭이 있습니다.',
      '"포트폴리오" 탭에서는 기본 정보, 연락처, 소개, 기술 스택, 경력, 프로젝트, 교육 등 9개 섹션을 입력합니다.',
      '각 섹션을 클릭하면 펼쳐지며, 해당 항목을 입력할 수 있습니다.',
      '완성도 바(%)가 상단에 표시되어, 입력 진행률을 한눈에 확인할 수 있습니다.',
      '섹션 왼쪽의 체크(✓) 표시는 해당 항목이 충분히 입력되었음을 나타냅니다.',
      '상단의 "자동 입력" 버튼을 누르면 단계별 가이드 모드로 전환되어 빠르게 채울 수 있습니다.',
    ],
  },
  {
    title: '템플릿 선택',
    image: '/manual/02-template.png',
    desc: '"템플릿" 탭에서 포트폴리오의 전체 레이아웃과 스타일 프리셋을 선택합니다. 레이아웃과 스타일을 조합해 다양한 디자인을 만들 수 있습니다.',
    details: [
      '레이아웃 4종: 노션 페이지(기본) / 심플 이력서 / 사이드바 / 폴더 스타일',
      '노션 페이지: Notion 문서처럼 커버 + 아이콘 + 본문 구성',
      '심플 이력서: 커버 없이 깔끔한 이력서 형태',
      '사이드바: 왼쪽에 프로필, 오른쪽에 본문이 나뉘는 2단 구성',
      '폴더: 탭 메뉴로 섹션을 전환하는 형태',
      '스타일 프리셋 6종: 클래식, 미니멀, 볼드, 모노, 다크, 필기체 — 각각 다른 느낌의 디자인을 제공합니다.',
    ],
  },
  {
    title: '스타일 커스터마이징',
    image: '/manual/03-style.png',
    desc: '"스타일" 탭에서 커버 이미지, 색상, 폰트, 다크 모드 등을 세밀하게 조정합니다. 템플릿 위에 원하는 스타일을 덧입혀 개성 있는 포트폴리오를 완성하세요.',
    details: [
      '커버: 그라데이션 프리셋, 단색, 직접 이미지 업로드 중 선택 가능합니다.',
      '강조 색상: 섹션 제목, 링크 등에 적용되는 포인트 컬러를 지정합니다.',
      '아이콘: 이모지, 사진 업로드, 없음 중 선택 가능합니다.',
      '폰트: 프리텐다드(기본) / 나눔명조 / JetBrains Mono 등을 지원합니다.',
      '본문 너비: "기본 너비" / "전체 너비" 버튼으로 본문 영역의 폭을 조절할 수 있습니다.',
      '다크 모드: 토글 하나로 어두운 배경 테마로 전환됩니다.',
      '섹션 순서: 드래그 없이 위/아래 버튼으로 섹션 순서를 변경할 수 있습니다.',
    ],
  },
  {
    title: '공유 및 내보내기',
    image: '/manual/04-share.png',
    desc: '상단의 "공유" 버튼을 누르면 다양한 내보내기 옵션이 표시됩니다. 완성된 포트폴리오를 여러 형태로 저장하고 공유할 수 있습니다.',
    details: [
      '공유 링크 복사: URL 하나로 포트폴리오를 공유합니다. 받는 사람은 설치 없이 브라우저에서 바로 확인 가능합니다.',
      'HTML 다운로드: 독립 실행형 웹 파일(.html)로 저장합니다. 인터넷 없이도 열 수 있습니다.',
      'PDF 인쇄: 브라우저의 인쇄 기능으로 PDF를 생성합니다.',
      '마크다운 복사: GitHub README 등에 붙여넣기 할 수 있는 마크다운 텍스트를 복사합니다.',
      'PPTX 다운로드: 발표용 PowerPoint 파일을 생성합니다.',
      'JSON 내보내기: 데이터 백업 및 복원용 JSON 파일을 저장합니다.',
      '발표 모드: 상단의 "발표" 버튼으로 슬라이드 형태의 프레젠테이션을 시작합니다.',
    ],
  },
  {
    title: '미리보기 및 기타 기능',
    image: '/manual/05-mobile.png',
    desc: '오른쪽 미리보기 영역에서는 데스크톱/모바일 뷰 전환, 실행 취소/다시 실행, 초기화 등의 기능을 사용할 수 있습니다.',
    details: [
      '모바일 뷰: 미리보기 상단의 스마트폰 아이콘을 누르면 iPhone 프레임 안에서 모바일 화면을 확인합니다.',
      '데스크톱 뷰: 모니터 아이콘을 눌러 원래 화면으로 돌아옵니다.',
      '실행 취소 (Ctrl+Z): 직전 편집을 되돌립니다.',
      '다시 실행 (Ctrl+Shift+Z): 되돌린 편집을 복원합니다.',
      '"내용 초기화" 버튼: 입력 내용만 비우고, 선택한 템플릿/스타일 디자인은 유지합니다.',
      '"새로 만들기" 버튼: 모든 내용과 디자인을 초기화하고, 학과 선택 화면으로 돌아갑니다.',
      '작성 중인 포트폴리오는 브라우저에 자동 저장되므로, 창을 닫았다가 다시 열어도 이어서 작성할 수 있습니다.',
    ],
  },
];

export function ManualOverlay({ onClose }: ManualOverlayProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const page = PAGES[currentPage];

  const prev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const next = () => setCurrentPage((p) => Math.min(PAGES.length - 1, p + 1));

  return (
    <div className="fixed inset-0 z-[160] bg-white dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 px-7 py-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2.5 font-bold text-[15px] text-gray-900 dark:text-white">
          <span className="w-6 h-6 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 grid place-items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4h7a6 6 0 0 1 0 12H9V22H6V4Z" />
            </svg>
          </span>
          POFO 사용 설명서
        </div>

        <div className="flex-1 flex items-center justify-center gap-1.5">
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentPage
                  ? 'bg-gray-900 dark:bg-white w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[960px] mx-auto px-6 py-8">
          {/* Page number + Title */}
          <div className="mb-6">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider">
              {currentPage + 1} / {PAGES.length}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {page.title}
            </h2>
          </div>

          {/* Screenshot */}
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg mb-8">
            <img
              src={page.image}
              alt={page.title}
              className="w-full h-auto block"
              draggable={false}
            />
          </div>

          {/* Description */}
          <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
            {page.desc}
          </p>

          {/* Detailed tips */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              상세 안내
            </h3>
            <ul className="space-y-2.5">
              {page.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold grid place-items-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between px-7 py-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        <button
          onClick={prev}
          disabled={currentPage === 0}
          className="h-10 px-5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </button>

        <span className="text-xs text-gray-400 dark:text-gray-500">
          {PAGES.map((p, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-1.5 py-0.5 rounded text-xs transition-colors ${
                i === currentPage
                  ? 'text-gray-900 dark:text-white font-bold'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {p.title}
            </button>
          ))}
        </span>

        {currentPage < PAGES.length - 1 ? (
          <button
            onClick={next}
            className="h-10 px-5 rounded-lg text-sm font-semibold flex items-center gap-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            다음
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-lg text-sm font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            닫기
          </button>
        )}
      </div>
    </div>
  );
}
