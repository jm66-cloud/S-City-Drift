const ChatView = {
  render(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
  },
};
