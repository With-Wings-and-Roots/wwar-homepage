import { notFound } from 'next/navigation';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

import StoriesTemplate from '@/components/templates/StoriesTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

import { getAllPages, getPage } from '@/utilities/pages';

import { getAllStories } from '@/utilities/stories';

import { getTimeline } from '@/utilities/timeline';

import { getAllPosts } from '@/utilities/posts';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

/**
 * 🔥 FULLY DYNAMIC CATCH-ALL ROUTE
 * /[lang]/[slug]/[...slug]
 */
const Page = async ({ params }) => {
  const { lang, slug } = params;
  console.log('Params:', params);

  const deepSlugs = Array.isArray(params.deepSlug)
    ? params.deepSlug
    : [params.deepSlug];

  /**
   * ----------------------------------------------------
   * STEP 1: GET BASE PAGE (FIRST SLUG)
   * ----------------------------------------------------
   */
  const pages = await getAllPages(lang);

  const baseSlug = slug;
  console.log('baseSlug:', baseSlug);

  const pageObj = pages.find((page) => {
    const url = new URL(page.link);

    const pageSlug = url.pathname
      .replace(/^\/|\/$/g, '')
      .replace(/^(de\/|en\/)/, '')
      .split('/')
      .filter(Boolean)
      .pop();

    return pageSlug === baseSlug;
  });

  if (!pageObj) return notFound();

  const pageData = await getPage(lang, pageObj.id);

  const lastSlug = deepSlugs[deepSlugs.length - 1];

  let template;

  /**
   * ----------------------------------------------------
   * STEP 2: SWITCH BASED ON TEMPLATE
   * ----------------------------------------------------
   */
  switch (pageObj.template) {
    /**
     * STORIES
     */
    case 'page_stories.php': {
      const stories = await getAllStories(lang);

      const story = stories.find((s) => s.slug === lastSlug);

      if (!story) return notFound();

      template = <StoriesTemplate data={story} mode='single' />;
      break;
    }

    /**
     * TIMELINES
     */
    case 'page_timelines.php': {
      const events = await getTimeline('de', lang);

      const event = events.find((e) => e.slug === lastSlug);

      if (!event) return notFound();

      template = <TimelinesTemplate data={event} mode='single' />;
      break;
    }

    /**
     * BLOG
     */
    case 'page_blog.php': {
      const posts = await getAllPosts(lang, 'posts');

      const post = posts.find((p) => p.slug === lastSlug);

      if (!post) return notFound();

      template = <BlogTemplate data={post} mode='single' />;
      break;
    }

    /**
     * DEFAULT CMS PAGE (no deep content)
     */
    default: {
      template = <DefaultTemplate data={pageData} />;
      break;
    }
  }

  return (
    <>
      <Header lang={lang} />
      {template}
      <Footer lang={lang} />
    </>
  );
};

export default Page;
