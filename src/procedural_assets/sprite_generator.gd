# 申海漂 - sprite_generator.gd
# 通用精灵合成器：分层叠加、调色板替换、缩放
extends Node

## 将多层像素数据叠加合成
static func composite(base: Image, layers: Array[Image], x_offset: int = 0, y_offset: int = 0) -> Image:
	var result := base.duplicate()
	for layer in layers:
		for y in layer.get_height():
			for x in layer.get_width():
				var px := layer.get_pixel(x, y)
				if px.a > 0.01:
					var dx := x + x_offset
					var dy := y + y_offset
					if dx >= 0 and dx < result.get_width() and dy >= 0 and dy < result.get_height():
						result.set_pixel(dx, dy, px)
	return result

## 替换调色板颜色
static func recolor(img: Image, color_map: Dictionary) -> Image:
	var result := img.duplicate()
	for y in result.get_height():
		for x in result.get_width():
			var c := result.get_pixel(x, y)
			var key := _color_key(c)
			if key in color_map:
				result.set_pixel(x, y, color_map[key])
	return result

## 生成精灵帧表 (spritesheet rows)
static func make_spritesheet(frames: Array[Image], columns: int) -> Image:
	if frames.is_empty():
		return Image.create(1, 1, false, Image.FORMAT_RGBA8)
	var fw := frames[0].get_width()
	var fh := frames[0].get_height()
	var rows := ceil(float(frames.size()) / columns)
	var sheet := Image.create(fw * columns, fh * int(rows), false, Image.FORMAT_RGBA8)
	sheet.fill(Color.TRANSPARENT)
	for i in frames.size():
		var col := i % columns
		var row := i / columns
		sheet.blit_rect(frames[i], Rect2i(0, 0, fw, fh), Vector2i(col * fw, row * fh))
	return sheet

static func _color_key(c: Color) -> String:
	return "%d_%d_%d" % [int(c.r * 255), int(c.g * 255), int(c.b * 255)]
