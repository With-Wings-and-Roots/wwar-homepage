import TimelinesPageWrapper from "@/app/components/timelines/timelinesPageWrapper";

const Timelines = async ({ params }) => {
  const language = params.lang;

  return <TimelinesPageWrapper lang={language.toLowerCase()} />;
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
