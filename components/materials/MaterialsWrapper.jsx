'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { topicsAdded } from '@/store/topics';
import { collectionsAdded } from '@/store/collections';
import { citiesAdded } from '@/store/cities';
import MaterialsGrid from './MaterialsGrid';

const MaterialsWrapper = ({
  materials,
  lang = 'en',
  topics,
  collections,
  languages,
}) => {
  const dispatch = useDispatch();
  // Dispatch topics
  useEffect(() => {
    if (topics) {
      dispatch(topicsAdded({ topics }));
    }
  }, [topics, dispatch]);

  // Dispatch collections
  useEffect(() => {
    if (collections) {
      dispatch(collectionsAdded({ collections }));
    }
  }, [collections, dispatch]);

  // Dispatch languages
  useEffect(() => {
    if (languages) {
      const cityNames = languages.map((langObj) => ({
        name: langObj.name,
        id: langObj.id,
      }));
      dispatch(citiesAdded({ cities: cityNames }));
    }
  }, [languages, dispatch]);

  return (
    <>
      {/* ✅ Materials Grid */}
      <MaterialsGrid
        materials={materials}
        lang={lang}
        topics={topics}
        collections={collections}
        languages={languages}
      />
    </>
  );
};

export default MaterialsWrapper;
