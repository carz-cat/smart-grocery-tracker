/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Comparator (Komparator Harga Realtime vs Riwayat Toko - F-04)
 */

import { Calculator } from './calculator.js';
import { MASTER_CATALOG } from './store.js';

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
   * @returns {Array} List of { store, date, price, formattedPrice }
   */
  getCrossStoreComparison(productName, historySessions = []) {
    const norm = this.normalizeName(productName);
    const storeMap = new Map();

    // Check history sessions
    for (const session of historySessions) {
      for (const item of session.items) {
        if (this.getSimilarity(item.name, norm) >= 0.75) {
          // If already encountered this store, keep the latest one
          if (!storeMap.has(session.store) || new Date(session.date) > new Date(storeMap.get(session.store).date)) {
            storeMap.set(session.store, {
              store: session.store,
              date: session.date,
              unitPrice: item.unitPrice,
              unit: item.unit,
              discount: item.discount,
              productName: item.name
            });
          }
        }
      }
    }

    const results = Array.from(storeMap.values()).sort((a, b) => a.unitPrice - b.unitPrice);
    return results;
  }
};

function currentPriceValid(name) {
  return typeof name === 'string' && name.trim().length > 1;
}
