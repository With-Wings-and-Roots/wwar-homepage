import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';

const IdeasAndConversationTemplate = ({
  data,
  posts,
  lang = 'en',

  params,
}) => {
  console.log('IdeasAndConversationTemplate data:', posts[0].acf, data?.acf);
  const selectedFormatIDs = data?.acf?.selected_formats || [];
  const visiblePosts = posts.filter((post) =>
    selectedFormatIDs.includes(post?.acf?.format)
  );

  return (
    <div className='px-8 md:px-16 xl:px-48 py-16 relative -mt-10'>
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
      />

      <div className='mt-6'>
        <h1 className='text-3xl md:text-6xl font-bold mb-6'>
          {data?.title?.rendered || data?.acf?.title}
        </h1>

        <WysiwygContent content={data?.acf?.intro_text} />

        {/* <PostsWrapper
          posts={visiblePosts}
          lang={lang}
          topics={topics}
          languages={languages}
          params={params}
        /> */}
      </div>
    </div>
  );
};

export default IdeasAndConversationTemplate;
