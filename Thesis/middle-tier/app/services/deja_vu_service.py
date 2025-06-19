from app.utils.edge_function_caller import call_edge_function

def log_deja_vu(token: str, deja_vu_text: str):
    return call_edge_function("logDejaVu", token, {"content": deja_vu_text})

def get_deja_vu(token: str, deja_vu_id: str):
    return call_edge_function("getDejaVu", token, {"id": deja_vu_id}, method="GET")

def get_all_deja_vus(token: str):
    return call_edge_function("getAllDejaVus", token, {}, method="GET")


def update_deja_vu(token: str, deja_vu_id: str, deja_vu_text: str):
    return call_edge_function("updateDejaVu", token, {"dejaVuId": deja_vu_id, "content": deja_vu_text}, method="PUT")


def delete_deja_vu(token: str, deja_vu_id: str):
    return call_edge_function("deleteDejaVu", token, {"dejaVuId": deja_vu_id}, method="DELETE")


def match_deja_vu(token: str, deja_vu_id: str, deja_vu_text: str):
    return call_edge_function("matchDejaVu", token, {
        "dejaVuId": deja_vu_id,
        "content": deja_vu_text
    })
