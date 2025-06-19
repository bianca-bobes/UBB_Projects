from app.utils.edge_function_caller import call_edge_function

def mark_dream_as_real(token: str, dream_id: str):
    return call_edge_function("markDreamAsReal", token, {"dreamId": dream_id})
