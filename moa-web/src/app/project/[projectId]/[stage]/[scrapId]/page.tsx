'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

import { getScrapDetail, getScraps } from '@/api/scraps';
import { projectsApi } from '@/api/projects';

import type { ScrapDetail } from '@/domain/scrap';
import type { StageKey } from '@/domain/stage';
import type { Project } from '@/domain/project';
import type { Scrap } from '@/domain/scrap';
import { stages } from '@/constants/stages';

import ScrapBody from '@/components/scrap/ScrapBody';
import { IconLink, IconFolder } from '@/components/icons';

import styles from './ScrapDetailPage.module.css';

/* ================= Agent Icon Map ================= */

const AGENT_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {};

// Dynamic import를 피하고 직접 매핑
import IconClaude from '@/components/icons/aiAgent/IconClaude';
import IconChatGPT from '@/components/icons/aiAgent/IconChatGPT';
import IconGemini from '@/components/icons/aiAgent/IconGemini';

AGENT_ICON_MAP['claude'] = IconClaude;
AGENT_ICON_MAP['chatgpt'] = IconChatGPT;
AGENT_ICON_MAP['gpt'] = IconChatGPT;
AGENT_ICON_MAP['gemini'] = IconGemini;

/* ================= Cache (모듈 레벨) ================= */

// NOTE: 페이지 재마운트 시에도 유지되는 캐시
const projectCache = new Map<number, Project>();
const stageScrapsCache = new Map<string, Scrap[]>();
const scrapCache = new Map<number, ScrapDetail>();

/* ================= Page ================= */

