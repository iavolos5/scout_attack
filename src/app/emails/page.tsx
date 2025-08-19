"use client";

import { useEffect, useState } from "react";
import { Table, Input, Tag, Spin, Select } from "antd";
import styles from "./EmailsPage.module.scss";
import { fetchEmails } from "@/api/emails.api";

const { Search } = Input;
const { Option } = Select;

interface SearchLoc {
  loc_name: string;
}

interface Leak {
  leak_name: string;
}

interface EmailItem {
  email: string;
  compromised_flg: boolean;
  is_latest_only: boolean;
  search_locs: SearchLoc[];
  leaks: Leak[];
}

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
    }, 1000);

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
      title: "Статус",
      dataIndex: "compromised_flg",
      key: "status",
      render: (compromised: boolean) => (
        <span className="compromised">
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: compromised ? "red" : "green",
              display: "inline-block",
            }}
          />
          {compromised ? "Скомпрометирован" : "Безопасный"}
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

  const filters = Array.from(
    new Set(emails.flatMap((e) => e.search_locs.map((loc) => loc.loc_name)))
  ).map((loc) => (
    <Option key={loc} value={loc}>
      {loc}
    </Option>
  ));

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
          <Select
            placeholder="Фильтр по месту"
            onChange={(value) => setLocFilter(value)}
            style={{ width: 250 }}
            allowClear
          >
            {filters}
          </Select>
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
