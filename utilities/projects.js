import { fetchAllData } from './general';

export const getAllProjects = async (lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/project?lang=${lang}&per_page=100`
  );
  return data;
};