export default function ScrapDetailPage() {
  const params = useParams<{
    projectId: string;
    stage: StageKey;
    scrapId: string;
  }>();
  const router = useRouter();

  const { projectId, stage, scrapId } = params;
  const numericScrapId = Number(scrapId);
  const numericProjectId = Number(projectId);
  const stageName = stages.find((s) => s.key === stage)?.name ?? stage;

  // NOTE: 캐시에서 초기값 가져오기 (깜빡임 방지)
  const cachedProject = projectCache.get(numericProjectId);
  const cacheKey = `${numericProjectId}-${stageName}`;
  const cachedStageScraps = stageScrapsCache.get(cacheKey);
  const cachedScrap = scrapCache.get(numericScrapId);

  const [scrap, setScrap] = useState<ScrapDetail | null>(cachedScrap ?? null);
  const [stageScraps, setStageScraps] = useState<Scrap[]>(cachedStageScraps ?? []);
  const [project, setProject] = useState<Project | null>(cachedProject ?? null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  /* ===== 프로젝트 정보 (projectId가 바뀔 때만) ===== */
  useEffect(() => {
    if (!numericProjectId) return;

    // NOTE: 캐시가 있으면 API 호출 스킵
    if (projectCache.has(numericProjectId)) {
      setProject(projectCache.get(numericProjectId)!);
      return;
    }

    let isMounted = true;
    projectsApi
      .getProjects()
      .then((res) => {
        if (!isMounted) return;
        const found =
          res.items.find((p) => p.projectId === numericProjectId) ?? null;
        if (found) {
          projectCache.set(numericProjectId, found);
        }
        setProject(found);
      })
      .catch(() => {
        if (isMounted) setProject(null);
      });

    return () => {
      isMounted = false;
    };
  }, [numericProjectId]);

  /* ===== 스테이지 스크랩 목록 (projectId, stage가 바뀔 때만) ===== */
  useEffect(() => {
    if (!numericProjectId || !stageName) return;

    const key = `${numericProjectId}-${stageName}`;

    // NOTE: 캐시가 있으면 API 호출 스킵
    if (stageScrapsCache.has(key)) {
      setStageScraps(stageScrapsCache.get(key)!);
      return;
    }

    let isMounted = true;
    getScraps({ projectId: numericProjectId, stage: stageName })
      .then((res) => {
        if (!isMounted) return;
        const sorted = res.items.sort(
          (a, b) =>
            new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
        );
        stageScrapsCache.set(key, sorted);
        setStageScraps(sorted);
      })
      .catch(() => {
        if (isMounted) setStageScraps([]);
      });

    return () => {
      isMounted = false;
    };
  }, [numericProjectId, stageName]);

  /* ===== 스크랩 상세 (scrapId가 바뀔 때만) ===== */
  useEffect(() => {
    if (!numericScrapId) {
      setErrorMessage('잘못된 경로입니다.');
      return;
    }

    // NOTE: 캐시가 있으면 바로 표시 (깜빡임 방지)
    if (scrapCache.has(numericScrapId)) {
      setScrap(scrapCache.get(numericScrapId)!);
      setErrorMessage('');
      return;
    }

    let isMounted = true;
    getScrapDetail(numericScrapId)
      .then((detail) => {
        if (!isMounted) return;
        scrapCache.set(numericScrapId, detail);
        setScrap(detail);
        setErrorMessage('');
      })
      .catch(() => {
        if (isMounted) setErrorMessage('스크랩을 불러오지 못했습니다.');
      });

    return () => {
      isMounted = false;
    };
  }, [numericScrapId]);

  /* ===== 같은 stage의 스크랩 리스트 (정렬) ===== */
  const { prevScrap, nextScrap } = useMemo(() => {
    const currentIndex = stageScraps.findIndex(
      (s) => s.scrapId === numericScrapId
    );
    return {
      prevScrap: currentIndex > 0 ? stageScraps[currentIndex - 1] : null,
      nextScrap:
        currentIndex >= 0 && currentIndex < stageScraps.length - 1
          ? stageScraps[currentIndex + 1]
          : null,
    };
  }, [stageScraps, numericScrapId]);

  /* ===== Icons ===== */
  const AgentIcon = scrap ? AGENT_ICON_MAP[scrap.agent.toLowerCase()] : null;

  /* ===== Handlers ===== */
  const handleNavigate = (targetScrapId: number) => {
    router.push(`/project/${projectId}/${stage}/${targetScrapId}`);
  };

  /* ===== Date Format ===== */
  const formattedDate = scrap
    ? new Date(scrap.capturedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className={styles.wrapper}>
      {/* 컨텍스트 헤더 - 항상 표시 */}
      <div className={styles.contextHeader}>
        <IconFolder className={styles.folderIcon} />
        <Link href={`/project/${projectId}`} className={styles.projectLink}>
          {project?.name ?? '프로젝트'}
        </Link>
        <span className={styles.separator}>/</span>
        <span>{stageName}</span>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className={styles.mainContent}>
        {/* 이전 화살표 */}
        <button
          className={clsx(
            styles.navArrow,
            styles.navArrowPrev,
            !prevScrap && styles.navArrowHidden
          )}
          onClick={() => prevScrap && handleNavigate(prevScrap.scrapId)}
          aria-label="이전 스크랩"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 스크랩 본문 영역 */}
        {errorMessage ? (
          <article className={styles.article}>
            <div className={styles.errorMessage}>{errorMessage}</div>
          </article>
        ) : scrap ? (
          <article className={styles.article}>
            {/* 헤더: 타이틀 + 메타 */}
            <header className={styles.header}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{scrap.subtitle}</h1>
                <a
                  href={scrap.aiSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkIcon}
                  aria-label="원문 링크"
                >
                  <IconLink size={18} />
                </a>
              </div>

              <div className={styles.meta}>
                <div className={styles.agentRow}>
                  {AgentIcon && <AgentIcon className={styles.agentIcon} />}
                  <span className={styles.agentName}>{scrap.agent}</span>
                </div>
                <span className={styles.metaDate}>{formattedDate}</span>
              </div>
            </header>
            <div className={styles.contentScroll}>
              <div className={styles.contentCard}>
                {/* 메모 */}
                {scrap.memo && <div className={styles.memo}>{scrap.memo}</div>}

                {/* 본문 */}
                <ScrapBody content={scrap.content} contentType={scrap.contentType} />
              </div>
            </div>
          </article>
        ) : null}

        {/* 다음 화살표 */}
        <button
          className={clsx(
            styles.navArrow,
            styles.navArrowNext,
            !nextScrap && styles.navArrowHidden
          )}
          onClick={() => nextScrap && handleNavigate(nextScrap.scrapId)}
          aria-label="다음 스크랩"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6L15 12L9 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
