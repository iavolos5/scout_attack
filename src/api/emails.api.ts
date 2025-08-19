import { API_BASE } from "@/app/constants";

export async function fetchEmails() {
  const res = await fetch(`${API_BASE}/emails`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Не удалось загрузить emails");
  return res.json();
}
