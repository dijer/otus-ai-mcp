from fastmcp import FastMCP

from src.config.settings import get_settings
from src.tools.ask_question import handle_ask_question
from src.tools.find_relevant_docs import handle_find_relevant_docs
from src.tools.index_folder import handle_index_folder
from src.tools.index_status import handle_index_status


def create_server() -> FastMCP:
    settings = get_settings()
    mcp = FastMCP(settings.app_name)

    @mcp.tool(
        description="Индексирует папку документов для базы знаний Path of Exile 2. "
        "Используется при первом запуске или после обновления документов."
    )
    def index_folder(path: str, glob_pattern: str = "**/*", reindex: bool = False) -> dict:
        return handle_index_folder(path=path, glob_pattern=glob_pattern, reindex=reindex)

    @mcp.tool(
        description="Отвечает на вопрос пользователя по локальной базе знаний "
        "(классы, уникальные предметы, боссы, пассивные умения)."
    )
    def ask_question(question: str, top_k: int = 8) -> dict:
        return handle_ask_question(question=question, top_k=top_k)

    @mcp.tool(
        description="Возвращает релевантные чанки без генерации ответа. "
        "Полезно для проверки качества поиска и источников."
    )
    def find_relevant_docs(query: str, top_k: int = 10) -> dict:
        return handle_find_relevant_docs(query=query, top_k=top_k)

    @mcp.tool(
        description="Показывает состояние индекса: количество файлов, чанков и время "
        "последней индексации."
    )
    def index_status() -> dict:
        return handle_index_status()

    return mcp


mcp = create_server()


if __name__ == "__main__":
    mcp.run()
