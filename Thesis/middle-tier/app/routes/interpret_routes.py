from fastapi import APIRouter, Header
from pydantic import BaseModel
from typing import Optional
from app.services import interpret_service

router = APIRouter()


class InterpretDreamRequest(BaseModel):
    dreamId: str
    dreamText: str
    length: str
    style: str
    dreamDate: Optional[str] = None

@router.post("/interpret-dream")
def interpret_dream_route(body: InterpretDreamRequest, authorization: str = Header(...)):
    result = interpret_service.interpret_dream(
        token=authorization,
        dream_id=body.dreamId,
        dream_text=body.dreamText,
        length=body.length,
        style=body.style,
        dream_date=body.dreamDate
    )
    return {"message": "Dream interpreted", "data": result}

