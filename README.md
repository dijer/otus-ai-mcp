# RAG Knowledge Base MCP (Node.js)

MCP-сервер локальной базы знаний по тактикам Path of Exile 2.

## Для преподавателя

1. Запуск сервисов:

```bash
docker compose up --build -d
```

2. Проверка здоровья MCP:

```bash
curl http://localhost:3001/health
```

3. Подключение MCP в агенте/IDE:

```json
{
  "servers": {
    "poe2-rag-mcp": {
      "type": "http",
      "url": "http://localhost:3001/mcp"
    }
  }
}
```

4. Минимальный сценарий приемки:
- `index_status()`
- `index_folder("./sample_docs")`
- `index_status()`
- `find_relevant_docs("...", 5)`
- `ask_question("...", 5)`

5. Проверочный вопрос (контроль RAG):
- Вопрос: `What specific skill does Zekoa use on death?`
- Ожидаемый факт в ответе: `throws a banana at the player on death`.

## Коротко по проекту

- Инструменты MCP: `index_folder`, `index_status`, `find_relevant_docs`, `ask_question`.
- Retrieval: самописный Okapi BM25 + vector search + RRF.
- LLM: Ollama (`qwen2.5:3b` по умолчанию).
- Хранилища: локальные `data/chunks.jsonl`, `data/history.db`, `data/chroma`.

## Локальная проверка

```bash
npm run check
npm run lint
npm run test
```
