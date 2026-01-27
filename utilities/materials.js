export const getAllMaterials = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/material?lang=${lang}&per_page=100`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};
export const getMaterialBySlug = async (slug, lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/material?slug=${slug}&lang=${lang}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};
export const getMaterialTypes = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/material-type?lang=${lang}&per_page=100`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};
export const getMaterialCollections = async (lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/material-collection?lang=${lang}&per_page=100`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};

export const getAllLanguages = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/language?per_page=100`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};
