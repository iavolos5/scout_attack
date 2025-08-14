"use client";

import Link from "next/link";
import styles from "./headers.module.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Дашбоард",
  "/reports": "Отчёты",
  "/profile": "Профиль",
  "/login": "Вход",
};

const Headers: React.FC = () => {
  const path = usePathname();
  const [authenticated, setAuthenticated] = useState(false);

  // Пример: проверяем куку session
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setAuthenticated(!!cookie);
  }, []);

  const title = pageTitles[path];

  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <nav>
        {Object.keys(pageTitles).map((href) => {
          if (href === "/login" && authenticated) {
            return null;
          }
          return (
            <Link
              key={href}
              href={href}
              className={path === href ? styles.active : ""}
            >
              {pageTitles[href]}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Headers;
