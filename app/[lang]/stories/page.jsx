import StoriesPageContainer from "@/app/components/stories/StoriesPageContainer";

const Stories = ({ params, lang }) => {
  return <StoriesPageContainer lang={lang || params.lang} />;
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
