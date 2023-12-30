export const fetchMediaFromId = async (mediaId)=>{
 const res = await fetch(`https://wwar2022.backslashseven.com/wp-json/wp/v2/media/${mediaId}`,{
      next: {
        revalidate: 600,
      },
    })

  const data = await res.json();
  return data
}