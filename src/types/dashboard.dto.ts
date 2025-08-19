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

export interface DashboardData {
  lastScanDate: string;
  topIPs: { ip: string; vulnerabilityCount: number }[];
  vulnerabilities: Partial<VulnerabilitiesData>; // с API может прийти не всё
  chartData: {
    data: Record<string, string>;
  };
}

export type TopIP = {
  ip: string;
  vulnerabilityCount: number;
};
