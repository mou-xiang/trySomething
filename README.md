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

## 线上部署（已上线 https://kokoroboto.online）

- 服务器：腾讯云香港轻量（Debian），用户 sun，pm2 守护
- 证书：certbot，/etc/letsencrypt/live/kokoroboto.online/（2026-11-19 到期）

### 更新代码上线（4 步曲）

```bash
# 本地：
git add -A && git commit -m "改了什么" && git push
# 服务器：
cd ~/trySomething && git pull
pm2 restart trysomething
```

### 查看日志

```bash
pm2 logs trysomething              # 实时滚动
pm2 logs trysomething --lines 50 --nostream   # 看最近 50 行
# 日志文件位置：
# ~/.pm2/logs/trysomething-out.log   （访问日志）
# ~/.pm2/logs/trysomething-error.log（错误日志）
```

> ⚠️ 证书续期后（约 2026-11-19）需重跑：
> `sudo chmod 755 /etc/letsencrypt/live /etc/letsencrypt/archive`
> `sudo chmod 644 /etc/letsencrypt/archive/kokoroboto.online/privkey*.pem`

## 里程碑进度

见 [PLAN.md](PLAN.md)。
