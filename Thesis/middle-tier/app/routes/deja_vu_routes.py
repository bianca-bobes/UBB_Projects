from fastapi import APIRouter, Header
from pydantic import BaseModel
from app.services import deja_vu_service

router = APIRouter()

class DejaVuTextRequest(BaseModel):
    text: str

@router.post("/log-deja-vu")
def log_deja_vu_route(body: DejaVuTextRequest, authorization: str = Header(...)):
    result = deja_vu_service.log_deja_vu(authorization, body.text)
    return {"message": "Déjà vu logged", "data": result}

@router.get("/get-deja-vu/{deja_vu_id}")
def get_deja_vu_route(deja_vu_id: str, authorization: str = Header(...)):
    result = deja_vu_service.get_deja_vu(authorization, deja_vu_id)
    return {"data": result}

@router.get("/get-all-deja-vus")
def get_all_deja_vus_route(authorization: str = Header(...)):
    result = deja_vu_service.get_all_deja_vus(authorization)
    return {"data": result}

@router.put("/update-deja-vu/{deja_vu_id}")
def update_deja_vu_route(deja_vu_id: str, body: DejaVuTextRequest, authorization: str = Header(...)):
    result = deja_vu_service.update_deja_vu(authorization, deja_vu_id, body.text)
    return {"message": "Déjà vu updated", "data": result}

@router.delete("/delete-deja-vu/{deja_vu_id}")
def delete_deja_vu_route(deja_vu_id: str, authorization: str = Header(...)):
    result = deja_vu_service.delete_deja_vu(authorization, deja_vu_id)
    return {"message": "Déjà vu deleted", "data": result}

@router.post("/match-deja-vu/{deja_vu_id}")
def match_deja_vu_route(deja_vu_id: str, body: DejaVuTextRequest, authorization: str = Header(...)):
    result = deja_vu_service.match_deja_vu(authorization, deja_vu_id, body.text)
    return {"message": "Match checked", "data": result}
