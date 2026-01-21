import GuideBox from "../GuideBox/Guidebox";
import "./Empty.css";

export default function Empty() {
  return (
    <div className="empty">
      <GuideBox />
      <div className="empty-icon">
        <div className="face">
          <span className="eye" />
          <span className="eye" />
          <span className="mouth" />
        </div>
      </div>

      <div className="empty-title">비어있음</div>
      <div className="empty-desc">
        스크랩 할 텍스트를 드래그해보세요
      </div>
    </div>
  );
}
