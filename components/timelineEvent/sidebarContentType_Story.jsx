import React from 'react';
import QuotationMark from '@/components/page/quotationMark';
import Excerpt from '@/components/page/excerpt';

const SidebarContentTypeStory = async ({ content }) => {

  //Placeholder contents are used for now

  return (
    <div>
      <div className={`bg-wwr_yellow_orange text-wwr_white text-lg w-max px-2`}>Featured Story</div>

      <div className={`w-full h-40 my-6 bg-green-100 flex items-center justify-center`}>Video</div>
      <div className={`w-12 pb-2`}> <QuotationMark /></div>

      <Excerpt excerpt={`Disconnected from the 'Nation of Immigrants'`} color={"gray"}/>
      <div className={`text-lg mb-10`}>Aisha</div>
      <div className={`h-[2px] w-full bg-wwr_yellow_orange`}></div>
    </div>
  );
};
export default SidebarContentTypeStory;
