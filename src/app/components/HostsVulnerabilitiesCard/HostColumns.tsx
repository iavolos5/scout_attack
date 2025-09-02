// HostColumns.ts
import { PortInfo } from "@/types/Reports.dto";
import { ColumnsType } from "antd/es/table";
import { renderGroupedItems } from "./renderGroupedItems";

export const getHostColumns = (
  onVulnClick: (name: string) => void
): ColumnsType<PortInfo> => [
  { title: "Порт", dataIndex: "Port", key: "Port" },
  { title: "Сервис", dataIndex: "Service", key: "Service" },
  { title: "Версия", dataIndex: "Version", key: "Version" },
  { title: "Протокол", dataIndex: "Protocol", key: "Protocol" },

  {
    title: "Шифрование",
    width: 200,
    key: "EncTypes",
    render: (_, record) => renderGroupedItems(Object.values(record.EncTypes)),
  },
  {
    title: "Уязвимости",
    key: "Vulnerabilities",
    width: 350,
    render: (_, record) =>
      renderGroupedItems(Object.values(record.Vulnerabilities), {
        clickable: true,
        onClick: onVulnClick,
      }),
  },
];
