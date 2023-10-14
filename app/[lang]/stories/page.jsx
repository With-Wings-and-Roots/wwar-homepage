import StoriesPageWrapper from "@/app/components/stories/StoriesPageWrapper";
const Stories = ({ params }) => {
  const language = params.lang;

  return <StoriesPageWrapper lang={language.toLowerCase()} />;
};

export default Stories;

export async function generateStaticParams() {
  return [
    {
      lang: "en",
    },
    { lang: "de" },
  ];
}
