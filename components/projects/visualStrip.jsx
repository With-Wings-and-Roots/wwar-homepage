'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchMediaFromId } from '@/utilities/media';

const VisualStrip = ({ acf, lang }) => {
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
            caption: media.caption.rendered || '',
            credit: media.acf?.credit || '',
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

  const goPrev = () =>
    setFeaturedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  const goNext = () => setFeaturedIndex((prev) => (prev + 1) % allMedia.length);

  return (
    <div>
      <div className='flex items-start gap-4'>
        {/* Left Arrow */}
        <button onClick={goPrev} className='flex-shrink-0 self-center'>
          <Image
            src='/arrow-left-circle.svg'
            alt='Previous'
            width={32}
            height={32}
          />
        </button>

        {/* Featured Media + Pagination */}
        <div className='flex-1'>
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

          {/* Caption */}
          {featured.caption && (
            <p
              className='text-center text-sm text-black/60 mb-2'
              dangerouslySetInnerHTML={{ __html: featured.caption }}
            />
          )}

          {/* Credit */}
          {featured.credit && (
            <p className='text-center text-sm text-black/60 mb-4'>
              {lang === 'en' ? 'Media Credit:' : 'Medien-Credit:'}{' '}
              {featured.credit}
            </p>
          )}
        </div>

        {/* Right Arrow */}
        <button onClick={goNext} className='flex-shrink-0 self-center'>
          <Image
            src='/arrow-left-circle.svg'
            alt='Next'
            width={32}
            height={32}
            className='scale-x-[-1]'
          />
        </button>
      </div>{' '}
      {/* Thumbnails */}
      <div className='flex flex-wrap gap-3 justify-center'>
        {allMedia.map((media, i) => (
          <div
            key={i}
            className={`
            relative flex-shrink-0 w-28 h-16 cursor-pointer border
            transition-transform duration-300
            ${
              i === featuredIndex
                ? 'border-wwr_yellow_orange scale-110 z-10'
                : 'border-black/20 hover:scale-105'
            }
          `}
            onClick={() => setFeaturedIndex(i)}
          >
            {media.type === 'image' ? (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                className='object-cover transition-transform duration-300'
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
    </div>
  );
};

export default VisualStrip;
