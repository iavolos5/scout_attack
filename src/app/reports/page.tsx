"use client";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import styles from "./ReportsPage.module.scss";
import LastScanCard from "../components/LastScanCard/LastScanCard";
import PreviousScansCard from "../components/PreviousScansCard/PreviousScansCard";
import HostVulnerabilitiesCard from "../components/HostsVulnerabilitiesCard/HostsVulnerabilitiesCard";
import { CompareReportsResponse } from "@/types/Reports.dto";
import { fetchReports, compareReports } from "@/api/reports.api";

const { Title } = Typography;

export default function ReportsPage() {
  const [data, setData] = useState<CompareReportsResponse | null>(null);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const reportsData = await fetchReports();
      setData(reportsData);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCompare(secondId: number) {
    if (!data) return;
    try {
      const result = await compareReports(data.last_report.id, secondId);
      setData((prev) =>
        prev ? { ...prev, compare_reports: result.compare_reports } : prev
      );
    } catch (err) {
      console.error(err);
    }
  }

  function getCritColor(level: string) {
    const val = parseFloat(level);
    if (val >= 7) return styles.critical;
    if (val >= 3) return styles.medium;
    return styles.low;
  }

  if (!data) return <div>Загрузка...</div>;

  return (
    <div className={styles.reports}>
      <section>
        <Title level={2}>Результаты сканирований</Title>
        <LastScanCard data={data} />
        <PreviousScansCard
          data={data}
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
          onCompare={handleCompare}
        />
        <HostVulnerabilitiesCard data={data} getCritColor={getCritColor} />
      </section>
    </div>
  );
}
