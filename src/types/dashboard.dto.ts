import { VULN_LEVELS } from "@/app/constants";

export type VulnLevel = (typeof VULN_LEVELS)[number];

// Одна категория уязвимостей
export type Vulnerability = {
  count: number;
  delta: string;
};

// Все категории уязвимостей (lowercase ключи)
export type VulnerabilitiesData = Record<Lowercase<VulnLevel>, Vulnerability>;

// Топ IP с детализацией по уровням (uppercase ключи)
export type TopIP = {
  ip: string;
  vulnerabilityCount: number;
} & Record<VulnLevel, string>;

// Общий ответ дашбоарда
export interface DashboardData {
  companyName: string;
  lastScanDate: string;

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
  chartData: Record<VulnLevel, string>;
}
