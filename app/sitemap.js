import { getAllPages } from '@/utilities/pages';
import { getTimelineSlugsWithCountry } from '@/utilities/timeline';
import { getAllPostSlugs } from '@/utilities/posts';

const BASE_URL = process.env.PUBLIC_URL;

export default async function sitemap() {
  const languages = ['en', 'de', 'ed'];

  let urls = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  let STORIES_SLUG;

  for (const lang of languages) {
    // Add language root pages
    urls.push({
      url: `${BASE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    if (lang === 'de') {
      STORIES_SLUG = 'geschichten';
    } else {
      STORIES_SLUG = 'stories';
    }

    const pages = await getAllPages(lang);
    const stories = await getAllPostSlugs(lang, 'story');
    const films = await getAllPostSlugs(lang,'film');
    const timelines = await getTimelineSlugsWithCountry(lang);
    const blogs = await getAllPostSlugs(lang, 'posts');

    const pageUrls = pages
      .filter((page) => page?.slug)
      .map((page) => ({
        url: `${BASE_URL}/${lang}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

    const storiesUrls = stories
      .filter(Boolean)
      .map((story) => ({
        url: `${BASE_URL}/${lang}/${STORIES_SLUG}/${story}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

    const filmsUrls = films
      .filter((film) => film)
      .map((film) => ({
        url: `${BASE_URL}/${lang}/films/${film}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

    const timelinesUrls = timelines
      .filter((timeline) => timeline?.slug)
      .map((timeline) => ({
        url: `${BASE_URL}/${lang}/timelines/${timeline.countrySlug}/${timeline.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

    const blogUrls = blogs
      .filter(Boolean)
      .map((blog) => ({
        url: `${BASE_URL}/${lang}/blog/${blog}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

    urls.push(
      ...pageUrls,
      ...storiesUrls,
      ...filmsUrls,
      ...timelinesUrls,
      ...blogUrls
    );
  }

  return urls;
}