export const getTimelineEvents = async (lang = "en") => {
  let data;
  if (lang === "de") {
    data = await getAllTimelineEventsDe();
  } else {
    data = await getAllTimelineEventsEn();
  }
  const sortedData = data.sort((a, b) => {
    return (
      Number(a.acf.basic_info.start_date.slice(0, 4)) -
      Number(b.acf.basic_info.start_date.slice(0, 4))
    );
  });

  return sortedData;
};

async function getAllTimelineEventsEn() {
  let counter = 100;
  let page = 1;
  let timelineEvents = [];
  let data;
  let res = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?lang=en&per_page=100",
    {
      next: {
        revalidate: 600,
      },
    }
  );
  data = await res.json();
  timelineEvents = data;

  while (data.length >= counter && page <= 4) {
    page++;
    res = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?lang=en&per_page=100&page=${page}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    data = await res.json();
    timelineEvents = [...timelineEvents, ...data];
  }

  return timelineEvents;
}

async function getAllTimelineEventsDe() {
  let counter = 100;
  let page = 1;
  let timelineEvents = [];
  let data;
  let res = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?lang=de&per_page=100",
    {
      next: {
        revalidate: 600,
      },
    }
  );
  data = await res.json();
  timelineEvents = data;

  while (data.length >= counter && page <= 4) {
    page++;
    res = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?lang=de&per_page=100&page=${page}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    data = await res.json();
    timelineEvents = [...timelineEvents, ...data];
  }

  return timelineEvents;
}

const getTimelineCountryIds = async (lang = "en") => {
  let allCountriesData;

  if (lang === "de") {
    const allCountriesRes = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline?lang=de`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    allCountriesData = await allCountriesRes.json();
  } else {
    const allCountriesRes = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline?lang=en`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    allCountriesData = await allCountriesRes.json();
  }

  const usData = allCountriesData.filter(
    (country) => country.slug === "united-states" || country.slug === "usa"
  )[0];

  const deData = allCountriesData.filter(
    (country) => country.slug === "germany" || country.slug === "deutschland"
  )[0];

  return { usId: usData.id, deId: deData.id };
};

export const getGermanTimeline = async (lang = "en") => {
  let res, data;
  const timelineCountryIds = await getTimelineCountryIds(lang);

  if (lang === "de") {
    res = await fetch(
      `https://wwar2022.backslashseven.com/de/wp-json/wp/v2/timeline_event?timeline=${timelineCountryIds.deId}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );

    data = await res.json();
  } else {
    res = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?timeline=${timelineCountryIds.deId}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );

    data = await res.json();
  }

  const sortedData = data.sort((a, b) => {
    return (
      Number(a.acf.basic_info.start_date.slice(0, 4)) -
      Number(b.acf.basic_info.start_date.slice(0, 4))
    );
  });

  return sortedData;
};

export const getUsTimeline = async (lang = "en") => {
  const timelineCountryIds = await getTimelineCountryIds(lang);

  let res, data;

  if (lang === "de") {
    res = await fetch(
      `https://wwar2022.backslashseven.com/de/wp-json/wp/v2/timeline_event?timeline=${timelineCountryIds.usId}`,

      {
        next: {
          revalidate: 600,
        },
      }
    );
    data = await res.json();
  } else {
    res = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?timeline=${timelineCountryIds.usId}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    data = await res.json();
  }

  const sortedData = data.sort((a, b) => {
    return (
      Number(a.acf.basic_info.start_date.slice(0, 4)) -
      Number(b.acf.basic_info.start_date.slice(0, 4))
    );
  });

  return sortedData;
};
