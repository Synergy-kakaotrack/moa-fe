import { useEffect, useState, useRef } from "react";
import "./App.css";

import Notice from "../components/UI/Notice/Notice";
import Bottom from "../components/Layout/Bottom/Bottom";
import Top from "../components/Layout/Top/Top";
import ProjectSetting from "../Pages/ProjectSetting/ProjectSetting";

import ScrapList from "../Pages/ScrapList";
import type { Scrap } from "../types/scrap.domain";
import Empty from "../components/UI/Empty/Empty";
import Save from "../Pages/Save";

import NoticeScrapCount from "../components/UI/Notice/NoticeScrapCount";
import GuideText from "../components/UI/Notice/GuideText";

import { clearScraps } from "../utils/scrapStorage";
import { detectAISource } from "../utils/detectAISource";
import { saveUIDraft, getUIDraft, clearUIDraft } from "../utils/uiDraftStorage";

/* ======================
   types
====================== */

interface RawScrapPayload {
  text: string;
  url?: string;
  createdAt?: number;
}

type Step = "EMPTY" | "SCRAP_LIST" | "PROJECT_SETTING" | "SAVE";

interface ScrapUpdatedMessage {
  type: "SCRAP_UPDATED";
  payload: RawScrapPayload;
}

function isScrapUpdatedMessage(
  message: unknown
): message is ScrapUpdatedMessage {
  if (
    typeof message !== "object" ||
    message === null ||
    !("type" in message)
  ) {
    return false;
  }

  return (message as { type: unknown }).type === "SCRAP_UPDATED";
}

/* ======================
   App
====================== */

export default function App() {
  const initialUIDraft = getUIDraft();

  // scraps
  const [scraps, setScraps] = useState<Scrap[]>(
    initialUIDraft?.scraps ?? []
  );
  const scrapCount = scraps.length;

  // step
  const [step, setStep] = useState<Step>(
    initialUIDraft?.step ?? "EMPTY"
  );

  // project info
  const [title, setTitle] = useState(initialUIDraft?.title ?? "");
  const [memo, setMemo] = useState(initialUIDraft?.memo ?? "");
  const [projectName, setProjectName] = useState(
    initialUIDraft?.projectName ?? "Capstone Design"
  );
  const [workStep, setWorkStep] = useState(
    initialUIDraft?.workStep ?? "기획"
  );

  // 🔥 핵심: 현재 드래그 세션 id
  const currentScrapIdRef = useRef<number | null>(null);

  const canGoNext = title.trim() !== "";
  const [isProcessingScrap, setIsProcessingScrap] = useState(false);

  /* ======================
     초기 scrap 로드
  ====================== */
  useEffect(() => {
    if (initialUIDraft) return;

    chrome.runtime.sendMessage({ type: "GET_SCRAPS" }, (response) => {
      if (!Array.isArray(response)) return;

      const normalized: Scrap[] = response.map((item, index) => ({
        id: index + 1,
        texts: [item.text],
        meta: {
          source: item.source ?? "Unknown",
          url: item.url,
        },
        createdAt: item.createdAt ?? Date.now(),
        status: "DRAFT",
      }));

      setScraps(normalized);
      setStep(normalized.length > 0 ? "SCRAP_LIST" : "EMPTY");
    });
  }, []);

  /* ======================
     🔥 실시간 SCRAP_UPDATED 수신
  ====================== */
  useEffect(() => {
    const listener = (message: unknown) => {
      if (!isScrapUpdatedMessage(message)) return;

      const { text, url } = message.payload;
      const source = detectAISource(url);

      setScraps(prev => [
        ...prev,
        {
          id: Date.now(),
          texts: [text],
          meta: { source, url },
          createdAt: Date.now(),
          status: "DRAFT",
        },
      ]);

      setStep("SCRAP_LIST");
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  /* ======================
     드래그 종료 → 세션 종료
  ====================== */
  useEffect(() => {
    const handleMouseUp = () => {
      currentScrapIdRef.current = null;
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  /* ======================
     UI Draft 저장
  ====================== */
  useEffect(() => {
    if (step !== "PROJECT_SETTING" && step !== "SAVE") return;

    saveUIDraft({
      step,
      projectName,
      workStep,
      title,
      memo,
      scraps,
      savedAt: Date.now(),
    });
  }, [step, projectName, workStep, title, memo, scraps]);

  /* ======================
     handlers
  ====================== */

  const handleFinalSave = async () => {
    currentScrapIdRef.current = null;
    setScraps([]);
    setStep("EMPTY");
  };

  const goNext = () => {
    if (step === "SCRAP_LIST") {
      setIsProcessingScrap(true);
      setTimeout(() => {
        setIsProcessingScrap(false);
        currentScrapIdRef.current = null;
        setStep("PROJECT_SETTING");
      }, 3000);
      return;
    }

    if (step === "PROJECT_SETTING") {
      currentScrapIdRef.current = null;
      setStep("SAVE");
    }
  };

  const resetProjectInput = () => {
    setTitle("");
    setMemo("");
    setProjectName("Capstone Design");
    setWorkStep("기획");
  };

  const goBack = () => {
    if (step === "PROJECT_SETTING") {
      resetProjectInput();
      currentScrapIdRef.current = null;
      setStep("SCRAP_LIST");
      return;
    }

    if (step === "SAVE") {
      currentScrapIdRef.current = null;
      setStep("PROJECT_SETTING");
    }
  };

  const handleClearScrap = () => {
    clearScraps();
    clearUIDraft();
    currentScrapIdRef.current = null;
    setScraps([]);
    setStep("EMPTY");
  };

  /* ======================
     render
  ====================== */

  const renderContent = () => {
    switch (step) {
      case "EMPTY":
        return <Empty />;

      case "SCRAP_LIST":
        return <ScrapList scraps={scraps} setScraps={setScraps} />;

      case "PROJECT_SETTING":
        return (
          <ProjectSetting
            scraps={scraps}
            projectName={projectName}
            workStep={workStep}
            setProjectName={setProjectName}
            setWorkStep={setWorkStep}
            title={title}
            memo={memo}
            setTitle={setTitle}
            setMemo={setMemo}
            onBack={() => setStep("SCRAP_LIST")}
            onNext={() => setStep("SAVE")}
          />
        );

      case "SAVE":
        return (
          <Save
            scraps={scraps}
            title={title}
            memo={memo}
            projectName={projectName}
            workStep={workStep}
            onBack={() => setStep("PROJECT_SETTING")}
            onSave={handleFinalSave}
          />
        );

      default:
        return null;
    }
  };

  const showGuideText = step === "EMPTY" || step === "SCRAP_LIST";

  return (
    <div className="app-container">
      <Top />

      <div className="app-main">
        <Notice>
          <NoticeScrapCount count={scrapCount} />
          {showGuideText && <GuideText />}
        </Notice>

        <main>{renderContent()}</main>
      </div>

      <Bottom
        step={step}
        scrapCount={scrapCount}
        onAction={step === "SAVE" ? handleFinalSave : goNext}
        onClear={handleClearScrap}
        onBack={goBack}
        disabledAction={
          step === "PROJECT_SETTING" ? !canGoNext : isProcessingScrap
        }
      />
    </div>
  );
}
