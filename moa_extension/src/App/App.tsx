
import { useEffect, useState } from "react";
import "./App.css";

import Notice from "../components/UI/Notice/Notice";
import Bottom from "../components/Layout/Bottom/Bottom";
import Top from "../components/Layout/Top/Top";
import GuideBox from "../components/UI/GuideBox/Guidebox";
import ScrapList from "../Pages/ScrapList";

import type { Scrap } from "../Pages/ScrapList";
import ProjectSetting from "../Pages/ProjectSetting/ProjectSetting";



//환경 플래그 
const isExtension =
  typeof chrome !== "undefined" &&
  !!chrome.runtime &&
  !!chrome.runtime.sendMessage;




interface RawScrapPayload {
  text: string;
  source?: string;
  createdAt?: number;
}


// 화면 단계
type Step =
  | "EMPTY"
  | "SCRAP_LIST"
  | "PROJECT_SETTING"
  | "SAVE_DONE";

interface ScrapUpdatedMessage {
  type: "SCRAP_UPDATED";
  payload: RawScrapPayload;
}

function isScrapUpdatedMessage(
  message: unknown
): message is ScrapUpdatedMessage {
  if (typeof message !== "object" || message === null) {
    return false;
  }

  if (!("type" in message) || !("payload" in message)) {
    return false;
  }

  const m = message as { type: unknown; payload: unknown };

  return m.type === "SCRAP_UPDATED";
}


export default function App() {
  // 스크랩 리스트 (핵심)
  const [scraps, setScraps] = useState<Scrap[]>([]);

  // 스크랩 개수
  const scrapCount = scraps.length;

  // 현재 화면 단계
  const [step, setStep] = useState<Step>(isExtension ? "EMPTY" : "SCRAP_LIST");


useEffect(() => {


  if (!isExtension) return;

  //1. 패널 열릴 때 기존 스크랩 요청
  chrome.runtime.sendMessage(
    { type: "GET_SCRAPS" },
    (response) => {
      if (Array.isArray(response)) {
        const normalized: Scrap[] = response.map((item) => ({
          id: Date.now() + Math.random(),
          title: "스크랩",
          content: item.text,           // text → content
          source: item.source ?? "Unknown",
          createdAt: item.createdAt ?? Date.now(),
        }));

        setScraps(normalized);
        setStep(normalized.length > 0 ? "SCRAP_LIST" : "EMPTY");
      }
    }
  );
  //2. 실시간 수신
  const listener = (message: unknown) => {
    if (isScrapUpdatedMessage(message)) {
      const newScrap: Scrap = {
        id: Date.now(),
        title: "스크랩",
        content: message.payload.text,
        source: message.payload.source ?? "Unknown",
        createdAt: message.payload.createdAt ?? Date.now(),
      };

      setScraps((prev) => [...prev, newScrap]);
      setStep("SCRAP_LIST");
    }

  };

  chrome.runtime.onMessage.addListener(listener);
  return () => chrome.runtime.onMessage.removeListener(listener);
} , []);


  //step에 따른 메인 콘텐츠 렌더링
  const renderContent = () => {
    switch (step) {
      case "EMPTY":
        return (
          <div className="center">
            <GuideBox />
            <p className="empty-text">아직 스크랩이 없습니다</p>
          </div>
        );

      case "SCRAP_LIST":
        return (
          <ScrapList
            scraps={scraps}
            setScraps={setScraps}
          />
        );

      case "PROJECT_SETTING":
        return(
          <ProjectSetting 
            onBack={() => setStep("SCRAP_LIST")}
            onNext={() => setStep("SAVE_DONE")}/>
        );

      case "SAVE_DONE":
        return <div>저장 완료 🎉</div>;

      default:
        return null;
    }
  };

  //Bottom 버튼
  const handleBottomAction = () => {
    if (step === "SCRAP_LIST") {
      setStep("PROJECT_SETTING");
      return;
    }

    if (step === "PROJECT_SETTING") {
      setStep("SAVE_DONE");
      return;
    }
  };


  //스크랩 모두 지우기 
  const handleClearScrap = () => {
    setScraps([]);
    setStep(isExtension ? "EMPTY" : "SCRAP_LIST");
  };

  //이전 페이지로 돌아가기 
  const handleBack = () => {
    if (step === "PROJECT_SETTING") {
      setStep("SCRAP_LIST");
      return;
    }
    if (step === "SAVE_DONE") {
      setStep("PROJECT_SETTING");
      return;
    }
  };

  return (
    <>
      {/* Top */}
      <Top />

      <Notice scrapCount={scrapCount} />

      {/* 중앙 */}
      <main className="app-main">
        {renderContent()}
      </main>

      {/* Bottom */}
      <Bottom
        step={step}
        scrapCount={scrapCount}
        onAction={handleBottomAction}
        onClear={handleClearScrap}
        onBack={handleBack}
      />
    </>
  );
}
