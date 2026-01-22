//프로젝트 세팅 localStorage 저장/복구 유틸
import type { UIDraft } from "../types/uiDraft";

const KEY = "uiDraft";

export function saveUIDraft(draft: UIDraft) {
  localStorage.setItem(KEY, JSON.stringify(draft));
}

export function getUIDraft(): UIDraft | null {
  const saved = localStorage.getItem(KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved) as UIDraft;
  } catch {
    return null;
  }
}

export function clearUIDraft() {
  localStorage.removeItem(KEY);
}
