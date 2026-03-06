'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  const dropdownRef = useRef(null);

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
  const [openCountry, setOpenCountry] = useState(false);

  /* ================= EXTRACT COUNTRIES ================= */

  useEffect(() => {
    const countrySet = new Set();

    initialFiltered.forEach((p) => {
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
  }, [initialFiltered]);
  /* ================= COUNTRY + TYPE FILTER ================= */

  useEffect(() => {
    let filtered = initialFiltered;

    if (selectedType !== 'All') {
      filtered = filtered.filter((p) =>
        p.acf?.project_type?.includes(selectedType)
      );
    }

    if (selectedCountry !== 'All') {
      filtered = filtered.filter((p) => {
        const locations = p?.acf?.intro?.[0]?.location;

        if (!locations) return false;

        if (Array.isArray(locations)) {
          return locations.includes(selectedCountry);
        }

        return locations === selectedCountry;
      });
    }

    setFilteredProjects(filtered);
    setVisibleCount(6);
  }, [selectedType, selectedCountry, initialFiltered]);

  /* ================= CLOSE DROPDOWN OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCountry(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                />
              );
            })}
          </div>
        </div>

        {/* ================= COUNTRY FILTER + VIEW MODE ================= */}

        <div className='flex justify-between items-center mt-4'>
          {/* Country Dropdown */}

          <div ref={dropdownRef}>
            <h3 className='uppercase text-sm tracking-wide opacity-80 mb-2 mt-6'>
              Filter by Geography
            </h3>

            <div className='relative min-w-[240px]'>
              {/* Trigger */}

              <button
                onClick={() => setOpenCountry((prev) => !prev)}
                className='
                  w-full text-left px-4 py-2
                  bg-wwr_rich_black text-wwr_yellow_orange
                  font-light rounded
                  flex justify-between items-center cursor-pointer
                '
              >
                {selectedCountry === 'All' ? 'Select Country' : selectedCountry}

                <span
                  className={`ml-2 transition-transform ${
                    openCountry ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown */}

              {openCountry && (
                <div
                  className='
                    absolute w-full mt-1
                    bg-white border border-black/20 shadow-xl
                    z-50 max-h-60 overflow-y-auto rounded
                  '
                >
                  {countries.map((country, i) => {
                    const isActive = selectedCountry === country;

                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setSelectedCountry(country);
                          setOpenCountry(false);
                        }}
                        className={`
                          px-4 py-3 cursor-pointer transition-colors duration-200
                          ${
                            isActive
                              ? 'bg-wwr_yellow_orange text-wwr_rich_black font-semibold'
                              : 'hover:bg-wwr_yellow_orange hover:text-wwr_rich_black text-wwr_rich_black'
                          }
                        `}
                      >
                        {country}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* View Mode Icons */}

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

      {/* ================= PROJECT GRID / LIST ================= */}

      {filteredProjects.length === 0 ? (
        <div className='py-20 text-center'>
          <p className='text-lg font-light opacity-70'>
            No projects found for the selected filters.
          </p>
        </div>
      ) : (
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
      )}

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
