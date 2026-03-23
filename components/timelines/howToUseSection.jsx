'use client';

import WysiwygContent from '../common/WysiwygContent';
import Card from '../common/Card';
import { createLocalLink } from '@/utilities/links';
import Image from 'next/image';
import gfx_bg_blue from '@/public/bg_blue.png';

export default function HowToUseSection({
  heading,
  how_to_use = [],
  related_links = [],
}) {
  if (!how_to_use.length && !related_links.length) return null;

  return (
    <section
      className='px-8 md:px-16 xl:px-48 relative bg-wwr_teal text-white py-20 my-16'
      id='how-to-use'
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
    >
      {/* Background Image */}
      <Image
        src={gfx_bg_blue}
        alt=''
        className='absolute inset-0 w-full h-full object-cover object-center -z-10 opacity-50'
      />

      {/* Heading */}
      <h2 className='text-2xl md:text-3xl font-light mb-6'>
        {heading || 'How to Use This Resource'}
      </h2>
      {/* How To Use List */}
      {how_to_use.length > 0 && (
        <ul className='flex flex-col divide-y divide-white/20 mb-12'>
          {how_to_use.map((item, index) => (
            <li
              key={index}
              className='
                px-2 md:px-4
                py-4 md:py-5
                transition-all duration-200
                hover:bg-white/10
              '
            >
              <div className='text-base md:text-lg font-light leading-relaxed'>
                <WysiwygContent content={item.how_to_use} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Related Links */}
      {related_links.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {related_links.map((linkItem, index) => (
            <Card
              key={index}
              title={linkItem.link.title || 'Resource'}
              description={linkItem.description}
              href={createLocalLink(linkItem.link.url)}
              image={linkItem.image || null}
            />
          ))}
        </div>
      )}
    </section>
  );
}
