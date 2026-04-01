import { fetchAllData } from './general';

export const getAllFilms = async (lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/film?lang=${lang}&per_page=100`
  );
  return data;
};
export const getFilmBySlug = async (slug, lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/film?slug=${slug}&lang=${lang}`
  );
  return Array.isArray(data) ? data[0] : data;
};
export const getFilmById = async (id, lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/film/${id}?lang=${lang}`
  );
  return Array.isArray(data) ? data[0] : data;
};
