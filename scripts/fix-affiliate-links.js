import fs from 'node:fs';
import path from 'node:path';

const contentDir = 'content';
let filesModified = 0;
let linksUpdated = 0;

function isAffiliateUrl(url) {
  return /aff|code=|gsyvip|flycat|breezenet|feimaoyun|weifengcloud|wuyoulink|xingdaomeng|worryfree/i.test(url);
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Replace Markdown affiliate links [text](url) with HTML compliant anchor tags
  // but only if it's an affiliate URL and not already inside a tag
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  content = content.replace(mdLinkRegex, (match, text, url) => {
    if (isAffiliateUrl(url)) {
      changed = true;
      linksUpdated++;
      return `<a href="${url}" target="_blank" rel="sponsored nofollow noopener">${text}</a>`;
    }
    return match;
  });

  // 2. Also check existing <a href="..."> tags that lack sponsored
  const aTagRegex = /<a\s+([^>]*href=["'](https?:\/\/[^"']+)["'][^>]*)>/gi;
  content = content.replace(aTagRegex, (match, attrs, url) => {
    if (isAffiliateUrl(url)) {
      if (!attrs.includes('sponsored') || !attrs.includes('nofollow')) {
        changed = true;
        linksUpdated++;
        // Remove existing rel and target to re-apply cleanly
        const cleanAttrs = attrs.replace(/\s*rel=["'][^"']*["']/gi, '').replace(/\s*target=["'][^"']*["']/gi, '');
        return `<a ${cleanAttrs} target="_blank" rel="sponsored nofollow noopener">`;
      }
    }
    return match;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.md')) processFile(full);
  }
}

walk(contentDir);
console.log(`[fix-affiliate-links] Modified ${filesModified} files, updated ${linksUpdated} affiliate links in content/`);
