import { getAllStories, getStoryById } from '@/utilities/stories';
import React from 'react';

const SidebarContentTypeStory = async ({ content }) => {
  const { sidebar_content_featured_story } = content;

  const allStories = await getAllStories('de');

  const story = allStories.find((story) => {
    return story.id === sidebar_content_featured_story;
  });

  // const story = await getStoryById(sidebar_content_featured_story)

  // console.log(sidebar_content_featured_story)

  // console.log(content)

  // const {sidebar_content_image:{image, title, caption, display_credit, credit, credit_link},  sidebar_content_quote, sidebar_content_sidenote, sidebar_content_featured_story, text } = content

  // {
  //   sidebar_content_type: 'story',
  //   sidebar_content_video: {
  //     video: null,
  //     title: '',
  //     caption: '',
  //     display_credit: false,
  //     credit: '',
  //     credit_link: ''
  //   },
  //   sidebar_content_image: {
  //     image: null,
  //     image_orientation: 'fit',
  //     title: '',
  //     caption: '',
  //     display_credit: false,
  //     credit: '',
  //     credit_link: ''
  //   },
  //   sidebar_content_quote: { quote: '', quote_author: '', quote_source: '' },
  //   sidebar_content_sidenote: { title: '', caption: '' },
  //   sidebar_content_featured_story: 1723,
  //   text: ''
  // }

  return (
    <div>
      {/* <Image className={`w-50 h-50 mb-1`} src={mediaUrl} height={1000} width={1000} alt={title}/>
        {display_credit && <Link className='font-thin text-xs hover:underline' href={`credit_link`}> {credit}</Link>}
        <div className='text-2xl py-4'>{title}</div>
        <div className='text-base text-wwr_gray_storm font-light leading-6'>{caption}</div> */}
    </div>
  );
};
export default SidebarContentTypeStory;
