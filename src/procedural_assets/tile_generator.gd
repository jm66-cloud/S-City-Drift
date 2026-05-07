# 申海漂 - tile_generator.gd
# 瓦片纹理生成器：地面/道路/水域/草地/装饰
extends Node

const TILE_SIZE := 32

## 生成草地瓦片
static func grass_tile(variant: int = 0) -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var base: Color = Color8(0x36, 0xA8, 0x3E)   # GREEN
	var dark: Color = Color8(0x00, 0x7B, 0x3E)    # FOREST
	var light: Color = Color8(0x6D, 0xD3, 0x62)   # LIGHT_GREEN

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c: Color = base
			# 随机草叶
			if randi() % 10 > 7:
				c = dark if randi() % 2 == 0 else light
			img.set_pixel(x, y, c)

	# 添加少量杂草点
	var seed_base := variant * 100
	for i in 8:
		var sx := (i * 7 + seed_base) % TILE_SIZE
		var sy := (i * 13 + seed_base) % TILE_SIZE
		img.set_pixel(sx, sy, dark)

	return img

## 生成道路瓦片
static func road_tile() -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var road: Color = Color8(0x9D, 0x9D, 0x9D)    # MID_GRAY
	var dark: Color = Color8(0x52, 0x52, 0x52)     # DARK_GRAY
	var line: Color = Color8(0xFD, 0xFC, 0x74)     # YELLOW (车道线)

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c: Color = road
			# 边缘略深 (路沿)
			if x < 2 or x >= TILE_SIZE - 2 or y < 2 or y >= TILE_SIZE - 2:
				c = dark
			# 中心车道虚线
			elif abs(y - 16) < 2 and x % 8 < 4:
				c = line
			# 随机路面纹理
			elif randi() % 20 == 0:
				c = dark
			img.set_pixel(x, y, c)

	return img

## 生成人行道瓦片
static func sidewalk_tile() -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var base: Color = Color8(0xD4, 0xD4, 0xD4)    # LIGHT_GRAY
	var seam: Color = Color8(0x9D, 0x9D, 0x9D)     # MID_GRAY

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c: Color = base
			# 砖缝
			if x % 8 == 0 or y % 8 == 0:
				c = seam
			img.set_pixel(x, y, c)

	return img

## 生成水域瓦片
static func water_tile(depth: bool = false) -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var shallow: Color = Color8(0x74, 0xBA, 0xD4, 0x80)   # WATER_SHALLOW
	var deep: Color = Color8(0x00, 0x5C, 0x9E, 0xCC)       # WATER_DEEP
	var light: Color = Color8(0x9D, 0xD3, 0xD3)             # SKY_BLUE

	var base: Color = deep if depth else shallow

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c: Color = base
			# 水面波光
			if (x + y) % 16 < 3 and randi() % 4 == 0:
				c = light
			img.set_pixel(x, y, c)

	return img

## 生成沙滩瓦片
static func sand_tile() -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var base: Color = Color8(0xD4, 0xA8, 0x6E)     # LIGHT_TAN
	var dark: Color = Color8(0xA8, 0x7C, 0x4A)     # TAN
	var dots: Color = Color8(0xE6, 0xC8, 0xA8)     # PALE_TAN

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c: Color = base
			if randi() % 15 == 0:
				c = dark
			elif randi() % 20 == 0:
				c = dots
			img.set_pixel(x, y, c)

	return img

## 生成地面瓦片（室内地板）
static func floor_tile(variant: int = 0) -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var colors: Array[Color] = [
		Color8(0xA8, 0x7C, 0x4A),   # 木色
		Color8(0xD4, 0xD4, 0xD4),   # 浅色
		Color8(0x6B, 0x4C, 0x2A),   # 深色
	]
	var base: Color = colors[variant % colors.size()]
	var dark: Color = Color8(0x3C, 0x2B, 0x1E)

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c: Color = base
			# 木板条纹
			if variant == 0 and y % 4 == 0:
				c = dark
			img.set_pixel(x, y, c)

	return img

## 生成墙壁瓦片
static func wall_tile() -> Image:
	var img := Image.create(TILE_SIZE, TILE_SIZE, false, Image.FORMAT_RGBA8)
	var base: Color = Color8(0xE6, 0xC8, 0xA8)   # PALE_TAN
	var brick: Color = Color8(0xD4, 0xA8, 0x6E)   # LIGHT_TAN
	var mortar: Color = Color8(0x9D, 0x9D, 0x9D)   # MID_GRAY

	for y in TILE_SIZE:
		for x in TILE_SIZE:
			var c: Color = base
			# 砖纹
			var row := y / 8
			var offset := (row % 2) * 4
			if (x + offset) % 8 == 0 or y % 8 == 0:
				c = mortar
			elif randi() % 10 == 0:
				c = brick
			img.set_pixel(x, y, c)

	return img
