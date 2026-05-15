import { fetchMediaFromId } from '@/utilities/media';
import TimelinesPageWrapper from '../timelines/timelinesPageWrapper';
import { getTimelineCountries } from '@/utilities/timeline';

const fetchImageForTimelineContries = async (timelineCountries) => {
  const countriesWithImages = await Promise.all(
    timelineCountries.map(async (country) => {
      const mediaId = country.acf?.image;
      if (mediaId) {
        const i = await fetchMediaFromId(mediaId);
        return { ...country, imageUrl: i.source_url };
      } else {
        return { ...country, imageUrl: null };
      }
    })
  );
  return countriesWithImages;
};

const TimelineLandingTemplate = async ({ params, data }) => {
  const timelineCountries = await getTimelineCountries(params.lang);
  const timelines = await fetchImageForTimelineContries(timelineCountries);

  return (
    <TimelinesPageWrapper
      data={data}
      timelineCountries={timelines}
      lang={params.lang}
    />
  );
};

export default TimelineLandingTemplate;
