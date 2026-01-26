'use client';

import { useParams } from 'next/navigation';
import ScrapCard from './ScrapCard';
import { Scrap } from '@/domain/scrap';

interface Props {
  scraps: Scrap[];
}

export default function ScrapCardList({ scraps }: Props) {
  const params = useParams();
  const currentScrapId = params.scrapId ? Number(params.scrapId) : null;

  return (
    <div style={{ display: 'contents' }}>
      {scraps.map((scrap) => (
        <ScrapCard
          key={scrap.scrapId}
          scrap={scrap}
          variant="sidebar"
          isActive={scrap.scrapId === currentScrapId}
        />
      ))}
    </div>
  );
}
