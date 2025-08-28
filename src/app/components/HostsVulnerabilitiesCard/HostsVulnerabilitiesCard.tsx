// HostVulnerabilitiesCard.tsx
"use client";

import { Table, Typography, Card, Drawer, Spin } from "antd";
import { useState } from "react";
import styles from "./HostsVulnerabilitiesCard.module.scss";

import { getHostColumns } from "./HostColumns";
import {
  CompareReportsResponse,
  HostCompare,
  PortInfo,
} from "@/types/Reports.dto";
import { fetchVuln } from "@/api/vulners.api";

const { Title } = Typography;

interface HostsVulnerabilitiesCardProps {
  data: CompareReportsResponse;
}

interface VulnDetail {
  name: string;
  description: string;
  cvss_score: string;
  crit_level: string;
  cvss_vector: string;
  cvss_version: string;
}

const HostVulnerabilitiesCard: React.FC<HostsVulnerabilitiesCardProps> = ({
  data,
}) => {
  const [expandedHosts, setExpandedHosts] = useState<Record<string, boolean>>(
    {}
  );
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [vulnData, setVulnData] = useState<VulnDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleHost = (ip: string) => {
    setExpandedHosts((prev) => ({ ...prev, [ip]: !prev[ip] }));
  };

  const openVulnDrawer = async (name: string) => {
    setDrawerVisible(true);
    setLoading(true);
    try {
      const data = await fetchVuln<VulnDetail>(name);
      setVulnData(data);
    } catch (err) {
      console.error(err);
      setVulnData(null);
    } finally {
      setLoading(false);
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setVulnData(null);
  };

  return (
    <Card className={styles.card}>
      <Title level={4}>Уязвимости по хостам</Title>

      {data?.compare_reports?.map((host: HostCompare) => {
        const isExpanded = !!expandedHosts[host.IP];

        return (
          <Card key={host.IP} className={styles.hostCard}>
            <Title
              level={5}
              onClick={() => toggleHost(host.IP)}
              className={styles.hostTitle}
            >
              {host.IP} — {host.Hostname} ({host.ConType})
              <span className={styles.arrow}>{isExpanded ? "▲" : "▼"}</span>
            </Title>

            <div
              className={isExpanded ? styles.tableWrapper : styles.tableHidden}
            >
              <Table<PortInfo>
                pagination={false}
                rowKey={(row) => row.Port}
                dataSource={Object.values(host.Ports)}
                columns={getHostColumns(openVulnDrawer)}
              />
            </div>
          </Card>
        );
      })}

      <Drawer
        title={vulnData?.name || "Информация об уязвимости"}
        placement="right"
        width={400}
        onClose={closeDrawer}
        open={drawerVisible}
        mask={false}
      >
        {loading ? (
          <Spin />
        ) : vulnData ? (
          <div>
            <p>
              <strong>Описание:</strong> {vulnData.description}
            </p>
            <p>
              <strong>CVSS Score:</strong> {vulnData.cvss_score}
            </p>
            <p>
              <strong>Уровень критичности:</strong> {vulnData.crit_level}
            </p>
            <p>
              <strong>CVSS Vector:</strong> {vulnData.cvss_vector}
            </p>
            <p>
              <strong>CVSS Version:</strong> {vulnData.cvss_version}
            </p>
          </div>
        ) : (
          <p>Не удалось загрузить данные</p>
        )}
      </Drawer>
    </Card>
  );
};

export default HostVulnerabilitiesCard;
