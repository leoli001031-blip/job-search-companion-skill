# Markdown 简历转 PDF 与模板库

用于把 Markdown、HTML 或纯文本简历生成可投递 PDF，并判断是否使用 ATS 单栏、左侧栏、照片版或项目作品版模板。

## 核心判断

先问一个问题：这份 PDF 主要给谁看？

```text
平台解析 / 官网网申 / ATS -> 优先 ats-clean 单栏文本版
HR / 业务负责人 / 微信转发 -> 可使用 cn-single-polished、cn-sidebar 或 cn-formal 视觉版
岗位/行业需要照片 -> 使用对应的 -photo 变体
项目型岗位 / 作品驱动岗位 -> 可使用 portfolio-ai，并保留 ats-clean
```

默认产出策略：

- 至少保留 1 份 `ats-clean` 单栏版，保证文本可复制、关键词可解析。
- 如果用户想要“好看一点”“左侧栏”“带照片”，再额外产出 1 份视觉版 PDF。
- 视觉版不能牺牲事实清晰度；设计只服务阅读，不替代内容证据。
- 不把照片、联系方式、学校、公司、岗位、项目名做成图片。

## 文件状态

PDF 场景先用短句说明真实状态：

```text
本轮状态：PDF 排版方案，未导出 PDF。
本轮状态：可复制 HTML/Markdown，未生成文件。
本轮状态：已生成 PDF，路径已验证。
```

未实际写入、导出并验证路径时，不给本地文件链接，不说“已生成 PDF”。可以继续给 A4 规格、模板选择、建议文件名、HTML/CSS 方案和导出步骤。

## 内置模板

模板骨架位于 `assets/resume-pdf-templates/`。

```markdown
| 模板 | 文件 | 适合场景 | 默认照片 | 风险 |
| --- | --- | --- | --- | --- |
| ATS 单栏版 | ats-clean.html | 平台解析、官网网申、通用投递 | 否 | 视觉较克制 |
| 单栏精致版 | cn-single-polished.html | 大多数人工阅读、材料偏薄、转型/新人 | 否 | 不如侧栏有视觉分区 |
| 单栏照片版 | cn-single-polished-photo.html | 需要照片但不想用传统格式 | 是 | 照片不专业会减分 |
| 中文左侧栏版 | cn-sidebar.html | HR/业务人工阅读、内容足够、技能/证书/教育可支撑侧栏 | 否 | 内容少会显空 |
| 侧栏照片版 | cn-sidebar-photo.html | 需要照片且内容足够支撑侧栏 | 是 | 内容少或照片差会显廉价 |
| 正式无照片版 | cn-formal.html | 传统企业、国企/事业单位、服务/销售/顾问但不放照片 | 否 | 视觉较保守 |
| 正式照片版 | cn-formal-photo.html / photo-formal.html | 国企、传统企业、服务/销售/讲师/顾问、岗位明确要求形象 | 是 | 照片不专业会减分 |
| 项目作品版 | portfolio-ai.html | AI/产品/运营/内容/设计等项目证据强的候选人 | 否 | 不适合作为唯一 ATS 版 |
| 极简密排版 | latex-compact.html | 正式投递、技术/产品/运营通用、内容较多但仍想保持单页 | 否 | 视觉不抢眼，但稳定 |
| 非对称双栏版 | compact-two-column.html | 教育/技能/证书较多，项目和经历都需要压缩展示 | 否 | 双栏不适合作为唯一 ATS 版 |
| 时间线现代版 | timeline-modern.html | 经历跨度、项目阶段、成长路径需要讲清楚 | 否 | 经历太少会显空 |
| 摘要优先版 | executive-summary.html | 资深、管理、顾问、商务、需要先讲定位和价值 | 否 | 新人使用可能显得虚 |
| 证据卡片版 | evidence-cards.html | 转型、0-2 年、项目/作品/交付物比履历更强 | 否 | 必须有可说明的项目证据 |
| 右侧栏现代版 | right-rail-modern.html | 想要侧栏但避免左侧重色块、适合作品/技能放右栏 | 否 | 右栏信息不足会显空 |
| 右侧栏照片版 | right-rail-modern-photo.html | 右栏信息足够且需要照片位 | 是 | 照片质量差会破坏右栏质感 |
| 顶部色带紧凑版 | top-band-compact.html | 希望有强第一眼但正文仍传统、适合人工阅读 | 否 | 大色带打印耗墨，不适合唯一投递版 |
| 顶部色带照片版 | top-band-compact-photo.html | 需要强首屏和照片位，适合人工转发 | 是 | 色带和照片都抢眼，岗位不合适会显浮 |
| 经典 Markdown 版 | classic-markdown.html | Markdown/学术/正式文本感、教育前置、打印优先 | 否 | 视觉记忆点弱 |
| 技能仪表盘版 | skill-dashboard.html | 岗位技能标签明确，想突出能力结构和项目证明 | 否 | 容易显“工具化”，需保守使用 |
| 非对称双栏照片版 | compact-two-column-photo.html | 双栏信息密度高且需要照片 | 是 | 比无照片版更挤，只适合内容足且照片稳定 |
| zc 视觉侧栏版 | zc-sidebar-visual.html | 用户明确要求 zc 风格简历、个人审美/作品集感、人工阅读 | 否 | 不适合作为唯一 ATS 版 |
| zc 视觉侧栏照片版 | zc-sidebar-visual-photo.html | 用户明确要求 zc 风格简历且需要照片位/照片占位 | 可占位 | 真实照片质量会显著影响观感 |
| zc 两页内容版 | zc-sidebar-visual-photo-two-page.html | 用户明确要求 zc 风格，且一页视觉版明显压缩内容 | 可占位 | 不适合作为唯一 ATS 版；适合人工阅读或作品集附件 |
```

