---
title: "订阅配置：链接导入、规则分流、DNS与TUN模式"
description: "全面解析 Clash YAML、sing-box JSON 与 Base64 订阅配置体系。提供最小可用配置示例、规则匹配优先级、Fake-IP 原理与应用级接入指南。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 订阅配置、规则分流与高级网络集成

<Breadcrumbs :crumbs="[{ title: '订阅配置', url: '/subscription/' }]" />

<AnswerFirst 
  conclusion="订阅链接是一个加密的资源索引地址，客户端通过它定期拉取服务器节点、协议参数与分流规则。配置的核心在于：根据当前客户端选择正确的链接类型，理解「节点 -> 策略组 -> 规则」的逐级引用关系，并合理开启 DNS 分流与 TUN 虚拟网卡，实现国内外流量的无感自动化调度。"
  scope="Clash YAML · sing-box JSON · Base64 · Fake-IP · TUN 驱动"
  verdict="日常使用务必坚持「规则分流」优先，切勿将国内常用域名误划入代理组。"
/>

---

## 1. 订阅格式与底层协议对应矩阵

| 订阅形态 | 典型文件后缀/协议头 | 核心适用客户端 | 语法容错性 | 主要优势 |
| :--- | :--- | :--- | :--- | :--- |
| **Clash YAML** | `https://.../api/v1/client/subscribe?token=...&clash=1` | Clash Verge Rev, FlClash, OpenClash | 严格缩进要求 | 策略组层级分明，支持 Proxy-Providers 动态扩展 |
| **sing-box JSON** | `https://.../sing-box` | sing-box CLI, Hiddify, Karing | JSON 严格校验 | 结构高度规整，DNS 与路由分离，规则集执行极快 |
| **Base64 通用单列表** | `https://.../api/v1/client/subscribe?token=...` | v2rayN, v2rayNG, Shadowrocket | 高 (逐行解析) | 协议兼容性极广，支持海量节点一次性导入与清洗 |
| **单节点 URI 链接** | `vless://...`, `vmess://...`, `hysteria2://...` | 所有主流客户端剪贴板导入 | 单个隔离 | 方便临时单节点分享与调试 |

---

## 2. Clash YAML 配置文件的层级结构深度拆解

一个标准的 Clash 配置文件由四大核心对象构成，它们的数据流向如下：

```
[外部请求发出: 例如访问 www.google.com]
                  │
                  ▼
         [1. 规则匹配层 (rules)]
  逐行由上到下扫描，命中 DOMAIN-SUFFIX,google.com,节点选择
                  │
                  ▼
       [2. 策略组层 (proxy-groups)]
  「节点选择」策略组决定当前流量是由手动选中的香港节点发出，
  还是经由 URL-Test 自动优选延迟最低的节点
                  │
                  ▼
         [3. 节点实体层 (proxies)]
  提取该节点的服务器 IP、端口、UUID、传输层 TLS 证书配置
                  │
                  ▼
        [4. DNS 解析层 (dns)]
  Fake-IP 返回 198.18.0.x 虚拟 IP，隧道建立，完成加密转发
```

### 2.1 最小可验证的 Clash 脱敏示例
以下为一个去除了冗余规则、仅包含核心要素的最小可用配置，用于测试本地网络是否畅通：

```yaml
# 最小可验证配置文件示例 (请勿直接写入真实私有凭据)
port: 7890
socks-port: 7891
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
ipv6: false

dns:
  enable: true
  listen: 0.0.0.0:1053
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  nameserver:
    - 223.5.5.5
    - 119.29.29.29
  fallback:
    - https://dns.google/dns-query
    - 1.1.1.1

proxies:
  - name: "测试节点-香港01"
    type: vless
    server: 198.51.100.1 # RFC 5737 测试占位 IP
    port: 443
    uuid: b831381d-6324-4d53-ad4f-8cda48b30811
    network: tcp
    tls: true
    udp: true
    servername: example.com

proxy-groups:
  - name: 节点选择
    type: select
    proxies:
      - "测试节点-香港01"
      - DIRECT

rules:
  - DOMAIN-SUFFIX,google.com,节点选择
  - DOMAIN-SUFFIX,github.com,节点选择
  - GEOIP,CN,DIRECT
  - MATCH,节点选择
```

---

## 3. 规则匹配优先级原则 (自上而下)

许多初学者常遇到“配置了规则但国内网站依然走代理”的现象。必须牢记：**规则是从上到下逐行扫描的，一旦第一条命中，后续所有规则将立即停止执行！**

