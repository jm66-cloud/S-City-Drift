# 申海漂 - furniture_generator.gd
# 家具像素生成器 (48x48 像素)
extends Node

const FURN_SIZE := 48

## 生成桌子
static func table(horizontal: bool = true) -> Image:
	var img := Image.create(FURN_SIZE, FURN_SIZE, false, Image.FORMAT_RGBA8)
	var top := Color8(0xA8, 0x7C, 0x4A)      # TAN
	var leg := Color8(0x6B, 0x4C, 0x2A)       # BROWN
	var dark := Color8(0x3C, 0x2B, 0x1E)       # DARK_BROWN

	img.fill(Color.TRANSPARENT)

	if horizontal:
		# 桌面 (宽36, 高6, 居中)
		for y in 6:
			for x in 36:
				var cx := 6 + x
				var cy := 10 + y
				img.set_pixel(cx, cy, top)
		# 桌腿
		for y in 8:
			img.set_pixel(8, 18 + y, leg)
			img.set_pixel(40, 18 + y, leg)
	else:
		for y in 36:
			for x in 6:
				var cx := 21 + x
				var cy := 6 + y
				img.set_pixel(cx, cy, top)
		for x in 8:
			img.set_pixel(8 + x, 6, leg)
			img.set_pixel(8 + x, 38, leg)

	return img

## 生成椅子
static func chair() -> Image:
	var img := Image.create(24, 24, false, Image.FORMAT_RGBA8)
	var seat := Color8(0x6B, 0x4C, 0x2A)      # BROWN
	var metal := Color8(0x9D, 0x9D, 0x9D)      # MID_GRAY

	img.fill(Color.TRANSPARENT)
	# 椅面
	for y in 6:
		for x in 12:
			img.set_pixel(6 + x, 8 + y, seat)
	# 椅背
	for y in 6:
		img.set_pixel(4 + y, 4, seat)
		img.set_pixel(16 - y, 4, seat)
	# 椅腿
	for y in 6:
		img.set_pixel(8, 16 + y, metal)
		img.set_pixel(16, 16 + y, metal)

	return img

## 生成床
static func bed() -> Image:
	var img := Image.create(FURN_SIZE, 32, false, Image.FORMAT_RGBA8)
	var blanket := Color8(0x3C, 0x8D, 0xC8)   # MID_BLUE
	var pillow := Color8(0xFF, 0xFF, 0xFF)     # WHITE
	var frame := Color8(0x6B, 0x4C, 0x2A)      # BROWN

	img.fill(Color.TRANSPARENT)
	# 床架
	for y in 24:
		for x in 40:
			img.set_pixel(4 + x, 4 + y, frame)
	# 床垫/被子 (内填充)
	for y in 20:
		for x in 36:
			var cx := 6 + x
			var cy := 6 + y
			if y < 6:
				img.set_pixel(cx, cy, pillow)
			elif y < 20:
				img.set_pixel(cx, cy, blanket)
	# 床头
	for y in 8:
		for x in 4:
			img.set_pixel(2 + x, 4 + y, frame)

	return img

## 生成冰箱
static func fridge() -> Image:
	var img := Image.create(20, 32, false, Image.FORMAT_RGBA8)
	var body := Color8(0xD4, 0xD4, 0xD4)      # LIGHT_GRAY
	var handle := Color8(0x52, 0x52, 0x52)     # DARK_GRAY

	img.fill(Color.TRANSPARENT)
	# 冰箱体
	for y in 28:
		for x in 16:
			img.set_pixel(2 + x, 2 + y, body)
	# 门缝
	for x in 16:
		img.set_pixel(2 + x, 14, handle)
	# 把手
	img.set_pixel(14, 8, handle)
	img.set_pixel(14, 20, handle)

	return img

## 生成沙发
static func sofa() -> Image:
	var img := Image.create(40, 24, false, Image.FORMAT_RGBA8)
	var fabric := Color8(0x6D, 0xD3, 0x62)    # LIGHT_GREEN
	var dark := Color8(0x36, 0xA8, 0x3E)       # GREEN

	img.fill(Color.TRANSPARENT)
	# 座位
	for y in 10:
		for x in 32:
			img.set_pixel(4 + x, 8 + y, fabric)
	# 扶手
	for y in 12:
		img.set_pixel(2, 6 + y, dark)
		img.set_pixel(36, 6 + y, dark)
	# 靠背
	for y in 6:
		for x in 32:
			img.set_pixel(4 + x, 2 + y, dark)

	return img
