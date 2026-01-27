// src/api/index.ts

// NOTE: API 모듈을 한 곳에서 재노출(re-export)해서 import 경로를 단순화합니다.
// NOTE: 프로젝트에서 "@/api"로 한번에 가져오고 싶을 때 사용합니다.

export * from "./http";
export * from "./projects";
export * from "./scraps";
