'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createHashString, createLocalLink } from '@/utilities/links';
import { fetchMediaFromId } from '@/utilities/media';

const MaterialGridCard = ({ material }) => {
  const title = material?.title?.rendered ?? '';
  const media = material?.acf?.imagevideo?.[0];

  const isImage = media?.acf_fc_layout === 'image';
  const isVideo = media?.acf_fc_layout === 'video';

  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (isImage && media?.image) {
        const img = await fetchMediaFromId(media.image);
        setImageData(img);
      }
    };

    loadImage();
  }, [isImage, media]);

  return (
    <div className='group bg-wwr_yellow_orange flex flex-col h-full overflow-hidden'>
      {/* Media */}
      <div className='relative aspect-[4/3] overflow-hidden'>
        {isImage && imageData && (
          <Image
            src={imageData.source_url}
            alt={imageData.alt_text || ''}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='object-cover transition-transform duration-500 group-hover:scale-105'
          />
        )}

        {isVideo && (
          <iframe
            src={`https://player.vimeo.com/video/${media.video
              ?.split('/')
              .pop()}`}
            className='w-full h-full'
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
          />
        )}
      </div>

      {/* Content */}
      <div className='flex flex-col justify-between p-6 border border-black/10 flex-grow'>
        <h3
          className='text-xl md:text-2xl font-light leading-snug'
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <Link
          href={createLocalLink(material?.link)}
          className='mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-black hover:text-white transition-colors'
        >
          View material
          <span className='block h-px w-6 bg-current' />
        </Link>
      </div>
    </div>
  );
};

export default MaterialGridCard;
