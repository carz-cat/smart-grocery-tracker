/**
 * Smart Grocery & Budget Safety Tracker
 * Module: Auth (Authentication Manager: Firebase Google Auth, Email/Password & Local Account Fallback)
 */

import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  updatePassword 
} from './firebase-config.js';

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.listeners = [];
    this.isGuest = false;

    // Load cached user or guest state
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem('sgt_current_user');
      if (cached) {
        try {
          this.currentUser = JSON.parse(cached);
        } catch (_) {}
      }
      this.isGuest = localStorage.getItem('sgt_guest_mode') === 'true';
    }

    // Listen to Firebase Auth state
    if (auth && typeof onAuthStateChanged === 'function') {
      try {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const customPhoto = (typeof localStorage !== 'undefined' && localStorage.getItem(`sgt_user_photo_${firebaseUser.uid}`)) || null;
            this.currentUser = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Pengguna',
              email: firebaseUser.email,
              photoURL: customPhoto || firebaseUser.photoURL || null,
              provider: firebaseUser.providerData[0]?.providerId || 'password'
            };
            this.isGuest = false;
            this.saveLocalUser(this.currentUser);
          } else if (!this.currentUser || this.currentUser.provider !== 'local') {
            // Only clear if not using a local fallback account
            if (this.currentUser && this.currentUser.provider !== 'local') {
              this.currentUser = null;
              this.saveLocalUser(null);
            }
          }
          this.notify();
        });
      } catch (err) {
        console.warn('Firebase Auth listener error:', err);
      }
    }
  }

  saveLocalUser(user) {
    if (typeof localStorage !== 'undefined') {
      if (user) {
        localStorage.setItem('sgt_current_user', JSON.stringify(user));
        localStorage.removeItem('sgt_guest_mode');
        this.addKnownAccount(user);
      } else {
        localStorage.removeItem('sgt_current_user');
      }
    }
  }

  getKnownAccounts() {
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem('sgt_known_accounts');
        return raw ? JSON.parse(raw) : [];
      } catch (_) {
        return [];
      }
    }
    return [];
  }

  addKnownAccount(user) {
    if (!user || !user.uid) return;
    try {
      let list = this.getKnownAccounts();
      list = list.filter(a => a.uid !== user.uid && a.email !== user.email);
      list.unshift({
        uid: user.uid,
        displayName: user.displayName || 'Pengguna',
        email: user.email,
        photoURL: user.photoURL || null,
        provider: user.provider || 'password',
        lastUsed: new Date().toISOString()
      });
      localStorage.setItem('sgt_known_accounts', JSON.stringify(list.slice(0, 5)));
    } catch (_) {}
  }

  recordLoginTime(uid = null) {
    const targetUid = uid || this.currentUser?.uid || 'guest';
    const now = new Date();
    const timeStr = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';

    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(`sgt_login_time_${targetUid}`, timeStr);
      } catch (_) {}
    }
    return timeStr;
  }

  getLoginTime(uid = null) {
    const targetUid = uid || this.currentUser?.uid || 'guest';
    if (typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem(`sgt_login_time_${targetUid}`);
        if (stored) return stored;
      } catch (_) {}
    }
    return this.recordLoginTime(targetUid);
  }

  async updateProfilePhoto(photoDataUrl) {
    if (!photoDataUrl) return { success: false, error: 'Foto tidak valid.' };
    
    if (!this.currentUser) {
      this.currentUser = {
        uid: 'user_' + Date.now(),
        displayName: 'Pengguna Tala',
        email: 'pengguna@tala.app',
        photoURL: photoDataUrl,
        provider: 'local'
      };
    } else {
      this.currentUser.photoURL = photoDataUrl;
    }

    this.saveLocalUser(this.currentUser);
    if (typeof localStorage !== 'undefined' && this.currentUser.uid) {
      try {
        localStorage.setItem(`sgt_user_photo_${this.currentUser.uid}`, photoDataUrl);
      } catch (_) {}
    }

    if (auth && auth.currentUser && typeof updateProfile === 'function') {
      try {
        await updateProfile(auth.currentUser, { photoURL: photoDataUrl });
      } catch (err) {
        console.warn('Firebase updateProfile photo error:', err.message);
      }
    }

    this.notify();
    return { success: true, photoURL: photoDataUrl };
  }

  saveUserPasswordLocally(uid, password) {
    if (!uid || !password || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(`sgt_user_pw_${uid}`, password);
    } catch (_) {}
  }

  getUserPasswordLocally(uid = null) {
    if (typeof localStorage === 'undefined') return null;
    const targetUid = uid || this.currentUser?.uid;
    if (!targetUid) return null;
    try {
      const pw = localStorage.getItem(`sgt_user_pw_${targetUid}`);
      if (pw) return pw;

      const db = JSON.parse(localStorage.getItem('sgt_local_accounts') || '[]');
      const found = db.find(acc => acc.uid === targetUid || (this.currentUser && acc.email?.toLowerCase() === this.currentUser.email?.toLowerCase()));
      if (found && found.password) return found.password;
    } catch (_) {}
    return null;
  }

  async changePassword(newPassword) {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Kata sandi baru minimal 6 karakter.' };
    }

    // 1. Try Firebase Auth updatePassword if available
    if (auth && auth.currentUser && typeof updatePassword === 'function') {
      try {
        await updatePassword(auth.currentUser, newPassword);
        this.saveUserPasswordLocally(this.currentUser?.uid, newPassword);
        return { success: true };
      } catch (err) {
        if (err.code === 'auth/requires-recent-login') {
          return { success: false, error: 'Sesi login telah kedaluwarsa. Silakan keluar dan masuk kembali.' };
        }
        console.warn('Firebase Auth updatePassword error:', err.message);
      }
    }

    // 2. Update local storage & accounts db
    if (this.currentUser) {
      try {
        const uid = this.currentUser.uid;
        this.saveUserPasswordLocally(uid, newPassword);

        const db = JSON.parse(localStorage.getItem('sgt_local_accounts') || '[]');
        const idx = db.findIndex(acc => acc.uid === uid || (this.currentUser.email && acc.email?.toLowerCase() === this.currentUser.email?.toLowerCase()));
        if (idx !== -1) {
          db[idx].password = newPassword;
          localStorage.setItem('sgt_local_accounts', JSON.stringify(db));
        }
        return { success: true };
      } catch (_) {
        return { success: false, error: 'Gagal memperbarui kata sandi lokal.' };
      }
    }

    return { success: false, error: 'Tidak ada sesi pengguna aktif.' };
  }

  useSavedAccount(uid) {
    const list = this.getKnownAccounts();
    const target = list.find(a => a.uid === uid);
    if (target) {
      this.currentUser = target;
      this.isGuest = false;
      this.saveLocalUser(target);
      this.notify();
      return { success: true, user: target };
    }
    return { success: false, error: 'Akun tidak ditemukan' };
  }

  setGuestMode(active = true) {
    this.isGuest = active;
    if (typeof localStorage !== 'undefined') {
      if (active) {
        localStorage.setItem('sgt_guest_mode', 'true');
      } else {
        localStorage.removeItem('sgt_guest_mode');
      }
    }
    this.notify();
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  onUserChange(callback) {
    this.listeners.push(callback);
    callback(this.currentUser, this.isGuest);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(this.currentUser, this.isGuest); } catch (_) {}
    });
  }

  // 1. Sign in with Google
  async loginWithGoogle(options = {}) {
    if (auth && googleProvider) {
      try {
        if (options && options.prompt && typeof googleProvider.setCustomParameters === 'function') {
          googleProvider.setCustomParameters({ prompt: options.prompt });
        }
        const result = await signInWithPopup(auth, googleProvider);
        const u = result.user;
        this.currentUser = {
          uid: u.uid,
          displayName: u.displayName || u.email?.split('@')[0] || 'Pengguna Google',
          email: u.email,
          photoURL: u.photoURL || null,
          provider: 'google'
        };
        this.isGuest = false;
        this.saveLocalUser(this.currentUser);
        this.notify();
        return { success: true, user: this.currentUser };
      } catch (err) {
        console.warn('Google Firebase Sign In notice:', err.code, err.message);
        
        // If Google Auth provider is not yet enabled in Firebase Console, fallback gracefully
        if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
          return {
            success: false,
            needsConsoleActivation: true,
            error: 'Fitur Google Sign-In belum diaktifkan di Firebase Console. Silakan aktifkan di menu Authentication > Sign-in method.'
          };
        }
        return { success: false, error: err.message };
      }
    }

    return { success: false, error: 'Firebase Auth tidak tersedia atau sedang offline.' };
  }

  // 2. Sign in with Email and Password
  async loginWithEmail(email, password) {
    if (!email || !password) {
      return { success: false, error: 'Email dan kata sandi wajib diisi.' };
    }

    if (auth) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const u = result.user;
        this.currentUser = {
          uid: u.uid,
          displayName: u.displayName || u.email?.split('@')[0] || 'Pengguna',
          email: u.email,
          photoURL: u.photoURL || null,
          provider: 'password'
        };
        this.saveUserPasswordLocally(u.uid, password);
        this.isGuest = false;
        this.saveLocalUser(this.currentUser);
        this.notify();
        return { success: true, user: this.currentUser };
      } catch (err) {
        // Fallback to local accounts if Firebase Auth not activated yet in console
        if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
          return this.loginLocalAccount(email, password);
        }
        let message = err.message;
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          message = 'Email atau kata sandi tidak cocok. Silakan coba lagi atau daftar akun baru.';
        } else if (err.code === 'auth/invalid-email') {
          message = 'Format email tidak valid.';
        }
        return { success: false, error: message };
      }
    }

    return this.loginLocalAccount(email, password);
  }

  // 3. Register with Email, Password & Display Name
  async registerWithEmail(email, password, displayName) {
    if (!email || !password) {
      return { success: false, error: 'Email dan kata sandi wajib diisi.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Kata sandi minimal 6 karakter.' };
    }

    const name = displayName?.trim() || email.split('@')[0];

    if (auth) {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const u = result.user;
        if (name && typeof updateProfile === 'function') {
          await updateProfile(u, { displayName: name }).catch(() => {});
        }
        this.currentUser = {
          uid: u.uid,
          displayName: name,
          email: u.email,
          photoURL: null,
          provider: 'password'
        };
        this.saveUserPasswordLocally(u.uid, password);
        this.isGuest = false;
        this.saveLocalUser(this.currentUser);
        this.notify();
        return { success: true, user: this.currentUser };
      } catch (err) {
        if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
          return this.registerLocalAccount(email, password, name);
        }
        let message = err.message;
        if (err.code === 'auth/email-already-in-use') {
          message = 'Email ini sudah terdaftar. Silakan masuk menggunakan form login.';
        } else if (err.code === 'auth/invalid-email') {
          message = 'Format email tidak valid.';
        }
        return { success: false, error: message };
      }
    }

    return this.registerLocalAccount(email, password, name);
  }

  // Local account fallback (stored in localStorage)
  loginLocalAccount(email, password) {
    try {
      const db = JSON.parse(localStorage.getItem('sgt_local_accounts') || '[]');
      const found = db.find(acc => acc.email.toLowerCase() === email.toLowerCase());
      if (!found || found.password !== password) {
        return { success: false, error: 'Email atau kata sandi tidak sesuai.' };
      }
      this.currentUser = {
        uid: found.uid,
        displayName: found.displayName,
        email: found.email,
        photoURL: null,
        provider: 'local'
      };
      this.saveUserPasswordLocally(found.uid, password);
      this.isGuest = false;
      this.saveLocalUser(this.currentUser);
      this.notify();
      return { success: true, user: this.currentUser };
    } catch (_) {
      return { success: false, error: 'Gagal memproses akun lokal.' };
    }
  }

  registerLocalAccount(email, password, displayName) {
    try {
      const db = JSON.parse(localStorage.getItem('sgt_local_accounts') || '[]');
      if (db.some(acc => acc.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'Email ini sudah terdaftar. Silakan masuk.' };
      }
      const uid = 'local_' + Math.random().toString(36).substring(2, 9);
      const newAcc = { uid, email, password, displayName };
      db.push(newAcc);
      localStorage.setItem('sgt_local_accounts', JSON.stringify(db));

      this.currentUser = { uid, displayName, email, photoURL: null, provider: 'local' };
      this.saveUserPasswordLocally(uid, password);
      this.isGuest = false;
      this.saveLocalUser(this.currentUser);
      this.notify();
      return { success: true, user: this.currentUser };
    } catch (_) {
      return { success: false, error: 'Gagal membuat akun lokal.' };
    }
  }

  // 4. Logout
  async logout() {
    if (auth && typeof signOut === 'function') {
      try {
        await signOut(auth);
      } catch (_) {}
    }
    this.currentUser = null;
    this.isGuest = false;
    this.saveLocalUser(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sgt_guest_mode');
    }
    this.notify();
    return { success: true };
  }
}

export const authMgr = new AuthManager();

