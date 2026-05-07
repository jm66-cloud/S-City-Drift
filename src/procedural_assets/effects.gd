# 申海漂 - effects.gd
# 特效像素纹理生成 (粒子/雨水/火花)
extends Node

const FX_SIZE := 16

## 雨滴粒子纹理
static func rain_drop() -> Image:
	var img := Image.create(4, 8, false, Image.FORMAT_RGBA8)
	var blue: Color = Color8(0x74, 0xBA, 0xD4, 0xCC)  # WATER_SHALLOW with alpha
	img.fill(Color.TRANSPARENT)
	img.set_pixel(1, 0, blue)
	img.set_pixel(2, 0, blue)
	img.set_pixel(1, 1, blue)
	img.set_pixel(2, 1, blue)
	img.set_pixel(2, 2, blue)
	img.set_pixel(1, 2, blue)
	return img

## 火花/粒子纹理
static func spark() -> Image:
	var img := Image.create(4, 4, false, Image.FORMAT_RGBA8)
	var white: Color = Color.WHITE
	img.fill(Color.TRANSPARENT)
	img.set_pixel(1, 0, white)
	img.set_pixel(2, 0, white)
	img.set_pixel(0, 1, white)
	img.set_pixel(3, 1, white)
	img.set_pixel(1, 2, white)
	img.set_pixel(2, 2, white)
	img.set_pixel(1, 3, white)
	return img

## 落叶纹理
static func leaf() -> Image:
	var img := Image.create(6, 6, false, Image.FORMAT_RGBA8)
	var leaf_colors: Array[Color] = [
		Color8(0x6D, 0xD3, 0x62),   # LIGHT_GREEN
		Color8(0xFD, 0xFC, 0x74),   # YELLOW
		Color8(0xFF, 0x8C, 0x00),   # ORANGE
	]
	var c: Color = leaf_colors[randi() % leaf_colors.size()]
	img.fill(Color.TRANSPARENT)
	# 椭圆叶子
	for y in 4:
		for x in 4:
			var dx := x - 2
			var dy := y - 2
			if dx * dx + dy * dy <= 4:
				img.set_pixel(1 + x, 1 + y, c)
	return img

## 赚钱粒子 (+$ 动画用)
static func money_particle() -> Image:
	var img := Image.create(8, 8, false, Image.FORMAT_RGBA8)
	var gold: Color = Color8(0xD4, 0xA0, 0x28)       # GOLD
	img.fill(Color.TRANSPARENT)
	# 简写 $ 符
	img.set_pixel(4, 0, gold)
	img.set_pixel(3, 1, gold)
	img.set_pixel(5, 1, gold)
	img.set_pixel(4, 2, gold)
	img.set_pixel(4, 3, gold)
	img.set_pixel(4, 4, gold)
	img.set_pixel(3, 5, gold)
	img.set_pixel(5, 5, gold)
	img.set_pixel(4, 6, gold)
	return img

## 对话气泡纹理 (9-patch)
static func dialog_bubble(width: int, height: int) -> Image:
	var img := Image.create(width, height, false, Image.FORMAT_RGBA8)
	var bg: Color = Color8(0xFF, 0xFF, 0xFF, 0xF0)    # 半透白
	var border: Color = Color8(0x3C, 0x3C, 0x3C)       # DARK_GRAY
	img.fill(Color.TRANSPARENT)
	for y in height:
		for x in width:
			if y == 0 or y == height - 1 or x == 0 or x == width - 1:
				img.set_pixel(x, y, border)
			else:
				img.set_pixel(x, y, bg)
	return img

## 黑夜覆盖纹理 (全屏半透黑)
static func night_overlay(alpha: float = 0.6) -> Image:
	var img := Image.create(1, 1, false, Image.FORMAT_RGBA8)
	img.set_pixel(0, 0, Color8(0x00, 0x00, 0x00, int(255 * alpha)))
	return img
