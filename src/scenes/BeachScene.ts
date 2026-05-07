import { ZoneScene } from './ZoneScene';

class BeachScene extends ZoneScene {
  constructor() { super({ key: 'BeachScene' }); }

  init(data?: { startX?: number; startY?: number }): void {
    super.init();
    this.worldWidth = 2400;
    this.worldHeight = 1400;
    this.zoneName = '🏖 申海东沙滩';
    this.zoneColor = 0xd4b070;
    this.weather = 'rain';
    this.bgmKey = 'bgm-daily2';
    this.playerStartX = data?.startX ?? 1100;
    this.playerStartY = data?.startY ?? 500;
  }

  create(): void {
    this.exits = [
      { targetScene: 'DowntownScene', targetX: 900, targetY: 1500, x: 950, y: 1350, width: 200, height: 50, label: '↑ 返回市区' },
    ];

    this.buildings = [
      { x: 2100, y: 300, label: '📍 灯塔', color: 0xffec27, scene: 'BeachScene' },
      { x: 500, y: 1000, label: '🚢 港口', color: 0x556688, scene: 'BeachScene' },
      { x: 1550, y: 1050, label: '🎣 渔港', color: 0x668877, scene: 'BeachScene' },
    ];

    this.npcData = [
      { id: 'lao_yufu', x: 1850, y: 600, color: 0x88aacc, name: '老渔夫', role: '渔民', greetings: ['今天浪不小啊。', '这片海域的鱼可肥了。', '想学钓鱼？我教你。'] },
      { id: 'you_ke', x: 750, y: 750, color: 0xffcc88, name: '游客', role: '游客', greetings: ['这沙滩真漂亮！', '帮我拍张照吧？', '你也是来度假的吗？'] },
      { id: 'xiao_mei', x: 1350, y: 650, color: 0xccffaa, name: '小美', role: '摊贩', greetings: ['新鲜椰汁！一份¥30！', '贝壳手链要看看吗？', '今天生意不错哈！'] },
    ];

    this.busStops = [
      { x: 800, y: 1200, label: '🚌 海滩站', target: 'DowntownScene', targetX: 600, targetY: 1300, cost: 10 },
      { x: 1800, y: 1200, label: '🚌 灯塔站', target: 'SuburbScene', targetX: 400, targetY: 800, cost: 15 },
    ];

    super.create();
  }

  protected drawGround(): void {
    const gfx = this.add.graphics().setDepth(0);
    // 海面
    gfx.fillStyle(0x2d6a9f, 1);
    gfx.fillRect(0, 0, this.worldWidth, 350);
    // 海水渐变纹
    for (let x = 0; x < this.worldWidth; x += 40) {
      const y = 50 + Math.sin(x * 0.05) * 30;
      gfx.fillStyle(this.shadeColor(0x2d6a9f, 10), 0.3);
      gfx.fillRect(x, y, 20, 80);
    }

    // 波浪线（动态平铺代替）
    gfx.lineStyle(2, 0x4a90c0, 0.5);
    for (let x = 0; x < this.worldWidth; x += 20) {
      gfx.lineBetween(x, 290 + Math.sin(x * 0.1) * 15, x + 20, 290 + Math.sin((x + 20) * 0.1) * 15);
    }

    // 沙滩
    gfx.fillStyle(0xd4aa6a, 1);
    gfx.fillRect(0, 280, this.worldWidth, 220);
    gfx.fillStyle(0xd4b87a, 1);
    gfx.fillRect(0, 330, this.worldWidth, 200);
    gfx.fillStyle(0xc4a060, 1);
    gfx.fillRect(0, 430, this.worldWidth, 150);

    // 草地
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 12; c++) {
        gfx.fillStyle(this.shadeColor(0x5a8a4a, Math.floor(Math.random() * 10) - 5), 1);
        gfx.fillRect(c * 200, 580 + r * (this.worldHeight - 580) / 6, 200, (this.worldHeight - 580) / 6);
      }
    }
  }

  protected drawTerrain(): void {
    const gfx = this.add.graphics().setDepth(2);

    // 棕榈树
    const palms = [
      300, 450, 600, 480, 1000, 470, 1400, 450, 1700, 500, 2000, 460, 2200, 480,
      120, 520, 1880, 540, 900, 500, 1500, 520,
    ];
    for (let i = 0; i < palms.length; i += 2) {
      const x = palms[i], y = palms[i + 1];
      gfx.fillStyle(0x5a3a1a, 1);
      gfx.fillRect(x - 3, y + 10, 6, 28);
      gfx.fillStyle(0x4a8a3a, 1);
      gfx.fillCircle(x, y, 14);
      gfx.fillCircle(x - 10, y + 2, 10);
      gfx.fillCircle(x + 10, y + 2, 10);
    }

    // 礁石
    gfx.fillStyle(0x666666, 0.8);
    gfx.fillEllipse(180, 310, 30, 20);
    gfx.fillEllipse(2200, 300, 36, 18);
    gfx.fillEllipse(1200, 320, 22, 24);

    // 贝壳
    gfx.fillStyle(0xffffff, 0.5);
    for (let i = 0; i < 30; i++) {
      gfx.fillCircle(200 + Math.random() * 2000, 350 + Math.random() * 180, 2 + Math.random() * 2);
    }

    // 木板栈道
    gfx.fillStyle(0x9a8a6a, 1);
    for (let y = 650; y < 950; y += 16) {
      gfx.fillRect(1500, y, 8, 12);
      gfx.fillRect(420, y, 8, 12);
    }

    // 灯塔装饰
    const lg = this.add.graphics().setDepth(3);
    lg.fillStyle(0xffec27, 0.4);
    for (let i = 0; i < 8; i++) {
      lg.lineStyle(3, 0xffec27, 0.15);
      lg.lineBetween(2050 + Math.cos(i * Math.PI / 4) * 40, 280 + Math.sin(i * Math.PI / 4) * 40,
        2050 + Math.cos(i * Math.PI / 4 + 0.3) * 60, 280 + Math.sin(i * Math.PI / 4 + 0.3) * 60);
    }
  }
}

export default BeachScene;
