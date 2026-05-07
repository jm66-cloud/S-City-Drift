# 申海漂 - hud.gd
# 游戏内 HUD：时间/金钱/属性
extends CanvasLayer

@onready var _time_label := $TopBar/TimeLabel as Label
@onready var _money_label := $TopBar/MoneyLabel as Label
@onready var _day_label := $TopBar/DayLabel as Label
@onready var _health_bar := $TopBar/HealthBar as TextureProgressBar
@onready var _stamina_bar := $TopBar/StaminaBar as TextureProgressBar
@onready var _hunger_bar := $TopBar/HungerBar as TextureProgressBar

func _ready() -> void:
	EventBus.time_changed.connect(_on_time_changed)
	EventBus.money_changed.connect(_on_money_changed)
	EventBus.day_changed.connect(_on_day_changed)
	_update_all()

func _on_time_changed(_h: int, _m: int) -> void:
	_time_label.text = TimeSystem.get_time_string()

func _on_money_changed(new_balance: float, _delta: float) -> void:
	_money_label.text = "¥%s" % _format_money(new_balance)

func _on_day_changed(_day: int) -> void:
	_day_label.text = "Day %d %s" % [Global.day, TimeSystem.get_day_name()]
	_update_bars()

func _update_all() -> void:
	_time_label.text = TimeSystem.get_time_string()
	_money_label.text = "¥%s" % _format_money(Global.money)
	_day_label.text = "Day %d %s" % [Global.day, TimeSystem.get_day_name()]
	_update_bars()

func _update_bars() -> void:
	_health_bar.value = Global.health
	_stamina_bar.value = Global.stamina
	_hunger_bar.value = Global.hunger

static func _format_money(val: float) -> String:
	if abs(val) >= 1e8:
		return "%.2f亿" % (val / 1e8)
	elif abs(val) >= 1e4:
		return "%.2f万" % (val / 1e4)
	else:
		return "%.0f" % val
