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
