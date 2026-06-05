import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';
import WorkshopsClientWrapper from '../workshops/WorkshopsClientWrapper';
import { fetchMediaFromId } from '@/utilities/media';

const WorkshopsTemplate = async ({
  data,
  workshopProductionTypes,
  workshopAudience,
  workshopTopics,
  workshops,
  lang = 'en',
}) => {

  const visibleWorkshops = workshops.filter((workshop) => {
    const hide = workshop?.acf?.hide_from_archive;

    const isHidden = Array.isArray(hide)
      ? hide.includes('yes')
      : hide === 'yes' || hide === true;

    return !isHidden;
  });

  const workshopsWithImages = await Promise.all(
    visibleWorkshops.map(async (workshop) => {
      let poster = workshop?.acf?.hero_image || workshop?.acf?.poster_image;

      if (typeof poster === 'number') {
        poster = await fetchMediaFromId(poster);
      }

      return {
        ...workshop,
        posterUrl: poster?.source_url || poster?.url || null,
      };
    })
  );

  return (
    <div className="bg-white">

      {/* 1️⃣ SMALLER HERO */}
      <div className="relative w-full h-[320px] md:h-[380px] -mt-20">
        <Image
          src={data.acf?.intro_header_image}
          alt={data.acf?.page_title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-8 md:left-16 xl:left-48 text-white max-w-2xl">
          <h1
            className="text-3xl md:text-5xl font-semibold"
            dangerouslySetInnerHTML={{ __html: data.acf?.page_title }}
          />
        </div>
      </div>

      {/* 2️⃣ SHORT INTRO + BACK LINK */}
      <div className="px-8 md:px-16 xl:px-48 py-10">

        <div className="max-w-3xl text-lg font-light text-gray-700">
          <WysiwygContent content={data.acf?.intro_text} />
        </div>

        {/* BACK LINK */}
        <div className="mt-4 text-sm">
          <a
            href={`/${lang}/for-educators`}
            className="text-wwr_teal hover:underline"
          >
            Looking for films, teaching materials, and classroom tools? Visit For Educators →
          </a>
        </div>

      </div>

      {/* 3️⃣ ARCHIVE (MAIN FOCUS) */}
      <div className="px-8 md:px-16 xl:px-48 pb-20">

        <h2 className="text-xl md:text-2xl font-bold mb-6">
          {lang === 'en' ? 'All Workshops' : 'Alle Workshops'}
        </h2>

        {/* FILTERS + GRID */}
        <WorkshopsClientWrapper
          workshops={workshopsWithImages}
          workshopProductionTypes={workshopProductionTypes}
          lang={lang}
          workshopAudience={workshopAudience}
          workshopTopics={workshopTopics}
        />

      </div>

    </div>
  );
};

export default WorkshopsTemplate;