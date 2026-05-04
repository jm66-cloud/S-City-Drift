class Order {
  constructor(stockCode, type, direction, price, quantity) {
    this.id = Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    this.stockCode = stockCode;
    this.type = type;
    this.direction = direction;
    this.price = price;
    this.quantity = quantity;
    this.filled = 0;
    this.status = 'pending';
    this.createdAt = Date.now();
    this.filledAt = null;
  }
}
