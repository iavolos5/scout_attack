import type { ReactNode } from 'react'
import styles from '@/app/dashboard/dashboard.module.scss'
import Header from '@/app/components/Headers/Headers'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className={styles.dashboard}>
            <Header />
            <main className={styles.main}>{children}</main>
        </div>
    )
}
