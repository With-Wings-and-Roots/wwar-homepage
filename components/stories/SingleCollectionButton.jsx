'use client';
import React from 'react';
import parse from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { setActiveCollection } from '@/store/collections';
import { activatedTopic } from '@/store/topics';
import { setActiveCurriculum } from '@/store/curriculam';
import { setActiveUmbrella } from '@/store/umbrella';
import { storySelected } from '@/store/selectedStory';

const SingleCollectionButton = ({ collection, isActive }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setActiveCollection(collection));
    dispatch(setActiveCurriculum(null));
    dispatch(activatedTopic('all'));
    dispatch(
      storySelected({
        selection: 'all',
        id: 'all',
      })
    );
    dispatch(setActiveUmbrella(null));

    // Scroll to archive
    requestAnimationFrame(() => {
      const archive = document.getElementById('archive-browser');
      if (archive) {
        archive.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`${
          isActive
            ? 'bg-wwr_teal_hovered text-wwr_white'
            : 'bg-wwr_teal hover:bg-wwr_teal_hovered text-white hover:text-wwr_white'
        } text-sm lg:text-xl w-max px-3 py-1.5 lg:py-3 rounded-lg hover:cursor-pointer transition-all duration-300 font-extralight`}
      >
        {parse(collection.name)}
      </div>
    </>
  );
};

export default SingleCollectionButton;
