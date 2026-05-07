# 申海漂 - exchange_interior.gd
# 证券交易所室内场景
extends Node2D

const _CityScene := preload("res://scenes/city/CityScene.tscn")

@onready var _player_spawn := $PlayerSpawn as Marker2D
@onready var _stock_panel := $StockPanel

var _player: Node = null
var _cam: Camera2D = null

func _ready() -> void:
	_apply_textures()
	_setup_door_visual()
	_setup_camera()
	_register_player()
	_open_stock_panel()

func _process(_delta: float) -> void:
	if _cam and _player:
		_cam.global_position = _player.global_position

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		_exit_to_city()
		get_viewport().set_input_as_handled()

func _apply_textures() -> void:
	var floor_node := $Floor as Sprite2D
	if floor_node and AssetGenerator.has_texture("floor_1"):
		floor_node.texture = AssetGenerator.get_texture("floor_1")
		floor_node.texture_repeat = CanvasItem.TEXTURE_REPEAT_ENABLED

	var wall_nodes := $WallVisuals.get_children()
	if AssetGenerator.has_texture("wall"):
		var wall_tex := AssetGenerator.get_texture("wall")
		for w in wall_nodes:
			if w is Sprite2D:
				w.texture = wall_tex

	_apply_furniture_textures()

func _apply_furniture_textures() -> void:
	if AssetGenerator.has_texture("table_h"):
		var desk_tex := AssetGenerator.get_texture("table_h")
		for d in $Furniture.get_children():
			if d is Sprite2D and d.name.begins_with("Desk"):
				d.texture = desk_tex

	if AssetGenerator.has_texture("chair"):
		var chair_tex := AssetGenerator.get_texture("chair")
		for c in $Furniture.get_children():
			if c is Sprite2D and c.name.begins_with("Chair"):
				c.texture = chair_tex

func _setup_door_visual() -> void:
	var door_sprite := $ExitDoor/DoorVisual as Sprite2D
	if door_sprite:
		var img := Image.create(32, 32, false, Image.FORMAT_RGBA8)
		img.fill(Color8(0x3C, 0x8D, 0xC8))
		for x in 32:
			for y in 32:
				if x < 3 or x > 28 or y < 3 or y > 28:
					img.set_pixel(x, y, Color8(0x00, 0x5C, 0x9E))
				elif x >= 13 and x <= 17 and y >= 18 and y <= 24:
					img.set_pixel(x, y, Color8(0x00, 0x5C, 0x9E))
		door_sprite.texture = ImageTexture.create_from_image(img)

func _setup_camera() -> void:
	_cam = Camera2D.new()
	_cam.name = "Camera2D"
	_cam.anchor_mode = Camera2D.ANCHOR_MODE_DRAG_CENTER
	_cam.position_smoothing_enabled = true
	_cam.position_smoothing_speed = 5.0
	add_child(_cam)
	_cam.make_current()
	if _player:
		_cam.global_position = _player.global_position

func _register_player() -> void:
	var player_scene := preload("res://scenes/player/Player.tscn")
	_player = player_scene.instantiate()
	add_child(_player)
	_player.global_position = _player_spawn.global_position

func _open_stock_panel() -> void:
	if _stock_panel and _stock_panel.has_method("open"):
		_stock_panel.set_market(Market)
		_stock_panel.open()

func _exit_to_city() -> void:
	get_tree().change_scene_to_packed(_CityScene)
