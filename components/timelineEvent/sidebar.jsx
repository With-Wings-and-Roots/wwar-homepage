import React from 'react';
import SidebarContentTypeImage from './sidebarContentType_Image';
import SidebarContentTypeVideo from './sidebarContentType_Video';
import SidebarContentTypeStory from './sidebarContentType_Story';
import SidebarContentTypeSideNote from './sidebarContentType_SideNote';
import SidebarContentType_Quote from '@/components/timelineEvent/sidebarContentType_Quote';

// type: sidenote, story, image, video, quote, none-selected, undefined

const Sidebar = ({ sidebarContent }) => {
  return (
    <div>
      {sidebarContent?.map((content, index) => {
        const type = content.sidebar_content_type;
        return (
          <React.Fragment key={index}>
            {type.includes('image') && (
              <SidebarContentTypeImage content={content} />
            )}
            {type.includes('video') && (
              <SidebarContentTypeVideo content={content} />
            )}
            {type.includes('story') && (
              <SidebarContentTypeStory content={content} />
            )}
            {type.includes('sidenote') && (
              <SidebarContentTypeSideNote content={content} />
            )}
            {type.includes('quote') && (
              <SidebarContentType_Quote content={content} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Sidebar;
