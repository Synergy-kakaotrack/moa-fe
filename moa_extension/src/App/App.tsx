import { useEffect, useState, useRef } from "react";
import "./App.css";

import Notice from "../components/UI/Notice/Notice";
import Bottom from "../components/Layout/Bottom/Bottom";
import Top from "../components/Layout/Top/Top";
import ProjectSetting from "../Pages/ProjectSetting/ProjectSetting";

import ScrapList from "../Pages/ScrapList";
import type { Scrap } from "../types/scrap.domain";
import type { Project } from "../types/project";
import Empty from "../components/UI/Empty/Empty";
import Save from "../Pages/Save";

import NoticeScrapCount from "../components/UI/Notice/NoticeScrapCount";
import GuideText from "../components/UI/Notice/GuideText";
import SavedNotice from "../components/UI/Notice/SavedNotice";

import { saveScrapList, clearScrapList } from "../utils/scrapStorage";
import { detectAISource } from "../utils/detectAISource";
import { saveUIDraft, getUIDraft, clearUIDraft } from "../utils/uiDraftStorage";

import { getProjects } from "../api/projectApi";
import { createDraft, commitDraft } from "../api/draftApi";

//Types
interface RawScrapPayload {
  text: string;
  source?:string;
  rawHtml?: string;
  url?: string;
  createdAt?: number;
  dragSessionId?: number;
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

// Stage 이름 → key 매핑
const stageNameToKey: Record<string, string> = {
  "기획": "PLAN",
  "조사&분석": "RESEARCH",
  "설계": "DESIGN",
  "구현": "IMPLEMENT",
  "테스트": "TEST",
  "기타": "ETC",
};

//App
export default function App() {
  const isFinalizingRef = useRef(false);

  const [draftId, setDraftId] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // scraps
  const [scraps, setScraps] = useState<Scrap[]>([]);
  const scrapCount = scraps.length;

  // step
  const getInitialStep = (): Step => {
    const draft = getUIDraft();

    if (draft?.step === "PROJECT_SETTING") {
      clearUIDraft();
      return "SCRAP_LIST";
    }

    return "EMPTY";
  };

  const [step, setStep] = useState<Step>(() => getInitialStep());

  // project info
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [projectName, setProjectName] = useState("");
  const [workStep, setWorkStep] = useState("");

  const [recProjectId, setRecProjectId] = useState<number | null>(null);
  const [recStage, setRecStage] = useState<string | null>(null);
  const [recTitle, setRecTitle] = useState<string | null>(null);

  const transitionLockRef = useRef(false);
  const [isScrapLoading, setIsScrapLoading] = useState(false);
  const [isScrapLoaded, setIsScrapLoaded] = useState(false);

  const [highlightScrapId, setHighlightScrapId] = useState<number|null>(null);
  const [savedScrapUrl, setSavedScrapUrl] = useState<string | null>(null);

  // 핵심: 현재 드래그 세션 id
  const currentScrapIdRef = useRef<number | null>(null);

  const safeTrim = (v: unknown): string =>
    typeof v === "string" ? v.trim() : "";
  const canGoNext = safeTrim(title) !== "";

  const fetchProjects = async () => {
    const res = await getProjects();
    setProjects(res.items);
  }

  //모두 지우기 - 상태리셋함수
  const resetToInitialState = () => {
    // storage
    clearScrapList();
    clearUIDraft();

    // refs
    currentScrapIdRef.current = null;
    transitionLockRef.current = false;

    // scraps
    setScraps([]);
    setHighlightScrapId(null);

    // step
    setStep("EMPTY");

    // draft / recommendation
    setDraftId(null);
    setSelectedProjectId(null);
    setRecProjectId(null);
    setRecStage(null);
    setRecTitle(null);

    // project input
    setTitle("");
    setMemo("");
    setProjectName("");
    setWorkStep("기획");

    // loading
    setIsScrapLoading(false);
  };


  /* ======================
     초기 scrap 로드
  ====================== */

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await getProjects();
        setProjects(res.items);
      } catch (e) {
        console.error("프로젝트 목록 조회 실패", e);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    chrome.storage.local.get(["scraps"], (result) => {
      const stored: Scrap[] = Array.isArray(result.scraps)
        ? result.scraps
        : [];

      setScraps(stored);
      setStep(stored.length > 0 ? "SCRAP_LIST" : "EMPTY");
      setIsScrapLoaded(true);
    });
  }, []);

  //실시간 SCRAP_UPDATED 수신
  useEffect(() => {
    const listener = (message: unknown) => {
      if (!isScrapUpdatedMessage(message)) return;

      if (step === "PROJECT_SETTING" || step === "SAVE") {
        console.log("스크랩 차단됨 - 현재 step:", step);
        return;
      }

      const { text, rawHtml, url, createdAt, dragSessionId } = message.payload;
      const source = detectAISource(url);

      let added = false;

      setScraps(prev => {
        const normalizedNew = text.trim();

        let duplicatedScrapId: number | null = null;

        const isDuplicate = prev.some(s =>
          s.texts.some(existing => {
            const normalizedExisting = existing.trim();

            const isIncluded = normalizedExisting.includes(normalizedNew);
            if (isIncluded) {
              duplicatedScrapId = s.id;
            }
            return isIncluded;
          })
        )

        if (isDuplicate) {
          if (duplicatedScrapId !== null) {
            setHighlightScrapId(duplicatedScrapId);

            // 1.5초 후 강조 해제
            setTimeout(() => {
              setHighlightScrapId(null);
            }, 1500);
          }
          return prev;
        }

        added = true;

        return [
          ...prev,
          {
            id: Date.now(),
            texts: [text],
            rawHtmls: rawHtml ? [rawHtml] : [],
            meta: { source, url },
            createdAt: createdAt ?? Date.now(),
            status: "DRAFT",
            dragSessionId: dragSessionId ?? Date.now(),
          },
        ];
      });
      setStep(prev =>
        added && prev === "EMPTY" ? "SCRAP_LIST" : prev
      );
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, [step]);

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
    const draft = getUIDraft();
    if (!draft) return;

    // 스크랩이 없으면 새 작업 → 복구 안 함
    if (
      !draft.scraps ||
      draft.scraps.length === 0 ||
      draft.step === "EMPTY"
    ) {
      return;
    }

    queueMicrotask(() => {
      setScraps(draft.scraps);
      setTitle(draft.title ?? "");
      setMemo(draft.memo ?? "");
      setProjectName(draft.projectName ?? "");
      setWorkStep(draft.workStep ?? "기획");
    });
  }, []);

  useEffect(() => {
    if (isFinalizingRef.current) return;
    if (step !== "SAVE") return;

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

  const handleCommitDraft = async () => {
    if (!draftId) {
      alert("Draft가 없습니다.");
      return;
    }
    if(!selectedProjectId){
      alert("프로젝트를 선택해주세요");
      return;
    }
    const rawHtml = scraps
      .flatMap(scrap => scrap.rawHtmls ?? [])
      .join("<hr/>");

    const response = await commitDraft(draftId, {
      projectId: selectedProjectId,
      stage: workStep,
      subtitle: title,
      memo,
      rawHtml,

      aiSource: scraps[0]?.meta.source ?? "UNKNOWN",
      aiSourceUrl: scraps[0]?.meta.url ?? "",

      userRecProject: selectedProjectId===recProjectId,
      userRecStage: workStep===recStage,
      userRecSubtitle: title===recTitle,
    });

    // 토스트 알림 표시
    const dashboardUrl = (import.meta.env.VITE_DASHBOARD_URL || "https://moa-fe-lovat.vercel.app").replace(/\/$/, "");
    const stageKey = stageNameToKey[workStep] || workStep;
    const linkUrl = response?.scrapId
      ? `${dashboardUrl}/project/${selectedProjectId}/${stageKey}/${response.scrapId}`
      : dashboardUrl;

    chrome.runtime.sendMessage({
      type: "SHOW_TOAST",
      text: "스크랩이 저장되었습니다",
      linkUrl,
    });

    // 확장 프로그램 내 저장 완료 알림 표시
    setSavedScrapUrl(linkUrl);

    resetToInitialState();
  };

  const handleScrapDone = async () => {
    if (scraps.length === 0) return;
    saveScrapList(scraps);
    //세션의 모든 드래그를 하나의 String으로 합침
    const contentPlain = scraps.flatMap(scrap => scrap.texts).join("\n\n");
    //첫번째 스크랩(AI source, url 가져오기 위함)
    const firstScrap = scraps[0];
    const res = await createDraft({
      contentPlain,
      aiSource: firstScrap.meta.source,
      aiSourceUrl: firstScrap.meta.url ?? "",
    });
    //추천값 기억 
    setRecProjectId(res.recommendation.projectId);
    setRecStage(res.recommendation.stage);
    setRecTitle(res.recommendation.subtitle);

    //추천값 적용
    setDraftId(res.draftId); //draft Id 저장
    setSelectedProjectId(res.recommendation.projectId); //추천 Project Id 저장 
    setWorkStep(res.recommendation.stage); //작업 단계 추천값
    setTitle(res.recommendation.subtitle ?? ""); //소제목 추천값

      setMemo("");

    setIsScrapLoading(false);
    transitionLockRef.current = false;
    setStep("PROJECT_SETTING");
    
  };

  const handleFinalSave = async () => {
    resetToInitialState();
  };

  const handleScrapCompleteClick = () => {
    if (transitionLockRef.current) return;

    //UI부터 즉시 바꿈
    setIsScrapLoading(true);

    //즉시 잠금 (동기)
    transitionLockRef.current = true;

    //다음 tick에서 실제 로직 실행
    requestAnimationFrame(() => {
      goNextInternal();
    });
  };

  const goNextInternal = () => {
    if (step === "SCRAP_LIST") {
      handleScrapDone(); // API + step 변경
    }

    if (step === "PROJECT_SETTING") {
      setStep("SAVE");
    }
  };

  const resetProjectInput = () => {
    setTitle("");
    setMemo("");
    setProjectName("");
    setWorkStep("기획");
  };

  const goBack = () => {
    transitionLockRef.current = false;
    setIsScrapLoading(false);
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
    if (transitionLockRef.current) return;
    resetToInitialState();
  };

  const handleDeleteScrap = (scrapId: number) => {
    setScraps((prev) => {
      const nextScraps = prev.filter(
        (scrap) => scrap.id !== scrapId
      );

      if (nextScraps.length === 0) {
        resetToInitialState(); // 로컬 + UI + 상태 전부 초기화
        return [];
      }

      return nextScraps;
    });
  };


  //render 
  const displayProjectName =
    projects.find(p => p.projectId === selectedProjectId)?.name
    ?? projectName;

  const renderContent = () => {
    switch (step) {
      case "EMPTY":
        return <Empty />;

      case "SCRAP_LIST":
        return <ScrapList
                  scraps={scraps}
                  setScraps={setScraps}
                  highlightScrapId={highlightScrapId}
                  onDelete={handleDeleteScrap}
                  disabled={isScrapLoading}
                  />;

      case "PROJECT_SETTING":
        return (
          <ProjectSetting
            scraps={scraps}
            projects={projects}

            setProjectName={setProjectName}
            fetchProjects={fetchProjects}

            workStep={workStep}
            setWorkStep={setWorkStep}
            recStage={recStage}

            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            recProjectId={recProjectId}

            title={title}
            setTitle={setTitle}
            recTitle={recTitle}

            memo={memo}
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
            projectName={displayProjectName}
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

  if (!isScrapLoaded) {
    return null; // 또는 로딩 스켈레톤
  }
  return (
    <div className="app-container">
      <Top />

      <div className="app-main">
        {savedScrapUrl && step === "EMPTY" ? (
          <SavedNotice linkUrl={savedScrapUrl} />
        ) : (
          <Notice>
            <NoticeScrapCount count={scrapCount} />
            {showGuideText && <GuideText />}
          </Notice>
        )}

        <main>{renderContent()}</main>
      </div>

      <Bottom
        step={step}
        scrapCount={scrapCount}
        onAction={
          step === "SAVE"
            ? handleCommitDraft
            : handleScrapCompleteClick
        }
        onClear={handleClearScrap}
        onBack={goBack}
        disabledAction={
          step === "SCRAP_LIST"
          ? isScrapLoading
          : step === "PROJECT_SETTING"
            ? !canGoNext
            : false
        }
      />
    </div>
  );
}
