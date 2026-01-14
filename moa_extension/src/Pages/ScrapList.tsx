import ScrapCard from "../components/UI/ScrapCard/ScrapCard";

export interface Scrap {
  id: number;
  title: string;
  content: string;
  source: string; // ChatGPT | Claude | Gemini
  createdAt: number;
}

interface ScrapListProps {
  scraps: Scrap[];
  setScraps: React.Dispatch<React.SetStateAction<Scrap[]>>;
}

export default function ScrapList({ scraps, setScraps }: ScrapListProps) {
  // 스크랩 삭제
  const handleDelete = (id: number) => {
    setScraps((prev) => prev.filter((scrap) => scrap.id !== id));
  };

  return (
    <div style={{ padding: "12px" }}>
      {/* 스크랩 리스트 */}
      {scraps.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999999", padding: "40px 0" }}>
          스크랩된 내용이 없습니다
        </div>
      ) : (
        scraps.map((scrap) => (
          <ScrapCard
            key={scrap.id}
            scrap={scrap}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
