import "./Notice.css";
const SERVICES = [
  { name: "ChatGPT", url: "https://chat.openai.com" },
  { name: "Claude", url: "https://claude.ai" },
  { name: "Gemini", url: "https://gemini.google.com" },
];


export default function ScrapGuide() {
  return (
    <div className="notice-description">
      {SERVICES.map((service, index) => (
          <span key={service.name}>
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="notice-link text-action-xs"
            >
              {service.name}
            </a>
            {index < SERVICES.length - 1 && ", "}
          </span>
        ))}
        에서 스크랩 할 텍스트를 드래그하세요
    </div>
  );
}
