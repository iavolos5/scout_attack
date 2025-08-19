const API_BASE = "https://83.220.170.171";

export async function fetchProfileData() {
  const res = await fetch(`${API_BASE}/profile`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Ошибка загрузки профиля: ${res.status}`);
  }

  return res.json();
}
