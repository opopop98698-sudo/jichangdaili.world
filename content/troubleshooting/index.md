---
title: "故障排查：按症状诊断、修复决策树与网络急救"
description: "系统化代理故障排查手册。涵盖客户端崩溃闪退、端口冲突、订阅更新失败、已连上无法上网、DNS 泄露、TUN 冲突与 AI 访问阻断等常见症状的可逆排查决策树。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 代理故障排查与系统化修复指南

<Breadcrumbs :crumbs="[{ title: '故障排查', url: '/troubleshooting/' }]" />

<AnswerFirst 
  conclusion="遇到网络中断或客户端报错时，严禁盲目胡乱勾选高级网络设置或频繁重装软件。80% 以上的问题可以通过遵循「进程状态 -> 本地监听端口 -> 系统代理开关 -> 节点延迟 -> DNS解析链路」这一标准逆向排查流程，在 3 分钟内精准定位并可逆修复。"
  scope="客户端启动 · 订阅拉取 · 节点超时 · 已连接断网 · TUN 崩溃 · AI 工具阻断"
  verdict="排查过程中必须妥善保护个人订阅 Token 与节点私密信息，严禁向外提供未脱敏日志。"
/>

---

## 1. 核心症状快速直达导航

根据当前电脑或手机最明显的异常症状，选择对应的诊断路径：

| 异常症状现象 | 核心可能原因 | 对应诊断决策树 |
| :--- | :--- | :--- |
| **客户端点击无反应或闪退** | 端口 7890 冲突、缺少 VC++ 运行库、僵尸核心残留 | [启动与进程排查](/troubleshooting/startup/) |
| **订阅更新提示 Connection Refused / 403** | Token 过期、宽带 DNS 污染无法解析订阅域、机场维护 | [订阅更新排查](/troubleshooting/subscription-fetch/) |
| **所有节点测速全红 (Timeout / 0ms)** | 本地防火墙拦截核心、节点端口被封、系统时钟严重偏差 | [节点超时排查](/troubleshooting/timeout/) |
| **客户端显示已连接，但浏览器彻底断网** | Windows 代理端口配置错位、误选 Direct 模式、策略组空选 | [已连接无法上网](/troubleshooting/no-internet/) |
| **国内微信/网页正常，但国外网站无法访问** | 分流规则将国外域名误判为直连、DNS 递归解析失败 | [DNS 异常排查](/troubleshooting/dns-errors/) |
| **开启 TUN 模式提示 failed to create TUN** | Wintun 驱动被安全软件拦截、缺少管理员服务提权 | [TUN 冲突排查](/troubleshooting/tun-errors/) |
| **ChatGPT / Claude 提示 1020 拒绝访问** | 节点出口 IP 纯净度过低，被 Cloudflare 或 OpenAI 风控识别 | [应用与AI工具故障](/troubleshooting/application-errors/) |

---

## 2. 综合排障可逆决策树 (三大高发场景)

<ErrorDecisionTree 
  title="客户端与网络故障标准三级排查树"
  :nodes="[
    {
      symptom: '场景一：启动客户端报错“bind: address already in use: 7890”',
      checkAction: '在 PowerShell 执行 netstat -ano | findstr 7890 查看占用 PID',
      isYesResult: '发现有其他后台进程（如旧版 Clash 僵尸进程或下载软件）占用该端口。在任务管理器中结束对应 PID，或在客户端修改 mixed-port 为 7895。',
      isNoResult: '若端口未被占用，检查是否开启了 Hyper-V 导致动态保留端口段随机排他性占用了 7890。'
    },
    {
      symptom: '场景二：关闭客户端后，电脑所有网页完全无法打开，提示代理服务器无响应',
      checkAction: '进入 Windows 设置 -> 网络和 Internet -> 代理，检查手动设置代理开关',
      isYesResult: '发现代理开关仍处于开启状态，但由于客户端已关闭，无本地程序响应。手动关闭该开关，网络立即可逆恢复。',
      isNoResult: '若系统代理开关已关闭依然断网，检查本地 DNS 是否被固定修改为了 127.0.0.1，将其改回“自动获取 DNS”。'
    },
    {
      symptom: '场景三：测速提示“tls: handshake timeout”或证书验证失败',
      checkAction: '检查当前电脑系统右下角的时间、分、秒是否与北京时间/UTC 标准时间一致',
      isYesResult: '发现系统时间快或慢了 2 分钟以上。TLS 握手协议对时间戳有严格要求，进入系统设置同步网络时间后重试，握手立即恢复。',
      isNoResult: '若时间完全准确，检查该节点证书域名 SNI 是否被本地运营商施加了针对性阻断。'
    }
  ]"
/>

---

## 3. 已连接但无法上网的五步急救流程

当图标显示已连接，但浏览器却不断提示无法连接时，请执行以下标准五步验证：

