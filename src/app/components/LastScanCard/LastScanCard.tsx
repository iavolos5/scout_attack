import { Typography, Card, Button, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import styles from "./LastScanCard.module.scss";
import { CompareReportsResponse } from "@/types/Reports.dto";

interface LastScanCardProps {
  data: CompareReportsResponse;
  downloading: boolean;
  onDownload: () => void;
}
const { Title } = Typography;

const LastScanCard: React.FC<LastScanCardProps> = ({
  data,
  downloading,
  onDownload,
}) => {
  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <Title level={4}>Последнее сканирование</Title>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={onDownload}
          disabled={downloading}
        >
          {downloading ? <Spin size="small" /> : "Скачать отчёт"}
        </Button>
      </div>

      <div>{data.last_report.created}</div>
    </Card>
  );
};

export default LastScanCard;
