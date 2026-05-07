export interface ShopItem {
  id: string;
  name: string;
  category: string;
  price: number;
  hungerRestore: number;
  energyRestore: number;
  stressRelief: number;
  icon: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  { id: 'bread', name: '🍞 面包', category: '食物', price: 15, hungerRestore: 25, energyRestore: 0, stressRelief: 0, icon: 'genericItem_color_010' },
  { id: 'cola', name: '🥤 可乐', category: '饮品', price: 20, hungerRestore: 10, energyRestore: 10, stressRelief: 5, icon: 'genericItem_color_020' },
  { id: 'noodle', name: '🍜 泡面', category: '食物', price: 30, hungerRestore: 50, energyRestore: 0, stressRelief: -5, icon: 'genericItem_color_025' },
  { id: 'egg', name: '🥚 鸡蛋', category: '食材', price: 5, hungerRestore: 5, energyRestore: 0, stressRelief: 0, icon: 'genericItem_color_030' },
  { id: 'rice', name: '🍚 米饭', category: '食材', price: 10, hungerRestore: 30, energyRestore: 0, stressRelief: 0, icon: 'genericItem_color_035' },
  { id: 'tomato', name: '🍅 番茄', category: '食材', price: 8, hungerRestore: 8, energyRestore: 5, stressRelief: 0, icon: 'genericItem_color_040' },
  { id: 'coffee', name: '☕ 咖啡', category: '饮品', price: 80, hungerRestore: 0, energyRestore: 20, stressRelief: 10, icon: 'genericItem_color_045' },
  { id: 'cake', name: '🍰 蛋糕', category: '甜品', price: 35, hungerRestore: 20, energyRestore: 0, stressRelief: 15, icon: 'genericItem_color_050' },
  { id: 'medicine', name: '💊 感冒药', category: '药品', price: 50, hungerRestore: 0, energyRestore: 10, stressRelief: 0, icon: 'genericItem_color_060' },
  { id: 'fish', name: '🐟 鲜鱼', category: '食材', price: 25, hungerRestore: 40, energyRestore: 5, stressRelief: 0, icon: 'genericItem_color_070' },
];

export interface CookingRecipe {
  id: string;
  name: string;
  ingredients: string[];
  hungerRestore: number;
  energyRestore: number;
  stressRelief: number;
}

export const COOKING_RECIPES: CookingRecipe[] = [
  { id: 'noodle_cooked', name: '🍜 煮泡面', ingredients: ['noodle'], hungerRestore: 55, energyRestore: 0, stressRelief: 0 },
  { id: 'fried_egg', name: '🍳 煎蛋', ingredients: ['egg'], hungerRestore: 30, energyRestore: 5, stressRelief: 0 },
  { id: 'rice_plain', name: '🍚 白米饭', ingredients: ['rice'], hungerRestore: 35, energyRestore: 0, stressRelief: 0 },
  { id: 'tomato_egg', name: '🥘 番茄炒蛋', ingredients: ['egg', 'tomato'], hungerRestore: 60, energyRestore: 10, stressRelief: 5 },
  { id: 'fish_rice', name: '🐟 鱼饭', ingredients: ['rice', 'fish'], hungerRestore: 70, energyRestore: 15, stressRelief: 5 },
];
