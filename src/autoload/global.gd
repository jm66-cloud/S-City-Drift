# 申海漂 - global.gd (Autoload)
# 全局状态管理：玩家属性、金钱、背包、位置
extends Node

## 玩家基础属性
var player_name: String = "打工人"
var money: float = 100000.0          # 个人账户
var securities_account: float = 0.0   # 证券账户
var company_account: float = 0.0      # 公司账户
var health: float = 100.0             # 健康值 0-100
var stamina: float = 100.0            # 精力值 0-100
var stress: float = 0.0              # 压力值 0-100
var hunger: float = 100.0            # 饱食度 0-100

## 位置信息
var current_scene: String = ""
var last_position: Vector2 = Vector2.ZERO
var last_direction: Vector2 = Vector2.DOWN

## 时间状态 (由 TimeSystem 管理)
var day: int = 1
var season: String = "spring"  # spring, summer, autumn, winter
var hour: int = 6
var minute: int = 0

## 游戏状态
var is_new_game: bool = true
var game_started: bool = false
var is_paused: bool = false

## 玩家属性技能
var skills: Dictionary = {
	stock_trading = 0.0,   # 炒股技能 0-100
	management = 0.0,      # 管理技能 0-100
	cooking = 0.0,         # 烹饪技能 0-100
	fishing = 0.0,         # 钓鱼技能 0-100
	social = 0.0,          # 社交技能 0-100
}

## NPC 好感度: npc_id -> int (0-100)
var npc_affinity: Dictionary = {}

## 背包: Array[Dictionary]
var inventory: Array[Dictionary] = []

## 成就: Array[String]
var achievements: Array[String] = []

## 标记: 用于事件触发条件
var flags: Dictionary = {}

## 设置
var settings: Dictionary = {
	master_volume = 1.0,
	music_volume = 1.0,
	sfx_volume = 1.0,
	text_speed = 1.0,
}

func _ready() -> void:
	process_mode = ProcessMode.PROCESS_MODE_ALWAYS

func reset_for_new_game() -> void:
	money = 100000.0
	securities_account = 0.0
	company_account = 0.0
	health = 100.0
	stamina = 100.0
	stress = 0.0
	hunger = 100.0
	day = 1
	season = "spring"
	hour = 6
	minute = 0
	is_new_game = false
	game_started = true
	npc_affinity.clear()
	inventory.clear()
	achievements.clear()
	flags.clear()
	for s in skills:
		skills[s] = 0.0

func add_money(amount: float) -> void:
	money += amount
	EventBus.money_changed.emit(money, amount)

func remove_money(amount: float) -> bool:
	if money >= amount:
		money -= amount
		EventBus.money_changed.emit(money, -amount)
		return true
	return false

func get_total_net_worth() -> float:
	return money + securities_account + company_account
