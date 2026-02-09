'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import ProjectList from './projectList';
import ProjectGrid from './projectGrid';
import { FiGrid, FiList } from 'react-icons/fi';

const ProjectsArchive = ({
  projects,
  projectArea,
  projectAreaSlug = 'all',
  allProjectAreas = [],
  lang = 'en',
}) => {
  // Initial filtered projects based on project area
  console.log('Initial projects:', projectArea);
  const initialFiltered = useMemo(() => {
    if (!projectArea || projectAreaSlug === 'all') return projects;
    return projects.filter((p) =>
      Array.isArray(p.acf?.project_area)
        ? p.acf.project_area.includes(projectArea?.id)
        : p.acf.project_area === projectArea?.id
    );
  }, [projects, projectArea, projectAreaSlug]);

  const [filteredProjects, setFilteredProjects] = useState(initialFiltered);
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [countries, setCountries] = useState([]);

  // Extract unique countries from filteredProjects
  useEffect(() => {
    const countrySet = new Set();
    filteredProjects.forEach((p) => {
      const locations = p?.acf?.intro?.[0]?.location;
      if (locations) {
        if (Array.isArray(locations)) {
          locations.forEach((l) => countrySet.add(l));
        } else {
          countrySet.add(locations);
        }
      }
    });
    setCountries(['All', ...Array.from(countrySet)]);
  }, [filteredProjects]);

  // Filter projects based on type and country
  useEffect(() => {
    let filtered = initialFiltered;

    // Filter by project type
    if (selectedType !== 'All') {
      filtered = filtered.filter((p) =>
        p.acf?.project_type?.includes(selectedType)
      );
    }

    // Filter by country
    if (selectedCountry !== 'All') {
      filtered = filtered.filter((p) => {
        const locations = p?.acf?.intro?.[0]?.location;
        if (!locations) return false;
        if (Array.isArray(locations))
          return locations.includes(selectedCountry);
        return locations === selectedCountry;
      });
    }

    setFilteredProjects(filtered);
    setVisibleCount(6); // Reset visible count when filter changes
  }, [selectedType, selectedCountry, initialFiltered]);

  return (
    <div>
      {/* ================= FILTER CONTROLS ================= */}
      <section className='mb-12 mt-10'>
        {/* Project Area Tabs */}
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

        {/* Country Filter + View Mode Icons */}
        <div className='flex justify-between items-center mt-4'>
          {/* Left: Country Dropdown */}
          <div>
            <h3 className='uppercase text-sm tracking-wide opacity-80 mb-2 mt-6'>
              Filter by Geography
            </h3>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className='px-4 py-2 border rounded bg-white text-black'
            >
              {countries.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          {/* Right: View Mode Icons */}
          <div className='flex gap-3'>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition ${
                viewMode === 'grid'
                  ? 'bg-wwr_yellow_orange text-black'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <FiGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition ${
                viewMode === 'list'
                  ? 'bg-wwr_yellow_orange text-black'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <FiList size={20} />
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
            {lang === 'en' ? 'Load more projects' : 'Mehr Projekte laden'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsArchive;
