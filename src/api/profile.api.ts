import { API_BASE } from "@/app/constants";

export async function fetchProfileData() {
  const res = await fetch(`${API_BASE}/profile`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Ошибка загрузки профиля: ${res.status}`);
  }

  return res.json();
}
