'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import StoryCardContainer from '../stories/StoryCardContainer';
import StorytellerCard from '../stories/StorytellerCard';
import { createLocalLink } from '@/utilities/links';
import PageComponent from '../../components/page/storyPageComponent';
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

      const firstStory = personStories[0];
      console.log('First story for person', person.name, firstStory);
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
      console.log('Finding storyteller with slug:', subSlugs?.[1]);
      person = personsWithMedia.find((p) => p.slug === subSlugs?.[1]);
    } else {
      person = personsWithMedia.find((p) => p.slug === subSlugs?.[0]);
    }
    if (!person) return notFound();
    console.log('Rendering storyteller page for:', params);
    const baseLink = createLocalLink(
      `/${params.lang}/${params.slugs[0]}/${person.slug}/`
    );

    return (
      <div className='px-8 md:px-16 xl:px-48 py-20'>
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
        {person.bio && <p className='mb-6'>{person.bio}</p>}

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
          />
        ))}
      </div>
    </div>
  );
};

export default StorytellersTemplate;
