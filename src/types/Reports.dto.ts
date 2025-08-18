export type PortInfo = {
  Port: string;
  Service: string;
  Version: string;
  Protocol: string;
  disabledFlag: boolean;
  EncTypes: Record<string, EncType>;
  Vulnerabilities: Record<string, Vulnerability>;
};

export type HostCompare = {
  IP: string;
  Hostname: string;
  ConType: string;
  Ports: Record<string, PortInfo>;
};

export type CompareReportsResponse = {
  compare_reports: HostCompare[];
  last_report: Report;
  previous_reports: Report[];
};

export type Report = {
  id: number;
  created: string;
};

export type EncType = {
  Name: string;
  CritLevel: string;
  newFlag: boolean;
  oldFlag: boolean;
};

export type Vulnerability = {
  Name: string;
  CritLevel: string;
  newFlag: boolean;
  oldFlag: boolean;
};
