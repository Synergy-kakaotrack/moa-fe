// src/api/http.ts

// NOTE: fetch 공통 래퍼 파일
// NOTE: 모든 API 호출은 이 request()를 통해 나가도록 통일합니다.

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

// NOTE: .env.local의 NEXT_PUBLIC_API_BASE_URL을 읽어 baseUrl로 사용
// NOTE: 직접 호출 기본값(필요시 환경변수로 덮어씀)
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";
const userId = process.env.NEXT_PUBLIC_DEV_USER_ID ?? "1";

// NOTE: 토큰을 localStorage에 저장하는 정책이라면 여기서 꺼내서 Authorization 헤더에 붙입니다.
// NOTE: 서버 컴포넌트에서는 localStorage 접근이 불가하므로 window 체크가 필요합니다.
function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

// NOTE: 공통 요청 함수
// NOTE: - JSON 요청/응답 처리
// NOTE: - 에러(비정상 status)면 throw
// NOTE: - 204 No Content 대응
export async function request<T>(
  path: string,
  method: HttpMethod,
  options?: {
    body?: unknown;
    headers?: Record<string, string>;
    signal?: AbortSignal;
  }
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-User-Id": userId,
    ...(options?.headers ?? {}),
  };


  // NOTE: GET은 body를 보내지 않습니다.
  const hasBody = options?.body !== undefined && method !== "GET";

  // NOTE: body가 있을 때만 JSON Content-Type 지정
  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }

  // NOTE: 토큰이 있으면 Authorization 헤더 자동 첨부
  const token = getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: hasBody ? JSON.stringify(options?.body) : undefined,
    signal: options?.signal,
  });

  // NOTE: 204는 응답 바디가 없음
  if (res.status === 204) {
    return undefined as T;
  }

  // NOTE: 응답이 JSON인지 확인
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  // NOTE: JSON이면 json()로, 아니면 text()로 읽기
  const payload = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => "");

  // NOTE: HTTP status가 정상 범위가 아니면 에러 throw
  if (!res.ok) {
    const message =
      typeof payload === "string" ? payload : JSON.stringify(payload);

    throw new Error(`API Error ${res.status}: ${message}`);
  }

  return payload as T;
}
