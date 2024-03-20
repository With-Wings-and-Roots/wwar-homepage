import { Fragment } from 'react';
import ImageTitleAndText from '@/components/home/flexibleContent/ImageTitleAndText';
import VideoTitleAndText from '@/components/home/flexibleContent/VideoTitleAndText';
import TitleAndText from '@/components/home/flexibleContent/TitleAndText';

const FlexibleContent = ({ items, buttons }) => (
  <Fragment>
    {items?.map((item, i) => {
      switch (item.acf_fc_layout) {
        case 'image_title_and_text':
          return <ImageTitleAndText data={item} buttons={buttons} key={i} />;
        case 'video_title_and_text':
          return <VideoTitleAndText data={item} buttons={buttons} key={i} />;
        case 'title_and_text':
          return <TitleAndText data={item} buttons={buttons} key={i} />;
        default:
          return null;
      }
    })}
  </Fragment>
);

export default FlexibleContent;
