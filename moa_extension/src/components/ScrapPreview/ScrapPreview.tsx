import "./ScrapPreview.css";
import type { Scrap } from "../../types/scrap.domain";
interface ScrapPreviewProps {
  scraps: Scrap[];
}


export default function ScrapPreview({ scraps }: ScrapPreviewProps) {
  const mergedText = scraps
    .map((scrap) => scrap.texts)
    .join("\n\n");

  return (
    <div className="scrap-preview">
      <pre className="scrap-text">
        {mergedText}
      </pre>
    </div>
  );
}

