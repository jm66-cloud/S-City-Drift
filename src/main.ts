import * as Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import SuburbScene from './scenes/SuburbScene';
import DowntownScene from './scenes/DowntownScene';
import BeachScene from './scenes/BeachScene';
import CommercialScene from './scenes/CommercialScene';
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
  scene: [
    BootScene,
    TitleScene,
    SuburbScene,
    DowntownScene,
    BeachScene,
    CommercialScene,
    ApartmentScene,
    ExchangeScene,
    StoreScene,
    OfficeScene,
    CafeScene,
    BankScene,
    HospitalScene,
    PauseScene,
  ],
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

console.log('[main] 申海漂 v0.2.0 已启动');
