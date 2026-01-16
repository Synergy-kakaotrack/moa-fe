import { useLayoutEffect, useRef, useState } from "react";
import type { Scrap } from "../../../types/scrap";


interface ScrapCardProps {
  scrap: Scrap;
  index: number;
  onDelete: (id: number) => void;
}

const COLLAPSED_HEIGHT = 102;

export default function ScrapCard({ scrap, index, onDelete }: ScrapCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;

    if (!el) return;

    const preveHeight = el.style.height;

    el.style.height = "auto";
    const realHeight = el.scrollHeight;

    el.style.height = preveHeight

    const hasOverflow = realHeight > COLLAPSED_HEIGHT;

    // 값이 바뀔 때만 state 변경 (StrictMode 안전)
    setShowToggle(prev =>
      prev === hasOverflow ? prev : hasOverflow
    );
  }, [scrap.texts]);

  return (
    <div className="scrap-card">
      {/* 헤더 */}
      <div className="scrap-header">
        <span>{index}</span>
        <button onClick={() => onDelete(scrap.id)}>✕</button>
      </div>

      {/* 텍스트 영역 (항상 최소 높이 유지) */}
      <div
        ref={textRef}
        className="scrap-text"
        style={{
          height: isOpen ? "auto" : `${COLLAPSED_HEIGHT}px`,
          overflow: "hidden",
        }}
      >
        {scrap.texts.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* 넘칠 때만 더보기/접기 */}
      {showToggle && (
        <div className="scrap-footer">
          <button
            className="scrap-toggle"
            onClick={() => setIsOpen(v => !v)}
          >
            {isOpen ? "접기 ▲" : "더보기 ▼"}
          </button>
        </div>
      )}
    </div>
  );
}
