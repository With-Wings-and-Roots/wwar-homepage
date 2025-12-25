import React from 'react';
import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';
import { getAllProjectAreas, getAllProjects } from '@/utilities/projects';
import { fetchMediaFromId } from '@/utilities/media';
import Link from 'next/link';
import { createLocalLink } from '@/utilities/links';
import ProjectGrid from '../projects/projectGrid';

const OurWorkTemplate = async ({ data, params }) => {
  const lang = params.lang || 'en';
  const projects = await getAllProjects(lang);
  const projectAreas = await getAllProjectAreas(lang);
  const projectsToRender = projects.filter((p) =>
    data.acf?.major_projects?.map((project) => project)?.includes(p.id)
  );
  const projectsWithMedia = await Promise.all(
    projectsToRender.map(async (project) => {
      const bannerMedia = project?.acf?.banner
        ? await fetchMediaFromId(project.acf.banner)
        : null;

      return {
        ...project,
        bannerMedia,
      };
    })
  );
  const headerImage = await fetchMediaFromId(data?.featured_media);

  return (
    <div className='-mt-20'>
      {/* HERO */}
      <div className='h-screen relative'>
        <Image
          src={headerImage?.source_url}
          alt={headerImage?.alt_text || 'Our Work Header Image'}
          fill
          className='object-cover'
          priority
        />
        <div className='px-8 md:px-16 xl:px-48 pt-44 relative text-black'>
          <h1 className='text-3xl md:text-6xl font-bold'>{data.acf?.title}</h1>
        </div>
      </div>

      {/* INTRO */}
      <div className='px-8 md:px-16 xl:px-48 py-20 bg-white relative'>
        <div className='grid grid-cols-6 gap-12'>
          <div className='col-span-6 lg:col-span-4'>
            <WysiwygContent
              content={data.acf?.intro_text}
              className='text-lg font-light max-w-3xl'
            />
          </div>
        </div>
      </div>

      {/* INITIATIVES GRID */}
      <div className='px-8 md:px-16 xl:px-48 py-20'>
        <h2
          className='text-3xl md:text-6xl font-light mb-10'
          dangerouslySetInnerHTML={{ __html: data?.acf?.heading }}
        />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {projectsWithMedia.map((project, index) => (
            <ProjectGrid key={index} project={project} />
          ))}
        </div>
        <Link
          href={createLocalLink(`${data.acf?.more_projects.url}all`)}
          className='bg-wwr_yellow_orange text-black text-sm lg:text-lg font-normal px-5 py-2 hover:text-white transition-all uppercase inline-flex mt-6'
        >
          {data.acf?.more_projects.title}
        </Link>
      </div>
      {/* PROJECT AREAS */}
      {projectAreas?.length > 0 && (
        <div className='px-8 md:px-16 xl:px-48 py-20 bg-white'>
          <h2 className='text-3xl md:text-6xl font-light mb-10'>
            Project Areas
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12'>
            {projectAreas.map((area, i) => (
              <Link
                key={i}
                href={createLocalLink(`/projects/${area.slug}`)}
                className='group border-t border-black/20 pt-6 block'
              >
                <h3
                  className='text-lg lg:text-xl font-medium group-hover:text-wwr_yellow_orange transition-colors'
                  dangerouslySetInnerHTML={{ __html: area.name }}
                />

                <WysiwygContent
                  content={area.description}
                  className='mt-3 font-light text-black/70'
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* IMPACT */}
      <div className='px-8 md:px-16 xl:px-48 py-24 bg-wwr_gray_storm/5'>
        <div className='grid grid-cols-6 gap-12 items-start'>
          {/* LEFT — NARRATIVE */}
          <div className='col-span-6 lg:col-span-3'>
            <h2 className='text-3xl md:text-5xl font-light leading-tight'>
              {data?.acf?.impact_heading}
            </h2>

            <WysiwygContent
              content={data.acf?.short_text}
              className='mt-3 font-light text-black/70'
            />
          </div>

          {/* RIGHT — SIGNALS */}
          <div className='col-span-6 lg:col-span-3'>
            <div className='space-y-8'>
              {data.acf?.our_impact.map((item, i) => (
                <div
                  key={i}
                  className='flex items-baseline gap-6 border-b border-black/10 pb-4'
                >
                  <div className='text-4xl md:text-5xl font-light text-wwr_yellow_orange shrink-0'>
                    {item.value}
                  </div>
                  <div className='text-sm md:text-base uppercase tracking-wide text-black/70'>
                    {item.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OUR WORK CTA */}
      <div
        className='px-8 md:px-16 xl:px-48 py-24'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <div className='max-w-4xl'>
          <h2
            className='text-3xl md:text-5xl font-light leading-tight'
            dangerouslySetInnerHTML={{ __html: data?.acf?.cta_heading }}
          />

          <div className='flex flex-wrap gap-6 mt-10'>
            {data.acf?.call_to_action?.map((item, i) => (
              <a
                key={i}
                href={createLocalLink(item.cta.url)}
                className={`
            px-6 py-3 uppercase text-sm md:text-lg tracking-wide transition-all
            ${
              i === 0
                ? 'bg-wwr_yellow_orange text-black hover:text-white'
                : 'border border-white hover:bg-white hover:text-black'
            }
          `}
              >
                {item.cta.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurWorkTemplate;
