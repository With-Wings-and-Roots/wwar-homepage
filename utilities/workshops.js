import { fetchAllData } from './general';

// ✅ Get all workshops
export const getAllWorkshops = async (lang = 'en') => {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/workshop?lang=${lang}&per_page=100`
  );
};

// ✅ Get workshop by slug (correct WP way)
export const getWorkshopBySlug = async (slug, lang = 'en') => {
  const data = await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/workshop?slug=${slug}&lang=${lang}`
  );

  return Array.isArray(data) ? data[0] : data;
};

// ✅ Production Types (taxonomy)
export const getWorkshopProductionTypes = async (lang = 'en') => {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/workshop-type?lang=${lang}&per_page=100`
  );
};

// ✅ Audience (taxonomy)
export const getWorkshopAudience = async (lang = 'en') => {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/workshop-audience?lang=${lang}&per_page=100`
  );
};

// ✅ Topics (taxonomy)
export const getWorkshopTopics = async (lang = 'en') => {
  return await fetchAllData(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/workshop-topic?lang=${lang}&per_page=100`
  );
};
