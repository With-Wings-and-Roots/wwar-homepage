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
import OurWorkTemplate from '@/components/templates/OurWorkTemplate';

const Page = async ({ params }) => {
  const pageSettings = await getPageSettings(params.lang);

  const pages = await getAllPages(params.lang);

  // find page by slugs
  let pageSlugs = [...(params.slugs ?? [])];
  console.log('pageSlugs:', pageSlugs);
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
          .replace(/^(de\/|en\/|ed\/)/, '');
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

  let stories,
    allMediaDe,
    allMediaEd,
    allMediaEn,
    allPersons,
    topics,
    allMedia,
    timeLineEventsDe,
    timeLineEventsEn,
    timelineTopics;

  // get page
  let template;
  if (pageObj) {
    const pageData = await getPage(params.lang, pageObj.id);
    console.log('tem', pageObj.template);
    switch (pageObj.template) {
      case 'page_stories.php':
        [
          stories,
          allMediaDe,
          allMediaEd,
          allMediaEn,
          allPersons,
          topics,
          timeLineEventsDe,
          timeLineEventsEn,
        ] = await Promise.all([
          getAllStories(params.lang),
          getAllMedia('de'),
          getAllMedia('ed'),
          getAllMedia('en'),
          getAllPersons(),
          fetchAllTopics(params.lang),
          getTimeline('de', params.lang),
          getTimeline('us', params.lang),
        ]);
        allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];
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
            timeLineEventsDe={timeLineEventsDe}
            timeLineEventsEn={timeLineEventsEn}
          />
        );
        break;
      case 'page_timelines.php':
        [
          timeLineEventsDe,
          timeLineEventsEn,
          timelineTopics,
          allMediaDe,
          allMediaEd,
          allMediaEn,
          stories,
          allPersons,
        ] = await Promise.all([
          getTimeline('de', params.lang),
          getTimeline('us', params.lang),
          getTimelineTopics(params.lang),
          getAllMedia('de'),
          getAllMedia('ed'),
          getAllMedia('en'),
          getAllStories(params.lang),
          getAllPersons(),
        ]);
        allMedia = [...allMediaDe, ...allMediaEn, ...allMediaEd];
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
        [stories, allPersons] = await Promise.all([
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
        const partnerPageObj = pages.find((page) => {
          const url = new URL(page.link);
          const urlPageSlug = url
            .toString()
            .substring(url.origin.length)
            .replace(/^\/|\/$/g, '')
            .replace(/^(de\/|en\/|ed\/)/, '');
          return urlPageSlug === 'partner' || urlPageSlug === 'partners';
        });
        const partnerPageData = await getPage(params.lang, partnerPageObj.id);

        template = (
          <>
            <CollaboratorsTemplate
              data={pageData}
              subSlugs={subSlugs}
              baseLink={pageSlug}
            />
            <PartnersTemplate data={partnerPageData} />
          </>
        );
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
        switch (pageObj.slug) {
          case 'our-work':
            template = <OurWorkTemplate data={pageData} />;
            break;
          default:
            template = <DefaultTemplate data={pageData} />;
        }
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
  const languages = ['en', 'de', 'ed'];

  for (const lang of languages) {
    const pages = await getAllPages(lang);
    const stories = await getAllStories(lang);
    const timelineEvents = await getTimelineEvents(lang);
    const posts = await getAllPosts(lang, 'posts');

    for (const page of pages) {
      const url = new URL(page.link);
      let urlPageSlug = url.pathname
        .replace(/^\/|\/$/g, '')
        .replace(/^(de\/|en\/|ed\/)/, '');

      if (urlPageSlug === 'de' || urlPageSlug === 'ed') {
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
        paths.push({ lang, slugs: [...baseSlugs, 'info'] });
      }

      if (page.template === 'page_blog.php') {
        posts.forEach((post) => {
          paths.push({
            lang,
            slugs: [...baseSlugs, post.slug],
          });
        });
      }

      if (page.template === 'page_collaborators.php') {
        page.acf?.team?.forEach((member) => {
          const teamMemberSlug = member?.name?.replace(/ /g, '-');
          paths.push({
            lang,
            slugs: [...baseSlugs, teamMemberSlug],
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
          .replace(/^(de\/|en\/|ed\/)/, '');
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
    let seoData;

    //Check if its timeline or story, because these pages are not handled by get all pages func
    const isTimelineEvent =
      pageObj?.template === 'page_timelines.php' && params.slugs?.length > 1;
    const isStory =
      pageObj?.template === 'page_stories.php' && params.slugs?.length > 1;

    if (isTimelineEvent) {
      const allEvents = await getTimelineEvents(params.lang);
      const timelineEvent = allEvents.find((e) => e.slug === params.slugs[1]);
      seoData = timelineEvent?.seo;
    } else if (isStory) {
      const allStories = await getAllStories(params.lang);
      const story = allStories.find((e) => e.slug === params.slugs[1]);
      seoData = story?.seo;
    } else {
      pageData = await getPage(params.lang, pageObj.id);
      seoData = pageData.seo;
    }

    return {
      metadataBase: process.env.PUBLIC_URL,
      description: seoData?._genesis_description,
      openGraph: {
        title: seoData?._open_graph_title,
        description: seoData?._open_graph_description,
        images: [
          {
            url: seoData._social_image_url,
          },
        ],
      },
      twitter: {
        title: seoData?._twitter_title,
        description: seoData?._twitter_description,
        images: [
          {
            url: seoData._social_image_url,
          },
        ],
      },
    };
  }
}

export default Page;
