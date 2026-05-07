import * as Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import CityScene from './scenes/CityScene';
import ApartmentScene from './scenes/ApartmentScene';
import ExchangeScene from './scenes/ExchangeScene';
import StoreScene from './scenes/StoreScene';
import PauseScene from './scenes/PauseScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#222034',
  pixelArt: true,
  roundPixels: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [BootScene, CityScene, ApartmentScene, ExchangeScene, StoreScene, PauseScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  audio: {
    disableWebAudio: false,
  },
};

new Phaser.Game(config);

console.log('[main] 申海漂 v0.0.1 已启动');
