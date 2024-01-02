import { getAllPages, getFrontpageId, getPage } from '@/utilities/pages';
import { notFound } from 'next/navigation';
import { getMenuItems, getPrimaryMenuId } from '@/utilities/menu';
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
import { getAllStories } from '@/utilities/stories';
import { getTimelineEvents } from '@/utilities/timeline';

const Page = async ({ params, searchParams }) => {

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

  // get page
  let template;
  if (pageObj) {
    const pageData = await getPage(params.lang, pageObj.id);
    switch (pageObj.template) {
      case 'page_stories.php':
        template = (
          <StoriesTemplate
            data={pageData}
            params={params}
            subSlugs={subSlugs}
            baseLink={pageSlug}
          />
        );
        break;
      case 'page_timelines.php':
        template = (
          <TimelinesTemplate
            data={pageData}
            params={params}
            subSlugs={subSlugs}
            baseLink={pageSlug}
            searchParams = {searchParams}
          />
        );
        break;
      case 'page_about.php':
        template = <AboutTemplate data={pageData} />;
        break;
      case 'page_collaborators.php':
        template = <CollaboratorsTemplate data={pageData} />;
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
      <Header lang={params.lang} />
      {template}
      <Footer lang={params.lang} />
    </>
  );
};

export async function generateStaticParams() {
  let paths = [];
  for (const lang of ['en', 'de']) {
    const pages = await getAllPages(lang);
    const stories = await getAllStories(lang);
    const timelineEvents = await getTimelineEvents(lang);
    pages.map((page) => {
      const url = new URL(page.link);
      let urlPageSlug = url
        .toString()
        .substring(url.origin.length)
        .replace(/^\/|\/$/g, '')
        .replace(/^(de\/|en\/)/, '');
      if (urlPageSlug === 'de') urlPageSlug = null;
      paths.push({ lang: lang, slugs: urlPageSlug?.split('/') ?? [''] });
      if (page.template === 'page_stories.php') {
        stories?.map((story) => {
          paths.push({
            lang: lang,
            slugs: [...urlPageSlug?.split('/'), story.slug],
          });
        });
      }
      if (page.template === 'page_timelines.php') {
        timelineEvents?.map((event) => {
          paths.push({
            lang: lang,
            slugs: [...urlPageSlug?.split('/'), event.slug],
          });
        });
      }
    });
  }

  return paths;
}

export default Page;
