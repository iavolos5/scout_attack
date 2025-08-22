"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout, Space, Typography, Grid } from "antd";
import styles from "./Headers.module.scss";

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const pageTitles: Record<string, string> = {
  "/dashboard": "Дашбоард",
  "/reports": "Отчёты",
  "/profile": "Профиль",
  "/emails": "Emails",
  "/login": "Вход",
  "/ssl": "SSL",
  "/alike": "Домены",
};

const Headers: React.FC = () => {
  const path = usePathname();
  const screens = useBreakpoint();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setAuthenticated(!!!cookie);
  }, []);

  const title = pageTitles[path];

  const links = Object.keys(pageTitles).filter((href) => {
    if (path === "/login") {
      return href === "/login";
    }
    if (authenticated) {
      return href !== "/login";
    }
    return true;
  });

  return (
    <Header className={styles.header}>
      <Space
        direction={screens.xs ? "vertical" : "horizontal"}
        size="middle"
        className={`${styles.headerContent}`}
      >
        <Title level={3} className={styles.title}>
          {title}
        </Title>
        <Space size="middle">
          {links.map((href) => (
            <Link
              key={href}
              href={href}
              className={`${styles.linkButton} ${
                path === href ? styles.active : ""
              }`}
            >
              {pageTitles[href]}
            </Link>
          ))}
        </Space>
      </Space>
    </Header>
  );
};

export default Headers;
