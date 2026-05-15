import { notFound } from 'next/navigation';

import { getFrontpageId, getPage, getPageBySlug } from '@/utilities/pages';

import SingleFilmTemplate from '@/components/templates/SingleFilmTemplate';
import { getFilmBySlug } from '@/utilities/films';
import { getTimelineEvent } from '@/utilities/timeline';
import TimelinesTemplate from '@/components/templates/TimelinesTemplate';

export const dynamicParams = true;

const Page = async ({ params }) => {
  const { lang, slug } = params;
  const relatedSlugRaw = params.relatedPosts;

  const relatedSlug = Array.isArray(relatedSlugRaw)
    ? relatedSlugRaw[0]
    : relatedSlugRaw || null;
  if (relatedSlugRaw?.length > 1) return notFound();
  const baseSlug = slug;
  let pageData;

  if (baseSlug === 'story') {
    const frontpageId = await getFrontpageId(lang);

    pageData = await getPage(lang, frontpageId);
  } else {
    pageData = await getPageBySlug(lang, slug);
    if (!pageData) return notFound();
  }
  const lastSlug = params.deepSlug;

  let template;
  switch (pageData.template) {
    case 'page_films.php': {
      const film = await getFilmBySlug(lastSlug, params.lang);
      if (lastSlug && !film) return notFound();
      template = (
        <SingleFilmTemplate
          data={pageData}
          params={params}
          relatedSlug={relatedSlug}
          film={film}
        />
      );
      break;
    }
    case 'page_timelines.php': {
      const event = await getTimelineEvent(relatedSlug, params.lang);
      if (relatedSlug && !event) return notFound();
      template = <TimelinesTemplate data={pageData} params={params} />;
      break;
    }
    default: {
      notFound();
    }
  }

  return template;
};

export default Page;
