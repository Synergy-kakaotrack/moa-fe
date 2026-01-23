// src/constants/stages.ts
export type StageKey =
  | 'PLAN'
  | 'RESEARCH'
  | 'DESIGN'
  | 'IMPLEMENT'
  | 'TEST'
  | 'ETC';

export interface Stage {
  key: StageKey;
  name: string;
  order: number;
}

export const stages: Stage[] = [
  { key: 'PLAN', name: '기획', order: 1 },
  { key: 'RESEARCH', name: '조사·분석', order: 2 },
  { key: 'DESIGN', name: '설계', order: 3 },
  { key: 'IMPLEMENT', name: '구현', order: 4 },
  { key: 'TEST', name: '테스트', order: 5 },
  { key: 'ETC', name: '기타', order: 6 },
];
