import React from 'react';
import gfx_bg_orange from '@/public/bg_orange.png';
import Image from 'next/image';
import Team from '@/components/collaborators/team/team';

const CollaboratorsTemplate = ({ data }) => {
  const renderLogoAndTitle = (logo, title, logoWidth) => (
    <div className='flex flex-col justify-center items-center'>
      {logo?.length > 0 && (
        <Image
          src={logo}
          alt={title}
          width={logoWidth}
          height={logoWidth * 1.5}
          className={`!w-[${logoWidth}px] !h-auto`}
        />
      )}
      {title?.length > 0 && <div className='mt-2 font-light'>{title}</div>}
    </div>
  );

  const renderNameAndOrganisation = (name, organisation) => (
    <div className='text-center'>
      <h3 className='text-lg font-light'>{name}</h3>
      {organisation?.length > 0 && (
        <div className='text-sm font-medium'>{organisation}</div>
      )}
    </div>
  );

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
              <Team teamMember={teamMember} key={tmI} />
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
      {data.acf?.fiscal_sponsors?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{
              __html: data.acf?.fiscal_sponsors_title,
            }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-8 text-center mt-8'>
            {data.acf?.fiscal_sponsors?.map((sponsor, sI) => (
              <div
                key={sI}
                className='col-span-6 md:col-span-3 lg:col-span-2 self-end'
              >
                {sponsor.external_link?.length > 0 ? (
                  <a
                    href={sponsor.external_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {renderLogoAndTitle(sponsor.logo, sponsor.name, 200)}
                  </a>
                ) : (
                  renderLogoAndTitle(sponsor.logo, sponsor.name, 200)
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {data.acf?.funding_partners?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{ __html: data.acf?.funding_title }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-6 text-center mt-8'>
            {data.acf?.funding_partners?.map((partner, pI) => (
              <div
                key={pI}
                className='col-span-6 md:col-span-3 lg:col-span-1 self-center'
              >
                {partner.external_link?.length > 0 ? (
                  <a
                    href={partner.external_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {renderLogoAndTitle(partner.logo, partner.title, 150)}
                  </a>
                ) : (
                  renderLogoAndTitle(partner.logo, partner.title, 150)
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {data.acf?.advisors?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{ __html: data.acf?.advisors_title }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-4 text-center mt-4'>
            {data.acf?.advisors?.map((advisor, aI) => (
              <div key={aI} className='col-span-6 md:col-span-3 lg:col-span-2'>
                {advisor.external_link?.length > 0 ? (
                  <a
                    href={advisor.external_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {renderNameAndOrganisation(
                      advisor.name,
                      advisor.organisation
                    )}
                  </a>
                ) : (
                  renderNameAndOrganisation(advisor.name, advisor.organisation)
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {data.acf?.educational_partners?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{
              __html: data.acf?.educational_partners_title,
            }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-8 text-center mt-8'>
            {data.acf?.educational_partners?.map((partner, pI) => (
              <div
                key={pI}
                className='col-span-6 md:col-span-3 lg:col-span-2 self-end'
              >
                {partner.external_link?.length > 0 ? (
                  <a
                    href={partner.external_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {renderLogoAndTitle(
                      partner.logo,
                      `${partner.name}${
                        partner.city ? `, ${partner.city}` : ''
                      }`,
                      200
                    )}
                  </a>
                ) : (
                  renderLogoAndTitle(
                    partner.logo,
                    `${partner.name}${partner.city ? `, ${partner.city}` : ''}`,
                    200
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {data.acf?.event_partners?.length > 0 ? (
        <div className='my-16'>
          <h2
            dangerouslySetInnerHTML={{ __html: data.acf?.event_partners_title }}
            className='text-4xl text-center'
          />
          <div className='grid grid-cols-6 gap-8 text-center mt-8'>
            {data.acf?.event_partners?.map((partner, pI) => (
              <div
                key={pI}
                className='col-span-6 md:col-span-3 lg:col-span-2 self-end'
              >
                {partner.external_link?.length > 0 ? (
                  <a
                    href={partner.external_link}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {renderLogoAndTitle(
                      partner.logo,
                      `${partner.name}${
                        partner.city ? `, ${partner.city}` : ''
                      }`,
                      200
                    )}
                  </a>
                ) : (
                  renderLogoAndTitle(
                    partner.logo,
                    `${partner.name}${partner.city ? `, ${partner.city}` : ''}`,
                    200
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CollaboratorsTemplate;
