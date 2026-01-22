//프론트 Draft(UI 상태용, 로컬 전용)
import type { Scrap } from "./scrap.domain";

export interface UIDraft {
  step: "PROJECT_SETTING" | "SAVE";
  projectName: string;
  workStep: string;
  title: string;
  memo: string;
  scraps: Scrap[];
  savedAt: number;
}
