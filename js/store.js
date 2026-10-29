/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Store (State Management, Multi-Store Database, Checklist Rencana Belanja & Realtime Sync F-06B)
 */

export const DEFAULT_STORES = [
  'Lotte Mart Grocery - Puri Indah',
  'Super Indo - Intercon Kebon Jeruk',
  'Indomaret Fresh - Kemanggisan',
  'Grand Lucky Superstore - Meruya',
  'Alfamidi Super - Palmerah',
  'Hypermart - Puri Indah',
  'Pasar Tradisional Puri Indah'
];

export const CATEGORIES = [
  { id: 'bahan_pokok', name: 'Bahan Pokok', icon: '🌾', color: '#10b981' },
  { id: 'protein_lauk', name: 'Protein & Daging', icon: '🍗', color: '#f43f5e' },
  { id: 'telur_susu', name: 'Telur & Susu', icon: '🥛', color: '#38bdf8' },
  { id: 'bumbu_minyak', name: 'Minyak & Bumbu', icon: '🧂', color: '#f59e0b' },
  { id: 'sayur_buah', name: 'Sayur & Buah', icon: '🥦', color: '#84cc16' },
  { id: 'instan_frozen', name: 'Makanan Instan/Frozen', icon: '🍜', color: '#fb923c' },
  { id: 'minuman', name: 'Kopi & Minuman', icon: '☕', color: '#a855f7' },
  { id: 'kebersihan', name: 'Kebersihan & Mandi', icon: '🧼', color: '#06b6d4' },
  { id: 'snack', name: 'Snack & Camilan', icon: '🍪', color: '#eab308' },
  { id: 'atk_kuliah', name: 'ATK & Perkuliahan', icon: '📚', color: '#6366f1' },
  { id: 'apotek_kesehatan', name: 'Apotek & Kesehatan', icon: '💊', color: '#ec4899' },
  { id: 'lainnya', name: 'Kebutuhan Lainnya', icon: '📦', color: '#94a3b8' }
];

export const UNITS = ['karung/5kg', 'pcs', 'kg', 'pack', 'liter', 'pouch', 'botol', 'ikat', 'kaleng', 'box'];

