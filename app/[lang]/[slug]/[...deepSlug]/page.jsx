import { notFound } from 'next/navigation';

import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

import StoriesTemplate from '@/components/templates/StoriesTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

import {
  getAllPages,
  getFrontpageId,
  getPage,
  getPageBySlug,
} from '@/utilities/pages';

import { getAllStories, getStoryBySlug } from '@/utilities/stories';

import { getTimeline, getTimelineEvent } from '@/utilities/timeline';

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
    pageData = await getPageBySlug(lang, slug);
    if (!pageData) return notFound();
  }
  const lastSlug = deepSlugs[deepSlugs.length - 1];

  let template;

  /**
   * ----------------------------------------------------
   * STEP 2: SWITCH BASED ON TEMPLATE
   * ----------------------------------------------------
   */
  switch (pageData.template) {
    /**
     * STORIES
     */
    case 'page_stories.php': {
      const story = await getStoryBySlug(lastSlug, params.lang);

      if (!story) return notFound();

      template = <StoriesTemplate data={pageData} params={params} />;
      break;
    }

    /**
     * TIMELINES
     */
    case 'page_timelines.php': {
      const event = await getTimelineEvent(lastSlug, params.lang);

      if (!event) return notFound();
      template = <TimelinesTemplate data={pageData} params={params} />;
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
