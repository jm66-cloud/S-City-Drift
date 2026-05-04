class Property {
  constructor(name, type, price, area, district) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.area = area;
    this.district = district;
    this.value = price;
    this.loan = 0;
    this.monthlyPayment = 0;
    this.owned = false;
    this.purchasedAt = null;
  }
}
