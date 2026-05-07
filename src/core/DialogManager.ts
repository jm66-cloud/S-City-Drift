import * as Phaser from 'phaser';
import { hasSave, loadGame, createNewSave } from '../data/SaveSystem';

const SAVE_KEY = 'shenhai_npc_friendship';

export interface FriendshipStore {
  [npcId: string]: { level: number; giftsGiven: number };
}

export function loadFriendship(): FriendshipStore {
  try {
    const d = localStorage.getItem(SAVE_KEY);
    return d ? JSON.parse(d) : {};
  } catch { return {}; }
}

function saveFriendship(fs: FriendshipStore): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(fs));
}

export class DialogManager {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private friendship: FriendshipStore;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.friendship = loadFriendship();
  }

  getLevel(npcId: string): number {
    return this.friendship[npcId]?.level ?? 0;
  }

  addFriendship(npcId: string, amount: number): void {
    const entry = this.friendship[npcId] || { level: 0, giftsGiven: 0 };
    entry.level = Math.min(100, Math.max(0, entry.level + amount));
    entry.giftsGiven += amount > 5 ? 1 : 0;
    this.friendship[npcId] = entry;
    saveFriendship(this.friendship);
  }

  showDialog(npcName: string, npcRole: string, npcId: string, greeting: string, onClose?: () => void): void {
    this.hideDialog();

    if (this.scene.scene.isPaused) return;

    this.scene.scene.pause();
    const returnScene = this.scene.scene.key;

    this.container = this.scene.add.container(0, 0).setDepth(200).setScrollFactor(0);

    // 半透明背景
    const bg = this.scene.add.rectangle(640, 360, 1280, 720, 0x000000, 0.4).setInteractive();
    this.container.add(bg);

    // 对话框
    const box = this.scene.add.rectangle(640, 500, 700, 300, 0x222244).setStrokeStyle(3, 0x6666aa);
    this.container.add(box);

    // NPC 头像
    const avatar = this.scene.add.rectangle(300, 400, 60, 70, this.npcColor(npcId)).setStrokeStyle(1, 0xffffff);
    this.container.add(avatar);

    // 姓名 + 角色
    this.container.add(this.scene.add.text(340, 370, `${npcName}`, {
      fontFamily: 'sans-serif', fontSize: '20px', color: '#ffcc00',
    }));
    this.container.add(this.scene.add.text(340, 395, npcRole, {
      fontFamily: 'sans-serif', fontSize: '14px', color: '#aaaacc',
    }));

    // 好感度
    const level = this.getLevel(npcId);
    const hearts = '❤️'.repeat(Math.floor(level / 20));
    this.container.add(this.scene.add.text(340, 418, `好感: ${hearts || '🤍'} Lv${level}`, {
      fontFamily: 'sans-serif', fontSize: '13px', color: '#ff8888',
    }));

    // 对话内容
    this.container.add(this.scene.add.text(300, 460, `"${greeting}"`, {
      fontFamily: 'sans-serif', fontSize: '15px', color: '#ffffff',
      wordWrap: { width: 500 },
    }));

    // 选项按钮
    const options = [
      { label: '💬 继续聊天', y: 550, fn: () => { this.talkMore(npcName, npcId, greeting); } },
      { label: '🎁 赠送礼物', y: 590, fn: () => { this.giveGift(npcName, npcId); } },
      { label: '👋 告别', y: 630, fn: () => { this.hideDialog(onClose); } },
    ];

    options.forEach(({ label, y }) => {
      const btn = this.scene.add.rectangle(480, y, 240, 32, 0x333366).setStrokeStyle(1, 0x6666aa).setInteractive({ useHandCursor: true });
      btn.on('pointerover', () => btn.setFillStyle(0x444488));
      btn.on('pointerout', () => btn.setFillStyle(0x333366));
      btn.on('pointerdown', () => { this.hideDialog(); fn(); });
      this.container.add(btn);
      this.container.add(this.scene.add.text(480, y, label, {
        fontFamily: 'sans-serif', fontSize: '15px', color: '#ffffff',
      }).setOrigin(0.5));
    });

    // ESC 关闭
    this.scene.input.keyboard!.once('keydown-ESC', () => {
      this.hideDialog(onClose);
    });
  }

  private talkMore(npcName: string, npcId: string, prevGreeting: string): void {
    this.addFriendship(npcId, 3);
    const moreGreetings = [
      '还有什么想聊的？',
      '最近天气不错呢。',
      '我听说了一些有趣的事情...',
      '你最近过得怎么样？',
    ];
    const next = moreGreetings[Math.floor(Math.random() * moreGreetings.length)];
    this.showDialog(npcName, '', npcId, next);
  }

  private giveGift(npcName: string, npcId: string): void {
    this.addFriendship(npcId, 15);
    this.showDialog(npcName, '', npcId, '谢谢你！这是我收到的最好的礼物！（好感+15）');
  }

  hideDialog(onClose?: () => void): void {
    if (this.container) {
      this.container.destroy();
      this.container = null!;
    }
    if (this.scene.scene.isPaused) {
      this.scene.scene.resume();
    }
    if (onClose) onClose();
  }

  private npcColor(id: string): number {
    const map: Record<string, number> = {
      'wang_ayi': 0xffaaaa,
      'a_qiang': 0xaaaaff,
      'xiao_lin': 0xffccaa,
      'chen_ya': 0xddaaaa,
      'lao_zhang': 0xccccaa,
      'zhao_jingguan': 0xaaaacc,
    };
    return map[id] || 0x888888;
  }
}
