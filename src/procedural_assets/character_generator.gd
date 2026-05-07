# 申海漂 - character_generator.gd
# 角色/NPC 像素生成：4方向行走图 (16x32)
extends Node

const CHAR_W := 16
const CHAR_H := 32
const FRAMES_PER_DIR := 4

static func generate_character(
	skin_color: Color,
	hair_color: Color,
	shirt_color: Color,
	pants_color: Color,
	shoes_color: Color = Color8(0x3C, 0x2B, 0x1E)
) -> Dictionary:
	# 返回 { down: [4 frames], left: [4], right: [4], up: [4] }
	var shadow := Color8(0x00, 0x00, 0x00, 0x40)
	var skin_light := _brighten(skin_color, 0.2)
	var skin_shadow := _darken(skin_color, 0.3)

	var frames := {}
	for dir_name in ["down", "left", "right", "up"]:
		var dir_frames: Array[Image] = []
		for frame in FRAMES_PER_DIR:
			var img := Image.create(CHAR_W, CHAR_H, false, Image.FORMAT_RGBA8)
			img.fill(Color.TRANSPARENT)
			var offset := 0
			if frame == 1: offset = 1
			elif frame == 3: offset = -1

			match dir_name:
				"down":
					_draw_body(img, skin_color, skin_light, skin_shadow, shirt_color, pants_color, shoes_color)
					_draw_head(img, skin_color, hair_color, skin_shadow, offset, dir_name)
				"up":
					_draw_body(img, skin_color, skin_light, skin_shadow, shirt_color, pants_color, shoes_color)
					_draw_head(img, skin_color, hair_color, skin_shadow, offset, dir_name)
				"left":
					_draw_body(img, skin_color, skin_light, skin_shadow, shirt_color, pants_color, shoes_color)
					_draw_head(img, skin_color, hair_color, skin_shadow, offset, dir_name)
				"right":
					_draw_body(img, skin_color, skin_light, skin_shadow, shirt_color, pants_color, shoes_color)
					_draw_head(img, skin_color, hair_color, skin_shadow, offset, dir_name)

			# 脚下阴影
			for sx in 4:
				img.set_pixel(6 + sx, 30, shadow)

			dir_frames.append(img)
		frames[dir_name] = dir_frames

	return frames

static func _draw_head(img: Image, skin: Color, hair: Color, shadow: Color, offset: int, _dir: String) -> void:
	# 脸 (宽8, 高10, 居中偏左)
	var face_x := 4 + offset
	for y in 10:
		for x in 8:
			var fx := face_x + x
			var fy := y
			if fx >= 0 and fx < CHAR_W and fy < CHAR_H:
				img.set_pixel(fx, fy, skin)
	# 头发
	for y in 4:
		for x in 10:
			var hx := 3 + offset + x
			var hy := y
			if hx >= 0 and hx < CHAR_W and hy < CHAR_H:
				img.set_pixel(hx, hy, hair)
	# 眼睛
	var eye_y := 5
	var left_eye_x := 5 + offset
	var right_eye_x := 9 + offset
	img.set_pixel(left_eye_x, eye_y, Color.BLACK)
	img.set_pixel(right_eye_x, eye_y, Color.BLACK)

static func _draw_body(img: Image, skin: Color, light: Color, shadow: Color, shirt: Color, pants: Color, shoes: Color) -> void:
	# 上衣 (宽10, 高8, 从y=10开始)
	for y in 8:
		for x in 10:
			var bx := 3 + x
			var by := 10 + y
			if bx >= 0 and bx < CHAR_W and by < CHAR_H:
				var c := shirt
				if x == 0 or x == 9:
					c = _darken(shirt, 0.2)
				img.set_pixel(bx, by, c)

	# 手臂 (两侧)
	for y in 6:
		img.set_pixel(2, 10 + y, skin)
		img.set_pixel(13, 10 + y, skin)

	# 裤子 (宽8, 高8, 从y=18开始)
	for y in 8:
		for x in 8:
			var px := 4 + x
			var py := 18 + y
			if px >= 0 and px < CHAR_W and py < CHAR_H:
				img.set_pixel(px, py, pants)

	# 鞋子 (宽8, 高2, 从y=26开始)
	for x in 8:
		img.set_pixel(4 + x, 27, shoes)
		img.set_pixel(4 + x, 28, shoes)

static func _brighten(c: Color, amt: float) -> Color:
	return Color(
		minf(c.r + amt, 1.0),
		minf(c.g + amt, 1.0),
		minf(c.b + amt, 1.0),
		c.a
	)

static func _darken(c: Color, amt: float) -> Color:
	return Color(
		maxf(c.r - amt, 0.0),
		maxf(c.g - amt, 0.0),
		maxf(c.b - amt, 0.0),
		c.a
	)
