import type { ReactNode } from "react";
import styles from "@/app/dashboard/DashboardPage.module.scss";
import Header from "@/app/components/Headers/Headers";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.dashboard}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
