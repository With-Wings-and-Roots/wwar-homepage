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
export async function getBlogFormatById(id, lang) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/format/${id}?lang=${lang}`,
    {
      next: { revalidate: 0, cache: 'no-store' },
    }
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
}
export async function getAllTags(lang) {
  const perPage = 100;
  let page = 1;
  let allTags = [];

  while (true) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/tags?lang=${lang}&per_page=${perPage}&page=${page}`,
      {
        next: { revalidate: 0 },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      // WordPress returns 400 when the requested page doesn't exist
      if (page > 1 && res.status === 400) {
        break;
      }

      return null;
    }

    const tags = await res.json();

    allTags = [...allTags, ...tags];

    // If fewer than 100 came back, this was the last page
    if (tags.length < perPage) {
      break;
    }

    page++;
  }

  return allTags;
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