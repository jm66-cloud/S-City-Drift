const AISettings = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const cfg = AIEngine.getConfig();
    el.innerHTML = '<div class="settings-app" style="padding:12px;">'
      + '<div class="set-section"><h4>🤖 AI 聊天配置</h4>'
      + '<div class="set-row"><label>启用 AI</label><input type="checkbox" id="ai-enabled" ' + (cfg.enabled ? 'checked' : '') + ' onchange="AISettings.toggle()"></div>'
      + '<div class="set-row"><label>API URL</label><input type="text" id="ai-url" value="' + (cfg.apiUrl || '') + '" placeholder="https://api.openai.com/v1"></div>'
      + '<div class="set-row"><label>API Key</label><input type="password" id="ai-key" value="' + (cfg.apiKey || '') + '"></div>'
      + '<div class="set-row"><label>模型</label><input type="text" id="ai-model" value="' + (cfg.model || 'gpt-3.5-turbo') + '"></div>'
      + '<div class="ai-status ' + (cfg.enabled ? 'online' : 'offline') + '">' + (cfg.enabled ? '🟢 AI 在线模式' : '🔴 离线模板模式') + '</div>'
      + '<button style="margin-top:8px;" onclick="AISettings.save()">保存设置</button>'
      + '</div></div>';
  },

  toggle() {
    const enabled = document.getElementById('ai-enabled')?.checked;
    const statusEl = document.querySelector('.ai-status');
    if (statusEl) {
      statusEl.className = 'ai-status ' + (enabled ? 'online' : 'offline');
      statusEl.textContent = enabled ? '🟢 AI 在线模式' : '🔴 离线模板模式';
    }
  },

  save() {
    const cfg = {
      enabled: document.getElementById('ai-enabled')?.checked || false,
      apiUrl: document.getElementById('ai-url')?.value || '',
      apiKey: document.getElementById('ai-key')?.value || '',
      model: document.getElementById('ai-model')?.value || 'gpt-3.5-turbo',
    };
    AIEngine.saveConfig(cfg);
    Game.showToast('AI配置已保存', 'success');
  },
};
