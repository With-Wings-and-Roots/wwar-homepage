import Image from 'next/image';
import Link from 'next/link';
import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/utilities/projects';
import RelatedEvents from '../publicEvents/relatedEvents';
import RelatedBlogs from '../blogs/relatedBlogs';
import VisualStrip from '../projects/visualStrip';
import WysiwygContent from '../common/WysiwygContent';

const ProjectSingleTemplate = async ({ subSlugs, lang }) => {
  if (!subSlugs) return notFound();

  const project = await getProjectBySlug(subSlugs[0], lang);
  if (!project || project.length === 0) return notFound();

  const { title, acf } = project[0];
  console.log('Project Data:', acf);

  // Resolve banner image (media ID → URL)
  const bannerImage = acf?.banner ? await fetchMediaFromId(acf.banner) : null;

  return (
    <div className='flex flex-col -mt-20 mb-20'>
      {/* ================= HERO ================= */}
      <section className='relative min-h-[70vh] flex items-end'>
        {bannerImage?.source_url && (
          <Image
            src={bannerImage.source_url}
            alt={title?.rendered}
            fill
            priority
            className='object-cover '
          />
        )}
        <div className='absolute inset-0 bg-black/60' />

        <div className='relative z-10 px-8 md:px-16 xl:px-48 pb-20 text-white bg-gradient-to-t from-black/70 to-transparent w-full'>
          <h1 className='text-4xl md:text-6xl font-light'>
            {acf?.title || title?.rendered}
          </h1>

          {acf?.tagline && (
            <p className='mt-4 text-lg md:text-xl max-w-2xl'>{acf.tagline}</p>
          )}
        </div>
      </section>

      {/* ================= INTRO ================= */}
      {acf?.intro?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 pt-20'>
          {acf.intro.map((intro, i) => (
            <div key={i} className='grid grid-cols-1 md:grid-cols-3 gap-12'>
              {/* LEFT — Overview */}
              <div className='md:col-span-2'>
                <p className='text-lg md:text-xl font-light leading-relaxed'>
                  {intro.overview}
                </p>
              </div>

              {/* RIGHT — Quick Facts */}
              <div className='col-span-3 xl:col-span-1 p-8 bg-wwr_yellow_orange flex flex-col lg:hover:scale-105 transition-all'>
                <h3 className='font-bold text-lg lg:text-2xl'>Quick Facts</h3>

                {intro.location && (
                  <p>
                    <span className='font-bold'>Location:</span>{' '}
                    {intro.location}
                  </p>
                )}

                {intro.years && (
                  <p>
                    <span className='font-bold'>Years:</span> {intro.years}
                  </p>
                )}

                {intro.themes && (
                  <p>
                    <span className='font-bold'>Themes:</span> {intro.themes}
                  </p>
                )}

                {intro.partners?.length > 0 && (
                  <p>
                    <span className='font-bold'>Partners:</span>{' '}
                    {intro.partners.map((p) => p.name).join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {acf?.call_to_action?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 pb-20'>
          <div className='flex flex-wrap gap-4'>
            {acf.call_to_action.map((cta, i) => (
              <Link
                key={i}
                target='_blank'
                href={createLocalLink(cta.link?.url)}
                className='bg-wwr_yellow_orange text-black px-6 py-3 uppercase text-sm hover:text-white transition'
              >
                {cta.Label || cta.link?.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ================= VISUAL STRIP ================= */}
      {(acf?.gallery?.length > 0 || acf?.related_videos?.length > 0) && (
        <section className='px-8 md:px-16 xl:px-48 py-16'>
          <VisualStrip acf={acf} />
        </section>
      )}

      {/* ================= OUR APPROACH ================= */}
      {acf?.our_approach?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-32 bg-[#f7f7f7]'>
          <div className='max-w-5xl mx-auto space-y-24'>
            {acf.our_approach.map((item, i) => (
              <div key={i} className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {/* LEFT — Heading */}
                <div className='md:col-span-1'>
                  <h2 className='text-2xl md:text-4xl font-light leading-tight'>
                    {item.heading}
                  </h2>
                </div>

                {/* RIGHT — Rich Text */}
                <div className='md:col-span-2'>
                  <WysiwygContent content={item.text} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= RELATED BLOGS ================= */}
      {acf?.related_blogs?.length > 0 && (
        <RelatedBlogs relatedBlogIds={acf.related_blogs} lang={lang} />
      )}

      {/* ================= RELATED EVENTS ================= */}
      {acf?.related_events?.length > 0 && (
        <RelatedEvents
          relatedEventIds={acf?.related_events}
          baseLink='/events' // page where events are listed
          allMedia={[]} // if you want to pass media objects
          lang={lang}
        />
      )}

      {/* ================= CALL TO ACTION ================= */}
      {acf?.call_to_action?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-20'>
          <h2 className='text-3xl md:text-5xl font-light mb-8'>Get Involved</h2>

          <div className='flex flex-wrap gap-4'>
            {acf.call_to_action.map((cta, i) => (
              <Link
                key={i}
                target='_blank'
                href={createLocalLink(cta.link?.url)}
                className='bg-wwr_yellow_orange text-black px-6 py-3 uppercase text-sm hover:text-white transition'
              >
                {cta.Label || cta.link?.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {acf?.intro[0]?.partners?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-20'>
          <h2 className='text-3xl md:text-5xl font-light mb-12'>
            {lang == 'en' ? 'Our Partners' : 'Unsere Partner'}
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center'>
            {acf?.intro[0]?.partners.map(async (partner, i) => {
              const media = await fetchMediaFromId(partner.icon);
              return (
                <div
                  key={i}
                  className='flex flex-col items-center text-center gap-4'
                >
                  {media && (
                    <div className='relative w-32 h-32'>
                      <Image
                        src={media.source_url || media.url}
                        alt={partner.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                  )}
                  <span className='text-lg font-medium'>{partner.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
      {acf?.founders?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-20'>
          <h2
            className='text-3xl md:text-5xl font-light mb-12'
            dangerouslySetInnerHTML={{ __html: acf?.founder_heading }}
          />
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center'>
            {acf?.founders?.map(async (founder, i) => {
              const media = await fetchMediaFromId(founder.icon);
              return (
                <div
                  key={i}
                  className='flex flex-col items-center text-center gap-4'
                >
                  {media && (
                    <div className='relative w-32 h-32'>
                      <Image
                        src={media.source_url || media.url}
                        alt={founder.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                  )}
                  <span className='text-lg font-medium'>{founder.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectSingleTemplate;
