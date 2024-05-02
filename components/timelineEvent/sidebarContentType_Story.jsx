import React from 'react';
import QuotationMark from '@/components/page/quotationMark';
import Excerpt from '@/components/page/excerpt';
import { createVideoEmbedLink } from '@/utilities/links';

const SidebarContentTypeStory = async ({ content, stories, allPersons }) => {
  const story =
    Array.isArray(content.sidebar_content_featured_story) &&
    content.sidebar_content_featured_story?.length > 0
      ? stories.find((s) => s.id === content.sidebar_content_featured_story[0])
      : null;
  const personId = story?.person?.[0];
  const person = personId ? allPersons?.find((p) => p.id === personId) : null;

  return (
    <div>
      <div className={`bg-wwr_yellow_orange text-wwr_white text-lg w-max px-2`}>
        Featured Story
      </div>

      <div
        className={`w-full h-40 my-6 bg-green-100 flex items-center justify-center`}
      >
        <iframe
          className='w-full aspect-video'
          src={createVideoEmbedLink(story?.acf?.video_embed)}
        />
      </div>
      <div className={`w-12 pb-2`}>
        {' '}
        <QuotationMark />
      </div>

      <Excerpt excerpt={story?.title?.rendered} color={'gray'} />
      <div className={`text-lg mb-10`}>{person?.name}</div>
      <div className={`h-[2px] w-full bg-wwr_yellow_orange`}></div>
    </div>
  );
};
export default SidebarContentTypeStory;
