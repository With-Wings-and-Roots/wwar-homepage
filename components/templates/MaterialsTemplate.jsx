import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import MaterialsGrid from '@/components/materials/MaterialsGrid';
import ImagePlusHeading from '../common/ImagePlusHeading';
import MaterialsWrapper from '../materials/MaterialsWrapper';

const MaterialsTemplate = ({
  data,
  lang = 'en',
  materials,
  topics,
  collections,
  languages,
}) => {
  const headerImage = data?.acf?.header_image || null;

  return (
    <>
      {/* Hero */}
      <div className='-mt-10 h-screen relative'>
        <ImagePlusHeading
          image={headerImage}
          heading={data?.title?.rendered}
          intro={data?.acf?.heading}
        />
      </div>

      {/* Content */}
      <div className='px-8 md:px-16 xl:px-48 py-16 relative'>
        <Image
          src={gfx_bg_orange}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
        />

        <div className='text-center text-lg font-light xl:px-16 mt-6'>
          <WysiwygContent content={data?.acf?.intro} />
        </div>

        <MaterialsWrapper
          materials={materials}
          lang={lang}
          topics={topics}
          collections={collections}
          languages={languages}
        />
      </div>
    </>
  );
};

export default MaterialsTemplate;
