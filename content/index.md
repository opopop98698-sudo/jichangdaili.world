---
title: "机场代理：客户端下载、订阅配置与兼容机场指南"
description: "专业且客观的代理客户端下载、全平台安装、订阅配置、故障排查、客观评测与兼容机场选型指南。工具先行，杜绝欺诈与强制捆绑。"
status: "published"
publishedAt: "2026-10-21"
modifiedAt: "2026-10-21"
---

# 代理客户端下载、安装与订阅使用指南

<AnswerFirst 
  conclusion="机场代理 (jichangdaili.world) 是面向中文用户的工具型代理技术知识库。我们提供全平台开源客户端的官方安全下载直链、系统安装配置步骤、按症状排查决策树，以及客观的兼容机场服务选型指标。所有软件教程均独立可用，无需购买任何服务即可直接阅读与配置。"
  scope="Windows 10/11 · macOS · Android · iOS · Linux · 软路由网关"
  verdict="工具下载与节点服务严格解耦：先完成客户端环境搭建，再按需接入节点。"
/>

<div class="quick-entry-grid">
  <a href="/clients/" class="qe-card">
    <div class="qe-icon">📥</div>
    <div class="qe-content">
      <div class="qe-title">找客户端下载</div>
      <div class="qe-desc">认准官方 GitHub 仓库与商店发布包，拒绝加壳与恶意软件</div>
    </div>
  </a>
  <a href="/subscription/" class="qe-card">
    <div class="qe-icon">⚙️</div>
    <div class="qe-content">
      <div class="qe-title">已有订阅去配置</div>
      <div class="qe-desc">Clash YAML、sing-box JSON 与单节点快速导入、规则与 TUN 设置</div>
    </div>
  </a>
  <a href="/troubleshooting/" class="qe-card">
    <div class="qe-icon">🩺</div>
    <div class="qe-content">
      <div class="qe-title">连接遇到问题</div>
      <div class="qe-desc">启动报错、订阅更新失败、已连上无法上网、Fake-IP 冲突排查</div>
    </div>
  </a>
  <a href="/recommend/" class="qe-card">
    <div class="qe-icon">🧭</div>
    <div class="qe-content">
      <div class="qe-title">还没有机场服务</div>
      <div class="qe-desc">多格式兼容核对、真实套餐口径、低频与办公需求避坑指南</div>
    </div>
  </a>
</div>

---

## 1. 核心任务路线与两类需求分流

在代理工具的使用周期中，用户通常处于以下两个截然不同的阶段：

```
[阶段 A: 工具链准备与维护 (免费独立)]
官方安全下载 ──> 系统权限授予 ──> 导入配置/订阅 ──> 规则与DNS校验 ──> 连通性测试
                                                                   │
                                                            遇到异常进入排查
                                                            (/troubleshooting/)

[阶段 B: 节点服务获取 (仅面向确有需求者)]
确认协议需求 ──> 审查兼容条件 ──> 真实套餐口径比对 ──> 小额月付验证 ──> 接入客户端
(/recommend/)                                                      │
                                                                   └── 验证分流与IP归属
```

本站严格遵守**工具使用与服务购买分离**原则：
- **已有订阅或自建节点用户**：直接查阅 [客户端下载](/clients/)、[安装教程](/install/) 和 [订阅配置](/subscription/) 即可完成全部配置，无需浏览任何推广内容。
- **需要服务推荐用户**：我们在 [机场推荐](/recommend/) 和 [免费机场](/free/) 栏目中提供基于实际可测条件的客观指标，未核验服务一律保持缺失，严禁发布虚假好评。

---

## 2. 按操作系统选择主流客户端

主流客户端在底层核心、GUI 易用性、分流能力和内存占用方面各有侧重。以下为官方核验的主流客户端矩阵：

