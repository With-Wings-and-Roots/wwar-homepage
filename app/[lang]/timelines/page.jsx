import TimelinesPageWrapper from "@/components/timelines/timelinesPageWrapper";
import { getAllMedia } from "@/utilities/stories";
import { getTimeline } from "@/utilities/timeline";

const Timelines = async ({ params }) => {
  const lang = params.lang;
  const [timeLineEventsDe, timeLineEventsEn, allMedia] = await Promise.all([
    getTimeline("de", lang),
    getTimeline("us", lang),
    getAllMedia("en"),
  ]);

  return (
    <TimelinesPageWrapper
      lang={lang.toLowerCase()}
      timeLineEventsDe={timeLineEventsDe}
      timeLineEventsEn={timeLineEventsEn}
      allMedia={allMedia}
    />
  );
};

export default Timelines;

export function generateStaticParams() {
  return [
    {
      lang: "en",
    },
    { lang: "de" },
  ];
}
