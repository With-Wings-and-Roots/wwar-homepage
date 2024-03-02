import WysiwygContent from '@/components/common/WysiwygContent';
import React from 'react';
import Image from 'next/image';

const ImageTitleAndText = ({ data }) => (
  <div className='grid grid-cols-2 gap-6 lg:gap-12'>
    <div className='col-span-2 lg:col-span-1'>
      <Image src={data?.image} alt={data?.title} width={1000} height={1000} />
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
    </div>
  </div>
);

export default ImageTitleAndText;
