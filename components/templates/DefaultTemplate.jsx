import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';

const DefaultTemplate = ({ data }) => {
  return (
    <div
      className='px-8 md:px-16 lg:px-64 py-16 relative'
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      <h1
        dangerouslySetInnerHTML={{
          __html: data.acf?.page_title ?? data.title?.rendered,
        }}
        className='text-3xl md:text-6xl font-normal text-center'
      />
      {data.acf?.text?.length > 0 && (
        <WysiwygContent
          content={data.acf?.text}
          className='text-lg md:text-xl mt-16 font-light'
        />
      )}
    </div>
  );
};

export default DefaultTemplate;
