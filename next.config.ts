import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // English SEO Fallbacks
      { source: '/en/add/:slug*', destination: '/addieren', permanent: true },
      { source: '/en/difference/:slug*', destination: '/differenz', permanent: true },
      { source: '/en/business/:slug*', destination: '/arbeitstage', permanent: true },
      { source: '/en/age/:slug*', destination: '/alter', permanent: true },
      { source: '/en/guide/:slug*', destination: '/ratgeber', permanent: true },
      { source: '/en/:path*', destination: '/', permanent: true },

      // Spanish SEO Fallbacks
      { source: '/es/sumar/:slug*', destination: '/addieren', permanent: true },
      { source: '/es/diferencia/:slug*', destination: '/differenz', permanent: true },
      { source: '/es/laborables/:slug*', destination: '/arbeitstage', permanent: true },
      { source: '/es/edad/:slug*', destination: '/alter', permanent: true },
      { source: '/es/guia/:slug*', destination: '/ratgeber', permanent: true },
      { source: '/es/:path*', destination: '/', permanent: true },

      // French SEO Fallbacks
      { source: '/fr/ajouter/:slug*', destination: '/addieren', permanent: true },
      { source: '/fr/difference/:slug*', destination: '/differenz', permanent: true },
      { source: '/fr/ouvrables/:slug*', destination: '/arbeitstage', permanent: true },
      { source: '/fr/age/:slug*', destination: '/alter', permanent: true },
      { source: '/fr/guide/:slug*', destination: '/ratgeber', permanent: true },
      { source: '/fr/:path*', destination: '/', permanent: true },

      // Italian SEO Fallbacks
      { source: '/it/aggiungere/:slug*', destination: '/addieren', permanent: true },
      { source: '/it/differenza/:slug*', destination: '/differenz', permanent: true },
      { source: '/it/lavorativi/:slug*', destination: '/arbeitstage', permanent: true },
      { source: '/it/eta/:slug*', destination: '/alter', permanent: true },
      { source: '/it/guida/:slug*', destination: '/ratgeber', permanent: true },
      { source: '/it/:path*', destination: '/', permanent: true },

      // Portuguese SEO Fallbacks
      { source: '/pt/adicionar/:slug*', destination: '/addieren', permanent: true },
      { source: '/pt/diferenca/:slug*', destination: '/differenz', permanent: true },
      { source: '/pt/uteis/:slug*', destination: '/arbeitstage', permanent: true },
      { source: '/pt/idade/:slug*', destination: '/alter', permanent: true },
      { source: '/pt/guia/:slug*', destination: '/ratgeber', permanent: true },
      { source: '/pt/:path*', destination: '/', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

