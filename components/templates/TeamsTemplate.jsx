import React from 'react';
import CollaboratorsTemplate from './CollaboratorsTemplate';
import PartnersTemplate from './PartnersTemplate';
import { getTeamMemberById } from '@/utilities/team';

const TeamsTemplate = async ({ data, params }) => {
  const baseLink = `/${params.lang}/${params.slug}`;
  const customTeam = data.acf?.custom_team || [];

  const teamSections = await Promise.all(
    customTeam.map(async (section) => {
      const members = section.team_members?.length
        ? (
            await Promise.all(
              section.team_members.map((id) =>
                getTeamMemberById(id, params.lang).catch(() => null)
              )
            )
          ).filter(Boolean)
        : [];

      return {
        title: section.title,
        members,
      };
    })
  );

  return (
    <>
      <CollaboratorsTemplate
        data={data}
        subSlugs={params}
        baseLink={baseLink}
        teamSections={teamSections}
      />

      <PartnersTemplate teamSections={teamSections} />
    </>
  );
};

export default TeamsTemplate;
