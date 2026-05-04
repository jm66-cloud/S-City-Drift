class Romance {
  constructor(charId, charName) {
    this.charId = charId;
    this.charName = charName;
    this.affection = 0;
    this.stage = 0;
    this.stages = ['陌生人', '认识', '朋友', '暧昧', '恋爱', '见家长', '订婚', '结婚'];
    this.dates = 0;
    this.gifts = 0;
    this.married = false;
    this.divorced = false;
    this.prenup = false;
    this.eventsTriggered = [];
  }
  get stageName() { return this.stages[this.stage] || '未知'; }
  get stageThreshold() {
    const thresholds = [0, 10, 25, 45, 65, 80, 90, 100];
    return thresholds[this.stage] || 100;
  }
  advanceStage() { if (this.stage < this.stages.length - 1) this.stage++; }
}
