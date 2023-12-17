import TimelinesPageWrapper from "@/app/components/timelines/timelinesPageWrapper";
import { getAllMedia } from "@/app/utilities/stories";

const Timelines = async ({ params }) => {
  const language = params.lang;
  const allMedia = await getAllMedia(language);

  return (
    <TimelinesPageWrapper lang={language.toLowerCase()} allMedia={allMedia} />
  );
};

export default Timelines;

export async function generateStaticParams() {
  return [
    {
      lang: "en",
    },
    { lang: "de" },
  ];
}
