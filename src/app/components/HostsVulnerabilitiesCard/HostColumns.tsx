import { PortInfo } from "@/types/Reports.dto";
import { ColumnsType } from "antd/es/table";
import styles from "./HostsVulnerabilitiesCard.module.scss";

export const getHostColumns = (
  getCritColor: (level: string) => string
): ColumnsType<PortInfo> => [
  { title: "Порт", dataIndex: "Port", key: "Port" },
  { title: "Сервис", dataIndex: "Service", key: "Service" },
  { title: "Версия", dataIndex: "Version", key: "Version" },
  { title: "Протокол", dataIndex: "Protocol", key: "Protocol" },
  {
    title: "Шифрование",
    key: "EncTypes",
    render: (_, record) => (
      <div className="critContainer">
        {Object.values(record.EncTypes).map((enc) => (
          <span
            key={enc.Name}
            className={`${getCritColor(enc.CritLevel)} ${styles.critContainer}`}
          >
            {enc.Name} ({enc.CritLevel})
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
            className={`${getCritColor(vuln.CritLevel)} ${
              styles.critContainer
            }`}
          >
            {vuln.Name} ({vuln.CritLevel})
          </span>
        ))}
      </div>
    ),
  },
];