```
[第一步: 验证底层核心是否正在监听]
打开浏览器，访问 http://127.0.0.1:7890
如果浏览器提示“Empty reply from server”或出现客户端 Web 欢迎页，证明核心与本地端口工作正常。

[第二步: 验证节点物理连通性]
在客户端内右键该节点，选择执行「TCP Ping」或「真实延迟测速」。
如果测试显示出毫秒数字（如 120ms），证明到境外服务器的物理隧道畅通。

[第三步: 排除分流规则死循环]
将客户端模式临时切换为「全局模式 (Global)」，并在策略组中强制指定刚才测速成功的节点。
如果切换全局后能够打开 Google，证明原先的「规则模式 (Rule)」中存在分流规则冲突或 DNS 失败。

[第四步: 检查系统代理开关]
检查 Windows 网络设置中的代理 IP 是否为 127.0.0.1，端口是否与客户端一致。

[第五步: 防火墙与安全软件临时排除]
临时退出第三方杀毒软件或在 Windows Defender 防火墙中允许核心程序的所有公用与专用网络通信。
```

---

## 4. 提交求助工单时脱敏日志的四项原则

若经过自主排查依然无法解决，向社区或服务商求助时，切记不可直接公开完整日志：

1. **脱敏 Token 与密钥**：使用文本编辑器搜索并将 URL 中的 `token=xxxxxxxx` 或 `uuid: xxxxxxxx` 替换为 `token=REDACTED`。
2. **隐藏公网出口 IP**：将日志中出现的自身宽带公网 IP 替换为 `203.0.113.x`。
3. **保留核心错误片段**：无需复制数十兆的完整日志，仅需提取带有 `[ERROR]`、`[FATAL]` 或具体协议报错上下文的 10~20 行内容。
4. **附带明确环境版本**：注明操作系统版本号（如 Win11 23H2）、客户端确切版本号（如 Verge Rev 1.7.7）及当前采用的网络模式（系统代理或 TUN）。

---

## 5. 二级专题深度索引

本栏目下设 10 个深度二级专题，提供最详尽的错误代码分类与诊断指引：

- [客户端启动失败](/troubleshooting/startup/)：静默退出、SmartScreen 拦截与多实例端口冲突
- [安装、升级与权限错误](/troubleshooting/installation-errors/)：VCRUNTIME 缺失、白屏与更新回归
- [订阅更新失败](/troubleshooting/subscription-fetch/)：HTTP 401/403、502 网关错误与无代理拉取死锁
- [订阅解析与导入错误](/troubleshooting/parsing/)：YAML 缩进语法错误与 Base64 非法字符清洗
- [节点超时与认证失败](/troubleshooting/timeout/)：批量 Timeout、TLS 握手超时与系统时钟偏差
- [已连接但无法上网](/troubleshooting/no-internet/)：WinINet 代理错位、关代理彻底断网与直连误选
- [DNS 解析异常](/troubleshooting/dns-errors/)：NXDOMAIN 报错、本地 DNS 劫持与 Fake-IP 缓存溢出
- [TUN、路由与模式冲突](/troubleshooting/tun-errors/)：Wintun 适配器崩溃、路由死循环与 IPv6 泄露
- [慢速、掉线与持续质量](/troubleshooting/performance/)：10Mbps 瓶颈摸排、单核 CPU 100% 占用与 MTU 调优
- [AI、视频与开发工具故障](/troubleshooting/application-errors/)：ChatGPT 1020 阻断、Git 443 超时与流媒体非原生 IP

---

## 6. 常见问答 (FAQ)

<FAQSection 
  :faqs="[
    {
      question: '为什么在电脑上卸载了软件之后，所有的网页就都打不开了？',
      answer: '因为代理软件在运行期间，会向 Windows 注册表中写入系统代理指令（指引浏览器将流量发送至本地 127.0.0.1:7890）。如果未通过软件界面正常退出、而是直接强杀进程或删除文件夹，Windows 依然保留着该代理指向，导致所有请求落入黑洞。在系统“设置-网络-代理”中手动关闭开关即可恢复。'
    },
    {
      question: '为什么手机连家里的 WiFi 无法使用，换成 4G/5G 流量就正常了？',
      answer: '这通常是由于家用宽带的本地运营商（如部分地区移动宽带）对特定境外机房 IP 或特定协议端口实施了深度包检测 (DPI) 阻断，或者是家庭路由器自带的防火墙拦截了 UDP 高位端口。切换为新一代 Reality 协议或开启中转线路通常可恢复。'
    },
    {
      question: '出现“routing loop detected”错误是什么意思？',
      answer: '路由死循环。通常发生在开启了 TUN 虚拟网卡模式后，客户端试图将所有系统流量重定向进代理隧道，但代理核心自身向境外节点发起握手连接的原始数据包，也被错误地再次重新抓进了 TUN 网卡，导致数据包无限自循环。排查方法是在 TUN 配置中开启 strict-route，或正确配置排除本地进程。'
    }
  ]"
/>

<RelatedTasks 
  :tasks="[
    { title: 'TUN 与系统代理配置规范', url: '/subscription/tun/', taskType: 'subscription', description: '核对正确的虚拟网卡路由配置防止死循环' },
    { title: 'DNS 配置与 Fake-IP 解析', url: '/subscription/dns/', taskType: 'subscription', description: '调优 DNS 递归链路与本地防劫持设置' },
    { title: '客户端客观评测与弱网测试', url: '/reviews/network-behavior/', taskType: 'reviews', description: '查看各客户端在网络丢包下的自动重连表现' }
  ]"
/>
