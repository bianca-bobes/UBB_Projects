from app.config import SUPABASE_EDGE_FUNCTION_URL
import requests
from fastapi import HTTPException

def transcribe_audio(token: str, audio_file):
    url = f"{SUPABASE_EDGE_FUNCTION_URL}/transcribeAudio"

    headers = {
        "Authorization": token
    }

    files = {
        "audio": (audio_file.filename, audio_file.file, audio_file.content_type),
    }

    try:
        response = requests.post(url, headers=headers, files=files)

        if not response.ok:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        return response.json()

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request to edge function failed: {str(e)}")
