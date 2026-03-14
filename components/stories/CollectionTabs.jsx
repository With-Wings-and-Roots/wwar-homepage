'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import SingleCollectionButton from './SingleCollectionButton';

const CollectionsChips = () => {
  const allCollections = useSelector(
    (state) => state.entities.collections?.allCollections
  );

  const activeCollection = useSelector(
    (state) => state.entities.collections?.activeCollection
  );

  if (!allCollections?.length) return null;

  return (
    <div className='flex flex-wrap gap-2 px-4 md:px-0 my-4'>
      {allCollections.map((collection, i) => (
        <SingleCollectionButton
          key={i}
          collection={collection}
          isActive={activeCollection === collection}
        />
      ))}
    </div>
  );
};

export default CollectionsChips;
