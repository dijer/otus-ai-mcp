from src.types.api import failure, success


def handle_find_relevant_docs(query: str, top_k: int = 10) -> dict:
    if len(query.strip()) < 2:
        return failure("FIND_QUERY_INVALID", "query должен содержать минимум 2 символа")

    if top_k < 1:
        return failure("FIND_TOPK_INVALID", "top_k должен быть >= 1")

    return success(
        {
            "message": "Этап 1: заглушка find_relevant_docs",
            "query": query,
            "top_k": top_k,
            "results": [],
            "ranking_trace": {},
            "stub": True,
        }
    )
