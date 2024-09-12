import { getAllPages, getFrontpageId, getPage } from '@/utilities/pages';
import { notFound } from 'next/navigation';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import DefaultTemplate from '@/components/templates/DefaultTemplate';
import StoriesTemplate from '@/components/templates/StoriesTemplate';
import AboutTemplate from '@/components/templates/AboutTemplate';
import CollaboratorsTemplate from '@/components/templates/CollaboratorsTemplate';
import EventsTemplate from '@/components/templates/EventsTemplate';
import WorkshopsTemplate from '@/components/templates/WorkshopsTemplate';
import TakePartTemplate from '@/components/templates/TakePartTemplate';
import DonateTemplate from '@/components/templates/DonateTemplate';
import MaterialsTemplate from '@/components/templates/MaterialsTemplate';
import ProjectsTemplate from '@/components/templates/ProjectsTemplate';
import HomeTemplate from '@/components/templates/HomeTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import {
  fetchAllTopics,
  getAllMedia,
  getAllPersons,
  getAllStories,
} from '@/utilities/stories';
import {
  getTimeline,
  getTimelineEvents,
  getTimelineTopics,
} from '@/utilities/timeline';
import { getPageSettings } from '@/utilities/pageSettings';
import { GoogleAnalytics } from '@next/third-parties/google';
import PartnersTemplate from '@/components/templates/PartnersTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';
import { getAllPosts } from '@/utilities/posts';

const Page = async ({ params }) => {
  const pageSettings = await getPageSettings(params.lang);
  const pages = await getAllPages(params.lang);

  // find page by slugs
  let pageSlugs = [...(params.slugs ?? [])];
  let pageSlug = '';
  let subSlugs = [];
  let pageObj;
  if (pageSlugs.length > 0) {
    while (pageSlugs.length > 0) {
      pageObj = pages.find((page) => {
        const url = new URL(page.link);
        const urlPageSlug = url
          .toString()
          .substring(url.origin.length)
          .replace(/^\/|\/$/g, '')
          .replace(/^(de\/|en\/)/, '');
        return urlPageSlug === pageSlugs?.join('/');
      });
      if (pageObj) {
        pageSlug = pageObj.link;
        break;
      }
      subSlugs = [...subSlugs, pageSlugs.pop()];
    }
    if (!pageObj) {
      const frontpageId = await getFrontpageId(params.lang);
      pageObj = pages.find((page) => page.id === parseInt(frontpageId));
      subSlugs = [...(params.slugs ?? [])];
    }
  } else {
    const frontpageId = await getFrontpageId(params.lang);
    pageObj = pages.find((page) => page.id === parseInt(frontpageId));
  }

  let stories, allMediaDe, allMediaEn, allPersons, topics, allMedia, timeLineEventsDe, timeLineEventsEn, timelineTopics;

  // get page
  let template;
  if (pageObj) {
    const pageData = await getPage(params.lang, pageObj.id);
    switch (pageObj.template) {
      case 'page_stories.php':
        [stories, allMediaDe, allMediaEn, allPersons, topics] =
          await Promise.all([
            getAllStories(params.lang),
            getAllMedia('de'),
            getAllMedia('en'),
            getAllPersons(),
            fetchAllTopics(params.lang),
          ]);
        allMedia = [...allMediaDe, ...allMediaEn];
        template = (
          <StoriesTemplate
            data={pageData}
            params={params}
            subSlugs={subSlugs}
            baseLink={pageSlug}
            stories={stories}
            allMedia={allMedia}
            allPersons={allPersons}
            topics={topics}
          />
        );
        break;
      case 'page_timelines.php':
        [timeLineEventsDe, timeLineEventsEn, timelineTopics, allMediaDe, allMediaEn, stories, allPersons] =
          await Promise.all([
            getTimeline('de', params.lang),
            getTimeline('us', params.lang),
            getTimelineTopics(params.lang),
            getAllMedia('de'),
            getAllMedia('en'),
            getAllStories(params.lang),
            getAllPersons(),
          ]);
        allMedia = [...allMediaDe, ...allMediaEn];
        template = (
          <TimelinesTemplate
            data={pageData}
            params={params}
            subSlugs={subSlugs}
            baseLink={pageSlug}
            timeLineEventsDe={timeLineEventsDe}
            timeLineEventsEn={timeLineEventsEn}
            allMedia={allMedia}
            timelineTopics={timelineTopics}
            stories={stories}
            allPersons={allPersons}
          />
        );
        break;
      case 'page_about.php':
        template = <AboutTemplate data={pageData} />;
        break;
      case 'page_blog.php':
        [stories, allPersons] =
          await Promise.all([
            getAllStories(params.lang),
            getAllPersons(),
          ]);
        template = (
          <BlogTemplate
            data={pageData}
            params={params}
            stories={stories}
            allPersons={allPersons}
          />
        );
        break;
      case 'page_collaborators.php':
        template = <CollaboratorsTemplate data={pageData} subSlugs={subSlugs} baseLink={pageSlug} />;
        break;
      case 'page_partners.php':
        template = <PartnersTemplate data={pageData} />;
        break;
      case 'page_events.php':
        template = <EventsTemplate data={pageData} params={params} />;
        break;
      case 'page_workshops.php':
        template = <WorkshopsTemplate data={pageData} />;
        break;
      case 'page_takePart.php':
        template = <TakePartTemplate data={pageData} />;
        break;
      case 'page_donate.php':
        template = <DonateTemplate data={pageData} />;
        break;
      case 'page_materials.php':
        template = <MaterialsTemplate data={pageData} />;
        break;
      case 'page_projects.php':
        template = <ProjectsTemplate data={pageData} />;
        break;
      case 'page_home.php':
        template = (
          <HomeTemplate data={pageData} params={params} subSlugs={subSlugs} />
        );
        break;
      default:
        template = <DefaultTemplate data={pageData} />;
        break;
    }
  } else {
    return notFound();
  }

  return (
    <>
      {pageSettings?.google_analytics_id &&
      pageSettings?.google_analytics_id?.length > 0 ? (
        <GoogleAnalytics gaId={pageSettings.google_analytics_id} />
      ) : null}
      <Header lang={params.lang} />
      {template}
      <Footer lang={params.lang} />
    </>
  );
};

