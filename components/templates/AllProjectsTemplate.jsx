// app/projects/[projectAreaSlug]/page.jsx
import React from 'react';
import { notFound } from 'next/navigation';
import {
  getAllProjectAreas,
  getAllProjects,
  getProjectAreaBySlug,
} from '@/utilities/projects';
import { fetchMediaFromId } from '@/utilities/media';
import ProjectsArchive from '../projects/ProjectsArchive';
import ProjectsDiscription from '../projects/projectDiscription';

const AllProjectsTemplate = async ({ subSlugs, lang = 'en' }) => {
  const projectAreaSlug = subSlugs?.[0] || '';
  let projectArea = [];

  // Fetch projects in the specific area
  const projects = await getAllProjects(lang);

  if (projectAreaSlug !== 'all' && projectAreaSlug !== '') {
    projectArea = await getProjectAreaBySlug(projectAreaSlug, lang);
  }

  const allProjectAreas = await getAllProjectAreas(lang);

  if (!projects || projects.length === 0) return notFound();

  // Pre-fetch all banner media for all projects
  const projectsWithMedia = await Promise.all(
    projects.map(async (project) => {
      const bannerMedia = project?.acf?.banner
        ? await fetchMediaFromId(project.acf.banner)
        : null;

      return {
        ...project,
        bannerMedia,
      };
    })
  );

  return (
    <div className='px-8 md:px-16 xl:px-48 py-20'>
      <ProjectsDiscription projectArea={projectArea[0] || null} lang={lang} />

      <ProjectsArchive
        projects={projectsWithMedia}
        projectArea={projectArea}
        projectAreaSlug={projectAreaSlug}
        allProjectAreas={allProjectAreas}
      />
    </div>
  );
};

export default AllProjectsTemplate;
