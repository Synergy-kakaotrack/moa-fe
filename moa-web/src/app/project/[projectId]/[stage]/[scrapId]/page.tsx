'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import { mockScraps } from '@/mocks/scrapDetail';
import { mockProjects } from '@/mocks/projects';

import { mapScrapDetailFromMock } from '@/api/mappers/mapScrapDetailFromMock';
import { mapScrapListItemFromMock } from '@/api/mappers/mapScrapListItemFromMock';
import { mapProjectFromMock } from '@/api/mappers/mapProjectFromMock';

import type { ScrapDetail } from '@/domain/scrap';
import type { StageKey } from '@/domain/stage';

import ScrapBody from '@/components/scrap/ScrapBody';
import { IconExternalLink } from '@/components/icons';
import { STAGE_ICON_MAP } from '@/components/icons/stage/iconStageMap';

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

  /* ===== 현재 스크랩 ===== */
  const scrap: ScrapDetail | null = useMemo(() => {
    const mock = mockScraps.find((s) => s.scrapId === numericScrapId);
    return mock ? mapScrapDetailFromMock(mock) : null;
  }, [numericScrapId]);

  /* ===== 같은 stage의 스크랩 리스트 (정렬) ===== */
  const stageScraps = useMemo(() => {
    return mockScraps
      .map(mapScrapListItemFromMock)
      .filter(
        (s) =>
          s.projectId === numericProjectId && s.stageKey === stage
      )
      .sort(
        (a, b) =>
          new Date(b.capturedAt).getTime() -
          new Date(a.capturedAt).getTime()
      );
  }, [numericProjectId, stage]);

  /* ===== 이전/다음 스크랩 ===== */
  const currentIndex = stageScraps.findIndex(
    (s) => s.scrapId === numericScrapId
  );
  const prevScrap = currentIndex > 0 ? stageScraps[currentIndex - 1] : null;
  const nextScrap =
    currentIndex < stageScraps.length - 1
      ? stageScraps[currentIndex + 1]
      : null;

  /* ===== 프로젝트 정보 ===== */
  const project = useMemo(() => {
    return mockProjects
      .map(mapProjectFromMock)
      .find((p) => p.projectId === numericProjectId);
  }, [numericProjectId]);

  if (!scrap) {
    return <div>스크랩을 찾을 수 없습니다.</div>;
  }

  /* ===== Icons ===== */
  const StageIcon = STAGE_ICON_MAP[scrap.stageKey];
  const AgentIcon = AGENT_ICON_MAP[scrap.agent.toLowerCase()];

  /* ===== Handlers ===== */
  const handleNavigate = (targetScrapId: number) => {
    router.push(`/project/${projectId}/${stage}/${targetScrapId}`);
  };

  /* ===== Date Format ===== */
  const formattedDate = new Date(scrap.capturedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.wrapper}>
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

      <article className={styles.article}>
        {/* 컨텍스트 헤더 */}
        <div className={styles.contextHeader}>
          {StageIcon && <StageIcon className={styles.stageIcon} />}
          <span>
            {project?.name ?? '프로젝트'} / {scrap.stageName}
          </span>
        </div>

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
              <IconExternalLink size={18} />
            </a>
          </div>

          <div className={styles.meta}>
            {AgentIcon && <AgentIcon className={styles.agentIcon} />}
            <span className={styles.agentName}>{scrap.agent}</span>
            <span>{formattedDate}</span>
          </div>
        </header>

        {/* 메모 */}
        {scrap.memo && <div className={styles.memo}>{scrap.memo}</div>}

        {/* 본문 */}
        <ScrapBody content={scrap.content} contentType={scrap.contentType} />
      </article>

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
  );
}
