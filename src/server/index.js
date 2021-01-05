import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";

const app = express();

app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const indexHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="bundle.js" defer></script>
    </head>
    <body>
        <div id="root">${renderToString(<App />)}</div>
    </body>
    </html>`;
  res.send();
});
app.listen(process.env.PORT || 3001, () => {
  console.log("App listening on port 3001");
});
