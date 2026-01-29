'use client';

import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './PromptSettingModal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string | null) => void;
  initialPrompt?: string | null;
  isLoading?: boolean;
  /** 새로고침 가능 여부 (새 스크랩 추가됨 또는 요약 미생성) */
  canRefresh?: boolean;
}

const PROMPT_EXAMPLES = [
  '면접용으로 핵심 성과 중심으로 작성해줘',
  '기술 블로그에 올릴 형식으로 정리해줘',
  '주간 보고서 형식으로 작성해줘',
  '프로젝트 발표용 슬라이드 내용으로 요약해줘',
];

export default function PromptSettingModal({
  isOpen,
  onClose,
  onSubmit,
  initialPrompt = null,
  isLoading = false,
  canRefresh = true,
}: Props) {
  const [prompt, setPrompt] = useState(initialPrompt ?? '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 모달이 열릴 때 초기값 설정 및 포커스
  useEffect(() => {
    if (isOpen) {
      setPrompt(initialPrompt ?? '');
      // 약간의 딜레이 후 포커스
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialPrompt]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const trimmedPrompt = prompt.trim();
    onSubmit(trimmedPrompt || null);
  };

  const handleReset = () => {
    setPrompt('');
    onSubmit(null);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
    textareaRef.current?.focus();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3 className={styles.title}>요약 프롬프트 설정</h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </header>

        <div className={styles.body}>
          <p className={styles.description}>
            프로젝트 요약 시 적용할 프롬프트를 입력하세요.
            <br />
            입력하지 않으면 기본 요약이 생성됩니다.
          </p>

          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="예: 면접용으로 핵심 성과 중심으로 작성해줘"
            rows={4}
            disabled={isLoading}
          />

          <div className={styles.examples}>
            <span className={styles.examplesLabel}>예시:</span>
            <div className={styles.exampleButtons}>
              {PROMPT_EXAMPLES.map((example) => (
                <button
                  key={example}
                  className={styles.exampleButton}
                  onClick={() => handleExampleClick(example)}
                  disabled={isLoading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <button
            className={clsx(styles.button, styles.resetButton)}
            onClick={handleReset}
            disabled={isLoading || (!initialPrompt && !canRefresh)}
            title={!initialPrompt && !canRefresh ? '이미 최신 기본 요약입니다' : undefined}
          >
            기본 요약으로 생성
          </button>
          <div className={styles.footerRight}>
            <button
              className={clsx(styles.button, styles.cancelButton)}
              onClick={onClose}
              disabled={isLoading}
            >
              취소
            </button>
            <button
              className={clsx(styles.button, styles.submitButton)}
              onClick={handleSubmit}
              disabled={isLoading || (!prompt.trim() && !initialPrompt && !canRefresh)}
              title={!prompt.trim() && !initialPrompt && !canRefresh ? '프롬프트를 입력하거나 새 스크랩이 필요합니다' : undefined}
            >
              {isLoading ? '생성 중...' : '요약 생성'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
