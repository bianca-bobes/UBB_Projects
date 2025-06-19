from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from app.services import dream_service

router = APIRouter()


class DreamTextRequest(BaseModel):
    text: str


@router.post("/log-dream")
def log_dream_route(body: DreamTextRequest, authorization: str = Header(...)):
    result = dream_service.log_dream(authorization, body.text)
    return {"message": "Dream logged", "data": result}


@router.get("/get-dream/{dream_id}")
def get_dream_route(dream_id: str, authorization: str = Header(...)):
    result = dream_service.get_dream(authorization, dream_id)
    return {"data": result}


@router.get("/get-all-dreams")
def get_all_dreams_route(authorization: str = Header(...)):
    result = dream_service.get_all_dreams(authorization)
    return {"data": result}


@router.put("/update-dream/{dream_id}")
def update_dream_route(dream_id: str, body: DreamTextRequest, authorization: str = Header(...)):
    result = dream_service.update_dream(authorization, dream_id, body.text)
    return {"message": "Dream updated", "data": result}


@router.delete("/delete-dream/{dream_id}")
def delete_dream_route(dream_id: str, authorization: str = Header(...)):
    result = dream_service.delete_dream(authorization, dream_id)
    return {"message": "Dream deleted", "data": result}
