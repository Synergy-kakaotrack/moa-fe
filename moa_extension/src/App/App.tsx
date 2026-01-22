
import { useEffect, useState } from "react";
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



interface RawScrapPayload {
  text: string;
  source?: string;
  url?: string;
  createdAt?: number;
}

// 화면 단계
type Step = "EMPTY" | "SCRAP_LIST" | "PROJECT_SETTING" | "SAVE";

interface ScrapUpdatedMessage {
  type: "SCRAP_UPDATED";
  payload: RawScrapPayload;
}

function isScrapUpdatedMessage(
  message: unknown
): message is ScrapUpdatedMessage {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as {type: string}).type === "SCRAP_UPDATED"
  );
}


export default function App() {

  const initialUIDraft = getUIDraft();

  // 스크랩 리스트
  const [scraps, setScraps] = useState<Scrap[]>(initialUIDraft?.scraps ?? []);

  // 스크랩 개수
  const scrapCount = scraps.length;

  const [step, setStep] = useState<Step>(initialUIDraft?.step ?? "EMPTY");

  //프로젝트 세팅 
  const [title, setTitle] = useState(initialUIDraft?.title ?? "");
  const [memo, setMemo] = useState(initialUIDraft?.memo ?? "");
  const [projectName, setProjectName] = useState(initialUIDraft?.projectName ??"Capstone Design");
  const [workStep, setWorkStep] = useState(initialUIDraft?.workStep ?? "기획");

  //ScrapId
  const [currentScrapId, setCurrentScrapId] = useState<number | null>(null);

  //제목 입력 안 하면 다음으로 안 넘어가게
  const canGoNext = title.trim() !== "";

  //3초간 버튼 비활성화 
  const [isProcessingScrap, setIsProcessingScrap] = useState(false);

  //사이드패널 열릴 때 기존 스크랩 조회  
  useEffect(() => {
    // UI Draft가 있으면 background에서 다시 안 가져옴
    if (initialUIDraft) return;

    chrome.runtime.sendMessage(
      { type: "GET_SCRAPS" },
      (response) => {
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
      }
    );
  }, []);

  //실시간 scrap_updated 수신 
  useEffect(() => {
    const listener = (message: unknown) => {
      if (!isScrapUpdatedMessage(message)) return;

      setScraps((prev) => {
        if (currentScrapId === null) {
          const id = Date.now();
          setCurrentScrapId(id);

          return [
            ...prev,
            {
              id,
              texts: [message.payload.text],
              meta: {
                source: detectAISource(message.payload.url),
                url: message.payload.url,
              },
              createdAt: Date.now(),
              status: "DRAFT",
            },
          ];
        }

        return prev.map((scrap) =>
          scrap.id === currentScrapId
            ? {
                ...scrap,
                texts: [...scrap.texts, message.payload.text],
              }
            : scrap
        );
      });

      setStep("SCRAP_LIST");
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [currentScrapId])


  //UI Draft 자동 저장 
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
  } , [step, projectName, workStep, title, memo, scraps]);

  //핸들러 
  const handleFinalSave = async () => {
    try {
      chrome.runtime.sendMessage({type: "CLEAR_SCRAPS"});

      // 성공했다고 가정하고 로컬 정리
      clearUIDraft();
      clearScraps();

      setCurrentScrapId(null);
      setScraps([]);
      setStep("EMPTY");
    } catch {
      alert("저장에 실패했습니다.");
    }
  };

  //Bottom 버튼 Action
  const goNext = () => {
    if (step === "SCRAP_LIST") {
      setIsProcessingScrap(true);
      setTimeout(() => {
        setIsProcessingScrap(false);
        setStep("PROJECT_SETTING");
      }, 300);
      return;
      }
    if (step === "PROJECT_SETTING") {
      setStep("SAVE");
    }
  }; //다음

  const goBack = () => {
    if (step === "PROJECT_SETTING") {
      setStep("SCRAP_LIST");
      return;
    }
    if (step === "SAVE") {
      setStep("PROJECT_SETTING");
      return;
    }
  }; //돌아가기



  //스크랩 모두 지우기 버튼
  const handleClearScrap = () => {
    setScraps([]);
    setCurrentScrapId(null)
    setStep("EMPTY");
  };

  //step에 따른 메인 콘텐츠 렌더링
  const renderContent = () => {
    switch (step) {
      case "EMPTY":
        return (
          <div className="empty-wrapper">
            <Empty />
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
            onNext={() => setStep("SAVE")}/>
        );

      case "SAVE":
        return(
          <Save
            scraps={scraps}
            title={title}
            memo={memo}
            projectName={projectName}
            workStep={workStep}
            onBack={() => setStep("PROJECT_SETTING")}
            onSave={handleFinalSave}/>
        )

      default:
        return null;
    }
  };

  //Step에 따른 Notice 문구 변경
  const showGuideText =
  step === "EMPTY" || step === "SCRAP_LIST";

  const renderNotice = () => (
    <Notice>
      <NoticeScrapCount count={scrapCount} />
      {showGuideText && <GuideText />}
    </Notice>
  );

  return (
    <div className="app-container">
      <div className="app-top">
        {/* Top */}
        <Top />
      </div>
      
      <div className="app-main">
        {/*Notice*/}
        {renderNotice()}

        {/* 중앙 */}
        <main>
          {renderContent()}
        </main>
      </div>

      {/* Bottom */}
      <Bottom
        step={step}
        scrapCount={scrapCount}
        onAction={step==="SAVE" ? handleFinalSave : goNext}
        onClear={handleClearScrap}
        onBack={goBack}
        disabledAction={
          step === "PROJECT_SETTING"
            ? !canGoNext
            : isProcessingScrap
        }
      />
    </div>
  );
}