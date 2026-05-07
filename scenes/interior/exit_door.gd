# 申海漂 - exit_door.gd
# 室内场景中的出口门触发器，返回城市
extends Area2D

const _CityScene := preload("res://scenes/city/CityScene.tscn")

func interact(_player) -> void:
	get_tree().change_scene_to_packed(_CityScene)
