import "./Bottom.css";

//메인 화면의 단계
export type Step =
  | "EMPTY"
  | "SCRAP_LIST"
  | "PROJECT_SETTING"
  | "SAVE";

//버튼 설정 타입(label(문구), 클릭했을 때 액션, 비활성화 여부, 왼/오 버튼 구분)
interface ButtonConfig {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant: "primary" | "secondary";
  loading?:boolean;
}

//Bottom 컴포넌트 Props
interface BottomProps {
  step: Step;
  scrapCount?: number;

  onAction?: () => void; // 다음 / 저장 / 스크랩 완료
  onClear?: () => void;  // 모두 지우기
  onBack?: () => void;   // 돌아가기

  disabledAction?:boolean;
}

//step에 따른 버튼 구성 
function getButtonsByStep(
  step: Step,
  scrapCount?: number,
  handlers?: {
    onAction?: () => void;
    onClear?: () => void;
    onBack?: () => void;
    disabledAction?: boolean;
  }
): ButtonConfig[] {
  switch (step) {
    case "EMPTY":
      return [
        {
          label: "모두 지우기",
          onClick: handlers?.onClear ?? (() => {}),
          disabled: true,
          variant: "secondary",
        },
        {
          label: `스크랩 완료 (${scrapCount ?? 0})`,
          onClick: handlers?.onAction ?? (() => {}),
          disabled: true,
          variant: "primary",
        },
      ];

    case "SCRAP_LIST":{

      const isActive = (scrapCount ?? 0) > 0;
      const isLoading = handlers?.disabledAction === true;

      return [
        {
          label: "모두 지우기",
          onClick: handlers?.onClear ?? (() => {}),
          variant: "secondary",
        },
        {
          label: `스크랩 완료 (${scrapCount})`,
          onClick: handlers?.onAction ?? (() => {}),
          disabled: !isActive,
          variant: "primary",
          loading: isLoading,
        },
      ];
    }
    case "PROJECT_SETTING":
      return [
        {
          label: "돌아가기",
          onClick: handlers?.onBack ?? (() => {}),
          variant: "secondary",
        },
        {
          label: "다음",
          onClick: handlers?.onAction ?? (() => {}),
          disabled: handlers?.disabledAction,
          variant: "primary",
        },
      ];

    case "SAVE":
      return [
        {
          label: "돌아가기",
          onClick: handlers?.onBack ?? (() => {}),
          variant: "primary",
        },
        {
          label: "저장",
          onClick: handlers?.onAction ?? (() => {}),
          variant: "primary",
        }
      ];

    default:
      return [];
  }
}

//Bottom 컴포넌트 
export default function Bottom({
  step,
  scrapCount,
  onAction,
  onClear,
  onBack,
  disabledAction,
}: BottomProps) {
  const buttons = getButtonsByStep(step, scrapCount,{
    onAction,
    onClear,
    onBack,
    disabledAction,
  }
  );

  return (
    <footer className="bottom">
      {buttons.map((button, index) => (
        <button
          key={index}
          disabled={button.disabled}
          className={`bottom-button text-button-sm
            ${ button.variant === "primary" ? "bottom-submit" : "bottom-clear"}
            ${button.disabled ? "disabled" : ""}
            ${button.loading ? "loading" : ""}
          `}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      ))}
    </footer>
  );
}
