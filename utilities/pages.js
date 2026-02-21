const PAGE_LIST_FIELDS = 'id,link,slug,parent,template';

/**
 * Resolves URI + lang to database id and type via backend.
 * @param {string} uri Path without leading slash or lang prefix (e.g. 'about', 'stories/sexual-identity').
 * @param {string} lang Language code ('en' | 'de').
 * @returns {Promise<{ id: number, type: string } | null>}
 */
export async function resolveUri(uri, lang) {
  const base = process.env.NEXT_PUBLIC_CMS_URL;
  const url = `${base}/wp-json/wwarrest/v1/resolve?uri=${encodeURIComponent(uri)}&lang=${encodeURIComponent(lang)}`;
  const res = await fetch(url, {
    next: { revalidate: 600 },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data && typeof data.id === 'number' && data.type ? data : null;
}

/**
 * Fetches minimal page list (id, link, slug, parent, template) for path
 * resolution and static params. Use getPage(lang, id) for full page data.
 */
export async function getPageListMinimal(lang) {
  let currentPage = 1;
  let totalPages = 1;
  let pages = [];
  while (currentPage <= totalPages) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/pages?page=${currentPage}&lang=${lang}&_fields=${PAGE_LIST_FIELDS}`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
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

/**
 * Fetches only ACF for a page (e.g. for collaborator team in generateStaticParams).
 * Uses _fields=acf to keep the response small. Falls back to full page if needed.
 */
export async function getPageAcf(lang, id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/pages/${id}?lang=${lang}&acf_format=standard&_fields=acf`,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return await res.json();
}
