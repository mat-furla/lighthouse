const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const express = require("express");
const cors = require("cors");

var app = express();
app.use(express.json());
app.use(cors());

app.get("/audit", async (req, res) => {
  const { url_site } = req.query;
  var answer = { err: false, content: "" };

  try {
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
    const options = {
      logLevel: "info",
      output: "json",
      port: chrome.port
    };
    const runnerResult = await lighthouse(url_site, options);
    await chrome.kill();

    answer.err = false
    answer.content = runnerResult.lhr.categories
    return res.json(answer.content)
  }
  catch (err) {
    answer.err = true
    answer.content = "Falha ao fazer requisicão. Erro: " + err
    return res.json(answer)
  }
});

app.listen(process.env.PORT)