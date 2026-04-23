export const COOKIE_CONSENT_NAME = 'hg_cookie_consent';

export const COOKIE_CONSENT_VALUES = ['accepted', 'rejected'] as const;

export type CookieConsentValue = (typeof COOKIE_CONSENT_VALUES)[number];

export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export function isCookieConsentValue(value: string | undefined | null): value is CookieConsentValue {
  return value === 'accepted' || value === 'rejected';
}
