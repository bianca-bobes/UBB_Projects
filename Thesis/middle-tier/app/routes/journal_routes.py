from fastapi import APIRouter, Header
from pydantic import BaseModel
from app.services import journal_service

router = APIRouter()

class LogJournalRequest(BaseModel):
    content: str
    date: str
    moods: list[str]

class UpdateJournalRequest(BaseModel):
    journal_id: str
    content: str
    moods: list[str]

@router.post("/log-journal")
def log_journal_route(body: LogJournalRequest, authorization: str = Header(...)):
    result = journal_service.log_journal(authorization, body.content, body.date, body.moods)
    return {"message": "Journal logged", "data": result}

@router.get("/get-journal/{date}") 
def get_journal_route(date: str, authorization: str = Header(...)):
    result = journal_service.get_journal(authorization, date)
    return {"data": result}

@router.get("/get-all-journals")
def get_all_journals_route(authorization: str = Header(...)):
    result = journal_service.get_all_journals(authorization)
    return {"data": result}

@router.put("/update-journal")
def update_journal_route(body: UpdateJournalRequest, authorization: str = Header(...)):
    result = journal_service.update_journal(authorization, body.journal_id, body.content,body.moods)
    return {"message": "Journal updated", "data": result}

@router.delete("/delete-journal/{journal_id}")
def delete_journal_route(journal_id: str, authorization: str = Header(...)):
    result = journal_service.delete_journal(authorization, journal_id)
    return {"message": "Journal deleted", "data": result}
