// src/app/DashboardPage.tsx
"use client";
import { useEffect, useState } from "react";
import TopIPsList from "../components/TopIPsList/TopIPsList";
import VulnerabilitiesBlock from "../components/VulnerabilitiesBlock/VulnerabilitiesBlock";
import VulnerabilitiesPieChart from "../components/VulnerabilitiesPieChart/VulnerabilitiesPieChart";
import EmailCard from "../components/EmailCard/EmailCard";
import SSLCertCard from "../components/SSLCertCard/SSLCertCard";
import AlikeDomainsCard from "../components/AlikeDomainsCard/AlikeDomainsCard";
import styles from "./DashboardPage.module.scss";
import { fetchDashboardData } from "@/api/dashboard.api";
import { Spin } from "antd";
import { VulnerabilitiesData, DashboardData } from "@/types/dashboard.dto";

function normalizeVulnerabilities(
  vulns: Partial<VulnerabilitiesData>
): VulnerabilitiesData {
  return {
    critical: vulns.critical ?? { count: 0, delta: "0" },
    high: vulns.high ?? { count: 0, delta: "0" },
    medium: vulns.medium ?? { count: 0, delta: "0" },
    low: vulns.low ?? { count: 0, delta: "0" },
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData()
      .then((res) => {
        res.vulnerabilities = normalizeVulnerabilities(res.vulnerabilities);
        setData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <Spin size="large" className={styles.spin} />
      </div>
    );
  }
  if (!data) return <div>Ошибка загрузки данных</div>;

  const {
    vulnerabilities,
    lastScanDate,
    chartData,
    topIPs,
    emailsCount,
    compromisedEmailsCount,
    sslCount,
    foreignDomainsSSLCount,
    expiredSSLCount,
    expiringSSLCount,
    alikeDomainsCount,
  } = data;

  const chartEntries = Object.entries(chartData).filter(
    ([key]) => key !== "All"
  );
  const chartLabels = chartEntries.map(([key]) => key);
  const chartValues = chartEntries.map(([, value]) => Number(value));

  return (
    <div className={styles.dashboard}>
      <section>
        <VulnerabilitiesBlock
          vulnerabilities={vulnerabilities as VulnerabilitiesData}
          lastScanDate={lastScanDate}
        />

        <div className={styles.flexRow}>
          <VulnerabilitiesPieChart labels={chartLabels} data={chartValues} />
          <TopIPsList topIPs={topIPs} />
        </div>

        <div className={styles.flexRow}>
          <EmailCard total={emailsCount} compromised={compromisedEmailsCount} />
          <SSLCertCard
            total={sslCount}
            foreignDomains={foreignDomainsSSLCount}
            expired={expiredSSLCount}
            expiring={expiringSSLCount}
          />
          <AlikeDomainsCard total={alikeDomainsCount} />
        </div>
      </section>
    </div>
  );
}
