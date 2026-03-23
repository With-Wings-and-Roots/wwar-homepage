import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import ImagePlusHeading from '../common/ImagePlusHeading';
import MaterialsWrapper from '../materials/MaterialsWrapper';

const MaterialsTemplate = ({
  data,
  lang = 'en',
  materials,
  topics,
  collections,
  languages,
  params,
}) => {
  const headerImage = data?.acf?.header_image || null;
  return (
    <>
      {/* Content */}
      <div className='px-8 md:px-16 xl:px-48 py-16 relative -mt-10 '>
        <Image
          src={gfx_bg_orange}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
        />

        <div className='text-lg font-light  mt-6'>
          <h1 className='text-3xl md:text-6xl font-bold mb-6'>
            {data?.title?.rendered || data?.acf?.title}
          </h1>

          <WysiwygContent content={data?.acf?.intro} />
        </div>

        <MaterialsWrapper
          materials={materials}
          lang={lang}
          topics={topics}
          collections={collections}
          languages={languages}
          params={params}
        />
      </div>
    </>
  );
};

export default MaterialsTemplate;
