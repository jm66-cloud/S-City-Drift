# 素材来源与授权说明

> 本文件记录 `assets/` 目录下所有素材的来源、授权条款和使用限制。
> 开发或发布前请务必核对授权状态。

---

## 一、CC0（公共领域，可商用，无需署名）

### Kenney UI Pack（`assets/ui/`）
- **来源**：https://kenney.nl/assets/ui-pack
- **授权**：CC0 1.0 Universal
- **内容**：按钮、图标、箭头、滑块、输入框、复选框、星星、分割线
- **主题色**：Yellow（黄色系，中性温暖）
- **格式**：PNG（Double 尺寸，256×256 基础）
- **使用**：游戏全部 UI 界面可直接使用，无需修改

### Kenney Sounds（`assets/sounds/`）
- **来源**：https://kenney.nl/assets/ui-sounds
- **授权**：CC0 1.0 Universal
- **内容**：click-a/b、switch-a/b、tap-a/b（OGG 格式）
- **使用**：按钮点击、界面切换、轻触反馈

### Kenney Fonts（`assets/fonts/`）
- **来源**：https://kenney.nl/assets/pixel-fonts
- **授权**：CC0 1.0 Universal
- **内容**：Kenney Future、Kenney Future Narrow（TTF）
- **使用**：游戏标题、UI 文字、HUD 数字

### Roguelike City（`assets/tiles/city/`）
- **来源**：https://kenney.nl/assets/roguelike-city
- **授权**：CC0 1.0 Universal
- **内容**：16×16 城市瓦片集（草地、道路、建筑、树木、车辆等）
- **规格**：16×16 px，间距 1px，透明背景
- **使用**：城市大地图基础瓦片，Phaser 中设置 `tileWidth: 64, tileHeight: 64` 自动放大 4 倍

### Kenney Generic Items（`assets/items/`）
- **来源**：https://kenney.nl/assets/generic-items
- **授权**：CC0 1.0 Universal
- **内容**：163 个彩色物品图标（工具、食物、电器、药品等）
- **规格**：扁平矢量风格，非像素
- **使用**：开发期物品占位，后期可替换为像素风格图标
- **注意**：风格偏 RPG 奇幻，部分图标需映射到现代城市物品

### Kenney Toon Characters（`assets/sprites/characters-reference/`）
- **来源**：https://kenney.nl/assets/toon-characters
- **授权**：CC0 1.0 Universal
- **内容**：4 个卡通角色表（male/female person/adventurer），各含 45 种姿势
- **规格**：2D 卡通矢量风格，非像素
- **使用**：角色动作参考、临时占位
- **注意**：风格与项目像素风不统一，正式发布前需替换

---

## 二、免费但需署名（可商用，需保留署名）

### TopDown City Pack（`assets/sprites/characters/` + `assets/sprites/vehicles/`）
- **来源**：https://opengameart.org/content/top-down-city-pack
- **作者**：FisherG
- **授权**：CC-BY 3.0（可商用，需署名）
- **内容**：
  - `topDown_walk.png` / `topDown_idle.png` — 角色行走/待机动画（约 26×26）
  - `sBlueCar.png` / `sGreenCar.png` / `sRedCar.png` — 轿车（3 色）
  - `sBluePickup.png` / `sGreenPickup.png` / `sRedPickup.png` — 皮卡（3 色）
- **使用**：路人 NPC 占位、城市车辆装饰
- **署名要求**：在游戏"关于"页面或 credits 中注明 "TopDown City Pack by FisherG (CC-BY 3.0)"

---

## 三、非商业授权（仅限免费项目，不可商用）

### Modern Tiles Free（`assets/tiles/indoor/` + `assets/sprites/characters/`）
- **来源**：https://limezu.itch.io/modern-tiles-free
- **作者**：LimeZu
- **授权**：免费版仅限非商业项目
- **内容**：
  - `interiors.png` — 室内瓦片（地板、墙壁、家具、装饰），48×48
  - `roomBuilder.png` — 房间结构（门窗框架、楼梯），48×48
  - `adam.png` / `alex.png` / `amelia.png` / `bob.png` — 角色动画（16×16）
- **限制**：
  - 可用于非商业发布（itch.io 免费游玩，无付费墙、无广告、无内购）
  - 不可用于商业项目（收费、打赏解锁、广告变现等）
  - 不可转售素材本身
- **替代方案**：如未来计划商业化，可购买完整版（$1.20）或替换为 CC0 素材

---

## 四、已有素材（项目自有）

### BGM（`sounds/`）
- **来源**：项目自有音频素材
- **内容**：日常1/2、紧张1/2、恋爱1/2、交易1/2、结局（MP3）
- **授权**：项目自有，版权归作者所有

---

## 五、素材规格对照表

| 目录 | 素材 | 原始尺寸 | 项目目标尺寸 | 处理方式 |
|------|------|---------|-------------|----------|
| `tiles/city/` | roguelikeCity.png | 16×16 | 64×64 | Phaser 运行时放大 4 倍（NEAREST） |
| `tiles/indoor/` | interiors.png | 48×48 | 64×64 | Phaser 运行时放大 1.33 倍（NEAREST） |
| `tiles/indoor/` | roomBuilder.png | 48×48 | 64×64 | 同上 |
| `sprites/characters/` | adam/alex/amelia/bob | 16×16 | 48×64 | 放大 3 倍 + 裁剪/补帧 |
| `sprites/characters/` | topDown_walk/idle | ~26×26 | 48×64 | 放大 2 倍 + 裁剪 |
| `sprites/characters-reference/` | 角色表 | 可变 | — | 仅参考，不直接用于游戏 |
| `items/` | genericItem_color_*.png | 可变 | 32×32 | 缩放适配背包图标 |
| `ui/` | 全部 | 256×256 | 按需 | 直接使用或 CSS 缩放 |
| `fonts/` | Kenney Future | — | — | WebFont / @font-face 加载 |

---

## 六、缺失素材清单（需程序生成或后续补充）

| 类别 | 缺口 | 解决方案 |
|------|------|----------|
| 海水动画（8 帧） | 8 帧 64×32 | Phaser Shader 正弦波模拟 |
| 沙滩/泥土瓦片 | ~8 个 | roguelikeCity 可能有少量，不足则用纯色块 |
| 现代物品图标（手机/电脑/股票证书等） | ~80 个 | Generic Items 部分映射，不足则用 CSS 画 |
| 家具瓦片（60 件） | 60 个 | interiors.png 含部分家具，不足则用纯色块 |
| 环境装饰（路灯/长椅/垃圾桶等） | ~11 个 | roguelikeCity 有部分，不足则用纯色块 |
| 角色服装变体（6 套玩家 + NPC 专属） | 多套 | 用现有角色改色占位 |
| 对话框/HUD/手机界面 | 全套 | CSS 实现，零素材 |
| 特效（海浪/樱花/雨滴/金币等） | 8 种 | Phaser Particles + CSS 动画 |
| 主菜单背景 | 1 张 | Phaser Graphics 代码绘制 |

---

## 七、发布前检查清单

- [ ] 确认项目发布模式（免费/商业）
- [ ] 如为商业发布：替换 Modern Tiles Free 素材或购买授权
- [ ] 在"关于"页面添加 FisherG 署名（TopDown City Pack）
- [ ] 在"关于"页面添加 Kenney 署名（可选，CC0 不强制但建议）
- [ ] 核对所有素材来源与本文档一致
- [ ] 替换 Generic Items 和 Toon Characters 占位素材为统一像素风格（可选）
