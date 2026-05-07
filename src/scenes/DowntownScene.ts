import { ZoneScene } from './ZoneScene';
import type { BuildingData, ZoneExit } from './ZoneScene';

class DowntownScene extends ZoneScene {
  constructor() {
    super({ key: 'DowntownScene' });
  }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 1800;
    this.worldHeight = 1600;
    this.zoneName = '🚇 申海市中心 — CBD';
    this.zoneColor = 0x4a5a4a;
    this.playerStartX = data?.startX ?? 900;
    this.playerStartY = data?.startY ?? 1200;
  }

  create(): void {
    // 退出区域
    this.exits = [
      { targetScene: 'SuburbScene', targetX: 900, targetY: 1400, x: 800, y: 1530, width: 200, height: 70, label: '↑ 住宅区' },
      { targetScene: 'CommercialScene', targetX: 200, targetY: 800, x: 1730, y: 650, width: 70, height: 200, label: '→ 商业街' },
      { targetScene: 'BeachScene', targetX: 1200, targetY: 200, x: 700, y: 0, width: 300, height: 50, label: '↓ 海滩' },
    ];

    // 建筑
    this.buildings = [
      { x: 350, y: 300, label: '📈 交易所', color: 0xdf7126, scene: 'ExchangeScene' },
      { x: 900, y: 300, label: '🏦 银行', color: 0x37946e, scene: 'BankScene' },
      { x: 600, y: 650, label: '⚖️ 证监局', color: 0x666688, scene: 'DowntownScene' },
      { x: 900, y: 650, label: '🏢 CBD大厦', color: 0x5588aa, scene: 'DowntownScene' },
      { x: 350, y: 1000, label: '📰 新闻社', color: 0xaa7744, scene: 'DowntownScene' },
    ];

    // NPC
    this.npcData = [
      { x: 400, y: 380, color: 0xddaaaa, name: '陈雅', role: '交易所分析师', greetings: ['基本面分析显示这个板块有机会。', '季报马上要出了，建议观望。', '今天大盘情绪不错。'] },
      { x: 860, y: 380, color: 0xaaaacc, name: '赵警官', role: '派出所民警', greetings: ['你好，最近治安不错。', '注意防范电信诈骗啊。', '有可疑情况随时来报案。'] },
      { x: 680, y: 350, color: 0xaaaaff, name: '阿强', role: '老同学 / 炒股伙伴', greetings: ['嘿兄弟！我刚看到一条内幕消息...', '今天这行情，啧啧啧，得小心。', '那个600009有动静，你懂的。'] },
    ];

    super.create();
  }

  protected drawRoads(): void {
    const road = 0x5a5a6e;
    // 主干道 — 曲线模拟
    const gfx = this.add.graphics().setDepth(1);
    gfx.fillStyle(road, 1);

    // 纵向主路
    gfx.fillRect(500, 0, 80, this.worldHeight);
    gfx.fillRect(1200, 0, 80, this.worldHeight);

    // 横向主路
    gfx.fillRect(0, 450, this.worldWidth, 80);
    gfx.fillRect(0, 1100, this.worldWidth, 80);

    // 对角线小路
    gfx.fillStyle(0x6b6b7b, 1);
    gfx.fillRect(0, 750, 700, 50);
    gfx.fillRect(0, 850, 500, 50);
  }

  protected drawTerrain(): void {
    const gfx = this.add.graphics().setDepth(2);
    // 花坛/绿化带
    const green = 0x3a6e3a;
    gfx.fillStyle(green, 1);
    gfx.fillRect(60, 500, 380, 30);
    gfx.fillRect(60, 1050, 380, 30);
    gfx.fillRect(1260, 500, 400, 30);
    gfx.fillRect(1260, 1050, 400, 30);

    // 喷泉
    gfx.fillStyle(0x4488cc, 1);
    gfx.fillCircle(900, 900, 50);
    gfx.lineStyle(3, 0x66aacc);
    gfx.strokeCircle(900, 900, 50);

    // 随机树丛
    const treeClusters = [
      [200, 200], [1350, 220], [140, 750], [1550, 1000],
      [1500, 500], [1500, 700], [200, 1300], [1400, 1300],
    ];
    gfx.fillStyle(0x2a5e2a, 1);
    treeClusters.forEach(([x, y]) => {
      for (let i = 0; i < 5; i++) {
        gfx.fillCircle(x + Math.random() * 60 - 30, y + Math.random() * 60 - 30, 12 + Math.random() * 8);
      }
    });
  }
}

export default DowntownScene;
