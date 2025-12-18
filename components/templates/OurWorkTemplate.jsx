import React from 'react';
import Image from 'next/image';
import WysiwygContent from '@/components/common/WysiwygContent';
import WorkshopQuotes from '@/components/workshops/WorkshopQuotes';
import ProjectCard from '../page/projectCard';

export const ourWorkSampleData = {
  page_title: 'Our Work',
  intro_header_image: '/images/portrait_12.webp',
  intro_text:
    'We create media, programs, and learning experiences that challenge bias, spark dialogue, and build cultures of belonging across communities.',

  initiatives: [
    {
      title: 'Belonging Beyond Borders',
      excerpt:
        'A film-driven initiative exploring identity, empathy, and belonging through storytelling and dialogue.',
      image: '/images/portrait_12.webp',
      link: '/initiatives/bbb',
    },
    {
      title: 'Reimagine Belonging',
      excerpt:
        'A multi-year storytelling and research project uplifting lived experiences.',
      image: '/images/portrait_12.webp',
      link: '/initiatives/reimagine-belonging',
    },
    {
      title: 'PASSt',
      excerpt:
        'A youth-centered project focused on creative expression and leadership.',
      image: '/images/portrait_12.webp',
      link: '/initiatives/passt',
    },
  ],
  projectAreas: [
    {
      title: 'Film-Based Projects',
      description:
        'Documentary films and short-form media used to spark dialogue.',
    },
    {
      title: 'Education & Curriculum',
      description:
        'Lesson plans, toolkits, and learning resources for classrooms.',
    },
    {
      title: 'Youth Workshops',
      description:
        'Participatory workshops centered on storytelling and identity.',
    },
    {
      title: 'Campaigns',
      description: 'Public-facing media campaigns and community activations.',
    },
    {
      title: 'Installations',
      description: 'Exhibitions and immersive storytelling experiences.',
    },
    {
      title: 'Convenings',
      description: 'Facilitated dialogues, panels, and community gatherings.',
    },
  ],
  cta: [
    {
      label: 'Explore Our Work',
      url: '/work',
    },
    {
      label: 'Partner With Us',
      url: '/get-involved',
    },
  ],
  quotes: [
    'Storytelling can move people where data cannot.',
    'Belonging is built when stories are shared.',
  ],

  impact: [
    { value: '12,000+', label: 'Students reached' },
    { value: '65+', label: 'Community partners' },
    { value: '20+', label: 'Cities engaged' },
    { value: '250+', label: 'Workshops & events' },
  ],
};

const OurWorkTemplate = () => {
  const data = ourWorkSampleData;

  return (
    <div className='-mt-20'>
      {/* HERO */}
      <div className='h-screen relative'>
        <Image
          src={data.intro_header_image}
          alt={data.page_title}
          fill
          className='object-cover'
          priority
        />
        <div className='px-8 md:px-16 xl:px-48 pt-44 relative text-black'>
          <h1 className='text-3xl md:text-6xl font-light'>{data.page_title}</h1>
        </div>
      </div>

      {/* INTRO */}
      <div className='px-8 md:px-16 xl:px-48 py-20 bg-white relative'>
        <div className='grid grid-cols-6 gap-12'>
          <div className='col-span-6 lg:col-span-4'>
            <WysiwygContent
              content={data.intro_text}
              className='text-lg font-light max-w-3xl'
            />
          </div>

          <div className='col-span-6 lg:col-span-2'>
            <div className='border-l-4 border-wwr_yellow_orange pl-6'>
              <WorkshopQuotes quotes={data.quotes} />
            </div>
          </div>
        </div>
      </div>

      {/* INITIATIVES GRID */}
      <div className='px-8 md:px-16 xl:px-48 py-20'>
        <h2 className='text-3xl md:text-6xl font-light mb-10'>
          Major Initiatives
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {ourWorkSampleData.initiatives.slice(0, 3).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
      {/* PROJECT AREAS */}
      <div className='px-8 md:px-16 xl:px-48 py-20 bg-white'>
        <h2 className='text-3xl md:text-6xl font-light mb-10'>Project Areas</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12'>
          {data.projectAreas.map((area, i) => (
            <div key={i} className='group border-t border-black/20 pt-6'>
              <h3 className='text-lg lg:text-xl font-medium group-hover:text-wwr_yellow_orange transition-colors'>
                {area.title}
              </h3>

              <p className='mt-3 font-light text-black/70'>
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* IMPACT */}
      <div className='px-8 md:px-16 xl:px-48 py-24 bg-wwr_gray_storm/5'>
        <div className='grid grid-cols-6 gap-12 items-start'>
          {/* LEFT — NARRATIVE */}
          <div className='col-span-6 lg:col-span-3'>
            <h2 className='text-3xl md:text-5xl font-light leading-tight'>
              Impact that grows
              <br />
              through participation
            </h2>

            <p className='mt-6 text-lg font-light max-w-md text-black/80'>
              Our work lives beyond the screen — in classrooms, community
              spaces, and conversations that continue long after the project
              ends.
            </p>
          </div>

          {/* RIGHT — SIGNALS */}
          <div className='col-span-6 lg:col-span-3'>
            <div className='space-y-8'>
              {data.impact.map((item, i) => (
                <div
                  key={i}
                  className='flex items-baseline gap-6 border-b border-black/10 pb-4'
                >
                  <div className='text-4xl md:text-5xl font-light text-wwr_yellow_orange shrink-0'>
                    {item.value}
                  </div>
                  <div className='text-sm md:text-base uppercase tracking-wide text-black/70'>
                    {item.label}
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
          <h2 className='text-3xl md:text-5xl font-light leading-tight'>
            Want to explore our projects
            <br className='hidden md:block' />
            or work with us?
          </h2>

          <div className='flex flex-wrap gap-6 mt-10'>
            {data.cta.map((item, i) => (
              <a
                key={i}
                href={item.url}
                className={`
            px-6 py-3 uppercase text-sm md:text-lg tracking-wide transition-all
            ${
              i === 0
                ? 'bg-wwr_yellow_orange text-black hover:text-white'
                : 'border border-white hover:bg-white hover:text-black'
            }
          `}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurWorkTemplate;
