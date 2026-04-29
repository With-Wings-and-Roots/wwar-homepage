import React from 'react';
import QuotationMark from '@/components/page/quotationMark';
import Excerpt from '@/components/page/excerpt';
import { getPerson, getStory } from '@/utilities/stories';

const SidebarContentTypeStory = async ({ content, lang }) => {
  const story =
    Array.isArray(content.sidebar_content_featured_story) &&
    content.sidebar_content_featured_story.length > 0
      ? await getStory(content.sidebar_content_featured_story[0]?.ID, lang)
      : null;
  const personId = story?.person?.[0];
  const person = await getPerson(personId, lang);

  return story ? (
    <div>
      <div className={`bg-wwr_yellow_orange text-wwr_white text-lg w-max px-2`}>
        Featured Story
      </div>

      <div
        className={`w-full h-40 my-6 bg-green-100 flex items-center justify-center`}
      >
        <div className='w-full aspect-video [&_iframe]:w-full [&_iframe]:h-full'>
          <div
            dangerouslySetInnerHTML={{
              __html: story?.acf?.video_embed,
            }}
          />
        </div>
      </div>
      <div className={`w-12 pb-2`}>
        {' '}
        <QuotationMark />
      </div>

      <div className='-mb-6'>
        <Excerpt excerpt={story?.title?.rendered} color={'gray'} />
      </div>
      <div className={`text-lg mb-4`}>{person?.name}</div>
      <div className={`h-[2px] w-full bg-wwr_yellow_orange`}></div>
    </div>
  ) : null;
};
export default SidebarContentTypeStory;
