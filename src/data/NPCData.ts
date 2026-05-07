export interface NPCDef {
  id: string;
  name: string;
  role: string;
  location: string;
  color: number;
  x: number;
  y: number;
  greetings: string[];
  giftPreferences: string[];
}

export const NPC_DATA: NPCDef[] = [
  {
    id: 'wang_ayi',
    name: '王阿姨',
    role: '房东 / 包租婆',
    location: '住宅区',
    color: 0xffaaaa,
    x: 150,
    y: 300,
    greetings: [
      '小王啊，这个月房租该交了啊！',
      '今天菜市场鸡蛋便宜，我多买了几个。',
      '听说隔壁老张家儿子考上大学了...',
      '来来来，阿姨做了红烧肉，给你留一碗！',
    ],
    giftPreferences: ['食材', '水果', '保健品'],
  },
  {
    id: 'a_qiang',
    name: '阿强',
    role: '老同学 / 炒股伙伴',
    location: 'CBD',
    color: 0xaaaaff,
    x: 680,
    y: 300,
    greetings: [
      '嘿兄弟！我刚看到一条内幕消息...',
      '今天这行情，啧啧啧，得小心。',
      '晚上去酒吧喝一杯？我请客！',
      '那个600009有动静，你懂的。',
    ],
    giftPreferences: ['啤酒', '科技股', '彩票'],
  },
  {
    id: 'xiao_lin',
    name: '小琳',
    role: '咖啡馆老板娘',
    location: '咖啡馆',
    color: 0xffccaa,
    x: 780,
    y: 680,
    greetings: [
      '欢迎光临～今天的新豆子刚到。',
      '最近研究了一个新的拉花图案！',
      '这只猫叫豆豆，它很喜欢你呢～',
      '你的品味一直很好呢...',
    ],
    giftPreferences: ['咖啡豆', '鲜花', '甜品'],
  },
  {
    id: 'chen_ya',
    name: '陈雅',
    role: '交易所分析师',
    location: '交易所',
    color: 0xddaaaa,
    x: 600,
    y: 250,
    greetings: [
      '基本面分析显示这个板块有机会。',
      '季报马上要出了，建议观望。',
      '有空一起研究K线啊。',
      '今天大盘情绪不错。',
    ],
    giftPreferences: ['书籍', '保健品', '茶'],
  },
  {
    id: 'lao_zhang',
    name: '老张',
    role: '退休工人 / 麻将瘾',
    location: '住宅区',
    color: 0xccccaa,
    x: 250,
    y: 350,
    greetings: [
      '今天手气不错，赢了王阿姨三把！',
      '年轻人要多锻炼啊，别老盯着那手机。',
      '我儿子在外面打工，一年回来一次...',
      '钓鱼？东沙滩那边有大鱼！',
    ],
    giftPreferences: ['鱼竿', '茶叶', '麻将'],
  },
  {
    id: 'zhao_jingguan',
    name: '赵警官',
    role: '派出所民警',
    location: 'CBD',
    color: 0xaaaacc,
    x: 700,
    y: 250,
    greetings: [
      '你好，最近治安不错。',
      '注意防范电信诈骗啊。',
      '有可疑情况随时来报案。',
      '上次那个案子破得漂亮！',
    ],
    giftPreferences: ['茶叶', '书', '锦旗'],
  },
];

export function getRandomGreeting(npcId: string): string {
  const npc = NPC_DATA.find(n => n.id === npcId);
  if (!npc) return '你好！';
  return npc.greetings[Math.floor(Math.random() * npc.greetings.length)];
}
