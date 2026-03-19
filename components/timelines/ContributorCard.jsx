'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ContributorCard({ member }) {
  return (
    <Link
      href={member?.acf?.socials?.[0]?.link ?? '/'}
      className='flex flex-col items-center text-center min-w-[160px]'
    >
      <div className='relative w-24 h-24 mb-3'>
        {member?.media && (
          <Image
            src={member.media.source_url || member.media.url}
            alt={member.title?.rendered || 'Contributor'}
            fill
            className='object-contain'
          />
        )}
      </div>

      {member?.title?.rendered && (
        <div
          className='text-gray-800 font-medium text-sm'
          dangerouslySetInnerHTML={{
            __html: member.title.rendered || '',
          }}
        />
      )}
    </Link>
  );
}
