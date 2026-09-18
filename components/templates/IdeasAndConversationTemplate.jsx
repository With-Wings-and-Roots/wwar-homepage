import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaFromId } from '@/utilities/media';

const IdeasAndConversationTemplate = async ({
  data,
  posts,
  lang = 'en',
  params,
}) => {
  console.log(
    'IdeasAndConversationTemplate data:',
    posts[0]?.acf,
    data
  );

  const selectedFormatIDs = data?.acf?.selected_formats || [];

  const visiblePosts = posts.filter((post) =>
    selectedFormatIDs.includes(post?.acf?.format)
  );

  // Get featured image
  const featuredImage = data?.featured_media
    ? await fetchMediaFromId(data.featured_media)
    : null;

  const imageUrl =
    featuredImage?.source_url ||
    featuredImage?.media_details?.sizes?.full?.source_url;

  return (
    <div className='relative'>
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
      />

      {/* FEATURED IMAGE */}
      {imageUrl && (
        <div className='relative w-full h-[90vh]'>
          <Image
            src={imageUrl}
            alt={data?.title?.rendered || ''}
            fill
            priority
            className='object-cover'
            sizes='100vw'
          />
        </div>
      )}

      {/* CONTENT */}
      <div className='px-8 md:px-16 xl:px-48 py-16'>
        <div className='mt-6'>
          <h1 className='text-3xl md:text-6xl font-bold mb-6'>
            {data?.title?.rendered || data?.acf?.title}
          </h1>

          <WysiwygContent content={data?.acf?.intro_text} />
        </div>
      </div>
    </div>
  );
};

export default IdeasAndConversationTemplate;