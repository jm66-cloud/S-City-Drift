import { ZoneScene } from './ZoneScene';

class SuburbScene extends ZoneScene {
  constructor() {
    super({ key: 'SuburbScene' });
  }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 2000;
    this.worldHeight = 1800;
    this.zoneName = '🏘 申海市住宅区';
    this.zoneColor = 0x5a7a4a;
    this.playerStartX = data?.startX ?? 400;
    this.playerStartY = data?.startY ?? 800;
  }

  create(): void {
    this.exits = [
      { targetScene: 'DowntownScene', targetX: 900, targetY: 200, x: 800, y: 0, width: 200, height: 50, label: '↓ 市中心' },
      { targetScene: 'CommercialScene', targetX: 200, targetY: 900, x: 1950, y: 700, width: 50, height: 200, label: '→ 商业街' },
    ];

    this.buildings = [
      { x: 320, y: 450, label: '🏠 公寓', color: 0x663931, scene: 'ApartmentScene' },
      { x: 700, y: 350, label: '🏘 王阿姨家', color: 0xcc8866, scene: 'SuburbScene' },
      { x: 1000, y: 900, label: '🏘 老张家', color: 0xbbaa88, scene: 'SuburbScene' },
      { x: 500, y: 1200, label: '🏘 陈叔家', color: 0x99aa77, scene: 'SuburbScene' },
    ];

    this.npcData = [
      { x: 650, y: 420, color: 0xffaaaa, name: '王阿姨', role: '房东', greetings: ['小王啊，这个月房租该交了啊！', '来来来，阿姨做了红烧肉！', '今天菜市场鸡蛋便宜。'] },
      { x: 950, y: 970, color: 0xccccaa, name: '老张', role: '退休工人', greetings: ['今天手气不错，赢了王阿姨三把！', '年轻人要多锻炼啊。', '东沙滩那边有大鱼！'] },
    ];

    super.create();
  }

  protected drawRoads(): void {
    const gfx = this.add.graphics().setDepth(1);
    const road = 0x7a7a6e;
    gfx.fillStyle(road, 1);

    // 蜿蜒小路
    gfx.fillRect(0, 600, 600, 40);
    gfx.fillRect(550, 550, 40, 300);
    gfx.fillRect(300, 800, 1000, 40);
    gfx.fillRect(1100, 500, 40, 500);
    gfx.fillRect(700, 950, 900, 40);
    gfx.fillRect(1500, 300, 40, 700);
    gfx.fillRect(400, 1300, 1200, 40);
  }

  protected drawTerrain(): void {
    const gfx = this.add.graphics().setDepth(2);
    // 花园
    gfx.fillStyle(0x3a7a3a, 1);
    gfx.fillRect(200, 150, 300, 200);
    gfx.fillStyle(0x4a8a4a, 1);
    gfx.fillRect(220, 170, 260, 160);

    // 小池塘
    gfx.fillStyle(0x3388aa, 1);
    gfx.fillEllipse(1600, 1200, 160, 100);
    gfx.lineStyle(2, 0x5599bb);
    gfx.strokeEllipse(1600, 1200, 160, 100);

    // 树篱
    gfx.fillStyle(0x2a5e2a, 1);
    const trees = [
      150, 550, 250, 550, 350, 550,
      1200, 350, 1350, 400, 1500, 350,
      100, 1000, 200, 1050, 300, 1000, 400, 1050,
      1700, 600, 1750, 700, 1700, 800,
      1600, 1500, 1700, 1550, 1800, 1500,
    ];
    for (let i = 0; i < trees.length; i += 2) {
      gfx.fillCircle(trees[i], trees[i + 1], 15 + Math.random() * 8);
    }
  }
}

export default SuburbScene;
