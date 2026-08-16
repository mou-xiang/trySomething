// server.js — 我们的第一个 Web 服务器（M0 里程碑）
// 只用 Node 内置模块，零 npm 依赖。
// 目标：理解 HTTP 请求/响应、端口、localhost。

const http = require('node:http'); // 引入 Node 内置的 http 模块

const PORT = 8080; // 服务器监听的端口（0~65535 中的一个）

// createServer 接收一个"处理器"函数：
// 每次有请求进来，Node 都会调用它，并告诉我们 req（请求）和 res（响应）。
const server = http.createServer((req, res) => {
  // 在终端打印一条访问日志：时间 + 请求方法 + 请求路径
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  // 设置响应：状态码 200 = 成功
  res.statusCode = 200;
  // 告诉浏览器响应内容的类型（text/plain = 纯文本，utf-8 支持中文）
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  // 发送响应内容并结束本次请求
  res.end('你好，世界！这是我用自己的代码写的 Web 服务器。');
});

// 让服务器开始监听 8080 端口。localhost = 你自己的电脑。
server.listen(PORT, () => {
  console.log(`服务器已启动：http://localhost:${PORT}`);
});
