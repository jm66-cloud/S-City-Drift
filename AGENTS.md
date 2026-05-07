# 申海漂 (Shen Hai Piao) — Agent 指南

## 状态

预实现阶段，尚无源代码，仅有游戏设计文档和音频素材。

## 设计权威

- `docs/itch-io策划案.md` — 权威游戏设计文档（281KB），所有实现决策必须与之对齐，包含技术栈、场景列表、NPC、玩法机制和 UI 线框图。

## 技术栈

| 层 | 技术 |
|-------|-----------|
| 游戏引擎 | Godot 4 (GDScript) |
| 桌面 | Godot 原生导出 (Windows / Linux) |
| 语言 | GDScript |
| 地图 | Godot TileMapLayer + TileSet |
| 素材管线 | 代码程序化生成 (Image.set_pixel + DB32) |
| UI | Godot Control 节点 (CanvasLayer) |
| 数据 | JSON via FileAccess |
| 音频 | AudioStreamPlayer (Ogg) |
| 寻路 | NavigationAgent2D + NavigationRegion2D |

目标场景数：21 个 Godot 场景 (1 个城市地图 + 20 个室内场景)。

## 现有素材

`sounds/` 包含 9 个 MP3 文件，按情绪分类可直接使用：
- `日常1/2`、`紧张1/2`、`恋爱1/2`、`交易1/2`、`结局`

## 素材策略

所有像素美术素材**通过 Godot 代码程序化生成**，不使用外部图片工具：
- `src/procedural_assets/palette.gd` — DB32 调色板
- `src/procedural_assets/tile_generator.gd` — 瓦片生成
- `src/procedural_assets/building_generator.gd` — 建筑外观
- `src/procedural_assets/character_generator.gd` — 角色/NPC
- `src/procedural_assets/furniture_generator.gd` — 家具
- `src/procedural_assets/ui_icon_generator.gd` — UI 图标
- `src/procedural_assets/sprite_generator.gd` — 通用合成器
- `src/procedural_assets/effects.gd` — 特效纹理

所有生成器共用 DawnBringer 32 (DB32) 调色板，运行时在 Godot 的 `Image.set_pixel()` API 上构建。

## 架构要点

- Autoload 单例: `global.gd`, `event_bus.gd`, `audio_manager.gd`, `save_manager.gd`, `time_system.gd`, `asset_generator.gd`
- Godot 信号系统替代 Phaser 事件系统: EventBus 集中管理自定义信号
- Control 节点体系替代 HTML/CSS 覆盖层: CanvasLayer 上构建 UI
- Adventure/Click 移动模式: 鼠标点击目标位置 + NavigationAgent2D 自动寻路
- 原始 Phaser/TypeScript 设计中的算法逻辑 (股市引擎、NPC 日程等) 全部翻译为 GDScript

## 关键开发命令

- `godot4 project.godot` — 打开编辑器
- `F5` — 运行游戏
- `F7` — 运行当前场景

## 约定

- 所有 NPC 日程数据、对话、股票市场配置来自 JSON/Resource 数据文件，不硬编码
- UI 使用 Godot Control 节点体系 (CanvasLayer)，不使用 HTML/CSS
- Godot 信号用于场景间通信，EventBus 单例管理全局事件
- 音效文件通过情绪键引用，而非文件名
- 所有代码生成素材在启动时预生成并缓存

## 语言

- 始终用中文回答

## 全局技能

- 调用 `~/.config/opencode/skills/` 下的全局技能辅助开发，包括规划、测试、调试、代码审查等

## 代码规范

- GDScript 严格类型模式 (extends Node 显式声明)
- 缩进 2 空格，不使用 Tab
- 命名: 变量/函数 `snake_case`，类 `PascalCase`，文件 `snake_case`
- 函数签名显式标注类型
- Onready 变量使用 `@onready var`
- 信号使用 `signal` 关键字声明，`emit_signal()` 触发
- 常量使用 `const` 全大写
- 文件按功能目录组织: autoload / systems / procedural_assets / scenes / scripts
