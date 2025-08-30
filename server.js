import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type.
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use("/{*any}", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Read index.html
      let template = await fs.readFile(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // Apply Vite HTML transforms.
      template = await vite.transformIndexHtml(url, template);

      // Load the server entry.
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

      // Render the app HTML and get state.
      const {
        html: appHtml,
        finalReduxState,
        dehydratedState,
      } = await render(url, {});

      // Inject the app-rendered HTML and state into the template.
      const stateScript = `
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(
          finalReduxState
        ).replace(/</g, "\\u003c")}</script>
        <script>window.__DEHYDRATED_STATE__ = ${JSON.stringify(
          dehydratedState
        )}</script>
      `;
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`</head>`, `${stateScript}</head>`);

      // Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173, () =>
    console.log("Server is running at http://localhost:5173")
  );
}

createServer();
