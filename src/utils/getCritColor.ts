import styles from "@/app/components/HostsVulnerabilitiesCard/HostsVulnerabilitiesCard.module.scss";

export const getCritColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "critical":
      return styles.critical;
    case "medium":
      return styles.medium;
    case "low":
      return styles.low;
    default:
      return "";
  }
};
