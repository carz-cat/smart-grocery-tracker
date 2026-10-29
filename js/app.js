/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Main Application Controller (PWA Native App Style)
 */

import { GroceryStoreManager, CATEGORIES, UNITS, MASTER_CATALOG } from './store.js';
import { Calculator } from './calculator.js';
import { Comparator } from './comparator.js';
import { soundMgr } from './sound.js';
import { authMgr } from './auth.js';

class SmartGroceryApp {
  constructor() {
    this.store = new GroceryStoreManager();
    this.activeTab = 'tabBelanja';
    this.selectedCategoryFilter = 'ALL';
    this.isDesktopExpanded = false;
    this.lastBudgetStatus = 'SAFE';

    // DOM Elements Cache
    this.dom = {
      appShell: document.getElementById('appShell'),
      btnToggleWidth: document.getElementById('btnToggleWidth'),
      btnResetData: document.getElementById('btnResetData'),
      
      // Mini Sound Toggle
      btnSoundToggle: document.getElementById('btnSoundToggle'),
      soundIconOn: document.getElementById('soundIconOn'),
      soundIconMute: document.getElementById('soundIconMute'),

      // User Auth Button & Header Pill
      btnUserAuth: document.getElementById('btnUserAuth'),
      headerUserAvatar: document.getElementById('headerUserAvatar'),
      headerAuthLabel: document.getElementById('headerAuthLabel'),

      // Theme Toggle
      btnThemeToggle: document.getElementById('btnThemeToggle'),
      themeIconSun: document.getElementById('themeIconSun'),
      themeIconMoon: document.getElementById('themeIconMoon'),

      // Header & Session
      headerStoreName: document.getElementById('headerStoreName'),
      headerDateDisplay: document.getElementById('headerDateDisplay'),
      btnOpenStorePicker: document.getElementById('btnOpenStorePicker'),
      btnOpenDatePicker: document.getElementById('btnOpenDatePicker'),
      sessionDatePicker: document.getElementById('sessionDatePicker'),
      islandItemCount: document.getElementById('islandItemCount'),
      tickerItemCount: document.getElementById('tickerItemCount'),
      tickerTotalQty: document.getElementById('tickerTotalQty'),
      tickerGrandTotal: document.getElementById('tickerGrandTotal'),

      // Date Picker Modal with Checkmark
      modalDatePickerBackdrop: document.getElementById('modalDatePickerBackdrop'),
      btnCloseDatePickerModal: document.getElementById('btnCloseDatePickerModal'),
      inputModalDateSelection: document.getElementById('inputModalDateSelection'),
      btnCancelDateChange: document.getElementById('btnCancelDateChange'),
      btnConfirmDateWithCheck: document.getElementById('btnConfirmDateWithCheck'),

      // Safety Cap Bar
      budgetStatusPill: document.getElementById('budgetStatusPill'),
      capSpentText: document.getElementById('capSpentText'),
      capLimitText: document.getElementById('capLimitText'),
      budgetProgressFill: document.getElementById('budgetProgressFill'),
      safetyAlertBanner: document.getElementById('safetyAlertBanner'),
      safetyAlertMessage: document.getElementById('safetyAlertMessage'),

      // Tab Panels & Bottom Nav
      tabBelanja: document.getElementById('tabBelanja'),
      tabRiwayat: document.getElementById('tabRiwayat'),
      tabAnggaran: document.getElementById('tabAnggaran'),
      navBelanja: document.getElementById('navBelanja'),
      navRiwayat: document.getElementById('navRiwayat'),
      navAnggaran: document.getElementById('navAnggaran'),
      navCartBadge: document.getElementById('navCartBadge'),

      // Cart Tab
      groceryItemsContainer: document.getElementById('groceryItemsContainer'),
      emptyCartState: document.getElementById('emptyCartState'),
      cartCheckoutActions: document.getElementById('cartCheckoutActions'),
      categoryFilterContainer: document.getElementById('categoryFilterContainer'),
      btnFloatingAdd: document.getElementById('btnFloatingAdd'),
      btnQuickClearCart: document.getElementById('btnQuickClearCart'),
      btnFinishSession: document.getElementById('btnFinishSession'),

      // History Tab
      historySessionsContainer: document.getElementById('historySessionsContainer'),
      inputCompareSearch: document.getElementById('inputCompareSearch'),
      btnExecuteSearchCompare: document.getElementById('btnExecuteSearchCompare'),
      comparisonResultsContainer: document.getElementById('comparisonResultsContainer'),

      // Budget Tab
      inputBudgetCap: document.getElementById('inputBudgetCap'),
      budgetSummaryRaw: document.getElementById('budgetSummaryRaw'),
      budgetSummarySavings: document.getElementById('budgetSummarySavings'),
      budgetSummaryNet: document.getElementById('budgetSummaryNet'),
      budgetSummaryRemaining: document.getElementById('budgetSummaryRemaining'),
      categoryBreakdownContainer: document.getElementById('categoryBreakdownContainer'),
      triageCard: document.getElementById('triageCard'),
      triageItemsContainer: document.getElementById('triageItemsContainer'),

      // Modal Add/Edit Item
      sheetAddItemBackdrop: document.getElementById('sheetAddItemBackdrop'),
      btnCloseAddItemSheet: document.getElementById('btnCloseAddItemSheet'),
      formAddItem: document.getElementById('formAddItem'),
      addItemTitle: document.getElementById('addItemTitle'),
      inputEditItemId: document.getElementById('inputEditItemId'),
      quickStaplesChips: document.getElementById('quickStaplesChips'),
      inputItemName: document.getElementById('inputItemName'),
      itemNameError: document.getElementById('itemNameError'),
      selectItemCategory: document.getElementById('selectItemCategory'),
      selectItemUnit: document.getElementById('selectItemUnit'),
      unitButtonsGrid: document.getElementById('unitButtonsGrid'),
      inputItemQty: document.getElementById('inputItemQty'),
      inputItemUnitPrice: document.getElementById('inputItemUnitPrice'),
      inputItemDiscount: document.getElementById('inputItemDiscount'),
      inputItemNotes: document.getElementById('inputItemNotes'),
      itemSheetComparatorPreview: document.getElementById('itemSheetComparatorPreview'),
      compSymbol: document.getElementById('compSymbol'),
      compText: document.getElementById('compText'),
      modalCalcUnitPrice: document.getElementById('modalCalcUnitPrice'),
      modalCalcDiscount: document.getElementById('modalCalcDiscount'),
      modalCalcRowTotal: document.getElementById('modalCalcRowTotal'),
      btnSubmitItem: document.getElementById('btnSubmitItem'),

      // Modal Store Picker
      sheetStorePickerBackdrop: document.getElementById('sheetStorePickerBackdrop'),
      btnCloseStorePicker: document.getElementById('btnCloseStorePicker'),
      storeListContainer: document.getElementById('storeListContainer'),
      inputNewStore: document.getElementById('inputNewStore'),
      btnAddCustomStore: document.getElementById('btnAddCustomStore'),
      btnDetectGpsStore: document.getElementById('btnDetectGpsStore'),

      // Modal Receipt Detail
      sheetReceiptDetailBackdrop: document.getElementById('sheetReceiptDetailBackdrop'),
      btnCloseReceiptDetail: document.getElementById('btnCloseReceiptDetail'),
      receiptModalTitle: document.getElementById('receiptModalTitle'),
      receiptDetailBody: document.getElementById('receiptDetailBody'),

      // Modal Confirmation Clear Cart (Non-blocking UX)
      modalConfirmClearCartBackdrop: document.getElementById('modalConfirmClearCartBackdrop'),
      btnCancelClearCart: document.getElementById('btnCancelClearCart'),
      btnConfirmClearCartAction: document.getElementById('btnConfirmClearCartAction'),

      // Modal Auth Gatekeeper
      modalAuthBackdrop: document.getElementById('modalAuthBackdrop'),
      btnCloseAuthModal: document.getElementById('btnCloseAuthModal'),
      tabBtnLogin: document.getElementById('tabBtnLogin'),
      tabBtnRegister: document.getElementById('tabBtnRegister'),
      authAlertBox: document.getElementById('authAlertBox'),
      btnGoogleLogin: document.getElementById('btnGoogleLogin'),
      formLogin: document.getElementById('formLogin'),
      loginEmail: document.getElementById('loginEmail'),
      loginPassword: document.getElementById('loginPassword'),
      formRegister: document.getElementById('formRegister'),
      regName: document.getElementById('regName'),
      regEmail: document.getElementById('regEmail'),
      regPassword: document.getElementById('regPassword'),
      btnContinueGuest: document.getElementById('btnContinueGuest'),

      // Modal User Profile
      modalUserProfileBackdrop: document.getElementById('modalUserProfileBackdrop'),
      btnCloseProfileModal: document.getElementById('btnCloseProfileModal'),
      profileAvatarLarge: document.getElementById('profileAvatarLarge'),
      profileUserName: document.getElementById('profileUserName'),
      profileUserEmail: document.getElementById('profileUserEmail'),
      profileBadgePill: document.getElementById('profileBadgePill'),
      btnLogoutAction: document.getElementById('btnLogoutAction'),

      // Toast
      toastContainer: document.getElementById('toastContainer')
    };

    this.init();
  }

