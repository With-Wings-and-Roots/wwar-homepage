'use client';
import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { topicsAdded } from '@/store/topics';
import { collectionsAdded, setActiveCollection } from '@/store/collections';
import { citiesAdded } from '@/store/cities';
import MaterialsGrid from './MaterialsGrid';

const MaterialsWrapper = ({
  materials,
  lang = 'en',
  topics,
  collections,
  languages,
  params,
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
  useEffect(() => {
    if (!params?.pathway || !collections) return;

    const activeCollection = collections.find(
      (collection) => collection.slug === params.pathway
    );

    if (activeCollection) {
      dispatch(setActiveCollection(activeCollection));
    }
  }, [params?.pathway, collections, dispatch]);

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
