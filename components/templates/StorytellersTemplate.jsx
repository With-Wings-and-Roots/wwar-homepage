'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import StoryCardContainer from '../stories/StoryCardContainer';
import StorytellerCard from '../stories/StorytellerCard';
import { createLocalLink } from '@/utilities/links';
import PageComponent from '../../components/page/storyPageComponent';
import Link from 'next/link';
const StorytellersTemplate = ({
  subSlugs,
  lang = 'en',
  stories,
  allPersons,
  allMedia,
  topics,
  allEvents,
  params,
}) => {
  if (!allPersons || !stories || allPersons.length === 0) return notFound();

  /**
   * Build persons list ONLY if they have stories
   * and attach media from their first story
   */

  const personsWithMedia = allPersons
    .map((person) => {
      const personStories = stories.filter(
        (s) => s?.acf?.person && String(s.acf.person) === String(person.id)
      );
      if (personStories.length === 0) return null;
      const firstStory = personStories[1] || personStories[0];
      const mediaUrl = firstStory?.featured_media
        ? allMedia.find((m) => m.id === firstStory.featured_media)?.source_url
        : allMedia.find((m) => m.id === firstStory.acf?.media)?.source_url;
      const city = firstStory?.acf?.city;

      return {
        ...person,
        mediaUrl,
        city: city || null,
        stories: personStories,
      };
    })
    .filter(Boolean);

  if (personsWithMedia.length === 0) return notFound();

  /**
   * SINGLE STORYTELLER VIEW
   */
  if (subSlugs?.length > 0) {
    let person = null;
    if (subSlugs[1]) {
      person = personsWithMedia.find((p) => p.slug === subSlugs?.[1]);
    } else {
      person = personsWithMedia.find((p) => p.slug === subSlugs?.[0]);
    }
    if (!person) return notFound();
    const baseLink = createLocalLink(
      `/${params.lang}/${params.slugs[0]}/${person.slug}/`
    );

    return (
      <div className='px-8 md:px-16 xl:px-48 py-20'>
        <div className='mb-6 text-sm flex flex-wrap items-center gap-2 text-gray-600'>
          <Link
            href={`/${params.lang}/${
              params.lang === 'en' ? 'stories' : 'geschichten'
            }/`}
            className='hover:underline text-wwr_rich_black'
          >
            {lang === 'en' ? 'Stories' : 'Geschichten'}
          </Link>

          <span className='mx-1'>/</span>
          <Link
            href={`/${params.lang}/${params.slugs[0]}/`}
            className='hover:underline text-wwr_rich_black'
          >
            {lang === 'en' ? 'Storytellers' : 'Erzähler'}
          </Link>
          <span className='mx-1'>/</span>
          <span className='font-medium text-wwr_yellow_orange'>
            {person.name}
          </span>
        </div>
        {subSlugs[1] && (
          <PageComponent
            lang={lang}
            paramsStory={subSlugs[0]}
            stories={person.stories}
            topics={topics}
            allMedia={allMedia}
            allPersons={allPersons}
            allEvents={allEvents}
            baseLink={baseLink}
          />
        )}
        <h2 className='text-3xl font-light mb-4'>{person.name}</h2>
        {person.description && <p className='mb-6'>{person.description}</p>}

        {person.stories.length === 0 ? (
          <p className='text-gray-500'>
            {lang === 'en'
              ? 'No stories found for this storyteller.'
              : 'Für diese Erzählerin bzw. diesen Erzähler wurden keine Geschichten gefunden.'}
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            <StoryCardContainer
              storiesToRender={person.stories}
              allMedia={allMedia}
              allPersons={allPersons}
              lang={lang}
              hoverZoom={true}
              baseLink={baseLink}
            />
          </div>
        )}
      </div>
    );
  }

  /**
   * STORYTELLER INDEX VIEW
   */
  return (
    <div className='px-8 md:px-16 xl:px-48 py-20'>
      <div className='mb-6 text-sm flex flex-wrap items-center gap-2 text-gray-600'>
        <Link
          href={`/${params.lang}/${
            params.lang === 'en' ? 'stories' : 'geschichten'
          }/`}
          className='hover:underline text-wwr_rich_black'
        >
          {lang === 'en' ? 'Stories' : 'Geschichten'}
        </Link>

        <span className='mx-1'>/</span>
        <span className='font-medium text-wwr_yellow_orange'>
          {lang === 'en' ? 'Storytellers' : 'Erzähler'}
        </span>
      </div>
      <h2 className='text-3xl font-light mb-6'>
        {lang === 'en' ? 'Meet the Storytellers' : 'Unsere Erzähler:innen'}
      </h2>

      <p className='mb-8'>
        {lang === 'en'
          ? 'Click a storyteller to view all their stories.'
          : 'Klicken Sie auf eine Person, um alle ihre Geschichten zu sehen.'}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {personsWithMedia.map((person) => (
          <StorytellerCard
            key={person.id}
            person={person}
            lang={lang}
            mediaUrl={person.mediaUrl}
            countStories={person.stories.length}
          />
        ))}
      </div>
    </div>
  );
};

export default StorytellersTemplate;
