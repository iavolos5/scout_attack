import TopIPsList from "../components/TopIPsList/TopIPsList";
import VulnerabilitiesBlock from "../components/VulnerabilitiesBlock/VulnerabilitiesBlock";
import VulnerabilitiesPieChart from "../components/VulnerabilitiesPieChart/VulnerabilitiesPieChart";
import styles from "./DashboardPage.module.scss";

const MOCK_DATA = {
  lastScanDate: "07.08.2025 10:25",
  topIPs: [
    { ip: "192.168.1.10", vulnerabilityCount: 2 },
    { ip: "192.168.1.11", vulnerabilityCount: 5 },
    { ip: "192.168.1.12", vulnerabilityCount: 0 },
  ],
  vulnerabilities: {
    critical: { count: 5, delta: "+1" },
    high: { count: 0, delta: "0" }, // Добавлено
    medium: { count: 1, delta: "-1" },
    low: { count: 0, delta: "0" },
  },
  chartData: {
    labels: ["Критичные", "Средние", "Низкие"],
    data: [5, 1, 0],
  },
};

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <section>
        <VulnerabilitiesBlock
          vulnerabilities={MOCK_DATA.vulnerabilities}
          lastScanDate={MOCK_DATA.lastScanDate}
        />
        <div className={styles.flexRow}>
          <VulnerabilitiesPieChart
            labels={MOCK_DATA.chartData.labels}
            data={MOCK_DATA.chartData.data}
          />
          <TopIPsList topIPs={MOCK_DATA.topIPs} />
        </div>
      </section>
    </div>
  );
}
