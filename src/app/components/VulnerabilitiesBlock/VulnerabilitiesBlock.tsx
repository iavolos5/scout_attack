import React from "react";
import styles from "./VulnerabilitiesBlock.module.scss";

type Vulnerability = {
  count: number;
  delta: string;
};

type Severity = "critical" | "high" | "medium" | "low";

type VulnerabilitiesData = {
  [key in Severity]: Vulnerability;
};

type Props = {
  vulnerabilities: VulnerabilitiesData;
  lastScanDate: string;
};

const deltaColor = (delta: string) => {
  if (delta.startsWith("+")) return styles.deltaPositive;
  if (delta.startsWith("-")) return styles.deltaNegative;
  return "";
};

// Вынесенный массив категорий с соответствующими классами и ключами для доступа к данным
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
  return (
    <div>
      <h2>Выявленные уязвимости по хостам</h2>
      <section className={styles.vulnerabilities}>
        <h2>Уязвимости</h2>
        <div className={styles.items}>
          {vulnerabilityLevels.map(({ label, key, colorClass }) => {
            const data = vulnerabilities[key as keyof VulnerabilitiesData];

            if (!data) {
              // Если данных нет, можно вернуть null или заглушку
              return null;
            }

            return (
              <div key={label} className={styles.item}>
                <div className={`${styles.count} ${colorClass}`}>
                  {data.count}
                </div>
                <div className={styles.label}>{label}</div>
                <div className={`${styles.delta} ${deltaColor(data.delta)}`}>
                  {data.delta} за неделю
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.lastScan}>
          Последнее сканирование: {lastScanDate}
        </div>
      </section>
    </div>
  );
};

export default VulnerabilitiesBlock;
