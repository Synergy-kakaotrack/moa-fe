// src/app/project/[projectId]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

import { projectsApi } from "@/api/projects";
import { scrapsApi } from "@/api/scraps";
import type { Project } from "@/domain/project";
import type { Scrap } from "@/domain/scrap";
import type { StageKey } from "@/domain/stage";
import type { StageDigest } from "@/domain/digest";

import { useSidebarState } from "@/contexts/SidebarContext";
import { stages } from "@/constants/stages";
import { mockStageDigests } from "@/mocks/stageDigest";

import StageDigestCard from "@/components/StageDigestCard";
import StageScrapSidebar from "@/components/StageScrapSidebar";
import styles from "./ProjectDashboard.module.css";

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

  const { collapsed } = useSidebarState();

  // NOTE: 프로젝트 정보
  const [project, setProject] = useState<Project | null>(null);

  // NOTE: 모든 스테이지의 스크랩 목록
  const [scraps, setScraps] = useState<Scrap[]>([]);

  // NOTE: 에러 메시지 표출용
  const [errorMessage, setErrorMessage] = useState<string>("");

  // NOTE: 선택된 stage
  const [selectedStage, setSelectedStage] = useState<StageKey>("PLAN");

  // NOTE: 요약 갱신 중 상태
  const [refreshingStages, setRefreshingStages] = useState<Set<StageKey>>(
    new Set()
  );

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

  // NOTE: Mock에서 stage별 digest 가져오기
  const stageDigests = useMemo(() => {
    const digests: Record<StageKey, StageDigest> = {} as Record<
      StageKey,
      StageDigest
    >;

    stages.forEach((stage) => {
      const mock = mockStageDigests[stage.key];
      if (mock) {
        digests[stage.key] = {
          projectId: mock.project.projectId,
          projectName: mock.project.projectName,
          stageKey: stage.key,
          stageName: stage.name,
          digest: mock.digest,
          meta: mock.meta,
        };
      }
    });

    return digests;
  }, []);

  // NOTE: 현재 선택된 stage의 스크랩 필터링
  const currentStageScraps = useMemo(() => {
    return scraps.filter((scrap) => scrap.stageKey === selectedStage);
  }, [scraps, selectedStage]);

  // NOTE: 현재 선택된 stage의 digest
  const currentDigest = stageDigests[selectedStage];

  // NOTE: 요약 갱신 핸들러 (Mock - 실제로는 API 호출)
  const handleRefresh = (stageKey: StageKey) => {
    setRefreshingStages((prev) => new Set(prev).add(stageKey));

    // Mock: 2초 후 갱신 완료
    setTimeout(() => {
      setRefreshingStages((prev) => {
        const next = new Set(prev);
        next.delete(stageKey);
        return next;
      });
    }, 2000);
  };

  // NOTE: 에러 표시
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  // NOTE: 로딩 중에는 아무것도 표시하지 않음 (이전 화면 유지)
  if (!project) {
    return null;
  }

  return (
    <main className={clsx(styles.page, collapsed && styles.collapsed)}>
      {/* ================= Header ================= */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.projectTitle}>{project?.name}</h1>
          {project?.description && (
            <p className={styles.projectDescription}>{project.description}</p>
          )}
        </div>
      </header>

      {/* ================= Content Area ================= */}
      <div className={styles.contentWrapper}>
        {/* ================= Main: Stage Tabs + AI Summary ================= */}
        <section className={styles.mainSection}>
          {/* Stage Tabs */}
          <nav className={styles.stageTabs}>
            {stages.map((stage) => (
              <button
                key={stage.key}
                className={clsx(
                  styles.stageTab,
                  stageClassMap[stage.key],
                  selectedStage === stage.key && styles.active
                )}
                onClick={() => setSelectedStage(stage.key)}
              >
                {stage.name}
              </button>
            ))}
          </nav>

          {/* AI Summary Card */}
          <div className={clsx(styles.digestWrapper, stageClassMap[selectedStage])}>
            {currentDigest && (
              <StageDigestCard
                digest={currentDigest}
                onRefresh={() => handleRefresh(selectedStage)}
                isRefreshing={refreshingStages.has(selectedStage)}
              />
            )}
          </div>
        </section>

        {/* ================= Right Sidebar: Scrap List ================= */}
        <StageScrapSidebar
          scraps={currentStageScraps}
          stageKey={selectedStage}
          projectId={projectId}
          projectName={project.name}
          stageName={stages.find((s) => s.key === selectedStage)?.name ?? ''}
        />
      </div>
    </main>
  );
}
