
import { useEffect, useState } from "react";
import "./App.css";

import Notice from "../components/UI/Notice/Notice";
import Bottom from "../components/Layout/Bottom/Bottom";
import Top from "../components/Layout/Top/Top";
import ProjectSetting from "../Pages/ProjectSetting/ProjectSetting";

import ScrapList from "../Pages/ScrapList";
import type { Scrap } from "../types/scrap";
import Empty from "../components/UI/Empty/Empty";
import Save from "../Pages/Save";

import NoticeScrapCount from "../components/UI/Notice/NoticeScrapCount";
import GuideText from "../components/UI/Notice/GuideText";


//환경 플래그 (웹에서 f12로 스타일을 수정하기 위한)
const isExtension =
  typeof chrome !== "undefined" &&
  !!chrome?.runtime;



interface RawScrapPayload {
  text: string;
  source?: string;
  url?: string;
  createdAt?: number;
}

// 화면 단계
type Step =
  | "EMPTY"
  | "SCRAP_LIST"
  | "PROJECT_SETTING"
  | "SAVE";

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

  //자장
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [projectName, setProjectName] = useState("Capstone Design");
  const [workStep, setWorkStep] = useState("기획");

  //ScrapId
  const [currentScrapId, setCurrentScrapId] = useState<number | null>(null);

  //제목 입력 안 하면 다음으로 안 넘어가게
  const canGoNext = title.trim() !== "";

  //3초간 버튼 비활성화 
  const [isProcessingScrap, setIsProcessingScrap] = useState(false);

  useEffect(() => {

    //확장프로그램이 아닌 웹에서 수정된 걸 볼 때 쓰는 용도
    if (!isExtension) return;

    //1. 패널 열릴 때 기존 스크랩 요청
    chrome?.runtime?.sendMessage?.(
      { type: "GET_SCRAPS" },
      (response) => {
        if (Array.isArray(response)) {
          const normalized: Scrap[] = response.map((item, index) => ({
            id: index+1,
            texts: [item.text],           // text → content
            meta:{
              source: item.source ?? "Unknown",
              url: item.url
            },

            createdAt: item.createdAt ?? Date.now(),
          }));

          setScraps(normalized);
          setStep(normalized.length > 0 ? "SCRAP_LIST" : "EMPTY");
        }
      }
    );

    //2. 실시간 수신
    const listener = (message: unknown) => {
      if (!isScrapUpdatedMessage(message)) return;

      setScraps((prev) => {

        // 묶음이 아직 없으면 새로 생성
        if (currentScrapId === null) {
          const id = Date.now();
          setCurrentScrapId(id);

          return [
            ...prev,
            {
              id,
              texts: [message.payload.text],
              meta: {
                source: message.payload.source ?? "Unknown",
                url: message.payload.url,
              },
              createdAt: Date.now(),
            },
          ];
        }

        //이미 묶음이 있으면 texts에 추가
        return prev.map((scrap) =>
          scrap.id === currentScrapId
            ? { ...scrap, texts: [...scrap.texts, message.payload.text] }
            : scrap
        );
      })
        setStep("SCRAP_LIST");
      }

    chrome?.runtime?.onMessage?.addListener(listener);
    return () => chrome?.runtime?.onMessage?.removeListener(listener);
  } , []);

  const handleFinalSave = () => {

    setCurrentScrapId(null)

    // TODO: chrome.storage / localStorage 저장
    console.log("저장됨:", {
      title,
      memo,
      projectName,
      workStep,
      scraps,
    });

    // 저장 후 초기화
    setScraps([]);
    setTitle("제목을 입력해주세요");
    setMemo("이 스크랩에 대해 설명을 추가해 보세요");
    setProjectName("Capstone Design");
    setWorkStep("기획");

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

 

  //Bottom 버튼 Action
  const goNext = () => {
    if (step === "SCRAP_LIST") {
      setIsProcessingScrap(true);

      setTimeout(() => {
        setIsProcessingScrap(false);
        setStep("PROJECT_SETTING");
      }, 3000)

      return;
    }
    if (step === "PROJECT_SETTING") {
      setStep("SAVE");
      return;
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
    setStep(isExtension ? "EMPTY" : "SCRAP_LIST");
  };


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