  init() {
    this.applyTheme(this.store.theme);
    this.updateSoundIcon();
    this.renderQuickStaplesChips();
    this.renderCategoryFilterChips();
    this.bindUnitButtons();
    this.bindEvents();

    // Subscribe to auth state updates
    authMgr.onUserChange((user, isGuest) => {
      this.updateAuthUI(user, isGuest);
      if (user) {
        this.store.setUserId(user.uid);
      } else {
        this.store.setUserId(null);
      }
    });

    // Subscribe to store updates
    this.store.subscribe(() => {
      this.render();
    });

    // Initial render
    this.render();

    // Initialize date picker
    this.dom.sessionDatePicker.value = this.store.activeSession.date;

    // Initial staple comparison
    this.runStapleComparison('Minyak Goreng Bimoli 2L');

    // Show Auth Gatekeeper prompt if not logged in and not guest
    if (!authMgr.isLoggedIn() && !authMgr.isGuest) {
      setTimeout(() => {
        this.openAuthModal();
      }, 700);
    }
  }

  /**
   * Sound Manager UI Sync
   */
  updateSoundIcon() {
    const enabled = soundMgr.isEnabled();
    if (this.dom.soundIconOn && this.dom.soundIconMute) {
      this.dom.soundIconOn.style.display = enabled ? 'block' : 'none';
      this.dom.soundIconMute.style.display = enabled ? 'none' : 'block';
    }
  }

  toggleSound() {
    const isNowEnabled = soundMgr.toggle();
    this.updateSoundIcon();
    this.showToast(`Suara interaksi: ${isNowEnabled ? 'Aktif' : 'Senyap'}`, 'info');
  }

  /**
   * Auth UI Orchestrator
   */
  updateAuthUI(user, isGuest) {
    if (user) {
      const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Akun';
      this.dom.headerAuthLabel.textContent = firstName;

      if (user.photoURL) {
        this.dom.headerUserAvatar.innerHTML = `<img src="${user.photoURL}" alt="${escapeHtml(firstName)}" />`;
        this.dom.profileAvatarLarge.innerHTML = `<img src="${user.photoURL}" alt="${escapeHtml(user.displayName)}" />`;
      } else {
        const initial = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
        this.dom.headerUserAvatar.textContent = initial;
        this.dom.profileAvatarLarge.textContent = initial;
      }

      this.dom.profileUserName.textContent = user.displayName || 'Pengguna Smart Grocery';
      this.dom.profileUserEmail.textContent = user.email || 'Akun Lokal';
      this.dom.profileBadgePill.textContent = user.provider === 'google' ? 'Akun Google Terhubung' : 'Akun Terdaftar';
      this.dom.profileBadgePill.style.display = 'inline-block';
    } else {
      this.dom.headerAuthLabel.textContent = isGuest ? 'Tamu' : 'Masuk';
      this.dom.headerUserAvatar.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      `;
    }
  }

  openAuthModal() {
    soundMgr.playPop();
    this.dom.modalAuthBackdrop.style.display = 'flex';
    this.dom.authAlertBox.style.display = 'none';
    this.switchAuthTab('login');
  }

  closeAuthModal() {
    this.dom.modalAuthBackdrop.style.display = 'none';
  }

  openUserProfileModal() {
    soundMgr.playPop();
    this.dom.modalUserProfileBackdrop.style.display = 'flex';
  }

  closeUserProfileModal() {
    this.dom.modalUserProfileBackdrop.style.display = 'none';
  }

  switchAuthTab(tab) {
    soundMgr.playPop();
    if (tab === 'login') {
      this.dom.tabBtnLogin.classList.add('active');
      this.dom.tabBtnRegister.classList.remove('active');
      this.dom.formLogin.style.display = 'flex';
      this.dom.formRegister.style.display = 'none';
    } else {
      this.dom.tabBtnRegister.classList.add('active');
      this.dom.tabBtnLogin.classList.remove('active');
      this.dom.formRegister.style.display = 'flex';
      this.dom.formLogin.style.display = 'none';
    }
    this.dom.authAlertBox.style.display = 'none';
  }

  showAuthError(message) {
    this.dom.authAlertBox.textContent = message;
    this.dom.authAlertBox.style.display = 'block';
    this.triggerHaptic();
  }

  /**
   * Date Picker with Checkmark Confirmation (User Request)
   */
  openDatePickerModal() {
    soundMgr.playPop();
    const curDate = this.store.activeSession.date || new Date().toISOString().split('T')[0];
    if (this.dom.inputModalDateSelection) {
      this.dom.inputModalDateSelection.value = curDate;
    }
    if (this.dom.modalDatePickerBackdrop) {
      this.dom.modalDatePickerBackdrop.style.display = 'flex';
    }
  }

  closeDatePickerModal() {
    if (this.dom.modalDatePickerBackdrop) {
      this.dom.modalDatePickerBackdrop.style.display = 'none';
    }
  }

  confirmDateChange() {
    const chosen = this.dom.inputModalDateSelection?.value;
    if (!chosen) {
      soundMgr.playWarning();
      this.showToast('Pilih tanggal terlebih dahulu', 'warning');
      return;
    }
    this.store.setDate(chosen);
    if (this.dom.sessionDatePicker) {
      this.dom.sessionDatePicker.value = chosen;
    }
    soundMgr.playSuccess();
    this.closeDatePickerModal();
    this.showToast(`Tanggal transaksi dikonfirmasi: ${this.formatDisplayDate(chosen)}`, 'success');
  }

  formatDisplayDate(dateStr) {
    if (!dateStr) return '26 Okt 2026';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        return `${day} ${months[monthNum - 1] || parts[1]} ${year}`;
      }
    } catch (_) {}
    return dateStr;
  }

  /**
   * Theme mode switcher (Dark / Light Mode)
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      this.dom.themeIconSun.style.display = 'block';
      this.dom.themeIconMoon.style.display = 'none';
    } else {
      this.dom.themeIconSun.style.display = 'none';
      this.dom.themeIconMoon.style.display = 'block';
    }
  }

  toggleTheme() {
    const newTheme = this.store.theme === 'dark' ? 'light' : 'dark';
    this.store.setTheme(newTheme);
    this.applyTheme(newTheme);
    this.showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`, 'info');
  }

