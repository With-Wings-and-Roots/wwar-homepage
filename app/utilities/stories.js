import { fetchAllData } from "./general";

export async function getFooter(lang = "en") {
  const res = await fetch(
    `https://wwar2022.backslashseven.com/wp-json/wwarrest/v1/options?lang=${lang}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getAllStories(lang = "en") {
  return await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=${lang}`
  );
}

export async function fetchAllTopics(lang = "en") {
  return await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story_topic?per_page=100&lang=${lang}`
  );
}

export async function getAllMedia(lang = "en") {
  return await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/media?per_page=100&lang=${lang}`
  );
}

export async function getAllPersons() {
  return await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/person?lang=en&per_page=100`
  );
}

export async function getStoryMedia(lang = "en", slug) {
  const data = fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=${lang}&slug=${slug}`
  );
  return data[0].featured_media;
}

export async function getStoryMediaByMediaId(lang, mediaId) {
  const data = await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/media/${mediaId}?lang=${lang}`
  );
  return data.source_url;
}

export async function getTopicStories(lang, topicId) {
  return await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/story?story_topic=${topicId}&lang=${lang}&per_page=100`
  );
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

export async function getPersonById(personId) {
  const allPersons = await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wp/v2/person?lang=en&per_page=100`
  );
  const person = [...allPersons.filter((person) => person.id === personId)];
  return person[0];
}
export const getMenuId = async (_) => {
  const res = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wwarrest/v1/menu"
  );

  const data = await res.json();

  return data.primary;
};

export const getMenuItems = async (id) => {
  return await fetchAllData(
    `https://wwar2022.backslashseven.com/wp-json/wwarrest/v1/menu/${id}`
  );
};
