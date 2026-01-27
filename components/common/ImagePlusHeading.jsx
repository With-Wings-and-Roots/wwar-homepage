import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';

export default function ImagePlusHeading({ image, heading, intro }) {
  return (
    <section className='w-full h-screen flex bg-wwr_light overflow-hidden'>
      {/* Left 50% — Text */}
      <div className='w-1/2 relative flex flex-col items-start justify-center px-16 overflow-hidden'>
        {/* Orange background ONLY on left */}
        <Image
          src={gfx_bg_orange}
          alt=''
          fill
          className='object-cover opacity-10 -z-10'
        />

        <h1
          className='
  text-wwr_yellow_orange
  text-3xl md:text-6xl
  font-bold tracking-tight py-4
  [-webkit-text-stroke:2px_black]
'
        >
          {heading}
        </h1>

        <h2
          dangerouslySetInnerHTML={{ __html: intro }}
          className='text-xl md:text-2xl font-light mt-4 bg-wwr_yellow_orange'
        />
      </div>

      {/* Right 50% — Image with curved cut */}
      <div className='w-1/2 relative'>
        <div
          className='absolute inset-0'
          style={{ clipPath: 'circle(80% at 100% 50%)' }}
        >
          <Image src={image} alt='' fill className='object-cover ' />
          <div className='absolute inset-0 bg-black/40' />
        </div>
      </div>
    </section>
  );
}
