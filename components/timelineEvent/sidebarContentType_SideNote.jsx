import React from 'react';
import parse from 'html-react-parser';

const SidebarContentTypeSideNote = async ({ content }) => {
  const {
    sidebar_content_sidenote: { title },
  } = content;

  return (
    <div className='text-2xl lg:text-4xl text-wwr_turquoise leading-snug font-extralight py-4'>
      {parse(title)}
    </div>
  );
};

export default SidebarContentTypeSideNote;
