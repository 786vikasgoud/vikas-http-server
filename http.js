const http = require("http");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let uuid = uuidv4();
let arr = [100, 200, 300, 400, 500];
const html = ` <!DOCTYPE html>
<html>
  <head></head>
  <body>
    <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
    <p> - Martin Fowler</p>
  </body>
</html>`;

const json = {
  slideshow: {
    author: "Yours Truly",
    date: "date of publication",
    slides: [
      {
        title: "Wake up to WonderWidgets!",
        type: "all",
      },
      {
        items: [
          "Why <em>WonderWidgets</em> are great",
          "Who <em>buys</em> WonderWidgets",
        ],
        title: "Overview",
        type: "all",
      },
    ],
    title: "Sample Slide Show",
  },
};
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/html") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(html, (err) => {
      console.log(err);
    });
    res.end();
  }
  if (req.method === "GET" && req.url === "/json") {
    res.writeHead(200, { "content-type": "text/json" });
    res.write(JSON.stringify(json), (err) => {
      console.log(err);
    });
    res.end();
  }
  if (req.method === "GET" && req.url == "/uuid") {
    res.writeHead(200, { "content-type": "text/uuid" });
    res.write(uuid, (err) => {
      console.log(err);
    });
    res.end();
  }
  arr.forEach((element) => {
    if (req.method === "GET" && req.url === `/status/${element}`) {
      res.writeHead(element);
      res.end(JSON.stringify(res.statusCode));
      res.end();
    }
  });
  if (req.url.includes("delay") && req.method === "GET") {
    res.writeHead(200);
    let arr = req.url.split("/");
    let times = Number(arr[arr.length - 1]);
    if (typeof times === "number") {
      let sam = new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, times * 1000);
      });
      sam.then(() => {
        res.write(JSON.stringify(res.statusCode));
        res.end();
      });
    }
  }
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
