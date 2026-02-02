'use client';

import React from 'react';

const ProjectsDiscription = ({ projectArea, lang = 'en' }) => {
  return (
    <section className='mb-10'>
      {/* Title */}
      <h1 className='text-3xl md:text-4xl font-light'>
        {lang === 'en' ? 'Our Projects' : 'Unsere Projekte'}
      </h1>

      {/* Intro Text */}
      <p className='font-light md:text-lg mt-1 mb-10'>
        {lang === 'en'
          ? 'Our work spans film, education, community engagement, exhibitions, and narrative change initiatives across multiple countries. This page presents an overview of all projects developed by With Wings and Roots over time.'
          : 'Unsere Arbeit umfasst Film, Bildung, gesellschaftliches Engagement, Ausstellungen und Initiativen zur Veränderung von Narrativen in mehreren Ländern. Diese Seite bietet einen Überblick über alle Projekte, die im Laufe der Zeit von With Wings and Roots entwickelt wurden.'}
      </p>
      {projectArea?.name && (
        <h1
          className='text-3xl md:text-4xl font-light'
          dangerouslySetInnerHTML={{ __html: projectArea?.name }}
        />
      )}
      {/* Project Area Description */}
      {projectArea?.description && (
        <div className='font-light md:text-lg mt-1'>
          {projectArea.description}
        </div>
      )}
    </section>
  );
};

export default ProjectsDiscription;
