// components/timelines/FooterLinksSection.jsx
import { createLocalLink } from '@/utilities/links';
import Link from 'next/link';

export default function FooterLinksSection({ footer_links = [], heading }) {
  if (!footer_links.length) return null;

  return (
    <section className='px-8 md:px-16 xl:px-48 mb-10'>
      <h2 className='font-medium text-xl lg:text-3xl mb-6'>{heading}</h2>

      <div className='flex flex-wrap gap-4'>
        {footer_links.map((item, i) => {
          const link = item.footer_link;
          if (!link) return null;

          return (
            <Link
              key={i}
              href={createLocalLink(link.url) || '#'}
              target={link.target || '_self'}
              className='bg-wwr_yellow_orange rounded-lg text-black px-6 py-3 uppercase text-sm hover:text-white transition'
            >
              {link.title || 'Learn More'}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
