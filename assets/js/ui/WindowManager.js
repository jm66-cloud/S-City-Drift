const WindowManager = {
  windows: [],
  zIndex: 100,
  taskbarEl: null,

  init() {
    this.taskbarEl = document.createElement('div');
    this.taskbarEl.className = 'taskbar';
    document.getElementById('desktop').appendChild(this.taskbarEl);
  },

  open(id, title, appName) {
    const existing = this.windows.find(w => w.id === id && w.dom && w.dom.parentNode);
    if (existing) {
      this.focus(existing.id);
      if (existing.dom.classList.contains('minimized')) {
        existing.dom.classList.remove('minimized');
        this._updateTaskbar();
      }
      return existing.dom;
    }
    const win = document.createElement('div');
    win.className = 'game-window';
    win.id = 'win-' + id;
    win.style.zIndex = ++this.zIndex;
    const offset = (this.windows.length % 5) * 30;
    win.style.top = (35 + offset) + 'px';
    win.style.left = (40 + offset) + 'px';
    win.style.width = '600px';
    win.style.height = '400px';
    win.innerHTML = '<div class="window-titlebar"><span class="win-title">' + title + '</span><div class="win-controls">'
      + '<button class="win-btn" onclick="WindowManager.minimize(\'' + id + '\')">_</button>'
      + '<button class="win-btn" onclick="WindowManager.maximize(\'' + id + '\')">□</button>'
      + '<button class="win-btn close" onclick="WindowManager.close(\'' + id + '\')">×</button></div></div>'
      + '<div class="window-body" id="win-body-' + id + '"></div>';
    document.getElementById('window-container').appendChild(win);

    this._makeDraggable(win);
    win.onmousedown = () => this.focus(id);

    const entry = { id, title, dom: win, appName, minimized: false };
    this.windows.push(entry);
    this._updateTaskbar();

    if (typeof window[appName]?.open === 'function') {
      window[appName].open(document.getElementById('win-body-' + id));
    }
    this.focus(id);
    return win;
  },

  focus(id) {
    for (const w of this.windows) {
      if (w.dom) w.dom.classList.remove('focused');
    }
    const win = this.windows.find(w => w.id === id);
    if (win && win.dom) {
      win.dom.classList.add('focused');
      win.dom.style.zIndex = ++this.zIndex;
    }
    this._updateTaskbar();
  },

  minimize(id) {
    const win = this.windows.find(w => w.id === id);
    if (win && win.dom) { win.dom.classList.add('minimized'); win.minimized = true; this._updateTaskbar(); }
  },

  maximize(id) {
    const win = this.windows.find(w => w.id === id);
    if (win && win.dom) {
      win.dom.classList.toggle('maximized');
      if (!win.dom.classList.contains('maximized')) {
        win.dom.style.width = '600px';
        win.dom.style.height = '400px';
      }
    }
  },

  close(id) {
    const idx = this.windows.findIndex(w => w.id === id);
    if (idx >= 0) {
      const win = this.windows[idx];
      if (win.dom) win.dom.remove();
      this.windows.splice(idx, 1);
      this._updateTaskbar();
    }
  },

  _makeDraggable(win) {
    const bar = win.querySelector('.window-titlebar');
    let dragging = false, startX, startY, startLeft, startTop;
    bar.onmousedown = (e) => {
      if (e.target.tagName === 'BUTTON') return;
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      startLeft = parseInt(win.style.left) || 0;
      startTop = parseInt(win.style.top) || 0;
      document.onmousemove = (ev) => {
        if (!dragging) return;
        win.style.left = Math.max(0, Math.min(window.innerWidth - 200, startLeft + ev.clientX - startX)) + 'px';
        win.style.top = Math.max(0, Math.min(window.innerHeight - 100, startTop + ev.clientY - startY)) + 'px';
      };
      document.onmouseup = () => { dragging = false; document.onmousemove = null; document.onmouseup = null; };
    };
  },

  _updateTaskbar() {
    if (!this.taskbarEl) return;
    this.taskbarEl.innerHTML = '';
    for (const w of this.windows) {
      const btn = document.createElement('button');
      btn.className = 'taskbar-btn' + (w.dom?.classList.contains('focused') ? ' active' : '');
      btn.textContent = w.title;
      btn.onclick = () => {
        if (w.minimized || w.dom?.classList.contains('minimized')) {
          w.dom?.classList.remove('minimized');
          w.minimized = false;
          this.focus(w.id);
        } else if (w.dom?.classList.contains('focused')) {
          this.minimize(w.id);
        } else { this.focus(w.id); }
      };
      this.taskbarEl.appendChild(btn);
    }
  },
};
