const MobileDetect = {
  check() {
    if (navigator.maxTouchPoints > 1 && window.innerWidth < 1024) {
      const overlay = document.createElement('div');
      overlay.id = 'mobile-warning';
      overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#000;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;';
      overlay.innerHTML = '<div style="text-align:center;padding:24px;max-width:400px;">'
        + '<div style="font-size:48px;margin-bottom:16px;">🖥️</div>'
        + '<h2 style="color:#fff;margin-bottom:12px;">推荐使用电脑游玩</h2>'
        + '<p style="color:#c0c0c0;line-height:1.6;font-size:14px;">'
        + 'S市漂模拟是一款电脑桌面模拟游戏，<br>'
        + '建议使用 Chrome/Edge 浏览器在电脑上打开。<br><br>'
        + '如果你仍想继续，可以点击下方按钮。</p>'
        + '<button onclick="this.parentElement.parentElement.remove()" style="margin-top:16px;padding:8px 24px;font-size:16px;background:#000080;color:#fff;border:2px solid #fff;cursor:pointer;">继续游玩</button>'
        + '</div>';
      document.body.appendChild(overlay);
    }
  },
};
