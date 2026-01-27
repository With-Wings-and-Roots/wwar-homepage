export const getTeamMemberById = async (id, lang) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/team-member/${id}?lang=${lang}`,
    { cache: 'no-store' }
  );
  const data = await res.json();
  return data;
};
