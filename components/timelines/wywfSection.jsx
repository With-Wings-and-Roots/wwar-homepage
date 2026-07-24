'use client';

import { useState } from 'react';
import Image from 'next/image';
import WysiwygContent from '../common/WysiwygContent';

export default function WhatYouWillFindSection({
  heading,
  content,
  previewImage,
  previewAlt = 'Timeline preview',
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(previewImage);

  return (
    <>
      <section className='px-8 md:px-16 xl:px-48 relative pt-16 pb-16 my-8'>
        {/* Section Heading */}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 '>
          {/* LEFT COLUMN */}
          <div>
            <h2 className='font-medium text-xl lg:text-3xl mb-6 '>{heading}</h2>

            <WysiwygContent className='prose max-w-none' content={content} />
          </div>

          {/* RIGHT COLUMN: Vimeo Video */}
          {previewImage && (
            <div className='w-full'>
              <div
                className='
        relative
        overflow-hidden
        rounded-xl
        border border-gray-200
        shadow-sm
        aspect-video

        [&>iframe]:absolute
        [&>iframe]:top-0
        [&>iframe]:left-0
        [&>iframe]:w-full
        [&>iframe]:h-full
        [&>iframe]:border-0
      '
                dangerouslySetInnerHTML={{ __html: previewImage }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
