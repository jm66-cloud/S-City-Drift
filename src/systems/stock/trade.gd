# 申海漂 - trade.gd
# 交易执行：买入/卖出/订单簿
extends Node
class_name trade

signal trade_executed(stock_id: String, shares: int, price: float, is_buy: bool)

const COMMISSION_RATE := 0.0005  # 万5手续费
const STAMP_TAX_RATE := 0.001    # 千1印花税 (卖出)

var portfolio  # Will be set by market

func _init(p) -> void:
	portfolio = p

## 买入
func buy(stock_id: String, shares: int, price: float) -> Dictionary:
	if shares <= 0:
		return {success = false, reason = "invalid_shares"}
	var cost: float = price * shares
	var commission: float = maxf(cost * COMMISSION_RATE, 5.0)  # 最低5元
	var total_cost: float = cost + commission

	if Global.securities_account < total_cost:
		return {success = false, reason = "insufficient_funds"}

	Global.securities_account -= total_cost
	portfolio.add_shares(stock_id, shares, price)
	trade_executed.emit(stock_id, shares, price, true)

	var data: Dictionary = {stock_id = stock_id, shares = shares, price = price, type = "buy", total = total_cost, commission = commission}
	EventBus.stock_trade_executed.emit(stock_id, shares, price, true)
	return {success = true, data = data}

## 卖出
func sell(stock_id: String, shares: int, price: float) -> Dictionary:
	if shares <= 0:
		return {success = false, reason = "invalid_shares"}
	var held: int = portfolio.get_shares(stock_id)
	if held < shares:
		return {success = false, reason = "insufficient_shares"}

	var revenue: float = price * shares
	var commission: float = maxf(revenue * COMMISSION_RATE, 5.0)
	var stamp_tax: float = revenue * STAMP_TAX_RATE
	var net_revenue: float = revenue - commission - stamp_tax

	portfolio.remove_shares(stock_id, shares)
	Global.securities_account += net_revenue
	trade_executed.emit(stock_id, shares, price, false)

	var data: Dictionary = {stock_id = stock_id, shares = shares, price = price, type = "sell", net = net_revenue, commission = commission, tax = stamp_tax}
	EventBus.stock_trade_executed.emit(stock_id, shares, price, false)
	return {success = true, data = data}
