import type { StageKey } from '@/domain/stage';
import {
  IconPlanning,
  IconResearch,
  IconDesign,
  IconImplementation,
  IconTesting,
  IconOthers,
} from '@/components/icons';

export const STAGE_ICON_MAP: Record<
  StageKey,
  React.FC<{ className?: string }>
> = {
  PLAN: IconPlanning,
  RESEARCH: IconResearch,
  DESIGN: IconDesign,
  IMPLEMENT: IconImplementation,
  TEST: IconTesting,
  ETC: IconOthers,
};
