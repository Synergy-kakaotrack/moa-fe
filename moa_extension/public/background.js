let scraps = [];

console.log("🟢 background service worker loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 1. contentScript → background
  if (message.type === "SCRAP_TEXT") {
    const scrap = message.payload;

    const exists = scraps.some(
      (s) =>
        s.text === scrap.text &&
        s.dragSessionId === scrap.dragSessionId
    );

    if (exists) return;
    scraps.push(scrap);
    console.log("saved scrap:", scrap);

    // 2. side panel이 열려 있으면 실시간 전달 시도
    chrome.runtime.sendMessage(
      {
        type: "SCRAP_UPDATED",
        payload: scrap,
      },
      () => {
        if (chrome.runtime.lastError) {
          // side panel이 아직 안 열려 있으면 정상
          console.log("side panel not open yet");
        }
      }
    );
  }

  // 3. side panel이 열릴 때 기존 스크랩 요청
  if (message.type === "GET_SCRAPS") {
    console.log("📤 sending all scraps");
    sendResponse(scraps);
  }
});


//확장프로그램 아이콘 클릭 하면 사이드패널 나오게
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  });
});