| 操作系统 | 推荐客户端 | 底层核心 | 核心优势 | 官方下载入口 |
| :--- | :--- | :--- | :--- | :--- |
| **Windows 10/11** | **Clash Verge Rev** | Mihomo (Clash Meta) | 原生 TUN 服务、现代 UI、支持 Script 扩展 | [Windows 客户端下载](/clients/windows/) |
| **Windows (经典)** | **v2rayN** | Xray-core / sing-box | 路由规则深度暴露、双核心灵活切换、批量测试 | [v2rayN 资料](/clients/xray-family/) |
| **macOS (Apple Silicon)** | **Clash Verge Rev** | Mihomo | 原生 ARM64 构建、低耗电、系统代理与 TUN 协同 | [macOS 客户端下载](/clients/macos/) |
| **Android** | **v2rayNG** | Xray-core | 轻量省电、分应用代理完备、待机保活优化 | [Android 客户端下载](/clients/android/) |
| **iPhone / iPad** | **Shadowrocket** | 独立 iOS 核心 | App Store 正版工具、按需连接、扫码快速导入 | [iOS 客户端下载](/clients/ios/) |
| **全平台通用** | **Hiddify** | sing-box | 跨 5 大平台一致体验、全协议自适应、开箱即用 | [sing-box 软件资料](/clients/singbox-family/) |

---

## 3. 核心客户端身份与安全档案

<ClientIdentityCard 
  name="Clash Verge Rev"
  category="主流桌面开源客户端"
  repo="https://github.com/clash-verge-rev/clash-verge-rev"
  version="1.7.7"
  license="GPL-3.0"
  core="Mihomo (Clash Meta)"
  :platforms="['Windows 10/11 (x64/arm64)', 'macOS 11+ (Apple Silicon/Intel)', 'Linux (deb/rpm/AppImage)']"
  :protocols="['Shadowsocks', 'VMess', 'VLESS (Reality)', 'Trojan', 'Hysteria 2', 'TUIC']"
/>

<ClientIdentityCard 
  name="v2rayN"
  category="Windows 经典多核心客户端"
  repo="https://github.com/2dust/v2rayN"
  version="6.60"
  license="GPL-3.0"
  core="Xray-core / sing-box"
  :platforms="['Windows 10/11 (.NET 8)']"
  :protocols="['VMess', 'VLESS', 'Trojan', 'Shadowsocks', 'Hysteria 2', 'TUIC']"
/>

---

## 4. 首次使用代理工具的五步闭环

如果你是初次接触代理工具，请按照以下标准流程操作，避免因步骤混乱导致“已连接但无法上网”：

<SetupSteps 
  :steps="[
    {
      stepNumber: 1,
      title: '获取官方无篡改安装包',
      description: '前往官方 GitHub Releases 页面，根据当前电脑 CPU 架构（x64 或 ARM64）下载对应安装包或便携版。核验发布文件的 SHA256 哈希值。',
      commandOrAction: 'Get-FileHash -Algorithm SHA256 .\\Clash.Verge_1.7.7_x64_zh-CN.msi',
      successIndicator: '哈希值与官方 Releases 页面完全一致，无 SmartScreen 恶意拦截。',
      rollbackTip: '若下载来源可疑或哈希不匹配，立即删除该文件并清空回收站。'
    },
    {
      stepNumber: 2,
      title: '系统安装与基础环境核验',
      description: '运行安装包并授权系统运行。Windows 用户检查是否具备 Visual C++ 运行库，v2rayN 用户确保已安装 Microsoft .NET 8 Desktop Runtime。',
      successIndicator: '客户端主界面正常弹出，右下角托盘图标正常显示且无闪退。',
      rollbackTip: '若报错缺少 dll 文件，从微软官方支持库下载安装 VC_redist.x64.exe。'
    },
    {
      stepNumber: 3,
      title: '导入订阅链接或节点配置',
      description: '在客户端订阅管理界面，粘贴机场服务商或自建服务提供的订阅链接。点击保存并拉取配置。',
      successIndicator: '配置文件列表显示绿色对勾，策略组内正常列出所有可用节点名称。',
      rollbackTip: '若拉取失败，尝试开启浏览器测试该链接是否能正常下载 YAML 或文本。'
    },
    {
      stepNumber: 4,
      title: '选择代理模式与节点连通性测试',
      description: '日常使用强烈推荐选择「规则模式 (Rule)」，避免选「全局模式 (Global)」导致国内应用变慢或被封号。执行节点延迟测试，选中延迟正常（绿色数字）的节点。',
      successIndicator: '节点右侧显示出真实的毫秒延迟（如 85ms），无 Timeout 报错。',
      rollbackTip: '若全量节点测速均超时，检查本地防火墙是否误拦截了客户端核心。'
    },
    {
      stepNumber: 5,
      title: '启动系统代理或 TUN 模式并验证分流',
      description: '打开「系统代理 (System Proxy)」开关。使用浏览器访问 IP 测试站点，验证国外请求显示代理机房 IP，而国内站点请求依然直连。',
      commandOrAction: 'curl -I https://www.google.com',
      successIndicator: '国外网页秒开，国内微信、网易云音乐等应用正常无阻断。',
      rollbackTip: '若整台电脑无法上网，关闭系统代理开关，在 Windows 设置中检查代理端口是否归零。'
    }
  ]"
