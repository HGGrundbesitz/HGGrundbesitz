const SUPPORTED_LOCALES = ['de', 'en', 'ar'] as const;

export function getLocaleFromPathname(pathname: string) {
  const match = pathname.match(/^\/(de|en|ar)(?=\/|$)/);
  const locale = match?.[1];

  return SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number]) ? locale : 'de';
}

export function getHomePath(pathname: string) {
  return `/${getLocaleFromPathname(pathname)}`;
}

export function isHomePathname(pathname: string) {
  const homePath = getHomePath(pathname);

  return pathname === homePath || pathname === `${homePath}/`;
}

export function getSectionHref(pathname: string, hash: string) {
  return isHomePathname(pathname) ? hash : `${getHomePath(pathname)}${hash}`;
}
