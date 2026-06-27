import { notFound } from 'next/navigation';

import StoriesTemplate from '@/components/templates/StoriesTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';
import AllProjectsTemplate from '@/components/templates/AllProjectsTemplate';
import ProjectTemplate from '@/components/templates/ProjectTemplate';
import { getFrontpageId, getPage, getPageBySlug } from '@/utilities/pages';
import {
  getTimelineCountries,
  getTimelineCountryBySlug,
  getTimelineEvent,
} from '@/utilities/timeline';

import HomeTemplate from '@/components/templates/HomeTemplate';
import TeamsTemplate from '@/components/templates/TeamsTemplate';
import { getStoryBySlug } from '@/utilities/stories';
import { getPostBySlug } from '@/utilities/posts';
import { getTeamMemberById, getTeamMemberBySlug } from '@/utilities/team';
import SingleFilmTemplate from '@/components/templates/SingleFilmTemplate';
import { getFilmBySlug } from '@/utilities/films';
import TimelineLandingTemplate from '@/components/templates/TimelineLandingTemplate';

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
      if (lastSlug === 'info') {
        template = <TimelineLandingTemplate data={pageData} params={params} />;
      } else {
        const country = await getTimelineCountryBySlug(lastSlug, params.lang);

        if (!country) return notFound();

        template = <TimelinesTemplate data={pageData} params={params} />;
      }
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
      const teamMember = await getTeamMemberBySlug(lastSlug, params.lang);
      if (!teamMember) return notFound();
      template = <TeamsTemplate data={pageData} params={params} />;
      break;
    }
    case 'page_films.php': {
      const film = await getFilmBySlug(lastSlug, params.lang);
      if (lastSlug && !film) return notFound();
      template = (
        <SingleFilmTemplate data={pageData} params={params} film={film} />
      );
      break;
    }
    case 'page_projects.php': {
      template = <AllProjectsTemplate data={pageData} subSlugs={deepSlugs} lang={lang} />;
      break;
    }
    case 'page_project.php':
        template = <ProjectTemplate subSlugs={deepSlugs} lang={params.lang} />;
        break;
    default: {
      notFound();
    }
  }

  return template;
};

export default Page;
