import React from "react";
import styles from "./VulnerabilitiesBlock.module.scss";
import VulnerabilityItem from "./VulnerabilityItem";
import { VulnerabilitiesData } from "@/types/dashboard.dto";

type Props = {
  vulnerabilities: VulnerabilitiesData;
};
// массив категорий
const vulnerabilityLevels = [
  { label: "Критичные", key: "critical", colorClass: styles.critical },
  { label: "Средние", key: "medium", colorClass: styles.medium },
  { label: "Низкие", key: "low", colorClass: styles.low },
];

const VulnerabilitiesBlock: React.FC<Props> = ({ vulnerabilities }) => {
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
      <div className={styles.vulnerabilities}>
        <div className={styles.items}>{vulnerabilityLevelsComponents}</div>
      </div>
    </div>
  );
};

export default VulnerabilitiesBlock;
