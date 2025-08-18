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
