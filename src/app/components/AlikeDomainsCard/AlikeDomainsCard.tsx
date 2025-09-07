// src/components/AlikeDomainsCard/AlikeDomainsCard.tsx
import React from "react";
import styles from "./AlikeDomainsCard.module.scss";

type Props = {
  total: number;
};

const AlikeDomainsCard: React.FC<Props> = ({ total }) => {
  return (
    <div className={styles.card}>
      <h2>Схожих доменов</h2>
      Обнаружено: <b>{total}</b>
    </div>
  );
};

export default AlikeDomainsCard;
