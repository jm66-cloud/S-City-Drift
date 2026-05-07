# 申海漂 - market.gd
# 市场主控：驱动价格更新、管理市场状态
extends Node
class_name market

signal market_updated(prices: Dictionary)
signal market_crashed()
signal market_rally()

const TICK_INTERVAL_SECONDS := 30.0
const UPDATE_FREQUENCY := 10

const _Companies := preload("res://src/systems/stock/companies.gd")
const _Price := preload("res://src/systems/stock/price.gd")
const _Portfolio := preload("res://src/systems/stock/portfolio.gd")
const _Trade := preload("res://src/systems/stock/trade.gd")

var _prices: Dictionary = {}
var _base_prices: Dictionary = {}
var _volatilities: Dictionary = {}
var _fundamentals: Dictionary = {}
var _momentum: Dictionary = {}
var _price_history: Dictionary = {}
var _tick: int = 0
var _timer: float = 0.0
var _is_open: bool = true

var _government: Dictionary = {policy = 0.0, intervention_count = 0}
var _quant_funds: Array = []
var _retail_traders: int = 100

var _trade_node: Node = null
var _portfolio_node: Node = null

func _ready() -> void:
	process_mode = PROCESS_MODE_ALWAYS
	_portfolio_node = _Portfolio.new()
	_trade_node = _Trade.new(_portfolio_node)
	add_child(_trade_node)
	_initialize_market()

func _process(delta: float) -> void:
	update_time(delta)

func get_trade():
	return _trade_node

func get_portfolio():
	return _portfolio_node

func get_price(stock_id: String) -> float:
	return _prices.get(stock_id, 0.0)

func get_prices() -> Dictionary:
	return _prices.duplicate()

func get_price_history(stock_id: String) -> Array:
	return _price_history.get(stock_id, []).duplicate()

func is_open() -> bool:
	return _is_open

func set_open(val: bool) -> void:
	_is_open = val

func update_time(delta: float) -> void:
	if not _is_open:
		return
	_timer += delta
	if _timer >= TICK_INTERVAL_SECONDS:
		_timer -= TICK_INTERVAL_SECONDS
		_tick += 1
		_tick_market()

func _initialize_market() -> void:
	var all_companies := _Companies.get_all()
	for c in all_companies:
		_prices[c.id] = c.base_price
		_base_prices[c.id] = c.base_price
		_volatilities[c.id] = c.volatility
		_momentum[c.id] = randf_range(-0.1, 0.1)
		_price_history[c.id] = [c.base_price]
	_fundamentals = _Price.generate_fundamentals()
	_init_quant_funds()

func _init_quant_funds() -> void:
	for i in 5:
		_quant_funds.append({
			name = "量化" + str(i + 1),
			capital = randf_range(1e7, 5e7),
			aggressiveness = randf_range(0.3, 0.8),
			strategy = randi() % 3,
		})

func _tick_market() -> void:
	var sentiment := _calc_sentiment()
	_govt_intervention()

	for id in _prices:
		var change := _Price.calc_price_change(
			id, _prices[id], _base_prices[id],
			_volatilities[id], _fundamentals[id],
			_momentum[id], sentiment, _government.policy
		)
		_prices[id] = maxf(_prices[id] + change, 0.01)

		var hist: Array = _price_history.get(id, [])
		hist.append(_prices[id])
		if hist.size() > 240:
			hist.pop_front()

		_momentum[id] *= 0.95
		_momentum[id] += randf_range(-0.02, 0.02)
		_momentum[id] = clampf(_momentum[id], -1.0, 1.0)

	_Price.drift_fundamentals(_fundamentals)
	_simulate_retail()
	_detect_events()

	if _tick % UPDATE_FREQUENCY == 0:
		market_updated.emit(_prices.duplicate())

func _calc_sentiment() -> float:
	var total_momentum := 0.0
	for id in _momentum:
		total_momentum += _momentum[id]
	var avg_momentum := total_momentum / _momentum.size()
	return clampf(avg_momentum * 2.0, -1.0, 1.0)

func _govt_intervention() -> void:
	if _tick % 10 != 0:
		return
	var avg_price := 0.0
	for id in _prices:
		avg_price += _prices[id] / _base_prices[id]
	avg_price /= _prices.size()

	if avg_price > 1.3:
		_government.policy = -0.3
	elif avg_price < 0.7:
		_government.policy = 0.3
	else:
		_government.policy = 0.0

func _simulate_retail() -> void:
	if randi() % 5 != 0:
		return
	for id in _prices:
		if _momentum[id] > 0.3:
			_momentum[id] += 0.05
		elif _momentum[id] < -0.3:
			_momentum[id] -= 0.05

func _detect_events() -> void:
	var avg_price := 0.0
	for id in _prices:
		avg_price += _prices[id]
	avg_price /= _prices.size()

	var avg_base := 0.0
	for id in _base_prices:
		avg_base += _base_prices[id]
	avg_base /= _base_prices.size()

	var market_change := (avg_price - avg_base) / avg_base
	if market_change < -0.3:
		market_crashed.emit()
	elif market_change > 0.3:
		market_rally.emit()
