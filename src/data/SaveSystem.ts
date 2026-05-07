import type { GameSave } from './types';
import { DEFAULT_SAVE } from './types';

const SAVE_KEY = 'shenhai_save';

export function saveGame(data: GameSave): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(SAVE_KEY, serialized);
    console.log('[SaveSystem] 游戏已保存');
  } catch (err) {
    console.error('[SaveSystem] 保存失败:', err);
  }
}

export function loadGame(): GameSave | null {
  try {
    const serialized = localStorage.getItem(SAVE_KEY);
    if (serialized === null) {
      console.log('[SaveSystem] 无存档');
      return null;
    }
    const data = JSON.parse(serialized) as GameSave;
    console.log('[SaveSystem] 存档已加载');
    return data;
  } catch (err) {
    console.error('[SaveSystem] 加载失败:', err);
    return null;
  }
}

export function hasSave(): boolean {
  return localStorage.getItem(SAVE_KEY) !== null;
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY);
  console.log('[SaveSystem] 存档已删除');
}

export function createNewSave(): GameSave {
  const newSave: GameSave = {
    ...DEFAULT_SAVE,
    timestamp: Date.now(),
  };
  saveGame(newSave);
  return newSave;
}
