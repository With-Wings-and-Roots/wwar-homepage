export async function getAllPosts(lang, post_type) {
  let currentPage = 1;
  let totalPages = 1;
  let posts = [];
  while (currentPage <= totalPages) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/${post_type}?page=${currentPage}&lang=${lang}&acf_format=standard`,
      {
        next: {
          revalidate: 600,
        },
      }
    );
    totalPages = res.headers.get('X-WP-TotalPages') ?? 1;
    posts = [...posts, ...(await res.json())];
    currentPage++;
  }
  return posts;
}
export async function getPostBySlug(lang, slug, post_type) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/${post_type}?slug=${slug}&lang=${lang}&acf_format=standard`,
    {
      cache: 'no-store', // no caching at all
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}
export async function getAllPostSlugs(lang, post_type) {
  let currentPage = 1;
  let totalPages = 1;
  let slugs = [];

  while (currentPage <= totalPages) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/${post_type}?page=${currentPage}&lang=${lang}&_fields=slug`,
      {
        next: {
          revalidate: 600,
        },
      }
    );

    totalPages = Number(res.headers.get('X-WP-TotalPages')) || 1;

    const data = await res.json();

    slugs.push(...data.map((post) => post.slug));

    currentPage++;
  }

  return slugs;
}