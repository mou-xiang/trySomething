# 🧠 项目记忆文件（跨对话交接用）

> 用法：把本文件内容粘贴给新对话，或告诉新对话"阅读 MEMORY.md 后继续"。
> 更新：每次重要进展后，让 AI 更新本文件。

---

## 一句话项目

用 **Node 原生 http 模块手写 Web 服务器**（零 npm 依赖），部署到 **腾讯云/阿里云（中国香港地域，免 ICP 备案）**，绑定**自己的域名**，实现公网 HTTPS 可访问的网站，含**访客计数 + 留言板**功能。

---

## 👤 用户画像与目标

- **编程水平**：有一定基础，缺完整项目经验（能读写代码，未独立完成过端到端项目）
- **核心目标**：养成持续编程的习惯（比"做出网站"更重要）
- **兴趣**：网络编程、发布上线、理解底层原理（对 C/Rust 写服务器有好奇心，机器上装有 gcc 16 / rustc 1.97）
- **预算**：约 100~200 元/年（服务器 + 域名，首年）
- **关键约束**：✅ 不想做 ICP 备案（已确认）→ 必须用香港/境外地域
- **云厂商**：腾讯云或阿里云，按促销价选，两家方案相同
- **时间**：每周 5~10 小时
- **沟通语言**：中文

## 🤝 协作方式（重要，务必遵守）

**混合式**：
1. 课前：把本次目标写进 PLAN.md（1~3 个小任务）
2. **绝大部分代码由用户亲手写** —— AI 不代写正式代码
3. **难点 AI 示范**：给出可运行的示例片段（临时 demo 文件，跑完即删），用户读懂后自己写进项目
4. **AI review**：每个里程碑结束，读取用户文件做代码审查，指出 bug 并讲解概念（逐行、耐心）
5. 收尾仪式：git commit → PLAN.md 打卡记录写一行
6. **账号/购买操作由用户执行**，AI 逐步指导，不代操作
7. 用户卡壳超 20 分钟会主动求助（遵守"卡壳规则"），AI 应及时给予详细讲解

---

## 📍 当前进度（截至 2026-08-20）

| 里程碑 | 状态 | 内容 |
|--------|------|------|
| M0 | ✅ | 最小服务器 + curl 验证（commit 614185b） |
| M1 | ✅ | 静态文件 + 路由（/、/about、404）+ serverFile 重构（192b2b1） |
| M2 | ✅ | API 与数据：访客计数 + 留言板 + JSON 持久化，12 项测试全绿（d00f59c） |
| 复习 | ✅ | M2 六大概念自测 6/6 全对（d06a06b） |
| **M3** | ✅ | 网络理论已学（DNS/TCP/HTTP 实验）；**已购腾讯云香港轻量服务器（Debian）+ 域名已买且实名通过**（2026-08-20） |
| M4 | ✅ | **https://kokoroboto.online 上线（2026-08-21）**：Node v22.23.2 + pm2（sun 用户）+ certbot 证书 + HTTP→HTTPS 302 跳转，外网 80/443 可达 |
| M5 | 🔄 进行中 | 看真实访问日志、公测发朋友、证书续期备忘（2026-11-19 前后需重新 chmod 私钥） |
| M4 | ⏳ | 部署：SSH → 装 Node → 防火墙 → pm2 → 域名 A 记录 → HTTPS 绿锁 |
| M5 | ⏳ | 上线打磨：强制 HTTPS、看真实访问日志、公测发朋友 |

git 历史：614185b → 192b2b1 → d00f59c → d06a06b → 952e33f → 8995756 → 6d16b9f（分支 main）
- **GitHub 仓库**：https://github.com/mou-xiang/trySomething（已推送，SSH 认证可用，账号 mou-xiang）
- **沙箱内 git 推送到 GitHub 的坑**：git 自带的 MSYS ssh 在沙箱里无法建信号管道 → 已用仓库级配置 `git config core.sshCommand 'C:/Windows/System32/OpenSSH/ssh.exe'` 解决（原生 OpenSSH 可正常工作）
- 本地 git 代理配置指向 127.0.0.1:7897（用户自己的代理，未开时会连不上 HTTPS；SSH 不受影响）

---

## 📁 技术栈与文件结构

- **Node v22**（本地 v22.23.1），只用内置模块 `http`/`fs`/`path`，**零 npm 依赖**
- 工作目录：`D:\sun\Projects\trySomething`

