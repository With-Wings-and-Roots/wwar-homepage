import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import { createLocalLink } from '@/utilities/links';
import Link from 'next/link';

const DonateTemplate = ({ data }) => {
  const renderButton = (data, key) => (
    <div className='flex justify-center w-full' key={key}>
      <Link
        href={createLocalLink(data.url)}
        className='bg-wwr_yellow_orange text-xl font-light px-5 py-2 hover:text-white transition-all uppercase mr-7'
      >
        {data.title}
      </Link>
    </div>
  );

  return (
    <div
      className='px-8 md:px-16 lg:px-64 pt-8 pb-16 relative'
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      <h1
        dangerouslySetInnerHTML={{ __html: data.title?.rendered }}
        className='text-3xl md:text-6xl font-normal text-center'
      />
      <WysiwygContent
        content={data.acf?.text}
        className='text-lg md:text-xl font-light text-center'
      />

      {data?.acf?.buttons.map((btn, bI) => renderButton(btn, bI))}

      <Image src={data?.acf?.image} alt='' width={985} height={657} />

    </div>
  );
};

export default DonateTemplate;
