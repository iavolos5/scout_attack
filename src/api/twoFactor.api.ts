import { API_BASE } from "@/app/constants";

export interface Setup2FAResponse {
  success: boolean;
  totp_secret?: string;
  qrcode?: string;
}

export interface Confirm2FAResponse {
  success: boolean;
}

export async function setup2FA(password: string): Promise<Setup2FAResponse> {
  const res = await fetch(`${API_BASE}/setup-2fa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    throw new Error(`Ошибка настройки 2FA: ${res.status}`);
  }

  return res.json();
}

export async function confirm2FA(
  totp_code: string
): Promise<Confirm2FAResponse> {
  const res = await fetch(`${API_BASE}/confirm-2fa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ totp_code }),
  });

  if (!res.ok) {
    throw new Error(`Ошибка подтверждения 2FA: ${res.status}`);
  }

  return res.json();
}
