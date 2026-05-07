# 申海漂 - portfolio.gd
# 持仓管理
extends Node
class_name portfolio

## 持仓数据结构: { stock_id: { shares: int, avg_cost: float } }
var _holdings: Dictionary = {}

func _init() -> void:
	pass

func add_shares(stock_id: String, shares: int, price: float) -> void:
	if not stock_id in _holdings:
		_holdings[stock_id] = {shares = 0, avg_cost = 0.0}
	var h: Dictionary = _holdings[stock_id]
	var total_cost: float = h.avg_cost * h.shares + price * shares
	h.shares += shares
	h.avg_cost = total_cost / h.shares if h.shares > 0 else 0.0

func remove_shares(stock_id: String, shares: int) -> bool:
	if not stock_id in _holdings:
		return false
	var h: Dictionary = _holdings[stock_id]
	if h.shares < shares:
		return false
	h.shares -= shares
	if h.shares <= 0:
		_holdings.erase(stock_id)
	return true

func get_shares(stock_id: String) -> int:
	return _holdings.get(stock_id, {}).get("shares", 0)

func get_avg_cost(stock_id: String) -> float:
	return _holdings.get(stock_id, {}).get("avg_cost", 0.0)

func get_all_holdings() -> Dictionary:
	return _holdings.duplicate(true)

func get_total_value(prices: Dictionary) -> float:
	var total := 0.0
	for id in _holdings:
		var price: float = prices.get(id, 0.0)
		total += price * _holdings[id].shares
	return total

func get_total_cost() -> float:
	var total := 0.0
	for id in _holdings:
		total += _holdings[id].avg_cost * _holdings[id].shares
	return total

func get_profit_loss(prices: Dictionary) -> float:
	return get_total_value(prices) - get_total_cost()

func clear() -> void:
	_holdings.clear()

func serialize() -> Dictionary:
	return _holdings.duplicate(true)

func deserialize(data: Dictionary) -> void:
	_holdings = data.duplicate(true)
