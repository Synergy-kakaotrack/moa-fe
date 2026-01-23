// api/scraps.ts
import { ScrapListResponse } from './types/scrap';
import { mockScraps } from '@/mocks/scraps';

export async function getScraps(): Promise<ScrapListResponse> {
  return { items: mockScraps };
}