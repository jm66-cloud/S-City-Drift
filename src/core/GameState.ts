import type { AttributeSave, GameSave, SkillSave } from '../data/types';
import { createNewSave, hasSave, loadGame, saveGame } from '../data/SaveSystem';

export class GameState {
  public save: GameSave;

  constructor() {
    this.save = hasSave() ? loadGame()! : createNewSave();
  }

  saveState(): void {
    saveGame(this.save);
  }

  tickTime(minutes: number): boolean {
    this.save.time.minute += minutes;
    while (this.save.time.minute >= 60) {
      this.save.time.minute -= 60;
      this.save.time.hour += 1;
    }
    if (this.save.time.hour >= 24) {
      this.save.time.hour = 7;
      this.save.time.day += 1;
      return true; // 新的一天
    }
    return false;
  }

  getAttributes(): AttributeSave {
    return { ...this.save.attributes };
  }

  getSkills(): SkillSave {
    return { ...this.save.skills };
  }

  modifyHunger(delta: number): void {
    this.save.attributes.hunger = Math.min(100, Math.max(0, this.save.attributes.hunger + delta));
  }

  modifyEnergy(delta: number): void {
    this.save.attributes.energy = Math.min(100, Math.max(0, this.save.attributes.energy + delta));
  }

  modifyStress(delta: number): void {
    this.save.attributes.stress = Math.min(100, Math.max(0, this.save.attributes.stress + delta));
  }

  modifyMoney(amount: number): void {
    this.save.money.cash = Math.max(0, this.save.money.cash + amount);
  }

  addToInventory(itemId: string): void {
    this.save.inventory.push(itemId);
  }

  removeFromInventory(itemId: string): void {
    const index = this.save.inventory.indexOf(itemId);
    if (index !== -1) {
      this.save.inventory.splice(index, 1);
    }
  }
}
