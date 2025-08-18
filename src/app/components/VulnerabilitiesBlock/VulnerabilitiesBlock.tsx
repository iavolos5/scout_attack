import React from "react";
import styles from "./VulnerabilitiesBlock.module.scss";
import VulnerabilityItem from "./VulnerabilityItem";

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

type Props = {
  vulnerabilities: VulnerabilitiesData;
  lastScanDate: string;
};

// массив категорий
const vulnerabilityLevels = [
  { label: "Критичные", key: "critical", colorClass: styles.critical },
  { label: "Высокие", key: "high", colorClass: styles.high },
  { label: "Средние", key: "medium", colorClass: styles.medium },
  { label: "Низкие", key: "low", colorClass: styles.low },
];

const VulnerabilitiesBlock: React.FC<Props> = ({
  vulnerabilities,
  lastScanDate,
}) => {
  const vulnerabilityLevelsComponents = vulnerabilityLevels.map(
    ({ label, key, colorClass }) => {
      const data = vulnerabilities[key as keyof VulnerabilitiesData];
      if (!data) return null;

      return (
        <VulnerabilityItem
          key={label}
          label={label}
          count={data.count}
          delta={data.delta}
          colorClass={colorClass}
        />
      );
    }
  );
  return (
    <div>
      <h2>Выявленные уязвимости по хостам</h2>
      <section className={styles.vulnerabilities}>
        <h2>Уязвимости</h2>
        <div className={styles.items}>{vulnerabilityLevelsComponents}</div>
        <div className={styles.lastScan}>
          Последнее сканирование: {lastScanDate}
        </div>
      </section>
    </div>
  );
};

export default VulnerabilitiesBlock;
