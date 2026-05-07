# 申海漂 - price.gd
# 5因子定价模型
# 每只股票价格 = 基本面价值 + 趋势动量 + 市场情绪 + 随机噪声 + 政府干预
extends Node

const _Companies := preload("res://src/systems/stock/companies.gd")

# 因子权重 (可调节)
const FUNDAMENTAL_WEIGHT := 0.35
const MOMENTUM_WEIGHT := 0.20
const SENTIMENT_WEIGHT := 0.15
const NOISE_WEIGHT := 0.15
const GOVERNMENT_WEIGHT := 0.15

## 计算某只股票下一 tick 的价格变化
static func calc_price_change(
	stock_id: String,
	current_price: float,
	base_price: float,
	volatility: float,
	fundamental: float,     # 基本面分数 0-1
	momentum: float,        # 趋势动量 -1 to 1
	sentiment: float,        # 市场情绪 -1 to 1
	govt_policy: float,     # 政府干预 -1 to 1
) -> float:
	var fundamental_factor := (fundamental - 0.5) * 2.0  # -1 to 1
	var momentum_factor := momentum
	var sentiment_factor := sentiment
	var noise_factor := randf_range(-1.0, 1.0)
	var govt_factor := govt_policy

	var combined := (
		fundamental_factor * FUNDAMENTAL_WEIGHT +
		momentum_factor * MOMENTUM_WEIGHT +
		sentiment_factor * SENTIMENT_WEIGHT +
		noise_factor * NOISE_WEIGHT +
		govt_factor * GOVERNMENT_WEIGHT
	)

	# 变化率 = 波动率 * 合成因子
	var change_pct := volatility * combined * 2.0
	return current_price * change_pct

## 生成初始基本面分数 (0-1)
static func generate_fundamentals() -> Dictionary:
	var funds := {}
	var all_companies := _Companies.get_all()
	for c in all_companies:
		# 基于基础价格和行业生成基本面
		var base := 0.5
		match c.sector:
			"technology": base = 0.6
			"finance": base = 0.55
			"health": base = 0.55
			"energy": base = 0.5
			"tourism": base = 0.45
		var variant := randf_range(-0.1, 0.1)
		funds[c.id] = clampf(base + variant, 0.1, 0.9)
	return funds

## 基本面漂移 (每天小幅变化)
static func drift_fundamentals(fundamentals: Dictionary) -> void:
	for id in fundamentals:
		var drift := randf_range(-0.02, 0.02)
		fundamentals[id] = clampf(fundamentals[id] + drift, 0.05, 0.95)