export async function generateStaticParams() {
  let paths = [];
  const languages = ['en', 'de'];

  for (const lang of languages) {
    const pages = await getAllPages(lang);
    const stories = await getAllStories(lang);
    const timelineEvents = await getTimelineEvents(lang);
    const posts = await getAllPosts(lang, 'posts');

    for (const page of pages) {
      const url = new URL(page.link);
      let urlPageSlug = url.pathname
        .replace(/^\/|\/$/g, '')
        .replace(/^(de\/|en\/)/, '');

      if (urlPageSlug === 'de') {
        urlPageSlug = '';
      }

      const baseSlugs = urlPageSlug.split('/').filter(Boolean);

      // Add the base page path
      paths.push({ lang, slugs: baseSlugs });

      // Conditionally add paths for stories, timeline events, and posts
      if (page.template === 'page_stories.php') {
        stories.forEach((story) => {
          paths.push({
            lang,
            slugs: [...baseSlugs, story.slug],
          });
        });
      }

      if (page.template === 'page_timelines.php') {
        timelineEvents.forEach((event) => {
          paths.push({ lang, slugs: [...baseSlugs, event.slug] });
        });
      }

      if (page.template === 'page_blog.php') {
        posts.forEach((post) => {
          paths.push({
            lang,
            slugs: [...baseSlugs, post.slug],
          });
        });
      }
    }
  }

  return paths;
}

export async function generateMetadata({ params }) {
  const pages = await getAllPages(params.lang);

  // find page by slugs
  let pageSlugs = [...(params.slugs ?? [])];
  let pageSlug = '';
  let subSlugs = [];
  let pageObj;
  let pageData;
  if (pageSlugs.length > 0) {
    while (pageSlugs.length > 0) {
      pageObj = pages.find((page) => {
        const url = new URL(page.link);
        const urlPageSlug = url
          .toString()
          .substring(url.origin.length)
          .replace(/^\/|\/$/g, '')
          .replace(/^(de\/|en\/)/, '');
        return urlPageSlug === pageSlugs?.join('/');
      });
      if (pageObj) {
        pageSlug = pageObj.link;
        break;
      }
      subSlugs = [...subSlugs, pageSlugs.pop()];
    }
    if (!pageObj) {
      const frontpageId = await getFrontpageId(params.lang);
      pageObj = pages.find((page) => page.id === parseInt(frontpageId));
    }
  } else {
    const frontpageId = await getFrontpageId(params.lang);
    pageObj = pages.find((page) => page.id === parseInt(frontpageId));
  }

  // get page
  if (pageObj) {
    pageData = await getPage(params.lang, pageObj.id);
    const seoData = pageData.seo;

    return {
      metadataBase: process.env.PUBLIC_URL,
      description: seoData?._genesis_description,
      openGraph: {
        title: seoData?._open_graph_title,
        description: seoData?._open_graph_description,
        images:
          seoData?._social_image_url !== ''
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_CMS_URL}${seoData?._social_image_url}`,
                },
              ]
            : [],
      },
      twitter: {
        title: seoData?._twitter_title,
        description: seoData?._twitter_description,
        images:
          seoData?._social_image_url !== ''
            ? [`${process.env.NEXT_PUBLIC_CMS_URL}${seoData?._social_image_url}`]
            : [],
      },
    };
  }
}

export default Page;
