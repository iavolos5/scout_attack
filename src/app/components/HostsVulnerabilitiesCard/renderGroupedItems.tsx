import { getCritColor } from "@/utils/getCritColor";

type Item = {
  Name: string;
  CritLevel: string;
};

type Options = {
  onClick?: (name: string) => void;
  clickable?: boolean;
};

export function renderGroupedItems(items: Item[], options: Options = {}) {
  const groups = {
    critical: [] as Item[],
    medium: [] as Item[],
    low: [] as Item[],
  };

  items.forEach((item) => {
    const lvl = item.CritLevel.toLowerCase() as "critical" | "medium" | "low";
    groups[lvl].push(item);
  });

  return (
    <div
      style={{
        display: "flex",

        columnGap: "4px",
      }}
    >
      {(["critical", "medium", "low"] as const).map((lvl) =>
        groups[lvl].length > 0 ? (
          <div key={lvl}>
            {groups[lvl].map((item) => (
              <div
                key={item.Name}
                className={getCritColor(item.CritLevel)}
                style={{
                  fontWeight: "600",
                  cursor: options.clickable ? "pointer" : "default",
                  textDecoration: options.clickable ? "underline" : "none",
                }}
                onClick={
                  options.clickable && options.onClick
                    ? () => options.onClick?.(item.Name)
                    : undefined
                }
              >
                {item.Name}
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
}
