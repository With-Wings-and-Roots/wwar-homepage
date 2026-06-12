import { fetchAllData } from './general';

export const getTimelineEvents = async (lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline_event?lang=${lang}&per_page=100`
  );
  const sortedData = data.sort((a, b) => {
    return (
      Number(a.acf.basic_info.start_date?.slice(0, 4)) -
      Number(b.acf.basic_info.start_date?.slice(0, 4))
    );
  });

  return sortedData;
};
export const getTimelineEventById = async (id, lang = 'en') => {
  const [data] = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline_event/${id}?lang=${lang}`
  );
  return data;
};

const getTimelineCountryIds = async (lang = 'en') => {
  const allCountriesData = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline?lang=${lang}`
  );

  const usData = allCountriesData.find((country) =>
    ['united-states', 'usa', 'usa-ed'].includes(country.slug)
  );

  const deData = allCountriesData.find((country) =>
    ['germany', 'deutschland', 'deutschland-ed'].includes(country.slug)
  );

  const result = {
    usId: usData ? usData.id : null,
    deId: deData ? deData.id : null,
  };

  return result;
};
export const getTimelineCountries = async (lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline?lang=${lang}`
  );
  return data;
};
export const getTimeline = async (country = 'us', lang = 'en') => {
  const timelineCountryIds = await getTimelineCountryIds(lang);
  const baseUrl =
    lang === 'de'
      ? `${process.env.NEXT_PUBLIC_CMS_URL}/de/wp-json/wp/v2/timeline_event`
      : lang === 'ed'
        ? `${process.env.NEXT_PUBLIC_CMS_URL}/ed/wp-json/wp/v2/timeline_event`
        : `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline_event`;

  const neededFields = [
    'id',
    'slug',
    'title.rendered',
    'featured_media',
    'acf',
    'seo',
  ];

  const data = await fetchAllData(
    `${baseUrl}?timeline=${
      timelineCountryIds[`${country}Id`]
    }&_fields=${neededFields.join(',')}`
  );

  return data.sort(
    (a, b) =>
      Number(a.acf.basic_info.start_date?.slice(0, 4)) -
      Number(b.acf.basic_info.start_date?.slice(0, 4))
  );
};

export const getTimelineTopicFromId = async (topicId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline_event_topic/${topicId}`,
    {
      next: {
        revalidate: 0,
        cache: 'no-store',
      },
    }
  );
  const data = await res.json();
  return data;
};

export const getTimelineTopics = async (lang = 'en') => {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline_event_topic?lang=${lang}`
  );
};
export const getTimelineEras = async (lang = 'en') => {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline-era?lang=${lang}`
  );
};
export const getTimelineCountryById = async (id, lang = 'en') => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline/${id}?lang=${lang}`
  );
  const data = await res.json();
  return data;
};

export const getTimelineCountryBySlug = async (slug, lang = 'en') => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline?slug=${slug}&lang=${lang}`
  );
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
};
export const getTimelineEvent = async (slug, lang = 'en') => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline_event?slug=${slug}&lang=${lang}&acf_format=standard`
  );
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
};

export async function fetchTimelinesByIds(ids = [], lang = 'en') {
  const base = process.env.NEXT_PUBLIC_CMS_URL;
  try {
    const timelines = await Promise.all(
      ids.map((id) =>
        fetch(`${base}/wp-json/wp/v2/timeline_event/${id}?lang=${lang}`).then(
          (r) => (r.ok ? r.json() : null)
        )
      )
    );
    return timelines.filter(Boolean);
  } catch {
    return [];
  }
}
export const getTimelineSlugsWithCountry = async (lang = 'en') => {
  const baseUrl = process.env.NEXT_PUBLIC_CMS_URL;

  // 1. Get all timeline events (ONLY slug + timeline ID)
  const events = await fetchAllData(
    `${baseUrl}/wp-json/wp/v2/timeline_event?lang=${lang}&per_page=100&_fields=slug,timeline`
  );

  // 2. Get all countries (to map ID → slug)
  const countries = await fetchAllData(
    `${baseUrl}/wp-json/wp/v2/timeline?lang=${lang}&per_page=100&_fields=id,slug`
  );

  // 3. Build lookup map: countryId → slug
  const countryMap = {};
  for (const country of countries) {
    countryMap[country.id] = country.slug;
  }

  // 4. Map events → attach country slug
  const result = events.map((event) => {
    const timelineId = Array.isArray(event.timeline)
      ? event.timeline[0]
      : event.timeline;

    return {
      slug: event.slug,
      countrySlug: countryMap[timelineId] || null,
      timelineId,
    };
  });

  return result;
};