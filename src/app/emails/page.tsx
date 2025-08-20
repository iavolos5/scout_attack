"use client";

import { useEffect, useState } from "react";
import { Table, Input, Tag, Spin, Select, message } from "antd";
import styles from "./EmailsPage.module.scss";
import { fetchEmails } from "@/api/emails.api";
import { EmailItem, SearchLoc, Leak } from "@/types/emails.dto";

const { Search } = Input;

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredEmails, setFilteredEmails] = useState<EmailItem[]>([]);
  const [emailFilter, setEmailFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");

  useEffect(() => {
    const loadEmails = async () => {
      setLoading(true);
      try {
        const data = await fetchEmails();
        setEmails(data);
        setFilteredEmails(data);
      } finally {
        setLoading(false);
      }
    };
    loadEmails();
  }, []);

  // Фильтрация
  const filterEmails = () => {
    let result = emails;
    if (emailFilter) {
      result = result.filter((e) =>
        e.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }
    if (locFilter) {
      result = result.filter((e) =>
        e.search_locs.some((loc) =>
          loc.loc_name.toLowerCase().includes(locFilter.toLowerCase())
        )
      );
    }
    setFilteredEmails(result);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      filterEmails();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [emailFilter, locFilter, emails]);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, record: EmailItem) => (
        <span style={{ color: record.compromised_flg ? "red" : undefined }}>
          {record.email} {record.is_latest_only && <Tag color="blue">New</Tag>}
        </span>
      ),
    },
    {
      title: "Места обнаружения",
      dataIndex: "search_locs",
      key: "search_locs",
      render: (locs: SearchLoc[]) =>
        locs.map((loc) => <Tag key={loc.loc_name}>{loc.loc_name}</Tag>),
    },
    {
      title: "Утечки",
      dataIndex: "leaks",
      key: "leaks",
      render: (leaks: Leak[]) =>
        leaks.map((leak) => <Tag key={leak.leak_name}>{leak.leak_name}</Tag>),
    },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <div className={styles.emailsPage}>
      <section>
        <h2>Найденные email в интернете</h2>

        <div className={styles.filters}>
          <Search
            placeholder="Введите email для поиска..."
            onChange={(e) => setEmailFilter(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>

        <Table
          dataSource={filteredEmails}
          columns={columns}
          rowKey="email"
          pagination={{ pageSize: 10 }}
          style={{ marginTop: 20 }}
        />
      </section>
    </div>
  );
}
