# ARCHITECTURE

## 1. Цель

Построить MCP-сервер локальной базы знаний по тактикам на боссов в Path of Exile 2 с Corrective RAG, гибридным retrieval и хранением истории вызовов/ответов.

## 2. Контекст и ограничения

- Локальная LLM через Ollama.
- Гибридный поиск: BM25 + vector + RRF.
- Corrective RAG цикл: rewrite -> retrieve -> grade -> broaden -> retry (max 2) -> generate.
- Обязательные MCP инструменты:
  - index_folder
  - ask_question
  - find_relevant_docs
  - index_status
- История MCP сохраняется локально в SQLite.

## 3. Компоненты системы

### 3.1 MCP API Layer

Назначение:
- Экспорт 4 инструментов MCP.
- Валидация входов.
- Стандартизация ошибок и ответов.
- Проброс request_id для трассировки.

Модули:
- tools/indexFolder
- tools/askQuestion
- tools/findRelevantDocs
- tools/indexStatus

### 3.2 Ingestion Layer (Indexing)

Назначение:
- Чтение файлов поддерживаемых форматов.
- Чанкинг текста/кода/структурированных данных.
- Расчет метаданных и хэшей.
- Инкрементальная переиндексация.

Выход:
- Векторный индекс в Chroma.
- BM25 индекс.
- Статистика индекса.

### 3.3 Retrieval Layer

Назначение:
- BM25 retrieval (sparse).
- Vector retrieval (dense).
- RRF fusion.
- Дедуп и обрезка top_k.
- Формирование ranking trace.

### 3.4 Orchestration Layer (Corrective RAG Graph)

Назначение:
- Управление графом шагов ответа.
- Retry до 2 при низкой релевантности.
- Таймауты и fallback на каждом узле.

Узлы:
- rewrite
- retrieve_hybrid
- grade_chunks
- decision
- broaden_query
- generate

### 3.5 History and Observability Layer

Назначение:
- Логирование вызовов MCP инструментов.
- Хранение истории QA.
- Хранение retrieval trace (summary/full по конфигу).

Хранилище:
- SQLite: ./data/history.db

## 4. Хранилища данных

### 4.1 Chroma (Vector Store)

Содержит:
- embeddings чанков
- метаданные чанков

### 4.2 BM25 Index

Содержит:
- токенизированные документы
- статистики термов
- связь chunk_id -> текст

### 4.3 SQLite History

Таблицы:
- tool_calls
- qa_history
- retrieval_traces

Минимальные поля:
- tool_calls:
  - id, request_id, tool_name, request_payload, response_status, error_code, duration_ms, created_at
- qa_history:
  - id, request_id, question, rewritten_query, attempts, answer, sources_json, created_at
- retrieval_traces:
  - id, request_id, query, bm25_hits_json, vector_hits_json, rrf_candidates_json, final_order_json, created_at

## 5. Потоки выполнения

### 5.1 index_folder

1. Валидация path и glob.
2. Сканирование файлов и фильтрация форматов.
3. Инкрементальная сверка file_hash.
4. Чанкинг и метаданные.
5. Генерация embeddings и запись в Chroma.
6. Обновление BM25 индекса.
7. Обновление index stats.
8. Запись события в history.

### 5.2 find_relevant_docs

1. Валидация query/top_k.
2. BM25 retrieval.
3. Vector retrieval.
4. RRF fusion.
5. Дедуп и обрезка до top_k.
6. Формирование ranking trace.
7. Запись события и trace в history.
8. Возврат ранжированных чанков.

### 5.3 ask_question

1. Валидация question/top_k.
2. Запуск графа Corrective RAG.
3. При успехе: answer + sources.
4. При degraded/fail: контролируемый частичный ответ.
5. Запись QA и trace в history.
6. Возврат стандартизированного ответа.

### 5.4 index_status

1. Чтение статистики индекса.
2. Возврат агрегированных метрик.
3. Запись события в history.

## 6. Конфигурация

Ключевые параметры:
- LLM_MODEL
- LLM_BASE_URL
- CHROMA_PATH
- HISTORY_DB_PATH
- INDEX_ROOT
- SUPPORTED_EXTENSIONS
- RETRIEVAL_TOPK_DEFAULT
- RETRIEVAL_RRF_K
- GRAPH_MAX_RETRIES
- GRAPH_TIMEOUT_MS
- HISTORY_MAX_RECORDS

## 7. Ошибки и отказоустойчивость

Принципы:
- Единый формат ошибок для всех инструментов.
- Recoverable ошибки с fallback (rewrite/grade/generate).
- Non-recoverable ошибки завершают пайплайн с безопасным ответом.
- Глобальный timeout для графа.

## 8. Инфраструктура

Сервисы docker compose:
- mcp-server
- ollama
- model-init (опционально подготовка модели)

Локальные директории:
- ./data/chroma
- ./data/history.db
- ./sample_docs

## 9. Схема модулей проекта

- src/server
- src/tools
- src/indexing
- src/retrieval
- src/graph
- src/history
- src/storage
- src/config
- src/types
- tests/unit
- tests/e2e

## 10. Нефункциональные цели

- Детерминированность retrieval порядка.
- Повторяемость запуска локально и в CI.
- Явная трассировка request_id по всем слоям.
- Простая расширяемость под новые домены данных.

## 11. Границы и future work

Не входит в MVP:
- distributed storage
- multi-tenant auth
- продвинутая аналитика usage

Возможные расширения:
- отдельный инструмент history_query
- полнотекстовый поиск по истории
- versioned индексы и snapshot rollback