## PDF 格式总览

Skill 内置 PDF 格式分 4 层，不要混用：

```text
1. ATS 解析层：ats-clean
2. 国内人工阅读层：cn-single-polished / cn-sidebar / cn-formal / latex-compact / compact-two-column / timeline-modern / executive-summary / right-rail-modern / top-band-compact / classic-markdown
3. 照片场景层：cn-single-polished-photo / cn-sidebar-photo / cn-formal-photo
4. 作品与个人视觉层：portfolio-ai / evidence-cards / skill-dashboard / zc-sidebar-visual / zc-sidebar-visual-photo / zc-sidebar-visual-photo-two-page
```

使用原则：

- 正式投递至少保留 1 份 ATS 或普通单栏文本版。
- 视觉侧栏、照片版、作品版用于 HR/内推/业务负责人阅读，不作为唯一投递附件。
- zc 系列是个人风格模板，不进入默认模板选择；只有用户明确要求时才用。

## zc 风格触发门

只有满足以下任一条件时，才允许输出 zc 配色或 zc 视觉模板：

```text
用户明确说：zc风格简历 / zc配色 / 暖米咖 / 用我的设计规范 / warm-workbench
命令明确指定：--theme zc
结构化输入明确包含：resumeStyle: "zc" 或 profile.style: "zc"
模板明确指定：--template zc-sidebar-visual、--template zc-sidebar-visual-photo 或 --template zc-sidebar-visual-photo-two-page
```

如果用户只是说“做得好看一点”“左侧栏”“视觉版”“带照片”，不要默认套 zc；先用 `cn-single-polished`、`cn-sidebar`、`cn-formal` 或询问是否要 zc 风格。

zc 风格数据建议：

```json
{
  "resumeStyle": "zc",
  "template": "zc-sidebar-visual",
  "theme": "zc",
  "profile": {
    "romanName": "PINYIN NAME",
    "kicker": "[岗位定位 1] / [核心能力 2] / [可展示证据 3]",
    "sidebarBadge": "[一句话定位]"
  },
  "zcWorkflow": {
    "label": "[方法标签]",
    "text": "从模糊需求、现场限制和交付目标出发，整理输入、流程、输出与验证方式。",
    "direction": "适配方向：[目标岗位 / 目标行业 / 核心使用场景]。"
  }
}
```

项目可以额外填写：

```json
{
  "signalInput": "产品图/文案",
  "signalProcess": "AI 规划/生成",
  "signalOutput": "营销物料初稿"
}
```

## 内容密度与页数判断

不要为了“视觉版必须一页”而吞掉关键证据。生成 PDF 前先判断内容密度：

