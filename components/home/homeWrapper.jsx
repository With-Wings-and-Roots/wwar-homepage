
import HomeTitle from '@/components/home/homeTitle';
import TimelinesPageWrapper from '@/components/timelines/timelinesPageWrapper';

const HomeWrapper=({lang, timeLineEventsDe, timeLineEventsEn, allMedia, searchParams, baseLink})=>{
  return(
    <div className={`w-screen`}>
      <HomeTitle />
      <TimelinesPageWrapper lang={lang} timeLineEventsDe={timeLineEventsDe} timeLineEventsEn={timeLineEventsEn} allMedia={allMedia} baseLink={baseLink} searchParams={searchParams } skip={true}/>
    </div>
  )
}

export default HomeWrapper