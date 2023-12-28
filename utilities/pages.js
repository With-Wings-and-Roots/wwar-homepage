export async function getAllPages(lang) {
  let currentPage = 1;
  let totalPages = 1;
  let pages = [];
  while (currentPage <= totalPages) {
    const res = await fetch(`${process.env.CMS_URL}/wp-json/wp/v2/pages?page=${currentPage}&lang=${lang}`, {
      next: {
        revalidate: 600
      }
    })
    totalPages = res.headers.get('X-WP-TotalPages') ?? 1;
    pages = [...pages, ...await res.json()];
    currentPage++;
  }
  return pages;
}

export async function getFrontpageId(lang) {
  const res = await fetch(`${process.env.CMS_URL}/wp-json/wwarrest/v1/frontpage-id?lang=${lang}`, {
    next: {
      revalidate: 600
    }
  })
  return await res.text()
}

export async function getPage(lang, id) {
  const res = await fetch(`${process.env.CMS_URL}/wp-json/wp/v2/pages/${id}?lang=${lang}`, {
    next: {
      revalidate: 600
    }
  })
  return await res.json();
}