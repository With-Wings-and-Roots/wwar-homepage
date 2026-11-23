
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchMediaFromId } from '@/utilities/media';

const VisualStrip = ({ acf, lang }) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [allMedia, setAllMedia] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const prepareMedia = async () => {
      const mediaArray = [];

      // IMAGES
      if (acf?.gallery?.length) {
        for (const img of acf.gallery) {
          try {
            // Direct URL
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

            // WordPress media ID
            if (typeof img === 'number') {
              const media = await fetchMediaFromId(img);

              if (!media) continue;

              mediaArray.push({
                type: 'image',
                src: media.source_url || media.url,
                alt: media.alt_text || media.alt || '',
                caption: media.caption?.rendered || '',
                credit:
                  media.acf?.photo_credit ||
                  media.acf?.credit ||
                  '',
                isExternal: false,
              });

              continue;
            }

            // Object format
            if (typeof img === 'object' && img?.url) {
              mediaArray.push({
                type: 'image',
                src: img.url,
                alt: img.alt || '',
                caption: img.caption || '',
                credit: img.photo_credit || img.credit || '',
                isExternal: true,
              });
            }
          } catch (error) {
            console.error('Error loading gallery media:', error);
          }
        }
      }

      // VIDEOS
      if (acf?.related_videos?.length) {
        for (const video of acf.related_videos) {
          const rawUrl = video?.video;

          if (!rawUrl) continue;

          let videoId = null;

          if (rawUrl.includes('youtube.com') || rawUrl.includes('youtu.be')) {
            try {
              videoId = rawUrl.includes('youtu.be')
                ? rawUrl.split('/').pop().split('?')[0]
                : new URL(rawUrl).searchParams.get('v');
            } catch {
              continue;
            }
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

  // Navigation
  const goPrev = () => {
    setFeaturedIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const goNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % allMedia.length);
  };

  const closeLightbox = () => setLightboxOpen(false);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, allMedia.length]);

  if (!allMedia.length) return null;

  const featured = allMedia[featuredIndex];

  return (
    <div>
      {/* MAIN VIEW */}
      <div className="flex items-start gap-4">

        {/* LEFT ARROW */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous media"
          className="flex-shrink-0 self-center"
        >
          <Image
            src="/arrow-left-circle.svg"
            alt=""
            width={32}
            height={32}
          />
        </button>

        {/* FEATURED MEDIA */}
        <div className="flex-1 min-w-0">
          <div
            className={`relative aspect-video overflow-hidden mb-4 group ${
              featured.type === 'image' ? 'cursor-zoom-in' : ''
            }`}
            onClick={() => {
              if (featured.type === 'image') setLightboxOpen(true);
            }}
          >
            {featured.type === 'image' && (
              <Image
                src={featured.src}
                alt={featured.alt || ''}
                fill
                unoptimized={featured.isExternal}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}

            {featured.type === 'video' && (
              <iframe
                src={`https://www.youtube.com/embed/${featured.src}`}
                title="Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* CAPTION */}
          {featured.caption && (
            <p
              className="text-center text-sm text-black/60 mb-2"
              dangerouslySetInnerHTML={{ __html: featured.caption }}
            />
          )}

          {/* PHOTO CREDIT */}
          {featured.credit && (
            <p className="text-center text-sm text-black/60 mb-4">
              {lang === 'en' ? 'Photo credit:' : 'Foto: '}
              {featured.credit}
            </p>
          )}
        </div>

        {/* RIGHT ARROW */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next media"
          className="flex-shrink-0 self-center"
        >
          <Image
            src="/arrow-left-circle.svg"
            alt=""
            width={32}
            height={32}
            className="scale-x-[-1]"
          />
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="flex flex-wrap gap-3 justify-center">
        {allMedia.map((media, i) => (
          <button
            type="button"
            key={`${media.src}-${i}`}
            aria-label={`Show media ${i + 1}`}
            onClick={() => setFeaturedIndex(i)}
            className={`
              relative flex-shrink-0 w-28 h-16 cursor-pointer border
              transition-transform duration-300
              ${
                i === featuredIndex
                  ? 'border-wwr_yellow_orange scale-110 z-10'
                  : 'border-black/20 hover:scale-105'
              }
            `}
          >
            {media.type === 'image' ? (
              <Image
                src={media.src}
                alt={media.alt || ''}
                fill
                unoptimized={media.isExternal}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-black flex items-center justify-center text-white text-lg">
                ▶
              </div>
            )}
          </button>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="mt-2 text-center text-sm text-black/60">
        {featuredIndex + 1} / {allMedia.length}
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && featured.type === 'image' && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image gallery"
            className="absolute top-5 right-6 z-20 text-white text-4xl leading-none hover:text-wwr_yellow_orange"
          >
            &times;
          </button>

          {/* PREVIOUS */}
          {allMedia.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 md:left-8 z-20 text-white hover:text-wwr_yellow_orange"
            >
              <Image
                src="/arrow-left-circle.svg"
                alt=""
                width={42}
                height={42}
              />
            </button>
          )}

          {/* IMAGE AND DETAILS */}
          <div
            className="relative w-full max-w-6xl flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full h-[65vh] md:h-[75vh]">
              <Image
                src={featured.src}
                alt={featured.alt || ''}
                fill
                unoptimized={featured.isExternal}
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {featured.caption && (
              <p
                className="text-white/90 text-center text-sm mt-4 max-w-3xl"
                dangerouslySetInnerHTML={{ __html: featured.caption }}
              />
            )}

            {featured.credit && (
              <p className="text-white/60 text-center text-xs mt-2">
                {lang === 'en' ? 'Photo credit:' : 'Foto: '}
                {featured.credit}
              </p>
            )}

            <p className="text-white/50 text-xs mt-3">
              {featuredIndex + 1} / {allMedia.length}
            </p>
          </div>

          {/* NEXT */}
          {allMedia.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="absolute right-3 md:right-8 z-20 text-white hover:text-wwr_yellow_orange"
            >
              <Image
                src="/arrow-left-circle.svg"
                alt=""
                width={42}
                height={42}
                className="scale-x-[-1]"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VisualStrip;