// Master staples & supermarket shelves matching DT2 and real supermarket scenarios
export const MASTER_CATALOG = [
  { name: 'Beras Rojolele', category: 'Bahan Pokok', unit: 'karung/5kg', benchmarkPrice: 74000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Beras 5kg', category: 'Bahan Pokok', unit: 'karung/5kg', benchmarkPrice: 74000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Minyak Goreng 2L', category: 'Minyak & Bumbu', unit: 'pouch', benchmarkPrice: 43000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Telur 1kg', category: 'Telur & Susu', unit: 'kg', benchmarkPrice: 28000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Garam 500g', category: 'Minyak & Bumbu', unit: 'pack', benchmarkPrice: 5000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Sabun Cuci', category: 'Kebersihan & Mandi', unit: 'pack', benchmarkPrice: 20000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Wajan', category: 'Kebutuhan Lainnya', unit: 'pcs', benchmarkPrice: 100000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Beras Premium Ramos 5kg', category: 'Bahan Pokok', unit: 'pack', benchmarkPrice: 74500, store: 'Super Indo - Intercon Kebon Jeruk' },
  { name: 'Minyak Goreng Bimoli 2L', category: 'Minyak & Bumbu', unit: 'pouch', benchmarkPrice: 38000, store: 'Super Indo - Intercon Kebon Jeruk' },
  { name: 'Indomie Goreng Spesial 5 pcs', category: 'Makanan Instan/Frozen', unit: 'pack', benchmarkPrice: 14800, store: 'Indomaret Fresh - Kemanggisan' },
  { name: 'Dada Ayam Fillet Fresh 1kg', category: 'Protein & Daging', unit: 'kg', benchmarkPrice: 52000, store: 'Super Indo - Intercon Kebon Jeruk' },
  { name: 'Sunlight Pencuci Piring Jeruk Nipis 750ml', category: 'Kebersihan & Mandi', unit: 'pouch', benchmarkPrice: 16500, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Susu UHT Greenfields Full Cream 1L', category: 'Telur & Susu', unit: 'liter', benchmarkPrice: 22000, store: 'Grand Lucky Superstore - Meruya' },
  { name: 'Deterjen Rinso Matic Front Load 1.6kg', category: 'Kebersihan & Mandi', unit: 'pack', benchmarkPrice: 48000, store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Kecap Manis Bango 550ml', category: 'Minyak & Bumbu', unit: 'pouch', benchmarkPrice: 18000, store: 'Indomaret Fresh - Kemanggisan' },
  { name: 'Sayur Bayam Fresh', category: 'Sayur & Buah', unit: 'ikat', benchmarkPrice: 4500, store: 'Pasar Tradisional Puri Indah' },
  { name: 'Tisu Paseo Smart 250 sheets', category: 'Kebutuhan Lainnya', unit: 'pack', benchmarkPrice: 12000, store: 'Alfamidi Super - Palmerah' }
];

// Pre-seeded multi-store history database (F-06 & DT2 Skenario Uji 4)
export const INITIAL_HISTORICAL_SESSIONS = [
  {
    id: 'hist-2026-09-26-lotte-dt2',
    store: 'Lotte Mart Grocery - Puri Indah',
    date: '2026-09-26', // Bulan lalu (SSOT Skenario Uji 4)
    budgetCap: 350000,
    totalSpent: 268000,
    totalSavings: 25000,
    items: [
      { id: 'dt-1', name: 'Beras 5kg', category: 'Bahan Pokok', unit: 'karung/5kg', qty: 1, unitPrice: 68000, discount: '', finalTotal: 68000 },
      { id: 'dt-1b', name: 'Beras Rojolele', category: 'Bahan Pokok', unit: 'karung/5kg', qty: 1, unitPrice: 68000, discount: '', finalTotal: 68000 },
      { id: 'dt-2', name: 'Telur 1kg', category: 'Telur & Susu', unit: 'kg', qty: 1, unitPrice: 32000, discount: '', finalTotal: 32000 },
      { id: 'dt-3', name: 'Garam 500g', category: 'Minyak & Bumbu', unit: 'pack', qty: 1, unitPrice: 5000, discount: '', finalTotal: 5000 },
      { id: 'dt-4', name: 'Minyak Goreng 2L', category: 'Minyak & Bumbu', unit: 'pouch', qty: 1, unitPrice: 43000, discount: '', finalTotal: 43000 },
      { id: 'dt-5', name: 'Sabun Cuci', category: 'Kebersihan & Mandi', unit: 'pack', qty: 1, unitPrice: 20000, discount: '', finalTotal: 20000 },
      { id: 'dt-6', name: 'Wajan', category: 'Kebutuhan Lainnya', unit: 'pcs', qty: 1, unitPrice: 100000, discount: '', finalTotal: 100000 }
    ],
    notes: 'Catatan belanja bulan lalu Rian di Lotte Mart Puri Indah'
  },
  {
    id: 'hist-2026-09-30-superindo',
    store: 'Super Indo - Intercon Kebon Jeruk',
    date: '2026-09-30',
    budgetCap: 350000,
    totalSpent: 242400,
    totalSavings: 28600,
    items: [
      { id: 'h20', name: 'Beras 5kg', category: 'Bahan Pokok', unit: 'karung/5kg', qty: 1, unitPrice: 76000, discount: '', finalTotal: 76000 },
      { id: 'h21', name: 'Minyak Goreng 2L', category: 'Minyak & Bumbu', unit: 'pouch', qty: 1, unitPrice: 41500, discount: '', finalTotal: 41500 },
      { id: 'h22', name: 'Telur 1kg', category: 'Telur & Susu', unit: 'kg', qty: 1, unitPrice: 29000, discount: '', finalTotal: 29000 }
    ],
    notes: 'Belanja promo Super Indo'
  },
  {
    id: 'hist-2026-10-14-indomaret',
    store: 'Indomaret Fresh - Kemanggisan',
    date: '2026-10-14',
    budgetCap: 150000,
    totalSpent: 98000,
    totalSavings: 5000,
    items: [
      { id: 'h30', name: 'Minyak Goreng 2L', category: 'Minyak & Bumbu', unit: 'pouch', qty: 1, unitPrice: 44000, discount: '', finalTotal: 44000 },
      { id: 'h31', name: 'Telur 1kg', category: 'Telur & Susu', unit: 'kg', qty: 1, unitPrice: 30000, discount: '', finalTotal: 30000 }
    ],
    notes: 'Belanja minimarket kost'
  }
];

// Initial active session (Target Kasus Rian: Lotte Mart Grocery - Puri Indah, 26 Okt 2026, Limit Rp 350.000)
export const INITIAL_ACTIVE_SESSION = {
  store: 'Lotte Mart Grocery - Puri Indah',
  date: '2026-10-26',
  budgetCap: 350000,
  items: [
    {
      id: 'item-1',
      name: 'Beras Rojolele',
      category: 'Bahan Pokok',
      unit: 'karung/5kg',
      qty: 1,
      unitPrice: 74000,
      discount: '',
      notes: 'Kebutuhan beras 1 bulan'
    },
    {
      id: 'item-2',
      name: 'Minyak Goreng 2L',
      category: 'Minyak & Bumbu',
      unit: 'pouch',
      qty: 1,
      unitPrice: 43000,
      discount: '',
      notes: 'Merek Bimoli pouch'
    },
    {
      id: 'item-3',
      name: 'Telur 1kg',
      category: 'Telur & Susu',
      unit: 'kg',
      qty: 1,
      unitPrice: 28000,
      discount: '',
      notes: 'Pilih yang segar tanpa retak'
    },
    {
      id: 'item-4',
      name: 'Sabun Cuci',
      category: 'Kebersihan & Mandi',
      unit: 'pack',
      qty: 1,
      unitPrice: 20000,
      discount: '25%', // Diskon tunggal 25% -> Rp 15.000
      notes: 'Promo diskon 25%'
    },
    {
      id: 'item-5',
      name: 'Wajan',
      category: 'Kebutuhan Lainnya',
      unit: 'pcs',
      qty: 1,
      unitPrice: 100000,
      discount: '50% + 20%', // Diskon bertingkat 50% + 20% -> Rp 40.000
      notes: 'Promo wajan masak kost'
    }
  ]
};

// Initial checklist items (Rencana Belanja dari Rumah)
export const DEFAULT_CHECKLIST = [
  { id: 'chk-1', name: 'Beras 5kg', category: 'Bahan Pokok', estPrice: 74000, unit: 'karung/5kg', isChecked: true },
  { id: 'chk-2', name: 'Minyak Goreng 2L', category: 'Minyak & Bumbu', estPrice: 38000, unit: 'pouch', isChecked: true },
  { id: 'chk-3', name: 'Telur Ayam 1kg', category: 'Telur & Susu', estPrice: 28000, unit: 'kg', isChecked: false },
  { id: 'chk-4', name: 'Sabun Cuci', category: 'Kebersihan & Mandi', estPrice: 20000, unit: 'pack', isChecked: false },
  { id: 'chk-5', name: 'Sayur Bayam Fresh', category: 'Sayur & Buah', estPrice: 5000, unit: 'ikat', isChecked: false }
];

const STORAGE_KEYS = {
  ACTIVE_SESSION: 'sgt_active_session',
  HISTORY: 'sgt_shopping_history',
  CUSTOM_STORES: 'sgt_custom_stores',
  CHECKLIST: 'sgt_shopping_checklist',
  THEME: 'sgt_theme_mode'
};

export class GroceryStoreManager {
  constructor(userId = null) {
    this.userId = userId;
    this.activeSession = this.loadActiveSession();
    this.history = this.loadHistory();
    this.stores = this.loadStores();
    this.checklist = this.loadChecklist();
    this.theme = this.loadTheme();
    this.listeners = [];

    // Realtime sync channel (BroadcastChannel for multi-tab / multi-window)
    this.channel = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.channel = new BroadcastChannel('sgt_realtime_sync_channel');
        this.channel.onmessage = (event) => {
          if (event.data && event.data.type === 'SESSION_SYNC') {
            this.activeSession = event.data.session;
            this.notify(false);
          }
        };
      } catch (e) {}
    }

    // Connect to Server SSE for true multi-device realtime synchronization (F-06B)
    this.initServerRealtimeSync();

    // Connect to Cloud Firestore onSnapshot() for Multi-Device Live Sync (HP & PC)
    this.firestoreDb = null;
    this.firestoreDoc = null;
    this.firestoreSetDoc = null;
    this.firestoreOnSnapshot = null;
    this.firestoreUnsubscribe = null;
    this.lastLocalWriteTimestamp = 0;
    this.initFirestoreRealtimeSync();
  }

  async initFirestoreRealtimeSync() {
    if (typeof window === 'undefined') return;

    try {
      const fb = await import('./firebase-config.js');
      if (fb && fb.db && fb.onSnapshot && fb.doc) {
        this.firestoreDb = fb.db;
        this.firestoreDoc = fb.doc;
        this.firestoreSetDoc = fb.setDoc;
        this.firestoreOnSnapshot = fb.onSnapshot;

        this.listenToFirestoreSession();
      }
    } catch (err) {
      console.warn('Firestore realtime sync dynamic import notice:', err.message);
    }
  }

  getFirestoreDocId() {
    if (this.userId && this.userId !== 'default' && this.userId !== 'guest') {
      return `session_${this.userId}`;
    }
    return 'session_shared_realtime';
  }

  listenToFirestoreSession() {
    if (this.firestoreUnsubscribe) {
      try { this.firestoreUnsubscribe(); } catch (_) {}
      this.firestoreUnsubscribe = null;
    }

    if (!this.firestoreDb || !this.firestoreOnSnapshot || !this.firestoreDoc) return;

    try {
      const docId = this.getFirestoreDocId();
      const docRef = this.firestoreDoc(this.firestoreDb, 'grocery_sessions', docId);

      this.firestoreUnsubscribe = this.firestoreOnSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const cloudData = docSnap.data();
          if (cloudData && cloudData.updatedAt && cloudData.updatedAt !== this.lastLocalWriteTimestamp) {
            // Received cloud update from another device (HP, tablet, or PC)!
            this.activeSession.store = cloudData.store || this.activeSession.store;
            this.activeSession.date = cloudData.date || this.activeSession.date;
            if (cloudData.budgetCap !== undefined) {
              this.activeSession.budgetCap = cloudData.budgetCap;
            }
            if (Array.isArray(cloudData.items)) {
              this.activeSession.items = cloudData.items;
            }

            // Persist to local storage
            try {
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem(this.getStorageKey(STORAGE_KEYS.ACTIVE_SESSION), JSON.stringify(this.activeSession));
              }
            } catch (_) {}

            // Re-render UI on this device instantly without reloading!
            this.notify(false);
          }
        }
      }, (err) => {
        console.warn('Firestore onSnapshot listener notice:', err.message);
      });
    } catch (err) {
      console.warn('Error attaching Firestore onSnapshot:', err);
    }
  }

  async syncToFirestore() {
    if (!this.firestoreDb || !this.firestoreSetDoc || !this.firestoreDoc) return;

    try {
      const docId = this.getFirestoreDocId();
      const docRef = this.firestoreDoc(this.firestoreDb, 'grocery_sessions', docId);
      const timestamp = Date.now();
      this.lastLocalWriteTimestamp = timestamp;

      await this.firestoreSetDoc(docRef, {
        store: this.activeSession.store,
        date: this.activeSession.date,
        budgetCap: this.activeSession.budgetCap,
        items: this.activeSession.items,
        updatedAt: timestamp,
        userId: this.userId || 'shared'
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore sync write notice:', err.message);
    }
  }

  setUserId(userId) {
    this.userId = userId || null;
    this.activeSession = this.loadActiveSession();
    this.history = this.loadHistory();
    this.stores = this.loadStores();
    this.checklist = this.loadChecklist();
    this.listenToFirestoreSession();
    this.notify();
  }

  getStorageKey(baseKey) {
    if (this.userId && this.userId !== 'default' && this.userId !== 'guest') {
      return `${baseKey}_${this.userId}`;
    }
    return baseKey;
  }

  initServerRealtimeSync() {
    if (typeof EventSource !== 'undefined') {
      try {
        const evtSource = new EventSource('/api/events');
        evtSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'SESSION_UPDATE' && data.data) {
              this.activeSession = data.data;
              this.notify(false);
            }
          } catch (e) {}
        };
      } catch (e) {}
    }
  }

  broadcastUpdate() {
    // 1. BroadcastChannel (Same device multi-window/multi-tab)
    if (this.channel) {
      try {
        this.channel.postMessage({ type: 'SESSION_SYNC', session: this.activeSession });
      } catch (e) {}
    }

    // 2. Server API Sync (Multi-Device HP & PC live sync via SSE)
    if (typeof fetch !== 'undefined') {
      try {
        fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.activeSession)
        }).catch(() => {});
      } catch (e) {}
    }
  }

  loadTheme() {
    try {
      if (typeof localStorage !== 'undefined') {
        const th = localStorage.getItem(STORAGE_KEYS.THEME);
        if (th === 'light' || th === 'dark') return th;
      }
    } catch (e) {}
    return 'dark';
  }

  setTheme(themeName) {
    this.theme = themeName === 'light' ? 'light' : 'dark';
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.THEME, this.theme);
      }
    } catch (e) {}
    this.notify();
  }

  loadActiveSession() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(this.getStorageKey(STORAGE_KEYS.ACTIVE_SESSION));
        if (data) {
          const parsed = JSON.parse(data);
          if (!parsed.store) parsed.store = 'Lotte Mart Grocery - Puri Indah';
          if (!parsed.date) parsed.date = '2026-10-26';
          if (!parsed.budgetCap) parsed.budgetCap = 350000;
          if (!Array.isArray(parsed.items)) parsed.items = [];
          return parsed;
        }
      }
    } catch (e) {}
    return JSON.parse(JSON.stringify(INITIAL_ACTIVE_SESSION));
  }

  saveActiveSession(shouldBroadcast = true) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.getStorageKey(STORAGE_KEYS.ACTIVE_SESSION), JSON.stringify(this.activeSession));
      }
      if (shouldBroadcast) {
        this.broadcastUpdate();
        this.syncToFirestore(); // Cloud Firestore onSnapshot() realtime push to all other devices!
      }
      this.notify();
    } catch (e) {}
  }

  loadHistory() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(this.getStorageKey(STORAGE_KEYS.HISTORY));
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {}
    const initial = JSON.parse(JSON.stringify(INITIAL_HISTORICAL_SESSIONS));
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.getStorageKey(STORAGE_KEYS.HISTORY), JSON.stringify(initial));
      }
    } catch (e) {}
    return initial;
  }

  saveHistory() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.getStorageKey(STORAGE_KEYS.HISTORY), JSON.stringify(this.history));
      }
      this.notify();
    } catch (e) {}
  }

  loadStores() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(this.getStorageKey(STORAGE_KEYS.CUSTOM_STORES));
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            return Array.from(new Set([...DEFAULT_STORES, ...parsed]));
          }
        }
      }
    } catch (e) {}
    return [...DEFAULT_STORES];
  }

  saveStores() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.getStorageKey(STORAGE_KEYS.CUSTOM_STORES), JSON.stringify(this.stores));
      }
    } catch (e) {}
  }

  addStore(storeName) {
    if (!storeName || typeof storeName !== 'string') return;
    const trimmed = storeName.trim();
    if (!trimmed) return;
    if (!this.stores.includes(trimmed)) {
      this.stores.push(trimmed);
      this.saveStores();
      this.notify();
    }
  }

  setStore(storeName) {
    this.activeSession.store = storeName;
    this.saveActiveSession();
  }

  setDate(dateStr) {
    this.activeSession.date = dateStr;
    this.saveActiveSession();
  }

  setBudgetCap(amount) {
    this.activeSession.budgetCap = Math.max(0, Number(amount) || 0);
    this.saveActiveSession();
  }

  addItem(item) {
    const rawName = item.name ? item.name.trim() : '';
    if (!rawName) {
      throw new Error('Nama barang wajib diisi!');
    }
    const unitPrice = Number(item.unitPrice);
    if (isNaN(unitPrice) || unitPrice <= 0) {
      throw new Error('Harga satuan barang tidak boleh 0 atau minus!');
    }
    const qty = Number(item.qty);
    if (isNaN(qty) || qty <= 0) {
      throw new Error('Kuantitas barang harus lebih dari 0!');
    }

    const newItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: rawName,
      category: item.category || 'Bahan Pokok',
      unit: item.unit || 'pcs',
      qty: Math.max(0.1, qty),
      unitPrice: unitPrice,
      discount: item.discount ? item.discount.toString().trim() : '',
      notes: item.notes?.trim() || ''
    };
    this.activeSession.items.unshift(newItem);
    this.saveActiveSession();
    return newItem;
  }

  updateItem(itemId, updates) {
    const idx = this.activeSession.items.findIndex(it => it.id === itemId);
    if (idx !== -1) {
      if (updates.name !== undefined && !updates.name.trim()) {
        throw new Error('Nama barang tidak boleh kosong!');
      }
      if (updates.unitPrice !== undefined && (isNaN(updates.unitPrice) || updates.unitPrice <= 0)) {
        throw new Error('Harga satuan barang tidak boleh 0 atau minus!');
      }
      if (updates.qty !== undefined && (isNaN(updates.qty) || updates.qty <= 0)) {
        throw new Error('Kuantitas barang harus lebih dari 0!');
      }
      this.activeSession.items[idx] = {
        ...this.activeSession.items[idx],
        ...updates
      };
      this.saveActiveSession();
    }
  }

  removeItem(itemId) {
    this.activeSession.items = this.activeSession.items.filter(it => it.id !== itemId);
    this.saveActiveSession();
  }

  clearActiveCart() {
    this.activeSession.items = [];
    this.saveActiveSession();
  }

  checkoutAndSaveSession(summary) {
    if (this.activeSession.items.length === 0) {
      return null;
    }
    const sessionRecord = {
      id: 'session_' + Date.now(),
      store: this.activeSession.store,
      date: this.activeSession.date,
      budgetCap: this.activeSession.budgetCap,
      totalSpent: summary.totalFinal,
      totalRaw: summary.totalRaw,
      totalSavings: summary.totalSavings,
      itemCount: this.activeSession.items.length,
      items: JSON.parse(JSON.stringify(this.activeSession.items)),
      savedAt: new Date().toISOString(),
      notes: `Sesi belanja di ${this.activeSession.store}`
    };

    this.history.unshift(sessionRecord);
    this.saveHistory();

    // Clear cart after checkout
    this.activeSession.items = [];
    this.saveActiveSession();

    return sessionRecord;
  }

  deleteHistorySession(sessionId) {
    this.history = this.history.filter(s => s.id !== sessionId);
    this.saveHistory();
  }

  // ==========================================================================
  // RENCANA BELANJA DARI RUMAH (CHECKLIST KEBUTUHAN)
  // ==========================================================================

  loadChecklist() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(this.getStorageKey(STORAGE_KEYS.CHECKLIST));
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (_) {}
    return JSON.parse(JSON.stringify(DEFAULT_CHECKLIST));
  }

  saveChecklist() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.getStorageKey(STORAGE_KEYS.CHECKLIST), JSON.stringify(this.checklist));
      }
      this.notify();
    } catch (_) {}
  }

  addChecklistItem({ name, category = 'Bahan Pokok', estPrice = 0, unit = 'pcs' }) {
    const rawName = name ? name.trim() : '';
    if (!rawName) return null;
    const newItem = {
      id: 'chk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: rawName,
      category,
      estPrice: Math.max(0, Number(estPrice) || 0),
      unit,
      isChecked: false
    };
    this.checklist.unshift(newItem);
    this.saveChecklist();
    return newItem;
  }

  toggleChecklistItem(id) {
    const item = this.checklist.find(i => i.id === id);
    if (item) {
      item.isChecked = !item.isChecked;
      this.saveChecklist();
      return item;
    }
    return null;
  }

  removeChecklistItem(id) {
    this.checklist = this.checklist.filter(i => i.id !== id);
    this.saveChecklist();
  }

  transferChecklistItemToCart(id) {
    const item = this.checklist.find(i => i.id === id);
    if (!item) return null;
    const added = this.addItem({
      name: item.name,
      category: item.category,
      unit: item.unit || 'pcs',
      qty: 1,
      unitPrice: item.estPrice > 0 ? item.estPrice : 15000,
      discount: '',
      notes: 'Dari Checklist Rencana Belanja'
    });
    item.isChecked = true;
    this.saveChecklist();
    return added;
  }

  transferAllCheckedToCart() {
    let count = 0;
    this.checklist.filter(i => i.isChecked).forEach(item => {
      // Check if item already in active cart
      const exists = this.activeSession.items.some(it => it.name.toLowerCase() === item.name.toLowerCase());
      if (!exists) {
        this.addItem({
          name: item.name,
          category: item.category,
          unit: item.unit || 'pcs',
          qty: 1,
          unitPrice: item.estPrice > 0 ? item.estPrice : 15000,
          discount: '',
          notes: 'Dari Checklist Rencana'
        });
        count++;
      }
    });
    return count;
  }

  // ==========================================================================
  // 1-KLIK PAKET HEMAT KOS (BUNDEL HEMAT SEMBAKO ANAK KOST)
  // ==========================================================================

  addPaketHematKos() {
    const bundleItems = [
      { name: 'Beras Premium 5kg', category: 'Bahan Pokok', unit: 'karung/5kg', qty: 1, unitPrice: 74000, discount: '15%', notes: 'Paket Hemat Kos Anak Rantau' },
      { name: 'Minyak Goreng Bimoli 2L', category: 'Minyak & Bumbu', unit: 'pouch', qty: 1, unitPrice: 38000, discount: '15%', notes: 'Paket Hemat Kos Anak Rantau' },
      { name: 'Telur Ayam 1kg', category: 'Telur & Susu', unit: 'kg', qty: 1, unitPrice: 28000, discount: '15%', notes: 'Paket Hemat Kos Anak Rantau' },
      { name: 'Indomie Goreng 5 pcs', category: 'Makanan Instan/Frozen', unit: 'pack', qty: 1, unitPrice: 14800, discount: '15%', notes: 'Paket Hemat Kos Anak Rantau' },
      { name: 'Kecap Manis Bango 550ml', category: 'Minyak & Bumbu', unit: 'pouch', qty: 1, unitPrice: 18000, discount: '15%', notes: 'Paket Hemat Kos Anak Rantau' }
    ];

    bundleItems.forEach(item => {
      this.addItem(item);
    });

    return bundleItems;
  }

  resetToDefaultData() {
    this.activeSession = JSON.parse(JSON.stringify(INITIAL_ACTIVE_SESSION));
    this.history = JSON.parse(JSON.stringify(INITIAL_HISTORICAL_SESSIONS));
    this.stores = [...DEFAULT_STORES];
    this.checklist = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST));
    this.saveActiveSession();
    this.saveHistory();
    this.saveStores();
    this.saveChecklist();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(shouldBroadcast = true) {
    for (const listener of this.listeners) {
      try {
        listener(this);
      } catch (e) {
        console.error('Error in store listener:', e);
      }
    }
  }
}
