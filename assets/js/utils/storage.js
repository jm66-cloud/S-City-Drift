const Storage = {
  prefix: 'hupiao_pc_',
  set(key, val) { try { localStorage.setItem(this.prefix + key, JSON.stringify(val)); } catch (e) { console.warn('Storage.set error:', e); } },
  get(key, def = null) { try { const v = localStorage.getItem(this.prefix + key); return v !== null ? JSON.parse(v) : def; } catch { return def; } },
  remove(key) { localStorage.removeItem(this.prefix + key); },
  getRaw(key) { return localStorage.getItem(this.prefix + key); },
  setRaw(key, val) { localStorage.setItem(this.prefix + key, val); },
  keys() {
    const k = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) k.push(key.slice(this.prefix.length));
    }
    return k;
  },
  async idbOpen(dbName = 'hupiao_pc', version = 1) {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(dbName, version);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('kline')) db.createObjectStore('kline', { keyPath: 'code' });
        if (!db.objectStoreNames.contains('orders')) db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('chats')) db.createObjectStore('chats', { keyPath: 'id', autoIncrement: true });
      };
      req.onsuccess = (e) => resolve(e.target.result);
      req.onerror = (e) => reject(e.target.error);
    });
  },
  async idbPut(storeName, data) {
    const db = await this.idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(data);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },
  async idbGetAll(storeName) {
    const db = await this.idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const req = tx.objectStore(storeName).getAll();
      req.onsuccess = () => { db.close(); resolve(req.result); };
      req.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },
  async idbClear(storeName) {
    const db = await this.idbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).clear();
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = (e) => { db.close(); reject(e.target.error); };
    });
  },
};
