import { redirect } from 'next/navigation';
import { getScraps } from '@/api/scraps';
import type { Scrap } from '@/domain/scrap';
import type { StageKey } from '@/domain/stage';
import { stages } from '@/constants/stages';

interface PageProps {
  params: Promise<{
    projectId: string;
    stage: StageKey;
  }>;
}

export default async function StagePage({ params }: PageProps) {
  const { projectId, stage } = await params; 
  const numericProjectId = Number(projectId);
  const stageName = stages.find((s) => s.key === stage)?.name ?? stage;

  let scraps: Scrap[] = [];
  try {
    const res = await getScraps({
      projectId: numericProjectId,
      stage: stageName,
    });
    scraps = res.items.sort(
      (a, b) =>
        new Date(b.capturedAt).getTime() -
        new Date(a.capturedAt).getTime()
    );
  } catch {
    return (
      <div style={{ padding: 24, color: '#666' }}>
        스크랩 목록을 불러오지 못했습니다.
      </div>
    );
  }

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
