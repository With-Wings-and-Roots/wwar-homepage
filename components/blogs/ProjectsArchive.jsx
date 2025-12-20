'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import ProjectList from '../page/projectList';
import ProjectGrid from '../page/projectGrid';

const ProjectsArchive = ({
  projects,
  projectArea,
  projectAreaSlug = 'all',
  allProjectAreas = [],
}) => {
  // Use useMemo to stabilize initialFiltered
  const initialFiltered = useMemo(() => {
    if (!projectArea || projectAreaSlug === 'all') {
      return projects;
    }
    return projects.filter((p) =>
      Array.isArray(p.acf?.project_area)
        ? p.acf.project_area.includes(projectArea[0]?.id)
        : p.acf.project_area === projectArea[0]?.id
    );
  }, [projects, projectArea, projectAreaSlug]);

  const [filteredProjects, setFilteredProjects] = useState(initialFiltered);
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let filtered = initialFiltered;

    if (selectedType !== 'All') {
      filtered = filtered.filter((p) =>
        p.acf?.project_type?.includes(selectedType)
      );
    }

    setFilteredProjects(filtered);
  }, [selectedType, initialFiltered]);

  return (
    <div>
      {/* ================= FILTER CONTROLS ================= */}
      <section className='mb-12 space-y-6'>
        {/* Project Area / Type */}
        <div>
          <h3 className='uppercase text-sm tracking-wide opacity-80 mb-2 mt-6'>
            Filter by project area
          </h3>
          <div className='flex flex-wrap gap-3'>
            {[{ slug: 'all', name: 'All' }, ...allProjectAreas].map((area) => {
              const isActive = area.slug === projectAreaSlug;

              return (
                <Link
                  key={area.slug}
                  href={createLocalLink(`/projects/${area.slug}`)}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition ${
                    isActive
                      ? 'bg-wwr_yellow_orange text-black'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  dangerouslySetInnerHTML={{ __html: area.name }}
                ></Link>
              );
            })}
          </div>
        </div>

        {/* View Toggle */}
        <div>
          <h3 className='uppercase text-sm tracking-wide opacity-80 mb-2'>
            View mode
          </h3>
          <div className='flex gap-3'>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 border rounded text-sm ${
                viewMode === 'grid'
                  ? 'bg-wwr_yellow_orange text-black'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Grid view
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 border rounded text-sm ${
                viewMode === 'list'
                  ? 'bg-wwr_yellow_orange text-black'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              List view
            </button>
          </div>
        </div>
      </section>

      {/* ================= PROJECT GRID/LIST ================= */}
      <section
        className={`grid gap-8 ${
          viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {filteredProjects
          .slice(0, visibleCount)
          .map((project, i) =>
            viewMode === 'grid' ? (
              <ProjectGrid key={i} project={project} />
            ) : (
              <ProjectList key={i} project={project} />
            )
          )}
      </section>

      {/* ================= LOAD MORE ================= */}
      {visibleCount < filteredProjects.length && (
        <div className='mt-12 text-center'>
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className='px-8 py-3 bg-wwr_yellow_orange text-black font-medium rounded hover:bg-yellow-500 transition'
          >
            Load more projects
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsArchive;
