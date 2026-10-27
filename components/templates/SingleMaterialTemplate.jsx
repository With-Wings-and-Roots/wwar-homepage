
import Image from 'next/image';

import { fetchMediaFromId } from '@/utilities/media';
import { createLocalLink } from '@/utilities/links';
import {
  fetchAllTopics,
  getAllPersons,
  getStoryById,
} from '@/utilities/stories';
import { getTimelineEventById } from '@/utilities/timeline';
import { getTeamMemberById } from '@/utilities/team';

import WysiwygContent from '../common/WysiwygContent';
import Buttons from '../common/Buttons';
import StoryCardContainer from '../stories/StoryCardContainer';
import PageComponent from '../page/storyPageComponent';
import RelatedEvents from '../timelineEvent/relatedEvents';
import Team from '../common/TeamModal';

const resolveMedia = async (field) => {
  if (!field) return null;

  if (typeof field === 'object') {
    return field.source_url ? field : null;
  }

  const id = Number(field);

  if (!Number.isFinite(id) || id <= 0) return null;

  return fetchMediaFromId(id).catch(() => null);
};

const getVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;

  const parts = url.split('/').filter(Boolean);
  return parts.pop() || null;
};

const renderImageVideo = async (item) => {
  if (!item) return null;

  if (item.acf_fc_layout === 'image') {
    const media = await resolveMedia(item.image);

    if (!media?.source_url) return null;

    return (
      <Image
        src={media.source_url}
        alt={media.alt_text || ''}
        width={media.media_details?.width || 1200}
        height={media.media_details?.height || 800}
        className="h-[60vh] w-full object-cover"
      />
    );
  }

  if (item.acf_fc_layout === 'video') {
    const videoId = getVideoId(item.video);

    if (!videoId) return null;

    return (
      <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        title="Material video"
        className="aspect-video w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return null;
};

const SingleMaterialTemplate = async ({ material, data, params }) => {
  const lang = params?.lang || 'en';
  const film = material?.[0];
  const title = film?.title || 'Material';
  const acf = film?.acf || {};

  if (!film) return null;

  // --------------------------------------------------
  // 1. Determine which related sections are required
  // --------------------------------------------------

  const relatedContent = acf.related_content || [];
  const team = acf.team || [];
  const heroMedia = acf.imagevideo?.[0] || null;

  const relationType = (content) =>
    content?.related_content_type?.[0]?.acf_fc_layout;

  const timelineContents = relatedContent.filter(
    (content) => relationType(content) === 'related_timeline'
  );

  const storyContents = relatedContent.filter(
    (content) => relationType(content) === 'related_stories'
  );

  const nestedSlugs = params?.relatedPosts || [];
  const nestedStorySlug =
    nestedSlugs.length > 1 && nestedSlugs[0] === 'story'
      ? nestedSlugs[1]
      : null;

  const nestedStoryIds = nestedStorySlug
    ? storyContents.flatMap(
        (content) =>
          content.related_content_type?.[0]?.related_stories || []
      )
    : [];

  const allRelatedStoryIds = [
    ...new Set(
      [
        ...storyContents.flatMap(
          (content) =>
            content.related_content_type?.[0]?.related_stories || []
        ),
        ...nestedStoryIds,
      ].filter(Boolean)
    ),
  ];

  // --------------------------------------------------
  // 2. Resolve hero, stories, timelines and team in
  //    parallel instead of waiting for each operation
  // --------------------------------------------------

  const storyCache = new Map();
  const timelineCache = new Map();
  const teamCache = new Map();

  const getStory = (id) => {
    if (!storyCache.has(id)) {
      storyCache.set(
        id,
        getStoryById(id, lang).catch(() => null)
      );
    }

    return storyCache.get(id);
  };

  const getTimeline = (id) => {
    if (!timelineCache.has(id)) {
      timelineCache.set(
        id,
        getTimelineEventById(id, lang).catch(() => null)
      );
    }

    return timelineCache.get(id);
  };

  const getTeamMember = (id) => {
    if (!teamCache.has(id)) {
      teamCache.set(
        id,
        getTeamMemberById(id, lang).catch(() => null)
      );
    }

    return teamCache.get(id);
  };

  const hasTeam = team.some(
    (item) => item.related_memebers?.length > 0
  );

  const needsStoryPageData = Boolean(nestedStorySlug);

  const [
    heroContent,
    relatedStories,
    processedContent,
    relatedTeams,
    topics,
    allPersons,
  ] = await Promise.all([
    // Fetch the hero only if it exists.
    heroMedia ? renderImageVideo(heroMedia) : Promise.resolve(null),

    // Shared cache prevents duplicate story requests.
    Promise.all(allRelatedStoryIds.map(getStory)).then((items) =>
      items.filter(Boolean)
    ),

    // Fetch only the related timeline/story items configured
    // for this material.
    Promise.all(
      relatedContent.map(async (content) => {
        const relation = content?.related_content_type?.[0];

        if (relation?.acf_fc_layout === 'related_timeline') {
          const ids = relation.related_timelines || [];

          const res = await Promise.all(ids.map(getTimeline));

          return {
            ...content,
            res: res.filter(Boolean),
          };
        }

        if (relation?.acf_fc_layout === 'related_stories') {
          const ids = relation.related_stories || [];

          const res = await Promise.all(ids.map(getStory));

          return {
            ...content,
            res: res.filter(Boolean),
          };
        }

        return { ...content, res: [] };
      })
    ),

    // Skip the entire team fetch when there is no team data.
    hasTeam
      ? Promise.all(
          team.map(async (teamItem) => {
            const members = await Promise.all(
              (teamItem.related_memebers || []).map(async (item) => {
                const memberId = item?.member?.[0];

                if (!memberId) return null;

                const member = await getTeamMember(memberId);

                if (!member) return null;

                return {
                  member,
                  specific_role: item.specific_role || '',
                };
              })
            );

            return {
              team_title: teamItem.team_title || '',
              related_members: members.filter(Boolean),
            };
          })
        )
      : Promise.resolve([]),

    // Topics and people are needed only by the nested story page.
    needsStoryPageData
      ? fetchAllTopics(lang)
      : Promise.resolve([]),

    needsStoryPageData
      ? getAllPersons()
      : Promise.resolve([]),
  ]);

  // --------------------------------------------------
  // 3. Fetch only media actually used by the page
  // --------------------------------------------------

  const mediaIds = [
    ...relatedStories.map((story) => story?.featured_media),

    ...processedContent.flatMap((content) =>
      (content.res || []).map((item) => item?.featured_media)
    ),

    ...relatedTeams.flatMap((teamItem) =>
      teamItem.related_members.map(
        (item) => item?.member?.acf?.profile_icon
      )
    ),
  ];

  const uniqueMediaIds = [
    ...new Set(
      mediaIds
        .filter(Boolean)
        .map(Number)
        .filter((id) => Number.isFinite(id) && id > 0)
    ),
  ];

  const allMedia = uniqueMediaIds.length
    ? (
        await Promise.all(
          uniqueMediaIds.map((id) =>
            fetchMediaFromId(id).catch(() => null)
          )
        )
      ).filter(Boolean)
    : [];

  const getMediaUrl = (id) =>
    allMedia.find((media) => media.id === Number(id))?.source_url;

  // --------------------------------------------------
  // 4. Render the page
  // --------------------------------------------------

  return (
    <div className="mb-20 -mt-20 flex flex-col pt-20">
      {nestedStorySlug &&
        relatedStories.some(
          (story) => story.slug === nestedStorySlug
        ) && (
          <PageComponent
            lang={lang}
            paramsStory={nestedStorySlug}
            stories={relatedStories}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            baseLink={createLocalLink(
              `/${lang}/${data?.slug}/${params?.deepSlug}/story/`
            )}
            closeLink={createLocalLink(
              `/${lang}/${data?.slug}/${params?.deepSlug}/`
            )}
          />
        )}

      {/* HERO */}
      <section className="relative flex min-h-[60vh] flex-col items-center gap-8 px-8 py-16 md:px-16 xl:flex-row xl:items-start xl:px-48">
        <div className="flex w-full justify-center xl:w-1/2">
          {heroContent}
        </div>

        <div className="flex w-full flex-col justify-center text-center xl:w-1/2 xl:text-left">
          <h1 className="mb-4 text-4xl font-light md:text-6xl">
            {acf.title || title}
          </h1>

          {acf.text && (
            <WysiwygContent
              content={acf.text}
              className="text-lg font-light"
            />
          )}
        </div>
      </section>

      {/* QUICK FACTS */}
      {acf.quick_facts?.length > 0 && (
        <section className="px-8 pt-12 md:px-16 xl:px-48">
          <div className="grid grid-cols-1 gap-8 rounded-lg bg-wwr_teal p-8 text-wwr_white md:grid-cols-2 lg:grid-cols-4">
            {acf.quick_facts.map((fact, i) => (
              <div key={i}>
                <h4 className="text-sm font-bold uppercase">
                  {fact.title}
                </h4>
                <p className="text-lg">{fact.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BUTTONS / DOWNLOADS */}
      {acf.buttons?.length > 0 && (
        <section className="px-8 py-12 md:px-16 xl:px-48">
          <div className="flex flex-wrap gap-4">
            <Buttons buttons={acf.buttons} />
          </div>
        </section>
      )}

      {/* LEARNING GOALS */}
      {acf.learning_goals?.length > 0 && (
        <section className="px-8 py-12 md:px-16 xl:px-48">
          {acf.learning_goals.map((goal, i) => (
            <div key={i} className="mb-8">
              {goal.heading && (
                <h3 className="mb-2 text-2xl font-bold">
                  {goal.heading}
                </h3>
              )}

              {goal.explanation && (
                <WysiwygContent
                  content={goal.explanation}
                  className="prose text-lg font-light"
                />
              )}
            </div>
          ))}
        </section>
      )}

      {/* RELATED VIDEOS */}
      {acf.related_videos?.length > 0 && (
        <section className="px-8 py-12 md:px-16 xl:px-48">
          <h3 className="mb-4 text-2xl font-bold">
            Related Videos
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {acf.related_videos.map((video, i) => {
              const videoId = getVideoId(video.related_videos);

              if (!videoId) return null;

              return (
                <div key={i} className="w-full">
                  <div className="mb-3 aspect-video w-full">
                    <iframe
                      src={`https://player.vimeo.com/video/${videoId}`}
                      title={video.video_title || 'Related video'}
                      className="h-full w-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {video.video_title && (
                    <h4 className="text-lg font-light">
                      {video.video_title}
                    </h4>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* RELATED TIMELINES AND STORIES */}
      {processedContent.map((content, i) => {
        const type = content.related_content_type?.[0]?.acf_fc_layout;

        if (type === 'related_timeline') {
          return (
            <section
              key={i}
              className="px-8 py-12 md:px-16 xl:px-48"
            >
              <h3 className="mb-4 text-2xl font-bold">
                {content.heading}
              </h3>

              <RelatedEvents
                relatedEvents={content.res}
                lang={lang}
                baseLink={createLocalLink(`/${lang}/timelines/`)}
                allMedia={allMedia}
                person=""
                showHeading={false}
              />
            </section>
          );
        }

        if (type === 'related_stories') {
          return (
            <section
              key={i}
              className="px-8 py-12 md:px-16 xl:px-48"
            >
              <h3 className="mb-4 text-2xl font-bold">
                {lang === 'en' ? 'Stories' : 'Geschichten'}
              </h3>

              <h4 className="text-lg font-light">
                {content.heading}
              </h4>

              <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                <StoryCardContainer
                  storiesToRender={content.res}
                  lang={lang}
                  allMedia={allMedia}
                  allPersons={allPersons}
                  baseLink={createLocalLink(
                    `/${lang}/${data?.slug}/${params?.deepSlug}/story/`
                  )}
                />
              </div>
            </section>
          );
        }

        return null;
      })}

      {/* EDUCATIONAL QUESTIONS */}
      {acf.questions?.length > 0 && (
        <section className="px-8 py-12 md:px-16 xl:px-48">
          <h3 className="mb-4 text-2xl font-bold">
            {lang === 'en'
              ? 'Educational Questions'
              : 'Leitfragen'}
          </h3>

          {acf.questions.map((question, i) => (
            <WysiwygContent
              key={i}
              content={question.question}
              className="prose max-w-none text-lg font-light"
            />
          ))}
        </section>
      )}

      {/* TEAM */}
      {relatedTeams.map(
        (teamItem, i) =>
          teamItem.related_members.length > 0 && (
            <section
              key={i}
              className="px-8 py-12 md:px-16 xl:px-48"
            >
              <h4 className="mb-6 text-center text-xl font-semibold xl:text-left">
                {teamItem.team_title}
              </h4>

              <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {teamItem.related_members.map((item) => (
                  <li key={item.member.id}>
                    <Team
                      member={item.member}
                      mediaUrl={getMediaUrl(
                        item.member?.acf?.profile_icon
                      )}
                      role={item.specific_role}
                      baseLink={`/${lang}/team/`}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )
      )}
    </div>
  );
};

export default SingleMaterialTemplate;
