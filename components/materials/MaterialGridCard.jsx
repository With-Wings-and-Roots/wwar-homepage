'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { createLocalLink } from '@/utilities/links';
import { fetchMediaFromId } from '@/utilities/media';
import WysiwygContent from '../common/WysiwygContent';

const MaterialGridCard = ({ key, material, title }) => {
  const cardTitle = material?.title?.rendered ?? '';
  const text = material?.acf?.text ?? '';

  const isPost = title?.toLowerCase() === 'posts';
  const link = isPost ? `/blog/${material?.slug}` : material?.link || '#';

  // Use featured image for posts, imagevideo for everything else
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
        } else if (!isPost && isImage && media?.image) {
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
      key={key}
      className='group block h-full focus:outline-none rounded-lg overflow-hidden'
    >
      <div className='bg-wwr_yellow_orange flex flex-col h-full overflow-hidden'>
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
              src={`https://player.vimeo.com/video/${media?.video
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
            className='text-xl  font-light leading-snug'
            dangerouslySetInnerHTML={{ __html: cardTitle }}
          />

          <WysiwygContent content={text} className='text-sm line-clamp-2' />
          <div className='mt-1 text-sm '>
            {format(material.date, 'yyyy-MM-dd')}
          </div>

          <span className='mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wide font-medium text-black group-hover:text-white transition-colors'>
            {isPost ? 'Read more' : 'View material'}
            <span className='block h-px w-6 bg-current' />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MaterialGridCard;
