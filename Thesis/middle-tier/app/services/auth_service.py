import requests
from fastapi import HTTPException
from app.config import SUPABASE_URL, SUPABASE_ANON_KEY

SUPABASE_AUTH_URL = f"{SUPABASE_URL}/auth/v1"

headers = {
    "apikey": SUPABASE_ANON_KEY,
    "Content-Type": "application/json"
}


def sign_up_user(email: str, password: str):
    response = requests.post(
        f"{SUPABASE_AUTH_URL}/signup",
        headers=headers,
        json={"email": email, "password": password}
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()


def sign_in_user(email: str, password: str):
    response = requests.post(
        f"{SUPABASE_AUTH_URL}/token?grant_type=password",
        headers=headers,
        json={"email": email, "password": password}
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()

def update_email(token: str, new_email: str):
    response = requests.put(
        f"{SUPABASE_AUTH_URL}/user",
        headers={
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        json={"email": new_email}
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()

def update_password(token: str, new_password: str):
    response = requests.put(
        f"{SUPABASE_AUTH_URL}/user",
        headers={
            "apikey": SUPABASE_ANON_KEY,
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        },
        json={"password": new_password}
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.json())

    return response.json()
