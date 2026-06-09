from dataclasses import asdict, dataclass
from typing import Any


@dataclass
class ToolError:
    code: str
    message: str
    details: dict[str, Any] | None = None


@dataclass
class ToolResponse:
    ok: bool
    data: dict[str, Any] | None = None
    error: ToolError | None = None
    request_id: str | None = None


def success(data: dict[str, Any], request_id: str | None = None) -> dict[str, Any]:
    return asdict(ToolResponse(ok=True, data=data, request_id=request_id))


def failure(
    code: str,
    message: str,
    details: dict[str, Any] | None = None,
    request_id: str | None = None,
) -> dict[str, Any]:
    return asdict(
        ToolResponse(
            ok=False,
            error=ToolError(code=code, message=message, details=details),
            request_id=request_id,
        )
    )
