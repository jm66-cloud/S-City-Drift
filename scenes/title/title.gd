extends CanvasLayer

@onready var _new_game_btn := $VBoxContainer/NewGameButton
@onready var _continue_btn := $VBoxContainer/ContinueButton
@onready var _settings_btn := $VBoxContainer/SettingsButton

func _ready() -> void:
	_continue_btn.disabled = not SaveManager.has_save(0)
	_new_game_btn.pressed.connect(_on_new_game)
	_continue_btn.pressed.connect(_on_continue)
	_settings_btn.pressed.connect(_on_settings)

func _on_new_game() -> void:
	Global.reset_for_new_game()
	TimeSystem.start()
	_change_to_city()

func _on_continue() -> void:
	if SaveManager.load_game(0):
		TimeSystem.start()
		_change_to_city()

func _on_settings() -> void:
	pass  # TODO: Settings panel

func _change_to_city() -> void:
	var city := preload("res://scenes/city/CityScene.tscn")
	get_tree().change_scene_to_packed(city)
