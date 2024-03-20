import WysiwygContent from '@/components/common/WysiwygContent';
import React from 'react';
import Image from 'next/image';
import Buttons from '@/components/common/Buttons';

const ImageTitleAndText = ({ data, buttons }) => (
  <div className='grid grid-cols-2 gap-6 lg:gap-12'>
    <div className='col-span-2 lg:col-span-1'>
      {data?.image_link && data?.image_link.length > 0 ? (
        <a href={data.image_link} target='_blank' rel='noopener noreferrer'>
          <Image
            src={data?.image}
            alt={data?.title}
            width={1000}
            height={1000}
          />
        </a>
      ) : (
        <Image src={data?.image} alt={data?.title} width={1000} height={1000} />
      )}
    </div>
    <div className='col-span-2 lg:col-span-1'>
      <h2
        className='text-2xl md:text-4xl font-light'
        dangerouslySetInnerHTML={{ __html: data?.title }}
      />
      <WysiwygContent
        content={data?.text}
        className='font-light text-lg mt-2 lg:mt-4'
      />
      {buttons && buttons?.length > 0 ? (
        <div className='mt-4 flex flex-col items-center xl:flex-row gap-4'>
          <Buttons buttons={buttons} />
        </div>
      ) : null}
    </div>
  </div>
);

export default ImageTitleAndText;
