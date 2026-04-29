import { notFound } from 'next/navigation';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

import StoriesTemplate from '@/components/templates/StoriesTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

import { getAllPages, getFrontpageId, getPage } from '@/utilities/pages';

import { getAllStories } from '@/utilities/stories';

import { getTimeline } from '@/utilities/timeline';

import { getAllPosts } from '@/utilities/posts';
import HomeTemplate from '@/components/templates/HomeTemplate';
import TeamsTemplate from '@/components/templates/TeamsTemplate';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

const Page = async ({ params }) => {
  const { lang, slug } = params;

  const deepSlugs = Array.isArray(params.deepSlug)
    ? params.deepSlug
    : [params.deepSlug];
  const baseSlug = slug;
  let pageObj;
  let pageData;

  if (baseSlug === 'story') {
    const frontpageId = await getFrontpageId(lang);

    pageObj = { template: 'page_home.php' }; // 👈 FAKE TEMPLATE
    pageData = await getPage(lang, frontpageId);
  } else {
    const pages = await getAllPages(lang);

    pageObj = pages.find((page) => {
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

    pageData = await getPage(lang, pageObj.id);
  }
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
      template = <BlogTemplate data={pageData} params={params} />;
      break;
    }
    case 'page_home.php': {
      template = (
        <HomeTemplate
          data={pageData}
          params={params}
          subSlug={deepSlugs?.[0]}
        />
      );
      break;
    }
    case 'page_collaborators.php': {
      template = <TeamsTemplate data={pageData} params={params} />;
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