  /**
   * Main render orchestrator
   */
  render() {
    const session = this.store.activeSession;
    const summary = Calculator.calculateCartSummary(session.items, session.budgetCap);

    this.renderHeaderAndSafetyCap(session, summary);
    this.renderCartItems(session.items);
    this.renderHistoryTab();
    this.renderBudgetTab(session, summary);
  }

  /**
   * Render Header & Realtime Safety Cap status (F-01 & F-05)
   */
  renderHeaderAndSafetyCap(session, summary) {
    this.dom.headerStoreName.textContent = session.store;
    if (this.dom.headerDateDisplay) {
      this.dom.headerDateDisplay.textContent = this.formatDisplayDate(session.date);
    }
    this.dom.islandItemCount.textContent = `${summary.itemCount} Items`;
    this.dom.tickerItemCount.textContent = summary.itemCount;
    this.dom.tickerTotalQty.textContent = summary.totalQty % 1 === 0 ? summary.totalQty : summary.totalQty.toFixed(1);
    this.dom.tickerGrandTotal.textContent = Calculator.formatRupiah(summary.totalFinal);

    this.dom.navCartBadge.textContent = summary.itemCount;
    this.dom.navCartBadge.style.display = summary.itemCount > 0 ? 'flex' : 'none';

    // Sound alert when entering WARNING or DANGER budget state
    if (summary.budgetStatus !== this.lastBudgetStatus) {
      if (summary.budgetStatus === 'WARNING' || summary.budgetStatus === 'DANGER') {
        soundMgr.playWarning();
      }
      this.lastBudgetStatus = summary.budgetStatus;
    }

    // Safety Cap Status
    this.dom.capSpentText.textContent = Calculator.formatRupiah(summary.totalFinal);
    this.dom.capLimitText.textContent = ` / ${Calculator.formatRupiah(summary.budgetCap)}`;

    const pct = summary.budgetUsagePercent;
    const clampedWidth = Math.min(100, Math.max(0, pct));
    this.dom.budgetProgressFill.style.width = `${clampedWidth}%`;

    this.dom.budgetStatusPill.className = 'budget-status-pill one-line';
    this.dom.budgetProgressFill.className = 'budget-progress-fill';
    this.dom.safetyAlertBanner.className = 'safety-alert-banner';

    if (summary.budgetStatus === 'DANGER') {
      // Over Budget (>100%) - Exact wording from DT2 Skenario Uji 5
      this.dom.budgetStatusPill.classList.add('pill-danger');
      this.dom.budgetStatusPill.textContent = `OVER BUDGET! (${pct}%)`;
      this.dom.budgetProgressFill.classList.add('fill-danger');
      this.dom.safetyAlertBanner.classList.add('banner-danger');
      this.dom.safetyAlertBanner.style.display = 'flex';
      this.dom.safetyAlertMessage.innerHTML = `<strong>Total belanja melebihi batas saldo dompet!</strong> Kurangi kuantitas atau batalkan barang sekunder. (Melebihi ${Calculator.formatRupiah(Math.abs(summary.remaining))})`;
    } else if (summary.budgetStatus === 'WARNING') {
      // Warning (>= 90% and <= 100%) - Peringatan Waspada DT2 Skenario Uji 5
      this.dom.budgetStatusPill.classList.add('pill-warning');
      this.dom.budgetStatusPill.textContent = `Peringatan Waspada (${pct}%)`;
      this.dom.budgetProgressFill.classList.add('fill-warning');
      this.dom.safetyAlertBanner.classList.add('banner-warning');
      this.dom.safetyAlertBanner.style.display = 'flex';
      this.dom.safetyAlertMessage.innerHTML = `<strong>Peringatan Waspada (${pct}%)!</strong> Total belanja mendekati limit saldo dompet. Sisa saldo: ${Calculator.formatRupiah(summary.remaining)}.`;
    } else {
      // Safe (<90%)
      this.dom.budgetStatusPill.classList.add('pill-safe');
      this.dom.budgetStatusPill.textContent = `Aman (${pct}%)`;
      this.dom.budgetProgressFill.classList.add('fill-safe');
      this.dom.safetyAlertBanner.style.display = 'none';
    }
  }

