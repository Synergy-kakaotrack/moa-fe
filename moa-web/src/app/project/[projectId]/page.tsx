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
import type { StageDigest, ProjectDigest } from "@/domain/digest";
import { getStageDigest, refreshStageDigest } from "@/api/digests";

// NOTE: Mock API 사용 (실제 API 연결 시 아래 주석 해제하고 mock 제거)
// import { getProjectDigest, refreshProjectDigest } from "@/api/digests";
import {
  mockGetProjectDigest,
  mockRefreshProjectDigest,
  getSavedPrompt,
} from "@/mocks/projectDigest";

import { useSidebarState } from "@/contexts/SidebarContext";
import { stages } from "@/constants/stages";

import StageDigestCard from "@/components/StageDigestCard";
import ProjectDigestCard from "@/components/ProjectDigestCard";
import StageScrapSidebar from "@/components/StageScrapSidebar";
import styles from "./ProjectDashboard.module.css";

// NOTE: 탭 타입 정의 - 'PROJECT'는 프로젝트 전체 요약, 나머지는 StageKey
type TabKey = 'PROJECT' | StageKey;

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

  // NOTE: 선택된 탭 ('PROJECT' 또는 StageKey)
  const [selectedTab, setSelectedTab] = useState<TabKey>("PROJECT");

  // NOTE: Stage 요약 데이터
  const [stageDigests, setStageDigests] = useState<
    Partial<Record<StageKey, StageDigest>>
  >({});

  // NOTE: 프로젝트 전체 요약 데이터
  const [projectDigest, setProjectDigest] = useState<ProjectDigest | null>(null);

  // NOTE: 프로젝트 요약 커스텀 프롬프트
  const [savedPrompt, setSavedPrompt] = useState<string | null>(null);

  // NOTE: 요약 갱신 중 상태
  const [refreshingStages, setRefreshingStages] = useState<Set<TabKey>>(
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

  // NOTE: 프로젝트 요약 가져오기 (탭이 PROJECT일 때)
  useEffect(() => {
    if (selectedTab !== 'PROJECT') return;

    let isMounted = true;

    // NOTE: Mock API 사용 (실제 API 연결 시 getProjectDigest로 교체)
    mockGetProjectDigest(projectId)
      .then((digest) => {
        if (!isMounted) return;
        setProjectDigest(digest);
        setSavedPrompt(getSavedPrompt());
      })
      .catch(() => {
        // NOTE: 요약 조회 실패는 전체 화면을 막지 않음
      });

    return () => {
      isMounted = false;
    };
  }, [projectId, selectedTab]);

  // NOTE: 선택된 stage의 digest 가져오기 (탭이 stage일 때)
  useEffect(() => {
    if (selectedTab === 'PROJECT') return;

    let isMounted = true;
    const stageName =
      stages.find((s) => s.key === selectedTab)?.name ?? selectedTab;

    getStageDigest(projectId, stageName)
      .then((digest) => {
        if (!isMounted) return;
        setStageDigests((prev) => ({
          ...prev,
          [selectedTab]: digest,
        }));
      })
      .catch(() => {
        // NOTE: 요약 조회 실패는 전체 화면을 막지 않음
      });

    return () => {
      isMounted = false;
    };
  }, [projectId, selectedTab]);

  // NOTE: 현재 선택된 stage의 스크랩 필터링
  const currentStageScraps = useMemo(() => {
    if (selectedTab === 'PROJECT') {
      // 프로젝트 요약일 때는 모든 스크랩 표시
      return scraps;
    }
    return scraps.filter((scrap) => scrap.stageKey === selectedTab);
  }, [scraps, selectedTab]);

  // NOTE: 현재 선택된 stage의 digest
  const currentStageDigest = selectedTab !== 'PROJECT' ? stageDigests[selectedTab] : null;

  // NOTE: Stage 요약 갱신 핸들러
  const handleStageRefresh = (stageKey: StageKey) => {
    setRefreshingStages((prev) => new Set(prev).add(stageKey));
    const stageName =
      stages.find((s) => s.key === stageKey)?.name ?? stageKey;

    const logTimer = setInterval(() => {
      console.log(`[digest] refresh in progress: ${stageKey}`);
    }, 1000);

    refreshStageDigest(projectId, stageName)
      .then((digest) => {
        setStageDigests((prev) => ({
          ...prev,
          [stageKey]: digest,
        }));
      })
      .catch(() => {
        // NOTE: 409 등 갱신 실패 시 기존 요약 유지
      })
      .finally(() => {
        clearInterval(logTimer);
        console.log(`[digest] refresh completed: ${stageKey}`);
        setRefreshingStages((prev) => {
          const next = new Set(prev);
          next.delete(stageKey);
          return next;
        });
      });
  };

  // NOTE: 프로젝트 요약 갱신 핸들러
  const handleProjectRefresh = (prompt?: string | null) => {
    setRefreshingStages((prev) => new Set(prev).add('PROJECT'));

    // NOTE: Mock API 사용 (실제 API 연결 시 refreshProjectDigest로 교체)
    mockRefreshProjectDigest(projectId, { prompt })
      .then((digest) => {
        setProjectDigest(digest);
        setSavedPrompt(prompt ?? null);
      })
      .catch(() => {
        // NOTE: 409 등 갱신 실패 시 기존 요약 유지
      })
      .finally(() => {
        setRefreshingStages((prev) => {
          const next = new Set(prev);
          next.delete('PROJECT');
          return next;
        });
      });
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
          {/* Stage Tabs - 프로젝트 요약 탭 + Stage 탭들 */}
          <nav className={styles.stageTabs}>
            {/* 프로젝트 요약 탭 (맨 앞) */}
            <button
              className={clsx(
                styles.stageTab,
                styles.projectTab,
                selectedTab === 'PROJECT' && styles.active
              )}
              onClick={() => setSelectedTab('PROJECT')}
            >
              전체
            </button>

            {/* Stage 탭들 */}
            {stages.map((stage) => (
              <button
                key={stage.key}
                className={clsx(
                  styles.stageTab,
                  stageClassMap[stage.key],
                  selectedTab === stage.key && styles.active
                )}
                onClick={() => setSelectedTab(stage.key)}
              >
                {stage.name}
              </button>
            ))}
          </nav>

          {/* AI Summary Card - 선택된 탭에 따라 다른 카드 표시 */}
          <div className={clsx(
            styles.digestWrapper,
            selectedTab === 'PROJECT' ? styles.projectDigest : stageClassMap[selectedTab]
          )}>
            {selectedTab === 'PROJECT' ? (
              // 프로젝트 전체 요약
              projectDigest && (
                <ProjectDigestCard
                  digest={projectDigest}
                  onRefresh={handleProjectRefresh}
                  isRefreshing={refreshingStages.has('PROJECT')}
                  savedPrompt={savedPrompt}
                />
              )
            ) : (
              // Stage별 요약
              currentStageDigest && (
                <StageDigestCard
                  digest={currentStageDigest}
                  onRefresh={() => handleStageRefresh(selectedTab)}
                  isRefreshing={refreshingStages.has(selectedTab)}
                />
              )
            )}
          </div>
        </section>

        {/* ================= Right Sidebar: Scrap List ================= */}
        <StageScrapSidebar
          scraps={currentStageScraps}
          stageKey={selectedTab === 'PROJECT' ? 'PLAN' : selectedTab}
          projectId={projectId}
          projectName={project.name}
          stageName={selectedTab === 'PROJECT' ? '전체' : (stages.find((s) => s.key === selectedTab)?.name ?? '')}
          isProjectView={selectedTab === 'PROJECT'}
          showStageBadge={selectedTab === 'PROJECT'}
        />
      </div>
    </main>
  );
}
