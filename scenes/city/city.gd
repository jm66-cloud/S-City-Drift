# 申海漂 - city.gd
# 城市主地图场景
extends Node2D

const _NPCData := preload("res://src/systems/npc/npc_data.gd")
const _NPCScene := preload("res://scenes/npc/NPC.tscn")

@onready var _player_spawn := $PlayerSpawn as Marker2D
@onready var _tile_map := $TileMapLayer as TileMapLayer
@onready var _navigation := $NavigationRegion2D as NavigationRegion2D
@onready var _phone := $PhonePanel
@onready var _stock_panel := $StockPanel

var _player: Node = null
var _cam: Camera2D = null

func _ready() -> void:
	_setup_ground()
	_setup_door_visual()
	_register_player()
	_spawn_npcs()
	_register_interiors()
	_setup_camera()
	_phone.app_opened.connect(_on_phone_app_opened)

func _process(_delta: float) -> void:
	if _cam and _player:
		_cam.global_position = _player.global_position

func _setup_ground() -> void:
	var ground := $Ground as Sprite2D
	if ground and AssetGenerator.has_texture("grass_0"):
		ground.texture = AssetGenerator.get_texture("grass_0")
		ground.texture_repeat = CanvasItem.TEXTURE_REPEAT_ENABLED

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("phone_toggle"):
		_phone.toggle()
		get_viewport().set_input_as_handled()

func _register_player() -> void:
	var player_scene := preload("res://scenes/player/Player.tscn")
	_player = player_scene.instantiate()
	add_child(_player)
	_player.global_position = _player_spawn.global_position

func _spawn_npcs() -> void:
	var npcs := _NPCData.get_all()
	for n in npcs:
		var npc := _NPCScene.instantiate()
		add_child(npc)
		npc.setup(n)
		npc.position = Vector2(n.x, n.y)

func _setup_door_visual() -> void:
	var door_sprite := $ExchangeDoor/DoorVisual as Sprite2D
	if door_sprite:
		var img := Image.create(32, 32, false, Image.FORMAT_RGBA8)
		img.fill(Color8(0xFF, 0x8C, 0x00))
		# Draw door frame
		for x in 32:
			for y in 32:
				if x < 2 or x > 29 or y < 2 or y > 29:
					img.set_pixel(x, y, Color8(0x8C, 0x4A, 0x00))
				elif x >= 14 and x <= 17 and y >= 18 and y <= 24:
					img.set_pixel(x, y, Color8(0x8C, 0x4A, 0x00))  # handle
		door_sprite.texture = ImageTexture.create_from_image(img)

func _register_interiors() -> void:
	pass  # TODO: Add door trigger areas linking to interior scenes

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

func _on_phone_app_opened(app_name: String) -> void:
	match app_name:
		"股票":
			_stock_panel.set_market(Market)
			_stock_panel.open()
		"背包":
			EventBus.notification.emit("背包功能开发中...", "info")
		"地图":
			EventBus.notification.emit("地图功能开发中...", "info")
		"设置":
			EventBus.notification.emit("设置功能开发中...", "info")
		"成就":
			EventBus.notification.emit("成就功能开发中...", "info")
