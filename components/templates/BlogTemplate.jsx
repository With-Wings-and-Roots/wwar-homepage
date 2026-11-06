import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { decode } from 'html-entities';

import gfx_bg_orange from '@/public/bg_orange.png';

import {
  getAllPosts,
  getBlogTopics,
  getBlogFormats,
  getBlogMedium,
  getAllTags,
} from '@/utilities/posts';

import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';

import ImageMedia from '@/components/common/ImageMedia';
import WysiwygContent from '@/components/common/WysiwygContent';
import Sidebar from '@/components/timelineEvent/sidebar';
import PostsWrapper from '@/components/blogs/postsWrapper';

// --------------------------------------------------
// MEDIA HELPER
// --------------------------------------------------

const resolveMedia = async (field) => {
  if (!field) return null;

  if (typeof field === 'number' || typeof field === 'string') {
    const id = Number(field);

    if (Number.isFinite(id) && id > 0) {
      return await fetchMediaFromId(id);
    }
  }

  return field;
};

// --------------------------------------------------
// NORMALIZE RELATED CONTENT
// --------------------------------------------------

const normalizeRelatedContent = async (item) => {
  if (!item) return null;

  const type = item.post_type || item.type;
  const id = item.ID || item.id;

  if (!type || !id) return null;

  let fullPost = item;

  // Fetch the full post when ACF returns only a relationship object.
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/wp-json/wp/v2/${type}/${id}?_embed`,
      { next: { revalidate: 600 } }
    );

    if (response.ok) {
      fullPost = await response.json();
    }
  } catch (error) {
    console.error(`Failed to fetch ${type} ${id}:`, error);
  }

  // Get featured image from WordPress REST API.
  let featuredImage = null;
  console.log('Full Post:', fullPost);
  const featuredMediaId =
    fullPost.featured_media ||
    fullPost.acf?.banner ||
    fullPost.acf?.hero_image ||
    fullPost.acf?.imagevideo?.[0]?.image ||
    null;

  featuredImage = await resolveMedia(featuredMediaId);

  return {
    id,
    type,
    slug: fullPost.slug || item.post_name,
    title: decode(fullPost.title?.rendered || item.post_title || ''),
    excerpt: fullPost.excerpt?.rendered || item.post_excerpt || '',
    featured_image: featuredImage,
  };
};

// --------------------------------------------------
// BLOG TEMPLATE
// --------------------------------------------------

const BlogTemplate = async ({ params, data }) => {
  const lang = params?.lang || 'en';

  const selectedFormats = (data?.acf?.selected_format || []).map(Number);

  const [allPosts, topics, allCollections, languages, tags] = await Promise.all(
    [
      getAllPosts(lang, 'posts'),
      getBlogTopics(lang),
      getBlogFormats(lang),
      getBlogMedium(lang),
      getAllTags(lang),
    ]
  );

  // --------------------------------------------------
  // ARCHIVE FILTERING
  // --------------------------------------------------

  const collections = (allCollections || []).filter((collection) => {
    return (
      selectedFormats.length === 0 ||
      selectedFormats.includes(Number(collection.id))
    );
  });

  const posts = (allPosts || []).filter((post) => {
    if (selectedFormats.length === 0) return true;

    const postFormats = (post?.acf?.format || []).map(Number);

    return postFormats.some((id) => selectedFormats.includes(id));
  });

  // ==================================================
  // INDIVIDUAL BLOG POST
  // ==================================================

  if (params?.deepSlug) {
    const blogPost = (allPosts || []).find(
      (post) => post.slug === params.deepSlug
    );

    if (!blogPost) {
      return (
        <div className='px-8 md:px-16 xl:px-48 py-16'>Blog post not found.</div>
      );
    }

    const acf = blogPost.acf || {};

    console.log('Blog ACF:', acf);

    // --------------------------------------------------
    // RELATED CONTENT
    // Actual field: related_content
    // --------------------------------------------------

    const relatedContentraw = await Promise.all(
      (acf.related_content || []).map(normalizeRelatedContent)
    );

    const relatedContent = relatedContentraw.filter(Boolean);

    // --------------------------------------------------
    // FEATURED IMAGE
    // --------------------------------------------------

    const featuredMedia = blogPost.featured_media;

    // --------------------------------------------------
    // RELATED MEDIA
    // Vimeo iframe
    // --------------------------------------------------

    const relatedMedia = acf.related_media || null;

    // ==================================================
    // RENDER
    // ==================================================

    return (
      <div
        className='px-8 md:px-16 xl:px-48 py-16 relative flex-1'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <Image
          src={gfx_bg_orange}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
        />

        <div className='grid grid-cols-12 gap-8'>
          {/* ==========================================
              MAIN BLOG CONTENT
          ========================================== */}

          <div className='col-span-12 md:col-span-8 xl:col-span-9'>
            {/* BACK TO BLOG */}

            <Link
              href={createLocalLink('/blog')}
              className='mb-4 bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
            >
              Blog
            </Link>

         

            {/* TITLE */}

            <h1 className='text-3xl md:text-6xl font-normal'>
              {decode(blogPost.title?.rendered || '')}
            </h1>

            {/* DATE */}

            <div className='mt-1 text-lg font-medium'>
              {blogPost.date && format(new Date(blogPost.date), 'yyyy-MM-dd')}
            </div>

               {/* FEATURED IMAGE ON MOBILE */}
             {relatedMedia && (
              <section className='mt-10 mb-12'>
                <div
                  className='
                    relative
                    aspect-video
                    w-full
                    overflow-hidden
                    [&_iframe]:absolute
                    [&_iframe]:inset-0
                    [&_iframe]:w-full
                    [&_iframe]:h-full
                  '
                  dangerouslySetInnerHTML={{
                    __html: relatedMedia,
                  }}
                />
              </section>
            )}

            {featuredMedia > 0 && !relatedMedia && (
              <div className='mt-10 mb-12'>
                <ImageMedia
                  mediaId={featuredMedia}
                  className='aspect-square object-cover'
                />
              </div>
            )}

            {/* BLOG CONTENT */}

            <WysiwygContent
              content={blogPost.content?.rendered}
              className='my-2'
            />

           

            {/* ==========================================
                RELATED RESOURCES
            ========================================== */}

            {relatedContent?.length > 0 && (
              <section className='mt-10 mb-12'>
                <h2 className='text-2xl lg:text-4xl font-medium mb-8'>
                  {lang === 'en'
                    ? 'Related Resources'
                    : 'Contenido Relacionado'}
                </h2>

                <div className='grid md:grid-cols-3 gap-6'>
                  {relatedContent.map((item, i) => {
                    const type = item.type;
                    const routeType =
                      type === 'story'
                        ? lang === 'de'
                          ? 'geschichten'
                          : 'stories'
                        : type === 'film'
                          ? 'films'
                          : type;

                    return (
                      <Link
                        key={i}
                        href={`/${lang}/${routeType}/${item.slug}`}
                        scroll={false}
                      >
                        <div className='relative aspect-square cursor-pointer overflow-hidden rounded-lg group'>
                          {/* IMAGE */}
                          {item.featured_image?.source_url && (
                            <Image
                              src={item.featured_image.source_url}
                              alt={item.title?.rendered || ''}
                              fill
                              className='object-cover transition-transform duration-500 group-hover:scale-110'
                              sizes='100%'
                            />
                          )}

                          {/* GRADIENT OVERLAY */}
                          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90' />

                          {/* TYPE (top left like your system style) */}
                          <div className='absolute top-4 left-4 z-20 text-xs uppercase tracking-widest text-wwr_yellow_orange bg-black/70 px-2 py-1 rounded'>
                            {type}
                          </div>

                          {/* CONTENT WRAPPER */}
                          <div className='absolute bottom-0 left-0 right-0 p-5 z-20 text-white'>
                            {/* TITLE (animated style like StoryCard) */}
                            <h3 className='text-lg md:text-xl font-semibold leading-snug relative'>
                              {/* BACK LAYER */}
                              <span className='absolute top-0 left-0 opacity-40 transition-all duration-500 group-hover:opacity-0'>
                                {item.title?.rendered}
                              </span>

                              {/* FRONT LAYER */}
                              <span className='relative opacity-100'>
                                {item.title?.rendered}
                              </span>
                            </h3>

                            {/* EXCERPT (optional) */}
                            {item.excerpt?.rendered && (
                              <div
                                className='text-sm mt-2 text-white/70 line-clamp-2'
                                dangerouslySetInnerHTML={{
                                  __html: item.excerpt.rendered,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* ==========================================
              SIDEBAR
          ========================================== */}

          {/* SIDEBAR */}
<div className='col-span-12 md:col-span-4 xl:col-span-3 self-center'>
  {acf.sidebar_content?.length > 0 && (
    <div>
      <Sidebar sidebarContent={acf.sidebar_content} lang={lang} />
    </div>
  )}
</div>
        </div>
      </div>
    );
  }

  // ==================================================
  // BLOG ARCHIVE
  // ==================================================

  const headerImageId = data?.acf?.header_image || data?.featured_media || null;

  const headerImage = headerImageId
    ? await fetchMediaFromId(headerImageId)
    : null;

  return (
    <div className='relative'>
      {/* BACKGROUND */}

      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
      />

      {/* HEADER IMAGE */}

      {headerImage?.source_url && (
        <div className='relative w-full h-[90vh]'>
          <Image
            src={headerImage.source_url}
            alt={data?.title?.rendered || ''}
            fill
            priority
            sizes='100vw'
            className='object-cover'
          />
        </div>
      )}

      {/* BLOG CONTENT */}

      <div className='px-8 md:px-16 xl:px-48 py-16'>
        <div className='text-lg font-light mt-6'>
          <h1
            className='text-3xl md:text-6xl font-bold mb-6'
            dangerouslySetInnerHTML={{
              __html: data?.acf?.page_title || data?.title?.rendered || 'Blog',
            }}
          />

          <WysiwygContent content={data?.acf?.intro || data?.acf?.intro_text} />
        </div>

        {/* POSTS */}

        <div className='mt-16'>
          <PostsWrapper
            posts={posts}
            topics={topics || []}
            collections={collections || []}
            languages={languages || []}
            tags={tags || []}
            params={params}
            lang={lang}
            readMoreLabel={data?.acf?.read_more_label}
            noEntriesText={data?.acf?.no_entries_text}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogTemplate;
