"use client";
import { useEffect, useState } from "react";
import { Button, message, Spin, Typography } from "antd";
import styles from "./ReportsPage.module.scss";
import LastScanCard from "../components/LastScanCard/LastScanCard";
import PreviousScansCard from "../components/PreviousScansCard/PreviousScansCard";
import HostVulnerabilitiesCard from "../components/HostsVulnerabilitiesCard/HostsVulnerabilitiesCard";
import { CompareReportsResponse } from "@/types/Reports.dto";
import {
  fetchReportsData,
  compareReports,
  downloadReport,
} from "@/api/reports.api";
import { DownloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ReportsPage() {
  const [data, setData] = useState<CompareReportsResponse | null>(null);
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const reportsData = await fetchReportsData();
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

  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const blob = await downloadReport();

      // генерим имя файла
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf"; // или имя с сервера
      document.body.appendChild(a);
      a.click();
      setTimeout(() => a.remove(), 0); // безопаснее
      window.URL.revokeObjectURL(url);

      message.success("Отчёт успешно скачан");
    } catch (err) {
      console.error(err);
      message.error("Ошибка при скачивании отчёта");
    } finally {
      setDownloading(false);
    }
  };

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
        <div className={styles.header}>
          <Title level={2}>Результаты сканирований</Title>
          <div className={styles.header}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? <Spin size="small" /> : "Скачать отчёт"}
            </Button>
          </div>
        </div>
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
