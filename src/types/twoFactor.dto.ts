export interface Setup2FAResponse {
  success: boolean;
  totp_secret?: string;
  qrcode?: string;
}

export interface Confirm2FAResponse {
  success: boolean;
}
