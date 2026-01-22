//공통 타입 

//ISO-8601 UTC datetime string
export type ISODateTime = string;

//AI 출처 
export type AISource =
  | "CHATGPT"
  | "CLAUDE"
  | "GEMINI";

//작업 단계 
export type Stage =
  | "기획"
  | "설계"
  | "구현"
  | "테스트"
  | "배포";

//Cursor pagination 응답
export interface CursorResponse<T> {
  items: T[];
  nextCursor?: string;
}
