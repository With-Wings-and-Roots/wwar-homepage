export async function fetchAllData(url) {
  let allData = [];
  const res = await fetch(url, {
    next: {
      revalidate: 600,
    },
  });
  const data = await res.json();
  allData = allData.concat(data);

  const totalPages = res.headers.get('X-WP-TotalPages') || 1;

  const fetchPage = async (page) => {
    const pageRes = await fetch(`${url}&page=${page}`, {
      next: {
        revalidate: 600,
      },
    });
    return pageRes.json();
  };

  const pagePromises = [];
  for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
    pagePromises.push(fetchPage(currentPage));
  }

  const additionalPagesData = await Promise.all(pagePromises);
  const additionalData = [...additionalPagesData.flat()];

  allData = allData.concat(additionalData);

  return allData;
}

export function getAdjacentSlug(index, length, array) {
  const adjustedIndex = (index + length) % length;
  return array[adjustedIndex].slug;
}
