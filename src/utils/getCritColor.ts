import styles from "@/app/components/HostsVulnerabilitiesCard/HostsVulnerabilitiesCard.module.scss";

export const getCritColor = (level: string | number) => {
  const val = typeof level === "string" ? parseFloat(level) : level;
  if (val >= 7) return styles.critical;
  if (val >= 3) return styles.medium;
  return styles.low;
};
