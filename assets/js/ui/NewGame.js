const NewGame = {
  init() {
    const overlay = document.getElementById('new-game-overlay');
    if (overlay) overlay.classList.remove('hidden');
  },
  hide() {
    const overlay = document.getElementById('new-game-overlay');
    if (overlay) overlay.classList.add('hidden');
  },
};
