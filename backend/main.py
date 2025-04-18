from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS config for local/frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Umovin backend is running!"}

# Import API routers (to be created)
from api import intake, plan, calendar
app.include_router(intake.router)
app.include_router(plan.router)
app.include_router(calendar.router)
