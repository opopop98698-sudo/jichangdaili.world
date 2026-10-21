import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

// Read optional search engine verifications from data/verification.json or env
let verifications: Record<string, string> = {};
const verificationFile = path.join(rootDir, 'data', 'verification.json');
if (fs.existsSync(verificationFile)) {
  try {
    verifications = JSON.parse(fs.readFileSync(verificationFile, 'utf8'));
  } catch (e) {}
}

const googleVerify = process.env.GOOGLE_SITE_VERIFICATION || verifications.google;
const bingVerify = process.env.BING_SITE_VERIFICATION || verifications.bing;
const baiduVerify = process.env.BAIDU_SITE_VERIFICATION || verifications.baidu;
const shenmaVerify = process.env.SHENMA_SITE_VERIFICATION || verifications.shenma;

const verificationHead: [string, Record<string, string>][] = [];
if (googleVerify && typeof googleVerify === 'string' && googleVerify.trim()) {
  verificationHead.push(['meta', { name: 'google-site-verification', content: googleVerify.trim() }]);
}
if (bingVerify && typeof bingVerify === 'string' && bingVerify.trim()) {
  verificationHead.push(['meta', { name: 'msvalidate.01', content: bingVerify.trim() }]);
}
if (baiduVerify && typeof baiduVerify === 'string' && baiduVerify.trim()) {
  verificationHead.push(['meta', { name: 'baidu-site-verification', content: baiduVerify.trim() }]);
}
if (shenmaVerify && typeof shenmaVerify === 'string' && shenmaVerify.trim()) {
  verificationHead.push(['meta', { name: 'shenma-site-verification', content: shenmaVerify.trim() }]);
}

// 9 Top Navigation Items in exact specified order
const nav = [
  { text: '首页', link: '/' },
  { text: '机场推荐', link: '/recommend/' },
  { text: '免费机场', link: '/free/' },
  { text: '客户端下载', link: '/clients/' },
  { text: '安装教程', link: '/install/' },
  { text: '订阅配置', link: '/subscription/' },
  { text: '故障排查', link: '/troubleshooting/' },
  { text: '客户端评测', link: '/reviews/' },
  { text: '新手课堂', link: '/learn/' }
];

