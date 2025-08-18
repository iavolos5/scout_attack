import { Typography, Card } from "antd";

import styles from "./LastScanCard.module.scss";
import { CompareReportsResponse } from "@/app/reports/page";

interface LastScanCardProps {
  data: CompareReportsResponse;
}
const { Title } = Typography;

const LastScanCard: React.FC<LastScanCardProps> = ({ data }) => {
  return (
    <Card className={styles.card}>
      <Title level={4}>Последнее сканирование</Title>
      <div>{data.last_report.created}</div>
    </Card>
  );
};

export default LastScanCard;
