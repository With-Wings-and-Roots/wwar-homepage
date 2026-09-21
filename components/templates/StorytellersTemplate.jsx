import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import StoryCardContainer from '../stories/StoryCardContainer';
import StorytellerCard from '../stories/StorytellerCard';
import PageComponent from '../../components/page/storyPageComponent';

import { createLocalLink } from '@/utilities/links';

import {
  getAllPersons,
  getAllStories,
  fetchAllTopics,
} from '@/utilities/stories';

import { fetchMediaByIds } from '@/utilities/media';
import { fetchTimelinesByIds } from '@/utilities/timeline';

const StorytellersTemplate = async ({
  lang = 'en',
  params,
}) => {
  console.log('params in StorytellersTemplate:', params);

  const currentLang = params?.lang || lang;

  /*
   * ROUTE STRUCTURE
   *
   * /en/storytellers/
   *
   * params:
   * {
   *   lang: 'en',
   *   slug: 'storytellers',
   *   deepSlug: undefined,
   *   relatedPosts: undefined
   * }
   *
   *
   * /en/storytellers/abenaa/
   *
   * params:
   * {
   *   lang: 'en',
   *   slug: 'storytellers',
   *   deepSlug: 'abenaa'
   * }
   *
   *
   * /en/storytellers/abenaa/vereinzelung-vs-community-2/
   *
   * params:
   * {
   *   lang: 'en',
   *   slug: 'storytellers',
   *   deepSlug: 'abenaa',
   *   relatedPosts: ['vereinzelung-vs-community-2']
   * }
   */

  const personSlug = params?.deepSlug || null;

  const storySlug =
    params?.relatedPosts?.[0] || null;

  /*
   * Fetch persons + stories.
   *
   * These are needed to determine which stories belong
   * to each storyteller.
   */
  const [allPersons, stories] = await Promise.all([
    getAllPersons(),
    getAllStories(currentLang),
  ]);

  if (!allPersons?.length || !stories?.length) {
    return notFound();
  }

  /*
   * Attach stories to each storyteller.
   */
  const personsWithStories = allPersons
    .map((person) => {
      const personStories = stories.filter(
        (story) =>
          story?.acf?.person &&
          String(story.acf.person) === String(person.id)
      );

      if (personStories.length === 0) {
        return null;
      }

      return {
        ...person,
        stories: personStories,
      };
    })
    .filter(Boolean);

  if (personsWithStories.length === 0) {
    return notFound();
  }

  /*
   * ============================================================
   * STORYTELLER PAGE
   * ============================================================
   *
   * Example:
   *
   * /en/storytellers/abenaa/
   *
   * OR
   *
   * /en/storytellers/abenaa/vereinzelung-vs-community-2/
   *
   */

  if (personSlug) {
    const person = personsWithStories.find(
      (p) => p.slug === personSlug
    );

    if (!person) {
      return notFound();
    }

    /*
     * If there is a story slug, find that specific story
     * belonging to this storyteller.
     */
    let selectedStory = null;

    if (storySlug) {
      selectedStory = person.stories.find(
        (story) => story.slug === storySlug
      );

      if (!selectedStory) {
        return notFound();
      }
    }

    /*
     * ----------------------------------------------------------
     * MEDIA
     * ----------------------------------------------------------
     *
     * For the storyteller page we need the media belonging
     * to their stories.
     */
    const mediaIds = [
      ...new Set(
        person.stories
          .map((story) => story?.featured_media)
          .filter(Boolean)
      ),
    ];

    const allMedia =
      mediaIds.length > 0
        ? await fetchMediaByIds(mediaIds, currentLang)
        : [];

    /*
     * ----------------------------------------------------------
     * STORY DETAIL DATA
     * ----------------------------------------------------------
     *
     * Only fetch topics/events if we actually have a story
     * selected.
     */
    let topics = [];
    let allEvents = [];

    if (selectedStory) {
      topics =
        (await fetchAllTopics(currentLang)) || [];

      const relatedEventIds = [
        ...new Set(
          selectedStory?.acf?.related_events || []
        ),
      ];

      if (relatedEventIds.length > 0) {
        allEvents =
          await fetchTimelinesByIds(
            relatedEventIds,
            currentLang
          );
      }
    }

    /*
     * Base link for this storyteller.
     *
     * /en/storytellers/abenaa/
     */
    const baseLink = createLocalLink(
      `/${currentLang}/${params.slug}/${person.slug}/`
    );

    return (
      <div className='px-8 md:px-16 xl:px-48 py-20'>
        {/* Breadcrumb */}
        <div className='mb-6 text-sm flex flex-wrap items-center gap-2 text-gray-600'>
          <Link
            href={`/${currentLang}/${
              currentLang === 'en'
                ? 'stories'
                : 'geschichten'
            }/`}
            className='hover:underline text-wwr_rich_black'
          >
            {currentLang === 'en'
              ? 'Stories'
              : 'Geschichten'}
          </Link>

          <span className='mx-1'>/</span>

          <Link
            href={`/${currentLang}/${params.slug}/`}
            className='hover:underline text-wwr_rich_black'
          >
            {currentLang === 'en'
              ? 'Storytellers'
              : 'Erzähler'}
          </Link>

          <span className='mx-1'>/</span>

          <span className='font-medium text-wwr_yellow_orange'>
            {person.name}
          </span>
        </div>

        {/*
         * ======================================================
         * STORY DETAIL
         * ======================================================
         *
         * This is the part that was missing.
         *
         * When:
         *
         * params.relatedPosts = [
         *   'vereinzelung-vs-community-2'
         * ]
         *
         * selectedStory is found and PageComponent renders.
         */}
        {selectedStory && (
          <PageComponent
            lang={currentLang}
            paramsStory={selectedStory.slug}
            stories={person.stories}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            allEvents={allEvents}
            baseLink={baseLink}
          />
        )}

        {/* Storyteller heading */}
        <h2 className='text-3xl font-light mb-4'>
          {person.name}
        </h2>

        {person.description && (
          <p className='mb-6'>
            {person.description}
          </p>
        )}

        {/* Story cards */}
        {person.stories.length === 0 ? (
          <p className='text-gray-500'>
            {currentLang === 'en'
              ? 'No stories found for this storyteller.'
              : 'Für diese Erzählerin bzw. diesen Erzähler wurden keine Geschichten gefunden.'}
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <StoryCardContainer
              storiesToRender={person.stories}
              allMedia={allMedia}
              allPersons={allPersons}
              lang={currentLang}
              hoverZoom={true}
              baseLink={baseLink}
            />
          </div>
        )}
      </div>
    );
  }

  /*
   * ============================================================
   * STORYTELLERS INDEX
   * ============================================================
   *
   * /en/storytellers/
   */

  const storiesForCards =
    personsWithStories.map((person) => {
      /*
       * Preserve your original behavior:
       * use the second story if available, otherwise first.
       */
      const story =
        person.stories[1] ||
        person.stories[0];

      return {
        person,
        story,
      };
    });

  /*
   * Only fetch media needed for the storyteller cards.
   */
  const mediaIds = [
    ...new Set(
      storiesForCards
        .map(({ story }) => story?.featured_media)
        .filter(Boolean)
    ),
  ];

  const allMedia =
    mediaIds.length > 0
      ? await fetchMediaByIds(
          mediaIds,
          currentLang
        )
      : [];

  const personsWithMedia =
    storiesForCards.map(
      ({ person, story }) => {
        const mediaUrl = story?.featured_media
          ? allMedia.find(
              (media) =>
                media.id ===
                story.featured_media
            )?.source_url
          : null;

        return {
          ...person,
          mediaUrl,
        };
      }
    );

  /*
   * Render storyteller index.
   */
  return (
    <div className='px-8 md:px-16 xl:px-48 py-20'>
      {/* Breadcrumb */}
      <div className='mb-6 text-sm flex flex-wrap items-center gap-2 text-gray-600'>
        <Link
          href={`/${currentLang}/${
            currentLang === 'en'
              ? 'stories'
              : 'geschichten'
          }/`}
          className='hover:underline text-wwr_rich_black'
        >
          {currentLang === 'en'
            ? 'Stories'
            : 'Geschichten'}
        </Link>

        <span className='mx-1'>/</span>

        <span className='font-medium text-wwr_yellow_orange'>
          {currentLang === 'en'
            ? 'Storytellers'
            : 'Erzähler'}
        </span>
      </div>

      <h2 className='text-3xl font-light mb-6'>
        {currentLang === 'en'
          ? 'Meet the Storytellers'
          : 'Unsere Erzähler:innen'}
      </h2>

      <p className='mb-8'>
        {currentLang === 'en'
          ? 'Click a storyteller to view all their stories.'
          : 'Klicken Sie auf eine Person, um alle ihre Geschichten zu sehen.'}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {personsWithMedia.map((person) => (
          <StorytellerCard
            key={person.id}
            person={person}
            lang={currentLang}
            mediaUrl={person.mediaUrl}
            countStories={person.stories.length}
          />
        ))}
      </div>
    </div>
  );
};

export default StorytellersTemplate;