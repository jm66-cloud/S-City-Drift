# 申海漂 - building_generator.gd
# 建筑外观像素生成：墙面/窗户/屋顶
extends Node

const TILE_SIZE := 32

## 生成建筑墙面瓦片
static func wall_tile(building_type: String = "residential", variant: int = 0) -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var colors := _get_building_colors(building_type)

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c := colors.base
			# 砖缝噪声
			if randi() % 12 == 0:
				c = colors.accent
			# 底部污渍
			if y > TILE_SIZE - 4 and randi() % 3 == 0:
				c = colors.shadow
			img.set_pixel(x, y, c)

	return img

## 生成窗户瓦片
static func window_tile(has_light: bool = false) -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var frame := Color8(0x52, 0x52, 0x52)     # DARK_GRAY
	var glass := Color8(0x3C, 0x8D, 0xC8)     # MID_BLUE
	var glass_lit := Color8(0xFD, 0xFC, 0x74)  # YELLOW
	var glass_dark := Color8(0x00, 0x2B, 0x5C) # DARK_BLUE

	img.fill(Color.TRANSPARENT)
	for y in TILE_SIZE:
		for x in TILE_SIZE:
			# 边框
			var edge := (x < 3 or x >= TILE_SIZE - 3 or y < 3 or y >= TILE_SIZE - 3)
			# 十字窗框
			var cross := (abs(x - 16) < 2 or abs(y - 16) < 2)
			if edge or cross:
				img.set_pixel(x, y, frame)
			else:
				var c := glass_lit if has_light else glass_dark
				img.set_pixel(x, y, c)

	return img

## 生成屋顶瓦片
static func roof_tile() -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var base := Color8(0x6B, 0x4C, 0x2A)     # BROWN
	var light := Color8(0xA8, 0x7C, 0x4A)     # TAN
	var dark := Color8(0x3C, 0x2B, 0x1E)      # DARK_BROWN

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c := base
			if (x + y) % 4 == 0:
				c = dark
			elif (x + y) % 8 == 0:
				c = light
			img.set_pixel(x, y, c)

	return img

static func _get_building_colors(type: String) -> Dictionary:
	match type:
		"residential":
			return {base = Color8(0xE6, 0xC8, 0xA8), accent = Color8(0xD4, 0xA8, 0x6E), shadow = Color8(0xA8, 0x7C, 0x4A)}
		"commercial":
			return {base = Color8(0xD4, 0xD4, 0xD4), accent = Color8(0x9D, 0x9D, 0x9D), shadow = Color8(0x52, 0x52, 0x52)}
		"industrial":
			return {base = Color8(0x9D, 0x9D, 0x9D), accent = Color8(0x6B, 0x6B, 0x6B), shadow = Color8(0x52, 0x52, 0x52)}
		_:
			return {base = Color8(0xD4, 0xD4, 0xD4), accent = Color8(0x9D, 0x9D, 0x9D), shadow = Color8(0x52, 0x52, 0x52)}
