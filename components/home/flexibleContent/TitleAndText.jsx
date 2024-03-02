import WysiwygContent from '@/components/common/WysiwygContent';
import React from 'react';

const TitleAndText = ({ data }) => (
  <div className='lg:max-w-[66%]'>
    <h2
      className='text-2xl md:text-4xl font-light'
      dangerouslySetInnerHTML={{ __html: data?.title }}
    />
    <WysiwygContent
      content={data?.text}
      className='font-light text-lg mt-2 lg:mt-4'
    />
  </div>
);

export default TitleAndText;
