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
import WorkshopQuotes from '../workshops/WorkshopQuotes';
import gfx_quote from '@/public/quote-black.svg';

const ForEducatorsTemplate = async ({ data, lang = 'en' }) => {
  const acf = data?.acf || {};

  const featuredWorkshopIds = acf?.featured_workshops || [];

  const featuredWorkshops1 = await Promise.all(
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
  const featuredWorkshops = [...featuredWorkshops1, ...featuredWorkshops1, ...featuredWorkshops1]

 const team = acf?.team || [];

const relatedTeams = await Promise.all(
  team.map(async (team) => {
    const members = Array.isArray(team.team_member)
      ? (
          await Promise.all(
            team.team_member.map((id) =>
              getTeamMemberById(id, lang).catch(() => null)
            )
          )
        ).filter(Boolean)
      : [];

    return {
      team_title: team.role,
      related_members: members,
    };
  })
);

const formattedTeams= await Promise.all(
  relatedTeams.map(async (team) => {
    const member = team.related_members?.[0] || null;

    // ✅ fetch image directly from profile_icon ID
    let mediaUrl = null;

    const imageId = member?.acf?.profile_icon;

    if (imageId) {
      const media = await fetchMediaFromId(imageId);
      mediaUrl = media?.source_url || null;
    }

    return {
      team_title: team.team_title.replace(/\r\n/g, ' ').trim(),
      member,
      mediaUrl,
    };
  })
);

  return (
    <div className='flex flex-col gap-24 -mt-20 mb-20'>
      {/* HERO */}
      <section className="relative w-full">

  <div className="max-w-[1180px] mx-auto pt-[72px] px-8 md:px-16 xl:px-0 grid md:grid-cols-2 gap-12 items-center">

    {/* TEXT */}
    <div className="max-w-[560px]">
      
      <h1 className="text-[52px] leading-[1.1] font-bold">
{data.title.rendered}      </h1>

      <div className="mt-4 text-[19px] leading-[1.5] max-w-[560px]">
        <WysiwygContent content={acf.intro_text} />
      </div>

      <div className="mt-6 flex gap-4 flex-wrap">
        {acf?.ctas?.map((cta, i) => (
          <a
            key={i}
            href={cta?.primary_ctas?.url}
            className="h-[50px] px-[24px] flex items-center bg-wwr_yellow_orange rounded-md"
          >
            {cta?.primary_ctas?.title}
          </a>
        ))}
      </div>
    </div>

    {/* IMAGE (keeps visual weight, not full bleed) */}
    <div className="relative h-[520px] w-full rounded-[20px] overflow-hidden">
      {acf.intro_header_image && (
        <Image
          src={acf.intro_header_image}
          alt="Educators"
          fill
          className="object-cover"
          priority
        />
      )}
    </div>

  </div>

</section>
 {/* CONNECTED LEARNING */}
      <section className='px-8 md:px-16 xl:px-48 '>

        <div
          className='font-light max-w-3xl '
          dangerouslySetInnerHTML={{
            __html: acf.connected_learning_text,
          }}
        />
      </section>

      {/* WHAT WE OFFER */}
      <section className="max-w-[1180px] mx-auto py-[80px] px-8 md:px-16 xl:px-0">

  <h2 className="text-[36px] font-medium mb-10">
{  lang === 'en' ? 'What We Offer' : 'Was wir anbieten'
}  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    {acf.what_we_offer?.map((item, i) => (
      <a
        key={i}
        href={item.link?.url}
        className="group block rounded-[16px] overflow-hidden bg-white hover:shadow-lg transition"
      >

        {/* IMAGE */}
        <div className="relative h-[230px]">
          {item.icon && (
            <Image
              src={item.icon}
              alt=""
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="p-[24px]">

          <h3 className="text-[22px] font-medium mb-2">
            {item.title || "Untitled"}
          </h3>

          <div
                  className='font-light'
                  dangerouslySetInnerHTML={{
                    __html: item.description || '',
                  }}
                />
          <span className="mt-4 inline-block text-wwr_teal text-[16px]">
            Explore →
          </span>

        </div>

      </a>
    ))}

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

      {/* FEATURED WORKSHOPS */}
      <section className='bg-wwr_yellow_orange/20 py-16 px-8 md:px-16 xl:px-48'>
        <h2 className='text-3xl font-medium mb-10 text-black'>
          {acf.featured_heading}
        </h2>

        <div className='grid md:grid-cols-12 gap-10'>

  {/* LARGE FEATURED CARD */}
  {featuredWorkshops?.[0] && (
    <Link
      key={featuredWorkshops[0].id}
      href={createLocalLink(`/${lang}/workshops/${featuredWorkshops[0].slug}`)}
      className='md:col-span-7 group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition'
    >
      <div className='relative w-full h-[360px]'>
        {featuredWorkshops[0]?.image?.source_url && (
          <Image
            src={featuredWorkshops[0].image.source_url}
            alt={featuredWorkshops[0].title?.rendered || ''}
            fill
            className='object-cover group-hover:scale-105 transition'
          />
        )}
      </div>

      <div className='p-6'>
        <h3 className='text-2xl font-semibold'>
          {featuredWorkshops[0].title?.rendered}
        </h3>
        <div className='text-sm text-gray-600 mt-2 line-clamp-3'>
          <WysiwygContent
            content={featuredWorkshops[0].acf?.description}
          />
        </div>
      </div>
    </Link>
  )}

  {/* RIGHT SIDE STACK */}
  <div className='md:col-span-5 flex flex-col gap-5 py-5'>
<h1 className='text-sm font-medium text-gray-800'>
  {lang === 'en' ? 'Other Workshops' : 'Weitere Workshops'}
</h1>
  {featuredWorkshops?.slice(1, 3).map((w) => (
    <Link
      key={w.id}
      href={createLocalLink(`/${lang}/workshops/${w.slug}`)}
      className='group flex items-start gap-3 py-2 border-b border-black/10 last:border-b-0'
    >
      <h3 className='text-lg md:text-xl font-medium text-gray-800 group-hover:text-wwr_teal group-hover:underline underline-offset-4 transition leading-snug'>
        {w.title?.rendered}
      </h3>
    </Link>
  ))}

</div>
</div>
        {/* CTA */}
        <div className='mt-12 flex justify-center'>
          <a
            href={createLocalLink('/workshops')}
            className='inline-block bg-wwr_teal text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-200'
          >
            {lang === 'en' ? 'View All Workshops' : 'Alle Workshops ansehen'}
          </a>
        </div>
      </section>

      {/* GALLERY */}
      {acf?.gallery?.length > 0 && (
        <section className='px-8 md:px-16 xl:px-48 py-16'>
          <h2 className='text-2xl lg:text-4xl font-medium mb-6'>
            {lang === 'en' ? `Moments of Learning` : 'Momente des Lernens'}
          </h2>
          <div className='w-full md:w-[70%] mx-auto'>
            <VisualStrip acf={acf} lang={lang} />
          </div>
        </section>
      )}
      {/* HOW IT WORKS */}
{/* ── 6. HOW IT WORKS ─────────────────────────────────────────────────────── */}
{acf.steps?.length > 0 && (
  <section className='py-20 px-6 md:px-12 bg-white'>
    <div className='max-w-[1180px] mx-auto'>
      <h2 className='text-3xl font-semibold mb-10 text-center'>How It Works</h2>

      <div className='grid md:grid-cols-4 gap-6'>
        {[
          {
            title: 'Share Your Needs',
            body: 'Tell us about your students, goals, timeline, and learning context.',
            gradient: 'linear-gradient(135deg, #3A6F73 0%, #2F5D61 100%)',
          },
          {
            title: 'We Design Together',
            body: 'We recommend workshops, films, timelines, and resources tailored to your setting.',
            gradient: 'linear-gradient(135deg, #3A6F73 0%, #284E52 100%)',
          },
          {
            title: 'Facilitate the Experience',
            body: 'We lead interactive workshops, screenings, and dialogue-based learning experiences.',
            gradient: 'linear-gradient(135deg, #355F63 0%, #24484B 100%)',
          },
          {
            title: 'Continue the Learning',
            body: 'Participants can continue exploring films, archives, timelines, and educational resources afterward.',
            gradient: 'linear-gradient(135deg, #2F5D61 0%, #203F42 100%)',
          },
        ].map((step, i) => (
          <div
            key={i}
            className='relative p-7 rounded-[18px] min-h-[260px] flex flex-col justify-between'
            style={{ background: step.gradient }}
          >
            <span
              className='text-[44px] font-bold text-white leading-none'
              style={{ opacity: 0.4 }}
            >
              {i + 1}
            </span>
            <div>
              <h3 className='text-[22px] font-semibold text-white leading-snug mb-3'>
                {step.title}
              </h3>
              <p className='text-[15px] text-white/80 leading-[1.5]'>
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

    <section className="px-8 md:px-16 xl:px-48 py-20">
  <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-stretch">

    {/* LEFT — OUTCOMES */}
    <div className="xl:col-span-7">
      <h2 className="text-[36px] md:text-[42px] font-medium mb-6">
        {lang === 'en' ? 'Outcomes' : 'Ergebnisse'}
      </h2>

      <div className="font-light text-[18px] leading-[1.55] space-y-[12px]">
        <WysiwygContent content={acf?.outcomes} />
      </div>
    </div>

    {/* RIGHT — QUOTES (MATCH WORKSHOPS STYLE) */}
    <div className="xl:col-span-5">
      <div className="bg-wwr_yellow_orange min-h-[360px] xl:min-h-[500px] relative xl:-mt-[40px]">

        {/* QUOTE ICON */}
        <div className="flex p-6">
          <Image
            src={gfx_quote}
            alt="quote"
            width={48}
            height={48}
            className="ml-auto !w-[26px] !h-[26px] xl:!w-[48px] xl:!h-[48px]"
          />
        </div>

        {/* QUOTES */}
        <div className="p-6 pt-0 text-right xl:text-lg font-light">
          <div className="relative">
            <WorkshopQuotes quotes={acf?.intro_quotes} />
          </div>
        </div>

      </div>
    </div>

  </div>
</section>

     <section className='px-8 md:px-16 xl:px-48 py-16'>
  <h2 className='text-3xl font-medium mb-6'>
    {acf.resources_heading}
  </h2>

  <div className='grid md:grid-cols-3 gap-6 mt-10'>
    {(acf.resouces || []).map((item, i) => {
      const href = createLocalLink(item.page_link || '');

      const slug = item.page_link
        ? new URL(item.page_link).pathname.split('/').filter(Boolean).pop()
        : '';

      return (
        <Link key={i} href={href}>
          <div className='bg-wwr_yellow_orange rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group'>

            {/* IMAGE */}
            <div className='relative w-full h-40 overflow-hidden'>

              {item.icon && (
                <Image
                  src={item.icon}
                  alt=''
                  fill
                  className='object-cover group-hover:scale-105 transition duration-500'
                />
              )}

              {/* IMAGE OVERLAY ONLY */}
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition' />

              {/* BADGE */}
              {slug && (
                <div className='absolute top-3 left-3 z-10 text-[10px] uppercase tracking-widest text-wwr_yellow_orange bg-black/70 px-2 py-1 rounded'>
                  {slug}
                </div>
              )}
            </div>

            {/* TEXT (MATCH FILM STYLE FEEL) */}
            <div className='p-4'>

              <p className='text-lg text-black font-medium leading-relaxed line-clamp-2'>
                {item.description}
              </p>

              <div className='mt-3 text-wwr_teal text-sm font-medium'>
                Explore →
              </div>

            </div>

          </div>
        </Link>
      );
    })}
  </div>
</section>
     

      {/* TEAM */}
     <section className='px-8 md:px-16 xl:px-48'>
  <h2 className='text-3xl font-medium mb-8'>
    {acf.trainer_heading}
  </h2>

  {formattedTeams.length > 0 && (
     
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {formattedTeams.map((teamItem, i) => {
          const member = teamItem.member;
          const mediaUrl = teamItem.mediaUrl;

          return (
            <div key={i} className='flex flex-col items-center'>
              <Team
                member={member}
                mediaUrl={mediaUrl}
                baseLink={`/${lang}/team/`}
              />

              <p className='font-light text-lg mt-3 text-center'>
                {teamItem.team_title}
              </p>
            </div>
          );
        })}
      </div>
  )}
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
