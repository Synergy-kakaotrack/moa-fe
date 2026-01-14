import Bottom from "../../components/Layout/Bottom/Bottom";

interface ProjectSettingProps {
  onBack: () => void;
  onNext: () => void;
}

export default function ProjectSetting({
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
        
      <section className="form-section">
        {/* 프로젝트 */}
        <label className="label">프로젝트</label>
        <select>
          <option>Capstone Design</option>
        </select>
        <button className="add-project">+ 프로젝트 추가</button>

        {/* 작업 단계 */}
        <label className="label">작업 단계</label>
        <select>
          <option>기획</option>
        </select>

        {/* 제목 */}
        <label className="label">제목 (필수)</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
        />

        {/* 메모 */}
        <label className="label">메모 (선택)</label>
        <textarea
          placeholder="이 스크랩에 대한 설명을 추가해 보세요"
        />

        {/* 미리보기 */}
        <label className="label">미리보기</label>
        <div className="preview-box">
          {/* 나중에 ScrapCard map으로 넣을 자리 */}
          스크랩 미리보기 영역
        </div>
      </section>

      <Bottom 
        step="PROJECT_SETTING"
        onBack={handleBack}
        onAction={handleNext}/>
    </div>
  );
}
