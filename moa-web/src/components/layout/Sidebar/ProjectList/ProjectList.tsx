// src/components/layout/Sidebar/ProjectList/ProjectList.tsx
"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/api/projects";
import type { Project } from "@/domain/project";
import ProjectItem from "./ProjectItem";
import styles from "./ProjectList.module.css";

export default function ProjectList() {
  // NOTE: 사이드바에 표시할 프로젝트 목록
  const [projects, setProjects] = useState<Project[]>([]);
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);
  // NOTE: 에러 표시용(필요 없으면 제거 가능)
  const [errorMessage, setErrorMessage] = useState<string>("");

  // NOTE: 최초 로딩 시 프로젝트 목록 조회
  useEffect(() => {
    let isMounted = true;

    getProjects()
      .then((res) => {
        if (!isMounted) return;
        setProjects(res.items);
      })
      .catch(() => {
        if (!isMounted) return;
        setErrorMessage("프로젝트 목록을 불러오지 못했습니다.");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  const handleProjectClick = (id: number) => {
    setOpenProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.projectList}>
      {projects.map((project) => (
        <ProjectItem
          key={project.projectId}
          project={project}
          isOpen={openProjectId === project.projectId}
          onProjectClick={handleProjectClick}
        />
      ))}
    </div>
  );
}
