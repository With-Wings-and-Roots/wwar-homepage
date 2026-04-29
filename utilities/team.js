export const getTeamMemberById = async (id, lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/team-member/${id}?lang=${lang}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};

export const getTeamMemberBySlug = async (slug, lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/team-member?slug=${slug}&lang=${lang}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data.length > 0 ? data[0] : null;
};
