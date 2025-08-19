export interface ProfileData {
  login: string;
  email: string;
  company_name: string;
  must_change_password: boolean;
  "2fa_enabled": boolean;
  provided_ip: string[];
  provided_host: string[];
  provided_email: string[];
}
