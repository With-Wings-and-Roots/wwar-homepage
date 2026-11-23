
import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';
import { fetchMediaByIds, fetchMediaFromId } from '@/utilities/media';
import VisualStrip from '../common/visualStrip';
import gfx_bg_blue from '@/public/bg_blue.png';

import {
  fetchAllTopics,
  getAllPersons,
  getStoryById,
} from '@/utilities/stories';

import StoryPageComponent from '../page/storyPageComponent';
import StoryCardContainer from '../stories/StoryCardContainer';
import { createLocalLink } from '@/utilities/links';
import Team from '../common/TeamModal';
import { getTeamMemberById } from '@/utilities/team';

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

const hasContent = (value) => {
  if (value === null || value === undefined || value === false) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'object') {
    return Object.values(value).some(hasContent);
  }

  return true;
};

const hasItems = (value) => Array.isArray(value) && value.length > 0;

const getEmbedUrl = (url) => {
  if (!url || typeof url !== 'string') return null;

  try {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const parsedUrl = new URL(url);
      const id = url.includes('youtu.be')
        ? parsedUrl.pathname.split('/').filter(Boolean).pop()
        : parsedUrl.searchParams.get('v');

      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (url.includes('vimeo.com')) {
      const parsedUrl = new URL(url);
      const id = parsedUrl.pathname.split('/').filter(Boolean).pop();

      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch (error) {
    console.error('Invalid video URL:', url, error);
  }

  return null;
};

const resolveMedia = async (field) => {
  if (!field) return null;

  if (typeof field === 'number') {
    return await fetchMediaFromId(field).catch(() => null);
  }

  if (typeof field === 'object') {
    return field;
  }

  return null;
};

// --------------------------------------------------
// COMPONENT
// --------------------------------------------------

const SingleFilmTemplate = async ({
  data,
  film,
  params,
  relatedSlug,
}) => {
  const acf = film?.acf || {};
  const lang = params.lang;
  const deepSlug = params.deepSlug || '';

  // --------------------------------------------------
  // TEAM
  // --------------------------------------------------

  const team = Array.isArray(acf.team) ? acf.team : [];

  const relatedTeams = await Promise.all(
    team.map(async (teamItem) => {
      const members = Array.isArray(teamItem.team_member)
        ? (
            await Promise.all(
              teamItem.team_member.map((id) =>
                getTeamMemberById(id, lang).catch(() => null)
              )
            )
          ).filter(Boolean)
        : [];

      return {
        team_title: teamItem.role || '',
        related_members: members,
      };
    })
  );

  const formattedTeams = relatedTeams
    .map((teamItem) => ({
      team_title: teamItem.team_title.replace(/\r\n/g, ' ').trim(),
      member: teamItem.related_members?.[0] || null,
    }))
    .filter(
      (item) => item.member || hasContent(item.team_title)
    );

  // --------------------------------------------------
  // GENERAL DATA
  // --------------------------------------------------

  const [allPersons, topics] = await Promise.all([
    getAllPersons(),
    fetchAllTopics(lang),
  ]);

  const embedUrl = getEmbedUrl(acf.trailer);

  // --------------------------------------------------
  // MEDIA
  // --------------------------------------------------

  const [
    heroMedia,
    posterMedia,
    directorMedia,
    galleryMedia,
  ] = await Promise.all([
    resolveMedia(acf.hero_image),
    resolveMedia(acf.poster_image),
    resolveMedia(acf.director_image),
    Promise.all(
      (Array.isArray(acf.gallery) ? acf.gallery : []).map(
        (img) => resolveMedia(img)
      )
    ),
  ]);

  // --------------------------------------------------
  // RELATED STORIES
  // --------------------------------------------------

  const relatedStoryIds = Array.isArray(acf.related_stories)
    ? acf.related_stories
    : [];

  const relatedStories = relatedStoryIds.length
    ? (
        await Promise.all(
          relatedStoryIds.map((id) =>
            getStoryById(id, lang).catch(() => null)
          )
        )
      ).filter(Boolean)
    : [];

  // --------------------------------------------------
  // PEOPLE
  // --------------------------------------------------

  const peopleMedia = await Promise.all(
    (Array.isArray(acf.person) ? acf.person : []).map(
      async (person) => {
        const media = await resolveMedia(person?.image);

        return {
          ...person,
          media,
        };
      }
    )
  );

  // --------------------------------------------------
  // ALL MEDIA
  // --------------------------------------------------

  const mediaIds = [
    ...new Set([
      ...relatedStories
        .map((story) => story?.featured_media)
        .filter((id) => id && typeof id === 'number'),

      ...formattedTeams
        .map((item) => item?.member?.acf?.profile_icon)
        .filter((id) => id && typeof id === 'number'),
    ]),
  ];

  const allMedia = mediaIds.length
    ? await fetchMediaByIds(mediaIds, lang)
    : [];

  // --------------------------------------------------
  // LAURELS
  // --------------------------------------------------

  const laurelsMedia = await Promise.all(
    (Array.isArray(acf.award_laurals) ? acf.award_laurals : []).map(
      async (award) => resolveMedia(award?.laural)
    )
  );

  const validLaurels = laurelsMedia.filter(
    (media) => hasContent(media?.source_url)
  );

  // --------------------------------------------------
  // SECTION CONDITIONS
  // --------------------------------------------------

  const validAwards = (
    Array.isArray(acf.award_list) ? acf.award_list : []
  ).filter((award) => hasContent(award?.award_name));

  const validScreenings = (
    Array.isArray(acf.screening_list) ? acf.screening_list : []
  ).filter((screening) => hasContent(screening?.screening_text));

  const validPlatforms = (
    Array.isArray(acf.platforms) ? acf.platforms : []
  ).filter((platform) => hasContent(platform?.platform_name));

  const validWatchCtas = (
    Array.isArray(acf.watch_now_ctas) ? acf.watch_now_ctas : []
  ).filter((cta) => hasContent(cta?.cta?.url));

  const validSelectedPress = (
    Array.isArray(acf.selected_press) ? acf.selected_press : []
  ).filter(
    (item) =>
      hasContent(item?.quote) ||
      hasContent(item?.news_outlet)
  );

  const validPeople = peopleMedia.filter(
    (person) =>
      hasContent(person?.name) ||
      hasContent(person?.role) ||
      hasContent(person?.short_text) ||
      hasContent(person?.media?.source_url)
  );

  const validGallery = galleryMedia.filter(
    (media) => hasContent(media?.source_url)
  );

  const hasAbout =
    hasContent(acf.short_synopsis) ||
    hasContent(acf.full_synopsis);

  const hasDirector = hasContent(acf.director_statment);

  const hasAwards =
    validAwards.length > 0 ||
    validLaurels.length > 0 ||
    validScreenings.length > 0;

  const hasWatch = validWatchCtas.length > 0;

  const hasTeam = formattedTeams.length > 0;

  const hasRelatedStories = relatedStories.length > 0;

  const screeningUrl = acf.get_screening_cta?.url;

  const baseLink = createLocalLink(
    `/${lang}/${data?.slug}/${deepSlug}/`
  );

  return (
    <div className="flex flex-col gap-24 -mt-20 mb-20">

      {/* RELATED STORY OVERLAY */}

      {relatedSlug &&
        relatedStories.some((story) => story.slug === relatedSlug) && (
          <StoryPageComponent
            lang={lang}
            paramsStory={relatedSlug}
            stories={relatedStories}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={baseLink}
            closeLink={baseLink}
          />
        )}

      {/* BACKGROUND */}

      <div className="fixed inset-0 -z-10">
        <Image
          src={gfx_bg_blue}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
        />
      </div>

      {/* 1. HERO */}

      {(heroMedia?.source_url || hasContent(film?.title?.rendered)) && (
        <section className="relative w-full h-[80vh]">

          {heroMedia?.source_url && (
            <Image
              src={heroMedia.source_url}
              alt={film?.title?.rendered || ''}
              fill
              priority
              className="object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 px-8 md:px-16 xl:px-48 flex items-end pb-10">
            <div className="text-white max-w-2xl">

              {hasContent(film?.title?.rendered) && (
                <h1 className="text-4xl md:text-6xl font-bold">
                  {film.title.rendered}
                </h1>
              )}

              {(hasContent(acf.year) || hasContent(acf.runtime)) && (
                <p className="mt-2 text-lg">
                  {hasContent(acf.year) && acf.year.slice(0, 4)}
                  {hasContent(acf.year) && hasContent(acf.runtime) && ' • '}
                  {hasContent(acf.runtime) && acf.runtime}
                </p>
              )}

              {hasContent(acf.tagline) && (
                <p className="mt-4">{acf.tagline}</p>
              )}

              {(embedUrl ||
                (Array.isArray(acf.ctas) &&
                  acf.ctas.some((cta) => hasContent(cta?.link?.url)))) && (
                <div className="mt-6 flex gap-4 flex-wrap">

                  {embedUrl && (
                    <a
                      href="#trailer"
                      className="bg-wwr_yellow_orange text-black text-sm rounded-lg lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex"
                    >
                      {lang === 'en' ? 'Watch Trailer' : 'Trailer ansehen'}
                    </a>
                  )}

                  {(Array.isArray(acf.ctas) ? acf.ctas : [])
                    .filter((cta) => hasContent(cta?.link?.url))
                    .map((cta, i) => (
                      <a
                        key={i}
                        href={cta.link.url}
                        target={cta.link.target || '_self'}
                        rel={
                          cta.link.target === '_blank'
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex"
                      >
                        {cta.link.title || 'Learn More'}
                      </a>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2. TRAILER */}

      {embedUrl && (
        <section id="trailer" className="px-8 md:px-16 xl:px-48">
          <div className="max-w-4xl">

            <h2 className="text-2xl lg:text-4xl font-medium mb-6">
              {lang === 'en' ? 'Watch Trailer' : 'Trailer ansehen'}
            </h2>

            {hasContent(acf.description) && (
              <p className="font-light text-lg mb-2">
                {acf.description}
              </p>
            )}

            <iframe
              src={embedUrl}
              title="Film trailer"
              className="w-full aspect-video"
              allowFullScreen
            />

            {hasContent(screeningUrl) && (
              <>
                <p className="font-light text-lg my-4">
                  {lang === 'en'
                    ? 'Interested in screening this film in your community?'
                    : 'Interessiert daran, diesen Film in Ihrer Gemeinde zu zeigen?'}
                </p>

                <a
                  href={screeningUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex"
                >
                  {acf.get_screening_cta.title || 'Request Screening'}
                </a>
              </>
            )}
          </div>
        </section>
      )}

      {/* 3. ABOUT */}

      {hasAbout && (
        <section className="px-8 md:px-16 xl:px-48">

          {hasContent(acf.short_synopsis) && (
            <>
              <h2 className="text-2xl lg:text-4xl font-medium mb-6">
                {lang === 'en' ? 'About the Film' : 'Über den Film'}
              </h2>

              <div className="grid md:grid-cols-2 mb-6 gap-4 items-center">

                {posterMedia?.source_url && (
                  <Image
                    src={posterMedia.source_url}
                    alt={posterMedia.alt || 'Film poster'}
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                )}

                <WysiwygContent
                  className="font-light text-lg mb-2"
                  content={acf.short_synopsis}
                />
              </div>
            </>
          )}

          {hasContent(acf.full_synopsis) && (
            <>
              <h2 className="text-2xl lg:text-4xl font-medium mb-6">
                {lang === 'en'
                  ? 'Full Synopsis'
                  : 'Vollständige Synopsis'}
              </h2>

              <WysiwygContent
                className="font-light text-lg mb-2"
                content={acf.full_synopsis}
              />
            </>
          )}
        </section>
      )}

      {/* 4. DIRECTOR */}

      {hasDirector && (
        <section className="px-8 md:px-16 xl:px-48">

          <h2 className="text-2xl lg:text-4xl font-medium">
            {lang === 'en'
              ? "Director's Statement"
              : 'Statement des Regisseurs'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 items-center mt-12">

            {directorMedia?.source_url && (
              <Image
                src={directorMedia.source_url}
                alt={directorMedia.alt || 'Director'}
                width={300}
                height={300}
                className="rounded-full"
              />
            )}

            <div className="md:col-span-2 relative">

              <span className="absolute -top-6 -left-4 text-6xl text-gray-300 font-serif">
                “
              </span>

              <div className="relative z-10">
                <WysiwygContent
                  className="text-lg font-light"
                  content={acf.director_statment}
                />
              </div>

              <span className="block text-right text-6xl text-gray-300 font-serif mt-4">
                ”
              </span>

            </div>
          </div>
        </section>
      )}

      {/* 5. GALLERY */}

      {validGallery.length > 0 && (
        <section className="px-8 md:px-16 xl:px-48 py-16">

          <h2 className="text-2xl lg:text-4xl font-medium mb-6">
            {lang === 'en' ? 'Film Stills' : 'Filmszenen'}
          </h2>

          <div className="w-full md:w-[70%] mx-auto">
            <VisualStrip acf={acf} lang={lang} />
          </div>

        </section>
      )}

      {/* 6. PEOPLE */}

      {validPeople.length > 0 && (
        <section className="px-8 md:px-16 xl:px-48">

          <h2 className="text-2xl lg:text-4xl font-medium mb-6">
            {lang === 'en' ? 'People in the Film' : 'Personen im Film'}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {validPeople.map((person, i) => (
              <div
                key={i}
                className="flex items-center flex-col"
              >

                {person?.media?.source_url && (
                  <div className="w-[300px] h-[300px] relative">

                    <Image
                      src={person.media.source_url}
                      alt={person.media.alt || person.name || ''}
                      fill
                      className="object-cover rounded-full"
                    />

                  </div>
                )}

                {hasContent(person?.name) && (
                  <h3 className="text-lg font-light">
                    {person.name}
                  </h3>
                )}

                {hasContent(person?.role) && (
                  <p className="text-sm font-medium">
                    {person.role}
                  </p>
                )}

                {hasContent(person?.short_text) && (
                  <WysiwygContent
                    content={person.short_text}
                    className="text-sm font-light mt-2"
                  />
                )}

              </div>
            ))}

          </div>
        </section>
      )}

      {/* 7. AWARDS & FESTIVALS */}

      {hasAwards && (
        <section className="bg-wwr_yellow_orange pt-6">

          <section className="px-8 md:px-16 xl:px-48">

            <h2 className="text-2xl lg:text-4xl font-medium pt-12 mb-6">
              {lang === 'en'
                ? 'Awards & Festivals'
                : 'Auszeichnungen & Festivals'}
            </h2>

            {hasContent(acf.short_framing_heading) && (
              <p className="text-lg font-light mb-4">
                {acf.short_framing_heading}
              </p>
            )}

            {validAwards.length > 0 && (
              <div className="mb-6">

                {validAwards.map((award, i) => (
                  <p key={i} className="text-sm font-light">
                    {award.award_name}
                  </p>
                ))}

              </div>
            )}

            {validLaurels.length > 0 && (
              <>
                <h2 className="text-2xl lg:text-4xl font-medium pt-12 mb-6">
                  {lang === 'en' ? 'Laurels' : 'Lorbeeren'}
                </h2>

                <div className="flex flex-wrap gap-2 justify-start items-center mb-6">

                  {validLaurels.map((media, i) => (
                    <Image
                      key={media.id || i}
                      src={media.source_url}
                      alt={media.alt || ''}
                      width={media.width || 160}
                      height={media.height || 160}
                      className="object-contain"
                    />
                  ))}

                </div>
              </>
            )}

            {validScreenings.length > 0 && (
              <>
                <h2 className="text-2xl lg:text-4xl font-medium pt-12 mb-6">
                  {lang === 'en' ? 'Screenings' : 'Vorführungen'}
                </h2>

                <div className="mb-6 pb-12">

                  {validScreenings.map((screening, i) => (
                    <p key={i} className="text-sm font-light">
                      {screening.screening_text}
                    </p>
                  ))}

                </div>
              </>
            )}

          </section>
        </section>
      )}

      {/* 8. SELECTED PRESS */}

      {validSelectedPress.length > 0 && (
        <section className="bg-wwr_black text-white py-16 -mt-24 px-8 md:px-16 xl:px-48">

          <h2 className="text-2xl lg:text-4xl font-medium mb-8">
            {lang === 'en'
              ? 'Selected Press & Feedback'
              : 'Ausgewählte Presse & Feedback'}
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {validSelectedPress.map((item, i) => (
              <div
                key={i}
                className="rounded-lg block text-black p-6 bg-wwr_yellow_orange hover:bg-wwr_yellow_orange_hovered transition"
              >

                {hasContent(item?.quote) && (
                  <p className="font-light text-lg mb-2">
                    {item.quote}
                  </p>
                )}

                {hasContent(item?.news_outlet) && (
                  <span className="text-sm font-semibold">
                    — {item.news_outlet}
                  </span>
                )}

                {hasContent(item?.source_link) && (
                  <a
                    href={item.source_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-sm underline"
                  >
                    {lang === 'en' ? 'Read more' : 'Mehr erfahren'}
                  </a>
                )}

              </div>
            ))}

          </div>
        </section>
      )}

      {/* 9. WHERE TO WATCH */}

      {hasWatch && (
        <section className="px-8 md:px-16 xl:px-48">

          <h2 className="text-2xl lg:text-4xl font-medium mb-8">
            {acf?.avaiability_text ||
              (lang === 'en' ? 'Where to Watch' : 'Wo ansehen')}
          </h2>

          {validPlatforms.length > 0 && (
            <div className="mb-4">

              {validPlatforms.map((platform, i) => (
                <p key={i} className="text-sm font-light">
                  {platform.platform_name}
                </p>
              ))}

            </div>
          )}

          {hasContent(acf.region_note) && (
            <p className="text-sm font-medium mb-4 text-wwr_teal">
              {acf.region_note}
            </p>
          )}

          <div className="mb-4 flex flex-wrap gap-4">

            {validWatchCtas.map((cta, i) => (
              <a
                key={i}
                href={cta.cta.url}
                target={cta.cta.target || '_blank'}
                rel="noopener noreferrer"
                className="rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex"
              >
                {cta.cta.title || 'Watch Now'}
              </a>
            ))}

          </div>

        </section>
      )}

      {/* 10. SCREENING CTA */}

      {hasContent(screeningUrl) && (
        <section className="px-8 md:px-16 xl:px-48">

          {hasContent(acf.short_text) && (
            <p className="font-light text-lg mb-4">
              {acf.short_text}
            </p>
          )}

          <a
            href={screeningUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex"
          >
            {acf.get_screening_cta.title || 'Request Screening'}
          </a>

        </section>
      )}

      {/* 11. TEAM */}

      {hasTeam && (
        <section className="px-8 md:px-16 xl:px-48">

          <h2 className="text-2xl lg:text-4xl font-medium mb-8">
            {lang === 'en' ? 'Team' : 'Team'}
          </h2>

          <ul className="flex flex-wrap gap-8 justify-center xl:justify-start">

            {formattedTeams.map((teamItem, i) => {
              const member = teamItem.member;

              const mediaUrl = allMedia?.find(
                (media) =>
                  media.id === member?.acf?.profile_icon
              )?.source_url;

              return (
                <li
                  key={i}
                  className="flex flex-col items-center"
                >

                  {member && (
                    <Team
                      member={member}
                      mediaUrl={mediaUrl}
                      baseLink={baseLink}
                    />
                  )}

                  {hasContent(teamItem.team_title) && (
                    <p className="font-light text-lg mb-4">
                      {teamItem.team_title}
                    </p>
                  )}

                </li>
              );
            })}

          </ul>
        </section>
      )}

      {/* 12. RELATED STORIES */}

      {hasRelatedStories && (
        <section className="px-8 md:px-16 xl:px-48 py-12">

          <h2 className="text-2xl lg:text-4xl font-medium mb-6">
            {lang === 'en'
              ? 'Related Stories'
              : 'Verwandte Geschichten'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10">

            <StoryCardContainer
              storiesToRender={relatedStories}
              lang={lang}
              allMedia={allMedia}
              allPersons={allPersons}
              baseLink={baseLink}
            />

          </div>
        </section>
      )}

    </div>
  );
};

export default SingleFilmTemplate;
