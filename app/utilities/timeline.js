// export const getTimelineEvents = async () => {
//   const res = await fetch(
//     "https://wwar2022.backslashseven.com/wp-json/wp/v2/timeline_event?lang=en&per_page=100"
//   );
//   const data = await res.json();

//   return data;
// };

export const getTimelineEvents = async (lang = "en") => {
  if (lang === "de") {
    return await getAllTimelineEventsDe();
  } else {
    return await getAllTimelineEventsEn();
  }
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
