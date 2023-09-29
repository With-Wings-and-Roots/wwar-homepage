import Tabs from "../components/stories/Tabs";
import StoriesList from "../components/stories/StoriesList";

async function getStories(numberOfStories, offset) {
  const res = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=en&per_page=" +
      numberOfStories +
      "&offset=" +
      offset,
    {
      next: {
        revalidate: 600,
      },
    }
  );
  return res.json();
}

let storiesList = [];
let counter = 0;

async function getAllStories() {
  counter += 100;

  const stories = await getStories(100, counter - 100);

  let newStoriesList = storiesList.concat(stories);

  storiesList = newStoriesList;

  if (storiesList.length < counter) return storiesList;

  if (storiesList.length >= counter) await getAllStories();
}

const Stories = async () => {
  const allStories = await getAllStories();

  return (
    <>
      <Tabs />
      <StoriesList stories={allStories} />
    </>
  );
};

export default Stories;
