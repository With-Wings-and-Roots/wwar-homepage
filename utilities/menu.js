export const getPrimaryMenuId = async (lang = 'en') => {
  const res = await fetch(
    `${process.env.CMS_URL}/wp-json/wwarrest/v1/menu?lang=${lang}`, {
      next: {
        revalidate: 3600
      }
    }
  );
  const data = await res.json();
  return data.primary;
};

export const getMenuItems = async (id, lang = 'en') => {
  const res = await fetch(
    `${process.env.CMS_URL}/wp-json/wwarrest/v1/menu/${id}?lang=${lang}`
  )
  return await res.json();
};