import type { Scrap } from "../../../types/scrap";

interface ScrapCardProps {
  scrap: Scrap;
  index: number;
  onDelete: (id: number) => void;
}

export default function ScrapCard({ scrap, index, onDelete }: ScrapCardProps) {
  return (
    <div className="scrap-card">
      <div className="scrap-header">
        {/* 제목 대신 출처 또는 번호 */}
        <span className="scrap-title">
          {index}
        </span>
        <button onClick={() => onDelete(scrap.id)}>✕</button>
      </div>
      <pre className="scrap-content">{scrap.texts}</pre>
    </div>
  );
}
