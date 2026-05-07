import * as Phaser from 'phaser';
import { StockEngine } from '../core/StockEngine';
import type { Stock } from '../core/StockEngine';

interface StockButton {
  rect: Phaser.GameObjects.Rectangle;
  text: Phaser.GameObjects.Text;
  stock: Stock;
}

class ExchangeScene extends Phaser.Scene {
  private engine!: StockEngine;
  private escKey!: Phaser.Input.Keyboard.Key;
  private tickTimer!: Phaser.Time.TimerEvent;
  private stockList: StockButton[] = [];
  private selectedStock: Stock | null = null;
  private infoPanel!: Phaser.GameObjects.Container;
  private chartGfx!: Phaser.GameObjects.Graphics;
  private cashText!: Phaser.GameObjects.Text;
  private portfolioText!: Phaser.GameObjects.Text;
  private totalValueText!: Phaser.GameObjects.Text;
  private buyBtn!: Phaser.GameObjects.Rectangle;
  private sellBtn!: Phaser.GameObjects.Rectangle;
  private buyBtnText!: Phaser.GameObjects.Text;
  private sellBtnText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'ExchangeScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#2a2a3a');
    this.engine = new StockEngine();
    this.stockList = [];

    this.createUI();
    this.createStockList();
    this.createInfoPanel();
    this.createInput();

    this.tickTimer = this.time.addEvent({
      delay: 2000,
      callback: this.onTick,
      callbackScope: this,
      loop: true,
    });

    if (this.selectedStock) this.updateInfoPanel();
    this.updatePortfolio();
  }

  private createUI(): void {
    // 标题栏
    this.add.rectangle(640, 0, 1280, 50, 0x1a1a2e).setOrigin(0.5, 0).setDepth(10);
    this.add.text(20, 12, '📈 申海证券交易所', {
      fontFamily: 'sans-serif', fontSize: '22px', color: '#ffcc00',
    }).setDepth(11);

    // ESC 提示
    this.add.text(1260, 12, 'ESC 返回', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#888888',
    }).setOrigin(1, 0).setDepth(11);

    // 现金显示
    this.cashText = this.add.text(640, 12, '现金: ¥100,000', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#88ff88',
    }).setOrigin(0.5, 0).setDepth(11);

    // 时间
    this.add.text(640, 30, '交易时间: 09:00-15:00 | 每 2 秒刷新', {
      fontFamily: 'sans-serif', fontSize: '10px', color: '#666666',
    }).setOrigin(0.5, 0).setDepth(11);
  }

  private createStockList(): void {
    const startX = 20;
    const startY = 60;
    const spacing = 26;

    // 表头
    this.add.text(startX, startY, '代码      名称             价格      涨跌', {
      fontFamily: 'monospace', fontSize: '12px', color: '#aaaaaa',
    }).setDepth(11);

    this.engine.stocks.forEach((stock, index) => {
      const y = startY + 20 + index * spacing;
      const rect = this.add.rectangle(startX, y, 340, 22, 0x333344).setOrigin(0, 0).setDepth(11);
      rect.setStrokeStyle(1, 0x555566);

      const text = this.add.text(startX + 6, y + 4, this.formatStockRow(stock), {
        fontFamily: 'monospace', fontSize: '12px', color: '#ffffff',
      }).setDepth(12);

      rect.setInteractive({ useHandCursor: true });
      rect.on('pointerover', () => rect.setFillStyle(0x444466));
      rect.on('pointerout', () => rect.setFillStyle(this.selectedStock?.code === stock.code ? 0x445544 : 0x333344));
      rect.on('pointerdown', () => this.selectStock(stock));

      this.stockList.push({ rect, text, stock });
    });
  }

  private createInfoPanel(): void {
    const px = 380;
    const py = 60;

    this.add.rectangle(px, py, 880, 200, 0x1a1a2e).setOrigin(0, 0).setDepth(11).setStrokeStyle(1, 0x444466);

    this.add.text(px + 10, py + 5, '点击左侧股票查看详情', {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#888888',
    }).setDepth(12);

    // K线图占位
    this.chartGfx = this.add.graphics().setDepth(12);

    // 操作按钮
    this.buyBtn = this.add.rectangle(px + 200, py + 170, 100, 30, 0x226622).setDepth(12);
    this.buyBtn.setStrokeStyle(1, 0x44aa44);
    this.buyBtnText = this.add.text(px + 200, py + 170, '买入(B)', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#88ff88',
    }).setOrigin(0.5, 0.5).setDepth(13);
    this.buyBtn.setInteractive({ useHandCursor: true });
    this.buyBtn.on('pointerdown', () => this.tradeBuy());

    this.sellBtn = this.add.rectangle(px + 320, py + 170, 100, 30, 0x662222).setDepth(12);
    this.sellBtn.setStrokeStyle(1, 0xaa4444);
    this.sellBtnText = this.add.text(px + 320, py + 170, '卖出(S)', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ff8888',
    }).setOrigin(0.5, 0.5).setDepth(13);
    this.sellBtn.setInteractive({ useHandCursor: true });
    this.sellBtn.on('pointerdown', () => this.tradeSell());

    // 持仓总览
    this.portfolioText = this.add.text(px + 10, py + 180, '', {
      fontFamily: 'sans-serif', fontSize: '12px', color: '#aaaacc',
    }).setDepth(12);

    this.totalValueText = this.add.text(px + 450, py + 5, '', {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#ffcc00',
    }).setDepth(12);
  }

  private createInput(): void {
    this.escKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.input.keyboard!.on('keydown-B', () => { if (this.selectedStock) this.tradeBuy(); });
    this.input.keyboard!.on('keydown-S', () => { if (this.selectedStock) this.tradeSell(); });
  }

  private selectStock(stock: Stock): void {
    this.selectedStock = stock;
    this.stockList.forEach(({ rect, text }) => {
      rect.setFillStyle(text.name === stock.name ? 0x445522 : 0x333344);
    });
    this.updateInfoPanel();
  }

  private updateInfoPanel(): void {
    if (!this.selectedStock) return;

    const stock = this.selectedStock;
    const px = 380;
    const py = 60;

    // 清除旧详情
    this.children.list
      .filter(c => (c as Phaser.GameObjects.Text).text?.startsWith?.('代码:'))
      .forEach(c => c.destroy());

    // 详情文字
    const pos = this.engine.getPosition(stock.code);
    const infoLines = [
      `代码: ${stock.code}  |  名称: ${stock.name}`,
      `行业: ${stock.sector}  |  价格: ¥${stock.price.toFixed(2)}`,
      pos ? `持仓: ${pos.shares} 股 | 成本: ¥${pos.avgCost.toFixed(2)}` : '未持有该股票',
    ];

    infoLines.forEach((line, i) => {
      this.add.text(px + 10, py + 5 + i * 20, line, {
        fontFamily: 'monospace', fontSize: '12px', color: '#cccccc',
      }).setDepth(13);
    });

    // 绘制简单K线图
    this.drawMiniChart(px + 10, py + 75, 860, 80, stock.code);

    // 更新操作按钮
    this.buyBtn.setVisible(true);
    this.sellBtn.setVisible(!!pos);
    this.buyBtnText.setVisible(true);
    this.sellBtnText.setVisible(!!pos);
  }

  private drawMiniChart(x: number, y: number, w: number, h: number, code: string): void {
    this.chartGfx.clear();
    const history = this.engine.history.get(code);
    if (!history || history.length < 2) return;

    const prices = history.map(p => p.price);
    const minP = Math.min(...prices) * 0.99;
    const maxP = Math.max(...prices) * 1.01;
    const range = maxP - minP || 1;

    // 背景
    this.chartGfx.fillStyle(0x111122, 1);
    this.chartGfx.fillRect(x, y, w, h);
    this.chartGfx.lineStyle(1, 0x333344);
    this.chartGfx.strokeRect(x, y, w, h);

    // 价格线
    this.chartGfx.lineStyle(2, 0x44cc44);
    this.chartGfx.beginPath();
    history.forEach((pt, i) => {
      const px = x + (i / (history.length - 1)) * w;
      const py = y + h - ((pt.price - minP) / range) * h;
      if (i === 0) this.chartGfx.moveTo(px, py);
      else this.chartGfx.lineTo(px, py);
    });
    this.chartGfx.strokePath();

    // 当前价格标签
    this.chartGfx.fillStyle(0x44cc44, 1);
    this.chartGfx.fillCircle(x + w - 5, y + h - ((prices[prices.length - 1] - minP) / range) * h, 4);
  }

  private onTick(): void {
    this.engine.tick(10, 0);
    this.updateAllRows();
    if (this.selectedStock) this.updateInfoPanel();
    this.updatePortfolio();
    this.updateCash();
  }

  private updateAllRows(): void {
    this.stockList.forEach(({ text, stock }) => {
      text.setText(this.formatStockRow(stock));
    });
  }

  private updatePortfolio(): void {
    const value = this.engine.getPortfolioValue();
    const profit = this.engine.getTotalProfit();
    const color = profit >= 0 ? '#88ff88' : '#ff8888';

    this.portfolioText.setText(`持仓总市值: ¥${value.toLocaleString()}  |  浮动盈亏: ${color === '#88ff88' ? '+' : ''}¥${profit.toLocaleString()}`);

    this.totalValueText.setText(`💰 总资产: ¥${(100000 + value).toLocaleString()}`);
  }

  private updateCash(): void {
    this.cashText.setText(`现金: ¥100,000`);
  }

  private tradeBuy(): void {
    if (!this.selectedStock) return;
    const result = this.engine.buy(this.selectedStock.code, 100, 100000);
    this.showTradeResult(result.message);
    this.updateInfoPanel();
    this.updatePortfolio();
  }

  private tradeSell(): void {
    if (!this.selectedStock) return;
    const pos = this.engine.getPosition(this.selectedStock.code);
    if (!pos) return;
    const result = this.engine.sell(this.selectedStock.code, Math.min(100, pos.shares));
    this.showTradeResult(`${result.message} | 盈亏: ¥${result.profit}`);
    this.updateInfoPanel();
    this.updatePortfolio();
  }

  private showTradeResult(msg: string): void {
    const popup = this.add.text(640, 600, msg, {
      fontFamily: 'sans-serif', fontSize: '16px', color: '#ffff88',
      backgroundColor: '#000000cc', padding: { x: 12, y: 6 },
    }).setOrigin(0.5, 0.5).setDepth(20);

    this.time.delayedCall(1500, () => popup.destroy());
  }

  private formatStockRow(stock: Stock): string {
    const prevPrice = this.engine.history.get(stock.code)?.at(-2)?.price ?? stock.price;
    const change = stock.price - prevPrice;
    const sign = change >= 0 ? '+' : '';
    const changeStr = `${sign}${change.toFixed(2)}`;
    return `${stock.code}  ${stock.name.padEnd(6, '　')}  ${stock.price.toFixed(2).padStart(8)}  ${changeStr.padStart(8)}`;
  }

  update(): void {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.scene.start('CityScene');
    }
  }
}

export default ExchangeScene;
