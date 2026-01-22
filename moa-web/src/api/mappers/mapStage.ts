import { StageKey } from '@/domain/stage';
import { stages } from '@/constants/stages';

export function mapStageNameToKey(stageName: string): StageKey {
  const stage = stages.find((s) => s.name === stageName);

  if (!stage) {
    console.warn('[mapStageNameToKey] Unknown stage:', stageName);
    return 'ETC';
  }

  return stage.key;
}
