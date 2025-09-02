import React from "react";
import styles from "./TopIPsList.module.scss";
import { TopIP } from "@/types/dashboard.dto";

type Props = {
  topIPs: TopIP[];
  totalIPsCount: number;
  vulnerableIPsCount: number;
  oldEncIPsCount: number;
};

// ключи в одном месте + строгая типизация
const LEVELS = ["Critical", "Medium", "Low"] as const;
type Level = (typeof LEVELS)[number];

const COLORS: Record<Level, string> = {
  Critical: "#dc3545", // красный
  Medium: "#ffc107", // жёлтый
  Low: "#28a745", // зелёный
};

const TopIPsList: React.FC<Props> = ({
  topIPs,
  totalIPsCount,
  vulnerableIPsCount,
  oldEncIPsCount,
}) => {
  const topIP = topIPs.map((item) => {
    const total =
      LEVELS.reduce((sum, lvl) => sum + Number(item[lvl] ?? 0), 0) || 1;

    return (
      <div key={item.ip} className={styles.item}>
        <span className={styles.ip}>{item.ip}</span>

        <div className={styles.barWrapper}>
          {LEVELS.map((lvl) => {
            const count = Number(item[lvl] ?? 0);
            if (!count) return null;

            const width = (count / total) * 100;

            return (
              <div
                key={lvl}
                className={styles.barSegment}
                style={{ width: `${width}%`, backgroundColor: COLORS[lvl] }}
              >
                {count}
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.card}>
      <h2>Сводка по IP адресам</h2>

      <div className={styles.summary}>
        <div>
          <strong>{totalIPsCount}</strong>
          <br />
          Найдено
          <br />
          IP-адресов
        </div>
        <div className={styles.vulnerable}>
          <strong>{vulnerableIPsCount}</strong>
          <br />С уязвимостями
        </div>
        <div className={styles.oldEnc}>
          <strong>{oldEncIPsCount}</strong>
          <br /> Устаревшее шифрование
        </div>
      </div>

      {topIP}
    </div>
  );
};

export default TopIPsList;
