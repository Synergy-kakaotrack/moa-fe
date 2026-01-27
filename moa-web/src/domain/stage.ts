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
