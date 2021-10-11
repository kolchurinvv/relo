import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  app.use(vite.middlewares);
  app.use("*", async (req: Request, res: Response) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/server-entry.ts");

      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      console.log(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(8080, () => {
    console.log("Server is runnins on http://localhost:8080");
    console.log("http://127.0.0.1:8080");
  });
}

createServer();
