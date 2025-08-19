"use client";
import { useEffect, useState } from "react";
import TopIPsList from "../components/TopIPsList/TopIPsList";
import VulnerabilitiesBlock from "../components/VulnerabilitiesBlock/VulnerabilitiesBlock";
import VulnerabilitiesPieChart from "../components/VulnerabilitiesPieChart/VulnerabilitiesPieChart";
import styles from "./DashboardPage.module.scss";
import { fetchDashboardData } from "@/api/dashboard.api";
import { Spin } from "antd";

type Vulnerability = {
  count: number;
  delta: string;
};

type VulnerabilitiesData = {
  critical: Vulnerability;
  high: Vulnerability;
  medium: Vulnerability;
  low: Vulnerability;
};

interface DashboardData {
  lastScanDate: string;
  topIPs: { ip: string; vulnerabilityCount: number }[];
  vulnerabilities: Partial<VulnerabilitiesData>; // с API может прийти не всё
  chartData: {
    data: Record<string, string>;
  };
}

// нормализация (подставляем дефолтные значения для отсутствующих полей)
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

  const chartLabels = Object.keys(data.chartData.data);
  const chartValues = Object.values(data.chartData.data).map(Number);

  return (
    <div className={styles.dashboard}>
      <section>
        <VulnerabilitiesBlock
          vulnerabilities={data.vulnerabilities as VulnerabilitiesData}
          lastScanDate={data.lastScanDate}
        />
        <div className={styles.flexRow}>
          <VulnerabilitiesPieChart labels={chartLabels} data={chartValues} />
          <TopIPsList topIPs={data.topIPs} />
        </div>
      </section>
    </div>
  );
}
