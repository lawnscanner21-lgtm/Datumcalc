/**
 * Global Constants
 * Centralized configuration for the application.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://datums-rechner.com';
export const DOMAIN = new URL(SITE_URL).hostname;
export const SITE_NAME = 'Datumsrechner';
