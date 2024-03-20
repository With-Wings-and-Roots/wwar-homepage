import WysiwygContent from '@/components/common/WysiwygContent';
import React from 'react';
import Buttons from '@/components/common/Buttons';

const TitleAndText = ({ data, buttons }) => (
  <div className='lg:max-w-[66%]'>
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
);

export default TitleAndText;
