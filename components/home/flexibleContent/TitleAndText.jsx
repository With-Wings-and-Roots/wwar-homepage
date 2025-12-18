import WysiwygContent from '@/components/common/WysiwygContent';
import React from 'react';
import Buttons from '@/components/common/Buttons';

const TitleAndText = ({ data, buttons }) => (
  <div className='flex flex-col items-start px-4 md:px-0'>
    <h2
      className='text-3xl md:text-6xl font-light'
      dangerouslySetInnerHTML={{ __html: data?.title }}
    />
    <WysiwygContent
      content={data?.text}
      className='font-light text-xl mt-2 lg:mt-4'
    />
    {buttons && buttons?.length > 0 ? (
      <div className='mt-4 flex flex-col items-center xl:flex-row gap-4'>
        <Buttons buttons={buttons} />
      </div>
    ) : null}
  </div>
);

export default TitleAndText;
