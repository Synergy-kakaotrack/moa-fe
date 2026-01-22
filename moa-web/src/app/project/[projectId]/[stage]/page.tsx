import { redirect } from 'next/navigation';
import { mockScraps } from '@/mocks/scrapDetail';
import { mapScrapListItemFromMock } from '@/api/mappers/mapScrapListItemFromMock';
import type { StageKey } from '@/domain/stage';

interface PageProps {
  params: Promise<{
    projectId: string;
    stage: StageKey;
  }>;
}

export default async function StagePage({ params }: PageProps) {
  const { projectId, stage } = await params; 

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

  if (scraps.length === 0) {
    return (
      <div style={{ padding: 24, color: '#666' }}>
        아직 이 단계에 저장된 스크랩이 없습니다.
      </div>
    );
  }

  redirect(
    `/project/${projectId}/${stage}/${scraps[0].scrapId}`
  );
}
