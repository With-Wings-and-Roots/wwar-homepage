import Image from 'next/image';

export default function ImagePlusHeading({ image, heading, intro }) {
  return (
    <section className='h-[90vh] relative'>
      {/* Background Image */}
      <Image
        src={image}
        alt={heading || 'Header image'}
        fill
        priority
        className='object-cover'
      />

      {/* Optional dark overlay */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Text Content */}
      <div className='px-8 md:px-16 xl:px-48 pt-44 relative text-white'>
        <h1 className='text-3xl md:text-6xl font-bold'>{heading}</h1>

        {intro && (
          <div
            dangerouslySetInnerHTML={{ __html: intro }}
            className='text-xl md:text-2xl font-light mt-4 max-w-3xl'
          />
        )}
      </div>
    </section>
  );
}
