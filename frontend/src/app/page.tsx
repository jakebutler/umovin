"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { submitIntake, generatePlan } from "./apiClient";

const SURVEY_STEPS = [
  {
    label: "What is your primary fitness goal?",
    name: "fitness_goal",
    options: ["Fat loss", "Strength", "Endurance"],
    type: "radio",
  },
  {
    label: "What is your current fitness level?",
    name: "fitness_level",
    options: ["Sedentary", "Beginner", "Intermediate", "Advanced"],
    type: "radio",
  },
  {
    label: "Where will you work out?",
    name: "environment",
    options: ["Home", "Gym"],
    type: "radio",
  },
  {
    label: "What equipment do you have?",
    name: "equipment",
    options: ["Dumbbells", "Resistance Bands", "None", "Yoga Mat", "Other"],
    type: "checkbox",
  },
  {
    label: "Preferred workout styles?",
    name: "workout_styles",
    options: ["HIIT", "Yoga", "Strength", "Cardio"],
    type: "checkbox",
  },
  {
    label: "How many days per week are you available?",
    name: "days_per_week",
    type: "number",
    min: 1,
    max: 7,
    default: 3,
  },
  {
    label: "Preferred workout times:",
    name: "preferred_times",
    type: "text",
    placeholder: "e.g. 7:00am - 8:00am",
  },
  {
    label: "Target duration per session (minutes):",
    name: "duration_minutes",
    type: "number",
    min: 10,
    max: 120,
    default: 30,
  },
  {
    label: "Any injuries or physical constraints?",
    name: "injuries",
    type: "text",
    placeholder: "Describe any injuries or leave blank",
  },
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full bg-secondary rounded-full h-3 mb-6">
      <div
        className="bg-primary h-3 rounded-full transition-all"
        style={{ width: `${((step + 1) / total) * 100}%` }}
      ></div>
    </div>
  );
}

export default function Home() {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const totalSteps = SURVEY_STEPS.length;
  const router = useRouter();

  const current = SURVEY_STEPS[step];

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev: any) => {
        const arr = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...arr, value] };
        } else {
          return { ...prev, [name]: arr.filter((v: string) => v !== value) };
        }
      });
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  }

  // Ensure form data matches backend schema
  function buildIntakeSubmission(form: any) {
    return {
      fitness_goal: form.fitness_goal || "",
      fitness_level: form.fitness_level || "",
      environment: form.environment || "",
      equipment: Array.isArray(form.equipment) ? form.equipment : form.equipment ? [form.equipment] : [],
      workout_styles: Array.isArray(form.workout_styles) ? form.workout_styles : form.workout_styles ? [form.workout_styles] : [],
      days_per_week: form.days_per_week ? Number(form.days_per_week) : 3,
      preferred_times: form.preferred_times
        ? Array.isArray(form.preferred_times)
          ? form.preferred_times
          : [form.preferred_times]
        : [],
      duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : 30,
      injuries: form.injuries ?? null,
    };
  }

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Submit intake and fetch plan
      setLoading(true);
      try {
        const intake = buildIntakeSubmission(form);
        await submitIntake(intake); // Save intake
        const planRes = await generatePlan(intake); // Get plan
        // Save plan to localStorage for /plan page
        if (typeof window !== "undefined") {
          window.localStorage.setItem("umovin_plan", JSON.stringify(planRes.plan));
        }
        router.push("/plan");
      } catch (err: any) {
        setError(err.message || "Submission failed");
      } finally {
        setLoading(false);
      }
    }
  }

  function handlePrev() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 mt-8">
      <ProgressBar step={step} total={totalSteps} />
      <form onSubmit={handleNext}>
        <h2 className="text-xl font-bold text-primary mb-4">{current.label}</h2>
        {current.type === "radio" && Array.isArray(current.options) && (
          <div className="flex flex-col gap-2 mb-6">
            {current.options.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={current.name}
                  value={opt}
                  checked={form[current.name] === opt}
                  onChange={handleChange}
                  className="accent-primary"
                  required
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        )}
        {current.type === "checkbox" && Array.isArray(current.options) && (
          <div className="flex flex-col gap-2 mb-6">
            {current.options.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={current.name}
                  value={opt}
                  checked={form[current.name]?.includes(opt) || false}
                  onChange={handleChange}
                  className="accent-accent"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        )}
        {current.type === "number" && (
          <input
            type="number"
            name={current.name}
            min={current.min}
            max={current.max}
            value={form[current.name] ?? current.default ?? ""}
            onChange={handleChange}
            className="w-24 rounded-xl border border-secondary px-3 py-2 mb-6"
            required
          />
        )}
        {current.type === "text" && (
          <input
            type="text"
            name={current.name}
            placeholder={current.placeholder}
            value={form[current.name] ?? ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-secondary px-3 py-2 mb-6"
          />
        )}
        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0 || loading}
            className="rounded-xl px-6 py-2 bg-secondary text-white font-semibold disabled:opacity-50"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl px-6 py-2 bg-primary text-white font-bold shadow-md hover:bg-accent transition disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : step === totalSteps - 1
              ? "Finish"
              : "Next →"}
          </button>
        </div>
        {error && (
          <div className="text-red-500 font-semibold mt-2 text-center">{error}</div>
        )}
      </form>
    </div>
  );
}
