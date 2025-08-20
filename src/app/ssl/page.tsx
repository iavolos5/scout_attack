"use client";

import { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import styles from "./SslPage.module.scss";
import { SslCert } from "@/types/ssl.dto";
import { fetchSsl } from "@/api/ssl.api";

export default function SslPage() {
  const [certs, setCerts] = useState<SslCert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSsl = async () => {
      setLoading(true);
      try {
        const data = await fetchSsl();
        setCerts(data);
      } finally {
        setLoading(false);
      }
    };
    loadSsl();
  }, []);

  const columns = [
    {
      title: "Серийный номер",
      dataIndex: "serial_number",
      key: "serial_number",
    },
    {
      title: "Издатель",
      dataIndex: "cert_authority",
      key: "cert_authority",
    },
    {
      title: "Действует с",
      dataIndex: "valid_from",
      key: "valid_from",
    },
    {
      title: "Действует до",
      dataIndex: "valid_to",
      key: "valid_to",
    },
    {
      title: "Тема",
      dataIndex: "theme",
      key: "theme",
    },
    {
      title: "DNS-имена",
      dataIndex: "dns_names",
      key: "dns_names",
      render: (dns: string) =>
        dns.split(",").map((d) => <div key={d}>{d}</div>),
    },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <div className={styles.sslPage}>
      <section>
        <h2>SSL сертификаты</h2>
        <Table
          dataSource={certs}
          columns={columns}
          rowKey="serial_number"
          pagination={{ pageSize: 10 }}
          style={{ marginTop: 20 }}
        />
      </section>
    </div>
  );
}