```
[最高优先级] 1. 本地直连规则 (内网 192.168.x / localhost -> DIRECT)
             2. 国内常用服务特例 (网易云音乐、局域网打印机 -> DIRECT)
             3. 特定敏感服务路由 (OpenAI / Netflix -> 专属策略组)
             4. 常用国外开发与学术站点 (GitHub / Google -> 代理组)
             5. GeoIP / GeoSite 数据库粗筛 (GEOIP,CN,DIRECT)
[最低兜底项] 6. 全局漏网兜底规则 (MATCH,节点选择 或 MATCH,DIRECT)
```

---

## 4. DNS 配置中的 Fake-IP 与 Redir-Host 选型

在客户端中配置 DNS 时，通常会遇到 `fake-ip` 和 `redir-host` 两个选项：

- **Fake-IP 模式 (强烈推荐)**：当浏览器发起域名请求时，客户端无需等待远程 DNS 解析完成，而是立即从本地分配一个假的虚拟 IP（如 `198.18.x.x`）返回给浏览器，浏览器立即建立 TCP 连接。客户端在真正向节点发包时，再将目标域名封装进代理协议中，由远端服务器完成真实解析。**优势：首屏秒开，杜绝本地 DNS 污染。**
- **Redir-Host 模式 (已淘汰)**：必须先在本地解析出真实 IP，再判断该 IP 是否属于国外。若本地解析受到运营商污染，将直接导致分流彻底错乱。目前新版 Mihomo 和 sing-box 已全面弃用或弱化该模式。

---

## 5. 二级专题深度索引

本栏目下设 10 个深度二级专题，覆盖从链接清洗到复杂企业开发环境接入的完整配置知识：

- [订阅链接与导入入口](/subscription/links/)：链接获取、Token 鉴权与安全范围审查
- [Clash YAML 配置](/subscription/clash-yaml/)：配置结构、Proxy-Providers 与 Mixin 覆盖
- [VLESS、VMess 与 Trojan 节点](/subscription/node-uris/)：URI 字段拆解、Reality 与 gRPC 传输
- [sing-box JSON 配置](/subscription/singbox-json/)：inbounds/outbounds 层次与版本平滑迁移
- [订阅转换与兼容性](/subscription/conversion/)：转换边界损失规避与本地私有 Docker 部署
- [订阅更新与多源管理](/subscription/updates/)：定时更新策略、多机场 Fallback 容灾合并
- [规则分流与策略组](/subscription/rules/)：匹配顺序、URL-Test 容差与负载均衡
- [DNS 配置与解析策略](/subscription/dns/)：nameserver 递归链与 Fake-IP 过滤器调优
- [TUN 与系统代理](/subscription/tun/)：虚拟网卡捕获、管理员提权与严格路由设置
- [应用接入与多设备配置](/subscription/integration/)：终端环境变量、VS Code 与局域网共享

---

## 6. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: '导入订阅时客户端提示“yaml: line 1: mapping values are not allowed”怎么排查？',
      answer: '这通常是因为订阅 URL 返回的内容并不是合法的 YAML 配置文件，而是包含 HTML 报错页面（例如 403 Forbidden、404 Not Found 或面板登录跳转页）。请复制该链接直接在浏览器打开，查看返回的真实文本内容。'
    },
    {
      question: '为什么开启系统代理后，PowerShell 或 CMD 终端依然无法拉取 GitHub 代码？',
      answer: 'Windows 的「系统代理 (System Proxy)」主要是基于 WinINet API 设置的，大部分命令行工具（如 curl、git、npm、pip）默认不读取该设置。你必须在客户端开启「TUN 模式」，或者在终端中手动执行 $env:HTTP_PROXY = http://127.0.0.1:7890。'
    },
    {
      question: '如何防止机场订阅链接泄露导致流量被盗刷？',
      answer: '订阅链接中的 Token 相当于你的账户密码。切勿将完整链接发送至公共群聊或公开 GitHub 仓库。如果不慎泄露，应立即登录机场用户中心，点击“重置订阅信息/重置 Token”，旧链接将立即永久失效。'
    }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: '订阅更新失败错误排查', url: '/troubleshooting/subscription-fetch/', taskType: 'troubleshooting', description: '解决拉取节点时返回 401、502 或超时的报错' },
    { title: 'TUN 模式路由与模式冲突诊断', url: '/troubleshooting/tun-errors/', taskType: 'troubleshooting', description: '排查 Wintun 驱动崩溃与虚拟网卡死循环' },
    { title: '客户端客观评测与资源对比', url: '/reviews/mihomo-clients/', taskType: 'reviews', description: '查看各客户端在海量规则下的 CPU 与内存开销' }
  ]"
/>
