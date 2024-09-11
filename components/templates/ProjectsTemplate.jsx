import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { Fragment } from 'react';
import {
  createHashString,
  createLocalLink,
  isExternalLink,
} from '@/utilities/links';
import Link from 'next/link';

const ProjectsTemplate = ({ data }) => {
  const renderBlock = (block) => {
    switch (block.acf_fc_layout) {
      case 'text':
        return (
          <WysiwygContent
            content={block.text}
            className='mt-2 md:text-lg font-light'
          />
        );
      case 'content_row_image_title_text':
        return (
          <div className='grid grid-cols-4 gap-6 mt-8 pt-8'>
            <div className='col-span-1'>
              {block.image?.sizes?.thumbnail ? (
                <Image
                  src={block.image.sizes.thumbnail}
                  alt={block.image.alt}
                  width={block.image.sizes['thumbnail-width']}
                  height={block.image.sizes['thumbnail-height']}
                />
              ) : null}
            </div>
            <div className='col-span-4 lg:col-span-3 flex flex-col'>
              <h6 className='text-xl lg:text-3xl font-medium'>{block.title}</h6>
              <WysiwygContent
                content={block.text}
                className='mt-2 md:text-lg font-light'
              />
            </div>
          </div>
        );
      case 'content_column_image_text':
        return (
          <div className='flex mt-8 pt-8'>
            <div className='flex-shrink-0'>
              {block.image?.sizes?.thumbnail ? (
                <Image
                  src={block.image.sizes.thumbnail}
                  alt={block.image.alt}
                  width={block.image.sizes['thumbnail-width']}
                  height={block.image.sizes['thumbnail-height']}
                />
              ) : null}
            </div>
            <div className='flex-grow ml-4'>
              <h6 className='text-xl lg:text-3xl font-medium'>{block.title}</h6>
              <WysiwygContent
                content={block.text}
                className='mt-2 md:text-lg'
              />
            </div>
          </div>
        );
      case 'title_and_text':
        return (
          <div className='mt-8 pt-8'>
            <h1 className='text-lg lg:text-xl font-medium'>{block.title}</h1>
            <WysiwygContent content={block.text} className='mt-2 md:text-lg' />
          </div>
        );
      case 'buttons':
        return (
          <div className='flex flex-col md:flex-row gap-2'>
            {block.buttons?.map((button, bI) => (
              <div className='flex' key={bI}>
                <Link
                  href={
                    isExternalLink(button.url)
                      ? button.url
                      : createLocalLink(button.url)
                  }
                  target={button.open_in_new_tab ? '_blank' : '_self'}
                  rel={button.open_in_new_tab ? 'noopener noreferrer' : ''}
                  className='bg-wwr_yellow_orange text-xl font-light px-5 py-2 hover:text-white transition-all uppercase'
                >
                  {button.label}
                </Link>
              </div>
            ))}
          </div>
        );
      default:
        // console.log('no matching type found');
        // console.log(block);
        break;
    }
  };

  const renderEntry = (title, mainImage, blocks, eI) => {
    if (mainImage) {
      return (
        <div
          className='grid grid-cols-4 gap-6 border-t border-t-gray-200 mt-8 pt-8'
          key={eI}
          id={createHashString(title)?.replace('#', '')}
        >
          <div className='col-span-1'>
            <Image
              src={mainImage.sizes.medium}
              alt={mainImage.alt}
              width={mainImage.sizes['medium-width']}
              height={mainImage.sizes['medium-height']}
            />
          </div>
          <div className='col-span-4 lg:col-span-3 flex flex-col'>
            <h2 className='text-xl lg:text-3xl font-medium'>{title}</h2>
            {blocks?.map((bl) => renderBlock(bl))}
          </div>
        </div>
      );
    } else if (blocks?.length > 0) {
      return (
        <div
          className='border-t border-t-gray-200 mt-8 pt-8'
          key={eI}
          id={createHashString(title)?.replace('#', '')}
        >
          <h2 className='text-xl lg:text-3xl font-medium'>{title}</h2>
          {blocks?.map((bl) => renderBlock(bl))}
        </div>
      );
    }
  };

  return (
    <div
      className='px-8 md:px-16 lg:px-64 pt-8 pb-16 relative'
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      <h1
        dangerouslySetInnerHTML={{ __html: data.title?.rendered }}
        className='text-3xl md:text-6xl font-normal text-center'
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

      {data.acf?.entries.map((ent, eI) =>
        renderEntry(ent.title, ent.main_image, ent.blocks, eI)
      )}
    </div>
  );
};

export default ProjectsTemplate;
