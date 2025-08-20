import { API_BASE } from "@/app/constants";
import { CompareReportsResponse } from "@/types/Reports.dto";

export async function fetchReportsData(): Promise<CompareReportsResponse> {
  const res = await fetch(`${API_BASE}/reports`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Ошибка загрузки отчётов: ${res.status}`);
  }
  return res.json();
}

export async function compareReports(
  firstId: number,
  secondId: number
): Promise<{ compare_reports: CompareReportsResponse["compare_reports"] }> {
  const url = `${API_BASE}/compareReports?FirstReportId=${firstId}&SecondReportId=${secondId}`;
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    throw new Error(`Ошибка сравнения отчётов: ${res.status}`);
  }
  return res.json();
}

export async function downloadReport(): Promise<Blob> {
  const res = await fetch(`${API_BASE}/reports/pdf`, {
    credentials: "include",
  });

  if (!res.ok) throw new Error("Ошибка при скачивании отчёта");

  return res.blob();
}
