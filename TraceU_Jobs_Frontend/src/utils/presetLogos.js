// Predefined High-Quality Enterprise SVG Logos for Quick Testing & Selection

export const PRESET_LOGOS = [
  {
    id: 'traceu',
    name: 'TraceU (Default)',
    primaryColor: '#530EF0',
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
        <defs>
          <linearGradient id="tu-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6929e2" />
            <stop offset="100%" stop-color="#4f1db5" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#tu-grad)" />
        <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="'Inter', -apple-system, sans-serif" font-weight="800" font-size="20">TU</text>
      </svg>`
    )}`
  },
  {
    id: 'acme',
    name: 'Acme Corp',
    primaryColor: '#2563EB',
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
        <defs>
          <linearGradient id="acme-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3B82F6" />
            <stop offset="100%" stop-color="#1D4ED8" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#acme-grad)" />
        <polygon points="24,11 37,18 37,32 24,39 11,32 11,18" fill="none" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" />
        <circle cx="24" cy="25" r="4" fill="#ffffff" />
      </svg>`
    )}`
  },
  {
    id: 'nexa',
    name: 'Nexa Systems',
    primaryColor: '#059669',
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
        <defs>
          <linearGradient id="nexa-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10B981" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#nexa-grad)" />
        <path d="M15 34 L15 14 L24 26 L33 14 L33 34" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`
    )}`
  },
  {
    id: 'apex',
    name: 'Apex Innovations',
    primaryColor: '#E11D48',
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
        <defs>
          <linearGradient id="apex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F43F5E" />
            <stop offset="100%" stop-color="#BE123C" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#apex-grad)" />
        <polygon points="24,12 36,34 12,34" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round" />
        <circle cx="24" cy="27" r="3" fill="#ffffff" />
      </svg>`
    )}`
  },
  {
    id: 'vortex',
    name: 'Vortex AI',
    primaryColor: '#0F172A',
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
        <defs>
          <linearGradient id="vortex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="100%" stop-color="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#vortex-grad)" />
        <circle cx="24" cy="24" r="13" fill="none" stroke="#60A5FA" stroke-width="2.5" stroke-dasharray="8 4" />
        <circle cx="24" cy="24" r="6" fill="#38BDF8" />
      </svg>`
    )}`
  }
];

