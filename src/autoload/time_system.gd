# 申海漂 - time_system.gd (Autoload)
# 时间系统：游戏内时钟，驱动日程/事件/环境变化
extends Node

signal time_tick(hour: int, minute: int)
signal day_passed(day: int)
signal season_changed(season: String)

const MINUTES_PER_TICK := 10        # 每 tick 游戏内分钟数
const TICK_INTERVAL := 0.5          # 现实秒数 per tick
const HOURS_PER_DAY := 24
const DAYS_PER_SEASON := 30
const SEASONS := ["spring", "summer", "autumn", "winter"]

var _tick_timer: float = 0.0
var _is_running: bool = false
var _speed_multiplier: float = 1.0

func _ready() -> void:
	process_mode = ProcessMode.PROCESS_MODE_ALWAYS
	Global.hour = 6
	Global.minute = 0
	Global.day = 1
	Global.season = "spring"

func start() -> void:
	_is_running = true

func stop() -> void:
	_is_running = false

func set_speed(mult: float) -> void:
	_speed_multiplier = maxf(mult, 0.0)

func _process(delta: float) -> void:
	if not _is_running:
		return
	_tick_timer += delta * _speed_multiplier
	if _tick_timer >= TICK_INTERVAL:
		_tick_timer -= TICK_INTERVAL
		_advance_time()

func _advance_time() -> void:
	Global.minute += MINUTES_PER_TICK
	if Global.minute >= 60:
		Global.minute = 0
		Global.hour += 1
		if Global.hour >= HOURS_PER_DAY:
			Global.hour = 0
			_advance_day()
	EventBus.time_changed.emit(Global.hour, Global.minute)

func _advance_day() -> void:
	Global.day += 1
	var season_index := SEASONS.find(Global.season)
	var days_in_season := Global.day % DAYS_PER_SEASON
	if days_in_season == 1 and Global.day > 1:
		season_index = (season_index + 1) % SEASONS.size()
		Global.season = SEASONS[season_index]
		EventBus.season_changed.emit(Global.season)
	EventBus.day_changed.emit(Global.day)

func get_time_string() -> String:
	var ampm := "AM" if Global.hour < 12 else "PM"
	var h := Global.hour if Global.hour <= 12 else Global.hour - 12
	if h == 0: h = 12
	return "%02d:%02d %s" % [h, Global.minute, ampm]

func get_day_name() -> String:
	var day_names := ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	return day_names[(Global.day - 1) % 7]

func is_daytime() -> bool:
	return Global.hour >= 6 and Global.hour < 18

func is_night() -> bool:
	return not is_daytime()
