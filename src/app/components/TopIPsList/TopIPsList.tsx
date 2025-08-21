import React from "react";
import styles from "./TopIPsList.module.scss";
import { TopIP } from "@/types/dashboard.dto";

type Props = {
  topIPs: TopIP[];
};

// Цвета по категориям
const COLORS: Record<string, string> = {
  Critical: "#dc3545", // красный
  Medium: "#ffc107", // желтый
  Low: "#28a745", // зеленый
};

const TopIPsList: React.FC<Props> = ({ topIPs }) => {
  return (
    <div>
      <h2>Топ IP по уязвимостям</h2>
      <div className={styles.card}>
        {topIPs.map(({ ip, Critical, Medium, Low }) => {
          const total = Number(Critical) + Number(Medium) + Number(Low) || 1; // чтобы не делить на 0

          return (
            <div key={ip} className={styles.item}>
              <span className={styles.ip}>{ip}</span>
              <div className={styles.barWrapper}>
                {["Critical", "Medium", "Low"].map((level) => {
                  const count = Number({ Critical, Medium, Low }[level]);
                  if (count === 0) return null;
                  const widthPercent = (count / total) * 100;
                  return (
                    <div
                      key={level}
                      className={styles.barSegment}
                      style={{
                        width: `${widthPercent}%`,
                        backgroundColor: COLORS[level],
                      }}
                    >
                      {count > 0 ? count : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopIPsList;