```
trySomething/
├── server.js          # 手写 http 服务器（核心）
├── public/
│   ├── index.html     # 主页：访问计数显示 + 留言表单
│   ├── about.html
│   ├── style.css
│   └── app.js         # 浏览器端 fetch（加载计数、发留言、渲染列表）
├── data/store.json    # 持久化（{visits, messages[]}，已 gitignore）
├── PLAN.md            # 里程碑打卡清单 + 打卡记录
├── README.md
└── MEMORY.md          # 本文件
```

**服务器现有功能**：
- `GET /` → 访问计数 +1 并存档，返回 index.html
- `GET /api/visits` → `{"visits": N}`
- `GET /api/messages` → `{"messages": [...]}`
- `POST /api/messages` → 收 JSON 留言（name/message），带时间戳存档，坏 JSON 回 400
- `GET /about`、`GET /style.css`、`GET /app.js`、404
- 启动时读 store.json，改动后 saveStore() 写回（内存=工作台，文件=存档点）
- 启动命令：`node server.js`（端口 8080，localhost 可测）；推荐 `node --watch server.js`

---

## 📋 待办与决策点（下一个对话从这里继续）

1. **【M4 即将开始】服务器实况**：腾讯云香港轻量（Debian）、域名已买+实名已过（2026-08-20）
2. **M4 部署细节**：先打快照 → SSH 登录 → 改强密码 → apt 装 Node 22 → 项目代码上传（推荐推 GitHub 后 git clone，或 scp）→ pm2 守护 → 腾讯云防火墙只开 80/443/22 → A 记录 → 免费 DV 证书 → 设时区 Asia/Shanghai
3. **PLAN.md 两个固定编程时段未填**（用户多次被提醒，仍未填）
4. **上线信息**：服务器 43.135.32.65（腾讯云香港，Debian，用户 sun），域名 kokoroboto.online（DNSPod），证书 /etc/letsencrypt/live/kokoroboto.online/（2026-11-19 到期）
5. **部署踩坑记录**：私钥目录 700 root 导致 EACCES → 需 chmod 755 live/archive 目录；sudo pm2 找不到进程（pm2 按用户隔离）；setcap 解决非 root 绑 80/443
4. **PLAN.md 两个固定编程时段未填**（用户多次被提醒，仍未填）
5. M4 部署细节：轻量服务器控制台防火墙开 80/443/22、SSH 登录、nvm 装 Node 22、pm2 守护（`npm i -g pm2`）、域名控制台加 A 记录、免费 DV 证书或 certbot

---

## 🎓 用户已掌握的概念（新对话据此校准讲解深度）

- 箭头函数、回调（error-first）、闭包
- HTTP 请求/响应结构、状态码（200/404/400）、Content-Type、请求头/响应头
- 路由（else-if 顺序：具体条件在前）、静态文件服务
- JSON 往返（stringify/parse）、GET vs POST 语义
- 请求体是流（data/end 事件）、try/catch 错误处理
- 持久化模型（内存工作台 + 文件存档点）、fetch 前后端通信
- DNS 基础（A/CNAME/NS/TXT 记录、TTL）、TCP 端口概念、curl -v 全链路

**用户的常见错误模式**（讲解时留意）：漏括号（`r.json` vs `r.json()`、`new Date()`）、字符串忘加引号（`method: POST`）、字段名拼错（`m.messages` vs `m.message`）、相对路径缺前导斜杠

---

## ⚙️ 环境事实

- Windows 11（PowerShell 7.6.5），git 2.53.0，Node v22.23.1
- 额外工具链：gcc 16.1（MSYS2）、clang 22、rustc 1.97（用户对系统编程感兴趣）
- 沙箱限制：HTTPS/TLS 在沙箱里不可用（curl/Invoke-WebRequest 的 https 会失败），本地 http 和 curl localhost 正常
- 系统时间：2026 年 8 月

## 🧭 其他背景

- 用户对"重写服务器"话题感兴趣：C 是极限性能但裸奔，Rust 是安全 C（tokio/axum），Node 是开发效率高。潜在未来项目：用 C 或 Rust 重写 HTTP 服务器（等本项目上线后）
- 用户情绪价值：认可"每次都能看到成果"的设计；M2 曾觉得跨度大，复习自测 6/6 后信心恢复 —— 讲解要保持耐心、多鼓励、概念拆小
