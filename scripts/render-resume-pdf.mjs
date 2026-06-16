#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(__dirname, "..");
const templateDir = path.join(skillRoot, "assets", "resume-pdf-templates");

const themes = {
  blue: {
    accent: "#2563eb",
    accentDark: "#1e3a8a",
    accentSoft: "#eff6ff",
    accentBorder: "#bfdbfe",
    sidebarBg: "#f8fafc",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#5f6b7a",
    line: "#dbe3ea",
  },
  green: {
    accent: "#059669",
    accentDark: "#065f46",
    accentSoft: "#ecfdf5",
    accentBorder: "#a7f3d0",
    sidebarBg: "#f7fdf9",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#5f6b7a",
    line: "#dbe3ea",
  },
  black: {
    accent: "#111827",
    accentDark: "#111827",
    accentSoft: "#f3f4f6",
    accentBorder: "#d1d5db",
    sidebarBg: "#f8fafc",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#4b5563",
    line: "#d1d5db",
  },
  orange: {
    accent: "#ea580c",
    accentDark: "#9a3412",
    accentSoft: "#fff7ed",
    accentBorder: "#fed7aa",
    sidebarBg: "#fffbf7",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#5f6b7a",
    line: "#dbe3ea",
  },
  navy: {
    accent: "#0f4c81",
    accentDark: "#123456",
    accentSoft: "#eef6fb",
    accentBorder: "#b8d7ea",
    sidebarBg: "#f6fbff",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#536172",
    line: "#d7e2ea",
  },
  teal: {
    accent: "#0f766e",
    accentDark: "#134e4a",
    accentSoft: "#f0fdfa",
    accentBorder: "#99f6e4",
    sidebarBg: "#f7fffc",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#566674",
    line: "#d8e7e5",
  },
  cyan: {
    accent: "#0891b2",
    accentDark: "#155e75",
    accentSoft: "#ecfeff",
    accentBorder: "#a5f3fc",
    sidebarBg: "#f6fdff",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#5b6875",
    line: "#d7e8ed",
  },
  indigo: {
    accent: "#4f46e5",
    accentDark: "#3730a3",
    accentSoft: "#eef2ff",
    accentBorder: "#c7d2fe",
    sidebarBg: "#f8f9ff",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#5f6475",
    line: "#dce1ee",
  },
  wine: {
    accent: "#be123c",
    accentDark: "#881337",
    accentSoft: "#fff1f2",
    accentBorder: "#fecdd3",
    sidebarBg: "#fff8f9",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#655d67",
    line: "#e7d9de",
  },
  slate: {
    accent: "#475569",
    accentDark: "#1f2937",
    accentSoft: "#f1f5f9",
    accentBorder: "#cbd5e1",
    sidebarBg: "#f8fafc",
    paper: "#ffffff",
    background: "#ffffff",
    text: "#111827",
    muted: "#5b6470",
    line: "#d6dde6",
  },
  zc: {
    accent: "#7A553C",
    accentDark: "#2F2722",
    accentSoft: "#E8D7C2",
    accentBorder: "#DDD0C0",
    sidebarBg: "#F7F1E7",
    paper: "#FFFCF6",
    background: "#F7F1E7",
    text: "#2F2722",
    muted: "#7C6F63",
    line: "#DDD0C0",
    sage: "#8E9A83",
    clay: "#C97961",
  },
};

const templateFiles = {
  "ats-clean": "ats-clean.html",
  "cn-single-polished": "cn-single-polished.html",
  "cn-single-polished-photo": "cn-single-polished-photo.html",
  "cn-sidebar": "cn-sidebar.html",
  "cn-sidebar-photo": "cn-sidebar-photo.html",
  "cn-formal": "cn-formal.html",
  "cn-formal-photo": "cn-formal-photo.html",
  "photo-formal": "cn-formal-photo.html",
  "portfolio-ai": "portfolio-ai.html",
  "latex-compact": "latex-compact.html",
  "compact-two-column": "compact-two-column.html",
  "timeline-modern": "timeline-modern.html",
  "executive-summary": "executive-summary.html",
  "evidence-cards": "evidence-cards.html",
  "right-rail-modern": "right-rail-modern.html",
  "right-rail-modern-photo": "right-rail-modern-photo.html",
  "top-band-compact": "top-band-compact.html",
  "top-band-compact-photo": "top-band-compact-photo.html",
  "classic-markdown": "classic-markdown.html",
  "skill-dashboard": "skill-dashboard.html",
  "compact-two-column-photo": "compact-two-column-photo.html",
  "zc-sidebar-visual": "zc-sidebar-visual.html",
  "zc-sidebar-visual-photo": "zc-sidebar-visual-photo.html",
  "zc-sidebar-visual-photo-two-page": "zc-sidebar-visual-photo-two-page.html",
};

