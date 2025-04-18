from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any
from urllib.parse import urlencode

router = APIRouter(prefix="/api/calendar-link", tags=["calendar"])

class CalendarRequest(BaseModel):
    event_title: str
    start_time: str  # ISO 8601
    end_time: str    # ISO 8601
    description: str

@router.post("")
def generate_calendar_link(request: CalendarRequest):
    # Simple Google Calendar event link generator
    params = {
        "action": "TEMPLATE",
        "text": request.event_title,
        "dates": f"{request.start_time.replace('-', '').replace(':', '').replace('T', 'T')}/{request.end_time.replace('-', '').replace(':', '').replace('T', 'T')}",
        "details": request.description,
    }
    link = f"https://calendar.google.com/calendar/render?{urlencode(params)}"
    return {"calendar_link": link}
