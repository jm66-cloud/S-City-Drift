# 申海漂 (Shen Hai Piao)

> 一座海岛，一个机会。

「申海漂」是一款俯视角 2D 海岛城市生活模拟游戏。玩家扮演一个怀揣 10 万元来到「申海市」的年轻人，在这座坐落在大海上的岛屿城市中走街串巷、拜访朋友、回家做饭、去交易所炒股，累积属于自己的财富。

## 游戏特色

- **俯视角自由探索**：完整的城市地图，有海岸线、港口、灯塔、沙滩
- **炒股致富**：证券交易所实时交易，K 线/分时走势，目标亿级财富自由
- **生活模拟**：做饭、购物、装修自己的公寓、与 NPC 建立关系
- **像素美术**：Modern Pixel Outlined 风格，DB32 调色板统一视觉
- **跨平台**：itch.io Web 版 + Electron 桌面版（Windows / macOS / Linux）

## 技术栈

| 层 | 技术 |
|----|------|
| 游戏引擎 | Phaser 3 |
| 桌面端 | Electron |
| 语言 | TypeScript |
| 构建工具 | Vite |
| 地图编辑 | Tiled |
| 数据存储 | localStorage (Web) / JSON 文件 (Electron) |

## 项目状态

当前处于**预实现阶段**。已完成：

- [x] 完整游戏设计文档（itch.io 策划案）
- [x] 像素素材设计规格与调色板锁定
- [x] AI 生成提示词库（地面、道路、建筑、家具、角色等 60+ 组）
- [x] 9 首情绪分类 BGM（`sounds/`）

待开始：

- [ ] 项目脚手架（Vite + TypeScript + Phaser 3 + Electron）
- [ ] 像素美术素材生成与处理
- [ ] 瓦片地图绘制（Tiled）
- [ ] Phaser 场景实现（21 个场景）
- [ ] UI 覆盖层开发

## 快速开始

```bash
# 1. 克隆仓库
git clone <repo-url>
cd shen-hai-piao

# 2. 安装依赖（脚手架搭建后）
npm install

# 3. 开发模式
npm run dev

# 4. Electron 开发模式
npm run electron:dev

# 5. 生产构建
npm run build
```

## 素材

`assets/` 已整理好可直接使用的素材，来源与授权详见 `docs/ASSETS.md`。

| 分类 | 内容 | 授权 |
|------|------|------|
| 城市瓦片 | Roguelike City 16×16（草地/道路/建筑/树木/车辆） | CC0 |
| 室内瓦片 | Modern Interiors 48×48（地板/墙壁/家具/装饰） | 非商业 |
| 角色 | Adam/Alex/Amelia/Bob 动画 + TopDown 行走图 | 非商业 + CC-BY |
| UI | Kenney UI Pack（按钮/图标/箭头/滑块/输入框/复选框） | CC0 |
| 字体 | Kenney Future / Kenney Future Narrow | CC0 |
| 音效 | Kenney UI 音效（click/switch/tap） | CC0 |
| BGM | 项目自有 9 首情绪分类 MP3 | 自有 |

> **注意**：Modern Tiles Free（室内瓦片 + 角色）仅限非商业项目使用。如计划商业化发布，请替换为 CC0 素材或购买完整版授权（$1.20）。

## 项目结构

```
shen-hai-piao/
├── assets/                 # 游戏素材（脚手架搭建后）
│   ├── maps/               # Tiled 地图 (.tmj)
│   ├── sprites/            # 精灵图（角色、NPC、物品）
│   ├── tiles/              # 瓦片素材
│   ├── ui/                 # UI 元素
│   └── sounds/             # 音效与音乐
├── src/                    # 源代码
│   ├── scenes/             # Phaser 场景（21 个）
│   ├── ui/                 # HTML/CSS UI 覆盖层
│   ├── data/               # JSON 数据（NPC 日程、对话、股票配置）
│   └── main.ts             # 入口
├── docs/                   # 设计文档
│   ├── itch-io策划案.md     # 完整游戏设计文档（GDD）
│   ├── assets_design_spec.md
│   ├── assets_spec_lock.md
│   └── ai_prompts.md
├── sounds/                 # 现有 BGM 素材（9 首 MP3）
├── electron/               # Electron 主进程代码
├── index.html
├── vite.config.ts
└── package.json
```

## 文档索引

| 文档 | 内容 |
|------|------|
| `docs/itch-io策划案.md` | 完整游戏设计文档：玩法机制、经济系统、NPC 设定、UI 线框图 |
| `docs/assets_design_spec.md` | 像素素材清单：角色、瓦片、物品、UI、特效规格 |
| `docs/assets_spec_lock.md` | 技术锁定文件：调色板、画布尺寸、风格约束、禁止项 |
| `docs/ai_prompts.md` | 60+ 组 AI 生成提示词，涵盖地面、建筑、家具、角色、UI |
| `AGENTS.md` | 开发规范：TypeScript 规范、项目约定、代码风格 |

## 贡献

本项目为个人独立游戏作品。欢迎通过 Issue 提交反馈或建议。

## 许可证

本项目采用 [MIT 许可证](LICENSE)。

游戏素材（像素美术、音乐、音效）版权归作者所有，未经授权不得用于商业用途。

## 致谢

- 调色板：[DawnBringer 32](https://lospec.com/palette-list/dawnbringer-32) by DawnBringer
- 游戏引擎：[Phaser 3](https://phaser.io/)
- 地图编辑：[Tiled](https://www.mapeditor.org/)
