# 申海漂 - interior_door.gd
# 城市场景中的门触发器，进入室内场景
extends Area2D

@export var target_scene: String = ""

func interact(_player) -> void:
	if target_scene.is_empty():
		return
	var scene := load(target_scene) as PackedScene
	if scene:
		get_tree().change_scene_to_packed(scene)
