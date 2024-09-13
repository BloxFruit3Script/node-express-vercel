const express = require("express");
const router = express.Router();

const keyRegex = /let content = "([^"]+)";/;

async function fetch(url, headers) {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch URL: ${url}. Error: ${error.message}`);
  }
}

async function bypassLink(url) {
  try {
    const hwid = url.split("HWID=")[1];
    if (!hwid) {
      throw new Error("Invalid HWID in URL");
    }

    const startTime = Date.now();
    const endpoints = [
      {
        url: `https://flux.li/android/external/start.php?HWID=${hwid}`,
        referer: ""
      },
      {
        url: `https://flux.li/android/external/check1.php?hash={hash}`,
        referer: "https://linkvertise.com"
      },
      {
        url: `https://flux.li/android/external/main.php?hash={hash}`,
        referer: "https://linkvertise.com"
      }
    ];

    for (let endpoint of endpoints) {
      const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'DNT': '1',
        'Connection': 'close',
        'Referer': endpoint.referer,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      };

      const responseText = await fetch(endpoint.url, headers);

      if (endpoint === endpoints[endpoints.length - 1]) {
        const match = keyRegex.exec(responseText);
        if (match) {
          const endTime = Date.now();
          const timeTaken = (endTime - startTime) / 1000;
          return { content: match[1], timeTaken };
        } else {
          throw new Error("Failed to find content key");
        }
      }
    }
  } catch (error) {
    throw new Error(`Failed to bypass link. Error: ${error.message}`);
  }
}

app.get("/", (req, res) => {
  res.json({ message: "Invalid Endpoint" });
});

app.get("/api/fluxus", async (req, res) => {
  const url = req.query.url;
  if (url && url.startsWith("https://flux.li/android/external/start.php?HWID=")) {
    try {
      const { content, timeTaken } = await bypassLink(url);
      res.json({ key: content, time_taken: timeTaken, credit: "ibypass.vio" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.json({ message: "Please Enter Fluxus Link!" });
  }
});

module.exports = router;
