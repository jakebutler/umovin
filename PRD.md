Here's the **updated Product Requirements Document (PRD)** for your app, now called **Umovin**, with the requested changes:

---

**📄 Product Requirements Document (PRD)**  
**Product Name:** **Umovin**  
**Prepared by:** [Your Name]  
**Date:** April 18, 2025  

---

## 1. **Overview**

### **Goal:**  
To build a web-based application that generates personalized exercise programs based on user intake responses and allows users to add their workout sessions to their Google Calendar using publicly shareable event links—no login or OAuth required.

### **Primary Users:**
- Fitness beginners seeking structured guidance  
- Time-constrained individuals wanting efficient planning  
- Intermediate users maintaining consistency

### **Platform:**  
- Web (initial release)  
- Mobile (future phase)

---

## 2. **Key Features**

### 2.1 **User Intake Survey**  
Short, engaging form that captures:
- Fitness goals (e.g., fat loss, strength, endurance)
- Current fitness level (sedentary to advanced)
- Workout environment (home/gym), equipment availability
- Preferred workout styles (HIIT, yoga, strength training)
- Weekly availability (days + times)
- Target workout duration per session
- Injuries or physical constraints

---

### 2.2 **Exercise Program Generator (LLM-Based)**

#### **Purpose:**  
Use a large language model to dynamically generate customized, safe, and progressive exercise plans, tailored to the user’s inputs.

#### **Inputs:**  
Collected and formatted as structured JSON:
```json
{
  "goal": "Weight Loss",
  "level": "Beginner",
  "location": "Home",
  "equipment": "None",
  "styles": ["HIIT", "Bodyweight"],
  "days": ["Monday", "Wednesday", "Friday"],
  "time_slots": {"Monday": "07:00", "Wednesday": "07:00", "Friday": "07:00"},
  "duration": 30,
  "constraints": ["knee pain"]
}
```

#### **LLM Prompt Structure:**
```plaintext
Generate a 4-week home workout plan for a beginner aiming to lose weight.
- No equipment
- Avoid knee strain
- Workout 3x/week (Mon/Wed/Fri) at 7:00 AM
- Sessions: 30 mins each
Each session must include: a title, focus, warmup, 3–5 main exercises (with sets/reps or duration), cooldown. Output format: JSON.
```

#### **Expected LLM Output Format:**
```json
[
  {
    "week": 1,
    "day": "Monday",
    "title": "Low Impact Burn",
    "focus": "Full-body cardio",
    "exercises": [
      {"name": "March in Place", "duration": "2 min"},
      {"name": "Glute Bridge", "reps": "3x12"},
      {"name": "Wall Sit", "duration": "30 sec"}
    ],
    "duration": "30 min",
    "notes": "Includes warmup and cooldown. Avoid jumping."
  }
]
```

#### **Technical Requirements:**

| Component | Tool | Notes |
|----------|------|-------|
| LLM Engine | OpenAI GPT-4 / Claude / Local LLM | Prompted with user JSON inputs |
| Prompt Validator | Backend Python service | Validates safe and complete generation |
| Output Normalization | Schema-based parser | Ensures consistent session formatting |
| Fallback System | Template-based logic | Used if LLM fails or API limit reached |
| Storage | MongoDB / PostgreSQL | Stores user profile and plan |
| Caching | Redis / local store | Prevents duplicate LLM requests |

#### **Progression Logic:**
- LLM prompt includes weekly difficulty progression
- Future versions may adapt based on user feedback, skipped sessions, or ratings

---

### 2.3 **Google Calendar Integration (Public Links)**

#### **Overview:**
- Each session will include a “Add to Google Calendar” button
- No OAuth or calendar sync
- Events created using prefilled public Google Calendar event links

#### **Structure of Calendar Link:**
Generated via:
```
https://www.google.com/calendar/render?action=TEMPLATE
  &text=Upper+Body+Strength+%E2%80%93+30+min
  &dates=20250422T070000Z/20250422T073000Z
  &details=Instructions+%3A+Pushups%2C+Plank%2C+Rows
  &location=Home
  &trp=false
```

#### **Technical Notes:**
- Dates generated in UTC for cross-timezone compatibility
- Link generation handled on backend with workout session metadata
- No user authentication required
- Each session in the plan has a prebuilt “Add to Calendar” link

---

### 2.4 **User Dashboard (Web)**

- Displays upcoming sessions with details
- “Add to Calendar” buttons for each session
- Ability to regenerate program (confirmation required)
- Feedback capture for future personalization (optional for MVP)

---

## 3. **User Flow**

1. **Onboarding** → Complete Intake Survey  
2. **Generate Plan** → LLM creates 4–12 week program  
3. **Show Plan** → Display weekly sessions  
4. **Calendar Export** → Add individual sessions via calendar links  
5. **Dashboard Access** → View sessions, regenerate if needed

---

## 4. **Technical Stack**

| Layer | Tool |
|-------|------|
| Frontend | React.js (Web) |
| Backend | Node.js or Python (FastAPI / Django) |
| LLM API | OpenAI or Claude via REST |
| DB | PostgreSQL or MongoDB |
| Hosting | Vercel or Render |
| Time/Date Handling | Luxon or date-fns |
| Calendar Link Generator | Custom util in backend |

---

## 5. **Success Metrics**

- 75% completion rate for intake survey  
- 60%+ of users click “Add to Calendar” on ≥3 sessions  
- <5% LLM generation failure rate  
- <3% fallback template use  
- Positive user feedback score >80% by Week 4

---

## 6. **Out of Scope (v1)**

- Manual session rescheduling inside the app  
- OAuth Google Calendar or iCal sync  
- Nutrition or habit tracking features  
- Real-time workout video or coaching integration

---

## 7. **Milestones**

| Milestone | Description | Target Date |
|----------|-------------|-------------|
| UX Design | UI flows + survey screens | May 1, 2025 |
| LLM Integration | Prompt tuning + testing | May 15, 2025 |
| MVP Build | Core features implemented | June 15, 2025 |
| Beta Launch | Early testing w/ select users | July 15, 2025 |
| Public Launch | Available to all | Aug 15, 2025 |

---

Let me know if you want this exported as a Google Doc, or if you'd like a sample LLM API interaction + code mock next.
