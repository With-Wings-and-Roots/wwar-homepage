'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

import { createLocalLink } from '@/utilities/links';
import { fetchMediaFromId } from '@/utilities/media';
import WysiwygContent from '../common/WysiwygContent';

const MaterialListCard = ({ index, material, title, params }) => {
  const cardTitle = material?.title?.rendered ?? '';
  const text = material?.acf?.text ?? '';

  const isPost = title?.toLowerCase() === 'posts';
  console.log('MaterialListCard material:', params);

  const link = isPost
    ? `/blog/${material?.slug}`
    : material?.link || '#';

  const media = isPost
    ? material?.featured_media
    : material?.acf?.imagevideo?.[0];

  const isImage = isPost || media?.acf_fc_layout === 'image';
  const isVideo = !isPost && media?.acf_fc_layout === 'video';

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (isPost && material?.featured_media) {
          const img = await fetchMediaFromId(material.featured_media);
          setImageData(img);
        } 
        
        if (!isPost && isImage && media?.image) {
          const img = await fetchMediaFromId(media.image);
          setImageData(img);
        }

      } catch (error) {
        console.error('Failed to load image:', error);
      }
    };

    loadImage();

  }, [isPost, isImage, media, material]);


  return (
    <Link
      href={createLocalLink(link)}
      key={index}
      className="group block rounded-lg overflow-hidden"
    >

      <div className="bg-wwr_yellow_orange flex flex-col md:flex-row overflow-hidden">

        {/* Media */}
        <div className="relative w-full md:w-1/3 aspect-[4/3] md:aspect-auto overflow-hidden">

          {isImage && imageData && (
            <Image
              src={imageData.source_url}
              alt={imageData.alt_text || ''}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="
                object-cover 
                transition-transform 
                duration-500 
                group-hover:scale-105
              "
            />
          )}

          {isVideo && (
            <iframe
              src={`https://player.vimeo.com/video/${media?.video
                ?.split('/')
                .pop()}`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}

        </div>


        {/* Content */}
        <div className="
          flex 
          flex-col 
          justify-between 
          p-6 
          md:p-8
          border 
          border-black/10
          flex-grow
          md:w-2/3
        ">

          <div>

            <h3
              className="text-2xl md:text-3xl font-light leading-snug"
              dangerouslySetInnerHTML={{
                __html: cardTitle,
              }}
            />


            <WysiwygContent
              content={text}
              className="text-sm mt-4 line-clamp-3"
            />


            <div className="text-sm mt-4 opacity-70">
              {material?.date &&
                format(material.date, 'yyyy-MM-dd')}
            </div>


          </div>


          <span
            className="
              mt-6 
              inline-flex 
              items-center 
              gap-2 
              text-sm 
              uppercase 
              tracking-wide 
              font-medium
              text-black
              group-hover:text-white
              transition-colors
            "
          >
            {isPost ? 'Read more' : 'View material'}

            <span className="block h-px w-6 bg-current" />

          </span>

        </div>

      </div>

    </Link>
  );
};

export default MaterialListCard;