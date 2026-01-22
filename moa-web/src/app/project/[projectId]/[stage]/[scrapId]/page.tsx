import { notFound } from 'next/navigation';

import { mockScraps } from '@/mocks/scrapDetail';
import { mockProjects } from '@/mocks/projects';

import { mapScrapDetailFromMock } from '@/api/mappers/mapScrapDetailFromMock';
import { mapProjectFromMock } from '@/api/mappers/mapProjectFromMock';

import type { ScrapDetail } from '@/domain/scrap';


/* ================= Page ================= */

export default async function ScrapDetailPage({
  params,
}: {
  params: Promise<{ scrapId: string }>;
}) {
  const { scrapId } = await params;
  const numericScrapId = Number(scrapId);

  if (Number.isNaN(numericScrapId)) {
    notFound();
  }

  /**
   * 1️⃣ scrap 단일 조회 (진실 소스)
   */
  const mock = mockScraps.find(
    (s) => s.scrapId === numericScrapId
  );

  if (!mock) {
    notFound();
  }

  /**
   * 2️⃣ DTO → Domain
   */
  const scrap: ScrapDetail = mapScrapDetailFromMock(mock);

  /**
   * 3️⃣ 프로젝트 정보 (표시용)
   */
  const project = mockProjects
    .map(mapProjectFromMock)
    .find((p) => p.projectId === scrap.projectId);

  return (
    <article
      style={{
        maxWidth: 760,
        margin: '0 auto',
        paddingBottom: 120,
      }}
    >
      <ScrapContextHeader
        projectName={project?.name ?? '프로젝트'}
        stageName={scrap.stageName}
      />

      <ScrapMeta scrap={scrap} />

      <ScrapHighlight content={scrap.memo} />

      <ScrapBody
        content={scrap.content}
        contentType={scrap.contentType}
      />
    </article>
  );
}

/* ================= Components ================= */

function ScrapContextHeader({
  projectName,
  stageName,
}: {
  projectName: string;
  stageName: string;
}) {
  return (
    <div
      style={{
        fontSize: 13,
        color: '#8a8a8a',
        marginBottom: 12,
      }}
    >
      {projectName} / {stageName}
    </div>
  );
}

function ScrapMeta({ scrap }: { scrap: ScrapDetail }) {
  return (
    <header style={{ marginBottom: 24 }}>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {scrap.subtitle}
      </h1>

      <div
        style={{
          display: 'flex',
          gap: 12,
          fontSize: 13,
          color: '#666',
        }}
      >
        <a
          href={scrap.aiSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          원문 링크
        </a>
        <span>{scrap.agent}</span>
        <span>
          {new Date(scrap.capturedAt).toLocaleString()}
        </span>
      </div>
    </header>
  );
}

function ScrapHighlight({
  content,
}: {
  content?: string | null;
}) {
  if (!content) return null;

  return (
    <section
      style={{
        padding: 20,
        borderRadius: 12,
        background:
          'linear-gradient(135deg, #e8f0ff, #f7faff)',
        marginBottom: 32,
        fontSize: 14,
        lineHeight: 1.6,
      }}
    >
      {content}
    </section>
  );
}

function ScrapBody({
  content,
  contentType,
}: {
  content: string;
  contentType: 'markdown' | 'html';
}) {
  return (
    <section>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          lineHeight: 1.7,
          fontSize: 14,
        }}
      >
        {content}
      </pre>
    </section>
  );
}
