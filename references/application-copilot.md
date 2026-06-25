# 投递副驾驶与授权投递

用于岗位池、小批量排序、投递包、授权卡、投递事件和浏览器辅助边界。目标不是无脑海投，而是让候选人在岗位已筛选、JD 已拆解、材料已匹配、用户已授权后，减少“按下发送”这一步的摩擦。

## 定位

Skill 本体负责判断和生成：

- 标准化岗位信息。
- 去重、风险标注和投递优先级。
- JD 题目化、匹配判断和缺口动作。
- 生成投递包、话术、材料策略和复盘建议。
- 设置授权卡和停止条件，防止未经确认的对外提交。

外部工具只负责机械动作：

- 导入岗位报告、Markdown、CSV、截图文字或粘贴文本。
- 读取或整理本地岗位池文件。
- 打开岗位页、填入已确认话术、准备已确认附件。
- 在授权范围内执行投递动作。
- 记录投递状态和反馈。

外部工具不能替 Skill 做真实性判断，不能扩展授权范围，也不能绕过平台限制。

## 三种模式

### 1. 投递副驾驶

默认模式。Agent 可以打开页面、填入已确认话术、准备附件或作品链接，但停在最终发送、申请、提交、加好友或发送附件前。

适用：

- 高价值岗位。
- 信息不完整岗位。
- 用户想最后看一眼。
- 第一次使用某个平台或自动化工具。

### 2. 单岗位授权投递

用户确认某一个岗位的公司、岗位、渠道、简历、话术、附件和作品链接后，Agent 可以执行最终发送或申请动作。

适用：

- 岗位明确。
- JD 已拆解。
- 投递包已生成。
- 用户明确说“确认投这个岗位 / 按这版发”。

### 3. 批次授权投递

用户确认一批岗位和每个岗位的投递包后，Agent 可以逐个执行。不能扩大岗位数量、临时换简历、替换话术、改变渠道或投未授权岗位。

适用：

- 用户要减少投递阻力。
- 一批岗位已经排序。
- 每个岗位都有明确投递动作。
- 批次数量较小，默认 3-5 个，用户明确要求时也要先提示风险。

## 平台预授权规则

国内平台投递前，先把“哪些岗位可以进入自动化处理”讲清楚。预授权不是允许直接乱投，而是给岗位池筛选、排序和小批量定制设定边界。

建议先确认：

```yaml
cities:
target_roles:
salary_floor_monthly_cny:
excluded_company_types:
excluded_risk_flags:
max_jobs_per_batch:
daily_limit:
final_action_default: manual_stop/single_authorized_send
attachment_policy:
portfolio_policy:
```

默认规则：

- `max_jobs_per_batch` 建议 3-5 个。
- `final_action_default` 默认 `manual_stop`，即先停在发送前。
- 公司不明、培训贷、收费内推、外包包装、薪资不清、长期重复挂岗、要求敏感材料的岗位自动跳过或暂缓。
- BOSS/智联/猎聘这类平台先做只读采集和准备模式，再考虑单岗位授权发送。
- 即使用户说“帮我自动投”，也必须先把岗位范围、材料版本、话术、附件/作品链接和停止条件确认清楚。

## MVP 流程

```text
导入岗位
-> 标准化岗位卡
-> 去重和风险标注
-> JD 题目化
-> 匹配评分
-> 生成投递包
-> 生成授权卡
-> 用户确认投递模式
-> 浏览器辅助或授权执行
-> 记录事件
-> 下一轮复盘
```

默认不一次性生成大量文件。普通对话先给行动卡；只有用户要求留档、批量投递包或人工复核时，才创建岗位池文件或批次目录。

## 数据契约

### job_card

```yaml
job_id:
source:
source_url:
platform:
company_name:
job_title:
city:
salary_range:
experience_requirement:
education_requirement:
job_description:
requirements:
company_known: true/false
company_confidence: high/medium/low
posted_at:
collected_at:
duplicate_key:
risk_flags:
status: new/researching/tailored/ready/authorized/applied/stopped/follow_up/interview/rejected/offer/archived
```

### jd_answer_sheet

```yaml
job_id:
core_questions:
  - jd_requirement:
    what_interviewer_checks:
    current_answer:
    evidence:
    answer_carrier: resume/portfolio/message/interview/learning_appendix
    gap_action:
    risk:
recommendation: immediate/explained/apply_later/skip
```

`jd_answer_sheet` 来自 `references/jd-tailoring.md` 的 JD 题目化结果。没有事实支撑的要求只能进入 `gap_action`、学习附录或作品方案，不能写成已完成经历。

### application_package

