const NewsNotification = {
  show() {
    const news = NewsEngine.getTodaysNews();
    if (news.length === 0) return;
    SoundEngine.play('alarm');
    Game.showToast('📰 晨间财经速递 - ' + news.length + '条新闻', 'info');
  },
};
