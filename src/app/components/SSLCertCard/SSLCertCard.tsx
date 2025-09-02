// src/components/SSLCertCard/SSLCertCard.tsx
import React from "react";
import styles from "./SSLCertCard.module.scss";

type Props = {
  total: number;
  foreignDomains: number;
  expired: number;
  expiring: number;
};

const SSLCertCard: React.FC<Props> = ({
  total,
  foreignDomains,
  expired,
  expiring,
}) => {
  return (
    <div className={styles.card}>
      <h3>SSL - сертификаты</h3>
      Обнаружено: <b>{total}</b>
      <div className={styles.danger}>
        C посторонними доменами: <b>{foreignDomains}</b>
      </div>
      <div className={styles.danger}>
        Просрочено: <b>{expired}</b>
      </div>
      <div className={styles.warning}>
        Скоро истекут: <b>{expiring}</b>
      </div>
    </div>
  );
};

export default SSLCertCard;
