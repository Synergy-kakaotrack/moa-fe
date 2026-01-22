import React from 'react';
import Link from 'next/link';

import { mockScraps } from '@/mocks/scrapDetail';
import { mapScrapListItemFromMock } from '@/api/mappers/mapScrapListItemFromMock';
import { StageKey } from '@/domain/stage';

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

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* 메인 */}
      <main style={{ flex: 1, padding: 24 }}>
        {children}
      </main>

      {/* 우측 사이드바 */}
      <aside
        style={{
          width: 320,
          borderLeft: '1px solid #e5e5e5',
          padding: 16,
        }}
      >
        <h3 style={{ marginBottom: 12 }}>Scrap List</h3>

        {scraps.length === 0 ? (
          <p style={{ fontSize: 13, color: '#999' }}>
            스크랩이 없습니다.
          </p>
        ) : (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {scraps.map((scrap) => (
              <li key={scrap.scrapId}>
                <Link
                  href={`/project/${projectId}/${stage}/${scrap.scrapId}`}
                  style={{
                    textDecoration: 'none',
                    color:
                      scrap.scrapId === Number(scrapId)
                        ? '#3582f0'
                        : '#333',
                    fontWeight:
                      scrap.scrapId === Number(scrapId)
                        ? 600
                        : 400,
                  }}
                >
                  {scrap.subtitle}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
