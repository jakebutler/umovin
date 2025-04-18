"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { generateCalendarLink } from "../apiClient";

export default function PlanPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("umovin_plan");
      if (stored) setPlan(JSON.parse(stored));
      setHydrated(true);
    }
  }, []);

  if (!hydrated) return null;

  async function handleAddToCalendar() {
    setError(null);
    setLoading(true);
    try {
      // Use the first session as the event for MVP
      const session = (plan.week || plan.sessions || [])[0] || {};
      const event = {
        event_title: session.type || session.name || "Workout Session",
        start_time: "2025-04-21T07:00:00", // Placeholder, ideally from plan/session
        end_time: "2025-04-21T07:30:00",   // Placeholder
        description: `Your Umovin workout: ${session.type || session.name || "Session"}`,
      };
      const res = await generateCalendarLink(event);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("umovin_calendar_link", res.calendar_link);
      }
      router.push("/calendar");
    } catch (err: any) {
      setError(err.message || "Failed to generate calendar link");
    } finally {
      setLoading(false);
    }
  }

  if (!plan) {
    return (
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 mt-8 flex flex-col items-center">
        <h1 className="text-xl font-bold text-primary mb-4">No plan found</h1>
        <Link href="/">
          <button className="rounded-xl px-6 py-2 bg-secondary text-white font-semibold mt-4">Back to Survey</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 mt-8 flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold text-primary mb-2">Your Personalized Plan</h1>
      <div className="flex gap-4 text-sm mb-4">
        <span className="px-3 py-1 bg-accent text-white rounded-xl font-semibold">Goal: {plan.goal || plan.fitness_goal}</span>
        <span className="px-3 py-1 bg-secondary text-white rounded-xl font-semibold">Level: {plan.level || plan.fitness_level}</span>
        <span className="px-3 py-1 bg-primary text-white rounded-xl font-semibold">Days: {plan.days || plan.days_per_week}/wk</span>
      </div>
      <div className="bg-background rounded-xl p-4 mb-4">
        <h2 className="text-lg font-bold text-accent mb-2">Week 1</h2>
        <ul className="flex flex-col gap-2">
          {(plan.week || plan.sessions || []).map((session: any, idx: number) => (
            <li key={session.day || idx} className="flex items-center justify-between bg-white rounded-xl shadow p-3 border border-secondary">
              <span className="font-semibold text-primary w-12">{session.day || `Day ${idx + 1}`}:</span>
              <span className="flex-1 text-accent font-bold">{session.type || session.name || session}</span>
              <span className="text-secondary font-semibold">{session.duration || "30 min"}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleAddToCalendar}
        disabled={loading}
        className="w-full rounded-xl px-6 py-3 bg-accent text-white font-bold shadow-lg hover:bg-primary transition text-lg mt-4 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Add to Calendar"}
      </button>
      {error && (
        <div className="text-red-500 font-semibold mt-2 text-center">{error}</div>
      )}
    </div>
  );
}