```text
一页视觉摘要版：适合快速人工阅读，突出定位、3 条优势、2-3 个核心项目或经历。
两页内容版：适合项目型、转型、作品驱动、方法论需要解释的候选人。
ATS 单栏版：适合平台解析、官网网申和关键词检索。
```

如果出现以下情况，优先建议“两页内容版 + ATS 单栏版”，不要硬塞一页：

- 核心项目超过 3 个，且每个项目都需要解释输入、流程、输出或证据链接。
- 候选人是转型/复合背景，需要说明迁移逻辑、方法论或业务理解。
- 一页版为了排版删掉教育、关键经历、项目链接、成果证据或技能工具。
- A4 预览出现正文溢出、底部裁切、行距过密、字号过小或侧栏空而主栏挤。

交付时可以明确区分：

```text
一页视觉摘要版：用于 BOSS/微信/内推快速转发。
两页内容版：用于 HR/业务负责人深入阅读或作为作品集附件。
ATS 单栏版：用于官网网申和平台解析。
```

## 预览与颜色 QA

PDF/PNG 预览必须只展示 A4 页面本身，不要把浏览器视口右侧空白背景截进预览图。多页 PDF 可分别截取每个 `.page`，再纵向合成长图。

模板留白必须在 A4 页面容器内真实可见。不要只依赖 `@page margin` 来制造打印边距，否则 HTML/PNG 预览会丢失上边距，看起来贴边。推荐做法：

```css
@page { size: A4; margin: 0; }
.page {
  width: 210mm;
  min-height: 297mm;
  padding: 12mm 14mm;
}
```

没有 `.page` 容器的 ATS/纯文本模板，也应给 `body` 设置 A4 宽高和内边距，保证预览和 PDF 一致。

zc 模板的右侧正文底色应使用纸面色 `--paper`（默认 `#FFFCF6`），不要使用偏粉的 `Surface Soft` 作为主栏大面积底色；`Surface Soft` 只适合轻量层次或小面积辅助。若用户反馈“右侧发红/发粉”，优先检查：

- `.page` 和 `.main` 是否使用 `var(--paper)`。
- PNG 是否错误使用 fullPage 截图导致浏览器背景被截入。
- PDF 是否经过系统 QuickLook 或浏览器重新渲染验证。

## 个人信息隔离

PDF 模板、示例数据和 Skill 文档必须使用通用占位符，不得沉淀真实用户姓名、电话、邮箱、学校、公司、项目名、目标 JD 或个人观点。真实候选人信息只能写入用户工作区的输出文件或临时测试数据。

## 模板选择规则

先选风格，再判断是否需要照片：

```text
材料偏薄 / 转型 / 0-2 年经验 -> cn-single-polished
内容足够 / 技能证书教育可支撑侧栏 -> cn-sidebar
传统行业 / 国企 / 服务销售顾问 / 需要稳重 -> cn-formal
项目作品强 -> portfolio-ai
内容很多但要稳 -> latex-compact
教育/技能/证书多，主栏经历也多 -> compact-two-column
成长路径/项目阶段需要讲清楚 -> timeline-modern
资深/管理/顾问/商务 -> executive-summary
转型/新人/项目证据需要被看见 -> evidence-cards
想要侧栏但不想左侧大色块 -> right-rail-modern
想要强首屏但正文保持稳 -> top-band-compact
Markdown/正式文本/教育前置 -> classic-markdown
技能标签明确、项目证明充足 -> skill-dashboard
平台解析或官网网申 -> ats-clean
```

如果行业、岗位或用户明确需要照片，在对应风格后加 `-photo`：

```text
cn-single-polished -> cn-single-polished-photo
cn-sidebar -> cn-sidebar-photo
cn-formal -> cn-formal-photo
right-rail-modern -> right-rail-modern-photo
top-band-compact -> top-band-compact-photo
compact-two-column -> compact-two-column-photo
```

优先用 `ats-clean`：

- BOSS/智联/猎聘/前程无忧/官网系统需要解析附件。
- 用户投递岗位偏互联网、外企、技术、数据、纯产品。
- 用户没有稳定的照片或作品证据。
- 候选人经历已经复杂，版式越简单越安全。

可以加 `cn-single-polished`：

