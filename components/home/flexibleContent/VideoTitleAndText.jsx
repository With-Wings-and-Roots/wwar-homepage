import WysiwygContent from '@/components/common/WysiwygContent';
import React from 'react';
import Buttons from "@/components/common/Buttons";

const VideoTitleAndText = ({ data, buttons }) => (
  <div className='grid grid-cols-2 gap-6 lg:gap-12'>
    <div className='col-span-2 lg:col-span-1'>
      <div
        className='video'
        dangerouslySetInnerHTML={{ __html: data?.video }}
      />
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
          <Buttons buttons={buttons}/>
        </div>
      ) : null}
    </div>
  </div>
);

export default VideoTitleAndText;