// Sidebar per section with full Level-2 topics
const sidebar = {
  '/recommend/': [
    {
      text: '权威横评与实测大百科',
      items: [
        { text: '光速云深度实测指南 (第一主推)', link: '/recommend/guangsu-cloud-in-depth-review-and-plans-guide/' },
        { text: '15 家含测速证据横评报告', link: '/recommend/speedtest-measured-airports-2026-review/' },
        { text: '42 家机场价格与套餐大百科', link: '/recommend/42-airports-complete-pricing-and-plans-encyclopedia/' }
      ]
    },
    {
      text: '机场推荐选型指南',
      items: [
        { text: '栏目总览', link: '/recommend/' },
        { text: '通用订阅与多格式机场', link: '/recommend/universal/' },
        { text: 'Clash 与 Mihomo 兼容机场', link: '/recommend/mihomo/' },
        { text: 'v2rayN 与 v2rayNG 兼容机场', link: '/recommend/xray-clients/' },
        { text: 'sing-box 与 Hiddify 兼容机场', link: '/recommend/singbox/' },
        { text: '苹果设备机场选择', link: '/recommend/apple/' },
        { text: '新手友好机场', link: '/recommend/beginner-friendly/' },
        { text: '便宜机场与总使用成本', link: '/recommend/budget/' },
        { text: '低频与灵活流量方案', link: '/recommend/flexible-usage/' },
        { text: '多设备与软路由机场', link: '/recommend/multi-device/' },
        { text: '办公、AI与视频任务适配', link: '/recommend/workload/' }
      ]
    }
  ],
  '/free/': [
    {
      text: '免费与试用资源核验',
      items: [
        { text: '栏目总览', link: '/free/' },
        { text: '长期免费与公益资源', link: '/free/community/' },
        { text: '机场免费试用', link: '/free/trial/' },
        { text: '注册赠送与活动流量', link: '/free/gifts/' },
        { text: '免费节点与订阅来源', link: '/free/sources/' },
        { text: '免费套餐流量与限速', link: '/free/limits/' },
        { text: '免费资源客户端适配', link: '/free/compatibility/' },
        { text: '免费方案适用场景', link: '/free/use-cases/' },
        { text: '免费资源隐私与安全', link: '/free/security/' },
        { text: '免费资格与账户管理', link: '/free/account/' },
        { text: '资源失效与后续选择', link: '/free/alternatives/' }
      ]
    }
  ],
  '/clients/': [
    {
      text: '客户端官方下载渠道',
      items: [
        { text: '栏目总览', link: '/clients/' },
        { text: 'Windows 客户端', link: '/clients/windows/' },
        { text: 'Android 客户端', link: '/clients/android/' },
        { text: 'iPhone 与 iPad 客户端', link: '/clients/ios/' },
        { text: 'macOS 客户端', link: '/clients/macos/' },
        { text: 'Linux 客户端', link: '/clients/linux/' },
        { text: '软路由与网络设备客户端', link: '/clients/routers/' },
        { text: 'Clash 系软件下载资料', link: '/clients/clash-family/' },
        { text: 'v2rayN 与 Xray 客户端资料', link: '/clients/xray-family/' },
        { text: 'sing-box 与跨平台软件资料', link: '/clients/singbox-family/' },
        { text: '安全下载与版本留档', link: '/clients/download-safety/' }
      ]
    }
  ],
  '/install/': [
    {
      text: '全平台安装教程',
      items: [
        { text: '栏目总览', link: '/install/' },
        { text: 'Clash Verge Rev 安装', link: '/install/verge-rev/' },
        { text: 'v2rayN 安装', link: '/install/v2rayn/' },
        { text: 'v2rayNG 安装', link: '/install/v2rayng/' },
        { text: 'Shadowrocket 安装', link: '/install/shadowrocket/' },
        { text: 'FlClash 安装', link: '/install/flclash/' },
        { text: 'Hiddify 安装', link: '/install/hiddify/' },
        { text: 'sing-box 安装', link: '/install/singbox/' },
        { text: '系统依赖与安装准备', link: '/install/prerequisites/' },
        { text: 'Linux 服务与软路由部署', link: '/install/gateways/' },
        { text: '升级、迁移与卸载', link: '/install/lifecycle/' }
      ]
    }
  ],
  '/subscription/': [
    {
      text: '订阅配置与网络规则',
      items: [
        { text: '栏目总览', link: '/subscription/' },
        { text: '订阅链接与导入入口', link: '/subscription/links/' },
        { text: 'Clash YAML 配置', link: '/subscription/clash-yaml/' },
        { text: 'VLESS、VMess 与 Trojan 节点', link: '/subscription/node-uris/' },
        { text: 'sing-box JSON 配置', link: '/subscription/singbox-json/' },
        { text: '订阅转换与兼容性', link: '/subscription/conversion/' },
        { text: '订阅更新与多源管理', link: '/subscription/updates/' },
        { text: '规则分流与策略组', link: '/subscription/rules/' },
        { text: 'DNS 配置与解析策略', link: '/subscription/dns/' },
        { text: 'TUN 与系统代理', link: '/subscription/tun/' },
        { text: '应用接入与多设备配置', link: '/subscription/integration/' }
      ]
    }
  ],
  '/troubleshooting/': [
    {
      text: '故障排查与修复决策树',
      items: [
        { text: '栏目总览', link: '/troubleshooting/' },
        { text: '客户端启动失败', link: '/troubleshooting/startup/' },
        { text: '安装、升级与权限错误', link: '/troubleshooting/installation-errors/' },
        { text: '订阅更新失败', link: '/troubleshooting/subscription-fetch/' },
        { text: '订阅解析与导入错误', link: '/troubleshooting/parsing/' },
        { text: '节点超时与认证失败', link: '/troubleshooting/timeout/' },
        { text: '已连接但无法上网', link: '/troubleshooting/no-internet/' },
        { text: 'DNS 解析异常', link: '/troubleshooting/dns-errors/' },
        { text: 'TUN、路由与模式冲突', link: '/troubleshooting/tun-errors/' },
        { text: '慢速、掉线与持续质量', link: '/troubleshooting/performance/' },
        { text: 'AI、视频与开发工具故障', link: '/troubleshooting/application-errors/' }
      ]
    }
  ],
  '/reviews/': [
    {
      text: '客户端客观评测',
      items: [
        { text: '栏目总览', link: '/reviews/' },
        { text: '评测方法与样本', link: '/reviews/methodology/' },
        { text: 'Clash 系客户端比较', link: '/reviews/mihomo-clients/' },
        { text: 'Xray 与多核心客户端比较', link: '/reviews/xray-clients/' },
        { text: 'sing-box 客户端比较', link: '/reviews/singbox-clients/' },
        { text: '桌面资源与连接表现', link: '/reviews/desktop/' },
        { text: '移动端续航与网络切换', link: '/reviews/mobile/' },
        { text: '订阅管理与配置体验', link: '/reviews/subscription-ux/' },
        { text: '分流、DNS 与 TUN 行为', link: '/reviews/network-behavior/' },
        { text: '来源透明与维护质量', link: '/reviews/security-maintenance/' },
        { text: '易用性、费用与设备选择', link: '/reviews/usability-cost/' }
      ]
    }
  ],
  '/learn/': [
    {
      text: '新手课堂与原理进阶',
      items: [
        { text: '栏目总览', link: '/learn/' },
        { text: '客户端、机场与核心关系', link: '/learn/roles/' },
        { text: '从零开始的使用路径', link: '/learn/journey/' },
        { text: '系统、架构与版本常识', link: '/learn/devices/' },
        { text: '订阅与配置基本概念', link: '/learn/subscription-basics/' },
        { text: '网络与协议入门', link: '/learn/protocols/' },
        { text: '代理模式与流量范围', link: '/learn/proxy-modes/' },
        { text: '套餐、流量与付费常识', link: '/learn/billing/' },
        { text: '凭据、权限与隐私常识', link: '/learn/privacy/' },
        { text: '测速与稳定性理解', link: '/learn/metrics/' },
        { text: '查资料、求助与常用词', link: '/learn/help/' }
      ]
    }
  ]
};

