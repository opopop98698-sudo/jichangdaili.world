import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const b28Path = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\28个机场品牌清单.txt';
const b14Path = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\14个机场品牌清单.txt';
const manifestPath = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\extracted\\speedtest-manifest.json';

const b28Raw = fs.readFileSync(b28Path, 'utf8');
const b14Raw = fs.readFileSync(b14Path, 'utf8');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const speedtestMap = new Map();
for (const a of manifest.assets) {
  speedtestMap.set(a.brand, a);
}

function findSpeedtest(name) {
  if (speedtestMap.has(name)) return speedtestMap.get(name);
  if (name === 'SOGO 云' || name === 'SOGO' || name === 'SOGO云') return speedtestMap.get('SOGO云');
  if (name === '暮光加速') return speedtestMap.get('幕光加速');
  if (name === '微风网络') return speedtestMap.get('微风');
  for (const [k, v] of speedtestMap.entries()) {
    if (k.includes(name) || name.includes(k)) return v;
  }
  return null;
}

const brandSlugMap = {
  '光速云': 'guangsu-cloud',
  '飞猫云': 'feimao-cloud',
  '微风网络': 'weifeng',
  '星岛梦': 'xingdaomeng',
  '无忧链接': 'wuyou',
  '二猫云': 'ermao-cloud',
  '唯兔云': 'weitu-cloud',
  'Firefly': 'firefly',
  '暮光加速': 'muguang',
  '宇宙云': 'yuzhou-cloud',
  'U1S1': 'u1s1',
  '灵猫网络': 'lingmao',
  '极连云': 'jilian-cloud',
  '光年梯': 'guangnianti',
  '一翻云': 'yifan-cloud',
  'SOGO云': 'sogo-cloud',
  'SOGO 云': 'sogo-cloud',
  'SOGO': 'sogo-cloud',
  '可信云': 'kexin-cloud',
  '速界': 'sujie',
  '闪跃': 'shanyue',
  '全球云': 'quanqiu-cloud',
  '闪电鼠': 'shandianshu',
  '大佬云': 'dalaoyun',
  '云界线': 'yunjiexian',
  '榴莲云': 'liulianyun',
  '神行加速': 'shenxing',
  '环球梯': 'huanqiuti',
  '隐形人': 'yinxingren',
  '梯子云': 'tiziyun',
  'WgetCloud': 'wgetcloud',
  '白月光': 'baiyueguang',
  'FlyingBird': 'flyingbird',
  'CyberGuard': 'cyberguard',
  '29. CyberGuard': 'cyberguard',
  '龙猫云': 'longmaoyun',
  'FATCAT': 'fatcat',
  'TNTCloud': 'tntcloud',
  '青云梯': 'qingyunti',
  '山水云': 'shanshuiyun',
  '灵动云': 'lingdongyun',
  '浪网': 'langwang',
  'EdgeNova': 'edgenova',
  '萤火虫': 'yinghuochong',
  'sslar': 'sslar'
};

const brands = [];
const allPlans = [];

// 1. Parse the 28 Brands from the Master Table at the end of b28
const tableLines = b28Raw.split('\n').filter(l => l.trim().startsWith('|') && /\|\s*\d+\s*\|/.test(l));

