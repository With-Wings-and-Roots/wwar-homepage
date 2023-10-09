async function getStories(lang="en", numberOfStories, offset) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=${lang}&per_page=${numberOfStories}&offset=${offset}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return res.json();
}

let storiesList = [];
let counter = 0;

export async function getAllStories(lang) {

  counter += 100;

  const stories = await getStories(lang, 100, counter - 100);

  storiesList = [...storiesList, ...stories];

  if (storiesList.length >= counter) await getAllStories();
  if (storiesList.length < counter) return storiesList;
}

export async function getStoryMedia(lang, slug) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=${lang}&slug=${slug}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await res.json();

  return data[0]?.featured_media;
}

export async function getStoryMediaByMediaId(lang, mediaId) {
  const mediaRes = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/media/${mediaId}?lang=${lang}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await mediaRes.json();
  return data.source_url;
}

export function findIndexBySlug(array, slugTerm) {
  return array.findIndex((item) => item.slug === slugTerm);
}

export async function fetchAllTopics(lang) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story_topic?per_page=100&lang=${lang}`,{
      next: {
        revalidate: 600,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getTopicId(lang, topicSlug) {
  const allTopics = await fetchAllTopics(lang);

  const selectedTopic = allTopics.filter(
    (topic) => topic.slug === topicSlug
  )[0];

  return selectedTopic.id;
}

export async function getTopicStories(lang,topicId) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?story_topic=${topicId}&lang=${lang}&per_page=100`,{
      next: {
        revalidate: 600,
      },
    }
  );
  const topicStories = await res.json();
  return topicStories;
}

export async function getPersonById(personId) {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/person?lang=en&per_page=100`,{
      next: {
        revalidate: 600,
      },
    }
  );
  const allPersons = await res.json();
  const person = allPersons.filter(person=>person.id===personId)[0];
  return person;
}