  /**
   * Render Cart Items with Stepper & Price Comparator (F-01, F-02, F-04)
   */
  renderCartItems(items) {
    const container = this.dom.groceryItemsContainer;
    container.innerHTML = '';

    if (!items || items.length === 0) {
      this.dom.emptyCartState.style.display = 'block';
      this.dom.cartCheckoutActions.style.display = 'none';
      return;
    }

    this.dom.emptyCartState.style.display = 'none';
    this.dom.cartCheckoutActions.style.display = 'flex';

    // Apply category filter
    const filteredItems = this.selectedCategoryFilter === 'ALL'
      ? items
      : items.filter(it => it.category === this.selectedCategoryFilter);

    if (filteredItems.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 13px;">
          Tidak ada barang di kategori "${this.selectedCategoryFilter}".
        </div>
      `;
      return;
    }

    filteredItems.forEach(item => {
      const calc = Calculator.calculateItemRow(item.qty, item.unitPrice, item.discount);
      const comparison = Comparator.comparePrice(
        item.name,
        item.unitPrice,
        this.store.activeSession.store,
        this.store.activeSession.date,
        this.store.history
      );

      const card = document.createElement('div');
      card.className = 'grocery-item-card';
      card.dataset.id = item.id;

      // Price comparison badge (F-04)
      let compBadgeHtml = '';
      if (comparison.trend === 'UP') {
        compBadgeHtml = `
          <div class="price-comparator-badge comp-up" title="${comparison.detail}">
            <span>${comparison.symbol}</span>
            <span>${comparison.label}</span>
          </div>
        `;
      } else if (comparison.trend === 'DOWN') {
        compBadgeHtml = `
          <div class="price-comparator-badge comp-down" title="${comparison.detail}">
            <span>${comparison.symbol}</span>
            <span>${comparison.label}</span>
          </div>
        `;
      } else if (comparison.trend === 'EQUAL') {
        compBadgeHtml = `
          <div class="price-comparator-badge comp-equal" title="${comparison.detail}">
            <span>${comparison.symbol}</span>
            <span>${comparison.label}</span>
          </div>
        `;
      } else if (comparison.trend === 'NEW') {
        compBadgeHtml = `
          <div class="price-comparator-badge comp-new" title="${comparison.detail}">
            <span>${comparison.symbol}</span>
            <span>${comparison.label}</span>
          </div>
        `;
      }

      // Discount tag (F-03)
      let discountHtml = '';
      if (item.discount && calc.discountAmountPerUnit > 0) {
        discountHtml = `
          <span class="discount-tag one-line" title="${calc.formulaText}">
            🏷️ ${calc.formulaText}
          </span>
        `;
      }

      // Unit price line
      let unitPriceLineHtml = '';
      if (calc.discountAmountPerUnit > 0) {
        unitPriceLineHtml = `
          <div class="unit-price-line one-line">
            <span class="strikethrough">${Calculator.formatRupiah(calc.originalUnitPrice)}</span>
            <span>${Calculator.formatRupiah(calc.finalUnitPrice)} / ${item.unit}</span>
          </div>
        `;
      } else {
        unitPriceLineHtml = `
          <div class="unit-price-line one-line">
            <span>${Calculator.formatRupiah(calc.originalUnitPrice)} / ${item.unit}</span>
          </div>
        `;
      }

      const catObj = CATEGORIES.find(c => c.name === item.category) || { icon: '📦' };

      card.innerHTML = `
        <div class="card-top-row">
          <div class="item-main-info">
            <div class="item-badge-row">
              <span class="item-category-pill">${catObj.icon} ${item.category}</span>
              ${discountHtml}
            </div>
            <div class="item-name one-line">${escapeHtml(item.name)}</div>
            ${item.notes ? `<div class="item-notes one-line">${escapeHtml(item.notes)}</div>` : ''}
            ${compBadgeHtml}
          </div>
          <div style="display: flex; gap: 4px; flex-shrink: 0;">
            <button class="card-delete-btn btn-edit-item" title="Edit Item" aria-label="Edit Item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              </svg>
            </button>
            <button class="card-delete-btn btn-remove-item" title="Hapus Item Ini" aria-label="Hapus Item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="card-bottom-row">
          <!-- Stepper Control (F-02) -->
          <div class="stepper-control">
            <button type="button" class="stepper-btn btn-stepper-minus" aria-label="Kurangi Jumlah">−</button>
            <input type="number" step="any" min="0.1" class="stepper-qty-input" value="${item.qty}" inputmode="decimal" aria-label="Kuantitas">
            <span class="stepper-unit one-line">${item.unit}</span>
            <button type="button" class="stepper-btn btn-stepper-plus" aria-label="Tambah Jumlah">+</button>
          </div>

          <!-- Line Financials (F-02 Instant Realtime Total) -->
          <div class="item-pricing-summary">
            ${unitPriceLineHtml}
            <div class="row-total-price one-line">${Calculator.formatRupiah(calc.rowFinalTotal)}</div>
          </div>
        </div>
      `;

      // Stepper & Item Actions
      const minusBtn = card.querySelector('.btn-stepper-minus');
      const plusBtn = card.querySelector('.btn-stepper-plus');
      const qtyInput = card.querySelector('.stepper-qty-input');
      const editBtn = card.querySelector('.btn-edit-item');
      const removeBtn = card.querySelector('.btn-remove-item');
      const compBadge = card.querySelector('.price-comparator-badge');

      minusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.triggerHaptic();
        soundMgr.playPop();
        let newQty = Math.max(0.1, Number((item.qty - 1).toFixed(2)));
        if (item.unit === 'kg' && item.qty <= 1 && item.qty > 0.25) {
          newQty = Math.max(0.1, Number((item.qty - 0.25).toFixed(2)));
        }
        this.store.updateItem(item.id, { qty: newQty });
      });

      plusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.triggerHaptic();
        soundMgr.playPop();
        let newQty = Number((item.qty + 1).toFixed(2));
        if (item.unit === 'kg' && item.qty < 1) {
          newQty = Number((item.qty + 0.25).toFixed(2));
        }
        this.store.updateItem(item.id, { qty: newQty });
      });

      qtyInput.addEventListener('change', (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val) && val > 0) {
          soundMgr.playPop();
          this.store.updateItem(item.id, { qty: val });
        } else {
          e.target.value = item.qty;
        }
      });

      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        soundMgr.playPop();
        this.openAddItemModal(item);
      });

      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.triggerHaptic();
        soundMgr.playDelete();
        this.store.removeItem(item.id);
        this.showToast(`Item "${item.name}" dihapus`, 'warning');
      });

      if (compBadge) {
        compBadge.addEventListener('click', () => {
          this.showToast(comparison.detail, comparison.trend === 'UP' ? 'danger' : 'success');
        });
      }

      container.appendChild(card);
    });
  }

  /**
   * Render Tab 2: Riwayat Toko & Multi-Store Database (F-06)
   */
  renderHistoryTab() {
    const container = this.dom.historySessionsContainer;
    container.innerHTML = '';

    const sessions = this.store.history;
    if (!sessions || sessions.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 13px;">
          Belum ada riwayat belanja yang tersimpan.
        </div>
      `;
      return;
    }

    sessions.forEach(sess => {
      const card = document.createElement('div');
      card.className = 'history-card';

      let readableDate = sess.date;
      try {
        const d = new Date(sess.date);
        readableDate = d.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {}

      card.innerHTML = `
        <div class="history-card-header">
          <div>
            <div class="history-store-name one-line">${escapeHtml(sess.store)}</div>
            <div class="history-date one-line">${readableDate}</div>
          </div>
          <span style="font-size: 10px; background: rgba(255,255,255,0.08); padding: 3px 8px; border-radius: 6px; color: var(--text-secondary); white-space: nowrap;">
            ${sess.items.length} Barang
          </span>
        </div>
        <div class="history-metrics">
          <div class="history-items-count one-line">
            ${sess.totalSavings > 0 ? `Hemat: ${Calculator.formatRupiah(sess.totalSavings)}` : 'Sesi Belanja'}
          </div>
          <div class="history-total-spent one-line">${Calculator.formatRupiah(sess.totalSpent)}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.openReceiptDetailModal(sess);
      });

      container.appendChild(card);
    });
  }

  /**
   * Render Tab 3: Anggaran & Safety Cap Analytics (F-05)
   */
  renderBudgetTab(session, summary) {
    this.dom.inputBudgetCap.value = Calculator.formatRupiah(session.budgetCap, false);
    this.dom.budgetSummaryRaw.textContent = Calculator.formatRupiah(summary.totalRaw);
    this.dom.budgetSummarySavings.textContent = summary.totalSavings > 0 ? `-${Calculator.formatRupiah(summary.totalSavings)}` : 'Rp 0';
    this.dom.budgetSummaryNet.textContent = Calculator.formatRupiah(summary.totalFinal);

    if (summary.remaining < 0) {
      this.dom.budgetSummaryRemaining.style.color = 'var(--crimson)';
      this.dom.budgetSummaryRemaining.textContent = `Defisit ${Calculator.formatRupiah(Math.abs(summary.remaining))}`;
    } else {
      this.dom.budgetSummaryRemaining.style.color = 'var(--emerald-light)';
      this.dom.budgetSummaryRemaining.textContent = Calculator.formatRupiah(summary.remaining);
    }

    // Category Spending Breakdown
    const catContainer = this.dom.categoryBreakdownContainer;
    catContainer.innerHTML = '';
    const catKeys = Object.keys(summary.categoryTotals);

    if (catKeys.length === 0) {
      catContainer.innerHTML = '<div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 10px;">Belum ada pengeluaran di troli.</div>';
    } else {
      catKeys.sort((a, b) => summary.categoryTotals[b] - summary.categoryTotals[a]);
      catKeys.forEach(catName => {
        const amt = summary.categoryTotals[catName];
        const pct = summary.totalFinal > 0 ? ((amt / summary.totalFinal) * 100).toFixed(1) : 0;
        const catObj = CATEGORIES.find(c => c.name === catName) || { icon: '📦' };

        const row = document.createElement('div');
        row.className = 'category-breakdown-row';
        row.innerHTML = `
          <div class="cat-row-left one-line">
            <span>${catObj.icon}</span>
            <span>${catName} (${pct}%)</span>
          </div>
          <div class="cat-row-right one-line">${Calculator.formatRupiah(amt)}</div>
        `;
        catContainer.appendChild(row);
      });
    }

    // Emergency Triage (F-05)
    const isOverOrTight = summary.budgetStatus === 'WARNING' || summary.budgetStatus === 'DANGER';
    if (isOverOrTight && session.items.length > 0) {
      this.dom.triageCard.style.display = 'block';
      const triageContainer = this.dom.triageItemsContainer;
      triageContainer.innerHTML = '';

      const nonEssentials = session.items.filter(it => 
        it.category === 'Snack & Camilan' || 
        it.category === 'Kopi & Minuman' || 
        it.category === 'Makanan Instan/Frozen' ||
        it.qty > 2
      );

      if (nonEssentials.length > 0) {
        nonEssentials.slice(0, 4).forEach(it => {
          const itCalc = Calculator.calculateItemRow(it.qty, it.unitPrice, it.discount);
          const row = document.createElement('div');
          row.className = 'triage-item-row';
          row.innerHTML = `
            <div class="one-line" style="flex: 1; margin-right: 8px;">
              <span style="font-weight: 700; color: var(--text-primary);">${escapeHtml(it.name)}</span>
              <span style="color: var(--text-muted); font-size: 11px;">(${it.qty} ${it.unit} • ${Calculator.formatRupiah(itCalc.rowFinalTotal)})</span>
            </div>
            <button class="btn-trim-item" data-id="${it.id}">Pangkas</button>
          `;

          row.querySelector('.btn-trim-item').addEventListener('click', () => {
            this.store.removeItem(it.id);
            this.showToast(`Pangkas "${it.name}" (Hemat ${Calculator.formatRupiah(itCalc.rowFinalTotal)})`, 'success');
          });

          triageContainer.appendChild(row);
        });
      } else {
        triageContainer.innerHTML = '<div style="font-size: 11px; color: var(--crimson);">Semua item saat ini adalah kebutuhan pokok esensial.</div>';
      }
    } else {
      this.dom.triageCard.style.display = 'none';
    }
  }

  /**
   * Multi-Store Staple Price Comparison Search (F-06 & F-04)
   */
  runStapleComparison(query) {
    const q = query || this.dom.inputCompareSearch.value.trim();
    if (!q) return;

    const results = Comparator.getCrossStoreComparison(q, this.store.history);
    const container = this.dom.comparisonResultsContainer;
    container.innerHTML = '';

    if (results.length === 0) {
      container.innerHTML = `
        <div style="font-size: 11.5px; color: var(--text-muted); padding: 8px 0; text-align: center;">
          Tidak ada data riwayat harga untuk "${escapeHtml(q)}".
        </div>
      `;
      return;
    }

    const lowestPrice = Math.min(...results.map(r => r.unitPrice));

    results.forEach(res => {
      const isCheapest = res.unitPrice === lowestPrice;
      const row = document.createElement('div');
      row.className = `store-price-row ${isCheapest ? 'cheapest' : ''}`;

      let dateFormatted = res.date;
      try {
        const d = new Date(res.date);
        dateFormatted = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      } catch (e) {}

      row.innerHTML = `
        <div class="one-line" style="flex: 1; margin-right: 8px;">
          <div class="store-name-tag one-line">
            ${escapeHtml(res.store)}
            ${isCheapest ? '<span class="cheapest-badge">Termurah ⭐</span>' : ''}
          </div>
          <div class="store-date-tag one-line">${escapeHtml(res.productName)} • ${dateFormatted}</div>
        </div>
        <div class="store-price-val one-line">${Calculator.formatRupiah(res.unitPrice)} / ${res.unit}</div>
      `;
      container.appendChild(row);
    });
  }

  /**
   * Modal: Add / Edit Item Bottom Sheet with Unit Buttons & Validation
   */
  openAddItemModal(itemToEdit = null) {
    const isEdit = !!itemToEdit;
    this.dom.addItemTitle.textContent = isEdit ? 'Edit Item Belanja' : 'Catat Item Belanja';
    this.dom.btnSubmitItem.textContent = isEdit ? 'Perbarui Item' : 'Simpan ke Troli Belanja';
    this.dom.inputEditItemId.value = isEdit ? itemToEdit.id : '';
    this.dom.itemNameError.style.display = 'none';

    if (isEdit) {
      this.dom.inputItemName.value = itemToEdit.name;
      this.dom.selectItemCategory.value = itemToEdit.category;
      this.selectUnitButton(itemToEdit.unit || 'pcs');
      this.dom.inputItemQty.value = itemToEdit.qty;
      this.dom.inputItemUnitPrice.value = Calculator.formatRupiah(itemToEdit.unitPrice, false);
      this.dom.inputItemDiscount.value = itemToEdit.discount || '';
      this.dom.inputItemNotes.value = itemToEdit.notes || '';
    } else {
      this.dom.formAddItem.reset();
      this.dom.inputEditItemId.value = '';
      this.dom.inputItemQty.value = '1';
      this.selectUnitButton('pcs');
    }

    this.updateModalCalculations();
    this.dom.sheetAddItemBackdrop.classList.add('open');

    setTimeout(() => {
      this.dom.inputItemName.focus();
    }, 150);
  }

  closeAddItemModal() {
    this.dom.sheetAddItemBackdrop.classList.remove('open');
    this.dom.itemNameError.style.display = 'none';
  }

  /**
   * Interactive Unit Buttons (Satuan Harus Ada Tombol)
   */
  bindUnitButtons() {
    const chips = this.dom.unitButtonsGrid.querySelectorAll('.btn-unit-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.selectUnitButton(chip.dataset.unit);
      });
    });
  }

  selectUnitButton(unitName) {
    const targetUnit = unitName || 'pcs';
    this.dom.selectItemUnit.value = targetUnit;
    const chips = this.dom.unitButtonsGrid.querySelectorAll('.btn-unit-chip');
    chips.forEach(chip => {
      if (chip.dataset.unit === targetUnit) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  /**
   * Realtime math & comparator preview inside modal (F-02, F-03, F-04)
   */
  updateModalCalculations() {
    const name = this.dom.inputItemName.value.trim();
    const qty = Calculator.parseNumber(this.dom.inputItemQty.value);
    const rawPrice = Calculator.parseNumber(this.dom.inputItemUnitPrice.value);
    const discount = this.dom.inputItemDiscount.value.trim();

    if (name.length > 0) {
      this.dom.itemNameError.style.display = 'none';
    }

    const rowCalc = Calculator.calculateItemRow(qty, rawPrice, discount);

    this.dom.modalCalcUnitPrice.textContent = Calculator.formatRupiah(rowCalc.finalUnitPrice);
    if (rowCalc.discountAmountPerUnit > 0) {
      this.dom.modalCalcDiscount.textContent = `Hemat ${Calculator.formatRupiah(rowCalc.discountAmountPerUnit)} (${rowCalc.formulaText})`;
      this.dom.modalCalcDiscount.style.color = '#fbbf24';
    } else {
      this.dom.modalCalcDiscount.textContent = 'Rp 0 (0%)';
      this.dom.modalCalcDiscount.style.color = 'var(--text-muted)';
    }

    this.dom.modalCalcRowTotal.textContent = Calculator.formatRupiah(rowCalc.rowFinalTotal);

    // Live Comparator Feedback (F-04)
    if (name.length >= 2 && rawPrice > 0) {
      const comp = Comparator.comparePrice(
        name,
        rawPrice,
        this.store.activeSession.store,
        this.store.activeSession.date,
        this.store.history
      );

      this.dom.itemSheetComparatorPreview.style.display = 'flex';
      this.dom.itemSheetComparatorPreview.className = `comparator-preview-pill one-line ${comp.badgeClass}`;
      this.dom.compSymbol.textContent = comp.symbol;
      this.dom.compText.textContent = comp.detail;
    } else {
      this.dom.itemSheetComparatorPreview.style.display = 'none';
    }
  }

  /**
   * Modal: Supermarket Location Selector (F-01)
   */
  openStorePickerModal() {
    soundMgr.playPop();
    const container = this.dom.storeListContainer;
    container.innerHTML = '';

    const currentStore = this.store.activeSession.store;

    this.store.stores.forEach(storeName => {
      const isSelected = storeName === currentStore;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: ${isSelected ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-input)'};
        border: 1px solid ${isSelected ? 'var(--emerald)' : 'var(--border-subtle)'};
        border-radius: var(--radius-md);
        padding: 12px 14px;
        color: var(--text-primary);
        font-family: inherit;
        font-size: 13.5px;
        font-weight: ${isSelected ? '700' : '600'};
        cursor: pointer;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `;

      btn.innerHTML = `
        <span class="one-line" style="flex: 1;">${escapeHtml(storeName)}</span>
        ${isSelected ? '<span style="color: var(--emerald-light); font-weight: 800; margin-left: 8px;">✓ Aktif</span>' : ''}
      `;

      btn.addEventListener('click', () => {
        soundMgr.playPop();
        this.store.setStore(storeName);
        this.closeStorePickerModal();
        this.showToast(`Lokasi toko: ${storeName}`, 'success');
      });

      container.appendChild(btn);
    });

    this.dom.sheetStorePickerBackdrop.classList.add('open');
  }

  closeStorePickerModal() {
    this.dom.sheetStorePickerBackdrop.classList.remove('open');
  }

  /**
   * GPS Location Detection
   */
  detectGpsLocation() {
    this.showToast('Mencari sinyal GPS lokasi terdekat...', 'info');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Nearest store in the Puri Indah / West Jakarta hub
          const detectedStore = 'Lotte Mart Grocery - Puri Indah';
          this.store.setStore(detectedStore);
          this.closeStorePickerModal();
          this.showToast(`GPS Terdeteksi: Terdekat di ${detectedStore}`, 'success');
        },
        (err) => {
          // Graceful fallback for mock / desktop without GPS
          const detectedStore = 'Lotte Mart Grocery - Puri Indah';
          this.store.setStore(detectedStore);
          this.closeStorePickerModal();
          this.showToast(`Lokasi GPS Diset: ${detectedStore}`, 'success');
        },
        { timeout: 4000 }
      );
    } else {
      this.showToast('Perangkat tidak mendukung sensor GPS', 'warning');
    }
  }

  /**
   * Modal: Detail Struk Riwayat Sesi (F-06 Struk Harus Benar)
   */
  openReceiptDetailModal(session) {
    this.dom.receiptModalTitle.textContent = `Struk Belanja: ${session.store}`;
    const body = this.dom.receiptDetailBody;

    let readableDate = session.date;
    try {
      const d = new Date(session.date);
      readableDate = d.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {}

    let itemsListHtml = '';
    let calculatedSubtotalRaw = 0;
    let calculatedSavings = 0;

    session.items.forEach((it, idx) => {
      const rowCalc = Calculator.calculateItemRow(it.qty, it.unitPrice, it.discount);
      calculatedSubtotalRaw += rowCalc.rowRawTotal;
      calculatedSavings += rowCalc.rowSavings;

      itemsListHtml += `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed var(--border-medium); font-size: 12.5px;">
          <div style="flex: 1; margin-right: 8px;" class="one-line">
            <div style="font-weight: 700; color: var(--text-primary);" class="one-line">${idx + 1}. ${escapeHtml(it.name)}</div>
            <div style="color: var(--text-muted); font-size: 11px;" class="one-line">${it.qty} ${it.unit} @ ${Calculator.formatRupiah(rowCalc.finalUnitPrice)} ${it.discount ? `(Diskon: ${it.discount})` : ''}</div>
          </div>
          <div style="font-family: var(--font-mono); font-weight: 700; color: var(--emerald-light); white-space: nowrap;">${Calculator.formatRupiah(rowCalc.rowFinalTotal)}</div>
        </div>
      `;
    });

    const netFinal = session.totalSpent || (calculatedSubtotalRaw - calculatedSavings);
    const savings = session.totalSavings || calculatedSavings;

    body.innerHTML = `
      <div style="background: var(--bg-input); border-radius: var(--radius-md); padding: 12px; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
        <div style="font-size: 14px; font-weight: 800; color: var(--text-primary);">${escapeHtml(session.store)}</div>
        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">Tanggal: ${readableDate}</div>
        ${session.notes ? `<div style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-style: italic;">"${escapeHtml(session.notes)}"</div>` : ''}
      </div>

      <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
        ${itemsListHtml}
      </div>

      <div style="background: var(--bg-input); border: 1px solid var(--border-highlight); border-radius: var(--radius-md); padding: 12px; display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary);">
          <span>Total Item / Qty</span>
          <span>${session.items.length} Barang</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary);">
          <span>Subtotal Normal</span>
          <span>${Calculator.formatRupiah(calculatedSubtotalRaw || netFinal + savings)}</span>
        </div>
        ${savings > 0 ? `
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #fbbf24;">
            <span>Total Potongan Diskon</span>
            <span>-${Calculator.formatRupiah(savings)}</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: 800; color: var(--text-primary); border-top: 1px solid var(--border-medium); padding-top: 6px;">
          <span>Grand Total Bayar</span>
          <span style="color: var(--emerald-light); font-family: var(--font-mono);">${Calculator.formatRupiah(netFinal)}</span>
        </div>
      </div>

      <button type="button" class="btn-sheet-submit" id="btnCloseReceiptBtn" style="margin-top: 10px;">
        Tutup Struk Belanja
      </button>
    `;

    body.querySelector('#btnCloseReceiptBtn').addEventListener('click', () => {
      this.closeReceiptDetailModal();
    });

    this.dom.sheetReceiptDetailBackdrop.classList.add('open');
  }

  closeReceiptDetailModal() {
    this.dom.sheetReceiptDetailBackdrop.classList.remove('open');
  }

  /**
   * Render autocomplete quick chips
   */
  renderQuickStaplesChips() {
    const container = this.dom.quickStaplesChips;
    container.innerHTML = '';

    MASTER_CATALOG.forEach(staple => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'staple-chip one-line';
      chip.textContent = staple.name;

      chip.addEventListener('click', () => {
        this.dom.inputItemName.value = staple.name;
        this.dom.selectItemCategory.value = staple.category;
        this.selectUnitButton(staple.unit);
        this.dom.inputItemUnitPrice.value = Calculator.formatRupiah(staple.benchmarkPrice, false);
        this.dom.itemNameError.style.display = 'none';
        this.updateModalCalculations();
        this.dom.inputItemUnitPrice.focus();
      });

      container.appendChild(chip);
    });
  }

  /**
   * Render category filter chips in Tab Belanja
   */
  renderCategoryFilterChips() {
    const chips = this.dom.categoryFilterContainer.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedCategoryFilter = chip.dataset.category;
        this.renderCartItems(this.store.activeSession.items);
      });
    });
  }

  /**
   * Toast notification helper
   */
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    }

    toast.innerHTML = `${iconSvg}<span class="one-line">${message}</span>`;
    this.dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  /**
   * Haptic vibration
   */
  triggerHaptic() {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(20);
      } catch (e) {}
    }
  }

  /**
   * Switch Active Tabs
   */
  switchTab(tabId) {
    this.activeTab = tabId;

    [this.dom.tabBelanja, this.dom.tabRiwayat, this.dom.tabAnggaran].forEach(panel => {
      panel.classList.remove('active');
    });
    [this.dom.navBelanja, this.dom.navRiwayat, this.dom.navAnggaran].forEach(nav => {
      nav.classList.remove('active');
    });

    if (tabId === 'tabBelanja') {
      this.dom.tabBelanja.classList.add('active');
      this.dom.navBelanja.classList.add('active');
    } else if (tabId === 'tabRiwayat') {
      this.dom.tabRiwayat.classList.add('active');
      this.dom.navRiwayat.classList.add('active');
    } else if (tabId === 'tabAnggaran') {
      this.dom.tabAnggaran.classList.add('active');
      this.dom.navAnggaran.classList.add('active');
    }

    this.triggerHaptic();
  }

  /**
   * Setup all event listeners
   */
  bindEvents() {
    // Sound Toggle Button
    if (this.dom.btnSoundToggle) {
      this.dom.btnSoundToggle.addEventListener('click', () => {
        this.toggleSound();
      });
    }

    // Theme Switcher
    this.dom.btnThemeToggle.addEventListener('click', () => {
      soundMgr.playPop();
      this.toggleTheme();
    });

    // Navigation Tabs
    this.dom.navBelanja.addEventListener('click', () => {
      soundMgr.playPop();
      this.switchTab('tabBelanja');
    });
    this.dom.navRiwayat.addEventListener('click', () => {
      soundMgr.playPop();
      this.switchTab('tabRiwayat');
    });
    this.dom.navAnggaran.addEventListener('click', () => {
      soundMgr.playPop();
      this.switchTab('tabAnggaran');
    });

    // Store Picker Modal Trigger (Icon beside theme toggle)
    if (this.dom.btnOpenStorePicker) {
      this.dom.btnOpenStorePicker.addEventListener('click', () => this.openStorePickerModal());
    }
    this.dom.btnCloseStorePicker.addEventListener('click', () => this.closeStorePickerModal());
    this.dom.sheetStorePickerBackdrop.addEventListener('click', (e) => {
      if (e.target === this.dom.sheetStorePickerBackdrop) this.closeStorePickerModal();
    });

    // Date Picker Modal Trigger with Checkmark Confirmation (Icon beside theme toggle)
    if (this.dom.btnOpenDatePicker) {
      this.dom.btnOpenDatePicker.addEventListener('click', () => this.openDatePickerModal());
    }
    if (this.dom.btnCloseDatePickerModal) {
      this.dom.btnCloseDatePickerModal.addEventListener('click', () => this.closeDatePickerModal());
    }
    if (this.dom.btnCancelDateChange) {
      this.dom.btnCancelDateChange.addEventListener('click', () => this.closeDatePickerModal());
    }
    if (this.dom.btnConfirmDateWithCheck) {
      this.dom.btnConfirmDateWithCheck.addEventListener('click', () => this.confirmDateChange());
    }
    if (this.dom.modalDatePickerBackdrop) {
      this.dom.modalDatePickerBackdrop.addEventListener('click', (e) => {
        if (e.target === this.dom.modalDatePickerBackdrop) this.closeDatePickerModal();
      });
    }

    // Date Picker Input fallback (F-01)
    if (this.dom.sessionDatePicker) {
      this.dom.sessionDatePicker.addEventListener('change', (e) => {
        this.store.setDate(e.target.value);
        if (this.dom.headerDateDisplay) {
          this.dom.headerDateDisplay.textContent = this.formatDisplayDate(e.target.value);
        }
      });
    }

    // User Auth & Profile Modal Triggers
    if (this.dom.btnUserAuth) {
      this.dom.btnUserAuth.addEventListener('click', () => {
        soundMgr.playPop();
        if (authMgr.isLoggedIn()) {
          this.openUserProfileModal();
        } else {
          this.openAuthModal();
        }
      });
    }

    if (this.dom.btnCloseAuthModal) {
      this.dom.btnCloseAuthModal.addEventListener('click', () => this.closeAuthModal());
    }
    if (this.dom.modalAuthBackdrop) {
      this.dom.modalAuthBackdrop.addEventListener('click', (e) => {
        if (e.target === this.dom.modalAuthBackdrop) this.closeAuthModal();
      });
    }

    // Auth Tabs Switcher
    if (this.dom.tabBtnLogin) {
      this.dom.tabBtnLogin.addEventListener('click', () => this.switchAuthTab('login'));
    }
    if (this.dom.tabBtnRegister) {
      this.dom.tabBtnRegister.addEventListener('click', () => this.switchAuthTab('register'));
    }

    // Google Sign-In
    if (this.dom.btnGoogleLogin) {
      this.dom.btnGoogleLogin.addEventListener('click', async () => {
        soundMgr.playPop();
        this.dom.btnGoogleLogin.disabled = true;
        this.dom.btnGoogleLogin.style.opacity = '0.7';
        const res = await authMgr.loginWithGoogle();
        this.dom.btnGoogleLogin.disabled = false;
        this.dom.btnGoogleLogin.style.opacity = '1';

        if (res.success) {
          soundMgr.playSuccess();
          this.closeAuthModal();
          this.showToast(`Selamat datang, ${res.user.displayName}!`, 'success');
        } else if (res.needsConsoleActivation) {
          this.showAuthError(res.error);
        } else {
          this.showAuthError(res.error || 'Gagal masuk dengan Google.');
        }
      });
    }

    // Email Login Submit
    if (this.dom.formLogin) {
      this.dom.formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        soundMgr.playPop();
        const email = this.dom.loginEmail.value.trim();
        const pass = this.dom.loginPassword.value;
        const res = await authMgr.loginWithEmail(email, pass);
        if (res.success) {
          soundMgr.playSuccess();
          this.closeAuthModal();
          this.showToast(`Berhasil masuk: ${res.user.displayName}`, 'success');
        } else {
          this.showAuthError(res.error || 'Login gagal.');
        }
      });
    }

    // Email Register Submit
    if (this.dom.formRegister) {
      this.dom.formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        soundMgr.playPop();
        const name = this.dom.regName.value.trim();
        const email = this.dom.regEmail.value.trim();
        const pass = this.dom.regPassword.value;
        const res = await authMgr.registerWithEmail(email, pass, name);
        if (res.success) {
          soundMgr.playSuccess();
          this.closeAuthModal();
          this.showToast(`Akun berhasil dibuat! Selamat datang, ${name}`, 'success');
        } else {
          this.showAuthError(res.error || 'Pendaftaran gagal.');
        }
      });
    }

    // Continue as Guest
    if (this.dom.btnContinueGuest) {
      this.dom.btnContinueGuest.addEventListener('click', () => {
        soundMgr.playPop();
        authMgr.setGuestMode(true);
        this.closeAuthModal();
        this.showToast('Melanjutkan sebagai Tamu (Mode Offline)', 'info');
      });
    }

    // Profile Modal Actions
    if (this.dom.btnCloseProfileModal) {
      this.dom.btnCloseProfileModal.addEventListener('click', () => this.closeUserProfileModal());
    }
    if (this.dom.modalUserProfileBackdrop) {
      this.dom.modalUserProfileBackdrop.addEventListener('click', (e) => {
        if (e.target === this.dom.modalUserProfileBackdrop) this.closeUserProfileModal();
      });
    }
    if (this.dom.btnLogoutAction) {
      this.dom.btnLogoutAction.addEventListener('click', async () => {
        soundMgr.playDelete();
        await authMgr.logout();
        this.closeUserProfileModal();
        this.showToast('Anda telah keluar dari akun', 'info');
      });
    }

    // GPS Detect Button in Store Picker
    this.dom.btnDetectGpsStore.addEventListener('click', () => {
      soundMgr.playPop();
      this.detectGpsLocation();
    });

    // Add Custom Store
    this.dom.btnAddCustomStore.addEventListener('click', () => {
      const val = this.dom.inputNewStore.value.trim();
      if (val) {
        soundMgr.playAdd();
        this.store.addStore(val);
        this.store.setStore(val);
        this.dom.inputNewStore.value = '';
        this.closeStorePickerModal();
        this.showToast(`Toko baru "${val}" dipilih!`, 'success');
      }
    });

    // Single Floating Action Button (FAB) at Bottom Right
    this.dom.btnFloatingAdd.addEventListener('click', () => {
      soundMgr.playPop();
      this.openAddItemModal();
    });

    this.dom.btnCloseAddItemSheet.addEventListener('click', () => this.closeAddItemModal());
    this.dom.sheetAddItemBackdrop.addEventListener('click', (e) => {
      if (e.target === this.dom.sheetAddItemBackdrop) this.closeAddItemModal();
    });

    // Receipt Detail Modal
    this.dom.btnCloseReceiptDetail.addEventListener('click', () => this.closeReceiptDetailModal());
    this.dom.sheetReceiptDetailBackdrop.addEventListener('click', (e) => {
      if (e.target === this.dom.sheetReceiptDetailBackdrop) this.closeReceiptDetailModal();
    });

    // Live Calculation & Price Comparator during modal input (F-02, F-03, F-04)
    const modalInputs = [
      this.dom.inputItemName,
      this.dom.inputItemQty,
      this.dom.inputItemUnitPrice,
      this.dom.inputItemDiscount
    ];
    modalInputs.forEach(input => {
      input.addEventListener('input', () => this.updateModalCalculations());
    });

    // Discount Presets in Modal (F-03)
    const presetBtns = this.dom.formAddItem.querySelectorAll('.btn-discount-preset');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.inputItemDiscount.value = btn.dataset.preset;
        this.updateModalCalculations();
      });
    });

    // Form Add / Edit Item Submit with STRICT VALIDATION
    this.dom.formAddItem.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = this.dom.inputEditItemId.value;
      const name = this.dom.inputItemName.value.trim();
      const category = this.dom.selectItemCategory.value;
      const unit = this.dom.selectItemUnit.value || 'pcs';
      const qty = Calculator.parseNumber(this.dom.inputItemQty.value);
      const unitPrice = Calculator.parseNumber(this.dom.inputItemUnitPrice.value);
      const discount = this.dom.inputItemDiscount.value.trim();
      const notes = this.dom.inputItemNotes.value.trim();

      // STRICT VALIDATION: Nama barang wajib diisi! Tidak boleh hanya harga (Skenario Uji 1)
      if (!name) {
        this.dom.itemNameError.textContent = 'Wajib mengisi nama barang! Tidak boleh hanya harga.';
        this.dom.itemNameError.style.display = 'block';
        this.dom.inputItemName.focus();
        this.showToast('Wajib mengisi nama barang!', 'danger');
        this.triggerHaptic();
        return;
      }

      // Validasi harga satuan (Skenario Uji 1: menolak harga negatif atau Rp 0)
      if (unitPrice <= 0) {
        this.showToast('Harga barang tidak valid! Tidak boleh Rp 0 atau bernilai minus (-).', 'danger');
        this.dom.inputItemUnitPrice.focus();
        this.triggerHaptic();
        return;
      }

      if (qty <= 0) {
        this.showToast('Jumlah (Qty) harus lebih dari 0!', 'warning');
        this.dom.inputItemQty.focus();
        this.triggerHaptic();
        return;
      }

      if (editId) {
        this.store.updateItem(editId, {
          name, category, unit, qty, unitPrice, discount, notes
        });
        soundMgr.playPop();
        this.showToast(`Berhasil update: "${name}"`, 'success');
      } else {
        this.store.addItem({
          name, category, unit, qty, unitPrice, discount, notes
        });
        soundMgr.playAdd();
        this.showToast(`Ditambahkan ke troli: "${name}"`, 'success');
      }

      this.closeAddItemModal();
    });

    // Checkout / Finish Session (F-06)
    this.dom.btnFinishSession.addEventListener('click', () => {
      if (this.store.activeSession.items.length === 0) {
        soundMgr.playWarning();
        this.showToast('Troli belanja masih kosong!', 'warning');
        return;
      }
      const summary = Calculator.calculateCartSummary(this.store.activeSession.items, this.store.activeSession.budgetCap);
      const saved = this.store.checkoutAndSaveSession(summary);
      if (saved) {
        soundMgr.playSuccess();
        this.showToast('Belanja selesai! Struk tersimpan di Riwayat', 'success');
        this.switchTab('tabRiwayat');
      }
    });

    // Dedicated Button: Clear All Cart Items via Non-Blocking Modal (F-06A & UX)
    this.dom.btnQuickClearCart.addEventListener('click', () => {
      if (this.store.activeSession.items.length === 0) {
        soundMgr.playPop();
        this.showToast('Troli belanja sudah kosong', 'info');
        return;
      }
      soundMgr.playWarning();
      this.dom.modalConfirmClearCartBackdrop.classList.add('open');
    });

    this.dom.btnCancelClearCart.addEventListener('click', () => {
      soundMgr.playPop();
      this.dom.modalConfirmClearCartBackdrop.classList.remove('open');
    });

    this.dom.btnConfirmClearCartAction.addEventListener('click', () => {
      soundMgr.playDelete();
      this.store.clearActiveCart();
      this.dom.modalConfirmClearCartBackdrop.classList.remove('open');
      this.showToast('Seluruh barang di troli telah dikosongkan', 'warning');
      this.triggerHaptic();
    });

    this.dom.modalConfirmClearCartBackdrop.addEventListener('click', (e) => {
      if (e.target === this.dom.modalConfirmClearCartBackdrop) {
        this.dom.modalConfirmClearCartBackdrop.classList.remove('open');
      }
    });

    // Budget Cap Direct Input (F-05)
    this.dom.inputBudgetCap.addEventListener('change', (e) => {
      const val = Calculator.parseNumber(e.target.value);
      if (val > 0) {
        this.store.setBudgetCap(val);
        this.showToast(`Safety Cap: ${Calculator.formatRupiah(val)}`, 'info');
      }
    });

    // Quick Budget Chips (F-05)
    const budgetChips = document.querySelectorAll('.btn-chip-budget');
    budgetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const amt = Number(chip.dataset.amount);
        this.store.setBudgetCap(amt);
        this.showToast(`Safety Cap diset: ${Calculator.formatRupiah(amt)}`, 'info');
      });
    });

    // Staple Comparison Search
    this.dom.btnExecuteSearchCompare.addEventListener('click', () => {
      this.runStapleComparison();
    });
    this.dom.inputCompareSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.runStapleComparison();
    });

    // Desktop Width Toggle Control (430px vs Expanded)
    this.dom.btnToggleWidth.addEventListener('click', () => {
      this.isDesktopExpanded = !this.isDesktopExpanded;
      if (this.isDesktopExpanded) {
        this.dom.appShell.style.maxWidth = '760px';
        this.dom.btnToggleWidth.querySelector('span').textContent = 'Format: Lebar';
      } else {
        this.dom.appShell.style.maxWidth = '430px';
        this.dom.btnToggleWidth.querySelector('span').textContent = 'Format: 430px Mobile';
      }
    });

    // Reset Sample Data
    this.dom.btnResetData.addEventListener('click', () => {
      if (confirm('Reset ke data awal contoh demonstrasi?')) {
        this.store.resetToDefaultData();
        this.showToast('Data direset ke contoh default!', 'info');
      }
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.sgtApp = new SmartGroceryApp();
});
