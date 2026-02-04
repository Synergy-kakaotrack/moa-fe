# MOA Chrome Extension

여러 AI 에이전트의 답변을 드래그하여 스크랩을 만들고 프로젝트별로 정리할 수 있는 크롬 확장프로그램입니다.

---

## 프로젝트 소개

AI를 사용하다 보면 중요한 답변을 저장해두고 싶지만  
매번 복사해서 외부 메모 도구에 옮기는 과정이 번거롭습니다.  
또한 ChatGPT, Claude, Gemini 등 AI 서비스마다 화면 구조가 달라  
결과를 한 곳에서 관리하기 어렵다는 문제가 있습니다.

MOA Chrome Extension은  
AI 답변을 드래그하는 것만으로 스크랩을 저장하고  
프로젝트 단위로 정리할 수 있도록 도와주는 크롬 확장프로그램입니다.

---

## 기획 배경

### 문제점
- AI 결과를 수동으로 복사해야 함
- AI 서비스마다 UI와 DOM 구조가 서로 다름
- 프로젝트별 결과 관리가 어려움

### 해결 방향
- 드래그 기반 스크랩 기능 제공
- AI 출처 자동 인식
- 프로젝트 단위 저장 및 관리

---

## 주요 기능

- 크롬 사이드 패널 UI 지원
- AI 답변 드래그 시 텍스트 자동 스크랩
- AI 출처 분류(ChatGPT, Claude, Gemini)
- 스크랩 저장(프로젝트, 작업 단계, 소제목, 메모)
- 중복 스크랩 방지, 스크랩 전체 삭제, 스크랩 리스트 복구 등 부가적인 기능 포함

---

## 지원 환경

- Google Chrome Extension (Manifest V3)
- Microsoft Edge Extension

### 지원 AI 서비스
- ChatGPT
- Claude
- Gemini
  
(+ 추후 추가 예정)

---

## 사용 방법

1. ChatGPT, Claude, Gemini 중 하나에 접속 후 AI와 대화
2. 저장하고 싶은 답변이 생기면 확장프로그램을 열어 텍스트 드래그하여 스크랩 생성
3. 원하는 스크랩을 다 넣은 후 `스크랩 완료` 버튼 클릭
4. 프로젝트, 작업 단계, 소제목은 AI의 추천을 받아 설정, 메모 입력(선택사항) 완료 시 `다음` 버튼 클릭
5. 최종 저장 전 설정한 내역 확인 후 `저장` 버튼을 클릭해 스크랩 저장
6. 상단 `대시보드` 버튼을 눌러 웹 대시보드로 이동 or `최근 저장된 스크랩 보러가기` 링크 클릭

---

## 설치 방법 (개발용)

(추후 배포 예정)

1. 저장소 클론
   ```bash
   git clone https://github.com/your-id/moa-extension.git
   
2. 크롬에서 아래 주소로 이동
   ```
   chrome://extensions
3. 우측 상단 개발자 모드 활성화
4. 압축해제된 확장 프로그램 로드 클릭
5. 프로젝트 폴더 선택
   ```
   dist/폴더 선택
---

## 기술 스택
### Frontend
- `React` : 컴포넌트 기반 UI 구성
- `TypeScript` : 스크랩 및 프로젝트 데이터의 타입 안정성 확보
- `CSS` : 확장프로그램 UI 스타일링

### Chrome Extension
- `Manifest V3` : 최신 크롬 확장 규격 사용
- `Content Script` : AI 페이지의 DOM 접근 및 드래그 이벤트로 텍스트 추출
- `Chrome Storage API` : 스크랩 데이터 로컬 저장

### Build Tool
- `Vite` : 빠른 개발 환경과 번들링 지원

## 프로젝트 구조
  ```
  src/
   ├─ App/                메인 애플리케이션 로직
   ├─ Pages/              페이지 단위 컴포넌트
   ├─ components/         공통 UI 컴포넌트
   ├─ utils/              유틸리티 함수
   ├─ contentScript.ts    AI 페이지 스크랩 처리
   ├─ api/                백엔드 서버 API 통신
   ├─ types/              draft, scrap, common 등 타입 정리 
   └─ background.ts       확장프로그램 백그라운드
```