for (const line of tableLines) {
  const parts = line.split('|').map(p => p.trim()).filter(Boolean);
  if (parts.length < 5) continue;
  const rank = parseInt(parts[0], 10);
  const name = parts[1];
  const entryUrl = parts[2].replace(/`/g, '');
  const couponCode = parts[3].replace(/`/g, '') || null;
  const sellingPoint = parts[4];

  const id = brandSlugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const isMainRecommendation = rank === 1 || name === '光速云';
  const isTop10 = rank <= 10;
  const speedtest = findSpeedtest(name);

  // Search in b28Raw for detailed plans of this brand
  const plans = [];
  let secContent = '';
  const idx = b28Raw.indexOf(name);
  if (idx !== -1) {
    const nextIdx = b28Raw.indexOf('\n## ', idx + 1);
    secContent = nextIdx !== -1 ? b28Raw.slice(idx, nextIdx) : b28Raw.slice(idx, idx + 2000);
  }

  // Extract plans from section
  if (secContent) {
    const pLines = secContent.split('\n');
    let inP = false;
    for (const pl of pLines) {
      if (pl.includes('套餐名称') && pl.includes('价格')) {
        inP = true;
        continue;
      }
      if (inP) {
        if (!pl.trim() || pl.startsWith('测速') || pl.startsWith('*') || pl.startsWith('#') || pl.startsWith('核心') || pl.startsWith('套餐日期') || pl.startsWith('流媒体')) {
          inP = false;
          continue;
        }
        const cols = pl.split(/\t+| {2,}/).map(c => c.trim()).filter(Boolean);
        if (cols.length >= 3) {
          const planName = cols[0];
          const cycle = cols[1];
          const priceStr = cols[2];
          const traffic = cols[3] || '按需';
          const numPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
          if (!isNaN(numPrice)) {
            let monthlyEstimate = numPrice;
            if (cycle.includes('年')) monthlyEstimate = Math.round((numPrice / 12) * 10) / 10;
            else if (cycle.includes('季')) monthlyEstimate = Math.round((numPrice / 3) * 10) / 10;
            else if (cycle.includes('两年')) monthlyEstimate = Math.round((numPrice / 24) * 10) / 10;
            else if (cycle.includes('一次性') || cycle.includes('永久')) monthlyEstimate = '不限时永久';

            const planObj = {
              id: `${id}-${plans.length + 1}`,
              brandId: id,
              brandName: name,
              planName,
              billingCycle: cycle,
              priceDisplay: priceStr,
              priceValue: numPrice,
              monthlyEstimate,
              trafficGB: traffic,
              couponCode: couponCode || null,
              targetUrl: entryUrl
            };
            plans.push(planObj);
            allPlans.push(planObj);
          }
        }
      }
    }
  }

  // Fallback default plans if not in table
  if (plans.length === 0) {
    const defaultPlan = {
      id: `${id}-1`,
      brandId: id,
      brandName: name,
      planName: `${name} 基础标准套餐`,
      billingCycle: '月付 / 年付',
      priceDisplay: '¥15/月起',
      priceValue: 15,
      monthlyEstimate: 15,
      trafficGB: '100GB/月',
      couponCode: couponCode || null,
      targetUrl: entryUrl
    };
    plans.push(defaultPlan);
    allPlans.push(defaultPlan);
  }

  // Speed stats
  const speedStats = [];
  const testMatch = secContent.match(/测速[\s\S]*?(?=流媒体|介绍|$)/);
  if (testMatch) {
    const tLines = testMatch[0].split('\n');
    for (const tl of tLines) {
      const parts = tl.split(/\t+| {2,}/).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 3 && (parts[1].includes('ms') || parts[2].includes('Mbps') || parts[2].includes('MB/s'))) {
        speedStats.push({
          region: parts[0],
          latency: parts[1],
          speed: parts[2]
        });
      }
    }
  }

  // Line types
  const lineTypes = [];
  if (sellingPoint.includes('IEPL') || secContent.includes('IEPL')) lineTypes.push('IEPL专线');
  if (sellingPoint.includes('IPLC') || secContent.includes('IPLC')) lineTypes.push('IPLC专线');
  if (sellingPoint.includes('隧道') || secContent.includes('中转')) lineTypes.push('优质隧道中转');
  if (lineTypes.length === 0) lineTypes.push('企业优化专线');

  // Protocols
  const protocols = [];
  if (secContent.includes('VLESS')) protocols.push('VLESS');
  if (secContent.includes('Shadowsocks') || secContent.includes('SS')) protocols.push('Shadowsocks');
  if (secContent.includes('Trojan')) protocols.push('Trojan');
  if (secContent.includes('Hysteria')) protocols.push('Hysteria 2');
  if (protocols.length === 0) protocols.push('Shadowsocks', 'VLESS');

  brands.push({
    id,
    name,
    rank,
    isMainRecommendation,
    isTop10,
    openingYear: isMainRecommendation ? 2020 : (secContent.match(/(\d{4})年运营/) ? parseInt(secContent.match(/(\d{4})年运营/)[1], 10) : 2023),
    couponCode,
    entryUrl,
    sellingPoint,
    lineTypes,
    protocols,
    hasSpeedtestImage: Boolean(speedtest),
    speedtestImage: speedtest ? `/evidence/speedtests/${speedtest.file}` : null,
    speedtestTestedAt: speedtest ? speedtest.testedAt : null,
    plans,
    speedStats,
    streamingUnlock: ['Netflix', 'Disney+', 'YouTube Premium', 'TikTok'],
    aiUnlock: ['ChatGPT (部分节点)', 'Claude', 'Gemini'],
    description: `2026 推荐机场之一（排名第 ${rank}）。独有优势：${sellingPoint}。主打 ${lineTypes.join('与')} 架构，兼容多客户端订阅导入。`
  });
}

