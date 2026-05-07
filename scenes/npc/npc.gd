# 申海漂 - npc.gd
# NPC 角色：交互、对话
extends CharacterBody2D

signal dialogue_started(npc_id: String, npc_name: String)
signal dialogue_ended()

var npc_id: String = ""
var npc_name: String = ""
var _dialogues: Array = []
var _current_dialogue_index: int = 0

@onready var _sprite := $AnimatedSprite2D as AnimatedSprite2D
@onready var _label := $Label as Label

func setup(data: Dictionary) -> void:
	npc_id = data.get("id", "")
	npc_name = data.get("name", "")
	_dialogues = data.get("dialogues", [])
	if _label:
		_label.text = npc_name
	_build_sprite(data)

func _build_sprite(data: Dictionary) -> void:
	if not _sprite:
		return
	var sf := SpriteFrames.new()
	var anim_name: String = "idle_down"
	sf.add_animation(anim_name)
	sf.set_animation_loop(anim_name, true)

	# Try generating character sprite
	var tex: Texture2D = null
	var skin: Color = data.get("skin", Color8(0xFF, 0xD4, 0x9C))
	var hair: Color = data.get("hair", Color8(0x3C, 0x2B, 0x1E))
	var shirt: Color = data.get("shirt", Color8(0x00, 0x5C, 0x9E))
	var pants: Color = data.get("pants", Color8(0x52, 0x52, 0x52))
	var frames := preload("res://src/procedural_assets/character_generator.gd").generate_character(skin, hair, shirt, pants)
	if frames.has("down") and frames["down"].size() > 0:
		frames["down"][0].generate_mipmaps()
		tex = ImageTexture.create_from_image(frames["down"][0])

	if not tex:
		# Fallback: colored circle placeholder
		var img := Image.create(32, 32, false, Image.FORMAT_RGBA8)
		img.fill(Color.TRANSPARENT)
		for y in 8:
			for x in 10:
				img.set_pixel(11 + x, 16 + y, shirt)
		for y in 8:
			for x in 8:
				img.set_pixel(12 + x, 6 + y, skin)
		for y in 4:
			for x in 10:
				img.set_pixel(11 + x, 4 + y, hair)
		for y in 6:
			for x in 6:
				img.set_pixel(13 + x, 24 + y, pants)
		tex = ImageTexture.create_from_image(img)

	sf.add_frame(anim_name, tex)
	_sprite.sprite_frames = sf
	_sprite.animation = "idle_down"
	_sprite.play()

func interact(_player) -> void:
	if _dialogues.is_empty():
		return
	_current_dialogue_index = 0
	dialogue_started.emit(npc_id, npc_name)
	EventBus.npc_dialogue_started.emit(npc_id, npc_name)
	_show_dialogue()

func _show_dialogue() -> void:
	if _current_dialogue_index >= _dialogues.size():
		_end_dialogue()
		return
	var entry: Dictionary = _dialogues[_current_dialogue_index]
	var text: String = entry.get("text", "")
	EventBus.notification.emit(text, "dialogue")

func _on_interact_next() -> void:
	_current_dialogue_index += 1
	_show_dialogue()

func _end_dialogue() -> void:
	dialogue_ended.emit()
	EventBus.npc_dialogue_ended.emit(npc_id)
