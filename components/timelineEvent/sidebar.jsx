import React from 'react';
import SidebarContentTypeImage from './sidebarContentType_Image';
import SidebarContentTypeVideo from './sidebarContentType_Video';
import SidebarContentTypeStory from './sidebarContentType_Story';

// type: sidenote, story, image, video, quote, none-selected, undefined

const Sidebar = ({ sidebarContent }) => {
  const { sidebar_content_type } = sidebarContent;

  return (
    <div>
      {sidebar_content_type === 'image' && (
        <SidebarContentTypeImage sidebarContent={sidebarContent} />
      )}
      {sidebar_content_type === 'video' && (
        <SidebarContentTypeVideo sidebarContent={sidebarContent} />
      )}
      {sidebar_content_type === 'story' && (
        <SidebarContentTypeStory sidebarContent={sidebarContent} />
      )}
    </div>
  );
};

export default Sidebar;
