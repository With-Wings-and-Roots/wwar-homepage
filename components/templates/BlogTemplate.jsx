import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import { getAllPosts } from '@/utilities/posts';
import ImageMedia from '@/components/common/ImageMedia';
import { format } from 'date-fns';
import WysiwygContent from '@/components/common/WysiwygContent';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import Sidebar from '@/components/timelineEvent/sidebar';
import React from 'react';

const BlogTemplate = async ({ params, data }) => {
  const posts = await getAllPosts(params.lang, 'posts');

  let blogPost = null;
  if (params.slugs.length === 2) {
    blogPost = posts.find((p) => p.slug === params.slugs[1]);
  }

  return (
    <div
      className='px-8 md:px-16 xl:px-48 py-16 relative flex-1'
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      {params.slugs.length === 2 ? (
        <>
          <div className='grid grid-cols-12 gap-8'>
            <div className='col-span-12 md:col-span-8 xl:col-span-9'>
              <Link
                href={createLocalLink(`/blog`)}
                className='mb-4 bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
              >
                Blog
              </Link>
              {blogPost?.featured_media > 0 && (
                <ImageMedia
                  mediaId={blogPost.featured_media}
                  className='aspect-square object-cover md:hidden'
                />
              )}
              <h1 className='text-3xl md:text-6xl font-normal'>
                {blogPost.title?.rendered}
              </h1>
              <div className='mt-1 text-lg font-medium'>
                {format(blogPost.date, 'yyyy-MM-dd')}
              </div>
              <WysiwygContent
                content={blogPost.content?.rendered}
                className='my-2'
              />
            </div>
            <div className='col-span-12 md:col-span-4 xl:col-span-3'>
              <div className='hidden md:block mb-4'>
                <ImageMedia mediaId={blogPost.featured_media} />
              </div>
              {blogPost.acf?.sidebar_content && (
                <Sidebar sidebarContent={blogPost.acf?.sidebar_content} />
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1
            dangerouslySetInnerHTML={{
              __html: data.acf?.page_title ?? data.title?.rendered,
            }}
            className='text-3xl md:text-6xl font-normal'
          />
          <div className='mt-16'>
            {posts?.length > 0 ? (
              <>
                {posts
                  ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                  ?.map((post, pI) => (
                    <div className='grid grid-cols-12 gap-8 my-8' key={pI}>
                      <div className='col-span-12 md:col-span-4 xl:col-span-3'>
                        {post?.featured_media > 0 && (
                          <ImageMedia mediaId={post.featured_media} />
                        )}
                      </div>
                      <div className='col-span-12 md:col-span-8 xl:col-span-9 flex flex-col'>
                        <h2 className='text-2xl font-medium'>
                          {post.title?.rendered}
                        </h2>
                        <div className='-mt-1 text-lg font-medium'>
                          {format(post.date, 'yyyy-MM-dd')}
                        </div>
                        <WysiwygContent
                          content={post.excerpt?.rendered}
                          className='my-2'
                        />
                        <div className='mt-auto'>
                          <Link
                            href={createLocalLink(`/blog/${post.slug}`)}
                            className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
                          >
                            {data.acf?.read_more_label}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              <div className='mt-8'>{data.acf?.no_entries_text}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogTemplate;
