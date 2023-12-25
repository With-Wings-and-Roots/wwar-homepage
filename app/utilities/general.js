export async function fetchAllData(url) {
  let currentPage = 1;
  let allData = [];

  const res = await fetch(url, {
    next: {
      revalidate: 600,
    },
  });
  const data = await res.json();
  allData = [...allData, ...data];

  const totalPages = res.headers.get("X-WP-TotalPages") || 1;
  // currentPage = parseInt(res.headers.get("X-WP-CurrentPage"));

  while (totalPages > 1 && currentPage < totalPages) {
    currentPage++;
    const tempRes = await fetch(`${url}&page=${currentPage}`, {
      next: {
        revalidate: 600,
      },
    });
    const tempData = await tempRes.json();
    allData = allData.concat(tempData);
  }

  return allData;
}
