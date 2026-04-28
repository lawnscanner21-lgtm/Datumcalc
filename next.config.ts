import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect /de/* -> /* (default locale should not have a prefix)
      { source: '/de', destination: '/', permanent: true },
      { source: '/de/:path*', destination: '/:path*', permanent: true },

      // Stale German calculator routes served under wrong locale prefixes
      { source: '/en/addieren/:slug*', destination: '/en/add/:slug*', permanent: true },
      { source: '/en/differenz/:slug*', destination: '/en/difference/:slug*', permanent: true },
      { source: '/en/arbeitstage/:slug*', destination: '/en/business/:slug*', permanent: true },
      { source: '/en/alter/:slug*', destination: '/en/age/:slug*', permanent: true },
      { source: '/en/ratgeber/:slug*', destination: '/en/guide/:slug*', permanent: true },

      { source: '/es/addieren/:slug*', destination: '/es/sumar/:slug*', permanent: true },
      { source: '/es/differenz/:slug*', destination: '/es/diferencia/:slug*', permanent: true },
      { source: '/es/arbeitstage/:slug*', destination: '/es/laborables/:slug*', permanent: true },
      { source: '/es/alter/:slug*', destination: '/es/edad/:slug*', permanent: true },
      { source: '/es/ratgeber/:slug*', destination: '/es/guia/:slug*', permanent: true },

      { source: '/fr/addieren/:slug*', destination: '/fr/ajouter/:slug*', permanent: true },
      { source: '/fr/differenz/:slug*', destination: '/fr/difference/:slug*', permanent: true },
      { source: '/fr/arbeitstage/:slug*', destination: '/fr/ouvrables/:slug*', permanent: true },
      { source: '/fr/alter/:slug*', destination: '/fr/age/:slug*', permanent: true },
      { source: '/fr/ratgeber/:slug*', destination: '/fr/guide/:slug*', permanent: true },

      { source: '/it/addieren/:slug*', destination: '/it/aggiungere/:slug*', permanent: true },
      { source: '/it/differenz/:slug*', destination: '/it/differenza/:slug*', permanent: true },
      { source: '/it/arbeitstage/:slug*', destination: '/it/lavorativi/:slug*', permanent: true },
      { source: '/it/alter/:slug*', destination: '/it/eta/:slug*', permanent: true },
      { source: '/it/ratgeber/:slug*', destination: '/it/guida/:slug*', permanent: true },

      { source: '/pt/addieren/:slug*', destination: '/pt/adicionar/:slug*', permanent: true },
      { source: '/pt/differenz/:slug*', destination: '/pt/diferenca/:slug*', permanent: true },
      { source: '/pt/arbeitstage/:slug*', destination: '/pt/uteis/:slug*', permanent: true },
      { source: '/pt/alter/:slug*', destination: '/pt/idade/:slug*', permanent: true },
      { source: '/pt/ratgeber/:slug*', destination: '/pt/guia/:slug*', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

