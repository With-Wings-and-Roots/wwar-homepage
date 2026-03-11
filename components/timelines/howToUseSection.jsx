// components/timelines/HowToUseSection.jsx
import WysiwygContent from '../common/WysiwygContent';
import Card from '../common/Card';
import { createLocalLink } from '@/utilities/links';

export default function HowToUseSection({
  heading,
  how_to_use = [],
  related_links = [],
}) {
  if (!how_to_use.length && !related_links.length) return null;

  return (
    <section className='px-8 md:px-16 xl:px-48 py-16'>
      {/* Heading */}
      <h2 className='font-medium text-xl lg:text-3xl mb-10'>
        {heading || 'How to Use This Resource'}
      </h2>

      {/* How To Use List */}
      {how_to_use.length > 0 && (
        <ul className='flex flex-col divide-y divide-gray-200 mb-8'>
          {how_to_use.map((item, index) => (
            <li
              key={index}
              className='py-6 transition-all duration-200 hover:bg-gray-50 px-2 md:px-4'
            >
              <div className='flex flex-col gap-3'>
                {/* WYSIWYG Content */}
                <div className='prose max-w-none text-gray-800'>
                  <WysiwygContent content={item.how_to_use} />
                </div>
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
