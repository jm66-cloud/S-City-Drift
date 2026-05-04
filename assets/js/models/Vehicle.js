class Vehicle {
  constructor(name, type, price, comfort, speed) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.value = price;
    this.comfort = comfort;
    this.speed = speed;
    this.maintenanceCost = price * 0.01;
    this.condition = 100;
    this.owned = false;
  }
}
