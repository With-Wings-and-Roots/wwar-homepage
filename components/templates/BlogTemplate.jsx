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

const BlogTemplate = async ({ params, data }) => {
  const selectedFormats = (data?.acf?.selected_format || []).map(Number);

  const [allPosts, topics, allCollections, languages, tags] = await Promise.all(
    [
      getAllPosts(params.lang, 'posts'),
      getBlogTopics(params.lang),
      getBlogFormats(params.lang),
      getBlogMedium(params.lang),
      getAllTags(params.lang),
    ]
  );

  // Filter collections based on the formats selected on the page.
  const collections = (allCollections || []).filter((collection) => {
    return (
      selectedFormats.length === 0 ||
      selectedFormats.includes(Number(collection.id))
    );
  });

  // Filter posts only when formats have been selected.
  const posts = (allPosts || []).filter((post) => {
    if (selectedFormats.length === 0) return true;

    const postFormats = (post?.acf?.format || []).map(Number);

    return postFormats.some((id) => selectedFormats.includes(id));
  });

  // Individual blog post page
  let blogPost = null;

  if (params.deepSlug) {
    blogPost = (allPosts || []).find((post) => post.slug === params.deepSlug);

    if (!blogPost) {
      return (
        <div className='px-8 md:px-16 xl:px-48 py-16'>Blog post not found.</div>
      );
    }

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
          <div className='col-span-12 md:col-span-8 xl:col-span-9'>
            <Link
              href={createLocalLink('/blog')}
              className='mb-4 bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
            >
              Blog
            </Link>

            {blogPost.featured_media > 0 && (
              <div className='md:hidden'>
                <ImageMedia
                  mediaId={blogPost.featured_media}
                  className='aspect-square object-cover'
                />
              </div>
            )}

            <h1 className='text-3xl md:text-6xl font-normal'>
              {decode(blogPost.title?.rendered || '')}
            </h1>

            <div className='mt-1 text-lg font-medium'>
              {format(new Date(blogPost.date), 'yyyy-MM-dd')}
            </div>

            <WysiwygContent
              content={blogPost.content?.rendered}
              className='my-2'
            />
          </div>

          <div className='col-span-12 md:col-span-4 xl:col-span-3'>
            <div className='hidden md:block mb-4'>
              {blogPost.featured_media > 0 && (
                <ImageMedia mediaId={blogPost.featured_media} />
              )}
            </div>

            {blogPost.acf?.sidebar_content && (
              <div className='mt-6'>
                <Sidebar
                  sidebarContent={blogPost.acf.sidebar_content}
                  lang={params.lang}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Archive header image
  const headerImageId = data?.acf?.header_image || data?.featured_media || null;

  const headerImage = headerImageId
    ? await fetchMediaFromId(headerImageId)
    : null;

  return (
    <div className='relative'>
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
      />

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

        <div className='mt-16'>
          <PostsWrapper
            posts={posts}
            topics={topics || []}
            collections={collections || []}
            languages={languages || []}
            tags={tags || []}
            params={params}
            lang={params.lang}
            readMoreLabel={data?.acf?.read_more_label}
            noEntriesText={data?.acf?.no_entries_text}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogTemplate;
