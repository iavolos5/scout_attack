import { API_BASE } from "@/app/constants";
import { AlikeDomain } from "@/types/alike.dto";

export async function fetchAlike(): Promise<AlikeDomain[]> {
  const res = await fetch(`${API_BASE}/alike`, {
    method: "get",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Ошибка загрузки alike: ${res.status}`);
  }
  return res.json();
}
