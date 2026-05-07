# 申海漂 - ui_icon_generator.gd
# UI 图标/按钮纹理生成
extends Node

const ICON_SIZE := 16

## 生成通用按钮背景
static func button_bg(width: int, height: int, accent: Color) -> Image:
	var img := Image.create(width, height, false, Image.FORMAT_RGBA8)
	var dark := Color8(0x3C, 0x3C, 0x3C)
	var light := Color8(0xD4, 0xD4, 0xD4)

	for y in height:
		for x in width:
			var c := dark
			# 渐变感 (模拟按钮立体)
			if y < height / 2:
				c = dark
			else:
				c = light
			# 边框高亮
			if y == 0 or x == 0 or x == width - 1 or y == height - 1:
				c = accent
			img.set_pixel(x, y, c)

	return img

## 生成金钱图标
static func money_icon() -> Image:
	var img := Image.create(ICON_SIZE, ICON_SIZE, false, Image.FORMAT_RGBA8)
	var gold := Color8(0xD4, 0xA0, 0x28)       # GOLD
	img.fill(Color.TRANSPARENT)
	# 圆形金币
	for y in 12:
		for x in 12:
			var dx := x - 6
			var dy := y - 6
			if dx * dx + dy * dy <= 36:
				img.set_pixel(2 + x, 2 + y, gold)
	# 中间 $ 标记
	img.set_pixel(8, 6, Color.WHITE)
	return img

## 生成时间图标
static func time_icon() -> Image:
	var img := Image.create(ICON_SIZE, ICON_SIZE, false, Image.FORMAT_RGBA8)
	var white := Color.WHITE
	img.fill(Color.TRANSPARENT)
	# 时钟外圈
	for y in 12:
		for x in 12:
			var dx := x - 5
			var dy := y - 5
			var dist := dx * dx + dy * dy
			if dist >= 9 and dist <= 25:
				img.set_pixel(3 + x, 3 + y, white)
	# 指针
	for i in 4:
		img.set_pixel(8 + i, 8, white)    # 时针
		img.set_pixel(8, 7 - i, white)    # 分针
	return img

## 生成背包图标
static func backpack_icon() -> Image:
	var img := Image.create(ICON_SIZE, ICON_SIZE, false, Image.FORMAT_RGBA8)
	var brown := Color8(0x6B, 0x4C, 0x2A)      # BROWN
	var dark := Color8(0x3C, 0x2B, 0x1E)       # DARK_BROWN

	img.fill(Color.TRANSPARENT)
	# 背包主体
	for y in 8:
		for x in 10:
			img.set_pixel(3 + x, 6 + y, brown)
	# 背包盖
	for y in 3:
		for x in 8:
			img.set_pixel(4 + x, 3 + y, dark)
	return img

## 生成设置图标
static func settings_icon() -> Image:
	var img := Image.create(ICON_SIZE, ICON_SIZE, false, Image.FORMAT_RGBA8)
	var gray := Color8(0x9D, 0x9D, 0x9D)       # MID_GRAY
	img.fill(Color.TRANSPARENT)
	# 齿轮简图
	var centers := [Vector2i(4,4), Vector2i(12,4), Vector2i(8,12)]
	for c in centers:
		for y in 4:
			for x in 4:
				var dx := x - 2
				var dy := y - 2
				if dx * dx + dy * dy <= 4:
					img.set_pixel(c.x + x - 2, c.y + y - 2, gray)
	return img
