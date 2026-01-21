import { Scrap } from '../../src/api/types/scrap';
interface Props {
  scrap: Scrap;
}

export default function ScrapCard({ scrap }: Props) {
  return (
    <article
      style={{
        padding: 16,
        borderRadius: 12,
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* stage */}
      <span style={{ fontSize: 12, color: '#5D9FFD' }}>
        {scrap.stage}
      </span>

      {/* title */}
      <h3 style={{ fontSize: 16, fontWeight: 600 }}>
        {scrap.subtitle}
      </h3>

      {/* preview */}
      {scrap.memo && (
        <p
          style={{
            fontSize: 14,
            color: '#555',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {scrap.memo}
        </p>
      )}

      {/* date */}
      <time
        style={{
          fontSize: 12,
          color: '#999',
          marginTop: 'auto',
        }}
      >
        {new Date(scrap.capturedAt).toLocaleDateString()}
      </time>
    </article>
  );
}
