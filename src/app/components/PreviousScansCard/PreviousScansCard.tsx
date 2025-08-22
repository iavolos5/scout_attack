"use client";

import { useState } from "react";
import { CompareReportsResponse, Report } from "@/types/Reports.dto";
import { Card, Table, Button, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./PreviousScansCard.module.scss";

const { Title } = Typography;

type Props = {
  data: CompareReportsResponse;
  selectedReports?: number[];
  setSelectedReports: (ids: number[]) => void;
  onCompare: (firstId: number, secondId: number) => void;
};

export default function PreviousScansCard({
  data,
  selectedReports = [],
  setSelectedReports,
  onCompare,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const columns: ColumnsType<Report> = [
    {
      title: "Дата",
      dataIndex: "created",
      key: "created",
    },
  ];

  const handleRowClick = (id: number) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter((r) => r !== id));
    } else {
      if (selectedReports.length < 2) {
        setSelectedReports([...selectedReports, id]);
      } else {
        setSelectedReports([selectedReports[1], id]); // заменяем первый выбранный
      }
    }
  };

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Title level={4} onClick={() => setIsExpanded(!isExpanded)}>
          Прошлые сканирования{" "}
          <span className={styles.arrow}>{isExpanded ? "▲" : "▼"}</span>
        </Title>
      </div>

      {isExpanded && (
        <>
          <Table
            columns={columns}
            dataSource={data.previous_reports || []}
            pagination={false}
            rowKey="id"
            rowClassName={(record) =>
              selectedReports.includes(record.id) ? styles.selectedRow : ""
            }
            onRow={(record) => ({
              onClick: () => handleRowClick(record.id),
              style: { cursor: "pointer" },
            })}
          />

          <Button
            type="primary"
            disabled={selectedReports.length !== 2}
            onClick={() => onCompare(selectedReports[0], selectedReports[1])}
            style={{ marginTop: "1rem" }}
          >
            Сравнить отчёты
          </Button>
        </>
      )}
    </Card>
  );
}
