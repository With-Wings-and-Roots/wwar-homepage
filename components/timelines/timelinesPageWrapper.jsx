import LearnTimelines from '@/components/timelines/learnTimelines';

import WhatYouWillFindSection from './wywfSection';
import HowToUseSection from './howToUseSection';
import ContributorsSection from './contributorsSection';
import FooterLinksSection from './footerLinksSection';
import WysiwygContent from '../common/WysiwygContent';
import TimelineCountriesSection from './timelineCountriesSection';

const TimelinesPageWrapper = ({ lang, timelineCountries, data }) => {
  return (
    <>
      <div className='px-8 md:px-16 xl:px-48 pt-16 lg:pt-24 relative mb-6'>
        <h1
          dangerouslySetInnerHTML={{ __html: data.acf?.hero_title || '' }}
          className='text-3xl md:text-6xl font-light'
        />
        <WysiwygContent
          content={data.acf?.intro_text}
          className='font-light md:text-lg mt-1'
        />
      </div>

      <TimelineCountriesSection
        timelineCountries={timelineCountries}
        language={lang}
      />
      <WhatYouWillFindSection
        heading={data?.acf?.what_you_will_find_heading}
        content={data?.acf?.text}
        previewImage={data?.acf?.image}
      />
      <LearnTimelines data={data.acf} />
      <HowToUseSection
        heading={data?.acf?.how_to_use_heading}
        how_to_use={data?.acf?.how_to_use}
        related_links={data?.acf?.related_links}
      />
      <ContributorsSection
        de_headline={data.acf?.de_headline}
        us_headline={data?.acf?.us_headline}
        special_members={data.acf?.special_members}
        de_contributors={data.acf?.de_contributors}
        us_contributors={data.acf?.us_contributors}
      />
      <FooterLinksSection
        heading={data?.acf?.footer_links_heading}
        footer_links={data?.acf?.footer_links}
      />
    </>
  );
};

export default TimelinesPageWrapper;
