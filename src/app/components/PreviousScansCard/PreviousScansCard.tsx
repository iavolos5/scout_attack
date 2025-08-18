"use client";
import { CompareReportsResponse, Report } from "@/types/Reports.dto";
import { Card, Table, Button, Radio, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "./PreviousScansCard.module.scss";

const { Title } = Typography;

type Props = {
  data: CompareReportsResponse;
  selectedReport: number | null;
  setSelectedReport: (id: number) => void;
  onCompare: (secondId: number) => void;
};

export default function PreviousScansCard({
  data,
  selectedReport,
  setSelectedReport,
  onCompare,
}: Props) {
  const columns: ColumnsType<Report> = [
    {
      title: "Дата",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "Выбрать",
      key: "select",
      render: (_, record) => (
        <Radio
          checked={selectedReport === record.id}
          onChange={() => setSelectedReport(record.id)}
        />
      ),
    },
  ];

  return (
    <Card className={styles.card}>
      <Title level={4}>Прошлые сканирования</Title>
      <Table
        columns={columns}
        dataSource={data.previous_reports}
        pagination={false}
        rowKey="id"
      />
      <Button
        type="primary"
        disabled={!selectedReport}
        onClick={() => selectedReport && onCompare(selectedReport)}
        style={{ marginTop: "1rem" }}
      >
        Сравнить отчёты
      </Button>
    </Card>
  );
}
