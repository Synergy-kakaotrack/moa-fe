import { ScrapDetail } from '@/domain/scrap';
import { ScrapDetailMock } from '@/mocks/types/scrap.dto';
import { mapStageNameToKey } from './mapStage';

export function mapScrapDetailFromMock(
  mock: ScrapDetailMock
): ScrapDetail {
  return {
    scrapId: mock.scrapId,
    projectId: mock.projectId,

    stageKey: mapStageNameToKey(mock.stage),
    stageName: mock.stage,

    subtitle: mock.subtitle,
    memo: mock.memo,

    agent: mock.aiSource.toLowerCase(),
    capturedAt: mock.capturedAt,

    contentType:
      'rawHtmlToMarkdown' in mock ? 'markdown' : 'html',

    content:
      'rawHtmlToMarkdown' in mock
        ? mock.rawHtmlToMarkdown
        : mock.rawHtml,

    aiSourceUrl: mock.aiSourceUrl,
  };
}
