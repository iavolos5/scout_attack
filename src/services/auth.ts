export async function loginUser(login: string, password: string) {
  const res = await fetch("http://83.220.170.171/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // чтобы session_id сохранился в куки
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) {
    throw new Error(`Ошибка авторизации: ${res.status}`);
  }

  return res.json();
}
