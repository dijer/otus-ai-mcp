from src.types.api import failure, success


def handle_ask_question(question: str, top_k: int = 8) -> dict:
    if len(question.strip()) < 3:
        return failure("ASK_QUESTION_INVALID", "question должен содержать минимум 3 символа")

    return success(
        {
            "message": "Этап 1: заглушка ask_question",
            "question": question,
            "top_k": top_k,
            "answer": "Not implemented in stage 1",
            "sources": [],
            "stub": True,
        }
    )
