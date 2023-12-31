export async function getFooter(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/options?lang=${lang}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return await res.json();
}