/>

---

## 5. 常见故障自查思维导图

遇到网络异常时，请依照以下自查逻辑定位问题归属：

<ErrorDecisionTree 
  title="客户端与网络连通性综合排查"
  :nodes="[
    {
      symptom: '客户端启动后立即闪退或报错找不到 DLL',
      checkAction: '检查 Windows 是否缺失 VC++ 2015-2022 运行库或 .NET 8 环境',
      isYesResult: '安装微软官方运行库后重新启动客户端，问题顺利解决。',
      isNoResult: '若运行库完备依然闪退，检查端口 7890/10808 是否被其他代理残留进程占用。'
    },
    {
      symptom: '拉取订阅提示 connect: connection refused 或 403 Forbidden',
      checkAction: '在浏览器无痕模式下直接访问订阅 URL，查看返回内容',
      isYesResult: '浏览器返回正常文本或 YAML，说明客户端缺少本地请求前置代理或证书异常。',
      isNoResult: '浏览器同样返回 403 或无法连接，说明服务商 Token 已过期或机房端正在维护。'
    },
    {
      symptom: '已开启代理，但浏览器提示“无法访问此网站 / 代理服务器拒绝连接”',
      checkAction: '打开 Windows 设置 -> 网络和 Internet -> 代理，核对端口',
      isYesResult: '代理开关已开启，但端口与客户端监听端口（如 7890）不一致，手动修正端口。',
      isNoResult: '若系统代理配置正确但依然无法上网，检查是否误开启了无可用节点的空策略组。'
    }
  ]"
/>

---

## 6. 八大栏目核心职责与导航导览

为防止内容碎片化与同质化竞争，本站 8 大一级栏目明确划分了技术职责与解决场景：

```
首页 (/) ──┬── 机场推荐 (/recommend/) ──────── 真实服务核验、兼容条件匹配、不限量/按量计费口径
           ├── 免费机场 (/free/) ───────────── 公益资源、免费试用、签到流量与安全边界风险
           ├── 客户端下载 (/clients/) ──────── 软件项目档案、CPU架构匹配、官方直链、校验哈希
           ├── 安装教程 (/install/) ────────── 全平台部署、服务模式、首次启动与回退卸载
           ├── 订阅配置 (/subscription/) ───── YAML/JSON语法解析、策略组与分流规则、DNS与TUN
           ├── 故障排查 (/troubleshooting/) ── 按症状分类的检查树、错误日志分析、网络急救
           ├── 客户端评测 (/reviews/) ──────── 资源消耗、同基准测速、断网恢复力客观横评
           └── 新手课堂 (/learn/) ──────────── 核心与客户端边界、网络协议常识、计费避坑认知
```

---

## 7. 商业与数据客观性声明

<Disclosure type="commercial">
  本站坚决执行透明运营规范：
  <br>1. <strong>无强制购买门槛</strong>：下载客户端、阅读所有配置与排障教程 100% 免费，绝不要求先购买机场再获取软件。
  <br>2. <strong>下载安全承诺</strong>：所有下载按钮均直接跳转至项目作者的官方 Releases 页面或官方应用商店，绝不私自打包捆绑第三方插件。
  <br>3. <strong>客观推荐与标注</strong>：若部分推荐链接包含推广或返利属性，页面必显式标注 <code>sponsored</code>，且绝不因为推广收益修改实测数据或掩盖服务商已知故障。
</Disclosure>

<style scoped>
.quick-entry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0 2rem 0;
}
.qe-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}
.qe-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.08);
}
.qe-icon {
  font-size: 1.85rem;
  line-height: 1;
}
.qe-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.qe-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.qe-desc {
  font-size: 0.825rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}
</style>
