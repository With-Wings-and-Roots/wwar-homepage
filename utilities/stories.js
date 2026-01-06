import { fetchAllData } from './general';

export async function getFooter(lang = 'en') {
  const [data] = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/options?lang=${lang}`
  );
  return data;
}

export async function getAllStories(lang = 'en') {
  const neededFields = [
    'id',
    'slug',
    'title.rendered',
    'featured_media',
    'acf',
    'seo',
  ];

  return await fetchAllData(
    `${
      process.env.NEXT_PUBLIC_CMS_URL
    }/wp-json/wp/v2/story?lang=${lang}&_fields=${neededFields.join(',')}`
  );
}

export async function fetchAllTopics(lang = 'en') {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/story_topic?per_page=100&lang=${lang}`
  );
}

export async function getAllMedia(lang = 'en') {
  const neededFields = ['id', 'source_url'];
  return await fetchAllData(
    `${
      process.env.NEXT_PUBLIC_CMS_URL
    }/wp-json/wp/v2/media?per_page=100&lang=${lang}&_fields=${neededFields.join(
      ','
    )}`
  );
}

export async function getAllPersons() {
  const neededFields = ['id', 'name', 'slug'];
  return await fetchAllData(
    `${
      process.env.NEXT_PUBLIC_CMS_URL
    }/wp-json/wp/v2/person?lang=en&per_page=100&_fields=${neededFields.join(
      ','
    )}`
  );
}

export async function getStoryMedia(lang = 'en', slug) {
  const [data] = fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/story?lang=${lang}&slug=${slug}`
  );
  return data.featured_media;
}

export async function getStoryMediaByMediaId(lang, mediaId) {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/media/${mediaId}?lang=${lang}`
  );
  return data.source_url;
}

export async function getTopicStories(lang, topicId) {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/story?story_topic=${topicId}&lang=${lang}&per_page=100`
  );
}

export function findIndexBySlug(array, slugTerm) {
  return array.findIndex((item) => item.slug === slugTerm);
}

export async function getTopicId(lang, topicSlug) {
  const allTopics = await fetchAllTopics(lang);
  const selectedTopic = allTopics.find((topic) => topic.slug === topicSlug);
  return selectedTopic?.id || null;
}

export async function getPersonById(personId) {
  const allPersons = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/person?lang=en&per_page=100`
  );
  return allPersons.find((person) => person.id === personId) || null;
}

export async function getPersonBySlug(personSlug) {
  const allPersons = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/person?lang=en&per_page=100`
  );
  return allPersons.find((person) => person.slug === personSlug) || null;
}

export const getMenuId = async (_) => {
  const [data] = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/menu`
  );

  return data.primary;
};

export const getMenuItems = async (id) => {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/menu/${id}`
  );
};
