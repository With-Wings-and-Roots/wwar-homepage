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

const getTimelineCountryIds = async (lang = 'en') => {
  const allCountriesData = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline?lang=${lang}`
  );

  const usData = allCountriesData.find((country) =>
    ['united-states', 'usa'].includes(country.slug)
  );

  const deData = allCountriesData.find((country) =>
    ['germany', 'deutschland'].includes(country.slug)
  );

  const result = {
    usId: usData ? usData.id : null,
    deId: deData ? deData.id : null,
  };

  return result;
};

export const getTimeline = async (country = 'us', lang = 'en') => {
  const timelineCountryIds = await getTimelineCountryIds(lang);

  const baseUrl =
    lang === 'de'
      ? `${process.env.NEXT_PUBLIC_CMS_URL}/de/wp-json/wp/v2/timeline_event`
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
        revalidate: 600,
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

export const getTimelinesByIds = async (ids = [], lang = 'en') => {
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
export async function getTimelineEvent(slug, lang = 'en') {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline_event?slug=${slug}&lang=${lang}&acf_format=standard`
  );
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}
export const getTimelineCountries = async (lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/timeline?lang=${lang}`
  );
  return data;
};
