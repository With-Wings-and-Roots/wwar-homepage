import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import gfx_quote from '@/public/quote-black.svg';
import WorkshopQuotes from '@/components/workshops/WorkshopQuotes';
import WorkshopsClientWrapper from '../workshops/WorkshopsClientWrapper';
import { fetchMediaFromId } from '@/utilities/media';

const WorkshopsTemplate = async ({
  data,
  workshopProductionTypes,
  workshopAudience,
  workshopTopics,
  workshops,
  lang = 'en',
}) => {
  const workshopsWithImages = await Promise.all(
    workshops.map(async (workshop) => {
      let poster = workshop?.acf?.hero_image || workshop?.acf?.poster_image;

      if (typeof poster === 'number') {
        poster = await fetchMediaFromId(poster);
      }

      return {
        ...workshop,
        posterUrl: poster?.source_url || poster?.url || null,
      };
    })
  );
  return (
    <div>
      <div className='h-screen -mt-20 relative'>
        <Image
          src={data.acf?.intro_header_image}
          alt={data.acf?.page_title}
          fill={true}
          className='!fixed object-cover'
        />
        <div className='px-8 md:px-16 xl:px-48 pt-44 relative'>
          <h1
            className='text-3xl md:text-6xl font-normal'
            dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
          />
        </div>
      </div>
      <div className='px-8 md:px-16 xl:px-48 relative bg-white'>
        <div
          className='absolute left-0 right-0 top-0 bottom-0'
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          <Image
            src={gfx_bg_orange}
            alt=''
            className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
          />
        </div>
        <div className='grid grid-cols-8 auto-cols-max pb-16'>
          <div className='col-span-8 xl:col-span-5 pt-12'>
            <WysiwygContent
              content={data.acf?.intro_text}
              className='text-lg font-light'
            />
          </div>
          <div className='col-span-6 col-start-2 mt-6 xl:mt-0 xl:col-span-3 xl:col-start-6'>
            <div className='bg-wwr_yellow_orange h-[360px] xl:min-h-[500px] xl:h-[calc(100%+70px)] xl:-mt-[70px] xl:ml-16'>
              <div className='flex p-6'>
                <Image
                  src={gfx_quote}
                  alt=''
                  width={48}
                  height={48}
                  className='ml-auto !w-[26px] !h-[26px] xl:!w-[48px] xl:!h-[48px]'
                />
              </div>
              <div className='p-6 pt-0 text-right xl:text-lg font-light'>
                <div className='relative'>
                  <WorkshopQuotes quotes={data.acf?.intro_quotes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className='px-8 md:px-16 xl:px-48 relative bg-black'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <Image
          src={gfx_bg_orange}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
        />
        <div className='text-wwr_yellow_orange text-xl lg:text-3xl xl:text-5xl text-center py-14 leading-relaxed'>
          <WysiwygContent content={data.acf?.info_title} />
        </div>
      </div>
      <div className='px-8 md:px-16 xl:px-48 py-16 relative bg-white'>
        <h1 className='text-xl md:text-2xl font-bold mb-6'>
          {lang === 'en' ? 'All Workshops' : 'Alle Workshops'}
        </h1>

        {/* Workshop Grid */}
        <WorkshopsClientWrapper
          workshops={workshopsWithImages}
          workshopProductionTypes={workshopProductionTypes}
          lang={lang}
          workshopAudience={workshopAudience}
          workshopsTopics={workshopTopics}
        />
      </div>
    </div>
  );
};

export default WorkshopsTemplate;
