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

  return (
    <>
      <section className='px-8 md:px-16 xl:px-48 relative pt-16 pb-16'>
        {/* Section Heading */}
        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-10'>
          {heading}
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          {/* LEFT COLUMN */}
          <WysiwygContent
            className='prose max-w-none text-gray-800'
            content={content}
          />

          {/* RIGHT COLUMN: Clickable Image */}
          {previewImage && (
            <div
              onClick={() => setIsOpen(true)}
              className='relative h-96 w-full border border-gray-200 overflow-hidden cursor-pointer group'
            >
              <Image
                src={previewImage}
                alt={previewAlt}
                fill
                className='object-cover group-hover:scale-105 transition-transform duration-300'
              />

              {/* Tooltip Overlay */}
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center'>
                <div className='mb-4 px-4 py-2 bg-black/70 text-white text-sm rounded-full'>
                  Click to enlarge
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FULLSCREEN MODAL */}
      {isOpen && (
        <div
          className='fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6'
          onClick={() => setIsOpen(false)}
        >
          <div className='relative w-full h-full max-w-6xl max-h-[90vh]'>
            <Image
              src={previewImage}
              alt={previewAlt}
              fill
              className='object-contain'
            />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className='absolute top-6 right-6 text-white text-3xl'
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
