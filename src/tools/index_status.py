from src.types.api import success


def handle_index_status() -> dict:
    return success(
        {
            "message": "Этап 1: заглушка index_status",
            "is_indexed": False,
            "files_count": 0,
            "chunks_count": 0,
            "last_indexed_at": None,
            "stub": True,
        }
    )
