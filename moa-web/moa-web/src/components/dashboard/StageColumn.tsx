'use client';

import { StageKey } from '@/data/stages';
import { getScrapsByProjectAndStage } from '@/data/selectors';
import ScrapCard from './ScrapCard';

interface StageColumnProps {
  projectId: string;
  stage: StageKey;
  stageName: string;
}

export default function StageColumn({
  projectId,
  stage,
  stageName,
}: StageColumnProps) {
  const scraps = getScrapsByProjectAndStage(projectId, stage);

  return (
    <section
      style={{
        backgroundColor: '#F5F8FF',
        borderRadius: '16px',
        padding: '16px',
        minHeight: '600px',
      }}
    >
      {/* 컬럼 헤더 */}
      <header style={{ marginBottom: '16px' }}>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '4px',
          }}
        >
          {stageName}
        </h3>
        <span style={{ fontSize: '12px', color: '#6B7280' }}>
          {scraps.length}개
        </span>
      </header>

      {/* 카드 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {scraps.length === 0 ? (
          <EmptyState />
        ) : (
          scraps.map((scrap) => (
            <ScrapCard
              key={scrap.id}
              title={scrap.title}
              preview={scrap.preview}
              aiSource={scrap.aiSource}
              capturedAt={scrap.capturedAt}
              stage={stage}
              projectId={projectId}
            />
          ))
        )}
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Empty State                         */
/* ---------------------------------- */

function EmptyState() {
  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        fontSize: '14px',
        color: '#9CA3AF',
        textAlign: 'center',
      }}
    >
      아직 저장된 스크랩이 없어요
    </div>
  );
}
