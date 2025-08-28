import { API_BASE } from "@/app/constants";
import { VulnInfo } from "@/types/Reports.dto";

export async function fetchVuln(name: string): Promise<VulnInfo> {
  const res = await fetch(
    `${API_BASE}/vulners?Name=${encodeURIComponent(name)}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Ошибка загрузки уязвимости: ${res.status}`);
  }
  return res.json();
}
