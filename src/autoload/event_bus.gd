# 申海漂 - event_bus.gd (Autoload)
# 全局事件总线，所有 Godot 信号集中管理
extends Node

## 金钱变化
signal money_changed(new_balance: float, delta: float)

## 时间变化
signal time_changed(hour: int, minute: int)
signal day_changed(day: int)
signal season_changed(season: String)

## 玩家状态
signal player_hp_changed(value: float)
signal player_stamina_changed(value: float)
signal player_stress_changed(value: float)
signal player_hunger_changed(value: float)

## 场景切换
signal scene_changing(from_scene: String, to_scene: String)
signal scene_changed(scene_name: String)

## 交互
signal interact_available(object: Node)
signal interact_unavailable()

## NPC
signal npc_affinity_changed(npc_id: String, new_value: int, delta: int)
signal npc_dialogue_started(npc_id: String)
signal npc_dialogue_ended(npc_id: String)

## 股票
signal stock_price_changed(stock_id: String, price: float, change: float)
signal stock_trade_executed(stock_id: String, shares: int, price: float, is_buy: bool)

## 游戏状态
signal game_saved(slot: int)
signal game_loaded(slot: int)
signal game_paused()
signal game_resumed()

## 成就
signal achievement_unlocked(achievement_id: String)

## 通知
signal notification(message: String, type: String)  # type: info, success, warning, error

func _ready() -> void:
	process_mode = ProcessMode.PROCESS_MODE_ALWAYS