// Algolia / Local search selection
const hasAlgolia = Boolean(
  process.env.VITE_ALGOLIA_APP_ID &&
  process.env.VITE_ALGOLIA_SEARCH_KEY &&
  process.env.VITE_ALGOLIA_INDEX_NAME
);

export default defineConfig({
  title: '机场代理',
  titleTemplate: ':title｜机场代理',
  description: '代理客户端官方下载、全平台安装、订阅配置、故障排查、客观评测与兼容机场指南。',
  lang: 'zh-CN',
  cleanUrls: true,
  srcDir: 'generated',
  sitemap: {
    hostname: 'https://jichangdaili.world'
  },
  markdown: {
    config: (md) => {
      const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
      };
      md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        const aIndex = tokens[idx].attrIndex('href');
        if (aIndex >= 0) {
          const href = tokens[idx].attrs[aIndex][1];
          if (href.startsWith('http://') || href.startsWith('https://')) {
            if (!href.includes('jichangdaili.world')) {
              const isAffiliate = /aff|code=|gsyvip|flycat|breezenet|feimaoyun|weifengcloud|wuyoulink|xingdaomeng|worryfree/i.test(href);
              if (isAffiliate) {
                tokens[idx].attrSet('rel', 'sponsored nofollow noopener');
                tokens[idx].attrSet('target', '_blank');
              }
            }
          }
        }
        return defaultRender(tokens, idx, options, env, self);
      };
    }
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { property: 'og:image', content: 'https://jichangdaili.world/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://jichangdaili.world/logo.png' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'author', content: '机场代理编辑团队' }],
    ['meta', { property: 'og:site_name', content: '机场代理 (jichangdaili.world)' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ...verificationHead
  ],
  themeConfig: {
    logo: {
      src: '/logo.png',
      alt: '机场代理 (jichangdaili.world) 官方徽标',
      width: 32,
      height: 32
    },
    siteTitle: '机场代理',
    nav,
    sidebar,
    outline: {
      level: [2, 3],
      label: '本页大纲'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '主题外观',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '目录菜单',
    search: hasAlgolia
      ? {
          provider: 'algolia',
          options: {
            appId: process.env.VITE_ALGOLIA_APP_ID!,
            apiKey: process.env.VITE_ALGOLIA_SEARCH_KEY!,
            indexName: process.env.VITE_ALGOLIA_INDEX_NAME!
          }
        }
      : {
          provider: 'local',
          options: {
            locales: {
              root: {
                translations: {
                  button: {
                    buttonText: '搜索文档与排障',
                    buttonAriaLabel: '搜索文档与排障'
                  },
                  modal: {
                    noResultsText: '无法找到相关结果',
                    resetButtonTitle: '清除查询条件',
                    footer: {
                      selectText: '选择',
                      navigateText: '切换',
                      closeText: '关闭'
                    }
                  }
                }
              }
            }
          }
        },
    footer: {
      message: '<a href="/about/">关于我们</a> · <a href="/reviews/methodology/">评测方法论</a> · <a href="/brands/">品牌核验名录</a> · <a href="/disclosure/">推广披露</a> · <a href="/privacy/">隐私政策</a> · <a href="/terms/">服务条款</a>',
      copyright: 'Copyright © 2026 jichangdaili.world. 保留所有权利。客观中立 · 证据溯源 · 绝不分发加壳或未验证客户端'
    }
  },
  transformPageData(pageData) {
    const rawPath = pageData.relativePath;
    let canonicalPath = rawPath.replace(/index\.md$/, '').replace(/\.md$/, '/');
    if (!canonicalPath.startsWith('/')) {
      canonicalPath = '/' + canonicalPath;
    }
    const canonicalUrl = `https://jichangdaili.world${canonicalPath}`;

    pageData.frontmatter.head = pageData.frontmatter.head || [];

    const is404 = rawPath === '404.md' || canonicalPath === '/404/';
    if (is404) {
      pageData.frontmatter.head.push([
        'meta',
        { name: 'robots', content: 'noindex, nofollow' }
      ]);
      return;
    }

    const isHome = canonicalPath === '/';
    const pageTitle = pageData.title || pageData.frontmatter.title || '机场代理';
    const pageDesc = pageData.description || pageData.frontmatter.description || '代理客户端官方下载、全平台安装、订阅配置与兼容机场指南。';

    // Canonical link
    pageData.frontmatter.head.push([
      'link',
      { rel: 'canonical', href: canonicalUrl }
    ]);

    // Open Graph per-page tags
    pageData.frontmatter.head.push([
      'meta',
      { property: 'og:url', content: canonicalUrl }
    ]);
    pageData.frontmatter.head.push([
      'meta',
      { property: 'og:title', content: pageTitle }
    ]);
    pageData.frontmatter.head.push([
      'meta',
      { property: 'og:description', content: pageDesc }
    ]);

    // Twitter Card per-page tags
    pageData.frontmatter.head.push([
      'meta',
      { name: 'twitter:title', content: pageTitle }
    ]);
    pageData.frontmatter.head.push([
      'meta',
      { name: 'twitter:description', content: pageDesc }
    ]);

    // Article published and modified timestamps
    if (pageData.frontmatter.publishedAt) {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'article:published_time', content: `${pageData.frontmatter.publishedAt}T08:00:00+08:00` }
      ]);
    }
    if (pageData.frontmatter.modifiedAt) {
      pageData.frontmatter.head.push([
        'meta',
        { property: 'article:modified_time', content: `${pageData.frontmatter.modifiedAt}T08:00:00+08:00` }
      ]);
    }

    if (isHome) {
      const homeWebSiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': '机场代理',
        'url': 'https://jichangdaili.world/',
        'description': '专业且客观的代理客户端下载、安装教程、订阅配置、故障排查、客户端评测及兼容机场选型指南。',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://jichangdaili.world/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
      const homeOrgSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': '机场代理',
        'url': 'https://jichangdaili.world/',
        'logo': 'https://jichangdaili.world/logo.png',
        'sameAs': [
          'https://jichangdaili.world/about/',
          'https://jichangdaili.world/reviews/methodology/'
        ]
      };
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(homeWebSiteSchema)
      ]);
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(homeOrgSchema)
      ]);
    } else {
      // Build BreadcrumbList
      const sectionNames: Record<string, string> = {
        recommend: '机场推荐',
        free: '免费机场',
        clients: '客户端下载',
        install: '安装教程',
        subscription: '订阅配置',
        troubleshooting: '故障排查',
        reviews: '客户端评测',
        learn: '新手课堂',
        brands: '品牌核验名录',
        about: '关于我们',
        disclosure: '推广披露',
        privacy: '隐私政策',
        terms: '服务条款'
      };

      const segments = canonicalPath.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': '首页',
          'item': 'https://jichangdaili.world/'
        }
      ];

      let accumulated = '';
      for (let i = 0; i < segments.length; i++) {
        accumulated += `/${segments[i]}`;
        const isLast = i === segments.length - 1;
        const itemUrl = `https://jichangdaili.world${accumulated}/`;
        const segName = isLast
          ? pageTitle
          : (sectionNames[segments[i]] || segments[i]);
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': i + 2,
          'name': segName,
          'item': itemUrl
        });
      }

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems
      };

      // Determine page schema type
      let specificSchema: any;
      const isSectionHub = segments.length === 1 && Boolean(sectionNames[segments[0]]);

      if (canonicalPath === '/about/') {
        specificSchema = {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          'name': pageTitle,
          'description': pageDesc,
          'url': canonicalUrl,
          'publisher': {
            '@type': 'Organization',
            'name': '机场代理',
            'url': 'https://jichangdaili.world/'
          }
        };
      } else if (isSectionHub) {
        specificSchema = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          'headline': pageTitle,
          'description': pageDesc,
          'url': canonicalUrl,
          'inLanguage': 'zh-CN',
          'publisher': {
            '@type': 'Organization',
            'name': '机场代理',
            'url': 'https://jichangdaili.world/',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://jichangdaili.world/logo.png'
            }
          }
        };
      } else {
        specificSchema = {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': pageTitle,
          'description': pageDesc,
          'url': canonicalUrl,
          'inLanguage': 'zh-CN',
          'datePublished': pageData.frontmatter.publishedAt ? `${pageData.frontmatter.publishedAt}T08:00:00+08:00` : "2026-10-21T08:00:00+08:00",
          'dateModified': pageData.frontmatter.modifiedAt ? `${pageData.frontmatter.modifiedAt}T08:00:00+08:00` : "2026-10-21T08:00:00+08:00",
          'author': {
            '@type': 'Organization',
            'name': pageData.frontmatter.author || '机场代理编辑团队',
            'url': 'https://jichangdaili.world/about/'
          },
          'publisher': {
            '@type': 'Organization',
            'name': '机场代理',
            'url': 'https://jichangdaili.world/',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://jichangdaili.world/logo.png'
            }
          }
        };
      }

      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(breadcrumbSchema)
      ]);

      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(specificSchema)
      ]);
    }
  }
});
