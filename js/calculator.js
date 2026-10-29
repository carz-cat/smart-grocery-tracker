/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Calculator (Diskon Bertingkat, Perhitungan Kuantitas, Audit PPN & Pembanding Kemasan)
 */

export const Calculator = {
  /**
   * Format number as Indonesian Rupiah string (e.g., Rp 75.000)
   * @param {number} amount 
   * @param {boolean} includePrefix 
   * @returns {string}
   */
  formatRupiah(amount, includePrefix = true) {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return includePrefix ? 'Rp 0' : '0';
    }
    const rounded = Math.round(amount);
    const formatted = new Intl.NumberFormat('id-ID').format(rounded);
    return includePrefix ? `Rp ${formatted}` : formatted;
  },

  /**
   * Parse numeric string input into clean float
   * @param {string|number} value 
   * @returns {number}
   */
  parseNumber(value) {
    if (typeof value === 'number') return isNaN(value) ? 0 : value;
    if (!value) return 0;
    // Remove "Rp", dots, spaces
    const cleanStr = value.toString()
      .replace(/Rp/gi, '')
      .replace(/\s+/g, '')
      .replace(/\./g, '')
      .replace(/,/g, '.');
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
  },

  /**
   * Parse and calculate single or multi-tier discounts (F-03)
   * Handles:
   * - Single %: "25%", "25"
   * - Stacked / Bertingkat %: "50% + 20%", "30% + 10% + 5%"
   * - Nominal deduction: "Rp 5.000", "5000", "5.000"
   * - Buy 1 Get 1 (50%), Buy 2 Get 1 (33.3%)
   * 
   * Mathematical formula for stacked discounts (e.g., 50% + 20%):
   * Price after 1st tier: P1 = P * (1 - 0.50)
   * Price after 2nd tier: P2 = P1 * (1 - 0.20)
   * Total Discount Amount = P - P2
   * Effective Discount % = ((P - P2) / P) * 100
   * 
   * @param {number} originalPrice 
   * @param {string|number} discountInput 
   * @returns {object} { finalUnitPrice, discountAmount, effectivePercent, formulaText, tiers: [] }
   */
  calculateDiscount(originalPrice, discountInput) {
    const price = Math.max(0, this.parseNumber(originalPrice));
    if (!price || !discountInput) {
      return {
        originalPrice: price,
        finalUnitPrice: price,
        discountAmount: 0,
        effectivePercent: 0,
        formulaText: 'Tanpa Diskon',
        tiers: [],
        isStacked: false
      };
    }

    let inputStr = discountInput.toString().trim();

    // Check Promo text shortcuts
    if (/beli\s*1\s*gratis\s*1/i.test(inputStr)) {
      inputStr = '50%';
    } else if (/beli\s*2\s*gratis\s*1/i.test(inputStr)) {
      inputStr = '33.33%';
    }

    // Check if input is purely nominal (e.g. "Rp 10.000" or starts with "rp")
    if (/^rp/i.test(inputStr) || (!inputStr.includes('%') && !inputStr.includes('+') && this.parseNumber(inputStr) > 100)) {
      const nominalCut = Math.min(price, this.parseNumber(inputStr));
      const finalPrice = Math.max(0, price - nominalCut);
      const effectivePct = price > 0 ? (nominalCut / price) * 100 : 0;
      return {
        originalPrice: price,
        finalUnitPrice: Math.round(finalPrice),
        discountAmount: Math.round(nominalCut),
        effectivePercent: Math.round(effectivePct * 10) / 10,
        formulaText: `Potongan ${this.formatRupiah(nominalCut)}`,
        tiers: [{ type: 'nominal', value: nominalCut }],
        isStacked: false
      };
    }

    // Split by '+' or ',' for stacked discounts (e.g. "50% + 20%")
    const tierStrings = inputStr.split(/[+,]/).map(t => t.trim()).filter(Boolean);
    const tiers = [];
    let currentPrice = price;
    const tierSteps = [];

    for (let i = 0; i < tierStrings.length; i++) {
      const tierVal = parseFloat(tierStrings[i].replace('%', '').trim());
      if (!isNaN(tierVal) && tierVal > 0) {
        // Percentage tier
        const pct = Math.min(100, tierVal);
        const cut = currentPrice * (pct / 100);
        currentPrice = Math.max(0, currentPrice - cut);
        tiers.push(pct);
        tierSteps.push(`${pct}%`);
      }
    }

    if (tiers.length === 0) {
      return {
        originalPrice: price,
        finalUnitPrice: price,
        discountAmount: 0,
        effectivePercent: 0,
        formulaText: 'Tanpa Diskon',
        tiers: [],
        isStacked: false
      };
    }

    const totalDiscountAmount = price - currentPrice;
    const effectivePercent = price > 0 ? (totalDiscountAmount / price) * 100 : 0;
    const isStacked = tiers.length > 1;

    let formulaText = '';
    if (isStacked) {
      formulaText = `${tierSteps.join(' + ')} (Hemat ${Math.round(effectivePercent)}%)`;
    } else {
      formulaText = `${tierSteps[0]} (Hemat ${this.formatRupiah(totalDiscountAmount)})`;
    }

    return {
      originalPrice: price,
      finalUnitPrice: Math.round(currentPrice),
      discountAmount: Math.round(totalDiscountAmount),
      effectivePercent: Math.round(effectivePercent * 10) / 10,
      formulaText: formulaText,
      tiers: tiers,
      isStacked: isStacked
    };
  },

  /**
   * Calculate single row item total in real time (F-02)
   * @param {number} qty 
   * @param {number} originalUnitPrice 
   * @param {string|number} discountInput 
   * @returns {object}
   */
  calculateItemRow(qty, originalUnitPrice, discountInput = '') {
    const validQty = Math.max(0, this.parseNumber(qty));
    const discResult = this.calculateDiscount(originalUnitPrice, discountInput);
    const rowRawTotal = Math.round(validQty * discResult.originalPrice);
    const rowFinalTotal = Math.round(validQty * discResult.finalUnitPrice);
    const rowSavings = rowRawTotal - rowFinalTotal;

    return {
      qty: validQty,
      originalUnitPrice: discResult.originalPrice,
      finalUnitPrice: discResult.finalUnitPrice,
      discountAmountPerUnit: discResult.discountAmount,
      effectivePercent: discResult.effectivePercent,
      formulaText: discResult.formulaText,
      isStacked: discResult.isStacked,
      rowRawTotal,
      rowFinalTotal,
      rowSavings
    };
  },

  /**
   * Calculate full cart summary & Budget Safety Cap status (F-05)
   * Status indicators:
   * - SAFE (Aman): <80% usage
   * - WARNING (Waspada): >=80% and <=100% usage
   * - DANGER (Defisit / Over Budget): >100% usage
   * @param {Array} items 
   * @param {number} walletBudgetCap 
   * @returns {object}
   */
  calculateCartSummary(items = [], walletBudgetCap = 600000) {
    let totalRaw = 0;
    let totalFinal = 0;
    let totalSavings = 0;
    let totalQty = 0;
    const categoryTotals = {};

    items.forEach(item => {
      const calc = this.calculateItemRow(item.qty, item.unitPrice, item.discount);
      totalRaw += calc.rowRawTotal;
      totalFinal += calc.rowFinalTotal;
      totalSavings += calc.rowSavings;
      totalQty += calc.qty;

      const cat = item.category || 'Lainnya';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + calc.rowFinalTotal;
    });

    const budgetCap = Math.max(0, this.parseNumber(walletBudgetCap));
    const remaining = budgetCap - totalFinal;
    const budgetUsagePercent = budgetCap > 0 ? (totalFinal / budgetCap) * 100 : 0;

    let budgetStatus = 'SAFE'; // SAFE (<80%), WARNING (>=80% and <=100%), DANGER (>100%)
    let statusText = 'Anggaran Aman';
    let statusBanner = '';

    if (budgetUsagePercent > 100) {
      budgetStatus = 'DANGER';
      const overAmount = Math.abs(remaining);
      statusText = 'DEFISIT (OVER BUDGET!)';
      statusBanner = `PERINGATAN DEFISIT! Total belanja melebihi batas saldo dompet sebesar ${this.formatRupiah(overAmount)}. Kurangi barang non-esensial!`;
    } else if (budgetUsagePercent >= 80) {
      budgetStatus = 'WARNING';
      statusText = `Waspada (${Math.round(budgetUsagePercent)}%)`;
      statusBanner = `Peringatan Waspada (${Math.round(budgetUsagePercent)}%)! Total belanja mendekati limit saldo dompet. Sisa saldo: ${this.formatRupiah(remaining)}.`;
    } else {
      budgetStatus = 'SAFE';
      statusText = `Aman (${Math.round(budgetUsagePercent)}%)`;
      statusBanner = `Bagus! Pengeluaran masih dalam batas aman. Sisa saldo dompet: ${this.formatRupiah(remaining)}.`;
    }

    return {
      itemCount: items.length,
      totalQty,
      totalRaw,
      totalFinal,
      totalSavings,
      budgetCap,
      remaining,
      budgetUsagePercent: Math.round(budgetUsagePercent * 10) / 10,
      budgetStatus,
      statusText,
      statusBanner,
      categoryTotals
    };
  },

  /**
   * Pembanding Kemasan (Value Comparator: Opsi Kemasan A vs Kemasan B)
   * Membandingkan harga per satuan unit (gram / ml / pcs)
   * @param {number} sizeA - Ukuran/isi kemasan A (misal: 400)
   * @param {number} priceA - Harga kemasan A (misal: 25000)
   * @param {number} sizeB - Ukuran/isi kemasan B (misal: 900)
   * @param {number} priceB - Harga kemasan B (misal: 45000)
   * @param {string} unit - Satuan (gram, ml, pcs)
   * @returns {object}
   */
  comparePackages(sizeA, priceA, sizeB, priceB, unit = 'gram') {
    const sA = Math.max(0.001, this.parseNumber(sizeA));
    const pA = Math.max(0, this.parseNumber(priceA));
    const sB = Math.max(0.001, this.parseNumber(sizeB));
    const pB = Math.max(0, this.parseNumber(priceB));

    const unitCostA = pA / sA; // Rp per unit
    const unitCostB = pB / sB; // Rp per unit

    let winner = 'EQUAL';
    let savingsPercent = 0;
    let savingsNominalPerHundred = 0;
    let recommendation = 'Kedua kemasan memiliki harga satuan yang sama.';

    if (unitCostA < unitCostB) {
      winner = 'A';
      savingsPercent = ((unitCostB - unitCostA) / unitCostB) * 100;
      savingsNominalPerHundred = (unitCostB - unitCostA) * 100;
      recommendation = `Opsi Kemasan A lebih hemat ${savingsPercent.toFixed(1)}% per ${unit}!`;
    } else if (unitCostB < unitCostA) {
      winner = 'B';
      savingsPercent = ((unitCostA - unitCostB) / unitCostA) * 100;
      savingsNominalPerHundred = (unitCostA - unitCostB) * 100;
      recommendation = `Opsi Kemasan B lebih hemat ${savingsPercent.toFixed(1)}% per ${unit}!`;
    }

    return {
      sizeA: sA,
      priceA: pA,
      unitCostA,
      sizeB: sB,
      priceB: pB,
      unitCostB,
      unit,
      winner,
      savingsPercent: Math.round(savingsPercent * 10) / 10,
      savingsNominalPerHundred: Math.round(savingsNominalPerHundred),
      recommendation
    };
  },

  /**
   * Audit PPN 11% (Pajak Pertambahan Nilai)
   * @param {number} amount
   * @param {boolean} isGrossPrice - Apakah amount sudah termasuk PPN atau belum
   * @param {number} vatRate - Tarif PPN (default 11% / 0.11)
   */
  calculateVatAudit(amount, isGrossPrice = true, vatRate = 0.11) {
    const val = Math.max(0, this.parseNumber(amount));
    if (isGrossPrice) {
      // Harga sudah termasuk PPN 11%
      const dpp = val / (1 + vatRate);
      const vat = val - dpp;
      return {
        dpp: Math.round(dpp),
        vat: Math.round(vat),
        total: Math.round(val),
        ratePercent: vatRate * 100
      };
    } else {
      // Harga belum termasuk PPN
      const vat = val * vatRate;
      const total = val + vat;
      return {
        dpp: Math.round(val),
        vat: Math.round(vat),
        total: Math.round(total),
        ratePercent: vatRate * 100
      };
    }
  }
};
