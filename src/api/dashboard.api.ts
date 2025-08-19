import { API_BASE } from "@/app/constants";

export async function fetchDashboardData() {
  const res = await fetch(`${API_BASE}/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Ошибка авторизации: ${res?.status}`);
  }

  return res.json();
}
