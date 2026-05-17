'use client';

import { useEffect, useState } from 'react';
import WysiwygContent from '../common/WysiwygContent';

export default function WhatYouWillFindSection({
  heading,
  content,
  previewVideo, // 👈 ANY URL (must already be embeddable)
}) {
  return (
    <section className='px-8 md:px-16 xl:px-48 relative pt-16 pb-16 my-8'>
      <div className='grid grid-cols-2 gap-12'>
        <div className='col-span-2 lg:col-span-1'>
          <h2 className='text-2xl lg:text-4xl font-medium'>{heading}</h2>
          <WysiwygContent
            content={content}
            className='font-light text-lg mt-4'
          />
        </div>
        <div className='col-span-2 lg:col-span-1'>
          <div
            className='video'
            dangerouslySetInnerHTML={{ __html: previewVideo }}
          />
        </div>
      </div>
    </section>
  );
}
