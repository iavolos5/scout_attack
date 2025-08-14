'use client'
import Link from "next/link";
import styles from './headers.module.scss'
import { usePathname } from "next/navigation";

const Headers: React.FC = () => {
    const path = usePathname()
    const isProfile = path.includes('/profile')
    return (
        <header className={styles.header}>
            <h1>{isProfile ? 'Профиль' : 'Панель управления'}</h1>
            <nav>
                <Link href="/">Главная</Link>
                <Link href="/reports">Отчёты</Link>
                <Link href="/profile">Профиль</Link>
            </nav>
        </header>
    );
}

export default Headers;