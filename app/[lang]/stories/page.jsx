import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";

const Stories = ({ params }) => {
  const lang = params.lang;

  return <StoriesPageContainer lang={lang} />;
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
