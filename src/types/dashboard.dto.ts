export type Vulnerability = {
  count: number;
  delta: string;
};

export type VulnerabilitiesData = {
  critical: Vulnerability;
  high: Vulnerability;
  medium: Vulnerability;
  low: Vulnerability;
};

// топ IP теперь с детализацией
export type TopIP = {
  ip: string;
  vulnerabilityCount: number;
  Critical: string;
  Medium: string;
  Low: string;
};

export interface DashboardData {
  lastScanDate: string;
  topIPs: TopIP[];
  vulnerabilities: Partial<VulnerabilitiesData>; // может прийти не всё
  chartData: Record<string, string>; // раньше был { data: {...} }
}
