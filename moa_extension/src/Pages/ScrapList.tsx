import Empty from "../components/UI/Empty/Empty";
import ScrapCard from "../components/UI/ScrapCard/ScrapCard";
import type { Scrap } from "../types/scrap.domain";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

interface ScrapListProps {
  scraps: Scrap[];
  setScraps: React.Dispatch<React.SetStateAction<Scrap[]>>;
  highlightScrapId: number | null;
}

export default function ScrapList({ scraps, setScraps, highlightScrapId }: ScrapListProps) {

  // 드래그 끝났을 때 순서 변경
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setScraps((prev) => {
      const oldIndex = prev.findIndex((s) => s.id === active.id);
      const newIndex = prev.findIndex((s) => s.id === over.id);

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // 스크랩 삭제
  const handleDelete = (id: number) => {
    setScraps((prev) => prev.filter((scrap) => scrap.id !== id));
  };

  return (
    <div 
      style={{
        padding: "12px",
        borderRadius: "5px",
        border: "1px solid rgba(0, 0, 0, 0.20)",
        margin: "8px",
        height: "66.5vh",
        overflowY: "auto",
      }}
    >
      {scraps.length === 0 ? (
        <Empty />
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={scraps.map((scrap) => scrap.id)}
            strategy={verticalListSortingStrategy}
          >
            {scraps.map((scrap, index) => (
              <ScrapCard
                key={scrap.id}
                scrap={scrap}
                index={index + 1}
                onDelete={handleDelete}
                highlighted={scrap.id === highlightScrapId}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );

}
