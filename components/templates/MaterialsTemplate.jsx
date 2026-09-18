import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import WysiwygContent from '@/components/common/WysiwygContent';
import MaterialsWrapper from '../materials/MaterialsWrapper';
import { fetchMediaFromId } from '@/utilities/media';


const MaterialsTemplate = async ({
  data,
  lang = 'en',
  materials,
  topics,
  collections,
  languages,
  params,
  title = 'Posts',
  tags,
}) => {
  console.log(
    'MaterialsTemplate data:',
    tags,
  );
  const headerImageId =
  data?.acf?.header_image || data?.featured_media || null;

const headerImage = headerImageId
  ? await fetchMediaFromId(headerImageId)
  : null;

const headerImageUrl = headerImage?.source_url;

  const visibleMaterials = materials.filter((material) => {
    const hide = material?.acf?.hide_from_archive;

    if (Array.isArray(hide)) {
      return !hide.includes('yes');
    }

    return hide !== 'yes';
  });

  return (
    <>
      <div className='relative'>
        <Image
          src={gfx_bg_orange}
          alt=''
          className='fixed left-0 top-0 w-screen h-screen object-cover -z-10 opacity-10'
        />

        {/* HEADER IMAGE */}
       {headerImageUrl && (
  <div className='relative w-full h-[90vh]'>
    <Image
      src={headerImageUrl}
      alt={data?.title?.rendered || ''}
      fill
      priority
      className='object-cover'
      sizes='100vw'
    />
  </div>
)}

        {/* CONTENT */}
        <div className='px-8 md:px-16 xl:px-48 py-16'>
          <div className='text-lg font-light mt-6'>
            <h1
              className='text-3xl md:text-6xl font-bold mb-6'
              dangerouslySetInnerHTML={{
                __html: data?.title?.rendered || data?.acf?.title,
              }}
            />

            <WysiwygContent
              content={data?.acf?.intro || data?.acf?.intro_text}
            />
          </div>

          <MaterialsWrapper
            materials={visibleMaterials}
            lang={lang}
            topics={topics}
            collections={collections}
            languages={languages}
            title={title}
            params={params}
            tags={tags}
          />
        </div>
      </div>
    </>
  );
};

export default MaterialsTemplate;