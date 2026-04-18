import Image from 'next/image';
import Link from 'next/link';
import WysiwygContent from '@/components/common/WysiwygContent';
import VisualStrip from '../projects/visualStrip';
import Team from '../common/TeamModal';
import { getWorkshopById } from '@/utilities/workshops';
import { getTeamMemberById } from '@/utilities/team';
import gfx_bg_orange from '@/public/bg_orange.png';
import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';

const ForEducatorsTemplate = async ({ data, lang = 'en' }) => {
  const acf = data?.acf || {};

  const featuredWorkshopIds = acf?.featured_workshops || [];

  const featuredWorkshops = await Promise.all(
    featuredWorkshopIds.map(async (id) => {
      const res = await getWorkshopById(id, lang);
      const workshop = res || null;

      if (!workshop) return null;

      // 🔥 fetch image
      const imageId = workshop?.acf?.hero_image;

      const image = imageId ? await fetchMediaFromId(imageId) : null;

      return {
        ...workshop,
        image,
      };
    })
  ).then((res) => res.filter(Boolean));

  const allTeamMemberIds = acf?.team_members || [];
  const allPersons = (
    await Promise.all(
      allTeamMemberIds.map(async (id) => {
        try {
          const res = await getTeamMemberById(id, lang);
          const member = res || null;

          if (!member) return null;

          // 🔥 fetch image if exists (ACF field assumed)
          const mediaId = member?.acf?.profile_icon || member?.acf?.image;

          let media = null;

          if (mediaId) {
            try {
              media = await fetchMediaFromId(mediaId);
            } catch (e) {
              media = null;
            }
          }

          return {
            ...member,
            media, // 👈 attached image here
          };
        } catch (e) {
          return null;
        }
      })
    )
  ).filter(Boolean);
  return (
    <div className='flex flex-col gap-24 -mt-20 mb-20'>
      {/* HERO */}
      <section className='relative w-full h-[80vh]'>
        {acf.intro_header_image && (
          <Image
            src={acf.intro_header_image}
            alt='Educators'
            fill
            className='object-cover'
          />
        )}

        <div className='absolute inset-0 bg-black/60 flex items-end px-8 md:px-16 xl:px-48 pb-10 text-white'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl md:text-6xl font-bold'>For Educators</h1>

            <div
              className='mt-4 text-lg font-light'
              dangerouslySetInnerHTML={{ __html: acf.intro_text }}
            />

            <div className='mt-6 flex gap-4 flex-wrap'>
              {acf?.ctas?.map((cta, i) => (
                <a
                  key={i}
                  href={cta?.primary_ctas?.url}
                  className='bg-wwr_yellow_orange text-black px-5 py-2 rounded-lg'
                >
                  {cta?.primary_ctas?.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className=''>
        <div
          className='px-8 md:px-16 xl:px-48 relative bg-black'
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          <Image
            src={gfx_bg_orange}
            alt=''
            className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
          />
          <div className='text-wwr_yellow_orange text-xl lg:text-3xl xl:text-5xl text-center py-14 leading-relaxed'>
            <WysiwygContent content={data.acf?.info_title} />
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className='px-8 md:px-16 xl:px-48'>
        <h2 className='text-3xl font-medium mb-10'>What We Offer</h2>

        <div className='grid md:grid-cols-2 gap-12'>
          {acf.what_we_offer?.map((item, i) => (
            <div key={i} className='flex gap-4 items-start'>
              {/* ICON */}
              {item.icon && (
                <div className='w-16 h-16 relative flex-shrink-0'>
                  <Image
                    src={item.icon}
                    alt='icon'
                    fill
                    className='object-cover rounded-md'
                  />
                </div>
              )}

              {/* CONTENT */}
              <div>
                <div
                  className='font-light'
                  dangerouslySetInnerHTML={{
                    __html: item.description || '',
                  }}
                />

                {item.link?.url && (
                  <a
                    href={item.link.url}
                    className='text-wwr_teal mt-2 inline-block'
                  >
                    {item.link.title || 'Learn more →'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORKSHOPS */}
      <section className='bg-wwr_yellow_orange/20 py-16 px-8 md:px-16 xl:px-48'>
        <h2 className='text-3xl font-medium mb-10 text-black'>
          {acf.featured_heading}
        </h2>

        <div className='grid md:grid-cols-3 gap-10'>
          {featuredWorkshops?.map((w) => (
            <Link
              key={w.id}
              href={createLocalLink(`/${lang}/workshops/${w.slug}`)}
              className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300'
            >
              {/* IMAGE */}
              <div className='relative w-full h-56 overflow-hidden'>
                {w?.image?.source_url && (
                  <Image
                    src={w.image.source_url}
                    alt={w.title?.rendered || ''}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className='p-6 flex flex-col gap-3'>
                <h3 className='text-xl font-semibold leading-snug'>
                  {w.title?.rendered}
                </h3>

                <div className='text-sm text-gray-600 line-clamp-3'>
                  <WysiwygContent
                    content={w.acf?.description || w.acf?.overview}
                  />
                </div>

                <div className='mt-auto pt-4'>
                  <span className='text-wwr_teal font-medium group-hover:underline'>
                    View Workshop →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      {acf.gallery?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48'>
          <VisualStrip acf={acf} lang={lang} />
        </section>
      )}

      {/* HOW IT WORKS */}
      {acf.steps?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-16 bg-white'>
          <h2 className='text-3xl font-medium mb-12 text-center'>
            How It Works
          </h2>

          <div className='grid md:grid-cols-3 gap-10'>
            {acf.steps.map((step, i) => (
              <div
                key={i}
                className='relative bg-wwr_yellow_orange/10 p-8 rounded-2xl hover:shadow-md transition'
              >
                {/* STEP NUMBER */}
                <div className='absolute -top-4 -left-4 w-10 h-10 rounded-full bg-wwr_yellow_orange text-black flex items-center justify-center font-bold shadow'>
                  {i + 1}
                </div>

                {/* TITLE */}
                <h3 className='text-xl font-semibold mb-3'>{step.heading}</h3>

                {/* DESCRIPTION */}
                <p className='text-sm font-light leading-relaxed text-gray-700'>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* OUTCOMES */}
      <section className='px-8 md:px-16 xl:px-48'>
        <h2 className='text-3xl font-medium mb-4'>Outcomes</h2>
        <div
          className='font-light'
          dangerouslySetInnerHTML={{ __html: acf.outcomes }}
        />
      </section>

      <section className='px-8 md:px-16 xl:px-48 py-16'>
        <h2 className='text-3xl font-medium mb-6'>{acf.resources_heading}</h2>

        <div className='grid md:grid-cols-4 gap-6 mt-10'>
          {(acf.resouces || []).map((item, i) => (
            <Link
              key={i}
              href={createLocalLink(item.page_link)}
              className='group bg-yellow-50 border border-yellow-200 rounded-xl overflow-hidden hover:shadow-lg transition'
            >
              {/* IMAGE */}
              <div className='relative w-full h-40'>
                <Image
                  src={item.icon}
                  alt=''
                  fill
                  className='object-cover group-hover:scale-105 transition duration-300'
                />
              </div>

              {/* CONTENT */}
              <div className='p-4'>
                <p className='text-sm font-light text-black/80'>
                  {item.description}
                </p>

                <div className='mt-4 text-wwr_teal text-sm font-medium'>
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CONNECTED LEARNING */}
      <section className='px-8 md:px-16 xl:px-48 '>
        <h2 className='text-3xl font-medium mb-4'>Connected Learning</h2>

        <div
          className='font-light max-w-3xl '
          dangerouslySetInnerHTML={{
            __html: acf.connected_learning_text,
          }}
        />
      </section>

      {/* TEAM */}
      <section className='px-8 md:px-16 xl:px-48'>
        <h2 className='text-3xl font-medium mb-8'>{acf.trainer_heading}</h2>

        <div className='flex flex-wrap gap-8'>
          {acf.team_members?.map((id) => (
            <Team
              key={id}
              member={allPersons.find((p) => p.id === id)}
              mediaUrl={allPersons.find((p) => p.id === id)?.media?.source_url}
              baseLink={`/${lang}/team/`}
            />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className=' px-8 md:px-16 xl:px-48'>
        <a
          href={acf.cta_link?.url}
          className='bg-wwr_yellow_orange text-black px-6 py-3 rounded-lg'
        >
          {acf.cta_link?.title}
        </a>
      </section>
    </div>
  );
};

export default ForEducatorsTemplate;
