import type { ReactNode } from "react";
import styles from "./DashboardPage.module.scss";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.dashboard}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
