export async function getDashboardData() {
  const res = await fetch("https://83.220.170.171/dashboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Ошибка авторизации: ${res?.status}`);
  }

  return res.json();
}
