import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const BRAND_STORAGE_KEY = 'traceu_custom_brand';

const DEFAULT_BRAND = {
  companyName: 'TraceU Technologies',
  companyLogo: null,
  primaryColor: '#530EF0',
  secondaryColor: '#F3EBFF',
  accentColor: '#10B981',
  themeMode: 'light',
  favicon: null
};

const BrandContext = createContext({
  ...DEFAULT_BRAND,
  updateBrand: () => {},
  resetBrand: () => {},
  setPrimaryColor: () => {},
  setCompanyLogo: () => {},
  setCompanyName: () => {},
  setThemeMode: () => {}
});

export function BrandProvider({ children }) {
  const [brand, setBrand] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...DEFAULT_BRAND, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored brand settings:', e);
    }
    return DEFAULT_BRAND;
  });

  const syncBrand = useCallback((newBrandData) => {
    setBrand((prev) => {
      const updated = { ...prev, ...newBrandData };
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(updated));
          if (updated.themeMode) {
            window.localStorage.setItem('traceu_theme_mode', updated.themeMode);
          }
        }
      } catch (e) {
        console.warn('Failed to save brand settings to localStorage:', e);
      }
      return updated;
    });
  }, []);

  const updateBrand = useCallback((newValues) => {
    syncBrand(newValues);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('traceu_brand_updated', { detail: newValues }));
    }
  }, [syncBrand]);

  useEffect(() => {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
    fetch(`${baseUrl}/api/v1/brand`)
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.success && payload?.data) {
          syncBrand(payload.data);
        }
      })
      .catch(() => {});
  }, [syncBrand]);

  const resetBrand = useCallback(() => {
    setBrand(DEFAULT_BRAND);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(DEFAULT_BRAND));
        window.localStorage.setItem('traceu_theme_mode', 'light');
      }
    } catch (e) {
      console.warn('Failed to reset brand in localStorage:', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('traceu_brand_updated', { detail: DEFAULT_BRAND }));
    }
  }, []);

  const setPrimaryColor = useCallback((color) => {
    updateBrand({ primaryColor: color });
  }, [updateBrand]);

  const setCompanyLogo = useCallback((logoUrl) => {
    updateBrand({ companyLogo: logoUrl });
  }, [updateBrand]);

  const setCompanyName = useCallback((name) => {
    updateBrand({ companyName: name });
  }, [updateBrand]);

  const setThemeMode = useCallback((mode) => {
    updateBrand({ themeMode: mode });
  }, [updateBrand]);

  // Listen for storage changes across tabs or window events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e) => {
      if (e.key === BRAND_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setBrand((prev) => ({ ...prev, ...parsed }));
        } catch (err) {
          console.warn('Storage sync parse error:', err);
        }
      }
    };

    const handleCustomEvent = (e) => {
      if (e.detail) {
        setBrand((prev) => ({ ...prev, ...e.detail }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('traceu_brand_updated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('traceu_brand_updated', handleCustomEvent);
    };
  }, []);

  return (
    <BrandContext.Provider
      value={{
        ...brand,
        updateBrand,
        resetBrand,
        setPrimaryColor,
        setCompanyLogo,
        setCompanyName,
        setThemeMode
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

BrandProvider.propTypes = {
  children: PropTypes.node
};

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    return {
      ...DEFAULT_BRAND,
      updateBrand: () => {},
      resetBrand: () => {},
      setPrimaryColor: () => {},
      setCompanyLogo: () => {},
      setCompanyName: () => {},
      setThemeMode: () => {}
    };
  }
  return context;
}

export default BrandContext;

