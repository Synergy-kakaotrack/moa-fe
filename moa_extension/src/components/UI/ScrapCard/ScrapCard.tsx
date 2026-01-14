interface Scrap {
  id: number;
  title: string;
  content: string;
  source: string; // ChatGPT / Claude / Gemini
  createdAt: number;
}


interface ScrapCardProps {
  scrap: Scrap;
  onDelete: (id: number) => void;
}

export default function ScrapCard({ scrap, onDelete }: ScrapCardProps) {
  return (
    <div className="scrap-card">
      <div className="scrap-header">
        <span className="scrap-title">{scrap.title}</span>
        <button onClick={() => onDelete(scrap.id)}>✕</button>
      </div>
      <pre className="scrap-content">{scrap.content}</pre>
    </div>
  );
}
