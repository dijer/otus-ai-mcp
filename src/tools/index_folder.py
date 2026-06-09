from src.types.api import failure, success


def handle_index_folder(path: str, glob_pattern: str = "**/*", reindex: bool = False) -> dict:
    if not path.strip():
        return failure("INDEX_PATH_INVALID", "path не должен быть пустым")

    return success(
        {
            "message": "Этап 1: заглушка index_folder",
            "path": path,
            "glob_pattern": glob_pattern,
            "reindex": reindex,
            "stub": True,
        }
    )
