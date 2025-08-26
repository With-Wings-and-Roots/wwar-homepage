export async function getPageSettings(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/options?lang=${lang}`,
    {
      next: {
        revalidate: 0,
        cache: 'no-store',
      },
    }
  );
  return await res.json();
}
