/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Comparator (Komparator Harga Realtime vs Riwayat Toko - F-04)
 */

import { Calculator } from './calculator.js';
import { MASTER_CATALOG } from './store.js';

const STAPLE_BENCHMARK_PRICES = {
  'beras': [
    { store: 'Pasar Tradisional Puri Indah', price: 71000, date: '25 Okt 2026', unit: 'karung/5kg' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 74000, date: '26 Okt 2026', unit: 'karung/5kg' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 74500, date: '20 Okt 2026', unit: 'karung/5kg' },
    { store: 'Alfamidi Super - Palmerah', price: 76000, date: '18 Okt 2026', unit: 'karung/5kg' },
    { store: 'Hypermart - Puri Indah', price: 77500, date: '15 Okt 2026', unit: 'karung/5kg' }
  ],
  'minyak': [
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 38500, date: '20 Okt 2026', unit: 'pouch 2L' },
    { store: 'Pasar Tradisional Puri Indah', price: 41000, date: '25 Okt 2026', unit: 'curah 2L' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 43000, date: '26 Okt 2026', unit: 'pouch 2L' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 44000, date: '14 Okt 2026', unit: 'pouch 2L' },
    { store: 'Alfamidi Super - Palmerah', price: 44500, date: '18 Okt 2026', unit: 'pouch 2L' }
  ],
  'telur': [
    { store: 'Pasar Tradisional Puri Indah', price: 26000, date: '25 Okt 2026', unit: 'kg' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 28000, date: '26 Okt 2026', unit: 'kg' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 29000, date: '20 Okt 2026', unit: 'kg' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 30000, date: '14 Okt 2026', unit: 'pack' },
    { store: 'Hypermart - Puri Indah', price: 31000, date: '16 Okt 2026', unit: 'pack' }
  ],
  'gula': [
    { store: 'Pasar Tradisional Puri Indah', price: 16500, date: '25 Okt 2026', unit: 'kg' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 17500, date: '20 Okt 2026', unit: 'kg' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 18000, date: '26 Okt 2026', unit: 'kg' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 18500, date: '14 Okt 2026', unit: 'kg' }
  ],
  'tepung': [
    { store: 'Pasar Tradisional Puri Indah', price: 11000, date: '25 Okt 2026', unit: 'kg' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 12500, date: '26 Okt 2026', unit: 'kg' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 12900, date: '20 Okt 2026', unit: 'kg' },
    { store: 'Alfamidi Super - Palmerah', price: 13500, date: '18 Okt 2026', unit: 'kg' }
  ],
  'garam': [
    { store: 'Pasar Tradisional Puri Indah', price: 4000, date: '25 Okt 2026', unit: 'pack 500g' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 5000, date: '26 Okt 2026', unit: 'pack 500g' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 5500, date: '20 Okt 2026', unit: 'pack 500g' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 6000, date: '14 Okt 2026', unit: 'pack 500g' }
  ],
  'sabun': [
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 14500, date: '20 Okt 2026', unit: 'refill 800ml' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 15500, date: '26 Okt 2026', unit: 'refill 800ml' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 16500, date: '14 Okt 2026', unit: 'refill 800ml' },
    { store: 'Hypermart - Puri Indah', price: 17000, date: '16 Okt 2026', unit: 'refill 800ml' }
  ],
  'deterjen': [
    { store: 'Lotte Mart Grocery - Puri Indah', price: 21500, date: '26 Okt 2026', unit: 'pack 800g' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 22000, date: '20 Okt 2026', unit: 'pack 800g' },
    { store: 'Alfamidi Super - Palmerah', price: 23500, date: '18 Okt 2026', unit: 'pack 800g' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 24000, date: '14 Okt 2026', unit: 'pack 800g' }
  ],
  'susu': [
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 18900, date: '20 Okt 2026', unit: '1L' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 19500, date: '26 Okt 2026', unit: '1L' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 20500, date: '14 Okt 2026', unit: '1L' },
    { store: 'Grand Lucky Superstore - Meruya', price: 22000, date: '12 Okt 2026', unit: '1L' }
  ],
  'mie': [
    { store: 'Pasar Tradisional Puri Indah', price: 118000, date: '25 Okt 2026', unit: 'dus (40 pcs)' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 122000, date: '26 Okt 2026', unit: 'dus (40 pcs)' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 124000, date: '20 Okt 2026', unit: 'dus (40 pcs)' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 128000, date: '14 Okt 2026', unit: 'dus (40 pcs)' }
  ],
  'kopi': [
    { store: 'Pasar Tradisional Puri Indah', price: 12000, date: '25 Okt 2026', unit: 'pack 150g' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 13500, date: '26 Okt 2026', unit: 'pack 150g' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 14000, date: '14 Okt 2026', unit: 'pack 150g' },
    { store: 'Alfamidi Super - Palmerah', price: 14500, date: '18 Okt 2026', unit: 'pack 150g' }
  ],
  'kecap': [
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 17500, date: '20 Okt 2026', unit: 'pouch 550ml' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 18500, date: '26 Okt 2026', unit: 'pouch 550ml' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 19500, date: '14 Okt 2026', unit: 'pouch 550ml' },
    { store: 'Hypermart - Puri Indah', price: 20000, date: '16 Okt 2026', unit: 'pouch 550ml' }
  ],
  'ayam': [
    { store: 'Pasar Tradisional Puri Indah', price: 34000, date: '25 Okt 2026', unit: 'ekor/kg' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 38900, date: '20 Okt 2026', unit: 'ekor/kg' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 39500, date: '26 Okt 2026', unit: 'ekor/kg' },
    { store: 'Hypermart - Puri Indah', price: 42000, date: '16 Okt 2026', unit: 'ekor/kg' }
  ],
  'bawang': [
    { store: 'Pasar Tradisional Puri Indah', price: 18000, date: '25 Okt 2026', unit: '500g' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 22000, date: '26 Okt 2026', unit: '500g' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 23500, date: '20 Okt 2026', unit: '500g' },
    { store: 'Indomaret Fresh - Kemanggisan', price: 25000, date: '14 Okt 2026', unit: '500g' }
  ],
  'wajan': [
    { store: 'Pasar Tradisional Puri Indah', price: 65000, date: '25 Okt 2026', unit: 'pcs' },
    { store: 'Super Indo - Intercon Kebon Jeruk', price: 79900, date: '20 Okt 2026', unit: 'pcs' },
    { store: 'Lotte Mart Grocery - Puri Indah', price: 100000, date: '26 Okt 2026', unit: 'pcs' },
    { store: 'Hypermart - Puri Indah', price: 110000, date: '16 Okt 2026', unit: 'pcs' }
  ]
};

