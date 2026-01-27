//화면 상단 Notice 컴포넌트 

import type React from "react";
import "./Notice.css";

// 스크랩 안내에 사용될 서비스 링크 목록


interface NoticeProps {
  children: React.ReactNode;
}

// 화면 상단 Notice 컴포넌트
export default function Notice({ children }: NoticeProps) {
  return (
    <div className="notice">
      {children}
    </div>
  );
}
