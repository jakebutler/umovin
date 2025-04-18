from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
import os
import openai

router = APIRouter(prefix="/api/generate-plan", tags=["plan"])

openai.api_key = os.getenv("OPENAI_API_KEY", "sk-...your-key...")

class PlanRequest(BaseModel):
    intake: Dict[str, Any]

@router.post("")
def generate_plan(request: PlanRequest):
    # For now, generate a plan structure that matches frontend expectations
    plan = {
        "goal": request.intake.get("fitness_goal", "Fat Loss"),
        "level": request.intake.get("fitness_level", "Beginner"),
        "days": request.intake.get("days_per_week", 3),
        "sessions": [
            {"day": "Mon", "type": "HIIT + Strength", "duration": "30 min"},
            {"day": "Wed", "type": "Yoga + Cardio", "duration": "30 min"},
            {"day": "Fri", "type": "Strength", "duration": "30 min"},
        ],
    }
    return {"message": "Plan generated!", "plan": plan}
