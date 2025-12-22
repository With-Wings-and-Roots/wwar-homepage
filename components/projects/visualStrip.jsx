'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchMediaFromId } from '@/utilities/media';

const VisualStrip = ({ acf }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [allMedia, setAllMedia] = useState([]);

  useEffect(() => {
    const prepareMedia = async () => {
      const mediaArray = [];

      // Images
      if (acf?.gallery?.length) {
        for (let img of acf.gallery) {
          const media = await fetchMediaFromId(img);
          mediaArray.push({
            type: 'image',
            src: media.source_url || media.url,
            alt: media.alt || '',
          });
        }
      }

      // Videos
      if (acf?.related_videos?.length) {
        for (let video of acf.related_videos) {
          const videoId = video.video?.split('v=')[1]?.split('&')[0];
          mediaArray.push({ type: 'video', src: videoId });
        }
      }

      setAllMedia(mediaArray);
    };

    prepareMedia();
  }, [acf]);

  if (!allMedia.length) return null;

  const featured = allMedia[featuredIndex];

  return (
    <>
      {/* Featured Media */}
      <div className='relative aspect-video overflow-hidden mb-4 cursor-pointer group'>
        {featured.type === 'image' ? (
          <Image
            src={featured.src}
            alt={featured.alt}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            onClick={() => window.open(featured.src, '_blank')}
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${featured.src}`}
            title='Project video'
            className='absolute inset-0 w-full h-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className='flex gap-2 overflow-x-auto'>
        {allMedia.map((media, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 w-24 h-14 cursor-pointer border ${
              i === featuredIndex
                ? 'border-wwr_yellow_orange'
                : 'border-black/20'
            }`}
            onClick={() => setFeaturedIndex(i)}
          >
            {media.type === 'image' ? (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                className='object-cover transition-transform duration-500 hover:scale-105'
              />
            ) : (
              <div className='relative w-full h-full bg-black flex items-center justify-center text-white text-lg'>
                ▶
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-2 text-center text-sm text-black/60'>
        {featuredIndex + 1} / {allMedia.length}
      </div>
    </>
  );
};

export default VisualStrip;
