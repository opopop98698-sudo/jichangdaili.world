# 内容待办与编排储备 (CONTENT_BACKLOG.md)

> **规划总览**: 729 个规划节点已在 `CONTENT_REGISTRY.json` 与 `editorial/` 中全量生成任务书。  
> **推进规则**: 逐集群完成有公开核验来源的原创长文，通过事实核验、语义去重审查后晋升为 `published` 状态发布，严禁批量填充无意义模板凑数。

---

## 1. 待排期编撰优先级集群 (Top Priority Clusters)

### 阶段一：主流桌面与移动端客户端官方档案深化
- `clients/android`: Android 客户端发布包与 v2rayNG 架构核验 (3 篇待编)
- `clients/macos`: macOS Apple Silicon 原生包与 Gatekeeper 签名验证 (3 篇待编)
- `clients/ios`: Shadowrocket 美区商店正版与证书信任机制 (3 篇待编)
- `clients/singbox-family`: sing-box CLI 与 Hiddify 跨平台客户端 (3 篇待编)

### 阶段二：协议与配置规则深化
- `subscription/node-uris`: VLESS Reality / gRPC / Hysteria 2 字段解析 (3 篇待编)
- `subscription/dns`: Fake-IP 过滤器调优与 DoH/DoT 加密防污染 (3 篇待编)
- `subscription/tun`: Windows Wintun 与严格路由实操 (3 篇待编)

### 阶段三：高频故障决策树补充
- `troubleshooting/subscription-fetch`: 订阅拉取 401/403 与无代理拉取死锁 (3 篇待编)
- `troubleshooting/timeout`: 节点批量超时与系统时钟偏差 (3 篇待编)
- `troubleshooting/application-errors`: ChatGPT 1020 阻断与 Git 443 修复 (3 篇待编)

---

## 2. 编撰验收质量门槛 (Quality Gates)
每篇新拟长文在进入 `published` 状态前必须通过：
1. **独立问题核验**：对照 `KEYWORD_OWNERSHIP.md`，确认该问题未被站内其他页面作为主要承接。
2. **证据留痕**：引用官方 GitHub 仓库、RFC 协议规范或可复现的基准测试日志。
3. **结构化组件应用**：合理使用 `<AnswerFirst />`、`<SetupSteps />`、`<ErrorDecisionTree />` 或 `<SourceList />`。
4. **自动化脚本校验**：通过 `npm run check:all`。
