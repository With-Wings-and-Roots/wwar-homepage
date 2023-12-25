import { fetchAllData } from "./general";

export const getTimelineEvents = async (lang = "en") => {
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

const getTimelineCountryIds = async (lang = "en") => {
  const allCountriesData = await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline?lang=${lang}`
  );

  const usData = allCountriesData.filter(
    (country) => country.slug === "united-states" || country.slug === "usa"
  )[0];

  const deData = allCountriesData.filter(
    (country) => country.slug === "germany" || country.slug === "deutschland"
  )[0];

  return { usId: usData.id, deId: deData.id };
};

export const getTimeline = async (country = "us", lang = "en") => {
  let res, data;
  const timelineCountryIds = await getTimelineCountryIds(lang);

  if (lang === "de") {
    data = await fetchAllData(
      `https://wwar2022.backslashseven.com/de/wp-json/wp/v2/timeline_event?timeline=${
        timelineCountryIds[`${country}Id`]
      }`
    );
  } else {
    data = await fetchAllData(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?timeline=${
        timelineCountryIds[`${country}Id`]
      }`
    );
  }

  return data.sort(
    (a, b) =>
      Number(a.acf.basic_info.start_date.slice(0, 4)) -
      Number(b.acf.basic_info.start_date.slice(0, 4))
  );
};
