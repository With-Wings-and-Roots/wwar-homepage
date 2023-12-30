import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { createHashString, createLocalLink } from '@/utilities/links';
import Link from 'next/link';
import { Fragment } from 'react';

const MaterialsTemplate = ({ data }) => {
  const renderImageVideo = (obj) => {
    if (obj.acf_fc_layout === 'image') {
      return (
        <Image
          src={obj?.image?.url}
          alt={obj?.image?.alt}
          width={obj?.image?.width}
          height={obj?.image?.height}
          className={
            obj?.image?.width / obj?.image?.height > 1
              ? '!w-[80%] xl:!w-[470px] !h-auto'
              : '!w-[50%] !h-auto xl:!h-[440px] xl:!w-auto'
          }
        />
      );
    } else if (obj.acf_fc_layout === 'video') {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: obj?.video }}
          className='video !w-[80%] xl:!w-[470px]'
        />
      );
    }

    return null;
  };

  const getUrlFromButtonTarget = (btn) => {
    if (btn.target[0].file && btn.target[0].file.url) {
      return btn.target[0].file.url;
    } else if (btn.target[0].link) {
      return btn.target[0].link;
    } else if (btn.target[0].page) {
      return btn.target[0].page;
    }
    return '#';
  };

  const renderButtons = (btns) => {
    return btns.map((btn, bI) => (
      <Link
        key={bI}
        href={createLocalLink(getUrlFromButtonTarget(btn))}
        className='bg-wwr_yellow_orange text-sm lg:text-lg  font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex'
      >
        {btn.label}
      </Link>
    ));
  };

  const renderSection = (entry, key) => (
    <div
      className='flex flex-col items-center xl:items-start xl:flex-row border-t border-t-gray-200 mt-12 pt-10'
      key={key}
    >
      <div className='w-full xl:w-auto xl:mr-8 shrink-0'>
        <div className='w-full flex justify-center xl:w-auto'>
          {renderImageVideo(entry.imagevideo[0])}
        </div>
        {entry?.buttons_position === 'left' && (
          <div className='mt-4 xl:mt-6 flex items-center xl:items-start flex-col gap-4'>
            {renderButtons(entry?.buttons)}
          </div>
        )}
      </div>
      <div className='mt-6 xl:mt-0'>
        <h1
          dangerouslySetInnerHTML={{ __html: entry?.title }}
          className='text-xl xl:text-3xl'
        />
        <WysiwygContent
          content={entry?.text}
          className='mt-2 md:text-lg font-light'
        />
        {entry?.buttons_position === 'right' && (
          <div className='mt-4 flex flex-col items-center xl:flex-row gap-4'>
            {renderButtons(entry?.buttons)}
          </div>
        )}
      </div>
    </div>
  );

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
        dangerouslySetInnerHTML={{ __html: data.title?.rendered }}
        className='text-3xl md:text-6xl font-light text-center'
      />
      <div className='text-center text-lg font-light xl:px-16'>
        {data.acf?.entries?.map((entry, eI) => (
          <Fragment key={eI}>
            <a
              href={createHashString(entry.title)}
              className='hover:text-wwr_yellow_orange_hovered transition-all'
            >
              {entry.title}
            </a>
            {eI < data.acf?.entries?.length - 1 && <>{' | '}</>}
          </Fragment>
        ))}
      </div>
      {data.acf?.entries?.map((ent, eI) => renderSection(ent, eI))}
    </div>
  );
};

export default MaterialsTemplate;
