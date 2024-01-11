import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import HomeWrapper from '@/components/home/homeWrapper';
import { getTimeline, getTimelineEvents } from '@/utilities/timeline';
import { getAllMedia } from '@/utilities/stories';
import TimelinesPageWrapper from '@/components/timelines/timelinesPageWrapper';

const Page = async ({ params, searchParams })=>{

  const lang=params.lang.toLowerCase()
  const baseLink = process.env.NEXT_PUBLIC_CMS_URL;

// Fetch concurrently
  const [timeLineEventsEn, timeLineEventsDe, allMedia] = await Promise.all([
    getTimeline('us', lang),
    getTimeline('de', lang),
    getAllMedia(lang),
  ]);

  return(
    <>
      <Header />
      <HomeWrapper lang={params} timeLineEventsDe={timeLineEventsDe} timeLineEventsEn={timeLineEventsEn} allMedia={allMedia} baseLink={baseLink} searchParams={searchParams }/>

      <Footer />
    </>




  )
}

export default Page