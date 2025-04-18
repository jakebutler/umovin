export async function submitIntake(intake: any) {
  const res = await fetch("http://localhost:8000/api/intake", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(intake),
  });
  if (!res.ok) throw new Error("Failed to submit intake");
  return res.json();
}

export async function generatePlan(intake: any) {
  const res = await fetch("http://localhost:8000/api/generate-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ intake }),
  });
  if (!res.ok) throw new Error("Failed to generate plan");
  return res.json();
}

export async function generateCalendarLink(event: any) {
  const res = await fetch("http://localhost:8000/api/calendar-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Failed to generate calendar link");
  return res.json();
}
