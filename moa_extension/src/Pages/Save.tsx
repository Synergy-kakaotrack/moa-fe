import "./Save.css"
import ScrapPreview from "../../src/components/ScrapPreview/ScrapPreview";
import type { Scrap } from "../types/scrap.domain";

interface SaveProps {
  scraps: Scrap[];
  title: string;
  memo?: string;
  projectName: string;
  workStep: string;
  onBack: () => void;
  onSave: () => void;
}

export default function Save({
    scraps,
    title,
    memo,
    projectName,
    workStep,
  }: SaveProps){
  return (
    <div className="save-page">
      <div className="field">
        <div>
          <label className="label">프로젝트</label>
        </div>
          <div className="display-box">{projectName}</div>
      </div>
    
      <div className="field">
        <div>
          <label className="label">작업 단계</label>
        </div>
        <div className="display-box">{workStep}</div>
      </div>
    
      <div className="field">
        <div>
          <label className="label">제목</label>
        </div>
        <div className="display-box">{title}</div>
      </div>
    
      <div className="memo">
        <div>
          <label className="label">메모</label>
        </div>
        <div className="display-box-memo">{memo || ""}</div>
      </div>
    
      <div className="field">
        <label className="label">미리보기</label>
        <div className="preview-box"><ScrapPreview scraps={scraps}/></div>
      </div>
    </div>
  );
}
