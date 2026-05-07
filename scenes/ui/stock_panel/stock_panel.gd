# 申海漂 - stock_panel.gd
# 炒股交易面板 UI
extends Control

const _Companies := preload("res://src/systems/stock/companies.gd")

signal panel_closed

var _market = null
var _current_stock_id: String = ""
var _current_price: float = 0.0

@onready var _stock_list := $HSplit/StockList as ItemList
@onready var _kline := $HSplit/DetailPanel/KLine as Control
@onready var _price_label := $HSplit/DetailPanel/PriceLabel as Label
@onready var _change_label := $HSplit/DetailPanel/ChangeLabel as Label
@onready var _buy_input := $HSplit/DetailPanel/BuyInput as SpinBox
@onready var _sell_input := $HSplit/DetailPanel/SellInput as SpinBox

func _ready() -> void:
	visible = false
	_market = Market
	_populate_list()

func _find_market():
	return Market

func set_market(m) -> void:
	_market = m

func open() -> void:
	visible = true
	move_to_front()
	if _market:
		_populate_list()

func close() -> void:
	visible = false
	panel_closed.emit()

func _populate_list() -> void:
	if not _market or not _stock_list:
		return
	_stock_list.clear()
	var prices: Dictionary = _market.get_prices()
	for id in prices:
		var c := _Companies.get_company(id)
		var name: String = c.get("name", id) if not c.is_empty() else id
		var price: float = prices[id]
		_stock_list.add_item("%s  ¥%.2f" % [name, price])

func _on_stock_selected(index: int) -> void:
	if not _stock_list or not _market:
		return
	var text := _stock_list.get_item_text(index)
	var id := text.split(" ")[0]
	_current_stock_id = id
	_current_price = _market.get_price(id)
	_price_label.text = "¥%.2f" % _current_price

	var hist: Array = _market.get_price_history(id)
	_kline.set_prices(hist)

	_buy_input.max_value = 99999
	_buy_input.value = 0
	_sell_input.max_value = _market.get_portfolio().get_shares(id)
	_sell_input.value = 0

func _on_buy_pressed() -> void:
	if not _market or _current_stock_id.is_empty():
		return
	var shares := int(_buy_input.value)
	if shares <= 0:
		return
	var result: Dictionary = _market.get_trade().buy(_current_stock_id, shares, _current_price)
	if result.success:
		EventBus.notification.emit("买入 %d 股 %s" % [shares, _current_stock_id], "success")
	else:
		EventBus.notification.emit(result.reason, "error")

func _on_sell_pressed() -> void:
	if not _market or _current_stock_id.is_empty():
		return
	var shares := int(_sell_input.value)
	if shares <= 0:
		return
	var result: Dictionary = _market.get_trade().sell(_current_stock_id, shares, _current_price)
	if result.success:
		EventBus.notification.emit("卖出 %d 股 %s" % [shares, _current_stock_id], "success")
	else:
		EventBus.notification.emit(result.reason, "error")

func _on_close_pressed() -> void:
	close()
