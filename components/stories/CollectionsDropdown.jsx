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

  const storiesCount = useSelector(
    (state) => state.entities.selectedStory.numberOfSelectedStories
  );

  if (!allCollections?.length) return null;

  return (
    <div className='flex flex-wrap gap-2 px-4 md:px-0 my-8'>
      {allCollections.map((collection, i) => (
        <SingleCollectionButton
          key={i}
          collection={collection}
          isActive={activeCollection === collection}
        />
      ))}

      <div className='text-md px-2 py-1 lg:text-xl text-wwr_yellow_orange flex items-center lg:py-2'>
        Stories: {storiesCount}
      </div>
    </div>
  );
};

export default CollectionsChips;
