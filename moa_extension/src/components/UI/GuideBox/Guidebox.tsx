import "./GuideBox.css";

// 설명 글 (데이터)
const GUIDE_ITEMS = [
  "GPT, Claude, Gemini에서 생성된 텍스트를 스크랩 단위로 스크랩합니다.",
  "스크랩한 모든 내용은 한곳에 저장됩니다.",
  "대시보드에서 AI 프로젝트별로 확인할 수 있습니다.",
];

// 설명 박스 컴포넌트
export default function GuideBox() {
  return (
    <div className="guide-box">
      <div className="guide-numberstexts">
        {GUIDE_ITEMS.map((text, index) => (
          <div key={index} className="guide-item">
            <div className="guide-number text-badge-xs">{index + 1}</div>
            <div className="guide-text text-guide-sm">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
