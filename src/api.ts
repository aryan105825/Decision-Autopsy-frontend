const API_BASE = "https://decision-autopsy.onrender.com";

export async function createDecision(payload: any) {
  const res = await fetch(`${API_BASE}/decisions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create decision");
  }

  return res.json();
}
