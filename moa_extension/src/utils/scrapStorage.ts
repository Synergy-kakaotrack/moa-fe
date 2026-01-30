import type { Scrap } from "../types/scrap.domain";

const KEY = "scraps";
export function saveScrapList(scraps: Scrap[]) {
  chrome.storage.local.set({ [KEY]: scraps });
}

export function loadScrapList(): Promise<Scrap[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get([KEY], (result) => {
      resolve(Array.isArray(result[KEY]) ? result[KEY] : []);
    });
  });
}

export function clearScrapList() {
  chrome.storage.local.remove([KEY]);
}