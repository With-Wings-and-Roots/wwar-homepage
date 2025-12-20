// app/projects/[projectAreaSlug]/page.jsx
import React from 'react';
import { notFound } from 'next/navigation';
import {
  getAllProjectAreas,
  getAllProjects,
  getProjectAreaBySlug,
} from '@/utilities/projects'; // Your CMS fetch function
import ProjectsArchive from '../blogs/ProjectsArchive';

const ProjectsAreaPage = async ({ subSlugs, lang = 'en' }) => {
  const projectAreaSlug = subSlugs?.[0] || '';
  let projectArea;

  // Fetch projects in the specific area
  const projects = await getAllProjects(lang);
  if (projectAreaSlug !== 'all') {
    projectArea = await getProjectAreaBySlug(projectAreaSlug, lang);
  }
  const allProjectAreas = await getAllProjectAreas(lang);
  if (!projects || projects.length === 0) return notFound();

  return (
    <div className='px-8 md:px-16 xl:px-48 py-20'>
      <div>
        <h1 className='text-3xl md:text-6xl font-light'>Projects</h1>
      </div>

      <ProjectsArchive
        projects={projects}
        projectArea={projectArea}
        projectAreaSlug={projectAreaSlug}
        allProjectAreas={allProjectAreas}
      />
    </div>
  );
};

export default ProjectsAreaPage;
