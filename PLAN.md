# PLAN

## 0. Контекст

- Проект: MCP-сервер с Corrective RAG.
- База знаний: Path of Exile 2.
- Темы данных: классы, уникальные предметы, боссы, пассивные умения.
- Доп. требование: MCP должен хранить историю.

## 1. Цели плана

- Реализовать 4 MCP-инструмента по требованиям.
- Поднять гибридный retrieval (BM25 + vector + RRF).
- Реализовать Corrective RAG граф с retry до 2.
- Добавить хранение истории запросов/ответов/вызовов инструментов.
- Подготовить тесты, docker compose, документацию.

## 2. Решение по хранению истории

### 2.1 Что сохраняем

- Вызовы инструментов MCP:
  - `tool_name`
  - `request_payload`
  - `response_status`
  - `error_code` (если есть)
  - `duration_ms`
  - `created_at`
- Историю QA:
  - `question`
  - `rewritten_query`
  - `attempts`
  - `sources`
  - `answer`
  - `created_at`
- Технический трейс retrieval:
  - `bm25_hits`
  - `vector_hits`
  - `rrf_candidates`
  - `final_order`

### 2.2 Где сохраняем

- MVP: локальная SQLite (`./data/history.db`).
- Причина: просто, стабильно, без отдельного сервиса.

### 2.3 Политика хранения

- Ротация: хранить последние N записей (по конфигу).
- Опционально TTL (например, 30 дней).
- Маскирование больших полей в логах при debug=false.

## 3. Этапы реализации

## Этап 1. Каркас проекта и конфиг

Входы:
- REQUIREMENTS.md
- AGENTS.md

Выходы:
- Структура директорий
- Конфиг приложения (пути индекса, модели, history db)
- Базовый MCP сервер с health init

Definition of Done:
- Проект запускается локально.
- Конфиг читается из env/файла.

Риски:
- Расхождение стека с требованиями.

Rollback:
- Оставить минимальный каркас и зафиксировать несовместимые решения в отчете.

## Этап 2. Индексатор документов

Входы:
- DATA SPEC

Выходы:
- Загрузка файлов поддерживаемых форматов
- Чанкинг
- Запись в Chroma
- Метаданные чанков
- Инкрементальная переиндексация

Definition of Done:
- `index_folder` индексирует `sample_docs`.
- `index_status` показывает валидные счетчики.

Риски:
- Нестабильный парсинг json/yaml.

Rollback:
- Fallback на plain-text и лог parse_warnings.

## Этап 3. Retrieval слой

Входы:
- RETRIEVAL SPEC

Выходы:
- BM25 индекс
- Vector retrieval
- RRF объединение
- Дедуп
- ranking trace

Definition of Done:
- `find_relevant_docs` возвращает ранжированные чанки и trace.

Риски:
- Дубли и нестабильный порядок.

Rollback:
- Упростить веса и усилить tie-break правила.

## Этап 4. Graph Corrective RAG

Входы:
- GRAPH SPEC

Выходы:
- Узлы rewrite/retrieve/grade/decision/broaden/generate
- Retry до 2
- Таймауты и fallback

Definition of Done:
- `ask_question` возвращает ответ + источники.
- Цикл retry работает по правилам.

Риски:
- LLM таймауты.

Rollback:
- Деградированный режим: extractive answer из top chunks.

## Этап 5. История MCP

Входы:
- Решение из раздела 2

Выходы:
- Таблицы SQLite для tool_calls и qa_history
- Middleware логирования всех инструментов
- Запись retrieval trace для `ask_question`/`find_relevant_docs`

Definition of Done:
- После вызова инструмента есть запись в БД.
- Можно выгрузить последние N событий.

Риски:
- Рост БД из-за больших trace.

Rollback:
- Ограничить размер trace и хранить только summary.

## Этап 6. Тесты

Входы:
- TEST SPEC

Выходы:
- Минимум 10 тестов (план: 12)
- Unit + e2e

Definition of Done:
- Все тесты проходят локально.
- CI запускает lint + test.

Риски:
- flaky e2e на локальной модели.

Rollback:
- Для CI использовать mock LLM в e2e-lite.

## Этап 7. Инфраструктура и документация

Входы:
- Все предыдущие этапы

Выходы:
- Docker Compose
- README
- ARCHITECTURE
- MCP config пример

Definition of Done:
- `docker compose up` поднимает сервисы.
- Проверочный сценарий из требований выполняется.

Риски:
- Версионные конфликты контейнеров.

Rollback:
- Зафиксировать working версии в compose и lock-файлах.

## 4. План данных по Path of Exile 2

- `sample_docs/classes/`:
  - описания классов, механики, ресурсы, роли.
- `sample_docs/uniques/`:
  - уникальные предметы, модификаторы, условия дропа.
- `sample_docs/bosses/`:
  - фазы, способности, уязвимости.
- `sample_docs/passives/`:
  - ключевые ноды, синергии, ограничения.
- `sample_docs/lore_facts/`:
  - специально добавленные проверочные факты для RAG-проверки.

## 5. Критерии готовности плана

- План покрывает все обязательные требования.
- Есть отдельный этап для хранения истории MCP.
- Есть этапы для тестов, инфраструктуры и документации.
- Можно переходить к реализации этапа 1 после подтверждения.
