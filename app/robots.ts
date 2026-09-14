import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.rijanregmi.com.np';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all bots to crawl the full site
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/temp/',
        ],
      },
      // Google: explicitly allow all image assets for Google Image Search
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/assets/imgs/',
          '/assets/webiste/',
          '/assets/blog/',
          '/assets/brand/',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/temp/',
        ],
      },
      // Googlebot-Image: allow all public image assets
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/assets/',
        ],
      },
      // Bingbot
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/temp/',
        ],
      },
      // Bingbot image crawler
      {
        userAgent: 'Bingbot-Image',
        allow: [
          '/assets/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
