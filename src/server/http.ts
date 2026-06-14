import http from "node:http";

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { getSettings } from "../config/settings.js";
import { createMcpServer } from "./createServer.js";

const main = async (): Promise<void> => {
  const settings = getSettings();
  const port = Number.parseInt(process.env.MCP_HTTP_PORT ?? "3001", 10);

  const readBody = (req: http.IncomingMessage): Promise<unknown> =>
    new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      req.on("data", (chunk: Buffer) => chunks.push(chunk));
      req.on("end", () => {
        const raw = Buffer.concat(chunks).toString("utf-8");
        if (!raw) { resolve(undefined); return; }
        try { resolve(JSON.parse(raw)); } catch { resolve(undefined); }
      });
      req.on("error", reject);
    });

  const server = http.createServer(async (req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end("Missing URL");
      return;
    }

    const pathname = req.url.split("?")[0];

    if (pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true, name: settings.appName }));
      return;
    }

    if (pathname === "/mcp") {
      // Stateless: новый сервер и транспорт на каждый запрос
      const mcpServer = createMcpServer();
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
      await mcpServer.connect(transport);
      const parsedBody = req.method === "POST" ? await readBody(req) : undefined;
      await transport.handleRequest(req, res, parsedBody);
      await transport.close();
      return;
    }

    res.statusCode = 404;
    res.end("Not Found");
  });

  server.listen(port, () => {
    console.log(`MCP HTTP server listening on http://localhost:${port}/mcp`);
    console.log(`Health endpoint: http://localhost:${port}/health`);
  });

  const shutdown = (): void => {
    server.close();
  };

  process.on("SIGINT", () => {
    void shutdown();
  });
  process.on("SIGTERM", () => {
    void shutdown();
  });
};

main().catch((error) => {
  console.error("MCP HTTP server failed", error);
  process.exitCode = 1;
});
