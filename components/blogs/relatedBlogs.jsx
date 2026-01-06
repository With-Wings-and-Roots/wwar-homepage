import Image from 'next/image';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import { getPostById } from '@/utilities/posts';
import { fetchMediaFromId } from '@/utilities/media';

const RelatedBlogs = async ({ relatedBlogIds, lang = 'en' }) => {
  if (!relatedBlogIds?.length) return null;

  // Fetch blogs and their featured media
  const blogs = await Promise.all(
    relatedBlogIds.map(async (id) => {
      const blog = await getPostById(id, lang, 'posts');
      const media = blog?.featured_media
        ? await fetchMediaFromId(blog.featured_media)
        : null;
      return { ...blog, media };
    })
  );

  return (
    <section className='px-8 md:px-16 xl:px-48 py-12 bg-yellow-50 text-black'>
      <h2 className='text-3xl md:text-5xl font-light mb-8'>
        {lang === 'en' ? 'Related News & Blogs' : 'Ähnliche Blogs'}
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch'>
        {blogs.map((blog) => (
          <Link
            key={blog?.id}
            href={createLocalLink(`/blog/${blog?.slug}`)}
            className='block h-full overflow-hidden flex flex-col bg-white'
          >
            {/* Image wrapper (fixed height for consistency) */}
            <div className='relative w-full h-40 sm:h-36 bg-gray-200'>
              {blog.media && (
                <Image
                  src={blog.media.source_url}
                  alt={blog?.title?.rendered}
                  fill
                  className='object-cover'
                />
              )}
            </div>

            {/* Content */}
            <div className='p-4 bg-wwr_yellow_orange flex-1 flex items-end'>
              <h3 className='text-lg font-medium text-black line-clamp-2'>
                {blog?.title?.rendered}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
