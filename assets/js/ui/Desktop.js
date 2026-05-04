const Desktop = {
  icons: [
    { id: 'stock', emoji: '📈', label: '股市', app: 'StockApp' },
    { id: 'chat', emoji: '💬', label: '聊天', app: 'ChatApp' },
    { id: 'news', emoji: '📰', label: '新闻', app: 'NewsApp' },
    { id: 'life', emoji: '🏠', label: '生活', app: 'LifeApp' },
    { id: 'assets', emoji: '💰', label: '资产', app: 'AssetsApp' },
    { id: 'company', emoji: '🏢', label: '公司', app: 'CompanyApp' },
    { id: 'romance', emoji: '❤️', label: '恋爱', app: 'RomanceApp' },
    { id: 'donors', emoji: '🙏', label: '赞助者', app: 'DonorApp' },
    { id: 'settings', emoji: '⚙️', label: '设置', app: 'SettingsApp' },
  ],

  render() {
    const grid = document.getElementById('icon-grid');
    grid.innerHTML = '';
    for (const icon of this.icons) {
      const el = document.createElement('div');
      el.className = 'desktop-icon';
      el.innerHTML = '<div class="icon-emoji">' + icon.emoji + '</div><div class="icon-label">' + icon.label + '</div>';
      el.onclick = () => { SoundEngine.play('click'); WindowManager.open(icon.id, icon.label, icon.app); };
      grid.appendChild(el);
    }
  },
};