- 用户想要比 ATS 版好看，但材料不适合侧栏。
- 候选人只有 1-2 段主要经历，或还在转型、新人阶段。
- 需要一份稳定、克制、人工阅读友好的视觉版。
- 若需要照片，用 `cn-single-polished-photo`。

可以加 `cn-sidebar`：

- 用户需要发给 HR、内推人、业务负责人人工阅读。
- 简历内容多但需要压缩到 1 页。
- 联系方式、技能、证书、教育背景适合放侧栏，经历和项目放主栏。
- 候选人的侧栏信息足够稳定，例如教育、证书、技能、城市/到岗、作品链接等；如果只有很少信息，强行侧栏会显得空和模板化。
- 候选人的主栏内容至少有 2-3 个足够展开的模块；如果只有一段经历和一个轻项目，优先用单栏精致版，不要为了“好看”硬上侧栏。

可以加 `photo-formal`：

- 国企/事业单位/传统行业、服务业、销售、前台、讲师、顾问等岗位。
- JD 或平台明确要求照片。
- 用户有真实、清晰、职业化照片。
- 新模板优先使用 `cn-formal-photo`；`photo-formal` 只作为兼容旧调用的别名。

可以加 `cn-formal`：

- 传统企业、国企/事业单位、服务业、销售、顾问等岗位，但不需要或不适合放照片。
- 用户需要一份更像中文正式文档的简历。
- 教育、证书、专业资格或稳定工作经历需要前置。

可以加 `portfolio-ai`：

- 用户有作品链接、项目截图、Demo、案例页或可展示交付物。
- 目标岗位重视项目、方法、工具、作品和业务理解。
- 需要把 2-3 个核心项目放到第一页中上部。

可以加 `latex-compact`：

- 用户要一页内放下更多内容，但不想显得模板化。
- 正式投递、技术/产品/运营/咨询类岗位，需要稳、清楚、文本密度高。
- 参考 GitHub 上 Jake/billryan 类 LaTeX 简历的“强文本、弱装饰”思路，但用中文 HTML/CSS 实现。
- 仍建议另保留 `ats-clean`，尤其是官网系统解析。

可以加 `compact-two-column`：

- 用户教育、技能、证书、作品链接等侧栏信息较多，主栏也有足够项目/经历。
- 参考 Deedy 类非对称双栏思路，适合信息密度高但仍需一页展示的候选人。
- 双栏视觉版不作为唯一 ATS 版；投官网时仍给 `ats-clean`。

可以加 `timeline-modern`：

- 用户经历阶段、项目演进、成长路径本身有叙事价值。
- 适合实习转正、转型路径、项目从 0 到 1、长期活动/运营/研究经历。
- 经历太少时不要用；会暴露空白。

可以加 `executive-summary`：

- 用户需要先强调业务价值、管理/协作/顾问能力、行业经验或关键优势。
- 适合资深候选人、销售/商务/顾问/管理、项目负责人、运营负责人。
- 新人或证据不足时慎用，避免“定位很大、证据很薄”。

可以加 `evidence-cards`：

- 用户正式履历不强，但项目、作品、交付物、截图、案例更能说明能力。
- 适合转型、0-2 年、AI 应用、内容/运营/设计/产品助理等项目证明型候选人。
- 每张卡必须能对应真实材料或可解释经历；不能把空想包装成证据。

可以加 `right-rail-modern`：

- 用户想要侧栏信息分区，但不喜欢左侧整块深色栏。
- 适合把联系、教育、技能、证书、作品链接放到右栏，主栏保留经历和项目。
- 右栏信息不足时不要用；否则右侧会显得空和装饰化。
- 如果需要照片，优先使用 `right-rail-modern-photo`，照片放右栏顶部，整体最自然。

可以加 `top-band-compact`：

- 用户希望第一眼更有识别度，但正文仍然是传统简历结构。
- 适合 BOSS/微信/内推转发给人工阅读，不适合作为唯一官网网申版。
- 大面积色带会增加打印成本；打印场景优先另备 `ats-clean` 或 `classic-markdown`。
- 如果需要照片，可以使用 `top-band-compact-photo`；但照片和色带都会增强视觉存在感，只适合岗位气质允许的场景。

可以加 `classic-markdown`：

