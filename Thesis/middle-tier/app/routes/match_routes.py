from fastapi import APIRouter, Header
from pydantic import BaseModel
from app.services import match_service

router = APIRouter()

class MatchDejaVuRequest(BaseModel):
    dejaVuId: str

@router.post("/match-deja-vu")
def match_deja_vu_route(body: MatchDejaVuRequest, authorization: str = Header(...)):
    result = match_service.match_deja_vu(authorization, body.dejaVuId)
    return {"message": "Match evaluated", "data": result}
