// components/timelines/FooterLinksSection.jsx
import { createLocalLink } from '@/utilities/links';
import Link from 'next/link';

export default function FooterLinksSection({ footer_links = [], heading }) {
  if (!footer_links.length) return null;

  return (
    <section className='px-8 md:px-16 xl:px-48 py-20'>
      <h2 className='text-3xl md:text-5xl font-light mb-8'>{heading}</h2>

      <div className='flex flex-wrap gap-4'>
        {footer_links.map((item, i) => {
          const link = item.footer_link;
          if (!link) return null;

          return (
            <Link
              key={i}
              href={createLocalLink(link.url) || '#'}
              target={link.target || '_self'}
              className='bg-wwr_yellow_orange text-black px-6 py-3 uppercase text-sm hover:text-white transition'
            >
              {link.title || 'Learn More'}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
