const AIEngine = {
  config: null,

  init() {
    this.config = Storage.get(CONFIG.AI.CONFIG_KEY, { enabled: false, apiUrl: '', apiKey: '', model: '' });
  },

  getConfig() { return this.config; },

  saveConfig(cfg) {
    this.config = cfg;
    Storage.set(CONFIG.AI.CONFIG_KEY, cfg);
  },

  async chat(contact, message, history) {
    if (!this.config.enabled || !this.config.apiUrl) return this._offlineReply(contact, message);
    try {
      const response = await fetch(this.config.apiUrl + '/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.config.apiKey },
        body: JSON.stringify({
          model: this.config.model || 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: this._systemPrompt(contact) },
            ...(history || []).slice(-10),
            { role: 'user', content: message },
          ],
          max_tokens: 200,
          temperature: 0.8,
        }),
      });
      if (!response.ok) throw new Error('API error: ' + response.status);
      const data = await response.json();
      return data.choices?.[0]?.message?.content || this._offlineReply(contact, message);
    } catch (e) {
      console.warn('AI chat failed, using offline:', e);
      return this._offlineReply(contact, message);
    }
  },

  _systemPrompt(contact) {
    const prompts = {
      '阿强': '你是一个股友，说话直爽，喜欢聊股票。你是玩家在老家的老同学。用中文简短回复。',
      '王阿姨': '你是房东，50岁，关心房租和水电。用中文简短回复。',
      '老妈': '你是玩家的妈妈，关心儿子生活，催婚催吃饭。用中文简短回复。',
      '陈雅': '你是一家公司的人事主管，专业干练。用中文简短回复。',
      '张总': '你是投资人，说话简洁专业。用中文简短回复。',
      '刘博': '你是技术顾问，说话带点术语。用中文简短回复。',
      '小李': '你是合租室友，年轻人，爱打游戏。用中文简短回复。',
    };
    return prompts[contact] || '你是一个友好的朋友，用中文简短回复。';
  },

  _offlineReply(contact, message) {
    const offlineReplies = {
      '阿强': ['今天科技股好猛啊', '我被套牢了兄弟', '听说要重组，冲不冲？', '最近行情不错啊', '你买了啥？'],
      '王阿姨': ['这个月房租该交了', '水电费单子发你了', '厨房下水道又堵了', '什么时候交房租？'],
      '老妈': ['吃饭了没', '隔壁老王家儿子结婚了', '什么时候带对象回来看看', '天冷多穿衣服', '别熬夜'],
      '小李': ['晚上一起打游戏？', '冰箱里的牛奶是你喝的吗', '这个月网费该交了', '外卖凑单吗？'],
      '陈雅': ['面试安排好了', '简历收到了', '本周会议取消'],
      '张总': ['投资方案我看过了', '下周见面聊聊', '报表发我邮箱'],
      '刘博': ['技术方案没问题', '这个需求需要评估', '新版本测试中'],
    };
    const replies = offlineReplies[contact] || ['你好', '收到', '好的'];
    return Random.pick(replies);
  },
};
