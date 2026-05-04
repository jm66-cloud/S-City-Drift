const Random = {
  int(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },
  float(min, max) { return Math.random() * (max - min) + min; },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  normal(mean = 0, std = 1) {
    const u1 = Math.random(), u2 = Math.random();
    return mean + std * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  },
  chance(probability) { return Math.random() < probability; },
  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  },
  clampedNormal(mean, std, min, max) {
    let v;
    do { v = this.normal(mean, std); } while (v < min || v > max);
    return v;
  },
  weightedPick(items, weightFn) {
    const weights = items.map(weightFn);
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) { r -= weights[i]; if (r <= 0) return items[i]; }
    return items[items.length - 1];
  },
};
