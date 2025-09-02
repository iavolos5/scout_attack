// Одна категория уязвимостей
export type Vulnerability = {
  count: number;
  delta: string;
};

// Все категории уязвимостей
export type VulnerabilitiesData = {
  critical: Vulnerability;
  high: Vulnerability;
  medium: Vulnerability;
  low: Vulnerability;
};

// Топ IP с детализацией по уровням
export type TopIP = {
  ip: string;
  vulnerabilityCount: number;
  Critical: string;
  Medium: string;
  Low: string;
};

// Общий ответ дашбоарда
export interface DashboardData {
  companyName: string; // название компании
  lastScanDate: string; // дата последнего сканирования

  // Метрики
  alikeDomainsCount: number;
  emailsCount: number;
  compromisedEmailsCount: number;
  totalIPsCount: number;
  vulnerableIPsCount: number;
  oldEncIPsCount: number;
  sslCount: number;
  expiredSSLCount: number;
  expiringSSLCount: number;
  foreignDomainsSSLCount: number;

  // Основные данные
  topIPs: TopIP[];
  vulnerabilities: Partial<VulnerabilitiesData>; // может прийти не всё
  chartData: Record<string, string>; // { "Critical": "23", ... }
}
