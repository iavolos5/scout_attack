// HostColumns.ts
import { PortInfo } from "@/types/Reports.dto";
import { ColumnsType } from "antd/es/table";
import { renderGroupedItems } from "./renderGroupedItems";
import { getCritColor } from "@/utils/getCritColor";

const renderSingleColumn = (items: Array<{ Name: string; CritLevel: string }>) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
    {items.map((item) => (
      <div
        key={item.Name}
        className={getCritColor(item.CritLevel)}
        style={{ fontWeight: "600" }}
      >
        {item.Name}
      </div>
    ))}
  </div>
);

export const getHostColumns = (
  onVulnClick: (name: string) => void
): ColumnsType<PortInfo> => [
  { title: "Порт", dataIndex: "Port", key: "Port" },
  { title: "Сервис", dataIndex: "Service", key: "Service" },
  { title: "Версия", dataIndex: "Version", key: "Version" },
  { title: "Протокол", dataIndex: "Protocol", key: "Protocol" },

  {
    title: "Шифрование",
    width: 125,
    key: "EncTypes",
    render: (_, record) => renderSingleColumn(Object.values(record.EncTypes)),
  },
  {
    title: "Уязвимости",
    key: "Vulnerabilities",
    width: 425,
    render: (_, record) =>
      renderGroupedItems(Object.values(record.Vulnerabilities), {
        clickable: true,
        onClick: onVulnClick,
      }),
  },
];
