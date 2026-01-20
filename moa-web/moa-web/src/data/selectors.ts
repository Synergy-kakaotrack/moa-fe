import { scraps } from './scraps';
import { StageKey } from './stages';

export function getScrapsByProjectAndStage(
  projectId: string,
  stage: StageKey
) {
  return scraps.filter(
    (scrap) =>
      scrap.projectId === projectId && scrap.stage === stage
  );
}
