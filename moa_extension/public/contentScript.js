// ===== Toast 알림 =====
function showMoaToast(message, linkUrl) {
  // 이미 토스트가 있으면 제거
  const existing = document.getElementById("moa-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "moa-toast";
  toast.innerHTML = `
    <div class="moa-toast-content">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#4CAF50"/>
      </svg>
      <span class="moa-toast-text">${message}</span>
      <a href="${linkUrl}" target="_blank" class="moa-toast-link">
        보러가기
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </div>
  `;

  // 스타일 추가
  const style = document.createElement("style");
  style.id = "moa-toast-style";
  if (!document.getElementById("moa-toast-style")) {
    style.textContent = `
      #moa-toast {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2147483647;
        animation: moa-toast-slide-up 0.3s ease-out;
      }
      @keyframes moa-toast-slide-up {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }
      @keyframes moa-toast-fade-out {
        from {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        to {
          opacity: 0;
          transform: translateX(-50%) translateY(20px);
        }
      }
      .moa-toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 16px;
        background: #FFFFFF;
        border: 1px solid #212121;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      }
      .moa-toast-text {
        color: #212121;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }
      .moa-toast-link {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: #3582F0;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
      }
      .moa-toast-link:hover {
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  // 5초 후 자동 제거
  setTimeout(() => {
    toast.style.animation = "moa-toast-fade-out 0.3s ease-out forwards";
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

// 토스트 메시지 수신
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SHOW_TOAST") {
    showMoaToast(message.text, message.linkUrl);
  }
});

// NOTE: ChatGPT 코드블록 UI 제거(언어 라벨 + 코드 복사 버튼)
function removeChatGptCodeUi(root) {
  if (!root) return;

  // 1) "코드 복사" 버튼 (aria-label 기준)
  root.querySelectorAll('button[aria-label="복사"]').forEach((btn) => {
    btn.closest("div")?.remove();
  });

  // 2) 텍스트 기반 fallback
  root.querySelectorAll("button").forEach((btn) => {
    const t = (btn.textContent || "").replace(/\s+/g, " ").trim();
    if (t.includes("코드 복사") || t.toLowerCase().includes("copy code")) {
      btn.closest("div")?.remove();
    }
  });

  // 3) 언어 라벨 (select-none + text-xs + h-9)
  root
    .querySelectorAll("div.select-none.text-xs.h-9")
    .forEach((el) => el.remove());

  // 4) 짧은 언어 토큰 제거
  root.querySelectorAll("div.select-none").forEach((el) => {
    const t = (el.textContent || "").trim().toLowerCase();
    if (!t) return;

    const isLangToken =
      t.length <= 12 &&
      [
        "js","javascript","ts","typescript","python","java","c","c++","c#",
        "go","rust","kotlin","swift","php","ruby","bash","shell","sql",
        "json","yaml","yml","html","css",
      ].includes(t);

    if (isLangToken) el.remove();
  });
}

function isTypingInEditable() {
  const el = document.activeElement;
  if (!el) return false;

  if (el.tagName === "INPUT") return true;
  if (el.tagName === "TEXTAREA") return true;
  if (el.isContentEditable) return true;

  return false;
}

let lastSentText = "";
let isDragging = false;

document.addEventListener("mousedown", () => {
  isDragging = false;
});

document.addEventListener("mousemove", () => {
  isDragging = true;
});

document.addEventListener("mouseup", () => {
  // 🔐 입력 중이면 스크랩 로직 완전 차단
  if (isTypingInEditable()) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const text = selection.toString().trim();
  if (!text) {
    selection.removeAllRanges();
    return;
  }

  const range = selection.getRangeAt(0);
  const fragment = range.cloneContents();

  const wrapper = document.createElement("div");
  wrapper.appendChild(fragment);

  removeChatGptCodeUi(wrapper);

  const rawHtml = wrapper.innerHTML;

  chrome.runtime.sendMessage({
    type: "SCRAP_UPDATED",
    payload: {
      text,
      rawHtml,
      url: location.href,
      createdAt: Date.now(),
    },
  });

  selection.removeAllRanges();
});
