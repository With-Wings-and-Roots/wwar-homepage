import { getAllPages, getPage, getPageBySlug } from '@/utilities/pages';
import { notFound } from 'next/navigation';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';

import DefaultTemplate from '@/components/templates/DefaultTemplate';
import StoriesTemplate from '@/components/templates/StoriesTemplate';
import AboutTemplate from '@/components/templates/AboutTemplate';
import EventsTemplate from '@/components/templates/EventsTemplate';
import WorkshopsTemplate from '@/components/templates/WorkshopsTemplate';
import TakePartTemplate from '@/components/templates/TakePartTemplate';
import DonateTemplate from '@/components/templates/DonateTemplate';
import MaterialsTemplate from '@/components/templates/MaterialsTemplate';
import ProjectsTemplate from '@/components/templates/ProjectsTemplate';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';
import BlogTemplate from '@/components/templates/BlogTemplate';

import { getPageSettings } from '@/utilities/pageSettings';
import { GoogleAnalytics } from '@next/third-parties/google';
import TeamsTemplate from '@/components/templates/TeamsTemplate';
import AllFilmsTemplate from '@/components/templates/AllFilmsTemplate';
import NewsletterFlyout from '@/components/common/NewsletterFlyout';

export const revalidate = 600;
export const dynamicParams = false;
/**
 * ONLY: /[lang]/[slug]
 * ONLY WordPress "pages"
 */
const Page = async ({ params }) => {
  const { lang, slug } = params;

  const pageData = await getPageBySlug(lang, slug);
  if (!pageData) return notFound();
  const pageSettings = await getPageSettings(lang);

  let template;

  switch (pageData.template) {
    case 'page_stories.php':
      template = <StoriesTemplate data={pageData} params={params} />;
      break;

    case 'page_timelines.php':
      template = <TimelinesTemplate data={pageData} params={params} />;
      break;

    case 'page_about.php':
      template = <AboutTemplate data={pageData} />;
      break;

    case 'page_blog.php':
      template = <BlogTemplate data={pageData} params={params} />;
      break;

    case 'page_collaborators.php':
      template = <TeamsTemplate data={pageData} params={params} />;
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
    case 'page_films.php':
      template = <AllFilmsTemplate data={pageData} params={params} />;
      break;

    default:
      template = <DefaultTemplate data={pageData} params={params} />;
      break;
  }

  return (
    <>
      {pageSettings?.google_analytics_id && (
        <GoogleAnalytics gaId={pageSettings.google_analytics_id} />
      )}
      <NewsletterFlyout lang={lang} />

      {template}
    </>
  );
};

export default Page;

/**
 * 🔥 PREBUILD ONLY WORDPRESS PAGES
 * NO POSTS, NO TIMELINE EVENTS, NO STORIES CHILDREN
 */
export async function generateStaticParams() {
  const languages = ['en', 'de'];
  let paths = [];

  for (const lang of languages) {
    const pages = await getAllPages(lang);

    for (const page of pages) {
      const slug = page.slug;

      if (slug) {
        paths.push({
          lang,
          slug,
        });
      }
    }
  }

  return paths;
}

/**
 * OPTIONAL SEO
 */
export async function generateMetadata({ params }) {
  const pages = await getAllPages(params.lang);

  const pageObj = pages.find((page) => {
    const pageSlug = page.slug;

    return pageSlug === params.slug;
  });

  if (!pageObj) return {};

  const pageData = await getPage(params.lang, pageObj.id);
  const seo = pageData?.seo;

  return {
    title: seo?._open_graph_title,
    description: seo?._genesis_description,
    openGraph: {
      title: seo?._open_graph_title,
      description: seo?._open_graph_description,
      images: seo?._social_image_url
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_CMS_URL}${seo._social_image_url}`,
            },
          ]
        : [],
    },
    twitter: {
      title: seo?._twitter_title,
      description: seo?._twitter_description,
      images: seo?._social_image_url
        ? [`${process.env.NEXT_PUBLIC_CMS_URL}${seo._social_image_url}`]
        : [],
    },
  };
}
