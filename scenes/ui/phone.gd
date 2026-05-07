# 申海漂 - phone.gd
# 手机系统框架 (快捷菜单)
extends Control

signal app_opened(app_name: String)

var _is_open: bool = false

@onready var _grid := $AppGrid as GridContainer

func _ready() -> void:
	visible = false
	_register_apps()

func _register_apps() -> void:
	var apps := [
		{name = "股票", icon = "📈"},
		{name = "背包", icon = "🎒"},
		{name = "地图", icon = "🗺️"},
		{name = "设置", icon = "⚙️"},
		{name = "成就", icon = "🏆"},
	]
	for app in apps:
		var btn := Button.new()
		btn.text = app.icon + "\n" + app.name
		btn.size_flags_horizontal = Control.SIZE_SHRINK_CENTER
		btn.pressed.connect(_on_app_pressed.bind(app.name))
		_grid.add_child(btn)

func toggle() -> void:
	_is_open = not _is_open
	visible = _is_open
	if _is_open:
		move_to_front()

func _on_app_pressed(app_name: String) -> void:
	app_opened.emit(app_name)
	# 临时关闭手机
	_is_open = false
	visible = false
