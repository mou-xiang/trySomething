# trySomething — 手写 Web 服务器项目

用 Node 原生 `http` 模块从零写一个 Web 服务器，理解 HTTP，然后部署到自己的域名上。

## 运行

```bash
node server.js
# 然后浏览器打开 http://localhost:8080
```

## 验证

```bash
curl http://localhost:8080
```

## 结构

```
server.js          # 手写 http 服务器（核心）
public/            # 静态文件（M1 起）
data/store.json    # 数据持久化（M2 起）
PLAN.md            # 里程碑打卡清单
```

## 里程碑进度

见 [PLAN.md](PLAN.md)。
