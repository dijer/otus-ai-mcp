# RAG Knowledge Base MCP (Node.js)

MCP сервер локальной базы знаний по тактикам на боссов в Path of Exile 2 с гибридным поиском и генерацией ответа через Ollama.

Текущий стек: Node.js + TypeScript.

## Что уже работает

- MCP сервер со стандартным stdio transport.
- 4 инструмента:
  - `index_folder(path, glob_pattern, reindex)`
  - `index_status()`
  - `find_relevant_docs(query, top_k)`
  - `ask_question(question, top_k)`
- Индексация файлов с чанкингом и инкрементальной переиндексацией.
- Гибридный retrieval: BM25 + embedding cosine + RRF.
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

Тесты:

```bash
npm run test
```

Отдельно:

```bash
npm run test:unit
npm run test:integration
npm run test:e2e
```

Примечание по e2e:
- `test:e2e` поднимает HTTP сервер внутри теста автоматически.
- Вручную запускать `npm run dev:http` перед e2e не нужно.

Запуск собранного сервера:

```bash
npm run start
```

## Переменные окружения

Используются переменные из `.env` (пример в `.env.example`):

- `MCP_APP_NAME`
- `MCP_ENV`
- `MCP_LLM_MODEL`
- `MCP_LLM_BASE_URL`
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
npx tsx -e "import { handleIndexStatus } from './src/tools/indexStatus.ts'; console.log(JSON.stringify(handleIndexStatus(), null, 2));"
```

```bash
npx tsx -e "import { handleIndexFolder } from './src/tools/indexFolder.ts'; console.log(JSON.stringify(handleIndexFolder('./sample_docs','**/*',false), null, 2));"
```

```bash
npx tsx -e "import { handleFindRelevantDocs } from './src/tools/findRelevantDocs.ts'; console.log(JSON.stringify(handleFindRelevantDocs('фазы графа геонора',5), null, 2));"
```

```bash
npx tsx -e "import { handleAskQuestion } from './src/tools/askQuestion.ts'; (async () => { const r = await handleAskQuestion('Как безопасно проходить вторую фазу графа геонора?',5); console.log(JSON.stringify(r, null, 2)); })();"
```

## Проверочные промпты

Используй эти промпты в Inspector/IDE после запуска `index_folder("./sample_docs")`.

- `How many key bosses are listed across all acts in the knowledge base?`
- `How many key bosses are listed in this knowledge base (Act 1 + Endgame)?`
- `Which boss has the Banana Reprisal mechanic?`
- `What specific skill does Zekoa use on death?`
- `List all bosses currently available in the dataset.`

Ожидаемые проверки:

- Ответ про количество боссов должен содержать `5` (из `allActsKeyBosses.md`).
- Проверка по Zekoa должна содержать: `throws a banana at the player on death`.

## Чистый старт (для проверки)

После `git clone` директория `data/` уже создана, но пуста — индекс не проиндексирован.
Это значит первый `index_status()` вернет пустое состояние:

```json
{"ok":true,"data":{"isIndexed":false,"filesCount":0,"chunksCount":13,"lastIndexedAt":null}}
```

Если нужно сбросить индекс вручную (например, перед демо):

```bash
docker compose down
rm data/chunks.json data/chunks.jsonl data/index_manifest.json data/history.db
docker compose up --build
```

После этого `index_status()` снова вернет пустое состояние.

## Docker Compose

Запуск сервера в контейнере:

```bash
docker compose up --build
```

Важно:
- Compose поднимает `mcp + chroma + ollama + model-init` одной командой.
- На первом запуске `model-init` скачивает `qwen2.5:3b`, это может занять время.
- `mcp` стартует после запуска `chroma` и готовности `ollama` с загруженной моделью.

Проверка готовности:

```bash
curl http://localhost:3001/health
```

Ожидаемый ответ:

```json
{"ok":true,"name":"poe2-rag-mcp"}
```

Остановка:

```bash
docker compose down
```

## Подключение MCP в VS Code

Для проверки преподавателем рекомендуется подключение к уже поднятому Docker-сервису по HTTP.

1. Подними сервисы:

```bash
docker compose up --build
```

2. Убедись, что сервер доступен:

```bash
curl http://localhost:3001/health
```

3. Добавь MCP-конфиг в VS Code с HTTP transport:

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

Этот вариант не требует локальных абсолютных путей и подходит для проверки из любого проекта.

## Ограничения текущей версии

- Пока нет полного LangGraph-пайплайна (реализован упрощенный corrective flow).
- Для локальных unit/integration тестов используется fallback в память, если Chroma недоступна.

## CI

- GitHub Actions: `.github/workflows/ci.yml`
- Запускает `npm run check` и `npm run test`