- 用户偏正式、偏学术、偏传统行业，或希望从 Markdown 稳定导出。
- 适合教育背景、证书、经历条目本身较清晰的候选人。
- 视觉记忆点较弱，但最接近“内容优先、打印稳定”的风格。
- 不建议加照片；它的价值是文本感和打印稳定。

可以加 `compact-two-column-photo`：

- 用户内容足够支撑双栏，同时目标行业或用户明确需要照片。
- 照片放左栏顶部；如果左栏内容不够或照片质量一般，优先退回 `compact-two-column` 或 `cn-sidebar-photo`。
- 双栏照片版不适合作为唯一 ATS 版。

可以加 `skill-dashboard`：

- 用户已经有比较明确的技能标签，且每个标签能找到对应项目或经历支撑。
- 适合能力结构比单段履历更有说服力的候选人。
- 不能把“技能仪表盘”做成空标签墙；每个技能必须能回到证据或经历。

可以加 `zc-sidebar-visual`：

- 用户明确要求 zc 风格简历、暖米咖配色或使用本地设计规范。
- 用户希望简历有个人视觉识别，但仍保持正式简历结构。
- 候选人的项目、作品、方法论或创作型经历较强，适合“左侧深色信息栏 + 右侧作品型主栏”。
- 必须保留普通 ATS/单栏版本，不把 zc 视觉版当唯一投递材料。

可以加 `zc-sidebar-visual-photo`：

- 用户明确要求 zc 风格，且目标行业/岗位/渠道适合放照片。
- 用户暂时没有照片但想先看版式，可以保留 PHOTO 占位；交付时必须说明这不是最终投递照片。
- 用户没有稳定职业照时，不建议把照片版作为主投版本。

## 照片规则

- 默认不放照片；只有岗位、行业或用户明确需要时才放。
- 使用真实职业照片，不建议从零生成虚构照片。
- 不用生活照、自拍、过度美颜、夸张背景。
- 照片只用于视觉版；ATS 单栏版不放照片。

## Markdown 到 PDF 流程

推荐链路：

```text
候选人材料 -> 结构化 resume-data.json -> 套用模板 HTML/CSS -> 导出 PDF/PNG -> QA 报告 -> 人工预览确认
```

优先使用内置轻量导出器，而不是让 AI 临时手写 PDF：

```bash
node scripts/render-resume-pdf.mjs \
  --input examples/resume-pdf-data.example.json \
  --out /tmp/resume-pdf-out \
  --template cn-sidebar \
  --theme blue
```

导出器会生成：

```text
*.html   方便继续微调或浏览器预览
*.pdf    A4 PDF（环境有 Playwright 时生成）
*.png    首屏/整页视觉预览（环境有 Playwright 时生成）
*.qa.md  自动检查报告
```

如果当前 Agent 环境没有 Playwright，导出器仍应生成 HTML 与 QA 报告，并诚实说明“未导出 PDF”。不要因此谎称已生成 PDF。

结构化数据建议使用 `examples/resume-pdf-data.example.json` 的字段形态：

```text
profile / education / skills / advantages / experiences / projects / certificates / awards / resumeNote
```

允许额外使用 `fields` 覆盖模板占位符，但不要把正式简历正文直接拼成一个大字符串塞入模板。模板负责排版，JSON 负责内容，AI 负责整理和复核。

如果候选人有多段经历/项目/教育，但所选模板只能展示其中一部分，不能静默省略。先回到 `materials.md` 的“经历取舍清单”，确认哪些进入简历正文、哪些压缩、哪些移入作品集/案例页；导出器的 QA 报告也会提示模板容量风险。

可选工具：

- Playwright / Chromium：适合把 HTML/CSS 稳定打印成 PDF。
- WeasyPrint：适合用 Python 从 HTML/CSS 生成 PDF。
- Pandoc：适合 Markdown 版本管理；可先转 HTML，再通过 CSS 控制样式。
- Word / WPS：适合传统行业需要可编辑版本时使用。

Pandoc 示例：

```bash
pandoc resume.md -s -t html5 -o resume.html --css resume.css
```

Playwright 导出要点：

```js
await page.emulateMedia({ media: "print" });
await page.pdf({ path: "resume.pdf", format: "A4", printBackground: true });
```

