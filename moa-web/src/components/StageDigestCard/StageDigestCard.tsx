'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import type { StageDigest } from '@/domain/digest';
import IconRefresh from '@/components/icons/IconRefresh';
import styles from './StageDigestCard.module.css';

interface Props {
  digest: StageDigest;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function StageDigestCard({
  digest,
  onRefresh,
  isRefreshing = false,
}: Props) {
  const { meta } = digest;

  const renderedHtml = useMemo(() => {
    if (!digest.digest) return null;
    const html = marked.parse(digest.digest, { async: false }) as string;
    if (typeof window === 'undefined') return html;
    return DOMPurify.sanitize(html);
  }, [digest.digest]);

  const canRefresh = meta.outdated || !meta.exists;
  const hasContent = meta.exists && digest.digest;

  return (
    <article className={clsx(styles.card, isRefreshing && styles.cardLoading)}>
      {/* Loading Overlay */}
      {isRefreshing && <div className={styles.loadingOverlay} />}

      {/* Content */}
      <div className={styles.content}>
        {/* Refresh Button - 스크롤과 무관하게 고정 */}
        <button
          className={clsx(
            styles.refreshButton,
            canRefresh && styles.active,
            isRefreshing && styles.loading
          )}
          onClick={() => {
            if (!isRefreshing && canRefresh && onRefresh) {
              onRefresh();
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

        {/* 스크롤 가능한 내부 영역 */}
        <div className={styles.scrollInner}>
          <div className={styles.titleRow}>
            <span className={styles.title}>
              {digest.stageName} 요약
            </span>
          </div>

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
                  상단 버튼을 눌러 이 단계의 스크랩을 요약할 수 있습니다
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
        </footer>
      )}
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
