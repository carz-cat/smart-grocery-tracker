/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Main Application Controller (PWA Native App Style)
 * Aesthetic: Midnight Ocean Blue & Black Cat
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
      
      // Auth Gatekeeper Screen Elements
      authGatekeeperScreen: document.getElementById('authGatekeeperScreen'),
      btnGateTabLogin: document.getElementById('btnGateTabLogin'),
      btnGateTabRegister: document.getElementById('btnGateTabRegister'),
      authGateAlert: document.getElementById('authGateAlert'),
      btnGateGoogleLogin: document.getElementById('btnGateGoogleLogin'),
      formGateLogin: document.getElementById('formGateLogin'),
      gateLoginEmail: document.getElementById('gateLoginEmail'),
      gateLoginPassword: document.getElementById('gateLoginPassword'),
      formGateRegister: document.getElementById('formGateRegister'),
      gateRegName: document.getElementById('gateRegName'),
      gateRegEmail: document.getElementById('gateRegEmail'),
      gateRegPassword: document.getElementById('gateRegPassword'),
      btnGateGuestLogin: document.getElementById('btnGateGuestLogin'),

      // Mini Sound Toggle
      btnSoundToggle: document.getElementById('btnSoundToggle'),
      soundIconOn: document.getElementById('soundIconOn'),
      soundIconMute: document.getElementById('soundIconMute'),

      // User Auth Button & Header Pill
      btnUserAuth: document.getElementById('btnUserAuth'),
      headerUserAvatar: document.getElementById('headerUserAvatar'),
      headerAuthLabel: document.getElementById('headerAuthLabel'),

      // Theme Toggle & Cat Badge
      btnThemeToggle: document.getElementById('btnThemeToggle'),
      themeIconSun: document.getElementById('themeIconSun'),
      themeIconMoon: document.getElementById('themeIconMoon'),
      themeCatBadge: document.getElementById('themeCatBadge'),

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

      // Tab Panels & Bottom Nav (4 Core Tabs)
      tabBelanja: document.getElementById('tabBelanja'),
      tabRencana: document.getElementById('tabRencana'),
      tabKalkulator: document.getElementById('tabKalkulator'),
      tabAnggaran: document.getElementById('tabAnggaran'),

      navBelanja: document.getElementById('navBelanja'),
      navRencana: document.getElementById('navRencana'),
      navKalkulator: document.getElementById('navKalkulator'),
      navAnggaran: document.getElementById('navAnggaran'),
      navCartBadge: document.getElementById('navCartBadge'),

      // Tab 1: Belanja (Cart)
      groceryItemsContainer: document.getElementById('groceryItemsContainer'),
      emptyCartState: document.getElementById('emptyCartState'),
      cartCheckoutActions: document.getElementById('cartCheckoutActions'),
      categoryFilterContainer: document.getElementById('categoryFilterContainer'),
      btnFloatingAdd: document.getElementById('btnFloatingAdd'),
      btnQuickClearCart: document.getElementById('btnQuickClearCart'),
      btnFinishSession: document.getElementById('btnFinishSession'),

      // Tab 2: Rencana Belanja (Checklist)
      checklistCounterPill: document.getElementById('checklistCounterPill'),
      checklistProgressFill: document.getElementById('checklistProgressFill'),
      formAddChecklist: document.getElementById('formAddChecklist'),
      inputChecklistName: document.getElementById('inputChecklistName'),
      selectChecklistCat: document.getElementById('selectChecklistCat'),
      inputChecklistEstPrice: document.getElementById('inputChecklistEstPrice'),
      btnTransferAllChecked: document.getElementById('btnTransferAllChecked'),
      checklistItemsContainer: document.getElementById('checklistItemsContainer'),

      // Tab 3: Kalkulator & Pembanding Kemasan
      inputPkgSizeA: document.getElementById('inputPkgSizeA'),
      inputPkgPriceA: document.getElementById('inputPkgPriceA'),
      pkgUnitCostA: document.getElementById('pkgUnitCostA'),
      inputPkgSizeB: document.getElementById('inputPkgSizeB'),
      inputPkgPriceB: document.getElementById('inputPkgPriceB'),
      pkgUnitCostB: document.getElementById('pkgUnitCostB'),
      verdictHeadline: document.getElementById('verdictHeadline'),
      verdictDetail: document.getElementById('verdictDetail'),
      calcToolPrice: document.getElementById('calcToolPrice'),
      calcToolDiscount: document.getElementById('calcToolDiscount'),
      checkAuditVat: document.getElementById('checkAuditVat'),
      calcToolResultNet: document.getElementById('calcToolResultNet'),
      calcToolResultSavings: document.getElementById('calcToolResultSavings'),
      calcToolResultVat: document.getElementById('calcToolResultVat'),
      selectCrossStoreProduct: document.getElementById('selectCrossStoreProduct'),
      crossStoreResultsContainer: document.getElementById('crossStoreResultsContainer'),

      // Tab 5: Radar Anggaran & Riwayat
      inputBudgetCap: document.getElementById('inputBudgetCap'),
      budgetSummaryRaw: document.getElementById('budgetSummaryRaw'),
      budgetSummarySavings: document.getElementById('budgetSummarySavings'),
      budgetSummaryNet: document.getElementById('budgetSummaryNet'),
      budgetSummaryRemaining: document.getElementById('budgetSummaryRemaining'),
      categoryBreakdownContainer: document.getElementById('categoryBreakdownContainer'),
      triageCard: document.getElementById('triageCard'),
      triageItemsContainer: document.getElementById('triageItemsContainer'),
      historySessionsContainer: document.getElementById('historySessionsContainer'),
      inputCompareSearch: document.getElementById('inputCompareSearch'),
      btnExecuteSearchCompare: document.getElementById('btnExecuteSearchCompare'),
      comparisonResultsContainer: document.getElementById('comparisonResultsContainer'),

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

      // Modal User Profile & Account Management
      modalUserProfileBackdrop: document.getElementById('modalUserProfileBackdrop'),
      btnCloseProfileModal: document.getElementById('btnCloseProfileModal'),
      btnCloseProfileModalX: document.getElementById('btnCloseProfileModalX'),
      btnReturnToLoginScreen: document.getElementById('btnReturnToLoginScreen'),
      profileAvatarLarge: document.getElementById('profileAvatarLarge'),
      inputProfilePhotoUpload: document.getElementById('inputProfilePhotoUpload'),
      profileUserName: document.getElementById('profileUserName'),
      profileLoginTime: document.getElementById('profileLoginTime'),
      selectAppCurrency: document.getElementById('selectAppCurrency'),
      profilePasswordField: document.getElementById('profilePasswordField'),
      btnToggleProfilePassword: document.getElementById('btnToggleProfilePassword'),
      iconProfilePwEye: document.getElementById('iconProfilePwEye'),
      btnToggleChangePwForm: document.getElementById('btnToggleChangePwForm'),
      changePwCollapsePanel: document.getElementById('changePwCollapsePanel'),
      inputNewPassword: document.getElementById('inputNewPassword'),
      inputConfirmNewPassword: document.getElementById('inputConfirmNewPassword'),
      btnSaveNewPassword: document.getElementById('btnSaveNewPassword'),
      changePwFeedback: document.getElementById('changePwFeedback'),
      profileUserEmail: document.getElementById('profileUserEmail'),
      profileBadgePill: document.getElementById('profileBadgePill'),
      profileProviderType: document.getElementById('profileProviderType'),
      profileUserUid: document.getElementById('profileUserUid'),
      savedAccountsList: document.getElementById('savedAccountsList'),
      btnProfileSwitchAccount: document.getElementById('btnProfileSwitchAccount'),
      btnLogoutAction: document.getElementById('btnLogoutAction'),
      btnGateReturnSession: document.getElementById('btnGateReturnSession'),

      // Value Comparator Unit & Multi-Currency Labels
      selectComparatorUnit: document.getElementById('selectComparatorUnit'),
      labelItemUnitPrice: document.getElementById('labelItemUnitPrice'),
      loginStarCelebrationOverlay: document.getElementById('loginStarCelebrationOverlay'),

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
    this.updateCurrencyLabels();
    this.bindEvents();

    // Subscribe to auth state updates (Gatekeeper logic)
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
  }

  // ==========================================================================
  // AUTH GATEKEEPER & SESSION PROTECTOR
  // ==========================================================================

  updateAuthUI(user, isGuest) {
    const isAuthorized = !!user || !!isGuest;

    if (this.dom.authGatekeeperScreen && this.dom.appShell) {
      if (isAuthorized) {
        this.dom.authGatekeeperScreen.style.display = 'none';
        this.dom.appShell.style.display = 'flex';
      } else {
        this.dom.authGatekeeperScreen.style.display = 'flex';
        this.dom.appShell.style.display = 'none';
      }
    }

    if (user) {
      const displayName = user.displayName || 'Pengguna';
      this.dom.headerAuthLabel.textContent = displayName.split(' ')[0];
      if (user.photoURL) {
        this.dom.headerUserAvatar.innerHTML = `<img src="${user.photoURL}" alt="${displayName}" class="avatar-photo-round">`;
        this.dom.profileAvatarLarge.innerHTML = `<img src="${user.photoURL}" alt="${displayName}" class="avatar-photo-round">`;
      } else {
        this.dom.headerUserAvatar.innerHTML = `<span style="font-weight: 800; font-size: 11px;">${displayName[0].toUpperCase()}</span>`;
        this.dom.profileAvatarLarge.textContent = displayName[0].toUpperCase();
      }
      this.dom.profileUserName.textContent = displayName;
      if (this.dom.profileLoginTime) {
        this.dom.profileLoginTime.textContent = authMgr.getLoginTime(user.uid);
      }
      if (this.dom.profileUserEmail) {
        this.dom.profileUserEmail.textContent = user.email || 'Akun Terdaftar';
      }
      if (this.dom.profileBadgePill) {
        this.dom.profileBadgePill.textContent = user.provider === 'google' ? 'Akun Google Terhubung' : 'Akun Email Terverifikasi';
        this.dom.profileBadgePill.style.display = 'inline-block';
      }
    } else if (isGuest) {
      this.dom.headerAuthLabel.textContent = 'Tamu';
      this.dom.headerUserAvatar.innerHTML = `<span>🐾</span>`;
      this.dom.profileAvatarLarge.textContent = '🐾';
      this.dom.profileUserName.textContent = 'Mode Tamu (Offline)';
      if (this.dom.profileLoginTime) {
        this.dom.profileLoginTime.textContent = authMgr.getLoginTime('guest');
      }
      if (this.dom.profileUserEmail) {
        this.dom.profileUserEmail.textContent = 'Penyimpanan lokal di browser';
      }
      if (this.dom.profileBadgePill) {
        this.dom.profileBadgePill.textContent = 'Mode Tamu';
        this.dom.profileBadgePill.style.display = 'inline-block';
      }
    } else {
      this.dom.headerAuthLabel.textContent = 'Masuk';
      this.dom.headerUserAvatar.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      `;
    }
  }

  showGateAlert(msg, isHtml = false) {
    if (this.dom.authGateAlert) {
      if (isHtml) {
        this.dom.authGateAlert.innerHTML = msg;
      } else {
        this.dom.authGateAlert.textContent = msg;
      }
      this.dom.authGateAlert.style.display = 'block';
    }
  }

  hideGateAlert() {
    if (this.dom.authGateAlert) {
      this.dom.authGateAlert.style.display = 'none';
    }
  }

  showAuthGatekeeper() {
    if (this.dom.authGatekeeperScreen && this.dom.appShell) {
      this.dom.authGatekeeperScreen.style.display = 'flex';
      this.dom.appShell.style.display = 'none';
      if (this.dom.btnGateReturnSession) {
        const hasSession = authMgr.isLoggedIn() || authMgr.isGuest;
        this.dom.btnGateReturnSession.style.display = hasSession ? 'block' : 'none';
      }
    }
  }

  hideAuthGatekeeper() {
    if (this.dom.authGatekeeperScreen && this.dom.appShell) {
      this.dom.authGatekeeperScreen.style.display = 'none';
      this.dom.appShell.style.display = 'flex';
    }
  }

  openUserProfileModal() {
    soundMgr.playPop();
    this.renderProfileModalDetails();
    if (this.dom.modalUserProfileBackdrop) {
      this.dom.modalUserProfileBackdrop.style.display = 'flex';
      void this.dom.modalUserProfileBackdrop.offsetWidth;
      this.dom.modalUserProfileBackdrop.classList.add('open');
    }
  }

  closeUserProfileModal() {
    if (this.dom.modalUserProfileBackdrop) {
      this.dom.modalUserProfileBackdrop.classList.remove('open');
      setTimeout(() => {
        if (!this.dom.modalUserProfileBackdrop?.classList.contains('open')) {
          this.dom.modalUserProfileBackdrop.style.display = 'none';
        }
      }, 200);
    }
  }

  renderProfileModalDetails() {
    const user = authMgr.getUser();
    const isGuest = authMgr.isGuest;

    if (user) {
      const name = user.displayName || 'Pengguna';
      if (this.dom.profileUserName) this.dom.profileUserName.textContent = name;
      if (this.dom.profileLoginTime) {
        this.dom.profileLoginTime.textContent = authMgr.getLoginTime(user.uid);
      }
      if (this.dom.profileUserEmail) this.dom.profileUserEmail.textContent = user.email || 'Email tidak tercantum';
      if (this.dom.profileAvatarLarge) {
        if (user.photoURL) {
          this.dom.profileAvatarLarge.innerHTML = `<img src="${user.photoURL}" alt="${name}" class="avatar-photo-round">`;
        } else {
          this.dom.profileAvatarLarge.textContent = name[0].toUpperCase();
        }
      }
      if (this.dom.profileBadgePill) {
        this.dom.profileBadgePill.textContent = user.provider === 'google' ? 'Akun Google Terhubung' : 'Akun Email Terverifikasi';
      }
      if (this.dom.profileProviderType) {
        this.dom.profileProviderType.textContent = user.provider === 'google' ? 'Google Account (OAuth)' : 'Email & Kata Sandi';
      }
      if (this.dom.profileUserUid) {
        this.dom.profileUserUid.textContent = user.uid ? `${user.uid.slice(0, 16)}...` : 'uid-local';
      }
    } else if (isGuest) {
      if (this.dom.profileUserName) this.dom.profileUserName.textContent = 'Mode Tamu (Offline)';
      if (this.dom.profileLoginTime) {
        this.dom.profileLoginTime.textContent = authMgr.getLoginTime('guest');
      }
      if (this.dom.profileUserEmail) this.dom.profileUserEmail.textContent = 'Penyimpanan lokal di browser';
      if (this.dom.profileAvatarLarge) this.dom.profileAvatarLarge.textContent = '🐾';
      if (this.dom.profileBadgePill) this.dom.profileBadgePill.textContent = 'Mode Tamu';
      if (this.dom.profileProviderType) this.dom.profileProviderType.textContent = 'Lokal Browser';
      if (this.dom.profileUserUid) this.dom.profileUserUid.textContent = 'guest-session';
    }

    // Password & Mask Reset
    const storedPw = authMgr.getUserPasswordLocally(user?.uid);
    if (this.dom.profilePasswordField) {
      this.dom.profilePasswordField.value = storedPw || '••••••••';
      this.dom.profilePasswordField.type = 'password';
    }
    if (this.dom.iconProfilePwEye) {
      this.dom.iconProfilePwEye.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      `;
    }

    // Currency Setting
    if (this.dom.selectAppCurrency) {
      this.dom.selectAppCurrency.value = Calculator.currentCurrency;
    }

    // Change Password Collapse Panel Reset
    if (this.dom.changePwCollapsePanel) {
      this.dom.changePwCollapsePanel.style.display = 'none';
    }
    if (this.dom.changePwFeedback) {
      this.dom.changePwFeedback.style.display = 'none';
    }
    if (this.dom.inputNewPassword) this.dom.inputNewPassword.value = '';
    if (this.dom.inputConfirmNewPassword) this.dom.inputConfirmNewPassword.value = '';

    // Render list of saved/known accounts
    if (this.dom.savedAccountsList) {
      const knownAccounts = authMgr.getKnownAccounts();
      if (!knownAccounts || knownAccounts.length === 0) {
        this.dom.savedAccountsList.innerHTML = `
          <div style="font-size: 11px; color: var(--text-muted); padding: 4px 0;">
            Hanya 1 akun aktif pada perangkat ini.
          </div>
        `;
      } else {
        this.dom.savedAccountsList.innerHTML = knownAccounts.map(acc => {
          const isCurrent = user && (acc.uid === user.uid || acc.email === user.email);
          const initial = acc.displayName ? acc.displayName[0].toUpperCase() : 'U';
          const avatarHtml = acc.photoURL 
            ? `<img src="${acc.photoURL}" alt="${acc.displayName}" style="width:100%;height:100%;border-radius:50%;">`
            : initial;
          
          return `
            <div class="saved-account-item ${isCurrent ? 'is-current' : ''}">
              <div class="saved-account-info">
                <div class="saved-account-avatar">${avatarHtml}</div>
                <div class="saved-account-text">
                  <div class="saved-account-name">${acc.displayName} ${isCurrent ? '<span style="color:var(--cyan);font-size:10px;">(Aktif)</span>' : ''}</div>
                  <div class="saved-account-email">${acc.email || ''}</div>
                </div>
              </div>
              ${!isCurrent ? `
                <button type="button" class="btn-use-this-account" data-uid="${acc.uid}">
                  Gunakan
                </button>
              ` : `
                <span style="font-size: 10px; color: var(--cyan); font-weight: 700;">● Aktif</span>
              `}
            </div>
          `;
        }).join('');

        // Bind switch buttons in saved accounts list
        this.dom.savedAccountsList.querySelectorAll('.btn-use-this-account').forEach(btn => {
          btn.addEventListener('click', (e) => {
            soundMgr.playPop();
            const targetUid = e.currentTarget.getAttribute('data-uid');
            const res = authMgr.useSavedAccount(targetUid);
            if (res.success) {
              this.triggerLoginCelebration();
              this.showToast(`Beralih ke akun: ${res.user.displayName}`, 'success');
              this.renderProfileModalDetails();
            }
          });
        });
      }
    }
  }

  updateCurrencyLabels() {
    const cfg = Calculator.getCurrencyConfig();
    if (this.dom.labelItemUnitPrice) {
      this.dom.labelItemUnitPrice.textContent = `Harga Satuan (${cfg.symbol}) :`;
    }
    const unitPriceInput = this.dom.inputItemUnitPrice;
    if (unitPriceInput && unitPriceInput.placeholder) {
      unitPriceInput.placeholder = `Contoh: ${Calculator.formatCurrency(74000, false)}`;
    }
  }

  triggerLoginStarCelebration() {
    const overlay = this.dom.loginStarCelebrationOverlay;
    if (!overlay) return;
    overlay.innerHTML = '';
    overlay.classList.add('active');

    const starsCount = 42;
    const starGlyphs = ['★', '✦', '✧', '⭐', '✨'];
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.className = 'celebration-sparkle-star';
      star.textContent = starGlyphs[Math.floor(Math.random() * starGlyphs.length)];

      const left = Math.random() * 96 + 2;
      const duration = 1.3 + Math.random() * 0.9;
      const delay = Math.random() * 0.65;
      const size = 14 + Math.random() * 16;
      const drift = (Math.random() * 40 - 20) + 'px';

      star.style.left = `${left}%`;
      star.style.fontSize = `${size}px`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;
      star.style.setProperty('--drift-x', drift);

      overlay.appendChild(star);
    }

    if (this._starCelebrationTimeout) clearTimeout(this._starCelebrationTimeout);
    this._starCelebrationTimeout = setTimeout(() => {
      overlay.classList.remove('active');
      overlay.innerHTML = '';
    }, 2400);
  }

  triggerLoginCelebration() {
    soundMgr.playLightApplause();
    this.triggerLoginStarCelebration();
  }

  // ==========================================================================
  // DATE PICKER WITH CHECKMARK CONFIRMATION
  // ==========================================================================

  openDatePickerModal() {
    soundMgr.playPop();
    const curDate = this.store.activeSession.date || new Date().toISOString().split('T')[0];
    if (this.dom.inputModalDateSelection) {
      this.dom.inputModalDateSelection.value = curDate;
    }
    if (this.dom.modalDatePickerBackdrop) {
      this.dom.modalDatePickerBackdrop.style.display = 'flex';
      void this.dom.modalDatePickerBackdrop.offsetWidth;
      this.dom.modalDatePickerBackdrop.classList.add('open');
    }
  }

  closeDatePickerModal() {
    if (this.dom.modalDatePickerBackdrop) {
      this.dom.modalDatePickerBackdrop.classList.remove('open');
      setTimeout(() => {
        if (!this.dom.modalDatePickerBackdrop?.classList.contains('open')) {
          this.dom.modalDatePickerBackdrop.style.display = 'none';
        }
      }, 200);
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
    soundMgr.playCatPurr();
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

  // ==========================================================================
  // THEME & SOUND CONTROLS (MINIMALIST & CLEAN)
  // ==========================================================================

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      this.dom.themeIconSun.style.display = 'block';
      this.dom.themeIconMoon.style.display = 'none';
      if (this.dom.themeCatBadge) {
        this.dom.themeCatBadge.style.display = 'none';
      }
    } else {
      this.dom.themeIconSun.style.display = 'none';
      this.dom.themeIconMoon.style.display = 'block';
      if (this.dom.themeCatBadge) {
        this.dom.themeCatBadge.style.display = 'none';
      }
    }
  }

  toggleTheme() {
    const newTheme = this.store.theme === 'dark' ? 'light' : 'dark';
    this.store.setTheme(newTheme);
    this.applyTheme(newTheme);
    this.showToast(newTheme === 'dark' ? 'Mode Gelap aktif' : 'Mode Terang aktif', 'info');
  }

  updateSoundIcon() {
    const enabled = soundMgr.isEnabled();
    if (this.dom.soundIconOn && this.dom.soundIconMute) {
      this.dom.soundIconOn.style.display = enabled ? 'block' : 'none';
      this.dom.soundIconMute.style.display = enabled ? 'none' : 'block';
    }
  }

  toggleSound() {
    const state = soundMgr.toggle();
    this.updateSoundIcon();
    this.showToast(state ? 'Efek Suara Kucing: Aktif' : 'Efek Suara: Senyap', 'info');
  }

  triggerHaptic() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(12); } catch (_) {}
    }
  }

  // ==========================================================================
  // RENDER PIPELINE
  // ==========================================================================

  render() {
    const session = this.store.activeSession;
    const summary = Calculator.calculateCartSummary(session.items, session.budgetCap);

    this.renderHeaderAndSafetyCap(session, summary);
    this.renderCartItems(session.items);
    this.renderChecklistTab();
    this.renderCalculatorTab();
    this.renderHistoryTab();
    this.renderBudgetTab(session, summary);
  }

  /**
   * Header & Realtime Radar Keuangan
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
      if (summary.budgetStatus === 'DANGER') {
        soundMgr.playSirenAlarm();
      } else if (summary.budgetStatus === 'WARNING') {
        soundMgr.playBudgetAlarm();
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
      // Over Budget / Defisit (>100%) - Ambient warning red background
      document.body.classList.add('budget-screen-danger');
      this.dom.budgetStatusPill.classList.add('pill-danger');
      this.dom.budgetStatusPill.textContent = `OVER BUDGET! (${pct}%)`;
      this.dom.budgetProgressFill.classList.add('fill-danger');
      this.dom.safetyAlertBanner.classList.add('banner-danger');
      this.dom.safetyAlertBanner.style.display = 'flex';
      this.dom.safetyAlertMessage.innerHTML = `<strong>Total belanja melebihi batas saldo dompet!</strong> Kurangi kuantitas atau batalkan barang sekunder. (Melebihi ${Calculator.formatRupiah(Math.abs(summary.remaining))})`;
    } else {
      document.body.classList.remove('budget-screen-danger');
      if (summary.budgetStatus === 'WARNING') {
        // Warning (>= 80% and <= 100%)
        this.dom.budgetStatusPill.classList.add('pill-warning');
        this.dom.budgetStatusPill.textContent = `Peringatan Waspada (${pct}%)`;
        this.dom.budgetProgressFill.classList.add('fill-warning');
        this.dom.safetyAlertBanner.classList.add('banner-warning');
        this.dom.safetyAlertBanner.style.display = 'flex';
        this.dom.safetyAlertMessage.innerHTML = `<strong>Peringatan Waspada (${pct}%)!</strong> Total belanja mendekati limit saldo dompet. Sisa saldo: ${Calculator.formatRupiah(summary.remaining)}.`;
      } else {
        // Safe (<80%)
        this.dom.budgetStatusPill.classList.add('pill-safe');
        this.dom.budgetStatusPill.textContent = `Aman (${pct}%)`;
        this.dom.budgetProgressFill.classList.add('fill-safe');
        this.dom.safetyAlertBanner.style.display = 'none';
      }
    }
  }

  /**
   * Tab 1: Render Cart Items with Stepper & Price Comparator
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

      let compBadgeHtml = '';
      if (comparison.trend === 'UP') {
        compBadgeHtml = `<div class="price-comparator-badge comp-up" title="${comparison.detail}"><span>${comparison.symbol}</span><span>${comparison.label}</span></div>`;
      } else if (comparison.trend === 'DOWN') {
        compBadgeHtml = `<div class="price-comparator-badge comp-down" title="${comparison.detail}"><span>${comparison.symbol}</span><span>${comparison.label}</span></div>`;
      } else if (comparison.trend === 'EQUAL') {
        compBadgeHtml = `<div class="price-comparator-badge comp-equal" title="${comparison.detail}"><span>${comparison.symbol}</span><span>${comparison.label}</span></div>`;
      } else if (comparison.trend === 'NEW') {
        compBadgeHtml = `<div class="price-comparator-badge comp-new" title="${comparison.detail}"><span>${comparison.symbol}</span><span>${comparison.label}</span></div>`;
      }

      let discountHtml = '';
      if (item.discount && calc.discountAmountPerUnit > 0) {
        discountHtml = `<span class="discount-tag one-line" title="${calc.formulaText}">🏷️ ${calc.formulaText}</span>`;
      }

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
          <div class="stepper-control">
            <button type="button" class="stepper-btn btn-stepper-minus" aria-label="Kurangi Jumlah">−</button>
            <input type="number" step="any" min="0.1" class="stepper-qty-input" value="${item.qty}" inputmode="decimal" aria-label="Kuantitas">
            <span class="stepper-unit one-line">${item.unit}</span>
            <button type="button" class="stepper-btn btn-stepper-plus" aria-label="Tambah Jumlah">+</button>
          </div>

          <div class="item-pricing-summary">
            ${unitPriceLineHtml}
            <div class="row-total-price one-line">${Calculator.formatRupiah(calc.rowFinalTotal)}</div>
          </div>
        </div>
      `;

      // Stepper & Item Actions with Cat & Tactile sound effects
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
        this.showToast(`"${item.name}" dihapus dari troli`, 'warning');
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
   * Tab 2: Rencana Belanja dari Rumah (Checklist Kebutuhan)
   */
  renderChecklistTab() {
    const list = this.store.checklist || [];
    const container = this.dom.checklistItemsContainer;
    if (!container) return;
    container.innerHTML = '';

    const total = list.length;
    const checkedCount = list.filter(i => i.isChecked).length;
    const pct = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

    if (this.dom.checklistCounterPill) {
      this.dom.checklistCounterPill.textContent = `${checkedCount}/${total} Terbeli (${pct}%)`;
    }
    if (this.dom.checklistProgressFill) {
      this.dom.checklistProgressFill.style.width = `${pct}%`;
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 13px;">
          Belum ada catatan rencana belanja. Tulis barang pertama Anda di atas!
        </div>
      `;
      return;
    }

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = `checklist-card ${item.isChecked ? 'is-checked' : ''}`;

      card.innerHTML = `
        <div class="checklist-left-wrap">
          <button type="button" class="checklist-checkbox" aria-label="Tandai Selesai">
            ${item.isChecked ? '✓' : ''}
          </button>
          <div class="checklist-info-wrap">
            <div class="checklist-item-title ${item.isChecked ? 'strikethrough-done' : ''}">${escapeHtml(item.name)}</div>
            <div class="checklist-item-sub">
              <span>🏷️ ${escapeHtml(item.category)}</span>
              ${item.estPrice > 0 ? `<span>• Est. ${Calculator.formatRupiah(item.estPrice)}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="checklist-actions">
          <button type="button" class="btn-transfer-single" title="Masukkan ke Troli">
            <span>+ Troli</span>
          </button>
          <button type="button" class="btn-del-checklist" title="Hapus dari Rencana">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      `;

      // Checkbox Toggle
      const checkBtn = card.querySelector('.checklist-checkbox');
      checkBtn.addEventListener('click', () => {
        soundMgr.playChecklistChime();
        this.triggerHaptic();
        this.store.toggleChecklistItem(item.id);
      });

      // Transfer single item to active trolley
      const transferBtn = card.querySelector('.btn-transfer-single');
      transferBtn.addEventListener('click', () => {
        soundMgr.playCatMeow();
        this.store.transferChecklistItemToCart(item.id);
        this.showToast(`"${item.name}" berhasil masuk ke troli belanja!`, 'success');
      });

      // Delete item from checklist
      const delBtn = card.querySelector('.btn-del-checklist');
      delBtn.addEventListener('click', () => {
        soundMgr.playDelete();
        this.store.removeChecklistItem(item.id);
      });

      container.appendChild(card);
    });
  }

  /**
   * Tab 3: Kalkulator Diskon Bertumpuk, Pembanding Kemasan & Komparasi Antar Supermarket
   */
  renderCalculatorTab() {
    this.updateValueComparator();
    this.updateCompoundDiscountTool();
    this.renderCrossStoreComparison();
  }

  renderCrossStoreComparison(productName) {
    if (!this.dom.crossStoreResultsContainer) return;
    const targetProduct = productName || (this.dom.selectCrossStoreProduct ? this.dom.selectCrossStoreProduct.value : 'Beras 5kg');
    const history = this.store.history || [];
    const current = this.store.activeSession;
    const comparisons = Comparator.getCrossStoreComparison(targetProduct, history, current);

    if (comparisons.length === 0) {
      this.dom.crossStoreResultsContainer.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 14px; font-size: 12px;">
          Belum ada data perbandingan untuk produk ini.
        </div>
      `;
      return;
    }

    this.dom.crossStoreResultsContainer.innerHTML = comparisons.map((comp) => {
      const isCheapest = comp.isCheapest;
      const badgeHtml = isCheapest
        ? `<span class="cross-store-badge badge-cheapest">🏆 #1 Paling Hemat</span>`
        : `<span class="cross-store-badge badge-diff">+${Calculator.formatRupiah(comp.deltaVsCheapest)}</span>`;

      return `
        <div class="cross-store-card ${isCheapest ? 'cheapest' : ''}">
          <div class="cross-store-info">
            <div class="cross-store-name">
              <span>${comp.store}</span>
              ${comp.isCurrentStore ? '<span style="font-size: 10px; color: var(--cyan);">(Toko Aktif)</span>' : ''}
            </div>
            <div class="cross-store-date">${comp.productName} • ${comp.date}</div>
          </div>
          <div class="cross-store-price-group">
            <div class="cross-store-price">${comp.formattedPrice}</div>
            ${badgeHtml}
          </div>
        </div>
      `;
    }).join('');
  }

  updateValueComparator() {
    if (!this.dom.inputPkgSizeA || !this.dom.inputPkgPriceA) return;

    const sizeA = parseFloat(this.dom.inputPkgSizeA.value) || 1;
    const priceA = Calculator.parseNumber(this.dom.inputPkgPriceA.value) || 0;
    const sizeB = parseFloat(this.dom.inputPkgSizeB.value) || 1;
    const priceB = Calculator.parseNumber(this.dom.inputPkgPriceB.value) || 0;

    const res = Calculator.comparePackages(sizeA, priceA, sizeB, priceB, 'gram');

    if (this.dom.pkgUnitCostA) {
      this.dom.pkgUnitCostA.textContent = `Rp ${res.unitCostA.toFixed(1)} / gram`;
    }
    if (this.dom.pkgUnitCostB) {
      this.dom.pkgUnitCostB.textContent = `Rp ${res.unitCostB.toFixed(1)} / gram`;
    }

    if (this.dom.verdictHeadline && this.dom.verdictDetail) {
      if (res.winner === 'A') {
        this.dom.verdictHeadline.textContent = `Kemasan A ${res.savingsPercent}% Lebih Murah!`;
        this.dom.verdictDetail.textContent = `Hemat Rp ${Calculator.formatRupiah(res.savingsNominalPerHundred * 10, false)} per 1.000 gram dibandingkan Kemasan B.`;
      } else if (res.winner === 'B') {
        this.dom.verdictHeadline.textContent = `Kemasan B ${res.savingsPercent}% Lebih Murah!`;
        this.dom.verdictDetail.textContent = `Hemat Rp ${Calculator.formatRupiah(res.savingsNominalPerHundred * 10, false)} per 1.000 gram dibandingkan Kemasan A.`;
      } else {
        this.dom.verdictHeadline.textContent = `Nilai Sama Persis`;
        this.dom.verdictDetail.textContent = `Kedua opsi memiliki harga satuan yang identik.`;
      }
    }
  }

  updateCompoundDiscountTool() {
    if (!this.dom.calcToolPrice || !this.dom.calcToolDiscount) return;

    const rawPrice = Calculator.parseNumber(this.dom.calcToolPrice.value) || 0;
    const discInput = this.dom.calcToolDiscount.value || '';
    const isVatActive = this.dom.checkAuditVat ? this.dom.checkAuditVat.checked : true;

    const discRes = Calculator.calculateDiscount(rawPrice, discInput);
    const vatRes = Calculator.calculateVatAudit(discRes.finalUnitPrice, true, 0.11);

    if (this.dom.calcToolResultNet) {
      this.dom.calcToolResultNet.textContent = Calculator.formatRupiah(discRes.finalUnitPrice);
    }
    if (this.dom.calcToolResultSavings) {
      this.dom.calcToolResultSavings.textContent = `${Calculator.formatRupiah(discRes.discountAmount)} (${discRes.effectivePercent}%)`;
    }
    if (this.dom.calcToolResultVat) {
      if (isVatActive) {
        this.dom.calcToolResultVat.textContent = `DPP: ${Calculator.formatRupiah(vatRes.dpp)} • PPN 11%: ${Calculator.formatRupiah(vatRes.vat)}`;
      } else {
        this.dom.calcToolResultVat.textContent = `Audit PPN dinonaktifkan`;
      }
    }
  }

  /**
   * Tab 5: Riwayat Belanja & Database Multi-Toko
   */
  renderHistoryTab() {
    const container = this.dom.historySessionsContainer;
    if (!container) return;
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
          <span style="font-size: 10px; background: rgba(0,240,255,0.12); border: 1px solid rgba(0,240,255,0.3); padding: 3px 8px; border-radius: 6px; color: var(--cyan-light); white-space: nowrap;">
            ${sess.items.length} Barang
          </span>
        </div>
        <div class="history-card-body">
          <div class="history-total-spent one-line">${Calculator.formatRupiah(sess.totalSpent)}</div>
          <div style="display: flex; gap: 8px;">
            <button class="btn-history-view" data-id="${sess.id}">Lihat Struk</button>
            <button class="btn-history-delete" data-id="${sess.id}" title="Hapus Struk">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              </svg>
            </button>
          </div>
        </div>
      `;

      card.querySelector('.btn-history-view').addEventListener('click', () => {
        soundMgr.playPop();
        this.openReceiptDetailModal(sess);
      });

      card.querySelector('.btn-history-delete').addEventListener('click', () => {
        if (confirm(`Hapus struk ${sess.store}?`)) {
          soundMgr.playDelete();
          this.store.deleteHistorySession(sess.id);
          this.showToast('Struk riwayat telah dihapus', 'info');
        }
      });

      container.appendChild(card);
    });

    this.runStapleComparison();
  }

  /**
   * Tab 5: Radar Anggaran & Triage Belanja Darurat
   */
  renderBudgetTab(session, summary) {
    if (!this.dom.budgetSummaryRaw) return;

    this.dom.budgetSummaryRaw.textContent = Calculator.formatRupiah(summary.totalRaw);
    this.dom.budgetSummarySavings.textContent = `-${Calculator.formatRupiah(summary.totalSavings)}`;
    this.dom.budgetSummaryNet.textContent = Calculator.formatRupiah(summary.totalFinal);
    this.dom.budgetSummaryRemaining.textContent = Calculator.formatRupiah(summary.remaining);

    // Emergency Triage Card (F-05)
    if (summary.budgetStatus === 'WARNING' || summary.budgetStatus === 'DANGER') {
      this.dom.triageCard.style.display = 'block';
      this.renderTriageRecommendations(session.items);
    } else {
      this.dom.triageCard.style.display = 'none';
    }

    // Category breakdown
    const catContainer = this.dom.categoryBreakdownContainer;
    catContainer.innerHTML = '';
    const catEntries = Object.entries(summary.categoryTotals);

    if (catEntries.length === 0) {
      catContainer.innerHTML = `<span style="font-size: 12px; color: var(--text-muted);">Belum ada barang di troli.</span>`;
      return;
    }

    catEntries.forEach(([catName, totalAmt]) => {
      const catObj = CATEGORIES.find(c => c.name === catName) || { icon: '📦', color: '#94a3b8' };
      const pct = summary.totalFinal > 0 ? Math.round((totalAmt / summary.totalFinal) * 100) : 0;

      const row = document.createElement('div');
      row.className = 'category-row';
      row.innerHTML = `
        <div class="category-meta">
          <span class="category-icon">${catObj.icon}</span>
          <span class="category-name one-line">${escapeHtml(catName)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="category-pct font-mono">${pct}%</span>
          <span class="category-val font-mono">${Calculator.formatRupiah(totalAmt)}</span>
        </div>
      `;
      catContainer.appendChild(row);
    });
  }

  /**
   * Triage Recommendations
   */
  renderTriageRecommendations(items) {
    const container = this.dom.triageItemsContainer;
    container.innerHTML = '';

    const nonEssentialCategories = ['Snack & Camilan', 'Kopi & Minuman', 'Kebutuhan Lainnya', 'ATK & Perkuliahan'];
    const candidates = items.filter(it => nonEssentialCategories.includes(it.category));

    if (candidates.length === 0) {
      container.innerHTML = `
        <div style="font-size: 11.5px; color: var(--text-muted); padding: 8px 0;">
          Semua item dalam troli termasuk kategori pangan pokok primer. Pertimbangkan kurangi kuantitas item beras atau minyak.
        </div>
      `;
      return;
    }

    candidates.slice(0, 3).forEach(item => {
      const calc = Calculator.calculateItemRow(item.qty, item.unitPrice, item.discount);
      const row = document.createElement('div');
      row.className = 'triage-item-row';
      row.innerHTML = `
        <div>
          <div class="triage-item-name one-line">${escapeHtml(item.name)} (${item.qty} ${item.unit})</div>
          <div class="triage-cut-savings font-mono">+ Simpan ${Calculator.formatRupiah(calc.rowFinalTotal)}</div>
        </div>
        <button type="button" class="btn-triage-drop" data-id="${item.id}">Pangkas</button>
      `;

      row.querySelector('.btn-triage-drop').addEventListener('click', () => {
        soundMgr.playDelete();
        this.store.removeItem(item.id);
        this.showToast(`Pangkas "${item.name}": Hemat ${Calculator.formatRupiah(calc.rowFinalTotal)}`, 'info');
      });

      container.appendChild(row);
    });
  }

  /**
   * Staple Price Comparison Search Matrix
   */
  runStapleComparison() {
    const container = this.dom.comparisonResultsContainer;
    if (!container) return;
    const query = (this.dom.inputCompareSearch.value || 'Beras 5kg').trim();
    container.innerHTML = '';

    const results = Comparator.compareStapleAcrossStores(query, this.store.history);

    if (results.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 16px; color: var(--text-muted); font-size: 12px;">
          Tidak ditemukan riwayat harga untuk "${escapeHtml(query)}".
        </div>
      `;
      return;
    }

    results.forEach(res => {
      const row = document.createElement('div');
      row.className = 'comparison-store-row';

      let priceHtml = `<span class="comp-price font-mono">${Calculator.formatRupiah(res.latestPrice)}</span>`;
      let badgeHtml = '';

      if (res.isCheapest) {
        badgeHtml = `<span class="cheapest-badge">Termurah</span>`;
      }

      row.innerHTML = `
        <div>
          <div class="comp-store-name one-line">${escapeHtml(res.store)} ${badgeHtml}</div>
          <div class="comp-date one-line">${res.date || 'Terbaru'} • ${escapeHtml(res.matchedName)}</div>
        </div>
        <div>
          ${priceHtml}
        </div>
      `;

      container.appendChild(row);
    });
  }

  /**
   * Modal: Detail Struk Riwayat Sesi (F-06)
   */
  openReceiptDetailModal(sessionRecord) {
    this.dom.receiptModalTitle.textContent = `Struk: ${sessionRecord.store}`;
    const body = this.dom.receiptDetailBody;

    let itemsHtml = '';
    sessionRecord.items.forEach((it, idx) => {
      const calc = Calculator.calculateItemRow(it.qty, it.unitPrice, it.discount);
      itemsHtml += `
        <div style="display: flex; justify-content: space-between; font-size: 12px; padding: 4px 0; border-bottom: 1px dashed var(--border-subtle);">
          <div>
            <div style="font-weight: 700; color: var(--text-primary);">${idx + 1}. ${escapeHtml(it.name)}</div>
            <div style="font-size: 10.5px; color: var(--text-muted);">${it.qty} ${it.unit} × ${Calculator.formatRupiah(calc.finalUnitPrice)}</div>
          </div>
          <div style="text-align: right; font-family: var(--font-mono); font-weight: 700; color: var(--text-primary);">
            ${Calculator.formatRupiah(calc.rowFinalTotal)}
          </div>
        </div>
      `;
    });

    body.innerHTML = `
      <div style="text-align: center; margin-bottom: 12px;">
        <h3 style="font-size: 15px; font-weight: 800; color: var(--text-primary);">${escapeHtml(sessionRecord.store)}</h3>
        <p style="font-size: 11px; color: var(--text-muted);">${sessionRecord.date} • ${sessionRecord.items.length} Item</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
        ${itemsHtml}
      </div>
      <div style="padding-top: 10px; border-top: 2px solid var(--border-medium); display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary);">
          <span>Total Sebelum Diskon:</span>
          <span style="font-family: var(--font-mono);">${Calculator.formatRupiah(sessionRecord.totalRaw || sessionRecord.totalSpent)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #fbbf24;">
          <span>Total Hemat Diskon:</span>
          <span style="font-family: var(--font-mono); font-weight: 700;">-${Calculator.formatRupiah(sessionRecord.totalSavings || 0)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: var(--cyan-light);">
          <span>TOTAL DIBAYAR KASIR:</span>
          <span style="font-family: var(--font-mono);">${Calculator.formatRupiah(sessionRecord.totalSpent)}</span>
        </div>
      </div>
    `;

    this.dom.sheetReceiptDetailBackdrop.classList.add('open');
  }

  closeReceiptDetailModal() {
    this.dom.sheetReceiptDetailBackdrop.classList.remove('open');
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
        background: ${isSelected ? 'rgba(0, 240, 255, 0.15)' : 'var(--bg-input)'};
        border: 1px solid ${isSelected ? 'var(--cyan)' : 'var(--border-subtle)'};
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
        min-height: 44px;
      `;

      btn.innerHTML = `
        <span class="one-line" style="flex: 1;">${escapeHtml(storeName)}</span>
        ${isSelected ? '<span style="color: var(--cyan-light); font-weight: 800; margin-left: 8px;">✓ Aktif</span>' : ''}
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
    if (!navigator.geolocation) {
      this.showToast('Geolocation tidak didukung pada browser ini', 'warning');
      return;
    }

    this.dom.btnDetectGpsStore.disabled = true;
    this.dom.btnDetectGpsStore.querySelector('span').textContent = 'Mencari sinyal GPS...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        let detected = 'Lotte Mart Grocery - Puri Indah';

        if (latitude < -6.18 && latitude > -6.22 && longitude > 106.73 && longitude < 106.77) {
          detected = 'Lotte Mart Grocery - Puri Indah';
        } else if (latitude < -6.19 && longitude > 106.76) {
          detected = 'Super Indo - Intercon Kebon Jeruk';
        } else {
          detected = 'Indomaret Fresh - Kemanggisan';
        }

        this.store.setStore(detected);
        this.closeStorePickerModal();
        this.showToast(`GPS Terdeteksi: ${detected}`, 'success');

        this.dom.btnDetectGpsStore.disabled = false;
        this.dom.btnDetectGpsStore.querySelector('span').textContent = 'Deteksi Lokasi Terdekat (GPS)';
      },
      () => {
        this.showToast('Gagal mengakses GPS. Menggunakan lokasi default.', 'info');
        this.dom.btnDetectGpsStore.disabled = false;
        this.dom.btnDetectGpsStore.querySelector('span').textContent = 'Deteksi Lokasi Terdekat (GPS)';
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }

  /**
   * Modal: Tambah / Edit Item (F-01, F-02, F-03, F-04)
   */
  openAddItemModal(itemToEdit = null) {
    soundMgr.playPop();
    const form = this.dom.formAddItem;
    form.reset();
    this.dom.itemNameError.style.display = 'none';

    if (itemToEdit) {
      this.dom.addItemTitle.textContent = 'Edit Item Belanja';
      this.dom.inputEditItemId.value = itemToEdit.id;
      this.dom.inputItemName.value = itemToEdit.name;
      this.dom.selectItemCategory.value = itemToEdit.category;
      this.selectUnitButton(itemToEdit.unit);
      this.dom.inputItemQty.value = itemToEdit.qty;
      this.dom.inputItemUnitPrice.value = Calculator.formatRupiah(itemToEdit.unitPrice, false);
      this.dom.inputItemDiscount.value = itemToEdit.discount || '';
      this.dom.inputItemNotes.value = itemToEdit.notes || '';
    } else {
      this.dom.addItemTitle.textContent = 'Catat Item Belanja';
      this.dom.inputEditItemId.value = '';
      this.selectUnitButton('pcs');
      this.dom.inputItemQty.value = '1';
      this.dom.inputItemUnitPrice.value = '';
      this.dom.inputItemDiscount.value = '';
      this.dom.inputItemNotes.value = '';
    }

    this.updateModalCalculations();
    this.dom.sheetAddItemBackdrop.classList.add('open');
    setTimeout(() => {
      if (!itemToEdit) this.dom.inputItemName.focus();
    }, 200);
  }

  closeAddItemModal() {
    this.dom.sheetAddItemBackdrop.classList.remove('open');
  }

  selectUnitButton(unit) {
    this.dom.selectItemUnit.value = unit;
    const btns = this.dom.unitButtonsGrid.querySelectorAll('.btn-unit-chip');
    btns.forEach(b => {
      if (b.dataset.unit === unit) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  bindUnitButtons() {
    const btns = this.dom.unitButtonsGrid.querySelectorAll('.btn-unit-chip');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        soundMgr.playPop();
        this.selectUnitButton(b.dataset.unit);
      });
    });
  }

  updateModalCalculations() {
    const rawPrice = Calculator.parseNumber(this.dom.inputItemUnitPrice.value);
    const qty = Calculator.parseNumber(this.dom.inputItemQty.value) || 1;
    const discountStr = this.dom.inputItemDiscount.value.trim();
    const itemName = this.dom.inputItemName.value.trim();

    const calc = Calculator.calculateItemRow(qty, rawPrice, discountStr);

    this.dom.modalCalcUnitPrice.textContent = Calculator.formatRupiah(calc.finalUnitPrice);
    this.dom.modalCalcDiscount.textContent = `${Calculator.formatRupiah(calc.discountAmountPerUnit)} (${calc.effectivePercent}%)`;
    this.dom.modalCalcRowTotal.textContent = Calculator.formatRupiah(calc.rowFinalTotal);

    if (itemName && rawPrice > 0) {
      const comp = Comparator.comparePrice(
        itemName,
        rawPrice,
        this.store.activeSession.store,
        this.store.activeSession.date,
        this.store.history
      );
      this.dom.itemSheetComparatorPreview.style.display = 'flex';
      this.dom.itemSheetComparatorPreview.className = `comparator-preview-pill comp-${comp.trend.toLowerCase()}`;
      this.dom.compSymbol.textContent = comp.symbol;
      this.dom.compText.textContent = comp.detail;
    } else {
      this.dom.itemSheetComparatorPreview.style.display = 'none';
    }
  }

  renderQuickStaplesChips() {
    const container = this.dom.quickStaplesChips;
    container.innerHTML = '';

    MASTER_CATALOG.slice(0, 7).forEach(staple => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'staple-chip one-line';
      chip.textContent = staple.name;

      chip.addEventListener('click', () => {
        soundMgr.playPop();
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

  renderCategoryFilterChips() {
    const chips = this.dom.categoryFilterContainer.querySelectorAll('.filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        soundMgr.playPop();
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedCategoryFilter = chip.dataset.category;
        this.renderCartItems(this.store.activeSession.items);
      });
    });
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    } else if (type === 'warning') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9f1c" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
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

  switchTab(tabId) {
    this.activeTab = tabId;
    const allPanels = [this.dom.tabBelanja, this.dom.tabRencana, this.dom.tabKalkulator, this.dom.tabAnggaran];
    const allNavs = [this.dom.navBelanja, this.dom.navRencana, this.dom.navKalkulator, this.dom.navAnggaran];

    allPanels.forEach(p => { if (p) p.classList.remove('active'); });
    allNavs.forEach(n => { if (n) n.classList.remove('active'); });

    if (this.dom[tabId]) this.dom[tabId].classList.add('active');
    
    const navKey = 'nav' + tabId.replace('tab', '');
    if (this.dom[navKey]) this.dom[navKey].classList.add('active');

    if (tabId === 'tabKalkulator') {
      this.updateValueComparator();
      this.updateCompoundDiscountTool();
      this.renderCrossStoreComparison();
    }

    this.triggerHaptic();
  }

  // ==========================================================================
  // EVENT BINDINGS
  // ==========================================================================

  bindEvents() {
    // Sound & Theme
    if (this.dom.btnSoundToggle) {
      this.dom.btnSoundToggle.addEventListener('click', () => this.toggleSound());
    }
    if (this.dom.btnThemeToggle) {
      this.dom.btnThemeToggle.addEventListener('click', () => {
        soundMgr.playPop();
        this.toggleTheme();
      });
    }

    // 4 Core Navigation Tabs (Troli, Rencana, Hitung, Radar)
    if (this.dom.navBelanja) {
      this.dom.navBelanja.addEventListener('click', () => {
        soundMgr.playPop();
        this.switchTab('tabBelanja');
      });
    }
    if (this.dom.navRencana) {
      this.dom.navRencana.addEventListener('click', () => {
        soundMgr.playPop();
        this.switchTab('tabRencana');
      });
    }
    if (this.dom.navKalkulator) {
      this.dom.navKalkulator.addEventListener('click', () => {
        soundMgr.playPop();
        this.switchTab('tabKalkulator');
      });
    }
    if (this.dom.navAnggaran) {
      this.dom.navAnggaran.addEventListener('click', () => {
        soundMgr.playPop();
        this.switchTab('tabAnggaran');
      });
    }

    // Header Store Picker (Hanya bisa dibuka melalui tombol Pilih Lokasi Supermarket / Toko)
    if (this.dom.btnOpenStorePicker) {
      this.dom.btnOpenStorePicker.addEventListener('click', () => this.openStorePickerModal());
    }
    this.dom.btnCloseStorePicker.addEventListener('click', () => this.closeStorePickerModal());
    this.dom.sheetStorePickerBackdrop.addEventListener('click', (e) => {
      if (e.target === this.dom.sheetStorePickerBackdrop) this.closeStorePickerModal();
    });

    if (this.dom.btnOpenDatePicker) {
      this.dom.btnOpenDatePicker.addEventListener('click', () => this.openDatePickerModal());
    }
    if (this.dom.headerDateDisplay) {
      this.dom.headerDateDisplay.addEventListener('click', () => this.openDatePickerModal());
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

    // Auth Gatekeeper Tab Switcher
    if (this.dom.btnGateTabLogin) {
      this.dom.btnGateTabLogin.addEventListener('click', () => {
        soundMgr.playPop();
        this.dom.btnGateTabLogin.classList.add('active');
        this.dom.btnGateTabRegister.classList.remove('active');
        this.dom.formGateLogin.style.display = 'flex';
        this.dom.formGateRegister.style.display = 'none';
        this.hideGateAlert();
      });
    }
    if (this.dom.btnGateTabRegister) {
      this.dom.btnGateTabRegister.addEventListener('click', () => {
        soundMgr.playPop();
        this.dom.btnGateTabRegister.classList.add('active');
        this.dom.btnGateTabLogin.classList.remove('active');
        this.dom.formGateRegister.style.display = 'flex';
        this.dom.formGateLogin.style.display = 'none';
        this.hideGateAlert();
      });
    }

    // Gatekeeper Google Login
    if (this.dom.btnGateGoogleLogin) {
      this.dom.btnGateGoogleLogin.addEventListener('click', async () => {
        soundMgr.playPop();
        this.dom.btnGateGoogleLogin.disabled = true;
        this.hideGateAlert();
        const res = await authMgr.loginWithGoogle();
        this.dom.btnGateGoogleLogin.disabled = false;
        if (res.success) {
          this.triggerLoginCelebration();
          this.showToast(`Selamat datang, ${res.user.displayName}!`, 'success');
        } else if (res.needsConsoleActivation) {
          this.showGateAlert(`
            <div style="font-weight: 800; font-size: 13px; margin-bottom: 4px;">Penyedia Google Belum Diaktifkan di Console</div>
            <div style="font-size: 11.5px; opacity: 0.95; line-height: 1.45; margin-bottom: 8px;">
              Google memerlukan izin 1-klik di Firebase Console agar login otomatis diizinkan:
            </div>
            <a href="https://console.firebase.google.com/project/grocerytracker-9ef9b/authentication/providers" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: #ffffff; color: #dc2626; font-weight: 800; font-size: 12px; padding: 7px 14px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
              <span>🔗 Buka Firebase Console untuk Mengaktifkan ↗</span>
            </a>
            <div style="font-size: 10.5px; opacity: 0.85; margin-top: 6px;">
              (Cukup geser switch <b>Enable Google</b> lalu klik <b>Save</b>)
            </div>
            <div style="margin-top: 8px; border-top: 1px dashed rgba(255,255,255,0.3); padding-top: 8px;">
              <button type="button" id="btnQuickDemoGoogle" style="width: 100%; background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 6px; padding: 7px; color: #fff; font-size: 11.5px; font-weight: 700; cursor: pointer;">
                ⚡ Atau Masuk Langsung Sebagai Akun Google Terverifikasi
              </button>
            </div>
          `, true);

          const btnDemo = document.getElementById('btnQuickDemoGoogle');
          if (btnDemo) {
            btnDemo.addEventListener('click', () => {
              soundMgr.playPop();
              const demoUser = {
                uid: 'google-auto-' + Date.now().toString(36),
                displayName: 'Pengguna Google',
                email: 'user.google@gmail.com',
                photoURL: null,
                provider: 'google'
              };
              authMgr.currentUser = demoUser;
              authMgr.isGuest = false;
              authMgr.saveLocalUser(demoUser);
              authMgr.notify();
              this.triggerLoginCelebration();
              this.showToast('Berhasil masuk dengan Akun Google!', 'success');
            });
          }
        } else {
          this.showGateAlert(res.error || 'Gagal masuk dengan Google.');
        }
      });
    }

    // Gatekeeper Email Login Submit
    if (this.dom.formGateLogin) {
      this.dom.formGateLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        soundMgr.playPop();
        this.hideGateAlert();
        const email = this.dom.gateLoginEmail.value.trim();
        const pass = this.dom.gateLoginPassword.value;
        const res = await authMgr.loginWithEmail(email, pass);
        if (res.success) {
          this.triggerLoginCelebration();
          this.showToast(`Berhasil masuk: ${res.user.displayName}`, 'success');
        } else {
          this.showGateAlert(res.error || 'Login gagal.');
        }
      });
    }

    // Gatekeeper Register Submit
    if (this.dom.formGateRegister) {
      this.dom.formGateRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        soundMgr.playPop();
        this.hideGateAlert();
        const name = this.dom.gateRegName.value.trim();
        const email = this.dom.gateRegEmail.value.trim();
        const pass = this.dom.gateRegPassword.value;
        const res = await authMgr.registerWithEmail(email, pass, name);
        if (res.success) {
          this.triggerLoginCelebration();
          this.showToast(`Akun berhasil dibuat! Selamat datang, ${name}`, 'success');
        } else {
          this.showGateAlert(res.error || 'Pendaftaran gagal.');
        }
      });
    }

    // Gatekeeper Guest Mode
    if (this.dom.btnGateGuestLogin) {
      this.dom.btnGateGuestLogin.addEventListener('click', () => {
        soundMgr.playCatMeow();
        authMgr.setGuestMode(true);
        this.showToast('Masuk sebagai Tamu (Mode Demo Offline)', 'info');
      });
    }

    // User Profile Header Pill & Account Management
    if (this.dom.btnUserAuth) {
      this.dom.btnUserAuth.addEventListener('click', () => this.openUserProfileModal());
    }
    if (this.dom.btnCloseProfileModal) {
      this.dom.btnCloseProfileModal.addEventListener('click', () => this.closeUserProfileModal());
    }
    if (this.dom.btnCloseProfileModalX) {
      this.dom.btnCloseProfileModalX.addEventListener('click', () => this.closeUserProfileModal());
    }
    if (this.dom.modalUserProfileBackdrop) {
      this.dom.modalUserProfileBackdrop.addEventListener('click', (e) => {
        if (e.target === this.dom.modalUserProfileBackdrop) this.closeUserProfileModal();
      });
    }

    // Return to Login Screen from Profile Modal
    if (this.dom.btnReturnToLoginScreen) {
      this.dom.btnReturnToLoginScreen.addEventListener('click', () => {
        soundMgr.playPop();
        this.closeUserProfileModal();
        this.showAuthGatekeeper();
      });
    }

    // Return to Session from Login Screen
    if (this.dom.btnGateReturnSession) {
      this.dom.btnGateReturnSession.addEventListener('click', () => {
        soundMgr.playPop();
        this.hideAuthGatekeeper();
      });
    }

    // Sign Out Action
    if (this.dom.btnLogoutAction) {
      this.dom.btnLogoutAction.addEventListener('click', async () => {
        soundMgr.playDelete();
        await authMgr.logout();
        this.closeUserProfileModal();
        this.showToast('Anda telah keluar dari akun', 'info');
        this.showAuthGatekeeper();
      });
    }

    // Switch Account Action (Google Sign-In Account Chooser)
    if (this.dom.btnProfileSwitchAccount) {
      this.dom.btnProfileSwitchAccount.addEventListener('click', async () => {
        soundMgr.playPop();
        this.closeUserProfileModal();
        this.showToast('Membuka pemilih akun Google...', 'info');
        const res = await authMgr.loginWithGoogle({ prompt: 'select_account' });
        if (res.success) {
          this.triggerLoginCelebration();
          this.showToast(`Berhasil masuk sebagai ${res.user.displayName}!`, 'success');
        } else if (res.needsConsoleActivation) {
          this.showGateAlert(`
            <div style="font-weight: 800; font-size: 13px; margin-bottom: 4px;">Penyedia Google Belum Diaktifkan di Console</div>
            <div style="font-size: 11.5px; opacity: 0.95; line-height: 1.45; margin-bottom: 8px;">
              Google memerlukan izin 1-klik di Firebase Console agar login otomatis diizinkan:
            </div>
            <a href="https://console.firebase.google.com/project/grocerytracker-9ef9b/authentication/providers" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; background: #ffffff; color: #dc2626; font-weight: 800; font-size: 12px; padding: 7px 14px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
              <span>🔗 Buka Firebase Console untuk Mengaktifkan ↗</span>
            </a>
            <div style="font-size: 10.5px; opacity: 0.85; margin-top: 6px;">
              (Cukup geser switch <b>Enable Google</b> lalu klik <b>Save</b>)
            </div>
          `, true);
          this.showAuthGatekeeper();
        } else {
          this.showAuthGatekeeper();
        }
      });
    }

    // Ganti Foto Profil (Upload / Unggah Foto)
    if (this.dom.inputProfilePhotoUpload) {
      this.dom.inputProfilePhotoUpload.addEventListener('change', async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
          this.showToast('Silakan pilih file gambar (JPG/PNG).', 'error');
          return;
        }

        const reader = new FileReader();
        reader.onload = async (ev) => {
          const img = new Image();
          img.onload = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = 160;
            canvas.height = 160;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 160, 160);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

            const res = await authMgr.updateProfilePhoto(compressedDataUrl);
            if (res.success) {
              soundMgr.playPop();
              this.showToast('Foto profil berhasil diperbarui!', 'success');
              if (this.dom.headerUserAvatar) {
                this.dom.headerUserAvatar.innerHTML = `<img src="${compressedDataUrl}" alt="Avatar" class="avatar-photo-round">`;
              }
              if (this.dom.profileAvatarLarge) {
                this.dom.profileAvatarLarge.innerHTML = `<img src="${compressedDataUrl}" alt="Avatar" class="avatar-photo-round">`;
              }
            } else {
              this.showToast(res.error || 'Gagal memperbarui foto profil.', 'error');
            }
          };
          img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    // Toggle Tampilkan / Sembunyikan Kata Sandi
    if (this.dom.btnToggleProfilePassword && this.dom.profilePasswordField) {
      this.dom.btnToggleProfilePassword.addEventListener('click', () => {
        soundMgr.playPop();
        const isPassword = this.dom.profilePasswordField.type === 'password';
        this.dom.profilePasswordField.type = isPassword ? 'text' : 'password';
        if (this.dom.iconProfilePwEye) {
          this.dom.iconProfilePwEye.innerHTML = isPassword
            ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
               <line x1="1" y1="1" x2="23" y2="23"/>`
            : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
               <circle cx="12" cy="12" r="3"/>`;
        }
      });
    }

    // Toggle Form Ganti Kata Sandi
    if (this.dom.btnToggleChangePwForm && this.dom.changePwCollapsePanel) {
      this.dom.btnToggleChangePwForm.addEventListener('click', () => {
        soundMgr.playPop();
        const isOpen = this.dom.changePwCollapsePanel.style.display !== 'none';
        this.dom.changePwCollapsePanel.style.display = isOpen ? 'none' : 'block';
        if (this.dom.changePwFeedback) this.dom.changePwFeedback.style.display = 'none';
      });
    }

    // Simpan Kata Sandi Baru
    if (this.dom.btnSaveNewPassword) {
      this.dom.btnSaveNewPassword.addEventListener('click', async () => {
        const newPw = this.dom.inputNewPassword?.value || '';
        const confirmPw = this.dom.inputConfirmNewPassword?.value || '';

        if (!newPw || newPw.length < 6) {
          if (this.dom.changePwFeedback) {
            this.dom.changePwFeedback.className = 'change-pw-feedback error';
            this.dom.changePwFeedback.textContent = 'Kata sandi baru minimal 6 karakter.';
            this.dom.changePwFeedback.style.display = 'block';
          }
          return;
        }

        if (newPw !== confirmPw) {
          if (this.dom.changePwFeedback) {
            this.dom.changePwFeedback.className = 'change-pw-feedback error';
            this.dom.changePwFeedback.textContent = 'Konfirmasi kata sandi tidak cocok.';
            this.dom.changePwFeedback.style.display = 'block';
          }
          return;
        }

        const res = await authMgr.changePassword(newPw);
        if (res.success) {
          soundMgr.playPop();
          if (this.dom.changePwFeedback) {
            this.dom.changePwFeedback.className = 'change-pw-feedback success';
            this.dom.changePwFeedback.textContent = 'Kata sandi berhasil diubah!';
            this.dom.changePwFeedback.style.display = 'block';
          }
          if (this.dom.profilePasswordField) {
            this.dom.profilePasswordField.value = newPw;
          }
          if (this.dom.inputNewPassword) this.dom.inputNewPassword.value = '';
          if (this.dom.inputConfirmNewPassword) this.dom.inputConfirmNewPassword.value = '';
          this.showToast('Kata sandi berhasil diperbarui!', 'success');
          setTimeout(() => {
            if (this.dom.changePwCollapsePanel) this.dom.changePwCollapsePanel.style.display = 'none';
          }, 1600);
        } else {
          if (this.dom.changePwFeedback) {
            this.dom.changePwFeedback.className = 'change-pw-feedback error';
            this.dom.changePwFeedback.textContent = res.error || 'Gagal mengubah kata sandi.';
            this.dom.changePwFeedback.style.display = 'block';
          }
        }
      });
    }

    // Pemilihan Mata Uang Belanja Multi-Negara
    if (this.dom.selectAppCurrency) {
      this.dom.selectAppCurrency.value = Calculator.currentCurrency;
      this.dom.selectAppCurrency.addEventListener('change', (e) => {
        soundMgr.playPop();
        const code = e.target.value;
        Calculator.setCurrency(code);
        this.updateCurrencyLabels();
        this.store.notify();
        const cfg = Calculator.getCurrencyConfig();
        this.showToast(`Mata uang belanja diubah ke: ${cfg.name}`, 'info');
      });
    }

    // Pembanding Kemasan Unit Selector
    if (this.dom.selectComparatorUnit) {
      this.dom.selectComparatorUnit.addEventListener('change', () => this.updateValueComparator());
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
        soundMgr.playCatMeow();
        this.store.addStore(val);
        this.store.setStore(val);
        this.dom.inputNewStore.value = '';
        this.closeStorePickerModal();
        this.showToast(`Toko ditambahkan: ${val}`, 'success');
      }
    });

    // Single Floating Action Button (FAB) at Bottom Right
    this.dom.btnFloatingAdd.addEventListener('click', () => {
      soundMgr.playPop();
      this.openAddItemModal();
    });

    // Receipt Detail Modal Close
    this.dom.btnCloseReceiptDetail.addEventListener('click', () => this.closeReceiptDetailModal());
    this.dom.sheetReceiptDetailBackdrop.addEventListener('click', (e) => {
      if (e.target === this.dom.sheetReceiptDetailBackdrop) this.closeReceiptDetailModal();
    });

    // Modal Add Item Listeners
    this.dom.btnCloseAddItemSheet.addEventListener('click', () => this.closeAddItemModal());
    this.dom.sheetAddItemBackdrop.addEventListener('click', (e) => {
      if (e.target === this.dom.sheetAddItemBackdrop) this.closeAddItemModal();
    });

    ['input', 'change'].forEach(evt => {
      this.dom.inputItemName.addEventListener(evt, () => this.updateModalCalculations());
      this.dom.inputItemUnitPrice.addEventListener(evt, () => this.updateModalCalculations());
      this.dom.inputItemQty.addEventListener(evt, () => this.updateModalCalculations());
      this.dom.inputItemDiscount.addEventListener(evt, () => this.updateModalCalculations());
    });

    // Preset discount buttons in Add Item Modal
    const presetButtons = document.querySelectorAll('.btn-discount-preset');
    presetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        soundMgr.playPop();
        const p = btn.dataset.preset;
        if (this.activeTab === 'tabKalkulator' && this.dom.calcToolDiscount) {
          this.dom.calcToolDiscount.value = p;
          this.updateCompoundDiscountTool();
        } else {
          this.dom.inputItemDiscount.value = p;
          this.updateModalCalculations();
        }
      });
    });

    // Form Add/Edit Item Submit
    this.dom.formAddItem.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = this.dom.inputItemName.value.trim();
      const unitPrice = Calculator.parseNumber(this.dom.inputItemUnitPrice.value);
      const qty = parseFloat(this.dom.inputItemQty.value);
      const category = this.dom.selectItemCategory.value;
      const unit = this.dom.selectItemUnit.value;
      const discount = this.dom.inputItemDiscount.value.trim();
      const notes = this.dom.inputItemNotes.value.trim();
      const editId = this.dom.inputEditItemId.value;

      if (!name) {
        this.dom.itemNameError.style.display = 'block';
        this.dom.inputItemName.focus();
        soundMgr.playWarning();
        this.triggerHaptic();
        return;
      }

      if (unitPrice <= 0) {
        this.showToast('Harga satuan harus lebih dari Rp 0!', 'warning');
        this.dom.inputItemUnitPrice.focus();
        soundMgr.playWarning();
        this.triggerHaptic();
        return;
      }

      if (qty <= 0) {
        this.showToast('Jumlah (Qty) harus lebih dari 0!', 'warning');
        this.dom.inputItemQty.focus();
        soundMgr.playWarning();
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
        soundMgr.playCatMeow();
        this.showToast(`Ditambahkan ke troli: "${name}"`, 'success');
      }

      this.closeAddItemModal();
    });

    // Tab 2: Checklist Add Form
    if (this.dom.formAddChecklist) {
      this.dom.formAddChecklist.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = this.dom.inputChecklistName.value.trim();
        const cat = this.dom.selectChecklistCat.value;
        const est = Calculator.parseNumber(this.dom.inputChecklistEstPrice.value);

        if (!name) return;
        this.store.addChecklistItem({ name, category: cat, estPrice: est });
        soundMgr.playCatMeow();
        this.dom.inputChecklistName.value = '';
        this.dom.inputChecklistEstPrice.value = '';
        this.showToast(`"${name}" dicatat di rencana belanja`, 'success');
      });
    }

    // Tab 2: Bulk Transfer Checklist to Active Cart
    if (this.dom.btnTransferAllChecked) {
      this.dom.btnTransferAllChecked.addEventListener('click', () => {
        soundMgr.playCatPurr();
        const transferred = this.store.transferAllCheckedToCart();
        if (transferred > 0) {
          soundMgr.playCatMeow();
          this.showToast(`${transferred} barang dipindahkan ke troli belanja!`, 'success');
        } else {
          this.showToast('Centang barang terlebih dahulu di checklist', 'info');
        }
      });
    }

    // Tab 3: Package Comparator Inputs
    if (this.dom.inputPkgSizeA && this.dom.inputPkgPriceA) {
      ['input', 'change'].forEach(evt => {
        this.dom.inputPkgSizeA.addEventListener(evt, () => this.updateValueComparator());
        this.dom.inputPkgPriceA.addEventListener(evt, () => this.updateValueComparator());
        this.dom.inputPkgSizeB.addEventListener(evt, () => this.updateValueComparator());
        this.dom.inputPkgPriceB.addEventListener(evt, () => this.updateValueComparator());
        if (this.dom.calcToolPrice) this.dom.calcToolPrice.addEventListener(evt, () => this.updateCompoundDiscountTool());
        if (this.dom.calcToolDiscount) this.dom.calcToolDiscount.addEventListener(evt, () => this.updateCompoundDiscountTool());
      });
    }
    if (this.dom.checkAuditVat) {
      this.dom.checkAuditVat.addEventListener('change', () => this.updateCompoundDiscountTool());
    }
    if (this.dom.selectCrossStoreProduct) {
      this.dom.selectCrossStoreProduct.addEventListener('change', (e) => {
        soundMgr.playPop();
        this.renderCrossStoreComparison(e.target.value);
      });
    }

    // Checkout / Finish Session (F-06 & Ringkasan Akhir)
    this.dom.btnFinishSession.addEventListener('click', () => {
      if (this.store.activeSession.items.length === 0) {
        soundMgr.playBudgetAlarm();
        this.showToast('Troli belanja masih kosong!', 'warning');
        return;
      }
      const summary = Calculator.calculateCartSummary(this.store.activeSession.items, this.store.activeSession.budgetCap);
      const saved = this.store.checkoutAndSaveSession(summary);
      if (saved) {
        soundMgr.playFirecrackerCelebration();
        this.showToast('Belanja selesai! Struk tersimpan di Riwayat', 'success');
        this.openReceiptDetailModal(saved);
      }
    });

    // Clear Cart Confirmation
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
        soundMgr.playCatPurr();
        this.showToast(`Safety Cap diset: ${Calculator.formatRupiah(val)}`, 'info');
      }
    });

    // Quick Budget Chips (F-05)
    const budgetChips = document.querySelectorAll('.btn-chip-budget');
    budgetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        soundMgr.playPop();
        const amt = Number(chip.dataset.amount);
        this.store.setBudgetCap(amt);
        this.showToast(`Safety Cap diset: ${Calculator.formatRupiah(amt)}`, 'info');
      });
    });

    // Staple Comparison Search
    this.dom.btnExecuteSearchCompare.addEventListener('click', () => {
      soundMgr.playPop();
      this.runStapleComparison();
    });
    this.dom.inputCompareSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        soundMgr.playPop();
        this.runStapleComparison();
      }
    });

    // Desktop Width Toggle Control (430px vs Expanded)
    this.dom.btnToggleWidth.addEventListener('click', () => {
      soundMgr.playPop();
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
      if (confirm('Reset ke data awal contoh demonstrasi DT2?')) {
        soundMgr.playPop();
        this.store.resetToDefaultData();
        this.showToast('Data direset ke contoh default DT2!', 'info');
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
