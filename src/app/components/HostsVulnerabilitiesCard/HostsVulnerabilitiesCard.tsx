import { Table, Typography, Card } from "antd";
import { useState } from "react";
import styles from "./HostsVulnerabilitiesCard.module.scss";
import {
  CompareReportsResponse,
  HostCompare,
  PortInfo,
} from "@/types/reports.dto";
import { getHostColumns } from "./HostColumns";

const { Title } = Typography;

interface HostsVulnerabilitiesCardProps {
  data: CompareReportsResponse;
  getCritColor: (level: string) => string;
}

const HostVulnerabilitiesCard: React.FC<HostsVulnerabilitiesCardProps> = ({
  data,
  getCritColor,
}) => {
  // состояние раскрытых хостов
  const [expandedHosts, setExpandedHosts] = useState<Record<string, boolean>>(
    {}
  );

  const toggleHost = (ip: string) => {
    setExpandedHosts((prev) => ({ ...prev, [ip]: !prev[ip] }));
  };

  return (
    <Card className={styles.card}>
      <Title level={4}>Уязвимости по хостам</Title>
      {data.compare_reports.map((host: HostCompare) => {
        const isExpanded = !!expandedHosts[host.IP];

        return (
          <Card key={host.IP} className={styles.hostCard}>
            {/* Заголовок хоста */}
            <Title
              level={5}
              onClick={() => toggleHost(host.IP)}
              className={styles.hostTitle}
            >
              {host.IP} — {host.Hostname} ({host.ConType}){" "}
              <span className={styles.arrow}>{isExpanded ? "▲" : "▼"}</span>
            </Title>

            {/* Таблица с портами и уязвимостями */}
            <div
              className={isExpanded ? styles.tableWrapper : styles.tableHidden}
            >
              <Table<PortInfo>
                pagination={false}
                rowKey={(row) => row.Port}
                dataSource={Object.values(host.Ports)}
                columns={getHostColumns(getCritColor)}
              />
            </div>
          </Card>
        );
      })}
    </Card>
  );
};

export default HostVulnerabilitiesCard;
