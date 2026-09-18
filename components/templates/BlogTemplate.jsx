import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import { getAllPosts } from '@/utilities/posts';
import ImageMedia from '@/components/common/ImageMedia';
import WysiwygContent from '@/components/common/WysiwygContent';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import Sidebar from '@/components/timelineEvent/sidebar';
import React from 'react';
import { decode } from 'html-entities';
import { format } from 'date-fns';
import Buttons from '@/components/common/Buttons';
import { getStoryById } from '@/utilities/stories';
import { getMaterialById } from '@/utilities/materials';
import { getProjectById } from '@/utilities/projects';
import { fetchMediaFromId } from '@/utilities/media';

const resolveMedia = async (field) => {
  if (!field) return null;
  if (typeof field === 'number') return await fetchMediaFromId(field);
  return field;
};

const normalizePost = async (post, type) => {
  if (!post) return null;

  const data = post?.[0] ? post[0] : post;

  const featuredImage = await resolveMedia(
    data.featured_media ||
      data.acf?.banner ||
      data.acf?.imagevideo?.[0]?.image ||
      data.acf?.imagevideo?.[0]?.video
  );

  return {
    ...data,
    type,
    featured_image: featuredImage,
  };
};
const BlogTemplate = async ({ params, data, stories, allPersons }) => {
  const posts = await getAllPosts(params.lang, 'posts');

  let blogPost = null;
  if (params.slugs.length === 2) {
    blogPost = posts.find((p) => p.slug === params.slugs[1]);
  }
  let relatedContent = [];

  if (blogPost) {
    const relatedStories = await Promise.all(
      (blogPost.acf?.related_stories || []).map(async (id) => {
        const post = await getStoryById(id);
        return normalizePost(post, 'story');
      })
    );

    const relatedMaterials = await Promise.all(
      (blogPost.acf?.related_materials || []).map(async (id) => {
        const post = await getMaterialById(id);
        return normalizePost(post, 'material');
      })
    );

    const relatedProjects = await Promise.all(
      (blogPost.acf?.related_projects || []).map(async (id) => {
        const post = await getProjectById(id);
        return normalizePost(post, 'project');
      })
    );

    relatedContent = [
      ...relatedMaterials,
      ...relatedProjects,
      ...relatedStories,
    ].filter(Boolean);
  }
  const pageTitle = decode(data.acf?.page_title ?? data.title?.rendered);

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
              {blogPost?.featured_media > 0 && (
                <ImageMedia
                  mediaId={blogPost.featured_media}
                  className='aspect-square object-cover md:hidden'
                />
              )}
              <h1 className='text-3xl md:text-6xl font-normal'>
                {decode(blogPost.title?.rendered || '')}
              </h1>
              <div className='mt-1 text-lg font-medium'>
                {format(blogPost.date, 'yyyy-MM-dd')}
              </div>

              {blogPost.acf?.excerpt && (
                <div className='mt-4 text-lg md:text-xl font-medium'>
                  <WysiwygContent
                    content={blogPost.acf.excerpt}
                    className='my-2'
                  />
                </div>
              )}
              {blogPost.acf?.buttons && (
                <div className='mt-6 mb-6 flex flex-wrap gap-4'>
                  <Buttons buttons={blogPost.acf.buttons} />
                </div>
              )}

              <WysiwygContent
                content={blogPost.content?.rendered}
                className='my-2'
              />
              {relatedContent?.length > 0 && (
                <section className='mt-20'>
                  <h2 className='text-2xl lg:text-4xl font-medium mb-8'>
                    Related Resources
                  </h2>

                  <div className='grid md:grid-cols-3 gap-6'>
                    {relatedContent.map((item, i) => {
                      const type = item.type;

                      return (
                        <Link
                          key={i}
                          href={`/${params.lang}/${type}/${item.slug}`}
                          scroll={false}
                        >
                          <div className='relative aspect-square cursor-pointer overflow-hidden rounded-lg group'>
                            {item.featured_image?.source_url && (
                              <Image
                                src={item.featured_image.source_url}
                                alt={item.title?.rendered || ''}
                                fill
                                className='object-cover transition-transform duration-500 group-hover:scale-110'
                                sizes='100%'
                              />
                            )}

                            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90' />

                            <div className='absolute top-4 left-4 z-20 text-xs uppercase tracking-widest text-wwr_yellow_orange bg-black/70 px-2 py-1 rounded'>
                              {type}
                            </div>

                            <div className='absolute bottom-0 left-0 right-0 p-5 z-20 text-white'>
                              <h3 className='text-lg md:text-xl font-semibold leading-snug relative'>
                                <span className='absolute top-0 left-0 opacity-40 transition-all duration-500 group-hover:opacity-0'>
                                  {item.title?.rendered}
                                </span>

                                <span className='relative opacity-100'>
                                  {item.title?.rendered}
                                </span>
                              </h3>

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

            <div className='col-span-12 md:col-span-4 xl:col-span-3 flex flex-col'>
              <div className='hidden md:block'>
                <ImageMedia mediaId={blogPost.featured_media} />
              </div>

              {blogPost.acf?.sidebar_content && (
                <div className='flex-1 flex items-center'>
                  <Sidebar
                    sidebarContent={blogPost.acf?.sidebar_content}
                    stories={stories}
                    allPersons={allPersons}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className='text-3xl md:text-6xl font-normal'>{pageTitle}</h1>
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
                          {decode(post.title?.rendered || '')}
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
                            href={createLocalLink(
                              `/${params.lang}/blog/${post.slug}`
                            )}
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
