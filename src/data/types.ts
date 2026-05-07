export interface PlayerSave {
  name: string;
  appearance: string;
  hairstyle: string;
  hairColor: string;
}

export interface AttributeSave {
  hunger: number;
  energy: number;
  stress: number;
}

export interface SkillSave {
  stock: number;
  management: number;
  social: number;
  fishing: number;
}

export interface MoneySave {
  cash: number;
  bank: number;
  stockAccount: number;
}

export interface HousingSave {
  level: number;
  furniture: { id: string; x: number; y: number; rotation: number }[];
  roomScore: number;
}

export interface TimeSave {
  day: number;
  hour: number;
  minute: number;
  season: string;
  weather: string;
}

export interface GameSave {
  version: string;
  timestamp: number;
  player: PlayerSave;
  attributes: AttributeSave;
  skills: SkillSave;
  money: MoneySave;
  housing: HousingSave;
  time: TimeSave;
  inventory: string[];
  npcFriendship: Record<string, number>;
  unlockedRecipes: string[];
  unlockedClothes: string[];
}

export const DEFAULT_SAVE: GameSave = {
  version: '0.0.1',
  timestamp: Date.now(),
  player: {
    name: '阿漂',
    appearance: '男装A',
    hairstyle: '短发',
    hairColor: '黑色',
  },
  attributes: {
    hunger: 80,
    energy: 80,
    stress: 10,
  },
  skills: {
    stock: 10,
    management: 5,
    social: 10,
    fishing: 0,
  },
  money: {
    cash: 100000,
    bank: 0,
    stockAccount: 0,
  },
  housing: {
    level: 1,
    furniture: [],
    roomScore: 0,
  },
  time: {
    day: 1,
    hour: 7,
    minute: 0,
    season: 'spring',
    weather: 'sunny',
  },
  inventory: [],
  npcFriendship: {},
  unlockedRecipes: ['泡面', '煎蛋', '白米饭'],
  unlockedClothes: ['男装A'],
};
