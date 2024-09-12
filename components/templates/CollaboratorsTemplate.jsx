import React from 'react';
import gfx_bg_orange from '@/public/bg_orange.png';
import Image from 'next/image';
import Team from '@/components/collaborators/team/team';

const CollaboratorsTemplate = ({ data, subSlugs, baseLink }) => {
  return (
    <div className='px-8 md:px-16 xl:px-48 relative'>
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      {data.acf?.team?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{ __html: data.acf?.team_title }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-4 text-center mt-4'>
            {data.acf?.team?.map((teamMember, tmI) => (
              <Team teamMember={teamMember} subSlugs={subSlugs} baseLink={baseLink} key={tmI} />
            ))}
          </div>
        </div>
      ) : null}
      {data.acf?.past_collaborators?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{
              __html: data.acf?.past_collaborators_title,
            }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-x-4 text-center mt-4'>
            {data.acf?.past_collaborators?.map((collaborator, cI) => (
              <div key={cI} className='col-span-6 md:col-span-3 lg:col-span-2'>
                <h3 className='text-lg font-light'>{collaborator.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CollaboratorsTemplate;
