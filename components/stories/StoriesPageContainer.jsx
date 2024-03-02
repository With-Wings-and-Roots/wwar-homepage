'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storiesAdded, activatedStories } from '@/store/stories';
import { mediaAdded } from '@/store/media';
import { personsAdded } from '@/store/persons';
import StoriesContainer from './StoriesContainer';
import { topicsAdded } from '@/store/topics';
import Tabs from './Tabs';

const StoriesPageContainer = ({
  stories,
  allMedia,
  allPersons,
  topics,
  baseLink,
  lang,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(storiesAdded({ stories }));
    dispatch(activatedStories({ stories }));
  }, [stories, dispatch]);

  useEffect(() => {
    dispatch(mediaAdded({ allMedia }));
  }, [allMedia, dispatch]);

  useEffect(() => {
    dispatch(personsAdded({ allPersons }), [allPersons, dispatch]);
  });

  useEffect(() => {
    dispatch(topicsAdded({ topics }), [topics, dispatch]);
  });

  return (
    <>
      <Tabs lang={lang} />
      <StoriesContainer baseLink={baseLink} lang={lang} />
    </>
  );
};

export default StoriesPageContainer;