const internalPhrases = [
  "投递匹配说明",
  "当前评分",
  "风险提示",
  "通篇复核",
  "成果量化补采表",
  "待补数字",
  "内部审查",
  "本轮状态",
  "P0",
  "P1",
  "P2",
];

const unresolvedPhrases = [
  "[待确认]",
  "[待补充]",
  "[建议补充]",
  "待确认",
  "待补充",
  "建议补充",
];

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const value = argv[i];
    if (!value.startsWith("--")) continue;
    const key = value.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function usage() {
  return `Usage:
  node scripts/render-resume-pdf.mjs --input resume-data.json --out out-dir [--template cn-sidebar] [--theme blue] [--name output-name] [--html-only]
  node scripts/render-resume-pdf.mjs --input resume-data.json --out out-dir --template cn-sidebar --theme blue --accent "#0ea5e9" --accent-dark "#075985" --accent-soft "#ecfeff" --accent-border "#a5f3fc"

Examples:
  node scripts/render-resume-pdf.mjs --input examples/resume-pdf-data.example.json --out /tmp/resume-out --template cn-sidebar --theme green
  node scripts/render-resume-pdf.mjs --input zc-resume-data.json --out /tmp/resume-out --template zc-sidebar-visual --theme zc
`;
}

function text(value) {
  if (value === undefined || value === null) return "";
  return String(value);
}

