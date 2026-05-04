class Crime {
  constructor(type, amount, description) {
    this.id = Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    this.date = Date.now();
    this.type = type;
    this.amount = amount;
    this.description = description;
    this.risk = 0;
    this.discovered = false;
    this.settled = false;
  }
}
