# RAG Knowledge Base MCP (Node.js)

MCP сервер локальной базы знаний с гибридным поиском и генерацией ответа через Ollama.

Текущий стек: Node.js + TypeScript.

## Что уже работает

- MCP сервер со стандартным stdio transport.
- 4 инструмента:
  - `index_folder(path, glob_pattern, reindex)`
  - `index_status()`
  - `find_relevant_docs(query, top_k)`
  - `ask_question(question, top_k)`
- Индексация файлов с чанкингом и инкрементальной переиндексацией.
- Гибридный retrieval: BM25 + cosine + RRF.
- Базовый retry в `ask_question` + генерация через Ollama API.

## Структура

- `src/server/main.ts` — MCP сервер и регистрация инструментов
- `src/tools/*` — обработчики инструментов
- `src/indexing/indexer.ts` — индексатор
- `src/retrieval/hybrid.ts` — retrieval и RRF
- `src/config/settings.ts` — env-конфиг

## Требования

- Node.js 20+
- npm 10+
- Ollama (локально) и загруженная модель (по умолчанию `qwen2.5:3b`)

## Установка

```bash
npm install
```

## Локальный запуск

Режим разработки:

```bash
npm run dev
```

Сборка:

```bash
npm run build
```

Проверка типов:

```bash
npm run check
```

Запуск собранного сервера:

```bash
npm run start
```

## Переменные окружения

Используются переменные из `.env` (пример в `.env.example`):

- `MCP_APP_NAME`
- `MCP_ENV`
- `MCP_OLLAMA_MODEL`
- `MCP_OLLAMA_BASE_URL`
- `MCP_CHROMA_PATH`
- `MCP_HISTORY_DB_PATH`
- `MCP_INDEX_ROOT`
- `MCP_RETRIEVAL_TOPK_DEFAULT`
- `MCP_RETRIEVAL_RRF_K`
- `MCP_GRAPH_MAX_RETRIES`
- `MCP_GRAPH_TIMEOUT_MS`
- `MCP_DEBUG`

## Пример smoke-проверки без IDE

```bash
npx tsx -e "import { handleIndexStatus } from './src/tools/index_status.ts'; console.log(JSON.stringify(handleIndexStatus(), null, 2));"
```

```bash
npx tsx -e "import { handleIndexFolder } from './src/tools/index_folder.ts'; console.log(JSON.stringify(handleIndexFolder('./sample_docs','**/*',false), null, 2));"
```

```bash
npx tsx -e "import { handleFindRelevantDocs } from './src/tools/find_relevant_docs.ts'; console.log(JSON.stringify(handleFindRelevantDocs('Geonor phases',5), null, 2));"
```

```bash
npx tsx -e "import { handleAskQuestion } from './src/tools/ask_question.ts'; (async () => { const r = await handleAskQuestion('Какие фазы у Count Geonor?',5); console.log(JSON.stringify(r, null, 2)); })();"
```

## Подключение MCP в VS Code

Файл конфигурации: `.vscode/mcp.json`.

Текущая конфигурация запускает сервер через `npx tsx src/server/main.ts`.

## Ограничения текущей версии

- Пока нет отдельного слоя истории SQLite (tool_calls/qa_history/retrieval_traces).
- Пока нет полного LangGraph-пайплайна (реализован упрощенный corrective flow).
- Тестовый контур и docker compose еще в процессе.
