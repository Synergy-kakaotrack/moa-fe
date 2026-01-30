const KEY = "scraps";

// storage에서 scraps 불러오기
function loadScraps(callback) {
  chrome.storage.local.get([KEY], (result) => {
    const scraps = Array.isArray(result[KEY]) ? result[KEY] : [];
    callback(scraps);
  });
}

// storage에 scraps 저장
function saveScraps(scraps) {
  chrome.storage.local.set({ [KEY]: scraps });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 1. contentScript → background (스크랩 추가)
  if (message.type === "SCRAP_TEXT") {
    const scrap = message.payload;

    loadScraps((scraps) => {
      const exists = scraps.some(
        (s) =>
          s.text === scrap.text &&
          s.dragSessionId === scrap.dragSessionId
      );

      if (exists) return;

      const next = [...scraps, scrap];
      saveScraps(next);

      console.log("saved scrap:", scrap);

      // side panel에 실시간 전달
      chrome.runtime.sendMessage(
        {
          type: "SCRAP_UPDATED",
          payload: scrap,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.log("side panel not open yet");
          }
        }
      );
    });

    return true; // async
  }

  // 2. side panel → background (기존 스크랩 요청)
  if (message.type === "GET_SCRAPS") {
    console.log("📤 sending all scraps");

    loadScraps((scraps) => {
      sendResponse(scraps);
    });

    return true; // async response
  }

  // 3. 모두 지우기 (UI → background)
  if (message.type === "CLEAR_SCRAPS") {
    chrome.storage.local.remove([KEY], () => {
      console.log("🧹 scraps cleared");
      sendResponse({ ok: true });
    });

    return true;
  }
});

// 확장프로그램 아이콘 클릭 → 사이드패널 열기
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  });
});