WeasyPrint 导出要点：

```python
from weasyprint import HTML
HTML("resume.html").write_pdf("resume.pdf")
```

## HTML/CSS 排版规则

- A4 纸，页边距 12-16mm；中文正文字号 10.5-11.5pt。
- 中文字体优先使用 PingFang SC、Microsoft YaHei、Noto Sans CJK SC / Source Han Sans SC、SimSun 等简体中文字体。
- 不要用 Arial Unicode 作为中文简历主字体；它容易在 PDF 中出现不适合简体中文的字形。
- HTML 必须设置 `lang="zh-CN"`，CSS 字体栈优先写简体中文字体，例如 `font-family: "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif;`。
- 若使用浏览器打印 PDF，视觉字形通常更好，但必须额外检查文本提取；部分嵌入字体会让解析器把汉字提成部首/异体码位。
- 若使用 ReportLab 等程序化 PDF 工具，优先保证 ATS 版文本可提取；视觉版可以另走 HTML/CSS 或 Word/WPS 导出。
- 行高 1.35-1.5；项目 bullet 控制在 1-2 行。
- 使用 `@page` 控制页面尺寸和边距，使用 `break-inside: avoid` 避免经历卡片断页。
- 使用真实文本，不用扫描图、整页截图、复杂文本框。
- 链接在 PDF 中保持可点击；重要链接同时显示可读 URL。
- 视觉版配色低饱和，避免大面积深色背景影响打印和手机阅读。

## 视觉质量底线

视觉版简历的目标是“更好读”，不是“更花”。优先复用 `assets/resume-pdf-templates/` 中的模板；除非用户明确要求定制，不要临时手绘整套 PDF。

侧栏版默认使用 `cn-sidebar.html`，并只通过 CSS 变量换主题色：

```css
--accent: #2563eb;      /* 透亮蓝 */
--accent-dark: #1e3a8a;
--accent-soft: #eff6ff;
--accent-border: #bfdbfe;
```

可选主题：

```text
透亮蓝：#2563eb / #1e3a8a / #eff6ff / #bfdbfe
清新绿：#059669 / #065f46 / #ecfdf5 / #a7f3d0
稳重黑：#111827 / #111827 / #f3f4f6 / #d1d5db
暖橙色：#ea580c / #9a3412 / #fff7ed / #fed7aa
深海蓝：#0f4c81 / #123456 / #eef6fb / #b8d7ea
青绿色：#0f766e / #134e4a / #f0fdfa / #99f6e4
天青色：#0891b2 / #155e75 / #ecfeff / #a5f3fc
靛蓝色：#4f46e5 / #3730a3 / #eef2ff / #c7d2fe
酒红色：#be123c / #881337 / #fff1f2 / #fecdd3
雾灰色：#475569 / #1f2937 / #f1f5f9 / #cbd5e1
zc 暖米咖（仅显式触发）：#7A553C / #2F2722 / #E8D7C2 / #DDD0C0 / #FFFCF6 / #F7F1E7
```

在导出器中对应参数为：

```text
--theme blue
--theme green
--theme black
--theme orange
--theme navy
--theme teal
--theme cyan
--theme indigo
--theme wine
--theme slate
--theme zc
--accent "#0ea5e9"
--accent-dark "#075985"
--accent-soft "#ecfeff"
--accent-border "#a5f3fc"
```

选色原则：

- 默认优先推荐 `blue`、`green`、`navy`、`teal`、`slate`，更稳、更适合国内多数岗位。
- `orange`、`wine`、`indigo` 更有记忆点，适合运营、品牌、市场、作品展示类岗位，但正式投递仍要检查打印效果。
- `zc` 是专属风格色，只在用户明确要求 zc 风格时启用。

自定义主题色：

- 如果用户只说“清新的绿 / 透亮的蓝 / 黑色 / 橙色”，优先从内置主题选择，不需要手动配色。
- 如果用户指定了具体色值，导出器允许用参数覆盖主题变量：

```bash
node scripts/render-resume-pdf.mjs \
  --input resume-data.json \
  --out output \
  --template right-rail-modern-photo \
  --theme blue \
  --accent "#0ea5e9" \
  --accent-dark "#075985" \
  --accent-soft "#ecfeff" \
  --accent-border "#a5f3fc"
```

