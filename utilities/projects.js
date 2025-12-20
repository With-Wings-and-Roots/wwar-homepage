import { fetchAllData } from './general';

export const getAllProjects = async (lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/project?lang=${lang}&per_page=100`
  );
  return data;
};
export const getProjectBySlug = async (slug, lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/project?slug=${slug}&lang=${lang}`
  );
  return data;
};
export const getAllProjectAreas = async (lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/project-area?lang=${lang}&per_page=100`
  );
  return data;
};
