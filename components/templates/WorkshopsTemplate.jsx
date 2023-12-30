import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import gfx_quote from '@/public/quote-black.svg';
import WorkshopQuotes from '@/components/workshops/WorkshopQuotes';

const WorkshopsTemplate = ({ data }) => {
  return (
    <div>
      <div className='h-screen -mt-20 relative'>
        <Image
          src={data.acf?.intro_header_image}
          alt={data.acf?.page_title}
          fill={true}
          className='!fixed object-cover'
        />
        <div className='px-8 md:px-16 lg:px-64 pt-44 relative'>
          <h1
            className='text-3xl md:text-6xl font-normal'
            dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
          />
        </div>
      </div>
      <div className='px-8 md:px-16 lg:px-64 relative bg-white'>
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
        className='px-8 md:px-16 lg:px-64 relative bg-black'
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
      <div className='px-8 md:px-16 lg:px-64 py-16 relative bg-white'>
        <h2 className='font-medium text-xl lg:text-3xl'>
          {data.acf?.workshops_title}
        </h2>
        <div className='grid grid-cols-3 gap-8 mt-6'>
          {data.acf?.workshops?.map((workshop, wI) => (
            <div
              key={wI}
              className='col-span-3 xl:col-span-1 p-8 bg-wwr_yellow_orange flex flex-col lg:hover:scale-105 transition-all'
            >
              <h3 className='font-bold text-lg lg:text-2xl'>
                {workshop.title}
              </h3>
              <div className='border-b border-black pt-3 mb-3' />
              <div className='lg:text-lg font-light'>
                {workshop.description}
              </div>
              <div className='mt-4 font-light'>
                <div>
                  <b>For:</b> {workshop.for}
                </div>
                <div>
                  <b>Duration:</b> {workshop.duration}
                </div>
                <div>
                  <b>Type:</b> {workshop.type}
                </div>
              </div>
              <div className='mt-auto pt-6 flex'>
                <a
                  href={workshop.link_to_booking_form?.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-black text-wwr_yellow_orange_hovered hover:text-white px-4 py-2 transition-all uppercase text-xl'
                >
                  {workshop.link_to_booking_form?.label}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className='border-b border-black pt-16 mb-8' />
        <h2 className='font-medium text-xl lg:text-3xl'>
          {data.acf?.past_workshops_title}
        </h2>
        {data.acf?.past_workshops?.map((workshop, wI) => (
          <div key={wI} className='mt-4'>
            <h3 className='text-lg lg:text-xl font-medium'>{workshop.title}</h3>
            <div className='lg:text-lg font-light'>
              <WysiwygContent content={workshop.text} />
            </div>
          </div>
        ))}
        <div className='grid grid-cols-3 gap-8 mt-8'>
          {data.acf?.videos?.map((video, vI) => (
            <div key={vI} className='col-span-3 md:col-span-1'>
              <div
                dangerouslySetInnerHTML={{ __html: video.video }}
                className='video'
              />
              <div className='font-light mt-2'>{video.caption}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='px-8 md:px-16 lg:px-64 relative bg-wwr_light'>
        <div className='grid grid-cols-6 gap-8'>
          <div className='col-span-6 lg:col-span-3 xl:col-span-4 lg:order-2 relative'>
            <div className='-mx-8 md:-mx-16 lg:ml-0 lg:-mr-64 h-[300px] lg:h-full relative'>
              <Image
                src={data.acf?.info_image}
                alt=''
                fill={true}
                className='object-cover object-left'
              />
            </div>
          </div>
          <div className='col-span-6 lg:col-span-3 xl:col-span-2 py-12'>
            <WysiwygContent content={data.acf?.info_text} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopsTemplate;
