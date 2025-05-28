import express from "express";
import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const app = express();
const BUILD_DIR = path.resolve(__dirname, "../build");

// Serve static files from the build directory
app.use(express.static(BUILD_DIR));

// Handle all routes for server-side rendering
app.get("*", (req, res) => {
  // Read the index.html file
  const indexHtml = fs.readFileSync(path.resolve(BUILD_DIR, "index.html"), {
    encoding: "utf8",
  });

  // Find where to inject our React SSR content
  const [htmlStart, htmlEnd] = indexHtml.split('<div id="root"></div>');

  const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
    {
      bootstrapScripts: [],
      onAllReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        res.write(htmlStart + '<div id="root">');
        pipe(res);
        res.write('</div>' + htmlEnd);
      },
      onShellError() {
        res.statusCode = 500;
        res.send("<!doctype html><p>Loading...</p>");
      },
    }
  );
});

app.listen(3003, () => {
  console.log("App is running on http://localhost:3003");
});
