# 申海漂 - 开发进度总览

## 当前版本状态
- **引擎**: Godot 4.6.2 (Vulkan Forward+)
- **分支**: main
- **最近提交**: city.gd / exchange_interior.gd 修复

---

## 已完成功能

### 1. 核心系统
| 模块 | 状态 | 说明 |
|------|------|------|
| Market (股票引擎) | 完成 | 改为 autoload，跨场景持久化；5因子定价模型 |
| TimeSystem | 完成 | 昼夜循环、季节系统 |
| EventBus | 完成 | 全局信号总线 |
| SaveManager | 完成 | 存档/读档 |
| AssetGenerator | 完成 | 程序化生成 30 种纹理（草地/道路/角色/家具/UI） |
| NPCData | 完成 | 5 个 NPC 数据定义 |

### 2. 城市场景 (CityScene)
- [x] 草地背景 (2560x1440，纹理重复)
- [x] 相机跟随玩家 (Camera2D + smoothing)
- [x] 玩家实例化与出生点
- [x] 5 个 NPC 实例化与分布
- [x] 交易所门 (Area2D + 视觉纹理)
- [x] HUD (金钱、时间、日期、血条/体力/饥饿条)
- [x] 手机菜单 (Q 键开关)

### 3. 交易所室内 (ExchangeInterior)
- [x] 地板/墙壁贴图
- [x] 家具 (6 组桌椅)
- [x] 出口门 (返回城市)
- [x] 股票面板自动打开

### 4. 玩家角色
- [x] 移动输入 (WASD / 方向键)
- [x] 交互系统 (E 键，24px 半径检测)
- [x] 动画状态机 (idle/walk × 4 方向)
- [x] 回退精灵绘制 (GDScript 直接生成彩色像素人)

---

## 已知问题

### P0 - 阻塞问题
1. **玩家无法移动** — 按键后角色位置不变化
   - 已尝试: `motion_mode = MOTION_MODE_FLOATING`
   - 待排查: `_physics_process` 是否执行、`Input.get_axis` 返回值、`move_and_slide` 行为

### P1 - 功能缺失
2. **背包/地图/设置/成就** — 手机菜单中 4 个 app 仅弹出 "开发中..." 提示
3. **NPC 对话系统** — UI 未接入，只有信号发射
4. **通知系统** — EventBus.notification 未渲染到屏幕
5. **建筑物内部** — 只有交易所，其他建筑无室内场景
6. **TileMap 未使用** — 地面靠 Sprite2D 重复，未铺设瓦片地图

### P2 - 体验优化
7. **角色精灵回退方案** — 当前使用 32x32 方块绘制，方向全部相同，未使用 AssetGenerator 的 16x32 多帧精灵
8. **相机初始位置** — 已修复，启动时直接定位到玩家
9. **门视觉** — 已添加程序化纹理，但风格简陋

---

## 待办清单 (按优先级)

### 第一阶段: 修复移动 (P0)
- [ ] 排查 `_physics_process` 是否被调用
- [ ] 检查 `Input.get_axis` 实际返回值
- [ ] 验证 `move_and_slide()` 是否生效
- [ ] 确认是否有节点消费了输入事件

### 第二阶段: 补全占位素材 (P1)
- [ ] 绘制/生成剩余建筑门 (咖啡店、诊所、广场等)
- [ ] 创建其他室内场景 (CoffeeInterior, ClinicInterior, etc.)
- [ ] 铺设 TileMap 瓦片地图 (道路、人行道、水域)
- [ ] 添加树木/路灯/长椅等装饰物
- [ ] 通知系统 UI (屏幕右下角弹出提示)
- [ ] NPC 头顶对话气泡

### 第三阶段: 核心玩法完善 (P1)
- [ ] 背包系统 (数据结构 + UI)
- [ ] 玩家状态系统 (HP/体力/饥饿 实际扣减与恢复)
- [ ] 任务/成就系统框架
- [ ] 存档时保存玩家位置与 NPC 状态

### 第四阶段: 素材替换 (P2)
- [ ] 替换玩家/NPC 为正式像素角色图
- [ ] 替换建筑与家具贴图
- [ ] 添加音效与背景音乐
- [ ] 标题画面美化

---

## 技术债务
- `city.gd` 中 `_tile_map` / `_navigation` 声明但未使用 (预留)
- `character_generator.gd` 中 `_draw_head` / `_draw_body` 有未使用参数
- `stock_panel.gd` 中 `name` 变量 shadowing Node 属性
- `.godot/` 文件夹应加入 `.gitignore`
