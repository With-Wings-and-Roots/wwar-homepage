
'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { topicsAdded } from '@/store/topics';
import {
  collectionsAdded,
  setActiveCollection,
} from '@/store/collections';
import { citiesAdded } from '@/store/cities';

import PostsGrid from './postsGrid';

const PostsWrapper = ({
  posts = [],
  lang = 'en',
  topics = [],
  collections = [],
  languages = [],
  params,
  tags = [],
  readMoreLabel,
  noEntriesText,
}) => {
  const dispatch = useDispatch();

  const activeCollection = useSelector(
    (state) => state.entities.collections.activeCollection
  );

  // Use content-based keys to avoid rerunning effects when the parent
  // creates new arrays containing the same data.
  const topicsKey = JSON.stringify(topics);
  const collectionsKey = JSON.stringify(collections);
  const languagesKey = JSON.stringify(languages);

  const stableTopics = useMemo(
    () => (Array.isArray(topics) ? topics : []),
    [topicsKey]
  );

  const stableCollections = useMemo(
    () => (Array.isArray(collections) ? collections : []),
    [collectionsKey]
  );

  const stableLanguages = useMemo(
    () => (Array.isArray(languages) ? languages : []),
    [languagesKey]
  );

  // Populate Redux topics only when their data changes.
  useEffect(() => {
    dispatch(topicsAdded({ topics: stableTopics }));
  }, [dispatch, stableTopics]);

  // Populate Redux formats only when their data changes.
  useEffect(() => {
    dispatch(collectionsAdded({ collections: stableCollections }));
  }, [dispatch, stableCollections]);

  // Populate Redux mediums/languages only when their data changes.
  useEffect(() => {
    const cityNames = stableLanguages.map((language) => ({
      name: language.name,
      id: language.id,
    }));

    dispatch(citiesAdded({ cities: cityNames }));
  }, [dispatch, stableLanguages]);

  // Select the collection matching the current URL pathway.
  const pathway = params?.pathway;

  const matchingCollection = useMemo(() => {
    if (!pathway) return null;

    return (
      stableCollections.find(
        (collection) => collection.slug === pathway
      ) || null
    );
  }, [pathway, stableCollections]);

  useEffect(() => {
    if (!matchingCollection) return;

    // Do not dispatch if this collection is already active.
    if (
      Number(activeCollection?.id) ===
      Number(matchingCollection.id)
    ) {
      return;
    }

    dispatch(setActiveCollection(matchingCollection));
  }, [dispatch, matchingCollection, activeCollection?.id]);

  return (
    <PostsGrid
      posts={posts}
      topics={stableTopics}
      collections={stableCollections}
      languages={stableLanguages}
      tags={tags}
      lang={lang}
      readMoreLabel={readMoreLabel}
      noEntriesText={noEntriesText}
      params={params}
    />
  );
};

export default PostsWrapper;
