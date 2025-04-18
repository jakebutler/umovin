from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/api/intake", tags=["intake"])

class IntakeSurvey(BaseModel):
    fitness_goal: str
    fitness_level: str
    environment: str
    equipment: List[str]
    workout_styles: List[str]
    days_per_week: int
    preferred_times: List[str]
    duration_minutes: int
    injuries: Optional[str] = None

@router.post("")
def submit_intake(survey: IntakeSurvey):
    # Placeholder: Save to DB or process
    return {"message": "Intake received!", "data": survey.dict()}
