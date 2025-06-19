from app.utils.edge_function_caller import call_edge_function

def log_dream(token: str, dream_text: str):
    return call_edge_function("logDream", token, {"content": dream_text})


def get_dream(token: str, dream_id: str):
    return call_edge_function("getDream", token, {"id": dream_id}, method="GET")

def get_all_dreams(token: str):
    return call_edge_function("getAllDreams", token, {}, method="GET")


def update_dream(token: str, dream_id: str, dream_text: str):
    return call_edge_function("updateDream", token, {"dreamId": dream_id, "content": dream_text}, method="PUT")


def delete_dream(token: str, dream_id: str):
    return call_edge_function("deleteDream", token, {"dreamId": dream_id}, method="DELETE")
