import React from 'react';
import parse from 'html-react-parser';

const SidebarContentTypeSideNote = async ({ content }) => {
  const {
    sidebar_content_sidenote: { title },
  } = content;

  // {
  //   sidebar_content_type: 'sidenote',
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
  //   sidebar_content_sidenote: {
  //     title: 'The <strong>Irish and Africans</strong> brought traditions of <strong>music, dance</strong>, and <strong>storytelling</strong> to the Americas, paving the way for <strong>cultural exchange</strong> and transformation.',
  //     caption: ''
  //   },
  //   sidebar_content_featured_story: null,
  //   text: ''
  // }

  return (
    <div className='text-4xl text-wwr_turquoise leading-snug font-extralight py-4'>
      {parse(title)}
    </div>
  );
};

export default SidebarContentTypeSideNote;
