import React from 'react';
import Image from 'next/image';
import gfx_bg_orange from '@/public/bg_orange.png';
import { fetchMediaFromId } from '@/utilities/media';

const PartnersTemplate = async ({ teamSections }) => {
  const renderLogoAndTitle = (logo, title, logoWidth) => (
    <div className='flex flex-col justify-center items-center'>
      {logo && (
        <Image
          src={logo.source_url}
          alt={title}
          width={logoWidth}
          height={logoWidth * 1.5}
          className={`!w-[${logoWidth}px] !h-auto`}
        />
      )}
      {title && <div className='mt-2 font-light'>{title}</div>}
    </div>
  );

  const renderNameAndOrganisation = (name, organisation) => (
    <div className='text-center'>
      <h3 className='text-lg font-light'>{name}</h3>
      {organisation && (
        <div className='text-sm font-medium'>{organisation}</div>
      )}
    </div>
  );

  return (
    <div className='px-8 md:px-16 xl:px-48 relative'>
      {/* Background */}
      <Image
        src={gfx_bg_orange}
        alt=''
        className='fixed left-0 top-0 w-screen h-screen object-cover object-center -z-10 opacity-10'
      />

      {/* Loop over teamSections starting from index 2 */}
      {teamSections?.slice(2).map(
        (section, sI) =>
          section?.members?.length > 0 && (
            <div key={sI} className='my-16'>
              <h2
                dangerouslySetInnerHTML={{ __html: section.title }}
                className='text-4xl text-center'
              />
              <div className={`grid grid-cols-6 gap-8 text-center mt-8`}>
                {section.members.map(async (member, mI) => {
                  const logo = await fetchMediaFromId(member.acf?.profile_icon);

                  // Determine width based on section type (optional)
                  const logoWidth = section.type === 'advisor' ? 150 : 200;

                  return (
                    <div
                      key={mI}
                      className='col-span-6 md:col-span-3 lg:col-span-2 self-center'
                    >
                      {member.acf?.socials?.length > 0 ||
                      member.external_link ? (
                        <a
                          href={
                            member.acf?.socials?.[0]?.link ||
                            member.external_link
                          }
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {member.acf?.profile_icon
                            ? renderLogoAndTitle(
                                logo,
                                member.title?.rendered,
                                logoWidth
                              )
                            : renderNameAndOrganisation(
                                member.title?.rendered,
                                member.acf?.description
                              )}
                        </a>
                      ) : member.acf?.profile_icon ? (
                        renderLogoAndTitle(
                          logo,
                          member.title?.rendered,
                          logoWidth
                        )
                      ) : (
                        renderNameAndOrganisation(
                          member.title?.rendered,
                          member.acf?.description
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default PartnersTemplate;
