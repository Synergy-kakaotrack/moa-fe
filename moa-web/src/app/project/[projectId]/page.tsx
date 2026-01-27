// src/app/project/[projectId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { projectsApi } from "@/api/projects";
import type { Project } from "@/domain/project";

export default function ProjectPage() {
  const params = useParams<{ projectId: string }>();
  // NOTE: URL 파라미터에서 projectId 추출
  const projectId = Number(params.projectId);

  // NOTE: 라우팅 이동(삭제 후 목록으로 이동 등)
  const router = useRouter();

  // NOTE: 현재 프로젝트(상세 화면에서 보여줄 대상)
  const [project, setProject] = useState<Project | null>(null);

  // NOTE: 에러 메시지 표출용
  const [errorMessage, setErrorMessage] = useState<string>("");

  // NOTE: 목록을 다시 불러와 현재 projectId에 해당하는 프로젝트를 다시 세팅
  const refreshProject = async () => {
    const res = await projectsApi.getProjects(); // NOTE: { items: Project[] } 반환 구조
    const found = res.items.find((p) => p.projectId === projectId) ?? null;
    setProject(found);
  };

  // NOTE: 최초 진입 시 프로젝트 목록을 불러오고 현재 projectId로 찾기
  useEffect(() => {
    let isMounted = true;

    projectsApi
      .getProjects()
      .then((res) => {
        if (!isMounted) return;

        const found = res.items.find((p) => p.projectId === projectId) ?? null;
        setProject(found);
      })
      .catch(() => {
        if (!isMounted) return;
        setErrorMessage("프로젝트 정보를 불러오지 못했습니다.");
      });

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  // NOTE: 프로젝트 수정(PATCH) - 예시로 이름을 고정 변경
  const handleUpdateProject = async () => {
    if (!project) return;

    try {
      // TODO: 실제 서비스에서는 입력값(인풋/모달)에서 name/description을 받아서 전송
      await projectsApi.updateProject(project.projectId, {
        name: "새 프로젝트 이름",
        // description: "새 설명",
      });

      // NOTE: 변경 후 최신 데이터로 동기화
      await refreshProject();
    } catch {
      setErrorMessage("프로젝트 수정에 실패했습니다.");
    }
  };

  // NOTE: 프로젝트 삭제(DELETE)
  const handleDeleteProject = async () => {
    if (!project) return;

    try {
      await projectsApi.deleteProject(project.projectId);

      // TODO: 프로젝트 목록 페이지 경로에 맞게 수정
      router.push("/project"); // 또는 "/projects"
    } catch {
      setErrorMessage("프로젝트 삭제에 실패했습니다.");
    }
  };

  // NOTE: 에러 표시
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // NOTE: 로딩 표시(프로젝트를 아직 못 찾았거나 로딩 중)
  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.page}>
      {/* ================= Header ================= */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.projectTitle}>{project?.name}</h1>
          {project?.description && (
            <p className={styles.projectDescription}>
              {project.description}
            </p>
          )}
        </div>

        {/* 헤더 화살표: 항상 렌더링 + CSS로 숨김 */}
        <div
          className={clsx(
            styles.headerNav,
            collapsed && styles.hidden
          )}
        >
          <button
            disabled={!showPrev}
            onClick={() => setPageIndex((p) => p - 1)}
          >
            ←
          </button>

          <span className={styles.headerDivider}>|</span>

          <button
            disabled={!showNext}
            onClick={() => setPageIndex((p) => p + 1)}
          >
            →
          </button>
        </div>
      </header>

      {/* ================= Kanban Board ================= */}
      <section
        className={clsx(
          styles.boardWrapper,
          collapsed && styles.collapsed
        )}
      >
        {/* ⬅ 보드 이전 화살표 (DOM 유지) */}
        <button
          className={clsx(
            styles.arrow,
            styles.prev,
            (!collapsed || !showPrev) && styles.hidden
          )}
          onClick={() => setPageIndex((p) => p - 1)}
        >
          ←
        </button>

        <div className={styles.board}>
          {currentStages.map((stage) => {
            const stageScraps = scraps.filter(
              (scrap) => scrap.stageKey === stage.key
            );

            return (
              <div
                key={stage.key}
                className={clsx(styles.column, stageClassMap[stage.key])}
              >
                <Link
                  href={`/project/${projectId}/${stage.key}`}
                  className={styles.columnHeader}
                >
                  {stage.name}
                </Link>

                <div className={styles.cardList}>
                  {stageScraps.map((scrap) => (
                    <ScrapCard
                      key={scrap.scrapId}
                      scrap={scrap}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ➡ 보드 다음 화살표 (DOM 유지) */}
        <button
          className={clsx(
            styles.arrow,
            styles.next,
            (!collapsed || !showNext) && styles.hidden
          )}
          onClick={() => setPageIndex((p) => p + 1)}
        >
          →
        </button>
      </section>
    </main>
  );
}
