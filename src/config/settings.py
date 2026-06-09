from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "poe2-rag-mcp"
    env: str = "dev"
    ollama_model: str = "qwen2.5:3b"
    ollama_base_url: str = "http://localhost:11434"
    chroma_path: str = "./data/chroma"
    history_db_path: str = "./data/history.db"
    index_root: str = "./sample_docs"
    retrieval_topk_default: int = 10
    retrieval_rrf_k: int = 60
    graph_max_retries: int = 2
    graph_timeout_ms: int = 45000
    debug: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="MCP_",
        extra="ignore",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
