
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiClient<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-User-Id": "1", // TODO: 나중에 auth로 교체
      ...(options.headers ?? {}),
    },
  });

  if (res.status === 204) {
    return null as T;
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error;
  }

  return res.json();
}
