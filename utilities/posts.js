export async function getAllPosts(lang, post_type) {
  let currentPage = 1;
  let totalPages = 1;
  let posts = [];
  while (currentPage <= totalPages) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/${post_type}?page=${currentPage}&lang=${lang}&acf_format=standard`,
      {
        next: {
          revalidate: 0,
          cache: 'no-store',
        },
      }
    );
    totalPages = res.headers.get('X-WP-TotalPages') ?? 1;
    posts = [...posts, ...(await res.json())];
    currentPage++;
  }
  return posts;
}

export async function getPostById(id, lang, post_type) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/${post_type}/${id}?lang=${lang}&acf_format=standard`,
    {
      next: { revalidate: 0, cache: 'no-store' },
    }
  );

  if (!res.ok) {
    return null;
  }

  return await res.json();
}
export async function getBlogTopics(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/blog-topic?lang=${lang}`,
    {
      next: { revalidate: 0, cache: 'no-store' },
    }
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
export async function getBlogFormats(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/format?lang=${lang}`,
    {   
    next: { revalidate: 0, cache: 'no-store' },
    }
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
export async function getBlogMedium(lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/medium?lang=${lang}`,
    {   
    next: { revalidate: 0, cache: 'no-store' },
    }
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
}