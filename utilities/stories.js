import { fetchAllData } from './general';

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

export async function getTopicStories(lang, topicId) {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/story?story_topic=${topicId}&lang=${lang}&per_page=100`
  );
}

export function findIndexBySlug(array, slugTerm) {
  return array.findIndex((item) => item.slug === slugTerm);
}
export async function fetchStoriesByIds(ids = [], lang = 'en') {
  const base = process.env.NEXT_PUBLIC_CMS_URL;

  try {
    const stories = await Promise.all(
      ids.map((id) =>
        fetch(`${base}/wp-json/wp/v2/story/${id}?lang=${lang}`).then((r) =>
          r.ok ? r.json() : null
        )
      )
    );

    return stories.filter(Boolean);
  } catch {
    return [];
  }
}
export async function fetchPersonsByIds(ids = [], lang = 'en') {
  const base = process.env.NEXT_PUBLIC_CMS_URL;

  try {
    const persons = await Promise.all(
      ids.map((id) =>
        fetch(`${base}/wp-json/wp/v2/person/${id}?lang=${lang}`).then((r) =>
          r.ok ? r.json() : null
        )
      )
    );

    return persons.filter(Boolean);
  } catch {
    return [];
  }
}
