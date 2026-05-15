import Link from 'next/link';
import Image from 'next/image';
import WysiwygContent from './WysiwygContent';

export default function Card({ title, description, image, href }) {
  return (
    <Link
      href={href}
      className='group block bg-wwr_yellow_orange rounded-lg overflow-hidden transition hover:bg-wwr_yellow_orange_hovered hover:text-white'
    >
      {/* Image */}
      {image && (
        <div className='relative h-64 w-full overflow-hidden'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover transition duration-500 group-hover:scale-105'
          />
        </div>
      )}

      {/* Content */}
      <div className='p-6'>
        <h3 className='text-2xl font-bold text-black'>{title}</h3>

        <WysiwygContent
          content={description}
          className='mt-3 text-base text-black/80 leading-relaxed'
        />
      </div>
    </Link>
  );
}
