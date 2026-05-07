# 申海漂 - companies.gd
# 30只股票公司数据定义
extends Node
class_name companies

const COMPANIES := [
	# ID, 名称, 行业, 基础价, 波动率, 市值等级
	{id="SHELL", name="申海石油", sector="energy", base_price=45.0, volatility=0.03, tier=2},
	{id="POWER", name="申海电力", sector="utility", base_price=28.0, volatility=0.02, tier=2},
	{id="WATER", name="海岛水务", sector="utility", base_price=18.0, volatility=0.015, tier=2},
	{id="BANK", name="申海银行", sector="finance", base_price=62.0, volatility=0.025, tier=1},
	{id="TRUST", name="海风信托", sector="finance", base_price=35.0, volatility=0.04, tier=2},
	{id="SECUR", name="申海证券", sector="finance", base_price=88.0, volatility=0.035, tier=1},
	{id="INSURE", name="海岛保险", sector="finance", base_price=42.0, volatility=0.02, tier=2},
	{id="REALT", name="申海地产", sector="realestate", base_price=55.0, volatility=0.04, tier=1},
	{id="HARBOR", name="海港集团", sector="logistics", base_price=31.0, volatility=0.025, tier=2},
	{id="SHIP", name="远洋运输", sector="logistics", base_price=24.0, volatility=0.03, tier=2},
	{id="AIR", name="海岛航空", sector="transport", base_price=72.0, volatility=0.035, tier=1},
	{id="BUS", name="环岛巴士", sector="transport", base_price=15.0, volatility=0.02, tier=3},
	{id="FERRI", name="轮渡公司", sector="transport", base_price=12.0, volatility=0.025, tier=3},
	{id="HOTEL", name="海景酒店", sector="tourism", base_price=48.0, volatility=0.03, tier=2},
	{id="TOUR", name="海岛旅游", sector="tourism", base_price=38.0, volatility=0.04, tier=2},
	{id="FOOD", name="申海食品", sector="consumer", base_price=22.0, volatility=0.02, tier=2},
	{id="MART", name="海风超市", sector="retail", base_price=16.0, volatility=0.018, tier=3},
	{id="PHARM", name="海岛医药", sector="health", base_price=56.0, volatility=0.025, tier=1},
	{id="HOSPT", name="市立医院", sector="health", base_price=68.0, volatility=0.015, tier=1},
	{id="EDU", name="申海教育", sector="education", base_price=25.0, volatility=0.02, tier=3},
	{id="TECH", name="海岛科技", sector="technology", base_price=95.0, volatility=0.06, tier=1},
	{id="MEDIA", name="海风传媒", sector="media", base_price=33.0, volatility=0.035, tier=2},
	{id="GAME", name="申海娱乐", sector="entertainment", base_price=41.0, volatility=0.05, tier=2},
	{id="STEEL", name="海岛钢铁", sector="manufacturing", base_price=20.0, volatility=0.025, tier=3},
	{id="CHEM", name="申海化工", sector="manufacturing", base_price=27.0, volatility=0.03, tier=2},
	{id="ELEC", name="海岛电子", sector="manufacturing", base_price=58.0, volatility=0.04, tier=1},
	{id="BUILD", name="申海建设", sector="construction", base_price=19.0, volatility=0.03, tier=3},
	{id="FISH", name="远洋渔业", sector="agriculture", base_price=14.0, volatility=0.035, tier=3},
	{id="FARM", name="海岛农业", sector="agriculture", base_price=11.0, volatility=0.025, tier=3},
	{id="TEA", name="海岛茶业", sector="consumer", base_price=9.0, volatility=0.02, tier=3},
]

static func get_company(id: String) -> Dictionary:
	for c in COMPANIES:
		if c.id == id:
			return c.duplicate()
	return {}

static func get_by_sector(sector: String) -> Array:
	var result: Array = []
	for c in COMPANIES:
		if c.sector == sector:
			result.append(c.duplicate())
	return result

static func get_all() -> Array:
	var result: Array = []
	for c in COMPANIES:
		result.append(c.duplicate())
	return result
