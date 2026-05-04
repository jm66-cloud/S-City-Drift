const Modal = {
  show(title, content, buttons) {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    overlay.innerHTML = '<div class="modal-box"><h3>' + title + '</h3><p>' + (content || '').replace(/\n/g, '<br>') + '</p>'
      + (buttons ? '<div class="modal-buttons">' + buttons.map((b, i) => '<button onclick="Modal._handle(' + i + ')">' + b.text + '</button>').join('') + '</div>'
        : '<div class="modal-buttons"><button onclick="Modal.close()">确定</button></div>')
      + '</div>';
    Modal._callbacks = buttons ? buttons.map(b => b.action || null) : [];
  },

  _handle(idx) {
    const cb = Modal._callbacks?.[idx];
    if (cb) cb();
    Modal.close();
  },

  close() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('hidden');
    Modal._callbacks = [];
  },

  prompt(title, placeholder, callback) {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('hidden');
    overlay.innerHTML = '<div class="modal-box"><h3>' + title + '</h3><input class="modal-input" id="modal-input" type="text" placeholder="' + placeholder + '">'
      + '<div class="modal-buttons"><button onclick="Modal._promptDone()">确定</button><button onclick="Modal.close()">取消</button></div></div>';
    Modal._promptCallback = callback;
    setTimeout(() => document.getElementById('modal-input')?.focus(), 100);
  },

  _promptDone() {
    const val = document.getElementById('modal-input')?.value || '';
    if (Modal._promptCallback) Modal._promptCallback(val);
    Modal.close();
  },
};
