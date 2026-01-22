import React from 'react';

import { mockScraps } from '@/mocks/scrapDetail';
import { mockProjects } from '@/mocks/projects';

import { mapScrapListItemFromMock } from '@/api/mappers/mapScrapListItemFromMock';
import { mapProjectFromMock } from '@/api/mappers/mapProjectFromMock';

import { StageKey } from '@/domain/stage';
import ScrapCard from '@/components/ScrapCard/ScrapCard';


interface StageLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
    stage: StageKey;
    scrapId?: string;
  }>;
}

export default async function StageLayout({
  children,
  params,
}: StageLayoutProps) {
  const { projectId, stage, scrapId } = await params;

  /* ================= 스크랩 리스트 ================= */
  const scraps = mockScraps
    .map(mapScrapListItemFromMock)
    .filter(
      (scrap) =>
        scrap.projectId === Number(projectId) &&
        scrap.stageKey === stage
    )
    .sort(
      (a, b) =>
        new Date(b.capturedAt).getTime() -
        new Date(a.capturedAt).getTime()
    );

  /* ================= 표시용 컨텍스트 ================= */
  const project = mockProjects
    .map(mapProjectFromMock)
    .find((p) => p.projectId === Number(projectId));

  const projectName = project?.name ?? '프로젝트';

  //
  const stageName =
    scraps[0]?.stageName ?? '단계';

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* 메인 영역 */}
      <main style={{ flex: 1, padding: 24 }}>
        {children}
      </main>

      {/* 우측 사이드바 */}
      <aside
        style={{
          width: 320,
          borderLeft: '1px solid #e5e5e5',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          backgroundColor: '#ddebff',
        }}
      >
        {/* 컨텍스트 헤더 */}
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#333',
          }}
        >
          {projectName} / {stageName}
        </h3>

        {/* 스크랩 리스트 */}
        {scraps.length === 0 ? (
          <p style={{ fontSize: 13, color: '#999' }}>
            스크랩이 없습니다.
          </p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              overflowY: 'auto',
            }}
          >
            {scraps.map((scrap) => (
              <ScrapCard
                key={scrap.scrapId}
                scrap={scrap}
                variant="sidebar"
                isActive={
                  scrap.scrapId === Number(scrapId)
                }
              />
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