export const Comparator = {
  /**
   * Normalize product name for reliable matching
   * @param {string} name 
   * @returns {string}
   */
  normalizeName(name) {
    if (!name) return '';
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  /**
   * Compare two strings similarity (simple token matching)
   * @param {string} a 
   * @param {string} b 
   * @returns {number} 0 to 1
   */
  getSimilarity(a, b) {
    const normA = this.normalizeName(a);
    const normB = this.normalizeName(b);
    if (!normA || !normB) return 0;
    if (normA === normB) return 1.0;
    if (normA.includes(normB) || normB.includes(normA)) return 0.9;

    const wordsA = normA.split(' ').filter(Boolean);
    const wordsB = normB.split(' ').filter(Boolean);
    if (wordsA.length === 0 || wordsB.length === 0) return 0;

    // Primary staple word match (e.g., "beras", "telur", "garam", "minyak", "wajan")
    const primaryStaples = ['beras', 'telur', 'garam', 'minyak', 'sabun', 'wajan', 'ayam', 'daging', 'bawang', 'susu', 'indomie'];
    const hasSharedStaple = primaryStaples.some(st => wordsA.includes(st) && wordsB.includes(st));
    if (hasSharedStaple) return 0.85;

    const setA = new Set(wordsA);
    const setB = new Set(wordsB);
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return union.size > 0 ? intersection.size / union.size : 0;
  },

  /**
   * Find most relevant past purchase record from historical sessions (F-04)
   * Prioritizes the SAME STORE first, then falls back to other stores.
   * 
   * @param {string} productName 
   * @param {string} currentStore 
   * @param {string} currentDate 
   * @param {Array} historySessions 
   * @returns {object|null}
   */
  findHistoricalPrice(productName, currentStore, currentDate, historySessions = []) {
    if (!productName || !currentPriceValid(productName)) return null;

    const normTarget = this.normalizeName(productName);
    const sortedSessions = [...historySessions].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Phase 1: Search in SAME STORE
    for (const session of sortedSessions) {
      if (session.store === currentStore) {
        for (const item of session.items) {
          if (this.getSimilarity(item.name, normTarget) >= 0.75) {
            return {
              matchedItemName: item.name,
              pastPrice: item.unitPrice,
              store: session.store,
              date: session.date,
              isSameStore: true,
              source: 'store_history'
            };
          }
        }
      }
    }

    // Phase 2: Search in OTHER STORES
    for (const session of sortedSessions) {
      if (session.store !== currentStore) {
        for (const item of session.items) {
          if (this.getSimilarity(item.name, normTarget) >= 0.75) {
            return {
              matchedItemName: item.name,
              pastPrice: item.unitPrice,
              store: session.store,
              date: session.date,
              isSameStore: false,
              source: 'other_store_history'
            };
          }
        }
      }
    }

    // Phase 3: Fallback to Master Catalog benchmark price if available
    const catalogMatch = MASTER_CATALOG.find(catItem => this.getSimilarity(catItem.name, normTarget) >= 0.8);
    if (catalogMatch) {
      return {
        matchedItemName: catalogMatch.name,
        pastPrice: catalogMatch.benchmarkPrice,
        store: 'Standar Katalog Pasar',
        date: 'Acuan Bulanan',
        isSameStore: false,
        source: 'catalog_benchmark'
      };
    }

    return null;
  },

  /**
   * Evaluate price difference and generate visual comparator indicator (F-04)
   * 
   * Criteria:
   * - Red Up Arrow (↑): Harga naik dibanding riwayat (+Rp selisih)
   * - Green Down Arrow (↓): Harga turun dibanding riwayat (-Rp hemat)
   * - Equal Sign (=): Harga stabil / sama persis
   * - New Badge (✨): Item baru belum ada riwayat
   * 
   * @param {string} productName 
   * @param {number} currentPrice 
   * @param {string} currentStore 
   * @param {string} currentDate 
   * @param {Array} historySessions 
   * @returns {object}
   */
  comparePrice(productName, currentPrice, currentStore, currentDate, historySessions = []) {
    const price = Calculator.parseNumber(currentPrice);
    if (!productName || price <= 0) {
      return {
        hasHistory: false,
        trend: 'NONE',
        symbol: '',
        color: '#94a3b8',
        badgeClass: 'comp-none',
        label: '',
        deltaText: '',
        detail: 'Masukkan nama & harga untuk komparasi'
      };
    }

    const pastRecord = this.findHistoricalPrice(productName, currentStore, currentDate, historySessions);

    if (!pastRecord) {
      return {
        hasHistory: false,
        trend: 'NEW',
        symbol: '✨',
        color: '#06b6d4',
        badgeClass: 'comp-new',
        label: 'Item Baru',
        deltaText: 'Belum ada riwayat',
        detail: `Belum pernah dibeli di ${currentStore}. Akan dicatat sebagai riwayat baru.`
      };
    }

    const delta = price - pastRecord.pastPrice;
    const absDelta = Math.abs(delta);
    const formattedDelta = Calculator.formatRupiah(absDelta);
    const formattedPastPrice = Calculator.formatRupiah(pastRecord.pastPrice);

    // Format readable date
    let dateStr = pastRecord.date;
    try {
      if (dateStr && dateStr.includes('-')) {
        const d = new Date(dateStr);
        dateStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      }
    } catch (e) {}

    const storeNote = pastRecord.isSameStore ? `di ${pastRecord.store}` : `di ${pastRecord.store}`;

    if (delta > 0) {
      // PRICE WENT UP - Red Up Arrow (↑)
      return {
        hasHistory: true,
        trend: 'UP',
        symbol: '↑',
        color: '#ef4444',
        badgeClass: 'comp-up',
        label: `+${formattedDelta}`,
        deltaText: `Naik +${formattedDelta}`,
        detail: `Harga naik dibanding riwayat lalu (${formattedPastPrice} • ${dateStr} ${storeNote})`,
        pastPrice: pastRecord.pastPrice,
        pastDate: pastRecord.date,
        pastStore: pastRecord.store,
        delta
      };
    } else if (delta < 0) {
      // PRICE WENT DOWN - Green Down Arrow (↓)
      return {
        hasHistory: true,
        trend: 'DOWN',
        symbol: '↓',
        color: '#10b981',
        badgeClass: 'comp-down',
        label: `-${formattedDelta}`,
        deltaText: `Hemat -${formattedDelta}`,
        detail: `Harga lebih murah dibanding riwayat lalu (${formattedPastPrice} • ${dateStr} ${storeNote})`,
        pastPrice: pastRecord.pastPrice,
        pastDate: pastRecord.date,
        pastStore: pastRecord.store,
        delta
      };
    } else {
      // PRICE IS EQUAL - Equal Sign (=)
      return {
        hasHistory: true,
        trend: 'EQUAL',
        symbol: '=',
        color: '#94a3b8',
        badgeClass: 'comp-equal',
        label: 'Stabil',
        deltaText: 'Harga Tetap',
        detail: `Harga stabil, sama persis dengan riwayat (${formattedPastPrice} • ${dateStr} ${storeNote})`,
        pastPrice: pastRecord.pastPrice,
        pastDate: pastRecord.date,
        pastStore: pastRecord.store,
        delta: 0
      };
    }
  },

  /**
   * Get cross-store price comparison for any staple item (F-06 Multi-Store comparison)
   * @param {string} productName 
   * @param {Array} historySessions 
   * @param {object} currentSession
   * @returns {Array} List of { store, date, price, formattedPrice, isCheapest, deltaVsCheapest }
   */
  getCrossStoreComparison(productName, historySessions = [], currentSession = null) {
    const norm = this.normalizeName(productName);
    const storeMap = new Map();

    // 1. Check current active session
    if (currentSession && Array.isArray(currentSession.items)) {
      const activeItem = currentSession.items.find(it => this.getSimilarity(it.name, norm) >= 0.70);
      if (activeItem) {
        storeMap.set(currentSession.store, {
          store: currentSession.store,
          date: currentSession.date || 'Sesi Berjalan',
          unitPrice: activeItem.unitPrice,
          unit: activeItem.unit,
          discount: activeItem.discount,
          productName: activeItem.name,
          isCurrentStore: true
        });
      }
    }

    // 2. Check history sessions
    for (const session of historySessions) {
      for (const item of session.items) {
        if (this.getSimilarity(item.name, norm) >= 0.70) {
          // If already encountered this store, keep the latest one
          if (!storeMap.has(session.store) || new Date(session.date) > new Date(storeMap.get(session.store).date)) {
            storeMap.set(session.store, {
              store: session.store,
              date: session.date,
              unitPrice: item.unitPrice,
              unit: item.unit,
              discount: item.discount,
              productName: item.name,
              isCurrentStore: currentSession && currentSession.store === session.store
            });
          }
        }
      }
    }

    // 3. Match against rich STAPLE_BENCHMARK_PRICES for realistic multi-store comparison
    for (const [key, storeEntries] of Object.entries(STAPLE_BENCHMARK_PRICES)) {
      if (norm.includes(key)) {
        storeEntries.forEach(entry => {
          if (!storeMap.has(entry.store)) {
            storeMap.set(entry.store, {
              store: entry.store,
              date: entry.date,
              unitPrice: entry.price,
              unit: entry.unit,
              discount: '',
              productName: productName,
              isCurrentStore: currentSession && currentSession.store === entry.store
            });
          }
        });
        break;
      }
    }

    // 4. Fallback to MASTER_CATALOG if needed
    if (storeMap.size < 2) {
      const catalogMatches = MASTER_CATALOG.filter(cat => this.getSimilarity(cat.name, norm) >= 0.70);
      catalogMatches.forEach(cat => {
        const storeName = cat.store || 'Pasar Tradisional / Grosir';
        if (!storeMap.has(storeName)) {
          storeMap.set(storeName, {
            store: storeName,
            date: 'Acuan Pasar',
            unitPrice: cat.benchmarkPrice,
            unit: cat.unit,
            discount: '',
            productName: cat.name,
            isCurrentStore: false
          });
        }
      });
    }

    const results = Array.from(storeMap.values()).sort((a, b) => a.unitPrice - b.unitPrice);
    if (results.length > 0) {
      const lowestPrice = results[0].unitPrice;
      results.forEach((r, idx) => {
        r.isCheapest = idx === 0;
        r.deltaVsCheapest = r.unitPrice - lowestPrice;
        r.formattedPrice = Calculator.formatRupiah(r.unitPrice);
      });
    }
    return results;
  }
};

function currentPriceValid(name) {
  return typeof name === 'string' && name.trim().length > 1;
}
