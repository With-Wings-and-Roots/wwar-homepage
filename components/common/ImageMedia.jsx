import Image from "next/image";
import {fetchMediaFromId} from "@/utilities/media";

const ImageMedia = async ({ mediaId, alt = '', width = 600, height = 600, className = 'aspect-square object-cover' }) => {
  const media = (await fetchMediaFromId(mediaId)) || null;
  const mediaUrl = media?.source_url;

  return (
    <Image
      src={mediaUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}

export default ImageMedia;