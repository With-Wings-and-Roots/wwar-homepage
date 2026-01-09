import { fetchAllData } from './general';
export async function fetchAllCollections(lang = 'en') {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/collection?per_page=100&lang=${lang}`
  );
}
export async function fetchAllCurriculumPathways(lang = 'en') {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/curriculum-pathway?per_page=100`
  );
}
