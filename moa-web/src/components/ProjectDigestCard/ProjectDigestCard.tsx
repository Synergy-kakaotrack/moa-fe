'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import type { ProjectDigest } from '@/domain/digest';
import IconRefresh from '@/components/icons/IconRefresh';
import PromptSettingModal from './PromptSettingModal';
import styles from './ProjectDigestCard.module.css';

interface Props {
  digest: ProjectDigest;
  onRefresh?: (prompt?: string | null) => void;
  isRefreshing?: boolean;
  savedPrompt?: string | null;
}

export default function ProjectDigestCard({
  digest,
  onRefresh,
  isRefreshing = false,
  savedPrompt = null,
}: Props) {
  const { meta } = digest;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderedHtml = useMemo(() => {
    if (!digest.digest) return null;
    const html = marked.parse(digest.digest, { async: false }) as string;
    if (typeof window === 'undefined') return html;
    return DOMPurify.sanitize(html);
  }, [digest.digest]);

  const canRefresh = meta.outdated || (!meta.exists && !!meta.latestScrapCapturedAt);
  const hasContent = meta.exists && digest.digest;

  const handlePromptSubmit = (prompt: string | null) => {
    setIsModalOpen(false);
    if (onRefresh) {
      onRefresh(prompt);
    }
  };

  return (
    <article className={clsx(styles.card, isRefreshing && styles.cardLoading)}>
      {/* Loading Overlay */}
      {isRefreshing && <div className={styles.loadingOverlay} />}

      {/* Content */}
      <div className={styles.content}>
        {/* Header with Title and Buttons */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h2 className={styles.title}>{digest.projectName} 요약</h2>
            {digest.kind === 'CUSTOM' && (
              <span className={styles.customBadge}>커스텀</span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            {/* Prompt Setting Button */}
            <button
              className={styles.settingButton}
              onClick={() => setIsModalOpen(true)}
              disabled={isRefreshing}
              title="요약 프롬프트 설정"
            >
              <SettingIcon />
            </button>

            {/* Refresh Button */}
            <button
              className={clsx(
                styles.refreshButton,
                canRefresh && styles.active,
                isRefreshing && styles.loading
              )}
              onClick={() => {
                if (!isRefreshing && canRefresh && onRefresh) {
                  onRefresh(savedPrompt);
                }
              }}
              disabled={!canRefresh || isRefreshing}
              title={
                meta.outdated
                  ? '새 스크랩이 추가되었습니다. 클릭하여 요약을 갱신하세요.'
                  : !meta.exists
                  ? '클릭하여 AI 요약을 생성하세요.'
                  : '요약이 최신 상태입니다.'
              }
            >
              <IconRefresh className={styles.refreshIcon} size={16} />
              {meta.outdated && !isRefreshing && <span className={styles.badge} />}
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className={styles.scrollInner}>
          {hasContent ? (
            <div
              className={styles.markdown}
              dangerouslySetInnerHTML={{ __html: renderedHtml! }}
            />
          ) : (
            <div className={styles.empty}>
              <AiIcon />
              <p className={styles.emptyText}>
                {meta.latestScrapCapturedAt
                  ? 'AI 요약을 생성해보세요'
                  : '스크랩이 없습니다'}
              </p>
              {meta.latestScrapCapturedAt && (
                <p className={styles.emptyHint}>
                  상단 새로고침 버튼을 눌러 프로젝트 전체 스크랩을 요약할 수 있습니다
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {meta.updatedAt && (
        <footer className={styles.footer}>
          <time className={styles.updatedAt}>
            마지막 요약: {new Date(meta.updatedAt).toLocaleString('ko-KR')}
          </time>
          {meta.refresh?.status === 'FAILED' && (
            <span className={styles.errorMessage}>
              요약 갱신 실패: {meta.refresh.message}
            </span>
          )}
        </footer>
      )}

      {/* Prompt Setting Modal */}
      <PromptSettingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePromptSubmit}
        initialPrompt={savedPrompt}
        isLoading={isRefreshing}
        canRefresh={canRefresh}
      />
    </article>
  );
}

function AiIcon() {
  return (
    <svg
      className={styles.aiIcon}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="m4.93 4.93 2.83 2.83" />
      <path d="m16.24 16.24 2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="m16.24 7.76 2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function SettingIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
