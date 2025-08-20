import { SslCert } from "@/types/ssl.dto";
import { API_BASE } from "@/app/constants";

export async function fetchSsl(): Promise<SslCert[]> {
  const res = await fetch(`${API_BASE}/ssl`, { credentials: "include" });
  if (!res.ok) {
    throw new Error(`Ошибка загрузки SSL: ${res.status}`);
  }
  return res.json();
}
