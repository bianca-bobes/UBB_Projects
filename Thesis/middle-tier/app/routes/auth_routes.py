from fastapi import APIRouter,Header, HTTPException
from pydantic import BaseModel, EmailStr
from app.services import auth_service

router = APIRouter()


class SignUpRequest(BaseModel):
    email: EmailStr
    password: str


class SignInRequest(BaseModel):
    email: EmailStr
    password: str


class UpdateEmailRequest(BaseModel):
    new_email: EmailStr

class UpdatePasswordRequest(BaseModel):
    new_password: str

@router.post("/auth/sign-up")
def sign_up(body: SignUpRequest):
    result = auth_service.sign_up_user(body.email, body.password)
    return {"message": "User signed up successfully", "data": result}


@router.post("/auth/sign-in")
def sign_in(body: SignInRequest):
    result = auth_service.sign_in_user(body.email, body.password)
    return {"message": "User signed in successfully", "data": result}
    

@router.post("/auth/update-email")
def update_email(body: UpdateEmailRequest, authorization: str = Header(...)):
    result = auth_service.update_email(authorization, body.new_email)
    return {"message": "Email update initiated", "data": result}
    

@router.post("/auth/update-password")
def update_password(body: UpdatePasswordRequest, authorization: str = Header(...)):
    result = auth_service.update_password(authorization, body.new_password)
    return {"message": "Password updated", "data": result}