- 自定义色值只接受十六进制颜色，避免把非颜色文本注入 CSS。
- 只改 `--accent` 时，其它颜色会沿用所选 `--theme` 的基底；想要完整协调，最好同时给 `accent / accent-dark / accent-soft / accent-border` 四个值。

`zc` 主题来自一套暖米咖视觉规范；如果在其他机器使用，可按下列色板复刻，不依赖固定本机路径：

```text
Background / 暖米底: #F7F1E7
Surface / 纸面:      #FFFCF6
Ink / 深咖墨色:      #2F2722
Muted / 次级文字:    #7C6F63
Line / 咖色细线:     #DDD0C0
Primary / 主动作:    #7A553C
Primary Soft:        #E8D7C2
Sage / 安静辅助:     #8E9A83
Clay / 小强调:       #C97961
```

注意：`zc` 签名本身不默认放进正式求职简历，避免把候选人身份材料变成第三方品牌物料。只有用户明确要求个人作品集、个人网站或设计化封面时，才可按设计规范少量使用低透明 `zc` 署名。

设计规则：

- 侧栏宽度控制在 A4 宽度的 25%-30%，不要超过三分之一。
- 默认用浅色侧栏 + 细色带；深色整栏只在用户明确要求“强视觉/深色版”时使用。
- 侧栏只放联系方式、教育、技能、证书等稳定信息；核心经历和项目放主栏。
- 侧栏不重复塞长邮箱、长链接和长段落；如果主栏顶部已有完整联系方式，侧栏可改放城市、到岗、教育、技能、证书。
- 技能标签不超过 6-8 个；长技能用短语分组，不把整段话塞进标签。
- 正文密度宁可拆成 ATS 版 + 视觉版，也不要把所有内容压进一页导致小字拥挤。
- 内容明显稀疏时，不要用侧栏填空；应回到内容补采、单栏精致版或作品页，而不是把简历做成空模板。
- 中文正文字号不要低于 9.5pt；侧栏辅助信息不要低于 8.8pt。
- 不使用奇怪自定义 bullet。HTML/CSS 模板用标准伪元素或普通列表；程序化 PDF 不要手绘导致圆点变成异常字形。
- 正式投递简历不放“投递匹配说明”“当前评分”“风险提示”“通篇复核”等内部判断；这些放入使用说明或内部审查版。
- 左侧栏、照片版、作品版都必须同时保留 ATS 单栏版，不把视觉版当唯一投递文件。

如果生成视觉版 PDF，优先链路是：

```text
结构化简历内容 -> 套用 HTML/CSS 模板 -> Playwright/Chrome 打印 PDF -> 渲染截图 QA
```

不推荐用 ReportLab 等程序化绘制生成复杂视觉版；它更适合 ATS 单栏、表格或简单 PDF，复杂侧栏容易出现排版生硬、bullet 异常、字体观感差等问题。

## Markdown 结构映射

建议 Markdown 原文保持通用结构，但模块顺序应先由 `materials.md` 的“简历编排建议与重点确认”决定。模板只决定视觉位置，不替用户决定叙事重点。

```markdown
# 姓名

求职意向：岗位方向 / 城市 / 到岗时间

联系方式：手机 | 邮箱 | 城市 | 作品链接

## 教育背景
## 个人优势
## 专业技能
## 工作 / 实习经历
## 项目 / 作品
## 校园 / 证书 / 获奖
```

视觉映射：

- `ats-clean`：按 Markdown 顺序单栏展示。
- `cn-single-polished`：单栏精致视觉版，适合内容偏少或不适合侧栏的候选人。
- `cn-single-polished-photo`：单栏精致版 + 右上角照片。
- `cn-sidebar`：主栏放优势、经历、项目；侧栏放联系、技能、教育、证书。
- `cn-sidebar-photo`：侧栏顶部放照片，主栏仍放核心经历和项目。
- `cn-formal`：正式中文文档风格，教育、证书和经历可前置。
- `cn-formal-photo` / `photo-formal`：顶部放照片和基本信息；教育、证书和经历前置。
- `portfolio-ai`：顶部放定位和作品链接；项目/作品放在经历前或同等位置。

