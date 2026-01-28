import "./ProjectSetting.css"
import ScrapPreview from "../../components/ScrapPreview/ScrapPreview";
import type { Scrap } from "../../types/scrap.domain";
import type { Project } from "../../types/project";
import { createProject } from "../../api/projectApi";

import { useState } from "react";
import SelectIcon from "../../components/icons/selectIcon";

interface ProjectSettingProps {
  scraps: Scrap[];
  projects: Project[];
  fetchProjects: () => Promise<void>;

  selectedProjectId: number | null;
  setSelectedProjectId: (id:number | null) => void;
  recProjectId: number | null;

  workStep: string;
  setWorkStep: (value: string) => void;
  recStage: string | null;

  title: string;
  setTitle: (value: string) => void;
  recTitle: string | null;

  memo: string;
  setMemo: (value: string) => void;

  setProjectName: (value: string) => void;

  onBack: () => void;
  onNext: () => void;
  
}

export default function ProjectSetting({
    scraps,
    projects,
    workStep,
    selectedProjectId,
    setSelectedProjectId,
    recProjectId,
    recStage,
    title,
    memo,
    setProjectName,
    setWorkStep,
    setTitle,
    recTitle,
    setMemo,
    fetchProjects,
}: ProjectSettingProps){

  //제목 입력 확인
  const [titleTouched, setTitleTouched] = useState(false);
  const safeTrim = (v: unknown): string =>
    typeof v === "string" ? v.trim() : "";
  const isTitleError = titleTouched && safeTrim(title) === "";

  //프로젝트 생성
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  //소제목 글자수 제한 
  const MAX_TITLE_LENGTH = 25;

  const [projectOpen, setProjectOpen] = useState(false);
  const [stepOpen, setStepOpen] = useState(false);

  const steps = ["기획", "조사&분석", "설계", "구현", "테스트", "기타"];

  const handleCreateProject = async () => {
    try{
      // 1. 입력값 그대로 백엔드로 전달
      await createProject({
        name: newProjectName,
        description: newProjectDesc,
      });

      // 2. UI는 닫기만 함 (그 외 아무 것도 안 함)
      await fetchProjects(); //목록 다시 조회 

      setIsCreatingProject(false);
      setNewProjectName("");
      setNewProjectDesc("");
    }catch(e){
      console.error("프로젝트 생성 에러:", e);
      alert("프로젝트 생성 실패");
    }
    
  };

  return (
    <div className="project-setting">
      {!isCreatingProject && (
        <div className="project">
          <div>
            <label className="label">프로젝트
              {selectedProjectId === recProjectId && (
                <div className="ai-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M3.26862 0.254539C3.40556 -0.0493365 3.82733 -0.0641305 3.99263 0.208957L4.01654 0.254539L4.4387 1.19215C4.80734 2.01058 5.42038 2.69844 6.19585 3.16374L6.32631 3.23931L7.07585 3.65514C7.13543 3.68806 7.18572 3.73518 7.22213 3.79219C7.25855 3.8492 7.27992 3.9143 7.28431 3.98155C7.2887 4.04881 7.27597 4.11607 7.24727 4.17723C7.21857 4.23838 7.17482 4.29147 7.12001 4.33166L7.07625 4.35965L6.32631 4.77548C5.5352 5.21464 4.89883 5.88172 4.50231 6.6875L4.4387 6.82264L4.01654 7.76026C3.87959 8.06413 3.45783 8.07893 3.29253 7.80584L3.26862 7.76026L2.84645 6.82264C2.47782 6.00421 1.86477 5.31635 1.0893 4.85105L0.958845 4.77548L0.209312 4.35965C0.149726 4.32673 0.0994349 4.27962 0.0630232 4.22261C0.0266115 4.16559 0.00523665 4.10049 0.000846561 4.03324C-0.00354353 3.96599 0.00919074 3.89872 0.0378889 3.83757C0.0665871 3.77642 0.110337 3.72332 0.16515 3.68313L0.208907 3.65514L0.958845 3.23931C1.74995 2.80015 2.38633 2.13307 2.78284 1.3273L2.84645 1.19215L3.26862 0.254539ZM6.97334 0.0574196C7.1744 0.508306 7.51737 0.883229 7.95138 1.12658C8.01621 1.16257 8.01621 1.25453 7.95138 1.29051C7.51716 1.5339 7.17403 1.90898 6.97294 2.36007C6.96524 2.37705 6.95273 2.39147 6.93691 2.40159C6.9211 2.41171 6.90265 2.41709 6.8838 2.41709C6.86495 2.41709 6.84651 2.41171 6.83069 2.40159C6.81488 2.39147 6.80236 2.37705 6.79467 2.36007C6.5935 1.90913 6.25038 1.5342 5.81622 1.29091C5.80157 1.28266 5.78939 1.27074 5.78092 1.25634C5.77244 1.24195 5.76798 1.22559 5.76798 1.20895C5.76798 1.1923 5.77244 1.17595 5.78092 1.16155C5.78939 1.14716 5.80157 1.13523 5.81622 1.12698C6.25051 0.883489 6.59365 0.508262 6.79467 0.0570197C6.80236 0.0400392 6.81488 0.0256198 6.83069 0.0155019C6.84651 0.00538391 6.86495 0 6.8838 0C6.90265 0 6.9211 0.00538391 6.93691 0.0155019C6.95273 0.0256198 6.96524 0.0400392 6.97294 0.0570197L6.97334 0.0574196Z" fill="black"/>
                  </svg>
                  <span>AI 추천</span>
                </div>
              )}
            </label>
          </div>

          <div className={`select-wrap ${projectOpen ? "open" : ""}`}>
            <button
              type="button"
              className="project-select"
              onClick={() => {
                setProjectOpen(v => !v);
                setStepOpen(false); // ⭐ 다른 거 닫기
              }}
            >
              <span>
                {selectedProjectId
                  ? projects.find(p => p.projectId === selectedProjectId)?.name
                  : "프로젝트 선택"}
              </span>

              <SelectIcon />
            </button>

            {projectOpen && (
              <ul className="project-options">
                {projects.map(project => (
                  <li
                    key={project.projectId}
                    className={
                      project.projectId === selectedProjectId ? "selected" : ""
                    }
                    onClick={() => {
                      setSelectedProjectId(project.projectId);
                      setProjectName(project.name);
                      setProjectOpen(false);
                    }}
                  >
                    {project.name}
                  </li>
                ))}
              </ul>
            )}
          </div>


          <div>
            <button
              className="add-project"
              onClick={() => {
                setNewProjectName("");
                setNewProjectDesc("");
                setIsCreatingProject(true);
              }}
            >
              + 프로젝트 추가
            </button>
          </div>
        </div>
      )}
      {isCreatingProject && (
        <div className="create-project-box">
          <label className="label">프로젝트</label>
          <div>
            <div>
              <input
                type="text"
                placeholder="생성할 프로젝트명을 입력하세요"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="project-name"
              />
            </div>
          </div>

          <div>
            <div>
              <textarea
                placeholder="생성할 프로젝트를 간단하게 설명해주세요"
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                className="project-description"
              />
            </div>
          </div>

          <div className="create-project-actions">
            <button
              onClick={() => {
                setNewProjectName("");
                setNewProjectDesc("");
                setIsCreatingProject(false);
              }}
              className="create-project-button"
            >
              취소
            </button>

            <button
              className="primary"
              onClick={() => {
                handleCreateProject();
              }}
            >
              프로젝트 생성
            </button>
          </div>
        </div>
      )}


        <div className="step">
          <div>
            <label className="label">작업 단계
              {workStep === recStage && (
              <div className="ai-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M3.26862 0.254539C3.40556 -0.0493365 3.82733 -0.0641305 3.99263 0.208957L4.01654 0.254539L4.4387 1.19215C4.80734 2.01058 5.42038 2.69844 6.19585 3.16374L6.32631 3.23931L7.07585 3.65514C7.13543 3.68806 7.18572 3.73518 7.22213 3.79219C7.25855 3.8492 7.27992 3.9143 7.28431 3.98155C7.2887 4.04881 7.27597 4.11607 7.24727 4.17723C7.21857 4.23838 7.17482 4.29147 7.12001 4.33166L7.07625 4.35965L6.32631 4.77548C5.5352 5.21464 4.89883 5.88172 4.50231 6.6875L4.4387 6.82264L4.01654 7.76026C3.87959 8.06413 3.45783 8.07893 3.29253 7.80584L3.26862 7.76026L2.84645 6.82264C2.47782 6.00421 1.86477 5.31635 1.0893 4.85105L0.958845 4.77548L0.209312 4.35965C0.149726 4.32673 0.0994349 4.27962 0.0630232 4.22261C0.0266115 4.16559 0.00523665 4.10049 0.000846561 4.03324C-0.00354353 3.96599 0.00919074 3.89872 0.0378889 3.83757C0.0665871 3.77642 0.110337 3.72332 0.16515 3.68313L0.208907 3.65514L0.958845 3.23931C1.74995 2.80015 2.38633 2.13307 2.78284 1.3273L2.84645 1.19215L3.26862 0.254539ZM6.97334 0.0574196C7.1744 0.508306 7.51737 0.883229 7.95138 1.12658C8.01621 1.16257 8.01621 1.25453 7.95138 1.29051C7.51716 1.5339 7.17403 1.90898 6.97294 2.36007C6.96524 2.37705 6.95273 2.39147 6.93691 2.40159C6.9211 2.41171 6.90265 2.41709 6.8838 2.41709C6.86495 2.41709 6.84651 2.41171 6.83069 2.40159C6.81488 2.39147 6.80236 2.37705 6.79467 2.36007C6.5935 1.90913 6.25038 1.5342 5.81622 1.29091C5.80157 1.28266 5.78939 1.27074 5.78092 1.25634C5.77244 1.24195 5.76798 1.22559 5.76798 1.20895C5.76798 1.1923 5.77244 1.17595 5.78092 1.16155C5.78939 1.14716 5.80157 1.13523 5.81622 1.12698C6.25051 0.883489 6.59365 0.508262 6.79467 0.0570197C6.80236 0.0400392 6.81488 0.0256198 6.83069 0.0155019C6.84651 0.00538391 6.86495 0 6.8838 0C6.90265 0 6.9211 0.00538391 6.93691 0.0155019C6.95273 0.0256198 6.96524 0.0400392 6.97294 0.0570197L6.97334 0.0574196Z" fill="black"/>
                </svg>
                <span>AI 추천</span>
              </div>
            )}
            </label>

          </div>
          <div className={`select-wrap ${stepOpen ? "open" : ""}`}>
            {/* 선택된 값 */}
            <button
              type="button"
              className="step-select"
              onClick={() => {
                setStepOpen(v => !v);
                setProjectOpen(false); // ⭐ 다른 거 닫기
              }}
            >
              <span>{workStep}</span>
              <SelectIcon />
            </button>

            {/* 옵션 리스트 */}
            {stepOpen && (
              <ul className="step-options">
                {steps.map(step => (
                  <li
                    key={step}
                    className={step === workStep ? "selected" : ""}
                    onClick={() => {
                      setWorkStep(step);
                      setStepOpen(false);
                    }}
                  >
                    {step}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        <div className="title">
          <div>
            <label className="label">제목 (필수)
              {title === recTitle && (
                <div className="ai-badge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M3.26862 0.254539C3.40556 -0.0493365 3.82733 -0.0641305 3.99263 0.208957L4.01654 0.254539L4.4387 1.19215C4.80734 2.01058 5.42038 2.69844 6.19585 3.16374L6.32631 3.23931L7.07585 3.65514C7.13543 3.68806 7.18572 3.73518 7.22213 3.79219C7.25855 3.8492 7.27992 3.9143 7.28431 3.98155C7.2887 4.04881 7.27597 4.11607 7.24727 4.17723C7.21857 4.23838 7.17482 4.29147 7.12001 4.33166L7.07625 4.35965L6.32631 4.77548C5.5352 5.21464 4.89883 5.88172 4.50231 6.6875L4.4387 6.82264L4.01654 7.76026C3.87959 8.06413 3.45783 8.07893 3.29253 7.80584L3.26862 7.76026L2.84645 6.82264C2.47782 6.00421 1.86477 5.31635 1.0893 4.85105L0.958845 4.77548L0.209312 4.35965C0.149726 4.32673 0.0994349 4.27962 0.0630232 4.22261C0.0266115 4.16559 0.00523665 4.10049 0.000846561 4.03324C-0.00354353 3.96599 0.00919074 3.89872 0.0378889 3.83757C0.0665871 3.77642 0.110337 3.72332 0.16515 3.68313L0.208907 3.65514L0.958845 3.23931C1.74995 2.80015 2.38633 2.13307 2.78284 1.3273L2.84645 1.19215L3.26862 0.254539ZM6.97334 0.0574196C7.1744 0.508306 7.51737 0.883229 7.95138 1.12658C8.01621 1.16257 8.01621 1.25453 7.95138 1.29051C7.51716 1.5339 7.17403 1.90898 6.97294 2.36007C6.96524 2.37705 6.95273 2.39147 6.93691 2.40159C6.9211 2.41171 6.90265 2.41709 6.8838 2.41709C6.86495 2.41709 6.84651 2.41171 6.83069 2.40159C6.81488 2.39147 6.80236 2.37705 6.79467 2.36007C6.5935 1.90913 6.25038 1.5342 5.81622 1.29091C5.80157 1.28266 5.78939 1.27074 5.78092 1.25634C5.77244 1.24195 5.76798 1.22559 5.76798 1.20895C5.76798 1.1923 5.77244 1.17595 5.78092 1.16155C5.78939 1.14716 5.80157 1.13523 5.81622 1.12698C6.25051 0.883489 6.59365 0.508262 6.79467 0.0570197C6.80236 0.0400392 6.81488 0.0256198 6.83069 0.0155019C6.84651 0.00538391 6.86495 0 6.8838 0C6.90265 0 6.9211 0.00538391 6.93691 0.0155019C6.95273 0.0256198 6.96524 0.0400392 6.97294 0.0570197L6.97334 0.0574196Z" fill="black"/>
                  </svg>
                  <span>AI 추천</span>
                </div>
              )}
            </label>
          </div>

          <div>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => {
                const value=e.target.value;

                // 글자 수 제한
                if (value.length <= MAX_TITLE_LENGTH) {
                  setTitle(value);
                }
              }}
              onBlur={() => setTitleTouched(true)}
              className={isTitleError ? "error" : "title-input"}
            />
            {isTitleError && (
              <p className="error-text">※ 제목은 필수입니다.</p>
            )}
            {/*글자수 표시 n/25 */}
            <p className="length-text">
              {title.length} / {MAX_TITLE_LENGTH}
            </p>
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
              className="memo-description"
            />
          </div>
        </div>

        <div className="preview">
          <label className="label">미리보기</label>
          <div className="preview-box">
              <ScrapPreview scraps={scraps}/>
          </div>
        </div>
    </div>
  );
}
