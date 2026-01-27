// src/app/project/[projectId]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

import { projectsApi } from "@/api/projects";
import { scrapsApi } from "@/api/scraps";
import type { Project } from "@/domain/project";
import type { Scrap } from "@/domain/scrap";
import type { StageKey } from "@/domain/stage";

import { useSidebarState } from "@/contexts/SidebarContext";
import { stages } from "@/constants/stages";

import ScrapCard from "@/components/ScrapCard/ScrapCard";
import styles from "./ProjectDashboard.module.css";

const PAGE_SIZE = 3;

const stageClassMap: Record<StageKey, string> = {
  PLAN: styles.plan,
  RESEARCH: styles.research,
  DESIGN: styles.design,
  IMPLEMENT: styles.implement,
  TEST: styles.test,
  ETC: styles.etc,
};

export default function ProjectPage() {
  const params = useParams<{ projectId: string }>();
  const projectId = Number(params.projectId);
  const router = useRouter();

  const { collapsed } = useSidebarState();

  // NOTE: 프로젝트 정보
  const [project, setProject] = useState<Project | null>(null);

  // NOTE: 모든 스테이지의 스크랩 목록
  const [scraps, setScraps] = useState<Scrap[]>([]);

  // NOTE: 에러 메시지 표출용
  const [errorMessage, setErrorMessage] = useState<string>("");

  // NOTE: 칸반 보드 페이지 인덱스
  const [pageIndex, setPageIndex] = useState(0);

  // NOTE: 최초 진입 시 프로젝트 정보 불러오기
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

  // NOTE: 모든 스테이지의 스크랩 목록 불러오기 (병렬 요청)
  useEffect(() => {
    let isMounted = true;

    const fetchAllScraps = async () => {
      try {
        // NOTE: 모든 스테이지 API를 병렬로 호출
        const results = await Promise.all(
          stages.map((stage) =>
            scrapsApi
              .getScraps({ projectId, stage: stage.name })
              .catch(() => ({ items: [], nextCursor: null }))
          )
        );

        if (!isMounted) return;

        // NOTE: 결과 합치기
        const allScraps = results.flatMap((res) => res.items);

        // NOTE: capturedAt 기준 내림차순 정렬
        allScraps.sort(
          (a, b) =>
            new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
        );

        setScraps(allScraps);
      } catch {
        if (!isMounted) return;
        setErrorMessage("스크랩 목록을 불러오지 못했습니다.");
      }
    };

    fetchAllScraps();

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  // NOTE: 프로젝트 목록 다시 불러오기
  const refreshProject = async () => {
    const res = await projectsApi.getProjects();
    const found = res.items.find((p) => p.projectId === projectId) ?? null;
    setProject(found);
  };

  // NOTE: 프로젝트 수정(PATCH)
  // const handleUpdateProject = async () => {
  //   if (!project) return;

  //   try {
  //     await projectsApi.updateProject(project.projectId, {
  //       name: "새 프로젝트 이름",
  //     });
  //     await refreshProject();
  //   } catch {
  //     setErrorMessage("프로젝트 수정에 실패했습니다.");
  //   }
  // };

  // NOTE: 프로젝트 삭제(DELETE)
  // const handleDeleteProject = async () => {
  //   if (!project) return;

  //   try {
  //     await projectsApi.deleteProject(project.projectId);
  //     router.push("/project");
  //   } catch {
  //     setErrorMessage("프로젝트 삭제에 실패했습니다.");
  //   }
  // };

  // NOTE: 스테이지 페이징
  const stagePages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < stages.length; i += PAGE_SIZE) {
      pages.push(stages.slice(i, i + PAGE_SIZE));
    }
    return pages;
  }, []);

  const pageCount = stagePages.length;
  const currentStages = stagePages[pageIndex];

  const showPrev = pageIndex > 0;
  const showNext = pageIndex < pageCount - 1;

  // NOTE: 에러 표시
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // NOTE: 로딩 중에는 아무것도 표시하지 않음 (이전 화면 유지)
  if (!project) {
    return null;
  }

  return (
    <main className={styles.page}>
      {/* ================= Header ================= */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.projectTitle}>{project?.name}</h1>
          {project?.description && (
            <p className={styles.projectDescription}>{project.description}</p>
          )}
        </div>

        {/* 헤더 화살표: 항상 렌더링 + CSS로 숨김 */}
        <div
          className={clsx(styles.headerNav, collapsed && styles.hidden)}
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
        className={clsx(styles.boardWrapper, collapsed && styles.collapsed)}
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
                    <ScrapCard key={scrap.scrapId} scrap={scrap} />
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