侧栏版注意：侧栏只放稳定信息，不放长经历和核心 bullet。项目强、实习强或教育强，应先在内容编排层决定主栏顺序，再交给模板渲染。

## 文件命名

```text
姓名-岗位方向-城市-ATS版.pdf
姓名-岗位方向-城市-视觉版.pdf
姓名-岗位方向-城市-照片版.pdf
姓名-岗位方向-城市-作品版.pdf
```

不要在文件名里写夸张词，如“最强”“终极”“必过”。

## 导出 QA

导出后必须检查：

```markdown
| 检查项 | 通过标准 |
| --- | --- |
| 文本可复制 | 能选中姓名、公司、岗位、项目名和手机号 |
| 页面完整 | 无文字截断、重叠、断页尴尬 |
| 链接可打开 | 作品、GitHub、公众号、个人网站等链接可点击 |
| 隐私安全 | 无内部客户名、门店名、真实数据、同事姓名等泄露 |
| ATS 版本 | 单栏、少表格、无图片化文字 |
| 视觉版本 | 颜色克制、照片专业、手机查看清晰 |
| 中文字体 | 预览无繁体/异体字观感；文本提取能得到正常简体汉字 |
| 文件体积 | 通常控制在 1-3MB；平台限制时再压缩 |
| 模板容量 | 多段经历、项目、教育没有被模板静默省略；省略项已在交付说明中解释 |
| 待确认残留 | 正式投递版不含 `[待确认]`、`[待补充]`、评分、风险提示、通篇复核等内部标记 |
| 文件真实生成 | 不能只生成 HTML 就声称 PDF 成功；PDF 和 PNG 路径必须真实存在且非空 |
```

内置导出器生成的 `*.qa.md` 只是第一层自动检查；最终仍要打开 `*.png` 或 PDF 做人工预览。尤其检查：

- 是否仍有 `{{placeholder}}` 残留。
- 是否误把“评分、风险提示、通篇复核、成果量化补采表”等内部内容放入正式简历。
- 中文字形是否正常，是否出现繁体/异体字观感。
- 侧栏是否贯穿 A4 页面，主栏与侧栏比例是否协调。
- 是否因为强行压缩到一页导致字号过小或经历断裂。

## 中文字体故障处理

常见问题：

```markdown
| 现象 | 常见原因 | 处理 |
| --- | --- | --- |
| 看起来像繁体/异体字 | 使用 Arial Unicode、错误 CJK fallback 或未标注 zh-CN | 换 PingFang SC / Noto Sans CJK SC / Source Han Sans SC，并设置 `lang="zh-CN"` |
| 视觉好但 ATS 解析异常 | 浏览器嵌入字体后 ToUnicode 映射不稳定 | 保留一份单栏 ATS 版，用 pypdf/PyMuPDF 抽取文本检查 |
| 字体变成方块或粗细混乱 | 字体未安装或 PDF 未嵌入 | 改用系统常见字体，或改走 Word/WPS/Chrome 导出 |
| 左侧栏好看但解析差 | 多栏布局影响平台解析 | 左侧栏只作为人工阅读版，ATS 版保持单栏 |
```

交付规则：

- 中文简历至少检查两件事：渲染截图是否是正常简体字形，PDF 文本抽取是否能读出姓名、学校、公司、岗位、手机号和 GitHub/作品链接。
- 如果视觉版和 ATS 版无法兼得，明确分工：`ATS 版` 保解析，`视觉版` 保观感和转发阅读。
- 不要因为视觉版更好看，就删除单栏 ATS 版。

## 来源与更新线索

- Pandoc User's Guide: https://pandoc.org/MANUAL.html
- Playwright `page.pdf()` docs: https://playwright.dev/docs/api/class-page#page-pdf
- WeasyPrint First Steps: https://doc.courtbouillon.org/weasyprint/stable/first_steps.html
- MDN CSS paged media: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Paged_media
- Reactive Resume: https://github.com/amruthpillai/reactive-resume
- RenderCV: https://github.com/rendercv/rendercv
- OpenResume: https://github.com/xitanggg/open-resume
- HackMyResume: https://github.com/hacksalot/HackMyResume
- Awesome Resume for Chinese: https://github.com/dyweb/awesome-resume-for-chinese
