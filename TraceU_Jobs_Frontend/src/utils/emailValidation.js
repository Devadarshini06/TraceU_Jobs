const COMMON_TLD_TYPOS = new Set(['cmo', 'con', 'ocm', 'comm', 'xom', 'vom', 'coom', 'ney', 'ogr']);
const COMMON_DOMAIN_TYPOS = {
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'hotmal.com': 'hotmail.com'
};

export function validateEmail(rawEmail) {
  const email = String(rawEmail || '').trim().toLowerCase();
  if (!email) {
    return 'Email Address is required';
  }

  const basicRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!basicRegex.test(email)) {
    return 'Enter a valid email address (e.g. name@example.com)';
  }

  const [, domain] = email.split('@');
  if (!domain || domain.includes('..')) {
    return 'Enter a valid email domain';
  }

  if (COMMON_DOMAIN_TYPOS[domain]) {
    return `Invalid email domain "${domain}". Did you mean "${COMMON_DOMAIN_TYPOS[domain]}"?`;
  }

  const parts = domain.split('.');
  const tld = parts[parts.length - 1];
  if (COMMON_TLD_TYPOS.has(tld)) {
    return `Invalid email TLD ".${tld}". Please check for typos (e.g. .com)`;
  }

  return '';
}

