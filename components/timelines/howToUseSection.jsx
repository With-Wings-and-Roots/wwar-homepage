// components/timelines/HowToUseSection.jsx
import WysiwygContent from '../common/WysiwygContent';
import Card from '../common/Card';
import { createLocalLink } from '@/utilities/links';

export default function HowToUseSection({
  heading,
  how_to_use,
  related_links = [],
}) {
  if (!how_to_use && !related_links.length) return null;

  return (
    <section className='px-8 md:px-16 xl:px-48 py-16'>
      {/* Section Heading */}
      <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-10'>
        {heading || 'How to Use This Resource'}
      </h2>

      {/* WYSIWYG How to Use Content */}
      {how_to_use && (
        <div className='mb-12 prose max-w-none text-gray-800'>
          <WysiwygContent content={how_to_use} />
        </div>
      )}

      {/* Related Links using common Card */}
      {related_links.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {related_links.map((linkItem, index) => (
            <Card
              key={index}
              title={linkItem.link.title || 'Resource'}
              description={linkItem.description.replace(/<[^>]+>/g, '')} // strip HTML for description
              href={createLocalLink(linkItem.link.url)}
              image={linkItem.image || null} // fallback image
            />
          ))}
        </div>
      )}
    </section>
  );
}
