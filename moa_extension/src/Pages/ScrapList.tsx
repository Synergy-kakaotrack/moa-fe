import Empty from "../components/UI/Empty/Empty";
import ScrapCard from "../components/UI/ScrapCard/ScrapCard";
import type { Scrap } from "../types/scrap.domain";

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
    <div 
      style={{
        padding: "12px",
      }}
    >
      {/* 스크랩 리스트 */}
      {scraps.length === 0 ? (
          <Empty />
      ) : (
        scraps.map((scrap, index) => (
          <ScrapCard
            key={scrap.id}
            scrap={scrap}
            index={index + 1}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
