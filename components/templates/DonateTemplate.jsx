import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import {createLocalLink, isExternalLink} from '@/utilities/links';
import Link from 'next/link';

const DonateTemplate = ({ data }) => {
  const renderButton = (data, key) => (
    <Link
      href={isExternalLink(data.url) ? data.url : createLocalLink(data.url)} target={isExternalLink(data.url) ? '_blank' : '_self'}
      rel={isExternalLink(data.url) ? 'noreferrer noopener': ''}
      className='bg-wwr_yellow_orange text-xl font-light px-5 py-2 hover:text-white transition-all uppercase mx-3 my-2 text-center'
      key={key}
    >
      {data.title}
    </Link>
  );

  return (
    <div
      className='px-8 md:px-16 xl:px-48 pt-16 relative'
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
        className='text-lg md:text-xl mt-3 font-light text-center'
      />

      <div className='flex flex-col items-center lg:flex-row justify-center mt-8'>
        {data?.acf?.buttons?.map((btn, bI) => renderButton(btn, bI))}
      </div>

      <div className='w-[66vw] xl:w-[50vw] mx-auto mt-16 xl:mt-24 relative -mb-1'>
        <Image src={data?.acf?.image} alt='' width={1800} height={1800} />
      </div>
    </div>
  );
};

export default DonateTemplate;
