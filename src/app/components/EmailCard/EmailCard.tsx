// src/components/EmailCard/EmailCard.tsx
import React from "react";
import styles from "./EmailCard.module.scss";

type Props = {
  total: number;
  compromised: number;
};

const EmailCard: React.FC<Props> = ({ total, compromised }) => {
  return (
    <div className={styles.card}>
      <h3>Email</h3>
      Обнаружено: <b>{total}</b>
      <div className={styles.danger}>
        Скомпрометировано: <b>{compromised}</b>
      </div>
    </div>
  );
};

export default EmailCard;
