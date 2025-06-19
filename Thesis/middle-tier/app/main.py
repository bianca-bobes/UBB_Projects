from fastapi import FastAPI
from app.routes import (
    auth_routes,
    dream_routes,
    deja_vu_routes,
    interpret_routes,
    transcribe_routes,
    match_routes,
    real_routes,
    journal_routes,
)

app = FastAPI()

# Register all routes
app.include_router(auth_routes.router)
app.include_router(dream_routes.router)
app.include_router(deja_vu_routes.router)
app.include_router(interpret_routes.router)
app.include_router(transcribe_routes.router)
app.include_router(match_routes.router)
app.include_router(real_routes.router)
app.include_router(journal_routes.router)

