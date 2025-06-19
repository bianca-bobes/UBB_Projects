
import requests
from fastapi import HTTPException
from app.config import SUPABASE_EDGE_FUNCTION_URL

def call_edge_function(endpoint: str, token: str, payload: dict = None, method: str = "POST"):
    url = f"{SUPABASE_EDGE_FUNCTION_URL}/{endpoint}"
    headers = {
        "Authorization": token
    }

    method = method.upper()

    try:
        if method == "GET":
            response = requests.get(url, headers=headers, params=payload or {})
        elif method == "POST":
            headers["Content-Type"] = "application/json"
            response = requests.post(url, headers=headers, json=payload or {})
        elif method == "PUT":
            headers["Content-Type"] = "application/json"
            response = requests.put(url, headers=headers, json=payload or {})
        elif method == "DELETE":
            headers["Content-Type"] = "application/json"
            response = requests.delete(url, headers=headers, json=payload or {})
        else:
            raise ValueError(f"Unsupported HTTP method: {method}")

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        return response.json()

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request to edge function failed: {str(e)}")
