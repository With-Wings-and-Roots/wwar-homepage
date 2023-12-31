import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { createLocalLink } from '@/utilities/links';
import Link from 'next/link';

const TakePartTemplate = ({ data }) => {
  const renderSection = (data, key) => (
    <div
      className='grid grid-cols-4 gap-6 border-t border-t-gray-200 mt-8 pt-8'
      key={key}
    >
      <div className='col-span-1'>
        {data?.section_image?.length > 0 && (
          <Image
            src={data.section_image}
            alt={data.section_title}
            width='600'
            height='600'
            className={`aspect-square object-cover`}
          />
        )}
      </div>
      <div className='col-span-4 lg:col-span-3 flex flex-col'>
        <h2 className='text-xl lg:text-3xl font-medium'>
          {data?.section_title}
        </h2>
        <WysiwygContent
          content={data?.section_text}
          className='mt-2 md:text-lg font-light'
        />

        <div className='mt-auto pt-6 flex'>
          {data?.section_button?.linked_page?.length > 0 &&
            data?.section_button?.label?.length > 0 && (
              <div className='flex'>
                <Link
                  href={createLocalLink(data.section_button.linked_page)}
                  className='bg-wwr_yellow_orange text-xl font-light px-5 py-2 hover:text-white transition-all uppercase'
                >
                  {data.section_button.label}
                </Link>
              </div>
            )}
          {data.external_icon_links?.length > 0 && (
            <div className='ml-auto flex'>
              {data.external_icon_links?.map((link, lI) => (
                <div key={lI} className='ml-6'>
                  <a
                    href={link.external_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={link.icon}
                      alt=''
                      width={32}
                      height={32}
                      className='!w-auto !h-[32px] object-contain'
                    />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className='px-8 md:px-16 xl:px-48 pt-8 pb-16 relative'
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      <h1
        dangerouslySetInnerHTML={{ __html: data.title?.rendered }}
        className='text-3xl md:text-6xl font-normal'
      />
      <WysiwygContent
        content={data.acf?.intro_text}
        className='text-lg md:text-xl font-light'
      />
      {data.acf?.sections.map((sec, sI) => renderSection(sec, sI))}
    </div>
  );
};

export default TakePartTemplate;
