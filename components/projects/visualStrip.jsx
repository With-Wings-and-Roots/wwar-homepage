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

      // ----------------------------
      // IMAGES (ID OR URL SUPPORT)
      // ----------------------------
      if (acf?.gallery?.length) {
        for (let img of acf.gallery) {
          try {
            // CASE 1: direct URL
            if (typeof img === 'string') {
              mediaArray.push({
                type: 'image',
                src: img,
                alt: '',
                caption: '',
                credit: '',
                isExternal: true,
              });
              continue;
            }

            // CASE 2: WordPress media ID
            if (typeof img === 'number') {
              const media = await fetchMediaFromId(img);

              if (!media) continue;

              mediaArray.push({
                type: 'image',
                src: media.source_url || media.url,
                alt: media.alt || '',
                caption: media?.caption?.rendered || '',
                credit: media?.acf?.credit || '',
                isExternal: false,
              });
            }

            // CASE 3: object format (future-proof)
            if (typeof img === 'object' && img?.url) {
              mediaArray.push({
                type: 'image',
                src: img.url,
                alt: img.alt || '',
                caption: img.caption || '',
                credit: img.credit || '',
                isExternal: true,
              });
            }
          } catch (e) {}
        }
      }

      // ----------------------------
      // VIDEOS
      // ----------------------------
      if (acf?.related_videos?.length) {
        for (let video of acf.related_videos) {
          const rawUrl = video?.video;

          if (!rawUrl) continue;

          let videoId = null;

          // YouTube full URL handling
          if (rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
            videoId = rawUrl.includes('youtu.be')
              ? rawUrl.split('/').pop()
              : new URL(rawUrl).searchParams.get('v');
          } else {
            videoId = rawUrl;
          }

          if (videoId) {
            mediaArray.push({
              type: 'video',
              src: videoId,
            });
          }
        }
      }

      setAllMedia(mediaArray);
      setFeaturedIndex(0);
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
      {/* MAIN VIEW */}
      <div className='flex items-start gap-4'>
        {/* LEFT ARROW */}
        <button onClick={goPrev} className='flex-shrink-0 self-center'>
          <Image
            src='/arrow-left-circle.svg'
            alt='Previous'
            width={32}
            height={32}
          />
        </button>

        {/* FEATURED MEDIA */}
        <div className='flex-1'>
          <div className='relative aspect-video overflow-hidden mb-4 cursor-pointer group'>
            {/* IMAGE */}
            {featured.type === 'image' && (
              <Image
                src={featured.src}
                alt={featured.alt || ''}
                fill
                unoptimized={featured.isExternal}
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                onClick={() => window.open(featured.src, '_blank')}
              />
            )}

            {/* VIDEO */}
            {featured.type === 'video' && (
              <iframe
                src={`https://www.youtube.com/embed/${featured.src}`}
                title='Video'
                className='absolute inset-0 w-full h-full'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            )}
          </div>

          {/* CAPTION */}
          {featured.caption && (
            <p
              className='text-center text-sm text-black/60 mb-2'
              dangerouslySetInnerHTML={{ __html: featured.caption }}
            />
          )}

          {/* CREDIT */}
          {featured.credit && (
            <p className='text-center text-sm text-black/60 mb-4'>
              {lang === 'en' ? 'Media Credit:' : 'Medien-Credit:'}{' '}
              {featured.credit}
            </p>
          )}
        </div>

        {/* RIGHT ARROW */}
        <button onClick={goNext} className='flex-shrink-0 self-center'>
          <Image
            src='/arrow-left-circle.svg'
            alt='Next'
            width={32}
            height={32}
            className='scale-x-[-1]'
          />
        </button>
      </div>

      {/* THUMBNAILS */}
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
                alt={media.alt || ''}
                fill
                unoptimized={media.isExternal}
                className='object-cover'
              />
            ) : (
              <div className='w-full h-full bg-black flex items-center justify-center text-white text-lg'>
                ▶
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className='mt-2 text-center text-sm text-black/60'>
        {featuredIndex + 1} / {allMedia.length}
      </div>
    </div>
  );
};

export default VisualStrip;