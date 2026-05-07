import * as Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import CityScene from './scenes/CityScene';
import ApartmentScene from './scenes/ApartmentScene';
import ExchangeScene from './scenes/ExchangeScene';
import StoreScene from './scenes/StoreScene';
import OfficeScene from './scenes/OfficeScene';
import CafeScene from './scenes/CafeScene';
import BankScene from './scenes/BankScene';
import HospitalScene from './scenes/HospitalScene';
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
  scene: [BootScene, CityScene, ApartmentScene, ExchangeScene, StoreScene, OfficeScene, CafeScene, BankScene, HospitalScene, PauseScene],
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

console.log('[main] 申海漂 v0.0.3 已启动');
