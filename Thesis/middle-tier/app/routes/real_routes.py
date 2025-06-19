from fastapi import APIRouter, Header
from pydantic import BaseModel
from app.services import real_service

router = APIRouter()

class MarkRealRequest(BaseModel):
    dream_id: str

@router.post("/mark-dream-as-real")
def mark_dream_as_real_route(body: MarkRealRequest, authorization: str = Header(...)):
    result = real_service.mark_dream_as_real(authorization, body.dream_id)
    return {"message": "Marked as real-life event", "data": result}