function htmlEscape(value) {
  return text(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function first(array, fallback = {}) {
  return Array.isArray(array) && array.length > 0 ? array[0] : fallback;
}

function at(array, index, fallback = "") {
  return Array.isArray(array) && array[index] !== undefined ? array[index] : fallback;
}

function bulletAt(items, index) {
  return at(items, index, "");
}

function compactJoin(values, sep = " | ") {
  return values.map(text).map((item) => item.trim()).filter(Boolean).join(sep);
}

function buildFields(data) {
  const profile = data.profile || {};
  const education = first(data.education);
  const experience = first(data.experiences);
  const experience1 = at(data.experiences, 0, {});
  const experience2 = at(data.experiences, 1, {});
  const experience3 = at(data.experiences, 2, {});
  const project = first(data.projects);
  const project1 = at(data.projects, 0, {});
  const project2 = at(data.projects, 1, {});
  const project3 = at(data.projects, 2, {});
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const advantages = Array.isArray(data.advantages) ? data.advantages : [];
  const certificates = Array.isArray(data.certificates) ? data.certificates : [];
  const awards = Array.isArray(data.awards) ? data.awards : [];
  const zcWorkflow = profile.zcWorkflow || data.zcWorkflow || {};

  return {
    name: profile.name,
    target_role: profile.targetRole,
    phone: profile.phone,
    email: profile.email,
    city: profile.city,
    availability: profile.availability,
    portfolio_url: profile.portfolioUrl,
    photo_src: profile.photoSrc,
    roman_name: profile.romanName,
    sidebar_badge: profile.sidebarBadge || at(skills, 0) || profile.targetRole,
    kicker: profile.kicker || profile.oneLinePositioning,
    one_line_positioning: profile.oneLinePositioning,
    method_label: zcWorkflow.label || "业务拆解",
    method_text: zcWorkflow.text,
    adapt_direction: zcWorkflow.direction,

    school: education.school,
    major: education.major,
    degree: education.degree,
    education_time: education.time,
    education_note: education.note,

    skills_grouped: profile.skillsGrouped || skills.join(" / "),
    skill_1: at(skills, 0),
    skill_2: at(skills, 1),
    skill_3: at(skills, 2),
    skill_4: at(skills, 3),
    skill_5: at(skills, 4),
    skill_6: at(skills, 5),

    advantage_1: at(advantages, 0),
    advantage_2: at(advantages, 1),
    advantage_3: at(advantages, 2),

    company: experience.company,
    role: experience.role,
    work_time: experience.time,
    work_subline: experience.subline,
    work_bullet_1: bulletAt(experience.bullets, 0),
    work_bullet_2: bulletAt(experience.bullets, 1),
    work_bullet_3: bulletAt(experience.bullets, 2),
    work_bullet_4: bulletAt(experience.bullets, 3),

    project_name: project.name,
    project_time: project.time,
    project_subline: project.subline,
    project_bullet_1: bulletAt(project.bullets, 0),
    project_bullet_2: bulletAt(project.bullets, 1),

    project_1_name: project1.name,
    project_1_time: project1.time,
    project_1_summary: project1.summary || project1.subline,
    project_1_bullet_1: bulletAt(project1.bullets, 0),
    project_1_bullet_2: bulletAt(project1.bullets, 1),
    project_2_name: project2.name,
    project_2_time: project2.time,
    project_2_summary: project2.summary || project2.subline,
    project_2_bullet_1: bulletAt(project2.bullets, 0),
    project_2_bullet_2: bulletAt(project2.bullets, 1),
    project_3_name: project3.name,
    project_3_time: project3.time,
    project_3_summary: project3.summary || project3.subline,
    project_3_bullet_1: bulletAt(project3.bullets, 0),
    project_3_bullet_2: bulletAt(project3.bullets, 1),
    project_1_signal_input: project1.signalInput,
    project_1_signal_process: project1.signalProcess,
    project_1_signal_output: project1.signalOutput,
    project_2_signal_input: project2.signalInput,
    project_2_signal_process: project2.signalProcess,
    project_2_signal_output: project2.signalOutput,
    project_3_signal_input: project3.signalInput,
    project_3_signal_process: project3.signalProcess,
    project_3_signal_output: project3.signalOutput,

    experience_1_title: compactJoin([experience1.company, experience1.role], " | "),
    experience_1_time: experience1.time,
    experience_1_subline: experience1.subline,
    experience_1_bullet_1: bulletAt(experience1.bullets, 0),
    experience_1_bullet_2: bulletAt(experience1.bullets, 1),
    experience_2_title: compactJoin([experience2.company, experience2.role], " | "),
    experience_2_time: experience2.time,
    experience_2_subline: experience2.subline,
    experience_2_bullet_1: bulletAt(experience2.bullets, 0),
    experience_2_bullet_2: bulletAt(experience2.bullets, 1),
    experience_3_title: compactJoin([experience3.company, experience3.role], " | "),
    experience_3_time: experience3.time,
    experience_3_subline: experience3.subline,
    experience_3_bullet_1: bulletAt(experience3.bullets, 0),
    experience_3_bullet_2: bulletAt(experience3.bullets, 1),

    certificate_1: at(certificates, 0),
    award_1: at(awards, 0),
    campus_or_award_1: at(awards, 0) || at(certificates, 0),
    ...(data.fields || {}),
    resume_note: data.publicNote || data.fields?.public_note || "",
  };
}

function cssColor(value) {
  const color = text(value).trim();
  if (!color) return "";
  return /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : "";
}

function themeOverridesFrom(args, data) {
  const source = data.themeOverrides || data.colors || {};
  return {
    accent: cssColor(args.accent || source.accent),
    accentDark: cssColor(args["accent-dark"] || args.accentDark || source.accentDark),
    accentSoft: cssColor(args["accent-soft"] || args.accentSoft || source.accentSoft),
    accentBorder: cssColor(args["accent-border"] || args.accentBorder || source.accentBorder),
    sidebarBg: cssColor(args["sidebar-bg"] || args.sidebarBg || source.sidebarBg),
    paper: cssColor(args.paper || source.paper),
    background: cssColor(args.background || source.background),
    text: cssColor(args.text || source.text),
    muted: cssColor(args.muted || source.muted),
    line: cssColor(args.line || source.line),
    sage: cssColor(args.sage || source.sage),
    clay: cssColor(args.clay || source.clay),
  };
}

function applyTheme(html, themeName, overrides = {}) {
  const baseTheme = themes[themeName] || themes.blue;
  const cleanOverrides = Object.fromEntries(
    Object.entries(overrides).filter(([, value]) => text(value).trim()),
  );
  const theme = { ...baseTheme, ...cleanOverrides };
  const vars = [
    `--accent: ${theme.accent};`,
    `--accent-dark: ${theme.accentDark};`,
    `--accent-soft: ${theme.accentSoft};`,
    `--accent-border: ${theme.accentBorder};`,
    `--sidebar-bg: ${theme.sidebarBg};`,
    `--paper: ${theme.paper};`,
    `--background: ${theme.background};`,
    `--text: ${theme.text};`,
    `--muted: ${theme.muted};`,
    `--line: ${theme.line};`,
    `--sage: ${theme.sage || theme.accent};`,
    `--clay: ${theme.clay || theme.accent};`,
  ].join("\n      ");

  if (html.includes(":root {")) {
    return html.replace(/:root\s*\{[^}]*\}/, `:root {\n      ${vars}\n    }`);
  }

  return html.replace("<style>", `<style>\n    :root {\n      ${vars}\n    }\n`);
}

function fillTemplate(html, fields) {
  return html.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_match, key) => htmlEscape(fields[key]));
}

