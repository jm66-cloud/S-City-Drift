# 申海漂 - asset_generator.gd (Autoload)
# 素材代码生成总控制器
extends Node

const _tile_gen = preload("res://src/procedural_assets/tile_generator.gd")
const _char_gen = preload("res://src/procedural_assets/character_generator.gd")
const _furn_gen = preload("res://src/procedural_assets/furniture_generator.gd")
const _ui_gen = preload("res://src/procedural_assets/ui_icon_generator.gd")
const _fx = preload("res://src/procedural_assets/effects.gd")

var _texture_cache: Dictionary = {}
var _is_generated: bool = false

signal generation_complete

func _ready() -> void:
	process_mode = ProcessMode.PROCESS_MODE_ALWAYS

func generate_all() -> void:
	if _is_generated:
		return
	_texture_cache.clear()
	_generate_tiles()
	_generate_characters()
	_generate_furniture()
	_generate_ui()
	_generate_effects()
	_is_generated = true
	generation_complete.emit()
	print("AssetGenerator: All procedural assets generated (", _texture_cache.size(), " textures)")

func get_texture(key: String) -> Texture2D:
	return _texture_cache.get(key)

func has_texture(key: String) -> bool:
	return key in _texture_cache

func _cache(key: String, img: Image) -> void:
	_texture_cache[key] = ImageTexture.create_from_image(img)

func _generate_tiles() -> void:
	_cache("grass_0", _tile_gen.grass_tile(0))
	_cache("grass_1", _tile_gen.grass_tile(1))
	_cache("road", _tile_gen.road_tile())
	_cache("sidewalk", _tile_gen.sidewalk_tile())
	_cache("water_shallow", _tile_gen.water_tile(false))
	_cache("water_deep", _tile_gen.water_tile(true))
	_cache("sand", _tile_gen.sand_tile())
	_cache("floor_0", _tile_gen.floor_tile(0))
	_cache("floor_1", _tile_gen.floor_tile(1))
	_cache("wall", _tile_gen.wall_tile())

func _generate_characters() -> void:
	var frames := _char_gen.generate_character(
		Color8(0xFF, 0xD4, 0x9C),   # SKIN
		Color8(0x3C, 0x2B, 0x1E),   # DARK_BROWN hair
		Color8(0x00, 0x5C, 0x9E),   # BLUE shirt
		Color8(0x52, 0x52, 0x52),   # DARK_GRAY pants
	)
	# Cache first frame of each direction
	for dir_name in frames:
		if frames[dir_name].size() > 0:
			_cache("char_" + dir_name, frames[dir_name][0])

func _generate_furniture() -> void:
	_cache("table_h", _furn_gen.table(true))
	_cache("table_v", _furn_gen.table(false))
	_cache("chair", _furn_gen.chair())
	_cache("bed", _furn_gen.bed())
	_cache("fridge", _furn_gen.fridge())
	_cache("sofa", _furn_gen.sofa())

func _generate_ui() -> void:
	_cache("icon_money", _ui_gen.money_icon())
	_cache("icon_time", _ui_gen.time_icon())
	_cache("icon_backpack", _ui_gen.backpack_icon())
	_cache("icon_settings", _ui_gen.settings_icon())
	_cache("btn_bg", _ui_gen.button_bg(64, 24, Color8(0x3C, 0x8D, 0xC8)))

func _generate_effects() -> void:
	_cache("fx_rain", _fx.rain_drop())
	_cache("fx_spark", _fx.spark())
	_cache("fx_leaf", _fx.leaf())
	_cache("fx_money", _fx.money_particle())
	_cache("fx_night", _fx.night_overlay(0.6))
