from app.utils.edge_function_caller import call_edge_function

def log_journal(token: str, content: str, date: str, moods: list[str]):
    return call_edge_function("logJournal", token, {
        "content": content,
        "date": date,
        "moods": moods
    })

def get_journal(token: str, date: str):
    return call_edge_function("getJournal", token, {"date": date}, method="GET")

def get_all_journals(token: str):
    return call_edge_function("getAllJournals", token, {}, method="GET")

def update_journal(token: str, journal_id: str, content: str, moods: list[str]):
    return call_edge_function("updateJournal", token, {
        "journalId": journal_id,
        "content": content,
        "moods": moods
    }, method="PUT")

def delete_journal(token: str, journal_id: str):
    return call_edge_function("deleteJournal", token, {
        "journalId": journal_id
    }, method="DELETE")
