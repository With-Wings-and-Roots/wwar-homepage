import {
  resolveUri,
  getPageListMinimal,
  getPage,
  getPageAcf,
} from '@/utilities/pages';
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
import { createLocalLink } from '@/utilities/links';

function buildBaseLink(lang, baseSlugs) {
  const path = baseSlugs.length ? `/${lang}/${baseSlugs.join('/')}/` : `/${lang}`;
  return createLocalLink(path);
}

function getUrlPageSlug(page, langPrefix = /^(de\/|en\/|ed\/)/) {
  const url = new URL(page.link);
  return url
    .toString()
    .substring(url.origin.length)
    .replace(/^\/|\/$/g, '')
    .replace(langPrefix, '');
}

const Page = async ({ params }) => {
  const pageSettings = await getPageSettings(params.lang);
  const slugs = params.slugs ?? [];
  const uri = slugs.join('/');
  const resolved = await resolveUri(uri, params.lang);

  if (!resolved) return notFound();

  const { id, type } = resolved;
  let pageData;
  let templateKey;
  let baseSlugs;
  let subSlugs;
  let baseLink;

  if (type === 'page') {
    pageData = await getPage(params.lang, id);
    templateKey = pageData.template ?? pageData.meta?.template ?? 'default';
    if (templateKey && !templateKey.endsWith('.php')) templateKey = `${templateKey}.php`;
    baseSlugs = slugs;
    subSlugs = [];
    baseLink = buildBaseLink(params.lang, baseSlugs);
  } else {
    // type === 'story' | 'timeline_event' | 'post': resolve parent page
    const baseUri = slugs.slice(0, -1).join('/');
    const parentResolved = await resolveUri(baseUri, params.lang);
    if (!parentResolved || parentResolved.type !== 'page') return notFound();
    pageData = await getPage(params.lang, parentResolved.id);
    templateKey = pageData.template ?? pageData.meta?.template ?? 'default';
    if (templateKey && !templateKey.endsWith('.php')) templateKey = `${templateKey}.php`;
    baseSlugs = slugs.slice(0, -1);
    subSlugs = slugs.length ? [slugs[slugs.length - 1]] : [];
    baseLink = buildBaseLink(params.lang, baseSlugs);
  }

  let stories,
    allMediaDe,
    allMediaEn,
    allPersons,
    topics,
    allMedia,
    timeLineEventsDe,
    timeLineEventsEn,
    timelineTopics;
  let template;

  switch (templateKey) {
    case 'page_stories.php':
      [
        stories,
        allMediaDe,
        allMediaEn,
        allPersons,
        topics,
        timeLineEventsDe,
        timeLineEventsEn,
      ] = await Promise.all([
        getAllStories(params.lang),
        getAllMedia('de'),
        getAllMedia('en'),
        getAllPersons(),
        fetchAllTopics(params.lang),
        getTimeline('de', params.lang),
        getTimeline('us', params.lang),
      ]);
      allMedia = [...allMediaDe, ...allMediaEn];
      template = (
        <StoriesTemplate
          data={pageData}
          params={params}
          subSlugs={subSlugs}
          baseLink={baseLink}
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
        allMediaEn,
        stories,
        allPersons,
      ] = await Promise.all([
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
          baseLink={baseLink}
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
    case 'page_collaborators.php': {
      const pages = await getPageListMinimal(params.lang);
      const partnerPageObj = pages.find((page) => {
        const urlPageSlug = getUrlPageSlug(page);
        return urlPageSlug === 'partner' || urlPageSlug === 'partners';
      });
      const partnerPageData = partnerPageObj
        ? await getPage(params.lang, partnerPageObj.id)
        : null;
      template = (
        <>
          <CollaboratorsTemplate
            data={pageData}
            subSlugs={subSlugs}
            baseLink={baseLink}
          />
          {partnerPageData && <PartnersTemplate data={partnerPageData} />}
        </>
      );
      break;
    }
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
    case 'page_home.php': {
      const pages = await getPageListMinimal(params.lang);
      template = (
        <HomeTemplate
          data={pageData}
          params={params}
          subSlugs={subSlugs}
          pages={pages}
        />
      );
      break;
    }
    default:
      template = <DefaultTemplate data={pageData} />;
      break;
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
    const pages = await getPageListMinimal(lang);
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

      paths.push({ lang, slugs: baseSlugs });

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
        const pageAcf = await getPageAcf(lang, page.id);
        pageAcf?.acf?.team?.forEach((member) => {
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
  const slugs = params.slugs ?? [];
  const uri = slugs.join('/');
  const resolved = await resolveUri(uri, params.lang);
  if (!resolved) return undefined;

  const { id, type } = resolved;
  let pageId = id;
  if (type !== 'page') {
    const baseUri = slugs.slice(0, -1).join('/');
    const parentResolved = await resolveUri(baseUri, params.lang);
    if (!parentResolved) return undefined;
    pageId = parentResolved.id;
  }

  const pageData = await getPage(params.lang, pageId);
  const seoData = pageData?.seo;

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
          ? [
              `${process.env.NEXT_PUBLIC_CMS_URL}${seoData?._social_image_url}`,
            ]
          : [],
    },
  };
}

export default Page;
