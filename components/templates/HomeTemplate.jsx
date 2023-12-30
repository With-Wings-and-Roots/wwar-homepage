import Image from 'next/image';
import gfx_bg_blue from '@/public/bg_blue.png';
import gfx_arrow_down from '@/public/arrow-down--circle-white.svg';
import WysiwygContent from '@/components/common/WysiwygContent';
import PersonImageSlider from '@/components/common/PersonImageSlider';
import { createLocalLink } from '@/utilities/links';
import ScrollToElementButton from '@/components/common/ScrollToElementButton';

const HomeTemplate = ({ data }) => {
  return (
    <div className='-mt-20'>
      <PersonImageSlider
        imageUrls={data.acf?.images?.map((i) => i.image)}
        height={100}
        interval={7000}
      />
      <div className='-mt-20 h-20 flex justify-center items-center relative'>
        <ScrollToElementButton elementId='fromHere'>
          <Image
            src={gfx_arrow_down}
            alt=''
            width={32}
            height={32}
            className='hover:scale-110 transition-all'
          />
        </ScrollToElementButton>
      </div>
      <div
        className='px-8 md:px-16 lg:px-64 relative bg-black text-white py-20 relative'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
        id='fromHere'
      >
        <Image
          src={gfx_bg_blue}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-50'
        />
        <div className='grid grid-cols-2 gap-12'>
          <div className='col-span-2 lg:col-span-1'>
            <div
              className='video'
              dangerouslySetInnerHTML={{ __html: data.acf?.film_video }}
            />
          </div>
          <div className='col-span-2 lg:col-span-1'>
            <h2 className='text-2xl lg:text-4xl font-medium'>
              {data.acf?.film_intro_title}
            </h2>
            <WysiwygContent
              content={data.acf?.film_text}
              className='font-light text-lg mt-4'
            />
            <a
              href={createLocalLink(data.acf?.film_button?.url)}
              className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex mt-6'
            >
              {data.acf?.film_button?.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
