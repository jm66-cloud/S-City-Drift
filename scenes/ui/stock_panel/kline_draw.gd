# 申海漂 - kline_draw.gd
# K线绘图 (CanvasItem._draw)
extends Control

var _prices: Array[float] = []
var _max_price: float = 100.0
var _min_price: float = 0.0
var _stock_color: Color = Color8(0x36, 0xA8, 0x3E)  # GREEN (涨)

func set_prices(prices: Array[float]) -> void:
	_prices = prices
	if prices.is_empty():
		return
	_max_price = maxf(prices.max(), _max_price)
	_min_price = minf(prices.min(), _min_price)
	var range_val := _max_price - _min_price
	if range_val < 1.0:
		range_val = 1.0
	# 留边距
	_max_price += range_val * 0.1
	_min_price -= range_val * 0.1
	queue_redraw()

func _draw() -> void:
	if _prices.size() < 2:
		return

	var w := size.x
	var h := size.y
	var step_x := w / float(_prices.size() - 1) if _prices.size() > 1 else w
	var range_val := _max_price - _min_price

	if range_val <= 0.0:
		range_val = 1.0

	# 画折线 (简化K线，用折线代替蜡烛)
	var prev_point := Vector2.ZERO
	var first := true

	for i in _prices.size():
		var x := i * step_x
		var y := h - ((_prices[i] - _min_price) / range_val) * h
		var point := Vector2(x, y)

		if not first:
			draw_line(prev_point, point, _stock_color, 1.5)
		else:
			first = false
		prev_point = point

	# 画参考线
	var mid := (_max_price + _min_price) / 2.0
	var mid_y := h - ((mid - _min_price) / range_val) * h
	draw_line(Vector2(0, mid_y), Vector2(w, mid_y), Color8(0x9D, 0x9D, 0x9D, 0x40), 1.0)
