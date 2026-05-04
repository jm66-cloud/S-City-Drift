const ChatApp = {
  currentContact: null,
  currentTab: 'chat',

  open(bodyEl) {
    bodyEl.innerHTML = '<div class="chat-app">'
      + '<div style="display:flex;border-bottom:1px solid #000;">'
      + '<div class="nav-item active" data-tab="chat" onclick="ChatApp.switchTab(\'chat\')" style="padding:4px 12px;cursor:pointer;">💬 聊天</div>'
      + '<div class="nav-item" data-tab="moments" onclick="ChatApp.switchTab(\'moments\')" style="padding:4px 12px;cursor:pointer;">📸 朋友圈</div>'
      + '</div>'
      + '<div id="chat-body" style="display:flex;flex:1;min-height:0;">'
      + '<div class="chat-contact-list" id="chat-contact-list"></div>'
      + '<div class="chat-main">'
      + '<div class="chat-messages" id="chat-messages"><div style="padding:12px;text-align:center;color:#808080;">选择一个联系人开始聊天</div></div>'
      + '<div class="chat-input-area">'
      + '<input type="text" id="chat-input" placeholder="输入消息..." onkeydown="if(event.key===\'Enter\') ChatApp.send()">'
      + '<button onclick="ChatApp.send()">发送</button>'
      + '</div></div></div></div>';
    this.renderContactList();
  },

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('#chat-body .nav-item').forEach(n => n.classList.remove('active'));
    document.querySelector('#chat-body .nav-item[data-tab="' + tab + '"]')?.classList.add('active');
    const body = document.getElementById('chat-body');
    if (!body) return;
    if (tab === 'moments') {
      this.renderMoments();
    } else {
      body.innerHTML = '<div class="chat-contact-list" id="chat-contact-list"></div>'
        + '<div class="chat-main">'
        + '<div class="chat-messages" id="chat-messages"><div style="padding:12px;text-align:center;color:#808080;">选择一个联系人开始聊天</div></div>'
        + '<div class="chat-input-area">'
        + '<input type="text" id="chat-input" placeholder="输入消息..." onkeydown="if(event.key===\'Enter\') ChatApp.send()">'
        + '<button onclick="ChatApp.send()">发送</button>'
        + '</div></div>';
      this.renderContactList();
    }
  },

  renderMoments() {
    const body = document.getElementById('chat-body');
    if (!body) return;
    const moments = SocialFeed.getFeed();
    body.innerHTML = '<div style="flex:1;overflow-y:auto;padding:8px;">'
      + '<h4 style="color:var(--text-bright);margin-bottom:8px;">📸 朋友圈</h4>'
      + (moments.length === 0 ? '<div style="color:#808080;text-align:center;padding:20px;">暂无动态</div>'
        : moments.map(m => '<div style="border:1px solid #333;padding:8px;margin-bottom:6px;">'
          + '<div><b>' + m.author + '</b> <span style="font-size:11px;color:#808080;">' + m.time + '</span></div>'
          + '<div style="margin:4px 0;font-size:13px;">' + m.content + '</div>'
          + (m.image ? '<div style="font-size:24px;">' + m.image + '</div>' : '')
          + '<div style="display:flex;gap:8px;font-size:12px;color:#808080;">'
          + '<span style="cursor:pointer;" onclick="SocialFeed.like(' + m.id + ')">' + (m.liked ? '❤️ ' : '👍 ') + (m.likes || 0) + '</span>'
          + '<span>💬 ' + (m.comments || 0) + '</span>'
          + '</div></div>').join(''))
      + '</div>';
  },

  renderContactList() {
    const el = document.getElementById('chat-contact-list');
    if (!el) return;
    el.innerHTML = '<div style="padding:4px;font-size:11px;color:#808080;">联系人</div>'
      + CONTACTS_DATA.filter(c => c.addDay <= TimeEngine.day).map(c => '<div class="chat-contact-item" onclick="ChatApp.selectContact(\'' + c.id + '\')">'
        + c.avatar + ' ' + c.name + '</div>').join('');
  },

  selectContact(id) {
    this.currentContact = id;
    document.querySelectorAll('.chat-contact-item').forEach(el => el.classList.remove('active'));
    const items = document.querySelectorAll('.chat-contact-item');
    const idx = CONTACTS_DATA.findIndex(c => c.id === id);
    if (items[idx]) items[idx].classList.add('active');
    const msgs = document.getElementById('chat-messages');
    if (msgs) {
      const contact = CONTACTS_DATA.find(c => c.id === id);
      msgs.innerHTML = '<div style="text-align:center;color:#808080;font-size:12px;padding:8px;">开始和' + (contact?.name || id) + '聊天</div>';
    }
  },

  async send() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;
    const msg = input.value.trim();
    input.value = '';
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;
    msgs.innerHTML += '<div class="chat-message self"><div>' + msg + '</div><div class="msg-time">' + TimeEngine.timeStr + '</div></div>';
    SoundEngine.play('chat');
    try {
      const contact = CONTACTS_DATA.find(c => c.id === this.currentContact);
      let reply;
      if (contact && contact.id === 'aqiang') {
        const guessBtn = '<button onclick="ChatApp.playGuess()" style="font-size:12px;padding:2px 8px;margin-top:4px;">🎲 猜涨跌</button>';
        reply = Random.pick(['今天科技股好猛啊', '我被套牢了兄弟', '听说要重组，冲不冲？', '最近行情不错啊', '你买了啥？', '要不要来猜个涨跌？' + guessBtn]);
      } else {
        reply = await AIEngine.chat(contact?.name || this.currentContact, msg, []);
      }
      msgs.innerHTML += '<div class="chat-message other"><div>' + reply + '</div><div class="msg-time">' + TimeEngine.timeStr + '</div></div>';
      SocialFeed.addMoment(this.currentContact, reply);
    } catch {
      msgs.innerHTML += '<div class="chat-message other"><div>...（接收失败）</div><div class="msg-time">' + TimeEngine.timeStr + '</div></div>';
    }
    msgs.scrollTop = msgs.scrollHeight;
  },

  playGuess() {
    if (Game.character.guessDailyCount >= CONFIG.MINIGAME.GUESS_DAILY_LIMIT) {
      Game.showToast('今天猜涨跌次数已用完', 'warn');
      return;
    }
    Game.character.guessDailyCount++;
    const stock = Random.pick(StockEngine.stocks);
    const direction = Random.chance(0.5) ? 'up' : 'down';
    Modal.show('猜涨跌 - ' + (stock?.name || '未知'), stock?.name + '下一分钟会涨还是跌？\n赌注: ¥' + CONFIG.MINIGAME.GUESS_BET,
      [{ text: '📈 涨', action: () => { GuessResult(direction === 'up'); } }, { text: '📉 跌', action: () => { GuessResult(direction === 'down'); } }]);
    function GuessResult(win) {
      const char = Game.character;
      if (win) { char.cash += CONFIG.MINIGAME.GUESS_WIN; Game.showToast('猜对了！赢得¥' + CONFIG.MINIGAME.GUESS_WIN, 'success'); SoundEngine.play('money'); }
      else { char.cash -= CONFIG.MINIGAME.GUESS_BET; Game.showToast('猜错了，损失¥' + CONFIG.MINIGAME.GUESS_BET, 'error'); SoundEngine.play('error'); }
      UI.updateStatusBar();
    }
  },
};

