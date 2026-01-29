// src/constants/stages.ts
import { Stage } from '@/domain/stage';

export const stages: Stage[] = [
  { key: 'PLAN', name: '기획', order: 1 },
  { key: 'RESEARCH', name: '조사&분석', order: 2 },
  { key: 'DESIGN', name: '설계', order: 3 },
  { key: 'IMPLEMENT', name: '구현', order: 4 },
  { key: 'TEST', name: '테스트', order: 5 },
  { key: 'ETC', name: '기타', order: 6 },
];

export type {Stage};