from app.utils.edge_function_caller import call_edge_function

def interpret_dream(token: str, dream_id: str, dream_text: str, length: str, style: str, dream_date: str = None):
    payload = {
        "dreamId": dream_id,
        "dreamText": dream_text,
        "length": length,
        "style": style,
    }
    if dream_date:
        payload["dreamDate"] = dream_date

    return call_edge_function("interpretDream", token, payload)
