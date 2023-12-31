'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storiesAdded, activatedStories } from '@/store/stories';
import { mediaAdded } from '@/store/media';
import { personsAdded } from '@/store/persons';
import StoriesContainer from './StoriesContainer';
import { topicsAdded } from '@/store/topics';
import {
  englishLanguageActivated,
  germanLanguageActivated,
} from '@/store/language';
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
  const [language, setLanguage] = useState();

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (language === 'de') {
      dispatch(germanLanguageActivated({}));
    } else {
      dispatch(englishLanguageActivated({}));
    }
  }, [language, dispatch]);

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
      <Tabs />
      <StoriesContainer baseLink={baseLink} />
    </>
  );
};

export default StoriesPageContainer;
