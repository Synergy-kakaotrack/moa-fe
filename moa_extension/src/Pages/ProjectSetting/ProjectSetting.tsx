import Bottom from "../../components/Layout/Bottom/Bottom";
import ScrapPreview from "../../components/ScrapPreview/ScrapPreview";
import type { Scrap } from "../../types/scrap";



interface ProjectSettingProps {
  scraps: Scrap[];
  projectName: string;
  workStep: string;
  setProjectName: (value: string) => void;
  setWorkStep: (value: string) => void;
  title: string;
  memo: string;
  setTitle: (value: string) => void;
  setMemo: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function ProjectSetting({
    scraps,
    projectName,
    workStep,
    title,
    memo,
    setProjectName,
    setWorkStep,
    setTitle,
    setMemo,
    onBack,
    onNext
}: ProjectSettingProps){
    
    const handleBack = () => {
    // 여기서 데이터 정리, validation 가능
    onBack();
  };

  const handleNext = () => {
    // 제목 입력 체크, 데이터 저장 등
    onNext();
  };

  return (
    <div className="project-setting">
        <div className="project">
          <div>
            <label className="label">프로젝트</label>
          </div>
          
          <div>
            <select
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            >
              <option value="Capstone Design">Capstone Design</option>
              <option value="Side Project">Side Project</option>
              <option value="Personal Study">Personal Study</option>
            </select>
          </div>

          <div>
          <button className="add-project">+ 프로젝트 추가</button>
          </div>

        </div>

        <div className="step">
          <div>
            <label className="label">작업 단계</label>
          </div>
          <div>
            <select
              value={workStep}
              onChange={(e) => setWorkStep(e.target.value)}
            >
              <option value="기획">기획</option>
              <option value="설계">설계</option>
              <option value="구현">구현</option>
            </select>
          </div>

        </div>

        <div className="title">
          <div>
            <label className="label">제목 (필수)</label>
          </div>

          <div>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

        </div>

        <div className="memo">
          <div>
            <label className="label">메모 (선택)</label>
          </div>
          <div>
            <textarea
              placeholder="이 스크랩에 대한 설명을 추가해 보세요"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="label">미리보기</label>
          <div className="preview-box">
              <ScrapPreview scraps={scraps}/>
          </div>
        </div>

      <Bottom 
        step="PROJECT_SETTING"
        onBack={handleBack}
        onAction={handleNext}/>
    </div>
  );
}
