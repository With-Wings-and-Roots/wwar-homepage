import { notFound } from 'next/navigation';

import StoriesTemplate from '@/components/templates/StoriesTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';
import DefaultTemplate from '@/components/templates/DefaultTemplate';

import { getFrontpageId, getPage, getPageBySlug } from '@/utilities/pages';
import { getTimelineEvent } from '@/utilities/timeline';

import HomeTemplate from '@/components/templates/HomeTemplate';
import TeamsTemplate from '@/components/templates/TeamsTemplate';
import { getStoryBySlug } from '@/utilities/stories';
import { getPostBySlug } from '@/utilities/posts';

export const dynamicParams = true;

const Page = async ({ params }) => {
  const { lang, slug } = params;

  const deepSlugs = Array.isArray(params.deepSlug)
    ? params.deepSlug
    : [params.deepSlug];
  if (deepSlugs.length > 1) return notFound();
  const baseSlug = slug;
  let pageData;

  if (baseSlug === 'story') {
    const frontpageId = await getFrontpageId(lang);

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
      const post = await getPostBySlug(params.lang, lastSlug, 'posts');
      if (!post) return notFound();
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
      notFound();
      break;
    }
  }

  return template;
};

export default Page;
