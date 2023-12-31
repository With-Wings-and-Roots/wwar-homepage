import WysiwygContent from '@/components/common/WysiwygContent';
import PersonImageSlider from '@/components/common/PersonImageSlider';
import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';

const AboutTemplate = ({ data }) => {
  return (
    <div>
      <div
        className='relative pb-16 pt-8'
        style={{
          clipPath: 'polygon(-100px 0, 100% -100px, 100% 100%, 0 100%)',
        }}
      >
        <Image
          src={gfx_bg_orange}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-30'
        />
        {data.acf?.general_entries?.map((entry, eI) => (
          <div key={eI} className='px-8 text-center mt-5 md:px-16 lg:px-64'>
            <h2 className='text-3xl'>{entry.title}</h2>
            <WysiwygContent
              content={entry.text}
              className='font-light text-lg'
            />
          </div>
        ))}
      </div>
      <div
        className='relative px-8 md:px-16 xl:px-48 py-16 bg-black text-white text-center'
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <Image
          src={gfx_bg_orange}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
        />
        <h2 className='text-4xl text-wwr_yellow_orange'>
          {data.acf?.vision_title}
        </h2>
        <WysiwygContent
          content={data.acf?.vision_text}
          className='font-light text-lg mt-8'
        />
      </div>
      <PersonImageSlider imageUrls={data.acf?.images?.map((i) => i.image)} />
      <div className='px-8 md:px-16 xl:px-48 py-16 grid grid-cols-3 gap-8'>
        <div className='col-span-3 md:col-span-2'>
          <h2 className='text-3xl'>{data.acf?.history_title}</h2>
          <WysiwygContent
            content={data.acf?.history_text}
            className='font-light text-lg mt-4'
          />
        </div>
        <div className='col-span-3 md:col-span-1'>
          {data.acf?.history_images?.map((image, iI) => (
            <div key={iI} className='mb-4'>
              <Image
                src={image.image}
                alt={image.description}
                width={500}
                height={500}
              />
              <p className='text-sm'>{image.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTemplate;
