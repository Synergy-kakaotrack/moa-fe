import "./SavedNotice.css";

interface SavedNoticeProps {
  linkUrl: string;
}

export default function SavedNotice({ linkUrl }: SavedNoticeProps) {
  return (
    <div className="saved-notice">
      <div className="saved-notice-content">
        <div className="saved-notice-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM6.4 12L2.4 8L3.528 6.872L6.4 9.736L12.472 3.664L13.6 4.8L6.4 12Z" fill="#5b5b00"/>
          </svg>
        </div>
        <div className="saved-notice-text">
          <span className="saved-notice-title">스크랩이 저장되었습니다!</span>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="saved-notice-link"
          >
            최근에 저장된 스크랩 보러가기
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
