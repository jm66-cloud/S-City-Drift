# 申海漂 - save_manager.gd (Autoload)
# 存档系统：JSON 序列化/反序列化
extends Node

const SAVE_DIR := "user://saves/"
const SAVE_EXT := ".json"
const MAX_SLOTS := 3
const AUTO_SAVE_SLOT := 0

func _ready() -> void:
	process_mode = ProcessMode.PROCESS_MODE_ALWAYS
	DirAccess.make_dir_recursive_absolute(SAVE_DIR)

## 保存到指定槽位
func save_game(slot: int = AUTO_SAVE_SLOT) -> bool:
	var data := _build_save_data()
	var path := _slot_path(slot)
	var file := FileAccess.open(path, FileAccess.WRITE)
	if file:
		file.store_string(JSON.new().stringify(data, "\t"))
		EventBus.game_saved.emit(slot)
		return true
	return false

## 从指定槽位读档
func load_game(slot: int = AUTO_SAVE_SLOT) -> bool:
	var path := _slot_path(slot)
	if not FileAccess.file_exists(path):
		return false
	var file := FileAccess.open(path, FileAccess.READ)
	if not file:
		return false
	var json := JSON.new()
	var parse := json.parse(file.get_as_text())
	if parse != OK:
		return false
	var data: Dictionary = json.data
	_apply_save_data(data)
	EventBus.game_loaded.emit(slot)
	return true

## 检查存档是否存在
func has_save(slot: int) -> bool:
	return FileAccess.file_exists(_slot_path(slot))

## 删除存档
func delete_save(slot: int) -> void:
	var path := _slot_path(slot)
	if FileAccess.file_exists(path):
		DirAccess.remove_absolute(path)

func _slot_path(slot: int) -> String:
	return SAVE_DIR + "slot_" + str(slot) + SAVE_EXT

func _build_save_data() -> Dictionary:
	return {
		version = "0.1.0",
		timestamp = Time.get_unix_time_from_system(),
		day = Global.day,
		season = Global.season,
		hour = Global.hour,
		minute = Global.minute,
		money = Global.money,
		securities_account = Global.securities_account,
		company_account = Global.company_account,
		health = Global.health,
		stamina = Global.stamina,
		stress = Global.stress,
		hunger = Global.hunger,
		current_scene = Global.current_scene,
		last_position = {x = Global.last_position.x, y = Global.last_position.y},
		skills = Global.skills.duplicate(),
		npc_affinity = Global.npc_affinity.duplicate(),
		inventory = Global.inventory.duplicate(),
		achievements = Global.achievements.duplicate(),
		flags = Global.flags.duplicate(),
	}

func _apply_save_data(data: Dictionary) -> void:
	Global.day = data.get("day", 1)
	Global.season = data.get("season", "spring")
	Global.hour = data.get("hour", 6)
	Global.minute = data.get("minute", 0)
	Global.money = data.get("money", 100000.0)
	Global.securities_account = data.get("securities_account", 0.0)
	Global.company_account = data.get("company_account", 0.0)
	Global.health = data.get("health", 100.0)
	Global.stamina = data.get("stamina", 100.0)
	Global.stress = data.get("stress", 0.0)
	Global.hunger = data.get("hunger", 100.0)
	Global.current_scene = data.get("current_scene", "")
	var pos = data.get("last_position", {})
	Global.last_position = Vector2(pos.get("x", 0), pos.get("y", 0))
	Global.skills = data.get("skills", {})
	Global.npc_affinity = data.get("npc_affinity", {})
	Global.inventory = data.get("inventory", [])
	Global.achievements = data.get("achievements", [])
	Global.flags = data.get("flags", {})