function detectLeftovers(html) {
  const matches = html.match(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g);
  return matches ? [...new Set(matches)] : [];
}

function detectInternalPhrases(html) {
  return internalPhrases.filter((phrase) => html.includes(phrase));
}

function detectUnresolvedPhrases(html) {
  return unresolvedPhrases.filter((phrase) => html.includes(phrase));
}

function maxIndexedPlaceholder(rawTemplate, prefix) {
  const regex = new RegExp(`\\{\\{\\s*${prefix}_(\\d+)_`, "g");
  let max = 0;
  let match;
  while ((match = regex.exec(rawTemplate)) !== null) {
    max = Math.max(max, Number(match[1]));
  }
  return max;
}

function analyzeTemplateCapacity(rawTemplate) {
  const indexedExperiences = maxIndexedPlaceholder(rawTemplate, "experience");
  const supportsPrimaryExperience = /\{\{\s*(company|role|work_time|work_bullet_)/.test(rawTemplate);
  const indexedProjects = maxIndexedPlaceholder(rawTemplate, "project");
  const supportsPrimaryProject = /\{\{\s*(project_name|project_time|project_bullet_)/.test(rawTemplate);

  return {
    experiences: Math.max(indexedExperiences, supportsPrimaryExperience ? 1 : 0),
    projects: Math.max(indexedProjects, supportsPrimaryProject ? 1 : 0),
    education: /\{\{\s*school\s*\}\}/.test(rawTemplate) ? 1 : 0,
    certificates: /\{\{\s*certificate_1\s*\}\}/.test(rawTemplate) ? 1 : 0,
    awards: /\{\{\s*(award_1|campus_or_award_1)\s*\}\}/.test(rawTemplate) ? 1 : 0,
  };
}

function hasMeaningfulValue(item) {
  if (item === undefined || item === null) return false;
  if (typeof item !== "object") return Boolean(text(item).trim());
  return Object.values(item).some((value) => {
    if (Array.isArray(value)) return value.some(hasMeaningfulValue);
    if (value && typeof value === "object") return hasMeaningfulValue(value);
    return Boolean(text(value).trim());
  });
}

function countMeaningful(items) {
  return Array.isArray(items) ? items.filter(hasMeaningfulValue).length : 0;
}

function detectOmittedContent(data, capacity) {
  const checks = [
    ["工作/实习经历", countMeaningful(data.experiences), capacity.experiences],
    ["项目/作品", countMeaningful(data.projects), capacity.projects],
    ["教育经历", countMeaningful(data.education), capacity.education],
    ["证书", countMeaningful(data.certificates), capacity.certificates],
    ["获奖/校园亮点", countMeaningful(data.awards), capacity.awards],
  ];

  return checks
    .filter(([, inputCount, templateCount]) => inputCount > templateCount)
    .map(([label, inputCount, templateCount]) => `${label}: 输入 ${inputCount} 条 / 模板可展示 ${templateCount} 条`);
}

async function checkPhotoSource(profile, { requiresPhoto, supportsPhotoPlaceholder, inputDir }) {
  const src = text(profile.photoSrc).trim();
  if (!src) {
    if (requiresPhoto && !supportsPhotoPlaceholder) {
      return { ok: false, message: "照片模板缺少 photoSrc" };
    }
    if (requiresPhoto && supportsPhotoPlaceholder) {
      return { ok: true, message: "使用模板照片占位，正式投递前需替换真实照片" };
    }
    return { ok: true, message: "不要求照片" };
  }

  if (/^(https?:|data:|file:)/.test(src)) {
    return { ok: true, message: "照片使用 URL/data/file 来源，需人工确认可见性" };
  }

  const photoPath = path.isAbsolute(src) ? src : path.resolve(inputDir, src);
  const stat = await fileStatSafe(photoPath);
  return stat
    ? { ok: true, message: `本地照片存在：${photoPath}` }
    : { ok: false, message: `本地照片路径不可访问：${photoPath}` };
}

function safeOutputName(data, template, theme, nameArg) {
  if (nameArg) return nameArg;
  const profile = data.profile || {};
  const base = compactJoin([profile.name, profile.targetRole, profile.city], "-") || "resume";
  return `${base}-${template}-${theme}`.replace(/[\\/:*?"<>|\s]+/g, "-");
}

async function loadPlaywright() {
  try {
    const require = createRequire(import.meta.url);
    return require("playwright");
  } catch {
    return null;
  }
}

async function renderWithPlaywright(htmlPath, pdfPath, pngPath) {
  const playwright = await loadPlaywright();
  if (!playwright) return { ok: false, reason: "playwright package not found" };

  let browser;
  try {
    try {
      browser = await playwright.chromium.launch({ headless: true });
    } catch {
      browser = await playwright.chromium.launch({ headless: true, channel: "chrome" });
    }
    const page = await browser.newPage({ viewport: { width: 1240, height: 1754 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true, preferCSSPageSize: true });
    const resumePage = page.locator(".page").first();
    if (await resumePage.count()) {
      await resumePage.screenshot({ path: pngPath });
    } else {
      await page.screenshot({ path: pngPath, fullPage: true });
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error.message };
  } finally {
    if (browser) await browser.close();
  }
}

async function fileStatSafe(filePath) {
  try {
    return await fs.stat(filePath);
  } catch {
    return null;
  }
}

async function writeQaReport({
  qaPath,
  data,
  template,
  theme,
  htmlPath,
  pdfPath,
  pngPath,
  leftovers,
  internalHits,
  unresolvedHits,
  omittedContent,
  inputDir,
  htmlOnly,
  renderResult,
}) {
  const profile = data.profile || {};
  const required = {
    name: profile.name,
    targetRole: profile.targetRole,
    phone: profile.phone,
    email: profile.email,
    city: profile.city,
  };
  const missingRequired = Object.entries(required)
    .filter(([, value]) => !text(value).trim())
    .map(([key]) => key);
  const supportsPhotoPlaceholder = template === "zc-sidebar-visual-photo";
  const requiresPhoto = template.endsWith("-photo") || template === "photo-formal";
  const photoCheck = await checkPhotoSource(profile, { requiresPhoto, supportsPhotoPlaceholder, inputDir });
  const pdfStat = await fileStatSafe(pdfPath);
  const pngStat = await fileStatSafe(pngPath);
  const renderFilesOk = htmlOnly || (renderResult.ok && pdfStat?.size > 0 && pngStat?.size > 0);
  const status = (
    leftovers.length === 0 &&
    internalHits.length === 0 &&
    unresolvedHits.length === 0 &&
    omittedContent.length === 0 &&
    missingRequired.length === 0 &&
    photoCheck.ok &&
    renderFilesOk
  ) ? "可交付候选" : "需要修正";

  const lines = [
    "# Resume PDF QA",
    "",
    `- 状态：${status}`,
    `- 模板：${template}`,
    `- 主题：${theme}`,
    `- HTML：${htmlPath}`,
    `- PDF：${pdfStat ? pdfPath : "未生成"}`,
    `- PNG：${pngStat ? pngPath : "未生成"}`,
    `- PDF 渲染：${htmlOnly ? "仅生成 HTML" : (renderResult.ok ? "通过" : `未执行或失败（${renderResult.reason || "unknown"}）`)}`,
    "",
    "## 自动检查",
    "",
    "| 检查项 | 结果 |",
    "| --- | --- |",
    `| 必填字段 | ${missingRequired.length ? `缺少 ${missingRequired.join(", ")}` : "通过"} |`,
    `| 照片要求 | ${photoCheck.ok ? photoCheck.message : photoCheck.message} |`,
    `| 模板占位符 | ${leftovers.length ? `残留 ${leftovers.join(", ")}` : "通过"} |`,
    `| 内部说明污染 | ${internalHits.length ? `发现 ${internalHits.join(", ")}` : "通过"} |`,
    `| 待确认/补充残留 | ${unresolvedHits.length ? `发现 ${unresolvedHits.join(", ")}` : "通过"} |`,
    `| 模板容量 | ${omittedContent.length ? `可能遗漏：${omittedContent.join("；")}` : "通过"} |`,
    `| A4 输出 | ${renderFilesOk ? (htmlOnly ? "HTML-only 模式，未要求 PDF" : "通过 Playwright A4 PDF/PNG 导出") : "未生成可验证 PDF/PNG"} |`,
    "",
    "## 人工复核",
    "",
    "- 打开 PNG 检查是否有文字截断、重叠、侧栏比例失衡或异常字形。",
    "- 如果模板容量提示可能遗漏，先回到简历编排确认，把多段经历压缩、换模板或移入作品集。",
    "- ATS 版需另做文本提取检查；视觉版不作为唯一投递文件。",
    "- 正式简历中不得出现评分、风险提示、通篇复核、量化补采表或待确认标记。",
    "",
  ];
  await fs.writeFile(qaPath, `${lines.join("\n")}\n`, "utf8");
  return { status, renderFilesOk, photoCheck };
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help || !args.input || !args.out) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }

  const inputPath = path.resolve(args.input);
  const outDir = path.resolve(args.out);
  const data = JSON.parse(await fs.readFile(inputPath, "utf8"));
  const style = text(data.resumeStyle || data.style || data.profile?.resumeStyle || data.profile?.style).toLowerCase();
  const template = args.template || data.template || (style === "zc" ? "zc-sidebar-visual" : "cn-sidebar");
  const theme = template.startsWith("zc-") ? "zc" : (args.theme || data.theme || (style === "zc" ? "zc" : "blue"));
  const templateFile = templateFiles[template];

  if (!templateFile) {
    throw new Error(`Unknown template "${template}". Use one of: ${Object.keys(templateFiles).join(", ")}`);
  }

  await fs.mkdir(outDir, { recursive: true });
  const outputName = safeOutputName(data, template, theme, args.name);
  const htmlPath = path.join(outDir, `${outputName}.html`);
  const pdfPath = path.join(outDir, `${outputName}.pdf`);
  const pngPath = path.join(outDir, `${outputName}.png`);
  const qaPath = path.join(outDir, `${outputName}.qa.md`);

  const rawTemplate = await fs.readFile(path.join(templateDir, templateFile), "utf8");
  const templateCapacity = analyzeTemplateCapacity(rawTemplate);
  const fields = buildFields(data);
  const themeOverrides = themeOverridesFrom(args, data);
  const themed = applyTheme(rawTemplate, theme, themeOverrides);
  const rendered = fillTemplate(themed, fields);
  const leftovers = detectLeftovers(rendered);
  const internalHits = detectInternalPhrases(rendered);
  const unresolvedHits = detectUnresolvedPhrases(rendered);
  const omittedContent = detectOmittedContent(data, templateCapacity);

  await fs.writeFile(htmlPath, rendered, "utf8");

  let renderResult = { ok: false, reason: "html-only mode" };
  if (!args["html-only"]) {
    renderResult = await renderWithPlaywright(htmlPath, pdfPath, pngPath);
  }

  const qaResult = await writeQaReport({
    qaPath,
    data,
    template,
    theme,
    htmlPath,
    pdfPath,
    pngPath,
    leftovers,
    internalHits,
    unresolvedHits,
    omittedContent,
    inputDir: path.dirname(inputPath),
    htmlOnly: Boolean(args["html-only"]),
    renderResult,
  });

  console.log(JSON.stringify({
    html: htmlPath,
    pdf: qaResult.renderFilesOk && !args["html-only"] ? pdfPath : null,
    png: qaResult.renderFilesOk && !args["html-only"] ? pngPath : null,
    qa: qaPath,
    status: qaResult.status === "可交付候选" ? "ok" : "needs_review",
    checks: {
      leftovers,
      internalHits,
      unresolvedHits,
      omittedContent,
      photo: qaResult.photoCheck,
      templateCapacity,
    },
    render: renderResult,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
