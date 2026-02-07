import React from 'react';
import gfx_bg_orange from '@/public/bg_orange.png';
import Image from 'next/image';
import Team from '@/components/collaborators/team/team';
import { fetchMediaFromId } from '@/utilities/media';

const CollaboratorsTemplate = ({ data, subSlugs, baseLink, teamSections }) => {
  return (
    <div className='px-8 md:px-16 xl:px-48 relative'>
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />
      {teamSections[0]?.members?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{ __html: teamSections[0]?.title }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-4 text-center mt-4'>
            {teamSections[0]?.members?.map(async (teamMember, tmI) => {
              const profile_icon = await fetchMediaFromId(
                teamMember.acf.profile_icon
              );
              return (
                <Team
                  teamMember={teamMember}
                  subSlugs={subSlugs}
                  baseLink={baseLink}
                  key={tmI}
                  profile_icon={profile_icon}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      {teamSections[1]?.members?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{
              __html: teamSections[1]?.title,
            }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-x-4 text-center mt-4'>
            {teamSections[1]?.members?.map((collaborator, cI) => (
              <div key={cI} className='col-span-6 md:col-span-3 lg:col-span-2'>
                <h3
                  className='text-lg font-light'
                  dangerouslySetInnerHTML={{
                    __html: collaborator.title.rendered,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CollaboratorsTemplate;
