import "./ProjectSetting.css"
import ScrapPreview from "../../components/ScrapPreview/ScrapPreview";
import type { Scrap } from "../../types/scrap.domain";

import { useState } from "react";


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
    setMemo
}: ProjectSettingProps){

  //제목 입력 확인
  const [titleTouched, setTitleTouched] = useState(false);
  const isTitleError = titleTouched && title.trim() === "";

  //프로젝트 생성
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  return (
    <div className="project-setting">
      {!isCreatingProject && (
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
                setProjectName(newProjectName); // 새 프로젝트 선택
                setIsCreatingProject(false);   //다시 토글 화면으로
                setNewProjectName("");
                setNewProjectDesc("");
              }}
            >
              프로젝트 생성
            </button>
          </div>
        </div>
      )}


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
              onBlur={() => setTitleTouched(true)}
              className={isTitleError ? "error" : ""}
            />
            {isTitleError && (
              <p className="error-text">※ 제목은 필수입니다.</p>
            )}
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
