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

export async function getAllStories() {
  counter += 100;

  const stories = await getStories(100, counter - 100);

  storiesList = [...storiesList, ...stories];

  if (storiesList.length < counter) return storiesList;

  if (storiesList.length >= counter) await getAllStories();
}


export async function getStoryMedia(slug) {

 const res = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wp/v2/story?lang=en&slug=" + slug, {
      next: {
        revalidate: 600,
      },
    }
  );

const data = await res.json()

return data[0].featured_media;
 
}

export async function getStoryMediaByMediaId(mediaId) {
const mediaRes = await fetch(
    "https://wwar2022.backslashseven.com/wp-json/wp/v2/media/" + mediaId,
    {
      next: {
        revalidate: 600,
      },
    }
  );

  const data = await mediaRes.json();
  return data.source_url
}