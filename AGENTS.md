# 申海漂 (Shen Hai Piao) — Agent 指南

## 状态

预实现阶段，尚无源代码，仅有游戏设计文档和音频素材。

## 设计权威

- `docs/itch-io策划案.md` — 权威游戏设计文档（281KB），所有实现决策必须与之对齐，包含技术栈、场景列表、NPC、玩法机制和 UI 线框图。

## 计划技术栈

| 层 | 技术 |
|-------|-----------|
| 游戏引擎 | Phaser 3（支持 Tiled JSON 地图、Y 排序、相机跟随） |
| 桌面 | Electron |
| 语言 | TypeScript |
| 构建 | Vite |
| 地图编辑器 | Tiled（.tmj 格式） |
| 数据 | localStorage（Web）/ JSON 文件（Electron） |

目标场景数：21 个 Phaser 场景（1 个城市地图 + 20 个室内场景）。

## 现有素材

`sounds/` 包含 9 个 MP3 文件，按情绪分类可直接使用：
- `日常1/2`、`紧张1/2`、`恋爱1/2`、`交易1/2`、`结局`

## 首次会话初始化流程

1. 用 `npm create vite@latest` + TypeScript 模板搭建项目
2. 安装 Phaser 3 + Electron + Tiled Phaser 插件
3. 按 GDD 中的 P0/P1/P2 优先级列表创建 `src/scenes/`
4. Tiled 地图放在 `assets/maps/`，精灵图放在 `assets/sprites/`

## 关键开发命令

脚手架搭建后适用：
- `npm run dev` — Vite 开发服务器，支持 HMR
- `npm run build` — 生产构建
- `npm run electron:dev` — Electron 开发模式（配置后）

## 约定

- 所有 NPC 日程数据、对话、股票市场配置来自 JSON 数据文件，不硬编码
- UI 覆盖层（股票图表、对话框、背包）使用 HTML/CSS + TS 叠加在 Phaser 画布上，不使用 Phaser UI
- Phaser ↔ UI 通信通过自定义事件（Phaser 事件 → UI 更新，UI 操作 → Phaser 反馈）
- 音效文件通过情绪键引用，而非文件名

## 语言

- 始终用中文回答

## 全局技能

- 调用 `~/.config/opencode/skills/` 下的全局技能辅助开发，包括规划、测试、调试、代码审查等

## 代码规范

- TypeScript strict 模式，禁用 `any`
- 缩进 2 空格，行尾分号，单引号
- 命名：变量/函数 `camelCase`，类/类型/接口 `PascalCase`，文件 `kebab-case`
- 函数签名显式标注类型，不依赖类型推断
- import 排序：内置模块 → 第三方包 → 内部模块，每组空行分隔
- 公共 API 加 JSDoc 注释
