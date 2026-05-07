extends Node

@onready var _title_scene := preload("res://scenes/title/TitleScene.tscn")

func _ready() -> void:
	# 生成所有基础素材
	AssetGenerator.generate_all()
	# 初始化音频总线
	_setup_audio()
	# 过渡到标题画面
	await get_tree().create_timer(0.5).timeout
	get_tree().change_scene_to_packed(_title_scene)

func _setup_audio() -> void:
	var master_idx := AudioServer.get_bus_index("Master")
	if master_idx < 0:
		AudioServer.add_bus()
		master_idx = AudioServer.get_bus_count() - 1
		AudioServer.set_bus_name(master_idx, "Master")
	var music_idx := AudioServer.get_bus_index("Music")
	if music_idx < 0:
		AudioServer.add_bus()
		music_idx = AudioServer.get_bus_count() - 1
		AudioServer.set_bus_name(music_idx, "Music")
		AudioServer.set_bus_send(music_idx, "Master")
	var sfx_idx := AudioServer.get_bus_index("SFX")
	if sfx_idx < 0:
		AudioServer.add_bus()
		sfx_idx = AudioServer.get_bus_count() - 1
		AudioServer.set_bus_name(sfx_idx, "SFX")
		AudioServer.set_bus_send(sfx_idx, "Master")
