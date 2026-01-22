
const API_BASE = "http://localhost:8000/api";

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": "1", // TODO: 나중에 auth로 교체
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    if (res.status === 204) {
      return null as T;
    }
    const error = await res.json().catch(() => ({}));
    throw error;
  }

  return res.json();
}
