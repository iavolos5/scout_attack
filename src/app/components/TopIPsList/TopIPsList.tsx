import React from "react";
import styles from "./TopIPsList.module.scss";
import { TopIP } from "@/types/dashboard.dto";

type Props = {
  topIPs: TopIP[];
};

// Функция выбора цвета в зависимости от количества уязвимостей
const getColor = (count: number): string => {
  if (count >= 5) return "#dc3545"; // Красный для критичных значений
  if (count >= 3) return "#e07b39"; // Оранжевый для высоких
  if (count >= 1) return "#ffc107"; // Желтый для средних
  return "#28a745"; // Зеленый для низких и 0
};

const TopIPsList: React.FC<Props> = ({ topIPs }) => {
  return (
    <div>
      <h2>Топ IP по уязвимостям</h2>
      <div className={styles.card}>
        {topIPs.map(({ ip, vulnerabilityCount }) => (
          <div key={ip} className={styles.item}>
            <span className={styles.ip}>{ip}</span>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{
                  width: `100%`,
                  backgroundColor: getColor(vulnerabilityCount),
                }}
              >
                {vulnerabilityCount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopIPsList;
