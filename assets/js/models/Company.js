class PlayerCompany {
  constructor(name, industry) {
    this.name = name;
    this.industry = industry;
    this.cash = 0;
    this.revenue = 0;
    this.profit = 0;
    this.valuation = 0;
    this.products = [];
    this.employees = [];
    this.rdLevel = 1;
    this.marketingLevel = 1;
    this.productionLevel = 1;
    this.reputation = 50;
    this.marketShare = 0;
    this.isPublic = false;
    this.shares = { founder: 100 };
    this.ipoPrice = 0;
    this.month = 0;
    this.incubating = null;
    this.competitors = [];
  }
  monthlyUpdate() {
    this.month++;
    const baseRevenue = this.products.length * 100000 * (1 + this.rdLevel * 0.1);
    const marketFactor = 1 + (this.marketingLevel - 1) * 0.05;
    const productionFactor = 1 + (this.productionLevel - 1) * 0.08;
    this.revenue = Math.floor(baseRevenue * marketFactor * productionFactor * (this.reputation / 100));
    const costs = this.employees.length * 8000 + this.cash * 0.02;
    this.profit = Math.floor(this.revenue - costs);
    this.cash += this.profit;
    this.valuation = Math.floor(this.revenue * 3 + this.cash * 0.5);
    if (this.reputation < 100) this.reputation += 0.5;
  }
  addProduct(name) { if (this.products.length < CONFIG.COMPANY.MAX_PRODUCTS) this.products.push({ name, revenue: 0 }); }
  hireEmployee(name, role) { this.employees.push({ name, role, salary: 8000, efficiency: 1 }); }
}
