import stockData from '../data/stocks.json' with { type: 'json' };

export interface Stock {
  code: string;
  name: string;
  sector: string;
  price: number;
  volatility: number;
  trend: number;
}

export interface PricePoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Position {
  code: string;
  shares: number;
  avgCost: number;
}

export class StockEngine {
  public stocks: Stock[];
  public positions: Position[] = [];
  public history: Map<string, PricePoint[]> = new Map();

  constructor() {
    this.stocks = stockData.stocks.map(s => ({ ...s }));
    this.stocks.forEach(s => {
      const p = s.price;
      this.history.set(s.code, [{ time: 0, open: p, high: p, low: p, close: p }]);
    });
  }

  tick(hour: number, minute: number): Map<string, number> {
    const changes = new Map<string, number>();
    this.stocks.forEach(stock => {
      const prevClose = stock.price;
      const baseChange = (Math.random() - 0.5) * stock.volatility * 2;
      const trendEffect = stock.trend * 0.01;
      const totalChange = baseChange + trendEffect;
      stock.price = Math.max(0.01, +(stock.price * (1 + totalChange)).toFixed(2));
      changes.set(stock.code, stock.price);

      const hist = this.history.get(stock.code)!;
      if (hist.length > 48) hist.shift();

      const open = prevClose;
      const close = stock.price;
      const wick = Math.abs(open - close) * 0.3;
      hist.push({
        time: hour * 60 + minute,
        open,
        high: Math.max(open, close) + Math.random() * wick,
        low: Math.min(open, close) - Math.random() * wick,
        close,
      });
    });
    return changes;
  }

  buy(code: string, shares: number, cash: number): { success: boolean; cost: number; message: string } {
    const stock = this.stocks.find(s => s.code === code);
    if (!stock) return { success: false, cost: 0, message: '股票不存在' };

    const rawCost = stock.price * shares;
    const commission = Math.max(5, rawCost * stockData.commission);
    const totalCost = rawCost + commission;

    if (totalCost > cash) return { success: false, cost: 0, message: '现金不足' };

    const position = this.positions.find(p => p.code === code);
    if (position) {
      const totalShares = position.shares + shares;
      position.avgCost = +((position.avgCost * position.shares + stock.price * shares) / totalShares).toFixed(2);
      position.shares = totalShares;
    } else {
      this.positions.push({ code, shares, avgCost: stock.price });
    }

    return { success: true, cost: totalCost, message: '买入成功' };
  }

  sell(code: string, shares: number): { success: boolean; revenue: number; profit: number; message: string } {
    const position = this.positions.find(p => p.code === code);
    if (!position) return { success: false, revenue: 0, profit: 0, message: '未持有该股票' };
    if (shares > position.shares) return { success: false, revenue: 0, profit: 0, message: '卖出数量超过持仓' };

    const stock = this.stocks.find(s => s.code === code)!;
    const rawRevenue = stock.price * shares;
    const commission = Math.max(5, rawRevenue * stockData.commission);
    const revenue = rawRevenue - commission;
    const profit = +(revenue - position.avgCost * shares).toFixed(2);

    position.shares -= shares;
    if (position.shares <= 0) {
      this.positions = this.positions.filter(p => p.code !== code);
    }

    return { success: true, revenue, profit, message: '卖出成功' };
  }

  getStock(code: string): Stock | undefined {
    return this.stocks.find(s => s.code === code);
  }

  getPosition(code: string): Position | undefined {
    return this.positions.find(p => p.code === code);
  }

  getPortfolioValue(): number {
    return +this.positions.reduce((sum, pos) => {
      const stock = this.stocks.find(s => s.code === pos.code);
      return sum + (stock ? stock.price * pos.shares : 0);
    }, 0).toFixed(2);
  }

  getTotalProfit(): number {
    return +this.positions.reduce((sum, pos) => {
      const stock = this.stocks.find(s => s.code === pos.code);
      return sum + (stock ? (stock.price - pos.avgCost) * pos.shares : 0);
    }, 0).toFixed(2);
  }
}
