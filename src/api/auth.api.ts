export async function loginUser(login: string, password: string) {
  const res = await fetch("https://83.220.170.171/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Ошибка авторизации: ${res?.status}`);
  }

  return res.json();
}

export async function verify2FA(code: string) {
  const res = await fetch("https://83.220.170.171/2fa-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ totp_code: code }),
    credentials: "include",
  });

  if (!res.ok) throw new Error(`Ошибка 2FA: ${res?.status}`);
  return res.json();
}
