# 申海漂 (Shen Hai Piao)

> 一座海岛，一个机会。

「申海漂」是一款俯视角 2D 海岛城市生活模拟游戏。玩家扮演一个怀揣 10 万元来到「申海市」的年轻人，在这座坐落在大海上的岛屿城市中走街串巷、拜访朋友、回家做饭、去交易所炒股，累积属于自己的财富。

## 游戏特色

- **俯视角自由探索**：完整的城市地图，有海岸线、港口、灯塔、沙滩
- **炒股致富**：证券交易所实时交易，K 线/分时走势，目标亿级财富自由
- **生活模拟**：做饭、购物、装修自己的公寓、与 NPC 建立关系
- **像素美术**：Modern Pixel Outlined 风格，DB32 调色板统一视觉，代码程序化生成
- **跨平台**：itch.io Web 版 + Windows 桌面版

## 技术栈

| 层 | 技术 |
|----|------|
| 游戏引擎 | Godot 4 (GDScript) |
| 桌面端 | Godot 原生导出 (Windows) |
| 语言 | GDScript |
| 地图 | Godot TileMapLayer + TileSet |
| 素材管线 | 代码程序化生成 (Image.set_pixel + DB32 调色板) |
| UI | Godot Control 节点体系 (CanvasLayer) |
| 数据存储 | JSON 文件 (FileAccess) |
| 音效 | AudioStreamPlayer (Ogg 格式) |

## 项目状态

当前处于**预实现阶段**。已完成：

- [x] 完整游戏设计文档（itch.io 策划案）
- [x] 像素素材设计规格与调色板锁定
- [x] AI 生成提示词库（地面、道路、建筑、家具、角色等 60+ 组）
- [x] 9 首情绪分类 BGM（`sounds/`）
- [x] 引擎切换决策: Phaser 3 → Godot 4
- [x] 素材管线决策: 手绘/AI → 代码程序化生成

待开始：

- [ ] Godot 4 项目脚手架
- [ ] 素材代码生成管线开发 (palette/tile/building/character/furniture generators)
- [ ] TileMap 城市地图绘制
- [ ] 21 个 Godot 场景实现
- [ ] UI Control 节点开发
- [ ] 股市引擎移植 (GDScript)

## 快速开始

```bash
# 1. 克隆仓库
git clone <repo-url>
cd shen-hai-piao

# 2. 用 Godot 4 打开项目
godot4 project.godot

# 3. 运行游戏
# 在 Godot 编辑器中按 F5
```

## 素材策略

本项目采用**纯代码生成像素素材**策略，不依赖手绘或 AI 生成图片：

| 分类 | 生成方式 |
|------|---------|
| 城市瓦片 | tile_generator.gd — 逐像素绘制草地/道路/水域/装饰 |
| 建筑外观 | building_generator.gd — 随机纹理墙面+窗户布局 |
| 角色/NPC | character_generator.gd — 分层合成 (身体+发型+服装) |
| 室内家具 | furniture_generator.gd — 48×48 规格家具像素 |
| UI 图标 | ui_icon_generator.gd — 按钮/面板/App 图标 |
| 粒子特效 | effects.gd — 雨滴/火花/落叶纹理 |

所有代码生成器共用 DawnBringer 32 (DB32) 调色板，保证视觉风格统一。

## 项目结构

```
shen-hai-piao/
├── project.godot               # Godot 项目配置
├── assets/                     # 素材资源
│   └── audio/                  # 音频文件 (BGM/SFX/Ambient)
├── src/                        # 源代码
│   ├── autoload/               # 全局单例 (Autoload)
│   ├── systems/                # 核心玩法系统
│   ├── procedural_assets/      # 素材代码生成系统
│   └── data/                   # 静态数据
├── scenes/                     # Godot 场景 (.tscn)
├── scripts/                    # 节点挂载脚本
└── docs/                       # 设计文档
```

## 文档索引

| 文档 | 内容 |
|------|------|
| `docs/itch-io策划案.md` | 完整游戏设计文档：玩法机制、经济系统、NPC 设定、UI 线框图 |
| `docs/assets_design_spec.md` | 像素素材清单：角色、瓦片、物品、UI、特效规格 |
| `docs/assets_spec_lock.md` | 技术锁定文件：调色板、画布尺寸、风格约束、禁止项 |
| `docs/ai_prompts.md` | 60+ 组 AI 生成提示词，涵盖地面、建筑、家具、角色、UI |
| `AGENTS.md` | 开发规范：GDScript 规范、项目约定、代码风格 |

## 贡献

本项目为个人独立游戏作品。欢迎通过 Issue 提交反馈或建议。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

游戏素材（像素美术、音乐、音效）版权归作者所有，未经授权不得用于商业用途。

## 致谢

- 调色板：[DawnBringer 32](https://lospec.com/palette-list/dawnbringer-32) by DawnBringer
- 游戏引擎：[Godot 4](https://godotengine.org/)