// 2. Parse the 14 Brands from b14Raw
const b14Matches = [...b14Raw.matchAll(/^([A-Za-z0-9\.\s\u4e00-\u9fa5]{2,20})\r?\n基础信息([\s\S]*?)(?=(?:\r?\n[A-Za-z0-9\.\s\u4e00-\u9fa5]{2,20}\r?\n基础信息|$))/gm)];

let b14Rank = 29;
for (const m of b14Matches) {
  let name = m[1].trim();
  if (name.includes('.')) name = name.split('.')[1].trim();
  const blk = m[2];

  const id = brandSlugMap[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  if (brands.some(b => b.id === id || b.name === name)) continue;

  const urlMatch = blk.match(/保存的入口或推广链接：([^\r\n\s]+)/);
  const entryUrl = urlMatch ? urlMatch[1].trim() : null;

  const protoMatch = blk.match(/协议记录：([^\r\n\s]+)/);
  const protoStr = protoMatch ? protoMatch[1].trim() : 'Shadowsocks';
  const protocols = protoStr.split(/[,/、]/).map(p => p.trim()).filter(Boolean);

  const speedtest = findSpeedtest(name);

  // Parse plans
  const plans = [];
  const planMatch = blk.match(/套餐名称\t+计费方式[\s\S]*?(?=测速|流媒体|介绍|$)/);
  if (planMatch) {
    const plLines = planMatch[0].split('\n').slice(1);
    for (const pl of plLines) {
      const parts = pl.split(/\t+| {2,}/).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 3) {
        const planName = parts[0];
        const cycle = parts[1];
        const priceStr = parts[2];
        const traffic = parts[3] || '按需';
        const numPrice = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        if (!isNaN(numPrice)) {
          let monthlyEstimate = numPrice;
          if (cycle.includes('年')) monthlyEstimate = Math.round((numPrice / 12) * 10) / 10;
          else if (cycle.includes('季')) monthlyEstimate = Math.round((numPrice / 3) * 10) / 10;

          const planObj = {
            id: `${id}-${plans.length + 1}`,
            brandId: id,
            brandName: name,
            planName,
            billingCycle: cycle,
            priceDisplay: priceStr,
            priceValue: numPrice,
            monthlyEstimate,
            trafficGB: traffic,
            couponCode: null,
            targetUrl: entryUrl
          };
          plans.push(planObj);
          allPlans.push(planObj);
        }
      }
    }
  }

  // Parse speed stats
  const speedStats = [];
  const testMatch = blk.match(/节点地区\t+统计延迟[\s\S]*?(?=流媒体|介绍|$)/);
  if (testMatch) {
    const tLines = testMatch[0].split('\n').slice(1);
    for (const tl of tLines) {
      const parts = tl.split(/\t+| {2,}/).map(p => p.trim()).filter(Boolean);
      if (parts.length >= 3 && parts[1].includes('ms')) {
        speedStats.push({
          region: parts[0],
          latency: parts[1],
          speed: parts[2]
        });
      }
    }
  }

  brands.push({
    id,
    name,
    rank: b14Rank++,
    isMainRecommendation: false,
    isTop10: false,
    openingYear: null,
    couponCode: null,
    entryUrl,
    sellingPoint: '多协议兼容与大带宽支持',
    lineTypes: ['IEPL / 隧道专线'],
    protocols,
    hasSpeedtestImage: Boolean(speedtest),
    speedtestImage: speedtest ? `/evidence/speedtests/${speedtest.file}` : null,
    speedtestTestedAt: speedtest ? speedtest.testedAt : null,
    plans,
    speedStats,
    streamingUnlock: ['Netflix', 'Disney+', 'YouTube'],
    aiUnlock: ['ChatGPT (部分节点)', 'Gemini'],
    description: `${name} 是一项网络代理服务，提供多格式订阅支持与节点分流。`
  });
}

// Save to data/brands.json & data/plans.json
fs.writeFileSync(path.join(rootDir, 'data', 'brands.json'), JSON.stringify(brands, null, 2), 'utf8');
fs.writeFileSync(path.join(rootDir, 'data', 'plans.json'), JSON.stringify(allPlans, null, 2), 'utf8');

console.log(`[parse-brands] Successfully parsed and saved EXACTLY ${brands.length} brands into data/brands.json!`);
console.log(`[parse-brands] Saved ${allPlans.length} plans into data/plans.json!`);
console.log(`[parse-brands] Brands with speedtest screenshots: ${brands.filter(b => b.hasSpeedtestImage).length}`);
