# 申海漂 - player.gd
# 玩家角色控制器：移动、动画、交互
extends CharacterBody2D

const MOVE_SPEED: float = 120.0

@export var interact_radius: float = 24.0

@onready var _sprite := $AnimatedSprite2D as AnimatedSprite2D
@onready var _interact_area := $InteractArea as Area2D

var _move_dir: Vector2 = Vector2.ZERO
var _facing_dir: Vector2 = Vector2.DOWN
var _is_moving: bool = false
var _can_interact: bool = false

func _ready() -> void:
	add_to_group("player")
	motion_mode = MOTION_MODE_FLOATING
	_build_character_textures()
	Global.last_position = global_position
	_sprite.animation = "idle_down"
	_sprite.play()
	_interact_area.area_entered.connect(_on_interact_area_entered)
	_interact_area.area_exited.connect(_on_interact_area_exited)

func _build_character_textures() -> void:
	if not _sprite:
		return
	var sf := SpriteFrames.new()
	# Try AssetGenerator textures first
	var has_char_tex := AssetGenerator.has_texture("char_down")
	for dir_name in ["down", "up", "left", "right"]:
		for prefix in ["idle", "walk"]:
			var anim_name: String = prefix + "_" + dir_name
			sf.add_animation(anim_name)
			sf.set_animation_speed(anim_name, 5.0 if prefix == "walk" else 1.0)
			sf.set_animation_loop(anim_name, true)
			if has_char_tex:
				var char_tex: Texture2D = AssetGenerator.get_texture("char_" + dir_name)
				if char_tex:
					sf.add_frame(anim_name, char_tex)
					continue
			# Fallback: draw a simple colored character
			var img := Image.create(32, 32, false, Image.FORMAT_RGBA8)
			img.fill(Color.TRANSPARENT)
			# Body (blue shirt)
			for y in 8:
				for x in 10:
					img.set_pixel(11 + x, 16 + y, Color8(0x00, 0x5C, 0x9E))
			# Head (skin color)
			for y in 8:
				for x in 8:
					img.set_pixel(12 + x, 6 + y, Color8(0xFF, 0xD4, 0x9C))
			# Hair
			for y in 4:
				for x in 10:
					img.set_pixel(11 + x, 4 + y, Color8(0x3C, 0x2B, 0x1E))
			# Legs (dark gray pants)
			for y in 6:
				for x in 6:
					img.set_pixel(13 + x, 24 + y, Color8(0x52, 0x52, 0x52))
			var tex := ImageTexture.create_from_image(img)
			sf.add_frame(anim_name, tex)
	_sprite.sprite_frames = sf

func _physics_process(_delta: float) -> void:
	_move_dir = Vector2(
		Input.get_axis("move_left", "move_right"),
		Input.get_axis("move_up", "move_down")
	)
	if Input.is_action_just_pressed("interact") and _can_interact:
		_try_interact()
	_handle_movement()

func _handle_movement() -> void:
	if _move_dir != Vector2.ZERO:
		_move_dir = _move_dir.normalized()
		_facing_dir = _move_dir
		velocity = _move_dir * MOVE_SPEED
		_is_moving = true
	else:
		velocity = Vector2.ZERO
		_is_moving = false
	move_and_slide()
	_update_animation()
	Global.last_position = global_position
	Global.last_direction = _facing_dir

func _update_animation() -> void:
	var anim := "idle_down"
	if _is_moving:
		if _facing_dir.x < 0: anim = "walk_left"
		elif _facing_dir.x > 0: anim = "walk_right"
		elif _facing_dir.y < 0: anim = "walk_up"
		else: anim = "walk_down"
	else:
		if _facing_dir.x < 0: anim = "idle_left"
		elif _facing_dir.x > 0: anim = "idle_right"
		elif _facing_dir.y < 0: anim = "idle_up"
		else: anim = "idle_down"
	if _sprite.animation != anim:
		_sprite.play(anim)

func _try_interact() -> void:
	var areas := _interact_area.get_overlapping_areas()
	for area in areas:
		if area.has_method("interact"):
			area.interact(self)
			return

func _on_interact_area_entered(area: Area2D) -> void:
	if area.has_method("interact"):
		_can_interact = true
		EventBus.interact_available.emit(area)

func _on_interact_area_exited(area: Area2D) -> void:
	if area.has_method("interact"):
		_can_interact = false
		EventBus.interact_unavailable.emit()