```yaml
job_id:
batch_id:
resume_version:
pdf_version:
portfolio_link:
website_link:
opening_message:
follow_up_message:
interview_focus:
company_card:
send_channel:
authorization_scope: none/single/batch
final_action_mode: manual_stop/authorized_send
max_jobs:
stop_conditions:
  - login_or_captcha
  - platform_risk_control
  - company_mismatch
  - salary_or_location_mismatch
  - sensitive_field_required
  - attachment_missing
  - authorization_incomplete
  - platform_warning
  - page_or_network_error
confirmation_required: true
```

### application_event

```yaml
event_id:
job_id:
batch_id:
event_type: collected/screened/tailored/ready/authorized/sent/sent_by_agent/stopped/stopped_by_guardrail/followed_up/replied/interview/rejected/offer/archived
timestamp:
channel:
actor: user/agent/system
notes:
feedback:
next_action:
```

## 投递授权卡

任何最终对外动作前，都要先给短授权卡。用户确认后才能执行；用户没有确认时，停在副驾驶模式。

```markdown
## 投递授权卡
- 投递模式：投递副驾驶 / 单岗位授权投递 / 批次授权投递
- 岗位：
- 公司：
- 平台/渠道：
- 使用简历：
- 使用话术：
- 附件 / 作品链接：
- 本次允许动作：发送打招呼 / 投递简历 / 上传附件 / 加好友 / 官网申请
- 授权范围：仅此岗位 / 本批 X 个岗位
- 停止条件：验证码、风控、公司不明、薪资或地点不符、页面要求敏感信息、附件缺失、授权信息不完整、平台警告、页面异常
```

## 允许自动执行的动作

满足“投递包已确认 + 授权卡已确认 + 未触发停止条件”时，Agent 可以在授权范围内执行：

- 发送已确认的 BOSS/猎聘/微信/邮件开场话术。
- 投递已确认的简历版本。
- 上传或附加已确认的附件、PDF、作品链接或案例页。
- 在官网网申中提交已确认且不含敏感风险的基础字段。
- 记录 `authorized`、`sent_by_agent` 或 `stopped_by_guardrail` 事件。

执行后必须回报：

```markdown
## 投递结果
- 已完成：
- 停止/异常：
- 已记录事件：
- 下一步：
```

## 必须停止的动作

出现以下情况时立即停止，记录 `stopped_by_guardrail`，并让用户决定下一步：

- 登录异常、验证码、风控、账号警告、频率限制或平台权限提示。
- 公司名、岗位名、城市、薪资、渠道和授权卡不一致。
- 公司不明、岗位疑似培训贷、收费内推、外包包装、虚假招聘或诱导加微信。
- 页面要求身份证、薪资流水、证书原件、完整家庭信息、银行卡等敏感材料。
- 附件、作品链接、话术或简历版本缺失。
- 用户授权范围不完整或和当前页面不匹配。
- 平台页面异常、网络异常或无法确认是否发送成功。

不得绕过验证码、登录、风控、频率限制、平台权限或使用指纹伪装。不得模拟大量真人活跃、刷曝光、批量点开、反检测。不得自动回复 HR 所有消息。

## 不做无脑海投

用户说“帮我海投/全投/投 100 个”时，不直接执行。改为：

```text
岗位池筛选
-> 去重和风险标注
-> 小批量排序
-> 只选 3-5 个进入定制
-> 生成投递包和授权卡
-> 用户确认后执行
```

判断标准：

- 没读 JD、没匹配材料、同一份简历和话术乱发，是无脑海投。
- 已筛选、已拆 JD、已匹配材料、已确认投递包、已授权，是定制后授权投递。

## 小批量排序

用户提供多个岗位时，先排序，不急着逐个定制。

```markdown
| job_id | 公司/岗位 | 推荐动作 | 理由 | 风险 | 下一步 |
| --- | --- | --- | --- | --- | --- |
|  |  | 立即投递/带解释投递/暂缓/跳过 |  |  |  |
```

排序规则：

- 优先匹配清楚、公司信息可确认、近期活跃、用户真实想投的岗位。
- 对高风险、公司不明、渠道冲突、重复岗位和核心硬门槛不满足的岗位降级。
- 一批岗位默认只选 3-5 个进入定制，避免文件和任务失控。

## 批次复盘

每一批投递后，用 `references/tracking.md` 记录事件和反馈：

```markdown
## 本批复盘
- 已授权：
- 已投递：
- 已停止：
- 暂缓/跳过：
- 主要反馈：
- 下一轮只改：
```

无反馈不是失败结论。先判断岗位池、关键词、附件简历、打招呼钩子、渠道时机和材料证据，再决定是否重写材料或换投递方向。
