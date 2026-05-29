export async function getAllPages(lang) {
  let currentPage = 1;
  let totalPages = 1;
  let pages = [];
  while (currentPage <= totalPages) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/pages?page=${currentPage}&lang=${lang}&_fields=id,slug`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    totalPages = res.headers.get('X-WP-TotalPages') ?? 1;
    pages = [...pages, ...(await res.json())];
    currentPage++;
  }
  return pages;
}

export async function getFrontpageId(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/frontpage-id?lang=${lang}`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return await res.text();
}

export async function getPage(lang, id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/pages/${id}?lang=${lang}&acf_format=standard`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return await res.json();
}
export async function getPageBySlug(lang, slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${lang}&acf_format=standard`,
    { next: { revalidate: 600 } }
  );
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}
export async function fetchPagesByIds(ids = [], lang = 'en') {
  const base = process.env.NEXT_PUBLIC_CMS_URL;

  try {
    const pages = await Promise.all(
      ids.map((id) =>
        fetch(
          `${base}/wp-json/wp/v2/pages/${id}?lang=${lang}&_fields=id,title,link`
        ).then((r) => (r.ok ? r.json() : null))
      )
    );

    return pages.filter(Boolean);
  } catch {
    return [];
  }
}
export async function getTranslations(lang, id) {
  if (!id) return null;

  // Step 1: get slug and link of current page
  const pageRes = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/pages/${id}?_fields=id,slug,link`,
    { next: { revalidate: 3600 } }
  );
  if (!pageRes.ok) return null;
  const page = await pageRes.json();

  // Step 2: resolve slug in CURRENT language to get source ID
  const sourceRes = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/resolve?uri=${page.slug}&lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!sourceRes.ok) return null;
  const sourceData = await sourceRes.json();
  const sourceId = sourceData.id;

  // Step 3: get translated URL for each language using source ID
  const langs = ['en', 'de', 'ed'];
  const results = await Promise.all(
    langs.map(async (targetLang) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wwarrest/v1/translated-url/${sourceId}/${targetLang}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) return null;
      const data = await res.json();
      return { lang: targetLang, url: data.translated_url };
    })
  );

  return results.reduce((acc, item) => {
    if (item?.url) acc[item.lang] = item.url;
    return acc;
  }, {});
}
