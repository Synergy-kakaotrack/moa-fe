import type { Scrap } from "../types/scrap";

const KEY = "scraps";

export function getScraps(): Scrap[] {
  const saved = localStorage.getItem(KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved) as Scrap[];
  } catch {
    return [];
  }
}

export function saveDraft(scrap: Scrap) {
  const scraps = getScraps();

  const updated = scraps.some(s => s.id === scrap.id)
    ? scraps.map(s => (s.id === scrap.id ? scrap : s))
    : [...scraps, scrap];

  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function saveFinalScraps(scraps: Scrap[]) {
  localStorage.setItem(KEY, JSON.stringify(scraps));
}