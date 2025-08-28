// HostColumns.ts
import { PortInfo } from "@/types/Reports.dto";
import { ColumnsType } from "antd/es/table";
import styles from "./HostsVulnerabilitiesCard.module.scss";
import { getCritColor } from "@/utils/getCritColor";

export const getHostColumns = (
  onVulnClick: (name: string) => void
): ColumnsType<PortInfo> => [
  { title: "Порт", dataIndex: "Port", key: "Port" },
  { title: "Сервис", dataIndex: "Service", key: "Service" },
  { title: "Версия", dataIndex: "Version", key: "Version" },
  { title: "Протокол", dataIndex: "Protocol", key: "Protocol" },
  {
    title: "Шифрование",
    key: "EncTypes",
    render: (_, record) => (
      <div>
        {Object.values(record.EncTypes).map((enc) => (
          <span
            key={enc.Name}
            className={getCritColor(enc.CritLevel)}
            style={{ marginLeft: "5px", fontWeight: "600" }}
          >
            {enc.Name}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "Уязвимости",
    key: "Vulnerabilities",
    render: (_, record) => (
      <div>
        {Object.values(record.Vulnerabilities).map((vuln) => (
          <span
            key={vuln.Name}
            className={getCritColor(vuln.CritLevel)}
            style={{
              marginLeft: "5px",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => onVulnClick(vuln.Name)}
          >
            {vuln.Name}
          </span>
        ))}
      </div>
    ),
  },
];
