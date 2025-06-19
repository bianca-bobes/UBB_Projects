from fastapi import APIRouter, File, UploadFile, Header
from app.services import transcribe_service

router = APIRouter()

@router.post("/transcribe-audio")
def transcribe_audio_route(audio: UploadFile = File(...), authorization: str = Header(...)):
    result = transcribe_service.transcribe_audio(authorization, audio)
    return {"data": result}
