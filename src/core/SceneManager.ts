export interface SceneTransition {
  from: string;
  to: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export class SceneManager {
  private transitions: Map<string, SceneTransition[]>;

  constructor() {
    this.transitions = new Map();
    this.registerTransitions();
  }

  private registerTransitions(): void {
    this.transitions.set('CityScene', [
      { from: 'CityScene', to: 'ApartmentScene', fromX: 200, fromY: 200, toX: 640, toY: 600 },
      { from: 'CityScene', to: 'ExchangeScene', fromX: 640, fromY: 200, toX: 640, toY: 500 },
      { from: 'CityScene', to: 'StoreScene', fromX: 960, fromY: 200, toX: 640, toY: 500 },
    ]);

    this.transitions.set('ApartmentScene', [
      { from: 'ApartmentScene', to: 'CityScene', fromX: 640, fromY: 650, toX: 200, toY: 250 },
    ]);

    this.transitions.set('ExchangeScene', [
      { from: 'ExchangeScene', to: 'CityScene', fromX: 640, fromY: 650, toX: 640, toY: 250 },
    ]);

    this.transitions.set('StoreScene', [
      { from: 'StoreScene', to: 'CityScene', fromX: 640, fromY: 650, toX: 960, toY: 250 },
    ]);
  }

  getTransition(currentScene: string): SceneTransition[] {
    return this.transitions.get(currentScene) || [];
  }
}

export const sceneManager = new SceneManager();
