async function getFooterEn() {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wwarrest/v1/options?lang=en`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = await res.json();
  return data;
}

async function getFooterDe() {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wwarrest/v1/options?lang=de`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = await res.json();
  return data;
}

async function getAllStoriesEn() {
  let counter = 100;
  let page = 1;
  let stories = [];
  let data;
  let res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=en&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  data = await res.json();
  stories = [...stories, ...data];

  while (data.length >= counter && page <= 4) {
    page++;
    res = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=en&per_page=100&page=${page}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    data = await res.json();
    stories = [...stories, ...data];
  }

  return stories;
}
async function getAllStoriesDe() {
  let counter = 100;
  let page = 1;
  let stories = [];
  let data;
  let res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=de&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  data = await res.json();
  stories = [...stories, ...data];

  while (data.length >= counter && page <= 4) {
    page++;
    res = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=de&per_page=100&page=${page}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    data = await res.json();
    stories = [...stories, ...data];
  }

  return stories;
}
export async function getAllStories(lang = "en") {
  if (lang === "de") {
    return await getAllStoriesDe();
  } else {
    return await getAllStoriesEn();
  }
}

// async function fetchAllTopicsEn() {
//   const res = await fetch(
//     `https://wwar2022.backslashseven.com/wp-json/wp/v2/story_topic?per_page=100&lang=en`,
//     {
//       next: {
//         revalidate: 600,
//       },
//     }
//   );
//   const data = await res.json();
//   return data;
// }

// async function fetchAllTopicsDe() {
//   const res = await fetch(
//     `https://wwar2022.backslashseven.com/wp-json/wp/v2/story_topic?per_page=100&lang=de`,
//     {
//       next: {
//         revalidate: 600,
//       },
//     }
//   );
//   const data = await res.json();
//   return data;
// }

export async function fetchAllTopics(lang = "en") {
  if (lang === "de") {
    return await fetchAllTopicsDe();
  } else {
    return await fetchAllTopicsEn();
  }
}

async function getAllMediaEn() {
  let counter = 100;
  let page = 1;
  let allMedia = [];
  let data;
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/media?per_page=100&lang=en`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  data = await res.json();
  allMedia = [...allMedia, ...data];

  while (allMedia.length >= counter) {
    counter += 100;
    page++;
    const tempRes = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/media?per_page=100&lang=en&page=${page}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    const tempData = await tempRes.json();
    allMedia = [...allMedia, ...tempData];
  }

  return allMedia;
}

async function getAllMediaDe() {
  let counter = 100;
  let page = 1;
  let allMedia = [];
  let data;
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/media?per_page=100&lang=de`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  data = await res.json();
  allMedia = [...allMedia, ...data];

  while (allMedia.length >= counter) {
    counter += 100;
    page++;
    const tempRes = await fetch(
      `https://wwar2022.backslashseven.com/wp-json/wp/v2/media?per_page=100&lang=de&page=${page}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    const tempData = await tempRes.json();
    allMedia = [...allMedia, ...tempData];
  }

  return allMedia;
}

export async function getAllMedia(lang = "en") {
  if (lang === "de") {
    return await getAllMediaDe();
  } else {
    return await getAllMediaEn();
  }
}

export async function getAllPersons() {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/person?lang=en&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const allPersons = await res.json();
  return allPersons;
}

async function getStoryMediaEn(slug) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=en&slug=${slug}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = [...(await res.json())];
  return data[0].featured_media;
}

async function getStoryMediaDe(slug) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=de&slug=${slug}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = [...(await res.json())];
  return data[0].featured_media;
}

async function getStoryMediaByMediaIdEn(mediaId) {
  const mediaRes = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/media/${mediaId}?lang=en`,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await mediaRes.json();
  return data.source_url;
}

async function getStoryMediaByMediaIdDe(mediaId) {
  const mediaRes = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/media/${mediaId}?lang=de`,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await mediaRes.json();
  return data.source_url;
}

async function fetchAllTopicsEn() {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story_topic?per_page=100&lang=en`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = await res.json();
  return data;
}

async function fetchAllTopicsDe() {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story_topic?per_page=100&lang=de`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = await res.json();
  return data;
}

async function getTopicStoriesEn(topicId) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?story_topic=${topicId}&lang=en&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const topicStories = await res.json();
  return topicStories;
}

async function getTopicStoriesDe(topicId) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?story_topic=${topicId}&lang=de&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const topicStories = await res.json();
  return topicStories;
}

let storiesList = [];
let counter = 0;
let stories = [];

export async function getStoryMedia(lang, slug) {
  let storyMedia;
  if (lang === "de") {
    storyMedia = await getStoryMediaDe(slug);
  } else {
    storyMedia = await getStoryMediaEn(slug);
  }

  return storyMedia;
}

export async function getStoryMediaByMediaId(lang, mediaId) {
  let sourceUrl;

  if (lang === "de") {
    sourceUrl = await getStoryMediaByMediaIdDe(mediaId);
  } else {
    sourceUrl = await getStoryMediaByMediaIdEn(mediaId);
  }

  return sourceUrl;
}

export function findIndexBySlug(array, slugTerm) {
  return array.findIndex((item) => item.slug === slugTerm);
}

export async function getTopicId(lang, topicSlug) {
  const allTopics = await fetchAllTopics(lang);

  const selectedTopic = [
    ...allTopics.filter((topic) => topic.slug === topicSlug),
  ][0];

  return selectedTopic?.id;
}

export async function getTopicStories(lang, topicId) {
  if (lang === "de") {
    return await getTopicStoriesDe(topicId);
  } else {
    return await getTopicStoriesEn(topicId);
  }
}

export async function getPersonById(personId) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/person?lang=en&per_page=100`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const allPersons = await res.json();
  const person = [...allPersons.filter((person) => person.id === personId)];
  return person[0];
}

export async function getFooter(lang = "en") {
  if (lang === "de") {
    return await getFooterDe();
  } else {
    return await getFooterEn();
  }
}
