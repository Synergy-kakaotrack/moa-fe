import "./ProjectSetting.css"
import ScrapPreview from "../../components/ScrapPreview/ScrapPreview";
import type { Scrap } from "../../types/scrap.domain";
import type { Project } from "../../types/project";
import { createProject } from "../../api/projectApi";

import { useState } from "react";


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
                <span className="ai-badge">AI 추천</span>
              )}
            </label>
          </div>

          <div>
            <select
              className="project-select"
              value={selectedProjectId ?? ""}
              onChange={(e) => {
                const id = Number(e.target.value);
                if(!id) return;

                const project = projects.find(p => p.projectId === id);
                if (!project) return;

                setSelectedProjectId(id);
                setProjectName(project.name);
              }}
            >
              <option value="" disabled>
                프로젝트 선택
              </option>

              {projects.map((project) => (
                <option key={project.projectId} value={project.projectId}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              className="add-project"
              onClick={() => setIsCreatingProject(true)}
            >
              + 프로젝트 추가
            </button>
          </div>
        </div>
      )}
      {isCreatingProject && (
        <div className="create-project-box">
          <div>
            <label className="label">생성할 프로젝트명</label>
            <div>
              <input
                type="text"
                placeholder="프로젝트명을 입력하세요"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label">프로젝트 설명</label>
            <div>
              <input
                type="text"
                placeholder="프로젝트 설명을 입력하세요"
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="create-project-actions">
            <button
              onClick={() => setIsCreatingProject(false)}
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
              <span className="ai-badge">AI 추천</span>
            )}
            </label>

          </div>
          <div>
            <select
              value={workStep}
              onChange={(e) => setWorkStep(e.target.value)}
            >
              <option value="기획">기획</option>
              <option value="조사&분석">조사&분석</option>
              <option value="설계">설계</option>
              <option value="구현">구현</option>
              <option value="테스트">테스트</option>
              <option value="기타">기타</option>
            </select>
          </div>

        </div>

        <div className="title">
          <div>
            <label className="label">제목 (필수)
              {title === recTitle && (
                <span className="ai-badge">AI 추천</span>
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
              className={isTitleError ? "error" : ""}
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
            />
          </div>
        </div>

        <div>
          <label className="label">미리보기</label>
          <div className="preview-box">
              <ScrapPreview scraps={scraps}/>
          </div>
        </div>
    </div>
  );
}
