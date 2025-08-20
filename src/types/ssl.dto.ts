export interface SslCert {
  serial_number: string;
  cert_authority: string;
  valid_from: string;
  valid_to: string;
  theme: string;
  dns_names: string;
}
