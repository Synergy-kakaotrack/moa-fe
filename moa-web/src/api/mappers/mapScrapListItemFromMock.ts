import { Scrap } from '@/domain/scrap';
import { ScrapDetailMock } from '@/mocks/types/scrap.dto';
import { mapStageNameToKey } from './mapStage';

export function mapScrapListItemFromMock(
  mock: ScrapDetailMock
): Scrap {
  return {
    scrapId: mock.scrapId,
    projectId: mock.projectId,

    stageKey: mapStageNameToKey(mock.stage),
    stageName: mock.stage,

    subtitle: mock.subtitle,
    memo: mock.memo,

    agent: mock.aiSource.toLowerCase(),
    capturedAt: mock.capturedAt,
  };
}
