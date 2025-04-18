"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CalendarPage() {
  const [calendarLink, setCalendarLink] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("umovin_calendar_link");
      if (stored) setCalendarLink(stored);
      setHydrated(true);
    }
  }, []);

  if (!hydrated) return null;

  return (
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 mt-8 flex flex-col gap-6 items-center">
      <h1 className="text-2xl font-extrabold text-primary mb-2">Add Session to Calendar</h1>
      <div className="w-full bg-background rounded-xl p-4 flex flex-col gap-2 items-start">
        <span className="text-sm font-semibold text-secondary">Google Calendar Link:</span>
        <div className="flex gap-2 items-center w-full">
          <input
            type="text"
            value={calendarLink}
            readOnly
            className="flex-1 rounded-xl border border-secondary px-3 py-2 bg-white text-accent font-mono text-sm"
          />
          <button
            className="rounded-xl px-4 py-2 bg-accent text-white font-semibold hover:bg-primary transition"
            onClick={() => {
              if (calendarLink) {
                navigator.clipboard.writeText(calendarLink);
                setCopied(true);
              }
            }}
            disabled={!calendarLink}
          >
            Copy Link
          </button>
        </div>
        {copied && calendarLink && (
          <span className="text-primary text-sm mt-2">Event link copied! Share with friends.</span>
        )}
      </div>
      <Link href="/">
        <button className="w-full rounded-xl px-6 py-3 bg-secondary text-white font-bold shadow-lg hover:bg-accent transition text-lg mt-4">
          Back to Start
        </button>
      </Link>
    </div>
  );
}
