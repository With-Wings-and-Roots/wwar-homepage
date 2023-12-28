import { fetchAllData } from './general';

export const getTimelineEvents = async (lang = 'en') => {
  const data = await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?lang=${lang}&per_page=100`
  );
  const sortedData = data.sort((a, b) => {
    return (
      Number(a.acf.basic_info.start_date.slice(0, 4)) -
      Number(b.acf.basic_info.start_date.slice(0, 4))
    );
  });

  return sortedData;
};

const getTimelineCountryIds = async (lang = 'en') => {
  const allCountriesData = await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline?lang=${lang}`
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
      ? 'https://wwar2022.backslashseven.com/de/wp-json/wp/v2/timeline_event'
      : 'https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event';

  const data = await fetchAllData(
    `${baseUrl}?timeline=${timelineCountryIds[`${country}Id`]}`
  );

  return data.sort(
    (a, b) =>
      Number(a.acf.basic_info.start_date.slice(0, 4)) -
      Number(b.acf.basic_info.start_date.slice(0, 4))
  );
};
