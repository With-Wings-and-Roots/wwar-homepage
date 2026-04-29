export const fetchMediaFromId = async (mediaId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/media/${mediaId}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await res.json();
  return data;
};
export async function fetchMediaByIds(ids = [], lang = 'en') {
  const base = process.env.NEXT_PUBLIC_CMS_URL;

  try {
    const media = await Promise.all(
      ids.map((id) =>
        fetch(`${base}/wp-json/wp/v2/media/${id}?lang=${lang}`, {
          next: {
            revalidate: 600, // cache for 10 min
          },
        }).then((r) => (r.ok ? r.json() : null))
      )
    );

    return media.filter(Boolean);
  } catch {
    return [];
  }
}
