from app.utils.edge_function_caller import call_edge_function

def match_deja_vu(token: str, deja_vu_id: str):
    return call_edge_function("matchDejaVu", token, {
        "dejaVuId": deja_vu_id
    })
