// server.js
// 只用 Node 内置模块，零 npm 依赖。
// 目标：理解 HTTP 请求/响应、端口、localhost。

const http = require("node:http"); // 引入 Node 内置的 http 模块
const https = require("node:https");
const fs = require("node:fs"); // 引入 Node 内置的 fs 模块，用于文件操作

const PORT = 8080; // 服务器监听的端口（0~65535 中的一个）

//启动时读取store.json
let store = JSON.parse(fs.readFileSync("./data/store.json", "utf-8"));

//保存json函数
function saveStore() {
  fs.writeFileSync("./data/store.json", JSON.stringify(store, null, 2));
}

function serverFile(path, type, res) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      res.statusCode = 404; // 设置响应状态码为 404（未找到）
      res.end("404 Not Found"); // 发送 404 响应
      console.error("读取文件失败:", err);
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", type + "; charset=utf-8");
    res.end(data);
  });

}
// createServer 接收一个"处理器"函数：
// 每次有请求进来，Node 都会调用它，并告诉我们 req（请求）和 res（响应）。
const handler = (req, res) => {
  // 在终端打印一条访问日志：时间 + 请求方法 + 请求路径
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  // 设置响应：状态码 200 = 成功
  res.statusCode = 200;

  if (req.url === "/") {
    store.visits = store.visits + 1; //GET '/' visits + 1
    saveStore();
    serverFile("./public/index.html", "text/html", res);
  } else if (req.url === "/about") {
    serverFile("./public/about.html", "text/html", res)
  } else if (req.url === "/style.css") {
    serverFile("./public/style.css", "text/css", res);
  } else if (req.url === "/app.js") {
    serverFile("./public/app.js", "text/javascript", res);
  } else if (req.url === "/api/visits") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ visits: store.visits }));
  } else if (req.url === "/api/messages" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk });
    req.on("end", () => {
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch (e) {
        res.statusCode = 400;                             // ⑤ 解析失败 → 400
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(JSON.stringify({ error: "请求体不是合法 JSON" }));
        return;
      }
      store.messages.push({
        name: parsed.name,
        message: parsed.message,
        time: new Date().toISOString()
      });
      saveStore();
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify({ messages: store.messages }));
    });
  } else if (req.url === "/api/messages") {      // ← 新加的 GET 分支，放这里
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ messages: store.messages }));
  } else {
    res.statusCode = 404; // 设置响应状态码为 404（未找到）
    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.end("404 Not Found"); // 发送 404 响应
    return;
  }
}

// HTTP（80 端口）→ 全部跳到 HTTPS
http.createServer((req, res) => {
  res.writeHead(302, { Location: 'https://' + req.headers.host + req.url });
  res.end();
}).listen(80, () => console.log('HTTP 已启动 :80 → 跳转 HTTPS'));

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/kokoroboto.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/kokoroboto.online/fullchain.pem')
}, handler).listen(443, () => console.log('HTTPS 已启动 :443'));

// 让服务器开始监听 8080 端口。localhost = 你自己的电脑。
// server.listen(PORT, () => {
//   console.log(`服务器已启动：http://localhost:${PORT}`);
// });

