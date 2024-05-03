import i18nConfig from '@/i18n.config';
import { getArticlesForSitemap, getAuthorsForSitemap } from '@/lib/sanity';
import { readdirSync } from 'fs';
import { MetadataRoute } from 'next';

const baseUrl = 'https://anonypro.com';
const locales = i18nConfig.locales;
const brandNames = [
  'fastdl',
  'igram',
  'igviewer',
  'imginn',
  'indown',
  'insacret',
  'instafinsta',
  'instanavigation',
  'instastalker',
  'instastories',
  'instavideosave',
  'instaviewer',
  'itsanony',
  'mollygram',
  'picuki',
  'saveinsta',
  'snapinsta',
  'sssinstagram',
  'storiesdown',
  'storiesig',
  'storysaver',
  'storysnooper',
  'toolzu',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: any[] = (await getArticlesForSitemap()) ?? [];

  if (articles && articles[0]) {
    articles = articles.map((article) => ({
      url: `${article.category}/${article.slug}`,
      lastModified: new Date(article.datePosted).toISOString().split('T')[0],
    }));
  }

  let authors: any[] = (await getAuthorsForSitemap()) ?? [];

  if (authors && authors[0]) {
    authors = authors.map((author) => ({
      url: `author/${author.slug}`,
      lastModified: new Date(author._updatedAt).toISOString().split('T')[0],
    }));
  }

  const brands = brandNames.map((brand) => ({
    url: brand,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const routes = [
    '',
    'about-us',
    'blog',
    'policies',
    'support',
    'terms-of-service',
    'instagram-highlight-viewer',
    'instagram-reels-video-downloader',
    'instagram-story-download',
  ].map((route) => ({
    url: `${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const routesWithLocale = locales
    .map((locale) =>
      [...routes, ...brands, ...articles, ...authors].map((route) => ({
        url: `${baseUrl}/${locale}/${route.url}`,
        lastModified: route.lastModified,
      }))
    )
    .flat();

  return routesWithLocale;
}
