# 申海漂 - npc_data.gd
# NPC 定义数据
extends Node

const NPCS := [
	{
		id = "old_li",
		name = "老李",
		title = "资深股民",
		x = 480, y = 360,
		skin = Color8(0xFF, 0xD4, 0x9C),
		hair = Color8(0x9D, 0x9D, 0x9D),
		shirt = Color8(0x52, 0x52, 0x52),
		pants = Color8(0x3C, 0x3C, 0x3C),
		dialogues = [
			{trigger = "greet", text = "小伙子，炒股不如买楼啊。我这三十年的经验告诉你，楼市才是硬道理。"},
			{trigger = "stock_up", text = "今天行情不错嘛！我那个茅台涨了，晚上加个菜。"},
			{trigger = "stock_down", text = "哎，又跌了。不过别慌，长期持有肯定能回来的。"},
		]
	},
	{
		id = "xiaomei",
		name = "小美",
		title = "咖啡店老板",
		x = 640, y = 280,
		skin = Color8(0xFD, 0xE0, 0xC8),
		hair = Color8(0x6D, 0x4C, 0x2A),
		shirt = Color8(0xFC, 0x84, 0x84),
		pants = Color8(0x52, 0x52, 0x52),
		dialogues = [
			{trigger = "greet", text = "欢迎光临！今天的特调是海盐焦糖拿铁，要来一杯吗？"},
			{trigger = "rich", text = "哇，你又赚了不少吧？请我喝杯咖啡嘛～"},
			{trigger = "poor", text = "没关系，这杯我请你。下次发达了别忘了我就行。"},
		]
	},
	{
		id = "boss_wang",
		name = "王总",
		title = "企业老板",
		x = 800, y = 440,
		skin = Color8(0xF5, 0xC8, 0x90),
		hair = Color8(0x2C, 0x2C, 0x2C),
		shirt = Color8(0x3C, 0x8D, 0xC8),
		pants = Color8(0x2C, 0x2C, 0x2C),
		dialogues = [
			{trigger = "greet", text = "最近公司在筹备上市，有没有兴趣认购一点原始股？"},
			{trigger = "business", text = "生意不好做啊，要不是靠炒股撑着，公司早就黄了。"},
		]
	},
	{
		id = "aunt_zhang",
		name = "张阿姨",
		title = "广场舞领队",
		x = 300, y = 500,
		skin = Color8(0xFF, 0xD4, 0x9C),
		hair = Color8(0x8C, 0x5C, 0x3C),
		shirt = Color8(0xFC, 0x5C, 0x5C),
		pants = Color8(0x5C, 0x8C, 0x5C),
		dialogues = [
			{trigger = "greet", text = "小伙子来得正好！晚上广场舞缺个人，要不要来？"},
			{trigger = "stock_up", text = "今天股票赚了，跳得也更起劲了！"},
			{trigger = "stock_down", text = "亏了点，不过没事，明天再来！"},
		]
	},
	{
		id = "dr_liu",
		name = "刘医生",
		title = "诊所医生",
		x = 150, y = 200,
		skin = Color8(0xFD, 0xE0, 0xC8),
		hair = Color8(0x3C, 0x3C, 0x3C),
		shirt = Color8(0xFF, 0xFF, 0xFF),
		pants = Color8(0x5C, 0x8C, 0x5C),
		dialogues = [
			{trigger = "greet", text = "注意身体啊年轻人，钱是赚不完的，命只有一条。"},
			{trigger = "health_low", text = "你气色不太好，来让我把把脉……要注意休息！"},
		]
	},
]

static func get_all() -> Array:
	return NPCS

static func get_npc(id: String) -> Dictionary:
	for n in NPCS:
		if n.id == id:
			return n
	return {}