const SocialFeed = {
  moments: [],
  nextId: 1,

  getFeed() { return [...this.moments].slice(-20).reverse(); },

  addMoment(contactId, content) {
    const contact = CONTACTS_DATA.find(c => c.id === contactId);
    if (!contact) return;
    this.moments.push({
      id: this.nextId++,
      author: contact.name,
      avatar: contact.avatar,
      content: content,
      time: TimeEngine.timeStr,
      likes: Random.int(0, 5),
      comments: Random.int(0, 3),
      liked: false,
      image: Random.chance(0.3) ? Random.pick(['☕', '🍜', '📊', '🌇', '🐱']) : null,
    });
  },

  addSystemMoment() {
    if (!Game.character) return;
    const templates = [
      { author: '阿强', content: Random.pick(['今天又吃面了...', '大盘涨了！开心！', '被套了，难受', '中了个新股！']) },
      { author: '王阿姨', content: Random.pick(['家里水管又爆了，愁人', '今天天气不错', '房租该交了记得啊']) },
      { author: '小李', content: Random.pick(['晚上开黑？', '外卖到了，真香', '又加班，累死了', '新买的游戏到了']) },
    ];
    const tpl = Random.pick(templates);
    this.moments.push({
      id: this.nextId++,
      author: tpl.author,
      content: tpl.content,
      time: TimeEngine.timeStr,
      likes: Random.int(1, 8),
      comments: Random.int(0, 5),
      liked: false,
      image: Random.chance(0.4) ? Random.pick(['☕', '🍜', '📊', '🌇']) : null,
    });
  },

  like(id) {
    const m = this.moments.find(m => m.id === id);
    if (!m) return;
    m.liked = !m.liked;
    m.likes += m.liked ? 1 : -1;
    ChatApp.renderMoments();
    if (m.liked) {
      SoundEngine.play('click');
      Game.showToast('👍 点赞了 ' + m.author + ' 的动态', 'success');
    }
  },
};
