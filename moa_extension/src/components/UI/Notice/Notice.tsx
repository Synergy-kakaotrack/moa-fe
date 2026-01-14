//화면 상단 Notice 컴포넌트 

import "./Notice.css";

// 스크랩 안내에 사용될 서비스 링크 목록
const SERVICES = [
  { name: "ChatGPT", url: "https://chat.openai.com" },
  { name: "Claude", url: "https://claude.ai" },
  { name: "Gemini", url: "https://gemini.google.com" },
];

interface NoticeProps {
  scrapCount: number;
}

// 화면 상단 Notice 컴포넌트
export default function Notice({ scrapCount }: NoticeProps) {
  return (
    <div className="notice">
      <div className="notice-header">
        <span className="notice-icon">📁</span>
        <span className="notice-title">
          스크랩 ({scrapCount})
        </span>
      </div>

      <div className="notice-description">
        {SERVICES.map((service, index) => (
          <span key={service.name}>
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="notice-link"
            >
              {service.name}
            </a>
            {index < SERVICES.length - 1 && ", "}
          </span>
        ))}
        에서 스크랩 할 텍스트를 드래그하세요
      </div>
    </div>
  );
}
